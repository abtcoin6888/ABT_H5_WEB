<template>
    <view class="financeInfo" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     custom
                     background="var(--background-primary)"
                     @init="navInit">
           <view class="nav-bar">
               <view class="nav-bar-left">
                   <fui-icon @leftClick="$mroute.back()" name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
               </view>
               <view class="nav-bar-title">
                   <text class="font-16 color-black font-weight">
                       {{ $t('financing.t15') + $t('common.detail') }}
                   </text>
               </view>
           </view>
        </fui-nav-bar>
        <scroll-view class="info-wrap"
                     scroll-y
                     :style="{'height': windowHeight - navHeight + 'px'}"
                     @scroll="scroll">
            <view class="main-wrap">
                <view class="_head">
                    <text class="font-18 color-black font-weight">{{ item.name }}</text>
                    <view class="group">
                        <view class="_item">
                            <text class="price_up font-18 font-weight">{{ item.eay }}%</text>
                            <text class="font-13 color-gray">{{ $t('financing.t7') }}</text>
                        </view>
                        <view class="_item">
                            <text class="font-13 color-black font-weight">{{ item.time_limit }}{{ $t('financing.t10') }}</text>
                            <text class="font-13 color-gray">{{ $t('financing.t8') }}</text>
                        </view>
                        <view class="_item">
                            <text class="font-13 color-black font-weight">{{ item.buy_currency.symbol }}</text>
                            <text class="font-13 color-gray">{{ $t('financing.t6') }}</text>
                        </view>
                    </view>
                </view>
                <!--  -->
                <view class="_list">
                    <view class="row">
                        <text class="font-13 color-gray">{{ $t('financing.t16') }}</text>
                        <text class="font-13 color-black font-weight">{{ item.total_amount }} {{ item.buy_currency.symbol }}</text>
                    </view>
                    <view class="row">
                        <text class="font-13 color-gray">{{ $t('financing.t26') }}</text>
                        <text class="font-13 color-black font-weight">{{ item.min_buy }} {{ item.buy_currency.symbol }}</text>
                    </view>
                    <view class="row">
                        <text class="font-13 color-gray">{{ $t('financing.t27') }}</text>
                        <text class="font-13 color-black font-weight">{{ item.limit_buy }} {{ item.buy_currency.symbol }}</text>
                    </view>
                    <view class="row">
                        <text class="font-13 color-gray">{{ $t('financing.t28') }}</text>
                        <text class="font-13 color-black font-weight">{{ item.start_at }}</text>
                    </view>
                    <view class="row">
                        <text class="font-13 color-gray">{{ $t('financing.t29') }}</text>
                        <text class="font-13 color-black font-weight">{{ item.end_at }}</text>
                    </view>
                </view>
                <!-- rule -->
                <view class="rule">
                    <view class="rule-box">
                        <text class="font-14 color-black font-weight mb-10">{{ $t('financing.t30') }}：</text>
                        <text class="font-12 color-gray context">{{ item.content }}</text>
                    </view>
                </view>
                <!--  -->
                <view class="_list">
                    <view class="_title">
                        <text class="font-14 color-black font-weight">{{ $t('financing.t31') }}</text>
                    </view>
                    <view class="row">
                        <text class="font-13 color-gray">{{ $t('financing.t32') }}</text>
                        <text class="font-13 color-black font-weight">{{ item.user_amount ? item.user_amount : 0 }} {{ item.buy_currency.symbol }}</text>
                    </view>
                    <view class="row">
                        <text class="font-13 color-gray">{{ $t('financing.t33') }}</text>
                        <text class="font-13 color-black font-weight">{{ item.user_income ? item.user_income : 0 }} {{ item.pay_currency.symbol }}</text>
                    </view>
                    <view class="row">
                        <text class="font-13 color-gray">{{ $t('financing.t34') }}</text>
                        <text class="font-13 color-black font-weight">{{ item.remaining }} {{ item.buy_currency.symbol }}</text>
                    </view>
                </view>
                <view class="footer">
                    <button @click="$mroute.financeConfirm(id)">{{ $t('financing.t35') }}</button>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import financing from '../../../../common/api/financing.js'
import util from '../../../../common/util.js'
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"

import {mapGetters} from 'vuex';

export default {
    components: {
        fuiNavBar
    },
    data() {
        return {
            scrollTop: 0,
            windowHeight: uni.getSystemInfoSync().windowHeight,
            navHeight: "",
            id: 0,
            item: {
                buy_currency: {},
                pay_currency: {},
            }
        }
    },
    onLoad(option) {
        this.id = option.id
    },
    mounted() {
        this.getDetail()
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        scroll(e) {
            this.scrollTop = e.detail.scrollTop;
        },
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
        },
        async getDetail() {
            let res = await financing.detail({
                id: this.id
            })
            res.data.start_at = util.dateFormatter(res.data.start_at, 'y-m-d h:i')
            res.data.end_at = util.dateFormatter(res.data.end_at, 'y-m-d h:i')
            res.data.min_buy = util.thousandSeparator(res.data.min_buy)
            res.data.limit_buy = util.thousandSeparator(res.data.limit_buy)
            res.data.total_amount = util.thousandSeparator(res.data.total_amount)
            res.data.remaining = util.thousandSeparator(res.data.remaining)
            res.data.user_income = util.thousandSeparator(res.data.user_income)
            res.data.user_amount = util.thousandSeparator(res.data.user_amount)
            this.item = res.data
        }
    }
}
</script>

<style lang="scss" scoped>
@import "info";
</style>
