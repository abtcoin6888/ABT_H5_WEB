## 手势图形密码

本组件是基于uniapp 的 canvas 进行封装的。

### 基础用法
```
<template>
	<view>
		<text v-if="isPass">已设置图形密码</text>
		<text v-else>未设置图形密码</text>
		<text v-if="lineError">图形密码至少需要经过3个点</text>
		<draw-lock
			:width='width'
			background="rgba(0,0,0,0)"
			:circle-width="64"
			line-color="rgb(252,64,96)"
			line-background="rgba(252,64,96,.5)"
			:height='height'
			@change="onChange"
			@start="onStart"></draw-lock>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				width: 256,
				height: 256,
				pass: '',
				isPass: false,
				lineError: false
			}
		},
		onLoad() {
			_self.isPass = uni.getStorageSync('line_pass');
		},
		methods: {
			//图形密码绘制完成
			onChange(data) {
				if (data.length < 3) {
					_self.lineError = true
					return ;
				}
				this.pass = data.join('')
				//保存图形密码
				uni.setStorageSync('line_pass', this.pass)
				//验证图形密码
				if(this.pass != this.isPass)
				{
					alert("图形密码不正确")
				}else{
					//你的逻辑
				}
			},
			onStart() {
				this.lineError = false
				this.pass = ''
			}
		}
	}
</script>
```

### Props

颜色类的参数支持HEX，RGB，RGBA

| 参数                         | 说明            | 类型                        | 默认值                                               |
| ----------------------------|---------------  | -------
| width                       |绘图区域宽度      |Number                       |300|
| height                      |绘图区域高度      |String                       |300|
| background                  |绘图区域背景颜色  |String                        | rgba(0,0,0,0)|
| line-color                  |点描边颜色        |String                       |rgb(252,64,96)|
| line-background             |点激活后背景颜色   |String                      | rgba(252,64,96,.5)|
| circle-width                |点宽度            |Number                       | 64|
| row-pont                    |点行数            |Number                       | 3|
| col-pont                    |点列数            |Number                       | 3|

### Events

| 事件名                         | 说明            | 回调参数                                               |
| ----------------------------|---------------  | -------
| start                       | 用户按下后触发      | Object |
| change                      | 绘图完成后触发      | Array |
