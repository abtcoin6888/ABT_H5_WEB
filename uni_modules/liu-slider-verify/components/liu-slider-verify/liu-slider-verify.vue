<template>
	<view class="slider-verify" :data-theme="userTheme" :style="'background-color:'+dBgColor" @touchend="touchend">
        <view class="slider-wrap" :style="'background-color:' + sBgColor">
            <view class="slider-prompt font-13 font-weight" :style="success?'color:'+sColor:'color:'+dColor">{{success?$t('common.slider_result'):$t('common.slider_text')}}</view>
            <view class="slider-bg" :style="{'transform':'translateX('+oldx+'px)',backgroundColor:dBgColor}"></view>
            <movable-area class="slider-area" :animation="true">
                <movable-view :style="{borderColor:success?sBgColor:dBgColor}"
                              :class="{'movable-btn':true,'movable-success':success}" :x="x" direction="horizontal" @change="onMove"
                              :disabled="isDisable">
                </movable-view>
            </movable-area>
        </view>
	</view>
</template>

<script>
import {mapGetters} from 'vuex';
	export default {
		props: {
			//是否禁止拖动
			disabled: {
				type: Boolean,
				default: false
			},
			//偏移量
			offset: {
				type: Number,
				default: 3
			},
			//滑动轨道默认背景色
			dBgColor: {
				type: String,
				default: '#f8f9f9'
			},
			//滑动轨道滑过背景色
			sBgColor: {
				type: String,
				default: '#3070ec'
			},
			//默认文字颜色
			dColor: {
				type: String,
				default: '#b9bdc2'
			},
			//成功文字颜色
			sColor: {
				type: String,
				default: '#60b485'
			}
		},
		data() {
			return {
				x: 0,
				oldx: 0.1,
				success: false, //是否验证成功
				verification: 0, //验证次数
				isDisable: this.disabled,
				screenWidth: 0
			};
		},
		mounted() {
			const systemInfo = uni.getSystemInfoSync()
			this.screenWidth = systemInfo.screenWidth
		},
        computed: {
            ...mapGetters(['userTheme'])
        },
		methods: {
			onMove(e) {
				this.oldx = e.detail.x
			},
			touchend() {
				if (this.success || (this.oldx < 1 && this.oldx != 0.1)) return
				this.x = this.oldx
				var promptW = 0
				var onTrackW = 0
				uni.createSelectorQuery().in(this).select(".slider-prompt").boundingClientRect(data => {
					if (data.width > 0) {
						promptW = data.width
						uni.createSelectorQuery().in(this).select(".movable-btn").boundingClientRect(data => {
							if (data.width > 0) {
								onTrackW = data.width
								if (this.oldx != 0.1) this.verification++
								if (this.oldx > (promptW - onTrackW - this.offset)) {
									this.success = true
									this.isDisable = true
									this.verificationSuccess(true)
								} else {
									this.$nextTick(() => {
										this.x = 0
										this.oldx = 0
									})
									this.verificationSuccess(false)
								}
							}
						}).exec()
					}
				}).exec()
			},
			verificationSuccess(state) {
				let obj = {
					state: state,
					verification: this.verification
				}
				this.$emit("change", obj)
			},
			//重置初始化状态
			initialization() {
				this.x = 0
				this.oldx = 0.1
				this.verification = 0
				this.success = false
				this.isDisable = false
				this.touchend()
			}
		}
	}
</script>

<style scoped>
	.slider-verify {
		width: 100%;
		height: 80rpx;
		overflow: hidden;
        border-radius: 6rpx;
	}

    .slider-wrap {
        position: relative;
        width: 100%;
        height: 80rpx;
        overflow: hidden;
        border-radius: 6rpx;
    }

	.slider-prompt {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
        right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		z-index: 99;
        border-radius: 6rpx;
	}

	.slider-bg {
		width: calc(100% + 10rpx);
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
        right: 0;
        border-radius: 6rpx;
	}

	.slider-area {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
        /*  #ifdef  H5  */
        width: 100%;
        /*  #endif  */
        /*  #ifdef  APP  */
        width: calc(100% - 80rpx);
        /*  #endif  */
		z-index: 999;
        border-radius: 6rpx;
	}

	.movable-btn {
		width: 100rpx;
		height: 100%;
		box-sizing: border-box;
		background-color: var(--rotate-block-bg);
		/* //border: solid 1px var(--color-gray-bg); */
		background-image: url(../../static/go-right.png);
		background-position: center;
		background-size: 34rpx auto;
		background-repeat: no-repeat;
        border-radius: 6rpx;
	}

	.movable-success {
		border: solid 1px;
		background-image: url(../../static/success.png);
		background-size: 40rpx auto;
	}
</style>