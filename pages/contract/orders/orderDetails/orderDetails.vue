<template>
    <view class="detail-warp" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     zIndex="9"
                     title="订单详情"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     @init="navInit"
                     @left-click="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="detail-body">
            <view class="card">
                <view class="row">
                    <text class="price_down">爆仓平多</text>
                    <text class="price_down">100X</text>
                    <text>BTCUSDT</text>
                    <text class="tag">
                        全仓
                    </text>
                    <text class="tag">
                        USDT
                    </text>
                </view>
                <view class="row">
                    <text>
                        成交均价(USDT)
                    </text>
                    <text>
                        42,079.9
                    </text>
                </view>
                <view class="row">
                    <text>
                        成交数量(BTC)
                    </text>
                    <text>
                        0.652
                    </text>
                </view>
                <view class="row">
                    <text>
                        强平价格(USDT)
                    </text>
                    <text>
                        42,084.4
                    </text>
                </view>
                <view class="row">
                    <text>
                        状态
                    </text>
                    <text>
                        完全成交
                    </text>
                </view>
                <view class="row">
                    <text>
                        订单类型
                    </text>
                    <text>
                        GTC
                    </text>
                </view>
                <view class="row">
                    <text>
                        委托类型
                    </text>
                    <text>
                        市价普通
                    </text>
                </view>
                <view class="row">
                    <text>
                        委托时间
                    </text>
                    <text>
                        2023-12-18 01:52:25
                    </text>
                </view>
                <view class="row">
                    <text>
                        手续费(USDT)
                    </text>
                    <text>
                        16.46165688
                    </text>
                </view>
                <view class="row">
                    <text>
                        订单编号
                    </text>
                    <text>
                        11203279879878945465465465
                    </text>
                </view>
            </view>
            <view class="card">
                <view class="row">
                    <text>成交明细</text>
                </view>
                <view class="row">
                    <text>
                        成交价(USDT)
                    </text>
                    <text>
                        42,079.9
                    </text>
                </view>
                <view class="row">
                    <text>
                        成交数量(BTC)
                    </text>
                    <text>
                        0.652
                    </text>
                </view>
                <view class="row">
                    <text>
                        手续费(USDT)
                    </text>
                    <text>
                        16.46165688
                    </text>
                </view>
                <view class="row">
                    <text>
                        流动性方向
                    </text>
                    <text>
                        吃单
                    </text>
                </view>
                <view class="row">
                    <text>
                        时间
                    </text>
                    <text>
                        2023-12-18 01:52:25
                    </text>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import {
    mapGetters
} from 'vuex';

export default {
    computed: {
        ...mapGetters(['userTheme'])
    },
    data() {
        return {}
    },
    methods: {
        navInit(e) {
            this.navBarHeight = e.height + e.statusBarHeight;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "orderDetails";
</style>