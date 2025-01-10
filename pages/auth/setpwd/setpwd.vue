<template>
    <view class="setPassword" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     :title="$t('setpwd.t1')"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>

        <view class="setPassword-body">
            <!--  登录密码  -->
            <view class="body-label">
                <text class="font-13 color-gray">
                    {{ $t('setpwd.t2') }}
                </text>
                <view class="body-label-input mt-10">
                    <input type="text"
                           :password="passwordType[0]" 
                           v-model="password" 
                           :placeholder="$t('setpwd.t3')"
                           placeholder-class="placeholder">
                    <fui-icon @click="passwordType[0] = !passwordType[0]"
                              :name="passwordType[0] === true ? 'visible' : 'invisible'" 
                              size="38"
                              color="var(--content-tertiary)">
                    </fui-icon>
                </view>
            </view>
            <!--  再次输入登录密码  -->
            <view class="body-label mt-15">
                <text class="font-13  color-gray">
                    {{ $t('setpwd.t4') }}
                </text>
                <view class="body-label-input mt-10">
                    <input type="text"
                           :password="passwordType[1]"
                           v-model="repassword"
                           :placeholder="$t('setpwd.t5')"
                           placeholder-class="placeholder"/>
                    <fui-icon @click="passwordType[1] = !passwordType[1]"
                              :name="passwordType[1] === true ? 'visible' : 'invisible'"
                              size="38"
                              color="var(--content-tertiary)">
                    </fui-icon>
                </view>
            </view>
            <view class="body-label mt-15">
                <view class="body-label-tips">
                    <view class="flex align-center">
                        <fui-icon :name="step >= 1 ? 'check' : 'close'" size="34"
                                  color="var(--content-tertiary)">
                        </fui-icon>
                        <text class="font-12 color-gray">
                            {{ $t('setpwd.t6') }}
                        </text>
                    </view>
                    <view class="flex align-center mt-5">
                        <fui-icon :name="step >= 2 ? 'check' : 'close'" size="34"
                                  color="var(--content-tertiary)">
                        </fui-icon>
                        <text class="font-12 color-gray">
                            {{ $t('setpwd.t7') }}
                        </text>
                    </view>
                    <view class="flex align-center mt-5">
                        <fui-icon :name="step >= 3 ? 'check' : 'close'" size="34"
                                  color="var(--content-tertiary)">
                        </fui-icon>
                        <text class="font-12 color-gray">
                            {{ $t('setpwd.t8') }}
                        </text>
                    </view>
                </view>
            </view>
            <view class="body-buttons">
                <fui-button height="78rpx"
                            radius="78rpx"
                            :background="step === 3 ? 'var(--content-primary)' : 'var(--background-secondary)'"
                            size="26"
                            :color="step === 3 ? 'var(--background-primary)' : 'var(--content-tertiary)'"
                            :text="$t('setpwd.t9')"
                            @click="submit()">
                </fui-button>
            </view>
        </view>

        <alert ref="alert" :title="title" :content="content" @confirm="confirm()"></alert>
    </view>
</template>

<script>
import common from '../../../common/api/common';
import {mapMutations, mapGetters} from 'vuex';

