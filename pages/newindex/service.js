import fuiTabs from "@/components/firstui/fui-tabs/fui-tabs.vue"
import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue"
import fuiCheckboxGroup from "@/components/firstui/fui-checkbox-group/fui-checkbox-group.vue"
import fuiCheckbox from "@/components/firstui/fui-checkbox/fui-checkbox.vue"
import fuiLabel from "@/components/firstui/fui-label/fui-label.vue"
import fuiButton from "@/components/firstui/fui-button/fui-button.vue"
import fuiDrawer from "@/components/firstui/fui-drawer/fui-drawer.vue"
import fuiList from "@/components/firstui/fui-list/fui-list.vue"
import fuiListCell from "@/components/firstui/fui-list-cell/fui-list-cell.vue"
import fuiBottomPopup from "@/components/firstui/fui-bottom-popup/fui-bottom-popup.vue"
import fuiLandscape from "@/components/firstui/fui-landscape/fui-landscape.vue"
import fuiDialog from "@/components/firstui/fui-dialog/fui-dialog.vue"
import fuiAvatar from "@/components/firstui/fui-avatar/fui-avatar.vue"
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex';
import mroute from '@/common/route.js';
import util from '@/common/util.js';
import config from '@/common/api/config.js';

import common from '@/common/api/common';
import userApi from "@/common/api/user";
import currency from '/common/api/currency.js';

import {
    initVueI18n
} from '@dcloudio/uni-i18n'
//lang
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
const i18n = initVueI18n(typeof localLang != 'undefined' && localLang != '' ? localLang : 'en', messages);

// i18n.setLocale(typeof localLang != 'undefined' && localLang != '' ? localLang : "en");
// i18n.f(messages);

var download = false;
var reloadLan = false;

let profit = 0;
let profitSet = false;

