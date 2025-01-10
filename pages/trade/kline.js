import fuiTabs from "@/components/firstui/fui-tabs/fui-tabs.vue"
import fuiCollapse from "@/components/firstui/fui-collapse/fui-collapse.vue"
import fuiCollapseItem from "@/components/firstui/fui-collapse-item/fui-collapse-item.vue"
import fuiDrawer from "@/components/firstui/fui-drawer/fui-drawer.vue"

import {mapGetters} from 'vuex';
import contractApi from '@/common/api/contract.js';
import currencyApi from "@/common/api/currency.js";

import {initVueI18n} from '@dcloudio/uni-i18n'

import en from '@/local/en.json';
import zh_CN from '@/local/zh-Hans.json';
import zh_Hant from "@/local/zh-Hant.json"
import ja from '@/local/ja.json'
import ko from '@/local/ko.json'

const messages = {
    en,
    'zh': zh_CN,
    'zh-Hant': zh_Hant,
    'ja': ja,
    'ko': ko
}
const localLang = uni.getStorageSync('lang');
const i18n = initVueI18n(typeof localLang != 'undefined' && localLang != '' ? localLang : 'en', messages);

import util from '@/common/util.js';
import mroute from '@/common/route.js';
import timeIndex from '@/common/timeIndex.js';
import fwebsocket from "@/uni_modules/veo-uniwebsocket/js_sdk/Websocket.js";

//存放合约币种
var currency = [];
var mlist = [];
var lastVol = 0;
var lastVolc = 0;

