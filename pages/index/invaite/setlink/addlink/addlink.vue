<template>
    <view class="addLink" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('sadd.t1')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="cell">
            <text class="font-13 color-black">
                {{ $t('sadd.t2') }}
            </text>
            <text class="font-13 color-gray">
                {{ $t('sadd.t3') }}：
                <text class="color-warring">
                    {{ config['income_ratio_trade_agent'] }}%
                </text>
                 |
                {{ $t('sadd.t4') }}：
                <text class="color-warring">
                    {{ config['income_ratio_contract_agent'] }}%
                </text>
            </text>
        </view>
        <view class="cell-box">
            <text class="font-13 color-black">{{ $t('sadd.t5') }}</text>
            <view class="box">
                <input type="digit" v-model="mtrade" disabled :placeholder="$t('sadd.t5')">
                <text class="font-13 color-black">%</text>
            </view>
        </view>
        <view class="cell-box">
            <text class="font-13 color-black">{{ $t('sadd.t6') }}</text>
            <view class="box">
                <input type="digit" :value="ftrade" @input="inputFtrade" :placeholder="$t('calc.t9')">
                <text class="font-13 color-black">%</text>
            </view>
        </view>
        <view class="cell-box">
            <text class="font-13 color-black">{{ $t('sadd.t7') }}</text>
            <view class="box">
                <input type="digit" :value="mcontract" disabled :placeholder="$t('sadd.t7')">
                <text class="font-13 color-black">%</text>
            </view>
        </view>
        <view class="cell-box">
            <text class="font-13 color-black">{{ $t('sadd.t8') }}</text>
            <view class="box">
                <input type="digit" :value="fcontract" @input="inputFcontract" :placeholder="$t('calc.t9')">
                <text class="font-13 color-black">%</text>
            </view>
        </view>
        <view class="cell_row">
            <text class="font-13 color-black">{{ $t('sadd.t9') }}</text>
            <fui-switch color="var(--color-primary)"
                        @change="change"
                        scaleRatio="0.8">
            </fui-switch>
        </view>
        <view class="footer-button">
            <fui-button height="78rpx"
                        radius="78rpx"
                        size="26"
                        @click="submit"
                        color="var(--background-primary)"
                        background="var(--content-primary)">
                {{ $t('sadd.t10') }}
            </fui-button>
        </view>
        <loading ref="loading"></loading>
        <alert ref="alert" :content="content"></alert>
    </view>
</template>

<script>
import fuiSwitch from "@/components/firstui/fui-switch/fui-switch.vue"
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"

import commonApi from '@/common/api/common.js';

import {
    mapGetters
} from 'vuex';

export default {
    components: {
        fuiSwitch,
        fuiNavBar
    },
    data() {
        return {
            config: {},
            mtrade: "",
            mcontract: "",
            ftrade: 0,
            fcontract: 0,
            checked: false,
            content: ""
        }
    },
    onShow() {
        this.getConfig();
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    methods: {
        submit() {
            if (this.ftrade === '' || this.fcontract === '') {
                return false;
            }
            const form = {
                mtrade: this.mtrade,
                ftrade: this.ftrade,
                mcontract: this.mcontract,
                fcontract: this.fcontract,
                is_default: this.checked ? 1 : 0
            };

            this.$refs.loading.open();
            commonApi.saveShareSetting(form).then(res => {
                this.$refs.loading.close();
                if (res.code === 200) {
                    uni.navigateBack();
                } else {
                    this.content = res.message;
                    this.$refs.alert.open();
                }
            }).catch((e) => {
                this.$refs.loading.close();
                this.content = res.message;
                this.$refs.alert.open();
            });
        },
        change(e) {
            console.log(e);
            this.checked = e.detail.value;
        },
        inputFtrade(e) {
            var v = e.detail.value;
            if (v != '' && v > 0 && v <= parseFloat(this.config.income_ratio_trade_agent)) {
                this.mtrade = parseInt(this.config.income_ratio_trade_agent) - parseInt(v);
                this.ftrade = v;
            } else {
                this.mtrade = this.config['income_ratio_trade_agent'];
                this.ftrade = '';
            }
        },
        inputFcontract(e) {
            var v = e.detail.value;
            if (v != '' && v > 0 && v <= parseInt(this.config.income_ratio_contract_agent)) {
                this.mcontract = parseInt(this.config.income_ratio_contract_agent) - v;
                this.fcontract = v;
            } else {
                this.mcontract = this.config['income_ratio_contract_agent'];
                this.fcontract = '';
            }
        },
        getConfig() {
            commonApi.getShareConfig().then(res => {
                this.config = res.data;
				console.log(res.data);
                this.mtrade = parseInt(res.data.income_ratio_trade_agent);
                this.mcontract = parseInt(res.data.income_ratio_contract_agent);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "addlink.scss";
</style>