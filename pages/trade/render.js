import { init, dispose } from 'klinecharts'
import chartStyle from '../../common/chartStyle.js';

var chart = false;
var MAID = false;
var last;
var them ;

var firstPrice = 0;
var firstTime = 0;
var maxPrice = 0;
var minPrice = 0;

const time = [
	0,
	1,
	5,
	15,
	30,
	60,
	240,
	720,
	1440,
	10080
]

var lastIndictor = 'MA';

export default {
	data(){
		return {
			history:[],
			decimals:2,
			interval:0,
			bar:{
				upColor: '#2DC08E',
				downColor: '#F92855',
				upBorderColor:"#2DC08E",
				downBorderColor:"#F92855"
			}
		}
	},
	mounted(){
	},
	methods:{
		setThem(t){
			if(t !== ""){
				them = t;
			}		
		},
		setDecimals(e){
			this.decimals = e.decimals; 
		},
		setBar(e){
			if(e){
				this.bar.upColor = e.up;
				this.bar.upBorderColor = e.up;
				this.bar.downColor = e.dn;
				this.bar.downBorderColor = e.dn;
			}
		},
		update(ticker){
			if(!chart){
				return true;
			}
			if(this.interval === 0){
				firstPrice = parseFloat(ticker['c']);
				chart.updateData({
					timestamp:ticker['E'],
					open:firstPrice,
					close:firstPrice,
					high:firstPrice,
					low:firstPrice,
					volume:parseInt(ticker['Q']),
					turnover:parseInt(ticker['Q']),
				});
			}
			if(this.interval != 0){
				var minint = time[this.interval] * 60 * 1000;
				firstPrice = parseFloat(ticker['c']);
				if(parseInt(ticker['E']) - last['timestamp'] > minint){
					var data = {
						timestamp:parseInt(ticker['E']),
						open:firstPrice,
						close:firstPrice,
						high:firstPrice,
						low:firstPrice,
						volume:parseInt(ticker['Q']),
						turnover:parseInt(ticker['Q']),
					};
					chart.updateData(data);
					last = data;
				}else{
					var data = {
						timestamp:last['timestamp'],
						open:last['open'],
						close:firstPrice,
						high:last['high'] < firstPrice ? firstPrice : last['high'],
						low:last['low'] > firstPrice ? firstPrice : last['low'],
						volume:last['volume'] + parseInt(ticker['Q']),
						turnover:last['volume'] + parseInt(ticker['Q']),
					};
					chart.updateData(data);
					last = data;
				}
			}
		},
		initChart(response){
			if(!response){
				return true;
			}
			if(chart){
				// #ifdef H5
				try{
					document.getElementById('kline').innerHTML = '';
					chart.dispose();
					// chart = false;
				}catch(e){}
				chart = false;
				// #endif
			}
			if(!chart){
				chart = init('kline');
				// 样式
				let textColor = them === 'light' ? '#333333' : '#FFFFFF';
				let lineColor = them === 'light' ? '#ffffff' : '#333333';
				let bgcolor = them === 'light' ? "#999" : "#999";
				
				chartStyle.candle.tooltip.text.color = bgcolor;
				chartStyle.candle.tooltip.text.borderColor = bgcolor;
				chartStyle.candle.tooltip.rect.color = textColor;
				chartStyle.xAxis.axisLine.color = lineColor;
				chartStyle.xAxis.tickText.color = textColor;
				chartStyle.yAxis.axisLine.color = lineColor;
				chartStyle.yAxis.tickText.color = textColor;
				chartStyle.yAxis.tickLine.color = lineColor;
				chartStyle.candle.priceMark.high.color = textColor;
				chartStyle.candle.priceMark.low.color = textColor;

				chartStyle.candle.priceMark.last.upColor = textColor;
				chartStyle.candle.priceMark.last.downColor = textColor;
				chartStyle.candle.priceMark.last.noChangeColor = textColor;
				chartStyle.candle.priceMark.last.line.color = lineColor;
				chartStyle.candle.priceMark.last.text.color = them === 'light' ? '#FFFFFF' : '#333333';
				
				chartStyle.grid.show = false;
				chartStyle.candle.bar = !this.bar ? {
					upColor: '#2DC08E',
					downColor: '#F92855',
					upBorderColor:"#2DC08E",
					downBorderColor:"#F92855"
				} : this.bar;

				chart.setStyles(chartStyle);
				
				// 创建一个副图技术指标MACD
				// var macd = chart.createIndicator({
				// 	name:"MACD",
				// 	calcParams:[7, 16, 31]
				// },false,{ id: 'candle_panef-MACD' });
				
				MAID = chart.createIndicator({
					name:"MA",
					calcParams:[7, 15, 30]
				},false,{ id: 'candle_pane' })
				
				// 创建一个副图技术指标VOL
				chart.createIndicator({
					name:"VOL",
					calcParams:[7,16,31]
				},false,{ id: 'candle_panef-VOL' });
				window.addEventListener('resize', () => {
				    chart.resize();
				});
				
			}
			// chart.setPriceVolumePrecision(this.decimals,this.decimals);
			if(parseInt(response.interval) !== 0){
				chart.setStyles({
					candle:{
						type:"candle_solid"
					}
				});
				MAID = chart.createIndicator({
					name:"MA",
					calcParams:[5, 10, 30]
				},false,{ id: 'candle_pane' });
			}else{
				chart.removeIndicator('candle_pane');
				chart.setStyles({
					candle:{
						type:"area"
					}
				});
			}

			var klineData = [];
			for(var i = 0 ; i < response.data.data.length;i++){
				klineData.push({
					timestamp:response.data.data[i]['time'],
					open:response.data.data[i]['open'],
					close:response.data.data[i]['close'],
					high:response.data.data[i]['high'],
					low:response.data.data[i]['low'],
					volume:response.data.data[i]['vol'],
					turnover:response.data.data[i]['amount'],
				});
			}
			last = klineData[klineData.length - 1];
			this.interval = response.interval;
			chart.applyNewData(klineData);
			chart.setPriceVolumePrecision(this.decimals,this.decimals);
		},
		switchChart(e){
			if(!chart){
				return;
			}
			if(e==='MA'){
				var params = [5,10,30];
			}
			if(e !== 'MA'){
				MAID = false;
			}
			if(e === false){
				chart.removeIndicator('candle_pane');
			}
			chart.createIndicator({
				name:e,
				calcParams:params
			},false,{ id: 'candle_pane' });
			lastIndictor = e;
			// if(!MAID){
			// 	MAID = 
			// }else{
			// 	chart.removeIndicator('candle_pane');
			// }
		},
		switchCharts(e){
			if(!chart){
				return;
			}
			chart.removeIndicator('candle_panef-VOL','VOL');
			chart.removeIndicator('candle_panef-MACD','MACD');
			chart.removeIndicator('candle_panef-KDJ','KDJ');
			chart.removeIndicator('candle_panef-RSI','RSI');
			e.map((item)=>{
				var params = [];
				if(item === 'VOL'){
					params = [7,15,30];
				}
				if(item === 'MACD'){
					params = [12,26,9];
				}
				
				if(item === 'KDJ'){
					params = [9,3,3];
				}
				if(item === 'RSI'){
					params = [7,15,30];
				}
				chart.createIndicator({
					name:item,
					calcParams:params
				},false,{ id: 'candle_panef-'+item });
				
				// 创建一个副图技术指标VOL
				// chart.createIndicator({
				// 	name:"VOL",
				// 	calcParams:[7,16,31]
				// });
			});
		}
	}
}