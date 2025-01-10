<template>
    <view class="overview"
          :data-theme="userTheme">
        <!--        总资产-->
        <view class="overview-header">
            <view class="overview-header-left">
                <view class="row">
                    <text class="font-12 color-gray mr-5">
                        {{ $t('strategy.t3') }}
                    </text>
                    <fui-icon name="visible"
                              size="32"
                              color="var(--content-tertiary)">
                    </fui-icon>
                </view>
                <view class="row">
                    <text class="font-24 color-black font-bold">
                        {{ $util.thousandSeparator(balance) }}
                    </text>
                </view>
                <view class="row">
                    <text class="font-12 color-black">
                        {{ $util.thousandSeparator(profit24) }}
                    </text>
                    <text class="font-12 color-gray">
                        ({{ $t('strategy.t4') }})
                    </text>
                </view>
            </view>
            <view class="overview-header-right">
                <view class="chartContainer"
                      ref="kline"
                      id="kline"
                      :change:chartContainer="render.initChart"
                      :style="`width: ${windowWidth - 300}px`">
                </view>
            </view>
        </view>
        <!--        创建策略-->
        <view class="found-box">
            <view class="title-box">
                <text class="font-16 color-black font-bold">
                    {{ $t('strategy.t5') }}
                </text>
                <text class="font-12 color-gray"
                      @click="visible = true">
                    {{ $t('strategy.t6') }}
                    <fui-icon name="arrowright"
                              size="24"
                              color="var(--content-tertiary)">
                    </fui-icon>
                </text>
            </view>
            <view class="mine-tabs">
                <view class="item"
                      :class="{'item-active': foundIndex === index}"
                      v-for="(item,index) in foundTabs"
                      :key="index"
                      @click="foundIndex = index">
                    <text>{{ item.title }}</text>
                </view>
            </view>
            <view class="menu-card">
                <view class="item"
                      v-for="item in foundTabs[this.foundIndex]['subMenu']"
                      @click="$util.toPage(item.path)">
                    <view class="item-top">
                        <image :src="`/static/img/tactic/${item.imgName}-${userTheme}.webp`"></image>
                        <text class="font-12 color-black">{{ item.title }}</text>
                    </view>
                    <text class="font-12 color-gray">{{ item.desc }}</text>
                </view>
            </view>
        </view>
        <!--        币种推荐-->
        <view class="currency-recommendation">
            <view class="title">
                <text class="font-16 color-black font-bold">{{ $t('strategy.t7') }}</text>
            </view>
            <view class="tab-box">
                <view class="tab-box-top">
                    <view class="item"
                          type="image"
                          @click="tabIndex = 0">
                        <image :src="`/static/img/tactic/sc-${tabIndex == 0 ? 's' : 'n'}.webp`"
                               mode="aspectFill">
                        </image>
                    </view>
                    <view class="item"
                          :class="{'item-active': tabIndex === 1}"
                          @click="tabIndex = 1">
                        <text>{{ $t('strategy.t8') }}</text>
                    </view>
                    <view class="item"
                          :class="{'item-active': tabIndex === 2}"
                          @click="tabIndex = 2">
                        <text>{{ $t('strategy.t9') }}</text>
                    </view>
                </view>
                <view class="tab-box-bottom mine-tabs">
                    <view class="item"
                          :class="{'item-active': currencyType === 0}"
                          @click="currencyType = 0;getContractSelect()">
                        <text>{{ $t('strategy.t10') }}</text>
                    </view>
                    <view class="item"
                          :class="{'item-active': currencyType === 1}"
                          @click="currencyType = 1;getTradeSelect()">
                        <text>{{ $t('strategy.t11') }}</text>
                    </view>
                </view>
            </view>
            <view class="currency-list">
                <view class="currency-list-top"
                      v-if="tabIndex !== 0">
                    <view class="item">
                        <text>{{ $t('strategy.t12') }}</text>
                    </view>
                    <view class="item">
                        <text>{{ $t('strategy.t13') }}</text>
                    </view>
                    <view class="item">
                        <text>{{ $t('strategy.t14') }}</text>
                    </view>
                </view>
                <template v-if="tabIndex === 0">
                    <view class="currency-list-container"
                          v-if="showList">
                        <view class="cell"
                              v-for="(item,idx) in mList">
                            <view class="cell-item">
                                <text class="color-black">{{ item.symbol }}
                                    <text v-if="currencyType === 1">/USDT</text>
                                    <template v-else>USDT</template>
                                </text>
                                <text class="color-gray">{{ $t('成交额') }} {{
                                        $util.bigNumberToString(item['quota'])
                                                         }}
                                </text>
                            </view>
                            <view class="cell-item">
                                <text class="color-primary"
                                      v-if="item['change']>0">
                                    {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                </text>
                                <text class="price_down"
                                      v-else>{{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                </text>
                                <text>≈¥ {{ $util.thousandSeparator(7.1 * item['new_price']) }}</text>
                            </view>
                            <view class="cell-item">
                                <text>{{ $util.thousandSeparator(item['change']) }}</text>
                            </view>
                        </view>
                        <empty-view :width="690"
                                    :height="600"
                                    :visible="mList.length == 0"
                                    :title="$t('list.not_data')">
                        </empty-view>
                    </view>
                    <view class="currency-list-card">
                        <view class="card-warp"
                              v-if="currencyType === 0">
                            <view class="card-item"
                                  v-for="(item,idx) in contract">
                                <view class="card-item-left">
                                    <text>
                                        {{ item.symbol }}USDT
                                    </text>
                                    <text>
                                        {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                    </text>
                                    <text class="color-primar"
                                          v-if="item.change_rate>0">
                                        +{{ item.change_rate }}%
                                    </text>
                                    <text class="price_down"
                                          v-else>
                                        {{ item.change_rate }}%
                                    </text>
                                </view>
                                <view class="check-box">
                                    <image src="@/static/img/tactic/check-select.png"></image>
                                </view>
                            </view>
                            <empty-view :width="690"
                                        :height="600"
                                        :visible="contract.length == 0"
                                        :title="$t('list.not_data')">
                            </empty-view>
                            <view class="add-button"
                                  v-if="contract.length != 0">
                                <fui-button background="var(--text-black)"
                                            color="var(--white)"
                                            radius="78rpx"
                                            width="80%"
                                            height="78rpx"
                                            size="24">
                                    {{ $t('strategy.t52') }}
                                </fui-button>
                            </view>
                        </view>
                        <view class="card-warp"
                              v-if="currencyType === 1">
                            <view class="card-item"
                                  v-for="(item,idx) in currency">
                                <view class="card-item-left">
                                    <text>
                                        {{ item.symbol }}
                                        <text>/USDT</text>
                                    </text>
                                    <text>
                                        {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                    </text>
                                    <text class="color-primar"
                                          v-if="item.change_rate>0">
                                        +{{ item.change_rate }}%
                                    </text>
                                    <text class="price_down"
                                          v-else>
                                        {{ item.change_rate }}%
                                    </text>
                                </view>
                                <view class="check-box">
                                    <image src="@/static/img/tactic/check-select.png"></image>
                                </view>
                            </view>
                            <empty-view :width="690"
                                        :height="600"
                                        :visible="currency.length == 0"
                                        :title="$t('list.not_data')">
                            </empty-view>
                            <view class="add-button"
                                  v-if="currency.length != 0">
                                <fui-button background="var(--text-black)"
                                            color="var(--white)"
                                            radius="78rpx"
                                            width="80%"
                                            height="78rpx"
                                            size="24">
                                    {{ $t('strategy.t52') }}
                                </fui-button>
                            </view>
                        </view>
                    </view>
                </template>
                <template v-if="tabIndex === 1">
                    <view class="currency-list-container"
                          v-if="currencyType === 0">
                        <view class="cell"
                              v-for="(item,idx) in contractDesc">
                            <view class="cell-item">
                                <text class="color-black">{{ item.symbol }}USDT</text>
                                <text class="color-gray">{{ $t('成交额') }} {{
                                        $util.bigNumberToString(item['quota'])
                                                         }}
                                </text>
                            </view>
                            <view class="cell-item">
                                <text class="color-primary"
                                      v-if="item['change']>0">
                                    {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                </text>
                                <text class="price_down"
                                      v-else>{{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                </text>
                                <text>≈¥ {{ $util.thousandSeparator(7.1 * item['new_price']) }}</text>
                            </view>
                            <view class="cell-item">
                                <text>{{ $util.thousandSeparator(item['change']) }}</text>
                            </view>
                        </view>
                        <empty-view :width="690"
                                    :height="600"
                                    :visible="contractDesc && contractDesc.length === 0"
                                    :title="$t('list.not_data')">
                        </empty-view>
                    </view>
                    <view class="currency-list-container"
                          v-if="currencyType === 1">
                        <view class="cell"
                              v-for="(item,idx) in currencyDesc">
                            <view class="cell-item">
                                <text class="color-black">{{ item.symbol }}
                                    <text>/USDT</text>
                                </text>
                                <text class="color-gray">{{ $t('成交额') }} {{
                                        $util.bigNumberToString(item['quota'])
                                                         }}
                                </text>
                            </view>
                            <view class="cell-item">
                                <text class="color-primary"
                                      v-if="item['change']>0">
                                    {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                </text>
                                <text class="price_down"
                                      v-else>{{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                </text>
                                <text>≈¥ {{ $util.thousandSeparator(7.1 * item['new_price']) }}</text>
                            </view>
                            <view class="cell-item">
                                <text>{{ $util.thousandSeparator(item['change']) }}</text>
                            </view>
                        </view>
                        <empty-view :width="690"
                                    :height="600"
                                    :visible="currencyDesc && currencyDesc.length == 0"
                                    :title="$t('list.not_data')">
                        </empty-view>
                    </view>
                </template>
                <template v-if="tabIndex === 2">
                    <view class="currency-list-container"
                          v-if="currencyType === 0">
                        <view class="cell"
                              v-for="(item,idx) in contractAsc">
                            <view class="cell-item">
                                <text class="color-black">{{ item.symbol }}USDT</text>
                                <text class="color-gray">{{ $t('成交额') }} {{
                                        $util.bigNumberToString(item['quota'])
                                                         }}
                                </text>
                            </view>
                            <view class="cell-item">
                                <text class="color-primary"
                                      v-if="item['change']>0">
                                    {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                </text>
                                <text class="price_down"
                                      v-else>{{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                </text>
                                <text>≈¥ {{ $util.thousandSeparator(7.1 * item['new_price']) }}</text>
                            </view>
                            <view class="cell-item">
                                <text>{{ $util.thousandSeparator(item['change']) }}</text>
                            </view>
                        </view>
                        <empty-view :width="690"
                                    :height="400"
                                    :visible="contractAsc && contractAsc.length == 0"
                                    :title="$t('list.not_data')">
                        </empty-view>
                    </view>
                    <view class="currency-list-container"
                          v-if="currencyType === 1">
                        <view class="cell"
                              v-for="(item,idx) in currencyAsc">
                            <view class="cell-item">
                                <text class="color-black">{{ item.symbol }}
                                    <text>/USDT</text>
                                </text>
                                <text class="color-gray">{{ $t('成交额') }} {{
                                        $util.bigNumberToString(item['quota'])
                                                         }}
                                </text>
                            </view>
                            <view class="cell-item">
                                <text class="color-primary"
                                      v-if="item['change']>0">
                                    {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                </text>
                                <text class="price_down"
                                      v-else>{{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                </text>
                                <text>≈¥ {{ $util.thousandSeparator(7.1 * item['new_price']) }}</text>
                            </view>
                            <view class="cell-item">
                                <text>{{ $util.thousandSeparator(item['change']) }}</text>
                            </view>
                        </view>
                        <empty-view :width="690"
                                    :height="600"
                                    :visible="currencyAsc && currencyAsc.length == 0"
                                    :title="$t('list.not_data')">
                        </empty-view>
                    </view>
                </template>
            </view>
        </view>

        <tactic-popup :visible="visible"
                      @close="visible = false">
        </tactic-popup>
    </view>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import strategy from "@/common/api/strategy.js"


import tacticPopup from "@/components/tacticPopup/tacticPopup.vue";
import emptyView from "@/components/emptyView/emptyView.vue";

export default {
    name: "overview",
    components: {
        tacticPopup,
        emptyView
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    data() {
        return {
            windowWidth: uni.getSystemInfoSync.windowWidth,
            visible: false,
            foundTabs: [],
            foundIndex: 0,
            tabIndex: 1,
            currencyType: 0,
            balance: '0.00',
            profit24: '0.00',
            currency: [],
            currencyDesc: [],
            currencyAsc: [],
            contract: [],
            contractDesc: [],
            contractAsc: [],
            mList: [],
            showList: 0,//没有自选数据
            symbolIndex: 0,
        }
    },
    created() {
        this.getTotal()
        this.getFt()
        this.getTradeMatches();
        this.getContractMatches();
        this.getTradeSelect();
        this.getContractSelect();
        uni.$on('trades', (data) => {
            this.onTradeMessage(data);
        });
        uni.$on('contract', (data) => {
            this.onContractMessage(data);
        });
    },
    onShow() {
        var load = uni.getStorageSync('load');
        if (load == 1) {
            if (this.symbolIndex == 0) {
                this.getTradeSelect();
            } else {
                this.getContractSelect();
            }
            uni.removeStorageSync('load');
        }
    },
    methods: {
        async getTotal() {
            let res = await strategy.total()
            this.balance = res.data.balance
            this.profit24 = res.data.profit24
        },
        getFt() {
            this.foundTabs = [{
                title: this.$t('strategy.t45'),
                subMenu: [{
                    imgName: "xhwg",
                    title: this.$t('strategy.t15'),
                    desc: this.$t('strategy.t46'),
                }, {
                    imgName: "hywg",
                    title: this.$t('strategy.t16'),
                    desc: this.$t('strategy.t47'),
                }]
            }, {
                title: this.$t('strategy.t48'),
                subMenu: [{
                    imgName: "xhwg",
                    title: this.$t('strategy.t15') + "-" + this.$t('strategy.t19'),
                    desc: this.$t('strategy.t46'),
                    path: "/pages/contract/tactic/createPolicy/creation/creation?type_id=1",
                }, {
                    imgName: "hywg",
                    title: this.$t('strategy.t16') + "-" + this.$t('strategy.t19'),
                    desc: this.$t('strategy.t49'),
                    path: "/pages/contract/tactic/createPolicy/creation/creation?type_id=2",
                }]
            }, {
                title: this.$t('strategy.t50'),
                subMenu: [{
                    imgName: "xhwg",
                    title: this.$t('strategy.t15') + "-做多" + this.$t('strategy.t17'),
                    desc: this.$t('strategy.t46'),
                    path: "/pages/contract/tactic/createPolicy/creation/creation?type_id=1",
                }, {
                    imgName: "hywg",
                    title: this.$t('strategy.t16') + "-做多" + this.$t('strategy.t17'),
                    desc: this.$t('strategy.t46'),
                    path: "/pages/contract/tactic/createPolicy/creation/creation?type_id=2",
                }]
            }, {
                title: this.$t('strategy.t51'),
                subMenu: [{
                    imgName: "xhwg",
                    title: this.$t('strategy.t15') + "-" + this.$t('strategy.t18'),
                    desc: this.$t('strategy.t46'),
                    path: "/pages/contract/tactic/createPolicy/creation/creation?type_id=1",
                }, {
                    imgName: "hywg",
                    title: this.$t('strategy.t16') + "-" + this.$t('strategy.t18'),
                    desc: this.$t('strategy.t46'),
                    path: "/pages/contract/tactic/createPolicy/creation/creation?type_id=2",
                }]
            }]

        },
        onContractMessage(data) {
            if (data.type == 200) {
                if (this.contract.length > 0) {
                    this.contract = this.$util.compareCurrency(this.contract, data.data.data);
                }
                if (this.symbolIndex == 1 && this.mList.length > 0) {
                    this.mList = this.$util.compareCurrency(this.mList, data.data.data);
                }
            }
        },
        onTradeMessage(data) {
            if (data.type != 100) {
                return false;
            }
            //接收现货行情数据
            if (this.active == 0 && this.symbolIndex == 0) {
                try {
                    this.mList = this.$util.compareCurrency(this.mList, data.data);
                    this.$forceUpdate();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.active == 1) {
                try {
                    this.currency = this.$util.compareCurrency(this.currency, data.data);
                    this.$forceUpdate();
                } catch (e) {
                    console.log(e);
                }
            }
        },
        async getContractMatches() {
            let matches = uni.getStorageSync('contract-matches');
            if (matches == '' || typeof matches == 'undefined') {
                console.log('reload');
                matches = await currencyApi.contractCurrencyList();
                uni.setStorageSync('contract-matches', matches.data);
                matches = matches.data;
            }
            this.contract = matches[0]['currency']
            this.contractDesc = this.$util.sortDesc(this.contract);
            this.contractAsc = this.$util.sortAsc(this.contract);
            console.log(this.contractDesc, this.contractAsc)
        },
        async getTradeMatches() {
            let currency = uni.getStorageSync('trade-currency');
            if (currency == '' || typeof currency == 'undefined') {
                currency = await currencyApi.tradeCurrencyList();
                uni.setStorageSync('trade-currency', currency.data);
                currency = currency.data;
            }
            this.currency = currency[0]['currency']
            this.currencyDesc = this.$util.sortDesc(this.currency);
            this.currencyAsc = this.$util.sortAsc(this.currency);
        },
        getContractSelect() {
            var mlist = uni.getStorageSync('select-contract');
            if (typeof mlist != 'undefined' && mlist.length > 0) {
                this.showList = 1;
                this.mList = mlist;
            } else {
                this.showList = 0;
                this.mList = [];
            }
        },
        getTradeSelect() {
            var mlist = uni.getStorageSync('select-trade');
            if (typeof mlist != 'undefined' && mlist.length > 0) {
                this.showList = 1;
                this.mList = mlist;
            } else {
                this.showList = 0;
                this.mList = [];
            }
        },
        isEmpty(obj) {
            if (Array.isArray(obj)) {
                return obj.length === 0;
            } else if (typeof obj === 'object' && obj !== null) {
                return Object.keys(obj).length === 0;
            }
            return !obj;
        }
    }
}
</script>
<script module="render"
        lang="renderjs">
import controller from './render.js';
export default controller;
</script>
<style lang="scss"
       scoped>
@import "overview";
</style>