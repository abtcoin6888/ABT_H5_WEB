import _request from './request.js'

export default {
	open(post) {
		return _request.request("api/box/open", post, "POST");
	},
	getTradeBalance() {
		return _request.request("api/box/getTradeBalance");
	},
	log(param) {
		return _request.request("api/box/log", param);
	},
}