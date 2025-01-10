import slideButton from '@/components/slide-button/slide-button.vue';
import commonApi from '@/common/api/common.js';
import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"
import userApi from '@/common/api/user.js';

import {mapState, mapGetters, mapMutations} from 'vuex';

export default {
    components: {
        slideButton,
        fuiToast
    },
    data() {
        return {
            realType: true,
            menuShow: false,
            windowHeight: "",
            navHeight: "",
            swiperHeight: "",
            direction: 0,
            directionOption: [{symbol: this.$t('quickly.tt50')}, {symbol: this.$t('quickly.tt51')}],
            subCoinCurrent: 0,
            subCoinValue: "USDT",
            subCoinOption: ["USDT", "BTC", "ETH", "USDC", "BGB", "DAI","USDT", "BTC", "ETH", "USDC", "BGB", "DAI"],
            realName: false,
            beginnerTutorial: false,
            advertising: false,
            modalShow: false,
            nickNameTip: false,
            paymentPopup: false,
            sellerPopup: false,
            fundPopup: false,
            paymentActive: 0,
            sellerActive: 0,
            duration: 0,
            title: "温馨提示",
            content: "未设置昵称",
            ctxt: "取消",
            ftxt: "去添加",
            beginCurrent: 0,
            currency_rate: false,
            coinList: [],
            merchant: [],
            current: {symbol: '', new_price: 0, recharge_min: 0},

            amount: "",
            recvie: "",

            balance: {balance: '0.00'},

            payment: [],
            password: "",
			symbol: this.$util.getLCS(),
			symbol_rate: this.$util.getLCR(),
        };
    },
    mounted() {
        this.getNodeInfo();
    },
    onShow() {
        this.showNewY();
        this.getCurrencyRate();
        this.getRechargeList();
        this.getgetMerchantList();
    },
    computed: {
        ...mapState(['config', 'userinfo']),
        ...mapGetters(['userTheme'])
    },
    watch: {
        sellerPopup(v) {
            if (v) {
                if (this.amount == '' || this.amount <= 0) {
                    this.sellerPopup = false;
                    return;
                }
                if (this.userinfo['authStatus'] != 1) {
                    this.realName = true;
                    this.sellerPopup = false;
                    return;
                }
                if (this.userinfo['email'] == null || this.userinfo['email'] == '') {
                    this.sellerPopup = false;
                    this.realName = true;
                    return;
                }
                if (this.userinfo['phone'] == null || this.userinfo['phone'] == '') {
                    this.sellerPopup = false;
                    this.realName = true;
                    return;
                }
                this.getPaymenList();
            }

        }
    },
    methods: {
        verifyPwd() {
            if (this.password == "") {
                this.showToast("请输入密码");
                return false;
            }
            userApi.verifyPassword(this.password).then(res => {
                this.closePopup();
                if (res.code == 200) {
                    this.submitOrder(2);
                } else {
                    this.showToast(res.message);
                }
            }).catch((e) => {
                this.closePopup();
            })
        },
        submitOrder(t) {
            if (this.amount == '' || this.amount <= 0) {
                return false;
            }
            if (t === 2 && this.amount > this.balance.balance) {
                this.showToast(this.$t('with.t8'));
                return false;
            }
            try {
                if (t == 1) {
                    var t_amount = parseFloat(this.amount / (this.coinList[this.subCoinCurrent]['new_price'] * this.currency_rate)).toFixed(8);
                } else {
                    var t_amount = parseFloat(this.amount * (this.coinList[this.subCoinCurrent]['new_price'] * this.currency_rate)).toFixed(2);
                }
                var form = {
                    type: t,
                    currency_id: this.coinList[this.subCoinCurrent]['id'],
                    amount: this.amount,
                    t_amount: t_amount,
					price : this.currency_rate
                };
                if (t === 1) {
                    form['merchant_id'] = this.merchant[this.paymentActive]['id'];
                }
                if (t == 2) {
                    form['password'] = this.password;
                    form['payment_id'] = this.payment[this.sellerActive]['id'];
                    //查找对应的收款商户信息
                    if (this.payment[this.sellerActive]['type'] == 1) {
                        this.paymentActive = "wechatpay";
                    }
                    if (this.payment[this.sellerActive]['type'] == 2) {
                        this.paymentActive = "alipay";
                    }
                    if (this.payment[this.sellerActive]['type'] == 3) {
                        this.paymentActive = "bank";
                    }
                    form['merchant_id'] = this.merchant[this.paymentActive]['id'];
                }
                uni.showLoading();
                commonApi.c2cSubmit(form).then(res => {
                    uni.hideLoading();
                    if (res.code == 200) {
                        var recaccount = {};
                        if (t === 2) {
                            recaccount = this.payment[this.sellerActive];
                        }
                        var key = t === 1 ? 'c2c-buy' : 'c2c-sell';
                        uni.setStorageSync(key, {
                            amount: this.amount,
                            t_amount: t_amount,
                            merchant: this.merchant[this.paymentActive],
                            id: res.data.id,
                            result: res.data,
                            currency: this.coinList[this.subCoinCurrent],
                            price: this.currency_rate,
                            payment: this.paymentActive,
                            status: 0,
                            recaccount: recaccount
                        });
                        if (t == 1) {
                            this.$mroute.toPayStatus();
                        } else {
                            this.$mroute.toSelldetail();
                        }
                    } else {
                        this.showToast(res.message);
                    }
                }).catch((e) => {
                    console.log(e);
                })
            } catch (e) {
                console.log(e);
            }
        },
        getPaymenList() {
            userApi.getPaymentList().then(res => {
                this.payment = res.data.list;
            });
        },
        getgetMerchantList() {
            commonApi.getMerchantList().then(res => {
                this.merchant = res.data;
            });
        },
        getRechargeList() {
            commonApi.getRechargeCurrency(true).then(res => {
                this.coinList = res.data.list.map((item)=>{
					item['name'] = item['symbol'];
					return item;
				});
                this.current = this.coinList[this.subCoinCurrent];
            });
        },
        getCurrencyRate() {
			let currencs = uni.getStorageSync('local-currency');
			if(typeof currencs === 'undefined' || currencs===''){
				currencs = 'CNY';
			}else{
				currencs = currencs['value'];
			}
            commonApi.getCurrencyFee(currencs).then(res => {
                this.currency_rate = res.data.tether[currencs.toLowerCase()];
            })
        },
        showNewY() {
            var init = uni.getStorageSync('c2c-init');
            if (parseFloat(init) != 1) {
                this.beginnerTutorial = true;
                uni.setStorageSync('c2c-init', 1);
            }
        },
        navInit(e) {
            console.log(e);
            this.navHeight = e.height + e.statusBarHeight;
            this.windowHeight = uni.getSystemInfoSync().windowHeight - e.height - e.statusBarHeight;
        },
        close() {
            this.showToast("暂未开放", 1500);
        },
        showToast(type, time) {
            let options = {}
            //提示信息
            options.text = type;
            options.duration = time;
            this.$refs.toast.show(options)
        },
        getNodeInfo() {
            let view = uni.createSelectorQuery().in(this).select('.quickly-container-header');
            view.boundingClientRect((data) => {
                this.swiperHeight = this.windowHeight - data.height;
            }).exec();
        },
        directionChange(e) {
            this.direction = e.index;
            this.subCoinCurrent = 0;
            this.duration = 0;
            this.current = this.coinList[0];
            if (this.direction) {
                this.currencyBalance();
            }
        },
        currencyBalance() {
            userApi.getCurrencyBalance(this.coinList[this.subCoinCurrent]['id']).then(res => {
                this.balance = res.data;
            });
        },
        coinChange(e) {
            this.subCoinCurrent = e.index;
            this.subCoinValue = e.name;
            this.current = e;
            this.duration = 0;
        },
        beginSwiper(e) {
            this.beginCurrent = e.detail.current;
        },
        nextTap() {
            if (this.beginCurrent < 3) {
                this.beginCurrent++
            } else if (this.beginCurrent >= 3) {
                this.closePopup();
                setTimeout(() => {
                    this.beginCurrent = 0;
                }, 500)
            }
        },
        subSwiperChange(e) {
            let current = e.detail.current;
            this.subCoinCurrent = current;
            this.subCoinValue = this.subCoinOption[current];
            if (this.direction === 1) {
                this.currencyBalance();
            }
        },
        swiperTransition() {
            this.duration = 300;
        },
        paymentChange(type) {
            console.log(type);
            this.paymentActive = type;
        },
        sellerChange(type) {
            this.sellerActive = type;
        },
        closePopup() {
            this.realName = false;
            this.beginnerTutorial = false;
            this.advertising = false;
            this.paymentPopup = false;
            this.sellerPopup = false;
            this.fundPopup = false;
            // this.paymentActive = 0;
            this.sellerActive = 0;
        },
        buyConfirm() {
            if (this.amount == '' || this.amount < this.current['recharge_min'] * this.current['new_price'] * this.currency_rate) {
                this.showToast("最少充值 " + this.$util.thousandSeparator(this.current['recharge_min'] * this.current['new_price'] * this.currency_rate, 2) + ' cny');
                return false;
            }
            if (this.userinfo['authStatus'] != 1) {
                this.realName = true;
                return;
            }
            if (this.userinfo['email'] == null || this.userinfo['email'] == '') {
                this.realName = true;
                return;
            }
            if (this.userinfo['phone'] == null || this.userinfo['phone'] == '') {
                this.realName = true;
                return;
            }
            this.paymentPopup = true;
        }
    }
};