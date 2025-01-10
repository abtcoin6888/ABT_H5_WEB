import config from './config.js'

const langMap = {
	'zh_Hans':"zh_CN",
	'en':"en",
	'zh':'zh_CN',
	'zh-Hant':'zh-Hant',
	'ja':'ja',
	'ko':'ko'
};

export default {
	request(url,data = {},method="GET"){
		let lang = uni.getStorageSync('lang','zh-Hant');
		let token = uni.getStorageSync('token','');
		// #ifdef APP-PLUS
		var device = 1;
		// #endif
		// #ifdef H5
		var device = 0;
		// #endif
		var timestamp = Date.parse(new Date()) / 1000;
		let _this = this;
		return new Promise((resolve, reject)=>{
			uni.request({
				url:config.BASR_URL+"/"+url,
				method:method,
				data:data ? data : {},
				timeout:10000,
				header:{
					"Accept-Language":lang ? (langMap[lang] ? langMap[lang] : 'zh-Hant') : 'zh-Hant',
					"Authorization":"Bearer "+token,
					"Client-Device":device,
					"Timetamp":timestamp,
				},
				success(response) {
					response = _this.checkResponse(response,url);
					resolve(response.data);
				},
				fail(error) {
					console.log("接口："+url+"请求失败："+JSON.stringify(error),"请求内容："+JSON.stringify(data));
					reject(error)
				}
			})
		});
	},
	checkResponse(response,url){
		if(response.data.code === 500){
			console.log(response,url);
			uni.showToast({
				title:"server error",
				duration:3000,
				icon:"none"
			});
			return false;
		}
		if(response.data.code === 1001){//未登录
			throw new Error('not login break')
		}
		return response;
	},
	getBaseUrl(){
		return config['BASR_URL'];
	}
}