var regisinfo = {};
var find = 0;
var account;
var type = '';
export default {
    data() {
        return {
            onFocus: 0,
            password: "",
            repassword: "",
            step: 0,
            disable: false,
            title: this.$t('login.tip_t2'),
            content: "",

            passwordType: [true, true]
        }
    },
    onLoad(e) {
        console.log(e);
        if (this.containsAtSymbol(e.a)) {
            regisinfo['email'] = e.a;
        } else {
            regisinfo['phone'] = e.a;
        }

        regisinfo['vcode'] = e.c;
        if (e.o) {
            regisinfo['code'] = e.o;
        }
        var invite_code = uni.getStorageSync('invite_code');
        if (invite_code) {
            regisinfo['invite_code'] = invite_code;
        }
        if (e.find) {
            find = e.find != 0 ? 1 : 0;
            account = e.a;
        }
        if (e.type) {
            type = e.type;
        }
    },
    watch: {
        password(v) {
            this.step = this.checkPassword(v);
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        ...mapMutations(['userLogin']),
        submit() {
            if (this.step != 3) {
                return false;
            }
            if (this.password != this.repassword) {
                this.content = this.$t('setpwd.t10');
                this.$refs.alert.open();
                return false;
            }

            if (find == 0) {
                regisinfo['password'] = this.password;
                uni.showLoading();

                if (typeof regisinfo['phone'] != 'undefined' && regisinfo['phone']) {
                    common.phoneRegister(regisinfo).then(res => {
                        uni.hideLoading();
                        if (res.code != 200 || !res.success) {
                            this.content = res.message;
                            this.$refs.alert.open();
                            return false;
                        }
                        this.userLogin({
                            phone: regisinfo['phone'],
                            email: "",
                            token: res.data.token,
                            id: res.data.id,
                            nickname: ""
                        });
                        this.$mroute.registerBlindbox();
                    });
                }

                if (typeof regisinfo['email'] != 'undefined' && regisinfo['email']) {
                    if (type === 'google') {
                        regisinfo['vcode'] = 111111;
                        regisinfo['type'] = 'google';
                        const info = uni.getStorageSync('google-info');
                        const token = uni.getStorageSync('google-token');
                        regisinfo['token'] = token;
                        regisinfo['nickname'] = info['nickName'];
                        regisinfo['avatar'] = info['avatarUrl'];
                    }
                    common.emailRegister(regisinfo).then(res => {
                        uni.hideLoading();
                        if (res.code != 200 || !res.success) {
                            this.content = res.message;
                            this.$refs.alert.open();
                            return false;
                        }
                        this.userLogin({
                            phone: "",
                            email: regisinfo['email'],
                            token: res.data.token,
                            id: res.data.id,
                            nickname: ""
                        });
                        this.$mroute.registerBlindbox();
                    });
                }
            }

            if (find == 1) {
                //找回密码接口
                uni.showLoading();

                common.findPwdSet({
                    account: account,
                    code: regisinfo['vcode'],
                    password: this.password,
                    area: typeof regisinfo['code'] != 'undefined' ? regisinfo['code'].replace("+", "").replace(" ", "") : ""
                }).then(res => {
                    uni.hideLoading();
                    if (res.code != 200) {
                        this.content = res.message;
                        this.$refs.alert.open();
                    } else {
                        this.content = this.$t('setpwd.t11');
                        this.$refs.alert.open();
                    }
                });
            }
        },
        confirm() {
            uni.navigateBack();
        },
        containsAtSymbol(input) {
            var regex = /@/;
            return regex.test(input);
        },
        checkPassword(input) {
            // 判断字符串是否为 8 到 14 位字符
            if (/^.{8,14}$/.test(input)) {
                // 判断是否包含数字
                if (/\d/.test(input)) {
                    // 判断是否包含大写字母
                    if (/[A-Z]/.test(input)) {
                        return 3; // 包含大写字母，返回 3
                    } else {
                        return 2; // 包含数字但不包含大写字母，返回 2
                    }
                } else {
                    return 1; // 不包含数字，返回 1
                }
            } else {
                return 0; // 不满足长度要求，返回 0
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.setPassword {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    &-body {
        width: 100%;
        height: auto;
        padding: 30rpx;
        box-sizing: border-box;

        .body-label {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;

            &-input {
                width: 100%;
                height: 78rpx;
                border-radius: 8rpx;
                padding: 0 16rpx;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: var(--background-secondary);
                border: 2rpx solid var(--background-secondary);

                &:focus-within {
                    border-color: var(--color-primary);
                }

                input {
                    width: calc(100% - 70rpx);
                    height: 78rpx;
                    font-size: 26rpx;
                    color: var(--content-primary);
                }
            }

            &-tips {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: column;

                .fui-icon {
                    margin-right: 10rpx;
                }
            }
        }

        .body-buttons {
            margin-top: 60rpx;
            width: 100%;
            height: auto;
        }
    }
}
</style>
