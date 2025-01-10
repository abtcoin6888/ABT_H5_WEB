<template>
    <view class="mine" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('follow.my_follow')"
                     @leftClick="$mroute.back()" 
                     @init="navInit">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <scroll-view scroll-y class="container-warp" :style="{'height': scrollHeight + 'px'}" @scroll="bodyScroll">
            <view class="container-top">
                <view class="card">
                    <view class="card-cell">
                        <view class="item">
                            <text class="font-12 color-gray">今日收益(USDT)</text>
                            <fui-icon name="info" size="30" :color="'var(--content-tertiary)'"></fui-icon>
                        </view>
                        <view class="item">
                            <text class="font-12 color-gray">更多</text>
                            <fui-icon name="arrowright" size="30" :color="'var(--content-tertiary)'"></fui-icon>
                        </view>
                    </view>
                    <view class="card-cell">
                        <view class="item">
                            <text class="font-18 always-white font-bold">0.5892</text>
                        </view>
                    </view>
                    <view class="card-cell">
                        <view class="item-column">
                            <view class="_c">
                                <text class="font-12 color-gray">净利润(USDT)</text>
                                <fui-icon name="info" size="30" :color="'var(--content-tertiary)'"></fui-icon>
                            </view>
                            <view class="_c">
                                <text class="font-14 always-white font-bold">2.5632</text>
                            </view>
                        </view>
                        <view class="item-column">
                            <view class="_c">
                                <text class="font-12 color-gray">跟单金额(USDT)</text>
                                <fui-icon name="info" size="30" :color="'var(--content-tertiary)'"></fui-icon>
                            </view>
                            <view class="_c">
                                <text class="font-14 always-white font-bold">2.5632</text>
                            </view>
                        </view>
                    </view>
                </view>
                <!-- 我的关注 -->
                <view class="line-box">
                    <text class="font-13 color-black">我的关注</text>
                    <view class="_right">
                        <text class="font-13 color-black">0人</text>
                        <fui-icon name="arrowright" size="30" :color="'var(--content-tertiary)'"></fui-icon>
                    </view>
                </view>
                <!-- 跟单模式 -->
                <view class="tab-box">
                    <view class="item active">
                        <text class="font-14 color-gray">合约 0</text>
                    </view>
                    <view class="item">
                        <text class="font-14 color-gray">现货 0</text>
                    </view>
                </view>
            </view>
            <view class="container-bottom">
                <view class="tab">
                    <fui-tabs class="fui-tab" background="var(--background-primary)" zIndex="9" :padding="0" :short="false"
                              :height="88" :scale="1" :selectedColor="'var(--content-primary)'" :sliderBackground="'var(--content-primary)'"
                              :color="'var(--content-tertiary)'" :tabs="tabOption" isDot scroll alignLeft></fui-tabs>
                </view>
                <swiper class="sub-swiper" :duration="1000" :style="{'height': subScrollHeight + 'px'}">
                    <!-- 当前跟单 -->
                    <swiper-item>
                        <view class="select-menu">
                            <view class="left">
                                <view class="item">
                                    <text class="font-12 color-gray">明细</text>
                                    <fui-icon name="turningdown" size="36"
                                              :color="'var(--content-tertiary)'"></fui-icon>
                                </view>
                                <view class="item">
                                    <text class="font-12 color-gray">合约</text>
                                    <fui-icon name="turningdown" size="36"
                                              :color="'var(--content-tertiary)'"></fui-icon>
                                </view>
                            </view>
                        </view>
                        <scroll-view scroll-y="true" class="scroll-view">
                            <!-- 无数据 -->
                            <view class="not-data">
                                <fui-empty width="160" height="160" size="26" :color="'var(--content-tertiary)'"
                                           src="/static/img/empty.png" title="暂无数据">
                                    <fui-button :margin="['30rpx',0,0,0]" width="200rpx" height="66rpx" radius="66rpx"
                                                size="26" :background="'var(--content-primary)'" :color="'var(--background-primary)'">去跟单
                                    </fui-button>
                                </fui-empty>
                            </view>
                        </scroll-view>
                    </swiper-item>
                    <!-- 历史跟单 -->
                    <swiper-item>
                        <view class="swiper-item"></view>
                    </swiper-item>
                    <!-- 我的跟随 -->
                    <swiper-item>
                        <view class="swiper-item"></view>
                    </swiper-item>
                </swiper>
            </view>
        </scroll-view>

        <view class="container" v-if="false">
            <!-- #ifdef APP-PLUS -->
            <view style="height: 46px;width: 100%;"></view>
            <!-- #endif -->
            <!-- #ifdef H5 -->
            <view style="height: 46px;width: 100%;"></view>
            <!-- #endif -->
            <view class="pd-15">
                <view class="bg">
                    <view class="pd-15">
                        <view class="flex">
                            <view class="wr-50 flex acenter">
                                <text class="font-12 color-white">{{ $t('myFollow.today_earn') }}(USDT)</text>
                                <image class="pl-5" style="width: 14px;height: 14px;" src="/static/img/info.webp"
                                       mode=""></image>
                            </view>
                            <view class="flexend wr-50" style="text-align: right;">
                                <text @click="$refs.info.open()" class="font-12 color-white">{{ $t('index.menu_more') }}
                                    >
                                </text>
                            </view>
                        </view>
                        <view class="mt-15">
                            <text class="font-16 font-weight color-white">0.00</text>
                        </view>
                        <view class="mt-10" style="width: 100%;height: 1px;background-color: #666;"></view>
                        <view class="flex mt-15">
                            <view class="wr-50">
                                <text class="font-12 color-white block">{{ $t('myFollow.net_profit') }}(USDT)</text>
                                <text class="font-14 color-white block mt-10">0.00</text>
                            </view>
                            <view class="wr-50">
                                <text class="font-12 color-white block">{{ $t('myFollow.order_amount') }}(USDT)</text>
                                <text class="font-14 color-white block mt-10">0.00</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="mt-15">
                    <view class="flex border-gray pd-15" @click="$mroute.flowFocus()">
                        <view class="wr-50">
                            <text class="font-13 color-black">{{ $t('myFollow.my_focus') }}</text>
                        </view>
                        <view class="wr-50 flexend" style="text-align: right;">
                            <text class="font-13 color-black">0{{ $t('myFollow.people') }} ></text>
                        </view>
                    </view>
                </view>
                <view class="mt-15">
                    <uni-segmented-control :current="current" :values="items" :style-type="styleType"
                                           :active-color="activeColor" @clickItem="onClickItem"/>
                </view>
                <view class="mt-15">
                    <uni-segmented-control :current="menutab" :values="menu" style-type="text"
                                           :active-color="activeColor" @clickItem="onClickItem"/>
                </view>
                <view class="mt-15" v-if="menutab == 0">
                    <view class="flex acenter">
                        <view class="flex acenter" style="margin: 0 5px;">
                            <text class="font-12 color-999">{{ $t('tradeInfo.details') }}</text>
                            <image style="width: 8px;height: 8px;" src="/static/img/Dg.webp" mode=""></image>
                        </view>
                        <view class="flex acenter" style="margin: 0 5px;">
                            <text class="font-12 color-999">{{ $t('myFollow.tradin_pair') }}</text>
                            <image style="width: 8px;height: 8px;" src="/static/img/Dg.webp" mode=""></image>
                        </view>
                    </view>
                </view>
                <view class="mt-15" v-if="menutab == 1">
                    <view class="flex acenter">
                        <view class="flex acenter" style="margin: 0 5px;">
                            <text class="font-12 color-999">{{ $t('myFollow.tradin_pair') }}</text>
                            <image style="width: 8px;height: 8px;" src="/static/img/Dg.webp" mode=""></image>
                        </view>
                    </view>
                    <view class="mt-15" v-for="i in 5" :key="i">
                        <view>
                            <text class="font-13 badge_down radus-2">{{ $t('tradeInfo.null') }}</text>
                            <text class="font-13 font-weight price_down pl-5">50X</text>
                            <text class="font-13 font-weight color-black pl-5">BTCUSDT</text>
                        </view>
                        <view>
                            <text class="bg-gray font-12 color-999">{{ $t('tradeInfo.full_w') }}</text>
                            <text class="bg-gray font-12 color-999 pl-5">USDT</text>
                        </view>
                        <view class="mt-15 flex">
                            <view class="wr-50">
                                <text class="font-12 color-999 block">{{ $t('myFollow.income') }} USDT</text>
                                <text class="font-16 mt-5 color-black font-weight block">0.55</text>
                            </view>
                            <view class="wr-50 " style="text-align: right;">
                                <text class="font-12 color-999 block">{{ $t('follow.rate_return') }}</text>
                                <text class="font-14 font-weight mt-5 block price_up">+23.46%</text>
                            </view>
                        </view>
                        <view class="flex mt-10">
                            <view class="wr-50">
                                <text class="font-12 color-999">{{ $t('tradeInfo.average_op') }}</text>
                            </view>
                            <view class="wr-50" style="text-align: right;">
                                <text class="font-12 color-black font-weight">$29514</text>
                            </view>
                        </view>
                        <view class="flex mt-10">
                            <view class="wr-50">
                                <text class="font-12 color-999">{{ $t('myFollow.average_clos') }}</text>
                            </view>
                            <view class="wr-50" style="text-align: right;">
                                <text class="font-12 color-black font-weight">$29314</text>
                            </view>
                        </view>
                        <view class="flex mt-10">
                            <view class="wr-50">
                                <text class="font-12 color-999">{{ $t('myFollow.open_num') }}(BTC)</text>
                            </view>
                            <view class="wr-50" style="text-align: right;">
                                <text class="font-12 color-black font-weight">0.004</text>
                            </view>
                        </view>
                        <view class="flex mt-10">
                            <view class="wr-50">
                                <text class="font-12 color-999">{{ $t('myFollow.net_profit') }}(USDT)</text>
                            </view>
                            <view class="wr-50" style="text-align: right;">
                                <text class="font-12 color-black font-weight">0.4126</text>
                            </view>
                        </view>
                        <view class="flex mt-10">
                            <view class="wr-50">
                                <text class="font-12 color-999">{{ $t('myFollow.open_time') }}</text>
                            </view>
                            <view class="wr-50" style="text-align: right;">
                                <text class="font-12 color-black font-weight">08/15 01:48:17</text>
                            </view>
                        </view>
                        <view class="flex mt-10">
                            <view class="wr-50">
                                <text class="font-12 color-999">{{ $t('myFollow.close_time') }}</text>
                            </view>
                            <view class="wr-50" style="text-align: right;">
                                <text class="font-12 color-black font-weight">08/15 02:48:17</text>
                            </view>
                        </view>
                        <view class="flex mt-10">
                            <view class="wr-50">
                                <text class="font-12 color-999">{{ $t('myFollow.traders') }}</text>
                            </view>
                            <view class="wr-50" style="text-align: right;">
                                <text class="font-12 color-black font-weight">Komorebi</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="mt-15" v-if="menutab == 2">
                    <view class="items mt-15" v-for="i in 2" :key="i">
                        <view class="flex">
                            <view class="wr-50 flex acenter">
                                <image style="width: 40px;height: 40px;border-radius: 50%;"
                                       src="/static/img/davatar.webp" mode=""></image>
                                <text class="font-14 font-weight color-black pl-5">Komorebi</text>
                            </view>
                            <view class="wr-50" style="text-align: right;">
                                <button style="width: 60px;float: right;"
                                        class="defaultBtns-sm radus-5 border-none font-12 bg-gray font-weight color-black">
                                    {{ $t('myFollow.edit') }}
                                </button>
                            </view>
                        </view>
                        <view class="mt-15 flex">
                            <view class="wr-33">
                                <text class="font-14 block font-weight color-black">14.1667</text>
                                <text class="font-12 block mt-5 color-999">{{ $t('myFollow.copy_pr') }}(USDT)</text>
                            </view>
                            <view class="wr-33 center">
                                <text class="font-14 block font-weight price_up">+2.4854</text>
                                <text class="font-12 block mt-5 color-999">{{ $t('myFollow.net_profit') }}(USDT)</text>
                            </view>
                            <view class="wr-33" style="text-align: right;">
                                <text class="font-14 block font-weight price_up">+2.4854</text>
                                <text class="font-12 block mt-5 color-999">{{ $t('myFollow.net_profit') }}(USDT)</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 谈出层 -->
        <uni-popup type="bottom" ref="info">
            <view class="authPanel">
                <view class="pd-15">
                    <view style="text-align: center;">
                        <text class="font-14 font-weight">{{ $t('myFollow.more_info') }}</text>
                        <image src="/static/img/close2.png" @click="$refs.info.close()"
                               style="height: 30px;width: 30px;float: right;" mode=""></image>
                    </view>
                    <view class="mt-15">
                        <view>
                            <text class="font-14 font-weight color-black">{{ $t('index.menu_cd') }}</text>
                        </view>
                        <view class="mt-10 flex">
                            <view class="wr-50">
                                <text class="font-13 color-999">{{ $t('myFollow.net_profit') }}</text>
                            </view>
                            <view class="wr-50 flexend">
                                <text class="font-14 font-weight price_up">+2.4854 USDT</text>
                            </view>
                        </view>
                        <view class="mt-10 flex">
                            <view class="wr-50">
                                <text class="font-13 color-999">{{ $t('myFollow.order_amount') }}</text>
                            </view>
                            <view class="wr-50 flexend">
                                <text class="font-13 font-weight color-999">14.1667 USDT</text>
                            </view>
                        </view>
                        <view class="mt-10 flex">
                            <view class="wr-50">
                                <text class="font-13 color-999">{{ $t('myFollow.ctd_expert') }}</text>
                            </view>
                            <view class="wr-50 flexend">
                                <text class="font-13 font-weight color-999">1 人</text>
                            </view>
                        </view>
                        <view class="mt-10 flex">
                            <view class="wr-50">
                                <text class="font-13 color-999">{{ $t('myFollow.cc_te') }}</text>
                            </view>
                            <view class="wr-50 flexend">
                                <text class="font-13 font-weight color-999">1 {{ $t('myFollow.people') }}</text>
                            </view>
                        </view>
                        <view class="mt-15">
                            <text class="font-14 font-weight color-black">{{ $t('myFollow.spot_doc') }}</text>
                        </view>
                        <view class="mt-10 flex">
                            <view class="wr-50">
                                <text class="font-13 color-999">{{ $t('myFollow.net_profit') }}</text>
                            </view>
                            <view class="wr-50 flexend">
                                <text class="font-14 font-weight price_up">+2.4854 USDT</text>
                            </view>
                        </view>
                        <view class="mt-10 flex">
                            <view class="wr-50">
                                <text class="font-13 color-999">{{ $t('myFollow.order_amount') }}</text>
                            </view>
                            <view class="wr-50 flexend">
                                <text class="font-13 font-weight color-999">14.1667 USDT</text>
                            </view>
                        </view>
                        <view class="mt-10 flex">
                            <view class="wr-50">
                                <text class="font-13 color-999">{{ $t('myFollow.ctd_expert') }}</text>
                            </view>
                            <view class="wr-50 flexend">
                                <text class="font-13 font-weight color-999">1 人</text>
                            </view>
                        </view>
                        <view class="mt-10 flex">
                            <view class="wr-50">
                                <text class="font-13 color-999">{{ $t('myFollow.cc_te') }}</text>
                            </view>
                            <view class="wr-50 flexend">
                                <text class="font-13 font-weight color-999">1 人</text>
                            </view>
                        </view>
                    </view>
                </view>

            </view>
        </uni-popup>
    </view>
