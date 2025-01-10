export default {
    props: {
		// 当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新
		disableScroll: {
		    type: Boolean,
		    default: true
		},
		// 初始化显示答案
		defaultValue: {
			type: Array,
			default: () => []
		},
		// 区域大小
		size: {
			type: [String, Number],
			default: 250
		},
		// 方块以及连线激活的颜色
		activeColor: {
			type: String,
			default: "#5D8DFB"
		},
		// 方块激活外围的颜色
		activeOutColor: {
			type: String,
			default: "#E1E9FA"
		},
		// 未激活的方块颜色
		squareColor: {
			type: String,
			default: "#eeeeee"
		},
		// 外圆边框线大小
		borderWidth: {
			type: String | Number,
			default: 0
		},
		// 外圆边框线颜色
		borderColor: {
			type: String,
			default: "#5D8DFB"
		},
		// 各项比例系数 ( 不建议修改 )
		customScale: {
			type: Object,
			default: () => {}
		},
		// canvas 的唯一标识
		canvasId: {
			type: String,
			default: "lookCanvas"
		}
	}
}