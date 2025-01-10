<template>
    <view class="faceID" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     :title="$t('face.tittle')"
                     color="var(--content-primaryk)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primaryk)">
            </fui-icon>
        </fui-nav-bar>

        <view class="faceID-body" :style="{'height': (($device.windowHeight - navHeight) / 1.6) + 'px'}">
            <view class="faceID-body-banner">
                <image src="/static/img/face.webp" mode="widthFix"></image>
                <text class="font-18 color-black font-weight mt-20">
                    面容ID
                </text>
                <text class="font-14 color-gray mt-15">
                    开启人脸识别验证，资金更安全
                </text>
            </view>
            <view class="faceID-body-buttons">
                <view class="button-box">
                    <fui-button height="78rpx"
                                radius="78rpx"
                                :background="disable === true ? 'var(--content-primary)' : 'var(--background-secondary)'"
                                :color="disable === true ? 'var(--background-primary)' : 'var(--content-tertiary)'"
                                size="26"
                                :text="disable === false ? '无法设置' : '立即设置'"
                                @click="setFace()">
                    </fui-button>
                </view>
                <view class="button-box">
                    <fui-button height="78rpx"
                                radius="78rpx"
                                background="var(--background-secondary)"
                                color="var(--content-tertiary)"
                                size="26"
                                text="跳过"
                                @click="$mroute.home()">
                    </fui-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            disable: true,
            navHeight: ""
        }
    },
    onReady() {
        // #ifdef APP-PLUS
        uni.checkIsSoterEnrolledInDevice({
            checkAuthMode: 'facial',
            success(res) {
                console.log(res);
                this.disable = res.isEnrolled;
            },
            fail(err) {
                console.log(err);
            },
            complete(res) {
                console.log(res);
            }
        })
        // #endif
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
        },
        setFace() {
            if (this.disable) {
                let _this = this;
                uni.startSoterAuthentication({
                    requestAuthModes: ['facial'],
                    challenge: 'lock',
                    success(res) {
                        if (res.fid) {
                            uni.setStorageSync('facial', res.fid);
                            uni.showToast({
                                title: '设置成功',
                                success() {
                                    _this.$mroute.switchIndex();
                                }
                            })
                        }
                    }
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.faceID {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    &-body {
        width: 100%;
        padding: 30rpx;
        box-sizing: border-box;

        &-banner {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            image {
                width: 120rpx;
            }
        }

        &-buttons {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            padding: 60rpx 30rpx;
            box-sizing: border-box;
            position: fixed;
            bottom: 0;
            left: 0;

            .button-box {
                margin-bottom: 30rpx;
            }
        }
    }
}
</style>
