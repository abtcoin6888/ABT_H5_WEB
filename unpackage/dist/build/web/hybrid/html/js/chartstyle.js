const chartStyle = {
	candle: {
		type: "area",
		area: {
			lineSize: 1,
			lineColor: '#2196F3',
			value: 'close',
			backgroundColor: [{
				offset: 0,
				color: 'rgba(33, 150, 243, 0.01)'
			}, {
				offset: 1,
				color: 'rgba(33, 150, 243, 0.2)'
			}]
		},
		priceMark: {
			show: true,
			// 最高价标记
			high: {
				show: false,
				color: '#D9D9D9',
				textOffset: 5,
				textSize: 10,
				textFamily: 'Helvetica Neue',
				textWeight: 'normal'
			},
			// 最低价标记
			low: {
				show: false,
				color: '#D9D9D9',
				textOffset: 5,
				textSize: 10,
				textFamily: 'Helvetica Neue',
				textWeight: 'normal',
			},
			// 最新价标记
			last: {
				show: true,
				upColor: '#2979ff',
				downColor: '#2979ff',
				noChangeColor: '#2979ff',
				line: {
					show: true,
					// 'solid' | 'dashed'
					style: 'dashed',
					dashedValue: [4, 4],
					size: 1
				},
				text: {
					show: true,
					// 'fill' | 'stroke' | 'stroke_fill'
					style: 'fill',
					size: 11,
					paddingLeft: 4,
					paddingTop: 4,
					paddingRight: 4,
					paddingBottom: 4,
					// 'solid' | 'dashed'
					borderStyle: 'solid',
					borderSize: 1,
					borderDashedValue: [2, 2],
					color: '#fff',
					family: 'Helvetica Neue',
					weight: 'bold',
					borderRadius: 2
				}
			}
		},
		tooltip: {
			  // 'always' | 'follow_cross' | 'none'
			  showRule: 'follow_cross',
			  // 'standard' | 'rect'
			  showType: 'standard',
			  candleShowType:"standard",
			  // 自定义显示，可以是回调方法也可以是数组，当是一个方法时，需要返回一个数组
			  // 数组的子项类型为 { title, value }
			  // title和value可以是字符串或者对象，对象类型为 { text, color }
			  // title 或者 title.text 可以是国际化的 key，
			  // value 或者 value.text 支持字符串模版
			  // 例如：想显示时间，开盘和收盘，配置[{ title: 'time', value: '{time}' }, { title: 'open', value: '{open}' }, { title: 'close', value: '{close}' }]
			  custom: [{ title: 'high', value: '{high}' }, { title: 'price', value: '{close}' },{ title: 'low', value: '{low}' }],
			  defaultValue: 'n/a',
			  rect: {
				// 'fixed' | 'pointer'
				position: 'pointer',
				paddingLeft: 0,
				paddingRight: 0,
				paddingTop: 0,
				paddingBottom: 5,
				offsetLeft: 10,
				offsetTop: 0,
				offsetRight: 10,
				offsetBottom: 5,
				borderRadius: 4,
				borderSize: 1,
				borderColor: '#f2f3f5',
				color: '#FEFEFE'
			  },
			  text: {
				size: 12,
				family: 'Helvetica Neue',
				weight: 'normal',
				color: '#000000',
				marginLeft: 10,
				marginTop: 8,
				marginRight: 6,
				marginBottom: 0
			}
		}
		
	},
	// x轴
	xAxis: {
		show: true,
		size: 'auto',
		// x轴线
		axisLine: {
			show: false,
			color: '#888888',
			size: 0
		},
		// x轴分割文字
		tickText: {
			show: true,
			color: '#D9D9D9',
			family: 'Helvetica Neue',
			weight: 'normal',
			size: 12,
			marginStrat: 4,
			marginBottom: 10
		},
		// // x轴分割线
		// tickLine: {
		// 	show: true,
		// 	size: 1,
		// 	length: 3,
		// 	color: '#888888'
		// }
	},
	yAxis: {
		show: true,
		size: 'auto',
		// 'left' | 'right'
		position: 'right',
		// 'normal' | 'percentage' | 'log'
		type: 'normal',
		inside: true,
		reverse: false,
		// y轴线
		axisLine: {
		  show: false,
		  color: '#888888',
		  size: 0
		},
		// x轴分割文字
		tickText: {
		  show: true,
		  color: '#666666',
		  family: 'Helvetica Neue',
		  weight: 'normal',
		  size: 12
		},
		// x轴分割线
		tickLine: {
		  show: false,
		  size: 0,
		  length: 3,
		  color: '#888888'
		}
	}
}