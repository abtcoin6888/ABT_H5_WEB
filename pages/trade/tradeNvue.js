import fuiDropdownMenu from "@/components/firstui/fui-dropdown-menu/fui-dropdown-menu.vue"
import fuiDrawer from "@/components/firstui/fui-drawer/fui-drawer.vue"
import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"
import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue"
import fuiDialog from "@/components/firstui/fui-dialog/fui-dialog.vue"
import fuiLoading from "@/components/firstui/fui-loading/fui-loading.vue"
import fuiTopPopup from "@/components/firstui/fui-top-popup/fui-top-popup.vue"
import fuiLoadAni from "@/components/firstui/fui-load-ani/fui-load-ani.vue"
import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue"

import emptyView from "@/components/emptyView/emptyView.vue";

import {
    initVueI18n
} from '@dcloudio/uni-i18n'
//多语言
import en from '@/local/en.json';
import zh_Hant from "@/local/zh-Hant.json"
import ja from '@/local/ja.json'
import ko from '@/local/ko.json'

const messages = {
    en,
    'zh-Hant': zh_Hant,
    'ja': ja,
    'ko': ko
}
const localLang = uni.getStorageSync('lang');
const i18n = initVueI18n(typeof localLang != 'undefined' && localLang !== '' ? localLang : 'en', messages);

import util from '@/common/util.js';
import mroute from '@/common/route.js';

import userApi from '/common/api/user.js';
import tradeApi from '/common/api/trade.js';
import currencyApi from '@/common/api/currency.js'
import {
    mapGetters
} from 'vuex';
import common from "../../common/api/common"
import unifwebsocket from "@/uni_modules/veo-uniwebsocket/js_sdk/uniWebsocket.js";

var cm_id; //交易对
var orderType = 1; //下单模式
var tradeType = 0;
var mlist;
var mathcesList;
var action = 0;
var cancelId = 0;

var bmax = 0;
var amax = 0;

var lastPrice = 0;

let init = false;

