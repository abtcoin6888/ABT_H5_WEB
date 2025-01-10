<template>
    <view class="traderInfo" :data-theme="userTheme">
        <fui-nav-bar zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     statusBar isFixed isOccupy
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>

        <view class="traderInfo-body">
            <view class="traderInfo-body-head">
                <!--  交易员信息 -->
                <view class="traderInfo-body-head-top">
                    <view class="flex flex-column">
                        <view class="flex align-center">
                            <text class="font-16 color-black font-weight">
                                BGUSER-6DMSN87L
                            </text>
                            <image class="hot-icon" src="/static/img/4Ha.webp" mode="widthFix"></image>
                        </view>
                        <view class="flex align-center mt-5">
                            <text class="font-12 color-dark">
                                @BGUSER-6DMSN87L
                            </text>
                        </view>
                        <view class="flex align-center mt-5">
                            <image class="flow-icon" src="/static/img/qz.png" mode="widthFix"></image>
                            <text class="font-12 color-gray">898/1000</text>
                        </view>
                    </view>
                    <view class="flex align-center">
                        <fui-avatar background="var(--background-secondary)"
                                    width="150"
                                    height="150"
                                    src="/static/img/davatar.webp">
                        </fui-avatar>
                    </view>
                </view>
                <!--  附加信息 -->
                <view class="traderInfo-body-head-bottom">
                    <fui-tag
                        :isBorder="false"
                        :padding="['8rpx','10rpx']"
                        :text="$t('follow.high_income')"
                        :marginRight="10"
                        :radius="4"
                        type="warning"
                        theme="light">
                    </fui-tag>
                    <fui-tag
                        :isBorder="false"
                        :padding="['8rpx','10rpx']"
                        :text="$t('follow.steady')"
                        :marginRight="10"
                        :radius="4"
                        type="warning"
                        theme="light">
                    </fui-tag>
                    <fui-tag
                        :isBorder="false"
                        :padding="['8rpx','10rpx']"
                        :text="$t('follow.high_frequency')"
                        :marginRight="10"
                        :radius="4"
                        type="warning"
                        theme="light">
                    </fui-tag>
                </view>
            </view>

            <view class="traderInfo-body-container">
                <view class="tab-cell">
                    <fui-tabs scroll
                              alignLeft
                              color="var(--content-tertiary)"
                              selectedColor="var(--content-primary)"
                              selectedSize="28"
                              sliderBackground="var(--content-primary)"
                              background="var(--background-primary)"
                              height="78"
                              :scale="1"
                              :current="current"
                              :tabs="items"
                              :short="false"
                              :height="88"
                              @click="onClickItem">
                    </fui-tabs>
                </view>
                <view class="content-box">
                    <!--  总权益/总资金  -->
                    <view class="content-box-item">
                        <text class="font-14 color-black font-weight">
                            ****
                        </text>
                        <view class="flex align-center mt-5">
                            <text class="font-12 color-gray">
                                {{ $t('tradeInfo.total_equity') }}
                            </text>
                        </view>
                    </view>
                    <!--  总笔数 -->
                    <view class="content-box-item">
                        <text class="font-14 color-black font-weight">
                            637
                        </text>
                        <text class="font-12 color-gray mt-5">
                            {{ $t('tradeInfo.total_number') }}
                        </text>
                    </view>
                    <!--  加入时间 -->
                    <view class="content-box-item">
                        <text class="font-14 color-black font-weight">
                            126
                        </text>
                        <text class="font-12 color-gray mt-5">
                            {{ $t('tradeInfo.join_time') }}
                        </text>
                    </view>
                </view>
                <!--  跟单/关注按钮 -->
                <view class="content-buttons">
                    <view class="content-buttons-item">
                        <fui-button height="78rpx"
                                    radius="60rpx"
                                    color="var(--background-primary)"
                                    background="var(--content-primary)"
                                    size="26"
                                    :text="$t('tradeInfo.vacancy_reminder')"
                                    @click="$mroute.tradeConfirm(1)">
                        </fui-button>
                    </view>
                    <view class="content-buttons-item">
                        <fui-button height="78rpx"
                                    radius="60rpx"
                                    background="var(--background-secondary)"
                                    color="var(--content-primary)"
                                    size="26">
                            <fui-icon name="plus" size="40" color="var(--content-primary)"></fui-icon>
                            {{ $t('tradeInfo.focus_on') }}
                        </fui-button>
                    </view>
                </view>

                <view class="tab-cell">
                    <fui-tabs scroll
                              alignLeft
                              color="var(--content-tertiary)"
                              selectedColor="var(--content-primary)"
                              selectedSize="28"
                              sliderBackground="var(--content-primary)"
                              background="var(--background-primary)"
                              height="78"
                              :scale="1"
                              :current="tab"
                              :tabs="menu"
                              :short="false"
                              :height="88"
                              @change="menuClick">
                    </fui-tabs>
                </view>
                <swiper :current="tab" :duration="duration" @change="swiperChange" @transition="changeIng" class="swiper-warp" :style="`height: ${scrollHeight}px`">
                    <!--  图表   -->
                    <swiper-item class="swiper-warp-item">
                        <scroll-view scroll-y class="swiper-scroll">
                            <!--  收益率   -->
                            <view class="chart-card">
                                <view class="chart-card-cell">
                                    <view class="flex align-center">
                                        <text class="font-13 color-black font-weight mr-5">
                                            {{ $t('follow.rate_return') }}
                                        </text>
                                        <fui-icon name="info" size="30" color="var(--content-tertiary)"></fui-icon>
                                    </view>
                                    <view class="flex align-center">
                                        <text class="font-12 color-gray mr-5">
                                            {{ $t('tradeInfo.last_day') }}
                                        </text>
                                        <fui-icon name="turningdown" size="30"
                                                  color="var(--content-tertiary)"></fui-icon>
                                    </view>
                                </view>
                                <view class="chart-card-box">
                                    <qiun-data-charts type="area" :opts="opts" :chartData="groupData['incomeRate']"/>
                                </view>
                            </view>
                            <!--  币种偏好   -->
                            <view class="chart-card">
                                <view class="chart-card-cell">
                                    <text class="font-13 color-black font-weight">
                                        {{ $t('tradeInfo.currency_pre') }}
                                    </text>
                                    <view class="flex align-center">
                                        <text class="font-12 color-gray mr-5">
                                            {{ $t('tradeInfo.last_day') }}
                                        </text>
                                        <fui-icon name="turningdown" size="30"
                                                  color="var(--content-tertiary)"></fui-icon>
                                    </view>
                                </view>
                                <view class="chart-card-box">
                                    <qiun-data-charts type="pie" :opts="circle" :chartData="groupData['currency']"/>
                                </view>
                            </view>
                            <!--  持仓时间   -->
                            <view class="chart-card">
                                <view class="chart-card-cell">
                                    <text class="font-13 color-black font-weight">
                                        {{ $t('tradeInfo.holding_time') }}
                                    </text>
                                    <view class="flex align-center">
                                        <text class="font-12 color-gray mr-5">
                                            {{ $t('tradeInfo.last_day') }}
                                        </text>
                                        <fui-icon name="turningdown" size="30"
                                                  color="var(--content-tertiary)"></fui-icon>
                                    </view>
                                </view>
                                <view class="chart-card-box">
                                    <qiun-data-charts type="scatter" :opts="scatter" :chartData="groupData['scatter']"/>
                                </view>
                            </view>
                            <!--  交易量   -->
                            <view class="chart-card">
                                <view class="chart-card-cell">
                                    <text class="font-13 color-black font-weight">
                                        {{ $t('tradeInfo.trading_volume') }}
                                    </text>
                                    <view class="flex align-center">
                                        <text class="font-12 color-gray mr-5">
                                            {{ $t('tradeInfo.last_day') }}
                                        </text>
                                        <fui-icon name="turningdown" size="30"
                                                  color="var(--content-tertiary)"></fui-icon>
                                    </view>
                                </view>
                                <view class="chart-card-box">
                                    <qiun-data-charts type="column" :opts="column" :chartData="groupData['column']"/>
                                </view>
                            </view>
                        </scroll-view>
                    </swiper-item>
                    <!--  数据   -->
                    <swiper-item class="swiper-warp-item">
                        <view class="data-card">
                            <!--  收益率 -->
                            <view class="data-card-cell">
                                <text class="font-13 color-black font-weight">
                                    {{ $t('follow.rate_return') }}
                                </text>
                                <text class="font-13 price_up font-weight">
                                    +4566.10%
                                </text>
                            </view>
                            <!--  最大回撤 -->
                            <view class="data-card-cell">
                                <text class="font-13 color-black font-weight">
                                    {{ $t('tradeInfo.maximum_drawdown') }}
                                </text>
                                <text class="font-13 color-black font-weight">
                                    +10.10%
                                </text>
                            </view>
                            <!--  累计跟单人数 -->
                            <view class="data-card-cell">
                                <text class="font-13 color-black font-weight">
                                    {{ $t('follow.grand_total_people') }}
                                </text>
                                <text class="font-13 color-black font-weight">
                                    108
                                </text>
                            </view>
                            <!--  总收益 -->
                            <view class="data-card-cell">
                                <text class="font-13 color-black font-weight">
                                    {{ $t('follow.total_revenue') }}
                                </text>
                                <text class="font-13 color-black font-weight">
                                    $11758.30
                                </text>
                            </view>
                            <!--  胜率 -->
                            <view class="data-card-cell">
                                <text class="font-13 color-black font-weight">
                                    {{ $t('tradeInfo.winning_percentage') }}
                                </text>
                                <text class="font-13 color-black font-weight">
                                    93.46%
                                </text>
                            </view>
                            <!--  AUM -->
                            <view class="data-card-cell">
                                <text class="font-13 color-black font-weight">
                                    AUM
                                </text>
                                <text class="font-13 color-black font-weight">
                                    4389352.90
                                </text>
                            </view>
                            <!--  带单交易对 -->
                            <view class="data-card-label">
                                <text class="font-13 color-black font-weight title">
                                    {{ $t('tradeInfo.with_stp') }}
                                </text>
                                <view class="tag-group">
                                    <fui-tag :padding="['12rpx','16rpx']"
                                             :isBorder="false"
                                             :radius="8"
                                             :marginRight="10"
                                             type="warning"
                                             theme="light"
                                             text="BTCUSDT">
                                    </fui-tag>
                                    <fui-tag :padding="['12rpx','16rpx']"
                                             :isBorder="false"
                                             :radius="8"
                                             :marginRight="10"
                                             type="warning"
                                             theme="light"
                                             text="ETHUSDT">
                                    </fui-tag>
                                </view>
                            </view>
                        </view>
                    </swiper-item>
                    <!--  订单   -->
                    <swiper-item class="swiper-warp-item">
                        <scroll-view scroll-y class="swiper-scroll">
                            <view class="order-tabs">
                                <view class="order-tabs-left">
                                    <view class="tab-item"
                                          :class="oindex === 0 ? 'tab-item-active' : ''"
                                          @click="oindex = 0">
                                        <text class="font-13"
                                              :class="oindex === 0 ? 'color-black' : 'color-gray'">
                                            {{ $t('tradeInfo.history_bl') }}
                                        </text>
                                    </view>
                                    <view class="tab-item"
                                          :class="oindex === 1 ? 'tab-item-active' : ''"
                                          @click="oindex = 1">
                                        <text class="font-13"
                                              :class="oindex === 1 ? 'color-black' : 'color-gray'">
                                            {{ $t('tradeInfo.cur_order') }}26
                                        </text>
                                    </view>
                                </view>
                                <view class="order-tabs-right">
                                    <view class="flex align-center">
                                        <text class="font-12 color-gray mr-5">
                                            {{ $t('tradeInfo.details') }}
                                        </text>
                                        <fui-icon name="turningdown" size="30"
                                                  color="var(--content-tertiary)"></fui-icon>
                                    </view>
                                </view>
                            </view>
                            <template v-if="oindex === 0">
                                <view class="order-list">
                                    <view class="not-data" v-if="false">
                                        <fui-empty width="200"
                                                   height="200"
                                                   size="26"
                                                   color="var(--content-tertiary)"
                                                   src="/static/newImage/not-order.png"
                                                   :title="$t('list.not_data')">
                                        </fui-empty>
                                    </view>
                                    <view class="order-list-item" v-for="i in 2" :key="i">
                                        <view class="order-list-item-cell">
                                            <fui-tag
                                                v-if="i === 1"
                                                :isBorder="false"
                                                :padding="['8rpx','10rpx']"
                                                :text="$t('tradeInfo.many')"
                                                :marginRight="20"
                                                :radius="4"
                                                type="success"
                                                theme="dark">
                                            </fui-tag>
                                            <fui-tag
                                                v-if="i === 2"
                                                :isBorder="false"
                                                :padding="['8rpx','10rpx']"
                                                :text="$t('tradeInfo.null')"
                                                :marginRight="20"
                                                :radius="4"
                                                type="danger"
                                                theme="dark">
                                            </fui-tag>
                                            <text class="font-14 color-black font-weight">
                                                BTCUSDT
                                            </text>
                                            <fui-tag
                                                :isBorder="false"
                                                :padding="['8rpx','10rpx']"
                                                :text="$t('tradeInfo.full_w') + '50X'"
                                                :marginLeft="20"
                                                :marginRight="10"
                                                :radius="4"
                                                type="warning"
                                                theme="light">
                                            </fui-tag>
                                            <fui-tag
                                                :isBorder="false"
                                                :padding="['8rpx','10rpx']"
                                                text="USDT"
                                                :marginRight="10"
                                                :radius="4"
                                                type="warning"
                                                theme="light">
                                            </fui-tag>
                                        </view>
                                        <view class="order-list-item-column">
                                            <!--  开仓均价  -->
                                            <view class="item">
                                                <text class="font-14 color-black">
                                                    19536.55
                                                </text>
                                                <text class="font-12 color-gray">
                                                    {{ $t('tradeInfo.average_op') }}
                                                </text>
                                            </view>
                                            <!--  当前价  -->
                                            <view class="item">
                                                <text class="font-14 color-black">
                                                    19536.55
                                                </text>
                                                <text class="font-12 color-gray">
                                                    {{ $t('tradeInfo.current_price') }}
                                                </text>
                                            </view>
                                            <!--  收益率  -->
                                            <view class="item">
                                                <text class="font-14 color-black">
                                                    19536.55
                                                </text>
                                                <text class="font-12 color-gray">
                                                    {{ $t('follow.rate_return') }}
                                                </text>
                                            </view>
                                        </view>
                                        <view class="order-list-item-cell flex align-center justify-between mt-5">
                                            <text class="font-12 color-gray">
                                                08/14 10:12:52
                                            </text>
                                            <fui-icon name="back" size="40" color="var(--content-tertiary)"></fui-icon>
                                            <text class="font-12 color-gray">
                                                08/14 21:12:52
                                            </text>
                                        </view>
                                    </view>
                                </view>
                            </template>
                            <template v-if="oindex === 1">
                                <view class="order-list">
                                    <view class="not-data" v-if="false">
                                        <fui-empty width="200"
                                                   height="200"
                                                   size="26"
                                                   color="var(--content-tertiary)"
                                                   src="/static/newImage/not-order.png"
                                                   :title="$t('list.not_data')">
                                        </fui-empty>
                                    </view>
                                    <view class="order-list-item" v-for="i in 2" :key="i">
                                        <view class="order-list-item-cell">
                                            <fui-tag
                                                v-if="i === 2"
                                                :isBorder="false"
                                                :padding="['8rpx','10rpx']"
                                                :text="$t('tradeInfo.many')"
                                                :marginRight="20"
                                                :radius="4"
                                                type="success"
                                                theme="dark">
                                            </fui-tag>
                                            <fui-tag
                                                v-if="i === 1"
                                                :isBorder="false"
                                                :padding="['8rpx','10rpx']"
                                                :text="$t('tradeInfo.null')"
                                                :marginRight="20"
                                                :radius="4"
                                                type="danger"
                                                theme="dark">
                                            </fui-tag>
                                            <text class="font-14 color-black font-weight">
                                                BTCUSDT
                                            </text>
                                            <fui-tag
                                                :isBorder="false"
                                                :padding="['8rpx','10rpx']"
                                                :text="$t('tradeInfo.full_w') + '50X'"
                                                :marginLeft="20"
                                                :marginRight="10"
                                                :radius="4"
                                                type="warning"
                                                theme="light">
                                            </fui-tag>
                                            <fui-tag
                                                :isBorder="false"
                                                :padding="['8rpx','10rpx']"
                                                text="USDT"
                                                :marginRight="10"
                                                :radius="4"
                                                type="warning"
                                                theme="light">
                                            </fui-tag>
                                        </view>
                                        <view class="order-list-item-column">
                                            <!--  开仓均价  -->
                                            <view class="item">
                                                <text class="font-14 color-black">
                                                    19536.55
                                                </text>
                                                <text class="font-12 color-gray">
                                                    {{ $t('tradeInfo.average_op') }}
                                                </text>
                                            </view>
                                            <!--  当前价  -->
                                            <view class="item">
                                                <text class="font-14 color-black">
                                                    19536.55
                                                </text>
                                                <text class="font-12 color-gray">
                                                    {{ $t('tradeInfo.current_price') }}
                                                </text>
                                            </view>
                                            <!--  收益率  -->
                                            <view class="item">
                                                <text class="font-14 color-black">
                                                    19536.55
                                                </text>
                                                <text class="font-12 color-gray">
                                                    {{ $t('follow.rate_return') }}
                                                </text>
                                            </view>
                                        </view>
                                        <view class="order-list-item-cell flex align-center justify-between mt-5">
                                            <text class="font-12 color-gray">
                                                08/14 10:12:52
                                            </text>
                                            <fui-icon name="back" size="40" color="var(--content-tertiary)"></fui-icon>
                                            <text class="font-12 color-gray">
                                                08/14 21:12:52
                                            </text>
                                        </view>
                                    </view>
                                </view>
                            </template>
                        </scroll-view>
                    </swiper-item>
                    <!--  跟单   -->
                    <swiper-item class="swiper-warp-item">
                        <scroll-view scroll-y class="swiper-scroll">
                            <view class="flower-list">
                                <view class="flower-list-cell" v-for="i in 5" :key="i">
                                    <view class="flower-list-cell-image">
                                        <fui-avatar width="90"
                                                    height="90"
                                                    background="var(--color-gray-bg)"
                                                    src="/static/img/avatar.png">
                                        </fui-avatar>
                                    </view>
                                    <view class="flower-list-cell-info">
                                        <text class="font-14 color-black font-weight">
                                            MarcAurel
                                        </text>
                                        <text class="font-12 color-gray">
                                            {{ $t('tradeInfo.follow_total') }}：363173.12 USDT
                                        </text>
                                        <text class="font-12 color-gray">
                                            {{ $t('tradeInfo.follow_earn') }}：+104501.7153 USDT
                                        </text>
                                    </view>
                                </view>
                            </view>
                        </scroll-view>
                    </swiper-item>
                </swiper>
            </view>
        </view>
    </view>
