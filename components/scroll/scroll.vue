<template>
    <scroll-view ref="scrollView"
                 :scroll-y="scrollY"
                 :refresher-enabled="refresher"
                 refresher-default-style="none"
                 :lower-threshold="lowerThreshold"
                 :refresher-threshold="refresherThreshold"
                 :refresher-triggered="triggered"
                 :scroll-anchoring="true"
                 refresher-background="var(--background-primary)"
                 @refresherrefresh="refresherRefresh"
                 @refresherpulling="refresherPulling"
                 @refresherrestore="refresherRestore"
                 @scrolltolower="scrollTolower">
        <!-- scroll content -->
        <view class="scroll-layout-content">
            <!-- refresher -->
            <view class="refresher"
                  :style="{'top': '-' + refresherThreshold + 'px', 'height': refresherThreshold + 'px'}">
                <view class="flex flex-row align-center justify-center" v-if="!$slots.refresher">
                    <image
                        :class="triggeredType == 2 ? 'animation':''"
                        src="/static/wallet/refresher.png">
                    </image>
                    <text class="font-13 color-gray" v-if="triggeredType == 0">
                        {{ $t('wallet.xin1') }}
                    </text>
                    <text class="font-13 color-gray" v-if="triggeredType == 1">
                        {{ $t('wallet.xin2') }}
                    </text>
                    <text class="font-13 color-gray" v-if="triggeredType == 2">
                        {{ $t('wallet.xin3') }}
                    </text>
                    <text class="font-13 color-gray" v-if="triggeredType == 3">
                        {{ $t('wallet.xin4') }}
                    </text>
                </view>
            </view>
            <!-- content -->
            <view>
                <slot></slot>
            </view>
            <!-- empty -->
            <view :class="empty ? 'empty-show' : 'empty-hide'">
                <view class="empty"
                      v-if="!$slots.empty && empty">
                    <image :src="`/static/img/tactic/not_data-${userTheme}.png`"
                           mode="widthFix">
                    </image>
                    <text class="font-13 color-gray">
                        {{ $t("list.not_data") }}
                    </text>
                </view>
                <slot name="empty"></slot>
            </view>
        </view>
    </scroll-view>
</template>

<script>
import {
    mapGetters
} from 'vuex';
export default {
    name: "contentScroll",
    props: {
        // 是否开启竖向滚动
        scrollY: {
            type: [Boolean, String],
            default: false
        },
        // 是否开启下拉刷新
        refresher: {
            type: [Boolean, String],
            default: false
        },
        // 触底距离PX
        lowerThreshold: {
            type: Number,
            default: 50,
        },
        // 下拉刷新插槽高度PX
        refresherThreshold: {
            type: Number,
            default: 45,
        },
        // 没有数据
        empty: {
            type: [Boolean, String],
            default: false,
        },
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    data() {
        return {
            // 设置当前下拉刷新状态
            triggered: 'restore',
            // 被拉下时显示状态
            triggeredType: 0,
            isScrolltolower: false
        }
    },
    methods: {
        // 下拉刷新被触发
        refresherRefresh() {
            let that = this;

            that.triggeredType = 0;
            if (that.triggeredType == 2) return;
            that.triggeredType = 2;
            setTimeout(() => {
                that.triggered = false;
                that.triggeredType = 0;
            }, 1500);

            that.$emit('refresherrefresh', function () {
                that.triggeredType = 3;
                setTimeout(() => {
                    that.triggered = false;
                    that.triggeredType = 0;
                }, 1500)
            })
        },
        // 下拉刷新控件被下拉
        refresherPulling(e) {
            let detailY = e.detail.deltaY || e.target.deltaY;
            if (detailY < 45) {
                this.triggeredType = 0;
            } else if (detailY > 45) {
                this.triggeredType = 1;
            }
        },
        // 下拉刷新被复位
        refresherRestore() {
            this.triggered = 'restore';
            this.triggeredType = 0
        },
        // 下拉触底
        scrollTolower() {
            let that = this;
            if(that.isScrolltolower) {
                that.$emit('scrolltolower', function () {
                    that.isScrolltolower = true
                })
            }
        }
    }
}
</script>

<style scoped lang="scss">
.scroll-layout-content {
    position: relative;

    .refresher {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        right: 0;
        transition: all .15s linear;

        image {
            width: 30rpx;
            height: 30rpx;
            margin-right: 20rpx;
        }

        .animation {
            animation: imgAnima 1s linear infinite;
        }

        @keyframes imgAnima {
            0% {
                transform: rotate(0deg);
            }
            50% {
                transform: rotate(180deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }

    .empty-show {
        transform: translateY(0);
        opacity: 1;
    }

    .empty-hide {
        opacity: 0;
    }

    .empty {
        width: 100%;
        height: 500rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.15s linear;

        image {
            width: 160rpx;
            margin-bottom: 30rpx;
        }
    }
}
</style>