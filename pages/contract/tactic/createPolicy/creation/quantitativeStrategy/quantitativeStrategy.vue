<template>
    <!--   策略量化 -->
    <view class="quantitativeStrategy">
        <scroll-view scroll-y="true"
                     class="scroll-view"
                     :style="`height: ${scrollHeight}px`">
            <view class="tabs">
                <view class="tabs">
                    <view class="item" :class="{'item-active': tabActive == 0}" @click="tabActive = 0">
                        <text>做多</text>
                        <image v-if="tabActive == 0" :src="`/static/img/tactic/button-bg/zd-s.png`"></image>
                        <image v-else :src="`/static/img/tactic/button-bg/zd-n-${userTheme}.png`"></image>
                    </view>
                    <view class="item" :class="{'item-active': tabActive == 1}" @click="tabActive = 1">
                        <text>做空</text>
                        <image v-if="tabActive == 1" :src="`/static/img/tactic/button-bg/zk-s.png`"></image>
                        <image v-else :src="`/static/img/tactic/button-bg/zk-n-${userTheme}.png`"></image>
                    </view>
                    <view class="item" :class="{'item-active': tabActive == 2}" @click="tabActive = 2">
                        <text>中性</text>
                        <image v-if="tabActive == 2"
                               :src="`/static/img/tactic/button-bg/zx-s-${userTheme}.png`"></image>
                        <image v-else :src="`/static/img/tactic/button-bg/zx-n-${userTheme}.png`"></image>
                    </view>
                </view>
            </view>
            <view class="kline-warp">
                <view class="kline-head">
                    <view class="kline-head-row">
                        <text>收益走势</text>
                        <view class="select-box" @click="menuShow = !menuShow">
                            <text>{{ timeSelected }}</text>
                            <fui-icon name="turningdown"
                                      size="28"
                                      color="var(--color-primary)">
                            </fui-icon>
                        </view>
                    </view>
                    <view class="fiex-menu" :class="{'fiex-menu-show': menuShow}">
                        <view class="item"
                              :class="{'item-active': menuActive == index}"
                              v-for="(item,index) in timeMenu" :key="index"
                              @click="menuChange(item,index)">
                            <text>{{ item }}</text>
                        </view>
                    </view>
                    <view class="kline-head-row">
                        <text class="color-primary">8.91%</text>
                    </view>
                </view>
                <view class="kline-box">

                </view>
            </view>
            <view class="content-box">
                <view class="row">
                    <text>适用行情</text>
                    <text>上升趋势行情</text>
                </view>
                <view class="row">
                    <text>使用人数</text>
                    <text>727</text>
                </view>
                <view class="row">
                    <text>投资币种</text>
                    <text>BTC/ETH</text>
                </view>
                <view class="row">
                    <text>收益率</text>
                    <text>8.90%</text>
                </view>
                <view class="row">
                    <text>最大回撤</text>
                    <text>16.03%</text>
                </view>
                <view class="row">
                    <text>交易次数/胜率</text>
                    <text>475次 / 86.00%</text>
                </view>
            </view>
            <view class="label-box">
                <view class="label-title">
                    <text>保证金</text>
                    <view class="select-box" @click="visible = true">
                        <text>10X</text>
                        <fui-icon name="turningdown"
                                  size="28"
                                  color="var(--color-primary)">
                        </fui-icon>
                    </view>
                </view>
                <view class="label-input">
                    <input type="text">
                    <text>USDT</text>
                </view>
                <view class="tips">
                    <text>USDT余额不足</text>
                </view>
                <view class="slide-box">
                    <slider :value="sliderVal"
                            backgroundColor="var(--background-secondary)"
                            activeColor="var(--color-primary)"
                            block-size="20"
                            min="0"
                            max="100"
                            step="1"
                            @changing="slideChange"/>
                    <view class="slider-dot"
                          :class="{'slider-dot-active': sliderVal > i}"
                          v-for="i in [0, 25, 50, 75, 100]"></view>
                </view>
                <view class="balance">
                    <text>可用</text>
                    <text>0 USDT</text>
                </view>
                <button class="button">
                    创建策略
                </button>
            </view>
        </scroll-view>

        <strategic-leverage :leverGroup="leverGroup"
                            :leverVal="leverVal"
                            :visible="visible"
                            @close="visible = false"
                            @leverChange="leverChange">

        </strategic-leverage>
    </view>
</template>

<script>
import strategicLeverage from "@/components/strategicLeverage/strategicLeverage.vue";

export default {
    name: "quantitativeStrategy",
    components: {
        strategicLeverage
    },
    data() {
        return {
            scrollHeight: "",
            tabActive: 0,
            sliderVal: 0,
            timeSelected: '7天',
            timeMenu: ['7天', '1个月', '3个月'],
            menuActive: 2,
            menuShow: false,
            visible: false,
            leverVal: 1,
            leverGroup: [1, 4, 8, 12, 16, 20],
        }
    },
    created() {
        const windowHeight = uni.getSystemInfoSync().windowHeight;
        const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
        this.scrollHeight = windowHeight - 44 - statusBarHeight;
    },
    methods: {
        slideChange(e) {
            this.sliderVal = e.detail.value;
        },
        leverChange(e) {
            this.leverVal = e.detail.value
        },
        menuChange(item, index) {
            this.menuActive = index;
            this.timeSelected = item;
            this.menuShow = false;
        },
    }
}
</script>

<style lang="scss" scoped>
@import "quantitativeStrategy";
</style>