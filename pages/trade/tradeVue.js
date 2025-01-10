import timeIndex from "/common/timeIndex.js";
import userApi from '/common/api/user.js';
import tradeApi from '/common/api/trade.js';

import {createChart} from 'lightweight-charts';
import unifwebsocket from "@/uni_modules/veo-uniwebsocket/js_sdk/uniWebsocket.js";

import {
    mapGetters
} from 'vuex';

var tindex = 0;
var recreate = 0;
var cm_id; //交易对
var orderType = 0; //下单模式
var mlist;
var mathcesList;

var chart;
var lineSeries;
var areaSeries;
var inits = 0;

var lastPrice = 0;

import trade from "../../common/api/trade.js";
import currencyApi from '@/common/api/currency.js';
import FuiDropdownMenu from "@/components/firstui/fui-dropdown-menu/fui-dropdown-menu.vue";
import emptyView from "@/components/emptyView/emptyView.vue";
import util from "@/common/util";
import fuiDropdownMenu from "@/components/firstui/fui-dropdown-menu/fui-dropdown-menu.vue";
import fuiLoadAni from "@/components/firstui/fui-load-ani/fui-load-ani.vue";


export default {
    components: {
        fuiLoadAni,
        fuiDropdownMenu,
        emptyView
    },
    data() {
        return {
            listBarOptions: [
                this.$t('trade.cur_order'),
                this.$t('trade.assets')
            ],
            windowHeight: "",
            navHeight: "",
            scrollHeight: "",
            timeIndex: 0,
            time: timeIndex.time,
            OrderType: "",
            value: "0",
            showPopover: false,
            actions: [
                this.$t("trade.market_order"),
                this.$t("trade.limit_order")
            ],
            orderUnitValue: this.$t("trade.by_num"),
            orderUnit: [
                this.$t("trade.by_num"),
                this.$t("trade.on_tur")
            ],
            showUnitValue: "",
            showUnit: [
                "0.01",
                "0.1",
                "1"
            ],
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
            showUOrder: true,
            IsShow: false,
            content: "",
            ctxt: this.$t('login.cancel'),

            orderResult: {}, //交易订单ws 通知数据
            ticker: {
                P: "0.00"
            },
            currency: [],
            currentCurrency: false,
            like: false,
            rateValue: 0,
            showOrder: true,
            orderTabCurrent: 0,
            depthDecimal: 0, //深度数据显示精度
            asks: [], //深度数据
            bids: [], //深度数据
            mlist: [], //自选币种
            mindex: [],
            popTabIndex: 0,
            searchValue: "",
            balance: {},
            direction: 0, //0 买入 1卖出
            trade_type: 0, //0 数量 1成交额
            order_price: "", //下单价格
            order_type: 1, //0市价 1限价
            amount: "", //下单数量
            price: "", //委托价格
            orderList: [], //未成交订单
            showPop: false,


            range: this.$t('trade.limit_order'),
            drawerPopup: false,
            selectIndex: 0,

            listTabIndex: 0,
			symbol: this.$util.getLCS(),
			symbol_rate: this.$util.getLCR(),
        }
    },
    onReady() {
        this.getCurrrency();
        // this.getCurrentCurrency();
        this.checkMlist();
        this.getWindowHeight();
		let _this = this;
		uni.$on('trades',(data)=>{
			_this.onTradeMessageHandler(data);
		});

        uni.$on('addSelect',()=>{
            this.checkMlist();
        });
		
		uni.$on('reconnected-t', () => {
			_this.subscribeDepth()
		});
		setInterval(()=>{
		    if(getApp().globalData.socket.getStatus() === 0){
                _this.subscribeDepth();
		    }
		},500)
    },
    onShow() {
        // this.subscribeDepth();
        this.getChoiceCurrency();

        var index = 0;
        var set = setInterval(() => {
            if (this.isLogin) {
                this.getBalance();
                this.getOrderList();
                clearInterval(set);
            }
            index = index + 1;
            if (index >= 25) {
                clearInterval(set);
            }
        }, 200);
        this.getWindowHeight();
        this.setTabbarLanguage();


        this.setTabText();
    },
    onHide() {
    },
    computed: {
        ...mapGetters(['balanceNull', 'isLogin'])
    },
    watch: {
        IsShow(value) {
            // if (value) {
            //     setTimeout(() => {
            //         this.Kcreate();
            //     }, 100);
            // }
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
                this.$mroute.login();
            }
        },
        showUOrder(v) {
            this.getOrderList();
        },
        drawerPopup(v) {
            if (v) {
                uni.hideTabBar();
            } else {
                uni.showTabBar();
            }
        }
    },
    methods: {
        setPrice(e){
            console.log(e[0])
            this.order_price = e[0]
        },
        Kcreate() {
            chart = createChart(
                document.getElementById('kline'),
                {
                    width: window.screen.availWidth,
                    height: 245,
                    layout: {
                        background: {color: "#fff"},
                        textColor: "#333",
                    },
                    grid: {
                        vertLines: {color: "#ddd"},
                        horzLines: {color: "#ddd"},
                    },
                    priceScale: {
                        borderColor: 'rgba(242, 250, 255, 0.8)',
                    },
                    timeScale: {
                        borderColor: 'rgba(242, 250, 255, 0.8)',
                    }
                },
            );

            lineSeries = chart.addAreaSeries({
                topColor: '#00ddfa',
                bottomColor: 'rgba(41, 98, 255, 0.1)',
                lineColor: '#2979ff',
                lineWidth: 1,
                lastPriceAnimation: 1
            });


            areaSeries = chart.addAreaSeries({
                lastValueVisible: false, // hide the last value marker for this series
                crosshairMarkerVisible: false, // hide the crosshair marker for this series
                lineColor: 'transparent', // hide the line
                topColor: 'rgba(102, 57, 220, 0.6)',
                bottomColor: 'rgba(102, 57, 220, 0.1)',
            });


            areaSeries.priceScale().applyOptions({
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.2,
                    right: 0.2,
                    left: 0.2
                }
            })
            inits = 1;
            this.loadKline();

            window.addEventListener('resize', () => {
                chart.resize(window.innerWidth, this.$device.screenWidth);
            });
        },
        loadKline() {
            var data = {
                interval: "1s",
                currency_id: this.currentCurrency['id'],
                limit: 200
            }
            currencyApi.contractLine(data).then(res => {
                if (res.code === 200) {
                    // areaSeries.setData(res.data);
                    // lineSeries.setData(res.data);

                    chart.timeScale().applyOptions({
                        barSpacing: 7,
                        borderColor: '#71649C',
                        timeVisible: true,
                        secondsVisible: true,
                        scrollToRealTime: true,
                        tickMarkFormatter: (time, tickMarkType, locale) => {
                            var date = new Date(time);  // 将微秒转换为毫秒
                            var hours = String(date.getHours()).padStart(2, '0');
                            var minutes = String(date.getMinutes()).padStart(2, '0');
                            var seconds = String(date.getSeconds()).padStart(2, '0');
                            return `${hours}:${minutes}:${seconds}`;
                        }
                    });
                    chart.timeScale().scrollToRealTime();
                    const currentScrollPosition = chart.timeScale().scrollPosition();
                    chart.timeScale().scrollToPosition(currentScrollPosition + 15, false);
                    // chart.timeScale().fitContent();
                    chart.applyOptions({
                        localization: {
                            priceFormatter: this.PriceFormatter,
                            timeFormatter: (businessDayOrTimestamp) => {
                                var date = new Date(businessDayOrTimestamp);  // 将微秒转换为毫秒
                                var hours = String(date.getHours()).padStart(2, '0');
                                var minutes = String(date.getMinutes()).padStart(2, '0');
                                var seconds = String(date.getSeconds()).padStart(2, '0');
                                return `${hours}:${minutes}:${seconds}`;
                            }

                        },
                        watermark: {
                            visible: true,
                            fontSize: 24,
                            horzAlign: 'center',
                            vertAlign: 'center',
                            color: 'rgba(171, 71, 188, 0.5)',
                            text: 'ABT',
                        },
                    });
                }
            })
        },
        PriceFormatter(price) {
            return parseFloat(price).toFixed(this.currentCurrency['decimals']);
        },
        navInit(e) {
            this.getWindowHeight();
            this.navHeight = e.height + e.statusBarHeight;
            this.scrollHeight = this.windowHeight - this.navHeight;
        },
        getWindowHeight() {
            this.windowHeight = uni.getSystemInfoSync().windowHeight;
        },
        timeChange(e) {
            this.timeIndex = e.index;
        },
        orderTabChange(e) {
            console.log(e);
            this.listTabIndex = e.index;
            if (e.index === 1) {
                this.showOrder = false;
            } else {
                this.showOrder = true;
            }
        },
        optionalChange() {
            console.log(this.like);
            if (this.like) {
                this.like = false;
                this.remFav(1, this.currentCurrency['id']);
            } else {
                this.like = true;
                this.addFav(1, this.currentCurrency);
            }
        },
        filterTap(idx) {
            //显示下拉框
            if (idx === 0) {
                this.$refs.ddmRange.show()
            }
            if (idx === 1) {
                this.$refs.numRange.show()
            }
            if (idx === 2) {
                this.$refs.decimal.show()
            }
        },
        updatePrice(time, price) {
            var times = new Date().getTime();
            areaSeries.update({
                time: times,
                value: parseFloat(price)
            });
            lineSeries.update({
                time: times,
                value: parseFloat(price)
            });

            chart.timeScale().scrollToRealTime();
            const currentScrollPosition = chart.timeScale().scrollPosition();
            chart.timeScale().scrollToPosition(currentScrollPosition, false);
        },
        onTradeMessageHandler(data) {
            if (data.type === 100) {
                let ticker = this.$util.getCurrentTicker(this.currentCurrency['id'], data.data);
                this.ticker = ticker;
                this.currentCurrency['change_rate'] = ticker['P'];

                try {
                    if (this.mlist.length > 0) {
                        this.mlist = this.$util.compareCurrency(this.mlist,data.data);
                    }
                    // if (this.mlist.length > 0) {
                    //
                    //     let index = this.mlist.findIndex(item => item.id == data.currency_id);
                    //
                    //     this.mlist[index]['new_price'] = ticker['c'];
                    //     this.mlist[index]['change_rate'] = ticker['P'];
                    // }
                    this.currency[0]['currency'] = this.$util.compareCurrency(this.currency[0]['currency'],data.data);
                    // let index = this.currency[0]['currency'].findIndex(item => item.id == data.currency_id);
                    // this.currency[0]['currency'][index]['new_price'] = ticker['c'];
                    // this.currency[0]['currency'][index]['change_rate'] = ticker['P'];
                } catch (e) {
                }
                // if (this.order_price === '') {
                //     this.order_price = parseFloat(ticker.c);
                // }
                if ((lastPrice === 0 || lastPrice !== parseFloat(ticker.c)) && this.IsShow) {
                    this.updatePrice(ticker.C, ticker.c);
                    //this.$refs.webview && this.klineShow && this.$refs.webview.evalJs("updatePrice("+ticker.C+","+ticker.c+")");
                    lastPrice = parseFloat(ticker.c);
                }

            }

            if (data.type == 101 && data.currency_id == this.currentCurrency['id']) {
                //深度数据
                this.asks = orderType == 0 ? data.data.asks.slice(0, 4) : data.data.asks.slice(0, 5);
                this.bids = orderType == 0 ? data.data.bids.slice(0, 4) : data.data.bids.slice(0, 5);
            }
            if (data.type == 300) {
                //现货成交通知
                this.$refs.alert.close();
                this.orderResult = data;
                this.showPop = true;
                console.log("订单成交通知：", data);
                this.getOrderList();
                this.getBalance();
            }

            //接收ws 的数据
        },
        submit() {
            if (this.order_type != 0 && (this.order_price == '' || parseFloat(this.order_price) <= 0)) {
                this.content = this.$t('contruct.pl19');
                this.ctxt = '';
                this.$refs.alert.open();
                return false;
            }
            if (this.amount == '' || parseFloat(this.amount) <= 0) {
                this.content = this.$t('trade.enter_tn');
                this.ctxt = '';
                this.$refs.alert.open();
                return false;
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
                    this.$refs.alert.open();
                    return false;
                }
            }
            if (this.direction == 1) {
                if (parseFloat(this.balance['trade_balance']) < parseFloat(amount)) {
                    this.content = this.currentCurrency['symbol'] + this.$t('trade.inaqu');
                    this.ctxt = '';
                    this.$refs.alert.open();
                    return false;
                }
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
            console.log(post);
            this.$refs.loading.open();
            tradeApi.tradeSubmit(post).then(res => {
                this.$refs.loading.close();
                if (res.code != 200) {
                    this.content = res.message;
                    this.$refs.alert.open();
                } else {
                    this.content = this.$t('trade.order_suc');
                    this.$refs.alert.open();
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
                this.$refs.alert.open();
            });
        },
        cancelOrder(id = 0) {
            if (id == 0) {
                id = this.orderList.map((item) => {
                    return item.id
                });
                console.log(id);
                console.log(this.orderList);
                id = id.join(',')
            }
            this.$refs.loading.open();
            tradeApi.orderCancel(id).then(res => {
                this.$refs.loading.close();
                if (res.code == 200) {
                    this.content = this.$t('trade.suc_wid');
                    this.$refs.alert.open();
                    this.getOrderList();
                } else {
                    this.content = res.message;
                    this.$refs.alert.open();
                }
            });
        },
        getCurrrency() {
            this.currency = uni.getStorageSync('trade-currency');
            mathcesList = this.currency[0]['currency'];
            cm_id = this.currency[0]['id'];
        },
        getCurrentCurrency() {
            //从现货本地缓存拿第一个
            var current = uni.getStorageSync('trade-current');
            if (typeof current == 'undefined' || current == '' || !current) {
                current = this.currency[0]['currency'][0];
                current['cm_id'] = this.currency[0]['id'];
                uni.setStorageSync('trade-current', current);
            }
            this.currentCurrency = current;
            this.subscribeDepth();
            this.getBalance();
            this.setUnitList();
            this.depthDecimal = current['decimals'];
            this.like = this.favStatus(1, current['id']);
        },
        getChoiceCurrency(){
            this.getCurrrency();
            const currency = uni.getStorageSync('trade-currency');
            const choice_current = uni.getStorageSync("choice-trade");
            if (typeof choice_current == 'undefined' || choice_current == '' || !choice_current) {
                this.getCurrentCurrency();
            } else {
                const current_id = choice_current[0]['currency_id'];
                let choiceCurrency = currency[0]['currency'].find(item => item.id === current_id);
                choiceCurrency['cm_id'] = currency[0]['id'];
                uni.setStorageSync('trade-current', choiceCurrency);
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
                this.bids = []
                this.asks = []
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
            if (typeof mlist == 'undefined' || mlist.length == 0) {
                return false;
            }
            this.mlist = mlist;
            if (typeof mlist != 'undefined' || !mlist) {
                mlist.map((val, index, arr) => {
                    if (val.id === this.currentCurrency['id']) {
                        this.like = 1;
                    }
                });
            }
        },
        switchCurrency(cid, index) {
            console.log(cid, index)
            this.selectIndex = index;
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
            this.closeDrawer();
            this.order_price = '';
            this.amount = '';
            this.rateValue = 0;
            this.loadKline();
        },
        setUnitList() {
            this.showUnit = [
                parseFloat(1 / (10 ** this.currentCurrency['decimals'])).toFixed(this.currentCurrency['decimals']),
                parseFloat(1 / (10 ** (this.currentCurrency['decimals'] - 1))).toFixed(this.currentCurrency[
                    'decimals'] - 1),
                parseFloat(1 / (10 ** (this.currentCurrency['decimals'] - 2))).toFixed(this.currentCurrency[
                    'decimals'] - 2),
            ];
            this.showUnitValue = this.showUnit[0];
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
                    this.$refs.alert.open();
                    this.balance = this.balanceNull;
                }
            } else {
                setTimeout(() => {
                    this.getBalance();
                }, 2000);
            }
        },
        getOrderList() {
            tradeApi.tradeOrderList(this.showUOrder ? 0 : this.currentCurrency['id']).then(res => {
                if (res.code == 200) {
                    this.orderList = res.data;
                }
            })
        },
        selectTradeType(e) {
            console.log(e)
            this.orderUnitValue = e.text;
            this.trade_type = e.index;
            this.amount = '';
            this.rateValue = 0;
        },
        selectDecimal(e) {
            console.log(e.index)
            this.showUnitValue = e.text;
            if (e.index == 0) {
                this.depthDecimal = this.currentCurrency['decimals'];
            }
            if (e.index == 1) {
                this.depthDecimal = this.currentCurrency['decimals'] - 1;
            }
            if (e.index == 2) {
                this.depthDecimal = this.currentCurrency['decimals'] - 2;
            }
            if (e.index == 3) {
                this.depthDecimal = this.currentCurrency['decimals'];
                this.showUnitValue = this.showUnit[0];
            }
        },
        sliderChange(e) {
            this.rateValue = e.detail.value;
            if (parseFloat(this.balance['legal_balance']) <= 0 && typeof this.balance['legal_balance'] !=
                'undefined') {
                return false;
            }
            this.balance['legal_balance'] = parseFloat(this.balance['legal_balance']);
            if (this.direction == 0) {
                if (this.trade_type == 0) {
                    this.amount = parseFloat((e.detail.value * this.balance['legal_balance']) / this.ticker['c'] / 100)
                        .toFixed(this.currentCurrency['trade_decimals']);
                } else {
                    this.amount = parseFloat(e.detail.value * this.balance['legal_balance'] / 100).toFixed(2);
                }
            }

            if (this.direction == 1) {
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
            this.range = e.text
            orderType = e.index;
            this.order_type = e.index;
            if(e.index === 1 && this.order_price < 0){
                this.order_price = this.ticker['c'];
            }
        },
        onSelect(e) {

        },
        switchSort(index) {
            console.log(index);
            if (this.sort[index]['type'] == 0) {
                this.sort[index]['type'] = 1;
                this.sort[index]['active'] = this.sort[index]['down'];
                return;
            }
            if (this.sort[index]['type'] == 1) {
                this.sort[index]['type'] = 2;
                this.sort[index]['active'] = this.sort[index]['up'];
                return;
            }
            if (this.sort[index]['type'] == 2) {
                this.sort[index]['type'] = 0;
                this.sort[index]['active'] = this.sort[index]['img'];
                return;
            }
        },
        closeDrawer() {
            this.drawerPopup = false;
        },
        toKline() {
            uni.navigateTo({
                url: "/pages/trade/kline?type=0&id=" + this.currentCurrency['id'] + "&cid=" + cm_id
            })
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
        },
    }
}