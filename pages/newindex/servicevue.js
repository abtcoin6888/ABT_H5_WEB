import {Image as VanImage, Icon, Cell, CellGroup} from 'vant';
import currency from '/common/api/currency.js';
import {mapState, mapGetters, mapMutations} from 'vuex';
import common from '@/common/api/common';
import userApi from '@/common/api/user';
import config from '@/common/api/config.js';
import fuiCheckbox from "@/components/firstui/fui-checkbox/fui-checkbox.vue";

var download = false;
var reloadLan = false;
let profitList = [];
export default {
    components: {
        fuiCheckbox,
        [VanImage.name]: VanImage,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup
    },
    data() {
        return {
            loginType: true,
            statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
            screenWidth: uni.getSystemInfoSync().screenWidth,
            windowHeight: uni.getSystemInfoSync().windowHeight,
            navHeight: "",
            menuList: [
                {
                    icon: "invite-black",
                    darkIcon: "invite-white",
                    text: '邀请好友',
                    click: this.$mroute.invaite
                },
                {
                    icon: "impawn-black",
                    darkIcon: "impawn-white",
                    text: 'more.deposit',
                    click: this.$mroute.livePage
                },
                {
                    icon: "blindbox-black",
                    darkIcon: "blindbox-white",
                    text: 'more.rich_blind_box',
                    click: this.$mroute.blindbox
                },
                // {
                //     icon: "copy-trading-light",
                //     darkIcon: "copy-trading-dark",
                //     text: 'futures.tt2',
                //     click: this.$mroute.futures
                // },
                // {
                //     icon: "apo-light",
                //     darkIcon: "apo-dark",
                //     text: 'wallete.t13',
                //     click: this.$mroute.toTactic
                // },
                // {
                //     icon: "copy-trading-light",
                //     darkIcon: "copy-trading-dark",
                //     text: 'home.t41',
                //     click: this.$mroute.floworder
                // },
                {
                    icon: "menu-black",
                    darkIcon: "menu-white",
                    text: '更多',
                    click: this.$mroute.indexMore
                }
            ],
            checkedArrey: [],
            isActive: 0,
            tabList: [this.$t('自选'), this.$t('涨幅榜'), this.$t('跌幅榜'), this.$t('成交额')],
            tabActive: 0,
            current: 0,
            acDefalut: 0,
            showAuth: false,
            scrollTop: '75',
            symbol: this.$util.getLCS(),
            symbol_rate: this.$util.getLCR(),
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
            uptext: '忽略版本更新',
            content: '',
            language: '',
			show: true,
            addFundsPopup: false,
            configParam: config,
			activeList:[],
			giftDrop:false,
			activeIndex:0,

            profit:false,
        };
    },
    watch: {
        addFundsPopup(v) {
            if (v === true) {
                uni.hideTabBar();
            } else {
                uni.showTabBar();
            }
        }
    },
    onLoad() {
        const device = uni.getSystemInfoSync();
        this.screenWidth = device.screenWidth;
    },
    onShow() {
        this.setTabbarIcon(this.userTheme)
		this.setTabText();
		this.setTabbarBg();
        this.getAssets();
        if (reloadLan === true) {
            this.switchLanguage();
            this.getBanner();
            this.getNotice();
        }
		this.switchLanguage();
        this.getLang();

        this.setTabbarLanguage();
		// if(!this.isLogin){
		//     uni.redirectTo({
		//         url: '/pages/home/home'
		//     });
		// }else{
		//     this.$mroute.home();
		// }
    },
    onReady() {
        this.getTradeCurrencyList();
        this.getMlist();
        this.getBanner();
        this.getNotice();
        // this.openUpgrade();
        this.checkUpdate();
		this.getActive();
        uni.$on('switchLan', () => {
            console.log('switch');
            reloadLan = true;
        });
		let _this = this;
        uni.$on('currency', () => {
			console.log("switch currency");
            _this.symbol = _this.$util.getLCS();
            _this.symbol_rate = _this.$util.getLCR();
        });
		
		uni.$on('addSelect',()=>{
			//重新获取自选数据
			this.getMlist();
			console.log("自选数据事件执行");
		});

        uni.$on('profit',(id,amount)=>{
            try{
                profitList[id] = parseFloat(amount);
                let total = 0;
                profitList.map((val)=>{
                    total += parseFloat(val);
                });
                _this.profit = total;
            }catch (e){
            }
        });

        uni.$on('no_position',()=>{
           _this.profit = false;
            _this.getAssets();
        });
    },
    computed: {
        ...mapState(['config', 'userinfo']),
        ...mapGetters(['isLogin', 'userAccount', 'userNickname', 'userTheme'])
    },
    created() {
        this.setTabbarBg();
    },
    methods: {
        ...mapMutations(['userLogin', 'setTabbarBg']),
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
        },
        setTabbarIcon(ustheme){
            const iconName = ['home', 'market', 'trade', 'contract', 'asset'];
            var iconType = ustheme === 'light' ? 'lb' : 'l';
            for (let index = 0; index < 3; index++) {
                uni.setTabBarItem({
                    index: index,
                    icon: `/static/statbar/new/${iconName[index]}_p.png`,
                    selectedIconPath:`/static/statbar/new/${iconName[index]}_${iconType}.png`
                });
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
        },
		toKline(cu_id, cm_id) {
		  uni.navigateTo({
		    url: "/pages/trade/kline?type=0&id=" + cu_id + "&cid=" + cm_id
		  })
		},
		copy(secret) {
	      var _this = this;
		  uni.setClipboardData({
		    data: secret,
		    success() {
		      uni.showToast({
		        title: _this.$t('google.copy_suc'),
		        icon: "none"
		      });
		    }
		  })
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
		closeActive(){
			if(this.activeIndex + 1 < this.activeList.length){
				this.giftDrop = false;
				setTimeout(()=>{
					this.activeIndex+=1;
					this.giftDrop = true;
				},300);
			}else{
				this.giftDrop = false;
				uni.showTabBar();
			}
		},
		toActive(){
			if(this.activeList[this.activeIndex]['is_login'] === 1 && !this.isLogin){
				//this.$mroute.login();
				return false;
			}
			if(
				this.activeList[this.activeIndex]['path'] == "/pages/contract/contract" ||
				this.activeList[this.activeIndex]['path'] == "/pages/trade/trade"
			){
				uni.switchTab({
					url:this.activeList[this.activeIndex]['path']
				})
			}else{
				uni.navigateTo({
					url:this.activeList[this.activeIndex]['path']
				})
			}
		},
        switchLanguage() {
            reloadLan = false;
            //设置tabbar语言
            uni.setTabBarItem({
                index: 0,
                text: this.$t('tab.home')
            });
            uni.setTabBarItem({
                index: 1,
                text: this.$t('tab.quote')
            });
            uni.setTabBarItem({
                index: 2,
                text: this.$t('tab.trade')
            });
            uni.setTabBarItem({
                index: 3,
                text: this.$t('tab.contract')
            });
            uni.setTabBarItem({
                index: 4,
                text: this.$t('tab.assets')
            });
            this.tabList =  [this.$t('自选'), this.$t('涨幅榜'), this.$t('跌幅榜'), this.$t('成交额')]
        },
		btnChange(type){
			this.acDefalut = type;
			this.closePopup();
			this.getMlist();
		},
        updateClient(flag) {
            if (this.update['force_update'] === 0 && flag === false) {
                this.$refs.upgrade.close();
                uni.showTabBar();
                return true;
            }
            if (flag === true) {
                if (download === true) {
                    return false;
                }
                var _this = this;
                download = true;
                var task = uni.downloadFile({
                    url: this.update['download_url'],
                    success: function (result) {
                        if (result.statusCode === 200) {
                            plus.runtime.install(
                                result.tempFilePath,
                                {
                                    force: false
                                },
                                function () {
                                    _this.closeUpgrade();
                                    _this.content = '更新完成，正在重启app，或手动重启';
                                    _this.$refs.alert.open();
                                    setTimeout(() => {
                                        plus.runtime.restart();
                                    }, 1500);
                                },
                                function (e) {
                                    _this.closeUpgrade();
                                    _this.content = '更新失败：' + JSON.stringify(e);
                                    _this.$refs.alert.open();
                                }
                            );
                        }
                    },
                    fail() {
                        this.closeUpgrade();
                        uni.showTabBar();
                        _this.content = '资源包下载失败，请重启app更新';
                        _this.$refs.alert.open();
                    }
                });
                task.onProgressUpdate((res) => {
                    _this.uptext = '下载更新包中：' + parseFloat(res.progress).toFixed(2) + '%';
                });
            } else {
                this.$refs.upgrade.close();
                uni.showTabBar();
            }
        },
        checkUpdate() {
            // #ifdef APP-PLUS
            var _this = this;
            common.checkUpdate().then((res) => {
                this.update = res.data;
                if (this.update.force_update == 1) {
                    this.uptext = this.$t('common.must_update');
                } else {
                    this.uptext = this.$t('common.not_must');
                }
                plus.runtime.getProperty(plus.runtime.appid, function (widgetInfo) {
                    if (widgetInfo.version !== res.data.app_version) {
                        _this.openUpgrade();
                    }
                });
            });
            // #endif
        },
        toNoticeDetail(item) {
            if (item.object_type == 4) {
                this.$mroute.webview(1, item.object_id, item.name);
            }
        },
        getMlist() {
			var key = this.acDefalut === 0 ? 'select-trade' : 'select-contract';
            var mlist = uni.getStorageSync(key);
            if (typeof mlist != 'undefined' && mlist != '') {
                this.loginType = false;
                this.mlist = mlist;
            }
        },
        selectMine() {
            //自选设置
            var mlist = [];
            //现货自选
            for (var i = 0; i < this.currencyDesc.length; i++) {
                if (typeof this.currencyDesc[i]['select'] == 'undefined' || !this.currencyDesc[i]['select']) {
                    mlist.push(this.currencyDesc[i]);
                }
            }
            var key = 'select-trade';
            if (mlist.length > 0) {
                uni.setStorage({
                    key: key,
                    data: mlist
                });
                this.mList = mlist;
                this.loginType = false;
                this.tabActive = 0;
                this.$nextTick(() => {
                    this.getMlist();
                });
            }
        },
        async getTradeCurrencyList() {
            let tradeCurrency = await currency.tradeCurrencyList();
            uni.setStorage({
                key: 'trade-currency',
                data: tradeCurrency['data']
            });
            this.currencyDesc = this.$util.sortDesc(tradeCurrency['data'][0]['currency']);
            this.currencyASC = this.$util.sortAsc(tradeCurrency['data'][0]['currency']);
            this.currencyQuan = this.$util.sortQuan(tradeCurrency['data'][0]['currency']);
            this.hotCurrencyList = tradeCurrency['data'][0]['currency'].slice(0, 3);
        },
        onTradeMessage(data) {
            if (data.type != 100) {
                return false;
            }
			if (this.tabActive === 1 && this.currencyDesc.length > 0) {
				this.currencyDesc = this.$util.sortDesc(this.$util.compareCurrency(this.currencyDesc,data.data));
			}
            if (this.tabActive === 2 && this.currencyASC.length > 0) {
				this.currencyASC = this.$util.sortAsc(this.$util.compareCurrency(this.currencyASC,data.data));
            }
            if (this.tabActive === 3 && this.currencyQuan.length > 0) {
				this.currencyQuan = this.$util.compareCurrency(this.currencyQuan,data.data);
            }
            if (this.tabActive === 0 && this.mlist.length > 0) {
                this.mlist = this.$util.compareCurrency(this.mlist,data.data);
            }
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
            uni.scanCode({
                success(e) {
                    console.log(e);
                }
            });
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
            userApi.getBalance().then((res) => {
                if (res.code == 200) {
                    var total = 0;
                    res.data.balance.map((item) => {
                        if (item.symbol == 'USDT') {
                            total +=
                                parseFloat(item.balance) +
                                parseFloat(item.contract_balance) +
                                parseFloat(item.finance_balance) +
                                parseFloat(item.future_balance) +
                                parseFloat(item.trade_balance);
                        } else {
                            var new_price = parseFloat(item.new_price != null ? item.new_price : 0);
                            total +=
                                (parseFloat(item.balance) +
                                    parseFloat(item.contract_balance) +
                                    parseFloat(item.finance_balance) +
                                    parseFloat(item.future_balance) +
                                    parseFloat(item.trade_balance)) *
                                new_price;
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
                icon: 'none',
                duration: 2000
            });
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
                pagePath: 'pages/index/simulation/simulation'
            });
            uni.setTabBarItem({
                index: 3,
                pagePath: 'pages/index/simulation/contruct/contruct',
                text: '交易'
            });
            uni.setTabBarItem({
                index: 4,
                pagePath: 'pages/index/simulation/wallet/wallet'
            });
            uni.switchTab({
                url: '/pages/index/simulation/simulation'
            });
        },
        loginOut() {
            this.userLogin(false);
        },
        openDraw() {
            this.$refs.showRight.open();
            uni.hideTabBar();
        },
        closeDrawer() {
            this.$refs.showRight.close();
            uni.showTabBar();
        },
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
        bottomPopup() {
            this.$refs.popup.open();
            uni.hideTabBar();
        },
        closePopup() {
            this.$refs.popup.close();
            uni.showTabBar();
        },
        tabChange(e) {
            this.tabActive = e.index;
        },
        coinSwiperChange(e){
          this.tabActive = e.detail.current
        },
        openUpgrade() {
            this.$refs.upgrade.open();
            uni.hideTabBar();
        },
        closeUpgrade() {
            this.$refs.upgrade.close();
            uni.showTabBar();
        },
        navBanner(item) {
            if (parseInt(item.object_type) === 1) {
                uni.navigateTo({
                    url: item.url
                });
            }
        },
        getLang() {
            this.language = uni.getStorageSync('lang');
        },
        showAddFunds() {
            this.addFundsPopup = !this.addFundsPopup;
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
};