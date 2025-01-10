import timeIndex from "@/common/timeIndex.js";
import fuiBottomPopup from "@/components/firstui/fui-bottom-popup/fui-bottom-popup.vue"
import emptyView from "@/components/emptyView/emptyView.vue";

var lastUpdateTickerPrice = 0;

import {mapGetters} from 'vuex';

import currencyApi from '@/common/api/currency.js';
import contractApi from '@/common/api/contract.js';

var cm_id; //当前交易对
var currency_id; //当前币种id
let currency_type;//记录当前交易对的交易数据类型
var matches; //原始合约币种列表
var mlist; //自选原始数据
var subset;
var timestamp = 0;//资金费率结算时间
var timecaluc = false;


var tindex = 0;
var recreate = 0;
var action = 0;//确认行为动作 -1 撤单
var opId = 0;

var chart;
var lineSeries;
var areaSeries;
var inits = 0;
var lastPrice = 0;

let lastOrder = 0;

import currency from "../../common/api/currency.js";
import {createChart} from 'lightweight-charts';
import FuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";
import FuiTag from "@/components/firstui/fui-tag/fui-tag.vue";
import uniwebsocket from "@/uni_modules/veo-uniwebsocket/js_sdk/uniWebsocket.js";
import fwebsocket from "@/uni_modules/veo-uniwebsocket/js_sdk/Websocket.js";

