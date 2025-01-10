import _request from './request.js'

export default {
	tradeSubmit(post){
		return _request.request("api/trade/submit",post,"POST");
	},
	tradeOrderList(currency_id){
		return _request.request("api/trade/list",{
			currency_id:currency_id
		},"POST");
	},
	orderCancel(ids){
		return _request.request("api/trade/cancel",{
			id : ids
		},"POST");
	},
	orderHistory(currency_id,page=1){
		return _request.request("api/trade/history",{
			currency_id : currency_id,
			page : page
		},"POST");
	}
}