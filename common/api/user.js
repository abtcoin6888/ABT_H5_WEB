import _request from './request.js';

export default {
	/**
	 * 基础认证资料
	 */
	baseAuthInfo(){
		return _request.request("api/user/getCredential",{},"GET");
	},
	/**
	 * 提交认证信息
	 * @param {Object} info
	 */
	submitAuthInfo(info){
		return _request.request("api/user/credential",info,"POST");
	},
	/**
	 * 高级认证资料提交
	 * @param {Object} url
	 */
	submitHightAuth(url){
		return _request.request("api/user/authHight",{
			url : url
		},"POST");
	},
	/**
	 * 邮箱验证码,通过身份
	 */
	sendEmailCode(){
		return _request.request("api/user/sendBindEmailCode",{},"GET");
	},
	/**
	 * 手机验证码，通过身份
	 */
	sendPhoneCode(){
		return _request.request("api/user/sendBindPhoneCode",{},"GET");
	},
	/**
	 * 绑定邮箱
	 */
	submitBindEmail(info){
		return _request.request("api/user/bindEmail",info,"POST");
	},
	submitBindPhone(info){
		return _request.request("api/user/bindPhone",info,"POST");
	},
	/**
	 * 修改邮箱
	 * @param {Object} info
	 */
	submitChangeEmail(info){
		return _request.request("api/user/changeEmail",info,"POST");
	},
	submitChangePhone(info){
		return _request.request("api/user/changePhone",info,"POST");
	},
	/**
	 * 获取谷歌验证码code
	 */
	getGoogleCode(){
		return _request.request("api/google2fa/getSecret",{},"GET");
	},
	/**
	 * 绑定谷歌验证码
	 * @param {Object} info
	 */
	setGoogleSecret(info){
		return _request.request("api/google2fa/bindSecret",info,"POST");
	},
	/**
	 * 修改密码
	 */
	changePwd(info){
		return _request.request("api/setting/changePassword",info,"POST");
	},
	/**
	 * 安全记录
	 * @param {Object} page
	 */
	secretLog(type,page=1){
		return _request.request("api/user/log",{
			type:type,
			page : page
		},"GET");
	},
	/**
	 * 指定币种的账户余额
	 */
	getCurrencyBalance(currency_id){
		return _request.request("api/user/currencyBalance",{
			currency_id:currency_id
		},"POST");
	},
	getUBalance(){
		return _request.request("api/user/uBalance");
	},
	/**
	 * 资产
	 */
	getBalance(){
		return _request.request("api/account/balance",{},"POST");
	},
	/**
	 * 资产流水
	 */
	getCpitalFlow(param){
		return _request.request("api/account/capitalFlow",param);
	},
	/**
	 * 通过身份获取验证码类型
	 */
	getUniCode(){
		return _request.request("api/account/getUniCode",{},"POST");
	},
	getPaymentList(){
		return _request.request("api/paymentMethod/list");
	},
	savePayment(form){
		return _request.request("api/paymentMethod/add",form,"POST");
	},
	/**
	 * 验证账户密码
	 * @param {Object} pwd
	 */
	verifyPassword(pwd){
		return _request.request("api/account/verify-password",{password:pwd},"POST");
	}
}