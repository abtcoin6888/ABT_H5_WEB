import _request from './request.js'

export default {
	getCurrency(){
		return _request.request("api/futures/currency")
	},
	getCurrencyDep(cid){
		return _request.request("api/futures/dep",{currency_id:cid})
	},
	submitOrder(form){
		return _request.request("api/futures/submit",form,"POST");
	},
	getUorderList(currency_id = 0){
		const form = {};
		if(currency_id > 0){
			form['currency_id'] = currency_id;
		}
		return _request.request("api/futures/ulist",form);
	},
	getHistoryList(currency_id){
		return _request.request("api/futures/history",{currency_id:currency_id});
	}
}