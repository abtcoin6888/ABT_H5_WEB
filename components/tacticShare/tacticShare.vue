<template>
    <fui-backdrop :show="visible"
                  :closable="false"
                  :zIndex="1000"
                  @click="handClose">
        <view class="share-warp">
            <view class="share-top">
                <view class="canvas-box">
                    <l-painter ref="dpainter"
                               :hidpi="true"
                               hybrid
                               isCanvasToTempFilePath
                               :pixel-ratio="2"/>
                </view>
            </view>
            <view class="share-footer">
                <view class="toggle-group">
                    <view class="item" @click="copyLink">
                        <view class="image-box">
                            <image :src="`/static/img/tactic/share-link-${userTheme}.png`" mode="widthFix"></image>
                        </view>
                        <text>
                            {{$t('strategy.t70')}}
                        </text>
                    </view>
                    <view class="item" @click="savePoster">
                        <view class="image-box">
                            <image :src="`/static/img/tactic/share-down-${userTheme}.png`" mode="widthFix"></image>
                        </view>
                        <text>
                            {{$t('strategy.t71')}}
                        </text>
                    </view>
                    <view class="item">
                        <view class="image-box">
                            <image :src="`/static/img/tactic/share-more-${userTheme}.png`" mode="widthFix"></image>
                        </view>
                        <text>{{$t('更多')}}</text>
                    </view>
                </view>
                <view class="cancel" @click="handClose">
                    <text>{{$t('取消')}}</text>
                </view>
            </view>
        </view>
    </fui-backdrop>
</template>
<script>
	import strategy from "@/common/api/strategy.js"
