export default {
	GetKLineOption:function(_DrawType=4,interval=4){
		return {
			Type: '历史K线图',  
			// NetworkFilter:NetworkFilter,
			IsAutoUpdate:true,
			AutoUpdateFrequency:1000,
			Windows: //窗口指标
			[
				{
					Index:"EMPTY", //设置为空指标
					Modify:false,Change:false,
					TitleHeight:0 //去掉指标信息标题的高度
				 },
				//  {Index:"MA",Modify: false, Change: false}, 
				// {Index:"VOL",Modify: false, Change: false}
			], 
				 
			IsCorssOnlyDrawKLine:true,
			CorssCursorTouchEnd:true,
				 
			Border: //边框
			{
				Left:   0,
				Right:  60, //右边间距
				Top:    0,
				Bottom: 0,
			}, 
			KLine:
			{
				Right:0,                            //复权 0 不复权 1 前复权 2 后复权
				Period:4,                           //周期: 0 日线 1 周线 2 月线 3 年线 
				PageSize:30,
				IsShowTooltip:false,
				DrawType:4,   //0=实心K线柱子 1=收盘价线 2=美国线 3=空心K线柱子 4=收盘价面积图
				IsShowTooltip:true,
				MaxMin:{}
			},
			KLineTitle:{
				IsShowName:false,
				IsShowSettingInfo:true //不显示周期/复权
			},
			ExtendChart:
			[
				{Name:'KLineTooltip' },	//开启手机端tooltip
			],
			Frame:  //子框架设置
			[
				{SplitCount:5,StringFormat:0,Height:4, IsShowLeftText:false,Custom: [ { Type:0,Position:'right'} ]},
				{SplitCount:3,StringFormat:0,Height:2, IsShowLeftText:false},
				{SplitCount:2,StringFormat:0,Height:2, IsShowLeftText:false}
			],
		}
	},
	PERIOD_ID:{
		KLINE_DAY_ID:0,
		KLINE_WEEK_ID:1,
		KLINE_MONTH_ID:2,
		KLINE_YEAR_ID:3,
			
		KLINE_MINUTE_ID:4, //分钟级别
		KLINE_5MINUTE_ID:5, //5分钟级别
		KLINE_15MINUTE_ID:6, //15分钟级别
		KLINE_30MINUTE_ID:7, //30分钟级别
		KLINE_60MINUTE_ID:8 ,//1小时级别
		KLINE_4HOURS_ID:12 ,//4小时级别
		
	}
}