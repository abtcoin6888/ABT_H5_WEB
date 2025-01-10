<template>
    <fui-backdrop :show="show"
                  :closable="false"
                  :safeArea="false"
                  :zIndex="1000"
                  @click="handClose">
        <view class="share-warp"
              :style="`height: ${shareWarpHeight}px`">
            <view class="share-container"
                  :style="`height: ${shareContainerHeight}px`">
                <view class="empty-artboard"
                      :style="`height: ${shareContainerHeight}px`"
                      v-if="posterPath == ''">
                    <fui-load-ani type="5"
                                  color="#01bc8d">
                    </fui-load-ani>
                </view>
                <image class="poster-image"
                       :src="posterPath"
                       mode="widthFix"
                       v-if="posterPath != ''">
                </image>
                <view class="painter-warp"
                      :style="`left: ${shareContainerHeight * 2}px`">
                    <l-painter ref="painter"
                               :hidpi="true"
                               hybrid
                               isCanvasToTempFilePath
                               @success="renderSuccess"
                               :pixel-ratio="2"/>
                </view>
            </view>
            <view class="bottom bg-white"
                  id="bottom">
                <view class="image-group">
                    <view class="item"
                          v-for="(item,index) in operate"
                          :key="index">
                        <view class="icon-warp"
                              :class="{'add-size': index < 2}">
                            <image class="icon"
                                   :src="`/static/img/newContract/${item.iconName}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                        <text class="font-12 color-black i-txt">
                            {{ item.text }}
                        </text>
                    </view>
                </view>
                <view class="button-group">
                    <view class="button-item bg-gray"
                          @click="handClose">
                        <text class="font-14 color-gray">
                            取消
                        </text>
                    </view>
                    <view class="button-item bg-black">
                        <text class="font-14 color-white font-weight">
                            更多分享
                        </text>
                    </view>
                </view>
            </view>
        </view>
    </fui-backdrop>
