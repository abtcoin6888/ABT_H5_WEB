<template>
	<scroll-view scroll-y="true" class="createPolicy" :style="`height: ${scrollHeight}px`">
		<view class="label-warp">
			<view class="label">
				<view class="label-desc">
					<text>{{$t("strategy.t1")}}</text>
				</view>
				<view class="label-card" v-for="(item,idx) in level1" @click="labelChange(item)">
					<view class="label-card-image">
						<image :src="item.icon"></image>
					</view>
					<view class="label-card-info">
						<text>{{ item.name }}</text>
						<text>{{ item.brief }}</text>
					</view>
				</view>
			</view>
			<view class="label" v-if="level2.length">
				<view class="label-desc">
					<text>{{$t("strategy.t2")}}</text>
				</view>
				<view class="label-card" v-for="(item,idx) in level2" @click="labelChange(item)">
					<view class="label-card-image">
						<image :src="item.icon"></image>
					</view>
					<view class="label-card-info">
						<text>{{ item.name }}</text>
						<text>{{ item.brief }}</text>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>
<script>
	import strategy from "@/common/api/strategy.js"
	export default {
		name: "createPolicy",
		data() {
			return {
				scrollHeight: '',
				level1: [],
				level2: [],
			}
		},
		created() {
			this.getType()
			const windowHeight = uni.getSystemInfoSync().windowHeight;
			this.scrollHeight = windowHeight - 110;
		},
		methods: {
			handleCancel() {
				this.$emit('close', false)
			},
			labelChange(e) {
				uni.navigateTo({
					url: e.path + "?type_id=" + e.id
				})
				this.handleCancel();
			},
			async getType() {
				let data = uni.getStorageSync('strategyType')
				if(!data){
					let res = await strategy.type()
					data = res.data
				}
				this.level1 = data.level1
				this.level2 = data.level2
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "createPolicy";
</style>