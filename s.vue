<template>
    <view class="login" :data-theme="userTheme">
        <view class="login-body-box">
            <view class="login-top">
                <!-- #ifdef APP-PLUS -->
                <view class="status_bar"></view>
                <!-- #endif -->
                <fui-icon name="close" size="56" color="var(--text-black)" @click="close()"></fui-icon>
                <view class="title">
                    <text class="color-black font-bold">
                        {{
                            login == 1 ? (config['site_name'] ? config['site_name'] : '') + ' ' + $t('login.t1') : (config['site_name'] ? config['site_name'] : '') + ' ' + $t('login.t2')
                        }}
                    </text>
                </view>
                <view class="bg-box">
                    <image src="/static/img/yw.png" mode="widthFix"></image>
                </view>
            </view>
            <view class="login-bottom">
                <view class="switchTab">
                    <view class="item"
                          v-if="parseInt(config['register_type']) == 0 || parseInt(config['register_type']) == 2"
                          :class="active == 0 ? 'active' : ''" @click="sliderChange(0)">
                        <text>{{ $t('login.phone') }}</text>
                    </view>
                    <view class="item"
                          v-if="parseInt(config['register_type']) == 0 || parseInt(config['register_type']) == 1"
                          :class="active == 1 ? 'active' : ''" @click="sliderChange(1)">
                        <text>{{ $t('login.email') }}</text>
                    </view>
                </view>
                <view class="container-box">
                    <view class="item">
                        <text class="font-13 color-gray" v-if="active == 0">{{ $t('login.phone') }}</text>
                        <text class="font-13 color-gray" v-if="active == 1">{{ $t('login.email') }}</text>
                        <view class="input-box phone-box" v-if="active == 0">
                            <view class="area-code" @click="showArea">
                                <text class="font-14 color-black font-weight">{{ showareacode }}</text>
                                <image class="down-icon"
                                       :src="`/static/img/tactic/down-${userTheme}.png`"
                                       mode="widthFix">
                                </image>
                            </view>
                            <input class="font-14 color-black font-weight"
                                   v-model="phone"
                                   type="number"
                                   :placeholder="this.$t('login.phone_p')"
                                   placeholder-class="placeholder"/>
                        </view>
                        <view class="input-box" v-if="active == 1">
                            <input class="font-14 color-black font-weight"
                                   v-model="email"
                                   type="text"
                                   :placeholder="this.$t('login.email_p')"
                                   placeholder-class="placeholder"/>
                        </view>
                    </view>
                    <view class="item" v-if="login == 1">
                        <text class="font-13 color-gray">{{ $t('login.password') }}</text>
                        <view class="input-box">
                            <input class="font-14 color-black font-weight"
                                   v-model="password"
                                   :placeholder="this.$t('login.pwd_p')"
                                   :type="itype"
                                   placeholder-class="placeholder"/>
                            <view class="icon-box" @click="changeInput">
                                <fui-icon :name="eye" size="40" :color="'var(--dark-gray)'"></fui-icon>
                            </view>
                        </view>
                    </view>
                    <view class="item" v-if="login == 0">
                        <text class="font-13 color-gray">{{ $t('login.invite') }}</text>
                        <view class="input-box">
                            <input
                                class="font-14 color-black font-weight"
                                v-model="invaiteCode"
                                :disabled="istatus"
                                :placeholder="this.$t('login.inputInviteCode')"
                                type="text"
                                placeholder-class="placeholder"
                            />
                            <view class="icon-box" @click="changeInput">
                                <fui-icon :name="eye" size="40" :color="'var(--dark-gray)'"></fui-icon>
                            </view>
                        </view>
                    </view>
                    <view class="button">
                        <button :disabled="phone != '' || email != '' ? false : true"
                                :class="{ 'active-btn': phone != '' || email != '' }" @click="verifyShow">
                            {{ login == 1 ? this.$t('login.login_t') : this.$t('login.register') }}
                        </button>
                    </view>
                    <view class="cell" v-if="login == 1">
                        <text class="font-13 font-weight color-primary" @click="login = 0">{{ $t('login.reg_t') }}</text>
                        <text class="font-13 color-black" @click="$mroute.forgetpwd()">{{ $t('login.forget_t') }}</text>
                    </view>
                    <view class="cell log-cell" v-if="login != 1">
                        <text class="font-13 font-weight color-primary" @click="login = 1">{{ $t('login.log_t') }}</text>
                    </view>
                </view>
            </view>
        </view>

        <view class="con-footer">
            <!-- #ifdef APP-PLUS -->
            <view class="google" v-if="login == 1">
                <text>{{ $t('login.other_methods') }}</text>
                <view class="img-box" @click="googleLogin">
                    <image src="/static/img/google1.png" mode=""></image>
                </view>
            </view>
            <!-- #endif -->
            <!-- #ifdef H5 -->
            <view class="download-box" v-if="wallet">
                <text class="font-18 font-weight" style="font-size: 28rpx !important;">
                    {{ $t('login.txt23') }}
                    <text @click="loginWallet" style="font-size: 28rpx !important;">Wallet Web</text>
                    {{ $t('login.txt24') }}
                </text>
            </view>
            <view class="download-box">
                <text>
                    {{ $t('login.downlod_t') }}
                    <text @click="download">{{ config['site_name'] }} APP</text>
                    {{ $t('login.downlod_t1') }}
                </text>
            </view>
            <!-- #endif -->
            <view class="download-box" v-if="login != 1">
                <text>
                    {{ $t('login.reg_statement') }}
                    <text @click="$mroute.webview(1, 'yhxy', $t('login.agr_t'))">《{{ $t('login.agr_t') }}》</text>
                    {{ $t('login.and') }}
                    <text @click="$mroute.webview(1, 'ysxy', $t('login.privacy_t'))">《{{
                            $t('login.privacy_t')
                        }}》
                    </text>
                </text>
            </view>
        </view>
        <!--        -->
        <fui-rotate-verify background="var(--background-primary)"
                           ref="scRef"
                           :title="$t('login.t11')"
                           color="var(--content-tertiary)"
                           descrColor="var(--content-primary)"
                           sliderBgColor="var(--background-dark)"
                           slideColor="var(--content-tertiary)"
                           borderColor="var(--background-secondary-100)"
                           passColor="var(--color-primary)"
                           failColor="var(--content-trade-sell)"
                           closeColor="var(--content-primary)"
                           maskBgColor="rgba(0, 0, 0, .8)"
                           :desc="$t('login.t22')"
                           src="/static/verify.jpeg"
                           @verify="verifyResult">
        </fui-rotate-verify>

        <!-- <fui-slider-captcha ref="scRef" :title="$t('login.t11')" :desc="$t('login.t22')" :src="src" @success="verifyResult" @fail="verifyFail"></fui-slider-captcha> -->
    </view>
    <areacode ref="areacode" @itemclick="areacode"></areacode>
    <alert ref="alert" :ctxt="ctxt" :ftxt="ftxt" :title="alertTitle" @confirm="alertConfirm()" :content="content"></alert>
    <loading ref="loading"></loading>
