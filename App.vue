<script>
import config from '/common/api/config.js';
import {mapMutations, mapGetters} from 'vuex';
import common from '/common/api/common.js';
import uniwebsocket from '@/uni_modules/veo-uniwebsocket/js_sdk/uniWebsocket.js'
import fwebsocket from '@/uni_modules/veo-uniwebsocket/js_sdk/Websocket.js'


let socketPing; //socket 定时器管理
let updateSet = false; //用户信息上报
let updateCset = false;

let retry = 0;
let init = 0;

let hiddenTime = 0;

let startTime = 0;
export default {
    data() {
        return {
            retryDelay: 1000,
            maxRetryDelay: 30000,
            isReconnecting: false
        };
    },
    globalData: {
        socket: false,
        csocket: false,
        worker:null
    },
    computed: {
        ...mapGetters(['isLogin', 'userId', 'userTheme'])
    },
    onLaunch: function () {
        let _this = this;
        const lang = uni.getStorageSync('lang');
        if(typeof lang !== 'undefined' || lang !== ''){
            this.updateLang(lang);
        }
        this.getConfig();
        this.connect();
        this.connectContractSocketServer();
        this.autoLogin();
        this.getServerTime();

        this.getLocal();

        // #ifdef APP
		//app 端使用高效的udp协议来进行行情数据的接收 , 留着以后改他，性能不好的时候使用udp协议推送行情
		// this.$socket.receivedStatus = function(status) {
		//     //服务器返回状态 0 - success 1 fail
		//     if (parseInt(status) === 0) {
		        
		//     } else if (parseInt(status) === 1) {
		//         //UDP断开连接
		//         console.log('udp socket 断开连接');
		//     }
		// };
		// _this.$socket.init(config['UDP_IP'],config['UDP_PORT'],'UTF-8');
        // #endif

        uni.$on('reconnect', () => {
            _this.reconnectAllSockets();
        });
		
		// 修改语言时重新连接 socket
		uni.$on('switchLan', () => {
		    var lang = uni.getStorageSync('lang');
			console.log("切换语言",lang);
			
			// console.log(this.globalData.socket.url, this.globalData.socket);
			const url = config['BASE_WSS'] + '/?token=' + this.$device.deviceId + '$trade' + '&sub=trade';
			const curl = config['BASE_WSS'] + '/?token=' + this.$device.deviceId + '$contract' + '&sub=contract';
			this.globalData.socket.url = url + '&locale=' + lang
			this.globalData.csocket.url = curl + '&locale=' + lang
			this.reconnectAllSockets();
		});

        // #ifdef APP-PLUS
        uni.onNetworkStatusChange(function (status) {
            if (status.isConnected) {
                _this.reconnectAllSockets();
            }
        });

        uni.onAppHide(() => {
            hiddenTime = Date.now();
        });

        uni.onAppShow(() => {
            if (init === 0) {
                init = 1;
            } else {
                if ((Date.now() - hiddenTime) / 1000 >= 30) {
                    hiddenTime = 0;
                    _this.reconnectAllSockets();
                }
            }
        });
        // #endif
		
		startTime = (new Date()).getTime();

		// Worker('common/estimateProfit.js').then(res=>{
		// 	this.globalData.worker = res;
		// 	this.globalData.worker.postMessage(123)
		// })
        // console.log(this.globalData.worker);
    },
    onLoad() {
		
    },
    onShow: function () {
        if (this.userTheme) {
            this.updateTheme(this.userTheme)
        }
        // if (this.userTheme) {
        //     this.toggleUserTheme(this.userTheme);
        // } else {
        //     this.toggleUserTheme('light', 0);
        // }
        //this.walletLogin();
		this.checkSocketConnected();
    },
    onPullDownRefresh() {},
    onHide: function () {
    },
    methods: {
        ...mapMutations(['setConfig', 'userLogin', 'updateTheme','updateLang']),
        reconnectAllSockets() {
            try{
                this.globalData.socket.close();
				this.globalData.socket.restart();
            }catch (e){}
            
            try{
                this.globalData.csocket.close();
				this.globalData.csocket.restart();
            }catch (e){}
        },
		checkSocketConnected(){
			if((new Date()).getTime() - startTime >= 5 * 60 * 1000){
				try{
					this.globalData.socket.send({type:"ping"});
					if(this.globalData.socket.getStatus() === 0){
						this.connectContractSocketServer();
						this.connect();
					}
				}catch(e){
					this.connectContractSocketServer();
					this.connect();
				}
			}
			
		},
        async walletLogin(){
            // #ifdef H5
            let token = false;
            if(window.tronWeb){
                token = window.tronWeb.defaultAddress.base58;
            }
            if(window.ethereum){
                let res = await window.ethereum.enable();
                console.log(res);
                token = res[0];
            }
            if(token !== false){
                let data = {
                    token : token
                }
                let invaiteCode = uni.getStorageSync('invite_code');
                if(typeof invaiteCode !== 'undefined' && invaiteCode !== ''){
                    data['invite_code'] = invaiteCode;
                }
                common.walletLogin(data).then(res=>{
                    this.userLogin(res.data);
                });
            }
            // #endif
        },
        autoLogin() {
            //自动登录
            common.userinfo().then((res) => {
                if (res.code === 200) {
                    this.userLogin(res.data);
                } else {
                    this.userLogin(false);
                    uni.removeStorageSync('token');
                }
            });
        },
        getConfig() {
            //启动时加载全局配置信息
            common.config(1).then((res) => {
                this.setConfig(res.data);
            });
        },
        connect() {
            let _this = this;
			var lang = uni.getStorageSync('lang');
            const url = config['BASE_WSS'] + '/?token=' + this.$device.deviceId + '$trade' + '&sub=trade&locale=' + lang;
            const Socket = new uniwebsocket(
                url,
                function (data) {
                    _this.onMessage(data);
                }
            );
            this.globalData.socket = Socket;
            this.updateSocketUid();
            uni.$emit('connect');
            socketPing = setInterval(() => {
                if (Socket.getStatus() === 0) {
                    Socket.restart();
                }
            }, 3000);
        },
        connectContractSocketServer() {
            let _this = this;
			var lang = uni.getStorageSync('lang');
            const url = config['BASE_WSS'] + '/?token=' + this.$device.deviceId + '$contract' + '&sub=contract&locale=' + lang;
            const Socket = new fwebsocket(
                url,
                function (data) {
                    _this.onContractMessage(data);
                }
            );
            this.globalData.csocket = Socket;
            this.updateCsocketUid();
            uni.$emit('cconnect');
            setInterval(() => {
                if (Socket.getStatus() === 0) {
                    Socket.restart();
                }
            }, 3000);


        },
        onContractMessage(message) {
            //合约行情数据分发
            try {
                try {
                    uni.$emit('contract', message);
                } catch (e) {
                }
                var pages = getCurrentPages();
                if (pages[pages.length - 1].onContractMessage) {
                    pages[pages.length - 1].onContractMessageHandler(message);
                    //uni.$emit('contract',message);
                }
            } catch (e) {
            }
        },
        onMessage(message) {
            //现货行情数据分发
            try {
                var data = message.data;
                data['type'] = message.type;
                try {
                    uni.$emit('trades', data);
                } catch (e) {}
                var pages = getCurrentPages();
                if (pages[pages.length - 1].onTradeMessage) {
                    message.data['type'] = message.type;
                    pages[pages.length - 1].onTradeMessage(message.data);
                }
            } catch (e) {
            }
        },
        updateSocketUid() {
            //用户登录后，自动定时上报身份信息
            if (updateSet) {
                clearInterval(updateSet);
            }
            updateSet = setInterval(() => {
                if (this.isLogin && this.userId) {
                    try {
                        this.globalData.socket.send({
                            event: 'updateUserId',
                            uid: this.userId
                        });
                    } catch (e) {
                        this.globalData.socket.restart();
                    }
                }
            }, 5000);
        },
        updateCsocketUid() {
            //维护合约连接的身份信息
            if (updateCset) {
                clearInterval(updateCset);
            }
            updateCset = setInterval(() => {
                if (this.isLogin && this.userId) {
                    this.globalData.csocket.send({
                        event: 'updateCuserId',
                        uid: this.userId
                    });
                }
            }, 5000);
        },
        getServerTime() {
            common.getServerTime().then(res => {
                uni.setStorageSync('time_zone', res.data.zone);
            })
        },
        //本地化货币和语言设置
        getLocal() {
            const lmap = {
                TW: 'zh-Hant',
                HK: 'zh-Hant',
                MO: 'zh-Hant',
                JP: 'ja',
                KR: 'ko'
            };

            const jpy = {
                text: this.$t('setup.jpy'),
                value: 'JPY',
                symbol: '¥'
            };
            const usd = {
                text: this.$t('setup.usd'),
                value: 'USD',
                symbol: '$'
            };
            const cmap = {
                JP: jpy
            };
            common.getRequestInfo().then((res) => {
                if (res.code === 200) {
                    const lang = typeof lmap[res.data.country] != 'undefined' ? lmap[res.data.country] : 'en';
                    const currency = typeof cmap[res.data.country] != 'undefined' ? cmap[res.data.country] : usd;
                    uni.setStorageSync('local-ip', res.data.ip);
                    uni.setStorageSync('local-country', res.data.country);
                    uni.$emit('getLocal', res.data);
                    try {
                        const _currency = uni.getStorageSync('local-currency');
                        if (typeof _currency == 'undefined' || _currency == '') {
                            uni.setStorageSync('local-currency', currency);
                            common.getCurrencyFee(currency.value).then((res) => {
                                if (res.code == 200) {
                                    uni.setStorageSync('local-fee', res.data.tether[currency.value.toLowerCase()]);
                                }
                            });
                        }
                    } catch (e) {
                    }
                    try {
                        const _lang = uni.getStorageSync('lang');
                        if (typeof _lang == 'undefined' || _lang == '') {
                            this.$i18n.locale = lang;
                            uni.setStorage({
                                key: 'lang',
                                data: lang,
                                success() {
                                    uni.$emit('switchLan');
                                }
                            });
                        }
                    } catch (e) {
                    }
                }
            });
        }
    }
};
</script>

<style>
/* ===非NVUE使用CSS=== */
/* #ifndef APP-NVUE */
@import url('/common/theme/theme.css');
@import url('app.css');
/* #endif */

/* ===仅NVUE使用CSS=== */
/* #ifdef APP-NVUE */
@import url("/common/theme/nvue_theme.css");
/* #endif */
</style>