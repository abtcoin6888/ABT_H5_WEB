import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
import fuiButton from "@/components/firstui/fui-button/fui-button.vue"
import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue"
import fuiBackdrop from "@/components/firstui/fui-backdrop/fui-backdrop.vue"

import config from '@/common/api/config.js';
import commonApi from '@/common/api/common.js';
import UQRCode from 'uqrcodejs';
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex';

var init = 0;
export default {
    components: {
        fuiNavBar,
        fuiTag,
        fuiButton,
        fuiBackdrop
    },
    data() {
        return {
            rate: 0,
            bg_opcity: 0,
            lang: "",
            scrollTop: 0,
            invite_link: "",
            codePopup: false,
            posterPopup: false,
            config: {},
            share: {group:{},topUser:[],users:[]},

            navHeight: "",
            scrollHeight: "",

            qrsize: 150
        }
    },
    onReady() {

    },
    onShow() {
        this.lang = uni.getStorageSync('lang');

        this.getDefault();
        this.getShareData();
    },
    computed: {
        ...mapGetters(['isLogin', 'userTheme']),
        ...mapState(['userinfo'])
    },
    methods: {
        navInit(e) {
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            this.navHeight = e.height + e.statusBarHeight;
            this.scrollHeight = windowHeight;
        },
        getShareData() {
            commonApi.getShareData().then(res => {
                console.log(res.data);
                this.share = res.data;
            });
        },
        getDefault() {
            commonApi.getDefaultShare().then(res => {
                this.config = res.data;
                this.setLink();
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
        copy() {
            if (!this.isLogin) {
                return this.$mroute.login();
            }
            var text = this.config['share_code'];
            uni.setClipboardData({
                data: text,
                success() {
                    uni.showToast({
                        title: 'copy success',
                        icon: "none"
                    });
                }
            })
        },
        copyLink() {
            if (!this.isLogin) {
                return this.$mroute.login();
            }
            uni.setClipboardData({
                data: this.invite_link,
                success() {
                    uni.showToast({
                        title: 'copy success',
                        icon: "none"
                    });
                }
            })
        },
        setLink() {
            this.invite_link = config['DOMAIN'] + "/#/s?code=" + this.config['share_code'];
        },
        sliderChange(e) {
            this.rate = e.detail.value;
        },
        open() {
            if (!this.isLogin) {
                return this.$mroute.login();
            }
            this.codePopup = true;
            if (init === 0) {
                init = 1;
                var text = config['DOMAIN'] + "/#/s?code=" + this.config['share_code'];
                setTimeout(() => {
                    var qr = new UQRCode();
                    qr.data = text;
                    qr.size = this.qrsize;
                    qr.make();
                    var canvasContext = uni.createCanvasContext('qrcode', this);
                    qr.canvasContext = canvasContext;
                    qr.drawCanvas();
                }, 200);
            }
        },
        openPoster() {
            this.posterPopup = true;
            this.setPoster();
        },
        setPoster() {
            var lang = uni.getStorageSync('lang');
            if (lang === 'zh-Hant') {
                var bg = '/static/invaite/poster_bg.png';
            } else {
                var bg = '/static/invaite/poster_bg_en.png';
            }
            setTimeout(() => {
                var poster = {
                    css: {
                        background: "#161819",
                        width: "650rpx",
                        height: "1150rpx",
                        overflow: "hidden",
                        position: 'relative',
                        borderRadius: "30rpx"
                    },
                    views: [{
                        type: 'image',
                        src: bg,
                        css: {
                            width: "650rpx",
                            height: "1150rpx",
                            borderRadius: "30rpx",
                            position: "absolute",
                            left: "0",
                            top: "0"
                        }
                    }, {
                        type: 'view',
                        css: {
                            width: '150rpx',
                            height: '150rpx',
                            borderRadius: "16rpx",
                            background: "#ffffff",
                            zIndex: '3',
                            position: 'absolute',
                            bottom: '40rpx',
                            right: '40rpx'
                        }
                    }, {
                        type: 'qrcode',
                        text: config['DOMAIN'] + "/#/s?code=" + this.config['share_code'],
                        css: {
                            width: '120rpx',
                            height: '120rpx',
                            zIndex: '3',
                            position: 'absolute',
                            bottom: '55rpx',
                            right: '55rpx'
                        }
                    }]
                }
                this.$refs.dpainter.render(poster);
            }, 200)
        },
        scroll(e) {
            this.bg_opcity = e.detail.scrollTop * 0.01;
            this.scrollTop = e.detail.scrollTop;
        }
    }
}