import _request from './request.js';

export default {
	config(groupId,key=''){
		return _request.request("api/common/config",{
			group_id : groupId,
			key : key
		},"POST");
	},
	/**
	 * 注册手机验证码，指定手机号码
	 * @param {Object} phone
	 * @param {Object} area
	 */
	sendPhoneVerifyCode(phone,area){
		return _request.request("api/account/sendPhoneCode",{
			phone:phone,
			code:area.replace("+","")
		},"POST");
	},
	/**
	 * 指定邮箱验证码
	 * @param {Object} email
	 */
	sendEmailVerifyCode(email){
		return _request.request("api/account/sendEmailCode",{
			email:email
		},"POST");
	},
	validatePhoneCode(phone,area,code){
		return _request.request("api/account/verifyPhoneCode",{
			phone:phone,
			area:area,
			code:code
		},"POST");
	},
	/**
	 * 发送手机通用验证码
	 * @param {Object} phone
	 */
	sendUnCodePhone(phone){
		return _request.request("api/user/sendUnCodePhone",{phone:phone},"POST");
	},
	/**
	 * 发送邮件通用验证码
	 * @param {Object} email
	 */
	sendUnCodeEmail(email){
		return _request.request("api/user/sendUnCodeEmail",{email:email},"POST");
	},
	/**
	 * 用户手机号注册
	 */
	phoneRegister(info){
		return _request.request("api/account/phoneRegister",info,"POST");
	},
	/**
	 * 邮箱注册
	 */
	emailRegister(info){
		return _request.request("api/account/emailRegister",info,"POST");
	},
	login(form){
		return _request.request("api/account/login",form,"post");
	},
	/**
	 * 找回密码验证码发送
	 */
	sendFindCode(account,type,area=''){
		return _request.request("api/account/sendFindPwdCode",{
			account:account,
			area:area.replace("+",""),
			type:type
		},"POST");
	},
	/**
	 * 找回密码设置
	 */
	findPwdSet(info){
		return _request.request("api/account/changePwdByCode",info,"POST");
	},
	/**
	 * 用户信息
	 */
	userinfo(){
		return _request.request("api/account/userinfo",{},"POST");
	},
	getbaseUrl(){
		return _request.getBaseUrl()+"/api/upload/image";
	},
	uploadFile(file){
		return new Promise((resolve,reject)=>{
			let lang = uni.getStorageSync('lang','zh_CN');
			let token = uni.getStorageSync('token','');
			// #ifdef APP-PLUS
			let device = 1;
			// #endif
			// #ifdef H5
			let device = 0;
			// #endif
			var timestamp = Date.parse(new Date()) / 1000;
			uni.uploadFile({
				url:_request.getBaseUrl()+"/api/upload/image",
				filePath:file,
				name:"file",
				files:[
					{
						name:"file",
						uri:file
					}
				],
				header:{
					"Accept-Language":lang ? lang : 'zh_CN',
					"Authorization":"Bearer "+token,
					"Client-Device":device,
					"Timetamp":timestamp
				},
				success(res) {
					resolve(res);
				},
				fail(res) {
					reject(res);
				}
			});
		});
	},
	saveUploadAvatar(url){
		return _request.request("api/account/saveAvatar",{
			url:url
		},"POST");
	},
	saveNickname(nickname){
		return _request.request("api/account/changeNickname",{
			nickname:nickname
		},"POST");
	},
	/**
	 * 幻灯片接口
	 */
	getBanner(code='banner'){
		return _request.request("api/position/detail",{
			code:code
		});
	},
	/**
	 * 公告接口
	 */
	getNotice(){
		return _request.request("api/position/detail",{
			code:"index_notice"
		})
	},
	/*
	 * 获取充值币种列表
	 */
	getRechargeCurrency(price){
		return _request.request("api/currency/list",{price:price});
	},
	getNetList(currency_id){
		return _request.request("api/currency/network",{
			currency_id:currency_id
		});
	},
	getRechargeToken(chanId){
		return _request.request("api/currency/address",{
			id:chanId
		});
	},
	saveRecharge(param){
		return _request.request("api/currency/saveRecharge",param);
	},
	/*
	 * 获取带余额的币种列表
	 */
	getAccountCurrency(){
		return _request.request("api/currency/accountCurrency");
	},
	/*
	 * 提现申请提交
	 */
	postWithdraw(form){
		return _request.request("api/currency/withdraw",form,"POST");
	},
	/*
	 * 资金划转
	 */
	postExchange(form){
		return _request.request("api/currency/transfer",form,"POST");
	},
	articleDetail(form){
		return _request.request("api/article/detail",form,"GET");
	},
	/*
	 * 获取货币兑换汇率
	 */
	getCurrencyFee(currency){
		return _request.request("api/common/getCurrencyFee",{
			currency:currency
		},"POST");
	},
	/*
	 * 获取公告列表
	 */
	getNoticeList(page = 1){
		return _request.request("api/position/noticeList",{page:page},"GET");
	},
	/*
	 * 检测升级更新
	 */
	checkUpdate(){
		return _request.request("api/common/version");
	},
	/**
	 * 站内信息
	 */
	getMessage(){
		return _request.request("api/message/appMessageList");
	},
	/**
	 * google 登录的身份验证
	 * @param {Object} email
	 * @param {Object} token
	 */
	googleLogin(email,token){
		return _request.request("api/account/googleAuth",{
			email:email,
			token:token
		},"POST");
	},
	/**
	 * 获取ip信息
	 */
	getRequestInfo(){
		return _request.request("api/common/getCountry");
	},
	/**
	 * 获取返佣配置
	 */
	getShareConfig(){
		return _request.request("api/common/getShareConfig");
	},
	/**
	 * 保存用户邀请连接配置
	 */
	saveShareSetting(form){
		return _request.request("api/account/saveShareSetting",form,"POST");
	},
	getShareSetting(){
		return _request.request("api/account/shareSetting");
	},
	setShareDefault(id){
		return _request.request("api/account/setShareDefault",{id:id},"POST");
	},
	getDefaultShare(){
		return _request.request("api/account/getDefaultShare");
	},
	getShareData(){
		return _request.request("api/account/getShareData");
	},
	getAssetsGroup(interval){
		return _request.request("api/account/assetsGroup",{interval:interval});
	},
	getKline(_currency_id,_interval = '1s',_limit=120){
		return _request.request("api/currency/contractLine",{
			interval: _interval,
			currency_id: _currency_id,
			limit:_limit
		},"POST");
	},
	
	/**
	 * 获取新手任务列表
	 */
	getNewUserTaskList(t=0){
		return _request.request("api/task/list",{r:t});
	},
	/**
	 * 用户签到配置
	 */
	getQdList(){
		return _request.request("api/task/signinList");
	},
	userSign(day){
		return _request.request("api/task/sign",{day:day},"GET");
	},
	getAvaAmount(){
		return _request.request("api/task/getAvaAmount");
	},
	getCompletedList(){
		return _request.request("api/task/completed");
	},
	activeWithdraw(){
		return _request.request("api/task/withdraw");
	},
	getReward(task_id,reward_id){
		return _request.request("api/task/getReward",{
			task_id : task_id,
			reward_id: reward_id
		},"POST");
	},
	//c2c api
	getMerchantList(){
		return _request.request("api/order/merchant");
	},
	c2cSubmit(form){
		return _request.request("api/order/add",form,"POST");
	},
	cancelCOrder(id){
		return _request.request("api/order/cancel",{id:id},"POST");
	},
	c2cOrderStatus(id){
		return _request.request("api/order/status",{id:id},"GET");
	},
	payed(id){
		return _request.request("api/order/payed",{id:id},"POST");
	},
	c2cComplete(id){
		return _request.request("api/order/complete",{id:id});
	},
	c2cOrder(page){
		return _request.request("api/order/order-list",{page:page},"GET");
	},
	/**
	 * 活动获取
	 */
	mingActive(){
		return _request.request("api/mint/current");
	},
	mingInfo(){
		return _request.request("api/mint/my");
	},
	mingTeamList(t){
		return _request.request("api/mint/list",{type:t});
	},
	startMin(f){
		return _request.request("api/mint/start",{click:f ? 1 : 0},"POST");
	},
	mainActive(){
		return _request.request("api/common/appActive");
	},
	getServerTime(){
		return _request.request("api/common/getServerTime");
	},
	qrcodeLogin(uid){
		//扫码登录
		return _request.request("api/account/qrcode-logi",{uuid:uid},"GET");
	},
	walletLogin(data){
		return _request.request("api/account/wallet-login",data,"POST");
	},
	//获取合约盈亏统计
	analyze(data){
		return _request.request("api/common/analyze",data,"POST")
	},
	//增加地址本
	addBook(data){
		return _request.request("api/account/addAddressBook",data,"POST")
	},
	//获取地址本列表
	getAddressBook(){
		return _request.request("api/account/getAddressBook");
	},
	delAddressBook(data){
		return _request.request("api/account/delAddressBook",data,"POST");
	},
	//闪兑
	fastExchange(data){
		return _request.request("api/account/fastExchange",data,"POST");
	}
}