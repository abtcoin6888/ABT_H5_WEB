# liu-Slider-verify适用于uni-app项目的登陆等需求的滑块验证
### 本组件兼容小程序、H5,app
### 介绍：简单好用的滑块验证，支持偏移量（也就是说无需滑动到最右边）
# --- 扫码预览、关注我们 ---

## 扫码关注公众号，查看更多插件信息，预览插件效果！ 

![](https://uni.ckapi.pro/uniapp/publicize.png)

### 使用示例
``` 
<template>
	<view style="margin: 64rpx 32rpx;">
		<liu-slider-verify ref="verify" @change='change'></liu-slider-verify>
		<view style="margin-top: 30rpx;">是否成功：{{obj && obj.state}}</view>
		<view style="margin-top: 20rpx;">验证次数：{{obj && obj.verification}}</view>
		<button style="margin-top: 30rpx;" @click="reset">重置</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: ''
			};
		},
		methods: {
			//验证回调
			change(e) {
				console.log('验证信息：', e)
				console.log('验证是否成功：' + e.state)
				console.log('验证次数：' + e.verification)
				this.obj = e
			},
			//重置
			reset() {
				this.$refs.verify.initialization()
			}
		}
	}
</script>
```

### 属性说明
| 名称                         | 类型            | 默认值                 | 描述             |
| ----------------------------|--------------- | ---------------------- | ---------------|
| disabled                    | Boolean        | false             		| 是否禁止拖动
| offset                      | Number         | 3             		    | 偏移量（也就是说无需滑动到最右边）
| dBgColor                    | String         | #f0f0f0                | 滑动轨道默认背景色
| sBgColor                    | String         | #72c13f                | 滑动轨道滑过背景色
| dColor                      | String         | #8a8a8a             	| 默认文字颜色
| sColor                      | String         | #FFFFFF             	| 成功文字颜色
| @change                     | Function       |              	        | 验证回调
