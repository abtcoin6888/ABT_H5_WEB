<template>
    <view class="newPwd" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('newpwd.page_title')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="newPwd-body">
            <view class="tips">
                <text class="font-12 color-warring">
                    <fui-icon name="warning"
                              size="34"
                              color="var(--color-text-golden)">
                    </fui-icon>
                    {{ $t('newpwd.tip_con') }}
                </text>
            </view>
            <!--     原登录密码     -->
            <view class="label-box">
                <view class="text-cell">
                    <text class="font-12 color-gray">
                        {{ $t('newpwd.old_pwd') }}
                    </text>
                </view>
                <view class="input-box">
                    <input v-model="dpwd" @focus="active=1" @blur="active=0" :password="eye[0]" type="text"
                           :placeholder="this.$t('newpwd.enter_oldpwd')" placeholder-class="placeholder">
                    <fui-icon :name="eye[0] == false ? 'visible' : 'invisible'"
                              size="38"
                              color="var(--content-tertiary)"
                              @click="eye[0]=!eye[0]">
                    </fui-icon>
                </view>
            </view>
            <!--     新密码     -->
            <view class="label-box">
                <view class="text-cell">
                    <text class="font-12 color-gray">
                        {{ $t('newpwd.new_pwd') }}
                    </text>
                </view>
                <view class="input-box">
                    <input v-model="newpwd" 
                           @focus="active=2"
                           @blur="active=0" 
                           :password="eye[1]" 
                           type="text"
                           :placeholder="this.$t('newpwd.enter_newpwd')" placeholder-class="placeholder">
                    <fui-icon :name="eye[1] == false ? 'visible' : 'invisible'"
                              size="38"
                              color="var(--content-tertiary)"
                              @click="eye[1]=!eye[1]">
                    </fui-icon>
                </view>
            </view>
            <view class="label-box">
                <view class="text-cell">
                    <fui-icon :name="step >= 1 ? 'check' : 'close'" size="30"
                              color="var(--content-tertiary)"></fui-icon>
                    <text class="font-12 color-gray ml-5">
                        {{ $t('newpwd.tip_c1') }}
                    </text>
                </view>
                <view class="text-cell mt-5">
                    <fui-icon :name="step >= 2 ? 'check' : 'close'" size="30"
                              color="var(--content-tertiary)"></fui-icon>
                    <text class="font-12 color-gray ml-5">
                        {{ $t('newpwd.tip_c2') }}
                    </text>
                </view>
                <view class="text-cell mt-5">
                    <fui-icon :name="step >= 3 ? 'check' : 'close'" size="30"
                              color="var(--content-tertiary)"></fui-icon>
                    <text class="font-12 color-gray ml-5">
                        {{ $t('newpwd.tip_c3') }}
                    </text>
                </view>
            </view>
            <!--     确认新密码     -->
            <view class="label-box">
                <view class="text-cell">
                    <text class="font-12 color-gray">
                        {{ $t('newpwd.confirm_newpwd') }}
                    </text>
                </view>
                <view class="input-box">
                    <input v-model="repwd"
                           @focus="active=3"
                           @blur="active=0"
                           :password="eye[2]"
                           type="text"
                           :placeholder="this.$t('newpwd.again_newpwd')" placeholder-class="placeholder">
                    <fui-icon :name="eye[2] == false ? 'visible' : 'invisible'"
                              size="38"
                              color="var(--content-tertiary)"
                              @click="eye[2]=!eye[2]">
                    </fui-icon>
                </view>
            </view>
            <view class="label-button">
                <fui-button height="78rpx"
                            radius="78rpx"
                            size="26"
                            @click="open"
                            :background="dpwd.length > 5 && step == 3 ? 'var(--content-primary)' : 'var(--background-secondary)'"
                            :color="dpwd.length > 5 && step == 3 ? 'var(--background-primary)' : 'var(--content-tertiary)'">
                    {{ $t('hand.confirm_t') }}
                </fui-button>
            </view>
        </view>
        <authPop ref="authPop" @callback="authResult" :title="codeType"></authPop>
        <alert ref="alert" :ctxt="ctxt" :ftxt="ftxt" :title="title" @confirm="confirm" :content="content"></alert>
    </view>
</template>

<script>
import {Icon} from 'vant';
import common from '/common/api/common.js';
import user from '/common/api/user.js';
import {mapMutations, mapGetters} from 'vuex';

var action = 0;
export default {
    components: {
        [Icon.name]: Icon
    },
    data() {
        return {
            eye: [true, true, true],
            active: 0,
            newpwd: "",
            dpwd: "",
            repwd: "",
            step: 0,
            title: this.$t('login.tip_t2'),
            ctxt: this.$t('login.cancel'),
            ftxt: this.$t('login.confirm'),
            content: "",
            codeType: ""
        }
    },
    watch: {
        newpwd(n) {
            this.step = this.checkPassword(n);
        }
    },
    computed: {
        ...mapGetters(['userAccount', 'userTheme']),
    },
    methods: {
        ...mapMutations(['userLogin']),
        confirm() {
            if (action == 1) {
                this.$mroute.switchIndex();
            }
        },
        authResult(e) {
            this.$refs.authPop.close();
            uni.showLoading({
                title: this.$t('secrety.processing')
            });
            user.changePwd({
                password: this.newpwd,
                repassword: this.repwd,
                oldpassword: this.dpwd,
                vcode: e,
                account: this.userAccount,
                type: this.$util.isEmailAccount(this.userAccount) ? 1 : 2
            }).then(res => {
                uni.hideLoading();
                if (res.code != 200) {
                    this.content = res.message;
                    this.$refs.alert.open();
                    return false;
                }
                this.ctxt = "";
                this.content = this.$t('newpwd.changepwd_suc');
                this.$refs.alert.open();
                this.userLogin(false);
                action = 1;
            })
        },
        async open() {
            if (this.dpwd.length < 6) {
                return false;
            }
            if (this.step != 3) {
                this.content = this.$t('newpwd.enter_corpwd');
                this.$refs.alert.open();
                return false;
            }
            if (this.newpwd != this.repwd) {
                this.content = this.$t('newpwd.different_twice');
                this.$refs.alert.open();
                return false;
            }
            if (this.newpwd === this.dpwd) {
                this.content = this.$t('newpwd.different');
                this.$refs.alert.open();
                return false;
            }

            uni.showLoading({
                title: 'loading'
            });
            var result;
            if (this.$util.isEmailAccount(this.userAccount)) {
                result = await common.sendUnCodeEmail(this.userAccount);
                this.codeType = this.$t('login.email');
            } else {
                result = await common.sendUnCodePhone(this.userAccount);
                this.codeType = this.$t('login.phone');
            }
            uni.hideLoading();
            if (result.code != 200) {
                this.content = result.message;
                this.$refs.alert.open();
            } else {
                this.$refs.authPop.open();
            }
        },
        close() {
            this.$refs.authPop.close();
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
.newPwd {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    &-body {
        width: 100%;
        height: auto;
        padding: 30rpx;
        box-sizing: border-box;

        .tips {
            width: 100%;
            height: auto;
            display: flex;
            align-items: flex-start;

            .fui-icon {
                margin-right: 10rpx;
            }
        }

        .label-box {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            margin-top: 30rpx;

            .text-cell {
                display: flex;
                align-items: center;
            }

            .input-box {
                margin-top: 16rpx;
                width: 100%;
                height: 78rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 16rpx;
                box-sizing: border-box;
                background: var(--background-secondary);
                border-radius: 8rpx;
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
        }

        .label-button {
            width: 100%;
            height: auto;
            margin-top: 80rpx;
        }
    }
}
</style>
