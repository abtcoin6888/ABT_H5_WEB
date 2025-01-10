<template>
    <view class="newContract" :data-theme="userTheme">
        <view class="page-bar">
            <view class="status-bar"></view>
            <view class="nav-content"
                  :class="scrollTop > 50 ? 'nav-content-hide' : 'nav-content-show'">
                <!--     -->
                <view class="scroll-bar"
                      :class="{'scroll-bar-hide': scrollTop > 50}">
                    <scroll-view class="scroll-view"
                                 scroll-x="true"
                                 enable-flex="true"
                                 show-scrollbar="false"
                                 scroll-with-animation="true"
                                 :scroll-into-view="`scrollTab${scrollTabIndex}`">
                        <view class="item"
                              :id="`scrollTab${index+1}`"
                              v-for="(item,index) in scrollTabs" :key="index"
                              @click="scrollTabIndex = index">
                            <text class="font-15 font-weight"
                                  :class="scrollTabIndex == index ? 'color-black' : 'color-gray'">
                                {{ item }}
                            </text>
                        </view>
                    </scroll-view>
                    <image class="button-icon"
                           :src="`/static/img/newContract/apo-${userTheme}.png`"
                           mode="widthFix"
                           @click="$mroute.toTactic()">
                    </image>
                </view>
                <!--     -->
                <view class="title-bar">
                    <view class="row">
                        <view class="row-item">
                            <text class="font-16 color-black font-bold">
                                BTC/USDT
                            </text>
                            <image class="down-icon"
                                   :src="`/static/img/tactic/down-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                        <view class="row-item">
                            <image class="button-icon"
                                   :src="`/static/img/newContract/kline-icon-${userTheme}.webp`"
                                   mode="widthFix">
                            </image>
                            <image class="button-icon"
                                   :src="`/static/img/newContract/more-${userTheme}.png`"
                                   mode="widthFix"
                                   @click="moreVisible = true">
                            </image>
                        </view>
                    </view>
                    <view class="row">
                        <view class="row-item">
                            <text class="font-11 color-gray">
                                {{ $t('contract.p1') }}
                            </text>
                            <text class="font-11 price_up">
                                2.36%
                            </text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <scroll-view scroll-y="true"
                     show-scrollbar="false"
                     class="scroll-body"
                     :style="`height: ${bodyHeight}px`"
                     @scroll="bodyScroll">
            <view class="body-head">
                <view class="toggle-box">
                    <!--   保证金模式/杠杆按钮   -->
                    <view class="down-group">
                        <view class="down-group-item"
                              @click="marginModel = true">
                            <text class="font-11 color-black">
                                {{ $t('contract.pall') }}
                            </text>
                            <image class="down-icon"
                                   :src="`/static/img/tactic/down-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                        <view class="down-group-item"
                              @click="leverVisible = true">
                            <text class="font-11 color-black">
                                50X
                            </text>
                            <image class="down-icon"
                                   :src="`/static/img/tactic/down-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                    </view>
                    <!--   开仓/平仓按钮   -->
                    <view class="mini-group">
                        <view class="mini-button"
                              @click="direction = 1">
                            <text class="font-12"
                                  :class="direction == 1 ? 'color-black' : 'color-gray'">
                                {{ $t('contruct.open_position') }}
                            </text>
                        </view>
                        <view class="mini-button"
                              @click="direction = 2">
                            <text class="font-12"
                                  :class="direction == 2 ? 'color-black' : 'color-gray'">
                                {{ $t('contruct.close_position') }}
                            </text>
                        </view>
                        <view class="background-box"
                              :style="`left: ${direction == 1 ? '4rpx' : '205rpx'}`">
                        </view>
                    </view>
                    <!--   下单模式   -->
                    <fui-dropdown-menu :size="24"
                                       :minWidth="395"
                                       :radius="8"
                                       background="var(--background-secondary-100)"
                                       color="var(--content-primary)"
                                       :isCheckbox="false"
                                       selectedColor="var(--color-primary)"
                                       :options="modeOptions"
                                       @click="orderModeChange"
                                       ref="orderMode">
                        <view class="select-box"
                              @tap="$refs.orderMode.show()">
                            <image class="down-icon"
                                   :src="`/static/img/newContract/tip-${userTheme}.png`"
                                   mode="widthFix"
                                   @click.stop="orderModeVisible = true">
                            </image>
                            <text class="font-12 color-black">
                                {{ orderModeVal }}
                            </text>
                            <image class="down-icon"
                                   :src="`/static/img/tactic/down-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                    </fui-dropdown-menu>
                    <!--   高级限价单显示 -->
                    <template v-if="orderModeIndex == 1">
                        <view class="select-box">
                            <text class="font-12 color-black">
                                只做 Maker
                            </text>
                            <image class="down-icon"
                                   :src="`/static/img/tactic/down-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                    </template>
                    <!--   价格输入框(限价单/高级限价显示)   -->
                    <template v-if="orderModeIndex <= 1 ">
                        <view class="price-input">
                            <view class="input-content">
                                <input class="color-black"
                                       type="number"
                                       @focus="priceFocus = true"
                                       @blur="priceFocus = false"
                                       placeholder="价格"
                                       placeholder-class="placeholder">
                                <view class="mini-button">
                                    <fui-icon name="minus"
                                              size="44"
                                              color="var(--content-primary)">
                                    </fui-icon>
                                    <view class="line"></view>
                                    <fui-icon name="plus"
                                              size="44"
                                              color="var(--content-primary)">
                                    </fui-icon>
                                </view>
                            </view>
                            <view class="after-box"
                                  v-if="priceFocus">
                                <view class="after-content">
                                    <view class="row">
                                        <text class="font-11 color-gray">
                                            最高买价
                                        </text>
                                        <text class="font-11 price_up">
                                            0.58760
                                        </text>
                                    </view>
                                    <view class="row">
                                        <text class="font-11 color-gray">
                                            最低卖价
                                        </text>
                                        <text class="font-11 price_down">
                                            0.58760
                                        </text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </template>
                    <!--   市价单显示 -->
                    <template v-if="orderModeIndex == 2">
                        <view class="disabled-box">
                            <text class="font-12 color-gray">
                                最优追价
                            </text>
                        </view>
                    </template>
                    <!--   计划委托显示 -->
                    <template v-if="orderModeIndex == 3">
                        <view class="input-group-box">
                            <view class="row">
                                <view class="row-input">
                                    <input type="number"
                                           placeholder="触发价"
                                           placeholder-class="placeholder">
                                </view>
                                <view class="row-down">
                                    <text class="font-12 color-black">
                                        市场
                                    </text>
                                    <image :src="`/static/img/tactic/down-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                            </view>
                            <view class="row">
                                <view class="row-input">
                                    <input type="number"
                                           placeholder="执行价格"
                                           placeholder-class="placeholder">
                                </view>
                                <view class="row-down">
                                    <text class="font-12 color-black">
                                        市价
                                    </text>
                                </view>
                            </view>
                        </view>
                    </template>
                    <!--   追踪委托显示 -->
                    <template v-if="orderModeIndex == 4">
                        <view class="input-group-box">
                            <view class="row">
                                <view class="row-input">
                                    <input type="number"
                                           placeholder="触发价"
                                           placeholder-class="placeholder">
                                </view>
                                <view class="row-down">
                                    <text class="font-12 color-black">
                                        市场
                                    </text>
                                    <image :src="`/static/img/tactic/down-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                            </view>
                            <view class="row">
                                <view class="input-box">
                                    <text class="font-10 color-gray placeholder-text">
                                        回调幅度(%)
                                    </text>
                                    <input type="number"
                                           v-model="camVal"
                                           @focus="camFocus = true"
                                           @blur="camFocus = false"
                                           :placeholder="camFocus ? '' : '回调幅度(0.01-10)'"
                                           placeholder-class="placeholder">
                                    <text class="font-12 color-black sysmol-text"
                                          v-if="camFocus == false">
                                        %
                                    </text>
                                </view>
                            </view>
                            <view class="row">
                                <view class="tag-group">
                                    <view class="item"
                                          :class="{'active': camVal == item}"
                                          v-for="(item,index) in [1, 5, 10]" :key="index"
                                          @click="camVal = item">
                                        <text class="font-11 color-black"
                                              :class="{'color-primary': camVal == item}">
                                            {{ item }}%
                                        </text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </template>
                    <!--   数量输入框   -->
                    <view class="number-box">
                        <text class="placeholder-text">
                            数量(XRP)
                        </text>
                        <input type="number"
                               @focus="numberFocus = true"
                               @blur="numberFocus = false"
                               :placeholder="numberFocus ? '' : $t('contruct.quantity')"
                               placeholder-class="placeholder">
                        <view class="down-box"
                              @click="contractUnit = true"
                              v-if="numberFocus == false">
                            <text class="font-12 color-black">
                                XRP
                            </text>
                            <image class="down-icon"
                                   :src="`/static/img/tactic/down-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                    </view>
                    <!--   滑块   -->
                    <view class="slider-box">
                        <view class="slider-dot">
                            <view class="active-box" :style="`width: ${rateValue*1}%`"></view>
                            <view class="dot" v-for="item in [0, 25, 50, 75, 100]"></view>
                        </view>
                        <view class="slider">
                            <slider activeColor="transparent"
                                    backgroundColor="transparent"
                                    block-color="var(--background-primary)"
                                    block-size="12"
                                    :value="rateValue"
                                    step="1"
                                    @change="sliderChange"
                                    @changing="sliderChange"/>
                        </view>
                        <view class="slider-number">
                            <text class="font-10"
                                  :class="rateValue >= item ? 'color-black' : 'color-gray'"
                                  v-for="item in [0, 25, 50, 75, 100]">
                                {{ item }}%
                            </text>
                        </view>
                    </view>
                    <!--   止盈/止损   -->
                    <view class="label-box">
                        <view class="label-top">
                            <view class="row"
                                  @click="profitLossType = !profitLossType">
                                <view class="checkbox"
                                      :class="{'checked': profitLossType}">
                                    <image src="/static/img/newContract/select-radius.png"
                                           mode="widthFix"
                                           v-if="profitLossType">
                                    </image>
                                </view>
                                <text class="font-11 color-black dashed-solid">
                                    止盈/止损
                                </text>
                            </view>
                            <view class="row" v-if="profitLossType">
                                <text class="font-11 color-primary">
                                    高级
                                </text>
                            </view>
                        </view>
                        <view class="label-bottom"
                              v-if="profitLossType">
                            <view class="row">
                                <view class="input-item">
                                    <text class="desc">
                                        止盈价
                                    </text>
                                    <input type="text"
                                           placeholder="止盈价"
                                           placeholder-class="placeholder">
                                </view>
                                <view class="input-item">
                                    <text class="desc">
                                        %
                                    </text>
                                    <input type="text"
                                           placeholder="%"
                                           placeholder-class="placeholder">
                                </view>
                            </view>
                            <view class="row">
                                <view class="input-item">
                                    <text class="desc">
                                        止损价
                                    </text>
                                    <input type="text"
                                           placeholder="止损价"
                                           placeholder-class="placeholder">
                                </view>
                                <view class="input-item">
                                    <text class="desc">
                                        %
                                    </text>
                                    <input type="text"
                                           placeholder="%"
                                           placeholder-class="placeholder">
                                </view>
                            </view>
                        </view>
                    </view>
                    <template v-if="isLogin">
                        <template v-if="direction == 1">
                            <!--   可用   -->
                            <view class="label-cell">
                                <text class="font-11 color-gray">
                                    可用
                                </text>
                                <view class="row">
                                    <text class="font-11 color-black font-weight">
                                        0.0000 USDT
                                    </text>
                                    <image class="exchange-icon"
                                           src="/static/img/tactic/tran-icon.png"
                                           mode="widthFix">
                                    </image>
                                </view>
                            </view>
                            <!--   可开   -->
                            <view class="label-cell">
                                <text class="font-11 color-gray dashed-solid">
                                    可开
                                </text>
                                <text class="font-11 color-gray">
                                    0 XRP
                                </text>
                            </view>
                            <!--   买入按钮   -->
                            <view class="button-box bg-green">
                                <text class="font-13 always-white font-weight">
                                    买入
                                </text>
                                <text class="font-10 always-white">
                                    -- USDT
                                </text>
                            </view>
                            <!--   可用   -->
                            <view class="label-cell">
                                <text class="font-11 color-gray dashed-solid">
                                    可开
                                </text>
                                <text class="font-11 color-gray">
                                    0 XRP
                                </text>
                            </view>
                            <!--   卖出按钮   -->
                            <view class="button-box bg-red">
                                <text class="font-13 always-white font-weight">
                                    卖出
                                </text>
                                <text class="font-10 always-white">
                                    -- USDT
                                </text>
                            </view>
                        </template>
                        <template v-if="direction == 2">
                            <!--   可平   -->
                            <view class="label-cell">
                                <text class="font-11 color-gray dashed-solid">
                                    可平
                                </text>
                                <text class="font-11 color-gray">
                                    0 XRP
                                </text>
                            </view>
                            <!--   平空按钮   -->
                            <view class="button-item bg-green">
                                <text class="font-13 always-white font-weight">
                                    平空
                                </text>
                            </view>
                            <!--   可平   -->
                            <view class="label-cell">
                                <text class="font-11 color-gray dashed-solid">
                                    可平
                                </text>
                                <text class="font-11 color-gray">
                                    0 XRP
                                </text>
                            </view>
                            <!--   平多按钮   -->
                            <view class="button-item bg-red">
                                <text class="font-13 always-white font-weight">
                                    平多
                                </text>
                            </view>
                        </template>
                    </template>
                    <template v-else>
                        <!--   登录按钮   -->
                        <view class="login-button"
                              @click="$mroute.login()">
                            <text class="font-13 font-weight">
                                {{ $t('contruct.lg') }}
                            </text>
                        </view>
                    </template>
                </view>
                <view class="data-box">
                    <!-- 资金费率 / 倒计时 -->
                    <view class="data-head">
                        <text class="font-10 color-gray dashed-solid">
                            {{ $t('contruct.funding_rate') }}/{{ $t('contruct.set_time') }}
                        </text>
                        <text class="font-11 color-black font-weight">
                            0.0094% / 04:04:47
                        </text>
                    </view>
                    <view class="data-list">
                        <!-- 描述(价格/数量) -->
                        <view class="list-desc">
                            <view class="item">
                                <text class="font-10 color-gray">
                                    {{ $t('contruct.price') }}
                                </text>
                                <text class="font-10 color-gray">
                                    (USDT)
                                </text>
                            </view>
                            <view class="item">
                                <text class="font-10 color-gray">
                                    {{ $t('contruct.quantity') }}
                                </text>
                                <text class="font-10 color-gray">
                                    (USDT)
                                </text>
                            </view>
                        </view>
                        <!-- Price_Up -->
                        <view class="list-row"
                              v-for="(item, index) in 7">
                            <view class="row-content">
                                <text class="font-11 price_up font-weight">
                                    0.57701
                                </text>
                                <text class="font-11 color-black font-weight">
                                    215
                                </text>
                            </view>
                            <view class="background-box bg-green"
                                  :style="`width: ${215 * 100}%`">
                            </view>
                        </view>
                        <!-- 标记价格 -->
                        <view class="list-price">
                            <view class="price-left">
                                <text class="font-13 font-bold color-black ">
                                    0.57648
                                </text>
                                <text class="font-10 color-gray dashed-solid">
                                    0.57648
                                </text>
                            </view>
                            <fui-icon name="arrowright"
                                      size="38"
                                      color="var(--content-primary)">
                            </fui-icon>
                        </view>
                        <!-- Price_Down -->
                        <view class="list-row"
                              v-for="(item, index) in 7">
                            <view class="row-content">
                                <text class="font-11 price_down font-weight">
                                    0.57648
                                </text>
                                <text class="font-11 color-black font-weight">
                                    0.57648
                                </text>
                            </view>
                            <view class="background-box bg-red"
                                  :style="`width: ${0.57648 * 100}%`">
                            </view>
                        </view>
                        <view class="list-footer">
                            <view class="icon-box">
                                <image class="toggle-icon"
                                       :src="`/static/img/newContract/toggle-own-${userTheme}.png`"
                                       mode="widthFix">
                                </image>
                            </view>
                            <view class="down-box bg-gray"
                                  @click="pointVisible = true">
                                <text class="font-11 color-black ">
                                    {{ pointVal }}
                                </text>
                                <image class="down-icon"
                                       :src="`/static/img/tactic/down-${userTheme}.png`"
                                       mode="widthFix">
                                </image>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="body-bottom"
                  :style="`height: ${swiperHeight}px`">
                <!--  列表选项卡  -->
                <view class="list-tabs">
                    <scroll-view scroll-x="true"
                                 class="tab-scroll">
                        <view class="item"
                              :class="{'active': listTabIndex == index}"
                              v-for="(item,index) in listTabs" :key="index"
                              @click="listTabIndex = index">
                            <text class="font-14 font-weight">
                                {{ item }}
                            </text>
                        </view>
                    </scroll-view>
                    <image class="order-icon"
                           :src="`/static/img/tactic/order-${userTheme}.png`"
                           mode="widthFix">
                    </image>
                </view>
                <!--  列表内容  -->
                <swiper class="list-swiper"
                        :duration="300"
                        :current="listTabIndex"
                        :style="`height: ${swiperHeight}px`"
                        @change="listTabIndex = $event.detail.current">
                    <!--  当前持仓  -->
                    <swiper-item class="list-swiper-item">
                        <scroll-view scroll-y="true"
                                     class="list-scoll-content">
                            <view class="desc-box">
                                <view class="label"
                                      @click="onlyCurrency = !onlyCurrency">
                                    <view class="checkbox"
                                          :class="{'checked': onlyCurrency}">
                                        <image src="/static/img/newContract/select-radius.png"
                                               mode="widthFix"
                                               v-if="onlyCurrency">
                                        </image>
                                    </view>
                                    <text class="font-11 color-black font-weight">
                                        只看当前
                                    </text>
                                </view>
                                <view class="close-button">
                                    <text class="font-11 color-black">
                                        全部平仓
                                    </text>
                                </view>
                            </view>
                            <view class="card-list">
                                <view class="card-item"
                                      v-for="i in 3">
                                    <!--  杠杆/币名  -->
                                    <view class="row">
                                        <view class="row-left">
                                            <fui-tag text="空"
                                                     :size="20"
                                                     :marginRight="5"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="var(--content-always-white)"
                                                     :background="'#03aac7'">
                                            </fui-tag>
                                            <text class="font-15 font-weight price_down mr-5">
                                                100X
                                            </text>
                                            <text class="font-15 font-weight color-black coin mr-5">
                                                BTCUSDT
                                            </text>
                                            <fui-tag text="全仓"
                                                     :size="20"
                                                     :marginRight="5"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     :color="userTheme == 'light' ? '#898989' : '#7a7a7a'"
                                                     :background="userTheme == 'light' ? '#f6f6f6' : '#282828'">
                                            </fui-tag>
                                            <fui-tag text="USDT"
                                                     :size="20"
                                                     :marginRight="5"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     :color="userTheme == 'light' ? '#898989' : '#7a7a7a'"
                                                     :background="userTheme == 'light' ? '#f6f6f6' : '#282828'">
                                            </fui-tag>
                                        </view>
                                        <view class="row-right">
                                            <image class="kline-icon"
                                                   :src="`/static/img/newContract/kline-icon-${userTheme}.webp`"
                                                   mode="widthFix">
                                            </image>
                                        </view>
                                    </view>
                                    <!--  未实现盈亏/回报率  -->
                                    <view class="row">
                                        <view class="column">
                                            <text class="font-12 color-gray desc">
                                                未实现盈亏(USDT)
                                            </text>
                                            <view class="row-cell">
                                                <text class="font-16 font-weight price_up">
                                                    0.0652
                                                </text>
                                                <text class="font-11 font-weight color-gray">
                                                    ≈￥0.46
                                                </text>
                                            </view>
                                        </view>
                                        <view class="column">
                                            <text class="font-12 color-gray desc">
                                                回报率
                                            </text>
                                            <view class="row-cell">
                                                <text class="font-16 font-weight price_up">
                                                    15.88%
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <!--  持仓/持仓均价/保证金比率  -->
                                    <view class="row">
                                        <view class="column">
                                            <view class="row-cell">
                                                <text class="font-12 color-gray desc">
                                                    持仓(BTC)
                                                </text>
                                                <image class="down-icon"
                                                       :src="`/static/img/tactic/down-${userTheme}.png`"
                                                       mode="widthFix">
                                                </image>
                                            </view>
                                            <view class="row-cell">
                                                <text class="font-13 font-weight color-black">
                                                    0.0652
                                                </text>
                                            </view>
                                        </view>
                                        <view class="column">
                                            <view class="row-cell">
                                                <text class="font-12 color-gray desc">
                                                    持仓均价
                                                </text>
                                            </view>
                                            <view class="row-cell">
                                                <text class="font-13 font-weight color-black">
                                                    0.0652
                                                </text>
                                            </view>
                                        </view>
                                        <view class="column">
                                            <view class="row-cell">
                                                <text class="font-12 color-gray desc">
                                                    保证金比率
                                                </text>
                                            </view>
                                            <view class="row-cell">
                                                <text class="font-13 font-weight color-black">
                                                    10.63%
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <!--  标记价格/预估强平价/保证金  -->
                                    <view class="row">
                                        <view class="column">
                                            <view class="row-cell">
                                                <text class="font-12 color-gray desc">
                                                    标记价格(USDT)
                                                </text>
                                            </view>
                                            <view class="row-cell">
                                                <text class="font-13 font-weight color-black">
                                                    0.0652
                                                </text>
                                            </view>
                                        </view>
                                        <view class="column">
                                            <view class="row-cell">
                                                <text class="font-12 color-gray desc">
                                                    预估强平价
                                                </text>
                                            </view>
                                            <view class="row-cell">
                                                <text class="font-13 font-weight color-black">
                                                    0.0652
                                                </text>
                                            </view>
                                        </view>
                                        <view class="column">
                                            <view class="row-cell">
                                                <text class="font-12 color-gray desc">
                                                    保证金
                                                </text>
                                            </view>
                                            <view class="row-cell">
                                                <text class="font-13 font-weight color-black">
                                                    0.4105
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <!--  止盈止损/反手/平仓(按钮)  -->
                                    <view class="card-footer border-top">
                                        <view class="button border-right"
                                              @click="advancedVisible = true">
                                            <text class="font-13 font-weight color-primary">
                                                止盈止损
                                            </text>
                                        </view>
                                        <view class="button border-right"
                                              @click="backhand = true">
                                            <text class="font-13 font-weight color-primary">
                                                反手
                                            </text>
                                        </view>
                                        <view class="button border-right"
                                              @click="closePositionVisible = true">
                                            <text class="font-13 font-weight color-primary">
                                                平仓
                                            </text>
                                        </view>
                                        <view class="share-button">
                                            <image class="share-icon"
                                                   :src="`/static/img/tactic/share-${userTheme}.png`"
                                                   mode="widthFix"
                                                   @click="shareVisible = true">
                                            </image>
                                        </view>
                                    </view>
                                </view>
                                <!--   占位 -->
                                <view class="ph-view"></view>
                            </view>
                        </scroll-view>
                    </swiper-item>
                    <!--  委托  -->
                    <swiper-item class="list-swiper-item">
                        <scroll-view scroll-y="true"
                                     class="list-scoll-content">
                            <!--  横向滚动选项卡-->
                            <scroll-view scroll-x="true"
                                         show-scrollbar="false"
                                         scroll-with-animation="true"
                                         :scroll-into-view="`miniTab${entrustTagIndex}`"
                                         class="mini-scroll-box">
                                <view class="item"
                                      :class="{'active': entrustTagIndex == index}"
                                      :id="`miniTab${index+1}`"
                                      v-for="(item,index) in entrustTags" :key="index"
                                      @click="entrustTagIndex = index">
                                    <text class="font-10 color-black">
                                        {{ item }}
                                    </text>
                                </view>
                            </scroll-view>
                            <view class="desc-box">
                                <view class="label"
                                      @click="onlyCurrency = !onlyCurrency">
                                    <view class="checkbox"
                                          :class="{'checked': onlyCurrency}">
                                        <image src="/static/img/newContract/select-radius.png"
                                               mode="widthFix"
                                               v-if="onlyCurrency">
                                        </image>
                                    </view>
                                    <text class="font-11 color-black font-weight">
                                        只看当前
                                    </text>
                                </view>
                                <view class="close-button">
                                    <text class="font-11 color-black">
                                        全部撤销
                                    </text>
                                </view>
                            </view>
                            <view class="card-list">
                                <view class="card-item"
                                      v-for="i in 3">
                                    <!--  杠杆/币名  -->
                                    <view class="row">
                                        <view class="row-left">
                                            <text class="font-15 font-weight price_down mr-5">
                                                开空
                                            </text>
                                            <text class="dot bg-red"></text>
                                            <text class="font-15 font-weight price_down mr-5">
                                                100X
                                            </text>
                                            <text class="font-15 font-weight color-black coin mr-5">
                                                BTCUSDT
                                            </text>
                                            <fui-tag text="USDT"
                                                     :size="20"
                                                     :marginRight="5"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     :color="userTheme == 'light' ? '#898989' : '#7a7a7a'"
                                                     :background="userTheme == 'light' ? '#f6f6f6' : '#282828'">
                                            </fui-tag>
                                        </view>
                                        <view class="row-right">
                                            <view class="mini-button"
                                                  @click="modifyOrderVisible = true">
                                                <text class="font-11 color-gray">
                                                    修改
                                                </text>
                                            </view>
                                            <view class="mini-button">
                                                <text class="font-11 color-gray">
                                                    撤销
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <!--  委托价格/委托数量/成交数量  -->
                                    <view class="row">
                                        <view class="column">
                                            <view class="row-cell">
                                                <text class="font-12 color-gray desc">
                                                    委托价格(USDT)
                                                </text>
                                            </view>
                                            <view class="row-cell">
                                                <text class="font-13 font-weight color-black">
                                                    0.0652
                                                </text>
                                            </view>
                                        </view>
                                        <view class="column">
                                            <view class="row-cell">
                                                <text class="font-12 color-gray desc">
                                                    委托数量(BTC)
                                                </text>
                                            </view>
                                            <view class="row-cell">
                                                <text class="font-13 font-weight color-black">
                                                    0.0652
                                                </text>
                                            </view>
                                        </view>
                                        <view class="column">
                                            <view class="row-cell">
                                                <text class="font-12 color-gray desc">
                                                    成交数量(BTC)
                                                </text>
                                            </view>
                                            <view class="row-cell">
                                                <text class="font-13 font-weight color-black">
                                                    0.000
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <!--  只减仓  -->
                                    <view class="row">
                                        <view class="column column-first">
                                            <text class="font-12 color-gray desc">
                                                只减仓
                                            </text>
                                            <view class="row-cell">
                                                <text class="font-13 font-weight color-black">
                                                    否
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <!--  时间/止盈止损  -->
                                    <view class="card-footer border-top">
                                        <view class="footer-content">
                                            <view class="card-footer-left">
                                                <text class="font-12 color-gray ">
                                                    2023-12-18 16:16:41
                                                </text>
                                            </view>
                                            <view class="card-footer-right">
                                                <text class="font-12 color-gray ">
                                                    止盈/止损
                                                </text>
                                                <text class="font-12 price_up ">
                                                    --
                                                </text>
                                                <text class="font-12  color-gray">/</text>
                                                <text class="font-12  price_down">
                                                    --
                                                </text>
                                                <image class="edit-icon"
                                                       :src="`/static/img/tactic/bj-${userTheme}.png`"
                                                       mode="widthFix">
                                                </image>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                <!--   占位 -->
                                <view class="ph-view"></view>
                            </view>
                        </scroll-view>
                    </swiper-item>
                    <!--  资产  -->
                    <swiper-item class="list-swiper-item">
                        <scroll-view scroll-y="true"
                                     class="list-scoll-content">
                            <view class="assets-list">
                                <view class="row">
                                    <view class="row-item">
                                        <text class="font-11 color-gray ">
                                            币种
                                        </text>
                                    </view>
                                    <view class="row-item">
                                        <text class="font-11 color-gray ">
                                            账户资产
                                        </text>
                                    </view>
                                    <view class="row-item">
                                        <text class="font-11 color-gray ">
                                            可用
                                        </text>
                                    </view>
                                </view>
                                <view class="row">
                                    <view class="row-item">
                                        <image class="coin-icon"
                                               src="/static/coin/usdt.png"
                                               mode="widthFix">
                                        </image>
                                        <text class="font-13 color-black font-weight">
                                            USDT
                                        </text>
                                    </view>
                                    <view class="row-item">
                                        <text class="font-13 color-black font-weight">
                                            20.38274642
                                        </text>
                                    </view>
                                    <view class="row-item">
                                        <text class="font-13 color-black font-weight">
                                            15.36864641
                                        </text>
                                    </view>
                                </view>
                            </view>
                        </scroll-view>
                    </swiper-item>
                </swiper>
            </view>
        </scroll-view>


        <!--    保证金模式    -->
        <fui-bottom-popup :show="marginModel"
                          :safeArea="false"
                          :background="userTheme === 'light' ? '#ffffff' : '#111111'"
                          @close="marginModel = false"
                          @toggle="hiddenTabbar"
        >
            <view class="popup-warp">
                <view class="popup-title">
                    <text class="font-15 font-weight color-black">
                        保证金模式
                    </text>
                    <fui-icon name="close"
                              size="48"
                              :color="userTheme === 'light' ? '#1f1f1f' : '#ffffff'"
                              @click="marginModel = false">
                    </fui-icon>
                </view>
                <view class="popup-container">
                    <!--    模式选项    -->
                    <view class="model-group">
                        <view class="button-item bg-gray"
                              :class="{'border-primary': modelActive === index}"
                              v-for="(item,index) in marginModelOption" :key="index"
                              @click="modelActive = index">
                            <text class="font-13 "
                                  :class="modelActive === index ? 'color-primary' : 'color-gray'">
                                {{ item }}
                            </text>
                            <image class="select-image"
                                   src="/static/img/tactic/select-primary.png"
                                   mode="widthFix"
                                   v-if="modelActive === index">
                            </image>
                        </view>
                    </view>
                    <!--    模式介绍    -->
                    <view class="model-content">
                        <view class="model-tip">
                            <text class="font-12 color-warring ">
                                调整保证金模式仅对当前合约币对生效
                            </text>
                        </view>
                        <fui-collapse-item :background="userTheme == 'light' ? '#ffffff' : '#111111'"
                                           :contentBg="userTheme == 'light' ? '#ffffff' : '#111111'"
                                           :borderColor="userTheme == 'light' ? '#ffffff' : '#111111'"
                                           :arrowColor="userTheme == 'light' ? '#898989' : '#7a7a7a'"
                                           :arrowRight="0"
                                           :open="true">
                            <view class="collapse-title">
                                <text class="font-14 font-weight color-black">
                                    什么是全仓和逐仓模式?
                                </text>
                            </view>
                            <template v-slot:content>
                                <view class="collapse-desc">
                                    <text class="desc-text font-12 color-gray ">
                                        全仓模式: 所有仓位共用合约账户中的保证金来避免仓位被强平.强平发生时,交易者可能会损失所有的保证金和仓位.
                                    </text>
                                    <text class="desc-text font-12 color-gray ">
                                        逐仓模式: 一定数量保证金被分配到仓位上.如果仓位保证金亏损到低于维持保证金的水平,仓位将被强平.在逐仓模式下,您可以为这个仓位添加和减少保证金.
                                    </text>
                                </view>
                            </template>
                        </fui-collapse-item>
                        <view class="confirm-button bg-black button-active" @click="setMarginModel">
                            <text class="font-13 font-weight color-white">
                                确认
                            </text>
                        </view>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--    合约单位设置    -->
        <fui-bottom-popup :show="contractUnit"
                          :background="userTheme == 'light' ? '#ffffff' : '#111111'"
                          @close="contractUnit = false">
            <view class="popup-warp">
                <view class="popup-title">
                    <text class="font-15 font-weight color-black">
                        合约单位设置
                    </text>
                    <fui-icon name="close"
                              size="48"
                              :color="userTheme == 'light' ? '#1f1f1f' : '#ffffff'"
                              @click="contractUnit = false">
                    </fui-icon>
                </view>
                <view class="popup-container">
                    <view class="radio-list">
                        <view class="radio-item border-solid"
                              :class="{'item-active': contractunitChecked == index}"
                              v-for="(item,index) in radioList" :key="index"
                              @click="radioChange(item)">
                            <view class="item-row title">
                                <text class="font-13 color-black font-weight">
                                    {{ item.title }}({{ item.type }})
                                </text>
                                <view class="checkbox border-solid"
                                      :class="{'checkbox-active': contractunitChecked == item.val}">
                                    <view class="before bg-green"
                                          v-if="contractunitChecked == item.val">
                                    </view>
                                </view>
                            </view>
                            <view class="item-row">
                                <text class="font-11 color-gray ">
                                    {{ item.desc }}
                                </text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--    调整杠杆    -->
        <fui-bottom-popup :show="leverVisible"
                          :safeArea="false"
                          :background="userTheme == 'light' ? '#ffffff' : '#111111'"
                          @close="leverVisible = false"
                          @toggle="hiddenTabbar"
        >
            <view class="popup-warp">
                <view class="popup-title">
                    <text class="font-15 font-weight color-black">
                        调整杠杆
                    </text>
                    <fui-icon name="close"
                              size="48"
                              :color="userTheme === 'light' ? '#1f1f1f' : '#ffffff'"
                              @click="leverVisible = false">
                    </fui-icon>
                </view>
                <view class="popup-container">
                    <!--   输入  -->
                    <view class="lever-box bg-gray">
                        <fui-input-number custom
                                          backgroundColor="transparent"
                                          :color="userTheme == 'light' ? '#1f1f1f' : '#ffffff'"
                                          :size="32"
                                          :width="534"
                                          :height="78"
                                          :min="1"
                                          :max="125"
                                          v-model="leverValue"
                                          margin="0">
                            <view class="mini-button">
                                <fui-icon name="minus"
                                          :size="48"
                                          :color="userTheme == 'light' ? '#1f1f1f' : '#ffffff'">
                                </fui-icon>
                            </view>
                            <template v-slot:plus>
                                <view class="mini-button">
                                    <fui-icon name="plus"
                                              :size="48"
                                              :color="userTheme == 'light' ? '#1f1f1f' : '#ffffff'">
                                    </fui-icon>
                                </view>
                            </template>
                        </fui-input-number>
                    </view>
                    <!--   滑块  -->
                    <view class="lever-slider">
                        <view class="slider-dot bg-gray">
                            <view class="active-box bg-black" :style="`width: ${leverValue * 5.48}rpx`"></view>
                            <view class="dot bg-light-gray" v-for="item in [1, 25, 50, 75, 100, 125]"></view>
                        </view>
                        <view class="slider">
                            <slider activeColor="transparent"
                                    backgroundColor="transparent"
                                    :block-color="userTheme === 'light' ? '#ffffff' : '#111111'"
                                    :block-size="15"
                                    :value="leverValue"
                                    :min="1"
                                    :max="125"
                                    :step="1"
                                    @change="leverSliderChange"
                                    @changing="leverSliderChange"/>
                        </view>
                        <view class="slider-number">
                            <text class="font-10 "
                                  :class="leverValue >= item ? 'color-black' : 'color-gray'"
                                  v-for="item in [1, 25, 50, 75, 100, 125]">
                                {{ item }}X
                            </text>
                        </view>
                    </view>
                    <!--   当前杠杆倍数最高可开  -->
                    <view class="lever-row">
                        <text class="font-12 color-black ">
                            当前杠杆倍数最高可开: 0.00 BTC
                        </text>
                    </view>
                    <!--   当前仓位所需保证金  -->
                    <view class="lever-row">
                        <text class="font-12 color-black ">
                            当前仓位所需保证金: 0.00 USDT
                        </text>
                    </view>
                    <!--   提示  -->
                    <view calss="lever-tip">
                        <text class="font-12 color-warring ">
                            可开数量同时受杠杆、价格、可用资金、仓位最大开仓量的限制
                        </text>
                    </view>
                    <view class="confirm-button bg-black button-active" @click="setLever">
                        <text class="font-13 font-weight color-white">
                            确认
                        </text>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--    下单模式介绍    -->
        <fui-bottom-popup :show="orderModeVisible"
                          :safeArea="false"
                          :background="userTheme == 'light' ? '#ffffff' : '#111111'"
                          @close="orderModeVisible = false"
                          @toggle="hiddenTabbar"
        >
            <view class="popup-warp">
                <view class="ordermode-tab border-bottom">
                    <scroll-view scroll-x="true"
                                 enable-flex="true"
                                 show-scrollbar="false"
                                 scroll-with-animation="true"
                                 :scroll-into-view="`mode${modeTabIndex}`"
                                 class="ordermode-scroll">
                        <view class="item"
                              :id="`mode${index + 1}`"
                              v-for="(item,index) in modeOptions" :key="index"
                              @click="modeTabIndex = index">
                            <text class="font-13 font-weight"
                                  :class="modeTabIndex == index ? 'color-black' : 'color-gray'">
                                {{ item }}
                            </text>
                            <view class="dot bg-black"
                                  v-if="modeTabIndex == index">
                            </view>
                        </view>
                    </scroll-view>
                    <fui-icon name="close"
                              size="48"
                              :color="userTheme == 'light' ? '#1f1f1f' : '#ffffff'"
                              @click="orderModeVisible = false">
                    </fui-icon>
                </view>
                <view class="ordermode-container">
                    <view class="tip-box">
                        <text class="font-12 color-warring font-weight">
                            图示说明（以买入为准）
                        </text>
                    </view>
                    <view class="image-group">
                        <image class="content-image"
                               src=""
                               mode="widthFix">
                        </image>
                    </view>
                    <view class="content-box">
                        <text class="font-12 color-gray ">

                        </text>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--    止盈止损    -->
        <fui-bottom-popup :show="advancedVisible"
                          :background="userTheme == 'light' ? '#ffffff' : '#111111'"
                          @close="advancedVisible = false">
            <view class="popup-warp">
                <view class="title-row border-bottom">
                    <text class="font-15 font-weight color-black">
                        止盈/止损
                    </text>
                    <fui-icon name="close"
                              size="48"
                              :color="userTheme == 'light' ? '#1f1f1f' : '#ffffff'"
                              @click="advancedVisible = false">
                    </fui-icon>
                </view>
                <view class="scroll-warp border-bottom">
                    <scroll-view scroll-x="true"
                                 show-scrollbar="false"
                                 scroll-with-animation="true"
                                 :scroll-into-view="`ad${advancedTabIndex}`"
                                 class="advanced-scroll">
                        <view class="item"
                              :id="`ad${index + 1}`"
                              v-for="(item,index) in advancedTabs" :key="index"
                              @click="advancedTabIndex = index">
                            <text class="font-13 "
                                  :class="advancedTabIndex == index ? 'color-black' : 'color-gray'">
                                {{ item }}
                            </text>
                            <view class="dot bg-black"
                                  v-if="advancedTabIndex == index">
                            </view>
                        </view>
                    </scroll-view>
                </view>
                <swiper class="advanced-swiper"
                        :current="advancedTabIndex"
                        :style="`height: ${advancedSwiperHeight}px`"
                        @change="advancedTabIndex = $event.detail.current">
                    <swiper-item class="advanced-swiper-item"
                                 :style="`height: ${advancedSwiperHeight}px`"
                                 v-for="item in advancedTabs.length">
                        <scroll-view scroll-y="true"
                                     class="advanced-scroll"
                                     :style="`height: ${advancedSwiperHeight}px`">
                            <view class="popup-container">
                                <view class="advanced-header border-bottom">
                                    <!--  币名/杠杆  -->
                                    <view class="row">
                                        <view class="row-left">
                                            <fui-tag text="空"
                                                     :size="20"
                                                     :marginRight="5"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     :background="'#03aac7'">
                                            </fui-tag>
                                            <text class="font-15 font-weight price_down">
                                                100X
                                            </text>
                                            <text class="font-15 color-black font-weight">
                                                BTCUSDT
                                            </text>
                                            <fui-tag text="全仓"
                                                     :size="20"
                                                     :marginRight="5"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     :color="userTheme == 'light' ? '#898989' : '#7a7a7a'"
                                                     :background="userTheme == 'light' ? '#f6f6f6' : '#282828'">
                                            </fui-tag>
                                        </view>
                                    </view>
                                    <!--  当前价格  -->
                                    <view class="row">
                                        <text class="font-12 color-gray ">
                                            当前价格
                                        </text>
                                        <text class="font-12 color-black font-weight">
                                            40999.2 USDT
                                        </text>
                                    </view>
                                    <!--  开仓均价  -->
                                    <view class="row">
                                        <text class="font-12 color-gray ">
                                            开仓均价
                                        </text>
                                        <text class="font-12 color-black font-weight">
                                            40999.2 USDT
                                        </text>
                                    </view>
                                    <!--  标记价格  -->
                                    <view class="row">
                                        <text class="font-12 color-gray ">
                                            标记价格
                                        </text>
                                        <text class="font-12 color-black font-weight">
                                            40999.2 USDT
                                        </text>
                                    </view>
                                    <!--  预估强平价格  -->
                                    <view class="row">
                                        <text class="font-12 color-gray ">
                                            预估强平价格
                                        </text>
                                        <text class="font-12 price_down font-weight">
                                            40999.2 USDT
                                        </text>
                                    </view>
                                </view>
                                <!--    止盈    -->
                                <view class="advanced-label">
                                    <view class="label-top">
                                        <view class="item">
                                            <text class="font-14 color-gray font-weight">
                                                止盈 ≤
                                            </text>
                                        </view>
                                        <view class="item">
                                            <text class="font-12 color-gray">
                                                市场
                                            </text>
                                            <image class="down-icon"
                                                   :src="`/static/img/tactic/down-${userTheme}.png`"
                                                   mode="widthFix">
                                            </image>
                                        </view>
                                    </view>
                                    <view class="label-box bg-gray">
                                        <input class="label-input " type="digit">
                                        <text class="font-13 color-black  desc">
                                            USDT
                                        </text>
                                    </view>
                                    <view class="label-slider">
                                        <view class="slider-dot bg-gray">
                                            <view class="active-box bg-green"
                                                  :style="`width: ${stopProfitVal * 3.45}rpx`"></view>
                                            <view class="dot bg-light-gray"
                                                  v-for="item in [0, 50, 100, 150, 200]"></view>
                                        </view>
                                        <view class="slider">
                                            <slider activeColor="transparent"
                                                    backgroundColor="transparent"
                                                    :block-color="userTheme == 'light' ? '#ffffff' : '#111111'"
                                                    block-size="15"
                                                    :value="stopProfitVal"
                                                    :min="0"
                                                    :max="200"
                                                    step="1"
                                                    @change="stopProfitChange"
                                                    @changing="stopProfitChange"/>
                                        </view>
                                        <view class="slider-number">
                                            <text class="font-10 "
                                                  :class="stopProfitVal >= item ? 'price_up' : 'color-gray'"
                                                  v-for="item in [0, 50, 100, 150, 200]">
                                                {{ item }}%
                                            </text>
                                        </view>
                                    </view>
                                    <view class="label-context">
                                        <text class="font-12 color-gray  desc-text">
                                            预期收益率为
                                            {{ stopProfitVal }}%
                                            ，当价格≤40231.0USDT时，将以市价平仓，数量为0.001BTC，预计收益为
                                            0.82104000USDT
                                        </text>
                                    </view>
                                </view>
                                <!--    止损    -->
                                <view class="advanced-label">
                                    <view class="label-top">
                                        <view class="item">
                                            <text class="font-14 color-gray font-weight">
                                                止损 ≥
                                            </text>
                                        </view>
                                        <view class="item">
                                            <text class="font-12 color-gray">
                                                市场
                                            </text>
                                            <image class="down-icon"
                                                   :src="`/static/img/tactic/down-${userTheme}.png`"
                                                   mode="widthFix">
                                            </image>
                                        </view>
                                    </view>
                                    <view class="label-box bg-gray">
                                        <input class="label-input " type="digit">
                                        <text class="font-13 color-black  desc">
                                            USDT
                                        </text>
                                    </view>
                                    <view class="label-slider">
                                        <view class="slider-dot bg-gray">
                                            <view class="active-box bg-red"
                                                  :style="`width: ${stopLossVal * 3.45}rpx`"></view>
                                            <view class="dot bg-light-gray"
                                                  v-for="item in [0, 50, 100, 150, 200]"></view>
                                        </view>
                                        <view class="slider">
                                            <slider activeColor="transparent"
                                                    backgroundColor="transparent"
                                                    :block-color="userTheme == 'light' ? '#ffffff' : '#111111'"
                                                    block-size="15"
                                                    :value="stopLossVal"
                                                    :min="0"
                                                    :max="200"
                                                    step="1"
                                                    @change="stopLossChange"
                                                    @changing="stopLossChange"/>
                                        </view>
                                        <view class="slider-number">
                                            <text class="font-10 "
                                                  :class="stopLossVal >= item ? 'price_down' : 'color-gray'"
                                                  v-for="item in [0, 50, 100, 150, 200]">
                                                {{ item }}%
                                            </text>
                                        </view>
                                    </view>
                                    <view class="label-context">
                                        <text class="font-12 color-gray  desc-text">
                                            预期收益率为 -{{ stopLossVal }}%，当价格≥40231.0USDT时，将以市价平仓，数量为0.001BTC，预计收益为
                                            0.82104000USDT
                                        </text>
                                    </view>
                                </view>
                                <view class="confirm-button bg-black button-active">
                                    <text class="font-13 font-weight color-white">
                                        确认
                                    </text>
                                </view>
                            </view>
                        </scroll-view>
                    </swiper-item>
                </swiper>
            </view>
        </fui-bottom-popup>
        <!--    平仓    -->
        <fui-bottom-popup :show="closePositionVisible"
                          :safeArea="false"
                          :background="userTheme == 'light' ? '#ffffff' : '#111111'"
                          @close="closePositionVisible = false">
            <view class="popup-warp">
                <view class="title-row border-bottom">
                    <text class="font-15 font-weight color-black">
                        平仓
                    </text>
                    <text class="font-13 color-gray "
                          @click="closePositionVisible = false">
                        关闭
                    </text>
                </view>
                <view class="popup-container">
                    <view class="closeposition-content">
                        <!--  币名/杠杆  -->
                        <view class="row">
                            <view class="row-left">
                                <fui-tag text="空"
                                         :size="20"
                                         :marginRight="5"
                                         :radius="3"
                                         color="var(--content-always-white)"
                                         :padding="['6rpx','8rpx']"
                                         :background="'#03aac7'">
                                </fui-tag>
                                <text class="font-15 font-weight price_down">
                                    100X
                                </text>
                                <text class="font-15 color-black font-weight">
                                    BTCUSDT
                                </text>
                                <fui-tag text="全仓"
                                         :size="20"
                                         :marginRight="5"
                                         :radius="3"
                                         :padding="['6rpx','8rpx']"
                                         :color="userTheme == 'light' ? '#898989' : '#7a7a7a'"
                                         :background="userTheme == 'light' ? '#f6f6f6' : '#282828'">
                                </fui-tag>
                            </view>
                        </view>
                        <!--  当前价格  -->
                        <view class="row">
                            <text class="font-12 color-gray ">
                                当前价格
                            </text>
                            <text class="font-12 color-black font-weight">
                                40999.2 USDT
                            </text>
                        </view>
                        <!--  开仓均价  -->
                        <view class="row">
                            <text class="font-12 color-gray ">
                                开仓均价
                            </text>
                            <text class="font-12 color-black font-weight">
                                40999.2 USDT
                            </text>
                        </view>
                        <!--  平仓价格  -->
                        <view class="column">
                            <text class="font-12 color-gray ">
                                平仓价格
                            </text>
                            <view class="row-box">
                                <view class="input-box bg-dark">
                                    <input class="input " type="text">
                                    <text class="font-13 color-gray  desc">
                                        USDT
                                    </text>
                                </view>
                                <view class="mini-button bg-gray">
                                    <text class="font-12 color-primary ">
                                        市价
                                    </text>
                                </view>
                            </view>
                        </view>
                        <!--  数量  -->
                        <view class="column">
                            <text class="font-12 color-gray ">
                                数量
                            </text>
                            <view class="number-box bg-gray">
                                <input class="input " type="text">
                                <text class="font-13 color-gray  desc">
                                    USDT
                                </text>
                            </view>
                        </view>
                        <!--  滑块  -->
                        <view class="closeposition-slider">
                            <view class="slider-dot bg-gray">
                                <view class="active-box" :style="`width: ${closePositionRate*6.9}rpx`"></view>
                                <view class="dot" v-for="item in [0, 25, 50, 75, 100]"></view>
                            </view>
                            <view class="slider">
                                <slider activeColor="transparent"
                                        backgroundColor="transparent"
                                        :block-color="userTheme == 'light' ? '#ffffff' : '#111111'"
                                        block-size="15"
                                        :value="closePositionRate"
                                        step="1"
                                        @change="closePositionSlider"
                                        @changing="closePositionSlider"/>
                            </view>
                        </view>
                        <!--  持仓  -->
                        <view class="row">
                            <text class="font-12 color-gray ">
                                持仓
                            </text>
                            <text class="font-12 color-gray ">
                                40999.2 BTC
                            </text>
                        </view>
                        <!--  委托订单  -->
                        <view class="row">
                            <text class="font-12 color-gray ">
                                委托订单
                            </text>
                            <text class="font-12 color-gray ">
                                40999.2 BTC
                            </text>
                        </view>
                        <!--  可平  -->
                        <view class="row">
                            <text class="font-12 color-gray ">
                                可平
                            </text>
                            <view class="row-right">
                                <text class="font-12 color-gray ">
                                    40999.2 BTC
                                </text>
                                <fui-icon name="info"
                                          size="26"
                                          :color="userTheme == 'light' ? '#898989' : '#7a7a7a'">
                                </fui-icon>
                            </view>
                        </view>
                        <!--  预估盈亏  -->
                        <view class="row">
                            <text class="font-12 color-gray ">
                                预估盈亏
                            </text>
                            <view class="row-column">
                                <text class="font-12 color-primary ">
                                    0.04360000
                                </text>
                                <text class="font-12 color-primary ">
                                    USDT(+10.62%)
                                </text>
                            </view>
                        </view>
                        <!--  包含预估平仓手续费  -->
                        <view class="row">
                            <text class="font-12 color-gray ">
                                包含预估平仓手续费
                            </text>
                            <text class="font-12 color-gray ">
                                40999.2 USDT
                            </text>
                        </view>
                        <view class="confirm-button bg-black button-active">
                            <text class="font-13 font-weight color-white">
                                确认
                            </text>
                        </view>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--    反手说明    -->
        <fui-bottom-popup :show="backhand"
                          :background="userTheme == 'light' ? '#ffffff' : '#111111'"
                          @close="backhand = false">
            <view class="popup-warp">
                <view class="title-row border-bottom">
                    <text class="font-15 font-weight color-black">
                        反手说明
                    </text>
                    <text class="font-13 color-gray "
                          @click="backhand = false">
                        关闭
                    </text>
                </view>
                <view class="popup-container">
                    <view class="backhand-tips">
                        <view class="tip-context">
                            <text class="font-13 color-black  tip-text">
                                说明：您的仓位将进行市价平仓，并反向开仓相同数量。如资金不足以开仓相同数量，则按照最大可开数量进行开仓。受保证金、行情等因素的影响，您的操作未必100%成功。
                            </text>
                        </view>
                        <view class="no-prompt">
                            <view class="checkbox bg-dark border-solid"
                                  :class="{'border-primary': prompt}"
                                  @click="prompt = !prompt">
                                <image class="check-icon"
                                       src="/static/img/tactic/check-s.png"
                                       mode="widthFix"
                                       v-if="prompt">
                                </image>
                            </view>
                            <text class="font-13 color-gray ">
                                不再提示
                            </text>
                        </view>
                        <view class="confirm-button bg-black button-active">
                            <text class="font-13 font-weight color-white">
                                确认
                            </text>
                        </view>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--    全部平仓    -->
        <fui-modal :buttons="[]"
                   width="600"
                   :boxRadius="16"
                   background="var(--background-primary)"
                   :show="closeAllPositions">
            <view class="close-all-warp">
                <image class="warning-image"
                       src="/static/img/newContract/tip-image.png"
                       mode="widthFix">
                </image>
                <view class="close-content">
                    <text class="font-16 color-black font-weight title">
                        全部平仓
                    </text>
                    <text class="font-13 color-gray  desc">
                        将以最优价平掉全部仓位。您确定要将所有仓位平仓吗？
                    </text>
                </view>
                <view class="close-buttons">
                    <view class="button-item bg-gray button-active"
                          @click="closeAllPositions = false">
                        <text class="font-13 color-black font-weight">
                            取消
                        </text>
                    </view>
                    <view class="button-item bg-black button-active">
                        <text class="font-13 color-white font-weight">
                            确认
                        </text>
                    </view>
                </view>
            </view>
        </fui-modal>
        <!--    解释说明弹出层    -->
        <fui-bottom-popup :show="explainVisible"
                          :background="userTheme == 'light' ? '#ffffff' : '#111111'"
                          @close="explainVisible = false">
            <view class="popup-warp">
                <view class="title-row border-bottom">
                    <text class="font-15 font-weight color-black"
                          v-if="explainType == 0">
                        止盈止损
                    </text>
                    <text class="font-15 font-weight color-black"
                          v-if="explainType == 1">
                        最大可开仓数量
                    </text>
                    <text class="font-15 font-weight color-black"
                          v-if="explainType == 2">
                        资金费用说明
                    </text>
                    <text class="font-15 font-weight color-black"
                          v-if="explainType == 3">
                        标记价格
                    </text>
                    <fui-icon name="close"
                              size="48"
                              :color="userTheme == 'light' ? '#1f1f1f' : '#ffffff'"
                              @click="explainVisible = false">
                    </fui-icon>
                </view>
                <view class="popup-container">
                    <template v-if="explainType == 0">
                        <view class="explain-content">
                            <text class="font-13 color-black  desc">
                                挂单后，默认将按照您的实际交易金额设置止盈止损单。如果您撤销挂单委托，预设的止盈止损单将同时失效。
                            </text>
                            <text class="font-13 color-black  desc">
                                若市场波动剧烈，触发止盈/止损的实际成交价可能与触发时刻的价格存在差异，止盈/止损单可能无法成交或无法完全成交。
                            </text>
                        </view>
                    </template>
                    <template v-if="explainType == 1">
                        <view class="explain-content">
                            <text class="font-13 color-black  desc">
                                可开数量同时受杠杆、价格、可用资金、仓位最大开仓量的限制。
                            </text>
                        </view>
                    </template>
                    <template v-if="explainType == 2">
                        <view class="explain-content">
                            <text class="font-13 color-black  desc">
                                资金费用 = 仓位价值 * 资金费率
                            </text>
                            <text class="font-13 color-black  desc">
                                每隔 8 小时，多头持仓者和空头持仓者将会产生资金费用。若结算后资金费率为正数，则多头持仓者向空头持仓者支付费用。如果资金费率为负数，则空头持仓者向多头持仓者支付费用。
                            </text>
                            <text class="font-13 color-black  desc">
                                注意：资金费率每 8 小时根据市场状况实时波动。在结算期间，将使用仓位价值来计算资金费用。
                            </text>
                        </view>
                    </template>
                    <template v-if="explainType == 3">
                        <view class="explain-content">
                            <text class="font-13 color-black  desc">
                                标记价格由实时指数价格和即将到来的资金费率决定，反映该合约当前的合理价格。标记价格用于计算仓位浮动盈亏和强平触发。
                            </text>
                        </view>
                    </template>
                </view>
            </view>
        </fui-bottom-popup>
        <!--    更多    -->
        <fui-bottom-popup :show="moreVisible"
                          background="var(--background-primary)"
                          @close="moreVisible = false">
            <view class="popup-warp">
                <view class="popup-title">
                    <text class="font-15 font-weight color-black">
                        更多
                    </text>
                    <fui-icon name="close"
                              size="48"
                              color="var(--content-primary)"
                              @click="moreVisible = false">
                    </fui-icon>
                </view>
                <view class="popup-container">
                    <view class="more-list">
                        <view class="item"
                              v-for="(item,index) in moreMenu" :key="index">
                            <view class="icon-box border-solid">
                                <image class="icon-item"
                                       :src="`/static/wallet/${item.iconName}-${userTheme}.png`"
                                       mode="widthFix">
                                </image>
                            </view>
                            <text class="font-11 color-black ">
                                {{ item.text }}
                            </text>
                        </view>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--    修改订单    -->
        <fui-bottom-popup :show="modifyOrderVisible"
                          :safeArea="false"
                          background="var(--background-primary)"
                          @close="modifyOrderVisible = false">
            <view class="popup-warp">
                <view class="popup-title">
                    <text class="font-15 font-weight color-black">
                        修改订单
                    </text>
                    <fui-icon name="close"
                              size="48"
                              color="var(--content-primary)"
                              @click="modifyOrderVisible = false">
                    </fui-icon>
                </view>
                <view class="popup-container">
                    <view class="modify-content">
                        <!--  币名  -->
                        <view class="row">
                            <view class="row-left">
                                <fui-tag text="空"
                                         :size="20"
                                         :marginRight="5"
                                         :radius="3"
                                         :padding="['6rpx','8rpx']"
                                         color="var(--content-always-white)"
                                         :background="'#03aac7'">
                                </fui-tag>
                                <text class="font-15 font-weight price_down mr-5">
                                    100X
                                </text>
                                <text class="font-15 color-black font-weight mr-5">
                                    BTCUSDT
                                </text>
                                <fui-tag text="全仓"
                                         :size="20"
                                         :marginRight="5"
                                         :radius="3"
                                         :padding="['6rpx','8rpx']"
                                         :color="userTheme == 'light' ? '#898989' : '#7a7a7a'"
                                         :background="userTheme == 'light' ? '#f6f6f6' : '#282828'">
                                </fui-tag>
                            </view>
                        </view>
                        <!--  当前价格  -->
                        <view class="row">
                            <text class="font-12 color-gray">
                                当前价格
                            </text>
                            <text class="font-12 color-black font-weight">
                                2246.22 USDT
                            </text>
                        </view>
                        <!--  委托价格  -->
                        <view class="row">
                            <text class="font-12 color-gray">
                                委托价格
                            </text>
                            <text class="font-12 color-black font-weight">
                                2246.22 USDT
                            </text>
                        </view>
                        <!--  委托数量  -->
                        <view class="row">
                            <text class="font-12 color-gray">
                                委托数量
                            </text>
                            <text class="font-12 color-black font-weight">
                                0.01 ETH
                            </text>
                        </view>
                        <!--  输入框  -->
                        <view class="input-box bg-gray">
                            <input class="input" type="text">
                            <text class="desc font-12 color-gray">
                                USDT
                            </text>
                        </view>
                        <view class="input-box bg-gray">
                            <input class="input " type="text">
                            <text class="desc font-12 color-gray">
                                ETH
                            </text>
                        </view>
                        <view class="tip-box">
                            <text class="color-warring font-11">
                                注意：受市场波动影响，一键撤单并重新挂单的修改功能，也存在无法成交或无法完全成功挂单的可能。
                            </text>
                        </view>
                        <view class="button-group">
                            <view class="button-item button-active bg-gray">
                                <text class="font-13 color-black ">
                                    取消
                                </text>
                            </view>
                            <view class="button-item button-active bg-black">
                                <text class="font-13 color-white ">
                                    确定
                                </text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--    委托展示深度    -->
        <fui-bottom-popup :show="pointVisible"
                          :safeArea="false"
                          :background="userTheme == 'light' ? '#ffffff' : '#111111'"
                          @close="pointVisible = false">
            <view class="popup-warp">
                <view class="popup-title">
                    <text class="font-15 font-weight color-black">
                        委托展示深度
                    </text>
                    <fui-icon name="close"
                              size="48"
                              :color="userTheme == 'light' ? '#1f1f1f' : '#ffffff'"
                              @click="pointVisible = false">
                    </fui-icon>
                </view>
                <view class="popup-container">
                    <view class="point-list">
                        <view class="row border-bottom"
                              v-for="(item,index) in pointList" :key="index"
                              @click="pointChange(item,index)">
                            <text class="font-12 color-black">
                                {{ item }}
                            </text>
                            <image class="select-icon"
                                   src="/static/img/tactic/check-select.png"
                                   mode="widthFix"
                                   v-if="pointActive == index">
                            </image>
                        </view>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--    分享海报    -->
        <fui-backdrop :show="shareVisible"
                      :closable="false"
                      zIndex="1000"
                      @click="shareVisible = false">
            <view class="share-warp" :style="`height: ${$device.windowHeight}px`">
                <view class="share-top">
                    <l-painter ref="dpainter"
                               :hidpi="true"
                               hybrid
                               isCanvasToTempFilePath
                               :pixel-ratio="2"/>
                </view>
                <view class="share-bottom">
                    <view class="menu-group">
                        <view class="item">
                            <view class="image-box">
                                <image class="item-image"
                                       src="/static/img/newContract/share-image.png">
                                </image>
                            </view>
                            <text class="font-11 color-black">
                                保存图片
                            </text>
                        </view>
                        <view class="item">
                            <view class="image-box">
                                <image class="item-image"
                                       src="/static/img/newContract/share-link.png">
                                </image>
                            </view>
                            <text class="font-11 color-black">
                                复制链接
                            </text>
                        </view>
                        <view class="item">
                            <view class="image-box">
                                <image class="item-image"
                                       src="/static/img/newContract/share-tw.png">
                                </image>
                            </view>
                            <text class="font-11 color-black">
                                Twitter
                            </text>
                        </view>
                        <view class="item">
                            <view class="image-box">
                                <image class="item-image"
                                       src="/static/img/newContract/share-tg.png">
                                </image>
                            </view>
                            <text class="font-11 color-black">
                                Telegram
                            </text>
                        </view>
                    </view>
                    <view class="button-group">
                        <view class="button button-active"
                              @click="shareVisible = false">
                            <text class="font-13 color-black">
                                取消
                            </text>
                        </view>
                        <view class="button button-active">
                            <text class="font-13 color-white">
                                更多分享
                            </text>
                        </view>
                    </view>
                </view>
            </view>
        </fui-backdrop>
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
import newContractVue from './newContractVue.js';