</template>

<script>
import {Icon} from 'vant';
import {mapState, mapMutations, mapGetters} from 'vuex';
import common from '@/common/api/common.js';
import fuiSliderCaptcha from '@/components/firstui/fui-slider-captcha/fui-slider-captcha.vue';
import fuiRotateVerify from '@/components/firstui/fui-rotate-verify/fui-rotate-verify.vue';
import country from '/common/area.js';

var rescode;
export default {
    components: {
        [Icon.name]: Icon,
        fuiSliderCaptcha,
        fuiRotateVerify
    },
    data() {
        return {
            login: 0,
            height: '100%',
            active: 0,
            eye: 'visible',
            itype: 'password',
            onFocus: '',
            showareacode: '+0',
            verifyRes: false,
            phone: '',
            email: '',
            invaiteCode: '',
            alertTitle: '',
            content: '',
            ctxt: this.$t('login.cancel'),
            ftxt: this.$t('login.confirm'),
            password: '',
            src: '',
            resUrl: 'https://res.firstui.cn/static/images',
            index: 0,
            istatus: false,
            wallet: false
        };
    },
    onLoad(e) {
        if (e.code && e.code != '') {
            uni.setStorageSync('invaite-code', e.code);
        }
    },
    onReady() {
        uni.$on('getLocal', (res) => {
            console.log(res);
        });

        var local = uni.getStorageSync('local-country');
        if (typeof local != 'undefined' && local != '') {
            for (var i = 0; i < country['countryList'].length; i++) {
                if (country['countryList'][i]['code'].toLowerCase() === local.toLowerCase()) {
                    this.showareacode = country['countryList'][i]['dialingCode'];
                    break;
                }
            }
        }
        //检查是否有钱包环境
        //this.checkWalletEnv();
    },
    onShow() {
        var invaite_code = uni.getStorageSync('invaite-code');
        if (typeof invaite_code != 'undefined' && invaite_code != '') {
            this.invaiteCode = invaite_code;
            this.istatus = true;
        }
        this.getVerifyImage();
        const phone = uni.getStorageSync('login_phone');
        if (typeof phone != 'undefined' && phone != '') {
            this.phone = phone;
        }
        const email = uni.getStorageSync('login_email');
        if (typeof email != 'undefined' && email != '') {
            this.email = email;
        }
        if (parseInt(this.config['register_type']) === 1) {
            this.active = 1;
        }
        if (parseInt(this.config['register_type']) === 2) {
            this.active = 0;
        }
    },
    computed: {
        ...mapState(['config']),
        ...mapGetters(['userTheme'])
    },
    methods: {
        ...mapMutations(['userLogin']),
        checkWalletEnv() {
            if (window.tronWeb || window.ethereum) {
                this.wallet = true;
            }
        },
        download() {
            window.location.href = this.config['download'];
        },
        getVerifyImage() {
            //获取需要验证的图片
            let index = this.index;
            index++;
            if (index > 3) {
                index = 1;
            }
            this.index = index;
            this.src = `${this.resUrl}/component/sc/img_sc_${index}.png`;
        },
        verifyFail(e) {
            let times = e.times;
            if (times >= 3) {
                this.getVerifyImage();
            }
        },
        verifyResult(e) {
            //人机验证
            console.log(e);
            if (e.angle < 170 || e.angle > 200) {
                this.$refs.scRef.fail();
                return;
            }
            this.verifyHide();
            if (this.active === 0 && this.login == 0) {
                uni.showLoading();

                common.sendPhoneVerifyCode(this.phone, this.showareacode).then((res) => {
                    uni.hideLoading();
                    if (res.code == 200) {
                        uni.setStorageSync('invite_code', this.invaiteCode);
                        this.$mroute.authVerify('phone', this.phone, this.showareacode);
                    } else {
                        this.alertTitle = this.$t('login.tip_t2');
                        this.content = res.message;
                        this.$refs.alert.open();
                    }
                });
            }
            if (this.active == 1 && this.login == 0) {
                uni.showLoading();
                common.sendEmailVerifyCode(this.email).then((res) => {
                    uni.hideLoading();
                    if (res.code == 200) {
                        uni.setStorageSync('invite_code', this.invaiteCode);
                        this.$mroute.authVerify('email', this.email, '');
                    } else {
                        this.alertTitle = this.$t('login.tip_t2');
                        this.content = res.message;
                        this.$refs.alert.open();
                    }
                });
            }

            // 登录
            if (this.login == 1) {
                var loginInfo = {
                    password: this.password,
                    type: this.active == 0 ? 1 : 2
                };
                if (this.active == 0) {
                    if (this.phone == '') {
                        this.alertTitle = this.$t('login.tip_t2');
                        this.content = this.$t('login.phone_p');
                        this.$refs.alert.open();
                        return false;
                    }
                    loginInfo['phone'] = this.phone;
                    loginInfo['code'] = this.showareacode.replace('+', '');
                    uni.setStorageSync('login_phone', this.phone);
                } else {
                    if (this.email == '') {
                        this.alertTitle = this.$t('login.tip_t2');
                        this.content = this.$t('login.email_p');
                        this.$refs.alert.open();
                        return false;
                    }
                    loginInfo['email'] = this.email;
                    uni.setStorageSync('login_email', this.email);
                }
                if (this.password == '') {
                    this.alertTitle = this.$t('login.tip_t2');
                    this.content = this.$t('login.pwd_p');
                    this.$refs.alert.open();
                    return false;
                }
                uni.showLoading({
                    title: this.$t('login.load_log')
                });
                common.login(loginInfo).then((res) => {
                    console.log(res);
                    uni.hideLoading();
                    rescode = res.code;
                    if (res.code != 200) {
                        this.alertTitle = this.$t('login.log_t1');
                        this.content = res.message;
                        this.$refs.alert.open();
                    } else {
                        this.userLogin(res.data);
                        this.ctxt = '';
                        this.alertTitle = this.$t('login.log_t1');
                        this.content = this.$t('login.verify_c2');
                        this.$refs.alert.open();
                    }
                });
            }
        },
        alertConfirm() {
            if (this.login == 1 && rescode === 200) {
                return this.$mroute.switchIndex();

                if (this.$device.platform === 'ios') {
                    this.$mroute.stoter();
                    return true;
                } else {
                    this.$mroute.switchIndex();
                }
            }
        },
        googleLogin() {
            console.log('gogole');
            var _this = this;
            this.$refs.loading.open();
            uni.login({
                provider: 'google',
                complete(e) {
                    if (e.errMsg === 'login:ok') {
                        uni.getUserInfo({
                            provider: 'google',
                            success(info) {
                                common.googleLogin(info['userInfo']['email'], e['authResult']['access_token']).then((res) => {
                                    _this.$refs.loading.close();
                                    if (res.code === 200 && typeof res.data.action == 'undefined') {
                                        _this.userLogin(res.data);
                                        _this.login == 1;
                                        rescode = 200;
                                        _this.ctxt = '';
                                        _this.content = _this.$t('login.verify_c2');
                                        _this.$refs.alert.open();
                                    } else {
                                        uni.setStorageSync('google-token', e['authResult']['access_token']);
                                        uni.setStorageSync('google-info', info['userInfo']);
                                        uni.navigateTo({
                                            url: '/pages/auth/setpwd/setpwd?a=' + info['userInfo']['email'] + '&type=google'
                                        });
                                    }
                                });
                            },
                            fail() {
                                _this.$refs.loading.close();
                            }
                        });
                    }
                },
                fail(e) {
                    _this.$refs.loading.close();
                    console.log(e);
                }
            });
        },
        register() {
            this.$mroute.authVerify('email');
        },
        showArea() {
            this.$refs.areacode.open();
        },
        areacode(e) {
            this.showareacode = e.dialingCode;
        },
        verifyShow() {
            if (this.login == 1 && ((this.phone == '' && this.active == 0) || (this.email == '' && this.active == 1))) {
                this.alertTitle = this.$t('login.tip_t1');
                this.content = this.$t('login.tip_c1');
                this.$refs.alert.open();
                return false;
            }
            //this.$refs.verifypop.open();
            this.$refs.scRef && this.$refs.scRef.show();
        },
        verifyHide() {
            this.$refs.scRef && this.$refs.scRef.closeVerify();
            // this.$refs.verifypop.close();
        },
        open() {
            this.$refs.popup.closeVerify();
        },
        close() {
            uni.navigateBack();
        },
        switchPanel() {
        },
        changeInput() {
            if (this.itype == 'text') {
                this.itype = 'password';
                this.eye = 'visible';
            } else {
                this.itype = 'text';
                this.eye = 'invisible';
            }
        },
        sliderChange(index) {
            this.active = index;
            if (this.active == 0) {
                this.email = '';
            } else {
                this.phone = ''
            }
            this.password = ''
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/pages/login/login.scss';
</style>
