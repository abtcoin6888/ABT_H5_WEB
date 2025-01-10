import emptyView from "@/components/emptyView/emptyView.vue";
import currencyApi from '/common/api/currency.js';
import slideButton from "@/components/slide-button/slide-button.vue"
import fwebsocket from "@/uni_modules/veo-uniwebsocket/js_sdk/Websocket.js";
import unifwebsocket from "@/uni_modules/veo-uniwebsocket/js_sdk/uniWebsocket.js";
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex';
import util from "@/common/util";
import fuiCheckbox from "@/components/firstui/fui-checkbox/fui-checkbox.vue";

export default {
    components: {
        fuiCheckbox,
        slideButton,
        emptyView
    },
    data() {
        return {
            showList: 0,//没有自选数据
            symbolIndex: 0,
            navTabs: [
                this.$t('index.tab_t1'),
                this.$t('index.spot'),
                this.$t('index.popup_c')
            ],
            containerHeight: "",
            scrollHeight: null,
            headHeight: "",
            tradeLabel: [],
            currency: [],
            contract: [],
            contractLabel: [],
            tradeActive: 0,
            active: 0,
            mList: [],//自选数据列表
            futureMine: [],
            spotMine: [],
            sindex: 0,
            sort: [
                {
                    type: 0,
                    id: 0,
                    text: this.$t('index.name'),
                    active: "/static/img/z-nomal.png",
                    img: "/static/img/z-nomal.png",
                    up: "/static/img/z-up-sms.png",
                    down: "/static/img/z-down-sms.png"
                },
                {
                    type: 0,
                    id: 1,
                    text: '24h' + this.$t('index.turnover'),
                    active: "/static/img/z-nomal.png",
                    img: "/static/img/z-nomal.png",
                    up: "/static/img/z-up-sms.png",
                    down: "/static/img/z-down-sms.png"
                },
                {
                    type: 0,
                    id: 2,
                    text: this.$t('index.latest_price'),
                    active: "/static/img/z-nomal.png",
                    img: "/static/img/z-nomal.png",
                    up: "/static/img/z-up-sms.png",
                    down: "/static/img/z-down-sms.png"
                },
                {
                    type: 0,
                    id: 3,
                    text: this.$t('index.quote_change'),
                    active: "/static/img/z-nomal.png",
                    img: "/static/img/z-nomal.png",
                    up: "/static/img/z-up-sms.png",
                    down: "/static/img/z-down-sms.png"
                }
            ],
            options: [this.$t('index.spot'), this.$t('index.popup_c')],

            findex: 0,
            symbol: this.$util.getLCS(),
            symbol_rate: this.$util.getLCR(),
            timer: null,
            subSwiperDuration: 300
        }
    },
    onReady() {
        this.getTradeMatches();
        this.getContractMatches();
        this.getTradeSelect();

        this.getTradeMatches();
        uni.$on('trades', (data) => {
            this.onTradeMessage(data);
        });
        this.getContractMatches();
        uni.$on('contract', (data) => {
            this.onContractMessage(data);
        });
        let _this = this;
        uni.$on('addSelect', () => {
            if (_this.symbolIndex === 0) {
                _this.getTradeSelect();
            } else {
                _this.getContractSelect();
            }
        });

        uni.$on('switchLan', (data) => {
            this.options = [this.$t('index.spot'), this.$t('index.popup_c')];
            this.navTabs = [
                this.$t('index.tab_t1'),
                this.$t('index.spot'),
                this.$t('index.popup_c')
            ];
            this.getTradeMatches();
            this.getContractMatches();
        })

        // uni.$on('contract',(data)=>{
        // 	_this.ContractMessage(data);
        // })
    },
    computed: {
        ...mapGetters(['userTheme', 'lang']),
    },
    watch: {
        symbolIndex(v) {
            if (v === 0) {
                this.getTradeSelect();
            } else {
                this.getContractSelect();
            }
        }
    },
    onShow() {
        var load = uni.getStorageSync('load');
        if (load == 1) {
            if (this.symbolIndex == 0) {
                this.getTradeSelect();
            } else {
                this.getContractSelect();
            }
            uni.removeStorageSync('load');
        }

        this.setTabbarLanguage();
        this.setTabText();
    },
    mounted() {
        this.setRate();
    },
    beforeUnmount() {
        this.clearTimers();
    },
    methods: {
        setRate() {
            this.timer = setInterval(() => {
                uni.$on('currency', () => {
                    this.symbol = util.getLCS();
                    this.symbol_rate = util.getLCR();
                });
                uni.$on('contract', (data) => {
                    this.onContractMessage(data);
                })
            }, 60000)
        },
        clearTimers() {
            clearInterval(this.timer);
        },
        navInit(e) {
            const navHeiht = e.height - e.statusBarHeight;
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            this.containerHeight = windowHeight - navHeiht;
            if (this.showList === 0) {
                this.scrollHeight = this.containerHeight - 142;
            } else {
                this.scrollHeight = this.containerHeight - 230;
            }
        },
        onContractMessage(data) {
            if (data.type === 200) {
                if (this.active === 2 && this.contract.length > 0) {
                    this.contract[0]['currency'] = this.$util.compareCurrency(this.contract[0]['currency'], data.data);
                }
                if (this.symbolIndex === 1) {
                    if (this.mList.length === 0) {
                        this.contract[0]['currency'] = this.$util.compareCurrency(this.contract[0]['currency'], data.data);
                    } else {
                        this.mList = this.$util.compareCurrency(this.mList, data.data);
                        this.futureMine = this.$util.compareCurrency(this.futureMine, data.data);
                    }
                }
            }
            if (data.type === 500) {
                this.contract[2]['currency'] = this.$util.compareCurrency(this.contract[2]['currency'], data.data.data);
            }
        },
        onTradeMessage(data) {
            if (data.type != 100) {
                return false;
            }
            //接收现货行情数据
            if (this.active == 0 && this.symbolIndex == 0) {
                try {
                    if (this.mList.length === 0) {
                        this.currency = this.$util.compareCurrency(this.currency, data.data);
                    } else {
                        this.mList = this.$util.compareCurrency(this.mList, data.data);
                        this.spotMine = this.$util.compareCurrency(this.spotMine, data.data);
                        this.$forceUpdate();
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.active == 1) {
                try {
                    this.currency = this.$util.compareCurrency(this.currency, data.data);
                    this.$forceUpdate();
                } catch (e) {
                    console.log(e);
                }
            }
        },
        async getContractMatches() {
            //let matches = uni.getStorageSync('contract-matches');
			let matches = '';
            if (matches == '' || typeof matches == 'undefined') {
                matches = await currencyApi.contractCurrencyList();
                uni.setStorageSync('contract-matches', matches.data);
                matches = matches.data;
            }
            var label = [];
            for (var i = 0; i < matches.length; i++) {
                label.push(matches[i]['title'][this.lang]);
            }
            this.contract = matches;
			console.log(this.contract)
            this.contractLabel = label;
        },
        async getTradeMatches() {
            //let currency = uni.getStorageSync('trade-currency');
			let currency = '';
            if (currency == '' || typeof currency == 'undefined') {
                currency = await currencyApi.tradeCurrencyList();
                uni.setStorageSync('trade-currency', currency.data);
                currency = currency.data;
            }
            var label = [];
            for (var i = 0; i < currency.length; i++) {
                label.push(currency[i]['title'][this.lang])
            }
            console.log(this.lang, this.tradeLabel);
            this.tradeLabel = label;
            this.currency = currency[0]['currency'];
        },
        getContractSelect() {
            var mlist = uni.getStorageSync('select-contract');
            if (typeof mlist != 'undefined' && mlist.length > 0) {
                this.showList = 1;
                this.mList = mlist;
            } else {
                this.showList = 0;
                this.mList = [];
            }
        },
        getTradeSelect() {
            var mlist = uni.getStorageSync('select-trade');
            if (typeof mlist != 'undefined' && mlist.length > 0) {
                this.showList = 1;
                this.mList = mlist;
            } else {
                this.showList = 0;
                this.mList = [];
            }
        },
        selectMine() {
            //自选设置
            let mlist = [];
            if (this.symbolIndex === 0) {
                //现货自选
                for (let i = 0; i < this.currency.slice(0, 10).length; i++) {
                    if (typeof this.currency[i]['select'] == 'undefined' || !this.currency[i]['select']) {
                        mlist.push(this.currency[i]);
                    }
                }
            } else {
                //合约自选
                for (let i = 0; i < this.contract[0]['currency'].slice(0, 10).length; i++) {
                    if (typeof this.contract[0]['currency'][i]['select'] === 'undefined' || !this.contract[0]['currency'][i]['select']) {
                        mlist.push(this.contract[0]['currency'][i]);
                    }
                }
                // this.contract[0]['currency'].map((item)=>{
                // 	if(typeof item['select'] === 'undefined' || !item['select']){
                // 		mlist.push(item);
                // 	}
                // });
                // for (var i = 0; i < this.contract.length; i++) {
                //     if (typeof this.contract[i]['select'] == 'undefined' || !this.contract[i]['select']) {
                //         mlist.push(this.contract[i]);
                //     }
                // }
            }
            let key = '';
            if (this.symbolIndex === 0) {
                key = 'select-trade';
            } else {
                key = 'select-contract';
            }
            if (mlist.length > 0) {
                uni.setStorage({
                    key: key,
                    data: mlist
                });
                // this.showList = 1;
                // this.mList = mlist;
            }
            //自选添加事件
            uni.$emit('addSelect');
        },
        switchSort(index, sort) {
            this.sindex = sort;
            if (this.sort[index]['type'] == 0) {
                this.sort[index]['type'] = 1;
                this.sort[index]['active'] = this.sort[index]['down'];
                this.sortCurrency(index);
                return;
            }
            if (this.sort[index]['type'] == 1) {
                this.sort[index]['type'] = 2;
                this.sort[index]['active'] = this.sort[index]['up'];
                this.sortCurrency(index);
                return;
            }
            if (this.sort[index]['type'] == 2) {
                this.sort[index]['type'] = 0;
                this.sort[index]['active'] = this.sort[index]['img'];
                this.sortCurrency(index);
                return;
            }
        },
        sortCurrency(index) {
            if (this.active == 0) {
                var list = [...this.mList];
            }
            if (this.active == 1) {
                var list = [...this.currency];
            }
            if (this.active == 2) {
                var list = [...this.contract];
            }

            if (index == 0) {
                var field = 'symbol';
            }
            if (index == 1) {
                var field = 'quota';
            }
            if (index == 2) {
                var field = 'new_price';
            }
            if (index == 3) {
                var field = 'change_rate';
            }
            //现货自选排序
            if (this.sort[index]['type'] == 1) {
                //名称降序
                if (field === 'symbol') {
                    var result = list.sort((a, b) => (JSON.stringify(b[field])).localeCompare(a[field], 'en', { numeric: field == 'symbol' ? false : true }))
                } else {
                    var result = list.sort((a, b) => b[field] - a[field]);
                }

            }
            if (this.sort[index]['type'] == 2) {
                //名称升序
                if (field === 'symbol') {
                    var result = list.sort((a, b) => (JSON.stringify(b[field])).localeCompare(a[field], 'en', { numeric: field == 'symbol' ? false : true }))
                } else {
                    var result = list.sort((a, b) => a[field] - b[field]);
                }
            }
            if (this.sort[index]['type'] == 0) {
                //名称升序
                var result = list.sort((a, b) => a.id - b.id)
            }
            if (this.active == 0) {
                this.mList = result;
            }
            if (this.active == 1) {
                this.currency = result;
            }
            if (this.active == 2) {
                this.contract = result;
            }
            this.$forceUpdate();
        },
        toKline(cu_id, cm_id, type = 0) {
            uni.navigateTo({
                url: "/pages/trade/kline?id=" + cu_id + "&cid=" + cm_id + "&type=" + type
            })
        },
        selectItem(e) {
            console.log(e.select)
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
        swiperChange(e) {
            this.active = e.detail.current;
        },
        subtabChange(e) {
            this.symbolIndex = e;
            this.subSwiperDuration = 0;
        }
    }
}