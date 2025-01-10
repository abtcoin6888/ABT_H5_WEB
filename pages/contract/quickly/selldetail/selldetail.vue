<template>
    <view class="selldetail"
          :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     :padding="15"
                     zIndex="9"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     :title="$t('quickly.tt156')"
                     @leftClick="$mroute.back"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
            <template v-slot:right>
                <text class="font-12 color-gray"
                      @click="$mroute.webview(2,config['kefu_url'],$t('common.kefu'),100)">
                    {{$t('quickly.tt102')}}
                </text>
            </template>
        </fui-nav-bar>
        <view class="paystatus-container">
            <scroll-view scroll-y class="paystatus-container-scroll" :style="{'height': windowHeight + 'px'}">
                <!--待付款-->
                <view class="scroll-card">
                    <view class="scroll-card-row">
                        <view class="left flex flex-column align-start justify-start">
                            <text class="font-20 color-black font-weight"
                                  v-if="order['status'] === 0">
                                {{$t('quickly.tt70')}}
                            </text>
                            <text class="font-12 color-gray font-weight mt-5"
                                  v-if="order['status'] === 0">
                                {{$t('quickly.tt157')}}
                                <fui-count-down v-if="!astatus"
                                                background="var(--background-secondary)"
                                                size="24"
                                                borderColor="var(--background-secondary)"
                                                color="var(--content-primary)"
                                                colonColor="var(--content-tertiary)"
                                                :isHours="false"
                                                :value="600"
                                                @end="approve">
                                </fui-count-down>
                            </text>
                            <text class="font-20 color-black font-weight"
                                  v-if="order['status'] === 1">
                                {{$t('quickly.tt73')}}
                            </text>
                            <text class="font-12 color-gray mt-5"
                                  v-if="order['status'] === 1">
                                {{$t('quickly.tt158')}}
                            </text>
                            <text class="font-20 color-black font-weight"
                                  v-if="order['status'] === 2">
                                {{$t('quickly.tt74')}}
                            </text>
                            <text class="font-12 color-gray mt-5"
                                  v-if="order['status'] === 2">
                                {{$t('quickly.tt104')}}
                            </text>
                            <text class="font-20 color-black font-weight"
                                  v-if="order['status'] === 3">
                                {{$t('quickly.tt75')}}
                            </text>
                            <text class="font-12 color-gray mt-5"
                                  v-if="order['status'] === 3">
                                {{$t('quickly.tt103')}}
                            </text>
                        </view>
                        <view class="right">
                            <view class="kf-box">
                                <image class="kf-img"
                                       :src="`/static/img/kf-${userTheme}.webp`"
                                       mode="widthFix"
                                       @click="$mroute.webview(2,config['kefu_url'],$t('common.kefu'),100)">
                                </image>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="scroll-card">
                    <view class="scroll-card-row">
                        <view class="left flex align-center">
                            <image :src="order['currency']['icon']"></image>
                            <text class="font-16 color-black font-bold">{{$t('quickly.tt137')}}{{
                                    order['currency']['symbol']
                                }}
                            </text>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">={{$t('home.t5')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight">{{symbol}} {{ order['price'] }}</text>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt59')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight">{{ $util.float(order['amount']) }}
                                {{ order['currency']['symbol'] }}
                            </text>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt58')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-16 color-black font-weight">{{symbol}} {{
                                    $util.float(order['t_amount'])
                                }}
                            </text>
                            <image class="copy-icon"
                                   :src="`/static/img/copy-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt9')}}</text>
                        </view>
                        <view class="right">
                            <image src="/static/quickly/wechatpay.png"
                                   v-if="order['recaccount']['type'] == 1"></image>
                            <image src="/static/quickly/alipay.png" v-if="order['recaccount']['type'] == 2"></image>
                            <image src="/static/quickly/unionpay.png"
                                   v-if="order['recaccount']['type'] == 3"></image>
                            <text class="font-13 color-black font-weight ml-5" v-if="order['recaccount']['type'] == 1">{{$t('quickly.tt43')}}
                            </text>
                            <text class="font-13 color-black font-weight ml-5" v-if="order['recaccount']['type'] == 2">{{$t('quickly.tt41')}}
                            </text>
                            <text class="font-13 color-black font-weight ml-5" v-if="order['recaccount']['type'] == 3">{{$t('quickly.tt42')}}
                            </text>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt159')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight ml-5">{{ order['recaccount']['account'] }}</text>
                        </view>
                    </view>
                </view>
                <!--买家信息-->
                <view class="scroll-card">
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt160')}}</text>
                        </view>
                        <view class="right" @click="sellerInfo = true">
                            <text class="font-13 color-black font-weight">{{ order['merchant']['merchant_name'] }}</text>
                            <fui-icon name="arrowright" size="36" color="var(--content-primary)"></fui-icon>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt161')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight">{{ order['merchant']['name'] }}</text>
                            <image class="copy-icon"
                                   :src="`/static/img/copy-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                    </view>
                </view>
                <!--订单信息-->
                <view class="scroll-card">
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt117')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight">{{ order['id'] }}</text>
                            <image class="copy-icon"
                                   :src="`/static/img/copy-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt118')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight">{{ order['result']['created_at'] }}</text>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt119')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight">{{$t('quickly.tt162')}}</text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <view class="paystatus-footer" v-if="order['status'] == 0">
            <view class="button-item">
                <fui-button height="78rpx"
                            radius="78rpx"
                            :size="26"
                            color="var(--content-always-white)"
                            background="var(--content-trade-sell)"
                            @click="cancelOrder">
                    {{$t('quickly.tt121')}}
                </fui-button>
            </view>
            <view class="button-item">
                <fui-button height="78rpx"
                            radius="78rpx"
                            :size="26"
                            color="var(--content-tertiary)"
                            background="var(--background-secondary)">
                    {{$t('quickly.tt163')}}
                </fui-button>
            </view>
        </view>
        <view class="paystatus-footer" v-if="order['status'] == 1">
            <view class="button-item">
                <fui-button  height="78rpx"
                             radius="78rpx"
                             :size="26"
                             color="var(--content-tertiary)"
                             background="var(--background-secondary)"
                             @click="toKfu">
                    {{$t('quickly.tt123')}}
                    <fui-count-down v-if="!astatus"
                                    :isHours="false"
                                    size="24"
                                    color="var(--content-primary)"
                                    colonColor="var(--content-tertiary)"
                                    background="var(--background-secondary)"
                                    borderColor="var(--background-secondary)"
                                    :value="300"
                                    @end="timeEnd">
                    </fui-count-down>
                </fui-button>
            </view>
            <view class="button-item">
                <fui-button height="78rpx"
                            radius="78rpx"
                            :size="26"
                            color="var(--background-primary)"
                            background="var(--content-primary)"
                            @click="dropCoins">
                    {{$t('quickly.tt164')}}
                </fui-button>
            </view>
        </view>
        <!--  取消交易弹窗  -->
        <fui-bottom-popup :show="cancelTran" @close="closePopup">

        </fui-bottom-popup>
        <!-- 买家信息弹窗  -->
        <fui-bottom-popup background="var(--background-primary)" :show="sellerInfo" @close="closePopup">
            <view class="bottom-popup">
                <view class="title">
                    <text class="font-15 color-black font-weight">{{$t('quickly.tt160')}}</text>
                    <text class="font-13 color-gray" @click="closePopup">{{$t('quickly.tt134')}}</text>
                </view>
                <view class="popup-content">
                    <view class="cell">
                        <view class="left">
                            <image :src="order['merchant']['logo']"></image>
                            <text class="font-14 color-black font-weight">{{ order['merchant']['name'] }}</text>
                        </view>
                    </view>
                    <view class="cell-column">
                        <text class="font-13 color-gray">{{$t('quickly.tt135')}}</text>
                        <view class="column-group">
                            <view class="_item">
                                <text class="font-14 color-black font-weight">{{ order['merchant']['buy_num'] }}</text>
                                <text class="font-13 color-green">{{$t('quickly.tt136')}}</text>
                            </view>
                            <view class="_item">
                                <text class="font-14 color-black font-weight">{{ order['merchant']['sale_num'] }}</text>
                                <text class="font-13 color-red">{{$t('quickly.tt137')}}</text>
                            </view>
                        </view>
                    </view>
                    <view class="cell not-margin">
                        <view class="left">
                            <text class="font-13 color-gray">{{$t('quickly.tt138')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black">{{ order['merchant']['buy_haddle_time'] }}分钟</text>
                        </view>
                    </view>
                    <view class="cell not-margin">
                        <view class="left">
                            <text class="font-13 color-gray">{{$t('quickly.tt140')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black">{{ order['merchant']['register_at'] }}</text>
                        </view>
                    </view>
                    <view class="button-box">
                        <fui-button height="78rpx"
                                    radius="78rpx"
                                    size="26"
                                    color="var(--background-primary)"
                                    background="var(--content-primary)"
                                    @click="closePopup">
                            {{$t('quickly.tt141')}}
                        </fui-button>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--  放币弹窗  -->
        <fui-bottom-popup background="var(--background-primary)"
                          :show="confirmDrop"
                          @close="closePopup">
            <view class="bottom-popup">
                <view class="title">
                    <text class="font-15 color-black font-weight">{{$t('quickly.tt165')}}</text>
                    <text class="font-13 color-gray" @click="closePopup">{{$t('quickly.tt143')}}</text>
                </view>
                <view class="popup-content">
                    <view class="popup-content-head">
                        <view class="cell-tip">
                            <text class="font-12 color-warring">
                                <fui-icon name="info-fill" size="24" color="var(--color-warring)"></fui-icon>
                                {{$t('quickly.tt166')}}
                            </text>
                        </view>
                    </view>
                    <view class="label-pwd">
                        <view class="_item">
                            <text class="font-13 color-gray">{{$t('quickly.tt167')}}</text>
                            <text class="font-13 color-primary" @click="$mroute.forgetpwd()">{{$t('quickly.tt168')}}</text>
                        </view>
                        <view class="input-box">
                            <input type="password" v-model="password" :placeholder="$t('quickly.tt169')"
                                   placeholder-class="placeholder"/>
                        </view>
                        <view class="checkbox">
                            <fui-checkbox value="1"
                                          :scaleRatio="0.5"
                                          color="var(--color-primary)"
                                          borderRadius="6rpx"
                                          :checked="checked"
                                          @click="checkTap"></fui-checkbox>
                            <text class="font-12 color-gray ml-5" @click="checkTap">
                                {{$t('quickly.tt170')}}
                            </text>
                        </view>
                    </view>
                    <view class="button-box">
                        <fui-button height="78rpx"
                                    radius="78rpx"
                                    size="26"
                                    color="var(--content-always-white)"
                                    background="var(--content-trade-buy)"
                                    @click="confrimTap">
                            {{$t('quickly.tt69')}}
                        </fui-button>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <fui-toast size="26" :background="'var(--mask-bakground-bg)'" ref="toast"></fui-toast>
    </view>
</template>

<script>
import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"
import fuiCountDown from "@/components/firstui/fui-count-down/fui-count-down.vue"
import {mapState, mapGetters, mapMutations} from 'vuex';

import commonApi from '@/common/api/common.js';
import userApi from '@/common/api/user.js';

var set;
export default {
    components: {
        fuiCountDown,
        fuiToast
    },
    data() {
        return {
            payType: false,
            navHeight: "",
            windowHeight: "",
            cancelTran: false,
            sellerInfo: false,
            confirmDrop: false,
            checked: false,
            order: {status: 0},
            astatus: false,
            password: "",
			symbol: this.$util.getLCS(),
			symbol_rate: this.$util.getLCR(),
        }
    },
    onShow() {
        this.order = uni.getStorageSync('c2c-sell');

        if (set != null) {
            clearInterval(set);
        }
        this.orderStatus();
        set = setInterval(() => {
            this.orderStatus();
        }, 2000);
    },
    computed: {
        ...mapState(['config', 'userinfo']),
        ...mapGetters(['userTheme'])
    },
    methods: {
        toKfu() {
            if (this.astatus) {
                return this.$mroute.webview(2, this.config['kefu_url'], this.$t('common.kefu'), 100);
            }
        },
        timeEnd() {
            this.astatus = true;
        },
        orderStatus() {
            var _thss = this;
            commonApi.c2cOrderStatus(this.order.id).then(res => {
                _thss.order['status'] = res.data.status;
                // if(this.order['status'] === 2 && !_thss.tip){
                // 	_thss.tip = true;
                // 	_thss.showToast("商家已确认付款，已放币，请查收",5000);
                // }
            });
        },
        cancelOrder() {
            var _this = this;
            uni.showModal({
                content: this.$t('quickly.tt171'),
                confirmText: this.$t('quickly.tt172'),
                cancelText: this.$t('quickly.tt173'),
                success(e) {
                    if (e.confirm) {
                        commonApi.cancelCOrder(_this.order.id).then(res => {
                            if (res.code == 200) {
                                _this.order['status'] = 3;
                            } else {
                                _this.showToast(res.message);
                            }
                        }).catch((e) => {
                            _this.showToast(e.message);
                        })
                    }
                }
            })
        },
        navInit(e) {
            console.log(e);
            this.navHeight = e.height + e.statusBarHeight;
            this.windowHeight = uni.getSystemInfoSync().windowHeight - e.height - e.statusBarHeight;
        },
        next() {
            this.confirmDrop = true;
        },
        confrimTap() {
            if (!this.checked) {
                this.showToast(this.$t('quickly.tt174'));
                return false;
            }
            if (this.password == '') {
                this.showToast(this.$t('quickly.tt175'));
                return false;
            }
            uni.showLoading();
            userApi.verifyPassword(this.password).then(res => {
                if (res.code != 200) {
                    uni.hideLoading();
                    this.showToast(this.$t('quickly.tt176'));
                } else {
                    this.payType = true;
                    this.closePopup();

                    commonApi.c2cComplete(this.order['id']).then(res => {
                        uni.hideLoading();
                        if (res.code == 200) {
                            this.showToast(this.$t('quickly.tt177'), 3000);
                        }
                    });
                }
            }).catch((e) => {
                this.showToast(e.message);
                uni.hideLoading();
            })

        },
        dropCoins() {
            this.confirmDrop = true;
        },
        checkTap() {
            this.checked = !this.checked;
        },
        closePopup() {
            this.cancelTran = false;
            this.codePopup = false;
            this.sellerInfo = false;
            this.confirmDrop = false;
        },
        showToast(type, time) {
            let options = {}
            //提示信息
            options.text = type;
            options.duration = time;
            this.$refs.toast.show(options)
        },
    }
}
</script>

<style lang="scss" scoped>
@import "selldetail";
</style>