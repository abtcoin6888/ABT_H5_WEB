import _request from './request.js'

export default {
	apply(post) {
		return _request.request("api/financing/apply", post, "POST");
	},
	list() {
		return _request.request("api/financing/list");
	},
	detail(param) {
		return _request.request("api/financing/detail", param);
	},
	buyList(param) {
		return _request.request("api/financing/buyList",param);
	},
	buyDetail(param) {
		return _request.request("api/financing/buyDetail",param);
	},
	cancel(param) {
		return _request.request("api/financing/cancel",param, "POST");
	},
	redemption(param) {
		return _request.request("api/financing/redemption",param, "POST");
	},
}