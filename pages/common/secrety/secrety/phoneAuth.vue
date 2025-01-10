<template>
    <view class="phoneAuth" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="(first == 1 ? this.$t('secrety.revise'):this.$t('secrety.bind_t'))+(lang!='zh_CN'?' ':'')+(type == 'phone' ? this.$t('secrety.phone_ver'):this.$t('secrety.email_ver'))"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="phoneAuth-container">
            <view class="label">
                <text class="font-13 color-gray">
                    {{
                        active == 0 ? (first == 1 ? this.$t('login.phone1') : this.$t('secrety.new_phone')) : (first == 1 ? this.$t('login.email1') : this.$t('secrety.new_email'))
                    }}
                </text>
                <view class="label-input" type="phone" v-if="active == 0">
                    <view class="code-box" @click="open">
                        <text class="font-14 color-black">{{ showareacode }}</text>
                        <image :src="`/static/img/tactic/down-${userTheme}.png`"
                               mode="widthFix">
                        </image>
                    </view>
                    <input type="text"
                           v-model="account"
                           class="font-14 color-black"
                           :placeholder="this.$t('login.phone_p')"
                           placeholder-class="placeholder">
                </view>
                <view class="label-input" v-if="active == 1">
                    <input type="text"
                           v-model="account"
                           class="font-14 color-black"
                           :placeholder="this.$t('login.email_p')"
                           placeholder-class="placeholder">
                </view>
            </view>
            <view class="label">
                <text class="font-13 color-gray">
                    {{
                        active == 0 ? this.$t('secrety.phone_code') : this.$t('secrety.email_code')
                    }}
                </text>
                <view class="label-input" type="captcha">
                    <input type="text"
                           v-model="vcode"
                           @input="inputCode"
                           class="font-14 color-black"
                           :placeholder="this.$t('authPop.enter_code')"
                           placeholder-class="placeholder">
                    <view class="captcha">
                        <text class="font-13 color-primary" 
                              @click="robotVerify()">
                            {{ txt }}
                        </text>
                    </view>
                </view>
            </view>
        </view>
        <view class="footer-button">
            <fui-button
                height="78rpx"
                :background="code.length >= 4 ? 'var(--color-primary)' : 'var(--background-secondary)'"
                :color="code.length >= 4 ? 'var(--content-always-white)' : 'var(--content-tertiary)'"
                size="28"
                radius="78rpx"
                :text="$t('secrety.submit')"
                @click="submitVerify()">
            </fui-button>
        </view>
    </view>
    <uni-popup :data-theme="userTheme" ref="verifypop" :style="{width:$device.screenWidth+'px'}" type="center">
        <view class="swipe-verify">
            <view class="swipe-verify-cell">
                <text class="font-16 color-black font-weight">
                    {{ $t('login.verify_t1') }}
                </text>
            </view>
            <view class="swipe-verify-content">
                <liu-slider-verify
                    :style="{
                        'width': '570rpx'
                    }"
                    dBgColor="var(--background-secondary)"
                    ref="verify"
                    @change='verifyResult'>
                </liu-slider-verify>
            </view>
            <view class="swipe-verify-cell">
                <text class="font-12 color-gray">
                    {{ $t('login.verify_t2') }}
                </text>
            </view>
        </view>
    </uni-popup>
    <authPop ref="authPop" :title="poptitle" @resend="resend" @callback="submit"></authPop>
    <areacode ref="areacode" @itemclick="areaSelect"></areacode>
    <alert ref="alert" :ctxt="ctxt" :ftxt="ftxt" @confirm="subResult" :title="title" :content="content"></alert>
</template>

<script>
import common from '/common/api/common.js'
import user from '/common/api/user.js'
import {mapMutations, mapGetters} from 'vuex';

