import _request from './request.js';

export default {
    getItems(){
        return _request.request("api/deposit/items");
    },
    getBalance(currency_id){
        return _request.request("api/deposit/balance",{
            currency_id:currency_id
        },"POST");
    },
    submitDeposit(form){
        return _request.request("api/deposit/deposit",form,"POST");
    },
	getProfit(){
		return _request.request("api/deposit/profit");
	},
	changeAuto(did){
		return _request.request("api/deposit/change",{
			did:did
		},"POST");
	},
	list(param){
		return _request.request("api/deposit/list",param);
	},
	back(param){
		return _request.request("api/deposit/back",param,"POST");
	}
}