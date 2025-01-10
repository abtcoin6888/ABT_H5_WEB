<template>
    <view class="confirm" :data-theme="userTheme">
        <fui-nav-bar zIndex="9"
                     :padding="15"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('confirm.nav_title')"
                     statusBar isFixed isOccupy
                     @leftClick="$mroute.back()"
                     @rightClick="">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
            <template v-slot:right>
                <text class="font-12 color-black">
                    {{ $t('confirm.r_txt') }}
                </text>
            </template>
        </fui-nav-bar>

        <view class="confirm-body">
            <view class="confirm-body-head">
                <view class="confirm-body-head-user">
                    <view class="flex flex-column">
                        <text class="font-16 color-black font-bold">
                            TradersName
                        </text>
                        <text class="font-13 color-gray mt-10">
                            {{ $t('confirm.profit_ratio') }} 10%
                        </text>
                    </view>
                    <fui-avatar width="100"
                                height="100"
                                background="var(--background-secondary)"
                                src="/static/img/davatar.webp">
                    </fui-avatar>
                </view>
                <view class="confirm-body-head-contract">
                    <view class="flex align-center justify-between">
                        <text class="font-13 color-black font-weight">
                            {{ $t('follow.contract') }}
                        </text>
                        <text class="font-13 color-primary font-weight">
                            {{ $t('confirm.select_all') }}
                        </text>
                    </view>
                    <view class="tag-group">
                        <view class="tag-items"
                              :class="choose.indexOf(0) !== -1 ? 'tag-items-active' : ''">
                            <text class="font-13"
                                  :class="choose.indexOf(0) !== -1 ? 'color-primary' : 'color-black'">
                                BTCUSDT
                            </text>
                        </view>
                        <view class="tag-items"
                              :class="choose.indexOf(1) !== -1 ? 'tag-items-active' : ''">
                            <text class="font-13"
                                  :class="choose.indexOf(1) !== -1 ? 'color-primary' : 'color-black'">
                                ETHUSDT
                            </text>
                        </view>
                    </view>
                </view>
            </view>

            <!--   跟单模式   -->
            <view class="confirm-body-label">
                <view class="label-cell">
                    <text class="font-13 color-black font-weight">
                        {{ $t('confirm.copy_mode') }}
                    </text>
                </view>
                <view class="label-tabs">
                    <view class="label-tabs-item"
                          :class="current === index ? 'label-tabs-item-active' : ''"
                          v-for="(item,index) in items" :key="index"
                          @click="current = index">
                        <text class="font-13"
                              :class="current === index ? 'color-black' : 'color-gray'">
                            {{ item }}
                        </text>
                    </view>
                </view>
                <view class="label-input" type="flower">
                    <input type="number" :placeholder="$t('confirm.enter_amount')" placeholder-class="placeholder">
                    <text class="font-13 color-black font-weight">USDT</text>
                </view>
                <view class="label-tips">
                    <text class="font-12 color-gray">
                        {{ $t('confirm.enter_at1') }}
                        <text class="font-12 color-black mr-5 ml-5">
                            2430 USDT
                        </text>
                        {{ $t('confirm.enter_at2') }}
                    </text>
                </view>
            </view>
            <!--   风险控制   -->
            <view class="confirm-body-label">
                <view class="label-cell">
                    <view class="flex align-center">
                        <text class="font-13 color-black font-weight mr-5">
                            {{ $t('confirm.risk_control') }}
                        </text>
                        <fui-icon @click="showPopup = true"
                                  name="help-fill"
                                  size="32"
                                  color="var(--content-tertiary)">
                        </fui-icon>
                    </view>
                </view>
            </view>
            <!--   止损比例   -->
            <view class="confirm-body-label">
                <view class="label-cell">
                    <text class="font-13 color-black font-weight mr-5">
                        {{ $t('confirm.stop_loss') }}
                    </text>
                </view>
                <view class="label-input" type="flower">
                    <input type="number" :placeholder="$t('confirm.enter_stopLoss')" placeholder-class="placeholder">
                    <text class="font-13 color-black font-weight">%</text>
                </view>
                <view class="label-tips">
                    <text class="font-12 color-gray">
                        {{ $t('confirm.stop_loss_tip1') }}
                        <text class="font-12 color-black mr-5 ml-5">
                            0%
                        </text>
                        {{ $t('confirm.stop_loss_tip2') }}
                    </text>
                </view>
            </view>
            <!--   止盈比例   -->
            <view class="confirm-body-label">
                <view class="label-cell">
                    <text class="font-13 color-black font-weight mr-5">
                        {{ $t('confirm.take_pr') }}
                    </text>
                </view>
                <view class="label-input" type="flower">
                    <input type="number" :placeholder="$t('confirm.enter_takepl')" placeholder-class="placeholder">
                    <text class="font-13 color-black font-weight">%</text>
                </view>
                <view class="label-tips">
                    <text class="font-12 color-gray">
                        {{ $t('confirm.take_tip1') }}
                        <text class="font-12 color-black mr-5 ml-5">
                            0%
                        </text>
                        {{ $t('confirm.take_tip2') }}
                    </text>
                </view>
            </view>
            <!--   最大跟随   -->
            <view class="confirm-body-label">
                <view class="label-cell">
                    <text class="font-13 color-black font-weight mr-5">
                        {{ $t('confirm.max_fo') }}
                    </text>
                </view>
                <view class="label-input" type="flower">
                    <input type="number" :placeholder="$t('confirm.enter_max')" placeholder-class="placeholder">
                    <text class="font-13 color-black font-weight">%</text>
                </view>
                <view class="label-tips">
                    <text class="font-12 color-gray">
                        {{ $t('confirm.max_fo_in') }}
                        <text class="font-12 color-black mr-5 ml-5">
                            0
                        </text>
                    </text>
                </view>
            </view>
        </view>

        <view class="footer-button">
            <fui-button height="78rpx"
                        radius="78rpx"
                        size="26"
                        color="var(--background-primary)"
                        background="var(--content-primary)"
                        :text="$t('confirm.now_fo')">
            </fui-button>
        </view>

        <fui-bottom-popup background="var(--background-primary)" radius="30" :show="showPopup" @close="showPopup = false">
            <view class="popup-wrap">
                <view class="popup-wrap-title">
                    <text class="font-16 color-black font-weight">
                        {{ $t('confirm.risk_control') }}
                    </text>
                    <view class="close" @click="showPopup = false">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popup-wrap-content">
                    <view class="content-cell">
                        <text class="font-14 color-black font-weight">
                            {{ $t('confirm.stop_loss') }}
                        </text>
                        <text class="font-12 color-gray">
                            {{ $t('confirm.pop_c1') }}
                        </text>
                    </view>
                    <view class="content-cell">
                        <text class="font-14 color-black font-weight">
                            {{ $t('confirm.take_pr') }}
                        </text>
                        <text class="font-12 color-gray">
                            {{ $t('confirm.pop_c2') }}
                        </text>
                    </view>
                    <view class="content-cell">
                        <text class="font-14 color-black font-weight">
                            {{ $t('confirm.max_fo') }}
                        </text>
                        <text class="font-12 color-gray">
                            {{ $t('confirm.pop_c3') }}
                        </text>
                    </view>
                    <view class="content-cell">
                        <fui-button height="78rpx"
                                    radius="78rpx"
                                    size="26"
                                    color="var(--background-primary)"
                                    background="var(--content-primary)"
                                    :text="$t('follow.see_t')"
                                    @click="showPopup = false">
                        </fui-button>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
    </view>
</template>

<script>
import {mapGetters} from 'vuex';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";

export default {
    components: {fuiNavBar},
    data() {
        return {
            choose: [0],
            items: [this.$t('confirm.fixed_amount'), this.$t('confirm.magnification')],
            current: 0,
            styleType: 'button',
            activeColor: '#2979ff',
            showPopup: false
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
@import "confirm";
</style>