var action;
var newsend = false;
var rs = false;
export default {
    data() {
        return {
            active: 0,
            showareacode: "+01",
            code: "",
            onFocus: false,
            first: true,
            type: "",
            account: "",
            vcode: "",
            txt: this.$t('secrety.get_code'),
            ctxt: this.$t('login.cancel'),
            ftxt: this.$t('login.confirm'),
            title: this.$t('login.tip_t2'),
            content: "",
            poptitle: "",
            lang: ""
        }
    },
    onLoad(e) {
        this.first = parseInt(e.new);
        this.type = e.type;
        if (this.type == 'email') {
            this.active = 1;
        }
    },
    onShow() {
        //this.$refs.authPop.open();
        this.getLang();
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        ...mapMutations(['updateInfo']),
        subResult() {
            if (action == 200) {
                action = 0;
                this.$mroute.back();
            }
        },
        resend() {
            //重新发送
            rs = true;
            this.submitVerify();
        },
        async submit(code) {
            //最后的提交
            this.$refs.authPop.close();
            if (this.first != 1) {
                //绑定接口提交
                var result;
                uni.showLoading({
                    title: this.$t('secrety.processing')
                })
                console.log(code);
                if (this.type == 'email') {
                    result = await user.submitBindEmail({
                        email: this.account,
                        email_vcode: this.vcode,
                        vcode: code
                    });
                }
                if (this.type == 'phone') {
                    result = await user.submitBindPhone({
                        code: this.showareacode,
                        phone: this.account,
                        vcode: this.vcode,
                        email_vcode: code
                    });
                }
                console.log(result);
                uni.hideLoading();
                if (result.code != 200) {
                    this.content = result.message;
                    this.$refs.alert.open();
                    return false;
                }
                //修改本地身份状态信息
                if (this.type == "email") {
                    this.updateInfo('email', this.account);
                }
                if (this.type == 'phone') {
                    this.updateInfo('phone', this.account);
                }
                this.content = (this.type == 'email' ? this.$t('login.email') : this.$t('login.phone')) + this.$t('secrety.bind_suc');
                this.$refs.alert.open();
                action = 200;
            } else {
                //修改提交
                uni.showLoading({
                    title: this.$t('secrety.processing')
                });
                var result;
                if (this.type == 'email') {
                    result = await user.submitChangeEmail({
                        email: this.account,
                        new_code: this.vcode,
                        vcode: code
                    });
                } else {
                    result = await user.submitChangePhone({
                        phone: this.account,
                        area: this.$util.replaceEmpty(this.showareacode),
                        new_code: this.vcode,
                        code: code
                    });
                }
                uni.hideLoading();
                if (result.code != 200) {
                    this.content = result.message;
                    this.$refs.alert.open();
                    return false;
                }
                //修改本地身份状态信息
                if (this.type == "email") {
                    this.updateInfo('email', this.account);
                }
                if (this.type == 'phone') {
                    this.updateInfo('phone', this.account);
                }
                this.content = this.$t('secrety.mod_suc');
                this.$refs.alert.open();
                action = 200;
            }
        },
        async submitVerify() {
            //提交验证，发送身份的验证码，并且显示弹窗
            //绑定则发送注册不同的身份验证码，修改则发送同类型的验证码
            if (this.account.length < 5 || !newsend) {
                return false;
            }
            uni.showLoading({
                title: this.$t('login.send')
            })
            var result;
            if (this.type == 'email' && this.first == 0) {
                result = await user.sendPhoneCode();
                this.poptitle = this.$t('secrety.phone_code');
            }
            if (this.type == 'phone' && this.first == 0) {
                result = await user.sendEmailCode();
                this.poptitle = this.$t('secrety.email_code');
            }

            if (this.type == 'email' && this.first == 1) {
                result = await user.sendEmailCode();
                this.poptitle = this.$t('secrety.email_code');
            }
            if (this.type == 'phone' && this.first == 1) {
                result = await user.sendPhoneCode();
                this.poptitle = this.$t('secrety.phone_code');
            }

            uni.hideLoading()
            console.log(result);
            if (result.code != 200) {
                this.content = result.message;
                this.$refs.alert.open();
                return false;
            }
            if (!rs) {
                this.$refs.authPop.open();
            }
        },
        sendCode() {
            if (this.account.length < 5) {
                this.content = this.$t('secrety.account_info');
                this.$refs.alert.open();
                return false;
            }

            uni.showLoading({
                title: this.$t('login.send')
            });
            if (this.type == 'email') {
                //发送指定邮箱验证码
                common.sendEmailVerifyCode(this.account).then(res => {
                    uni.hideLoading();
                    if (res.code != 200) {
                        this.content = res.message;
                        this.$refs.alert.open();
                        return false;
                    }
                    uni.showToast({
                        title: this.$t('secrety.send_to') + ':' + this.account,
                        duration: 2000
                    });
                    newsend = true;
                }).catch(res => {
                    uni.hideLoading();
                    uni.showToast({
                        title: this.$t('secrety.fail_send'),
                        icon: "none"
                    })

                });
            }
            if (this.type != 'email') {
                common.sendPhoneVerifyCode(this.account, this.showareacode).then(res => {
                    uni.hideLoading();
                    if (res.code != 200) {
                        this.content = res.message;
                        this.$refs.alert.open();
                        return false;
                    }
                    uni.showToast({
                        title: this.$t('secrety.send_to') + ':' + this.account,
                        duration: 2000
                    });
                    newsend = true;
                }).catch(res => {
                    uni.hideLoading();
                    uni.showToast({
                        title: this.$t('secrety.fail_send'),
                        icon: "none"
                    })

                });
            }
        },
        initTime() {
            var time = 300;
            var set = setInterval(() => {
                this.txt = time + 's';
                time--;
                if (time <= 1) {
                    clearInterval(set);
                    this.txt = this.$t('secrety.get_code');
                }
            }, 1000);
        },
        verifyResult(e) {
            console.log(e);
            if (e.state) {
                this.$refs.verifypop.close();
                // setTimeout(()=>{

                // 	this.authPopopen();
                // },1500);
                console.log(action);
                if (action == 1) {
                    this.sendCode();
                }
            }
        },
        robotVerify() {
            //人机验证
            if (this.account.length < 5) {
                this.content = this.$t('secrety.account_info');
                this.$refs.alert.open();
                return false;
            }
            this.$refs.verifypop.open();
            action = 1;
        },
        areaSelect(e) {
            this.showareacode = e.dialingCode;
        },
        inputCode(e) {
            this.code = e.detail.value;
        },
        open() {
            this.$refs.areacode.open();
        },
        verifyopen() {
            this.$refs.verifypop.open();
        },
        authPopopen() {
            this.$refs.authPop.open();
        },
        getLang() {
            this.lang = uni.getStorageSync('lang');
            console.log(this.lang)
        },
    }
}
</script>