export default {
    components: {
        fuiDropdownMenu,
        fuiDrawer,
        fuiToast,
        fuiTag,
        fuiDialog,
        fuiLoading,
        fuiTopPopup,
        fuiLoadAni,
        fuiEmpty,
        emptyView
    },
    data() {
        return {
            util: util,
            mroute: mroute,
            windowHeight: uni.getSystemInfoSync().windowHeight,
            statusBarHeight: plus.navigator.getStatusbarHeight(), //状态栏高度
            bgshow: 0,
            show: false,
            optionalActive: false,
            options: [{
                text: "市价单",
                value: 0,
                id: 0
            }, {
                text: '限价单',
                value: 1,
                id: 1,
                checked: true
            }],
            range: "限价单",
            numOption: [{
                text: "按数量",
                value: 0,
				id: 0,
                checked: true
            }, {
                text: "按成交额",
                value: 1,
				id: 1
            }],
            decimalVal: "0.01",
            decimalOption: [{
                text: "0.01",
                value: 1,
                checked: true
            }, {
                text: "0.1",
                value: 2
            }, {
                text: "1",
                value: 3
            }],
            popTab: 0,
            activeValue: "按数量",
            rangeShow: false,
            submenuActive: false,
            checked: true,
            klineShow: false,
            tabActive: 0,

            content: "",
            ctxt: "", // this.$t('login.cancel'),

            OrderType: 1,
            value: "0",
            showPopover: true,
            actions: [],
            orderUnitValue: "",
            orderUnit: [],
            showUnitValue: "",
            showUnit: [],
            active: 0,
            sort: [{
                type: 0,
                active: "/static/img/z-nomal.png",
                img: "/static/img/z-nomal.png",
                up: "/static/img/z-up-sms.png",
                down: "/static/img/z-down-sms.png"
            },
                {
                    type: 0,
                    img: "/static/img/z-nomal.png",
                    up: "/static/img/z-up-sms.png",
                    down: "/static/img/z-down-sms.png"
                },
                {
                    type: 0,
                    img: "/static/img/z-nomal.png",
                    up: "/static/img/z-up-sms.png",
                    down: "/static/img/z-down-sms.png"
                },
                {
                    type: 0,
                    img: "/static/img/z-nomal.png",
                    up: "/static/img/z-up-sms.png",
                    down: "/static/img/z-down-sms.png"
                }
            ],
            alertShow: false,

            orderResult: {}, //交易订单ws 通知数据
            ticker: {
                P: "0.00"
            },
            currency: [],
            currentCurrency: false,
            like: false,
            rateValue: 0,
            showUOrder: true,
            showOrder: 0,
            depthDecimal: 2, //深度数据显示精度
            asks: [], //深度数据
            bids: [], //深度数据
            mlist: [], //自选币种
            mindex: [],
            searchValue: "",
            balance: {},
            direction: 0, //0 买入 1卖出
            trade_type: 0, //0 数量 1成交额
            order_price: "", //下单价格
            order_type: 1, //0市价 1限价
            price: "", //委托价格
            amount: "", //下单数量
            orderList: [], //未成交订单
            showPop: false,

            fee: 7,
            fee_symbol: "¥",

            refreshing: false,
            refText: true,
            refreshText: this.$t('common.refer'),

            selectCoinIndex: 0,
            dialogButton: [{
                text: this.$t('login.cancel'),
                color: "#85898e"
            }, {
                text: this.$t('login.confirm'),
                color: "#3070ec"
            }],

            navHeight: "",
        }
    },
    onLoad() {

        //this.getCurrentCurrency();
    },
    onReady() {
        let _this = this;
        // uni.$on('connect',()=>{
        // 	_this.subscribeDepth();
        // 	_this.getOrderList();
        // 	_this.getBalance();
        // });
		
		this.getCurrrency();
		let lang = uni.getStorageSync('lang');
		if (typeof lang != 'undefined' && lang !== '') {
		    i18n.setLocale(lang);
		    this.setActionLangText();
            this.setTabText();
		}
		
		this.getBalance();
		this.getOrderList();
		this.checkMlist();
		this.setActionLangText();
		
		const fee = uni.getStorageSync('local-fee');
		const fee_symbol = uni.getStorageSync('local-currency')
		if (typeof fee != 'undefined' && fee != '') {
		    this.fee = fee;
		    this.fee_symbol = fee_symbol.symbol;
		}
		
        setInterval(() => {
            if (getApp().globalData.socket.getStatus() === 0) {
                 _this.subscribeDepth();
            }
        }, 500);
		

        uni.$on('reconnected-t', () => {
			_this.subscribeDepth()
        });
    },
    onShow() {
        this.showTabbar();

        this.getChoiceCurrency();

        // setTimeout(()=>{
        // 	// console.log(this.$refs.fyKLine);
        // 	this.$refs.fyKLine.hideLoading();
        // },1500);
    },
    computed: {
        ...mapGetters(['balanceNull', 'isLogin', 'userTheme', 'lang']),
    },
    watch: {
        show(v) {
            if (v === false) {
                uni.showTabBar();
            } else {
                uni.hideTabBar();
            }
        },
        searchValue(v) {
            if (this.mindex == 0) {
                this.mlist = mlist.filter(item => item.symbol.toLowerCase().includes(v.toLowerCase()));
            } else {
                this.currency[0]['currency'] = mathcesList.filter(item => item.symbol.toLowerCase().includes(v
                    .toLowerCase()));
            }
        },
        order_type(v) {
            if (v == 1) {
                this.order_price = parseFloat(this.ticker['c']).toFixed(this.currentCurrency['decimals']);
            }
        },
        showOrder(v) {
            if (!v && !this.isLogin) {
                this.mroute.login();
            }
        },
        showUOrder(v) {
            this.getOrderList();
        },
        klineShow(v) {
            if (v) {
                setTimeout(() => {
                    this.$refs.webview.evalJs("reload(" + this.currentCurrency['id'] + "," + this.currentCurrency['decimals'] + ")");
                }, 200);
            }
        },
        showPop(v) {
            if (v == false) {
                uni.showTabBar();
            }
        }
    },
    methods: {
        onContractMessage() {
            return false;
        },
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
        },
        onTradeMessage(data) {
            if (data.type == 100) {
                var ticker = util.getCurrentTicker(this.currentCurrency['id'], data.data);
                this.ticker = ticker;
                this.currentCurrency['change_rate'] = ticker['P'];
                this.currentCurrency['new_price'] = ticker['c'];
                // console.log("updatePrice("+data.data.C+","+data.data.c+")");
                if (lastPrice === 0 || lastPrice !== parseFloat(ticker.c)) {
                    this.$refs.webview && this.klineShow && this.$refs.webview.evalJs("updatePrice(" + ticker.C + "," + ticker.c + ")");
                    lastPrice = parseFloat(ticker.c);
                }

                if (this.mlist.length > 0) {
                    this.mlist = util.compareCurrency(this.mlist, data.data);
                }

                this.currency[0]['currency'] = util.compareCurrency(this.currency[0]['currency'], data.data);

            }


            if (data.type == 101 && data.currency_id == this.currentCurrency['id']) {
                //深度数据
                amax = 0;
                bmax = 0;
                var asks = orderType == 0 ? data.data.asks.slice(0, 4) : data.data.asks.slice(0, 5);
                var bids = orderType == 0 ? data.data.bids.slice(0, 4) : data.data.bids.slice(0, 5);
                asks.sort((a, b) => {
                    return b[0] - a[0];
                });
                asks.map((v, i) => {
                    if (amax < parseFloat(v[0])) {
                        amax = v[0];
                    }
                });
                for (var i = 0; i < asks.length; i++) {
                    asks[i][2] = parseFloat(asks[i][1] / amax).toFixed(2);
                }
                bids.map((v, i) => {
                    if (bmax < parseFloat(v[0])) {
                        bmax = v[0];
                    }
                });
                for (var i = 0; i < bids.length; i++) {
                    bids[i][2] = parseFloat(bids[i][1] / bmax).toFixed(2);
                }
                this.asks = asks;
                this.bids = bids;
            }
            if (data.type == 300) {
                uni.hideTabBar();
                this.alertShow = false;
                this.orderResult = data;
                this.showPop = true;
                this.getOrderList();
            }

            //接收ws 的数据
        },
        confirm(e) {
            console.log(action);
            if (e.index === 1 && action === -1) {
                this.docancel();
            }
            this.alertShow = false;
            this.showTabbar();
        },
        submit() {
            action = 0;

			if(this.order_type === 0) {
				if (this.amount == '' || parseFloat(this.amount) <= 0) {
                    this.content = this.trade_type === 0 ? this.$t('trade.enter_tn') : this.$t('trade.enter_ta')
					this.ctxt = '';
					this.alertShow = true;
					this.hideTabBar();
					return false;
				}
			}

			if(this.order_type === 1) {
				if(this.order_price == '' || parseFloat(this.order_price) <= 0) {
					this.content = this.$t('contruct.pl19');
					this.ctxt = '';
					this.alertShow = true;
					this.hideTabBar();
					return false;
				}
				if (this.amount == '' || parseFloat(this.amount) <= 0) {
					this.content = this.trade_type === 0 ? this.$t('trade.enter_tn') : this.$t('trade.enter_ta')
					this.ctxt = '';
					this.alertShow = true;
					this.hideTabBar();
					return false;
				}
			}

            //计算提交的amount 买入为计算usdt 卖出为计算币种数量
            if (this.direction == 0) {
                if (this.order_type == 0) {
                    //市价计算
                    var amount = parseFloat(this.trade_type == 0 ? this.amount * this.ticker['c'] : this.amount)
                        .toFixed(2);
                }
                if (this.order_type == 1) {
                    //限价计算
                    var amount = parseFloat(this.trade_type == 0 ? this.amount * this.order_price : this.amount)
                        .toFixed(2);
                }
            }
            if (this.direction == 1) {
                if (this.order_type == 0) {
                    var amount = parseFloat(this.trade_type == 0 ? this.amount : this.amount / this.ticker['c'])
                        .toFixed(this.currentCurrency['trade_decimals']);
                }
                if (this.order_type == 1) {
                    var amount = parseFloat(this.trade_type == 0 ? this.amount : this.amount / this.order_price)
                        .toFixed(this.currentCurrency['trade_decimals']);
                }
            }

            if (this.direction == 0) {
                if (parseFloat(this.balance['legal_balance']) < parseFloat(amount)) {
                    this.content = 'USDT' + this.$t('trade.inaqu');
                    this.ctxt = '';
                    this.alertShow = true;
                    this.hideTabBar();
                    return false;
                }
            }
            if (this.direction == 1) {
                if (parseFloat(this.balance['trade_balance']) < parseFloat(amount)) {
                    this.content = this.currentCurrency['symbol'] + this.$t('trade.inaqu');
                    this.ctxt = '';
                    this.alertShow = true;
                    this.hideTabBar();
                    return false;
                }
            }
            if (typeof this.ticker['c'] == 'undefined') {
                return false;
            }
            //下单提交
            var post = {
                cmd_id: cm_id,
                currency_id: this.currentCurrency['id'],
                order_type: this.order_type == 0 ? 1 : 2,
                direction: this.direction == 0 ? 1 : 2,
                trade_type: this.trade_type == 0 ? 1 : 2,
                price: this.order_type == 0 ? parseFloat(this.ticker['c']).toFixed(this.currentCurrency[
                    'decimals']) : this.order_price,
                amount: amount
            };
            uni.hideKeyboard();
            this.$refs.loading.open();
            tradeApi.tradeSubmit(post).then(res => {
                this.$refs.loading.close();
                if (res.code != 200) {
                    this.content = res.message;
                    this.alertShow = true;
                    this.hideTabBar();
                } else {
                    this.content = this.$t('trade.order_suc');
                    this.alertShow = true;
                    this.hideTabBar();
                    this.order_price = '';
                    this.amount = '';
                    this.getOrderList();
                    setTimeout(() => {
                        //加载订单
                        this.getBalance();
                        this.getOrderList();
                    }, 2500);
                }
            }).catch(res => {
                this.$refs.loading.close();
                this.content = this.$t('trade.unknown_error');
                this.alertShow = true;
                this.hideTabBar()
            });
        },
        cancelOrder(id = 0) {
            action = -1;
            cancelId = id;
            this.content = this.$t('list.inquire_con');
            this.alertShow = true;
            this.hideTabBar();
        },
        docancel() {
            if (cancelId == 0) {
                id = this.orderList.map((item) => {
                    return item.id
                });
                id = id.join(',')
            } else {
                id = cancelId;
            }
            action = 0;
            this.$refs.loading.open();
            tradeApi.orderCancel(id).then(res => {
                this.$refs.loading.close();
                if (res.code == 200) {
                    this.content = this.$t('trade.suc_wid');
                    this.alertShow = true;
                    this.hideTabBar();
                    this.getOrderList();
                    this.getBalance()
                } else {
                    this.content = res.message;
                    this.alertShow = true;
                    this.hideTabBar();
                }
            });
        },
        async getCurrrency() {
            if (init) {
                return false;
            }
            init = true;
            //console.log('getCurrrency');

            let currency = uni.getStorageSync('trade-currency');
            //console.log(currency);
            currencyApi.tradeCurrencyList().then(res => {
                currency = res.data;
                this.currency = currency

                mathcesList = this.currency[0]['currency'];
                cm_id = this.currency[0]['id'];
                this.getCurrentCurrency();
            });
            // if(typeof currency === 'undefined' || currency === ''){
            // 	currencyApi.tradeCurrencyList().then(res=>{
            // 		currency = res.data;
            // 		this.currency = currency

            // 		mathcesList = this.currency[0]['currency'];
            // 		cm_id = this.currency[0]['id'];
            // 		this.getCurrentCurrency();
            // 	});
            // }
        },
        async getTradeMatches() {
        },
        getCurrentCurrency() {
            //从现货本地缓存拿第一个
            var current = uni.getStorageSync('trade-current');
            if (typeof current == 'undefined' || current == '' || !current) {
                current = this.currency[0]['currency'][0];
                current['cm_id'] = this.currency[0]['id'];
                uni.setStorageSync('trade-current', current);
            }
            //console.log(current);
            this.currentCurrency = current;
            this.subscribeDepth();
            this.getBalance();
            this.setUnitList();
            this.depthDecimal = current['decimals'];
            this.like = this.favStatus(1, current['id']);
        },
        getChoiceCurrency(){
            const currency = uni.getStorageSync('trade-currency');
            const choice_current = uni.getStorageSync("choice-trade");
            if(typeof choice_current == 'undefined' || choice_current == '' || !choice_current) {
                this.getCurrentCurrency();
            }else {
                const current_id = choice_current[0]['currency_id'];
                let choiceCurrency = currency[0]['currency'].find(item => item.id === current_id);
                this.currentCurrency = choiceCurrency;
                this.subscribeDepth();
                this.getBalance();
                this.setUnitList();
                this.depthDecimal = choiceCurrency['decimals'];
                this.like = this.favStatus(1, choiceCurrency['id']);
            }
        },
        subscribeDepth() {
            try {
                // this.bids = []
                // this.asks = []
                getApp().globalData.socket.send({
                    event: "trade_depth_subscribe",
                    cm_id: this.currentCurrency['cm_id'],
                    currency_id: this.currentCurrency['id']
                });
            } catch (e) {
                setTimeout(() => {
                    getApp().globalData.socket.restart();
                    this.subscribeDepth();
                }, 2000);
            }
        },
        checkMlist() {
            mlist = uni.getStorageSync('select-trade');
            if (typeof mlist == 'undefined' || mlist.length === 0) {
                return false;
            }
            this.mlist = mlist;
            // if (typeof mlist != 'undefined' || !mlist) {
            // 	mlist.map((val, index, arr) => {
            // 		if (val.id === this.currentCurrency['id']) {
            // 			this.like = 1;
            // 		}
            // 	});
            // }
        },
        switchCurrency(cid, index) {
            this.selectCoinIndex = index;
            if (this.mindex == 0) {
                var currency = mlist.filter(item => item.id == cid);
            } else {
                var currency = mathcesList.filter(item => item.id == cid);
            }
            currency[0]['cm_id'] = cm_id;
            this.currentCurrency = currency[0];
            this.subscribeDepth(); //切换订阅
            this.checkMlist();
            this.getBalance();
            uni.setStorageSync('trade-current', currency[0]);
            this.setUnitList();
            this.depthDecimal = this.currentCurrency['decimals'];
            this.show = false;
            this.order_price = '';
            this.rateValue = '';
            this.klineShow && this.$refs.webview.evalJs("reload(" + cid + "," + this.currentCurrency['decimals'] + ")");
        },
        setUnitList() {
            this.showUnit = [{
                text: parseFloat(1 / (10 ** this.currentCurrency['decimals'])).toFixed(this.currentCurrency[
                    'decimals']),
                value: 0,
                checked: false
            },
                {
                    text: parseFloat(1 / (10 ** (this.currentCurrency['decimals'] - 1))).toFixed(this
                        .currentCurrency['decimals'] - 1),
                    value: 1,
                    checked: false
                },
                {
                    text: parseFloat(1 / (10 ** (this.currentCurrency['decimals'] - 2))).toFixed(this
                        .currentCurrency['decimals'] - 2),
                    value: 2,
                    checked: true
                },
                // {
                // 	text: this.$t('profile.ca'),
                // 	value: 3,
                // 	checked: false
                // }
            ];
            this.showUnitValue = this.showUnit[0]['text'];
        },
        async getBalance() {
            if (!this.isLogin) {
                return false;
            }
            if (this.currentCurrency && this.currentCurrency['id']) {
                const balance = await userApi.getCurrencyBalance(this.currentCurrency['id']);
                if (balance.code == 200) {
                    this.balance = balance.data;
                } else {
                    this.content = balance.message;
                    this.alertShow = true;
                    // this.hideTabBar();
                    this.balance = this.balanceNull;
                }
            } else {
                setTimeout(() => {
                    this.getBalance();
                }, 2000);
            }
        },
        getOrderList() {
            if (!this.isLogin) {
                return false;
            }
            tradeApi.tradeOrderList(this.showUOrder ? 0 : this.currentCurrency['id']).then(res => {
                if (res.code == 200) {
                    this.orderList = res.data;
                }
            })
        },
        selectTradeType(e) {
            this.trade_type = e;
            this.amount = '';
            this.rateValue = 0;
        },
        selectDecimal(e) {
            if (e == 0) {
                this.depthDecimal = this.currentCurrency['decimals'];
            }
            if (e == 1) {
                this.depthDecimal = this.currentCurrency['decimals'] - 1;
            }
            if (e == 2) {
                this.depthDecimal = this.currentCurrency['decimals'] - 2;
            }
            if (e == 3) {
                this.depthDecimal = this.currentCurrency['decimals'];
                this.showUnitValue = this.showUnit[0];
            }
        },
        sliderChange(e) {
            this.rateValue = e.detail.value;
            if (!this.isLogin || parseInt(e.detail.value) <= 0) {
                this.amount = '';
                return false;
            }
            if (parseFloat(this.balance['legal_balance']) <= 0 && typeof this.balance['legal_balance'] != 'undefined') {
                return false;
            }

            if (this.direction == 0) {
                this.balance['legal_balance'] = parseFloat(this.balance['legal_balance']);
                if (this.balance['legal_balance'] <= 0) {
                    this.amount = '';
                    return false;
                }
                if (this.trade_type == 0) {
                    this.amount = parseFloat((e.detail.value * this.balance['legal_balance']) / this.currentCurrency['new_price'] / 100)
                        .toFixed(this.currentCurrency['trade_decimals']);
                } else {
                    this.amount = parseFloat(e.detail.value * this.balance['legal_balance'] / 100).toFixed(2);
                }
            }

            if (this.direction == 1) {
                if (parseFloat(this.balance['trade_balance']) <= 0) {
                    this.amount = '';
                    return false;
                }
                if (this.trade_type == 0) {
                    this.amount = parseFloat((e.detail.value / 100 * this.balance['trade_balance'])).toFixed(this
                        .currentCurrency['trade_decimals']);
                } else {
                    this.amount = parseFloat((e.detail.value / 100 * this.balance['trade_balance']) * this.ticker['c'])
                        .toFixed(2);
                }
            }
        },
        selectType(e) {
            console.log(e);
            orderType = e;
            this.order_type = e;
        },
        onSelect(e) {

        },
        switchSort(index, field) {
            console.log(index);
            if (this.sort[index]['type'] == 0) {
                this.sort[index]['type'] = 1;
                this.sortCurrency(index, field, 1);
                this.sort[index]['active'] = this.sort[index]['down'];
                this.sort.map((item, _index) => {
                    if (_index !== index) {
                        item['type'] = 0;
                        item['active'] = this.sort[_index]['img'];
                    }
                    return item;
                });
                return;
            }
            if (this.sort[index]['type'] == 1) {
                this.sort[index]['type'] = 2;
                this.sortCurrency(index, field, -1);
                this.sort[index]['active'] = this.sort[index]['up'];
                this.sort.map((item, _index) => {
                    if (_index !== index) {
                        item['type'] = 0;
                        item['active'] = this.sort[_index]['img'];
                    }
                    return item;
                });
                return;
            }
            if (this.sort[index]['type'] == 2) {
                this.sort[index]['type'] = 0;
                this.sortCurrency(index, field, 0);
                this.sort[index]['active'] = this.sort[index]['img'];
                this.sort.map((item, _index) => {
                    if (_index !== index) {
                        item['type'] = 0;
                        item['active'] = this.sort[_index]['img'];
                    }
                    return item;
                });
                return;
            }
        },
        sortCurrency(index, field, _sort) {
            let list = this.mindex === 1 ? this.currency[0]['currency'] : this.mlist

            if (_sort === 0) {
                list = list.sort((a, b) => {
                    return a.id - b.id;
                });
            } else {
                list = list.sort((a, b) => {
                    const valueA = field === 'symbol' ? a[field].toLowerCase() : parseFloat(a[field]);
                    const valueB = field === 'symbol' ? b[field].toLowerCase() : parseFloat(b[field]);
                    if (field === 'symbol') {
                        if (_sort === -1) {
                            return a[field].localeCompare(b[field], 'en', {numeric: false})
                        } else if (_sort === 1) {
                            return b[field].localeCompare(a[field], 'en', {numeric: false})
                        }
                    } else {
                        if (_sort === -1) {
                            return valueA - valueB;
                        } else if (_sort === 1) {
                            return valueB - valueA;
                        }
                    }
                });
            }
            this.mindex === 1 ? this.currency[0]['currency'] : this.mlist = list;
        },
        //调用此方法显示抽屉
        showDrawer(type) {
            this.show = true
            this.hideTabBar()
        },
        closeDrawer(type) {
            this.show = false
            this.showTabbar()
        },
        optionalChange() {
            console.log(this.like);
            if (this.like) {
                this.like = false;
                this.remFav(1, this.currentCurrency['id']);
                this.showToast(this.$t('trade.ts2'), 300);
            } else {
                this.like = true;
                this.addFav(1, this.currentCurrency);
                this.showToast(this.$t('trade.ts1'), 300);
            }
        },
        showToast(type, time) {
            let options = {}
            //提示信息
            options.text = type;
            options.duration = time;
            this.$refs.toast.show(options)
        },
        // k线图显隐
        klineToggle() {
            this.klineShow = !this.klineShow;
        },
        // 买卖按钮切换
        buttonToggle(e) {
            this.bgshow = e;
        },
        filterTap() {
            //显示下拉框
            this.$refs.ddmRange.show()
        },
        numSubMenu() {
            this.$refs.numRange.show()
        },
        decimalSubmenu() {
            this.$refs.decimal.show()
        },
        numRangeChange(e) {
            this.activeValue = e.text
            this.trade_type = e.id;
            tradeType = e.id;
            this.amount = '';
            this.rateValue = 0;
            if (this.trade_type === 1 && this.order_price === '') {
                this.order_price = this.ticker['c'];
            }
        },
        rangeItemClick(e) {
            this.range = e.text
            orderType = e.id;
            this.order_type = e.id;
            if (this.order_type === 0 && this.order_price === '') {
                this.order_price = this.ticker['c'];
            }
        },
        setOrderPrice(price) {
            this.order_price = parseFloat(util.str2number(price)).toFixed(this.currentCurrency['decimals']);
        },
        decimalChange(e) {
            this.showUnitValue = e.text
            if (e.value == 0) {
                this.depthDecimal = this.currentCurrency['decimals'];
            }
            if (e.value == 1) {
                this.depthDecimal = this.currentCurrency['decimals'] - 1;
            }
            if (e.value == 2) {
                this.depthDecimal = this.currentCurrency['decimals'] - 2;
            }
            if (e.value == 3) {
                this.depthDecimal = this.currentCurrency['decimals'];
            }
        },
        hideTabBar() {
            uni.hideTabBar({
                animation: true
            });
        },
        showTabbar() {
            uni.showTabBar({
                animation: true
            });
        },
        $t(key) {
            return i18n.t(key);
        },
        setActionLangText() {
            this.options[0]['text'] = this.$t("trade.market_order");
            this.options[1]['text'] = this.$t("trade.limit_order");
            this.range = this.options[orderType]['text'];

            this.numOption[0]['text'] = this.$t("trade.by_num");
            this.numOption[1]['text'] = this.$t('trade.on_tur');
            this.activeValue = this.numOption[tradeType]['text'];

            this.orderUnit = [
                this.$t("trade.by_num"),
                this.$t("trade.on_tur")
            ];
            // this.showUnit[3] = this.$t('login.cancel');
        },
        onpullingdown(e) {
            if (this.refreshing) return;
            if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
                this.refreshText = this.$t('common.refer')
            } else {
                this.refreshText = this.$t('common.refer')
            }
        },
        onrefresh(e) {
            if (this.refreshing) return;
            this.refreshing = true;
            this.refText = false;
            setTimeout(() => {
                this.refreshing = false;
                this.refText = true;
                this.refreshText = this.$t('common.refer');
                this.getBalance();
                this.getOrderList();
                this.subscribeDepth();
            }, 2000);
            uni.$emit('reconnect');
        },
        toKline() {
            uni.navigateTo({
                url: "/pages/trade/kline?type=0&id=" + this.currentCurrency['id'] + "&cid=" + cm_id
            })
        },
        loadHistory(e) {
        },
        kLineLoad(e) {
        },
        favStatus(cm_id, cid) {
            let list;
            if (cm_id === 1) {
                list = uni.getStorageSync('select-trade');
            }
            if (cm_id === 2) {
                list = uni.getStorageSync('select-contract');
            }
            if (typeof list != 'object' || list === '') {
                return false;
            }
            return list.filter(item => parseInt(item.id) === parseInt(cid)).length > 0;
        },
        addFav(cm_id, coin) {
            console.log("add fav run");
            let list = [];
            if (cm_id === 1) {
                list = uni.getStorageSync('select-trade');
            }
            if (cm_id === 2) {
                list = uni.getStorageSync('select-contract');
            }
            if (list) {
                list = list.filter(item => item.id !== coin.id);
                list.push(coin);
            } else {
                list = [coin];
            }
            if (cm_id === 1) {
                uni.setStorageSync('select-trade', list);
            }
            if (cm_id === 2) {
                uni.setStorageSync('select-contract', list);
            }
            uni.setStorageSync('load', 1);
            uni.$emit('addSelect');
        },
        remFav(cm_id, cid) {
            console.log("rem fav run");
            let list;
            if (cm_id === 1) {
                list = uni.getStorageSync('select-trade');
            }
            if (cm_id === 2) {
                list = uni.getStorageSync('select-contract');
            }
            if (list) {
                list = list.filter(item => parseInt(item.id) !== parseInt(cid));
                let key;
                if (cm_id === 1) {
                    key = 'select-trade';
                }
                if (cm_id === 2) {
                    key = 'select-contract';
                }
                uni.setStorageSync(key, list);
                if (list.length <= 0) {
                    uni.removeStorageSync(key);
                }
                console.log(list);
                uni.setStorageSync('load', 1);
                uni.$emit('addSelect');
            }
        },
        setTabText(){
            uni.setTabBarItem({
                index: 0,
                text: this.$t('tab.home')
            })
            uni.setTabBarItem({
                index: 1,
                text: this.$t('tab.quote')
            })
            uni.setTabBarItem({
                index: 2,
                text: this.$t('tab.trade')
            })
            uni.setTabBarItem({
                index: 3,
                text: this.$t('tab.contract')
            })
            uni.setTabBarItem({
                index: 4,
                text: this.$t('tab.assets')
            })
            this.$forceUpdate();
        },
    }
}