</template>
<script>
export default {
    name: "contract-share-popup",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            shareWarpHeight: uni.getSystemInfoSync().windowHeight,
            bottomHeight: "",
            shareContainerHeight: "",
            operate: [
                {
                    iconName: "share-image",
                    text: "儲存圖片",
                    click: ""
                }, {
                    iconName: "share-link",
                    text: "複製連結",
                    click: ""
                }, {
                    iconName: "share-tw",
                    text: "Twitter",
                    click: ""
                }, {
                    iconName: "share-tg",
                    text: "Telegram",
                    click: ""
                }
            ],
            posterPath: ""
        }
    },
    watch: {
        show(v) {
            console.log(v)
            if (v == true) {
                this.getElementHeight();
                this.executeMethod();
            }
        }
    },
    methods: {
        handClose() {
            this.$emit('close')
        },
        executeMethod() {
            // 海报前几次不显示或者比例有问题，暂时用定时器多执行几次
            let count = 0;
            const intervalId = setInterval(() => {
                this.setPoster();
                count++;
                if (count === 3) {
                    clearInterval(intervalId);
                }
            }, 250)
        },
        getElementHeight() {
            const query = uni.createSelectorQuery().in(this);
            query.select("#bottom").boundingClientRect((data) => {
                this.bottomHeight = data.height;
                this.shareContainerHeight = this.shareWarpHeight - data.height - 10;
            }).exec();
        },
        setPoster() {
            const postWidth = uni.getSystemInfoSync().windowWidth - 30;
            const share_background = "/static/img/tactic/tactic-share-bg.png"
            const logo_image = "/static/home/cclogo.png"
            const postHeight = this.shareContainerHeight - 40;
            setTimeout(() => {
                var poster = {
                    css: {
                        background: "#161819",
                        width: `${postWidth}px`,
                        height: `${postHeight}px`,
                        overflow: "hidden",
                        borderRadius: "24rpx",
                        marginTop: "100rpx"
                    },
                    views: [{
                        type: "view",
                        css: {
                            position: "relative",
                            width: `${postWidth}px`,
                            height: `${postHeight}px`
                        },
                        views: [{  //海报背景
                            type: "image",
                            src: share_background,
                            css: {
                                width: `${postWidth}px`,
                                height: `${postHeight}px`,
                                borderRadius: "24rpx",
                                position: "absolute",
                                top: "0",
                                left: "0"
                            }
                        }, {
                            // 海报内容主体
                            type: "view",
                            css: {
                                width: `${postWidth}px`,
                                height: `${postHeight}px`,
                                borderRadius: "24rpx",
                                padding: "24rpx 30rpx 0",
                                position: "absolute",
                                top: "0",
                                left: "0",
                            },
                            views: [{
                                // LOGO图
                                type: "image",
                                src: "/static/home/cvlogo.png",
                                css: {
                                    width: "180rpx",
                                    height: "90rpx"
                                }
                            }, {
                                //  时间
                                type: "text",
                                text: "2024-02-15 05:25:10(UTF+8)",
                                css: {
                                    width: `${postWidth - 30}px`,
                                    height: "42rpx",
                                    textAlign: "left",
                                    lineClamp: "1",
                                    fontSize: "28rpx",
                                    color: "#898989"
                                }
                            }, {
                                // 用户名
                                type: "text",
                                text: "用户名称",
                                css: {
                                    width: `${postWidth - 30}px`,
                                    height: "58rpx",
                                    fontSize: "44rpx",
                                    fontWeight: "bold",
                                    color: "#ffffff",
                                    textAlign: "left",
                                    lineClamp: "1",
                                    marginTop: "24rpx"
                                }
                            }, {
                                //  用户账户
                                type: "text",
                                text: "@cisdasd54554@icloud.com",
                                css: {
                                    width: `${postWidth - 30}px`,
                                    height: "42rpx",
                                    fontSize: "28rpx",
                                    color: "#898989",
                                    textAlign: "left",
                                    lineClamp: "1",
                                    marginTop: "10rpx"
                                }
                            }, {
                                // 货币名称
                                type: "text",
                                text: "BTCUSDT",
                                css: {
                                    width: `${postWidth - 30}px`,
                                    mraginTop: "10rpx",
                                    fontSize: "42rpx",
                                    color: "#ffffff",
                                    fontWeight: "600",
                                    textAlign: "left",
                                    lineClamp: "1",
                                    marginTop: "30rpx"
                                }
                            }, {
                                //  做多-空+倍率
                                type: "view",
                                css: {
                                    width: `${postWidth - 30}px`,
                                    height: "58rpx",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    marginTop: "24rpx"
                                },
                                views: [{
                                    type: "text",
                                    text: "做多",
                                    css: {
                                        fontSize: "28rpx",
                                        color: "#f1493f",
                                        fontWeight: "600"
                                    }
                                }, {
                                    type: "text",
                                    text: "|",
                                    css: {
                                        fontSize: "28rpx",
                                        color: "#898989",
                                        fontWeight: "600",
                                        margin: "0 16rpx"
                                    }
                                }, {
                                    type: "text",
                                    text: "50X",
                                    css: {
                                        fontSize: "28rpx",
                                        color: "#f1493f",
                                        fontWeight: "600"
                                    }
                                }]
                            }, {
                                type: "text",
                                text: "0.00%",
                                css: {
                                    width: `${postWidth - 30}px`,
                                    mraginTop: "10rpx",
                                    fontSize: "80rpx",
                                    color: "#03aac7",
                                    fontWeight: "600",
                                    textAlign: "left",
                                    lineClamp: "1",
                                }
                            }, {
                                //  当前价格,
                                type: "view",
                                css: {
                                    width: `${postWidth - 30}px`,
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    marginTop: "30rpx"
                                },
                                views: [{
                                    type: "text",
                                    text: "当前价格",
                                    css: {
                                        fontSize: "28rpx",
                                        color: "#898989",
                                        marginRight: "24rpx"
                                    }
                                }, {
                                    type: "text",
                                    text: "56479.448",
                                    css: {
                                        fontSize: "28rpx",
                                        fontWeight: "500",
                                        color: "#ffffff"
                                    }
                                }]
                            }, {
                                //  持仓均价,
                                type: "view",
                                css: {
                                    width: `${postWidth - 30}px`,
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    marginTop: "24rpx"
                                },
                                views: [{
                                    type: "text",
                                    text: "持仓均价",
                                    css: {
                                        fontSize: "28rpx",
                                        color: "#898989",
                                        marginRight: "24rpx"
                                    }
                                }, {
                                    type: "text",
                                    text: "56479.448",
                                    css: {
                                        fontSize: "28rpx",
                                        color: "#ffffff",
                                        fontWeight: "500"
                                    }
                                }]
                            }]
                        }, {
                            type: "view",
                            css: {
                                width: `${postWidth - 30}px`,
                                height: "180rpx",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                position: "absolute",
                                bottom: "4rpx",
                                left: "30rpx",
                            },
                            views: [{
                                // 邀请码
                                type: "text",
                                text: "邀请码：aONCA45SC",
                                css: {
                                    fontSize: "32rpx",
                                    fontWeight: "600",
                                    color: "#ffffff",
                                    textAlign: "left",
                                    lineClamp: "1",
                                }
                            }, {
                                // 二维码
                                type: "view",
                                css: {
                                    width: "150rpx",
                                    height: "150rpx",
                                    borderRadius: "4rpx",
                                    background: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                },
                                views: [{
                                    type: "qrcode",
                                    text: "",
                                    css: {
                                        width: "130rpx",
                                        height: "130rpx"
                                    }
                                }]
                            }]
                        }]
                    }]
                }
                this.$refs.painter.render(poster);
            }, 1000)
        },
        renderSuccess(e) {
            this.posterPath = e;
        },
    }
}
</script>

<style scoped>
@import "contract-share-popup.css";
</style>