<style lang="scss" scoped>
.phoneAuth {
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
            margin-bottom: 40rpx;

            &-input {
                width: 100%;
                height: 78rpx;
                background: red;
                border-radius: 8rpx;
                padding: 0 16rpx;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 2rpx solid var(--background-secondary);
                background: var(--background-secondary);
                margin-top: 16rpx;

                &:focus-within {
                    border-color: var(--color-primary);
                }

                input {
                    width: 100%;
                    height: 78rpx;
                }

                &[type='captcha'] {
                    .captcha {
                        min-width: 140rpx;
                        height: 78rpx;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                    }
                }

                &[type='phone'] {
                    input {
                        padding: 0 16rpx;
                        box-sizing: border-box;
                    }
                }

                .code-box {
                    max-width: 20%;
                    height: 78rpx;
                    display: flex;
                    align-items: center;
                    padding-right: 10rpx;
                    position: relative;

                    image {
                        width: 26rpx;
                        height: 26rpx;
                        margin-left: 10rpx;
                    }

                    &::after {
                        content: "";
                        display: inline-block;
                        width: 1rpx;
                        height: 30rpx;
                        background-color: var(--border-strength-100);
                        position: absolute;
                        right: 0;
                    }
                }
            }
        }
    }

    .footer-button {
        width: 100%;
        padding: 24rpx 30rpx;
        box-sizing: border-box;
        background: var(--background-primary);
        position: fixed;
        bottom: 0;
        left: 0;
    }
}

.swipe-verify {
    width: 690rpx;
    height: auto;
    padding: 60rpx 30rpx;
    box-sizing: border-box;
    background: var(--background-primary);
    border-radius: 16rpx;

    &-cell {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &-content {
        width: 100%;
        height: auto;
        padding: 60rpx 30rpx 30rpx;
        box-sizing: border-box;
    }
}
</style>
