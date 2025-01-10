<template>
    <view class="creation"
          :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     custom
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     @init="">
            <view class="nav-bar">
                <view class="back-box"
                      @click="$mroute.back()">
                    <fui-icon name="arrowleft"
                              size="56"
                              color="var(--content-primary)"></fui-icon>
                </view>
                <view class="title-box">
                    <view class="title"
                          :class="{'active': visible == true}"
                          @click="visible = true">
                        <text>
                            {{ pageTitle }}
                        </text>
                        <fui-icon name="turningdown"
                                  size="28"
                                  :color="visible == true ? 'var(--color-primary)' : 'var(--content-primary)'">
                        </fui-icon>
                    </view>
                </view>
                <view class="img-group">
                    <view class="item">
                        <image src="@/static/img/tactic/wAf.png"></image>
                    </view>
                    <view class="item">
                        <image src="@/static/img/tactic/sEC.png"></image>
                    </view>
                </view>
            </view>
        </fui-nav-bar>
        <view class="head"
              v-if="type_id <= 2">
            <view class="head-top">
                <view class="coin-title"
                      @click="popupShow = true">
                    <image :src="`/static/newImage/currency-menu-${userTheme}.png`"></image>
                    <text class="coin">{{ currentCurrency['symbol'] }}/USDT</text>
                    <text class="font-11 color-black">
                        {{ $util.thousandSeparator(currentCurrency['new_price'], currentCurrency['decimals']) }}
                    </text>
                    <text class="font-11 rate-text color-primary ml-5">
                        {{ $util.thousandSeparator(currentCurrency['change_rate']) }}%
                    </text>
                </view>
                <fui-icon @click="showKline"
                          name="arrowdown"
                          size="38"
                          color="var(--content-primary)"></fui-icon>
            </view>
            <view class="kline-warp"
                  v-if="klineShow">
                <div>
                    <div class="kline"
                         id="kline"
                         ref="kline"
                         :style="{ 'width': $device.windowWidth + 'px', 'height': '250px' }"></div>
                </div>
            </view>
        </view>
        <!--    -->
        <template v-if="type_id == 1 || type_id == 2">
            <grid-view :type_id="type_id"
                       :title="pageTitle"
                       :tab-active="tb_idx"
                       :id="id"
                       :coin="currentCurrency.symbol"></grid-view>
        </template>
        <!--    天地网格-->
        <template v-if="false">
            <earth-grid></earth-grid>
        </template>
        <!--    现货定投-->
        <template v-if="false">
            <spot-investment></spot-investment>
        </template>
        <!--    CTA-->
        <template v-if="false">
            <cta-view></cta-view>
        </template>
        <!--    合约量化策略-->
        <template v-if="false">
            <quantitative-strategy></quantitative-strategy>
        </template>

        <tactic-popup :isChange="true"
                      :visible="visible"
                      @modeChange="change"
                      @close="visible = false"></tactic-popup>

        <fui-bottom-popup
            background="var(--background-primary)"
            :show="popupShow"
            @close="popupShow = false">
            <view class="popup-warp">
                <view class="title-box">
                    <text>币种列表</text>
                    <text @click="popupShow = false">关闭</text>
                </view>
                <view class="contianer">
                    <view class="search">
                        <fui-icon name="search"
                                  size="32"
                                  color="var(--text-gray)"></fui-icon>
                        <input type="text" :adjust-position="false" :cursor-spacing="10">
                    </view>
                    <view class="list">
                        <view class="list-top">
                            <view class="item">
                                <text>币对</text>
                            </view>
                            <view class="item"
                                  @click="switchSort(0)">
                                <text>涨跌幅</text>
                                <image class="change-icon"
                                       :src="sort[0]['active']"></image>
                            </view>
                            <view class="item"
                                  @click="switchSort(1)">
                                <text>1日波动率</text>
                                <image class="change-icon"
                                       :src="sort[1]['active']"></image>
                            </view>
                        </view>
                        <scroll-view class="coin-scroll"
                                     scroll-y="true">
                            <view class="coin-warp">
                                <view class="cell"
                                      v-for="(item,idx) in mlist"
                                      @click="setCurrentCurrency(item)">
                                    <view class="item">
                                        <text>{{ item.symbol }}/USDT</text>
                                    </view>
                                    <view class="item">
                                        <text>{{ $util.thousandSeparator(item['new_price'], item['decimals']) }}</text>
                                        <text class="price_down">{{
                                                $util.thousandSeparator(item['change_rate'])
                                                                 }}%
                                        </text>
                                    </view>
                                    <view class="item">
                                        <text>{{ $util.thousandSeparator(item['change_rate']) }}%</text>
                                    </view>
                                </view>
                                <empty-view :width="690"
                                            :height="600"
                                            :title="$t('list.not_data')"
                                            :visible="mlist && mlist.length == 0">
                                </empty-view>
                            </view>
                        </scroll-view>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
    </view>
