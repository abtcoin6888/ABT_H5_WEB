import _request from './request.js'

export default {
	type() {
		return _request.request("api/strategy/gird/type");
	},
	ai(type_id,cm_id,currency_id) {
		return _request.request('api/strategy/gird/ai?type_id='+type_id+'&cm_id='+cm_id+'&currency_id='+currency_id);
	},
	aiDetail(id) {
		return _request.request("api/strategy/gird/aiDetail?id="+id);
	},
	getBalance(currency_id) {
		return _request.request("api/strategy/gird/getBalance?currency_id="+currency_id);
	},
	add(data) {
		return _request.request("api/strategy/gird/add", data, "POST");
	},
	getList(type_id,status) {
		return _request.request("api/strategy/gird/list?type_id="+type_id+'&status='+status);
	},
	stop(data) {
		return _request.request("api/strategy/gird/stop", data, "POST");
	},
	priceUpDown(data) {
		return _request.request("api/strategy/gird/priceUpDown", data, "POST");
	},
	girdDetail(gird_id,type_id){
		return _request.request("api/strategy/gird/detail?gird_id="+gird_id+"&type_id="+type_id);
	},
	total(){
		return _request.request("api/strategy/gird/total");
	},
	useGird(data) {
		return _request.request("api/strategy/gird/useGird", data, "POST");
	},
	getInviteCode() {
		return _request.request("api/strategy/gird/getInviteCode");
	},
}