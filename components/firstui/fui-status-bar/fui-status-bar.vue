
<template>
	<view :style="{ height: statusBarHeight,zIndex:isFixed?zIndex:1,background:background }" class="fui-status__bar"
		:class="{'fui-status__bar-fixed':isFixed}">
		<slot />
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	export default {
		name: "fui-status-bar",
		emits: ['init'],
		props: {
			//背景色
			background: {
				type: String,
				default: 'transparent'
			},
			//是否固定在顶部
			isFixed: {
				type: Boolean,
				default: false
			},
			//z-index值，isFixed为true时生效
			zIndex: {
				type: Number,
				default: 99
			}
		},
		data() {
			return {
				statusBarHeight
			};
		},
		created() {
			this.$emit('init', {
				statusBarHeight: statusBarHeight
			})
		}
	}
</script>

<style scoped>
	.fui-status__bar {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		height: 20px;
		overflow: hidden;
	}

	.fui-status__bar-fixed {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
	}
</style>