<template>
    <view class="info" :data-theme="userTheme">
        <fui-nav-bar zIndex="9"
                     background="var(--background-primary)"
                     statusBar
                     isFixed
                     isOccupy
                     custom>
            <view class="nav-bar">
                <view class="nav-bar-left">
                    <fui-icon @click="$mroute.back()"
                              name="arrowleft"
                              size="56"
                              color="var(--content-primary)">
                    </fui-icon>
                </view>
                <view class="nav-bar-title">
                    <image src="/static/coin/usdt.png"></image>
                    <text class="font-16 color-black font-weight">1INCH</text>
                </view>
            </view>
        </fui-nav-bar>
        <view class="info-container">
            <view class="info-container-top">
                <text class="font-12 color-gray font-weight">总额</text>
                <text class="font-24 color-black font-bold price">0.00</text>
                <text class="font-12 color-gray">≈¥ 0.00</text>
                <view class="info-container-group mt-15">
                    <view class="info-container-group-item">
                        <text class="font-12 color-gray font-weight">可用</text>
                        <text class="font-16 color-black font-weight">0.00</text>
                        <text class="font-12 color-gray">≈¥ 0.00</text>
                    </view>
                    <view class="info-container-group-item">
                        <text class="font-12 color-gray font-weight">冻结</text>
                        <text class="font-16 color-black font-weight">0.00</text>
                        <text class="font-12 color-gray">≈¥ 0.00</text>
                    </view>
                </view>
            </view>
            <view class="info-container-title">
                <text class="font-14 color-black font-weight">去交易</text>
            </view>
            <view class="info-container-group">
                <view class="info-container-group-item">
                    <text class="font-12 color-gray font-weight">现货</text>
                    <text class="font-16 color-black font-weight">1INCH/USDT</text>
                    <view class="info-container-group-item-row">
                        <text class="font-12 color-gray">0.286651</text>
                        <text class="font-13 price_down font-weight">-2.33%</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="info-footer">
            <view class="info-footer-item">
                <image :src="`/static/wallet/tx-${userTheme}.png`"
                       mode="widthFix">
                </image>
                <text class="font-12 color-black font-weight">
                    {{ $t('wallet.withdraw') }}
                </text>
            </view>
            <view class="info-footer-item">
                <image :src="`/static/wallet/cz-${userTheme}.png`"
                       mode="widthFix">
                </image>
                <text class="font-12 color-black font-weight">
                    {{ $t('wallet.desposit') }}
                </text>
            </view>
            <view class="info-footer-item">
                <image :src="`/static/wallet/hz-${userTheme}.png`"
                       mode="widthFix">
                </image>
                <text class="font-12 color-black font-weight">
                    {{ $t('wallet.transfer') }}
                </text>
            </view>
            <view class="info-footer-item">
                <view class="order-box">
                    <image :src="`/static/img/tactic/order-${userTheme}.png`"
                           mode="widthFix">
                    </image>
                </view>
                <text class="font-12 color-black font-weight">
                    {{ $t('wallet.transactions') }}
                </text>
            </view>
        </view>
    </view>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex';

export default {
    data() {
        return {
            coinInfo: []
        }
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    onLoad(e) {
        this.coinInfo = e.item;
        console.log(JSON.stringify(e.item))
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
.info {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    .nav-bar {
        width: 100%;
        height: 88rpx;
        display: flex;
        align-items: center;

        &-left {
            width: 25%;
        }

        &-title {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            image {
                width: 40rpx;
                height: 40rpx;
                margin-right: 24rpx;
            }
        }
    }

    &-container {
        width: 100%;
        height: auto;
        padding: 30rpx;
        box-sizing: border-box;

        &-title {
            width: 100%;
            height: 88rpx;
            display: flex;
            align-items: center;
        }

        &-top {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .price {
                margin: 8rpx 0;
            }
        }

        &-group {
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;

            &-item {
                width: calc(50% - 8rpx);
                height: auto;
                padding: 24rpx;
                box-sizing: border-box;
                border-radius: 16rpx;
                background: var(--background-secondary);
                display: inline-flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                margin-bottom: 16rpx;

                &-row {
                    width: 100%;
                    height: 30rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                text {
                    &:nth-of-type(2) {
                        margin: 10rpx 0;
                    }
                }
            }
        }
    }

    &-footer {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 24rpx 30rpx;
        box-sizing: border-box;

        &-item {
            width: calc(100% / 4);
            display: flex;
            flex-direction: column;
            align-items: center;

            image {
                width: 60rpx;
                height: 60rpx;
                margin-bottom: 12rpx;
            }

            .order-box {
                width: 60rpx;
                height: 60rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                margin-bottom: 12rpx;
                border: 1rpx solid var(--border-strength-100);

                image {
                    width: 30rpx;
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>