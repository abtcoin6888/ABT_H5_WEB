<template>
    <view class="googleAuth" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="!googleCode ? this.$t('google.page_title'):this.$t('google.page_title1')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="googleAuth-container">
            <view class="label">
                <text class="font-14 color-black font-weight">
                    {{ $t('google.install_t') }} Google Authenticator
                </text>
                <view class="label-button">
                    <fui-button
                        height="78rpx"
                        background="var(--content-primary)"
                        color="var(--background-primary)"
                        size="26"
                        radius="78rpx"
                        :text="$t('google.download_t')"
                        @click="downloadGoogle()">
                    </fui-button>
                </view>
            </view>
            <view class="label">
                <text class="font-14 color-black font-weight">
                    {{ $t('google.add_t') }} Google Authenticator
                </text>
                <text class="description font-13 color-gray">
                    {{ $t('google.add_con') }}
                </text>
                <view class="label-canvas">
                    <view class="canvas-box">
                        <canvas id="qrcode"
                                canvas-id="qrcode"
                                style="width: 150px;height: 150px;margin: auto;">
                        </canvas>
                    </view>
                    <!-- #ifdef APP-PLUS -->
                    <text @click="saveQrcode" class="font-12 color-primary">
                        {{ $t('google.save_qrcode') }}
                    </text>
                    <!-- #endif -->
                </view>
                <view class="label-copy" @click="copy(secret)">
                    <text class="font-14 font-weight color-black">
                        {{ secret }}
                    </text>
                </view>
                <view class="label-button">
                    <fui-button height="78rpx"
                                color="var(--background-primary)"
                                background="var(--content-primary)"
                                size="26"
                                radius="78rpx"
                                :text="!googleCode ? this.$t('google.confirm_bind') : this.$t('google.modify_bind')"
                                @click="save()">
                    </fui-button>
                </view>
            </view>
        </view>
        <uni-popup ref="confirmPop" type="bottom">
            <view class="confirm-popup">
                <view class="confirm-popup-title">
                    <text class="font-16 color-black font-weight">
                        {{ $t('authPop.safety_ver') }}
                    </text>
                    <view class="close-icon" @click="close()">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="confirm-popup-container">
                    <view class="label-box">
                        <text class="font-13 color-gray">
                            {{ $t('google.google_code') }}
                        </text>
                        <view class="label-box-input">
                            <input type="number"
                                   class="font-14 color-black"
                                   v-model="vcode"
                                   :placeholder="$t('google.enter_google_code')"
                                   placeholder-class="placeholder">
                        </view>
                    </view>
                    <view class="label-box">
                        <text class="font-13 color-gray">
                            {{
                                $util.isEmailAccount(userAccount) ? this.$t('secrety.email_code') : this.$t('secrety.phone_code')
                            }}
                        </text>
                        <view class="label-box-input" type="phone">
                            <input type="number"
                                   class="font-14 color-black"
                                   v-model="smscode"
                                   :placeholder="this.$t('authPop.enter_code')"
                                   placeholder-class="placeholder">
                            <view class="captcha">
                                <text @click="sendSms" class="font-13 color-primary">
                                    {{ txt }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="label-button">
                        <fui-button
                            height="78rpx"
                            :background="smscode.length < 6 || vcode.length < 6 ? 'var(--background-secondary)' : 'var(--content-primary)'"
                            :color="smscode.length < 6 || vcode.length < 6?'var(--content-tertiary)':'var(--background-primary)'"
                            size="26"
                            radius="78rpx"
                            @click="submit">
                            {{ $t('hand.confirm_t') }}
                        </fui-button>
                    </view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
import UQRCode from 'uqrcodejs';
import user from '/common/api/user.js';
import common from "/common/api/common.js";
import {mapGetters} from 'vuex';
import store from '@/store/index.js';

export default {
    data() {
        return {
            onFocus: false,
            verifyCode: "",
            secret: "",
            vcode: "",
            smscode: "",
            txt: this.$t('google.send')
        }
    },
    onShow() {

    },
    onReady() {
        this.getCode();
    },
    computed: {
        ...mapGetters(['userAccount', 'googleCode', 'userTheme'])
    },
    methods: {
        submit() {
            var _this = this;
            if (this.vcode.length < 6 || this.smscode.length < 6) {
                return false;
            }
            this.$refs.confirmPop.close();
            uni.showLoading({
                title: this.$t('secrety.processing')
            });

            user.setGoogleSecret({
                sms_code: this.smscode,
                code: this.vcode,
                secret: this.secret,
                type: this.$util.isEmailAccount(this.userAccount) ? 1 : 2,
                account: this.userAccount
            }).then(res => {
                uni.hideLoading();
                if (res.code != 200) {
                    uni.showToast({
                        title: res.message,
                        icon: "none"
                    })
                } else {
                    uni.showToast({
                        title: this.$t('google.google_bind_suc'),
                        icon: "none"
                    });
                    store.commit('updateInfo', {google2fa: this.secret});
                }
            });
            ;
        },
        async sendSms() {
            uni.showLoading({
                title: this.$t('login.send')
            });
            var result;
            if (this.$util.isEmailAccount(this.userAccount)) {
                result = await common.sendUnCodeEmail(this.userAccount);
            } else {
                result = await common.sendUnCodePhone(this.userAccount);
            }
            if (result.code != 200) {
                uni.showToast({
                    title: this.$t('secrety.fail_send'),
                    icon: "none"
                });
                return false;
            }
            uni.showToast({
                title: this.$t('secrety.suc_send'),
                icon: "none"
            });
            this.initTime();
        },
        initTime() {
            var time = 300;
            var set = setInterval(() => {
                this.txt = time + 's';
                time--;
                if (time <= 1) {
                    clearInterval(set);
                    this.txt = this.$t('authPop.resend');
                }
            }, 1000);
        },
        getCode() {
            uni.showLoading({
                title: 'loading'
            });
            user.getGoogleCode().then(res => {
                uni.hideLoading();
                if (res.code != 200) {
                    uni.showToast({
                        title: res.message,
                        icon: "none"
                    });
                    return false;
                }
                this.secret = res.data.secret;
                this.createQrcode(res.data.secret);
            });
        },
        createQrcode(code) {
            var qr = new UQRCode();
            var data = "otpauth://totp/" + this.userAccount + '?secret=' + code;
            console.log(data);
            qr.data = data;
            qr.size = 150;
            qr.make();
            var canvasContext = uni.createCanvasContext('qrcode', this);
            qr.canvasContext = canvasContext;
            qr.drawCanvas();
        },
        save() {
            this.$refs.confirmPop.open();
        },
        close() {
            this.$refs.confirmPop.close();
        },
        setCode(e) {
            this.verifyCode = e.detail.value;
        },
        copy(secret) {
            uni.setClipboardData({
                data: secret,
                success() {
                    uni.showToast({
                        title: this.$t('google.copy_suc'),
                        icon: "none"
                    });
                }
            })
        },
        saveQrcode() {
            uni.canvasToTempFilePath({
                canvasId: "qrcode",
                success(res) {
                    console.log(res);
                    uni.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success() {
                            uni.showToast({
                                title: this.$t('google.save_suc'),
                                icon: "none"
                            })
                        }
                    })
                }
            });
        },
        downloadGoogle() {
            // #ifdef H5
            window.open("https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&pli=1");
            // #endif
            // #ifdef APP-PLUS
            if (this.$device.platform == "ios") {
                plus.runtime.openURL('itms-apps://itunes.apple.com/cn/app/id388497605')
            } else {
                plus.runtime.openURL("https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&pli=1");
            }
            // #endif
        }
    }
}
</script>