</template>

<script>
import {mapGetters} from 'vuex';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";
import fuiAvatar from "@/components/firstui/fui-avatar/fui-avatar.vue";
import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue";

export default {
    components: {fuiEmpty, fuiAvatar, fuiNavBar},
    data() {
        return {
            navHeight: "",
            scrollHeight: "",
            duration: "500",
            oindex: 0,
            current: 0,
            items: [this.$t('follow.contract'), this.$t('follow.spot_goods')],
            tab: 0,
            menu: [this.$t('tradeInfo.chart'), this.$t('tradeInfo.data'), this.$t('tradeInfo.order'), this.$t('tradeInfo.follow_od')],
            opts: {
                color: ["#3070ec", "#3070ec"],
                padding: [15, 0, 15, 0],
                enableScroll: false,
                legend: {},
                xAxis: {
                    boundaryGap: 'justify',
                    disableGrid: true,
                    axisLine: false,
                    title: "",
                    titleFontSize: 0,
                    fontSize: 12,
                    fontColor: '#85898e',
                    rotateLabel: false
                },
                yAxis: {
                    // gridType: "dash",
                    // dashLength: 2,
                    disableGrid: true,
                    axisLine: false,
                    data: [
                        {
                            min: 0,
                            type: "value",
                            position: "left",
                            axisLine: false
                        }
                    ]
                },
                extra: {
                    area: {
                        type: "curve",
                        opacity: 0.5,
                        addLine: true,
                        width: 2,
                        gradient: true,
                        activeType: "none"
                    }
                }
            },
            groupData: {
                'incomeRate': {
                    categories: ["08-08", "08-09", "08-10", "08-11", "08-12", "08-13"],
                    series: [
                        {
                            itemCount: 6,
                            data: [55, 25, 50, 10, 30, 57],
                            legendText: this.$t('follow.rate_return'),
                            legendShape: "none",
                            name: this.$t('follow.rate_return')
                        }
                    ]
                },
                currency: {
                    series: [
                        {data: [{"name": "ETHUSDT", "value": 50}, {"name": "BTCUSDT", "value": 50}]}
                    ]
                },
                scatter: {
                    series: [
                        {
                            name: this.$t('tradeInfo.profit'),
                            data: [[1, 8.04], [1, 6.95], [1, 7.58]]
                        },
                        {
                            name: this.$t('tradeInfo.loss'),
                            data: [[1, 7.2], [1.5, 7.2], [1.03, 4.23]]
                        }
                    ]
                },
                column: {
                    categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
                    series: [
                        {
                            name: this.$t('tradeInfo.trading_volume'),
                            data: [35, 36, 31, 33, 13, 34]
                        }
                    ]
                }
            },
            circle: {
                color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
                padding: [5, 5, 5, 5],
                enableScroll: false,
                extra: {
                    pie: {
                        activeOpacity: 0.5,
                        activeRadius: 10,
                        offsetAngle: 0,
                        labelWidth: 15,
                        border: true,
                        borderWidth: 3,
                        borderColor: "#FFFFFF"
                    }
                }
            },
            scatter: {
                color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
                padding: [15, 15, 0, 15],
                dataLabel: false,
                enableScroll: false,
                legend: {},
                xAxis: {
                    disableGrid: true,
                    gridType: "dash",
                    splitNumber: 5,
                    boundaryGap: "justify",
                    min: 0,
                    axisLine: false
                },
                yAxis: {
                    disableGrid: false,
                    gridType: "solid",
                    gridColor: "#f8f8f8",
                    data: [
                        {
                            type: "value",
                            position: "left",
                            axisLine: false,
                        }
                    ]
                },
                extra: {
                    scatter: {}
                }
            },
            column: {
                color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
                padding: [15, 15, 0, 5],
                enableScroll: false,
                legend: {},
                xAxis: {
                    disableGrid: true
                },
                yAxis: {
                    gridType: "solid",
                    gridColor: "#f8f8f8",
                    data: [
                        {
                            type: "value",
                            position: "left",
                            axisLine: false,
                        }
                    ]
                },
                extra: {
                    column: {
                        type: "group",
                        width: 30,
                        activeBgColor: "#000000",
                        activeBgOpacity: 0.08
                    }
                }
            }
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
            this.scrollHeight = uni.getSystemInfoSync().windowHeight - this.navHeight - 44;
        },
        menuClick(e) {
            this.tab = e.index;
            this.duration = 0;
        },
        swiperChange(e){
            this.tab = e.detail.current;
        },
        changeIng(){
            this.duration = '300';
        }
    }
}
</script>

<style lang="scss" scoped>
@import "traderinfo";
</style>

<style scoped>
/deep/ .fui-tabs__item {
    padding-left: 0;
    padding-right: 40rpx;
}
</style>
