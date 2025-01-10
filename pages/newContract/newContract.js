import {
    mapGetters,
    mapState,
    mapMutations
} from 'vuex';

import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue";
import mroute from '@/common/route';
import util from '@/common/util.js';
import config from '@/common/api/config.js';
import emptyView from "@/components/emptyView/emptyView.vue";

import fuiLoadAni from "@/components/firstui/fui-load-ani/fui-load-ani.vue";

import listComponents from "@/components/listComponents/listComponents.vue";
import profitLossPopup from "@/components/profit-loss-popup/profit-loss-popup.vue";
import closePositionPopup from "@/components/close-position-popup/close-position-popup.vue";
import contractSharePopup from "@/components/contract-share-popup/contract-share-popup.vue";
import backHandPopup from "@/components/bankhand/bankhand.vue"

const device = uni.getSystemInfoSync();

import currencyApi from '@/common/api/currency.js';
import contractApi from '@/common/api/contract.js';
import fwebsocket from "@/uni_modules/veo-uniwebsocket/js_sdk/Websocket.js";

import {
    initVueI18n
} from '@dcloudio/uni-i18n'
import en from '@/local/en.json';
import zh_Hant from "@/local/zh-Hant.json"
import ja from '@/local/ja.json'
import ko from '@/local/ko.json'
import message from "../index/message/message.vue";

const messages = {
    en,
    'zh-Hant': zh_Hant,
    'ja': ja,
    'ko': ko
}
const localLang = uni.getStorageSync('lang');
const i18n = initVueI18n(typeof localLang != 'undefined' && localLang !== '' ? localLang : 'en', messages);

let cm_id; //当前交易对
let currency_id; //当前币种id
let currency_type;//记录当前交易对的交易数据类型
let matches; //原始合约币种列表
let mlist; //自选原始数据
let subset = false;
let timestamp = 0;//资金费率结算时间
let timecaluc = false;

let lastPrice = 0;

let base = 0.0000001;
let sharePath;

let lastOrder = 0;
let APP_SHOW = true;
let POSITION_PROFIT = 0;