export default {
    components: {
        FuiTag,
        FuiNavBar,
        fuiBottomPopup,
        emptyView
    },
    data() {
        return {
            navHeight: "",
            timeIndex: 0,
            timeIist: timeIndex.time,
            OrderType: "",
            value: "0",
            showPopover: false,
            actions: [
                this.$t('市价下单'),
                this.$t('限价下单'),
                this.$t('条件单')
            ],
            orderUnitValue: "",
            showUnitValue: "0.01",
            showUnit: [
                "0.01",
                "0.1",
                "1"
            ],
            active: 0,
            sort: [
                {
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
            listTabIndex: 0,
            IsShow: false,
            update: false,
            showMenu: false,
            stopProfit: false,
            support: 0,
            priceInput: false,
            priceNum: false,
            alertMsg: "一键平仓将会撤销合约下所有挂单并以市价委托方式平仓合约下所有相关键仓位。",
            ticker: {P: "0.00"},
            searchValue: "", //币种搜索

            currency: [],
            mlist: [],//自选列表
            mindex: 0,
            currentCurrency: {},//当前选择的币种

            bids: [], //深度数据
            asks: [],
            market: {},
            time: "--",//倒计时
            balance: {
                legal_balance: 0,
                position_balance: 0
            },//账户余额
            //合约下单参数
            amountType: 0,//开仓数量计算方式
            direction: 1,//1 开仓 2平仓
            tmutil: 0,//临时变量
            mutil: 50, //合约倍数
            tmargin: 1,//临时变量
            margin_type: 1,//1 全仓 2逐仓
            order_type: 0,//0市价单 1限价单 2条件单
            amount: '',//开仓数量,
            price_up: "",//止盈价格
            price_down: "",//止损价格
            order_price: "",
            t_price: "",
            check: {
                sw: 0,//0 可切换仓位模式 1 不可切换,
                ps: 1,//当前持仓数量 ，用于限制开仓数量
            },
            rate: 0,//滑块的数值
            inputAm: "",
            content: "",
            onlyCurrency: false,
            position: {
                totalAmount: {currency_id: 0},
                position: [],
                legal_balance: 0
            },
            pindex: 0,
            ptype: false,
            pprice: '',
            pamount: '',

            marginTip: false,
            mtabIndex: 0,
            numVal: "",
            plpopup: false,

            rateValue: 0,
            windowHeight: uni.getSystemInfoSync().windowHeight,
            popSliderValue: 0,
            like: false,

            swiperHeight: "",
            matches: {}
        }
    },
    onReady() {
        // this.currency = uni.getStorageSync('trade-currency');
        // this.getCurrentCurrency();
        this.getMlistCurrency();
        this.initForm();//初始化界面参数，做本地缓存
        uni.$on('contract', (data) => {
            this.onContractMessageHandler(data);
        });
        let _this = this;
        uni.$on('reconnected-c', () => {
            console.log("reconnected-c");
            _this.subscribeDepth();
        });
        setInterval(() => {
            if (getApp().globalData.csocket.getStatus() === 0) {
                _this.subscribeDepth();
            }
        }, 300)
    },
    onShow() {
        this.getChoiceCurrency()

        uni.$emit('connect');
        // location.reload()
        //     console.log(12222)
        // this.$emit('connect');
        // this.$emit('connectContractSocketServer');
        this.getBalance();
        this.getPosition();

        let marginType = uni.getStorageSync('margin_type');
        if (parseInt(marginType) > 0) {
            this.margin_type = parseInt(marginType);
        }

        let muilt = uni.getStorageSync('mutil');
        if (parseInt(muilt) > 0) {
            this.mutil = parseInt(muilt);
        }

        this.setTabText();
    },
    onHide() {
    },
    watch: {
        timeIndex(index) {
            this.reDrawKline(index)
        },
        IsShow(value) {
            if (value) {
                setTimeout(() => {
                    this.Kcreate();
                }, 500);
            }
        },
        searchValue(v) {
            if (this.mindex == 0) {
                this.mlist = mlist.filter(item => item.symbol.toLowerCase().includes(v.toLowerCase()));
            } else {
                this.currency[0]['currency'] = matches.filter(item => item.symbol.toLowerCase().includes(v.toLowerCase()));
            }
        },
        onlyCurrency(v) {
            this.getPosition();
        }
    },
    computed: {
        ...mapGetters(['isLogin', 'userTheme', 'lang'])
    },
    methods: {
        navInit(e) {
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            this.navHeight = e.height + e.statusBarHeight;
            this.swiperHeight = windowHeight - this.navHeight - 44;
        },
        filterTap(index) {
            if (index == 0) {
                this.$refs.ddmRange.show();
            }

            if (index == 1) {
                this.$refs.decimal.show();
            }
        },
        selectDecimal(e) {
            console.log(e)
            this.showUnitValue = e.text;
        },
        klineTimeChange(e) {

            this.timeIndex = e.index;
        },
        mgtipShow() {
            this.marginTip = true;
            this.hideTabBar();
        },
        closePopup() {
            this.marginTip = false;
            this.showTabbar();
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
        onContractMessageHandler(data) {
            //接收ws 的数据
            if ((data.type === 200 && cm_id === data.data.cm_id) || (data.type === 500 && data.data.cm_id === cm_id) || (data.type === 600 && cm_id === data.data.cm_id) || (data.type === 700 && cm_id === data.data.cm_id)) {
                if (parseInt(data.data.currency_id) === parseInt(this.currentCurrency['id'])) {
                    try {
                        let ticker = data.data.data;
                        if (typeof ticker === 'undefined' || ticker === '') {
                            return;
                        }

                        this.ticker = ticker;

                        this.currentCurrency['new_price'] = ticker['c'];
                    } catch (e) {
                    }

                    try {
                        if ((lastPrice === 0 || lastPrice != parseFloat(ticker.c)) && this.IsShow) {
                            //this.$refs.webview && this.klineShow && this.klineShow && this.$refs.webview.evalJs("updatePrice(" + ticker.C + "," + ticker.c + ")");
                            this.updatePrice(this.ticker.C, this.ticker.c);
                            lastPrice = parseFloat(ticker.c);
                        }
                    } catch (e) {
                        console.log(e);
                    }

                    //this.currency[0]['currency'] =  this.$util.compareCurrency(this.currency[0]['currency'], data.data.data);
                }

            }
            if (data.type === 200 || data.type === 500 || data.type === 600 || data.type === 700) {
                this.calacPosition(data.data);
                //更新币种显示列表数据
                this.currency = this.currency.map((item) => {
                    if (item.id === data.data.cm_id) {
                        item['currency'] = this.$util.compareCurrency(item.currency, data.data);
                    }
                    return item;
                });
            }

            if ((data.type === 201 || data.type === 501 || data.type === 601 || data.type === 701) && data.data.currency_id === this.currentCurrency['id'] && data.data.cm_id === cm_id) {
                let length = 9;
                if (!this.isLogin) {
                    length = 3;
                } else {
                    if (this.order_type === 0) {
                        length = 6;
                    }
                    if (this.order_type === 1) {
                        length = 7;
                    }
                    if (this.order_type === 2) {
                        length = 8;
                    }
                }
                this.bids = data.data.data.b.slice(0, length);
                this.asks = data.data.data.a.slice(0, length);
            }
            if (data.type == 202 && data.data.currency_id == this.currentCurrency['id']) {
                //市场标记价格信息
                this.market = data.data.data;
                if (timestamp == 0) {
                    timestamp = this.market['T'];
                }
                if (timestamp != this.market['T']) {
                    timestamp = this.market['T'];
                }
                if (!timecaluc) {
                    this.calacTime();
                }
            }

            // if(data.type === 204){
            // 	console.log(data);
            // }
            if (data.type === 204 && data.data.result && data.data.msg !== lastOrder) {
                //开单消息通知，重新加载余额以及仓位信息
                lastOrder = data.data.msg;
                this.getPosition();
                this.getBalance();
                // _this.getPosition(true);
            }
            if (data.type === 205) {
                this.getPosition(false);
                this.getBalance();
            }
            // if (data.type == 204) {
            //     //开单消息通知，重新加载余额以及仓位信息
            //     this.getBalance();
            //     this.getPosition();
            // }
        },
        calacPosition(ticker) {
            var position = this.position.position;
            if (position.length <= 0) {
                return false;
            }
            for (var i = 0; i < position.length; i++) {
                if (parseInt(position[i]['currency_id']) === parseInt(ticker.currency_id)) {
                    var item = position[i]
                    var amount = parseFloat(item['amount']) - parseFloat(item['close']);
                    var o = parseFloat(item['price']);
                    var newPrice = parseFloat(ticker['data']['c']);
                    let p = 0;
                    if (parseInt(item['direction']) == 1) {
                        p = amount * (newPrice - o);
                    } else {
                        p = amount * (o - newPrice);
                    }
                    item['p'] = p;
                    uni.$emit('profit', item.id, p);
                    //rate
                    if (parseInt(item['direction']) == 1) {
                        var pr = item.amount * (newPrice - item.price) / item.margin * 100;
                    } else {
                        var pr = item.amount * (item.price - newPrice) / item.margin * 100;
                    }
                    item['rate'] = pr > 0 ? '+' + this.$util.thousandSeparator(pr, 2) : this.$util.thousandSeparator(pr)

                    if (parseInt(item['direction']) == 1) {
                        p = item.amount * (newPrice - item.price);
                    } else {
                        p = item.amount * (item.price - newPrice);
                    }
                    item['mr'] = (parseFloat(item.margin) + parseFloat(p)) / parseFloat(item.margin) * 100;
                    position[i] = item;
                }
            }
            this.position.position = position;
        },
        getStopPrice() {
            if (!this.balance.legal_balance || this.balance.legal_balance <= 0) {
                return false;
            }
            //全仓合约单计算强平价格
            let longAmount = 0;
            let shortAmount = 0;
            let margin = 0;
            let position = this.position.position.filter(item => parseInt(item.margin_type) === 1);
            position.map((item) => {
                if (item.margin_type === 1) {
                    let amount = parseFloat(item.amount) - parseFloat(item.close);
                    let uamount = parseFloat(item.price) * amount;
                    if (parseInt(item['direction']) === 1) {
                        longAmount += uamount;
                    } else {
                        shortAmount += uamount
                    }
                    margin += uamount / parseInt(item['muilt']);
                }
                return item;
            });

            let direction = 0;
            let positionAmount = 0;
            if (longAmount > shortAmount) {
                direction = 1;
                positionAmount = longAmount - shortAmount;
            } else {
                direction = 2;
                positionAmount = shortAmount - longAmount
            }
            console.log("direction:", direction, "positionAmount:", positionAmount);
            let balance = parseFloat(this.balance.legal_balance) + margin;
            console.log("balance : ", balance);
            this.position.position = this.position.position.map((item) => {
                if (parseInt(item.margin_type) === 1) {
                    let p = balance / (positionAmount / parseFloat(item['price']));
                    let stopPrice = 0;
                    if (direction === 1) {
                        stopPrice = parseFloat(item['price']) - p;
                    } else {
                        stopPrice = parseFloat(item['price']) + p;
                    }
                    if (stopPrice < 0) {
                        stopPrice = 0;
                    }
                    item['stopPrice'] = stopPrice;
                }
                return item;
            });
        },
        calacTime() {
            timecaluc = setInterval(() => {
                const currentTimestamp = Date.now();
                const timeRemaining = timestamp - currentTimestamp;
                const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                this.time = (hoursRemaining < 10 ? '0' + hoursRemaining : hoursRemaining) + ':' +
                    (minutesRemaining < 10 ? '0' + minutesRemaining : minutesRemaining) + ':' +
                    (secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining)
            }, 1000);
        },
        submit(_direction) {
            //提交表单
            if (this.order_type === 0) {
                var margin = parseFloat(this.amountType === 0 ? this.amount / this.mutil * this.currentCurrency['new_price'] : this.inputAm).toFixed(2);
            } else if (this.order_type === 1) {
                //判断限价下单，委托价和当前限价对比
                if (_direction === 1) {
                    if (this.order_price > this.currentCurrency['new_price']) {
                        this.content = this.$t('contruct.pl35a');
                        this.$refs.alert.open();
                        return false;
                    }
                } else if (_direction === 2) {
                    if (this.order_price < this.currentCurrency['new_price']) {
                        this.content = this.$t('contruct.pl35b');
                        this.$refs.alert.open();
                        return false;
                    }
                }
                var margin = parseFloat(this.amountType === 0 ? this.amount / this.mutil * this.order_price : this.inputAm).toFixed(2);
            } else {
                var margin = parseFloat(this.amountType === 0 ? this.amount / this.mutil * this.order_price : this.inputAm).toFixed(2);
            }

            //判断下单限制
            if (this.currentCurrency['min_amount'] && parseFloat(margin) < parseFloat(this.currentCurrency['min_amount'])) {
                this.content = this.$t('contract.order_min_tip') + this.$util.float(this.currentCurrency['min_amount']) + "USDT";
                this.$refs.alert.open();
                return false;
            }
            if (parseFloat(margin) > parseFloat(this.balance.legal_balance)) {
                this.content = this.$t('contruct.pl17');
                this.$refs.alert.open();
                return false;
            }
            if (this.amount == '' || this.amount <= 0) {
                this.content = this.$t('contruct.pl16');
                this.$refs.alert.open();
                return false;
            }

            if (this.order_type >= 1 && (this.order_price == '' || parseFloat(this.order_price) <= 0)) {
                this.content = this.$t('contruct.pl19');
                this.$refs.alert.open();
                return false;
            }

            if (this.order_type == 2 && (this.wprice == '' || parseFloat(this.wprice) <= 0)) {
                this.content = this.$t('contruct.pl20');
                this.$refs.alert.open();
                return false;
            }

            let avaAmount;
            if (_direction === 1) {
                avaAmount = this.getAvliAmount(1);
            } else {
                avaAmount = this.getAvliAmount(2);
            }
            if (this.amountType === 0 && parseInt(this.amount) > parseInt(avaAmount)) {
                this.content = this.$t('contruct.pl17');
                this.$refs.alert.open();
                return false;
            }
            if (this.amountType === 1 && parseInt(this.inputAm) > parseInt(avaAmount)) {
                this.content = this.$t('contruct.pl17');
                this.$refs.alert.open();
                return false;
            }

            let form = {
                cm_id: cm_id,
                currency_id: currency_id,
                direction: _direction,
                muilt: this.mutil,
                order_type: this.order_type + 1,
                margin_type: this.margin_type
            };
            if (this.amountType === 0) {
                form['amount'] = this.$util.str2number(this.amount);
            } else {
                form['uamount'] = this.inputAm;
            }

            if (this.order_type === 0) {
                form['price'] = this.ticker['c']; //记录操作时提交的价格
            }
            if (this.order_type === 1) {
                form['price'] = this.order_price;//限价委托价格
            }
            if (this.order_type === 2) {
                form['price'] = this.order_price; //条件单的委托价格
                form['wprice'] = this.t_price;//条件单的触发价格
            }
            form['nowprice'] = this.ticker['c'];
            this.$refs.loading.open();
            contractApi.submitOrder(form).then(res => {
                this.$refs.loading.close();
                if (res.code !== 200) {
                    this.content = res.message;
                    this.$refs.alert.open();
                    return false;
                }
                this.order_price = '';
                this.amount = '';
                this.inputAm = '';
                if (this.order_type !== 0) {
                    this.getPosition();
                }
                //重新加载订单数据，余额数据等操作
            }).catch(e => {
                this.$refs.loading.close();
                this.content = this.$t('trade.unknown_error');
                this.$refs.alert.open();
            })
        },
        getPosition() {
            contractApi.getPositionList(this.onlyCurrency ? currency_id : 0).then(res => {
                if (res.code === 200) {
                    //var position = res.data.position;
                    // position = position.map((item) => {
                    //     //需要减去盈亏情况
                    //     if (item.margin_type === 1) {
                    //         var sp = ((parseFloat(res.data.legal_balance) / parseFloat(item.amount)) - (parseFloat(item.uamount) * 0.001));
                    //     } else {
                    //         var sp = (((parseFloat(item.margin) * 0.95) / parseFloat(item.amount)) - (parseFloat(item.uamount) * 0.001));
                    //     }
                    //     item['sp'] = sp;
                    //     return item;
                    // });
                    // res.data.position = position;
                    this.position = res.data;
                    this.getStopPrice();
                } else {
                    this.position = {
                        position: [],
                        totalAmount: []
                    };
                }
            });
        },
        initForm() {
            //初始化界面参数
            const mutil = uni.getStorageSync('mutil');
            if (typeof mutil != 'undefined' && parseInt(mutil) > 0) {
                this.mutil = mutil;
                this.tmutil = mutil;
            }
            const margin_type = uni.getStorageSync('margin_type');
            if (typeof margin_type != 'undefined' && parseInt(margin_type) > 0) {
                this.margin_type = margin_type;
                this.tmargin = margin_type;
            }
        },
        getBalance() {
            setTimeout(() => {
                if (this.isLogin && cm_id > 0 && currency_id > 0) {
                    contractApi.getBalance(cm_id, currency_id).then(res => {
                        if (res.code == 200) {
                            this.balance = res.data;
                            if (this.balance.depth) {
                                let length = 6;
                                if (this.balance.depth.data.b.length < 6) {
                                    length = this.balance.depth.data.b.length;
                                }
                                this.bids = this.balance.depth.data.b.slice(0, length);
                                this.asks = this.balance.depth.data.a.slice(0, length);
                                this.currentCurrency['new_price'] = this.bids[0][0]
                            }
                        }
                    });
                }
            }, 1000);
        },
        subscribeDepth() {
            if (subset) {
                clearInterval(subset);
            }
            try {
                // this.bids = []
                // this.asks = []
                getApp().globalData.csocket.send({
                    event: "contrade_depth_subscribe",
                    cm_id: cm_id,
                    currency_id: currency_id
                });
            } catch (e) {
                setTimeout(() => {
                    getApp().globalData.csocket.restart();
                    this.subscribeDepth();
                }, 2000);
            }
        },
        async getCurrentCurrency() {
            var current = uni.getStorageSync('current-contract');
            let currency = false;
            if (typeof current === 'undefined' || current === '') {
                currency = await this.getContracuMatches();
                uni.setStorageSync('contract-matches', currency);
                current = currency[0]['currency'][0];
                cm_id = current['cm_id'] = currency[0]['id'];
                current['currency_type'] = currency[0]['currency_type'];
            }
            if (!currency) {
                try {
                    currency = await this.getContracuMatches();
                    let _matches = currency.filter(item => item.id === current['cm_id']);
                    cm_id = _matches[0]['id'];
                    currency_type = _matches[0]['currency_type'];
                    this.mindex = cm_id;
                    _matches[0].currency.map((item) => {
                        if (parseInt(item['id']) === parseInt(current['id'])) {
                            current = item;
                            current['cm_id'] = cm_id;
                            current['currency_type'] = _matches[0]['currency_type'];
                        }
                    });
                } catch (e) {

                    current = currency[0]['currency'][0];
                    current['cm_id'] = currency[0]['id'];
                    current['currency_type'] = currency[0]['currency_type'];
                    cm_id = current['cm_id'];
                    currency_type = current['currency_type'];
                    this.mindex = cm_id;
                }
            }
            matches = currency[0]['currency'];
            this.currentCurrency = current;
            this.currency = currency;
            currency_id = current['id'];
            currency_type = current['currency_type'];
            this.mindex = cm_id;
            this.subscribeDepth();
            uni.setStorageSync('current-contract', this.currentCurrency);
            this.getBalance();
            this.getPosition();
            this.like = this.favStatus(2, current['id']);
            // this.$nextTick(() => {
            //     currencyApi.contractCurrencyList().then(res => {
            //         uni.setStorageSync('contract-matches', res.data);
            //         uni.setStorageSync('current-cm_id', res.data[0]['id']);
            //     });
            // });
        },
        async getChoiceCurrency() {
            let currency = await this.getContracuMatches();
            const choice_current = uni.getStorageSync("choice-contract");
            if (typeof choice_current === 'undefined' || choice_current === '') {
                await this.getCurrentCurrency();
            } else {
                const current_id = choice_current[0]['currency_id'];
                let choiceCurrency = currency[0]['currency'].find(item => item.id === current_id);
                cm_id = choiceCurrency['cm_id'] = currency[0]['id'];
                this.mindex = cm_id;
                this.currency = currency;
                this.currentCurrency = choiceCurrency;
                currency_id = choiceCurrency['id'];
                currency_type = choiceCurrency['currency_type'];
                this.subscribeDepth();
                uni.setStorageSync('current-contract', this.currentCurrency);
                this.getBalance();
                this.getPosition();
                this.like = this.favStatus(2, choiceCurrency['id']);
            }
        },
        setCurrentCurrency(_matches, currency) {
            cm_id = _matches['id'];
            currency_type = _matches['currency_type'];
            this.matches = _matches;
            currency['cm_id'] = cm_id;
            currency['currency_type'] = currency_type;
            this.currentCurrency = currency;
            currency_id = currency['id'];
            this.subscribeDepth();
            uni.setStorageSync('current-contract', currency);
            this.getBalance();
            this.getPosition();
            this.$refs.showSelect.close();
            if (this.IsShow) {
                this.loadKline();
            }
        },
        getMlistCurrency() {
            //获取自选合约数据
            mlist = uni.getStorageSync('select-contract');
            this.mlist = mlist;
        },
        async getContracuMatches() {
            //获取合约数据交易对
            const currency = await currencyApi.contractCurrencyList();
            return currency.data;
        },
        allPingcang() {
            this.$refs.alertDialog.open();
        },
        changeMutil(e) {
            this.tmutil = e.detail.value;
        },
        inputAmount(e) {
            this.amount = e.detail.value / this.ticker['c'];
        },
        sliderChange(e) {
            // this.rateValue = e.detail.value;
            // if (this.direction == 1) {
            //     this.amount = this.$util.float(this.$util.thousandSeparator(e.detail.value * (this.getAvliAmount(1) - this.balance.position_balance) / 100, this.currentCurrency['trade_decimals']));
            //     if (this.amountType == 1) {
            //         this.inputAm = this.$util.str2number(this.$util.thousandSeparator(this.order_type == 0 ? this.amount * this.ticker['c'] : this.amount * this.order_price, 4));
            //     }
            // } else {
            //     this.rate = e.detail.value;
            // }
            if (e.detail.value == "" || e.detail.value <= 0) {
                this.amount = '';
                this.inputAm = '';
                return;
            }
            if (this.balance.legal_balance <= 0) {
                this.amount = '';
                this.inputAm = '';
                return;
            }
            this.irate = parseInt(e.detail.value);
            if (this.direction == 1) {
                // this.amount = util.float(util.thousandSeparator(e.detail.value * (this.getmaxPosition() - this.balance
                // 	.position_balance) / 100, this.currentCurrency['trade_decimals']));
                // if(this.order_type === 0){

                // 	//this.amount = parseFloat(this.balance.legal_balance/this.ticker['c'] * (e.detail.value/100)).toFixed(this.currentCurrency['trade_decimals']);
                // }else{
                // 	this.amount = parseFloat(this.balance.legal_balance/util.str2number(this.order_price) * (e.detail.value/100) ).toFixed(this.currentCurrency['trade_decimals']);
                // }
                let longAmount = this.getAvliAmount(1);
                let shortAmount = this.getAvliAmount(2);
                let avaAmount = longAmount > shortAmount ? longAmount : shortAmount;
                this.amount = parseFloat(avaAmount * (e.detail.value / 100)).toFixed(this.currentCurrency['decimals']);

                if (this.amountType == 1) {

                    // this.inputAm = util.str2number(util.thousandSeparator(this.order_type == 0 ? this.amount * this
                    // 	.ticker['c'] : this.amount * this.order_price, 4));
                    this.inputAm = this.amount;
                }
            } else {
                this.rate = e.detail.value;
            }
        },
        selectType(e) {
            this.order_type = e.index;
            this.order_price = this.$util.thousandSeparator(this.ticker['c'], this.currentCurrency['decimals']);
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
        openSupport(index) {
            this.support = index;
            this.$refs.showSupport.open();
        },
        getmaxPosition() {
            if (this.mutil > 100) {
                return 2;
            }
            if (this.mutil > 75) {
                return 8;
            }
            if (this.mutil > 25) {
                return 20;
            }
            return 75;
        },
        getProfit(cid, index, a = false, limit = false) {
            var cindex = this.currency[0]['currency'].findIndex(item => item.id == cid);
            if (limit) {
                var newPrice = parseFloat(this.pprice) > 0 ? parseFloat(this.pprice) : 0;
                if (newPrice === 0) {
                    return '0.00';
                }
            } else {
                var newPrice = parseFloat(this.currency[0]['currency'][cindex]['new_price']);
            }
            if (a == false) {
                var amount = parseFloat(this.position.position[index]['amount']) - parseFloat(this.position.position[index]['close']);
            } else {
                var amount = a;
            }
            var o = parseFloat(this.position.position[index]['price']);
            var d = parseInt(this.position.position[index]['direction']);
            if (d == 1) {
                var p = this.$util.thousandSeparator(amount * (newPrice - o), 4);

            } else {
                var p = this.$util.thousandSeparator(amount * (o - newPrice), 4);
            }
            return p > 0 ? '+' + p : p;
        },
        getProfitRate(cid, d, u, o, m) {
            var index = this.currency[0]['currency'].findIndex(item => item.id == cid);
            var newPrice = parseFloat(this.currency[0]['currency'][index]['new_price']);
            if (d == 1) {
                var p = u * (newPrice - o) / m * 100;

            } else {
                var p = u * (o - newPrice) / m * 100;
            }
            return p > 0 ? '+' + this.$util.thousandSeparator(p, 2) : this.$util.thousandSeparator(p);
        },
        getMarginRate(cid, d, u, o, m) {
            //需要做保证金类型判断，全仓使用余额做加法
            if (!this.currency[0]) {
                return false;
            }
            var index = this.currency[0]['currency'].findIndex(item => item.id == cid);
            var newPrice = parseFloat(this.currency[0]['currency'][index]['new_price']);
            if (d == 1) {
                var p = this.$util.thousandSeparator(u * (newPrice - o), 4);
            } else {
                var p = this.$util.thousandSeparator(u * (o - newPrice), 4);
            }
            return this.$util.thousandSeparator((parseFloat(m) + parseFloat(p)) / parseFloat(m) * 100, 2);
        },
        getNewPrice(cid, _cm_id) {
            let price = 0;
            Object.keys(this.currency).forEach((k) => {
                if (this.currency[k]['id'] === _cm_id) {
                    Object.keys(this.currency[k]['currency']).forEach((kk) => {
                        if (this.currency[k]['currency'][kk]['id'] === cid) {
                            price = this.currency[k]['currency'][kk]['new_price'];
                        }
                    });
                }
            });
            return price;
        },
        setMutil() {
            // if (this.position.position.length > 0) {
            //     return false;
            // }
            this.$refs.showMuitl.close()
            uni.setStorageSync('mutil', this.tmutil);
            this.mutil = this.tmutil;
        },
        setMargin() {
            this.$refs.showPosition.close();
            this.margin_type = this.tmargin;
            uni.setStorageSync('margin_type', this.tmargin);
        },
        inputPprice(e) {
            this.pprice = e.detail.value;
        },
        inputPamount(e) {
            this.pamount = e.detail.value;
        },
        sliderPamount(e) {
            var sum = parseFloat(this.position.position[this.pindex]['amount']) - parseFloat(this.position.position[this.pindex]['close']);
            console.log(sum);
            this.pamount = this.$util.float(parseFloat(e.detail.value / 100 * sum).toFixed(8));
            this.popSliderValue = e.detail.value;
        },
        getPositionCurrencyAmount(cid, direction) {
            if (this.position.position.length == 0) {
                return '0.00';
            }
            const position = this.position.position.filter(item => item.currency_id == cid && item.direction ==
                direction);
            return this.$util.float(parseFloat(parseFloat(position[0]['amount']) - parseFloat(position[0]['close']))
                .toFixed(8));
        },
        stopLight(oid) {
            //闪电平仓
            this.pamount = this.getPositionCurrencyAmount(this.position.position[this.pindex]['currency_id'], this.position.position[this.pindex]['direction']);
            this.ptype = false;
            this.stopPosition(oid, true);
        },
        stopPosition(orderId = 0, all = false) {
            if (this.pamount === '' || parseFloat(this.pamount) <= 0) {
                return false;
            }
            if (this.ptype !== false && (this.pprice === '' || parseFloat(this.pprice) <= 0)) {
                return false;
            }

            let form = {
                id: orderId,
                pamount: this.$util.str2number(this.pamount),
                ptype: this.ptype,
                price: this.ticker['c'],
                wprice: typeof this.wprice != 'undefined' ? this.wprice : 0
            };
            if (this.ptype === false) {
                form['ptype'] = 1;
            }
            if (this.ptype === true) {
                form['ptype'] = 2;
                form['price'] = this.pprice;
            }
            //console.log(form);return false;
            this.$refs.loading.open();
            contractApi.closeOrder(form).then(res => {
                this.$refs.actionOrder.close();
                this.$refs.loading.close();
                if (res.code !== 200) {
                    this.content = this.$t('trade.unknown_error');
                    this.$refs.alert.open();
                }
                // this.getPosition();
                if (all) {
                    this.position.position = this.position.position.filter((item) => {
                        return parseInt(item['id']) !== parseInt(orderId);
                    });
                } else {
                    this.position.position = this.position.position.map((item) => {
                        if (item['id'] === orderId) {
                            this.pamount = this.pamount.replace(/,/g, '');
                            item['close'] = parseFloat(item['close']) + parseFloat(this.pamount)
                        }
                        //修改的位置
                        if (item['amount'] == item['close']) {
                            return parseInt(item['id']) !== parseInt(orderId);
                        } else {
                            return item;
                        }
                    });
                }
                this.getBalance();
                if (this.position.position.length > 0) {
                    this.getStopPrice();
                } else {
                    uni.$emit('no_position');
                }
                this.pindex = 0;
                this.$refs.speedAction.close();
                this.$refs.actionOrder.close();
                this.ptype = false;
                this.pamount = '';
                //操作成功会有socket 消息通知数据更新，这个地方无需处理
            }).catch((e) => {
                this.$refs.actionOrder.close();
                this.$refs.loading.close();
                this.content = this.$t('trade.unknown_error');
                this.$refs.alert.open();
            })
        },
        stopOrderByButton(direction) {
            if (this.position.position.length == 0) {
                this.content = this.$t('contract.t101');
                this.$refs.alert.open();
                return false;
            }
            if (this.rate <= 0) {
                this.content = this.$t('contract.t102');
                this.$refs.alert.open();
                return false;
            }
            //1找多单id 2 找空单id
            var position = this.position.position.filter(item => item.currency_id == this.currentCurrency['id'] && item.direction == direction);
            if (position.length == 0) {
                this.content = this.$t('contract.t101');
                this.$refs.alert.open();
                return false;
            }
            if (this.order_type >= 1 && (this.order_price == '' || parseFloat(this.order_price) <= 0)) {
                this.content = this.$t('contract.t103');
                this.$refs.alert.open();
                return false;
            }
            if (this.order_type == 2 && (this.wprice == '' || parseFloat(this.wprice) <= 0)) {
                this.content = this.$t('contract.t104');
                this.$refs.alert.open();
                return false;
            }
            var pamount = parseFloat(this.getPositionAmount(position[0]['currency_id'], direction) * this.rate / 100).toFixed(8);
            var form = {
                id: position[0]['id'],
                pamount: pamount,
                ptype: this.order_type,
                price: this.ticker['c'],
                wprice: typeof this.wprice != 'undefined' ? this.wprice : 0
            };
            if (this.order_type == 0) {
                form['ptype'] = 1;
            }
            if (this.order_type == 1) {
                form['ptype'] = 2;
                form['price'] = this.order_price;
            }
            if (this.order_type == 2) {
                form['ptype'] = 3;
                form['price'] = this.order_price;
                form['wprice'] = this.t_price;
            }
            console.log(form);
            this.$refs.loading.open();
            contractApi.closeOrder(form).then(res => {
                this.$refs.actionOrder.close();
                this.$refs.loading.close();
                if (res.code != 200) {
                    this.content = '未知异常，请稍后重试';
                    this.$refs.alert.open();
                }
                this.getPosition();
                this.rate = 0;
                //操作成功会有socket 消息通知数据更新，这个地方无需处理
            }).catch((e) => {
                this.$refs.actionOrder.close();
                this.$refs.loading.close();
                this.content = '未知异常，请稍后重试';
                this.$refs.alert.open();
            })
        },
        stopAll() {
            if (this.position.position.length == 0) {
                return false;
            }
            this.$refs.loading.open();
            contractApi.closeOrder({
                id: 0,
                pamount: 0,
                ptype: 1,
                price: 0,
                wprice: 0
            }).then(res => {
                this.$refs.actionOrder.close();
                this.$refs.loading.close();
                if (res.code != 200) {
                    this.content = '未知异常，请稍后重试';
                    this.$refs.alert.open();
                }
                this.position.position = [];
                this.rate = 0;
                this.getBalance();
                //操作成功会有socket 消息通知数据更新，这个地方无需处理
            }).catch((e) => {
                this.$refs.actionOrder.close();
                this.$refs.loading.close();
                this.content = '未知异常，请稍后重试';
                this.$refs.alert.open();
            })
        },
        cancelOperation(id) {
            opId = id;
            action = -1;
            this.content = this.$t('newcontract.t001');
            this.$refs.alert.open();
            console.log(id);
        },
        alertConfirm() {
            this.$refs.alert.close();
            if (action === -1) {
                action = 0
                this.$refs.loading.open();
                contractApi.cancelOpeartion(opId).then(res => {
                    this.$refs.loading.close();
                    if (res.code != 200) {
                        this.content = res.message;
                        this.$refs.alert.open();
                        return true;
                    }
                    this.getPosition();
                }).catch((e) => {
                    this.$refs.loading.close();
                })
            }
        },
        getPositionAmount(cid, direction) {
            //获取币种的持仓可用数量
            if (this.position.position.length == 0) {
                return '0.00';
            }
            const position = this.position.position.filter(item => item.currency_id == cid && item.direction == direction);
            if (position.length > 0) {
                if (this.amountType == 0) {
                    return this.$util.float(parseFloat(parseFloat(position[0]['amount']) - parseFloat(position[0]['close'])).toFixed(8));
                } else {
                    return parseFloat(parseFloat(position[0]['uamount']) * parseFloat(parseFloat(position[0]['amount']) - parseFloat(position[0]['close']))).toFixed(4);
                }
            }
            return '0.00';
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
                    areaSeries.setData(res.data);
                    lineSeries.setData(res.data);

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
        toKline() {
            uni.navigateTo({
                url: "/pages/trade/kline?type=" + currency_type + "&id=" + this.currentCurrency['id'] + "&cid=" + cm_id
            })
        },
        getAvliAmount(d = 1) {
            if (typeof this.balance.legal_balance == 'undefined' || this.balance.legal_balance <= 0) {
                return '--';
            }
            //1 多 2空
            //开多减去多担仓位的数量
            //开空减去孔丹仓位的数量
            //全仓需要当前余额加上已有全仓的保证金
            let margin = 0;
            if (this.margin_type !== 2) {
                if (this.margin_type !== 2) {
                    this.position.position.map((item) => {
                        if (item.margin_type === 1) {
                            let amount = parseFloat(item.amount) - parseFloat(item.close);
                            let uamount = parseFloat(item.price) * amount;
                            margin += uamount / parseInt(item['muilt']);
                        }
                    });
                }
            }
            //let balance = parseFloat(this.balance.legal_balance) + margin;
            let balance = parseFloat(this.balance.legal_balance);
            let pamount = this.getDirectionAmount(d);
            let aamount = 0;
            if (this.order_type === 0) {
                aamount = balance / this.ticker['c'] * this.mutil;
            } else {
                aamount = balance / (this.order_price != '' ? this.$util.str2number(this.order_price) : this.ticker['c']) * this.mutil;
            }
            aamount = parseFloat(aamount * 0.9).toFixed(this.currentCurrency['decimals']);
            if (this.amountType === 0) {
                return aamount - pamount > 0 ? parseFloat(aamount - pamount).toFixed(this.currentCurrency['decimals']) : 0;
            } else {
                let amount = balance * (1 - (parseFloat(this.currentCurrency['fee_open']) + parseFloat(this.currentCurrency['fee_close'])));
                return amount > this.currentCurrency['max_amount'] ? this.currentCurrency['max_amount'] : amount;
            }
        },
        /**
         * 获取当前币对的同方向仓位数量
         * @returns {number}
         */
        getCurrencyAmount() {
            let amount = 0;
            this.position.position.map((item) => {
                if (item['currency_id'] === currency_id && item['cm_id'] === cm_id) {
                    amount += parseFloat(item['amount']) - parseFloat(item['close']);
                }
            });
            return amount;
        },
        getDirectionAmount(d) {
            var list = this.position.position.filter(item => item.direction === d);
            var amount = 0
            if (list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    amount += parseFloat(list[i]['amount']) - parseFloat(list[i]['close'])
                }
            }
            //return amount;
            return 0;
        },
        calacStopPrice(pindex) {
            if (pindex <= 0) {
                return false;
            }
            const fee = 0.0001;
            const position = this.position.position[pindex];
            if (this.mtabIndex === 0) {
                var margin = parseFloat(position.margin) + (parseFloat(this.numVal) > 0 ? parseFloat(this.numVal) : 0);
            } else {
                var margin = parseFloat(position.margin) - (parseFloat(this.numVal) > 0 ? parseFloat(this.numVal) : 0);
            }
            var price = (margin - (position.uamount * fee)) / (position.amount - position.close);
            return position.direction === 1 ? parseFloat(position.price) - price : parseFloat(position.price) + price;
        },
        setFav() {
            if (this.like) {
                this.like = false;
                this.remFav(2, this.currentCurrency['id']);
            } else {
                this.like = true;
                this.addFav(2, this.currentCurrency);
            }
        },
        sharePoster() {
            uni.showToast({
                title: this.$t('download.app'),
                icon: "none"
            });
        },
        setTabText() {
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