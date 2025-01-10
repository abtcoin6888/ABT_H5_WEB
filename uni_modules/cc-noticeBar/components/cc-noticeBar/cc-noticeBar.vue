<template>
	<view class="notice">
		<view class="right_notice">
			<swiper class="notice_swiper" vertical easing-function="easeInOutCubic" autoplay :interval="interval">
				<swiper-item v-for="(item,index) in noticeList" :key="index" class="sw_item" @click="itemClick(item)">
					<text class="sw_text" :style="{color:colors}">{{item.name}}</text>
					<image class="sw_image" src="/static/images/home/right.png"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},

		components: {},
		props: {
			colors: {
				type: String,
				default: '#fff'
			},
			noticeList: {
				type: Array
			},
			interval:{
				typeof:Number,
				default:5000
			}
		},
		methods: {
			itemClick(item) {

				this.$emit('click', item);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.notice {
		height: 30px;
		line-height: 30px;
	}

	.left_icon {

		width: 10%;
		height: 24px;
		float: left;
		padding-top: 18upx;
	}

	.left_icon .iconfont {
		display: inline-block;
		font-size: 44upx;
	}

	.right_notice {
		float: left;
		width: 90%;

	}

	.right_notice .notice_swiper {
		height: 30px;
	}

	.notice_swiper .sw_item {
		height: 30px;
	}

	.notice_swiper .sw_item .sw_text {
		font-size: 24rpx;
		color: #fff;
		display: inline-block;
	}

	.notice_swiper .sw_image {
		width: 40upx;
		height: 40upx;
		float: right;
		margin-top: 20upx;
	}
</style>