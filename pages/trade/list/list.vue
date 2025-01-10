<template>
    <view class="trade-list" :data-theme="userTheme">
        <!--  顶部导航  -->
        <fui-nav-bar isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('list.page_title')"
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <!--  列表菜单栏  -->
        <view class="list-tabs">
            <fui-tabs :isSlider="false"
                      :alignLeft="true"
                      :current="tab"
                      :padding="0"
                      :scale="1"
                      :height="88"
                      :size="28"
                      :selectedSize="28"
                      :short="false"
                      background="var(--background-primary)"
                      color="var(--content-tertiary)"
                      selectedColor="var(--content-primary)"
                      :tabs="tabOption"
                      @change="navTabChange">
            </fui-tabs>
        </view>
        <!--  列表内容  -->
        <swiper class="list-swiper"
                :duration="300"
                :current="tab"
                :style="`height: ${contianerHeight}px`"
                @change="swiperChange">
            <!--  ===当前订单===  -->
            <swiper-item class="list-swiper-item">
                <!--  下拉选择按钮   -->
                <view class="tag-group"
                v-if="false">
                    <view class="item"
                          :class="{'active': show == true}"
                          @click="show = true">
                        <text>
                            {{ selectOptions[0] }}
                        </text>
                        <image :src="`/static/img/tactic/down-${userTheme}.png`"
                               mode="widthFix">
                        </image>
                    </view>
                    <view class="item"
                          :class="{'active': showType == true}"
                          @click="showType = true">
                        <text>
                            {{ selectOptions[1] }}
                        </text>
                        <image :src="`/static/img/tactic/down-${userTheme}.png`"
                               mode="widthFix">
                        </image>
                    </view>
                    <view class="item"
                          :class="{'active': showTp == true}"
                          @click="showTp = true">
                        <text>
                            {{ selectOptions[2] }}
                        </text>
                        <image :src="`/static/img/tactic/down-${userTheme}.png`"
                               mode="widthFix">
                        </image>
                    </view>
                </view>
                <!--  内容区域   -->
                <content-scroll :scrollY="true"
                                :refresher="true"
                                :lowerThreshold="50"
                                :refresherThreshold="45"
                                :empty="refresherTriggered == false && orderList.length == 0"
                                class="scroll-view"
                                @refresherrefresh="onRefresh"
                                @restore="onRestore"
                                @scrolltolower="loadMore">
                    <view class="list-content">
                        <view class="card-item"
                              v-for="(item,index) in orderList"
                              :key="'t'+index">
                            <!--  币名/撤单  -->
                            <view class="row">
                                <view class="row-left">
                                    <fui-tag :padding="['6rpx','10rpx']"
                                             :radius="4"
                                             :text="$t('trade.buy_on')"
                                             :marginRight="10"
                                             size="22"
                                             background="var(--color-primary)"
                                             color="var(--content-always-white)"
                                             v-if="item.direction==1">
                                    </fui-tag>
                                    <fui-tag :padding="['6rpx','10rpx']"
                                             :radius="4"
                                             :text="$t('trade.sell_on')"
                                             :marginRight="10"
                                             size="22"
                                             background="var(--content-trade-sell)"
                                             color="var(--content-always-white)"
                                             v-if="item.direction==2">
                                    </fui-tag>
                                    <text class="font-14 font-weight color-black">
                                        {{ item.symbol }}/USDT
                                    </text>
                                </view>
                                <view class="row-right">
                                    <text class="font-12 font-weight color-primary"
                                          @click="cancelOrder(item.id)">
                                        {{ $t('trade.wd_order') }}
                                    </text>
                                </view>
                            </view>
                            <!--  时间  -->
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-12 color-gray">
                                        {{ item.created_at }}
                                    </text>
                                    <fui-tag :padding="['6rpx','10rpx']"
                                             :radius="4"
                                             :text="item.order_type == 1 ? this.$t('trade.mk_od') : this.$t('trade.lm_od')"
                                             :marginLeft="10"
                                             size="22"
                                             background="var(--background-secondary)"
                                             color="var(--content-tertiary)">
                                    </fui-tag>
                                </view>
                            </view>
                            <!--  价格  -->
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-12 color-gray">
                                        {{ $t('kline.price') }}(USDT)
                                    </text>
                                </view>
                                <view class="row-right">
                                    <text class="font-12 color-black font-weight">
                                        {{ $util.float(item.price) }}
                                    </text>
                                </view>
                            </view>
                            <!--  数量  -->
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-12 color-gray"
                                          v-if="item.direction == 2">
                                        {{ $t('kline.num') }}({{ item.symbol }})
                                    </text>
                                    <text class="font-12 color-gray"
                                          v-else>
                                        {{ $t('trade.vl_tan') }}(USDT)
                                    </text>
                                </view>
                                <view class="row-right">
                                    <text class="font-12 color-black font-weight"
                                          v-if="item.direction == 2">
                                        {{ $util.float(item.amount) }}
                                    </text>
                                    <text class="font-12 color-black font-weight"
                                          v-else>
                                        {{ $util.float(item.amount, 2) }}
                                    </text>
                                </view>
                            </view>
                            <!--  预计成交  -->
                            <view class="row"
                                  v-if="item.direction == 1">
                                <view class="row-left">
                                    <text class="font-12 color-gray">
                                        {{ $t('trade.ex_tran') }}({{ item.symbol }})
                                    </text>
                                </view>
                                <view class="row-right">
                                    <text class="font-12 color-black font-weight">
                                        {{ $util.float(item.amount / item.price, item.decimals) }}
                                    </text>
                                </view>
                            </view>
                            <!--  已成交  -->
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-12 color-gray">
                                        {{ $t('trade.traded') }}
                                    </text>
                                </view>
                                <view class="row-right">
                                    <text class="font-12 color-black font-weight">
                                        --
                                    </text>
                                </view>
                            </view>
                        </view>
                        <!--  骨架 -->
                        <view class="skeleton-warp"
                              :class="refresherTriggered ? 'skeleton-show' : 'skeleton-hide'">
                            <view class="skeleton-box">
                                <fui-skeleton outerClass="skeleton-box" :theme="userTheme"
                                              :preloadList="preloadList"></fui-skeleton>
                            </view>
                        </view>
                    </view>
                </content-scroll>
            </swiper-item>
            <!--  ===历史订单===  -->
            <swiper-item class="list-swiper-item">
                <!--  下拉选择按钮   -->
                <view class="tag-group"
                v-if="false">
                    <view class="item"
                          :class="{'active': show == true}"
                          @click="show = true">
                        <text>
                            {{ selectOptions[0] }}
                        </text>
                        <image :src="`/static/img/tactic/down-${userTheme}.png`"
                               mode="widthFix">
                        </image>
                    </view>
                    <view class="item"
                          :class="{'active': showType == true}"
                          @click="showType = true">
                        <text>
                            {{ selectOptions[1] }}
                        </text>
                        <image :src="`/static/img/tactic/down-${userTheme}.png`"
                               mode="widthFix">
                        </image>
                    </view>
                    <view class="item"
                          :class="{'active': showTp == true}"
                          @click="showTp = true">
                        <text>
                            {{ selectOptions[2] }}
                        </text>
                        <image :src="`/static/img/tactic/down-${userTheme}.png`"
                               mode="widthFix">
                        </image>
                    </view>
                </view>
                <!--  内容区域   -->
                <content-scroll :scrollY="true"
                                :refresher="true"
                                :lowerThreshold="50"
                                :refresherThreshold="45"
                                :empty="refresherTriggered == false && history['list'].length == 0"
                                class="scroll-view"
                                @refresherrefresh="onRefresh"
                                @restore="onRestore"
                                @scrolltolower="loadMore">
                    <view class="list-content">
                        <view class="card-item"
                              v-if="!refresherTriggered"
                              v-for="(item,index) in history['list']"
                              :key="'h'+index">
                            <!--  币名/状态  -->
                            <view class="row">
                                <view class="row-left">
                                    <fui-tag :padding="['6rpx','10rpx']"
                                             :radius="4"
                                             :text="$t('trade.buy_on')"
                                             :marginRight="10"
                                             size="22"
                                             background="var(--color-primary)"
                                             color="var(--content-always-white)"
                                             v-if="item.direction == 1">
                                    </fui-tag>
                                    <fui-tag :padding="['6rpx','10rpx']"
                                             :radius="4"
                                             :text="$t('trade.sell_on')"
                                             :marginRight="10"
                                             size="22"
                                             background="var(--content-trade-sell)"
                                             color="var(--content-always-white)"
                                             v-if="item.direction == 2">
                                    </fui-tag>
                                    <text class="font-14 font-weight color-black">
                                        {{ item.symbol }}/USDT
                                    </text>
                                </view>
                                <view class="row-right">
                                    <text class="font-12 font-weight color-gray"
                                          v-if="item.status == 3">
                                        {{ $t('list.wd') }}
                                    </text>
                                    <text class="font-12 font-weight color-primary"
                                          v-if="item.status == 1">
                                        {{ $t('list.cltd') }}
                                    </text>
                                </view>
                            </view>
                            <!--  时间  -->
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-12 color-gray">
                                        {{ item.created_at }}
                                    </text>
                                    <fui-tag :padding="['6rpx','10rpx']"
                                             :radius="4"
                                             :text="item.order_type == 1 ? $t('trade.mk_od') : $t('trade.lm_od')"
                                             :marginLeft="10"
                                             size="22"
                                             background="var(--background-secondary)"
                                             color="var(--content-tertiary)">
                                    </fui-tag>
                                </view>
                            </view>
                            <!--  数量/交易金额  -->
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-12 color-gray" v-if="item.direction == 2">
                                        {{ $t('kline.num') }}({{ item.symbol }})
                                    </text>
                                    <text class="font-12 color-gray"
                                          v-else>
                                        {{ $t('trade.vl_tan') }}(USDT)
                                    </text>
                                </view>
                                <view class="row-right">
                                    <text class="font-12 color-black font-weight" v-if="item.direction == 2">
                                        {{ $util.float(item.amount) }}
                                    </text>
                                    <text class="font-12 color-black font-weight" v-else>
                                        {{ $util.float(item.amount, 2) }}
                                    </text>
                                </view>
                            </view>
                            <!--  数量  -->
                            <view class="row"
                                  v-if="item.direction == 1">
                                <view class="row-left">
                                    <text class="font-12 color-gray">
                                        {{ $t('kline.num') }}({{ item.symbol }})
                                    </text>
                                </view>
                                <view class="row-right">
                                    <text class="font-12 color-black font-weight">
                                        {{ $util.thousandSeparator(item.amount / item.price, 8) }}
                                    </text>
                                </view>
                            </view>
                            <!--  已成交  -->
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-12 color-gray">
                                        {{ $t('trade.traded') }}
                                    </text>
                                </view>
                                <view class="row-right">
                                    <text class="font-12 color-black font-weight">
                                        {{ $util.float(item.t_amount) }}
                                        {{ item.direction === 1 ? item.symbol : 'USDT' }}
                                    </text>
                                </view>
                            </view>
                            <!--  手续费  -->
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-12 color-gray">
                                        {{ $t('cor.t31') }}
                                    </text>
                                </view>
                                <view class="row-right">
                                    <text class="font-12 color-black font-weight">
                                        {{ item.charge }} {{ item.direction === 1 ? item.symbol : 'USDT' }}
                                    </text>
                                </view>
                            </view>
                            <!--  成交均价  -->
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-12 color-gray">
                                        {{ $t('list.at_price') }}
                                    </text>
                                </view>
                                <view class="row-right">
                                    <text class="font-12 color-black font-weight">
                                        {{ $util.float(item.t_price ? item.t_price : 0) }}
                                        {{ item.direction === 1 ? 'USDT' : item.symbol }}
                                    </text>
                                </view>
                            </view>
                        </view>
                        <!--  骨架 -->
                        <view class="skeleton-warp"
                              :class="refresherTriggered ? 'skeleton-show' : 'skeleton-hide'">
                            <view class="skeleton-box">
                                <fui-skeleton outerClass="skeleton-box" :theme="userTheme"
                                              :preloadList="preloadList"></fui-skeleton>
                            </view>
                        </view>
                    </view>
                </content-scroll>
            </swiper-item>
        </swiper>

        <!-- 订单币种选择 -->
        <fui-bottom-popup :show="show"
                          :radius="16"
                          background="var(--background-primary)">
            <view class="popup-wrap">
                <view class="popup-title">
                    <text class="font-16 color-black font-weight">
                        {{ $t('list.select_cur') }}
                    </text>
                    <fui-icon class="close-icon"
                              name="close"
                              :size="48"
                              color="var(--content-primary)"
                              @tap="show = false">
                    </fui-icon>
                </view>
                <scroll-view scroll-y
                             class="popup-scroll-view"
                             :style="`height: ${contianerHeight - 150}px`">
                    <view class="cell"
                          @click="setCurrencyId(0); selectOptions[0] = $t('list.all_t')">
                        <text class="font-13 color-black" :class="{'color-primary font-weight': currency_id == 0}">
                            {{ $t('list.all_t') }}
                        </text>
                        <image src="/static/img/tactic/check-select.png"
                               mode="widthFix"
                               v-if="currency_id == 0">
                        </image>
                    </view>
                    <view class="cell"
                          @click="setCurrencyId(item.id); selectOptions[0] = item.symbol"
                          v-for="(item,index) in currency[0]['currency']" :key="index">
                        <text class="font-13 color-black"
                              :class="{'color-primary font-weight': currency_id == item.id}">
                            {{ item.symbol }}/USDT
                        </text>
                        <image src="/static/img/tactic/check-select.png"
                               mode="widthFix"
                               v-if="currency_id == item.id">
                        </image>
                    </view>
                </scroll-view>
            </view>
        </fui-bottom-popup>
        <!-- 订单类型选择 -->
        <fui-bottom-popup :show="showType"
                          :radius="16"
                          background="var(--background-primary)">
            <view class="popup-wrap" type="min-wrap">
                <view class="popup-title">
                    <text class="font-16 color-black font-weight">
                        {{ $t('list.select_odtype') }}
                    </text>
                    <fui-icon class="close-icon"
                              name="close"
                              :size="48"
                              color="var(--content-primary)"
                              @tap="showType = false">
                    </fui-icon>
                </view>
                <scroll-view scroll-y class="popup-scroll-view">
                    <view class="cell"
                          :class="{'active': otype == index}"
                          v-for="(item,index) in typeList" :key="index"
                          @click="setOtype(item,index)">
                        <text class="font-13 color-black"
                              :class="{'color-primary font-weight': otype == index}">
                            {{ item }}
                        </text>
                        <image src="/static/img/tactic/check-select.png"
                               mode="widthFix"
                               v-if="otype == index">
                        </image>
                    </view>
                </scroll-view>
            </view>
        </fui-bottom-popup>
        <!--  类别  -->
        <fui-bottom-popup :show="showTp"
                          :radius="16"
                          background="var(--background-primary)">
            <view class="popup-wrap" type="tp-wrap">
                <view class="popup-title">
                    <text class="font-16 color-black font-weight">
                        {{ $t('cor.t48') }}
                    </text>
                    <fui-icon class="close-icon"
                              name="close"
                              :size="48"
                              color="var(--content-primary)"
                              @tap="showTp = false">
                    </fui-icon>
                </view>
                <scroll-view scroll-y class="popup-scroll-view">
                    <view class="cell"
                          :class="{'active': tpindex == index}"
                          v-for="(item,index) in categoryList" :key="index"
                          @click="categoryChange(item,index)">
                        <text class="font-13 color-black" :class="{'color-primary font-weight':tpindex == index}">
                            {{ item }}
                        </text>
                        <image src="/static/img/tactic/check-select.png"
                               mode="widthFix"
                               v-if="tpindex == index">
                        </image>
                    </view>
                </scroll-view>
            </view>
        </fui-bottom-popup>
        <alert ref="alert"
               :title="this.$t('login.tip_t2')"
               :ctxt="this.$t('login.cancel')"
               :ftxt="this.$t('login.confirm')"
               @confirm="confirm"
               :content="content">
        </alert>
        <loading ref="loading"></loading>
    </view>
