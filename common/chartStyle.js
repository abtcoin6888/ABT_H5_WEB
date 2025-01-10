export default {
	grid:{
		show : true
	},
	candle: {
		type: "area",
		bar:{
			upColor: '#2DC08E',
			downColor: '#F92855',
		},
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
				show: true,
				color: '#FFFFFF',
				textOffset: 5,
				textSize: 10,
				textFamily: 'Helvetica Neue',
				textWeight: 'normal'
			},
			// 最低价标记
			low: {
				show: true,
				color: '#FFFFFF',
				textOffset: 5,
				textSize: 10,
				textFamily: 'Helvetica Neue',
				textWeight: 'normal',
			},
			// 最新价标记
			last: {
				show: true,
				upColor: '#999',
				downColor: '#999',
				noChangeColor: '#999',
				line: {
					show: true,
					// 'solid' | 'dashed'
					style: 'dashed',
					dashedValue: [4, 4],
					size: 1,
					color:"#FFFFFF"
				},
				text: {
					show: true,
					// 'fill' | 'stroke' | 'stroke_fill'
					style: 'fill',
					size: 10,
					paddingLeft: 4,
					paddingTop: 4,
					paddingRight: 4,
					paddingBottom: 4,
					// 'solid' | 'dashed'
					borderStyle: 'solid',
					borderSize: 1,
					borderDashedValue: [0, 0],
					color: '#000000',
					family: 'Helvetica Neue',
					weight: 'normal',
					borderRadius: 0
				}
			}
		},
		tooltip: {
			  // 'always' | 'follow_cross' | 'none'
			  showRule: 'follow_cross',
			  // 'standard' | 'rect'
			  showType: 'rect',
			  candleShowType:"standard",
			  // 自定义显示，可以是回调方法也可以是数组，当是一个方法时，需要返回一个数组
			  // 数组的子项类型为 { title, value }
			  // title和value可以是字符串或者对象，对象类型为 { text, color }
			  // title 或者 title.text 可以是国际化的 key，
			  // value 或者 value.text 支持字符串模版
			  // 例如：想显示时间，开盘和收盘，配置[{ title: 'time', value: '{time}' }, { title: 'open', value: '{open}' }, { title: 'close', value: '{close}' }]
			  custom:(data)=>{
				  return [
					  { title: 'time', value: '{time}' },
					  { title: 'open', value: '{open}' },
					  { title: 'hight', value: '{high}' },
					  { title: 'close', value: '{close}' },
					  { title: 'low', value: '{low}' },
					  // { title: '涨跌额', value: "{}"},
					  { title: 'volume', value: '{volume}' }
				  ];
			  },
			  defaultValue: 'n/a',
			  rect: {
				// 'fixed' | 'pointer'
				position: 'fixed',
				paddingLeft: 0,
				paddingRight: 0,
				paddingTop: 0,
				paddingBottom: 5,
				offsetLeft: 0,
				offsetTop: 0,
				offsetRight: 0,
				offsetBottom: 5,
				borderRadius: 0,
				borderSize: 1,
				borderColor: '#dddddd',
				color: '#281e1e'
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
		}
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