export default {
    components: {
        fuiLoadAni,
        fuiTag,
        emptyView,
        listComponents,
        profitLossPopup,
        closePositionPopup,
        contractSharePopup,
        backHandPopup
    },
    data() {
        return {
            plshow: false,
            cpshow: false,
            shareShow: false,
            backhandShow: false,

            lang: localLang,
            device: device,
            mroute: mroute,
            util: util,
            statusBarHeight: "", //状态栏
            navContentHeight: 92,
            navScrollTab: [this.$t('newcontract.t72')], //币本位待开发
            scrollTabIndex: 0,
            scrollTop: 0,
            buttonArray: [this.$t('contruct.open_position'), this.$t('contruct.close_position')],
            buttonActive: 0,
            priceFocus: false, //价格输入框聚焦
            numberFocus: false, //数量输入框聚焦
            numberModel: "",
            rateValue: 0,
            checked: false, //止盈止损选中
            inputFocus: ['', '', '', ''],
            inputVal: ['', '', '', ''],
            listTabs: [{
                id: 0,
                text: this.$t('newcontract.t10'),
                num: 0
            }, {
                id: 1,
                text: this.$t('newcontract.t73'),
                num: 0
            }, {
                id: 2,
                text: this.$t('tab.assets'),
                num: 0
            }],
            swiperTabActive: 0,
            swiperHeight: "", //swiper列表高度
            positionScrollHeight: "320",
            drawerVisible: false, //侧边弹窗
            drawerTabs: [this.$t('index.tab_t1'), this.$t('newcontract.t72')],
            drawerTabIndex: 0,
            dotWidth: 80,
            drawerSwiperHeight: "",
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
                }
            ],
            marginModel: false, //保证金模式弹窗
            marginModelOption: [this.$t('newcontract.t91'), this.$t('contruct.wbw'),],
            modelActive: 0,
            leverVisible: false, //调整杠杆弹窗
            leverValue: 50,
            orderModeVisible: false, //下单模式介绍弹窗
            orderMode: [
                {
                    text: this.$t('trade.lm_od'),
                    checked: false,
                    index: 0,
                    img_zh: '/static/img/limit-price-zh.webp',
                    img_en: '/static/img/limit-price-zh.webp'
                },
                {
                    text: this.$t('cor.t21'),
                    checked: true,
                    index: 1,
                    img_zh: '/static/img/market-price-zh.webp',
                    img_en: '/static/img/market-price-en.webp'
                },
                {
                    text: this.$t('newcontract.t75'),
                    checked: false,
                    index: 2,
                    img_zh: '/static/img/wprice-en.webp',
                    img_en: '/static/img/wprice-en.webp'
                }
            ],
            orderModeVal: this.$t('trade.lm_od'),
            orderModeIndex: 1,
            modeTabIndex: 0, //弹出层选项卡
            advancedVisible: false, //止盈止损弹窗
            advancedSwiperHeight: "",
            advancedTabs: [this.$t('newcontract.t76'), this.$t('contruct.tp_sl'), this.$t('newcontract.t77')],
            advancedTabIndex: 0,
            stopProfitVal: 0, //止盈滑块
            stopLossVal: 0, //止损滑块
            closePositionVisible: false, //平仓弹窗
            closePositionRate: 0, //平仓滑块
            backhand: false, //反手说明弹窗
            prompt: false, //反手说明(不再提示)
            closeAllPositions: false, //全部平仓弹窗
            contractUnit: false, //合约单位设置弹窗
            radioList: [{
                val: 0,
                type: "",
                title: this.$t('financing.t86'),
                desc: this.$t('financing.t87'),
            }, {
                val: 1,
                type: "USDT",
                title: this.$t('newcontract.t79'),
                desc: this.$t('newcontract.t80'),
            }],
            contractunitChecked: 0,
            contractunitVal: {},
            entrustTabs: [{text: this.$t('newcontract.t81'), num: 0}, {text: this.$t('entrust.t1'), num: 0}], //当前委托(选项卡)
            entrustTabIndex: 0,
            explainVisible: false, //解释说明弹出层
            explainType: 0,
            moreVisible: false,//更多
            moreMenu: [{
                iconName: "hz",
                text: this.$t('quickly.tt7'),
                route: mroute.exchange
            }, {
                iconName: "lcjl",
                text: this.$t('wallet.capital_flow'),
                route: mroute.newOrders
            }, {
                iconName: "hyxx",
                text: this.$t('contruct.con_info'),
                route: mroute.contractInfo
            },
                // {
                //              iconName: "jsq",
                //              text: this.$t('contruct.calculator'),
                //              route: mroute.calculator
                //          },
            ],
            modifyOrderVisible: false,
            pointVisible: false, //委托展示深度
            pointVal: '0.00001',
            pointList: ['0.00001', '0.0001', '0.001', '0.01'],
            pointActive: 0,
            shareVisible: false, //海报弹窗
            priceType: [this.$t('newcontract.t82'), this.$t('newcontract.t83')],
            priceIndex: 0,
            alertShow: false,
            content: "",
            buttons: [{
                text: this.$t('取消'),
                color: "#85898e"
            }, {
                text: this.$t('确定'),
                color: "#3070ec"
            }],
            show_cm_id: 0,
            currentCurrency: {},
            drawList: [],
            mlist: [],
            time: "--",
            asks: [],
            bids: [],
            market: {},
            pindex: false,
            current: false,
            closeAllLimit: false,
            closeLimitType: false,
            closePlanId: false,
            planId: false,

            modifyPL: false,
            searchVal: "",

            amountType: 0,
            order_price: "",//开仓价格
            order_amount: "",//开仓数量
            order_rate: 0,//滑动百分比
            order_wprice: "",//委托执行价格
            wtype: false, //执行价格方式
            winPrice: "", //止盈价格
            losePrice: "",//止损价格

            //个人数据
            balance: false,
            position: false,

            //平仓
            pamount: '',
            pprice: "",

            //止盈止损
            wwprice: '',//止盈触发
            wpprice: '',//止盈执行价格,
            wamount: '',//止盈数量

            lwprice: "",//止损触发价格
            lpprice: "",//止损执行价格,
            lamount: "",//止损数量

            refresherText: this.$t('common.refer'),
            bodyScrollHeight: "",
            boardHeight: "",

            inAssets: false,
            navHideType: false,
            shareWarpHeight: "",

            refreshing: false,
            refText: true,
            refreshText: this.$t('common.refer'),

            ticker: {},
            pcurrency: {}
        }
    },
    computed: {
        ...mapGetters(['userTheme', 'isLogin', 'userNickname', 'userAvatar', 'userAccount']),
        ...mapState(['userinfo'])
    },
    onReady() {
        this.statusBarHeight = this.device.statusBarHeight;
        this.bodyScrollHeight = this.device.windowHeight - this.device.statusBarHeight - 52;
        this.advancedSwiperHeight = this.device.windowHeight - 140;

        this.getCurrentCurrency();
        this.setTabText();

        let _this = this;
        uni.$on('contract', (message) => {
            _this.onContractMessageHandler(message);
        });

        uni.$on('switchLan', () => {
            var lang = uni.getStorageSync('lang');
            if (typeof lang != 'undefined' && lang != '') {
                i18n.setLocale(lang);
                this.switchLanguage();
            }
        });

        this.$nextTick(() => {
            this.getMarginModel();
            this.getLever();
            this.getAmountType();
            this.getPosition();
            this.getBalance();
        });

        uni.$on('profit', (id, amount) => {
            POSITION_PROFIT = amount;
        });

        uni.$on('no_position', () => {
            this.getBalance();
        });

        uni.$on('reconnected-c', () => {
            console.log("reconnected-c");
            _this.subscribeDepth();
        });

        if (!this.isLogin) {
            this.setOrderHeight([]);
        }
    },
    onShow() {
        this.getChoiceCurrency();
    },
    onTabItemTap(e) {
        console.log("contract page show");
        APP_SHOW = true;
        if (this.isLogin && this.swiperTabActive === 0) {
            this.getBalance();
        }
        // if(this.position && this.position.position) {
        //     this.setOrderHeight(this.position.position);
        // }else {
        //     this.swiperHeight = 650;
        // }
        let mlist = uni.getStorageSync('select-contract');
        if (typeof mlist !== 'undefined' && mlist.length > 0) {
            this.mlist = mlist;
        }
    },
    onHide() {
        APP_SHOW = false;
    },
    created() {
        let _this = this;
        setInterval(() => {
            if (getApp().globalData.socket.getStatus() === 0) {
                _this.subscribeDepth();
            }
        }, 500);

        // setInterval(() => {
        //     if (getApp().csocket.getStatus() === 0) {
        //         this.subscribeDepth();
        //         uni.$on('contract', (data) => {
        //             this.onContractMessageHandler(data);
        //         });
        //     }
        // }, 1000)
    },
    watch: {
        backhandShow(v) {
            if (!v) {
                this.showTabbar();
            } else {
                this.hideTabBar();
            }
        },
        plshow(v) {
            if (!v) {
                this.showTabbar();
            } else {
                this.hideTabBar();
            }
        },
        cpshow(v) {
            if (!v) {
                this.showTabbar();
            } else {
                this.hideTabBar();
            }
        },
        closePositionVisible(v) {
            if (!v) {
                setTimeout(() => {
                    this.hiddenKeybord();
                }, 1000)
            }
            this.closePositionRate = 0;
            this.pamount = '';
        },
        navHideType(v) {
            if (v) {
                this.navContentHeight = 54;
            } else {
                this.navContentHeight = 92;
            }
        },
        balance(v) {
            if (v) {
                this.inAssets = false;
            } else {
                this.inAssets = true;
            }
        },
        shareVisible(v) {
            if (v) {
                this.hideTabBar();
            } else {
                this.showTabbar();
            }
        },
        isLogin(v) {
            if (v) {
                this.getBalance();
                this.getPosition();
            }
        },
        orderModeIndex(v) {
            this.order_price = '';
            if (v === 0) {
                this.order_price = this.currentCurrency['c'];
            }
            if (v === 2) {
                this.order_wprice = this.currentCurrency['c'];
            }
            this.order_rate = 0;
            this.order_amount = '';
        },
        current(v) {
            if (this.isLogin) {
                this.getPosition(false);
            }
        },
        closeAllPositions(v) {
            if (!v) {
                this.showTabbar();
            } else {
                this.hideTabBar();
            }
        },
        closeAllLimit(v) {
            if (!v) {
                this.showTabbar();
            } else {
                this.hideTabBar();
            }
        },
        drawerTabIndex(index) {
            const query = uni.createSelectorQuery().in(this);
            if (index === 0) {
                query.select(`#drawerTab1`).boundingClientRect(data => {
                    this.dotWidth = data.width - 30;
                }).exec();
            } else {
                query.select(`#drawerTab` + (index + 1)).boundingClientRect(data => {
                    this.dotWidth = data.width - 15;
                }).exec();
            }
        },
        planId(v) {
            console.log(v);
        },
        scrollTop(v) {
            if (v > 20) {
                this.bodyScrollHeight = this.device.windowHeight - this.device.statusBarHeight - 50;
            }
        },
        entrustTabIndex(v) {
            if (v === 0) {
                this.setOrderHeight(this.position.entrust)
            }
            if (v === 1) {
                this.setOrderHeight(this.position.entrustP)
            }
        }
    },
    methods: {
        entrustTabChange(e) {
            this.entrustTabIndex = e;
            console.log(e)
        },
        orderRateSet(e) {
            var val = e.detail.value;
            if ((val / this.balance.legal_balance * 100) > 100) {
                this.order_rate = 100;
            } else {
                this.order_rate = (val / this.balance.legal_balance) * 100
            }
        },
        PLslider(e) {
            let amount = this.planId.order.amount - this.planId.order.close;
            this.wamount = util.float(parseFloat(e.detail.value * amount / 100).toFixed(8));
        },
        /**
         * 币种排序
         */
        switchSort(index, field) {
            if (this.sort[index]['type'] === 0) {
                this.sort[index]['type'] = 1;
                this.sort[index]['active'] = this.sort[index]['down'];
                this.sortCurrency(index, field, 1);
                this.sort.map((item, _index) => {
                    if (_index !== index) {
                        item['type'] = 0;
                        item['active'] = this.sort[_index]['img'];
                    }
                    return item;
                });
                return;
            }
            if (this.sort[index]['type'] === 1) {
                this.sort[index]['type'] = 2;
                this.sort[index]['active'] = this.sort[index]['up'];
                this.sortCurrency(index, field, -1);
                this.sort.map((item, _index) => {
                    if (_index !== index) {
                        item['type'] = 0;
                        item['active'] = this.sort[_index]['img'];
                    }
                    return item;
                });
                return;
            }
            if (this.sort[index]['type'] === 2) {
                this.sort[index]['type'] = 0;
                this.sort[index]['active'] = this.sort[index]['img'];
                this.sortCurrency(index, field, 0);
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
            let list = this.currency[this.drawerTabIndex]['currency'];

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
            this.currency[this.drawerTabIndex]['currency'] = list;
        },
        /**
         * 修改委托订单
         */
        changeLimitOrder() {
            if (!this.planId) {
                return false;
            }
            if (this.planId.ttype === 3 && this.wwprice < 0) {
                this.content = this.$t('contruct.pl20');
                this.alertShow = true;
                return false;
            }
            if (this.wpprice < 0 || this.wamount < 0) {
                this.content = this.$t('newcontract.t84');
                this.alertShow = true;
                return false;
            }

            if ((this.planId.type === 5 || this.planId.type === 6) && this.wamount > this.planId.amount) {
                this.content = this.$t('newcontract.t85');
                this.alertShow = true;
                return false;
            }
            let form = {
                id: this.planId['id'],
                amount: util.str2number(this.wamount),
                price: util.str2number(this.wpprice)
            };
            if (this.planId.ttype === 3) {
                form['wprice'] = util.str2number(this.wwprice);
                if (!this.wtype) {
                    form['price'] = util.str2number(this.wwprice);
                }
            }
            this.$refs.loading.open();
            contractApi.limitOrderChange(form).then(res => {
                this.modifyPL = false;
                this.modifyOrderVisible = false
                this.$refs.loading.close();
                if (res.code !== 200) {
                    this.content = res.message;
                    this.alertShow = true;
                } else {
                    this.planId = false;
                    this.wamount = '';
                    this.wpprice = '';
                    this.wwprice = '';
                    this.getPosition(false);
                }
            }).catch((e) => {
                this.$refs.loading.close();
            })
        },
        /**
         * 撤销委托单
         */
        async closePlan() {
            if (this.closeLimitType && this.closePlanId === false) {
                return false;
            }
            let ids = [];
            if (!this.closeLimitType) {
                if (this.entrustTabIndex === 0) {
                    this.position.entrust.map((item) => {
                        ids.push(item.id);
                    });
                }
                if (this.entrustTabIndex === 1) {
                    this.position.entrustP.map((item) => {
                        ids.push(item.id);
                    });
                }
            } else {
                ids.push(this.closePlanId);
            }
            if (ids.length > 0) {
                this.closeAllLimit = false;
                this.$refs.loading.open();
                ids.map(async (id) => {
                    try {
                        await contractApi.cancelOpeartion(id);
                        this.getBalance();
                    } catch (e) {
                    }
                });
                this.$refs.loading.close();
                this.closePlanId = false;
                this.closeLimitType = false;
                this.closePlanId = false;
                setTimeout(() => {
                    this.getPosition();
                }, 100)
            }
        },
        /**
         * 全部平仓
         */
        stopAll() {
            if (!this.position || this.position.position.length === 0) {
                this.closeAllPositions = false;
                return false;
            }
            this.closeAllPositions = false;
            this.$refs.loading.open();
            contractApi.closeOrder({
                id: 0,
                pamount: 0,
                ptype: 1,
                price: 0,
                wprice: 0
            }).then(res => {
                this.$refs.loading.close();
                if (res.code !== 200) {
                    this.content = this.$t('common.error');
                    this.alertShow = true;
                }
                this.getPosition()
                this.position.position = [];
                uni.$emit('no_position');
                //操作成功会有socket 消息通知数据更新，这个地方无需处理
            }).catch((e) => {
                this.$refs.loading.close();
                this.content = this.$t('common.error');
                this.alertShow = true;
            })
        },
        /**
         * 止盈止损的提交
         */
        submitStop(_form) {
            if (this.pindex === false) {
                return false;
            }
            const form = {cid: this.position.position[this.pindex]['id']};
            let amount = this.position.position[this.pindex]['amount'] - this.position.position[this.pindex]['close'];
            // form['nowPrice'] = util.float(this.getNewPrice(this.position.position[this.pindex]['currency_id'], this.position.position[this.pindex]['cm_id']));
            form['nowPrice'] = this.getNewPrice(this.position.position[this.pindex]['currency_id'], this.position.position[this.pindex]['cm_id'])

            let direction = this.position.position[this.pindex]['direction'];
            if (_form['wwprice'] > 0) {
                if (_form['wamount'] < 0) {
                    this.content = this.$t('newcontract.t86');
                    this.alertShow = true;
                    return false;
                }
                if (_form['wamount'] > amount) {
                    this.content = this.$t('newcontract.t96');
                    this.alertShow = true;
                    return false;
                }
                if (direction === 1 && (_form.wwprice < form['nowprice'] || _form.wpprice < form['nowprice'])) {
                    this.content = this.$t('newcontract.t95');
                    this.alertShow = true;
                    return false;
                }
                if (direction === 2 && (_form.wwprice > form['nowprice'] || _form.wpprice > form['nowprice'])) {
                    this.content = this.$t('newcontract.t95');
                    this.alertShow = true;
                    return false;
                }
                form['profitType'] = _form['wpprice'] === '' ? 0 : 1;
                form['profitPprice'] = _form.wpprice === '' ? _form.wwprice : _form.wpprice;
                form['profitPwprice'] = _form.wwprice;
                form['profitAmount'] = _form.wamount;
            }

            if (_form.lwprice > 0) {
                if (_form.lamount < 0) {
                    this.content = this.$t('newcontract.t87');
                    this.alertShow = true;
                    return false;
                }
                if (_form.lamount > amount) {
                    this.content = this.$t('newcontract.t96');
                    this.alertShow = true;
                    return false;
                }
                if (direction === 1 && (_form.lwprice > form['nowprice'] || _form.lpprice > form['nowprice'])) {
                    this.content = this.$t('newcontract.t95');
                    this.alertShow = true;
                    return false;
                }
                if (direction === 2 && (_form.lwprice < form['nowprice'] || _form.lpprice < form['nowprice'])) {
                    this.content = this.$t('newcontract.t95');
                    this.alertShow = true;
                    return false;
                }
                form['loseType'] = _form.lpprice === '' ? 0 : 1;
                form['losePprice'] = _form.lpprice === '' ? _form.lwprice : _form.lpprice;
                form['losePwrice'] = _form.lwprice;
                form['loseAmount'] = _form.lamount;
            }

            if (!form['profitPwprice'] || !form['profitPprice'] || !form['profitAmount']) {
                this.content = !form['profitPwprice'] ? this.$t('entrust.t24') : !form['profitPprice'] ? this.$t('entrust.t38') : !form['profitAmount'] ? this.$t('entrust.t39') : '';
                this.alertShow = true;
                return false;
            }

            if (!form['losePprice'] || !form['losePwrice'] || !form['loseAmount']) {
                this.content = !form['losePwrice'] ? this.$t('entrust.t26') : !form['losePprice'] ? this.$t('entrust.t40') : !form['loseAmount'] ? this.$t('entrust.t41') : '';
                this.alertShow = true;
                return false;
            }

            if (!form['profitPwprice'] && !form['losePwrice']) {
                this.content = this.$t('newcontract.t88');
                this.alertShow = true;
                return false;
            }

            this.plshow = false;
            this.$refs.loading.open();

            try {
                contractApi.limitProfit(form).then(res => {
                    this.$refs.loading.close();
                    if (res.code !== 200) {
                        this.content = res.message;
                    } else {
                        this.content = this.$t('entrust.t4');
                    }
                    this.pindex = false;
                    this.alertShow = true;
                    this.getPosition(false);
                }).catch((e) => {
                    this.$refs.loading.close();
                    this.content = this.$t('common.error');
                    this.alertShow = true;
                })
            } catch (e) {
                this.$refs.loading.close();
            }
        },
        /**
         * 显示反手弹窗信息
         * @param index
         */
        showBackOpenModal(index) {
            this.pindex = index;
            let show = uni.getStorageSync('fcopen');
            if (typeof show === 'undefined' || parseInt(show) !== 1) {
                this.backhand = true;
            } else {
                this.stopOnOpen();
            }
        },
        /**
         * 反手开仓
         */
        async stopOnOpen(checked = false) {
            if (this.pindex === false) {
                return false;
            }

            if (checked) {
                uni.setStorageSync('fcopen', 1);
            }
            this.backhandShow = false;
            let position = this.position.position[this.pindex];
            this.$refs.loading.open();
            try {
                await this.stopPosition(
                    position['id'],
                    position['amount'] - position['close'],
                    util.float(this.getNewPrice(position['currency_id'], position['cm_id'])),
                    false
                );
                // this.backhand = false;
                this.pindex = false;
            } catch (e) {
                console.log("反手平仓", e);
            }
            //按照当前仓位的盈亏执行开仓
            try {
                let profit = position['p'];
                let amount = parseFloat(this.balance.legal_balance) + parseFloat(profit);
                if (amount > 0 && amount * 0.9 > this.currentCurrency['min_amount']) {
                    //let now_price = util.str2number(this.currentCurrency['new_price']);
                    let now_price = util.str2number(this.getNewPrice(position['currency_id'], position['cm_id']));
                    //价格可以了
                    let openAmount = parseFloat(amount * 0.9 * this.leverValue / now_price).toFixed(position['decimals']);
                    if (openAmount > position['amount']) {
                        openAmount = position['amount'];
                    }
                    //后端 全仓1 分仓3 逐仓 2
                    const form = {
                        cm_id: position['cm_id'],
                        currency_id: position['currency_id'],
                        direction: position['direction'] === 1 ? 2 : 1,
                        muilt: this.leverValue,
                        order_type: 1,
                        margin_type: position['margin_type'] === 2 ? 2 : 1,
                        amount: openAmount,
                        price: now_price
                    };
                    contractApi.submitOrder(form).then(res => {
                        this.$refs.loading.close();
                        if (res.code !== 200) {
                            this.content = res.message;
                            this.alertShow = true;
                            return false;
                        }
                        uni.$emit('on_position');
                        this.getPosition();
                        this.getBalance();
                    }).catch(e => {
                        this.$refs.loading.close();
                        this.content = this.$t('common.error');
                        this.alertShow = true;
                    })
                }
            } catch (e) {
                console.log("反手开仓", e);
            }
            this.$refs.loading.close();
        },
        /**
         * 平仓
         * @param order_id 订单id
         * @param amount 平仓数量
         * @param price 平仓价格
         * @param type 平仓类型 false 市价 1限价
         * @returns {boolean}
         */
        async stopPosition(order_id, amount, price, type = false) {
            // console.log(order_id,amount,price,type);return false;
            amount = util.str2number(amount);
            price = util.str2number(price)
            if (amount === "" || amount < 0) {
                this.content = this.$t('newcontract.t44');
                this.alertShow = true;
                return false;
            }
            if (type && (price === '' || price < 0)) {
                this.content = this.$t('newcontract.t43');
                this.alertShow = true;
                return false;
            }

            const form = {
                id: order_id,
                pamount: util.str2number(amount),
                ptype: !type ? 1 : 2,   //1市价 2限价 3委托
                price: util.str2number(price),
                wprice: type ? price : 0
            };
            this.$refs.loading.open();
            let res = await contractApi.closeOrder(form);
            try {
                this.cpshow = false;
                this.pindex = false;
                this.$refs.loading.close();
                if (res.code !== 200) {
                    this.content = this.$t('common.error');
                    this.alertShow = true;
                }
            } catch (e) {
            }
            // this.pamount = '';
            // this.closePositionRate = 0;
            // this.pprice = '';
            if (!type) {
                this.position.position = this.position.position.filter((item) => {
                    if (item.id === order_id && parseFloat(item['amount']) - parseFloat(item['close']) - amount <= 0) {
                        return false;
                    }
                    return true;
                });
                if (this.position.position.length > 0) {
                    this.position.position = this.position.position.map((item) => {
                        if (item.id === order_id) {
                            item['close'] = parseFloat(item['close']) + parseFloat(amount);
                        }
                        return item;
                    });
                }
                console.log(this.position.position);
                // let position = this.position.position.filter(item => item.id === order_id);
                // console.log(position, amount);
                // if (position.length > 0 && (position[0]['close'] + amount) >= position[0]['amount']) {
                //     this.position.position = this.position.position.filter(item => item.id !== order_id);
                // } else {
                //     let position = [];
                //     this.position.position.map((item)=>{
                //         if (item.id === order_id) {
                //             item['close'] = parseFloat(item['close']) + parseFloat(amount)
                //             if(item['amount'] - item['close'] > 0){
                //                 position.push(item);
                //             }
                //         }
                //     });
                //     this.position.position = position;
                // }
                if (this.position.position.length === 0) {
                    uni.$emit('no_position');
                }
                // else {
                //     this.getStopPrice(true);
                // }
            }
            this.listTabs[0]['num'] = this.position.position.length;
            return true;
        },
        /**
         * 开单
         * @param direction 方向 1多2 空
         * @returns {boolean}
         */
        submit(direction) {
            if (this.isLogin) {
                uni.hideKeyboard();
                let margin;
                if (this.orderModeIndex === 1) {
                    margin = parseFloat(this.amountType === 0 ? this.amount / this.mutil * this.currentCurrency['new_price'] : this.order_amount).toFixed(2);
                } else if (this.orderModeIndex === 0) {
                    //判断限价下单，委托价和当前限价对比
                    if (direction === 1) {
                        if (this.order_price > this.currentCurrency['new_price']) {
                            this.content = this.$t('contruct.pl35a');
                            this.alertShow = true;
                            return false;
                        }
                    } else if (direction === 2) {
                        if (this.order_price < this.currentCurrency['new_price']) {
                            this.content = this.$t('contruct.pl35b');
                            this.alertShow = true;
                            return false;
                        }
                    }
                    margin = parseFloat(this.amountType === 0 ? this.amount / this.mutil * this.order_price : this.order_amount).toFixed(2);
                } else {
                    margin = parseFloat(this.amountType === 0 ? this.amount / this.mutil * this.order_price : this.order_amount).toFixed(2);
                }
                if (this.currentCurrency['min_amount'] && parseFloat(margin) < parseFloat(this.currentCurrency['min_amount'])) {
                    this.content = this.$t('contract.order_min_tip') + util.float(this.currentCurrency['min_amount']) + "USDT";
                    this.alertShow = true;
                    return false;
                }

                if (parseFloat(margin) > parseFloat(this.balance.legal_balance)) {
                    this.content = this.$t('contruct.pl17');
                    this.alertShow = true;
                    return false;
                }
                if (this.order_amount === '' || this.order_amount <= 0) {
                    this.content = this.$t('contruct.pl16');
                    this.alertShow = true;
                    return false;
                }

                if (this.orderModeIndex === 0 && (this.order_price === '' || parseFloat(this.order_price) <= 0)) {
                    this.content = this.$t('contruct.pl19');
                    this.alertShow = true;
                    return false;
                }
                if (this.orderModeIndex === 2 && (this.order_wprice === '' || parseFloat(this.order_wprice) <= 0)) {
                    this.content = this.$t('contruct.pl20');
                    this.alertShow = true;
                    return false;
                }

                let avaAmount;
                if (direction === 1) {
                    avaAmount = this.getAvliAmount(1);
                } else {
                    avaAmount = this.getAvliAmount(2);
                }
                if (this.amountType === 0 && parseInt(this.amount) > parseInt(avaAmount)) {
                    this.content = this.$t('contruct.pl17');
                    this.alertShow = true;
                    return false;
                }
                if (this.amountType === 1 && parseInt(this.order_amount) > parseInt(avaAmount)) {
                    this.content = this.$t('contruct.pl17');
                    this.alertShow = true;
                    return false;
                }
                //后端 全仓1 分仓3 逐仓 2
                const form = {
                    cm_id: cm_id,
                    currency_id: currency_id,
                    direction: direction,
                    muilt: this.leverValue,
                    order_type: this.orderModeIndex === 0 ? 2 : this.orderModeIndex === 1 ? 1 : 3,
                    margin_type: this.modelActive === 0 ? 1 : 2
                };
                if (this.amountType === 0) {
                    form['amount'] = util.str2number(this.order_amount);
                } else {
                    form['uamount'] = this.order_amount;
                }
                if (this.orderModeIndex === 1) {
                    form['price'] = util.str2number(this.currentCurrency['new_price']); //记录操作时提交的价格
                }
                if (this.orderModeIndex === 0) {
                    form['price'] = util.str2number(this.order_price); //限价委托价格
                }
                if (this.orderModeIndex === 2) {
                    form['price'] = util.str2number(this.wtype ? this.order_price : this.order_wprice); //条件单的委托价格
                    form['wprice'] = util.str2number(this.order_wprice); //条件单的触发价格
                }
                if (!form['price']) {
                    this.content = "網絡異常";
                    this.alertShow = true;
                    return false;
                }

                form['nowprice'] = util.str2number(this.currentCurrency['new_price']);
                if (this.checked) {
                    if (direction === 1 && (this.winPrice < form['nowprice'] || this.losePrice > form['nowprice'])) {
                        this.content = "做多止盈止损价格不符合条件";
                        this.alertShow = true;
                        return false;
                    }
                    if (direction === 2 && (this.winPrice > form['nowprice'] || this.losePrice < form['nowprice'])) {
                        this.content = "做空止盈止损价格不符合条件";
                        this.alertShow = true;
                        return false;
                    }
                    form['stop_up'] = (this.winPrice !== '' && this.winPrice > 0) ? this.winPrice : 0;
                    form['stop_down'] = (this.losePrice !== '' && this.losePrice > 0) ? this.losePrice : 0;
                }
                this.$refs.loading.open();
                // console.log(form);return false;
                contractApi.submitOrder(form).then(res => {
                    this.$refs.loading.close();
                    if (res.code !== 200) {
                        this.content = res.message;
                        this.alertShow = true;
                        return false;
                    }
                    this.order_price = '';
                    this.order_amount = '';
                    this.order_rate = 0;
                    // if (this.orderModeIndex !== 1) {
                    //     this.getPosition();
                    // }
                    uni.$emit('on_position');
                    this.getPosition(true);
                    this.getBalance();
                }).catch(e => {
                    this.$refs.loading.close();
                    this.content = this.$t('common.error');
                    this.alertShow = true;
                })
            } else {
                this.mroute.login();
            }
        },
        setPriceType(e) {
            this.priceIndex = e.index;
        },
        decryPrice() {
            var orderPrice = Number(this.order_price)
            this.order_price = parseFloat(orderPrice) - base;
            if (this.order_price <= 0) {
                this.order_price = ""
            }
        },
        incryPrice() {
            var orderPrice = Number(this.order_price)
            this.order_price = parseFloat(orderPrice) + base;
        },
        /**
         * 预估盈亏
         * @param o 开仓价格
         * @param s 平仓价格
         * @param a 平仓数量
         * @param d 仓位方向
         */
        estimateProfit(o, s, a, d) {
            let c = d === 1 ? s - o : o - s;
            let p = c * a;
            return util.float(parseFloat(p).toFixed(8));
        },
        /**
         * 盈亏百分比
         * @param d 方向  true 止盈 false 止损
         */
        estimateRate(d) {
            let position = this.position.position[this.pindex];
            let _d = position['direction'] === 1 && d ? 1 : 2
            let profit = this.estimateProfit(
                position['price'],
                d ? this.wwprice : this.lwprice,
                d ? this.wamount : this.lamount,
                _d
            );
            let margin = position['margin'];
            return parseFloat(profit / margin * 100).toFixed(2);
        },
        //预估开仓的强平价格
        estimatePrice(d) {
            let amount = 0;
            let price = parseFloat(this.order_price > 0 ? this.order_price : this.currentCurrency['new_price']);
            if (this.amountType === 0) {
                amount = parseFloat(this.order_amount);
            } else {
                amount = parseFloat(this.order_amount * this.leverValue) / price;
            }
            let p = this.balance.legal_balance / amount;
            let stopPrice = d === 1 ? price - p : price + p;
            return stopPrice < 0 ? 0 : stopPrice;
        },
        getCurrencyFee(currency_id, field = 'fee_close', cm_id = 2) {
            let index = this.drawList.findIndex(item => item.id === currency_id);
            return this.drawList[index][field];
            // let value = 0;
            // Object.keys(this.currency).forEach((k) => {
            //     if (this.currency[k]['id'] === cm_id) {
            //         Object.keys(this.currency[k]['currency']).forEach((kk) => {
            //             if (this.currency[k]['currency'][kk]['id'] === currency_id) {
            //                 value = this.currency[k]['currency'][kk][field];
            //             }
            //         });
            //     }
            // });
            // return value;
        },
        //获取币种的最新价格
        getNewPrice(cid, _cm_id = 2) {
            let index = this.drawList.findIndex(item => item.id === cid);
            return this.drawList[index]['new_price'];
            // let price = 0;
            // Object.keys(this.currency).forEach((k) => {
            //     if (this.currency[k]['id'] === _cm_id) {
            //         Object.keys(this.currency[k]['currency']).forEach((kk) => {
            //             if (this.currency[k]['currency'][kk]['id'] === cid) {
            //                 price = this.currency[k]['currency'][kk]['new_price'];
            //             }
            //         });
            //     }
            // });
            //return price;
        },
        /**
         * 获取仓位保证金率
         * @param p 盈亏
         * @param m 仓位保证金
         * @param t 仓位类型
         */
        estimateMarginRate(p, m, t) {
            if (t === 1) {
                m = m + parseFloat(this.balance.legal_balance);
            }
            return parseFloat(p) / m * 100;
        },
        //可开仓位数量计算 1 多 2空
        getAvliAmount(d = 1) {
            if (typeof this.balance.legal_balance == 'undefined' || this.balance.legal_balance <= 0) {
                return '--';
            }
            let balance = parseFloat(this.balance.legal_balance);
            if (POSITION_PROFIT !== 0) {
                balance += parseFloat(POSITION_PROFIT);
            }

            //var pamount = this.getDirectionAmount(d);
            let position_margin = this.getDirectionAmount(d);
            balance -= position_margin;
            if (this.orderModeIndex === 1) {
                var aamount = balance / this.currentCurrency['c'] * this.leverValue;
            } else {
                var aamount = balance / (this.order_price !== '' ? util.str2number(this.order_price) : this.currentCurrency['c']) * this.leverValue;
            }
            aamount = parseFloat(aamount * 0.99).toFixed(this.currentCurrency['decimals']);
            if (this.amountType === 0) {
                return parseFloat(aamount).toFixed(this.currentCurrency['decimals']);
            } else {
                //let amount = balance * (1 - (parseFloat(this.currentCurrency['fee_open']) + parseFloat(this.currentCurrency['fee_close'])));
                return balance * 0.99;////amount > this.currentCurrency['max_amount'] ? this.currentCurrency['max_amount'] : amount;
            }
        },
        getDirectionAmount(d) {
            if (!this.position) {
                return 0;
            }
            let list = this.position.position.filter(item => item.direction === d);
            let margin = 0
            if (list.length > 0) {
                for (let i = 0; i < list.length; i++) {
                    let amount = parseFloat(list[i]['amount']) - parseFloat(list[i]['close'])
                    margin += amount * list[i]['price'] / list[i]['muilt'];
                }
            }
            return margin;
        },
        //获取合约 socket ticker 数据 深度数据
        onContractMessageHandler(data) {
            // if(!APP_SHOW){
            // 	return true;
            // }
            //接收ws 的数据
            let _this = this;

            // if(data.type === 204){
            // 	console.log(data);
            // }
            if (data.type === 204 && data.data.result && data.data.msg !== lastOrder) {
                //开单消息通知，重新加载余额以及仓位信息
                lastOrder = data.data.msg;
                _this.getPosition(false);
                _this.getBalance();
            }

            if (data.type === 205 && data.data.id !== lastOrder) {
                lastOrder = data.data.id;
                _this.getPosition(false);
                _this.getBalance();
            }

            if (!this.currentCurrency || !this.currentCurrency['id']) {
                return false;
            }
            if (data.type === 205 && data.data.id !== lastOrder) {
                lastOrder = data.data.id;
                _this.getPosition(false);
                _this.getBalance();
            }
            try {
                if (data.type === 204 && data.data.result === false) {
                    this.content = data.data.msg
                    this.alertShow = true;
                }
                if (data.type === 200) {
                    let ticker = data.data;
                    if (parseInt(ticker.currency_id) == parseInt(_this.currentCurrency['id'])) {
                        if (typeof ticker === 'undefined' || ticker === '') {
                            return;
                        }
                        _this.currentCurrency['new_price'] = parseFloat(ticker['data']['c']);
                        _this.currentCurrency['P'] = ticker['data']['P'];
                        _this.currentCurrency['c'] = ticker['data']['c'];
                        _this.currentCurrency['high_price'] = ticker['data']['h'];
                        _this.currentCurrency['low_price'] = ticker['data']['l'];
                        if (lastPrice === 0 || lastPrice < parseFloat(ticker['data']['c'])) {
                            _this.currentCurrency['di'] = -1;
                        }
                        if (lastPrice > parseFloat(ticker['data']['c'])) {
                            _this.currentCurrency['di'] = 1;
                        }
                        if (lastPrice === parseFloat(ticker['data']['c'])) {
                            _this.currentCurrency['di'] = 0;
                        }
                        lastPrice = parseFloat(ticker['data']['c']);

                        //_this.currency['currency'] = util.compareCurrency(_this.currency[]'currency'], data.data);
                    }
                    _this.ticker = data.data;
                    //_this.calacPosition(data.data, data.data.cm_id);
                    _this.drawList = util.compareCurrency(_this.drawList, data.data);
                    if (_this.mlist.length > 0) {
                        _this.mlist = util.compareCurrency(_this.mlist, data.data);
                    }
                }
                //            if (data.type === 200) {
                // _this.calacPosition(data.data, data.data.cm_id);
                //                _this.currency[0]['currency'] = util.compareCurrency(_this.currency[0]['currency'], data.data);
                //            }
                if (data.type === 500) {
                    _this.currency[2]['currency'] = util.compareCurrency(_this.currency[2]['currency'], data.data);
                }
                if (data.type === 600 || data.type === 700) {
                    _this.currency[2]['currency'] = util.compareCurrency(_this.currency[2]['currency'], data.data);
                }
                // if(data.type === 200 || data.type === 500){
                //     //更新币种显示列表数据
                //     this.currency = this.currency.map((item)=>{
                //         if(item.id === data.data.cm_id){
                //             item['currency'] = util.compareCurrency(item.currency,data.data.data);
                //         }
                //         item['update'] = Date.now();
                //         return item;
                //     });
                // }
                if ((data.type === 201 || data.type === 501 || data.type === 601) && data.data.currency_id === parseFloat(this.currentCurrency['id'])) {
                    let length = 8;
                    if (!_this.isLogin) {
                        length = 6;
                    } else {
                        if (_this.orderModeIndex === 0) {
                            length = 7;
                        }
                        if (_this.orderModeIndex === 1) {
                            length = 8;
                        }
                        if (_this.orderModeIndex === 2) {
                            length = 9;
                        }
                    }

                    let asks = data.data.data.a.slice(0, length);
                    let bids = data.data.data.b.slice(0, length);
                    let amax = 0;
                    let bmax = 0;
                    // asks.sort((a, b) => {
                    //     return a[1] - b[1];
                    // });
                    asks.map((v, i) => {
                        if (amax < parseFloat(v[1])) {
                            amax = v[1];
                        }
                    });
                    for (let i = 0; i < asks.length; i++) {
                        asks[i][2] = parseFloat(asks[i][1] / amax).toFixed(2);
                    }
                    bids.map((v, i) => {
                        if (bmax < parseFloat(v[1])) {
                            bmax = v[1];
                        }
                    });
                    for (let i = 0; i < bids.length; i++) {
                        bids[i][2] = parseFloat(bids[i][1] / bmax).toFixed(2);
                    }
                    _this.asks = asks;
                    _this.bids = bids;
                }
                if (data.type === 202 && data.data.currency_id === _this.currentCurrency['id']) {
                    //市场标记价格信息
                    _this.market = data.data.data;
                    if (timestamp === 0) {
                        timestamp = _this.market['T'];
                    }
                    if (timestamp !== _this.market['T']) {
                        timestamp = _this.market['T'];
                    }
                    if (!timecaluc) {
                        this.calacTime();
                    }
                }

            } catch (e) {
                console.log("error:", e);
            }
        },
        calacTime() {
            timecaluc && clearInterval(timecaluc)
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
        //仓位的盈亏计算
        calacPosition(ticker, cm_id) {
            if (!this.position) {
                return false;
            }
            try {
                let position = this.position.position;
                if (position.length <= 0) {
                    return false;
                }
                //let profit = 0;

                let currencyPosition = position.findIndex((item) => item.currency_id === ticker.currency_id);
                if (currencyPosition >= 0) {
                    let item = position[currencyPosition];
                    let amount = parseFloat(item['amount']) - parseFloat(item['close']);
                    let o = parseFloat(item['price']);
                    let newPrice = parseFloat(ticker['data']['c']);
                    let p;
                    if (parseInt(item['direction']) === 1) {
                        p = amount * (newPrice - o)
                    } else {
                        p = amount * (o - newPrice)
                    }
                    item['p'] = p;
                    //profit += p;
                    //rate
                    let pr;
                    if (parseInt(item['direction']) == 1) {
                        pr = item.amount * (newPrice - item.price) / item.margin * 100;
                    } else {
                        pr = item.amount * (item.price - newPrice) / item.margin * 100;
                    }
                    item['rate'] = pr > 0 ? '+' + util.thousandSeparator(pr, 2) : util.thousandSeparator(pr)

                    if (parseInt(item['direction']) === 1) {
                        p = util.thousandSeparator(item.amount * (newPrice - item.price), 4);
                    } else {
                        p = util.thousandSeparator(item.amount * (item.price - newPrice), 4);
                    }
                    item['mr'] = util.thousandSeparator((parseFloat(item.margin) + parseFloat(p)) / parseFloat(item.margin) * 100, 2);
                    // position[i] = item;
                    position[currencyPosition] = item;

                    uni.$emit('profit', 1, p);
                }

                //           for (let i = 0; i < position.length; i++) {
                //               if (parseInt(position[i]['currency_id']) === parseInt(ticker.currency_id) && parseInt(position[i]['cm_id']) === cm_id) {
                //                   let item = position[i]
                //                   let amount = parseFloat(item['amount']) - parseFloat(item['close']);
                //                   let o = parseFloat(item['price']);
                //                   let newPrice = parseFloat(ticker['data']['c']);
                //                   let p;
                //                   if (parseInt(item['direction']) === 1) {
                //                       p = amount * (newPrice - o)
                //                   } else {
                //                       p = amount * (o - newPrice)
                //                   }
                //                   item['p'] = p;
                //                   profit += p;
                //                   //rate
                //                   let pr;
                //                   if (parseInt(item['direction']) == 1) {
                //                       pr = item.amount * (newPrice - item.price) / item.margin * 100;
                //                   } else {
                //                       pr = item.amount * (item.price - newPrice) / item.margin * 100;
                //                   }
                //                   item['rate'] = pr > 0 ? '+' + util.thousandSeparator(pr, 2) : util.thousandSeparator(pr)

                //                   if (parseInt(item['direction']) === 1) {
                //                       p = util.thousandSeparator(item.amount * (newPrice - item.price), 4);
                //                   } else {
                //                       p = util.thousandSeparator(item.amount * (item.price - newPrice), 4);
                //                   }
                //                   item['mr'] = util.thousandSeparator((parseFloat(item.margin) + parseFloat(p)) / parseFloat(item.margin) * 100, 2);
                //                   position[i] = item;
                // flag=true;
                //               }
                //           }
                this.position.position = position;
            } catch (e) {
                console.log(e);
            }
        },
        //获取仓位数据
        getPosition(f = true) {
            if (!this.isLogin) {
                return false;
            }
            contractApi.getPositionList(this.current ? currency_id : 0).then(res => {
                if (res.code === 200) {
                    this.position = res.data;
                    if (this.position && this.position.position) {
                        this.setOrderHeight(this.position.position)
                        this.listTabs[0]['num'] = this.position.position.length;
                        uni.$emit('on_position');
                    }
                    if (this.position && (this.position.entrust || this.position.entrustP)) {
                        this.listTabs[1]['num'] = this.position.entrust.length + this.position.entrustP.length;
                    }
                    if (this.position && this.position.entrust) {
                        this.entrustTabs[0]['num'] = this.position.entrust.length;
                        // this.setOrderHeight(this.position.entrust)
                    }
                    if (this.position && this.position.entrustP) {
                        this.entrustTabs[1]['num'] = this.position.entrustP.length;
                        // this.setOrderHeight(this.position.entrustP)
                    }
                    this.listTabs[0]['num'] = this.position.position.length;
                    this.listTabs[1]['num'] = this.position.entrust.length + this.position.entrustP.length;
                    // this.getStopPrice(f);
                } else {
                    this.position = {
                        position: [],
                        totalAmount: []
                    };
                }
            });
        },
        async getStopPrice(f = true) {
            if (!f || !this.position) {
                return;
            }
            if (!this.balance.legal_balance) {
                await this.getBalance();
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
            let balance = parseFloat(this.balance.legal_balance) + margin;
            this.position.position = this.position.position.map((item) => {
                if (f && parseInt(item.margin_type) === 1) {
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
        setCurrentCurrency(symbol, matches) {
            symbol['cm_id'] = 2;//matches['id'];
            symbol['currency_type'] = 0;//matches['currency_type'];
            uni.setStorageSync('current-contract', symbol);
            cm_id = symbol['cm_id'];
            currency_type = symbol['currency_type'];
            currency_id = symbol['id'];
            this.show_cm_id = cm_id;
            // console.log(symbol);
            this.currentCurrency = symbol;
            this.subscribeDepth();
            this.drawerVisible = false;

            this.getBalance();
            //this.getPosition(false);

            if (this.currentCurrency['new_price'] >= 0.00001) {
                base = 0.001;
            }
            if (this.currentCurrency['new_price'] >= 0.01) {
                base = 0.01;
            }
            if (this.currentCurrency['new_price'] >= 10) {
                base = 0.1;
            }
            if (this.currentCurrency['new_price'] >= 100) {
                base = 1;
            }
        },
        //获取交易对信息
        async getCurrentCurrency() {
            let current = uni.getStorageSync('current-contract');
            let currency = false;
            if (!current || current === '' || !current['cm_id'] || !current['currency_type']) {
                current = false;
            }
            if (typeof current == 'undefined' || !current) {
                currency = await this.getContracuMatches();
                uni.setStorageSync('contract-matches', currency[0]);
                current = currency[0]['currency'][0];
                current['cm_id'] = currency[0]['id'];
                current['currency_type'] = currency[0]['currency_type'];
            }

            if (!currency) {
                currency = await this.getContracuMatches();
                let currentC = currency.filter(item => item.id === current['cm_id']);
                if (currentC.length) {
                    currentC[0]['currency'].map((item) => {
                        if (parseInt(item['id']) === parseInt(current['id'])) {
                            current = item;
                            current['cm_id'] = currentC['id'];
                            current['currency_type'] = currentC['currency_type'];
                        }
                    });
                }
            }
            cm_id = current['cm_id'];
            currency_type = current['currency_type'];
            currency_id = current['id'];
            this.show_cm_id = cm_id;
            this.currentCurrency = current;
            // console.log(this.currentCurrency);
            this.currency = currency[0];
            this.drawList = currency[0]['currency'];
            this.subscribeDepth();
            //uni.setStorageSync('current-contract', this.currentCurrency);
            this.getBalance();
            this.getPosition(false);

            if (this.currentCurrency['new_price'] >= 0.00001) {
                base = 0.001;
            }
            if (this.currentCurrency['new_price'] >= 0.01) {
                base = 0.01;
            }
            if (this.currentCurrency['new_price'] >= 10) {
                base = 0.1;
            }
            if (this.currentCurrency['new_price'] >= 100) {
                base = 1;
            }
            //获取合约的自选数据
            let mlist = uni.getStorageSync('select-contract');
            if (typeof mlist !== 'undefined' && mlist.length > 0) {
                this.mlist = mlist;
            }
            // this.like = this.favStatus(2,this.currentCurrency['id']);
        },
        async getChoiceCurrency() {
            let currency = await this.getContracuMatches();
            const choice_current = uni.getStorageSync("choice-contract");
            if (typeof choice_current == 'undefined' || !choice_current) {
                await this.getCurrentCurrency();
            } else {
                const current_id = choice_current[0]['currency_id'];
                let choiceCurrency = currency[0]['currency'].find(item => item.id === current_id);
                currency_id = choiceCurrency['id'];
                currency_type = choiceCurrency['currency_type'];
                cm_id = choiceCurrency['cm_id'];
                this.show_cm_id = cm_id;
                this.currentCurrency = choiceCurrency;
                // console.log(this.currentCurrency);
                // this.currency = currency[0];
                // this.drawList = currency[0]['currency'];
                this.subscribeDepth();
                uni.setStorageSync('current-contract', this.currentCurrency);
                this.getBalance();
                this.getPosition(false);

                if (this.currentCurrency['new_price'] >= 0.00001) {
                    base = 0.001;
                }
                if (this.currentCurrency['new_price'] >= 0.01) {
                    base = 0.01;
                }
                if (this.currentCurrency['new_price'] >= 10) {
                    base = 0.1;
                }
                if (this.currentCurrency['new_price'] >= 100) {
                    base = 1;
                }
                //获取合约的自选数据
                let mlist = uni.getStorageSync('select-contract');
                if (typeof mlist !== 'undefined' && mlist.length > 0) {
                    this.mlist = mlist;
                }
            }
        },
        async getBalance() {
            if (this.isLogin && cm_id > 0 && currency_id > 0) {
                contractApi.getBalance(cm_id, currency_id).then(res => {
                    if (res.code === 200) {
                        this.balance = res.data;
                        //console.log(this.balance);
                        // if (this.balance.depth) {
                        //     let length = 6;
                        //     if (this.balance.depth.data.b.length < 6) {
                        //         length = this.balance.depth.data.b.length;
                        //     }
                        //     this.bids = this.balance.depth.data.b.slice(0, length);
                        //     this.asks = this.balance.depth.data.a.slice(0, length);
                        //     this.currentCurrency['new_price'] = this.bids[0][0]
                        // }
                    }
                });
            }
        },
        subscribeDepth() {
            if (subset) {
                clearInterval(subset);
            }
            //console.log("订阅数据：", cm_id, currency_id);
            try {
                // this.bids = []
                // this.asks = []
                getApp().globalData.csocket.send({
                    event: "contrade_depth_subscribe",
                    cm_id: 2,
                    currency_id: currency_id
                });
            } catch (e) {
                setTimeout(() => {
                    getApp().globalData.csocket.restart();
                    this.subscribeDepth();
                }, 2000);
            }
        },
        //获取合约数据交易对
        async getContracuMatches() {
            const currency = await currencyApi.contractCurrencyList();
            uni.setStorageSync('contract-matches', currency.data);
            return currency.data;
        },
        //设置杠杆
        setLever() {
            uni.setStorageSync('margin_lever', this.leverValue);
            this.leverVisible = false;
        },
        getLever() {
            let lever = uni.getStorageSync('margin_lever');
            if (typeof lever !== 'undefined' && lever !== '') {
                this.leverValue = parseInt(lever);
            }
        },
        //设置保证金模式
        setMarginModel() {
            uni.setStorageSync('margin_type', this.modelActive);
            this.marginModel = false;
        },
        getMarginModel() {
            let index = uni.getStorageSync('margin_type');
            if (typeof index !== 'undefined' && index !== '') {
                this.modelActive = parseInt(index);
            }
        },
        bodyScroll(e) {
            this.scrollTop = e.detail.scrollTop;
            if (this.scrollTop > 75) {
                this.navHideType = true;
            }

            if (this.scrollTop <= 35) {
                this.navHideType = false
            }
        },
        moreMenuTap(e) {
            this.moreVisible = false;
            if (e.iconName === 'hyxx') {
                return e.route(this.currentCurrency['symbol']);
            }
            return e.route();
        },
        // 解释说明弹出层
        explainOpen(e) {
            this.explainType = e;
            this.explainVisible = true;
        },
        pointChange(item, index) {
            this.pointVal = item;
            this.pointActive = index;
            this.pointVisible = false;
        },
        // 下单模式选择
        orderModeClick(e) {
            this.orderModeVal = e.text;
            this.orderModeIndex = e.index;
        },
        // 顶部滑块
        sliderChange(e) {
            this.order_rate = e.detail.value;
            let up = this.getAvliAmount(1);
            let down = this.getAvliAmount(2);
            let amount = up > down ? up : down;
            this.order_amount = parseFloat(amount * (e.detail.value / 100)).toFixed(this.amountType === 0 ? this.currentCurrency['decimals'] : 2);
        },
        // 合约单位设置
        radioChange(e, index) {
            this.amountType = index;
            this.contractunitVal = e;
            this.contractunitChecked = e.val;
            this.contractUnit = false;

            uni.setStorageSync('amount-type', index);
            uni.setStorageSync('amount-type-val', e);
            this.order_amount = '';
            this.order_rate = 0;
        },
        //获取仓位开单类型
        getAmountType() {
            let val = uni.getStorageSync('amount-type-val');
            if (typeof val !== 'undefined' && val !== '') {
                this.contractunitVal = val;
            }
            let index = uni.getStorageSync('amount-type');
            if (typeof index !== 'undefined' && index !== '') {
                this.contractunitChecked = parseInt(index);
                this.amountType = parseInt(index);
            }
        },
        drawerNavInit(e) {
            const navHeight = e.height + e.statusBarHeight;
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            this.drawerSwiperHeight = windowHeight - navHeight - 72;
        },
        // 侧边弹窗选项卡
        drawerTabChange(e, item, index) {
            this.drawerTabIndex = index;
            this.show_cm_id = item.id;
            const query = uni.createSelectorQuery().in(this);
            if (index === 0) {
                query.select(`#drawerTab1`).boundingClientRect(data => {
                    this.dotWidth = data.width - 30;
                }).exec();
            } else {
                query.select(`#drawerTab` + (index + 1)).boundingClientRect(data => {
                    this.dotWidth = data.width - 15;
                }).exec();
            }
        },
        // 杠杆调整滑块
        leverSliderChange(e) {
            this.leverValue = e.detail.value;
        },
        setStopProfitVal(e) {
            var val = e.detail.value;
            let amount = this.position.position[this.pindex]['amount'] - this.position.position[this.pindex]['close'];
            if ((val / amount * 100) > 100) {
                this.stopProfitVal = 100;
            } else {
                this.stopProfitVal = val / amount * 100
            }
        },
        setStopLossVal(e) {
            var val = e.detail.value;
            let amount = this.position.position[this.pindex]['amount'] - this.position.position[this.pindex]['close'];
            if ((val / amount * 100) > 100) {
                this.stopLossVal = 100;
            } else {
                this.stopLossVal = val / amount * 100
            }
        },
        // 止盈滑块(高级)
        stopProfitChange(e) {
            this.stopProfitVal = e.detail.value;
            let amount = this.position.position[this.pindex]['amount'] - this.position.position[this.pindex]['close'];
            this.wamount = util.float(parseFloat(amount * e.detail.value / 100).toFixed(8));
        },
        // 止损滑块(高级)
        stopLossChange(e) {
            this.stopLossVal = e.detail.value;
            let amount = this.position.position[this.pindex]['amount'] - this.position.position[this.pindex]['close'];
            this.lamount = util.float(parseFloat(amount * e.detail.value / 100).toFixed(8));
        },
        // 平仓滑块
        closePositionSlider(e) {
            this.closePositionRate = e.detail.value;
            let position = this.position.position[this.pindex];
            let amount = parseFloat(position['amount']) - parseFloat(position['close']);
            this.pamount = util.float(parseFloat(amount * e.detail.value / 100).toFixed(8));
        },
        pamountInput(e) {
            var val = e.detail.value;
            let position = this.position.position[this.pindex];
            let amount = parseFloat(position['amount']) - parseFloat(position['close']);
            if ((val / amount * 100) > 100) {
                this.closePositionRate = 100;
            } else {
                this.closePositionRate = (val / amount) * 100
            }
        },
        //自动显示底部导航栏
        hiddenTabbar(e) {
            if (e) {
                this.hideTabBar();
            } else {
                uni.showTabBar();
            }
        },
        orderTabChange(e) {
            //this.$refs.loading.open();
            let where = 0;
            let PL = 0;
            if (e === 1 && this.position && this.position.position) {
                this.setOrderHeight(this.position.position)
            }
            if (e === 1 && this.position && this.position.entrust) {
                this.entrustTabs[0]['num'] = this.position.entrust.length;
            }
            if (e === 1 && this.position && this.position.entrustP) {
                this.entrustTabs[1]['num'] = this.position.entrustP.length;
            }
            this.swiperTabActive = e;
            //this.$refs.loading.close();
            // setTimeout(() => {
            //     this.$refs.loading.close();
            //     this.swiperTabActive = e;
            // }, 500)
        },
        alertConfirm(e) {
            this.alertShow = false;
        },
        $t(key) {
            return i18n.t(key);
        },
        //海报
        async setPoster(index) {
            this.pindex = index;
            const share_background = "/static/img/tactic/tactic-share-bg.png"
            const logo_image = "/static/home/cvlogo.png"
            const postHeight = uni.getSystemInfoSync().windowHeight - 200;
            this.shareWarpHeight = uni.getSystemInfoSync().windowHeight;
            let dateTime = util.getDateTimeAddTime(0);
            let decimals = this.getCurrencyFee(this.position.position[this.pindex]['currency_id'], 'decimals');
            this.$refs.loading.open();
            let _this = this;
            setTimeout(() => {
                let poster = {
                    css: {
                        background: "#161819",
                        width: "750rpx",
                        height: `${postHeight - 100}px`,
                        overflow: "hidden",
                        borderRadius: "16rpx",
                        marginTop: "0rpx"
                    },
                    views: [
                        {
                            type: 'view',
                            css: {
                                width: "750rpx",
                                height: `${postHeight - 100}px`,
                                position: 'relative',
                            },
                            views: [
                                {
                                    type: "image",
                                    src: share_background,
                                    css: {
                                        width: "750rpx",
                                        height: `${postHeight - 100}px`,
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        borderRadius: "16rpx"
                                    }
                                },
                                {
                                    type: "view",
                                    css: {
                                        width: "750rpx",
                                        height: `${postHeight - 100}px`,
                                        padding: "24rpx",
                                        boxSizing: "border-box",
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                    },
                                    views: [
                                        {
                                            type: "image",
                                            src: logo_image,
                                            css: {
                                                width: "160rpx",
                                                height: "80rpx",
                                                margin: "6rpx 0 6rpx 6rpx"
                                            }
                                        }, {
                                            type: "text",
                                            text: dateTime + "(UTF+8)",
                                            css: {
                                                width: "702rpx",
                                                height: "48rpx",
                                                textAlign: "left",
                                                lineClamp: "1",
                                                fontSize: "28rpx",
                                                color: "#898989"
                                            }
                                        },
                                        {
                                            type: "view",
                                            css: {
                                                width: "702rpx",
                                                padding: "60rpx 30rpx 20rpx 30rpx",
                                                display: "flex",
                                                alignItems: "center",
                                            },
                                            views: [
                                                {
                                                    type: "image",
                                                    src: this.userAvatar,
                                                    css: {
                                                        width: "90rpx",
                                                        height: "90rpx",
                                                        borderRadius: "50%",
                                                        marginRight: "20rpx"
                                                    }
                                                },
                                                {
                                                    type: "view",
                                                    css: {
                                                        width: "532rpx",
                                                        display: "flex",
                                                        flexDirection: "column"
                                                    },
                                                    views: [{
                                                        type: "text",
                                                        text: util.hideText(this.userNickname),
                                                        css: {
                                                            width: "532rpx",
                                                            fontSize: "44rpx",
                                                            fontWeight: "bold",
                                                            color: "#ffffff",
                                                        }
                                                    },
                                                        {
                                                            type: "text",
                                                            text: "@" + util.hideText(this.userAccount),
                                                            css: {
                                                                width: "532rpx",
                                                                fontSize: "28rpx",
                                                                color: "#898989"
                                                            }
                                                        }]
                                                }
                                            ]
                                        },
                                        {
                                            type: "text",
                                            text: this.position.position[this.pindex]['symbol'] + "USDT",
                                            css: {
                                                width: "702rpx",
                                                padding: "0 30rpx",
                                                mraginTop: "10rpx",
                                                fontSize: "38rpx",
                                                color: "#ffffff",
                                                fontWeight: "600"
                                            }
                                        },
                                        {
                                            type: "view",
                                            css: {
                                                width: "702rpx",
                                                padding: "24rpx 30rpx",
                                                display: "flex",
                                                alignItems: "center",
                                            },
                                            views: [
                                                {
                                                    type: "text",
                                                    text: this.position.position[this.pindex]['direction'] === 1 ? this.$t('cor.t11') : this.$t('cor.t12'),
                                                    css: {
                                                        marginRight: "20rpx",
                                                        fontSize: "28rpx",
                                                        color: "#f1493f",
                                                        fontWeight: "600"
                                                    }
                                                }, {
                                                    type: "text",
                                                    text: "|",
                                                    css: {
                                                        marginRight: "20rpx",
                                                        fontSize: "28rpx",
                                                        color: "#f1493f",
                                                        fontWeight: "600"
                                                    }
                                                }, {
                                                    type: "text",
                                                    text: this.position.position[this.pindex]['muilt'] + "X",
                                                    css: {
                                                        marginRight: "20rpx",
                                                        fontSize: "28rpx",
                                                        color: "#898989",
                                                        fontWeight: "600"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            type: "text",
                                            text: "持仓收益",
                                            css: {
                                                width: "702rpx",
                                                padding: "0 30rpx 30rpx 30rpx",
                                                mraginTop: "10rpx",
                                                fontSize: "38rpx",
                                                color: '#898989',
                                                fontWeight: "600"
                                            }
                                        },
                                        {
                                            type: "text",
                                            text: (this.position.position[this.pindex]['p'] > 0 ? '+' : '') + util.thousandSeparator(this.position.position[this.pindex]['p'], 2) + " USDT",
                                            css: {
                                                width: "702rpx",
                                                padding: "0 30rpx 30rpx 30rpx",
                                                mraginTop: "10rpx",
                                                fontSize: "60rpx",
                                                color: this.position.position[this.pindex]['rate'] > 0 ? "#03aac7" : '#ea4337',
                                                fontWeight: "600"
                                            }
                                        },
                                        // {
                                        //     type: "text",
                                        //     text: util.thousandSeparator(this.position.position[this.pindex]['rate'], 2) + " %",
                                        //     css: {
                                        //         width: "702rpx",
                                        //         padding: "0 30rpx 30rpx 30rpx",
                                        //         mraginTop: "0rpx",
                                        //         fontSize: "50rpx",
                                        //         color: this.position.position[this.pindex]['rate'] > 0 ? "#03aac7" : '#ea4337',
                                        //         fontWeight: "500"
                                        //     }
                                        // },
                                        {
                                            type: "view",
                                            css: {
                                                width: "702rpx",
                                                padding: "0 30rpx",
                                                display: "flex",
                                                alignItems: "center",
                                                marginTop: "20rpx",
                                            },
                                            views: [
                                                {
                                                    type: "text",
                                                    text: "持仓收益",
                                                    css: {
                                                        marginRight: "40rpx",
                                                        fontSize: "28rpx",
                                                        color: "#898989"
                                                    }
                                                },
                                                {
                                                    type: "text",
                                                    text: (this.position.position[this.pindex]['rate'] > 0 ? '+' : '') + util.thousandSeparator(this.position.position[this.pindex]['rate'], 2) + " %",
                                                    css: {
                                                        marginRight: "20rpx",
                                                        fontSize: "28rpx",
                                                        color: this.position.position[this.pindex]['rate'] > 0 ? "#03aac7" : '#ea4337',
                                                        fontWeight: "600"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            type: "view",
                                            css: {
                                                width: "702rpx",
                                                padding: "0 30rpx",
                                                display: "flex",
                                                alignItems: "center",
                                                marginTop: "20rpx",
                                            },
                                            views: [
                                                {
                                                    type: "text",
                                                    text: this.$t('contruct.avp_price'),
                                                    css: {
                                                        marginRight: "40rpx",
                                                        fontSize: "28rpx",
                                                        color: "#898989"
                                                    }
                                                },
                                                {
                                                    type: "text",
                                                    text: util.thousandSeparator(this.position.position[this.pindex]['price'], decimals),
                                                    css: {
                                                        marginRight: "20rpx",
                                                        fontSize: "28rpx",
                                                        color: "#ffffff",
                                                        fontWeight: "600"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            type: "view",
                                            css: {
                                                width: "702rpx",
                                                padding: "0 30rpx",
                                                marginTop: "20rpx",
                                                display: "flex",
                                                alignItems: "center",
                                            },
                                            views: [
                                                {
                                                    type: "text",
                                                    text: this.$t('newcontract.t34'),
                                                    css: {
                                                        marginRight: "40rpx",
                                                        fontSize: "28rpx",
                                                        color: "#898989"
                                                    }
                                                }, {
                                                    type: "text",
                                                    text: util.thousandSeparator(this.getNewPrice(this.position.position[this.pindex]['currency_id']), decimals),
                                                    css: {
                                                        marginRight: "20rpx",
                                                        fontSize: "28rpx",
                                                        color: "#ffffff",
                                                        fontWeight: "600"
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: "view",
                                    css: {
                                        width: "750rpx",
                                        height: "240rpx",
                                        position: "absolute",
                                        bottom: "0",
                                        left: "0",
                                        display: "flex",
                                        alignItems: "center"
                                    },
                                    views: [{
                                        type: "text",
                                        text: this.$t('invite.t7') + "：" + (this.userinfo['invite_code'] ? this.userinfo['invite_code'] : ''),
                                        css: {
                                            marginRight: "20rpx",
                                            fontSize: "32rpx",
                                            color: "#ffffff",
                                            fontWeight: "600",
                                            position: 'absolute',
                                            left: "30rpx",
                                            top: "115rpx"
                                        }
                                    },
                                        {
                                            type: "view",
                                            css: {
                                                width: "170rpx",
                                                height: "170rpx",
                                                background: "#ffffff",
                                                borderRadius: "8rpx",
                                                position: 'absolute',
                                                right: "30rpx",
                                                top: "50rpx"
                                            },
                                            views: [{
                                                text: config['DOMAIN'] + '/#/s?code=' + (this.userinfo['invite_code'] ? this.userinfo['invite_code'] : ''),
                                                type: "qrcode",
                                                css: {
                                                    background: "#FFFFFF",
                                                    color: "#000000",
                                                    width: "165rpx",
                                                    height: "165rpx",
                                                    marginLeft: "2rpx",
                                                    marginTop: "2rpx"
                                                }
                                            }]
                                        }]
                                }
                            ]
                        }
                    ],
                }
                uni.hideTabBar();
                this.shareVisible = true;
                this.$refs.dpainter.render(poster).then(res => {
                    this.$refs.loading.close();
                })
            }, 100)
        },
        copyUrl() {
            uni.setClipboardData({
                data: config['DOMAIN'] + '/#/s?code=' + (this.userinfo['invite_code'] ? this.userinfo['invite_code'] : ''),
                success() {
                    uni.showToast({
                        title: "success",
                        icon: "success"

                    })
                }
            })
        },
        renderSuccess(e) {
            sharePath = e;
        },
        sharePoser() {
            const bitmap = new plus.nativeObj.Bitmap("test");
            bitmap.loadBase64Data(sharePath, function () {
                const url = "/ABT/" + new Date().getTime() + ".png";  // url为时间戳命名方式
                bitmap.save(url, {
                    overwrite: true,  // 是否覆盖
                    // quality: 'quality'  // 图片清晰度
                }, (i) => {
                    uni.shareWithSystem({
                        type: "image",
                        imageUrl: url
                    });

                });
            });
        },
        savePoster() {
            const bitmap = new plus.nativeObj.Bitmap("test");
            let _this = this;
            bitmap.loadBase64Data(sharePath, function () {
                const url = "/ABT/" + new Date().getTime() + ".png";  // url为时间戳命名方式
                bitmap.save(url, {
                    overwrite: true,  // 是否覆盖
                    // quality: 'quality'  // 图片清晰度
                }, (i) => {
                    // uni.shareWithSystem({
                    //     type: "image",
                    //     imageUrl: url
                    // });
                    uni.saveImageToPhotosAlbum({
                        filePath: url,
                        success() {
                            uni.showToast({
                                title: 'success',
                                icon: 'success'
                            })
                        }
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
        hiddenKeybord() {
            uni.hideKeyboard();
        },
        setOrderHeight(arr) {
            try {
                if (this.isLogin && typeof arr !== 'undefined' && arr.length > 0) {
                    // const cardItem = uni.createSelectorQuery().in(this);
                    // cardItem.select("#cardItem").boundingClientRect((rect) => {
                    //     this.swiperHeight = (rect.height * (arr.length + 1)) + 140
                    // }).exec()
                    this.swiperHeight = arr.length * 340;
                } else {
                    this.swiperHeight = 680;
                }
            } catch (e) {
                console.log(e);
            }
        },
        hideCPV() {
            this.hiddenKeybord();
            setTimeout(() => {
                this.pindex = false;
                this.closePositionVisible = false;
            }, 250)
        },
        getPageHeight() {
            const pageQuery = uni.createSelectorQuery().in(this);
            pageQuery.select("#contractPage").boundingClientRect((res) => {
                console.log(res)
            }).exec()
        },
        onpullingdown(e) {
            if (this.refreshing) return;
            const mpd = Math.abs(e.pullingDistance);
            const mvh = Math.abs(e.viewHeight);
            this.refreshText = mpd > mvh ? this.$t('common.refer') : this.$t('common.refer')
        },
        onrefresh(e) {
            if (this.refreshing) return;
            this.refreshing = true;
            this.refText = false;
            setTimeout(() => {
                this.refreshing = false;
                this.refText = true;
                this.refreshText = this.$t('common.refer');
                uni.$emit('reconnect');
                this.getBalance();
                this.getPosition();
                this.subscribeDepth();
            }, 2000);
        },
        stopProfitLossClick(index) {
            this.pindex = index;
            this.pcurrency = this.drawList[this.drawList.findIndex((item) => item.id === this.position.position[index]['currency_id'])];
            this.plshow = true;
        },
        closePositionClick(index) {
            this.pcurrency = this.drawList[this.drawList.findIndex((item) => item.id === this.position.position[index]['currency_id'])];
            this.pindex = index;
            this.cpshow = true;
        },
        backhandClick(index) {
            this.pindex = index;
            let checked = uni.getStorageSync('fcopen');
            if (parseInt(checked) === 1) {
                this.stopOnOpen(true)
            } else {
                this.backhandShow = true;
            }
        },
        shareClick(index) {
            this.pindex = index;
            this.shareShow = true;
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
            this.$forceUpdate();
        },
        switchLanguage() {
            const tabContent = [
                this.$t('newcontract.t10'),
                this.$t('newcontract.t73'),
                this.$t('tab.assets')
            ]
            // 更新listTabs中每个对象的text属性
            this.listTabs.forEach((tab, index) => {
                tab.text = tabContent[index];
            });
        }
    }
}