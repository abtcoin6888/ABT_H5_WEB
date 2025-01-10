<template>
    <!--    策略参数-->
    <view class="policy-parameter"
          :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     zIndex="9"
                     :title="$t('strategy.t53')"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     @left-click="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="body-box">
            <view class="head">
                <view class="head-top">
                    <text class="currency-text">{{ currentCurrency.symbol }}/USDT</text>
                    <text class="currency-price">
                        {{ $util.thousandSeparator(currentCurrency['new_price'], currentCurrency['decimals']) }}
                    </text>
                    <text class="price_down currency-rate">{{
                            $util.thousandSeparator(currentCurrency['change_rate'])
                                                           }}%
                    </text>
                </view>
                <view class="head-bottom">
                    <view class="head-bottom-left">
                        <text>{{ $t('strategy.t54') }}</text>
                        <text class="num-text">{{ item.rate }}%</text>
                        <text>{{ $t('strategy.t55') }}</text>
                        <text class="color-black font-weight">
                            {{
                                item.mold == 1 ? $t('strategy.t56') : (item.mold == 2 ? $t('strategy.t57') : $t('strategy.t58'))
                            }}
                        </text>
                    </view>
                    <view class="kline-warp">
                        <tatic-chart :chartdata="chartdata"></tatic-chart>
                    </view>
                </view>
            </view>
            <view class="content">
                <view class="content-item">
                    <view class="row">
                        <text>方向</text>
                        <text class="color-primary">正向</text>
                    </view>
                    <view class="row">
                        <text>{{ $t('strategy.t59') }}</text>
                        <text>{{ item.use_num }}</text>
                    </view>
                    <view class="row">
                        <text>{{ $t('strategy.t60') }}</text>
                        <text>{{ $util.thousandSeparator(item.min, currentCurrency['decimals']) }} -
                              {{ $util.thousandSeparator(item.max, currentCurrency['decimals']) }}
                        </text>
                    </view>
                    <view class="row">
                        <text>{{ $t('strategy.t61') }}</text>
                        <text>{{ item.grid_num }}</text>
                    </view>
                    <view class="row">
                        <text>{{ $t('strategy.t62') }}</text>
                        <text>{{ item.profit_min }}% - {{ item.profit_max }}%</text>
                    </view>
                    <view class="row"
                          @click="copy()">
                        <text>{{ $t('strategy.t63') }}</text>
                    </view>
                </view>
                <view class="content-item">
                    <view class="label">
                        <view class="label-title">
                            <text v-if="type_id==1">{{ $t('strategy.t64') }}</text>
                            <text v-else>{{ $t('strategy.t65') }}</text>
                            <view class="select-box"
                                  @click="visible = true"
                                  v-if="type_id==2">
                                <text>1X</text>
                                <fui-icon name="turningdown"
                                          size="28"
                                          color="var(--content-primary)"></fui-icon>
                            </view>
                        </view>
                        <view class="label-input">
                            <input type="text"
                                   v-model="item.amount"
                                   :placeholder="apl">
                            <text>USDT</text>
                        </view>
                    </view>
                    <view class="slider-warp">
                        <view class="slider-box">
                            <view class="slider">
                                <slider :value="sliderVal"
                                        activeColor="transparent"
                                        backgroundColor="transparent"
                                        block-size="16"
                                        min="0"
                                        max="100"
                                        step="1"
                                        @change="slideChange"
                                        @changing="slideChange" />
                            </view>
                            <view class="slider-active-background"
                                  :style="`width: ${sliderVal}%`"></view>
                            <view class="slider-dots">
                                <view class="dot"
                                      v-for="i in [0, 25, 50, 75, 100]"></view>
                            </view>
                        </view>
                    </view>
                    <view class="balance">
                        <text>{{ $t('strategy.t66') }}</text>
                        <text>{{ $util.thousandSeparator(balance) }} USDT</text>
                        <image src="/static/img/tactic/tran-icon.png"
                               mode="widthFix"
                               @click="$mroute.exchange()"></image>
                    </view>

                    <view class="label"
                          v-if="type_id==1">
                        <label-check-box :checked="checked"
                                         :text="$t('strategy.t67')"
                                         @change="checked = !checked">
                        </label-check-box>
                    </view>
                    <view class="row-cell"
                          v-else>
                        <text class="font-12 color-gray">{{ $t('strategy.t68') }}</text>
                        <text class="font-12 font-weight color-black">-- USDT</text>
                    </view>
                    <button class="button"
                            @click="useGird">{{ $t('strategy.t69') }}
                    </button>
                </view>
            </view>
        </view>
        <strategic-leverage :leverGroup="leverGroup"
                            :leverVal="leverVal"
                            :visible="visible"
                            @close="visible = false"
                            @leverChange="leverChange">
        </strategic-leverage>
    </view>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import taticChart from "@/components/taticChart/taticChart.vue";
