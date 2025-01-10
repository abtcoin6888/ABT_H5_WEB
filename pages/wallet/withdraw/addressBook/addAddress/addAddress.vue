<template>
    <view class="page-warp bg-white"
          :data-theme="userTheme">
        <fui-nav-bar zIndex="9"
                     :statusBar="true"
                     :title="$t('address.text3')"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="page-container">
            <view class="label">
                <view class="label-box bg-gray"
                      @click="currencyPopup = true">
                    <view class="currency-box"
                          v-if="current === false">
                        <image class="currency-icon"
                               src="/static/coin/btc.png"
                               mode="widthFix"></image>
                        <text class="font-14 font-bold font-weight">BTC</text>
                    </view>
                    <view class="currency-box"
                          v-else>
                        <image class="currency-icon"
                               :src="current['icon']"
                               mode="widthFix"></image>
                        <text class="font-14 font-bold color-black">{{ current['symbol'] }}</text>
                    </view>
                </view>
            </view>
            <view class="label label-size" v-if="netlist.length > 0 && net !== false">
                <text class="label-text font-13 color-black">{{ $t('address.text4') }}</text>
                <view class="label-box bg-gray label-size" @click="networkPopup = true"
                      :class="{'no-content': unfilledCheckArr[0]}">
                    <input class="font-14 color-black font-weight"
                           type="text"
                           :value="netlist[net]['symbol']"
                           :placeholder="$t('address.text5')"
                           :disabled="true">
                    <fui-icon name="arrowright"
                              size="42"
                              color="var(--content-primary)"></fui-icon>
                </view>
                <text class="tooltip price_down font-12"
                      v-if="unfilledCheckArr[0]">
                    {{ $t('address.text5') }}
                </text>
            </view>
            <view class="label label-size">
                <text class="label-text font-13 color-black">{{ $t('address.text6') }}</text>
                <view class="label-box bg-gray label-size"
                      :class="{'no-content': unfilledCheckArr[1]}">
                    <input class="font-14 color-black font-weight" v-model="address"
                           type="text"
                           :adjust-position="false"
                           :placeholder="$t('address.text7')"
                           @focus="unfilledCheckArr[1] = false">
                    <!-- #ifdef APP -->
                    <image :src="`/static/wallet/scan_code-${userTheme}.png`"
                           mode="widthFix" @click="scan()"></image>
                    <!-- #endif -->
                </view>
                <text class="tooltip price_down font-12"
                      v-if="unfilledCheckArr[1]">
                    {{ $t('address.text7') }}
                </text>
            </view>
            <view class="label">
                <text class="label-text font-13 color-black">{{ $t('address.text8') }}</text>
                <view class="label-box bg-gray">
                    <input class="font-14 color-black font-weight"
                           type="text"
                           :placeholder="$t('address.text9')"
                           v-model="remark"
                           :adjust-position="false">
                </view>
            </view>
        </view>
        <view class="confirm">
            <view class="button bg-black"
                  @click="confirm">
                <text class="font-14 font-weight color-white">
                    {{ $t('address.text10') }}
                </text>
            </view>
        </view>

        <!--    弹窗(币种)    -->
        <fui-bottom-popup :show="currencyPopup"
                          background="var(--background-primary)">
            <view class="popup-warp">
                <fui-nav-bar zIndex="2"
                             :statusBar="true"
                             background="var(--background-primary)"
                             color="var(--content-primary)"
                             :title="$t('financing.t85')"
                             @leftClick="currencyPopup = false"
                             @init="navInit">
                    <fui-icon name="arrowleft"
                              size="56"
                              color="var(--content-primary)">
                    </fui-icon>
                </fui-nav-bar>
                <view class="coin-list-warp"
                      :style="`height: ${coinListHeight}px`">
                    <coin-indexed-xlist name-key="symbol"
                                        nameKey="symbol"
                                        :dataList="coin"
                                        :showAvatar="true"
                                        @itemclick="itemclick">
                    </coin-indexed-xlist>
                </view>
            </view>
        </fui-bottom-popup>
        <!--    弹窗(网络)    -->
        <fui-bottom-popup :show="networkPopup"
                          background="var(--background-primary)">
            <view class="popup-warp">
                <view class="popup-title">
                    <text class="font-16 font-weight color-black">
                        {{ $t('with.t20') }}
                    </text>
                    <fui-icon name="close"
                              size="48"
                              color="var(--content-primary)"
                              @click="networkPopup = false"></fui-icon>
                </view>
                <view class="network-container">
                    <view class="tooltip-box">
                        <text class="font-12 color-gray">
                            {{ $t('with.t21') }}
                        </text>
                    </view>
                    <view class="item"
                          :class="{'active': net == index}"
                          v-for="(item,index) in netlist"
                          @click="net = index; networkPopup = false">
                        <text class="font-13 color-black font-weight mr-10">
                            {{ item.symbol }}
                        </text>
