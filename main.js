import App from './App'
//lang
import en from './local/en.json';
import zh_Hant from "./local/zh-Hant.json"
import ja from './local/ja.json'
import ko from './local/ko.json'
import gm from './local/gm.json'
import ru from './local/ru.json'
import th from './local/th.json'
import au from './local/au.json'

const messages = {
    'en' : en,
    'zh-Hant':zh_Hant,
    'ja' : ja,
    'ko' : ko,
    'gm' : gm,
    'ru' : ru,
    'th' : th,
    'au' : au
}
const localLang = uni.getStorageSync('lang');
let i18nConfig = {
    // zh_Hans
    locale: typeof localLang != 'undefined' && localLang != '' ? localLang : 'en', messages
}

import 'vant/lib/index.css'
import {Popup} from 'vant';
import {DatePicker} from 'vant';

//import socket from './common/socket.js'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import VueI18n from 'vue-i18n'// v8.x
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    i18n,
    ...App
})
app.$mount()
// #endif


// #ifdef VUE3
import {createSSRApp} from 'vue'
import {createI18n} from 'vue-i18n'

const i18n = createI18n(i18nConfig)
import router from './common/route.js';
import util from './common/util.js';
import store from './store/index.js';
import mixin from "./common/theme/theme.js"

import Vuex from 'vuex'

const device = uni.getSystemInfoSync();

const platform = device.osName;

export function createApp() {
    const app = createSSRApp(App)
    app.use(i18n)
    app.use(store)
    app.use(Popup)
    app.use(DatePicker)
	app.use(mixin)
    app.config.globalProperties.$mroute = router
    app.config.globalProperties.$device = device
    app.config.globalProperties.$util = util
    app.config.globalProperties.$platform = platform
	// #// #ifdef APP
	//app.config.globalProperties.$socket = socket;
	////#endif
    return {
        app,
		Vuex
    }
}

// #endif