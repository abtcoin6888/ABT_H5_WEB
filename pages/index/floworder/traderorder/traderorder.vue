<template>
    <view class="traderOrder" :data-theme="userTheme">
        <fui-nav-bar zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('tradeOrder.with_spm')"
                     statusBar
                     isFixed
                     isOccupy
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>

        <view class="traderOrder-body">
            <view class="body-tabs">
                <fui-tabs scroll
                          alignLeft
                          color="var(--content-tertiary)"
                          selectedSize="28"
                          selectedColor="var(--content-primary)"
                          height="88"
                          scale="1"
                          background="var(--background-primary)"
                          sliderBackground="var(--content-primary)"
                          :short="false"
                          :tabs="items"
                          :current="current"
                          @change="current = $event.index">
                </fui-tabs>
            </view>
            <view class="body-card">
                <view class="body-card-head">
                    <view class="flex align-center justify-between">
                        <text class="font-13 color-gray">
                            {{ $t('follow.cpd') }}(USDT)
                        </text>
                        <text class="font-13 color-gray">
                            {{ $t('tradeOrder.current_psr') }}
                        </text>
                    </view>
                    <view class="flex align-center justify-between mt-5">
                        <text class="font-18 always-white font-weight">
                            0.00
                        </text>
                        <text class="font-18 always-white font-weight">
                            10%
                        </text>
                    </view>
                </view>
                <view class="body-card-bottom">
                    <view class="flex flex-column item">
                        <text class="font-13 color-gray">
                            {{ $t('follow.expected_divided') }}(USDT)
                        </text>
                        <text class="font-18 always-white font-weight mt-5">
                            +0.00
                        </text>
                    </view>
                    <view class="flex flex-column item">
                        <text class="font-13 color-gray">
                            {{ $t('tradeOrder.yesterday_pd') }}(USDT)
                        </text>
                        <text class="font-18 always-white font-weight mt-5">
                            +0.00
                        </text>
                    </view>
                </view>
            </view>
            <view class="body-tabs">
                <fui-tabs scroll
                          alignLeft
                          color="var(--content-tertiary)"
                          selectedSize="28"
                          selectedColor="var(--content-primary)"
                          height="88"
                          scale="1"
                          background="var(--background-primary)"
                          sliderBackground="var(--content-primary)"
                          :short="false"
                          :tabs="menus"
                          :current="tab"
                          @change="tab = $event.index">
                </fui-tabs>
            </view>
            <view class="body-list">
                <view class="not-data">
                    <fui-empty width="200"
                               height="200"
                               size="26"
                               color="var(--content-tertiary)"
                               src="/static/newImage/not-order.png"
                               :title="$t('list.not_data')">
                    </fui-empty>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import {mapGetters} from 'vuex';
import {NavBar, Icon} from 'vant';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";
import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue";

export default {
    components: {
        fuiEmpty,
        fuiNavBar,
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
    },
    data() {
        return {
            current: 0,
            items: [this.$t('follow.contract'), this.$t('follow.spot_goods')],
            activeColor: '#000',
            tab: 0,
            menus: [this.$t('tradeOrder.profit_details'), this.$t('tradeOrder.historical_profit')],
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {}
}
</script>

<style>
.tradeBg {
    background: url("/static/img/beijing2.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 7.5px;
}
</style>

<style lang="scss" scoped>
@import "traderorder";
</style>

<style scoped>
/deep/ .fui-tabs__item {
    padding-left: 0;
    padding-right: 40rpx;
}
</style>
