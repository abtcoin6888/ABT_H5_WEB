import _request from './request.js'

export default {
	getBalance(cm_id,currency_id){
		return _request.request("api/contract/getBalance",{
			cm_id : cm_id,
			currency_id : currency_id
		},"POST");
	},
	submitOrder(form){
		return _request.request("api/contract/submit",form,"POST");
	},
	getPositionList(currency_id){
		return _request.request("api/contract/list",{
			currency_id:currency_id
		},"POST");
	},
	closeOrder(form){
		return _request.request("api/contract/stop",form,"POST");
	},
	cancelOpeartion(opid){
		return _request.request("api/contract/cancel",{
			id:opid
		},"POST");
	},
	getHistory(currency_id,page = 1,ttype=0,date = ''){
		return _request.request("api/contract/history",{
			currency_id:currency_id,
			page : page,
			ttype:ttype,
			date:date
		},"POST");
	},
	/*
	 * 止盈止损的提交
	 */
	limitProfit(post){
		return _request.request("api/contract/limitProfit",post,"POST");
	},
	/**
	 * 调整仓位保证金
	 */
	changeMargin(data){
		return _request.request("api/contract/setMargin",data,"POST");
	},
	/**
	 * 合约挂单修改
	 * @param data
	 */
	limitOrderChange(data){
		return _request.request("api/contract/changeLimitOrder",data,"POST");
	}
}