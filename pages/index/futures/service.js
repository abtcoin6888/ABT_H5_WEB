import {
	NavBar,
	Icon,
	RollingText
} from 'vant';
import {
	createChart
} from 'lightweight-charts';
import fuiDigitalRoller from "@/components/firstui/fui-digital-roller/fui-digital-roller.vue"
import Api from '@/common/api/futures.js';
import currencyApi from '@/common/api/currency.js';
import userApi from '@/common/api/user.js';

import timeIndex from "@/common/timeIndex.js";

var option = {};
var seriesData = [];
var timeData = [];
var newPrice = 0;
var _charts;
var chartInit = 0;
var updateInterval;
var chatHandler;
var lastPrice = 0;

var set = false;


import {
	mapState,
	mapGetters,
	mapMutations
} from 'vuex';
export default {
	components: {
		[NavBar.name]: NavBar,
		[Icon.name]: Icon,
		[RollingText.name]: RollingText,
		fuiDigitalRoller
	},
	data() {
		return {
			scrollHeight: "",
			currency: [],
			seconds: "00:00",
			price: '0.00',
			current: 0,
			items: [this.$t('futures.t33'), this.$t('futures.t34')],
			activeColor: '#000',
			btnindex: 0,
			currentCurrency: {},
			currency_id: 0,
			decimals: 2,
			searchValue: '',
			new_price: '',
			history: [],
			dep: [{
				amount: 0
			}],
			depActive:0,
			balance: "",
			content: "",
			ulist: [],
			orders: [],
			historys: {
				list: [],
				date: "",
				total: ""
			},
			them: "",
			currentOrder: {},
			activeIndex: 0,
			buyPopupShow: false,
			coinList: ['USDT'],
			rangeShow: false,
			selectVal: "USDT",
			direction:0,
			amount:'',
			currencyInfo:false,
			ticker:{},

			fchart: "",
			indicator: [ "MACD"],
			bar: false,

			timeIndex:1,
			time:[]
		}
	},
	onReady() {
		this.currency = uni.getStorageSync('trade-currency');
		this.initInterval();
		this.time = timeIndex['time'].map((item) => {
			return this.$t(item);
		});
		this.kheight = this.$device.screenHeight - 400;
		uni.$on('trades', (data) => {
			this.onTradeMessages(data);
		});
		this.them = uni.getStorageSync('userTheme');

	},
	onShow() {
		this.getCurrency();
		this.getUOrderList();
		this.updatePrices();
	},
	onHide() {

	},
	computed: {
		...mapGetters(['isLogin', 'userTheme'])
	},
	watch: {
		current(v) {
			if (v == 1) {
				this.getHistory();
			}
		},
		timeIndex(index){
			let symbol = '';
			if (index === 0) {
				symbol = '1s';
			} else {
				symbol = timeIndex['time'][index];
			}
			let data = {
				interval: timeIndex['time'][index] === 'Line'?'1s':timeIndex['time'][index],
				currency_id: this.currentCurrency['currency_id'],
				limit: 1000,
				cm_id : 1,
				type : 0
			}
			currencyApi.contractLine(data).then(res => {
				if (res.code === 200) {
					this.history = {data: res, interval: index};
				}
			});
			// this.loadHistory(this.currency_id, symbol);
		}
	},
	methods: {
		updatePrices() {
			var _this = this;
			if (set) {
				clearInterval(set);
			}
			set = setInterval(() => {
				if (lastPrice > 0) {
					_this.new_price = lastPrice;
					this.$forceUpdate();
				}
			}, 500);
		},
		showInfo(index) {
			this.currentOrder = this.historys['list'][index];
			this.$refs.info.open();
		},
		showCurrentInfo(currentOrder) {
			this.currentOrder = currentOrder;
			this.$refs.info.open();
		},
		getHistory() {
			if (!this.isLogin) {
				return false;
			}
			Api.getHistoryList(this.currentCurrency['currency_id']).then(res => {
				if (res.data.list) {
					this.historys = res.data;
				}
			});
		},
		getUOrderList() {
			var _this = this;
			this.ulist = [];
			Api.getUorderList(this.currentCurrency['currency_id']).then(res => {
				if (res.code === 200) {
					this.ulist = res.data.map((item) => {
						item['seconds'] = _this.getSecondsDifference(item.created_at,item.dep.interval);
						item['rate'] = (1 - item['seconds'] / 60) * 100;
						item['new_price'] = parseFloat(this.currentCurrency['new_price']);
						return item;
					});
					this.orders = JSON.parse(JSON.stringify(this.ulist));
					this.calcOrderSecond(res.data);
				}
			})
		},
		calcOrderSecond(order) {
			var _this = this;
			var list = order;
			var index = 0;
			var set = setInterval(() => {
				if (this.ulist.length <= 0 && index != 0) {
					clearInterval(set);
					this.ulist = [];
				}
				index += 1;
				var list = this.ulist.map((item) => {
					item['seconds'] = _this.getSecondsDifference(item.created_at,item.dep.interval);
					item['rate'] = (1 - item['seconds'] / (parseFloat(item.dep.interval) * 60)) * 100;
					item['new_price'] = parseFloat(this.currentCurrency['new_price']);
					if(item['seconds'] <= 0){
						this.getHistory();
						this.showInfo(0)
						//this.showCurrentInfo(item);
					}
					return item;
				});
				var beforLeng = this.ulist.length;
				this.ulist = list.filter(item => item.seconds > 0);

				if(this.ulist.length != beforLeng){
					this.getCurrencyBalance();
				}
				_this.$forceUpdate();
			}, 1000);
		},
		timeOut(e) {
			//提示盈亏信息
			this.getCurrencyBalance();
			this.getUOrderList();
		},
		getSecondsDifference(date,interval) {
			const current = new Date(Date.parse(this.$util.serverTime()));
			const target = new Date(Date.parse(date));
			target.setSeconds(target.getSeconds() + (parseFloat(interval) * 60));
			if (target < current) {
				return 0;
			}
			// console.log(this.$util.serverTime());
			// console.log(date,target ,current);
			return Math.abs(target - current) / 1000;
		},
		order(direction) {
			//console.log(this.depActive);return false;
			if(!this.amount){
				this.content = this.$t('futures.t35');
				this.buyPopupShow = false;
				this.$refs.alert.open();
				return false;
			}
			if (!this.isLogin) {
				return false;
			}
			//console.log();return false;
			if(parseFloat(this.amount) < parseFloat(this.dep[this.depActive]['low_price'])) {
				this.content = this.$t('futures.txt35') + ' ' + this.dep[this.depActive]['low_price'];
				this.buyPopupShow = false;
				this.$refs.alert.open();
				return false;
			}

			if (parseFloat(this.balance) < parseFloat(this.amount)) {
				this.content = this.$t('futures.t31');
				this.buyPopupShow = false;
				this.$refs.alert.open();
				return false;
			}
			const form = {
				dep_id: this.dep[this.depActive]['id'],
				currency_id: this.currentCurrency['currency_id'],
				direction: direction,
				amount : this.amount
			};
			this.buyPopupShow = false;
			this.$refs.loading.open();
			Api.submitOrder(form).then(res => {
				this.$refs.loading.close();
				if (res.code === 200) {
					this.content = this.$t('futures.t32');
					this.$refs.alert.open();
					this.getUOrderList();
				} else {
					this.content = e.message;
					this.$refs.alert.open();
				}
			}).catch((e) => {

				this.$refs.loading.close();
				this.content = e.message;
				this.$refs.alert.open();
			})
		},
		getCurrencyBalance() {
			if (!this.isLogin) {
				return false;
			}
			userApi.getUBalance().then(res => {
				this.balance = res.data.future_balance;
			});
		},
		getCurrencyDep(cid) {
			Api.getCurrencyDep(cid).then(res => {
				this.dep = res.data;
			});
		},
		getCurrency() {
			Api.getCurrency().then(res => {
				this.currency = res.data;
				var current = uni.getStorageSync('futures');
				if (typeof current == 'object') {
					this.currentCurrency = current;
				} else {
					this.currentCurrency = this.currency[0];
					uni.setStorageSync('futures', this.currency[0]);
				}
				this.decimals = this.currentCurrency['decimals'];
				this.getCurrencyDep(this.currentCurrency['currency_id']);
				this.getCurrencyBalance(this.currentCurrency['currency_id']);
				var data = {
					interval: "1m",
					currency_id: this.currentCurrency['currency_id'],
					limit: 1000,
					cm_id : 1,
					type : 0
				}
				currencyApi.contractLine(data).then(res => {
					if (res.code === 200) {
						this.history = {data: res, interval: this.timeIndex};
						// this.history = res.data;
					}
				});
			});
		},
		klineTime(e){
			this.timeIndex = e;
			this.$nextTick(()=>{
				this.timeId = e - 1;
			})
		},
		setCurrent(index) {
			uni.setStorageSync('futures', this.currency[index]);
			this.currentCurrency = this.currency[index];
			this.decimals = this.currentCurrency['decimals'];
			var data = {
				interval: '1m',
				currency_id: this.currentCurrency['currency_id'],
				limit: 1000
			}
			currencyApi.contractLine(data).then(res => {
				if (res.code === 200) {
					this.history = {data: res, interval: this.timeIndex};
				}
			});
			this.getCurrencyDep(this.currentCurrency['currency_id']);
			this.$refs.showSelect.close();
		},
		open() {
			this.$refs.profit.open();
		},
		onTradeMessages(data) {
			let ticker = this.$util.getCurrentTicker(this.currentCurrency['currency_id'], data.data);
			if (parseFloat(ticker.c) > 0) {
				//this.currentCurrency['new_price'] = ticker.c;
				//this.new_price = parseFloat(ticker.c);
				// lastPrice = parseFloat(ticker.c);
				this.ticker = ticker;
			}
		},
		initInterval() {
			updateInterval = setInterval(() => {
				var currentDate = new Date();
				var currentSeconds = currentDate.getSeconds();
				this.seconds = '00:' + (60 - currentSeconds > 10 ? 60 - currentSeconds : '0' + 60 -
					currentSeconds);
				if (60 - currentSeconds <= 1) {
					seriesData = [];
					timeData = [];
				}
			}, 1000);
		},
		onClickItem(e) {
			console.log(e);
			this.current = e.currentIndex;
		},
		search() {},
		input() {},
		navInit(e) {
			const windowHeight = uni.getSystemInfoSync().windowHeight;
			this.navHeight = e.height + e.statusBarHeight;
			this.scrollHeight = windowHeight - this.navHeight;
		},
		filterTap() {
			//显示下拉框
			this.$refs.ddmRange.show()
			this.rangeShow = true;
		},
		rangeItemClick(e) {
			console.log(e)
			this.selectVal = e.text;
			this.rangeClose();
		},
		rangeClose() {
			this.rangeShow = false;
		}
	}
}