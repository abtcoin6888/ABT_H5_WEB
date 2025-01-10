import {
    mapGetters,
    mapState
} from 'vuex';

import tradeApi from '@/common/api/contract';
import Api from '@/common/api/trade';
import fuiDatePicker from "@/components/firstui/fui-date-picker/fui-date-picker.vue";
import config from '@/common/api/config.js';
import emptyView from "@/components/emptyView/emptyView.vue";


let page = 1;
let action = 0;

let start;
let end;

export default {
    components: { fuiDatePicker, emptyView },
    computed: {
        ...mapGetters(['userTheme']),
        ...mapState(['userinfo'])
    },
    data() {
        return {
            navBarHeight: "",
            swiperHeight: "",
            tabOptions: [this.$t('contruct.cur_od'), this.$t('cor.t3'), this.$t('cor.t4')],
            tabActive: 0,
            duration: 400,
            contianerHeight: "",

            currency_id: 0,
            ttype: 0,
            list: [],
            content: "",

            coinShow: false,
            currency: uni.getStorageSync('contract-matches'),
            symbol: "",

            cids: 0,

            showType: false,
            typeList: [
                this.$t('list.all_t'),
                this.$t('trade.mk_od'),
                this.$t('trade.lm_od'),
                this.$t('contruct.con_sheet')
            ],
            otype: 0,

            timeShow: false,
            maxDate: '',
            dateFilter: false,
            start: "",
            end: "",

            visible: false,
            path: ""
        }
    },
    onReady() {
        this.getData();
        this.maxDate = this.$util.getDateStr();
    },
    watch: {
        currency_id(v) {
            page = 1;
            this.getData();
        },
        otype(v) {
            this.ttype = v;
            page = 1;
            this.getData();
        }
    },
    methods: {
        navInit(e) {
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            this.navBarHeight = e.height + e.statusBarHeight;
            this.swiperHeight = windowHeight - this.navBarHeight;

            this.contianerHeight = windowHeight - e.height - e.statusBarHeight - 44;
        },
        getProfitRate(price, amount, muilt, profit) {
            let uamount = price * amount;
            let margin = uamount / muilt;
            return parseFloat(profit / margin * 100).toFixed(2);
        },
        loadMore(e) {
            if (e.detail.direction === "bottom") {
                page = page + 1;
                this.$refs.loading.open();
                this.getData();
            }
        },
        setDate(e) {
            this.start = e.startDate.result;
            this.end = e.endDate.result;
            this.dateFilter = true;
            page = 1;
            this.timeShow = false;
            this.getData();
        },
        tabChange(e) {
            this.tabActive = e.index;
            this.duration = 0;
        },
        getData() {
            try {
                this.$refs.loading.open();
            } catch (e) { }
            let time = '';
            if (this.dateFilter) {
                time = this.start + '|' + this.end
            }
            tradeApi.getHistory(this.currency_id, page, this.ttype, time).then(res => {
                this.$refs.loading.close();
                if (page === 1) {
                    this.list = res.data;
                } else {
                    this.list.entrust.list = this.list.entrust.list.concat(res.data.entrust.list);
                    this.list.history.list = this.list.history.list.concat(res.data.history.list);
                    this.list.profit.list = this.list.profit.list.concat(res.data.profit.list);
                }
            });
        },
        cancelOrder(id) {
            this.cids = id;
            this.content = this.$t('list.inquire_con');
            this.$refs.alert.open();
            action = 1;
        },
        confirm() {
            if (action === 1) {
                this.$refs.loading.open();
                tradeApi.cancelOpeartion(this.cids).then(res => {
                    action = 0;
                    this.$refs.loading.close();
                    if (res.code === 200) {
                        this.content = this.$t('trade.suc_wid');
                        this.$refs.alert.open();
                        this.getData();
                    } else {
                        this.content = res.message;
                        this.$refs.alert.open();
                    }
                });
            }
        },
        handClose() {
            this.visible = false;
        },
        copyLink() {
            let _this = this;
            uni.setClipboardData({
                data: config['DOMAIN'] + '/#/pages/login/login?code=' + (this.userinfo['invite_code'] ? this.userinfo['invite_code'] : ''),
                success() {
                    // _this.visible = false;
                    uni.showToast({
                        title: "copied",
                        icon: "success"
                    })
                }
            });
        },
        savePoster() {
            this.$refs.dpainter.canvasToTempFilePathSync({
                fileType: "jpg",
                // 如果返回的是base64是无法使用 saveImageToPhotosAlbum，需要设置 pathType为url
                pathType: 'url',
                quality: 1,
                success: (res) => {
                    console.log(res.tempFilePath);
                    // #ifdef H5
                    window.location.href = res.tempFilePath;
                    // #endif
                    // #ifndef H5
                    uni.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: function () {
                            console.log('save success');
                            uni.showToast({
                                title: "success",
                                icon: "success"

                            })
                        }
                    });
                    // #endif
                    // 非H5 保存到相册
                },
            });
        },
        renderSuccess(e) {
            this.path = e;
        },
        more() {
            uni.shareWithSystem({
                type: "image",
                imageUrl: this.path,
                summary: "",
                fail(e) {
                    console.log(e);
                }
            });
        },
        setPoster(item) {
            this.visible = true;
            const share_background = "/static/img/tactic/tactic-share-bg.png"
            const logo_image = "/static/home/cvlogo.png"
            const code_img = "/static/home/cblogo.png"

            setTimeout(() => {
                var poster = {
                    css: {
                        background: "#161819",
                        width: "540rpx",
                        height: "740rpx",
                        overflow: "hidden",
                        position: 'relative',
                        borderRadius: "16rpx"
                    },
                    views: [
                        {
                            type: "image",
                            src: share_background,
                            css: {
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: "0",
                                left: "0",
                                borderRadius: "16rpx"
                            }
                        },
                        {
                            type: "view",
                            css: {
                                width: "100%",
                                height: "83%",
                                position: "absolute",
                                top: "0",
                                left: "0",
                            },
                            views: [
                                {
                                    type: "image",
                                    src: logo_image,
                                    css: {
                                        width: "100rpx",
                                        height: "50rpx",
                                        marginLeft: "30rpx",
                                        marginTop: "30rpx"
                                    }
                                },
                                {
                                    type: "text",
                                    text: item['created_at'] + "(UTC+8)",
                                    css: {
                                        width: "100%",
                                        textAlign: "left",
                                        lineClamp: 1,
                                        color: "#898989",
                                        marginLeft: "30rpx",
                                        marginTop: "10rpx"
                                    }
                                },
                                // {
                                //     type: "text",
                                //     text: "现货定投",
                                //     css: {
                                //         width: "100%",
                                //         textAlign: "left",
                                //         lineClamp: 1,
                                //         fontSize: "24rpx",
                                //         color: "#898989",
                                //         marginLeft: "30rpx",
                                //         marginTop: "80rpx"
                                //     }
                                // },
                                {
                                    type: "text",
                                    text: item['symbol'] + "USDT " + (item.direction === 1 ? this.$t('cor.t11') : this.$t('cor.t12')) + " " + item['muilt'] + "X",
                                    css: {
                                        width: "100%",
                                        textAlign: "left",
                                        lineClamp: 1,
                                        color: "#ffffff",
                                        fontSize: "32rpx",
                                        fontWeight: "bold",
                                        marginLeft: "30rpx",
                                        marginTop: "20rpx"
                                    }
                                },
                                {
                                    type: "text",
                                    text: this.$t('ice.t2'),
                                    css: {
                                        width: "100%",
                                        textAlign: "left",
                                        fontSize: "24rpx",
                                        lineClamp: 1,
                                        color: "#898989",
                                        marginLeft: "30rpx",
                                        marginTop: "20rpx"
                                    }
                                },
                                {
                                    type: "text",
                                    text: this.getProfitRate(item.price > 0 ? item.price : item.t_price, item.amount, item.muilt, item.profit) + "%",
                                    css: {
                                        width: "100%",
                                        textAlign: "left",
                                        lineClamp: 1,
                                        color: parseFloat(item.profit) > 0 ? '#4d9eb1' : "#ea4337",
                                        fontSize: "48rpx",
                                        fontWeight: "bold",
                                        marginLeft: "30rpx",
                                        marginTop: "20rpx"
                                    }
                                },
                                {
                                    type: "view",
                                    css: {
                                        width: "100%",
                                        marginTop: "30rpx"
                                    },
                                    views: [{
                                        type: "text",
                                        text: this.$t('contruct.avp_price'),
                                        css: {
                                            textAlign: "left",
                                            fontSize: "24rpx",
                                            lineClamp: 1,
                                            color: "#898989",
                                            marginLeft: "30rpx",
                                        }
                                    }, {
                                        type: "text",
                                        text: this.$util.thousandSeparator(item.price, 2),
                                        css: {
                                            textAlign: "left",
                                            fontSize: "24rpx",
                                            fontWeight: "bold",
                                            lineClamp: 1,
                                            color: "#ffffff",
                                            marginLeft: "30rpx",
                                        }
                                    }]
                                },
                                {
                                    type: "view",
                                    css: {
                                        width: "100%",
                                        marginTop: "30rpx"
                                    },
                                    views: [{
                                        type: "text",
                                        text: this.$t('contruct.close_price'),
                                        css: {
                                            textAlign: "left",
                                            fontSize: "24rpx",
                                            lineClamp: 1,
                                            color: "#898989",
                                            marginLeft: "30rpx",
                                        }
                                    }, {
                                        type: "text",
                                        text: this.$util.thousandSeparator(item.t_price_4 === null ? item.t_price_3 : item.t_price_4, 2),
                                        css: {
                                            textAlign: "left",
                                            fontSize: "24rpx",
                                            fontWeight: "bold",
                                            lineClamp: 1,
                                            color: "#ffffff",
                                            marginLeft: "30rpx",
                                        }
                                    }]
                                }
                            ]
                        }, {
                            type: "view",
                            css: {
                                width: "100%",
                                height: "17%",
                                position: "absolute",
                                bottom: "0",
                                left: "0"
                            },
                            views: [{
                                type: "text",
                                text: this.$t('invaite.tt2') + "：" + this.userinfo['invite_code'],
                                css: {
                                    width: "50%",
                                    height: "100%",
                                    paddingLeft: "30rpx",
                                    boxSizing: "border-box",
                                    fontSize: "26rpx",
                                    fontWeight: "bold",
                                    color: "#ffffff"
                                }
                            }, {
                                type: "view",
                                css: {
                                    width: "95rpx",
                                    height: "95rpx",
                                    background: "#ffffff",
                                    position: "absolute",
                                    bottom: "20rpx",
                                    right: "20rpx",
                                    borderRadius: "0rpx"
                                },
                                views: [{
                                    type: "qrcode",
                                    text: config['DOMAIN'],
                                    css: {
                                        width: "85rpx",
                                        height: "85rpx",
                                        // background: this.userTheme === 'dark' ? '#ffffff':"#000000",
                                        marginTop: "5rpx",
                                        marginLeft: "5rpx"
                                    },
                                    with: 85,
                                    height: 85,
                                    x: 0,
                                    y: 0,
                                    background: this.userTheme === 'dark' ? '#ffffff' : "#000000",
                                    foreground: this.userTheme === 'dark' ? '#ffffff' : "#ffffff"
                                }]
                            }]
                        }
                    ],
                }
                this.$refs.dpainter.render(poster);
            }, 100)
        },
    }
}