<!--                        <text class="font-12 color-gray">-->
<!--                            {{ $t('with.t22') }}：{{-->
<!--                                $util.thousandSeparator($util.str2number(current['with_charge']))-->
<!--                            }}-->
<!--                            {{ current.symbol }}-->
<!--                        </text>-->
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <alert ref="alert" :title="$t('with.t23')" :content="content"></alert>
        <loading ref="loading"></loading>
        <authPop ref="authPop" :title="title" @callback="confirms"></authPop>
    </view>
</template>
<script>
import {mapGetters} from 'vuex';
import commonApi from '@/common/api/common';
import userApi from '@/common/api/user';

export default {
    data() {
        return {
            windowHeight: null,
            coinListHeight: null,
            address: "", //地址
            remark: "", //备注
            unfilledCheckArr: [],
            coin: [],
            netlist: [],
            net: false,
            current: false,
            currencyPopup: false,
            networkPopup: false,
			network:'',
            title:this.$t('login.t11'),
            content:"",
            type:""
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    mounted() {

    },
    created() {
        this.getCurrency();
    },
    methods: {
        confirms(code){
            //开始
            commonApi.addBook(
                {
                    currency_id:this.current.id,
                    address:this.address,
                    des:this.remark,
                    code:code,
                    type : this.type,
					network:this.netlist[this.net]['id']
                }).then(res => {
                if (res.success) {
                    uni.showToast({
                        title: this.$t('google.save_suc'),
                        icon: 'none',
                        mask: true
                    });
                    this.$mroute.back();
                } else {
                    this.content = res.message;
                    this.$refs.alert.open();
                }
            })
        },
        scan(){

        },
        navInit(e) {
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            this.coinListHeight = windowHeight - e.height - e.statusBarHeight;
        },
        confirm() {
            if (this.net === false || this.address === '') {
                this.unfilledCheckArr[0] = this.net === false;
                this.unfilledCheckArr[1] = this.address === '';
                return false
            }
            this.$refs.loading.open();
            userApi.getUniCode().then(res => {
                this.$refs.loading.close();
                if (res.data.type !== 0) {
                    this.type = res.data.type;
                    if (res.data.type === 'google') {
                        this.title = this.$t('secrety.google_ver')
                    }
                    if (res.data.type === 'email') {
                        this.title = this.$t('secrety.email_ver')
                    }
                    if (res.data.type === 'phone') {
                        this.title = this.$t('secrety.phone_ver')
                    }
                    this.$refs.authPop.open();
                } else {
                    this.content = this.$t('secrety.fail_send');
                    this.$refs.alert.open();
                }
            });
        },
        getCurrency() {
            commonApi.getAccountCurrency().then(res => {
                this.coin = res.data;
                if (this.coin.length > 0) {
                    this.current = this.coin[0]; // 设置默认显示的币种为过滤后的第一个币种
                    console.log(this.coin); // 打印过滤后的数组
                    this.getNetList(this.coin[0]['id']); // 使用过滤后的第一个币种的id调用 getNetList 方法
                } else {
                    console.log("No ETH or BTC currencies with positive balance.");
                }
            });
        },
        getNetList(currency_id) {
            commonApi.getNetList(currency_id).then(res => {
                this.netlist = res.data.list;
                this.net = 0;
            })
        },
        itemclick(e) {
            this.current = e;
            this.getNetList(e.id);
            this.currencyPopup = false;
        },
    },
}
</script>
<style lang="scss"
       scoped>
@import "addAddress";
</style>