<template>
    <view class="exchange" :data-theme="userTheme">
        <fui-nav-bar zIndex="1"
                     isFixed
                     isOccupy
                     :padding="15"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('financing.t81')"
                     @leftClick="$mroute.back()"
                     @rightClick="$mroute.rechargeRecord()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
            <template v-slot:right>
                <image class="order-image"
                       :src="`/static/img/tactic/order-${userTheme}.png`"
                       mode="widthFix">
                </image>
            </template>
        </fui-nav-bar>
        <view class="exchange-container-wrap">
            <view class="_exchange_box">
                <view class="ex-left">
                    <text class="font-14 color-gray">
                        {{ $t('financing.t82') }}
                    </text>
                    <text class="font-14 color-gray">
                        {{ $t('financing.t83') }}
                    </text>
                </view>
                <view class="ex-center">
                    <view class="cell"
                          @click="direction=0; $refs.accounts.open()">
                        <text class="font-14 color-black font-weight">
                            {{ accounts[findex]['text'] }}
                        </text>
                        <image class="down-icon"
                               :src="`/static/img/tactic/down-${userTheme}.png`"
                               mode="widthFix">
                        </image>
                    </view>
                    <view class="cell"
                          @click="direction=1; $refs.accounts.open()">
                        <text class="font-14 color-black font-weight">
                            {{ accounts[tindex]['text'] }}
                        </text>
                        <image class="down-icon"
                               :src="`/static/img/tactic/down-${userTheme}.png`"
                               mode="widthFix">
                        </image>
                    </view>
                </view>
                <view class="ex-right">
                    <view class="switch-box" @click="exchange">
                        <image class="icon"
                               :src="`/static/wallet/exchange-${userTheme}.png`">
                        </image>
                    </view>
                </view>
            </view>
            <view class="row-box">
                <view class="_title">
                    <text class="font-13 color-black">
                        {{ $t('financing.t84') }}
                    </text>
                </view>
                <view class="cell-input-box" @click="$refs.selectp.open()">
                    <template v-if="current===false">
                        <text class="font-13 color-gray">{{ $t('financing.t85') }}</text>
                    </template>
                    <template v-else>
                        <view class="coin-box">
                            <image :src="current['icon']" mode=""></image>
                            <text class="font-13 font-weight color-black">{{ current['symbol'] }}</text>
                        </view>
                    </template>
                    <image class="down-icon"
                           :src="`/static/img/tactic/down-${userTheme}.png`"
                           mode="widthFix">
                    </image>
                </view>
            </view>
            <view class="row-box">
                <view class="_title">
                    <text class="font-13 color-black">{{ $t('financing.t86') }}</text>
                    <text class="font-13 color-black">
                        {{ $t('financing.t87') }}
                        {{
                            current === false ? '--' : $util.thousandSeparator($util.str2number(current[accounts[findex]['field']]))
                        }}
                        {{ current['symbol'] }}
                    </text>
                </view>
                <view class="cell-input-box">
                    <input v-model="amount"
                           type="number"
                           class="color-black font-13"
                           :placeholder="$t('financing.t88')"
                           placeholder-class="placeholder">
                    <text @click="amount=$util.str2number($util.float(current[accounts[findex]['field']]))"
                          class="font-13 color-primary desc">
                        {{ $t('financing.t89') }}
                    </text>
                </view>
            </view>
            <view class="tips">
                <text class="font-14 color-black">{{ $t('financing.t90') }}</text>
                <text class="font-12 color-gray">{{ $t('financing.t91') }}</text>
            </view>
            <view class="footer">
                <button @click="confirm"
                        :class="{'bg-black':amount != '','bg-gray': amount == '' || amount <= 0}"
                        class="button">
                    <text class="font-13 font-weight"
                          :class="{'color-white': amount != '', 'color-gray': amount == '' || amount <= 0}">
                        {{ $t('financing.t92') }}
                    </text>
                </button>
            </view>
        </view>

        <uni-popup ref="accounts" :safe-area="false" type="bottom">
            <view class="authPanel">
                <view class="title-box">
                    <text class="font-15 font-weight color-black">
                        {{ direction == 0 ? $t('financing.t93') : $t('financing.t94') }}
                    </text>
                    <view class="close-icon" @click="$refs.accounts.close()">
                        <fui-icon name="close" color="var(--content-primary)" size="48"></fui-icon>
                    </view>
                </view>
                <view class="list">
                    <view class="l-cell" v-for="(item,index) in accounts" :key="index" @click="setAccount(index);"
                          :class="{'bg-gray':direction == 0 && findex== index || direction == 1 && tindex==index}">
                        <text class="font-13 font-weight"
                              :class="{'color-primary':findex==index||tindex==index,'color-black':direction==0&&tindex==index||direction==1&&findex==index}">
                            {{ item.text }}
                        </text>
                    </view>
                </view>
            </view>
        </uni-popup>

        <uni-popup ref="selectp" :safe-area="false" type="bottom">
            <view :style="{'height': $device.windowHeight + 'px'}">
                <fui-nav-bar statusBar isOccupy
                             :title="$t('financing.t95')"
                             @leftClick="$refs.selectp.close()"
                             background="var(--background-primary)"
                             color="var(--content-primary)"
                             @init="navInit">
                    <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
                </fui-nav-bar>
                <view :style="{'height': ($device.windowHeight - navHeight) + 'px'}">
                    <coin-indexed-xlist name-key="symbol"
                                        nameKey="symbol"
                                        :dataList="coin"
                                        :showAvatar="true"
                                        :field="accounts[findex] ? accounts[findex] : accounts[0]"
                                        @itemclick="itemclick">
                    </coin-indexed-xlist>
                </view>
            </view>
        </uni-popup>
        <loading ref="loading"></loading>
        <alert ref="alert" :title="$t('financing.t96')" :content="content"></alert>
    </view>
