import fuiDropdownMenu from "@/components/firstui/fui-dropdown-menu/fui-dropdown-menu.vue"
import fuiDrawer from "@/components/firstui/fui-drawer/fui-drawer.vue"
import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"
import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue"
import fuiLabel from "@/components/firstui/fui-label/fui-label.vue"
import fuiCheckboxGroup from "@/components/firstui/fui-checkbox-group/fui-checkbox-group.vue"
import fuiCheckbox from "@/components/firstui/fui-checkbox/fui-checkbox.vue"
import fuiBottomPopup from "@/components/firstui/fui-bottom-popup/fui-bottom-popup.vue"
import fuiCollapse from "@/components/firstui/fui-collapse/fui-collapse.vue"
import fuiCollapseItem from "@/components/firstui/fui-collapse-item/fui-collapse-item.vue"
import fuiInputNumber from "@/components/firstui/fui-input-number/fui-input-number.vue"
import fuiDialog from "@/components/firstui/fui-dialog/fui-dialog.vue"
import fuiLoadAni from "@/components/firstui/fui-load-ani/fui-load-ani.vue"
import fuiDigitalRoller from "@/components/firstui/fui-digital-roller/fui-digital-roller.vue"


import {
    mapGetters, mapState, mapMutations
} from 'vuex';
import currencyApi from '@/common/api/currency.js';
import contractApi from '@/common/api/contract.js';
import currency from "@/common/api/currency.js";
import config from '@/common/api/config.js';

import {
    initVueI18n
} from '@dcloudio/uni-i18n'

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

var cm_id; //当前交易对
var currency_id; //当前币种id
var matches; //原始合约币种列表
var mlist; //自选原始数据
var subset;
var timestamp = 0; //资金费率结算时间
var timecaluc = false;

var tindex = 0;
var recreate = 0;
var action = 0; //确认行为动作 -1 撤单
var opId = 0;

var netInit = 0;
var updateOrder = 0; //用于检测订单的反馈结果，当收到ws 消息后关闭或者订单状态更新后关闭。

var lastPrice = 0;