<style lang="scss" scoped>
.googleAuth {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    &-container {
        width: 100%;
        height: auto;
        padding: 30rpx;
        box-sizing: border-box;

        .label {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            margin-bottom: 40rpx;

            .description {
                margin-top: 16rpx;
                line-height: 38rpx;
            }

            &-button {
                width: 100%;
                height: auto;
                margin-top: 30rpx;
            }

            &-canvas {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 30rpx 0;
                box-sizing: border-box;

                .canvas-box {
                    width: 320rpx;
                    height: 320rpx;
                    background: #ffffff;
                    border-radius: 8rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                text {
                    margin-top: 30rpx;
                }
            }

            &-copy {
                width: 100%;
                height: auto;
                padding: 16rpx 0;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--background-secondary);
                border-radius: 8rpx;
                margin-top: 30rpx;
            }
        }
    }

    .confirm-popup {
        width: 100%;
        height: auto;
        background: var(--background-primary);
        border-radius: 16rpx 16rpx 0 0;

        &-title {
            width: 100%;
            height: 88rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            .close-icon {
                position: absolute;
                right: 30rpx;
            }
        }

        &-container {
            width: 100%;
            height: auto;
            padding: 30rpx;
            box-sizing: border-box;

            .label-box {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: column;
                margin-bottom: 30rpx;

                &-input {
                    width: 100%;
                    height: 78rpx;
                    border-radius: 8rpx;
                    background: var(--background-secondary);
                    margin-top: 16rpx;
                    padding: 0 16rpx;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border: 2rpx solid var(--background-secondary);

                    &:focus-within {
                        border-color: var(--color-primary);
                    }

                    input {
                        width: 100%;
                        height: 78rpx;
                    }

                    &[type='phone'] {
                        .captcha {
                            min-width: 140rpx;
                            text-align: right;
                        }
                    }
                }
            }

            .label-button {
                width: 100%;
                height: 88rpx;
                margin-top: 50rpx;
            }
        }
    }
}
</style>
