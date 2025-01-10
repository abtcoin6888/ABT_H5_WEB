import fuiBottomPopup from "@/components/firstui/fui-bottom-popup/fui-bottom-popup.vue"
import emptyView from "@/components/emptyView/emptyView.vue";
import FuiTag from "@/components/firstui/fui-tag/fui-tag.vue";
import {mapGetters} from 'vuex';
import util from "@/common/util";
import config from "@/common/api/config";

export default {
    components: {
        FuiTag,
        fuiBottomPopup,
        emptyView
    },
    data() {
        return {
            scrollTabs: ['数字货币', '全球期货', '全球外汇'],
            direction: 1, //1 开仓 2平仓
            scrollTabIndex: 0,
            priceFocus: false,
            numberFocus: false,
            modeOptions: ['限价单', '高级限价单', '市价单', '计划委托', '追踪委托'],
            orderModeVal: '限价单',
            orderModeIndex: 0, //下单模式Index
            camFocus: false, //回调幅度聚焦
            camVal: '', //回调幅度
            listTabs: ['当前持仓', '委托', '资产'],
            listTabIndex: 0,
            onlyCurrency: false, //只看当前
            entrustTags: ['限价|市价', '追踪委托', '止盈止损', '计划委托'], //委托下横向滚动菜单
            entrustTagIndex: 0,
            rateValue: 0, //滑块
            profitLossType: false, //止盈-止损
            bodyHeight: "", //整体内容高度
            scrollTop: "",
            swiperHeight: "",
            shareVisible: false, //海报弹窗
            pointVisible: false, //委托展示深度
            pointVal: '0.00001',
            pointList: ['0.00001', '0.0001', '0.001', '0.01'],
            pointActive: 0,
            modifyOrderVisible: false, //修改订单弹出
            moreVisible: false, //更多弹出层
            moreMenu: [{
                iconName: "hz",
                text: "资金划转"
            }, {
                iconName: "lcjl",
                text: "资金流水"
            }
			// , {
   //              iconName: "hyxx",
   //              text: "合约资料"
   //          }, {
   //              iconName: "jsq",
   //              text: "计算器"
   //          },
			],
            explainVisible: false, //解释说明弹出层
            explainType: 0,
            closeAllPositions: false, //全部平仓
            backhand: false, //反手说明
            prompt: false, //不再提示
            closePositionVisible: false, //平仓
            closePositionRate: 0,
            advancedVisible: false, //止盈止损弹出层
            advancedTabs: ['仓位止盈止损', '止盈止损', '移动止盈止损'],
            advancedTabIndex: 0,
            advancedSwiperHeight: "",
            stopProfitVal: 0, //止盈滑块
            stopLossVal: 0, //止损滑块
            contractUnit: false, //合约单位设置
            radioList: [{
                val: 0,
                type: "XRP",
                title: "数量",
                desc: "请您填写合约数量，单位为XRP。",
            }, {
                val: 1,
                type: "USDT",
                title: "成本价值",
                desc: "使用成本价值时，开仓成本不会随杠杆变化。",
            }, {
                val: 2,
                type: "USDT",
                title: "名义价值",
                desc: "使用标的资产的市场价值时，开仓成本会随杠杆变化。"
            }],
            contractunitChecked: 0,
            marginModel: false,
            marginModelOption: ['全仓', '逐仓',],
            modelActive: 0,
            leverVisible: false,
            leverValue: 1,
            orderModeVisible: false,
            modeTabIndex: 0
        }
    },
    computed: {
        ...mapGetters(['isLogin', 'userTheme','lang'])
    },
    created() {
        var windowHeight = uni.getSystemInfoSync().windowHeight;
        var statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
        var navHeight = statusBarHeight + 78;
        this.bodyHeight = windowHeight - navHeight;
        this.swiperHeight = this.bodyHeight - 55;
        this.advancedSwiperHeight = windowHeight - 180;
        this.setTabbarLanguage();
    },
    watch: {
        shareVisible(v) {
            if (v) {
                this.setPoster();
                this.hideTabBar();
            } else {
                this.showTabbar();
            }
        },
    },
    methods: {
        orderModeChange(e) {
            this.orderModeVal = e.text;
            this.orderModeIndex = e.index;
        },
        sliderChange(e) {
            this.rateValue = e.detail.value;
        },
        // 杠杆调整滑块
        leverSliderChange(e) {
            this.leverValue = e.detail.value;
        },
        bodyScroll(e) {
            this.scrollTop = e.detail.scrollTop;
            if (this.scrollTop > 50) {
                var statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
                var navHeight = statusBarHeight + 44;
                var windowHeight = uni.getSystemInfoSync().windowHeight;
                this.bodyHeight = windowHeight - navHeight;
                this.swiperHeight = this.bodyHeight - 44;
            }
        },
        //自动显示底部导航栏
        hiddenTabbar(e) {
            if (e) {
                this.hideTabBar();
            } else {
                this.showTabBar();
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
        pointChange(item, index) {
            this.pointVal = item;
            this.pointActive = index;
            this.pointVisible = false;
        },
        // 平仓滑块
        closePositionSlider(e) {
            this.closePositionRate = e.detail.value;
        },
        // 止盈滑块
        stopProfitChange(e) {
            this.stopProfitVal = e.detail.value;
        },
        // 止损滑块
        stopLossChange(e) {
            this.stopLossVal = e.detail.value;
        },
        // 合约单位设置
        radioChange(e) {
            this.contractunitVal = e;
            this.contractunitChecked = e.val;
            this.contractUnit = false;
        },
        setPoster() {
            const share_background = "/static/img/tactic/tactic-share-bg.png"
            const logo_image = "/static/home/cvlogo.png"
            const postHeight = uni.getSystemInfoSync().windowHeight - 200;
            setTimeout(() => {
                var poster = {
                    css: {
                        background: "#161819",
                        width: "690rpx",
                        height: `${postHeight - 100}px`,
                        overflow: "hidden",
                        borderRadius: "16rpx",
                        marginTop: "0rpx",
                        marginLeft: "30rpx"
                    },
                    views: [
                        {
                            type: 'view',
                            css: {
                                width: "690rpx",
                                height: `${postHeight - 100}px`,
                                position: 'relative',
                            },
                            views: [
                                {
                                    type: "image",
                                    src: share_background,
                                    css: {
                                        width: "690rpx",
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
                                        width: "690rpx",
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
                                            text: '2023-13-15',
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
                                                    src: 'this.userAvatar',
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
                                                        text: 'nickname',
                                                        css: {
                                                            width: "532rpx",
                                                            fontSize: "44rpx",
                                                            fontWeight: "bold",
                                                            color: "#ffffff",
                                                        }
                                                    },
                                                        {
                                                            type: "text",
                                                            text: '132465',
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
                                            text: 'BTCUSDT',
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
                                                    text: "做多",
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
                                                    text: "100X",
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
                                            text: "0.256%",
                                            css: {
                                                width: "702rpx",
                                                padding: "0 30rpx 60rpx 30rpx",
                                                mraginTop: "10rpx",
                                                fontSize: "60rpx",
                                                color: "#03aac7",
                                                fontWeight: "600"
                                            }
                                        },
                                        {
                                            type: "view",
                                            css: {
                                                width: "702rpx",
                                                padding: "0 30rpx",
                                                display: "flex",
                                                alignItems: "center",
                                            },
                                            views: [
                                                {
                                                    type: "text",
                                                    text: "持仓均价",
                                                    css: {
                                                        marginRight: "40rpx",
                                                        fontSize: "28rpx",
                                                        color: "#898989"
                                                    }
                                                }, {
                                                    type: "text",
                                                    text: "123",
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
                                                    text: "当前价格",
                                                    css: {
                                                        marginRight: "40rpx",
                                                        fontSize: "28rpx",
                                                        color: "#898989"
                                                    }
                                                }, {
                                                    type: "text",
                                                    text: "1654",
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
                                        width: "690rpx",
                                        height: "180rpx",
                                        position: "absolute",
                                        bottom: "0",
                                        left: "0",
                                        display: "flex",
                                        alignItems: "center"
                                    },
                                    views: [{
                                        type: "text",
                                        text: "邀请码：46546",
                                        css: {
                                            marginRight: "40rpx",
                                            fontSize: "28rpx",
                                            color: "#ffffff",
                                            fontWeight: "600",
                                            position: 'absolute',
                                            left: "30rpx",
                                            top: "85rpx"
                                        }
                                    },
                                        {
                                            type: "view",
                                            css: {
                                                width: "115rpx",
                                                height: "115rpx",
                                                background: "#ffffff",
                                                borderRadius: "8rpx",
                                                position: 'absolute',
                                                right: "30rpx",
                                                top: "50rpx"
                                            },
                                            views: [{
                                                text: "5465",
                                                type: "qrcode",
                                                css: {
                                                    width: "105rpx",
                                                    height: "105rpx",
                                                    marginLeft: "5rpx",
                                                    marginTop: "5rpx"
                                                }
                                            }]
                                        }]
                                }
                            ]
                        }
                    ],
                }
                this.$refs.dpainter.render(poster).then(res => {
                    this.$refs.loading.close();
                })
            }, 100)
        },
    }
}