<template>
    <view class="cta-warp">
        <view class="head">
            <view class="tabs">
                <view class="item"
                      :class="{'item-active': tabActive == index}"
                      v-for="(item,index) in tabs" :key="index"
                      @click="tabActive = index">
                    <text>{{ item }}</text>
                </view>
            </view>
            <view class="tip-box">
                <text>该策略参数是根据历史回撤获得，并不代表未来收益</text>
            </view>
        </view>
        <swiper class="swiper"
                :current="tabActive"
                :duration="200"
                :style="`height: ${swiperHeight}px`"
                @change="tabActive = $event.detail.current">
            <swiper-item class="swiper-item">
                <scroll-view scroll-y="true" class="scroll-list">
                    <view class="card-item" v-for="item in 30" @click="$mroute.policyParameter()">
                        <view class="item-head">
                            <view class="_title">
                                <text>BTC/USDT</text>
                                <text>趋势行情</text>
                            </view>
                            <view class="tag-group">
                                <fui-tag :padding="['8rpx','16rpx']"
                                         :radius="4"
                                         background="var(--background-secondary)"
                                         color="var(--content-tertiary)"
                                         marginRight="16"
                                         :size="24">
                                    现货 CTA-MACD
                                </fui-tag>
                                <fui-tag :padding="['8rpx','16rpx']"
                                         :radius="4"
                                         background="var(--background-secondary)"
                                         color="var(--content-tertiary)"
                                         marginRight="16"
                                         :size="24">
                                    1H
                                </fui-tag>
                            </view>
                        </view>
                        <view class="item-content">
                            <view class="item-content-left">
                                <text>24.77%</text>
                                <text>近30天 年化收益率</text>
                            </view>
                        </view>
                        <view class="item-footer">
                            <view class="row">
                                <image :src="`/static/img/tactic/people-${userTheme}.webp`"></image>
                                <text>66</text>
                            </view>
                            <button class="button">
                                使用
                            </button>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <scroll-view scroll-y="true" class="scroll-list">
                    <view class="card-item" v-for="item in 30" @click="$mroute.policyParameter()">
                        <view class="item-head">
                            <view class="_title">
                                <text>BTC/USDT</text>
                                <text>趋势行情</text>
                            </view>
                            <view class="tag-group">
                                <fui-tag :padding="['8rpx','16rpx']"
                                         :radius="4"
                                         background="var(--background-secondary)"
                                         color="var(--content-tertiary)"
                                         marginRight="16"
                                         :size="24">
                                    现货 CTA-MACD
                                </fui-tag>
                                <fui-tag :padding="['8rpx','16rpx']"
                                         :radius="4"
                                         background="var(--background-secondary)"
                                         color="var(--content-tertiary)"
                                         marginRight="16"
                                         :size="24">
                                    1H
                                </fui-tag>
                            </view>
                        </view>
                        <view class="item-content">
                            <view class="item-content-left">
                                <text>24.77%</text>
                                <text>近30天 年化收益率</text>
                            </view>
                        </view>
                        <view class="item-footer">
                            <view class="row">
                                <image :src="`/static/img/tactic/people-${userTheme}.webp`"></image>
                                <text>66</text>
                            </view>
                            <button class="button">
                                使用
                            </button>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <scroll-view scroll-y="true" class="scroll-list">
                    <view class="card-item" v-for="item in 30" @click="$mroute.policyParameter()">
                        <view class="item-head">
                            <view class="_title">
                                <text>BTC/USDT</text>
                                <text>趋势行情</text>
                            </view>
                            <view class="tag-group">
                                <fui-tag :padding="['8rpx','16rpx']"
                                         :radius="4"
                                         background="var(--background-secondary)"
                                         color="var(--content-tertiary)"
                                         marginRight="16"
                                         :size="24">
                                    现货 CTA-MACD
                                </fui-tag>
                                <fui-tag :padding="['8rpx','16rpx']"
                                         :radius="4"
                                         background="var(--background-secondary)"
                                         color="var(--content-tertiary)"
                                         marginRight="16"
                                         :size="24">
                                    1H
                                </fui-tag>
                            </view>
                        </view>
                        <view class="item-content">
                            <view class="item-content-left">
                                <text>24.77%</text>
                                <text>近30天 年化收益率</text>
                            </view>
                        </view>
                        <view class="item-footer">
                            <view class="row">
                                <image :src="`/static/img/tactic/people-${userTheme}.webp`"></image>
                                <text>66</text>
                            </view>
                            <button class="button">
                                使用
                            </button>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>
<script>
export default {
    name: "ctaView",
    data() {
        return {
            tabs: ['全部', 'MACD', 'BOLL'],
            tabActive: 0,
            swiperHeight: ""
        }
    },
    created() {
        this.swiperHeight = uni.getSystemInfoSync().windowHeight - 170;
    },
}
</script>

<style lang="scss" scoped>
@import "cta";
</style>