</template>

<script>
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
import {
    NavBar,
    Icon
} from 'vant';
import commonApi from '/common/api/common.js';

import {
    mapGetters,
} from 'vuex';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        fuiNavBar
    },
    data() {
        return {
            direction: 0,
            coin: [],
            current: false,
            amount: "",
            accounts: [],
            findex: 0,
            tindex: 1,
            content: "",
            navHeight: ""
        }
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    onReady() {
        this.getCurrency();
    },
    onShow() {
        this.accounts = [
            {
                text: this.$t('wallete.capital_acc'),
                field: "balance"
            },
            {
                text: this.$t('wallete.spot_acc'),
                field: "trade_balance"
            },
            {
                text: this.$t('wallete.contract_acc'),
                field: "contract_balance"
            },
            {
                text: this.$t('wallete.options_acc'),
                field: "future_balance"
            },
            {
                text: this.$t('wallete.fin_acc'),
                field: "finance_balance"
            },
            // {
            //     text: this.$t('wallete.str_acc'),
            //     field: "strategy_balance"
            // }
        ]
    },
    methods: {
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
        },
        confirm() {
            if (this.amount == '' || parseFloat(this.amount) <= 0) {
                return false;
            }
            if (this.current === false) {
                return false;
            }

            if (parseFloat(this.amount) > parseFloat(this.current[this.accounts[this.findex]['field']])) {
                this.content = this.$t('financing.t97');
                this.$refs.alert.open();
                return false;
            }
            const form = {
                currency_id: this.current['id'],
                amount: this.amount,
                to: this.accounts[this.tindex]['field'],
                from: this.accounts[this.findex]['field']
            };
            this.$refs.loading.open();
            commonApi.postExchange(form).then(res => {
                this.$refs.loading.close();
                if (res.code != 200) {
                    this.content = res.message;
                    this.$refs.alert.open();
                    return false;
                }
                this.current[this.accounts[this.findex]['field']] = this.current[this.accounts[this.findex]['field']] - this.amount;
                this.content = this.$t('financing.t98');
                this.$refs.alert.open();
                this.getCurrency();
            }).catch((e) => {
                this.$refs.loading.close();
            })
        },
        exchange() {
            var t = this.findex;
            this.findex = this.tindex;
            this.tindex = t;
        },
        setAccount(index) {
            if (this.direction == 0 && this.tindex != index) {
                this.findex = index;
                this.$refs.accounts.close();
            }
            if (this.direction == 1 && this.findex != index) {
                this.tindex = index;
                this.$refs.accounts.close();
            }
			this.amount = '';
        },
        getCurrency() {
            commonApi.getAccountCurrency().then(res => {
                this.coin = res.data;
            });
        },
        itemclick(e) {
            this.current = e;
            this.amount = '';
            this.$refs.selectp.close();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./exchange.scss";
</style>

<style>
.icon {
    -moz-transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
}
</style>