export default newContractVue;
</script>

<style lang="scss" scoped>
@import "newContractVue.scss";
</style>

<style scoped>
/* 下拉菜单 ======*/
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
        transform: translateY(102%) scale(1);
    }
    100% {
        transform: translateY(102%) scale(0);
    }
}

@keyframes ddmDownShow {
    0% {
        transform: translateY(102%) scale(0);
    }
    50% {
        transform: translateY(102%) scale(1);
    }
    75% {
        transform: translateY(102%) scale(0.9);
    }
    100% {
        transform: translateY(102%) scale(1);
    }
}

/deep/ .fui-dropdown__menu-list {
    padding: 8rpx !important;
    box-sizing: border-box;
    border-radius: 16rpx !important;
}

/deep/ .fui-dropdown__menu-item {
    height: 68rpx !important;
    padding: 0 6rpx !important;
    border-radius: 8rpx !important;
}

/deep/ .fui-dropdown__menu-list .fui-dropdown__menu-item:active {
    background-color: var(--background-dark);
}

/deep/ .fui-ddm__item-text {
    padding-left: 6rpx !important;
}

/* 下拉菜单 END ======*/

/* Slider 滑块 */
/deep/ uni-slider .uni-slider-handle,
/deep/ uni-slider .uni-slider-thumb {
    border-radius: 50% !important;
    box-shadow: 0 0 0 transparent !important;
}

/deep/ uni-slider .uni-slider-thumb {
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