export default {
    components: {
        fuiTabs,
        fuiCollapse,
        fuiCollapseItem,
        fuiDrawer
    },
    data() {
        return {
            util: util,
            mroute: mroute,
            timeIndex: timeIndex,
            like: false,
            windowHeight: uni.getSystemInfoSync().windowHeight,
            navHeight: "",
            scrollHeight: "",
            statusBarHeight: plus.navigator.getStatusbarHeight(), //状态栏高度
            timerOption: ["line", "1m", "5m", "15m", "30m", "1h", "4h", "12h", "1d", "1w", "1y"],
            orderTab: [],
            odActive: 0,
            drawerShow: false,
            drawerTab: 0,
            currency: [],
            mlist: [],
            currencyInfo: {},
            symbol: util.getLCS(),
            symbol_rate: util.getLCR(),

            type: 0,
            currency_id: 0,
            cm_id: 0,

            bids: [],
            asks: [],
            trades: [],
            info: false,
            ma: false,
            ema: false,
            boll: false,

            selectCoinIndex: 0
        }
    },
    watch: {
        ma(v) {
            console.log(v);
            this.$refs.webview && this.$refs.webview.evalJs("showMa(" + (v ? 1 : 0) + ")");
        },
        ema(v) {
            this.$refs.webview && this.$refs.webview.evalJs("showEma(" + (v ? 1 : 0) + ")");
        },
        boll(v) {
            this.$refs.webview && this.$refs.webview.evalJs("showBoll(" + (v ? 1 : 0) + ")");
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    onLoad(e) {
        this.type = parseInt(e.type);
        this.currency_id = parseInt(e.id);
        this.cm_id = e.cid;

        if (this.type === 0) {
            this.getTradeCurrencyList();
            this.tradeSubscribeDepth();
        } else {
            this.getContractCurrency();
            this.contractSubscribeDepth();
        }
        this.getCurrencyInfo();

        uni.$on('currency', () => {
            this.symbol = util.getLCS();
            this.symbol_rate = util.getLCR();
        });
        uni.$on('switchLan', () => {
            this.setTab();
        });
        // uni.$on('contract', (data) => {
        //     this.onContractMessage(data);
        // })
		setInterval(()=>{
		    if(fwebsocket.prototype.getStatus() === 0){
		        uni.$on('contract', (data) => {
		            this.onContractMessage(data);
		        });
		    }
		},1000)
    },
    onShow() {
        this.getCurrencyInfo();
        setTimeout(()=>{
			var interval = '1m';
			this.$refs.webview && this.$refs.webview.evalJs("loadHistory(" + this.currency_id + ",'" + interval + "')");
			if (this.$refs.webview) {
			    clearInterval(set);
			}
		},1000);
        this.setTab();
    },
    methods: {
        navInit(e) {
            this.windowHeight = uni.getSystemInfoSync().windowHeight;
            this.navHeight = e.height + e.statusBarHeight;
            this.scrollHeight = this.windowHeight - this.navHeight;
        },
        setTab() {
            this.orderTab = [this.$t('kline.com_od'), this.$t('kline.rt_tr'), this.$t('kline.currency_info')];
        },
        getCurrencyInfo() {
            currencyApi.getCurrencyInfo(this.currency_id, this.cm_id).then(res => {
                this.currencyInfo = res.data;
                console.log(this.currencyInfo);
                try {
                    var set = setInterval(() => {
                        console.log("set decimal");
                        this.$refs.webview && this.$refs.webview.evalJs("setDecimals(" + res.data.decimals + ")");
                        if (this.$refs.webview) {
                            clearInterval(set);
                        }
                    }, 500);
                } catch (e) {
                }

                if (this.currencyInfo.currency_info != '') {
                    this.info = JSON.parse(this.currencyInfo['currency_info']);
                }
            })
        },

        switchCurrency(item) {
            this.selectCoinIndex = item;
            this.currency_id = item;
            this.trades = [];
            this.drawerShow = false;
            this.getCurrencyInfo();
            this.tradeSubscribeDepth();
            var interval = '1s';
            console.log("loadHistory(" + this.currency_id + ",'" + interval + "')");
            this.$refs.webview && this.$refs.webview.evalJs("loadHistory(" + this.currency_id + ",'" + interval + "')");
        },
        async getTradeCurrencyList() {
            let tradeCurrency = await currencyApi.tradeCurrencyList();
            this.currency = tradeCurrency.data;
        },
        async getContractCurrency() {
            const currency = await currencyApi.contractCurrencyList();
            this.currency = currency.data;
        },
        getMlistCurrency() {
            //获取自选合约数据
            mlist = uni.getStorageSync('select-contract');
            this.mlist = mlist;
        },
        onContractMessage(data) {
            if (data.type === 200 && parseInt(this.type) === 1) {
                try {
                    this.currency[0]['currency'] = util.compareCurrency(this.currency[0]['currency'], data.data.data);
                    if (this.mlist.length > 0) {
                        this.mlist = util.compareCurrency(this.mlist, data.data.data);
                    }
                } catch (e) {

                }
                var ticker = util.getCurrentTicker(this.currency_id, data.data.data);
                this.currencyInfo['change_rate'] = ticker.P;
                this.currencyInfo['new_price'] = ticker.c;
                this.$refs.webview && this.$refs.webview.evalJs("ticker(" + ticker.c + "," + lastVolc + ")");
            }
            if (data.type === 201 && this.type === 1 && data.data.currency_id === this.currency_id) {
                this.bids = data.data.data.b;
                this.asks = data.data.data.a;
            }

            if (data.type === 203 && this.type === 1 && data.data.currency_id === this.currency_id) {
                const date = new Date(data.data.data.E);
                var trades = this.trades;
                if (trades.length > 10) {
                    trades = trades.slice(1);
                }
                trades.push({
                    time: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
                    price: data.data.data.p,
                    vol: data.data.data.q
                });
                this.trades = trades;
                lastVolc = data.data.data.q;
            }
        },
        onTradeMessage(data) {
            if (data.type === 100 && this.type === 0) {
                // const index = this.currency[0]['currency'].findIndex(item => item.id == data.currency_id);
                // var temp = this.currency[0]['currency'][index];
                // temp['new_price'] = data['data']['c'];
                // temp['change_rate'] = data['data']['P'];
                // this.currency[0]['currency'][index] = temp;
                try {
                    this.currency[0]['currency'] = util.compareCurrency(this.currency[0]['currency'], data.data);

                    if (this.mlist.length > 0) {
                        this.mlist = util.compareCurrency(this.mlist, data.data);
                    }
                } catch (e) {
                }

                var ticker = util.getCurrentTicker(this.currency_id, data.data);
                this.currencyInfo['change_rate'] = ticker.P;
                this.currencyInfo['new_price'] = ticker.c;

                this.$refs.webview && this.$refs.webview.evalJs("ticker(" + ticker.c + "," + lastVol + ")");
            }
            if (data.type === 101 && this.type === 0 && data.currency_id === this.currency_id) {
                this.bids = data.data.bids;
                this.asks = data.data.asks;
            }

            if (data.type === 102 && this.type === 0 && data.currency_id === this.currency_id) {
                const date = new Date(data.data.E);
                var trades = this.trades;
                if (trades.length > 10) {
                    trades = trades.slice(1);
                }
                trades.push({
                    time: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
                    price: data.data.p,
                    vol: data.data.q
                });
                this.trades = trades;
                lastVol = data.data.q;
            }
        },
        contractSubscribeDepth() {
            try {
                getApp().globalData.csocket.send({
                    data: JSON.stringify({
                        event: "contrade_depth_subscribe",
                        cm_id: this.cm_id,
                        currency_id: this.currency_id
                    }),
                    fail() {
                        uni.showToast({
                            title: '网络错误',
                            icon: "none"
                        });
                        setTimeout(() => {
                            this.contractSubscribeDepth();
                        }, 2000);
                    }
                });
            } catch (e) {
                setTimeout(() => {
                    this.contractSubscribeDepth();
                }, 2000);
            }
        },
        tradeSubscribeDepth() {
            try {
                getApp().globalData.socket.send({
                    data: JSON.stringify({
                        event: "trade_depth_subscribe",
                        cm_id: this.cm_id,
                        currency_id: this.currency_id
                    }),
                    fail() {
                        uni.showToast({
                            title: this.$t('trade.net_err'),
                            icon: "none"
                        });
                    }
                });
            } catch (e) {
                setTimeout(() => {
                    this.tradeSubscribeDepth();
                }, 2000);
            }
        },
        $t(key) {
            return i18n.t(key);
        },
        optionalChange() {
            this.like = !this.like;
            if (this.like) {
                this.showToast(this.$t('trade.ts1'), 500)
            } else {
                this.showToast(this.$t('trade.ts2'), 500)
            }
        },
        showToast(type,time) {
            let options = {}
            //提示信息
            options.text = type;
            options.duration = time;
            this.$refs.toast.show(options)
        },
        timerChange(e) {
            console.log(e);
            var interval = '';
            if (e.index === 0) {
                interval = '1s';
            } else {
                interval = e.name;
            }
            console.log("loadHistory(" + this.currency_id + ",'" + interval + "')");
            this.$refs.webview && this.$refs.webview.evalJs("loadHistory(" + this.currency_id + ",'" + interval + "')");
        },
        orderChange(e) {
            this.odActive = e.index;
            console.log(this.odActive)
        },
        closeDrawer() {
            this.drawerShow = false;
        },
        onBack() {
            if (this.type === 0) {
                return mroute.switchTrade();
            } else {
                return mroute.switchContract();
            }
        }
    }
}