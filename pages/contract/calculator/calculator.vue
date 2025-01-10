<template>
    <view class="calculator" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     statusBar
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('calc.t1')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      :color="'var(--content-primary)'">
            </fui-icon>
        </fui-nav-bar>
        <view class="content">
            <view class="content-row-box flex align-center">
                <view class="flex align-center" @click="$mroute.toSelectCoin()">
                    <text class="font-15 color-black font-bold">
                        {{ current ? current['symbol'] : 'BTC' }}USDT 永续
                    </text>
                    <image :src="`/static/img/tactic/down-${userTheme}.png`"
                           mode="widthFix">
                    </image>
                </view>
            </view>
            <view class="content-row-box content-row-slider-button flex align-center mt-15">
                <scroll-view class="scroll-button"
                             enable-flex="true"
                             show-scrollbar="false"
                             scroll-with-animation="true"
                             :scroll-into-view="`scrollTab${active}`">
                    <view class="item"
                          :id="`scrollTab${index}`"
                          :class="{'itemActive': active == index}"
                          v-for="(item,index) in tabOptions"
                          @click="active = index">
                        <text class="font-13 font-weight"
                              :class="active == index ? 'color-black' : 'color-gray'">
                            {{ item }}
                        </text>
                    </view>
                </scroll-view>
            </view>
            <!-- direction -->
            <view class="content-row-box flex align-center justify-between mt-15">
                <text class="font-13 color-gray">{{ $t('calc.t4') }}</text>
                <view class="mini-buttons">
                    <view class="item"
                          :class="{'itemActive': direction == index}"
                          v-for="(item, index) in directionOption" :key="index"
                          @click="direction = index">
                        <text class="font-13 font-weight"
                              :class="direction == index ? 'color-black' : 'color-gray'">
                            {{ item }}
                        </text>
                    </view>
                </view>
            </view>
            <view class="content-row-box content-number-input flex align-center justify-between mt-15">
                <view class="input-box flex align-center justify-between bg-gray">
                    <view class="input-box-left flex align-center justify-between">
                        <text class="font-13 color-gray">
                            杠杆倍数
                        </text>
                        <input type="text"
                               v-model="mutil"
                               class="color-black font-weight font-13"
                               placeholder-class="placeholder">
                    </view>
                    <text class="font-13 color-black font-weight">倍</text>
                </view>
            </view>
            <view class="content-row-box content-row-slider mt-15">
                <view class="slider-box">
                    <view class="slider-dot">
                        <view class="active-box" :style="`width: ${mutil*1}%`"></view>
                        <view class="dot" v-for="item in [1,20,40,60,80,100]"></view>
                    </view>
                    <view class="slider">
                        <slider activeColor="transparent"
                                backgroundColor="transparent"
                                block-color="var(--background-primary)"
                                block-size="12"
                                :max="100"
                                :min="1"
                                :value="mutil"
                                step="1"
                                @change="changeMutil"
                                @changing="changeMutil"/>
                    </view>
                    <view class="slider-number">
                        <text class="font-10"
                              :class="mutil >= item ? 'color-black' : 'color-gray'"
                              v-for="item in [1,20,40,60,80,100]">
                            {{ item }}X
                        </text>
                    </view>
                </view>
            </view>

            <view class="content-row-box flex align-center mt-15">
                <text class="font-12 color-gray">{{ $t('calc.t7') }}</text>
                <text class="font-12 color-black font-weight ml-5">20 {{ current ? current['symbol'] : 'BTC' }}</text>
            </view>
            <view class="content-row-box mt-15">
                <view class="input-box flex align-center justify-between bg-gray">
                    <view class="input-box-left flex align-center justify-between">
                        <text class="font-13 color-gray">{{ $t('calc.t8') }}</text>
                        <input type="text"
                               v-model="open"
                               class="color-black font-weight font-13"
                               :placeholder="$t('calc.t9')"
                               placeholder-class="placeholder">
                    </view>
                    <text class="font-13 color-black font-weight">USDT</text>
                </view>
            </view>
            <view class="content-row-box mt-15">
                <view class="input-box flex align-center justify-between bg-gray">
                    <view class="input-box-left flex align-center justify-between">
                        <text class="font-13 color-gray" v-if="active == 0">
                            {{ $t('calc.t10') }}
                        </text>
                        <text class="font-13 color-gray" v-if="active == 1">
                            {{ $t('calc.t11') }}
                        </text>
                        <input type="text"
                               v-model="close"
                               class="color-black font-weight font-13"
                               :placeholder="$t('calc.t9')"
                               placeholder-class="placeholder">
                    </view>
                    <text class="font-13 color-black font-weight">
                        {{ active == 0 ? 'USDT' : current ? current['symbol'] : 'BTC' }}
                    </text>
                </view>
            </view>
            <view class="content-row-box mt-15">
                <view class="input-box flex align-center justify-between bg-gray">
                    <view class="input-box-left flex align-center justify-between">
                        <text class="font-13 color-gray" v-if="active == 0">
                            {{ $t('calc.t12') }}
                        </text>
                        <text class="font-13 color-gray" v-if="active == 1">
                            {{ $t('calc.t13') }}
                        </text>
                        <input type="text"
                               v-model="amount"
                               class="color-black font-weight font-13"
                               :placeholder="$t('calc.t9')"
                               placeholder-class="placeholder">
                    </view>
                    <text class="font-13 color-black font-weight">{{ current ? current['symbol'] : 'BTC' }}</text>
                </view>
            </view>
            <view class="consequence-card">
                <view class="consequence">
                    <view class="cell">
                        <text class="font-15 color-black font-weight">{{ $t('calc.t14') }}</text>
                    </view>
                    <view v-if="active == 0">
                        <view class="cell">
                            <text class="font-12 color-gray">{{ $t('calc.t15') }}</text>
                            <text class="font-12 font-weight color-black">
                                {{ $util.thousandSeparator(getMargin()) }} USDT
                            </text>
                        </view>
                        <view class="cell">
                            <text class="font-12 color-gray">{{ $t('calc.t16') }}</text>
                            <text class="font-12 font-weight color-black">{{ $util.thousandSeparator(getProfit()) }}
                                USDT
                            </text>
                        </view>
                        <view class="cell">
                            <text class="font-12 color-gray">{{ $t('calc.t17') }}</text>
                            <text class="font-12 font-weight color-black">
                                {{ $util.thousandSeparator(getProfit() / getMargin() * 100) }}%
                            </text>
                        </view>
                    </view>
                    <view class="cell" v-if="active == 1">
                        <text class="font-12 color-gray">{{ $t('calc.t18') }}</text>
                        <text class="font-12 font-weight color-black">{{ $util.thousandSeparator(getPrice()) }}
                            USDT
                        </text>
                    </view>
                </view>
            </view>
            <view class="content-row-box">
                <text class="font-12 color-gray">
                    {{ $t('calc.t19') }}
                </text>
            </view>
            <view class="content_bottom mt-15">
                <fui-button background="var(--content-primary)"
                            color=var(--background-primary)
                            size="26"
                            height="78rpx"
                            radius="78rpx">
                    {{ $t('calc.t20') }}
                </fui-button>
            </view>
        </view>
    </view>
