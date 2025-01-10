<template>
    <view class="futures" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     custom
                     @init="navInit">
            <view class="nav-bar">
                <view class="nav-bar-item">
                    <fui-icon @click="$mroute.back()"
                              name="arrowleft"
                              size="56"
                              color="var(--content-primary)">
                    </fui-icon>
                    <view class="flex flex-row align-center"
                          @click="$refs.showSelect.open()">
                        <text class="font-16 color-black font-bold mr-5">
                            {{ currentCurrency['symbol'] }}USDT-F
                        </text>
                        <image class="change-icon"
                               :src="`/static/img/tactic/down-${ userTheme }.png`"
                               mode="widthFix">
                        </image>
                    </view>
                </view>
            </view>
        </fui-nav-bar>

        <view class="futures-body">
            <view class="head-box">
                <text class="font-20 font-bold price_up">
                    {{ $util.thousandSeparator(ticker['c'], decimals) }}
                </text>
                <view class="column">
                    <text class="font-12 color-black font-weight">
                        {{ seconds }}
                    </text>
                    <text class="font-11 color-gray">
                        {{ $t('futures.t2') }}
                    </text>
                </view>
            </view>
            <view class="futures-body-chart">
<!--                <view :history="history"-->
<!--                    :decimals="decimals"-->
<!--                    :new_price="new_price"-->
<!--                    :orders="ulist"-->
<!--                    :them="them"-->
<!--                    :change:decimals="render.setDecimals"-->
<!--                    :change:history="render.loadHistory"-->
<!--                    :change:new_price="render.updatePrice"-->
<!--                    :change:them="render.drawCharts"-->
<!--                    id="container"-->
<!--                    style="width: 750rpx;height: 740rpx;">-->
<!--                </view>-->
                <view class="kline-box">
                    <!--      K线图时间切换-->
                    <scroll-view scroll-x="true"
                                 enable-flex='true'
                                 scroll-with-animation="true"
                                 :scroll-into-view="'time' + timeIndex"
                                 class="time-box">
                        <view class="item" v-for="(item,index) in time" :key="index"
                              :id="'time' + (index+1)"
                              :class="{'active': timeIndex == index}"
                              @click="klineTime(index)">
                            <text class="font-weight">
                                {{ item }}
                            </text>
                        </view>
                    </scroll-view>
                    <view id="kline"
                          ref="kline"
                          :currencyInfo="currencyInfo"
                          :change:currencyInfo="render.setDecimals"
                          :history="history"
                          :change:history="render.initChart"
                          :them="them"
                          :change:them="render.setThem"
                          :ticker="ticker"
                          :change:ticker="render.update"
                          :fchart="fchart"
                          :change:fchart="render.switchChart"
                          :indicator="indicator"
                          :change:indicator="render.switchCharts"
                          :bar="bar"
                          :change:bar="render.setBar"
                          :style="{'height' : kheight+'px', 'width' : $device.windowWidth + 'px'}">
                    </view>
                </view>
            </view>
            <view class="futures-body-tabs">
                <fui-tabs scroll
                          alignLeft
                          color="var(--content-tertiary)"
                          selectedSize="28"
                          selectedColor="var(--content-primary)"
                          height="88"
                          scale="1"
                          background="var(--background-primary)"
                          sliderBackground="var(--content-primary)"
                          :short="false"
                          :tabs="items"
                          :current="current"
                          @change="current = $event.index">
                </fui-tabs>
            </view>
            <!--    进行中的   -->
            <template v-if="current === 0">
                <scroll-view scroll-y class="scroll-view" :style="{'height': scrollHeight + 'px'}">
                    <view class="not-date"
                          v-if="ulist.length === 0">
                        <fui-empty :src="`/static/newImage/notData-${userTheme}.png`"
                                   :width="200" :height="200"
                                   :descrColor="'var(--color-text-dark-gray)'"
                                   :descr="$t('list.not_data')">
                        </fui-empty>
                    </view>
                    <view class="list-item" v-for="(item,index) in ulist" :key="index">
                        <view class="list-item-cell">
                            <view class="flex align-center">
                                <fui-tag v-if="item.direction === -1"
                                         :padding="['8rpx','10rpx']"
                                         :isBorder="false"
                                         :radius="4"
                                         :marginRight="10"
                                         color="var(--content-always-white)"
                                         background="var(--content-trade-sell)"
                                         :text="$t('futures.t3')">
                                </fui-tag>
                                <fui-tag v-if="item.direction === 1"
                                         :padding="['8rpx','10rpx']"
                                         :isBorder="false"
                                         :radius="4"
                                         :marginRight="10"
                                         color="var(--content-always-white)"
                                         background="var(--content-trade-buy)"
                                         :text="$t('futures.t4')">
                                </fui-tag>
                                <text class="font-14 color-black font-weight mr-5">
                                    {{ item.created_at.split(' ')[1] }}
                                </text>
                                <text class="font-12 color-gray">
                                    {{ item.currency.symbol }}/USDT-{{ item.dep.interval }}{{ $t('futures.t1') }}
                                </text>
                            </view>
                        </view>
                        <view class="list-item-cell">
                            <view class="flex align-center">
                                <view class="flex align-center mr-10">
                                    <text class="font-12 color-gray mr-5">
                                        {{ $t('futures.t5') }}
                                    </text>
                                    <text class="font-12 color-black">
                                        {{ $util.float(item.amount) }} USDT
                                    </text>
                                </view>
                                <view class="flex align-center">
                                    <text class="font-12 color-gray mr-5">
                                        {{ $t('futures.t6') }}
                                    </text>
                                    <text class="font-12 color-black">
                                        {{ item.direction === 1 ? item.dep.up * 100 : item.dep.down * 100 }}%
                                    </text>
                                </view>
                            </view>
                            <text class="font-14 price_down font-weight"
                                  v-if="item.direction === 1 && item.open >= item.new_price">
                                {{ $util.float(item.amount * item.dep.up) }} USDT
                            </text>
                            <text class="font-14 price_down font-weight"
                                  v-if="item.direction === 1 && item.open < item.new_price">
                                {{ $util.float(item.amount * item.dep.up) }} USDT
                            </text>

                            <text class="font-14 price_down font-weight"
                                  v-if="item.direction === -1 && item.open <= item.new_price">
                                {{ $util.float(item.amount * item.dep.up) }} USDT
                            </text>
                            <text class="font-14 price_down font-weight"
                                  v-if="item.direction === -1 && item.open > item.new_price">
                                {{ $util.float(item.amount * item.dep.down) }} USDT
                            </text>
                        </view>
                        <view class="list-item-cell">
                            <fui-count-down background="var(--background-primary)"
                                            borderColor="var(--background-primary)"
                                            color="var(--content-primary)"
                                            colonColor="var(--color-text-dark-gray)"
                                            size="24rpx"
                                            :isDays="false"
                                            :isHours="false"
                                            :isMs="false"
                                            isColon
                                            msWidth="40"
                                            :value="item.seconds"
                                            :autoStart="true"
                                            @end="timeOut" ref="countdown">
                            </fui-count-down>
                            <view class="progress">
                                <fui-progress :percent="item.rate"
                                              background="var(--color-gray-bg)"
                                              activeColor="var(--blue)">
                                </fui-progress>
                            </view>
                        </view>
                    </view>
                    <view style="height: 400rpx"></view>
                </scroll-view>
            </template>
            <!--    历史记录   -->
            <template v-if="current === 1">
                <scroll-view scroll-y class="scroll-view" :style="{'height': scrollHeight + 'px'}">

                    <view class="list-desc" v-if="isLogin">
                        <text class="font-12 color-gray">
                            {{ historys['date'] }}
                        </text>
                        <text class="font-12 color-gray">
                            {{ historys['count'] }} {{ $t('futures.t7') }}
                        </text>
                        <view class="flex align-center" @click="$refs.profit.open()">
                            <text class="font-12 price_down mr-5">
                                {{ $util.float(historys['total']) }} USDT
                            </text>
                            <fui-icon name="more-fill" size="38" color="var(--content-primary)"></fui-icon>
                        </view>
                    </view>
                    <view class="not-date" v-if="historys.list && historys.list.length === 0">
                        <fui-empty :src="`/static/newImage/notData-${userTheme}.png`"
                                   :width="200"
                                   :height="200"
                                   :descrColor="'var(--color-text-dark-gray)'"
                                   :descr="$t('list.not_data')">
                        </fui-empty>
                    </view>
                    <view class="list-item" v-for="(item,index) in historys['list']" :key="'h'+item.id"
                          @click="showInfo(index)">
                        <view class="list-item-cell">
                            <view class="flex align-center">
                                <fui-tag v-if="item.direction === -1" :padding="['8rpx','10rpx']" :isBorder="false"
                                         :radius="4" :marginRight="10" type="danger" theme="dark"
                                         :text="$t('futures.t3')">
                                </fui-tag>
                                <fui-tag v-else :padding="['8rpx','10rpx']" :isBorder="false" :radius="4"
                                         :marginRight="10" type="success" theme="dark" :text="$t('futures.t4')">
                                </fui-tag>
                                <text class="font-14 color-black font-weight mr-5">
                                    {{ item.created_at.split(' ')[1] }}
                                </text>
                                <text class="font-12 color-gray">
                                    {{ item.currency.symbol }}/USDT-{{ item.dep.interval }}{{ $t('futures.t1') }}
                                </text>
                            </view>
                        </view>
                        <view class="list-item-cell">
                            <text class="font-14 color-black align-text">
                                USDT
                            </text>
                            <text class="font-14 color-black align-text">
                                {{ item.direction === 1 ? item.dep.up * 100 : item.dep.down * 100 }}%
                            </text>
                            <text class="font-14 color-black align-text">
                                {{ $util.float(item.profit) }}
                            </text>
                        </view>
                        <view class="list-item-cell">
                            <text class="font-12 color-gray align-text">
                                {{ $t('futures.t8') }}
                            </text>
                            <text class="font-12 color-gray align-text">
                                {{ $t('futures.t9') }}
                            </text>
                            <text class="font-12 color-gray align-text">
                                {{ $t('futures.t10') }}
                            </text>
                        </view>

                    </view>
                    <view style="height: 400rpx"></view>
                </scroll-view>
            </template>
        </view>

        <view class="footer-box">
            <!-- <view class="footer-box-cell">
                <text class="font-12 color-gray">
                    {{$t('futures.t11')}}
                </text>
                <view class="flex align-center justify-end">
                    <text class="font-12 color-black font-weight" v-if="isLogin">
                        {{$t('futures.t12')}} {{$util.float(balance)}} USDT
                    </text>
                    <text class="font-12 color-black font-weight" @click="$mroute.login()" v-else>
                        {{$t('futures.t13')}}
                    </text>
                    <image v-if="isLogin" @click="$mroute.exchange()"
                           class="transfer-icon"
                           src="/static/newImage/transfer.png"
                           mode="widthFix">
                    </image>
                </view>
            </view>
            <view class="footer-box-button">
                <view class="tag-item"
                      @click="btnindex = index"
                      :class="btnindex === index ? 'tag-item-active' : ''"
                      v-for="(item,index) in dep" :key="index">
                    <text class="font-12"
                          :class="btnindex === index ? 'color-white' : 'color-gray'">
                        {{ item.amount }}U
                    </text>
                </view>
            </view>
            <view class="footer-box-cell mt-10">
                <view class="flex align-center">
                    <text class="font-12 color-gray mr-5">
                        {{$t('futures.t14')}}
                    </text>
                    <fui-icon name="help-fill" size="32" color="var(--color-text-dark-gray)" @click="$refs.notice.open()"></fui-icon>
                </view>
            </view> -->
            <view class="footer-box-button">
                <template v-if="isLogin">
                    <view class="button">
                        <!-- @click="order(1)" -->
                        <fui-button @click="buyPopupShow = true;direction=1"
                                    height="78rpx"
                                    radius="10rpx"
                                    size="28"
                                    background="var(--green)">
                            {{ $t('futures.t4') }}
                        </fui-button>
                    </view>
                    <view class="button">
                        <!-- @click="order(-1)" -->
                        <fui-button @click="buyPopupShow = true;direction=-1"
                                    height="78rpx"
                                    radius="10rpx"
                                    size="28"
                                    background="var(--red)">
                            {{ $t('futures.t3') }}
                        </fui-button>
                    </view>
                </template>
                <view style="width: 100%;" v-else>
                    <view class="button" style="margin: auto;">
                        <!-- @click="order(1)" -->
                        <fui-button height="78rpx"
                                    radius="10rpx"
                                    size="28"
                                    background="var(--green)">
                            {{ $t('futures.t13') }}
                        </fui-button>
                    </view>
                </view>
            </view>
        </view>

        <!-- 新增弹窗 -->
        <fui-bottom-popup background="var(--background-primary)" :show="buyPopupShow" @close="buyPopupShow = false">
            <view class="fui-popup-warp" :class="userTheme">
                <view class="popupTitle">
                    <view class="closeIcon" @click="buyPopupShow = false">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popupContent">
                    <view class="title">
                        <text class="font-15 color-black font-weight">
                            {{ $t('futures.tt1') }}（{{ currentCurrency['symbol'] }}/USDT-F）{{ $t('futures.tt2') }}
                        </text>
                    </view>
                    <view class="cell">
                        <text class="font-13 color-gray">
                            {{ $util.getDateTimeAddTime(1) }}
                        </text>
                        <text class="font-13 color-black font-weight">
                            {{ seconds }}
                        </text>
                    </view>
                    <view class="label">
                        <text class="font-13 color-gray">
                            {{ $t('futures.tt3') }}
                        </text>
                        <view style="display: flex;width: 100%;flex-flow: wrap;">
                            <template v-for="(item,index) in dep" :key="'dep'+item.id">
                                <view class="tagBox" style="width: 100px; margin: 5px;" @click="depActive=index">
                                    <view class="tagBtn" :class="{'tagBtn-selected':depActive===index}"
                                          style="width: 100%;">
                                        <text class="font-12 color-black">
                                            {{ dep[index]['interval'] }}{{ $t('futures.tt5') }}
                                        </text>
                                        <text class="font-12 color-black">
                                            {{
                                                $t('futures.tt4')
                                            }}{{
                                                direction === 1 ? $util.float(dep[index]['up'] * 100) : $util.float(dep[index]['down'] * 100)
                                            }}%
                                        </text>
                                    </view>
                                </view>
                            </template>
                        </view>

                    </view>
                    <view class="label">
                        <text class="font-13 color-gray">
                            {{ $t('futures.tt6') }}
                        </text>
                        <view class="label-input">
                            <fui-dropdown-menu :background="'var(--background-primary)'" :size="26" :maxHeight="270"
                                               :radius="10" :padding="'24rpx'"
                                               color="var(--content-primary)"
                                               :selectedColor="'var(--color-primary)'"
                                               :minWidth="100" :isCheckbox="false" :options="coinList"
                                               @click="rangeItemClick" @close="rangeClose" ref="ddmRange">
                                <view class="coinType" @tap="filterTap">
                                    <text class="font-13 color-black font-weight">{{ selectVal }}</text>
                                    <fui-icon name="arrowdown" size="38" color="var(--text-black)"></fui-icon>
                                </view>
                            </fui-dropdown-menu>
                            <input type="digit" v-model="amount" :placeholder="$t('futures.tt7')"
                                   placeholder-class="placeholder">
                        </view>
                        <view class="numGroup">
                            <view class="numTag" @click="activeIndex = index;amount=[100, 200, 300, 500][index]"
                                  :class="activeIndex == index ? 'numTag-active' : ''"
                                  v-for="(item,index) in [100, 200, 300, 500]" :key="index">
                                <text class="font-13">{{ item }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="cell">
                        <text class="font-12 color-black">

                        </text>
                        <text class="font-12 color-black">
                            {{ $t('futures.tt8') }}：{{ $util.float(balance) }}
                        </text>
                    </view>
                    <view class="buttonBox">
                        <fui-button @click="order(direction)" height="78rpx" radius="78rpx" size="26"
                                    color="var(--content-always-white)"
                                    background="var(--content-trade-sell)" :text="$t('futures.tt9')">
                        </fui-button>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>

        <!-- 价格说明 -->
        <uni-popup type="center" ref="notice">
            <view class="popup-box">
                <text class="font-13 color-gray">{{ $t('futures.t15') }}</text>
                <text class="font-13 color-gray">{{ $t('futures.t16') }}</text>
                <text class="font-13 color-gray">{{ $t('futures.t17') }}</text>
            </view>
        </uni-popup>
        <alert ref="alert" :title="$t('login.tip_t2')" :ctxt="$t('取消')" :content="content"></alert>
        <loading ref="loading"></loading>
        <!-- 单次盈亏详情 -->
        <uni-popup type="center" ref="info">
            <view class="popup-box">

                <view class="pd-15">
                    <view class="flex acenter">
                        <view style="width: 70%;">
                            <text
                                class="font-13 color-black font-weight">{{ currentCurrency['symbol'] }}/USDT-F
                            </text>

                        </view>
                        <view style="width: 30%;text-align: right;">
                            <image @click="$refs.info.close()" style="width: 25px;height: 25px;"
                                   src="../../../static/img/close2.png" mode=""></image>
                        </view>
                    </view>
                    <view class="mt-15 bg-gray">
                        <view class="mt-15">
                            <!-- <text class="font-12 mt-10 block color-999">{{ currentOrder['created_at'] }}</text> -->
                        </view>
                        <view class="flex acenter">
                            <view class="wr-50">
                                <view class="mt-5">
                                    <text class="font-13 font-weight price_up block" v-if="currentOrder['direction'] === 1">
                                        {{ currentOrder['direction'] === 1 ? $t('futures.t4') : $t('futures.t3') }}
                                    </text>
									<text class="font-13 font-weight price_up block" style="color:red !important" v-else>
									    {{ currentOrder['direction'] === 1 ? $t('futures.t4') : $t('futures.t3') }}
									</text>
                                    <text class="font-12 color-999 block mt-5">{{ $t('futures.t18') }}</text>
                                </view>
                            </view>
                            <view class="wr-50 " style="text-align: center;">
                                <text class="font-13 font-weight price_up block" v-if="currentOrder['profit'] >= 0">
                                    {{ $util.float(currentOrder['profit']) }}
                                </text>
								<text class="font-13 font-weight price_up block" style="color:red !important" v-if="currentOrder['profit'] < 0">
								    {{ $util.float(currentOrder['profit']) }}
								</text>
                                <text class="font-12 color-999 block mt-5">{{ $t('futures.t19') }}</text>
                            </view>
                        </view>
                        <view class="flex acenter mt-10">
                            <view class="wr-50">
                                <view class="mt-5">
                                    <text class="font-13 font-weight color-black block">
                                        {{ $util.float(currentOrder['open']) }}
                                        /
                                        {{ $util.float(currentOrder['close']) }}
                                    </text>
                                    <text class="font-12 color-999 block mt-5">{{ $t('futures.t20') }}</text>
                                </view>
                            </view>
                            <view class="wr-50 " style="text-align: center;">
                                <text class="font-13 font-weight price_up block">
                                    {{
                                        currentOrder['direction'] === 1 ? currentOrder['dep']['up'] * 100 : currentOrder['dep']['down'] * 100
                                    }}
                                    %
                                </text>
                                <text class="font-12 color-999 block mt-5">{{ $t('futures.t21') }}</text>
                            </view>
                        </view>
                        <view class="flex acenter mt-10">
                            <view class="wr-50">
                                <view class="mt-5">
                                    <text class="font-13 font-weight color-black block">USDT</text>
                                    <text class="font-12 color-999 block mt-5">{{ $t('futures.t22') }}</text>
                                </view>
                            </view>
                            <view class="wr-50 " style="text-align: center;">
                                <text class="font-13 font-weight price_up block">
                                    {{
                                        parseFloat(currentOrder['profit']) <= 0 ? $t('futures.t23') : $t('futures.t30')
                                    }}
                                </text>
                                <text class="font-12 color-999 block mt-5">{{ $t('futures.t24') }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </uni-popup>
        <!-- 单日盈亏统计 -->
        <uni-popup type="bottom" ref="profit">
            <view class="popup-warp">
                <view class="popup-warp-title">
                    <text class="font-16 color-black font-weight">
                        {{ $t('futures.t25') }}
                    </text>
                    <view class="close" @click="$refs.profit.close()">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popup-warp-content">
                    <view class="popup-warp-content-cell">
                        <text class="font-12 color-gray">
                            {{ historys.date }}
                        </text>
                        <text class="font-12 color-gray">
                            {{ historys.count }} {{ $t('futures.t7') }}
                        </text>
                    </view>
                    <view class="popup-warp-content-card">
                        <view class="flex flex-column">
                            <text class="font-14 color-black font-weight">
                                {{ $t('futures.t26') }}
                            </text>
                            <text class="font-12 color-gray mt-5">
                                {{ $t('futures.t27') }}
                            </text>
                        </view>
                        <text class="font-16 price_down font-weight">
                            {{ $util.float(historys.total) }} USDT
                        </text>
                    </view>
                </view>
            </view>
        </uni-popup>
        <!-- 币种选择 -->
        <uni-drawer ref="showSelect" mode="left" :showrAudus="true" :width="$device.windowWidth*0.8"
                    style="z-index: 10002;">
            <view class="drawer">
                <view class="status_bar"></view>
                <view class="title">
                    <text class="font-16 color-black font-weight">
                        {{ $t('futures.t28') }}
                    </text>
                </view>
                <view class="drawer-search">
                    <fui-icon name="search" size="34" color="var(--color-text-dark-gray)"></fui-icon>
                    <input type="text" @confirm="search" v-model="searchValue" @input="input"
                           :placeholder="$t('futures.t29')" placeholder-class="placeholder">
                </view>
                <scroll-view scroll-y class="drawer-bottom" :style="{'height': ($device.windowHeight - 110) + 'px'}">
                    <view class="drawer-coin-cell" v-for="(item,index) in currency" :key="index"
                          @click="setCurrent(index)">
                        <view class="left">
                            <text class="font-14 color-black font-weight">
                                {{ item['symbol'] }}/USDT
                            </text>
                        </view>
                        <view class="right">
                            <text class="font-13 font-weight"
                                  :class="{'price_up':item['change_rate'] >= 0,'price_down':item['change_rate'] < 0}">
                                {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                            </text>
                            <text class="font-13 font-weight"
                                  :class="{'price_up':item['change_rate'] >= 0,'price_down':item['change_rate'] < 0}">
                                {{ $util.thousandSeparator(item['change_rate']) }}%
                            </text>
                        </view>
                    </view>
                    <view style="height: 240rpx;"></view>
                </scroll-view>
            </view>
        </uni-drawer>
    </view>
</template>

<script>
import service from './service.js';

export default service;
</script>

<script module="render" lang="renderjs">
import controller from './render.js';
export default controller;
</script>

<style lang="scss" scoped>
@import "futures";
</style>

<style scoped>
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
    padding-left: 0;
    padding-right: 40rpx;
}

/deep/ .fui-dropdown__menu-list {
    margin-top: 20rpx;
    padding: 10rpx;
    box-sizing: border-box;
}

/deep/ .fui-dropdown__menu-item {
    background-color: transparent;
    border-radius: 10rpx;
}

/deep/ .fui-dropdown__menu-list .fui-dropdown__menu-item:active {
    background-color: var(--color-gray-bg) !important;
}
.list-item-cell {
    display: flex;
    justify-content: space-between;
}

.align-text {
    width: 100px; /* 设定固定宽度，根据实际需求调整 */
    text-align: center; /* 让内容居中对齐 */
}

</style>