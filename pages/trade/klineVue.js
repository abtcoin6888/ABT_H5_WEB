import timeIndex from "@/common/timeIndex.js";

import {mapGetters} from 'vuex';
import currencyApi from "@/common/api/currency.js";

import emptyView from "@/components/emptyView/emptyView.vue";
import fwebsocket from "@/uni_modules/veo-uniwebsocket/js_sdk/Websocket.js";
import uniwebsocket from "@/uni_modules/veo-uniwebsocket/js_sdk/uniWebsocket.js";

var tindex = 0;
var history = null;

var chart;
var MAID;
var interval;
var last = {};

var decimals = 2;

const map = {
    "1s": 1,
    "1m": 60,
    "5m": 300,
    "15m": 900,
    "30m": 1800,
    "1H": 3600,
    "4H": 14400,
    "12H": 43200,
    "1D": 86400,
    "1W": 604800,
    "1Y": 60480000
};

import {init, dispose} from 'klinecharts'

export default {
    components: {
        emptyView
    },
    computed: {
        ...mapGetters(['userTheme','lang'])
    },
    data() {
        return {
            searchValue: "",
            tabactive: 0,
            overlay: {
                ma: false,
                ema: false,
                boll: false
            },
            time: [],
            timeIndex: 3,
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
            orderTab: [],
            odActive: 0,
            drawerShow: false,
            drawerTab: 0,
            currency: [],
            mlist: [],
            currencyInfo: {
				change_rate:0,
				symbol:"",
				new_price:"",
				decimals:"",
				high_price:""
			},
            symbol: this.$util.getLCS(),
            symbol_rate: this.$util.getLCR(),

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

            selectCoinIndex: 0,
            listTabs: [
                this.$t('kline.com_od'),
                this.$t('kline.rt_tr'),
                this.$t('kline.currency_info')
            ],
            kheight: '',
            history: false,
            them: "",
            ticker: false,
            fchart: "MA",
            indicator: ["VOL"],
            bar: false,
            collectType: false,
            timeId: "",
            klineBar:['MA','EMA','BOLL','VOL','MACD','KDJ','RSI'],
            scrollTop: 0,


            drawerNavHeight: "",
            show_cm_id: 0,
            drawerTabIndex: 0,
            drawerSwiperHeight: "",

            searchVal: "",

            dotWidth: "5",

            pageNavBarHeight: ""
        }
    },
    onLoad(e) {
        this.type = parseInt(e.type);
        this.currency_id = parseInt(e.id);
        this.cm_id = parseInt(e.cid);
        this.show_cm_id = parseInt(e.cid)
        this.drawerTabIndex = parseInt(e.type)
    },
    onReady() {
        if(this.cm_id === 1){
            this.getTradeCurrencyList();
            setTimeout(() => {
                this.tradeSubscribeDepth();
            }, 500);
        }else{
            this.getContractCurrency();
            setTimeout(() => {
                this.contractSubscribeDepth();
            }, 500);
        }
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
        this.time = timeIndex['time'].map((item) => {
            return this.$t(item);
        });
        this.kheight = this.$device.screenHeight - 400;

        this.$nextTick(()=>{
            this.getCurrencyInfo();
        })
		let _this = this;
		//console.log(uniwebsocket.prototype.getStatus())
        if (this.cm_id === 1) {
            uni.$on('trades', (data) => {
                this.onTradeMessage(data);
            });
            setInterval(()=>{
                this.tradeSubscribeDepth();
                if(getApp().globalData.socket.getStatus() === 0){
                    _this.tradeSubscribeDepth();
                }
            },1000)
        } else {
            uni.$on('contract', (data) => {
                this.onContractMessage(data);
            })
            setInterval(()=>{
                if(uniwebsocket.prototype.getStatus() === 0){
                    uni.$on('contract', (data) => {
                        this.onContractMessage(data);
                    });
                }
            },1000)
        }
    },
    onShow() {
        var barStyle = uni.getStorageSync('local-kline');
        if (typeof barStyle != 'undefined' && barStyle != '') {
            this.bar = barStyle;
        }

        this.them = uni.getStorageSync('mthem');
		this.them = this.userTheme;
    },
    watch: {
        timeIndex(index) {
            var symbol = '';
            if (index === 0) {
                symbol = '1s';
            } else {
                symbol = timeIndex['time'][index];
            }
            this.loadHistory(this.currency_id, symbol);
        }
    },
    methods: {
        navBarInit(e){
            this.pageNavBarHeight = e.height + e.statusBarHeight;
        },
        drawerNavInit(e){
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            this.drawerNavHeight = e.height + e.statusBarHeight;
            this.drawerSwiperHeight = windowHeight - this.drawerNavHeight - 72;
        },
        // collect自选收藏
        collect() {
            this.collectType = !this.collectType;
        },
        klineTime(e){
           this.$nextTick(()=>{
               this.timeIndex = e;
           })
        },
        bodyScroll(e){
            this.scrollTop = e.detail.scrollTop;
        },
        addIndicator(v) {
            var flag = this.indicator.includes(v);
            if (flag) {
                this.indicator.splice(this.indicator.indexOf(v), 1);
            } else {
                this.indicator.push(v);
            }
            // #ifdef H5
            var pages = getCurrentPages();
            pages[pages.length - 1].switchCharts(this.indicator);
            // #endif
        },
        search() {
        },
        input() {
        },
        createCharts() {
            this.loadHistory(this.currency_id, '15m');
        },
        loadHistory(currency_id, _interval) {
            let interval = _interval;
            let data = {
                interval: interval,
                currency_id: currency_id,
                limit: 1000,
                cm_id : this.cm_id,
                type : this.type
            };
            let _this = this;
            this.$refs.loading.open();
            currencyApi.contractLine(data).then(res => {
                this.$refs.loading.close();
                if (res.code === 200) {
                    _this.history = {data: res, interval: _this.timeIndex};
                    _this.time.map((item,index)=>{
                        if(item.toLowerCase() === interval.toLowerCase()){
                            _this.timeIndex = index;
                        }
                    });
                }
            }).catch((e)=>{
                this.$refs.loading.close();
            });
            console.log(_this.timeIndex)
            console.log({interval: _this.timeIndex})
        },
        getCurrencyInfo(flag = true) {
            currencyApi.getCurrencyInfo(this.currency_id, this.cm_id,this.type).then(res => {
                this.currencyInfo = res.data;
                if (flag) {
                    this.createCharts();
                }

                if (this.currencyInfo.currency_info !== '') {
                    if(this.currencyInfo['currency_info']){
                        this.info = JSON.parse(this.currencyInfo['currency_info']);
                    }else{
                        this.info = [];
                    }
                }
            })
        },

        switchCurrency(item) {
            this.selectCoinIndex = item;
            this.currency_id = item;
            this.trades = [];
            this.drawerShow = false;
            this.getCurrencyInfo(false);
            if (this.cm_id === 1) {
                this.tradeSubscribeDepth();
            } else {
                this.contractSubscribeDepth();
            }
            var interval = timeIndex['time'][this.timeIndex];
            this.loadHistory(this.currency_id, interval);
            //this.$refs.webview && this.$refs.webview.evalJs("loadHistory(" + this.currency_id + ",'" + interval + "')");
            this.drawerShow = false;
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
            if (data.type === 200 && parseInt(this.cm_id) === 2) {
                try {
                    this.currency[0]['currency'] = this.$util.compareCurrency(this.currency[0]['currency'], data.data);
                    if (this.mlist.length > 0) {
                        this.mlist = this.$util.compareCurrency(this.mlist, data.data);
                    }
                } catch (e) {

                }
				if(this.currency_id === data.data.currency_id){
					var ticker = data.data.data;
					this.currencyInfo['change_rate'] = ticker.P;
					this.currencyInfo['new_price'] = ticker.c;
					this.ticker = ticker;
				}
            }

            
            if ((data.type === 600 && parseInt(this.cm_id) === 5)||data.type === 700 && parseInt(this.cm_id) === 6) {
                try {
                    this.currency[0]['currency'] = this.$util.compareCurrency(this.currency[0]['currency'], data.data.data);
                    if (this.mlist.length > 0) {
                        this.mlist = this.$util.compareCurrency(this.mlist, data.data.data);
                    }
                } catch (e) {

                }
                var ticker = this.$util.getCurrentTicker(this.currency_id, data.data.data);
                if(ticker.c){
                    this.currencyInfo['change_rate'] = ticker.P;
                    this.currencyInfo['new_price'] = ticker.c;
                    this.ticker = ticker;
                }else{
                    this.currencyInfo['change_rate'] = ticker.P;
                }
            }
            if (data.type === 201 && parseInt(this.cm_id) === 2 && data.data.currency_id === this.currency_id) {
                this.bids = data.data.data.b;
                this.asks = data.data.data.a;
            }
            if (data.type === 203 && parseInt(this.cm_id) === 2 && data.data.currency_id === this.currency_id) {
                var date = new Date(data.data.data.E);
                var trades = this.trades;
                if (trades.length > 20) {
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
            if (data.type === 100 && this.cm_id === 1) {
                // const index = this.currency[0]['currency'].findIndex(item => item.id == data.currency_id);
                // var temp = this.currency[0]['currency'][index];
                // temp['new_price'] = data['data']['c'];
                // temp['change_rate'] = data['data']['P'];
                // this.currency[0]['currency'][index] = temp;
                try {
                    this.currency[0]['currency'] = this.$util.compareCurrency(this.currency[0]['currency'], data.data);

                    if (this.mlist.length > 0) {
                        this.mlist = util.compareCurrency(this.mlist, data.data);
                    }
                } catch (e) {
                }

                var ticker = this.$util.getCurrentTicker(this.currency_id, data.data);
                this.currencyInfo['change_rate'] = ticker.P;
                this.currencyInfo['new_price'] = ticker.c;
                this.ticker = ticker;

                // this.$refs.webview && this.$refs.webview.evalJs("ticker(" + ticker.c + "," + lastVol + ")");
            }
            if (data.type === 101 && this.cm_id === 1 && data.currency_id === this.currency_id) {
                this.bids = data.data.bids;
                this.asks = data.data.asks;
            }

            if (data.type === 102 && this.cm_id === 1 && data.currency_id === this.currency_id) {
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
                    event: "contrade_depth_subscribe",
                    cm_id: this.cm_id,
                    currency_id: this.currency_id
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
                    event: "trade_depth_subscribe",
                    cm_id: this.cm_id,
                    currency_id: this.currency_id
                });
            } catch (e) {
                setTimeout(() => {
                    this.tradeSubscribeDepth();
                }, 2000);
            }
        },
        optionalChange() {
            this.like = !this.like;
            if (this.like) {
                this.showToast('添加自选成功', 500)
            } else {
                this.showToast('删除自选成功', 500)
            }
        },
        showToast(type, time) {
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
            const currencyArr = [];
            currencyArr.push(this.currencyInfo);
            if (this.cm_id === 1) {
                this.setStorage('choice-trade', currencyArr);
                return this.$mroute.switchTrade();
            } else {
                this.setStorage('choice-contract', currencyArr);
                return this.$mroute.switchContract();
            }
        },
        setStorage(key, data){
            uni.setStorage({
                key: key,
                data: data,
                success: res => {
                    console.log(res)
                }
            })
        },
        capture() {
            var pages = getCurrentPages(); //获取当前页面信息
            console.log(pages)
            var page = pages[pages.length - 1];
            var bitmap = null;
            console.log(page)
            var currentWebview = page.$getAppWebview();
            bitmap = new plus.nativeObj.Bitmap('amway_img');
            // 将webview内容绘制到Bitmap对象中
            currentWebview.draw(bitmap, function () {
                // console.log('截屏绘制图片成功');
                //这里我将文件名用四位随机数拼接了，不然会出现当前图片替换上一张图片只能保存一张图片的问题
                let rand = Math.floor(Math.random() * 10000)
                let saveUrl = '_doc/' + rand + 'a.jpg'
                bitmap.save(saveUrl, {}, function (i) {
                    // console.log('保存图片成功：' + JSON.stringify(i));
                    uni.saveImageToPhotosAlbum({
                        filePath: i.target,
                        success: function () {
                            // bitmap.clear(); //销毁Bitmap图片
                            uni.showToast({
                                title: '保存图片成功',
                                mask: false,
                                duration: 1500
                            });
                        }
                    });
                }, function (e) {
                    alert('保存图片失败：' + JSON.stringify(e));
                });
            }, function (e) {
                alert('截屏绘制图片失败：' + JSON.stringify(e));
            });
        },
        switchSort(index) {
            if (this.sort[index]['type'] == 0) {
                this.sort[index]['type'] = 1;
                this.sortCurrency(index, field, 1);
                this.sort[index]['active'] = this.sort[index]['down'];
                return;
            }
            if (this.sort[index]['type'] == 1) {
                this.sort[index]['type'] = 2;
                this.sortCurrency(index, field, 2);
                this.sort[index]['active'] = this.sort[index]['up'];
                return;
            }
            if (this.sort[index]['type'] == 2) {
                this.sort[index]['type'] = 0;
                this.sortCurrency(index, field, 0);
                this.sort[index]['active'] = this.sort[index]['img'];
                return;
            }
        },
        toKline() {
            console.log(1);
            uni.navigateTo({
                url: "/pages/trade/kline?type=0&id=" + this.currentCurrency['id'] + "&cid=" + cm_id
            })
        },
        drawerTabChange(e, item, index) {
            this.drawerTabIndex = index;
            this.show_cm_id = item.id;
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
        setCurrentCurrency(symbol, matches) {
            symbol['cm_id'] = matches['id'];
            symbol['currency_type'] = matches['currency_type'];
            uni.setStorageSync('current-contract', symbol);
            this.cm_id = symbol['cm_id'];
            this.currency_id = symbol['id'];
            this.show_cm_id = this.cm_id;
            this.getCurrencyInfo(false);
            if (this.cm_id === 1) {
                this.tradeSubscribeDepth();
            } else {
                this.contractSubscribeDepth();
            }
			this.trades = [];
            var interval = timeIndex['time'][this.timeIndex];
            this.loadHistory(this.currency_id, interval);
            // //this.$refs.webview && this.$refs.webview.evalJs("loadHistory(" + this.currency_id + ",'" + interval + "')");
            this.drawerShow = false;
        },
    }
}