export default {
    components: {
        fuiTabs,
        fuiTag,
        fuiCheckboxGroup,
        fuiCheckbox,
        fuiLabel,
        fuiButton,
        fuiDrawer,
        fuiList,
        fuiListCell,
        fuiBottomPopup,
        fuiLandscape,
        fuiDialog,
        fuiAvatar
    },
    data() {
        return {
            alertShow: false,
            windowHeight: uni.getSystemInfoSync().windowHeight,
            statusBarHeight: plus.navigator.getStatusbarHeight(),
            scrollCHeight: "",
            logType: false,
            mroute: mroute,
            util: util,
            menuList: [{
                icon: "invite-black",
                darkIcon: "invite-white",
                text: "邀请好友",
                click: mroute.invaite
            }, {
                icon: "impawn-black",
                darkIcon: "impawn-white",
                text: "more.deposit",
                click: mroute.livePage
            },
                {
                    icon: "blindbox-black",
                    darkIcon: "blindbox-white",
                    text: "more.rich_blind_box",
                    click: mroute.blindbox
                },
                {
                    icon: "menu-black",
                    darkIcon: "menu-white",
                    text: "index.menu_more",
                    click: mroute.indexMore
                }
            ],
            bannerList: [],
            dotCurrent: 0,
            current: 0,

            tabSelect: 0,
            pactType: 0,
            addPact: false,
            userDrawer: false,
            loginType: true,
            eyeStatus: true,
            bottomPopup: false,
            upgradesPopup: false,
            tabOption: [this.$t('自选'), this.$t('home.t20'),this.$t('涨幅榜'), this.$t('跌幅榜'), this.$t('成交额')],

            symbol: util.getLCS(),
            symbol_rate: util.getLCR(),
            active: 0,
            currencyDesc: [],
            currencyASC: [],
            currencyQuan: [],
            hotCurrencyList: [],
            notice: [],
            banner: [],
            mlist: [],
            assetsTotal: '--',
            update: {},
            uptext: this.$t('common.not_must'),
            content: "",
            language: "",
            tabActive: 0,
            configParams: config,

            giftDrop: false,
            addFundsPopup: false,

            activeList: [],
            drawerNavHeight: "",
            activeIndex: 0,
            acDefalut: 0,

            profit: false,
			currency:[]
        }
    },
	onLoad() {
		this.checkUpdate();
	},
    onReady() {
        // var showInit = uni.getStorageSync('app-init');
        var _this = this;
        if (_this.userDrawer == true) {
            uni.hideTabBar();
            _this.windowHeight = uni.getSystemInfoSync().windowHeight;
        } else {
            uni.showTabBar();
        }

        // if (parseInt(showInit) !== 1) {
        // 	uni.navigateTo({
        // 		url: "/pages/welcome/welcome",
        // 		animationType: "none"
        // 	});
        // }
        _this.getTradeCurrencyList();
        _this.getMlist();
        _this.getBanner();
        _this.getNotice();

        _this.getActive();

        //this.preloadPage();
        // this.openUpgrade();
        _this.lang = uni.getStorageSync('lang');
        _this.switchLanguage();

        uni.$on('switchLan', () => {
            console.log("switch language");
            reloadLan = true;
            _this.userDrawer = false;
            _this.switchLanguage();
            _this.getBanner();
            _this.getNotice();
            _this.setTabbarBg();
            this.lang = uni.getStorageSync('lang');
        });
        uni.$on('currency', () => {
            _this.symbol = util.getLCS();
            _this.symbol_rate = util.getLCR();
        });

        uni.$on('trades', (data) => {
            _this.onTradeMessageHanlder(data);
        });

        uni.$on('addSelect', () => {
            _this.getMlist();
        });

		uni.$on('on_position',()=>{
			this.watchProfit();
		});
		
        uni.$on('no_position', () => {
			uni.$off('profit');
			clearInterval(profitSet);
			profitSet = false;
			_this.profit = false;
            _this.getAssets();
        });
        // 这里预加载页面会导致进入tabbar页面的时候，tabbar消失，暂时注销
        // uni.preloadPage({url: "/pages/store/store?a=0"});
		// uni.preloadPage({url: "/pages/trade/trade?a=2"});
		// uni.preloadPage({url: "/pages/newContract/newContract?a=1"});
		// uni.preloadPage({url: "/pages/wallet/wallet?a=3"});
    },
    onShow() {
        this.getAssets();
        // this.setTabbarBg();
        // this.setTabText();
        //plus.navigator.closeSplashscreen();

        if (this.userDrawer == true) {
            //uni.hideTabBar();
            this.windowHeight = uni.getSystemInfoSync().windowHeight;
        } else {
            //uni.showTabBar();
        }

        if (reloadLan === true) {
            console.log("切换语言");
            this.switchLanguage();
            this.getBanner();
            this.getNotice();
            this.setTabbarBg();
            this.$forceUpdate();
        }
    },
    onBackPress() {
        this.userDrawer = false;
    },
    computed: {
        ...mapState(['config', 'userinfo']),
        ...mapGetters(['isLogin', 'userAccount', 'userNickname', 'userTheme'])
    },
    watch: {
        upgradesPopup(v) {
            if (v === true) {
                uni.hideTabBar();
            } else {
                if (this.userDrawer === true) {
                    uni.hideTabBar();
                } else {
                    uni.showTabBar();
                }
            }
        },
        userDrawer(v) {
            if (v === true) {
                uni.hideTabBar();
            } else {
                uni.showTabBar();
            }
        },
        // giftDrop(v) {
        // 	if (v) {
        // 		uni.hideTabBar();
        // 	} else {
        // 		uni.showTabBar();
        // 	}
        // },
        addFundsPopup(v) {
            if (v === true) {
                uni.hideTabBar();
            } else {
                uni.showTabBar();
            }
        }
    },
    methods: {
        ...mapMutations(['userLogin', 'setTabbarBg']),
        drawerNavInit(e) {
            this.drawerNavHeight = e.height + e.statusBarHeight;
        },
		watchProfit(){
			let _this = this;
			uni.$on('profit', (id, amount) => {
			    try {
			        profit = parseFloat(amount);
					if(!profitSet){
						profitSet = setInterval(()=>{
						    _this.profit = parseFloat(profit);
						},1000);
					}
			    } catch (e) {}
			});
		},
        closeActive() {
            if (this.activeIndex + 1 < this.activeList.length) {
                this.giftDrop = false;
                setTimeout(() => {
                    this.activeIndex += 1;
                    this.giftDrop = true;
                }, 300);
            } else {
                this.giftDrop = false;
                uni.showTabBar();
            }
        },
        copyUid(secret) {
            let _this = this;
            let userID = String(secret)
            uni.setClipboardData({
                data: userId,
                success() {
                    uni.showToast({
                        title: _this.$t('google.copy_suc'),
                        icon: "none"
                    });
                }
            })
        },
        toActive() {
            if (this.activeList[this.activeIndex]['is_login'] === 1 && !this.isLogin) {
                mroute.login();
                return false;
            }
            if (
                this.activeList[this.activeIndex]['path'] == "/pages/contract/contract" ||
                this.activeList[this.activeIndex]['path'] == "/pages/trade/trade"
            ) {
                uni.switchTab({
                    url: this.activeList[this.activeIndex]['path']
                })
            } else {
                uni.navigateTo({
                    url: this.activeList[this.activeIndex]['path']
                })
            }
        },
        getActive() {
            common.mainActive().then(res => {
                if (res.code === 200 && res.data.length > 0) {
                    this.activeList = res.data;
                    this.giftDrop = true;
                    this.activeIndex = 0;
                    uni.hideTabBar();
                }
            });
        },
        switchLanguage() {
            reloadLan = false;
            //设置tabbar语言
            try {
                var lang = uni.getStorageSync('lang');
                if (typeof lang != 'undefined' && lang != '') {
                    i18n.setLocale(lang);
                }
                this.tabOption = [this.$t('自选'), this.$t('home.t20'),this.$t('涨幅榜'), this.$t('跌幅榜'), this.$t('成交额')];
            } catch (e) {
            }
            try {
               this.setTabText();
            } catch (e) {
            }
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
        updateClient(flag) {
            var _this = this;
            if (_this.update['force_update'] === 0 && flag === false) {
                _this.upgradesPopup = false;
                return true;
            }
            if (flag === true) {
                if (download === true) {
                    return false;
                }

                download = true;
                uni.removeStorageSync('app-init');
                var task = uni.downloadFile({
                    url: this.update['download_url'],
                    success: function (result) {
                        console.log(result);
                        if (result.statusCode === 200) {
                            plus.runtime.install(result.tempFilePath, {
                                force: false
                            }, function () {
                                _this.upgradesPopup = false;
                                _this.content = _this.$t('common.us');
                                _this.alertShow = true;
                                setTimeout(() => {
                                    plus.runtime.restart();
                                }, 1000);
                            }, function (e) {
                                _this.upgradesPopup = false;
                                _this.content = _this.$t('common.uf') + JSON.stringify(e);
                                _this.alertShow = true;
                            });
                        }
                    },
                    fail() {
                        _this.upgradesPopup = false;
                        _this.content = _this.$t('common.df');
                        _this.alertShow = true;
                    }
                });
                task.onProgressUpdate((res) => {
                    _this.uptext = _this.$t('index.process') + "：" + parseFloat(res.progress).toFixed(2) + "%";
                });
            } else {
                _this.upgradesPopup = false;
            }
        },
        checkUpdate() {
            // #ifdef APP-PLUS
            var _this = this;
            common.checkUpdate().then(res => {
                this.update = res.data;
                if (this.update.force_update == 1) {
                    this.uptext = this.$t('common.must_update');
                } else {
                    this.uptext = this.$t('common.not_must');
                }
                plus.runtime.getProperty(plus.runtime.appid, function (widgetInfo) {
                    if (widgetInfo.version !== res.data.app_version) {
                        uni.removeStorageSync('trade-currency');
                        uni.removeStorageSync('contract-matches');
                        _this.openUpgrade();
                    }
                });
            });
            // #endif
        },
        toNoticeDetail(item) {
            if (item.object_type == 4) {
                mroute.webview(1, item.object_id, item.name);
            }
        },
        getMlist() {
            var key = this.acDefalut === 0 ? 'select-trade' : 'select-contract';
            var mlist = uni.getStorageSync(key);
            if (typeof mlist != 'undefined' && mlist != '') {
                this.loginType = false;
                this.mlist = mlist;
            }else{
				this.mlist = [];
			}
        },
        selectMine() {
            //自选设置
            var mlist = [];
			let currency = this.currencyDesc.slice(0,6);
            //现货自选
            for (var i = 0; i < currency.length; i++) {
                if (typeof currency[i]['select'] == 'undefined' || !currency[i]['select']) {
                    mlist.push(currency[i]);
                }
            }
            let key = '';
            if (this.pactType === 0) {
                key = 'select-trade';
            } else {
                key = 'select-contract';
            }
            uni.setStorage({
                key: key,
                data: mlist
            });
            this.mlist = mlist;
            this.loginType = false;
            this.tabActive = 0;
            this.$nextTick(() => {
                this.getMlist();
            });
        },
        async getTradeCurrencyList() {
            let tradeCurrency = await currency.tradeCurrencyList();
            uni.setStorage({
                key: "trade-currency",
                data: tradeCurrency['data']
            });
            this.currencyDesc = util.sortDesc(tradeCurrency['data'][0]['currency']).slice(0, 10);
            this.currencyASC = util.sortAsc(tradeCurrency['data'][0]['currency']).slice(0, 10);
            this.currencyQuan = util.sortQuan(tradeCurrency['data'][0]['currency']).slice(0, 10);
            // this.hotCurrencyList = tradeCurrency['data'][0]['currency'].slice(0, 3);
			this.currency = tradeCurrency['data'][0]['currency'];
        },
        onTradeMessageHanlder(data) {
            if (data.type != 100) {
                return false;
            }

            //if (this.tabSelect === 0) {
            try {
                if (this.mlist.length > 0) {
                    this.mlist = util.compareCurrency(this.mlist, data.data);
                }
            } catch (e) {
                console.log(e);
            }
            //}
            //if (this.tabSelect === 1) {
                try {
                    this.currencyDesc = util.sortDesc(util.compareCurrency(this.currencyDesc, data.data));
					this.currencyDesc.sort((a, b) => b.change_rate - a.change_rate);
					
                } catch (e) {
                    console.log(e);
                }
            //}
            //if (this.tabSelect === 2 && this.currencyASC.length > 0) {
                try {
                    this.currencyASC = util.sortAsc(util.compareCurrency(this.currencyASC, data.data));
					this.currencyASC.sort((a, b) => a.change_rate - b.change_rate);
					
                } catch (e) {
                    console.log(e);
                }
            //}
            //if (this.tabSelect === 3 && this.currencyQuan.length > 0) {
                try {
                    this.currencyQuan = util.compareCurrency(this.currencyQuan, data.data);
                } catch (e) {
                    console.log(e);
                }
            //}

            //   if (this.tabActive === 0) {

            //   }
        },
        async getBanner() {
            var result = await common.getBanner();
            this.banner = result.data;
        },
        async getNotice() {
            let notice = await common.getNotice();
            this.notice = notice.data;
        },
        scan() {
            let _this = this;
            uni.scanCode({
                success(e) {
                    let result = e.result.split(':');
                    if (result[0] === 'login') {
                        common.qrcodeLogin(result[1]).then(res => {
                            if (res.code === 200) {
                                _this.content = "登录成功";
                                _this.alertShow = true;
                            }
                        });
                    }
                }
            })
        },
        openLogin() {
            this.showAuth = true;
            setTimeout(() => {
                this.$refs.auth.open();
            }, 200);
        },
        openMine() {
            this.$refs.showRight.open();
        },
        closeMine() {
            this.$refs.showRight.close();
            uni.showTabBar();
        },
        getAssets() {
            userApi.getBalance().then(res => {
                if (res.code == 200) {
                    var total = 0;
                    res.data.balance.map((item) => {
                        if (item.symbol == 'USDT') {
                            total += parseFloat(item.balance) + parseFloat(item.contract_balance) +
                                parseFloat(item.finance_balance) + parseFloat(item.future_balance) +
                                parseFloat(item.trade_balance);
                        } else {
                            var new_price = parseFloat(item.new_price != null ? item.new_price : 0);
                            total += (parseFloat(item.balance) + parseFloat(item.contract_balance) +
                                parseFloat(item.finance_balance) + parseFloat(item.future_balance) +
                                parseFloat(item.trade_balance)) * new_price;
                        }
                    });
                    this.assetsTotal = total;
                }
            });
        },
        toSearch() {
            console.log(1);
            this.$mroute.coinSearch();
            return false;
            // uni.navigateTo({
            // 	url:"/pages/store/search/search",
            // 	animationType:"fade-in"
            // })
        },
        notopen() {
            uni.showToast({
                title: '此功能暂未开放',
                icon: "none",
                duration: 2000
            })
        },
        setMoni() {
            //切换为模拟合约操作
            uni.setTabBarItem({
                index: 1,
                visible: false
            });
            uni.setTabBarItem({
                index: 2,
                visible: false
            });
            uni.setTabBarItem({
                index: 0,
                pagePath: "pages/index/simulation/simulation"
            });
            uni.setTabBarItem({
                index: 3,
                pagePath: "pages/index/simulation/contruct/contruct",
                text: "交易"
            });
            uni.setTabBarItem({
                index: 4,
                pagePath: "pages/index/simulation/wallet/wallet"
            });
            uni.switchTab({
                url: "/pages/index/simulation/simulation"
            })
        },
        loginOut() {
            this.userLogin(false);
        },
        openDraw() {
            this.$refs.showRight.open();
            uni.hideTabBar();
        },
        // closeDrawer() {
        //     this.$refs.showRight.close();
        //     uni.showTabBar();
        // },
        changeCurrent(e) {
            this.isActive = e.detail.current;
        },
        swiperChange() {
            if (this.current == 0) {
                this.current = 1;
            } else {
                this.current = 0;
            }
        },
        appointment(index) {
            this.currencyDesc[index]['select'] = !this.currencyDesc[index]['select'];
        },
        addList() {
            this.loginType = false;
        },
        // bottomPopup() {
        //     this.$refs.popup.open();
        //     uni.hideTabBar();
        // },
        // closePopup() {
        //     this.$refs.popup.close();
        //     uni.showTabBar();
        // },
        // tabChange(index) {
        //     this.tabActive = index;
        // },
        openUpgrade() {
            // this.$refs.upgrade.open();
            this.upgradesPopup = true;
            uni.hideTabBar();
        },
        closeUpgrade() {
            this.upgradesPopup = false;
            uni.showTabBar();
        },
        navBanner(item) {
            if (parseInt(item.object_type) === 1) {
                uni.navigateTo({
                    url: item.url
                })
            }
        },
        getLang() {
            this.language = uni.getStorageSync('lang');
        },
        // 更新弹窗显示/隐藏
        $t(key) {
            return i18n.t(key);
        },
        showUpgradesPopup() {
            this.upgradesPopup = true;
            this.hideTabBar();
        },
        closeUpgradesPopup() {
            this.upgradesPopup = false;
            this.showTabBar();
        },
        bannerChange(e) {
            this.dotCurrent = e.detail.current;
        },
        cutChange() {
            if (this.current != 1) {
                this.current = 1;
            } else {
                this.current = 0;
            }
        },
        tabChange(e) {
            this.tabSelect = e.index;
			this.tabActive = e.index;
        },
        coinSwiperChange(e) {
            this.tabSelect = e.detail.current;
        },
        checkboxChange(e) {

        },
        showDrawer() {
            this.userDrawer = true;
            setTimeout(() => {
                this.windowHeight = uni.getSystemInfoSync().windowHeight;
            }, 100)
            this.hideTabBar();
        },
        closeDrawer() {
            this.userDrawer = false;
            this.showTabBar();
        },
        showPopup() {
            this.bottomPopup = true;
            this.hideTabBar();
        },
        closePopup() {
            this.bottomPopup = false;
            this.showTabBar();
        },
        btnChange(type) {
            this.pactType = type;
            this.acDefalut = type;
            this.closePopup();
            this.getMlist();
        },
        showTabBar() {
            uni.showTabBar({
                animation: true
            });
        },
        hideTabBar() {
            uni.hideTabBar({
                animation: true
            });
        },
        preloadPage() {
            console.log("pre load page");
            uni.preloadPage({
                url: "/pages/store/store"
            });
            uni.preloadPage({
                url: "/pages/trade/trade"
            })
            uni.preloadPage({
                url: "/pages/contract/contract"
            })
            uni.preloadPage({
                url: "/pages/wallet/wallet"
            })
        },
        navInit(e) {
            this.scrollCHeight = uni.getSystemInfoSync().windowHeight - e.height - e.statusbarHeight;
        },
        copyInvateCode() {
            const _this = this;
            const inviteCode = _this.userinfo.invite_code;
            uni.setClipboardData({
                data: inviteCode,
                success() {
                    uni.showToast({
                        title: _this.$t('google.copy_suc'),
                        icon: "none"
                    });
                }
            })
        }
    }
}