</template>

<script>
import tradeApi from '@/common/api/trade.js';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";
import fuiTabs from "@/components/firstui/fui-tabs/fui-tabs.vue"
import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue";
import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue";
import fuiBottomPopup from "@/components/firstui/fui-bottom-popup/fui-bottom-popup.vue"
import contentScroll from "@/components/scroll/scroll.vue"

import trade from '@/common/api/trade';
import fuiSkeleton from "@/components/firstui/fui-skeleton/fui-skeleton.vue";

import {
    mapGetters
} from 'vuex';

var page = 1;

export default {
    components: {
        fuiSkeleton,
        fuiEmpty,
        fuiTag,
        fuiTabs,
        fuiNavBar,
        fuiBottomPopup,
        contentScroll
    },
    data() {
        return {
            windowHeight: uni.getSystemInfoSync().windowHeight,
            contianerHeight: "",
            tabOption: [],
            refresherTriggered: false,
            _refresherShow: false,
            refresherText: this.$t('common.refer'),
            otype: 0,
            showTp: false,
            tpindex: 0,
            tab: 0,
            show: false,
            showType: false,
            currency: [],
            currency_id: 0,
            orderList: [],
            content: "",
            cids: "",
            history: {
                list: []
            },
            selectOptions: [
                this.$t('list.od_cur'),
                this.$t('list.od_type'),
                this.$t('list.all_type')
            ],
            typeList:[
                this.$t('list.all_t'),
                this.$t('trade.lm_od'),
                this.$t('trade.mk_od')
            ],
            categoryList:[
                this.$t('cor.t49'),
                this.$t('cor.t50'),
                this.$t('cor.t51'),
                this.$t('cor.t52'),
                this.$t('cor.t53'),
                this.$t('cor.t54'),
            ],
            // 骨架
            preloadList: [{
                left: 0,
                top: 0,
                width: 40,
                height: 20,
                type: 'rect'
            }, {
                left: 50,
                top: 0,
                width: 90,
                height: 20,
                type: 'rect'
            }, {
                left: 320,
                top: 0,
                width: 60,
                height: 20,
                type: 'rect'
            }, {
                left: 0,
                top: 35,
                width: 180,
                height: 20,
                type: 'rect'
            }, {
                left: 300,
                top: 70,
                width: 80,
                height: 20,
                type: 'rect'
            }, {
                left: 0,
                top: 70,
                width: 180,
                height: 20,
                type: 'rect'
            }, {
                left: 0,
                top: 105,
                width: 180,
                height: 20,
                type: 'rect'
            }, {
                left: 300,
                top: 105,
                width: 80,
                height: 20,
                type: 'rect'
            }, {
                left: 0,
                top: 140,
                width: 180,
                height: 20,
                type: 'rect'
            }, {
                left: 300,
                top: 140,
                width: 80,
                height: 20,
                type: 'rect'
            },]
        }
    },
    onLoad() {
        this.getCurrency();
        this.getOrderList();
        this.getHistory();
        this.setMenu();
    },
    onShow() {
        page = 1;
        this.setMenu();
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        loadMore() {
            page += 1;
            if (this.tab === 1) {
                this.getHistory();
            } else {
                this.getOrderList();
            }
            console.log("bottom");
        },
        navInit(e) {
            this.contianerHeight = this.windowHeight - e.height - e.statusBarHeight - 44;
        },
        setMenu() {
            this.tabOption = [
                this.$t("list.cr_od"),
                this.$t('list.hs_od'),
                // this.$t('list.hs_tr'),
            ];
        },
        navTabChange(e) {
            this.tab = e.index;
        },
        swiperChange(e) {
            this.tab = e.detail.current;
        },
        setOtype(item,index) {
            this.otype = index;
            this.showType = false;
            this.selectOptions[1] = item;
        },
        categoryChange(item,index){
            this.tpindex = index;
            this.showTp = false;
            this.selectOptions[2] = item;
        },
        getHistory() {
            if (page > 1) {
                this.$refs.loading.open();
            }
            tradeApi.orderHistory(this.currency_id, page).then(res => {
                this.history['list'] = this.history['list'].concat(res.data.list);
                console.log(this.history)
                if (page > 1) {
                    this.$refs.loading.close();
                }
            });

        },
        confirm() {
            this.docancel();
        },
        docancel() {
            this.$refs.loading.open();
            tradeApi.orderCancel(this.cids).then(res => {
                this.$refs.loading.close();
                if (res.code === 200) {
                    this.content = this.$t('trade.suc_wid');
                    this.$refs.alert.open();
                    this.getOrderList();
                } else {
                    this.content = res.message;
                    this.$refs.alert.open();
                }
            }).catch((e)=>{
                console.log(e);
            })
        },
        cancelOrder(id) {
            this.cids = id;
            this.content = this.$t('list.inquire_con');
            this.$refs.alert.open();
        },
        getOrderList() {
            if (page > 1) {
                this.$refs.loading.open();
            }
            tradeApi.tradeOrderList(this.currency_id).then(res => {
                if (res.code === 200) {
                    if(page > 1){
                        this.orderList = this.orderList.concat(res.data);
                    }else{
                        this.orderList = res.data;
                    }
                }
                if (page > 1) {
                    this.$refs.loading.close();
                }
            })
        },
        setCurrencyId(e) {
            this.currency_id = e;
            this.show = false;
            this.getOrderList();
        },
        getCurrency() {
            this.currency = uni.getStorageSync('trade-currency');
        },
        onRefresh() {
            this.refresherTriggered = true;
            this._refresherShow = true;
            this.refresherText = "Refreshing";
            setTimeout(() => {
                this.refresherTriggered = false;
                this._refresherShow = false;
                this.refresherText = this.$t('common.refer');
            }, 1500)
        },
        onRestore() {
            this.refresherTriggered = false;
            this._refresherShow = false;
        }
    }
}
</script>

<style scoped lang="scss">
@import "list.scss";
</style>
