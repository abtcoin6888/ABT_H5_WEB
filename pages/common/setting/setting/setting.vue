<template>
    <view class="setting" :data-theme="userTheme">
        <fui-nav-bar
            statusBar
            isFixed
            isOccupy
            zIndex="9"
            background="var(--background-primary)"
            color="var(--content-primary)"
            :title="$t('index.setting')"
            @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="container-box">
            <!--   语言  -->
            <view class="container-box-cell flex align-center justify-between"
                  @click="langShow=!langShow">
                <view class="cell-left flex align-center">
                    <text class="font-14 color-black">
                        {{ $t('setting.language') }}
                    </text>
                </view>
                <view class="flex align-center justify-end cell-right">
                    <text class="font-14 color-gray">
                        {{ lang }}
                    </text>
                    <fui-icon name="arrowright"
                              size="34"
                              color="var(--content-tertiary)">
                    </fui-icon>
                </view>
            </view>
            <!--   涨跌颜色  -->
            <!-- <view class="container-box-cell flex align-center justify-between"
                  @click="colorShow=true">
                <view class="cell-left flex align-center">
                    <text class="font-14 color-black">
                        {{ $t('setting.ris_color') }}
                    </text>
                </view>
                <view class="flex align-center justify-end cell-right">
                    <text class="font-14 color-gray">
                        {{ $t(color) }}
                    </text>
                    <fui-icon name="arrowright"
                              size="34"
                              color="var(--content-tertiary)">
                    </fui-icon>
                </view>
            </view> -->
            <!-- v-if="false"  主题  -->
            <view class="container-box-cell flex align-center justify-between"
                  @click="$mroute.toThememode()">
                <view class="cell-left flex align-center">
                    <text class="font-14 color-black">
                        {{$t('common.them')}}
                    </text>
                </view>
                <view class="flex align-center justify-end cell-right">
                    <text class="font-14 color-gray">
                        {{ userTheme == 'light' ? $t('common.light') : $t('common.dark') }}
                    </text>
                    <fui-icon name="arrowright"
                              size="34"
                              color="var(--content-tertiary)">
                    </fui-icon>
                </view>
            </view>
            <!--   计价单位  -->
            <view class="container-box-cell flex align-center justify-between"
                  @click="jjShow=true">
                <view class="cell-left flex align-center">
                    <text class="font-14 color-black">
                        {{ $t('setting.sales_unit') }}
                    </text>
                </view>
                <view class="flex align-center justify-end cell-right">
                    <text class="font-14 color-gray">
                        {{ currency }}
                    </text>
                    <fui-icon name="arrowright"
                              size="34"
                              color="var(--content-tertiary)">
                    </fui-icon>
                </view>
            </view>
            <!--   网络速度  -->
            <view class="container-box-cell flex align-center justify-between">
                <view class="cell-left flex align-center">
                    <text class="font-14 color-black">
                        {{ $t('setting.internet_speed') }}
                    </text>
                </view>
                <view class="flex align-center justify-end cell-right">
                    <text class="font-14 color-green">
                        99ms
                    </text>
                </view>
            </view>
        </view>
        <!--  计价单位  -->
        <fui-actionsheet :theme="userTheme"
                         :show="colorShow"
                         @click="setColor"
                         @cancel="colorShow=false"
                         itemSize="28"
                         :itemList="colorItem">
        </fui-actionsheet>
        <!--  计价单位  -->
        <fui-actionsheet :theme="userTheme"
                         :show="jjShow"
                         @click="setCurrency"
                         @cancel="jjShow=false"
                         itemSize="28"
                         :itemList="jijiaItem">
        </fui-actionsheet>
        <!-- 语言选择 -->
        <fui-actionsheet :theme="userTheme"
                         :show="langShow"
                         @click="setLang"
                         @cancel="langShow=false"
                         itemSize="28"
                         :itemList="itemList">
        </fui-actionsheet>
    </view>
</template>

<script>
import commonApi from '/common/api/common.js';

import { mapGetters,mapMutations } from 'vuex';

