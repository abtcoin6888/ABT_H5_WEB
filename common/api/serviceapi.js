import _request from './request.js'

export default {
	getContact(){
		return _request.request("api/service/getContact");
	}
}