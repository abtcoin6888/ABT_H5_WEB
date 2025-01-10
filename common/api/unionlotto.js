import _request from './request.js'

export default {
	list(param) {
		return _request.request("api/unionlotto/list", param);
	},
	betting(post) {
		return _request.request("api/unionlotto/betting", post, "post");
	},
	bettingList(param) {
		return _request.request("api/unionlotto/bettingList", param);
	},
	bettingPrev(param) {
		return _request.request("api/unionlotto/bettingPrev", param);
	},
}