export default {
    components: {
        fuiDropdownMenu,
        fuiDrawer,
        fuiToast,
        fuiTag,
        fuiLabel,
        fuiCheckboxGroup,
        fuiCheckbox,
        fuiBottomPopup,
        fuiCollapse,
        fuiCollapseItem,
        fuiInputNumber,
        fuiDialog,
        fuiLoadAni,
        fuiDigitalRoller
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
            rangeCheked: 0,
            range: this.$t('trade.mk_od'),
            coninType: 0,
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
            moreOptions: [{
                text: this.$t('financing.t81'),
                value: 1,
                route: mroute.exchange
            }, {
                text: this.$t('financing.t61'),
                value: 2,
                route: mroute.contractOrder
            }, {
                text: this.$t('contruct.con_info'),
                value: 3,
                route: mroute.contractInfo
            }, 
			// {
   //              text: this.$t('contruct.calculator'),
   //              value: 4,
   //              route: mroute.calculator
   //          },
			],
            options: [{
                text: this.$t('市价下单'),
                value: 0,
                checked: true
            }, {
                text: this.$t('限价下单'),
                value: 1
            }, {
                text: this.$t('条件单'),
                value: 2
            }],
            moreItem: "",
            popTab: 0,
            rangeShow: false,
            submenuActive: false,
            checked: false,
            klineShow: false,
            tabActive: 0,
            fullPopup: false,
            ptactive: 0,
            popupType: 0,
            leverOption: ["1", "25", "50", "75", "100", "125"],
            leverNum: 1,
            closeTypeVal: false,
            canceOrder: false,

            OrderType: "",
            value: "0",
            showPopover: false,
            actions: [
                this.$t('市价下单'),
                this.$t('限价下单'),
                this.$t('条件单')
            ],
            orderUnitValue: "",
            showUnitValue: "",
            showUnit: [
                "0.01",
                "0.1",
                "1",
                "取消"
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
                    active: "/static/img/z-nomal.png",
                    img: "/static/img/z-nomal.png",
                    up: "/static/img/z-up-sms.png",
                    down: "/static/img/z-down-sms.png"
                },
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
                }
            ],
            showOrder: true,
            showMenu: false,
            stopProfit: false,
            support: 0,
            priceInput: false,
            priceNum: false,
            ticker: {
                P: "0.00"
            },
            searchValue: "", //币种搜索
            alertShow: false,
            dialogContent: "",

            currency: [],
            mlist: [], //自选列表
            mindex: 0,
            currentCurrency: {}, //当前选择的币种

            bids: [], //深度数据
            asks: [],
            market: {},
            time: "--", //倒计时
            balance: {
                legal_balance: 0,
                position_balance: 0
            }, //账户余额
            //合约下单参数
            amountType: 0, //开仓数量计算方式
            direction: 1, //1 开仓 2平仓
            tmutil: 0, //临时变量
            mutil: 50, //合约倍数
            tmargin: 1, //临时变量
            margin_type: 1, //1 全仓 2逐仓
            order_type: 0, //0市价单 1限价单 2条件单
            amount: '', //开仓数量,
            price_up: "", //止盈价格
            price_down: "", //止损价格
            order_price: "",
            t_price: "",
            check: {
                sw: 0, //0 可切换仓位模式 1 不可切换,
                ps: 1, //当前持仓数量 ，用于限制开仓数量
            },
            rate: 0, //滑块的数值,
            irate: 0,
            inputAm: "",
            content: "",
            onlyCurrency: false,
            position: {
                totalAmount: {
                    currency_id: 0
                },
                position: [],
                entrust: [],
                entrustP: [],
                legal_balance: 0
            },
            pindex: 0,
            ptype: false,
            pprice: '',
            pamount: '',

            refreshing: false,
            refText: true,
            refreshText: this.$t('common.refer'),
            buttons: [{
                text: this.$t('取消'),
                color: "#85898e"
            }, {
                text: this.$t('确定'),
                color: "#3070ec"
            }],
            posterImg: "",

            path: '',
            painterShow: false,

            marginTip: false,
            mtabIndex: 0,
            numVal: "",
            plpopup: false,
            navHeight: "",
            rateVal: 0,
            listHeight: "",
            like:false
        }
    },
    mounted() {

    },
    onLoad() {

    },
    onReady() {
        let _this = this;
        uni.$on('contract', (data) => {
            try{
                _this.onContractMessageHandler(data);
            }catch (e){
                console.log(e);
            }
        });
        uni.$on('switchLan', () => {
            var lang = uni.getStorageSync('lang');
            if (typeof lang != 'undefined' && lang != '') {
                i18n.setLocale(lang);
            }
            _this.range = this.$t('市价下单');
            _this.setButtons();
            _this.setOption();
            _this.setMapMenu();
        });

        uni.$on('cconnect', () => {
            _this.subscribeDepth();
            _this.getPosition(false);
            _this.getBalance();
        });

        this.getCurrentCurrency();
        this.getMlistCurrency();
        this.initForm(); //初始化界面参数，做本地缓存

    },
    onShow() {
        this.getBalance();
        // this.getPosition();
        this.setTabbarBg();
    },
    watch: {
        timeIndex(index) {
            this.reDrawKline(index)
        },
        IsShow(value) {
            if (value) {
                setTimeout(() => {
                    // #ifdef APP-PLUS
                    this.ChangeKLinePeriod(PERIOD_ID.KLINE_MINUTE_ID);
                    // #endif
                    // #ifdef H5
                    this.$nextTick(() => {
                        this.OnSize();
                        this.CreateKLineChart_h5();
                    });
                    // #endif
                }, 500);
            }
        },
        searchValue(v) {
            if (this.mindex == 0) {
                this.mlist = mlist.filter(item => item.symbol.toLowerCase().includes(v.toLowerCase()));
            } else {
                this.currency[0]['currency'] = matches.filter(item => item.symbol.toLowerCase().includes(v
                    .toLowerCase()));
            }
        },
        checked(v) {
            this.getPosition(false);
        },
        alertShow(v) {
            if (v === false) {
                uni.showTabBar();
            } else {
                uni.hideTabBar();
            }
        },
        amount(v) {
            if (v !== '' || v > 0) {
                let longAmount = this.getAvliAmount(1);
                let shortAmount = this.getAvliAmount(2);
                let ava = longAmount > shortAmount ? longAmount : shortAmount;
                if (parseFloat(v) > ava && this.amountType === 0) {
                    this.amount = ava;
                    v = ava;
                }

                if (this.amountType === 0) {
                    this.irate = parseFloat(v / this.getAvliAmount() * 100).toFixed(2);
                }

            } else {
                this.irate = 0;
            }
        },
        inputAm(v) {
            if (v === '' || v <= 0) {
                this.irate = 0;
            } else {
                let longAmount = this.getAvliAmount(1);
                let shortAmount = this.getAvliAmount(2);
                let ava = longAmount > shortAmount ? longAmount : shortAmount;
                if (parseFloat(v) > ava && this.amountType === 1) {
                    this.inputAm = ava;
                    v = ava;
                }
                this.irate = parseFloat(v / this.getAvliAmount() * 100).toFixed(2);
            }
        },
        irate(v){
			if(parseInt(v) <= 0){
				this.irate = 0
			}
			if(parseInt(v) > 100){
				this.irate = 100
			}
        },
        amountType(v) {
            this.amount = '';
            this.inputAm = '';
            this.irate = 0;
        }
    },
    computed: {
        ...mapGetters(['isLogin', 'userTheme']),
        ...mapState(['userinfo'])
    },
    methods: {
        ...mapMutations(['setTabbarBg']),
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
            this.listHeight = this.windowHeight - this.navHeight;
        },
        setButtons() {
            this.buttons = [{
                text: this.$t('取消')
            }, {
                text: this.$t('确定')
            }];
        },
        setOption() {
            this.options = [{
                text: this.$t('市价下单'),
                value: 0,
                checked: true
            }, {
                text: this.$t('限价下单'),
                value: 1
            }, {
                text: this.$t('条件单'),
                value: 2
            }];
        },
        setMapMenu() {
            this.moreOptions = [{
                text: this.$t('financing.t81'),
                value: 1,
                route: mroute.exchange
            }, {
                text: this.$t('financing.t61'),
                value: 2,
                route: mroute.contractOrder
            }, {
                text: this.$t('contruct.con_info'),
                value: 3,
                route: mroute.contractInfo
            }, 
			// {
   //              text: this.$t('contruct.calculator'),
   //              value: 4,
   //              route: mroute.calculator
   //          },
			];
        },
        onContractMessageHandler(data) {
            //接收ws 的数据
            let _this = this;
			if(!this.currentCurrency || !this.currentCurrency['id']){
				return false;
			}
            try{
                if (data.type == 200) {
                    var ticker = data.data.data[_this.currentCurrency['id'].toString()];
                    if (typeof ticker === 'undefined' || ticker == '') {
                        return;
                    }

                    _this.ticker = ticker;
                    _this.currentCurrency['new_price'] = ticker['c'];

                    netInit = 1;
                    if (lastPrice === 0 || lastPrice != parseFloat(ticker.c)) {
                        _this.$refs.webview && _this.klineShow && _this.klineShow && _this.$refs.webview.evalJs("updatePrice(" + ticker.C + "," + ticker.c + ")");
                        lastPrice = parseFloat(ticker.c);
                    }
                    //更新币种显示列表数据
                    if (this.mlist.length > 0) {
                        try {
                            _this.mlist = util.compareCurrency(_this.mlist, data.data.data);
                        } catch (e) {
                        }
                    }

                    _this.currency[0]['currency'] = util.compareCurrency(_this.currency[0]['currency'], data.data.data);
                    _this.calacPosition(data.data.data);
                }
                if (data.type == 201 && data.data.currency_id == _this.currentCurrency['id']) {
                    var length = 6;
                    if (!_this.isLogin) {
                        length = 5;
                    } else {
                        if (_this.order_type == 0) {
                            length = 7;
                        }
                        if (_this.order_type == 1) {
                            length = 8;
                        }
                        if (_this.order_type == 2) {
                            length = 9;
                        }
                    }

                    var asks = data.data.data.a.slice(0, length);
                    var bids = data.data.data.b.slice(0, length);
                    var amax = 0;
                    var bmax = 0;
                    asks.sort((a, b) => {
                        return a[1] - b[1];
                    });
                    asks.map((v, i) => {
                        if (amax < parseFloat(v[1])) {
                            amax = v[1];
                        }
                    });
                    for (var i = 0; i < asks.length; i++) {
                        asks[i][2] = parseFloat(asks[i][1] / amax).toFixed(2);
                    }
                    bids.map((v, i) => {
                        if (bmax < parseFloat(v[1])) {
                            bmax = v[1];
                        }
                    });
                    for (var i = 0; i < bids.length; i++) {
                        bids[i][2] = parseFloat(bids[i][1] / bmax).toFixed(2);
                    }
                    _this.asks = asks;
                    _this.bids = bids;
                }
                if (data.type == 202 && data.data.currency_id == _this.currentCurrency['id']) {
                    //市场标记价格信息
                    _this.market = data.data.data;
                    if (timestamp == 0) {
                        timestamp = _this.market['T'];
                    }
                    if (timestamp != _this.market['T']) {
                        timestamp = _this.market['T'];
                    }
                    if (!timecaluc) {
                        this.calacTime();
                    }
                }
                if (data.type == 400) {
                    //开单消息通知，重新加载余额以及仓位信息
                    _this.getBalance();
                    _this.getPosition(true);
                    // _this.getStopPrice(true);
                }
            }catch (e){
                console.log("error:",e);
            }
        },
        //仓位的盈亏计算
        calacPosition(ticker) {
            try{
                var position = this.position.position;
                if (position.length <= 0) {
                    return false;
                }
                let profit = 0;
                for (var c in ticker) {
                    var _ticker = ticker[c];
                    //var index = position.findIndex(item => parseInt(item.currency_id) === parseInt(c));
                    for (var i = 0; i < position.length; i++) {
                        if (parseInt(position[i]['currency_id']) === parseInt(c)) {
                            var item = position[i]
                            var amount = parseFloat(item['amount']) - parseFloat(item['close']);
                            var o = parseFloat(item['price']);
                            var newPrice = parseFloat(_ticker['c']);
                            if (parseInt(item['direction']) == 1) {
                                var p = amount * (newPrice - o)
                            } else {
                                var p = amount * (o - newPrice)
                            }
                            item['p'] = p;
                            profit += p;
                            //rate
                            if (parseInt(item['direction']) == 1) {
                                var pr = item.amount * (newPrice - item.price) / item.margin * 100;
                            } else {
                                var pr = item.amount * (item.price - newPrice) / item.margin * 100;
                            }
                            item['rate'] = pr > 0 ? '+' + util.thousandSeparator(pr, 2) : util.thousandSeparator(pr)

                            if (parseInt(item['direction']) == 1) {
                                var p = util.thousandSeparator(item.amount * (newPrice - item.price), 4);
                            } else {
                                var p = util.thousandSeparator(item.amount * (item.price - newPrice), 4);
                            }
                            item['mr'] = util.thousandSeparator((parseFloat(item.margin) + parseFloat(p)) / parseFloat(item.margin) * 100, 2);
                            position[i] = item;
                        }
                    }
                }
                uni.$emit('profit', 1, profit);
                this.position.position = position;
            }catch (e){}
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
            uni.hideKeyboard();
            if (netInit === 0) {
                this.content = this.$t('common.net');
                this.alertShow = true;
                return false;
            }

            if (this.order_type === 0) {
                var margin = parseFloat(this.amountType === 0 ? this.amount / this.mutil * this.currentCurrency['new_price'] : this.inputAm).toFixed(2);
            } else {
                var margin = parseFloat(this.amountType === 0 ? this.amount / this.mutil * this.order_price : this.inputAm).toFixed(2);
            }

            //判断下单限制
            if(this.currentCurrency['min_amount'] && parseFloat(margin) < parseFloat(this.currentCurrency['min_amount'])){
                this.content = this.$t('contract.order_min_tip')+util.float(this.currentCurrency['min_amount'])+"USDT";
                this.alertShow = true;
                return false;
            }
            // const margin = this.order_type == 0 ?
            // 	util.str2number(util.thousandSeparator(this.amount / this.mutil * this.currentCurrency['new_price'], 4)) :
            // 	util.str2number(util.thousandSeparator(this.amount / this.mutil * this.order_price, 4))

            if (parseFloat(margin) > parseFloat(this.balance.legal_balance)) {
                this.content = this.$t('contruct.pl17');
                this.alertShow = true;
                return false;
            }
            if (this.amount == '' || this.amount <= 0) {
                this.content = this.$t('contruct.pl16');
                this.alertShow = true;
                return false;
            }
            // if (this.amount > this.getmaxPosition() - this.balance.position_balance) {
            // 	this.content = this.$t('contruct.pl18') + (util.thousandSeparator(this.getmaxPosition() - this.balance
            // 		.position_balance, 2)) + this.currentCurrency['symbol'];
            // 	this.alertShow = true;
            // 	return false;
            // }
            if (this.order_type >= 1 && (this.order_price == '' || parseFloat(this.order_price) <= 0)) {
                this.content = this.$t('contruct.pl19');
                this.alertShow = true;
                return false;
            }
            if (this.order_type == 2 && (this.wprice == '' || parseFloat(this.wprice) <= 0)) {
                this.content = this.$t('contruct.pl20');
                this.alertShow = true;
                return false;
            }

            let avaAmount;
            if(_direction === 1){
                avaAmount = this.getAvliAmount(1);
            }else{
                avaAmount = this.getAvliAmount(2);
            }
            if(this.amountType === 0 && this.amount > avaAmount){
                this.content = this.$t('contruct.pl17');
                this.alertShow = true;
                return false;
            }
            if(this.amountType === 1 && this.inputAm > avaAmount){
                this.content = this.$t('contruct.pl17');
                this.alertShow = true;
                return false;
            }

            let form = {
                cm_id: cm_id,
                currency_id: currency_id,
                direction: _direction,
                muilt: this.mutil,
                order_type: this.order_type + 1,
                // uamount: parseFloat(uamount),
                // amount: amount,
                margin_type: parseInt(this.margin_type)
            };
            if(this.amountType === 0){
                form['amount'] = util.str2number(this.amount);
            }else{
                form['uamount'] = this.inputAm;
            }
            if (this.order_type == 0) {
                form['price'] = util.str2number(this.currentCurrency['new_price']); //记录操作时提交的价格
            }
            if (this.order_type == 1) {
                form['price'] = util.str2number(this.order_price); //限价委托价格
            }
            if (this.order_type == 2) {
                form['price'] = util.str2number(this.order_price); //条件单的委托价格
                form['wprice'] = util.str2number(this.t_price); //条件单的触发价格
            }

            if (this.stopProfit) {
                form['stop_up'] = (this.price_up != '' && this.price_up > 0) ? this.price_up : 0;
                form['stop_down'] = (this.price_down != '' && this.price_down > 0) ? this.price_down : 0;
            }
            form['nowprice'] = util.str2number(this.currentCurrency['new_price'])
            this.$refs.loading.open();
            contractApi.submitOrder(form).then(res => {
                this.$refs.loading.close();
                if (res.code !== 200) {
                    this.content = res.message;
                    this.alertShow = true;
                    return false;
                }
                this.order_price = '';
                this.amount = '';
                this.irate = 0;
                this.inputAm = '';
                if(this.order_type !== 0){
                    this.getPosition();
                }
                // setTimeout(()=>{
				// 	this.getPosition();
				// 	this.getBalance();
				// },1000);
                //重新加载订单数据，余额数据等操作
            }).catch(e => {
                this.$refs.loading.close();
                this.content = this.$t('common.error');
                this.alertShow = true;
            })
        },
        getPosition(f=true) {
            contractApi.getPositionList(this.checked ? currency_id : 0).then(res => {
                if (res.code == 200) {
                    // var position = res.data.position;
                    // position.map((item) => {
                    //     item['p'] = 0;
                    //     return item;
                    // });
                    // res.data.position = position;
                    this.position = res.data;
                    this.getStopPrice(f);
                    this.getMuiltByPosition();
                } else {
                    this.position = {
                        position: [],
                        totalAmount: []
                    };
                }
            });
        },
        getStopPrice(f=true){
            if(!f){
                return;
            }
            if(!this.balance.legal_balance){
                this.getBalance();
            }
            //全仓合约单计算强平价格
            let longAmount = 0;
            let shortAmount = 0;
            let margin = 0;
            let position = this.position.position.filter(item=>parseInt(item.margin_type) === 1);
            position.map((item)=>{
                if(item.margin_type === 1){
                    let amount = parseFloat(item.amount) - parseFloat(item.close);
                    let uamount = parseFloat(item.price) * amount;
                    if(parseInt(item['direction']) === 1){
                        longAmount += uamount;
                    }else{
                        shortAmount += uamount
                    }
                    margin += uamount / parseInt(item['muilt']);
                }
                return item;
            });

            let direction = 0;
            let positionAmount = 0;
            if(longAmount > shortAmount){
                direction = 1;
                positionAmount = longAmount - shortAmount;
            }else{
                direction = 2;
                positionAmount = shortAmount - longAmount
            }
            let balance = parseFloat(this.balance.legal_balance) + margin;
            this.position.position = this.position.position.map((item)=>{
                if(f && parseInt(item.margin_type) === 1){
                    let p = balance / (positionAmount / parseFloat(item['price']));
                    let stopPrice = 0;
                    if(direction === 1){
                        stopPrice = parseFloat(item['price']) - p;
                    }else{
                        stopPrice = parseFloat(item['price']) + p;
                    }
                    if(stopPrice < 0){
                        stopPrice = 0;
                    }
                    item['stopPrice'] = stopPrice;
                }
                return item;
            });
        },
        getMuiltByPosition() {
            // if (this.position.position.length > 0) {
            //     this.tmutil = this.position.position[0]['muilt'];
            //     uni.setStorageSync('mutil', this.tmutil);
            //     this.mutil = this.tmutil;
            //     this.tmargin = this.position.position[0]['margin_type'];
            //     this.margin_type = this.tmargin;
            //     uni.setStorageSync('margin_type', this.tmargin);
            // }
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
            subset = setInterval(() => {
                this.subscribeDepth();
            }, 2000);
        },
        async getCurrentCurrency() {
            let current = uni.getStorageSync('current-contract');
            let currency = false;
            if (typeof current == 'undefined' || !current) {
                currency = await this.getContracuMatches();
                uni.setStorageSync('contract-matches', currency);
                current = currency[0]['currency'][0];
            }
            if(!currency){
                currency = await this.getContracuMatches();
                currency[0]['currency'].map((item)=>{
                    if(parseInt(item['id']) === parseInt(current['id'])){
                        current = item;
                    }
                });
            }
            matches = currency[0]['currency'];
            this.currentCurrency = current;
            this.currency = currency;
            cm_id = currency[0]['id'];
            currency_id = this.currentCurrency['id'];
            this.subscribeDepth();
            uni.setStorageSync('current-contract', this.currentCurrency);
            this.getBalance();
            this.getPosition(false);
            this.like = this.favStatus(2,this.currentCurrency['id']);
        },
        setCurrentCurrency(cid) {
            const currency = matches.filter(item => item.id == cid);
            this.currentCurrency = currency[0];
            currency_id = cid;
            this.subscribeDepth();
            uni.setStorageSync('current-contract', currency[0]);
            this.getBalance();
            this.getPosition(false);
            this.show = false;
            uni.showTabBar();
            this.inputAm = '';
            this.irate = 0;
            this.rate = 0;
            this.amount = '';

            this.klineShow && this.$refs.webview.evalJs("reload(" + cid + "," + this.currentCurrency['decimals'] + ")");
        },
        getMlistCurrency() {
            //获取自选合约数据
            mlist = uni.getStorageSync('select-contract');
            this.mlist = mlist;
        },
        async getContracuMatches() {
            //获取合约数据交易对
            const currency = await currencyApi.contractCurrencyList();
            uni.setStorageSync('contract-matches', currency.data);
            return currency.data;
        },
        allPingcang() {
            action = -11;
            this.content = this.$t('contruct.pl8');
            this.alertShow = true;
        },
        changeMutil(e) {
            this.tmutil = e.detail.value;
        },
        getDirectionAmount(d) {
            var list = this.position.position.filter(item => item.direction === d);
            var amount = 0
            if (list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    amount += parseFloat(list[i]['amount']) - parseFloat(list[i]['close'])
                }
            }
            return amount;
        },
        getAvliAmount(d = 1) {
            if (typeof this.balance.legal_balance == 'undefined' || this.balance.legal_balance <= 0) {
                return '--';
            }
            //1 多 2空
            //开多减去多担仓位的数量
            //开空减去孔丹仓位的数量

            let margin = 0;
            if(this.margin_type !== 2){
                if(this.margin_type !== 2){
                    this.position.position.map((item)=>{
                        if(item.margin_type === 1){
                            let amount = parseFloat(item.amount) - parseFloat(item.close);
                            let uamount = parseFloat(item.price) * amount;
                            margin += uamount / parseInt(item['muilt']);
                        }
                    });
                }
            }
            let balance = parseFloat(this.balance.legal_balance) + margin;

            var pamount = this.getDirectionAmount(d);

            if (this.order_type === 0) {
                var aamount = balance / this.ticker['c'] * this.mutil;
            } else {
                var aamount = balance / (this.order_price != '' ? util.str2number(this.order_price) : this.ticker['c']) * this.mutil;
            }
            aamount = parseFloat(aamount * 0.9).toFixed(this.currentCurrency['decimals']);
            if (this.amountType === 0) {
                return aamount - pamount > 0 ? parseFloat(aamount - pamount).toFixed(this.currentCurrency['decimals']) : 0;
            } else {
                // var uamount = aamount - pamount > 0 ?
                //     parseFloat((aamount - pamount) * (this.order_type === 0 ? this.ticker['c'] : (this.order_price != '' ? util.str2number(this.order_price) : this.ticker['c']))).toFixed(this.currentCurrency['decimals']) : 0;
                // // if(uamount > 500000){
                // // 	return '500000.00';
                // // }
                // return uamount;
                let amount = balance *  (1 - (parseFloat(this.currentCurrency['fee_open']) + parseFloat(this.currentCurrency['fee_close'])));
                return amount > this.currentCurrency['max_amount'] ? this.currentCurrency['max_amount'] : amount;
            }
        },
        /**
         * 获取当前币对的同方向仓位数量
         * @param direction
         * @returns {number}
         */
        getCurrencyAmount(){
            let amount = 0;
            this.position.position.map((item)=>{
                if(item['currency_id'] === currency_id && item['cm_id'] === cm_id){
                    amount += parseFloat(item['amount']) - parseFloat(item['close']);
                }
            });
            return amount;
        },
        inputAmount(e) {
            this.amount = util.str2number(e.detail.value) / this.ticker['c'];
            this.irate = 0;
        },
        sliderChange(e) {
            this.rateVal = e.detail.value;
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
            if (this.direction === 1) {
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
            this.order_type = e;
            this.order_price = util.thousandSeparator(this.ticker['c'], this.currentCurrency['decimals']);
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
                var amount = parseFloat(this.position.position[index]['amount']) - parseFloat(this.position.position[
                    index]['close']);
            } else {
                var amount = a;
            }
            var o = parseFloat(this.position.position[index]['price']);
            var d = parseInt(this.position.position[index]['direction']);
            if (d == 1) {
                var p = util.thousandSeparator(amount * (newPrice - o), 4);
            } else {
                var p = util.thousandSeparator(amount * (o - newPrice), 4);
            }
            return p > 0 ? '+' + p : p;
        },
        getProfitRate(cid, d, u, o, m) {
			u = util.str2number(u);
            var index = this.currency[0]['currency'].findIndex(item => item.id == cid);
            var newPrice = parseFloat(this.currency[0]['currency'][index]['new_price']);
            if (d == 1) {
                var p = u * (newPrice - o) / m * 100;

            } else {
                var p = u * (o - newPrice) / m * 100;
            }
			console.log(p);
            return p > 0 ? '+' + util.thousandSeparator(p, 2) : util.thousandSeparator(p);
        },
        getMarginRate(cid, d, u, o, m) {
            //需要做保证金类型判断，全仓使用余额做加法
            var index = this.currency[0]['currency'].findIndex(item => item.id == cid);
            var newPrice = parseFloat(this.currency[0]['currency'][index]['new_price']);
            if (d == 1) {
                var p = util.thousandSeparator(u * (newPrice - o), 4);
            } else {
                var p = util.thousandSeparator(u * (o - newPrice), 4);
            }
            return util.thousandSeparator((parseFloat(m) + parseFloat(p)) / parseFloat(m) * 100, 2);
        },
        getNewPrice(cid) {
            var index = this.currency[0]['currency'].findIndex(item => item.id == cid);
            return this.currency[0]['currency'][index]['new_price'];
        },
        setMutil() {
            uni.setStorageSync('mutil', this.tmutil);
            this.mutil = this.tmutil;
            this.closePopup();
        },
        setMargin() {
            this.margin_type = this.tmargin;
            uni.setStorageSync('margin_type', this.tmargin);
            this.closePopup();
        },
        inputPprice(e) {
            this.pprice = e.detail.value;
        },
        inputPamount(e) {
            this.pamount = e.detail.value;
        },
        sliderPamount(e) {
            var sum = parseFloat(this.position.position[this.pindex]['amount']) - parseFloat(this.position.position[this
                .pindex]['close']);
            
            this.pamount = util.str2number(util.float(parseFloat(e.detail.value / 100 * sum).toFixed(8)));
        },
        async stopLight(oid) {
            //闪电平仓
            this.pamount = util.str2number(this.getPositionCurrencyAmount(this.position.position[this.pindex]['currency_id'], this.position
                .position[this.pindex]['direction']));
            this.ptype = false;
            await this.stopPosition(oid,true);
            this.position.position = this.position.position.filter((item)=>{
                return parseInt(item['id']) !== parseInt(oid);
            });
            this.getStopPrice(true);
        },
        async stopPosition(orderId = 0,all=false) {
            if (this.pamount == '' || parseFloat(this.pamount) <= 0) {
                return false;
            }
            if (this.ptype != false && (this.pprice == '' || parseFloat(this.pprice) <= 0)) {
                return false;
            }

            var form = {
                id: orderId,
                pamount: util.str2number(this.pamount),
                ptype: this.ptype,
                price: util.str2number(this.ticker['c']),
                wprice: typeof this.wprice != 'undefined' ? this.wprice : 0
            };
            if (this.ptype == false) {
                form['ptype'] = 1;
            }
            if (this.ptype == true) {
                form['ptype'] = 2;
                form['price'] = this.pprice;
            }
            this.$refs.loading.open();
            let res = await contractApi.closeOrder(form);
            try {
                this.closePopup();
                this.$refs.loading.close();
                if (res.code !== 200) {
                    this.content = this.$t('common.error');
                    this.alertShow = true;
                }
            } catch (e) {
            }
            this.ptype = false;
            this.pamount = '';
            this.pindex = 0;
            if((this.position.position && this.position.position.length === 0) || this.position.position){
                uni.$emit('no_position');
            }else{
                if(!all){
                    this.position.position = this.position.position.map((item)=>{
                        if(item['id'] === orderId){
                            item['close'] = parseFloat(item['close']) + parseFloat(this.pamount)
                        }
                        return item;
                    });
                    this.getStopPrice(true);
                }
            }
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
            var position = this.position.position.filter(item => item.currency_id == this.currentCurrency['id'] && item
                .direction == direction);
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
            var pamount = parseFloat(this.getPositionAmount(position[0]['currency_id'], direction) * this.rate / 100)
                .toFixed(8);
            var form = {
                id: position[0]['id'],
                pamount: util.str2number(pamount),
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
                this.$refs.loading.close();
                if (res.code != 200) {
                    this.content = this.$t('common.error');
                    this.$refs.alert.open();
                }
                this.getPosition(false);
                this.rate = 0;
                //操作成功会有socket 消息通知数据更新，这个地方无需处理
            }).catch((e) => {
                this.$refs.loading.close();
                this.content = this.$t('common.error');
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
                this.alertShow = false;
                this.$refs.loading.close();
                if (res.code !== 200) {
                    this.content = this.$t('common.error');
                    this.alertShow = true;
                }
                this.position.position = [];
                this.rate = 0;
                uni.$emit('no_position');
                //操作成功会有socket 消息通知数据更新，这个地方无需处理
            }).catch((e) => {
                this.alertShow = false;
                this.$refs.loading.close();
                this.content = this.$t('common.error');
                this.alertShow = true;
            })
        },
        cancelOperation(id) {
            opId = id;
            action = -1;
            // this.canceOrder = true;
            this.hideTabBar();
            this.content = this.$t('list.inquire_con');
            this.alertShow = true;
        },
        alertConfirm(e) {
            this.alertShow = false;
            if (e.index === 1) {
                if (action === -1) {
                    action = 0
                    this.$refs.loading.open();
                    contractApi.cancelOpeartion(opId).then(res => {
                        this.$refs.loading.close();
                        if (res.code != 200) {
                            this.content = res.message;
                            this.alertShow = true;
                            return true;
                        }
                        this.getPosition(false);
                        this.getBalance();
                    }).catch((e) => {
                        this.$refs.loading.close();
                    })
                }
                if (action === -11) {
                    this.stopAll();
                }
            }
        },
        getPositionCurrencyAmount(cid, direction) {
            if (this.position.position.length == 0) {
                return '0.00';
            }
            const position = this.position.position.filter(item => item.currency_id == cid && item.direction ==
                direction);
            return util.float(parseFloat(parseFloat(position[0]['amount']) - parseFloat(position[0]['close']))
                .toFixed(8));
        },
        getPositionAmount(cid, direction) {
            //获取币种的持仓可用数量
            if (this.position.position.length == 0) {
                return '0.00';
            }
            const position = this.position.position.filter(item => item.currency_id == cid && item.direction ==
                direction);
            if (position.length > 0) {
                if (this.amountType == 0) {
                    return util.float(parseFloat(parseFloat(position[0]['amount']) - parseFloat(position[0]['close']))
                        .toFixed(8));
                } else {
                    return parseFloat((parseFloat(position[0]['amount']) - parseFloat(position[0]['close'])) * parseFloat(position[0]['price']))
                        .toFixed(2);

                }
            }
            return '0.00';
        },

        //调用此方法显示抽屉
        showDrawer() {
            this.show = true
            this.hideTabBar();
        },
        closeDrawer() {
            this.show = false
            this.showTabbar();
        },
        showPopup(type) {
            this.fullPopup = true;
            this.hideTabBar();
            this.popupType = type;
        },
        closePopup() {
            this.fullPopup = false;
            this.marginTip = false;
            this.plpopup = false;
            this.showTabbar();
            // var time = setTimeout(() => {
            // 	this.showTabbar();
            // 	clearTimeout(time);
            // }, 200)
        },
        optionalChange() {
            if(this.like){
                this.like = false;
                this.remFav(2,this.currentCurrency['id']);
                this.showToast(this.$t('trade.ts2'), '300');
            }else{
                this.like = true;
                this.addFav(2,this.currentCurrency);
                this.showToast(this.$t('trade.ts1'), '300');
            }
        },
        showToast(type, duration) {
            let options = {}
            //提示信息
            options.text = type;
            options.duration = duration;
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
        decimalSubmenu() {
            this.$refs.decimal.show()
        },
        rangeItemClick(e) {
            this.range = e.text
            this.rangeCheked = e.value;
            this.order_type = e.value;
            this.amount = '';
            this.order_price = util.thousandSeparator(this.ticker['c'], this.currentCurrency['decimals']);
        },
        decimalChange(e) {
            this.decimalVal = e.text
        },
        moreShow() {
            this.$refs.moreDrop.show()
        },
        moreItemChange(e) {
            if (e.value === 3) {
                return e.route(this.currentCurrency['symbol']);
            } else {
                return e.route();
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
        changeLever(e) {
            this.leverNum = e.detail.value;
            console.log(e.detail.value)
        },
        closeTypeChange() {
            this.closeTypeVal = !this.closeTypeVal;
        },
        showDialog() {
            this.canceOrder = true;
            this.hideTabBar();
        },
        canceConfirm(e) {
            if (e.index == 0) {
                this.onClose();
            } else {
                console.log("点击确定")
                this.onClose();
            }
        },
        onClose() {
            this.canceOrder = false;
            this.showTabbar();
        },
        $t(key) {
            return i18n.t(key);
        },
        hideKeybord() {
            uni.hideKeyboard();
        },
        onpullingdown(e) {
            if (this.refreshing) return;
            if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
                this.refreshText = this.$t('common.refer');
            } else {
                this.refreshText = this.$t('common.refer');
            }
        },
        onrefresh(e) {
            if (this.refreshing) return;
            this.position.position = [];
            this.refreshing = true;
            this.refText = false;
            setTimeout(() => {
                this.refreshing = false;
                this.refText = true;
                this.refreshText = this.$t('common.refer');
                this.getPosition(false);
                this.getBalance();
            }, 1500);
            uni.$emit('reconnect');
        },
        toKline() {
            uni.navigateTo({
                url: "/pages/trade/kline?type=0&id=" + this.currentCurrency['id'] + "&cid=" + cm_id
            })
        },
        showPoster(item, d, p, s) {
            this.painterShow = !this.painterShow;
            this.hideTabBar();
            var _this = this;
            this.$refs.showPoster.open();

            this.$refs.loading.open();
            setTimeout(() => {
                const rate = this.getProfitRate(item.currency_id, item.direction, item.amount, item.price, item.margin)
                var poster = {
                    css: {
                        width: "750rpx",
                        paddingBottom: "40rpx",
                        background: this.userTheme === 'light' ? '#ffffff' : '#17181e'
                    },
                    views: [{
                        css: {
                            marginLeft: "30rpx",
                            marginTop: "30rpx",
                            background: this.userTheme === 'light' ? '#ffffff' : '#17181e',
                            borderRadius: "10rpx",
                            width: "700rpx",
                            height: "1200rpx",
                            overflow: "hidden"
                        },
                        views: [{
                            src: "/static/poster.webp",
                            type: "image",
                            css: {
                                objectFit: "cover",
                                objectPosition: "50% 50%",
                                width: "700rpx",
                                height: "606rpx",
                            },
                        }, {
                            css: {
                                marginTop: "32rpx",
                                textAlign: "center",
                            },
                            views: [{
                                text: '“' + this.$t('contract.pt1') + '”',
                                type: "text",
                                css: {
                                    color: this.userTheme === 'light' ? '#23262e' : '#ffffff',
                                    fontWeight: "bold",
                                    fontSize: "34rpx",
                                    width: "600rpx",
                                    verticalAlign: "bottom",
                                    textAlign: "center",
                                },
                            }],
                            type: "view"
                        }, {
                            css: {
                                width: "690rpx",
                                marginTop: "32rpx",
                                fontSize: "28rpx",
                                color: "#8c5400",
                                textAlign: "center",
                                paddingRight: "100rpx",
                                boxSizing: "border-box",
                            },
                            views: [{
                                text: this.$t('follow.rate_return'),
                                type: "text",
                                css: {
                                    color: this.userTheme === 'light' ? '#23262e' : '#ffffff',
                                    marginRight: "20rpx",
                                    marginTop: "5rpx",
                                    fontWeight: "600",
                                },
                            }, {
                                text: d === 1 ? this.$t('contract.pt5') : this.$t('contract.pt6'),
                                type: "text",
                                css: {
                                    marginTop: "10rpx",
                                    width: "80rpx",
                                    height: "38rpx",
                                    fontSize: "24rpx",
                                    background: "#35ad7a",
                                    borderRadius: "4rpx",
                                    paddingRight: "10rpx",
                                    paddingLeft: "10rpx",
                                    paddingBottom: "10rpx",
                                    boxSizing: "border-box",
                                    color: "#ffffff"
                                },
                            }],
                            type: "view"
                        }, {
                            css: {
                                width: "690rpx",
                                marginTop: "10rpx",
                                textAlign: "center",
                                paddingRight: "10rpx",
                                boxSizing: "border-box",
                                fontWeight: "600",
                            },
                            views: [{
                                text: rate + "%",
                                type: "text",
                                css: {
                                    color: "#ff5c51",
                                    fontSize: "50rpx",
                                    marginLeft: "40rpx"
                                },
                            },],
                            type: "view"
                        }, {
                            css: {
                                marginTop: "30rpx",
                                textAlign: "center"
                            },
                            views: [{
                                text: this.$t('contract.pt2'),
                                type: "text",
                                css: {
                                    width: "230rpx",
                                    color: "#666666",
                                    fontSize: "26rpx"
                                },
                            }, {
                                text: this.$t('entrust.t10'),
                                type: "text",
                                css: {
                                    width: "230rpx",
                                    color: "#666666",
                                    fontSize: "26rpx"
                                },
                            }, {
                                text: this.$t('entrust.t9'),
                                type: "text",
                                css: {
                                    width: "230rpx",
                                    color: "#666666",
                                    fontSize: "26rpx"
                                },
                            },],
                            type: "view"
                        }, {
                            css: {
                                marginTop: "10rpx",
                                textAlign: "center",
                                fontWeight: "600",
                                fontSize: "26rpx"
                            },
                            views: [{
                                text: (item.symbol + 'USDT'),
                                type: "text",
                                css: {
                                    width: "230rpx",
                                    color: this.userTheme === 'light' ? '#23262e' : '#ffffff',
                                },
                            }, {
                                text: util.thousandSeparator(this.ticker['c'], this.currentCurrency['decimals']),
                                type: "text",
                                css: {
                                    width: "230rpx",
                                    color: this.userTheme === 'light' ? '#23262e' : '#ffffff',
                                },
                            }, {
                                text: util.thousandSeparator(item.price, this.currentCurrency['decimals']),
                                type: "text",
                                css: {
                                    width: "230rpx",
                                    color: this.userTheme === 'light' ? '#23262e' : '#ffffff',
                                },
                            },],
                            type: "view"
                        }, {
                            css: {
                                width: "690rpx",
                                marginTop: "50rpx"
                            },
                            views: [{
                                src: "/static/img/cblogo.png",
                                type: "image",
                                css: {
                                    objectFit: "cover",
                                    objectPosition: "50% 50%",
                                    width: "100rpx",
                                    height: "100rpx",
                                    borderRadius: "8rpx",
                                    marginLeft: "30rpx",
                                    position: 'relative',
                                },
                            }, {
                                text: "ABT",
                                type: "text",
                                css: {
                                    color: this.userTheme === 'light' ? '#23262e' : '#ffffff',
                                    fontWeight: "600",
                                    fontSize: "28rpx",
                                    position: 'absolute',
                                    left: "150rpx"
                                },
                            }, {
                                text: this.$t('contract.pt7'),
                                type: "text",
                                css: {
                                    color: "#666666",
                                    position: 'absolute',
                                    left: "150rpx",
                                    top: "50rpx"
                                },
                            }, {
                                text: config['DOMAIN'] + '/#/pages/login/login?code=' + (this.userinfo['invite_code'] ? this.userinfo['invite_code'] : ''),
                                type: "qrcode",
                                css: {
                                    objectFit: "cover",
                                    objectPosition: "50% 50%",
                                    width: "140rpx",
                                    height: "140rpx",
                                    borderRadius: "8rpx",
                                    position: 'absolute',
                                    right: "30rpx",
                                    bottom: "-20rpx"
                                },
                            },],
                            type: "view"
                        }],
                        type: "view"
                    }]
                };
                this.$refs.dpainter.render(poster);
            }, 200);

        },
        renderSuccess(e) {
            this.path = e;
            this.$refs.loading.close();
        },
        sharePoster() {
            const bitmap = new plus.nativeObj.Bitmap("test");
            var _this = this;
            bitmap.loadBase64Data(this.path, function () {
                const url = "/ABT/" + new Date().getTime() + ".png";  // url为时间戳命名方式
                bitmap.save(url, {
                    overwrite: true,  // 是否覆盖
                    // quality: 'quality'  // 图片清晰度
                }, (i) => {
                    uni.shareWithSystem({
                        type: "image",
                        imageUrl: url
                    });
                }, (e) => {
                    uni.showToast({
                        title: 'save fail',
                        icon: 'none'
                    })
                    bitmap.clear()
                });
            }, (e) => {
                uni.showToast({
                    title: 'save fail',
                    icon: 'none'
                })
                bitmap.clear()
            });

        },
        postEvent(e) {
            if (e.show === false) {
                this.path = '';
                uni.showTabBar();
            }
        },
        onPageFinish() {
            this.$refs.webview.evalJs("reload(" + this.currentCurrency['id'] + "," + this.currentCurrency['decimals'] + ")");
        },
        showHidenProfit(e) {
            this.stopProfit = e.checked;
        },
        showMarginTip() {
            this.marginTip = true;
            this.hideTabBar();
        },
        plTip() {
            this.plpopup = true;
            this.hideTabBar();
        },
        calacStopPrice(pindex) {
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
        changeMargin() {
            if (this.numVal == '' || parseFloat(this.numVal) <= 0) {
                return false;
            }
            if (this.mtabIndex === 0 && parseFloat(this.numVal) > parseFloat(this.balance.legal_balance) * 0.95) {
                return false;
            }
            if (this.mtabIndex === 1 && parseFloat(this.numVal) > parseFloat(this.position.position[this.pindex]['margin']) * 0.9) {
                return false;
            }

            const form = {
                cid: this.position.position[this.pindex]['id'],
                amount: parseFloat(this.numVal),
                type: this.mtabIndex
            };
            console.log(form);
            this.$refs.loading.open();

            contractApi.changeMargin(form).then(res => {
                this.$refs.loading.close();
                this.marginTip = false;
                uni.showTabBar();
                if (res.code === 200) {
                    uni.showToast({
                        icon: "success",
                        text: ""
                    });
                    this.getPosition(false);
                    this.getBalance();
                }
            }).catch(e => {
                this.$refs.loading.close();
            });
        },
        favStatus(cm_id,cid){
            let list ;
            if(cm_id === 1){
                list = uni.getStorageSync('select-trade');
            }
            if(cm_id === 2){
                list = uni.getStorageSync('select-contract');
            }
            if(typeof list !='object' || list === ''){
                return false;
            }
            return list.filter(item => parseInt(item.id) === parseInt(cid)).length > 0;
        },
        addFav(cm_id,coin){
            console.log("add fav run");
            let list = [];
            if(cm_id === 1){
                list = uni.getStorageSync('select-trade');
            }
            if(cm_id === 2){
                list = uni.getStorageSync('select-contract');
            }
            if(list){
                list = list.filter(item => item.id !== coin.id);
                list.push(coin);
            }else{
                list = [coin];
            }
            if(cm_id === 1){
                uni.setStorageSync('select-trade', list);
            }
            if(cm_id === 2){
                uni.setStorageSync('select-contract', list);
            }
            uni.setStorageSync('load', 1);
            uni.$emit('addSelect');
        },
        remFav(cm_id,cid){
            console.log("rem fav run");
            let list;
            if(cm_id === 1){
                list = uni.getStorageSync('select-trade');
            }
            if(cm_id === 2){
                list = uni.getStorageSync('select-contract');
            }
            if(list){
                list = list.filter(item => parseInt(item.id) !== parseInt(cid));
                let key;
                if(cm_id === 1){
                    key = 'select-trade';
                }
                if(cm_id === 2){
                    key = 'select-contract';
                }
                uni.setStorageSync(key, list);
                if(list.length <= 0){
                    uni.removeStorageSync(key);
                }
                console.log(list);
                uni.setStorageSync('load', 1);
                uni.$emit('addSelect');
            }
        }
    }
}