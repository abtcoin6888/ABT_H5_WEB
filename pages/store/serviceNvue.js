import fuiTabs from "@/components/firstui/fui-tabs/fui-tabs.vue"
import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue"
import fuiCheckboxGroup from "@/components/firstui/fui-checkbox-group/fui-checkbox-group.vue"
import fuiCheckbox from "@/components/firstui/fui-checkbox/fui-checkbox.vue"
import fuiLabel from "@/components/firstui/fui-label/fui-label.vue"
import emptyView from "@/components/emptyView/emptyView.vue";

import currencyApi from '@/common/api/currency.js'
import mroute from '@/common/route.js'
import util from '@/common/util.js'
import fwebsocket from "@/uni_modules/veo-uniwebsocket/js_sdk/Websocket.js";

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

import {
    mapGetters,
    mapMutations
} from 'vuex';


export default {
    components: {
        fuiTabs,
        fuiTag,
        fuiCheckboxGroup,
        fuiCheckbox,
        fuiLabel,
        emptyView
    },
    data() {
        return {
            mroute: mroute,
            util: util,
            symbol: util.getLCS(),
            symbol_rate: util.getLCR(),
            windowHeight: uni.getSystemInfoSync().windowHeight,
            statusBarHeight: plus.navigator.getStatusbarHeight(),
            containerHeight: "",
            scrollHeight: "",
            titleBarActive: 0,
            subActive: 0,
            addPact: false,
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
            showList: 0,//没有自选数据
            symbolIndex: 0,
            tradeLabel: [],
            currency: [],
            contract: [],
            spotMine:[],
            futureMine:[],
            contractLabel: [],
            tradeActive: 0,
            active: 0,
            mList: [],//自选数据列表
            sindex: 0,
            tabOption: [],
            subTag: [],
            subTabIndex: 0,
            timer: null
        }
    },
    computed: {
        ...mapGetters(['userTheme', 'lang']),
    },
    onReady() {
        this.setTab();
        this.getTradeMatches();
        this.getContractMatches();
        this.getTradeSelect();
        this.setTabbarBg();
        uni.$on('switchLan', () => {
            let lang = uni.getStorageSync('lang');
            if (typeof lang != 'undefined' && lang !== '') {
                i18n.setLocale(lang);
                this.setTabText(); //设置tabbar文字
            }
            this.setTab();
        });
        uni.$on('currency', () => {
            this.symbol = util.getLCS();
            this.symbol_rate = util.getLCR();
        });
        uni.$on('contract', (data) => {
            this.onContractMessage(data);
        })
        // setInterval(()=>{
        //     if(fwebsocket.prototype.getStatus() === 0){
        //         this.getContractMatches();
        //         uni.$on('contract', (data) => {
        //             this.onContractMessage(data);
        //         });
        //     }
        // },1000)
    },
    onShow() {

        //this.getContractMatches();
        uni.switchTab({
            url: "pages/store/store"
        })
    },
    watch: {
        subActive(v) {
            this.symbolIndex = v;
            if (v === 0) {
                this.getTradeSelect();
            } else {
                this.getContractSelect();
            }
        }
    },
    mounted() {
        // this.setRate();
    },
    onTabItemTap(e){
        var load = uni.getStorageSync('load');
        if (load === 1) {
            if (this.symbolIndex === 0) {
                this.getTradeSelect();
            } else {
                this.getContractSelect();
            }
            uni.removeStorageSync('load');
        }
    },
    beforeUnmount() {
        this.clearTimers();
    },
    onHide(){
        console.log('page hidden');
        try{
            uni.setStorageSync('select-trade',this.spotMine);
            uni.setStorageSync('select-contract',this.futureMine);

            let tradeMatches = uni.getStorageSync('trade-currency');
            tradeMatches[0]['currency'] = this.currency;

            uni.setStorageSync('trade-currency',tradeMatches);

            uni.setStorageSync('contract-matches',this.contract);
        }catch(e){}

        // this.getTradeMatches(false);
        // this.getContractMatches(false);
    },
    methods: {
        ...mapMutations(['setTabbarBg']),
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
                if (this.titleBarActive === 2 && this.contract.length > 0) {
                    this.contract[0]['currency'] = util.compareCurrency(this.contract[0]['currency'], data.data);
                    // const index = this.contract.findIndex(item => item.id == data.data.currency_id);
                    // this.contract[index]['new_price'] = data['data']['data']['c'];
                    // this.contract[index]['change_rate'] = data['data']['data']['P'];
                    // this.contract[index]['quantity'] = data['data']['data']['v'];
                }
                if (this.subActive === 1 && this.futureMine.length > 0) {
                    this.futureMine = util.compareCurrency(this.futureMine, data.data);
                    // const index = this.mList.findIndex(item => item.id == data.data.currency_id);
                    // this.mList[index]['new_price'] = data['data']['data']['c'];
                    // this.mList[index]['change_rate'] = data['data']['data']['P'];
                    // this.mList[index]['quantity'] = data['data']['data']['v'];
                }
            }

            if (data.type === 500) {
                this.contract[2]['currency'] = util.compareCurrency(this.contract[2]['currency'], data.data.data);
            }
        },
        onTradeMessage(data) {
            if (data.type !== 100) {
                return false;
            }
            //接收现货行情数据
            if (this.titleBarActive == 0 && this.subActive == 0) {
                this.spotMine = util.compareCurrency(this.spotMine, data.data);
                // const index = this.mList.findIndex(item => item.id == data.currency_id);
                // this.mList[index]['new_price'] = data['data']['c'];
                // this.mList[index]['change_rate'] = data['data']['P'];
            }
            this.currency = util.compareCurrency(this.currency, data.data);
            this.$forceUpdate();
        },
        async getContractMatches(flag = true) {
            let matches = uni.getStorageSync('contract-matches');
            if (matches === '' || typeof matches == 'undefined') {
                matches = await currencyApi.contractCurrencyList();
                uni.setStorageSync('contract-matches', matches.data);
                matches = matches.data;
            }
            // let matches = await currencyApi.contractCurrencyList();
            // uni.setStorageSync('contract-matches', matches.data);
            // matches = matches.data;
            let label = [];
            for (let i = 0; i < matches.length; i++) {
                label.push(matches[i]['title']);
            }
            // this.futuresSubTab = label
            if(Array.isArray(matches)){
                this.contract = matches;
            }else if(typeof matches === 'object'){
                this.contract = [matches];
            }
            //matches[0]['currency'];
            //console.log(this.contract);
            let mlist = uni.getStorageSync('select-contract');
            if (typeof mlist != 'undefined' && mlist.length > 0) {
                this.futureMine = mlist;
            }
        },
        async getTradeMatches(flag = true) {
            let currency = uni.getStorageSync('trade-currency');
            if (currency == '' || typeof currency == 'undefined' || flag == false) {
                currency = await currencyApi.tradeCurrencyList();
                uni.setStorageSync('trade-currency', currency.data);
                currency = currency.data;
            }
            var label = [];
            for (var i = 0; i < currency.length; i++) {
                label.push(currency[i]['title'])
            }
            this.tradeLabel = label;
            this.currency = currency[0]['currency'];
            //console.log(currency);
            //设置现货的自选数据
            var mlist = uni.getStorageSync('select-trade');
            if (typeof mlist != 'undefined' && mlist.length > 0) {
                this.spotMine = mlist;
            }
        },
        getContractSelect() {
            let mlist = uni.getStorageSync('select-contract');
            if (typeof mlist != 'undefined' && mlist.length > 0) {
                this.futureMine = mlist;
            } else {
                this.futureMine = [];
            }
        },
        getTradeSelect() {
            var mlist = uni.getStorageSync('select-trade');
            if (typeof mlist != 'undefined' && mlist.length > 0) {
                this.spotMine = mlist;
            } else {
                this.spotMine = [];
            }
            this.getContractSelect();
        },
        onChangeCurrencySelect(index,value){
            this.currency[index]['select'] = !value;
            console.log(this.currency[index]['select']);
        },
        selectMine() {
            //自选设置
            let mlist = [];
            if (this.subActive === 0) {
                //现货自选
                for (let i = 0; i < 6; i++) {
                    if(this.currency[i]){
                        if (typeof this.currency[i]['select'] == 'undefined' || !this.currency[i]['select']) {
                            mlist.push(this.currency[i]);
                        }
                    }
                }
                if(mlist.length > 0){
                    this.spotMine = mlist;
                }
            } else {
                //合约自选
                for(let i = 0 ; i < 6;i++){
                    if(this.contract[0]['currency'][i]){
                        if (typeof this.contract[0]['currency'][i]['select'] == 'undefined' || !this.contract[0]['currency'][i]['select']) {
                            mlist.push(this.currency[i]);
                        }
                    }
                }
                if(mlist.length > 0){
                    this.futureMine = mlist;
                }
                // this.contract[0]['currency'].map((item) => {
                //     if (typeof item['select'] == 'undefined' || !item['select']) {
                //         mlist.push(item);
                //     }
                // });
            }
            let key = '';
            if (this.subActive === 0) {
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
            uni.$emit('addSelect');
        },
        switchSort(index, field) {
            // this.sindex = sort;
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
            let list = [];
            if (this.titleBarActive === 0) {
                list = this.subActive === 0 ? [  ...this.spotMine ] : [ ...this.futureMine ];
            }
            if (this.titleBarActive === 1) {
                list = [...this.currency];
            }
            if (this.titleBarActive === 2) {
                list = [...this.contract[this.subTabIndex]['currency']];
            }

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
            if (this.titleBarActive === 0) {
                if(this.subActive === 0 ){
                    this.spotMine = list;
                }else{
                    this.futureMine = list;
                }
            }
            if (this.titleBarActive === 1) {
                this.currency = list;
            }
            if (this.titleBarActive === 2) {
                this.contract[this.subTabIndex]['currency'] = list;
            }
        },
        setTab() {
            this.tabOption = [this.$t("自选"), this.$t("现货"), this.$t("合约")];
            this.subTag = [this.$t("现货"), this.$t("合约")];
        },
        swiperChange(e) {
            this.titleBarActive = e.detail.current;
            this.showList = e.detail.current;
        },
        subSwiperChange(e) {
            this.subActive = e.detail.current;
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
            this.$forceUpdate();
        },
    }
}