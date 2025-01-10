<template>
    <view class="baseAuth" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     :title="$t('auths.t33')"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="baseAuth-container">
            <view class="upload-label">
                <text class="font-14 color-black font-weight">
                    {{ $t('auths.t34') }}
                </text>
                <image class="upload-image"
                       :src="preview"
                       @click="upload(1)"
                       mode="widthFix">
                </image>
            </view>
            <!-- 上传要求 -->
            <view class="upload-tips">
                <text class="font-13 color-black font-weight">
                    {{ $t('auths.t35') }}
                </text>
                <text class="font-13 color-gray mt-10">
                    {{ $t('auths.t36') }}
                </text>
                <text class="font-13 color-gray mt-5">
                    {{ $t('auths.t37') }}
                </text>
            </view>
        </view>
        <view class="footer-button" v-if="!info['img3']">
            <fui-button background="var(--content-primary)"
                        color="var(--background-primary)"
                        size="26"
                        radius="78rpx"
                        height="78rpx"
                        :text="$t('auths.t38')"
                        @click="submit">
            </fui-button>
        </view>
        <view class="footer-button" v-else>
            <view class="_button">
                <text class="font-14 color-gray font-weight">{{ $t('auths.t39') }}</text>
            </view>
        </view>
        <alert ref="alert" :title="title" :content="content" :ctxt="ctxt"></alert>
    </view>
</template>

<script>
import common from '/common/api/common.js';
import user from '/common/api/user.js';
import {mapGetters} from 'vuex';

var info;
var res = false;
var url = false;
export default {
    data() {
        return {
            title: this.$t('login.tip_t2'),
            content: "",
            ctxt: this.$t('取消'),
            preview: "/static/img/b5.png",
            info: {}
        }
    },
    onLoad(e) {
        if (e.index) {
            this.index = parseInt(e.index);
        }
    },
    onShow() {
        this.getInfo();
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        submit() {
            if (!url) {
                this.content = this.$t('auths.t40');
                this.$refs.alert.open();
                return false;
            }
            uni.showLoading();
            user.submitHightAuth(url).then(res => {
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
                    this.info = res.data;
                    this.$forceUpdate();
                }
            });
        },
        upload(i) {
            var _this = this;
            uni.chooseVideo({
                count: 1,
                mediaType: ['video'],
                sourceType: ['album', 'camera'],
                maxDuration: 10,
                sizeType: ['compressed'],
                success(res) {
                    console.log(res);
                    uni.showLoading({
                        title: 'uploading'
                    });
                    common.uploadFile(res.tempFilePath).then(res => {
                        uni.hideLoading();
                        var result = JSON.parse(res.data);
                        console.log(result.code);
                        if (result.code != 200) {
                            _this.content = result.message;
                            _this.$refs.alert.open();
                        }
                        url = result.data.url;
                        _this.preview = url;
                        _this.submit();
                    }).catch(res => {
                        console.log(res);
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
@import "../baseauth";
</style>