</template>

<script>
import {mapGetters} from 'vuex';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
import fuiTabs from "@/components/firstui/fui-tabs/fui-tabs.vue"
import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue"
import fuiButton from "@/components/firstui/fui-button/fui-button.vue"

import {
    NavBar,
    Icon
} from 'vant';

export default {
    components: {
        fuiNavBar,
        fuiTabs,
        fuiEmpty,
        fuiButton,
        [NavBar.name]: NavBar,
        [Icon.name]: Icon
    },
    data() {
        return {
            windowHeight: uni.getSystemInfoSync().windowHeight,
            scrollHeight: "",
            navHeight: "",
            subScrollHeight: "",
            tabOption: [this.$t('follow.current_order'), this.$t('myFollow.his_follow'), this.$t('myFollow.my_follow')],


            choose: [0],
            items: [this.$t('follow.contract'), this.$t('follow.spot_goods')],
            current: 0,
            styleType: 'button',
            activeColor: '#2979ff',
            menu: [this.$t('follow.current_order'), this.$t('myFollow.his_follow'), this.$t('myFollow.my_follow')],
            menutab: 0
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
            this.scrollHeight = this.windowHeight - this.navHeight;
            this.subScrollHeight = this.windowHeight - this.navHeight - 48;
        },
        bodyScroll(e) {
            console.log(e.detail.scrollTop)
        },
        onClickItem(e) {
            console.log(e);
            this.menutab = e.currentIndex;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "mine";
</style>

<style scoped>

/* 强制更改样式 */
/deep/ .fui-tabs__item {
    padding: 0 50rpx 0 0 !important;
}

.bg {
    background: url('/static/img/wallet-bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 170px;
}
</style>