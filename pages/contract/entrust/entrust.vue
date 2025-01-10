<template>
    <view class="entrust" :data-theme="userTheme">
        <fui-nav-bar zIndex="9"
                     statusBar
                     isFixed
                     isOccupy
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('entrust.t1')"
                     @leftClick="$mroute.back()"
                     @rightClick="$refs.showHelp.open()">
            <fui-icon name="arrowleft" size="56" :color="'var(--content-primary)'"></fui-icon>
            <template v-slot:right>
                <fui-icon name="help-fill" size="40" color="var(--content-tertiary)"></fui-icon>
            </template>
        </fui-nav-bar>
        <view class="entrust-container">
            <view class="">
                <view class="cell-row flex flex-row align-center">
                    <fui-tag size="20"
                             radius="4"
                             :isBorder="false"
                             :padding="['8rpx','10rpx']"
                             color="var(--content-always-white)"
                             :background="futures['direction'] == 1 ? 'var(--content-trade-buy)' : 'var(--content-trade-sell)'"
                             theme="dark"
                             marginRight="10"
                             default>
                        {{ futures['direction'] == 1 ? $t('entrust.t5') : $t('entrust.t6') }}
                    </fui-tag>
                    <text class="font-14 font-weight color-black">{{ futures['symbol'] }}USDT PERP</text>
                    <fui-tag size="20"
                             radius="4"
                             :isBorder="false"
                             :padding="['8rpx','10rpx']"
                             marginLeft="10"
                             marginRight="10"
                             color="var(--content-tertiary)"
                             background="var(--background-secondary)"
                             default>
                        {{ futures['margin_type'] == 1 ? $t('entrust.t7') : $t('entrust.t8') }}{{ futures['muilt'] }}X
                    </fui-tag>
                </view>
                <view type="two" class="cell-row flex align-center justify-between">
                    <view class="item flex flex-column">
                        <text class="font-12 color-gray">{{ $t('entrust.t9') }}</text>
                        <text
                            class="font-12 color-black font-weight mt-5">{{ $util.thousandSeparator(futures['price']) }}
                        </text>
                    </view>
                    <view class="item flex flex-column align-center">
                        <text class="font-12 color-gray">{{ $t('entrust.t10') }}</text>
                        <text
                            class="font-12 color-black font-weight mt-5">{{ $util.thousandSeparator(newPrice) }}
                        </text>
                    </view>
                    <view class="item flex flex-column align-end">
                        <text class="font-12 color-gray">{{ $t('entrust.t11') }}</text>
                        <text class="font-12 color-black font-weight mt-5" v-if="futures.direction == 1">
                            {{
                                parseFloat(futures.price) - parseFloat(futures.sp) <= 0 ? this.$t('contruct.nl_yp') :
                                    $util.thousandSeparator(parseFloat(futures.price) - parseFloat(futures.sp), 2)
                            }}
                        </text>
                        <text class="font-12 color-black font-weight mt-5" v-else>
                            {{ $util.thousandSeparator(parseFloat(futures.price) + parseFloat(futures.sp), 2) }}
                        </text>
                    </view>
                </view>
                <!-- 止盈设置部分 -->
                <view class="cell-row flex align-center">
                    <text class="font-14 price_up font-weight">{{ $t('entrust.t12') }}</text>
                </view>
                <view class="cell-row flex flex-row align-center justify-between">
                    <view class="item">
                        <view class="item-top flex flex-row align-center">
                            <text class="font-12 color-gray">{{ $t('entrust.t13') }}</text>
                        </view>
                        <view class="input-box flex flex-row align-center justify-between bg-gray">
                            <input type="text" v-model="profitPwrice" :placeholder="$t('entrust.t15')"
                                   class="color-black"
                                   placeholder-class="placeholder"
                            >
                            <text class="font-12 font-weight color-black">USDT</text>
                        </view>
                        <view class="mt-5">
                            <text class="font-10 color-gray">
                                {{ $t('entrust.t16') }}{{
                                    futures['direction'] == 1 ? '≥' : '≤'
                                }}{{ $t('entrust.t17') }}
                            </text>
                        </view>
                    </view>
                    <view class="item">
                        <fui-dropdown-menu :background="'var(--background-secondary-100)'" :size="24" :maxHeight="270"
                                           :radius="10"
                                           :padding="'24rpx'"
                                           selectedColor="var(--color-primary)"
                                           color="var(--content-primary)"
                                           right="0"
                                           :minWidth="120"
                                           :isCheckbox="false"
                                           :options="actions"
                                           ref="numRange"
                                           @click="selectType">
                            <view class="item-top flex flex-row align-center justify-between">
                                <text class="font-12 color-gray">{{ $t('entrust.t14') }}</text>
                                <view class="tag-button flex flex-row align-center justify-between bg-gray"
                                      @tap="filterTap(0)">
                                    <text class="font-12 color-black font-weight">{{ actions[profitType] }}</text>
                                    <image src="/static/img/h0.png" mode=""></image>
                                </view>
                            </view>
                        </fui-dropdown-menu>
                        <view class="input-box flex flex-row align-center justify-between bg-gray">
                            <input type="text" v-model="profitPprice" :disabled="profitType==0?true:false"
                                   :placeholder="profitType==0?$t('entrust.t2'):$t('entrust.t15')"
                                   class="color-black"
                                   placeholder-class="placeholder">
                            <text class="font-12 font-weight color-black">USDT</text>
                        </view>
                        <view class="mt-5">
                            <text class="font-10 color-gray">
                                {{ $t('entrust.t19') }}
                            </text>
                        </view>
                    </view>
                </view>
                <view>
                    <view class="cell-row">
                        <text class="font-14 color-black font-weight">{{ $t('entrust.t20') }}</text>
                        <view class="cell-row-input flex align-center justify-between bg-gray mt-5">
                            <input type="text" v-model="profitAmount" :placeholder="$t('entrust.t20')"
                                   class="color-black"
                                   placeholder-class="placeholder">
                            <text class="font-12 font-weight color-black">USDT</text>
                        </view>
                    </view>
                    <view class="slider-box">
                        <view class="slider-box-top">
                            <slider class="slider"
                                    value="0"
                                    @change="sliderChange"
                                    @changing="slideVal[0] = $event.detail.value"
                                    backgroundColor="var(--color-gray-bg)"
                                    :block-color="'var(--blue)'"
                                    block-size="20" step="1"/>
                            <view class="slider-points">
                                <text class="points" :class="slideVal[0]>=i?'active':''" v-for="i in [0,25,50,75,100]"
                                      :key="i"></text>
                            </view>
                        </view>
                        <view class="slider-box-bottom">
                            <text class="font-11 font-weight"
                                  :class="slideVal[0]>=i?'color-black':'color-gray'"
                                  v-for="i in [0,25,50,75,100]" :key="i">
                                {{ i + '%' }}
                            </text>
                        </view>
                    </view>
                    <view class="cell-row flex align-center justify-between">
                        <text class="font-12 color-gray">{{ $t('entrust.t21') }}</text>
                        <view class="flex align-center">
                            <text class="font-12 color-black font-weight">
                                {{ futures['amount'] }}/{{ futures['amount'] - futures['close'] }}
                                {{ futures['symbol'] }}
                            </text>
                        </view>
                    </view>
                    <view class="cell-row flex align-center justify-between">
                        <text class="font-12 color-gray">{{ $t('entrust.t22') }}</text>
                        <text class="font-12 price_up font-weight">{{ getProfit(0) }} USDT</text>
                    </view>
                </view>
                <!-- 止损设置部分 -->
                <view class="cell-row">
                    <text class="font-14 price_down font-weight">{{ $t('entrust.t23') }}</text>
                </view>
                <view class="cell-row flex align-center justify-between">
                    <view class="item">
                        <view class="item-top flex align-center">
                            <text class="font-12 color-gray">{{ $t('entrust.t13') }}</text>
                        </view>
                        <view class="input-box flex align-center justify-between bg-gray">
                            <input type="text" v-model="losePwprice" :placeholder="$t('entrust.t15')"
                                   class="color-black"
                                   placeholder-class="placeholder">
                            <text class="font-12 font-weight color-black">USDT</text>
                        </view>
                        <view class="mt-5">
                            <text class="font-10 color-gray">
                                {{ $t('entrust.t16') }}{{
                                    futures['direction'] == 1 ? '≤' : '≥'
                                }}{{ $t('entrust.t17') }}
                            </text>
                        </view>
                    </view>
                    <view class="item">
                        <fui-dropdown-menu :background="'var(--white)'" :size="24" :maxHeight="270"
                                           :radius="10" :padding="'24rpx'" selectedColor="var(--blue)"
                                           color="var(--color-text-dark-gray)"
                                           right="0"
                                           :minWidth="120" :isCheckbox="false" :options="actions" ref="loseRange"
                                           @click="selectTypeLose">
                            <view class="item-top flex align-center justify-between">
                                <text class="font-12 color-gray">{{ $t('entrust.t14') }}</text>
                                <view class="tag-button flex align-center justify-between bg-gray" @tap="filterTap(1)">
                                    <text class="font-12 color-black font-weight">{{ actions[loseType] }}</text>
                                    <image src="/static/img/h0.png"></image>
                                </view>
                            </view>
                        </fui-dropdown-menu>
                        <view class="input-box flex align-center justify-between bg-gray">
                            <input type="text" v-model="losePprice" :disabled="loseType==0?true:false"
                                   :placeholder="loseType==0?$t('entrust.t18'):$t('entrust.t15')"
                                   class="color-black"
                                   placeholder-class="placeholder">
                            <text class="font-12 font-weight color-black">USDT</text>
                        </view>
                        <view class="mt-5">
                            <text class="font-10 color-gray">
                                {{ $t('entrust.t19') }}
                            </text>
                        </view>
                    </view>
                </view>
                <view class="cell-row">
                    <text class="font-14 color-black font-weight">{{ $t('entrust.t20') }}</text>
                    <view class="cell-row-input bg-gray flex flex-row align-center justify-between mt-5">
                        <input type="text" v-model="loseAmount" :placeholder="$t('entrust.t20')"
                               class="color-black"
                               placeholder-class="placeholder">
                        <text class="font-12 font-weight color-black">USDT</text>
                    </view>
                </view>
                <view class="slider-box">
                    <view class="slider-box-top">
                        <slider class="slider"
                                value="0"
                                backgroundColor="var(--color-gray-bg)"
                                @change="sliderChangeLose"
                                @changing="slideVal[1] = $event.detail.value"
                                block-color="var(--content-primary)"
                                block-size="20" step="1"/>
                        <view class="slider-points">
                            <text class="points" :class="slideVal[1]>=i?'active':''" v-for="i in [0,25,50,75,100]"
                                  :key="i"></text>
                        </view>
                    </view>
                    <view class="slider-box-bottom">
                        <text class="font-11 font-weight"
                              :class="slideVal[1]>=i?'color-black':'color-gray'"
                              v-for="i in [0,25,50,75,100]" :key="i">
                            {{ i + '%' }}
                        </text>
                    </view>
                </view>
                <view class="cell-row flex align-center justify-between">
                    <text class="font-12 color-gray">{{ $t('entrust.t21') }}</text>
                    <view class="flex align-center">
                        <text class="font-12 color-black font-weight">
                            {{ futures['amount'] }}/{{ futures['amount'] - futures['close'] }}
                            {{ futures['symbol'] }}
                        </text>
                    </view>
                </view>
                <view class="cell-row flex flex-row align-center justify-between">
                    <text class="font-12 color-gray">{{ $t('entrust.t22') }}</text>
                    <view class="flex align-center">
                        <text class="font-12 price_up font-weight">{{ getProfit(1) }} USDT</text>
                    </view>
                </view>
                <view style="width: 100%;height: 140rpx;"></view>
            </view>
            <view class="button-box">
                <fui-button @click="confirm" background="var(--content-primary)"
                            color="var(--background-primary)"
                            radius="78rpx" height="78rpx" size="26">
                    {{ $t('确定') }}
                </fui-button>
            </view>

            <uni-popup ref="showHelp" type="bottom">
                <view class="popup-wrap">
                    <view class="popup-title">
                        <text class="font-16 font-weight color-black">{{ $t('entrust.t28') }}</text>
                        <view class="close-icon">
                            <fui-icon @click="$refs.showHelp.close()" name="close" size="48"
                                      color="var(--black)"></fui-icon>
                        </view>
                    </view>
                    <view class="popup-content-box">
                        <view class="popup-content-box-cell">
                            <view>
                                <text class="font-14 font-weight color-black">1. {{ $t('entrust.t29') }}</text>
                            </view>
                            <view class="mt-5">
                                <text class="font-13 color-gray">
                                    {{ $t('entrust.t30') }}
                                </text>
                            </view>
                            <view class="mt-10">
                                <text class="font-14 font-weight color-black">2. {{ $t('entrust.t31') }}</text>
                            </view>
                            <view class="mt-5">
                                <text class="font-13 color-gray">
                                    {{ $t('entrust.t32') }}
                                </text>
                            </view>
                            <view class="mt-10">
                                <text class="font-14 font-weight color-black">3. {{ $t('entrust.t33') }}</text>
                            </view>
                            <view class="mt-5">
                                <text class="font-13 color-gray">
                                    {{ $t('entrust.t34') }}
                                </text>
                            </view>
                            <view class="mt-10">
                                <text class="font-14 font-weight color-black">4. {{ $t('entrust.t35') }}</text>
                            </view>
                            <view class="mt-5">
                                <text class="font-13 color-gray">
                                    {{ $t('entrust.t36') }}
                                </text>
                            </view>
                            <view class="bottom">
                                <fui-button @click="$refs.showHelp.close()"
                                            color="var(--background-primary)"
                                            background="var(--content-primary)"
                                            radius="78rpx" height="78rpx" size="26">
                                    {{ $t('entrust.t37') }}
                                </fui-button>
                            </view>
                        </view>
                    </view>
                </view>
            </uni-popup>
        </view>
        <loading ref="loading"></loading>
        <alert ref="alert" :content="content" :title="$t('login.tip_t2')"></alert>
    </view>
