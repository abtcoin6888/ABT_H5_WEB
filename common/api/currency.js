import _request from './request.js'

export default {
	tradeCurrencyList(n=0) {
		return _request.request("api/currency/getTradeCurrencyList",{n:n});
	},
	contractCurrencyList() {
		return _request.request("api/currency/getContractCurrencyList");
	},
	matchesCurrency() {
		return _request.request("api/currency/getMatchesCurrency");
	},
	getCurrencyInfo(id, cid,type=0) {
		return _request.request("api/currency/currencyinfo", {
			id: id,
			cm_id: cid,
			type:type
		}, "POST");
	},
	getRechargeLog(param) {
		return _request.request("api/currency/rechargeLog", param);
	},
	getWithLog(param){
		return _request.request("api/account/withRecord",param,"POST");
	},
	contractLine(form){
		return _request.request("api/currency/contractLine",form,"POST");
	}
}