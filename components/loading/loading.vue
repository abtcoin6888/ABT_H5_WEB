<template>
	<view>
		<uni-popup type="center" ref="loading">
			<fui-loading type="col" :text="text" :isFixed="false"></fui-loading>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"loading",
		props:{
			text:{
				type:String,
				default:"loading"
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			open(){
				this.$refs.loading.open();
			},
			close(){
				this.$refs.loading.close();
			}
		}
	}
</script>

<style>

</style>