</template>
<script>
import {
    mapGetters
} from 'vuex';

import gridView from "@/pages/contract/tactic/createPolicy/creation/gridView/gridView.vue";
import earthGrid from "@/pages/contract/tactic/createPolicy/creation/earthGrid/earthGrid.vue";
import createPolicy from "@/pages/contract/tactic/createPolicy/createPolicy.vue";
import ctaView from "@/pages/contract/tactic/createPolicy/creation/cta/cta"
import spotInvestment from "@/pages/contract/tactic/createPolicy/creation/investment/investment"
import quantitativeStrategy
    from "@/pages/contract/tactic/createPolicy/creation/quantitativeStrategy/quantitativeStrategy.vue";
import tacticPopup from "@/components/tacticPopup/tacticPopup.vue";
import emptyView from "@/components/emptyView/emptyView.vue";
import {createChart} from 'lightweight-charts';
import currencyApi from '@/common/api/currency.js';

var chart;
var lineSeries;
var areaSeries;
var inits = 0;

var lastPrice = 0;
export default {
    components: {
        gridView,
        earthGrid,
        createPolicy,
        ctaView,
        spotInvestment,
        quantitativeStrategy,
        tacticPopup,
        emptyView
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    onLoad(option) {
        this.type_id = parseInt(option.type_id)
        this.pageTitle = option.type_id == 1 ? '现货网格' : '合约网格'
        if (option.tb_idx) {
            this.tb_idx = parseInt(option.tb_idx)
            this.id = parseInt(option.id)
        }
    },
    data() {
        return {
            pageTitle: "",
            type_id: 1,
            visible: false,
            klineShow: false,
            popupShow: false,
            sort: [
                {
                    type: 0,
                    active: "/static/img/z-nomal.png",
                    img: "/static/img/z-nomal.png",
                    up: "/static/img/z-up-sms.png",
                    down: "/static/img/z-down-sms.png"
                },
                {
                    type: 0,
                    active: "/static/img/z-nomal.png",
                    img: "/static/img/z-nomal.png",
                    up: "/static/img/z-up-sms.png",
                    down: "/static/img/z-down-sms.png"
                }
            ],
            mlist: [],
            currentCurrency: {symbol: ''},
            cm_id: 0,
            currency_id: 0,
            tb_idx: 0,
            id: 0,
        }
    },
    onReady() {
        this.getCurrrency();
        this.getCurrentCurrency();
        this.checkMlist();
        uni.$on('useCurrency', (currency_id) => {
            this.currency[0]['currency'].map((item) => {
                if (item.id == currency_id) {
                    this.currentCurrency = item;
                    uni.setStorageSync('currency_id', currency_id)
                    // console.log(item)
                }
            })
        })
    },
    methods: {
        showKline() {
            this.klineShow = !this.klineShow
            if (this.klineShow) {
                this.upKline()
            }
        },
        upKline() {
            this.klineShow = false
            setTimeout(() => {
                this.klineShow = true
                setTimeout(() => {
                    this.Kcreate();
                }, 100);
            }, 100);
        },
        change(e) {
            console.log(e)
            this.type_id = e.id;
            this.visible = false;
            this.pageTitle = e.id == 1 ? '现货网格' : '合约网格'

            uni.$emit('selectAi', e.id)
        },
        switchSort(index, sort) {
            this.sindex = sort;
            if (this.sort[index]['type'] == 0) {
                this.sort[index]['type'] = 1;
                this.sort[index]['active'] = this.sort[index]['down'];
                this.sortCurrency(index);
                return;
            }
            if (this.sort[index]['type'] == 1) {
                this.sort[index]['type'] = 2;
                this.sort[index]['active'] = this.sort[index]['up'];
                this.sortCurrency(index);
                return;
            }
            if (this.sort[index]['type'] == 2) {
                this.sort[index]['type'] = 0;
                this.sort[index]['active'] = this.sort[index]['img'];
                this.sortCurrency(index);
                return;
            }
        },
        checkMlist() {
            this.mlist = uni.getStorageSync('select-trade');
        },
        getCurrrency() {
            this.currency = uni.getStorageSync('trade-currency');
        },
        getCurrentCurrency() {
            //从现货本地缓存拿第一个
            var current = uni.getStorageSync('trade-current');
            if (typeof current == 'undefined' || current == '' || !current) {
                current = this.currency[0]['currency'][0];
                current['cm_id'] = this.currency[0]['id'];
            }
            this.currentCurrency = current;
            uni.$emit('selectCurrency', current)
        },
        setCurrentCurrency(item) {
            item['cm_id'] = this.currency[0]['id'];
            this.currentCurrency = item;
            this.popupShow = false
            item.offGird_id = 1
            uni.$emit('selectCurrency', item)
            if (this.klineShow) {
                this.upKline()
            }
        },
        Kcreate() {
            chart = createChart(
                document.getElementById('kline'),
                {
                    width: window.screen.availWidth,
                    height: 245,
                    layout: {
                        background: {color: "#fff"},
                        textColor: "#333",
                    },
                    grid: {
                        vertLines: {color: "#ddd"},
                        horzLines: {color: "#ddd"},
                    },
                    priceScale: {
                        borderColor: 'rgba(242, 250, 255, 0.8)',
                    },
                    timeScale: {
                        borderColor: 'rgba(242, 250, 255, 0.8)',
                    }
                },
            );

            lineSeries = chart.addAreaSeries({
                topColor: '#00ddfa',
                bottomColor: 'rgba(41, 98, 255, 0.1)',
                lineColor: '#2979ff',
                lineWidth: 1,
                lastPriceAnimation: 1
            });


            areaSeries = chart.addAreaSeries({
                lastValueVisible: false, // hide the last value marker for this series
                crosshairMarkerVisible: false, // hide the crosshair marker for this series
                lineColor: 'transparent', // hide the line
                topColor: 'rgba(102, 57, 220, 0.6)',
                bottomColor: 'rgba(102, 57, 220, 0.1)',
            });


            areaSeries.priceScale().applyOptions({
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.2,
                    right: 0.2,
                    left: 0.2
                }
            })
            inits = 1;
            this.loadKline();

            window.addEventListener('resize', () => {
                chart.resize(window.innerWidth, this.$device.screenWidth);
            });
        },
        loadKline() {
            var data = {
                interval: "1s",
                currency_id: this.currentCurrency['id'],
                limit: 200
            }
            currencyApi.contractLine(data).then(res => {
                if (res.code === 200) {
                    areaSeries.setData(res.data);
                    lineSeries.setData(res.data);

                    chart.timeScale().applyOptions({
                        barSpacing: 7,
                        borderColor: '#71649C',
                        timeVisible: true,
                        secondsVisible: true,
                        scrollToRealTime: true,
                        tickMarkFormatter: (time, tickMarkType, locale) => {
                            var date = new Date(time);  // 将微秒转换为毫秒
                            var hours = String(date.getHours()).padStart(2, '0');
                            var minutes = String(date.getMinutes()).padStart(2, '0');
                            var seconds = String(date.getSeconds()).padStart(2, '0');
                            return `${hours}:${minutes}:${seconds}`;
                        }
                    });
                    chart.timeScale().scrollToRealTime();
                    const currentScrollPosition = chart.timeScale().scrollPosition();
                    chart.timeScale().scrollToPosition(currentScrollPosition + 15, false);
                    // chart.timeScale().fitContent();
                    chart.applyOptions({
                        localization: {
                            priceFormatter: this.PriceFormatter,
                            timeFormatter: (businessDayOrTimestamp) => {
                                var date = new Date(businessDayOrTimestamp);  // 将微秒转换为毫秒
                                var hours = String(date.getHours()).padStart(2, '0');
                                var minutes = String(date.getMinutes()).padStart(2, '0');
                                var seconds = String(date.getSeconds()).padStart(2, '0');
                                return `${hours}:${minutes}:${seconds}`;
                            }

                        },
                        watermark: {
                            visible: true,
                            fontSize: 24,
                            horzAlign: 'center',
                            vertAlign: 'center',
                            color: 'rgba(171, 71, 188, 0.5)',
                            text: 'ABT',
                        },
                    });
                }
            })
        },
    }
}
</script>

<style lang="scss"
       scoped>
@import "creation";
</style>