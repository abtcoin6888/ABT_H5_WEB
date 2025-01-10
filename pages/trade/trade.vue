<template>
    <view class="trade" :data-theme="userTheme">
        <!--    nav bar    -->
        <fui-nav-bar isFixed
                     isOccupy
                     statusBar
                     padding="0"
                     custom
                     zIndex="9"
                     background="var(--background-primary)"
                     @init="navInit">
            <view class="nav-bar flex align_center jus-bet">
                <view class="flex flex-column align-start justify-center" @click="drawerPopup = true">
                    <view class="flex flex-row align-center justify-start">
                        <text class="font-16 color-black font-bold mr-4">
                            {{ currentCurrency['symbol'] }}/USDT
                        </text>
                        <image class="down-icon"
                               :src="`/static/img/tactic/down-${ userTheme }.png`"
                               mode="widthFix">
                        </image>
                    </view>
                    <text class="font-11 font-weight mt-3"
                          :class="{
                                'price_down': currentCurrency['change_rate'] < 0,
                                'price_up': currentCurrency['change_rate'] > 0 ,
                                'color-black': currentCurrency['change_rate'] == 0
                                }">
                        {{ $util.thousandSeparator(currentCurrency['change_rate'], 2) }}%
                    </text>
                </view>
                <view class="flex flex-row align-center justify-end">
                    <view class="btn-img" @click="optionalChange">
                        <image class="likeIcon" v-if="!like" :src="`/static/newImage/collect-${ userTheme }.png`"
                               mode="widthFix"></image>
                        <image class="likeIcon" v-else src="/static/newImage/collect-select.png"
                               mode="widthFix"></image>
                    </view>
                    <view class="btn-img" @click="toKline">
                        <image class="zdIcon" :src="`/static/newImage/zd-${ userTheme }.png`" mode="widthFix"></image>
                    </view>
                    <view class="btn-img" @click="IsShow = !IsShow">
                        <image :src="`/static/newImage/zdpl-${ userTheme }.png`" mode="widthFix"></image>
                    </view>
                </view>
            </view>
        </fui-nav-bar>
        <!--    container scroll    -->
        <scroll-view scroll-y
                     class="scroll-view"
                     :style="{'height': scrollHeight + 'px'}">
            <!--    kline chart    -->
            <view class="kline-wrap" v-if="IsShow">
                <div>
                    <div class="kline" id="kline" ref="kline"
                         :style="{ 'width': $device.windowWidth + 'px', 'height': '250px' }"></div>
                </div>
            </view>
            <view class="scroll-top">
                <view class="scroll-top-left">
                    <view class="left-top"
                          :style="`height: ${order_type == 0 ? '525rpx':'610rpx'}`">
                        <view class="cell-row flex flex-row">
                            <view type="buy" class="cell-button flex justify-center align-center"
                                  :class="{'cell-active' : direction === 0}" @click="direction = 0">
                                <image class="button-image"
                                       :src="`/static/img/button_bg/buy-s.png`"
                                       v-if="direction === 0">
                                </image>
                                <image class="button-image"
                                       :src="`/static/img/button_bg/buy-n-${userTheme}.png`"
                                       v-else>
                                </image>
                                <text class="font-13 font-weight button-text"
                                      :class="direction === 0 ? 'always-white' : 'color-gray'">
                                    {{ $t('trade.buy') }}
                                </text>
                            </view>
                            <view type="sell" class="cell-button flex justify-center align-center"
                                  :class="{'cell-active' : direction === 1}" @click="direction = 1">
                                <image class="button-image"
                                       :src="`/static/img/button_bg/sell-s.png`"
                                       v-if="direction === 1">
                                </image>
                                <image class="button-image"
                                       :src="`/static/img/button_bg/sell-n-${userTheme}.png`"
                                       v-else>
                                </image>
                                <text class="font-13 font-weight button-text"
                                      :class="direction === 1 ? 'always-white' : 'color-gray'">
                                    {{ $t('trade.sell') }}
                                </text>
                            </view>
                        </view>
                        <!-- Order mode-->
                        <fui-dropdown-menu background="var(--background-secondary)"
                                           :minWidth="412"
                                           :maxHeight="151"
                                           :size="24"
                                           :isCheckbox="false"
                                           :radius="8"
                                           :padding="'12rpx'"
                                           color="var(--content-primary)"
                                           selectedColor="var(--color-primary)"
                                           :options="actions"
                                           ref="ddmRange"
                                           @click="selectType">
                            <view class="cell-row select-box bg-gray flex flex-row justify-between align-center"
                                  @tap="filterTap(0)">
                                <text class="font-13 color-black">
                                    {{ range }}
                                </text>
                                <image class="down-icon"
                                       :src="`/static/img/tactic/down-${userTheme}.png`"
                                       mode="widthFix">
                                </image>
                            </view>
                        </fui-dropdown-menu>
                        <!-- Order price-->
                        <view class="cell-row cell-row-box bg-gray flex flex-row justify-between align-center"
                              v-show="order_type == 1">
                            <input type="text" class="color-black" v-model="order_price"
                                   :placeholder="this.$t('trade.price')" placeholder-class="placeholder">
                            <text class="font-13 color-black">USDT</text>
                        </view>
                        <!-- Num mode-->
                        <fui-dropdown-menu background="var(--background-secondary)"
                                           :minWidth="412"
                                           :maxHeight="151"
                                           :size="24"
                                           :isCheckbox="false"
                                           :radius="8"
                                           :padding="'12rpx'"
                                           color="var(--content-primary)"
                                           selectedColor="var(--color-primary)"
                                           :options="orderUnit"
                                           ref="numRange"
                                           @click="selectTradeType">
                            <view class="num-drop-box bg-gray flex flex-row align-center"
                                  @click="filterTap(1)">
                                <text class="font-13 font-weight color-black mr-5">
                                    {{ orderUnit[trade_type] }}
                                </text>
                                <image :src="`/static/img/tactic/down-${userTheme}.png`"
                                       mode="widthFix">
                                </image>
                            </view>
                        </fui-dropdown-menu>
                        <!-- Num input-->
                        <view class="cell-row cell-row-box bg-gray flex flex-row justify-between align-center">
                            <input type="text" class="color-black" v-model="amount"
                                   :placeholder="trade_type === 0 ? this.$t('trade.num') : this.$t('trade.vol_bus')"
                                   placeholder-class="placeholder">
                            <text class="font-13 color-black">
                                {{ trade_type === 0 ? currentCurrency['symbol'] : 'USDT' }}
                            </text>
                        </view>
                        <!-- slider -->
                        <view class="slider-box">
                            <view class="slider-dot bg-gray">
                                <view class="active-box" :style="`width: ${rateValue}%`"></view>
                                <view class="dot" v-for="item in [0, 25, 50, 75, 100]"></view>
                            </view>
                            <view class="slider">
                                <slider activeColor="transparent"
                                        backgroundColor="transparent"
                                        block-color="var(--background-primary)"
                                        block-size="13"
                                        :value="rateValue"
                                        step="1"
                                        @change="sliderChange"
                                        @changing="sliderChange"/>
                            </view>
                            <view class="slider-number">
                                <text class="font-10 "
                                      :class="rateValue >= item ? 'color-black' : 'color-gray'"
                                      v-for="item in [0, 25, 50, 75, 100]">
                                    {{ item }}%
                                </text>
                            </view>
                        </view>
                        <!--  -->
                        <view class="cell-row flex flex-row justify-between align-center">
                            <view>
                                <text class="font-11 color-gray" v-if="trade_type === 0">
                                    {{ $t('trade.es_tur') }}
                                </text>
                                <text class="font-11 color-gray"
                                      v-else>
                                    {{ $t('trade.es_tdv') }}
                                </text>
                            </view>
                            <view>
                                <!-- 按数量的限价和市价的计算 -->
                                <template v-if="direction == 0">
                                    <!-- 市价下单买入 -->
                                    <text class="font-11 color-black font-weight"
                                          v-if="trade_type == 0 && order_type == 0">
                                        {{ $util.thousandSeparator(amount * ticker['c'], currentCurrency['decimals']) }}
                                    </text>
                                    <text class="font-11 color-black font-weight"
                                          v-if="trade_type == 1 && order_type == 0">
                                        {{
                                            $util.thousandSeparator(amount / ticker['c'], currentCurrency['trade_decimals'])
                                        }}
                                    </text>
                                    <!-- 限价下单买入 -->
                                    <text class="font-11 color-black font-weight"
                                          v-if="trade_type == 0 && order_type == 1">
                                        {{ $util.thousandSeparator(amount * order_price, currentCurrency['decimals']) }}
                                    </text>
                                    <text class="font-11 color-black font-weight"
                                          v-if="trade_type == 1 && order_type == 1">
                                        {{
                                            $util.thousandSeparator(amount / order_price, currentCurrency['trade_decimals'])
                                        }}
                                    </text>
                                </template>
                                <template v-else>
                                    <!-- 市价下单卖出 -->
                                    <text class="font-11 color-black font-weight"
                                          v-if="trade_type == 0 && order_type == 0">
                                        {{ $util.thousandSeparator(amount * ticker['c'], currentCurrency['decimals']) }}
                                    </text>
                                    <text class="font-11 color-black font-weight"
                                          v-if="trade_type == 1 && order_type == 0">
                                        {{
                                            $util.thousandSeparator(amount / ticker['c'], currentCurrency['trade_decimals'])
                                        }}
                                    </text>
                                    <!-- 限价下单卖出 -->
                                    <text class="font-11 color-black font-weight"
                                          v-if="trade_type == 0 && order_type == 1">
                                        {{ $util.thousandSeparator(amount * order_price, currentCurrency['decimals']) }}
                                    </text>
                                    <text class="font-11 color-black font-weight"
                                          v-if="trade_type == 1 && order_type == 1">
                                        {{
                                            $util.thousandSeparator(amount / order_price, currentCurrency['trade_decimals'])
                                        }}
                                    </text>
                                </template>
                                <text class="font-11 font-weight color-black ml-5">
                                    {{ trade_type == 1 ? currentCurrency['symbol'] : 'USDT' }}
                                </text>
                            </view>
                        </view>
                        <!--  -->
                        <view class="cell-row flex flex-row justify-between align-center">
                            <text class="font-11 color-gray">
                                {{ $t('trade.usable') }}
                            </text>
                            <view class="flex flex-row align-center">
                                <text class="font-11 font-weight color-black mr-5"
                                      v-if="direction == 0">
                                    {{ $util.float(balance['legal_balance']) }}
                                </text>
                                <text class="font-11 font-weight color-black mr-5"
                                      v-else>
                                    {{ $util.float(balance['trade_balance']) }}
                                </text>
                                <text class="font-11 font-weight color-black"
                                      v-if="direction == 0">
                                    USDT
                                </text>
                                <text class="font-11 font-weight color-black"
                                      v-else>
                                    {{ currentCurrency['symbol'] }}
                                </text>
                                <image @click="$mroute.exchange(currentCurrency['id'])"
                                       class="tran-image"
                                       src="/static/img/tactic/tran-icon.png"
                                       mode="widthFix">
                                </image>
                            </view>
                        </view>
                    </view>
                    <view class="cell-row button-box">
                        <view v-if="isLogin">
                            <button class="button"
                                    :class="direction == 0 ? 'bg-green' : 'bg-red'"
                                    @click="submit">
                                {{ direction == 0 ? this.$t('trade.buy') : this.$t('trade.sell') }}
                                {{ currentCurrency['symbol'] }}
                            </button>
                        </view>
                        <view v-else>
                            <button class="login-button"
                                    @click="$mroute.login()">
                                {{ $t('trade.lg_rg') }}
                            </button>
                        </view>
                    </view>
                </view>
                <view class="scroll-top-right">
                    <view class="right-top"
                          :style="`height: ${order_type == 0 ? '545rpx':'630rpx'}`">
                        <view class="right-title">
                            <view class="item">
                                <text class="font-10 color-gray">{{ $t('trade.price') }}</text>
                                <text class="font-10 color-gray">(USDT)</text>
                            </view>
                            <view class="item">
                                <text class="font-10 color-gray">{{ $t('trade.num') }}</text>
                                <text class="font-10 color-gray">({{ currentCurrency['symbol'] }})</text>
                            </view>
                        </view>
                        <!-- price up -->
                        <view class="price-list" v-if="bids.length > 0">
                            <view class="cell" v-for="(item, index) in asks" :key="'asks' + index"
                                  @click="setPrice(item)">
                                <view class="bg-box bg-green" :style="{'width': item[1] * 100 + '%'}"></view>
                                <text class="font-10 font-weight price_up">
                                    {{ $util.thousandSeparator(item[0], depthDecimal) }}
                                </text>
                                <text class="font-10 font-weight color-black">
                                    {{ $util.thousandUnit(item[1], currentCurrency['decimals']) }}
                                </text>
                            </view>
                        </view>
                        <view class="price-center">
                            <text class="font-14 color-primary font-weight">
                                {{ $util.thousandSeparator(ticker['c'], depthDecimal) }}
                            </text>
                            <text class="font-10 color-gray">
                                ≈{{ symbol }}{{ $util.thousandSeparator(ticker['c'] * symbol_rate, 2) }}
                            </text>
                        </view>
                        <!-- price down -->
                        <view class="price-list" v-if="bids.length > 0">
                            <view class="cell" v-for="(item, index) in bids" :key="'bids' + index"
                                  @click="setPrice(item)">
                                <view class="bg-box bg-red" :style="{'width': item[1] * 100 + '%'}"></view>
                                <text class="font-10 font-weight price_down">
                                    {{ $util.thousandSeparator(item[0], depthDecimal) }}
                                </text>
                                <text class="font-10 font-weight color-black">
                                    {{ $util.thousandUnit(item[1], currentCurrency['decimals']) }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <!--  -->
                    <view class="cell-row">
                        <fui-dropdown-menu background="var(--background-secondary)"
                                           :minWidth="155"
                                           :maxHeight="270"
                                           :size="24"
                                           :isCheckbox="false"
                                           :radius="8"
                                           :padding="'12rpx'"
                                           color="var(--content-primary)"
                                           selectedColor="var(--color-primary)"
                                           :options="showUnit"
                                           ref="decimal"
                                           @click="selectDecimal">
                            <view class="select-box bg-gray" @click="filterTap(2)">
                                <text class="font-11 color-black">{{ showUnitValue }}</text>
                                <image :src="`/static/img/tactic/down-${userTheme}.png`"
                                       mode="widthFix">
                                </image>
                            </view>
                        </fui-dropdown-menu>
                        <view class="image-box bg-gray">
                            <image src="/static/img/Br.png" mode="widthFix"></image>
                        </view>
                    </view>
                </view>
            </view>
            <!--    list content    -->
            <view class="list-bar">
                <view class="list-bar-left">
                    <fui-tabs alignLeft
                              scroll
                              :isSlider="false"
                              :scale="1"
                              :size="28"
                              :height="58"
                              :current="listTabIndex"
                              background="var(--background-primary)"
                              color="var(--content-tertiary)"
                              selectedColor="var(--content-primary)"
                              :tabs="listBarOptions"
                              @change="orderTabChange">
                    </fui-tabs>
                </view>
                <view class="list-bar-right">
                    <image @click="$mroute.tradeList()"
                           :src="`/static/img/tactic/order-${userTheme}.png`"
                           mode="widthFix">
                    </image>
                </view>
            </view>
            <swiper class="bottom-swiper"
                    :current="listTabIndex"
                    :duration="300"
                    :style="`height: ${scrollHeight-44 }px`"
                    @change="listTabIndex = $event.detail.current">
                <swiper-item class="scroll-bottom">
                    <view class="tip-box bg-gray">
                        <view class="flex flex-row align-center desc-check" @click="showUOrder = !showUOrder">
                            <view class="checkbox">
                                <image class="check-icon"
                                       src="/static/img/tactic/check-s.png"
                                       mode="widthFix"
                                       v-if="showUOrder">
                                </image>
                            </view>
                            <text class="font-11 color-black font-weight">
                                {{ $t('trade.view') }} USDT
                                {{ $t('trade.all_order') }}
                            </text>
                        </view>
                        <text v-if="orderList.length > 0"
                              class="font-11 color-primary font-weight"
                              @click="cancelOrder(0)">
                            {{ $t('trade.batch_wd') }}
                        </text>
                    </view>
                    <scroll-view scroll-y="true"
                                 class="order-container">
                        <view class="list-content">
                            <view class="item"
                                  v-for="(item, index) in orderList" :key="'o'+index">
                                <view class="item-row flex flex-row align-center justify-between">
                                    <view class="flex flex-row align-center">
                                        <fui-tag size="22"
                                                 :radius="4"
                                                 :padding="['8rpx','10rpx']"
                                                 :marginRight="10"
                                                 color="var(--content-always-white)"
                                                 :background="item.direction == 1 ? 'var(--color-primary)' : 'var(--content-trade-sell)'"
                                                 :text="item.direction == 1 ? $t('trade.buy') : $t('trade.sell')">
                                        </fui-tag>
                                        <text class="font-14 color-black font-weight ml-5">
                                            {{ item.symbol }}/USDT
                                        </text>
                                    </view>
                                    <text class="font-12 color-primary font-weight"
                                          @click="cancelOrder(item.id)">
                                        {{ $t('trade.wd_order') }}
                                    </text>
                                </view>
                                <view class="item-row flex flex-row align-center">
                                    <text class="font-12 color-black mr-5">
                                        {{ item.created_at }}
                                    </text>
                                    <fui-tag :text="item.order_type == 1 ? $t('trade.mk_od') : $t('trade.lm_od')"
                                             size="22"
                                             :radius="4"
                                             :padding="['8rpx','10rpx']"
                                             :marginLeft="10"
                                             color="var(--content-always-white)"
                                             background="var(--background-secondary)"
                                             theme="dark">
                                    </fui-tag>
                                </view>
                                <view class="item-row flex flex-row align-center justify-between">
                                    <text class="font-12 color-gray">
                                        {{ $t('trade.price') }}(USDT)
                                    </text>
                                    <text class="font-12 color-black font-weight">
                                        {{ $util.float(item.price) }}
                                    </text>
                                </view>
                                <view class="item-row flex flex-row align-center justify-between">
                                    <text class="font-12 color-gray"
                                          v-if="item.direction == 2">
                                        {{ $t('trade.num') }}({{ item.symbol }})
                                    </text>
                                    <text class="font-12 color-gray"
                                          v-else>
                                        {{ $t('trade.vl_tan') }}(USDT)
                                    </text>
                                    <text class="font-12 color-black font-weight"
                                          v-if="item.direction == 2">
                                        {{ $util.float(item.amount) }}
                                    </text>
                                    <text class="font-12 color-black font-weight"
                                          v-else>
                                        {{ $util.thousandSeparator(item.amount, 2) }}
                                    </text>
                                </view>
                                <view class="item-row flex flex-row align-center justify-between"
                                      v-if="item.direction == 1">
                                    <text class="font-12 color-gray">
                                        {{ $t('trade.ex_tran') }}({{ item.symbol }})
                                    </text>
                                    <text class="font-12 color-black font-weight">
                                        {{ $util.thousandSeparator(item.amount / item.price, item.decimals) }}
                                    </text>
                                </view>
                                <view class="item-row flex flex-row align-center justify-between">
                                    <text class="font-12 color-gray">
                                        {{ $t('trade.traded') }}
                                    </text>
                                    <text class="font-12 color-black font-weight">
                                        0.00
                                    </text>
                                </view>
                            </view>
                            <empty-view :visible="true"
                                        :width="690"
                                        :height="700"
                                        :title="$t('trade.not_order')">
                            </empty-view>
                        </view>
                    </scroll-view>
                </swiper-item>
                <swiper-item class="scroll-bottom">
                    <view class="tip-box bg-gray">
                        <view class="flex flex-row align-center">
                            <text class="font-11 color-black font-weight">
                                {{ $t('trade.ccpa') }}
                            </text>
                        </view>
                    </view>
                    <view class="assets-list">
                        <view class="item">
                            <image class="coim-image"
                                   :src="currentCurrency['icon']"
                                   mode="widthFix">
                            </image>
                            <view class="item-info">
                                <view class="row">
                                    <text class="font-14 font-weight color-black">
                                        {{ currentCurrency['symbol'] }}
                                    </text>
                                </view>
                                <view class="row">
                                    <text class="font-12 color-gray">
                                        {{ $t('trade.frozen') }}
                                    </text>
                                    <text class="font-12 color-black font-weight">
                                        {{ $util.float(balance['lock_trade']) }}
                                    </text>
                                </view>
                                <view class="row">
                                    <text class="font-12 color-gray">
                                        {{ $t('trade.usable') }}
                                    </text>
                                    <text class="font-12 color-black font-weight">
                                        {{ $util.float(balance['trade_balance']) }}
                                    </text>
                                </view>
                            </view>
                        </view>
                        <view class="item">
                            <image class="coim-image"
                                   src="/static/coin/usdt.png"
                                   mode="widthFix">
                            </image>
                            <view class="item-info">
                                <view class="row">
                                    <text class="font-14 font-weight color-black">
                                        USDT
                                    </text>
                                </view>
                                <view class="row">
                                    <text class="font-12 color-gray">
                                        {{ $t('trade.frozen') }}
                                    </text>
                                    <text class="font-12 color-black font-weight">
                                        {{ $util.float(balance['legal_lock']) }}
                                    </text>
                                </view>
                                <view class="row">
                                    <text class="font-12 color-gray">
                                        {{ $t('trade.usable') }}
                                    </text>
                                    <text class="font-12 color-black font-weight">
                                        {{ $util.float(balance['legal_balance']) }}
                                    </text>
                                </view>
                            </view>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
        </scroll-view>
        <!--    left drawer    -->
        <fui-drawer radius="0"
                    zIndex="999"
                    direction="left"
                    background="var(--background-primary)"
                    maskBackground="rgba(0, 0, 0, .8)"
                    :show="drawerPopup"
                    @close="closeDrawer">
            <view class="drawer">
                <view class="drawer-top">
                    <!-- #ifdef APP-PLUS -->
                    <view class="status_bar"></view>
                    <!-- #endif -->
                    <view class="title">
                        <text class="font-16 color-black font-weight">
                            {{ $t('index.spot') }}
                        </text>
                    </view>
                    <view class="drawer-search bg-gray">
                        <fui-icon name="search"
                                  color="var(--content-tertiary)"
                                  size="32">
                        </fui-icon>
                        <input class="color-black"
                               v-model="searchValue"
                               :placeholder="$t('trade.search_cc')"
                               placeholder-class="placeholder"/>
                    </view>
                    <view class="tag-buttons">
                        <view class="tag"
                              :class="popTabIndex === 0 ? 'bg-gray' : ''"
                              @click="popTabIndex = 0; mindex = 0">
                            <text class="font-13 font-weight"
                                  :class="popTabIndex === 0 ? 'color-black' : 'color-black'">
                                {{ $t('index.tab_t1') }}
                            </text>
                        </view>
                        <view class="tag"
                              :class="popTabIndex === 1 ? 'bg-gray' : ''"
                              @click="popTabIndex = 1; mindex = 1">
                            <text class="font-13 font-weight"
                                  :class="popTabIndex === 1 ? 'color-black' : 'color-black'">
                                <!--                                 {{ currency[0]['title'] }}-->
                                USDT-M
                            </text>
                        </view>
                    </view>
                    <view class="list-title">
                        <view class="left flex flex-row align-center" @click="switchSort(0)">
                            <text class="font-11 color-gray">{{ $t('index.name') }}</text>
                            <image :src="sort[0]['active']" mode="widthFix"></image>
                        </view>
                        <view class="right flex flex-row align-center">
                            <view class="item flex flex-row align-center">
                                <text class="font-11 color-gray">{{ $t('index.latest_price') }} / {{ $t('index.quote_change') }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <scroll-view scroll-y class="drawer-bottom" :style="{'height': windowHeight - 130 + 'px'}">
                    <template v-if="mindex == 0">
                        <empty-view :visible="mlist.length == 0"
                                    :width="540"
                                    :height="600"
                                    :title="$t('list.not_data')">
                        </empty-view>
                        <view class="drawer-coin-cell"
                              :class="selectIndex == index ? 'bg-gray' : ''"
                              v-for="(item, index) in mlist" :key="index"
                              @click="switchCurrency(item.id,index)">
                            <view class="left">
                                <text class="font-13 color-black font-weight mr-5">{{ item['symbol'] }}/USDT</text>
                                <text class="font-11 color-gray"></text>
                            </view>
                            <view class="right">
                                <text class="font-13 font-weight color-black"
                                      :class="{ 'price_up': item['change_rate'] >= 0, 'price_down': item['change_rate'] < 0 }">
                                    {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                </text>
                                <text class="font-11 color-black mt-4"
                                      :class="{ 'price_up': item['change_rate'] >= 0, 'price_down': item['change_rate'] < 0 }">
                                    {{ $util.thousandSeparator(item['change_rate']) }}%
                                </text>
                            </view>
                        </view>
                    </template>
                    <template v-if="mindex == 1">
                        <empty-view :visible="currency[0]['currency'].length == 0"
                                    :width="540"
                                    :height="600"
                                    :title="$t('list.not_data')">
                        </empty-view>
                        <view class="drawer-coin-cell"
                              :class="selectIndex == index ? 'bg-gray' : ''"
                              v-for="(item, index) in currency[0]['currency']" :key="index"
                              @click="switchCurrency(item.id,index)">
                            <view class="left">
                                <text class="font-13 color-black font-weight mr-5">{{ item['symbol'] }}/USDT</text>
                            </view>
                            <view class="right">
                                <text class="font-13 font-weight color-black"
                                      :class="{ 'price_up': item['change_rate'] >= 0, 'price_down': item['change_rate'] < 0 }">
                                    {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                </text>
                                <text class="font-11 color-black mt-4"
                                      :class="{ 'price_up': item['change_rate'] >= 0, 'price_down': item['change_rate'] < 0 }">
                                    {{ $util.thousandSeparator(item['change_rate']) }}%
                                </text>
                            </view>
                        </view>
                    </template>
                </scroll-view>
            </view>
        </fui-drawer>

        <alert ref="alert" :title="this.$t('login.tip_t2')" :content="content" :ctxt="ctxt"></alert>

        <loading ref="loading"></loading>

        <fui-top-popup ref="orderResult"
                       background="var(--background-primary)"
                       :show="showPop"
                       @close="showPop = false">
            <view class="topPopup">
                <view class="status_bar"></view>
                <view class="title">
                    <view class="flex flex-column align-center justify-center">
                        <text class="font-16 color-black font-weight">{{ $t('trade.ts_noti') }}</text>
                        <text class="font-12 color-gray mt-4">{{ $t('trade.mo_tr') }}</text>
                    </view>
                    <view class="close-icon" @tap="showPop = false">
                        <fui-icon name="close" :size="52" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="image-box">
                    <image class="type-img"
                           src="/static/img/success-icon.png"
                           mode="widthFix">
                    </image>
                </view>
                <view class="content-box">
                    <text class="font-14 color-black font-weight">
                        {{ $t('trade.your') }}{{ orderResult['symbol'] }}{{
                            orderResult['order_type'] == 1 ?
                                this.$t('trade.mk_pr') : this.$t('trade.lm_pr')
                        }}{{
                            orderResult['direction'] == 1 ?
                                this.$t('trade.buy_on') : this.$t('trade.sell_on')
                        }}{{ $t('trade.price_only') }}{{
                            orderResult['price'] ? orderResult['price'] : '--'
                        }}{{
                            $t('trade.ddqu')
                        }}{{ $util.float(orderResult['amount']) }}{{
                            orderResult['direction'] == 1 ?
                                orderResult['symbol'] : 'USDT'
                        }}{{ $t('trade.tfee') }}{{ $util.float(orderResult['charge']) }}{{
                            orderResult['direction']
                            == 1 ? orderResult['symbol'] : 'USDT'
                        }}.
                    </text>
                </view>
                <view class="descr">
                    <text class="font-13 color-gray">{{ $t('trade.see_detail') }}</text>
                </view>
            </view>
        </fui-top-popup>
    </view>
</template>
<!-- 
 1.在页面的关闭或者隐藏的时候清除数据的实时加载，
 2.ws 接收到数据后，将数据写入本地缓存中，维护一个最新价格缓存和一个全量列表缓存
 3.在界面不需要渲染的时候，将收到的数据写入缓存，界面从缓存中读取数据
 4.应用启动的时候加载一次k线缓存数据，在ws
 
 最小的价格数据一次包可能会推送多个币种，单k线图详情界面订阅后只会推一种币种的数据
 最新价格数据是全局实时推送，要做好缓存的处理。
 -->
<script>
import service from './tradeVue.js';

export default service;
</script>

<style lang="scss" scoped>
@import "trade.scss";
</style>

<style scoped>
/deep/ .uni-combox__selector {
    z-index: 3;
}

/deep/ .fui-ddm__down {
    transform-origin: center top;
    animation: ddDownHide 0.5s forwards;
}

/deep/ .fui-ddm__down-show {
    transform: translateY(105%) scale(1);
    transform-origin: center top;
    animation: ddmDownShow 0.5s forwards;
}

@keyframes ddDownHide {
    0% {
        transform: translateY(105%) scale(1);
    }
    100% {
        transform: translateY(105%) scale(0);
    }
}

@keyframes ddmDownShow {
    0% {
        transform: translateY(105%) scale(0);
    }
    50% {
        transform: translateY(105%) scale(1);
    }
    75% {
        transform: translateY(105%) scale(0.9);
    }
    100% {
        transform: translateY(105%) scale(1);
    }
}

/deep/ .fui-tabs__item {
    padding: 0 50rpx 0 0 !important;
}

/deep/ .fui-dropdown__menu-list {
    margin-top: 20rpx;
    padding: 10rpx;
    box-sizing: border-box;
}

/deep/ .fui-dropdown__menu-item {
    background-color: transparent;
    border-radius: 8rpx;
}

/deep/ .fui-dropdown__menu-list .fui-dropdown__menu-item:active {
    background-color: var(--background-secondary) !important;
}

/* Slider 滑块 */
/deep/ .uni-slider-wrapper {
    margin: 0;
}

/deep/ .uni-slider .uni-slider-handle,
/deep/ .uni-slider .uni-slider-thumb {
    border-radius: 50%;
    margin-top: 2rpx;
}

/deep/ .uni-slider-thumb {
    box-shadow: 0 0 0 transparent;
    border: 4rpx solid var(--border-strength-100) !important;
}

/deep/ .uni-slider-handle-wrapper {
    height: 10rpx !important;
    border-radius: 0;
}

/deep/ .uni-slider-track {
    height: 10rpx !important;
    border-radius: 0;
}
</style>