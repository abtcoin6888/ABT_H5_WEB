<template>
    <view class="phoneVerification" :data-theme="userTheme">
        <fui-nav-bar
            statusBar
            isFixed
            isOccupy
            zIndex="9"
            :title="title"
            color="var(--color-title-black)"
            background="var(--white)"
            @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--color-title-black)">
            </fui-icon>
        </fui-nav-bar>

        <view class="phoneVif-body">
            <view class="body-tips">
                <text class="font-13 color-gray">
                    {{ $t('auth.t1') }}
                </text>
                <text class="font-13 color-black phone-number">
                    {{ account ? account : '--' }}
                </text>
                <text class="font-13 color-blue font-weight" @click="sendCode()">
                    {{ $t('auth.t2') }}
                </text>
            </view>
            <view class="body-label mt-15">
                <text class="font-13 color-gray">
                    {{ title + $t('auth.t3') }}
                </text>
                <view class="body-label-input mt-10">
                    <input v-model="code" type="text" :placeholder="$t('auth.t4')" placeholder-class="placeholder"/>
                    <text class="font-13 color-blue font-weight" @click="sendCode()">
                        {{ stxt }}
                    </text>
                </view>
            </view>
            <view class="body-buttons">
                <fui-button height="88rpx"
                            radius="16rpx"
                            size="30"
                            :background="code.length >= 6 ? 'var(--blue)' : 'var(--color-gray-bg)'"
                            :color="code.length >= 6 ? '#ffffff' : 'var(--color-text-dark-gray)'"
                            :text="$t('auth.t5')"
                            @click="submit()">
                </fui-button>
            </view>
        </view>

        <alert ref="alert" :title="title" :content="content"></alert>
    </view>
</template>

<script>
import common from '/common/api/common.js';

import {mapGetters} from 'vuex';

var time = 300;
var type;
export default {
    data() {
        return {
            title: "",
            onFocus: false,
            account: "",
            o: "",
            stxt: this.$t('authPop.resend'),
            title: this.$t('financing.t96'),
            content: "",
            code: ""
        }
    },
    onLoad(e) {
        this.title = e.type == 'email' ? this.$t('secrety.email_ver') : this.$t('secrety.phone_ver');
        type = e.type;
        this.account = e.account;
        this.o = e.o;
    },
    onReady() {
        this.initInterval();
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        submit() {
            if (this.code.length < 6) {
                return false;
            }
            uni.showLoading();
            common.validatePhoneCode(this.account, this.o, this.code).then(res => {
                uni.hideLoading();
                if (res.code == 200) {
                    this.$mroute.setPwd(this.account, this.code, this.o);
                } else {
                    this.title = this.$t('auth.t6');
                    this.content = res.message;
                    this.$refs.alert.open();
                }
            });
        },
        initInterval() {
            time = 300;
            var _this = this;
            var set = setInterval(() => {
                if (time <= 1) {
                    clearInterval(set);
                    this.stxt = _this.$t('authPop.resend');
                    time = 0;
                } else {
                    this.stxt = time + 's';
                    time--;
                }
            }, 1000);
        },
        sendCode() {
            if (type == 'phone') {
                uni.showLoading();
                common.sendPhoneVerifyCode(this.account, this.showareacode).then(res => {
                    uni.hideLoading();
                    if (res.code == 200) {
                        this.content = this.$t('auth.t7');
                        this.$refs.alert.open();
                        this.initInterval();
                    } else {
                        this.content = res.message;
                        this.$refs.alert.open();
                    }
                });
            }
            if (type == 'email') {
                uni.showLoading();
                common.sendEmailVerifyCode(this.email).then(res => {
                    uni.hideLoading();
                    if (res.code == 200) {
                        this.content = this.$t('auth.t7');
                        this.$refs.alert.open();
                        this.initInterval();
                    } else {
                        this.content = res.message;
                        this.$refs.alert.open();
                    }
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.phoneVerification {
    width: 100%;
    min-height: 100vh;
    background: var(--white);

    .phoneVif-body {
        width: 100%;
        height: auto;
        padding: 30rpx;
        box-sizing: border-box;

        .body-tips {
            width: 100%;
            height: 88rpx;
            display: flex;
            align-items: center;

            .phone-number {
                margin: 0 16rpx;
            }
        }

        .body-label {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;

            &-input {
                width: 100%;
                height: 88rpx;
                border-radius: 16rpx;
                border: 2rpx solid var(--color-gray-bg);
                background: var(--color-gray-bg);
                padding: 0 20rpx;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;

                &:focus-within {
                    border-color: var(--blue);
                }

                input {
                    width: calc(100% - 150rpx);
                    height: 78rpx;
                    line-height: 78rpx;
                    font-size: 26rpx;
                    color: var(--black);
                }
            }
        }

        .body-buttons {
            width: 100%;
            height: auto;
            margin-top: 60rpx;
        }
    }
}
</style>
