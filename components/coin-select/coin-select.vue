<template>
	<view class="light">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<van-nav-bar :left-arrow="true" @click-left="$mroute.back()" title="充值" :border="false" style="position: fixed;width: 100%;top:var(--status-bar-height)">
			<template #right>
				<van-icon name="static/img/recharge.png" size="20" />
			</template>
		</van-nav-bar>
		<view class="container">
			<coin-indexed-xlist :dataList="coin" :showAvatar="true" @itemclick="itemclick"></coin-indexed-xlist>
		</view>
	</view>
</template>

<script>
	import { NavBar,Icon } from 'vant';
	export default {
		name:"coin-select",
		components:{
			[NavBar.name]:NavBar,
			[Icon.name]:Icon
		},
		props:{
			coin:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>