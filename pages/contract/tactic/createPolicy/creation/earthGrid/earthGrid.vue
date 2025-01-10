<template>
    <!--  现货/合约天地网格  -->
    <view class="earth-grid" :data-theme="userTheme">
        <view class="tabs">
            <view class="item"
                  :class="{'item-active': tabActive == 0}"
                  @click="tabActive = 0">
                <text>做多</text>
                <image v-if="tabActive != 0" :src="`/static/img/tactic/button-bg/zd-n-${userTheme}.png`"></image>
                <image v-else src="/static/img/tactic/button-bg/zd-s.png"></image>
            </view>
            <view class="item"
                  :class="{'item-active': tabActive == 1}"
                  @click="tabActive = 1">
                <text>做空</text>
                <image v-if="tabActive != 1" :src="`/static/img/tactic/button-bg/zx-n-${userTheme}.png`"></image>
                <image v-else :src="`/static/img/tactic/button-bg/zx-s-${userTheme}.png`"></image>
            </view>
        </view>
        <swiper class="container-swiper"
                :duration="200"
                :current="tabActive"
                @change="tabActive = $event.detail.current"
                :style="`height: ${swiperHeight}px`">
            <swiper-item class="swiper-item">
                <view class="label">
                    <view class="label-row" v-for="item in labelRow">
                        <text>{{ item.title }}</text>
                        <text>{{ item.text }}</text>
                    </view>
                </view>
                <view class="label">
                    <view class="label-column">
                        <text class="desc">投资额</text>
                        <view class="label-input">
                            <input type="text">
                        </view>
                    </view>
                </view>
                <view class="label">
                    <view class="label-slide">

                    </view>
                    <view class="balance">
                        <text>可用</text>
                        <text>0 USDT</text>
                    </view>
                </view>
                <view class="label">
                    <label class="label-checkbox">
                        <fui-checkbox></fui-checkbox>
                        <text>终止时卖出</text>
                    </label>
                </view>
                <view class="button-box">
                    <button class="button">创建订单</button>
                </view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <template v-if="false">
                    <view class="label">
                        <view class="label-row" v-for="item in labelRow">
                            <text>{{ item.title }}</text>
                            <text>{{ item.text }}</text>
                        </view>
                    </view>
                    <view class="label">
                        <view class="label-column">
                            <text class="desc">投资额</text>
                            <view class="label-input">
                                <input type="text">
                            </view>
                        </view>
                    </view>
                    <view class="label">
                        <view class="label-slide">

                        </view>
                        <view class="balance">
                            <text>可用</text>
                            <text>0 USDT</text>
                        </view>
                    </view>
                    <view class="label">
                        <label class="label-checkbox">
                            <fui-checkbox></fui-checkbox>
                            <text>终止时卖出</text>
                        </label>
                    </view>
                    <view class="button-box">
                        <button class="button">创建订单</button>
                    </view>
                </template>
                <view class="note-data" v-if="true">
                    <fui-empty :src="`/static/img/tactic/not_data-${userTheme}.png`"
                               width="160"
                               height="150"
                               size="26"
                               title="暂无策略"
                               color="var(--dark-gray)">
                    </fui-empty>
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>
<script>
import {
    mapGetters
} from 'vuex';

export default {
    name: "earthGrid",
    computed: {
        ...mapGetters(['userTheme'])
    },
    data() {
        return {
            tabActive: 0,
            labelRow: [{
                title: "30天回测收益率",
                text: "174.1%"
            }, {
                title: "使用人数",
                text: ""
            }, {
                title: "价格区间",
                text: "174.1%"
            }, {
                title: "网格数量",
                text: "174.1%"
            }, {
                title: "每格利润",
                text: "174.1%"
            }],
            swiperHeight: ""
        }
    },
    created() {
        this.swiperHeight = uni.getSystemInfoSync().windowHeight - 120;
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
@import "earthGrid";
</style>