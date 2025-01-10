<template>
    <view class="baseAuth" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     :title="$t('auths.t21')"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="baseAuth-container">
            <!-- 身份证正面 -->
            <view class="upload-label">
                <text class="font-14 color-black font-weight">
                    {{ img[index]['title'] }}
                </text>
                <image class="upload-image"
                       :src="img[index]['imgnum']"
                       @click="upload(1)"
                       mode="widthFix">
                </image>
            </view>
            <!-- 身份证背面 -->
            <view class="upload-label" v-if="img[index]['imgimgshow']">
                <text class="font-14 color-black font-weight">
                    {{ img[index]['title2'] }}
                </text>
                <image class="upload-image"
                       :src="img[index]['imgimg']"
                       @click="upload(2)"
                       mode="widthFix">
                </image>
            </view>
            <!-- 上传要求 -->
            <view class="upload-tips">
                <text class="font-13 color-black font-weight">
                    {{ $t('auths.t22') }}
                </text>
                <text class="font-13 color-gray mt-10">
                    {{ $t('auths.t23') }}
                </text>
                <text class="font-13 color-gray mt-5">
                    {{ $t('auths.t24') }}
                </text>
            </view>
        </view>
        <view class="footer-button">
            <fui-button background="var(--content-primary)"
                        color="var(--background-primary)"
                        size="26"
                        radius="78rpx"
                        height="78rpx"
                        :text="$t('auths.t25')"
                        @click="submit()">
            </fui-button>
        </view>
        <alert ref="alert" :title="title" :content="content" :ctxt="ctxt"></alert>
        <fui-bottom-popup :show="photoShow" background="var(--background-primary)" :safeArea="false" @close="photoShow = false">
            <view class="card-popup bg-white">
                <view class="list">
                    <!-- #ifndef H5 -->
                    <view class="_row" @click="chooseImage(0)">
                        <text class="font-15 font-weight color-black">{{ $t('chooseimage.txt1') }}</text>
                    </view>
                    <!-- #endif -->
                    <view class="_row" @click="chooseImage(1)">
                        <text class="font-15 font-weight color-black">{{ $t('chooseimage.txt2') }}</text>
                    </view>
                </view>
                <view class="cancel-button" @click="photoShow = false">
                    <text class="font-15 font-weight color-black">{{ $t('login.cancel') }}</text>
                </view>
            </view>
        </fui-bottom-popup>
    </view>
</template>

<script>
import common from '/common/api/common.js';
import user from '/common/api/user.js';
import {mapGetters} from 'vuex';

var info;
var res = false;
export default {
    data() {
        return {
            img: [
                {},
                {
                    "title": this.$t('auths.t26'),
                    "title2": this.$t('auths.t27'),
                    "imgnumshow": true,
                    "imgnum": "/static/img/cardnumw.png",
                    "imgimgshow": true,
                    "imgimg": "/static/img/cardimgw.png"
                },
                {
                    "title": this.$t('auths.t28'),
                    "imgnumshow": true,
                    "imgnum": "/static/img/huzhaow.png",
                    "imgimgshow": false
                },
                {
                    "title": this.$t('auths.t29'),
                    "imgnumshow": true,
                    "imgnum": "/static/img/carimgw.png",
                    "imgimgshow": false
                },
                {
                    "title": this.$t('auths.t30'),
                    "imgnumshow": true,
                    "imgnum": "/static/img/imgw.png",
                    "imgimgshow": false
                }
            ],
            index: 3,
            title: this.$t('login.tip_t2'),
            content: "",
            ctxt: this.$t('取消'),
            photoShow: false
        }
    },
    onLoad(e) {
        if (e.index) {
            this.index = parseInt(e.index);
        }
        info = uni.getStorageSync('authInfo');
    },
    onShow() {
        this.getInfo();
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        submit() {
            if (!info['img1'] || typeof info['img1'] == 'undefined') {
                this.content = this.$t('auths.t31');
                this.$refs.alert.open();
                return false;
            }
            uni.showLoading();
            user.submitAuthInfo(info).then(res => {
                uni.hideLoading();
                if (res.code != 200) {
                    this.content = res.message;
                    this.$refs.alert.open();
                } else {
                    this.$mroute.authing();
                }
            }).catch(res => {
                this.content = this.$t('auths.t32');
                this.$refs.alert.open();
                uni.hideLoading();
            });
        },
        getInfo() {
            user.baseAuthInfo().then(res => {
                if (typeof res['data']['id'] != 'undefined' && res['data']['id']) {
                    this.cardType = res['data']['type'];
                    this.img[this.cardType]['imgnum'] = res['data']['img1'];
                    this.img[this.cardType]['imgimg'] = res['data']['img2'];
                    this.$forceUpdate();
                }
            });
        },
        upload(i) {
            var _this = this;
            _this.i = i;
            _this.photoShow = true;
        },
        chooseImage(cindex){
            var _this = this;
            _this.photoShow = false;
            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: [cindex === 0 ? 'camera' : 'album'],
                success(res) {
                    uni.showLoading({
                        title: 'uploading'
                    });
                    common.uploadFile(res.tempFilePaths[0]).then(res => {
                        uni.hideLoading();
                        console.log(res.data);
                        let responseData = JSON.parse(res.data);
                        if (responseData.code != 200) {
                            _this.content = res.message;
                            _this.$refs.alert.open();
                        }

                        if (_this.i == 1) {
                            _this.img[_this.index]['imgnum'] = responseData.data.url;
                            info['img1'] = responseData.data.url;
                        } else {
                            info['img2'] = responseData.data.url;
                            _this.img[_this.index]['imgimg'] = responseData.data.url;
                        }
                    }).catch(res => {
                        uni.hideLoading();
                        _this.content = _this.$t('auths.t32');
                        _this.$refs.alert.open();
                    });
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "baseauth";

.card-popup {
    padding-bottom: 0;
}
</style>
