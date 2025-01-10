import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
import fuiTabs from "@/components/firstui/fui-tabs/fui-tabs.vue"
import fuiIcon from "@/components/firstui/fui-icon/fui-icon.vue"
import fuiDropdownMenu from "@/components/firstui/fui-dropdown-menu/fui-dropdown-menu.vue"
import fuiSpin from "@/components/firstui/fui-spin/fui-spin.vue"
import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue"
import fuiSkeleton from "@/components/firstui/fui-skeleton/fui-skeleton.vue"
import fuiBottomPopup from "@/components/firstui/fui-bottom-popup/fui-bottom-popup.vue"
import emptyView from "@/components/emptyView/emptyView.vue";
import {
    initVueI18n
} from '@dcloudio/uni-i18n'
//多语言
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
import userApi from '@/common/api/user.js';
import commonApi from '@/common/api/common.js';
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex';

var currency;
var init = 0;

let profit = false;
let profitSet = false;

export default {
    components: {
        fuiNavBar,
        fuiTabs,
        fuiIcon,
        fuiDropdownMenu,
        fuiSpin,
        fuiEmpty,
        fuiSkeleton,
        fuiBottomPopup,
        emptyView
    },
    data() {
        return {
            bodyHeight: "",
            windowHeight: uni.getSystemInfoSync().windowHeight,
            tabCurrent: 0,
            tabOption: [
                this.$t('wallete.overview'),
                this.$t('wallete.funding'),
                this.$t('wallete.spot'),
                this.$t('wallete.futures'),
                //this.$t('wallete.t6'),
                this.$t('wallete.options'),
                this.$t('wallete.earn'),
            ],
            strategyTabs: [
                this.$t('wallete.t11'),
                this.$t('wallete.t12'),
            ],
            strategyTabIndex: 0,
            duration: 0,
            assetsDisplay: true,
            downMenu: [
                {
                    text: "USD",
                    texts: this.$t('setup.usd'),
                    color: '#000000',
                    value: "USD",
                    symbol: "$",
                    checked: true
                },
				{
				    text: "GBP",
				    texts: this.$t('setup.gbp'),
				    color: '#000000',
				    value: "GBP",
				    symbol: "￡",
				    checked: false
				},
                {
                    text: "CNY",
                    texts: this.$t('setup.cny'),
                    color: '#000000',
                    value: "CNY",
                    symbol: "¥",
                    checked: false
                },
                {
                    text: "JPY",
                    texts: this.$t('setup.jpy'),
                    color: '#000000',
                    value: "JPY",
                    symbol: "¥",
                    checked: false
                },
                {
                    text: "EUR",
                    texts: this.$t('setup.eur'),
                    color: '#000000',
                    value: "EUR",
                    symbol: "€",
                    checked: false
                },
                {
                    text: "INR",
                    texts: this.$t('setup.inr'),
                    color: '#000000',
                    value: "INR",
                    symbol: "€",
                    checked: false
                },
            ],
            range: "USD",
            rangeShow: false,
            timeActive: 0,
            timeGroup: ["7", "15", "30"],
            chartShow: false,
            chartType: 0,
            distribution: false,
            refreshText: this.$t('common.refer'),
            refreshing: false,
            showZero: false,
            // 骨架
            conPreloadList: [{
                left: 15,
                top: 15,
                width: 35,
                height: 35,
                type: 'rect'
            }, {
                left: 58,
                top: 15,
                width: 70,
                height: 35,
                type: 'rect'
            }, {
                left: 300,
                top: 15,
                width: 70,
                height: 15,
                type: 'rect'
            }, {
                left: 300,
                top: 35,
                width: 70,
                height: 12,
                type: 'rect'
            }, {
                left: 15,
                top: 75,
                width: 35,
                height: 35,
                type: 'rect'
            }, {
                left: 58,
                top: 75,
                width: 70,
                height: 35,
                type: 'rect'
            }, {
                left: 300,
                top: 75,
                width: 70,
                height: 15,
                type: 'rect'
            }, {
                left: 300,
                top: 95,
                width: 70,
                height: 12,
                type: 'rect'
            }, {
                left: 15,
                top: 135,
                width: 35,
                height: 35,
                type: 'rect'
            }, {
                left: 58,
                top: 135,
                width: 70,
                height: 35,
                type: 'rect'
            }, {
                left: 300,
                top: 135,
                width: 70,
                height: 15,
                type: 'rect'
            }, {
                left: 300,
                top: 155,
                width: 70,
                height: 12,
                type: 'rect'
            },],
            tendTip: false,
            list: [],
            total: "0.00",
            trade: "0.00",
            contract: '0.00',
            future: "0.00",
            finance: '0.00',
            balance: '0.00',
            strategy: '0.00',
			dayProfit:0,
            keyword: "",
            symbol: util.getLCS(),
            symbol_rate: util.getLCR(),
            util: util,
            mroute: mroute,
            profit: false,
            profitList: [],

            preferenceVisble: false
        }
    },
    onTabItemTap(e) {
        if (!this.isLogin && init === 0) {
            init = 1;
            return mroute.login();
        } else {
            this.getBalance();
        }
    },
    onReady() {
		if(this.isLogin){
			this.getBalance();
		}
        this.getLocalCurrency();
        uni.$on('currency', () => {
            this.symbol = util.getLCS();
            this.symbol_rate = util.getLCR();
        });
        uni.$on('switchLan', () => {
            var lang = uni.getStorageSync('lang');
            if (typeof lang != 'undefined' && lang != '') {
                i18n.setLocale(lang);
                this.setTabText();
            }
        });
		
		var _this = this;
		uni.$on('on_position',()=>{
			_this.watchProfit()
		})

        uni.$on('no_position', () => {
			uni.$off('profit');
			clearInterval(profitSet);
			profitSet = false;
            _this.profit = false;
            _this.getBalance();
        });
    },
    computed: {
        ...mapGetters(['isLogin', 'userTheme']),
    },
    watch: {
        preferenceVisble(v) {
            if (v) {
                this.hideTabBar();
            } else {
                this.showTabbar();
            }
        },
        tendTip(v) {
            if (v) {
                this.hideTabBar();
            } else {
                this.showTabbar();
            }
        },
        showZero(v) {
            if (v == true) {
                this.list = currency.filter((item) => {
                    if (this.tabCurrent == 1 && parseFloat(item.trade_balance) > 0) {
                        return true;
                    }
                    if (this.tabCurrent == 2 && parseFloat(item.trade_balance) > 0) {
                        return true;
                    }
                    if (this.tabCurrent == 3 && parseFloat(item.contract_balance) > 0) {
                        return true;
                    }
                    if (this.tabCurrent == 4 && parseFloat(item.strategy_balance) > 0) {
                        return true;
                    }
                    if (this.tabCurrent == 5 && parseFloat(item.future_balance) > 0) {
                        return true;
                    }
                    if (this.tabCurrent == 6 && parseFloat(item.finance_balance) > 0) {
                        return true;
                    }
                    return false;
                });
            } else {
                this.list = currency;
            }
        },
        tabCurrent(v) {
            if (this.showZero == true) {
                this.list = currency.filter((item) => {
                    if (this.tabCurrent == 1 && parseFloat(item.trade_balance) > 0) {
                        return true;
                    }
                    if (this.tabCurrent == 2 && parseFloat(item.trade_balance) > 0) {
                        return true;
                    }
                    if (this.tabCurrent == 3 && parseFloat(item.contract_balance) > 0) {
                        return true;
                    }
                    if (this.tabCurrent == 4 && parseFloat(item.strategy_balance) > 0) {
                        return true;
                    }
                    if (this.tabCurrent == 5 && parseFloat(item.future_balance) > 0) {
                        return true;
                    }
                    if (this.tabCurrent == 6 && parseFloat(item.finance_balance) > 0) {
                        return true;
                    }
                    return false;
                });
            } else {
                this.list = currency;
            }
        },
        chartShow(v) {
            if (v === true) {
                this.getAssetsGroup();
            }
        },
        timeActive(v) {
            this.getAssetsGroup();
        },
        distribution(v) {
            if (v === true) {
                setTimeout(() => {
                    this.setChartData()
                }, 300);
            }
        }
    },
    mounted() {
        // setTimeout(() => {
        //     if (this.showZero == true) {
        //         this.list = currency.filter((item) => {
        //             if (this.tabCurrent == 1 && parseFloat(item.trade_balance) > 0) {
        //                 return true;
        //             }
        //             if (this.tabCurrent == 2 && parseFloat(item.trade_balance) > 0) {
        //                 return true;
        //             }
        //             if (this.tabCurrent == 3 && parseFloat(item.contract_balance) > 0) {
        //                 return true;
        //             }
        //             if (this.tabCurrent == 4 && parseFloat(item.strategy_balance) > 0) {
        //                 return true;
        //             }
        //             if (this.tabCurrent == 5 && parseFloat(item.future_balance) > 0) {
        //                 return true;
        //             }
        //             if (this.tabCurrent == 6 && parseFloat(item.finance_balance) > 0) {
        //                 return true;
        //             }
        //             return false;
        //         });
        //     } else {
        //         this.list = currency;
        //     }
        // }, 1500);
    },
    methods: {
		watchProfit(){
			var _this = this;
			uni.$on('profit', (id, amount) => {
			    profit = parseFloat(amount);
				if(!profitSet){
					profitSet = setInterval(()=>{
						_this.profit = profit;
					},1000);
			
				}
			});
		},
        getAssetsGroup() {
            commonApi.getAssetsGroup(this.timeGroup[this.timeActive]).then(res => {
                this.$refs.assetsWebview.evalJs("setData('" + JSON.stringify(res.data) + "')");
            });
        },
        setChartData() {
            var data = [
                {
                    name: this.$t('wallete.funding') + "        " + parseFloat(this.balance / this.total * 100).toFixed(2) + "%",
                    value: this.balance
                },
                {
                    name: this.$t('wallete.spot') + "        " + parseFloat(this.trade / this.total * 100).toFixed(2) + "%",
                    value: this.trade
                },
                {
                    name: this.$t('wallete.futures') + "        " + parseFloat(this.contract / this.total * 100).toFixed(2) + "%",
                    value: this.contract
                },
                {
                    name: this.$t('wallete.options') + "        " + parseFloat(this.future / this.total * 100).toFixed(2) + "%",
                    value: this.future
                },
                {
                    name: this.$t('wallete.earn') + "        " + parseFloat(this.finance / this.total * 100).toFixed(2) + "%",
                    value: this.finance
                }
            ];
            this.$refs.rateWebview.evalJs("setData('" + JSON.stringify(data) + "')");
        },
        getLocalCurrency() {
            var currency = uni.getStorageSync('local-currency');
            if (typeof currency != 'undefined' && currency != '') {
                // console.log(currency);
                this.range = currency.value;
                this.downMenu.map((item) => {
                    item['chekced'] = item.value === this.range;
                    return item;
                });
            }
        },
        search(v) {
            var symbol = v.detail.value;
            this.list = currency.filter(item => item.symbol != null && item.symbol.toLowerCase().includes(symbol.toLowerCase()))
        },
        getBalance() {
            userApi.getBalance().then(res => {
                try {
                    if (res.code == 200) {
                        var balance = 0;
                        var total = 0;
                        var trade = 0;
                        var contract = 0;
                        var future = 0;
                        var finance = 0;
                        var strategy = 0;
                        res.data.balance.map((item) => {
                            if (item.symbol === 'USDT') {
                                total += parseFloat(item.balance) + parseFloat(item.contract_balance) +
                                    parseFloat(item.finance_balance) + parseFloat(item.future_balance) +
                                    parseFloat(item.trade_balance);
                                balance += parseFloat(item.balance);
                                trade += parseFloat(item.trade_balance);
                                contract += parseFloat(item.contract_balance);
                                future += parseFloat(item.future_balance);
                                finance += parseFloat(item.finance_balance);
                                strategy += parseFloat(item.strategy_balance);

                            } else {
                                let new_price = parseFloat(item.new_price != null ? item.new_price : 0);
                                total += (parseFloat(item.balance) + parseFloat(item.contract_balance) +
                                    parseFloat(item.finance_balance) + parseFloat(item
                                        .future_balance) +
                                    parseFloat(item.trade_balance) + parseFloat(item.strategy_balance)) * new_price;

                                balance += parseFloat(item.balance) * new_price;
                                trade += parseFloat(item.trade_balance) * new_price;
                                contract += parseFloat(item.contract_balance) * new_price;
                                future += parseFloat(item.future_balance) * new_price;
                                finance += parseFloat(item.finance_balance) * new_price;
                                strategy += parseFloat(item.strategy_balance) * new_price;
                            }
                        });

                        this.total = total;
                        this.balance = balance;
                        this.trade = trade;
                        this.contract = contract;
                        this.future = future;
                        this.finance = finance;
                        this.strategy = strategy;
						

                        this.list = res.data.balance;
                        currency = res.data.balance;
						this.dayProfit = res.data.dayProfit;

                        if (this.showZero == true) {
                            this.list = currency.filter((item) => {
                                if (this.tabCurrent == 1 && parseFloat(item.trade_balance) > 0) {
                                    return true;
                                }
                                if (this.tabCurrent == 2 && parseFloat(item.trade_balance) > 0) {
                                    return true;
                                }
                                if (this.tabCurrent == 3 && parseFloat(item.contract_balance) > 0) {
                                    return true;
                                }
                                if (this.tabCurrent == 4 && parseFloat(item.strategy_balance) > 0) {
                                    return true;
                                }
                                if (this.tabCurrent == 5 && parseFloat(item.future_balance) > 0) {
                                    return true;
                                }
                                if (this.tabCurrent == 6 && parseFloat(item.finance_balance) > 0) {
                                    return true;
                                }
                                return false;
                            });
                        } else {
                            this.list = currency;
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        },
        navInit(e) {
            if (e.height) {
                this.bodyHeight = this.windowHeight - e.height - e.statusBarHeight;
                // console.log("导航栏初始化：");
                // console.log(e);
            }
        },
        tabChange(e) {
            if(!this.isLogin){
                return false
            }
            if(this.isLogin) {
                this.tabCurrent = e.index;
                this.duration = 0;
            }
        },
        transition() {
            this.duration = 300;
        },
        swiperChange(e) {
            this.tabCurrent = e.detail.current;
        },
        filterTap(e) {
            //this.rangeShow = true;
            this.$refs['ddmRange' + e].show()
        },
        rangeItemClick(e) {
            this.range = e.value
            this.preferenceVisble = false
            uni.setStorageSync('local-currency', e);
            this.$refs.loading.open();
            commonApi.getCurrencyFee(e.value).then(fee => {
                this.$refs.loading.close();
                if (fee.code == 200) {
                    uni.setStorageSync('local-fee', fee.data.tether[e.value.toLowerCase()]);
                    uni.$emit('currency');
                }
            }).catch((e) => {
                this.$refs.loading.close();
            })
            //this.rangeClose()
        },
        rangeClose() {
            this.rangeShow = false;
        },
        chartToggle(idx) {
            if (idx == 0) {
                this.chartShow = !this.chartShow;
                this.distribution = false
            } else {
                this.distribution = !this.distribution;
                this.chartShow = false;
            }
        },
        onpullingdown(e) {
            if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
                this.refreshText = "loading"
            } else {
                this.refreshText = this.$t('common.refer')
            }
        },
        onrefresh(e) {
            this.refreshing = true;
            this.refreshText = "loading more"
            setTimeout(() => {
                this.refreshing = false;
                this.refreshText = this.$t('common.refer')
                this.getBalance();
            }, 2000)
        },
        tipShow() {
            this.hideTabBar();
            setTimeout(() => {
                this.tendTip = !this.tendTip;
            }, 200)
        },
        closePopup() {
            this.tendTip = false;
            this.preferenceVisble = false;
            setTimeout(() => {
                this.showTabbar();
            }, 200)
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
        toAnalyze(){
            uni.navigateTo({
                url: "/pages/wallet/analyze/analyze",
            });
        }
    },
}