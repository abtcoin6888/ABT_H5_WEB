<template>
	<view class="light">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<van-nav-bar :left-arrow="true" @click-left="$mroute.back()" title="关于平台升级跌公告" :border="false" style="position: fixed;width: 100%;top:var(--status-bar-height)">
		</van-nav-bar>
		<view class="container">
			<!-- #ifdef APP-PLUS -->
			<view style="height: 46px;width: 100%;"></view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view style="height: 46px;width: 100%;"></view>
			<!-- #endif -->
			<view class="pd-15">
				<rich-text :nodes="nodes"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import { NavBar,Icon,TextEllipsis} from 'vant';
	import htmlParse from '/common/html-parser.js';
	export default {
		components:{
			[NavBar.name]:NavBar,
			[Icon.name]:Icon,
		},
		data() {
			return {
				nodes:[]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