</template>

<script>
import slideButton from "@/components/slide-button/slide-button.vue";

import {mapGetters} from 'vuex';

export default {
    components: {
        slideButton
    },
    data() {
        return {
            tabOptions: [
                this.$t('calc.t2'),
                this.$t('calc.t3')
            ],
            directionOption: [
                this.$t('calc.t5'),
                this.$t('calc.t6')
            ],
            searchValue: "",
            active: 0,
            direction: 0,
            mutil: 1,
            amount: 1,//开仓数量
            open: 0,//开仓价格
            close: 0,//平仓价格
            result: 0,
            current: false
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    onReady() {
        let _this = this;
        uni.$on('setC', (coin) => {
            console.log(coin);
            _this.current = coin;
        });
    },
    methods: {
        changeMutil(e) {
            // console.log(e)
            this.mutil = e.detail.value;
        },
        getMargin() {
            try {
                return parseFloat(this.open * this.amount / this.mutil).toFixed(2);
            } catch (e) {
                return '--';
            }
        },
        getProfit() {
            try {
                if (this.direction == 0) {
                    return parseFloat((this.close - this.open) * this.amount).toFixed(2);
                } else {
                    return parseFloat((this.open - this.close) * this.amount).toFixed(2);
                }
            } catch (e) {
                return '--';
            }
        },
        getPrice() {
            //强平价格=开仓价格 - 保证金 / 开仓数量
            try {
                if (this.direction == 0) {
                    return parseFloat(this.open - (this.open / this.mutil / this.close)).toFixed(2);
                } else {
                    return parseFloat(this.open + (this.open / this.mutil / this.close)).toFixed(2);
                }
            } catch (e) {
                return '--';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "calculator.scss";
</style>

<style>
/deep/ .fui-number__input {
    border-radius: 10rpx !important;
}
/* Slider 滑块 */
/deep/ uni-slider .uni-slider-handle,
/deep/ uni-slider .uni-slider-thumb {
    border-radius: 50% !important;
    box-shadow: 0 0 0 transparent !important;
}

/deep/ uni-slider .uni-slider-thumb {
    border: 4rpx solid var(--border-strength-100) !important;
}

/deep/ .uni-slider-handle-wrapper {
    height: 10rpx !important;
    border-radius: 0;
}

/deep/ .uni-slider-track {
    height: 10rpx !important;
    border-radius: 0;
}
</style>