export default {
    data() {
        return {
            langShow: false,
            jjShow: false,
            colorShow: false,
            colorItem: [
                {
                    text: this.$t('红涨绿跌'),
                    color: "#000000",
					up:"#F92855",
					dn:"#2DC08E",
                    value: "red_up_green_down"
                },
                {
                    text: this.$t('绿涨红跌'),
                    color: "#000000",
					up:"#2DC08E",
					dn:"#F92855",
                    value: "green_up_red_down"
                }
            ],
            jijiaItem: [
                {
                    text: this.$t('setup.usd'),
                    color: '#000000',
                    value: "USD",
                    symbol: "$"
                },
				{
				    text: this.$t('setup.gbp'),
				    color: '#000000',
				    value: "GBP",
				    symbol: "￡"
				},
                {
                    text: this.$t('setup.cny'),
                    color: '#000000',
                    value: "CNY",
                    symbol: "¥"
                },
                {
                    text: this.$t('setup.jpy'),
                    color: '#000000',
                    value: "JPY",
                    symbol: "¥"
                },
                {
                    text: this.$t('setup.eur'),
                    color: '#000000',
                    value: "EUR",
                    symbol: "€"
                },
				{
				    text: this.$t('setup.inr'),
				    color: '#000000',
				    value: "INR",
				    symbol: "₹"
				},
            ],
            itemList: [
                {
                    text: '繁體中文',
                    color: '#000000',
                    value: "zh-Hant"
                },
                {
                    text: 'English',
                    color: '#000000',
                    value: "en"
                },
                {
                    text: '日本語',
                    color: '#000000',
                    value: "ja"
                },
                {
                    text: '한국인',
                    color: '#000000',
                    value: "ko"
                }
            ],
            lang: "English",
            currency: "人民币(cny)",
            color: "红涨绿跌"
        }
    },
    onShow() {
        this.getLang();
        this.getCurrency();
        // uni.getNetworkType({
        //   success: (res) => {
        //     console.log(res)
        //   },
        //   fail: (error) => {
        //     console.log(error)
        //   }
        // })
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        ...mapMutations(['updateLang']),
        setColor(e) {
			console.log(e);
            uni.setStorageSync('local-kline', e);
            this.colorShow = false;
            this.color = e.text;
			uni.showToast({
				title:this.$t('secrety.mod_suc'),
				icon:"none"
			});
        },
        async getCurrencyFee(currency) {
            return await commonApi.getCurrencyFee(currency);
        },
        getCurrency() {
            var currency = uni.getStorageSync('local-currency');
            if (typeof currency != 'undefined' && currency != '') {
                this.currency = currency.text;
            }
        },
        async setCurrency(e) {
            uni.setStorageSync('local-currency', e);
            this.currency = e.text;
            this.jjShow = false;
            var fee = await this.getCurrencyFee(e.value);
            if (fee.code == 200) {
                uni.setStorageSync('local-fee', fee.data.tether[e.value.toLowerCase()]);
            }
            uni.$emit('currency');
        },
        getLang() {
            var lang = uni.getStorageSync('lang');
            if (typeof lang != 'undefined' && lang != '') {
                var text = '';
                this.itemList.map((item) => {
                    if (item.value == lang) {
                        text = item.text;
                    }
                });
                this.lang = text;
            }
        },
        setLang(e) {
            this.$i18n.locale = e.value;
            let _this = this;
            const lang = e.value;
            uni.setStorage({
                key: "lang",
                data: e.value,
                success() {
                    _this.langShow = false;
                    _this.getLang();
					uni.setLocale(lang);
                    _this.updateLang(lang);
                    uni.$emit('switchLan',{lang:lang});
					// #ifndef H5
					plus.runtime.restart();
					// #endif
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.setting {
    width: 100%;
    min-height: 100vh;
    background-color: var(--background-primary);

    .container-box {
        width: 100%;
        height: auto;

        &-cell {
            width: 100%;
            height: 96rpx;
            padding: 0 30rpx;
            box-sizing: border-box;

            .cell-left {
                width: 55%;
                height: 88rpx;

                text {
                    display: inline-block;
                    width: 80%;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }

            .cell-right {
                width: 60%;
            }
        }
    }
}
</style>
