<template>
    <view class="wallet" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     :title="$t('recod.t1')"
                     zIndex="9"
                     background="var(--color-gray-bg)"
                     color="var(--black)"
                     @leftClick="$mroute.back()"
                     custom
                     @init="navInit">
            <view class="nav-bar">
                <view class="nav-bar-left">
                    <text class="font-16 color-black font-weight">
                        {{ $t('simulation.title') }}
                    </text>
                </view>
                <view class="nav-bar-right">
                    <fui-button width="140rpx"
                                height="58rpx"
                                radius="10rpx"
                                size="26"
                                background="var(--blue)"
                                :text="$t('simulation.firm_offer')"
                                @click="backHome()">
                    </fui-button>
                </view>
            </view>
        </fui-nav-bar>

        <view class="wallet-body">
            <view class="wallet-body-head">
                <!-- 资产 -->
                <view class="asset">
                    <view class="asset-cell">
                        <text class="font-12 color-gray">
                            {{ $t('index.asset') }}(USDT)
                        </text>
                        <fui-icon :name="show ? 'visible' : 'invisible'"
                                  size="38"
                                  color="var(--color-text-dark-gray)"
                                  @click="show = !show">
                        </fui-icon>
                    </view>
                    <view class="asset-cell">
                        <text class="font-18 color-white font-weight">
                            {{ show ? '1000.00' : '*****' }}
                        </text>
                    </view>
                    <view class="asset-cell">
                        <text class="font-12 color-gray">
                            {{ show ? '¥7021.00' : '*****' }}
                        </text>
                    </view>
                </view>
                <!-- 菜单 -->
                <view class="menu">
                    <view class="menu-item" @click="$mroute.cashflow()">
                        <image :src="`/static/newImage/flow-${userTheme}.png`" mode="widthFix"></image>
                        <text class="font-12 color-black">
                            {{ $t('wallet.capital_flow') }}
                        </text>
                    </view>
                </view>
            </view>
            <view class="wallet-body-bottom">
                <view class="list">
                    <view class="list-item"
                          v-for="i in 10"
                          @click="$mroute.walletInfo()">
                        <view class="flex align-center">
                            <image src="/static/coin/usdt.png" mode="widthFix"></image>
                            <text class="font-14 color-black font-weight">
                                USDT
                            </text>
                        </view>
                        <view class="flex flex-column justify-end align-end">
                            <text class="font-13 color-black">
                                100.00
                            </text>
                            <text class="font-12 color-gray mt-5">
                                ¥7021.00
                            </text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import {mapGetters} from 'vuex';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";

export default {
    components: {fuiNavBar},
    data() {
        return {
            show: true
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
@import "wallet";
</style>
