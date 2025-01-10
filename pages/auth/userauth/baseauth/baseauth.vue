<template>
    <view class="baseAuth" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     :title="$t('auths.t1')"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="baseAuth-container">
            <!--  国家地区 -->
            <view class="label">
                <text class="font-13 color-black">{{ $t('auths.t2') }}</text>
                <view class="label-box" @click="openAreacode">
                    <text class="font-13 color-black font-weight">
                        {{ areaName }}
                    </text>
                    <image class="down-icon"
                           :src="`/static/img/tactic/down-${userTheme}.png`"
                           mode="widthFix">
                    </image>
                </view>
            </view>
            <!--  证件类型 -->
            <view class="label">
                <text class="font-13 color-black">{{ $t('auths.t3') }}</text>
                <view class="label-box" @click="openCard">
                    <text class="font-13 color-black font-weight" v-if="!info['type']">{{ $t('auths.t4') }}</text>
                    <text class="font-13 color-black font-weight" v-if="info['type'] == 1">{{ $t('auths.t5') }}</text>
                    <text class="font-13 color-black font-weight" v-if="info['type'] == 2">{{ $t('auths.t6') }}</text>
                    <text class="font-13 color-black font-weight" v-if="info['type'] == 3">{{ $t('auths.t7') }}</text>
                    <text class="font-13 color-black font-weight" v-if="info['type'] == 4">{{ $t('auths.t8') }}</text>
                    <image class="down-icon"
                           :src="`/static/img/tactic/down-${userTheme}.png`"
                           mode="widthFix">
                    </image>
                </view>
            </view>
            <!--  姓氏 -->
            <view class="label">
                <text class="font-13 color-black">{{ $t('auths.t9') }}</text>
                <view class="label-box">
                    <input class="font-13 font-weight"
                           type="text"
                           v-model="info['surname']"
                           :placeholder="$t('auths.t10')"
                           placeholder-class="placeholder"/>
                </view>
            </view>
            <!--  名字 -->
            <view class="label">
                <text class="font-13 color-black">{{ $t('auths.t11') }}</text>
                <view class="label-box">
                    <input class="font-13 font-weight"
                           type="text"
                           v-model="info['name']"
                           :placeholder="$t('auths.t12')"
                           placeholder-class="placeholder"/>
                </view>
            </view>
            <!--  证件号码 -->
            <view class="label">
                <text class="font-13 color-black">{{ $t('auths.t13') }}</text>
                <view class="label-box">
                    <input class="font-13 font-weight"
                           type="text"
                           v-model="info['no']"
                           :placeholder="$t('auths.t14')"
                           placeholder-class="placeholder"/>
                </view>
            </view>
            <!--  温馨提示 -->
            <view class="label">
                <text class="font-13 color-black font-weight">{{ $t('auths.t15') }}</text>
                <text class="font-12 color-gray mt-10">
                    {{ $t('auths.t16') }}
                </text>
            </view>
        </view>
        <view class="footer-button">
            <fui-button :background="status == -1 ? 'var(--content-primary)' : 'var(--background-secondary)'"
                        :color="status == -1 ? 'var(--background-primary)' : 'var(--content-tertiary)'"
                        size="26"
                        radius="78rpx"
                        height="78rpx"
                        @click="next()">
                {{ status == 0 ? $t('auths.t17') : status == 1 ? $t('auths.t18') : $t('auths.t19') }}
            </fui-button>
        </view>
    </view>
    <!-- 证件类型 POPUP  -->
    <fui-bottom-popup background="var(--background-primary)"
                      :safe-area="false"
                      radius="16" 
                      :show="documentType"
                      @close="closeCard">
        <view :data-theme="userTheme" class="card-popup">
            <view class="list">
                <view class="_row" @click="select(1)">
                    <text class="font-14"
                          :class="cardType == 1 ? 'color-primary font-weight' : 'color-gray'">
                        {{ $t('auths.t5') }}
                    </text>
                </view>
                <view class="_row" @click="select(2)">
                    <text class="font-14"
                          :class="cardType == 2 ? 'color-primary font-weight' : 'color-gray'">
                        {{ $t('auths.t6') }}
                    </text>
                </view>
                <view class="_row" @click="select(3)">
                    <text class="font-14"
                          :class="cardType == 3 ? 'color-primary font-weight' : 'color-gray'">
                        {{ $t('auths.t7') }}
                    </text>
                </view>
                <view class="_row" @click="select(4)">
                    <text class="font-14"
                          :class="cardType == 4 ? 'color-primary font-weight' : 'color-gray'">
                        {{ $t('auths.t8') }}
                    </text>
                </view>
            </view>
            <view class="cancel-button" @click="closeCard()">
                <text class="font-14 color-gray font-weight">
                    {{ $t('取消') }}
                </text>
            </view>
        </view>
    </fui-bottom-popup>
    <areacode ref="areacode" @itemclick="areaCallback"></areacode>
    <alert ref="alert" :title="title" :content="content"></alert>
</template>

<script>
import user from '/common/api/user.js';
import area from '/common/area.js';

import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            areaName: this.$t('auths.t2'),
            cardType: 0,
            documentType: false,
            info: {
                code: "",
                type: "",
                surname: "",
                name: "",
                no: ""
            },
            title: this.$t('login.tip_t2'),
            content: "",
            status: -1
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    onShow() {
        this.getInfo();
    },
    methods: {
        next() {
            if (this.status == 0) {
                this.content = this.$t('auths.t17');
                this.$refs.alert.open();
                return false;
            }
            var flag = true;
            Object.keys(this.info).forEach((k) => {
                if (k == 'code' || k == 'type' || k == 'surname' || k == 'name' || k == 'no') {
                    if (this.info[k] == "") {

                        flag = false;
                        return false;
                    }
                }
            });
            ;
            if (!flag) {
                this.content = this.$t('auths.t20');
                this.$refs.alert.open();
            } else {
                uni.setStorageSync('authInfo', this.info);
                this.$mroute.baseauth2(this.cardType);
            }

        },
        getInfo() {
            user.baseAuthInfo().then(res => {
                if (typeof res.data['id'] != 'undefined' && res.data['id']) {
                    this.info = res.data.length == 0 ? this.info : res.data;
                    if (this.info['code']) {
                        this.getAreaName(this.info['code']);
                        this.status = this.info['status'];
                    }
                    this.cardType = this.info['type'] ? this.info['type'] : 0;
                }
            });
        },
        getAreaName(code) {
            var lang = uni.getStorageSync('lang');
            for (var i = 0; i < area.countryList.length; i++) {
                if (area['countryList'][i]['dialingCode'] == this.info['code']) {
                    this.areaName = lang == 'zh_Hant' ? area['countryList'][i]['cnName'] : area['countryList'][i]['enName'];
                    break;
                }
            }
        },
        select(e) {
            this.cardType = e;
            this.info['type'] = e;
            this.closeCard();
        },
        openCard() {
            this.documentType = true;
        },
        closeCard() {
            this.documentType = false;
        },
        areaCallback(e) {
            console.log(e);
            var lang = uni.getStorageSync('lang');
            this.areaName = lang == 'zh_Hant' ? e.cnName : e.enName;
            this.info['code'] = e.dialingCode;
        },
        openAreacode() {
            console.log('open');
            this.$refs.areacode.open();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "baseauth";
</style>

