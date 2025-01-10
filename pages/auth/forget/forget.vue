<template>
    <view class="forget" :data-theme="userTheme">
        <fui-nav-bar isFixed 
                     isOccupy 
                     statusBar 
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('login.forget_t')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56" 
                      :color="'var(--content-primary)'">
            </fui-icon>
        </fui-nav-bar>
        <view class="body-wrap">
            <!-- mode -->
            <view class="login-mode">
                <view class="item" :class="active === 0 ? 'active' : ''" @click="active = 0">
                    <text>{{ $t('login.phone') }}</text>
                </view>
                <view class="item" :class="active === 1 ? 'active' : ''" @click="active = 1">
                    <text>{{ $t('login.email') }}</text>
                </view>
            </view>
            <!-- input -->
            <view class="login-label">
                <text class="font-13 color-gray">{{ active === 0 ? $t('login.phone1') : $t('login.email1') }}</text>
                <view class="input-box mt-7" 
                      type="phone" 
                      v-if="active === 0">
                    <view class="area-code" @click="openarea()">
                        <text class="font-14 color-black font-weight">{{ area }}</text>
                        <fui-icon name="turningdown" size="36" :color="'var(--content-tertiary)'"></fui-icon>
                    </view>
                    <input type="number" v-model="account" :placeholder="this.$t('login.phone_p')"
                           placeholder-class="placeholder"/>
                </view>
                <view class="input-box mt-7" v-else>
                    <input type="text" v-model="account" :placeholder="this.$t('login.email_p')"
                           placeholder-class="placeholder"/>
                </view>
            </view>
            <!-- button -->
            <view class="button-box">
                <fui-button @click="sendCode"
                            height="78rpx"
                            radius="78rpx"
                            size="26"
                            background="var(--content-primary)"
                            color="var(--background-primary)">
                    {{ $t('login.next') }}
                </fui-button>
            </view>
        </view>
    </view>
    <authPop ref="authPop" @callback="confirm" @resend="resend"></authPop>
    <areacode ref="areacode" @itemclick="areacode"></areacode>
    <alert ref="alert" :title="title" :ctxt="ctxt" :ftxt="ftxt" :content="content"></alert>
</template>

<script>
import {Icon} from 'vant';
import common from '/common/api/common.js';

import {mapGetters} from 'vuex';

export default {
    components: {
        [Icon.name]: Icon
    },
    data() {
        return {
            active: 0,
            onFocus: '',
            account: "",
            title: this.$t('login.tip_t2'),
            content: "",
            ctxt: this.$t('login.cancel'),
            ftxt: this.$t('login.confirm'),
            area: "+86"
        }
    },
    watch: {
        active() {
            this.account = "";
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        confirm(e) {
            if (this.active != 0) {
                this.area = '';
            }
            this.$mroute.setPwd(this.account, e, this.area, 1)
        },
        resend() {
            uni.showLoading({
                title: this.$t('login.send')
            });
            common.sendFindCode(this.account, this.active === 0 ? 1 : 2, this.area).then(res => {
                uni.hideLoading();
                if (res.code != 200) {
                    this.$refs.alert.close();
                    this.content = res.message;
                    return;
                }
            });
        },
        sendCode() {
            if (this.account.length < 6) {
                return false;
            }
            uni.showLoading({
                title: this.$t('login.send')
            });
            common.sendFindCode(this.account, this.active === 0 ? 1 : 2, this.area).then(res => {
                uni.hideLoading();
                if (res.code != 200) {
                    this.content = res.message;
                    this.$refs.alert.open();
                    return;
                }
                this.openVerifyCode();
            });
        },
        openVerifyCode() {
            this.$refs.authPop.open();
        },
        closeVerifyCode() {
            this.$refs.authPop.close();
        },
        openarea() {
            this.$refs.areacode.open();
        },
        areacode(e) {
            this.area = e.dialingCode;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "forget";
</style>