export default {
    name: "tacticShare",
    props: {
        visible: {
            default: false,
            type: Boolean
        },
        item: {
            default: {},
            type: Object
        }
    },
    created() {
        this.setPoster();
		
    },
    watch: {
        visible(v) {
            if (v == true) {
                this.setPoster();
            }
        }
    },
    methods: {
        copyLink(){

        },
        async setPoster() {
			let res = await strategy.getInviteCode()
			const invite_code = res.data.invite_code
            const share_background = "/static/img/tactic/tactic-share-bg.png"
            const logo_image = "/static/home/cvlogo.png"
            const code_img = "/static/img/blogo.png"
            setTimeout(() => {
                var poster = {
                    css: {
                        background: "#161819",
                        width: "540rpx",
                        height: "740rpx",
                        overflow: "hidden",
                        position: 'relative',
                        borderRadius: "16rpx"
                    },
                    views: [
                        {
                            type: "image",
                            src: share_background,
                            css: {
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: "0",
                                left: "0",
                                borderRadius: "16rpx"
                            }
                        },
                        {
                            type: "view",
                            css: {
                                width: "100%",
                                height: "83%",
                                position: "absolute",
                                top: "0",
                                left: "0",
                            },
                            views:[
                                {
                                    type: "image",
                                    src: logo_image,
                                    css: {
                                        width: "100rpx",
                                        height: "50rpx",
                                        marginLeft: "30rpx",
                                        marginTop: "30rpx"
                                    }
                                },
                                {
                                    type: "text",
                                    text: this.item.current_date,
                                    css: {
                                        width: "100%",
                                        textAlign: "left",
                                        lineClamp: 1,
                                        color: "#898989",
                                        marginLeft: "30rpx",
                                        marginTop: "10rpx"
                                    }
                                },
                                {
                                    type: "text",
                                    text: this.item.type_id == 1?this.$t('strategy.t15'):this.$t('strategy.t16'),
                                    css: {
                                        width: "100%",
                                        textAlign: "left",
                                        lineClamp: 1,
                                        fontSize: "24rpx",
                                        color: "#898989",
                                        marginLeft: "30rpx",
                                        marginTop: "80rpx"
                                    }
                                },
                                {
                                    type: "text",
                                    text: this.item.currency?this.item.currency.symbol:'',
                                    css: {
                                        width: "100%",
                                        textAlign: "left",
                                        lineClamp: 1,
                                        color: "#ffffff",
                                        fontSize: "32rpx",
                                        fontWeight: "bold",
                                        marginLeft: "30rpx",
                                        marginTop: "20rpx"
                                    }
                                },
                                {
                                    type: "text",
                                    text: this.$t('strategy.t72'),
                                    css: {
                                        width: "100%",
                                        textAlign: "left",
                                        fontSize: "24rpx",
                                        lineClamp: 1,
                                        color: "#898989",
                                        marginLeft: "30rpx",
                                        marginTop: "20rpx"
                                    }
                                },
                                {
                                    type: "text",
                                    text: this.item.rate + "%",
                                    css: {
                                        width: "100%",
                                        textAlign: "left",
                                        lineClamp: 1,
                                        color: "#ffffff",
                                        fontSize: "48rpx",
                                        fontWeight: "bold",
                                        marginLeft: "30rpx",
                                        marginTop: "20rpx"
                                    }
                                },
                                {
                                    type: "view",
                                    css: {
                                        width: "100%",
                                        marginTop: "30rpx"
                                    },
                                    views:[{
                                        type:"text",
                                        text:this.$t('strategy.t54'),
                                        css: {
                                            textAlign: "left",
                                            fontSize: "24rpx",
                                            lineClamp: 1,
                                            color: "#898989",
                                            marginLeft: "30rpx",
                                        }
                                    },{
                                        type:"text",
                                        text:this.item.rate + "%",
                                        css: {
                                            textAlign: "left",
                                            fontSize: "24rpx",
                                            fontWeight: "bold",
                                            lineClamp: 1,
                                            color: "#ffffff",
                                            marginLeft: "30rpx",
                                        }
                                    }]
                                },
                                {
                                    type: "view",
                                    css: {
                                        width: "100%",
                                        marginTop: "30rpx"
                                    },
                                    views:[{
                                        type:"text",
                                        text:this.$t('strategy.t27'),
                                        css: {
                                            textAlign: "left",
                                            fontSize: "24rpx",
                                            lineClamp: 1,
                                            color: "#898989",
                                            marginLeft: "30rpx",
                                        }
                                    },{
                                        type:"text",
                                        text:this.item.run_time,
                                        css: {
                                            textAlign: "left",
                                            fontSize: "24rpx",
                                            fontWeight: "bold",
                                            lineClamp: 1,
                                            color: "#ffffff",
                                            marginLeft: "30rpx",
                                        }
                                    }]
                                }
                            ]
                        },{
                            type: "view",
                            css: {
                                width: "100%",
                                height: "17%",
                                position: "absolute",
                                bottom: "0",
                                left: "0"
                            },
                            views:[{
                                type: "text",
                                text:this.$t('strategy.t73')+"："+ invite_code,
                                css: {
                                    width: "50%",
                                    height: "100%",
                                    paddingLeft: "30rpx",
                                    boxSizing: "border-box",
                                    fontSize: "26rpx",
                                    fontWeight: "bold",
                                    color: "#ffffff"
                                }
                            },{
                                type:"view",
                                css: {
                                    width: "88rpx",
                                    height: "88rpx",
                                    background: "#ffffff",
                                    position: "absolute",
                                    bottom: "20rpx",
                                    right: "20rpx",
                                    borderRadius: "8rpx"
                                },
                                views:[{
                                    type:"image",
                                    src: code_img,
                                    css: {
                                        width: "78rpx",
                                        height: "78rpx",
                                        background: "red",
                                        marginTop: "5rpx",
                                        marginLeft: "5rpx"
                                    }
                                }]
                            }]
                        }
                    ],
                }
                this.$refs.dpainter.render(poster);
            }, 100)
        },
        savePoster() {
            this.$refs.dpainter.canvasToTempFilePathSync({
                fileType: "jpg",
                // 如果返回的是base64是无法使用 saveImageToPhotosAlbum，需要设置 pathType为url
                pathType: 'url',
                quality: 1,
                success: (res) => {
                    console.log(res.tempFilePath);
                    // #ifdef H5
                    window.location.href = res.tempFilePath;
                    // #endif
                    // #ifndef H5
                    uni.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: function () {
                            console.log('save success');
                            uni.showToast({
                                title: "success",
                                icon: "success"

                            })
                        }
                    });
                    // #endif
                    // 非H5 保存到相册
                },
            });
        },
        handClose(){
            this.$emit('close', false)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "tacticShare";
</style>