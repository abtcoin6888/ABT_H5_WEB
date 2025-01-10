<template>
    <view class="page-warp"
          :data-theme="userTheme">
        <fui-nav-bar background="var(--background-primary)"
                     color="var(--content-primary)"
                     statusBar
                     isFixed
                     isOccupy
                     @rightClick="$mroute.switchIndex()"
                     @init="navInit">
            <template v-slot:right>
                <fui-icon name="close"
                          size="56"
                          color="var(--content-primary)">
                </fui-icon>
            </template>
        </fui-nav-bar>
        <view class="page-container">
            <image class="logo-image"
                   src="/static/newImage/banner_bg.png"
                   mode="widthFix">
            </image>
            <view class="title-warp">
                <text class="font-28 font-bold color-black title-text">
                    {{ pageTitle }}
                </text>
                <view class="font-14 color-black desc-text"
                      v-html="rewardText">
                </view>
                <text class="font-14 color-black desc-text">
                    {{ $t('registerBlindBox.text3') }}
                </text>
            </view>
            <view class="step-warp">
                <view class="step-item"
                      v-for="(item,index) in stepsArr"
                      :key="index">
                    <view class="node-warp">
                        <view class="node-box"
                              v-if="item.index === 1">
                            <fui-icon name="check"
                                      size="32"
                                      fontWeight="bold"
                                      color="var(--content-primary)">
                            </fui-icon>
                        </view>
                        <view class="node-box node-active"
                              v-if="item.index === 2">
                            <text class="font-14 font-weight color-black">{{ item.index }}</text>
                        </view>
                    </view>
                    <view class="node-text">
                        <text class="_tit font-16 font-bold color-black">{{ item.title }}</text>
                        <text class="_desc font-12 color-gray">{{ item.descr }}</text>
                    </view>
                </view>
            </view>
            <view class="button" @click="$mroute.switchIndex()">
                <text class="font-14 color-black font-weight">{{ $t('welfare.btn5') }}</text>
            </view>
        </view>
    </view>
</template>
<script>
import {
    mapGetters,mapState
} from 'vuex'

export default {
    data() {
        return {
            containerHeight: "",
            stepsArr: [{
                title: this.$t('registerBlindBox.text4'),
                index: 1
            }, {
                title: "",
                descr: this.$t('registerBlindBox.text6'),
                index: 2
            }]
        }
    },
    computed: {
        ...mapGetters(['userTheme']),
		...mapState(['config']),
        pageTitle() {
            return this.$t('registerBlindBox.text1').replace("{}", this.config['site_name']);
        },
        rewardText() {
            const rewardCenter = '<text class="color-primary ml-5 mr-5">' + this.$t('registerBlindBox.rewardCenter') + '</text>';
            const reward_text = this.$t('registerBlindBox.text2').replace("{}", rewardCenter).replace("site_name",this.config['site_name'])
            return reward_text;
        },
        stepText() {
            const quantity = '35$';
            return this.$t('registerBlindBox.text5').replace("{}", quantity).replace("site_name",this.config['site_name'])
        }
    },
    mounted() {
        this.setStepInfo();
    },
    methods: {
        navInit(e) {
            const navHeight = e.height + e.statusbarHeight;
            const windowHeight = uni.getSystemInfoSync.windowHeight;
            this.containerHeight = windowHeight - navHeight;
        },
        setStepInfo() {
            this.stepsArr[1].title = this.stepText
        }
    },
}
</script>
<style lang="scss"
       scoped>
.page-warp {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    .page-container {
        width: inherit;
        background: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30rpx;
        box-sizing: border-box;

        .logo-image {
            width: 220rpx;
            height: 220rpx;
            margin-bottom: 40rpx;
            border-radius: 24rpx;
        }

        .title-warp {
            width: 85%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            .title-text {
                margin: 30rpx 16rpx;
            }

            .desc-text {
                line-height: 48rpx;

                .color-primary {
                    margin: 0 8rpx;
                }
            }
        }

        .step-warp {
            width: 85%;
            padding: 60rpx 0;
            box-sizing: border-box;

            .step-item {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                padding: 30rpx 0;
                box-sizing: border-box;

                .node-box {
                    width: 48rpx;
                    height: 48rpx;
                    border-radius: 50%;
                    border: 4rpx solid var(--border-strength-100);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 32rpx;
                    position: relative;

                    //&::after {
                    //    content: "";
                    //    display: inline-block;
                    //    width: 4rpx;
                    //    heiht: 60rpx;
                    //    border-left: 4rpx dashed var(--border-strength-100);
                    //    position: absolute;
                    //    left: 0;
                    //    top: 0;
                    //    z-index: 2;
                    //}

                    &:first-of-type {
                        width: 44rpx;
                        height: 44rpx;
                        border-color: var(--content-primary);
                    }
                }

                .node-active {
                    width: 48rpx !important;
                    height: 48rpx !important;
                    border-radius: 50%;
                    background: linear-gradient(35deg, #4EA0F8, #78b6f8, #BAFCCF);
                    border-color: var(--background-primary) !important;
                }

                .node-text {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;

                    ._desc {
                        margin-top: 6rpx;
                    }
                }
            }
        }

        .button {
            margin-top: 160rpx;
            width: 65%;
            height: 88rpx;
            border-radius: 88rpx;
            line-height: 88rpx;
            text-align: center;
            background: linear-gradient(35deg, #4EA0F8, #78b6f8, #BAFCCF);
        }
    }
}

</style>