</template>

<script>
import {
    NavBar,
    Icon
} from 'vant';
import contractApi from '@/common/api/contract';

import {
    mapGetters
} from 'vuex';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon
    },
    data() {
        return {
            content: "",
            actions: [
                this.$t('entrust.t2'),
                this.$t('entrust.t3')
            ],
            futures: {},
            newPrice: '0.00',

            profitType: 0,
            profitPprice: "",
            profitPwrice: "",
            profitAmount: "",

            loseType: 0,
            losePprice: "",
            losePwprice: "",
            loseAmount: "",

            slideVal: [0, 0],
        }
    },
    onShow() {
        this.futures = uni.getStorageSync('futures-order');
    },
    onReady() {
        var _this = this;
        uni.$on('contract', (data) => {
            _this.onContractMessageHandler(data);
        });
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    methods: {
        filterTap(index) {
            if (index == 0) {
                this.$refs.numRange.show();
            }

            if (index == 1) {
                this.$refs.loseRange.show();
            }
        },
        confirm() {
            if (parseFloat(this.profitPwrice) <= 0 || this.profitPwrice == '') {
                this.content = this.$t('entrust.t24');
                this.$refs.alert.open();
                return false;
            }
            if (parseFloat(this.profitAmount) <= 0 || this.profitAmount == '') {
                this.content = this.$t('entrust.t25');
                this.$refs.alert.open();
                return false;
            }
            if (parseFloat(this.losePwprice) <= 0 || this.losePwprice == '') {
                this.content = this.$t('entrust.t26');
                this.$refs.alert.open();
                return false;
            }
            if (parseFloat(this.profitAmount) <= 0 || this.profitAmount == '') {
                this.content = this.$t('entrust.t27');
                this.$refs.alert.open();
                return false;
            }

            const form = {
                cid: this.futures['id'],
                profitType: this.profitType,
                profitPprice: this.profitPprice == '' ? 0 : this.profitPprice,
                profitPwprice: this.profitPwrice,
                profitAmount: this.profitAmount,
                loseType: this.loseType,
                losePprice: this.losePprice == '' ? 0 : this.losePprice,
                losePwrice: this.losePwprice,
                loseAmount: this.loseAmount,
				nowPrice: this.newPrice
            };
            console.log(form);
            this.$refs.loading.open();

            contractApi.limitProfit(form).then(res => {
                this.$refs.loading.close();
                if (res.code != 200) {
                    this.content = res.message;
                } else {
                    this.content = this.$t('entrust.t4');
                }
                this.profitAmount = '';
                this.profitPprice = '';
                this.profitPwrice = '';
                this.loseAmount = '';
                this.losePprice = '';
                this.losePwprice = '';
                this.$refs.alert.open();
            }).catch((e) => {
                this.$refs.loading.close();
                this.content = this.$t('common.error');
                this.$refs.alert.open();
            })

        },
        sliderChangeLose(e) {
            const amount = parseFloat(this.futures['amount']) - parseFloat(this.futures['close']);
            this.loseAmount = parseFloat(amount * e.detail.value / 100).toFixed(8);
        },
        getProfit(t) {
            if (t === 0) {
                if (this.profitPwrice === '' && this.profitType === 0) {
                    return '0.00';
                }
                if (this.profitType === 0) {
                    var newPrice = this.profitPwrice;
                } else {
                    var newPrice = this.profitPprice;
                }
                var amount = this.profitAmount;
            } else {
                if (this.losePwprice === '' && this.profitType === 0) {
                    return '0.00';
                }
                if (this.loseType === 0) {
                    var newPrice = this.losePwprice;
                } else {
                    var newPrice = this.losePprice;
                }
                var amount = this.loseAmount;
            }

            var o = parseFloat(this.futures['price']);
            var d = parseInt(this.futures['direction']);
            if (d === 1) {
                var p = this.$util.thousandSeparator(amount * (newPrice - o), 4);
            } else {
                var p = this.$util.thousandSeparator(amount * (o - newPrice), 4);
            }
            return p > 0 ? '+ ' + p : p;
        },
        sliderChange(e) {
            const amount = parseFloat(this.futures['amount']) - parseFloat(this.futures['close']);
            this.profitAmount = parseFloat(amount * e.detail.value / 100).toFixed(8);
        },
        selectTypeLose(e) {
            console.log(e);
            if (e.index == 0) {
                this.losePprice = '';
            }
            this.loseType = e.index;
        },
        selectType(e) {
            if (e.index == 0) {
                this.profitPprice = '';
            }
            this.profitType = e.index;
        },
        onContractMessageHandler(data) {
            if (data.type == 200) {
                var ticker = data.data.data[this.futures['currency_id'].toString()];
                if (typeof ticker === 'undefined' || ticker == '') {
                    return;
                }

                this.newPrice = ticker['c'];
            }
            // if (data.type == 200 && data.data.currency_id === this.futures['currency_id']) {
            //     this.newPrice = data.data.data.c;
            // }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "entrust.scss";
</style>

<style scoped>
/deep/ .fui-ddm__down {
    transform-origin: center top;
    animation: ddDownHide 0.5s forwards;
}

/deep/ .fui-ddm__down-show {
    transform: translateY(105%) scale(1);
    transform-origin: center top;
    animation: ddmDownShow 0.5s forwards;
}

@keyframes ddDownHide {
    0% {
        transform: translateY(105%) scale(1);
    }

    100% {
        transform: translateY(105%) scale(0);
    }
}

@keyframes ddmDownShow {
    0% {
        transform: translateY(105%) scale(0);
    }

    50% {
        transform: translateY(105%) scale(1);
    }

    75% {
        transform: translateY(105%) scale(0.9);
    }

    100% {
        transform: translateY(105%) scale(1);
    }
}

/deep/ .fui-tabs__item {
    padding: 0 50rpx 0 0 !important;
}

/deep/ .fui-dropdown__menu-list {
    margin-top: 20rpx;
    padding: 10rpx;
    box-sizing: border-box;
}

/deep/ .fui-dropdown__menu-item {
    background-color: transparent;
    border-radius: 10rpx;
}

/deep/ .fui-dropdown__menu-list .fui-dropdown__menu-item:active {
    background-color: var(--color-gray-bg) !important;
}

/deep/ .uni-slider-handle-wrapper {
    height: 8rpx;
}

/deep/ .uni-slider-thumb {
    width: 16rpx !important;
    height: 20rpx !important;
    margin-top: -16rpx !important;
    border: 6rpx solid var(--white);
    border-radius: 4rpx !important;
}
</style>