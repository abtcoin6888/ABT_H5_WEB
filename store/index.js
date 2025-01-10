import {
	createStore
} from 'vuex';

var mthem = uni.getStorageSync('mthem');
var light = '';
if (typeof mthem != 'undefined' && mthem != '') {
	light = mthem;
	uni.setStorageSync('userTheme', mthem);
} else {
	var hour = (new Date()).getHours();
	if ((hour >= 7 && hour <= 18)) {
		uni.setStorageSync('userTheme', 'light');
		light = 'light';
	} else {
		uni.setStorageSync('userTheme', 'dark');
		light = 'dark';
	}
}
const store = createStore({
	state: {
		userinfo: false, //用户身份信息
		accounts: false, //用户余额相关信息
		config: false, //站点全局配置
		// 主题
		userTheme: light,
		userThemeIndex: light === 'light',
		lang: 'zh-Hant'
	},
	getters: {
		isLogin: state => {
			return state.userinfo === false ? false : true;
		},
		userAccount: state => {
			return state.userinfo.phone != null ? state.userinfo.phone : state.userinfo.email;
		},
		userNickname: state => {
			if (state.userinfo.nickname != null && state.userinfo.nickname != '') {
				return state.userinfo.nickname;
			}
			return state.userinfo.phone != null && state.userinfo.phone != '' ? state.userinfo.phone : state
				.userinfo.email;
		},
		userAvatar: state => {
			if (state.userinfo.avatar && state.userinfo.avatar !== null && state.userinfo.avatar !== "") {
				return state.userinfo.avatar;
			}
			return "/static/img/avatar.png";
		},
		userId: state => {
			if (state.userinfo != false && state.userinfo.id) {
				return state.userinfo.id;
			}
			return false;
		},
		userPhone: state => {
			return state.userinfo.phone != null ? state.userinfo.phone : false;
		},
		userEmail: state => {
			return state.userinfo.email != null ? state.userinfo.email : false;
		},
		googleCode: state => {
			if (!state.userinfo.google2fa || typeof state.userinfo.google2fa == 'undefined' || state.userinfo.google2fa == null) {
				return false;
			}
			return state.userinfo.google2fa != null ? state.userinfo.google2fa : false;
		},
		balanceNull: state => {
			return {
				legal_balance: "0.00",
				balance: "0.00",
				lock_balance: "0.00",
				trade_balance: "0.00",
				lock_trade: "0.00",
				contract_balance: "0.00",
				lock_contract: "0.00",
				future_balance: "0.00",
				lock_future: "0.00",
				finance_balance: "0.00",
				lock_finance: "0.00"
			}
		},
		// 主题
		userTheme: state => {
			return state.userTheme
		},
		userThemeIndex: state => {
			return state.userThemeIndex
		},
		lang: state => {
			if (typeof state.lang === 'undefined' || state.lang === '') {
				return 'zh-Hant';
			}
			return state.lang;
		}
	},
	mutations: {
		updateLang(state, val) {
			state.lang = val;
		},
		userLogin(state, _userinfo) {
			// console.log("######");
			// console.log(_userinfo);
			if (_userinfo) {
				if (_userinfo !== true) {
					state.userinfo = _userinfo;
					if (_userinfo['token']) {
						uni.setStorageSync('token', _userinfo['token']);
					}
				}
			} else {
				state.userinfo = false;
				uni.removeStorageSync('token');
			}
		},
		updateInfo(state, field) {
			state.userinfo = Object.assign({}, state.userinfo, field);
			// state['userinfo'][field] = value;
		},
		setConfig(state, data) {
			state.config = data;
		},
		updateTheme(state, data) {
			state.userTheme = data;
			// state.userThemeIndex = data.index;
			// state.theme = data.color;
			// uni.setStorageSync('userTheme', data.color)
			// uni.setStorageSync('userThemeIndex', data.index)
			// uni.setStorageSync('theme', data.color)

			// #ifdef APP-PLUS
			plus.nativeUI.setUIStyle(state.userTheme);
			// #endif
			// #ifdef H5
			let matchMedia = window.matchMedia('(prefers-color-scheme: light)')
			console.log(`当前的主题是:${state.userTheme}`)
			if (state.userTheme) {
				document.documentElement.setAttribute('data-theme', state.userTheme)
			}
			// #endif
		},
		setTabbarBg(state) {
			if (state.userTheme == 'light') {
				uni.setTabBarStyle({
					backgroundColor: '#ffffff',
					color: '#898989',
					selectedColor: '#1f1f1f'
				});
			} else {
				uni.setTabBarStyle({
					backgroundColor: '#111111',
					color: '#898989',
					selectedColor: '#ffffff'
				});
			}
		}
	}
});

export default store