import strategicLeverage from "@/components/strategicLeverage/strategicLeverage.vue";
import labelCheckBox from "@/components/labelcheckbox/labelcheck.vue";
import strategy from "@/common/api/strategy.js"

export default {
    components: {
        strategicLeverage,
        taticChart,
        labelCheckBox
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    data() {
        return {
            visible: false,
            leverGroup: [1, 25, 50, 75, 100, 125],
            leverVal: 1,
            item: {amount: '',},
            currentCurrency: {},
            checked: false,
            apl: '',
            type_id: 1,
            id: 0,
            title: '',
            cm_id: 0,
            currency_id: 0,
            balance: '0.00',

            sliderVal: 0,
            chartdata: [
                {timestamp: 1624521600000, open: 2320.26, close: 2300.00, low: 2287.3, high: 2362.94},
                {timestamp: 1624608000000, open: 2300.00, close: 2291.30, low: 2288.26, high: 2308.38},
                {timestamp: 1624694400000, open: 2295.35, close: 2346.50, low: 2295.35, high: 2346.92},
                {timestamp: 1624780800000, open: 2347.22, close: 2358.98, low: 2337.35, high: 2363.8},
                {timestamp: 1624867200000, open: 2360.75, close: 2382.48, low: 2347.89, high: 2383.76},
                {timestamp: 1624521600000, open: 2320.26, close: 2300.00, low: 2287.3, high: 2362.94},
                {timestamp: 1624608000000, open: 2300.00, close: 2291.30, low: 2288.26, high: 2308.38},
                {timestamp: 1624694400000, open: 2295.35, close: 2346.50, low: 2295.35, high: 2346.92},
                {timestamp: 1624780800000, open: 2347.22, close: 2358.98, low: 2337.35, high: 2363.8},
                {timestamp: 1624867200000, open: 2360.75, close: 2382.48, low: 2347.89, high: 2383.76}
            ],
        }
    },
    onLoad(option) {
        this.id = option.id
        this.getAiDetail(option.id)
        this.type_id = option.type_id
        this.title = option.title
    },
    onShow() {
        this.getBalance()
    },
    methods: {
        leverChange(e) {
            this.leverVal = e.detail.value
        },
        async getAiDetail(id) {
            let res = await strategy.aiDetail(id)
            this.item = res.data
            this.currentCurrency = uni.getStorageSync('trade-current')
            this.apl = '最低' + this.item.amount
            this.cm_id = this.item.cm_id
            this.currency_id = this.item.currency_id
        },
        copy() {
            uni.navigateTo({
                url: "/pages/contract/tactic/createPolicy/creation/creation?id=" + this.id + '&type_id=' + this.type_id + '&tb_idx=1'
            })
        },
        getBalance() {
            strategy.getBalance(10).then(res => {
                this.balance = res.data.balance;
            });
        },
        async useGird() {
            if (this.checked) {
                this.item.stop_sell = 1
            }
            this.item.price = this.currentCurrency['new_price']
            let res = await strategy.useGird(this.item)
            if (res.code == 200) {
                this.$util.toPage('/pages/contract/tactic/tactic?barActive=2')
            }
        },
        slideChange(e) {
            this.sliderVal = e.detail.value;
        }
    }
}
</script>

<style lang="scss"
       scoped>
@import "policyParameter";
</style>