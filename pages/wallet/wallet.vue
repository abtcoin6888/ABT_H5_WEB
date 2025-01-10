<template>
    <view class="wallet" :data-theme="userTheme">
        <!--    顶部导航  -->
        <fui-nav-bar padding="0"
                     zIndex="2"
                     background="var(--background-primary)"
                     statusBar
                     isFixed
                     isOccupy
                     custom
                     @init="navInit">
            <view class="nav-bar">
                <fui-tabs :isSlider="false"
                          :scale="1"
                          :tabs="tabOption"
                          :current="tab"
                          :short="false"
                          scroll
                          alignLeft
                          padding="0"
                          height="88"
                          size="30"
                          selectedSize="30"
                          color="var(--content-tertiary)"
                          selectedColor="var(--content-primary)"
                          background="var(--background-primary)"
                          @change="tabChange">
                </fui-tabs>
            </view>
        </fui-nav-bar>
        <swiper class="swiper"
                :current="tab"
                :duration="duration"
                :style="{'height': scrollHeight + 'px'}"
                @change="swiperChange"
                @transition="transition">
            <!--   总览/TAB0   -->
            <swiper-item class="swiper-item">
                <scroll-view :refresher-threshold="25"
                             :refresher-enabled="true"
                             refresher-default-style="none"
                             :refresher-triggered="refresherTriggered"
                             @refresherrefresh="onRefresh"
                             @refresherrestore="onRestore"
                             @refresherabort="onAbort"
                             @refresherpulling="onPulling"
                             scroll-y
                             refresher-background="var(--background-primary)"
                             class="scroll-view"
                             :style="{'height': scrollHeight + 'px'}">
                    <template v-if="_refresherShow">
                        <view class="refresher-box">
                            <image :class="refresherTriggered ? 'animation':''"
                                   src="/static/wallet/refresher.png"
                                   mode="">
                            </image>
                            <text class="font-13 font-weight color-gray">
                                {{ refresherText }}
                            </text>
                        </view>
                    </template>
                    <view class="scroll-head">
                        <view class="asset-val">
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-11 font-weight color-black">
                                        {{ $t('wallete.t1') }}
                                        {{ profit !== false ? $t('contract.ppt1') : '' }}
                                    </text>
                                    <image class="see-icon"
                                           :src="`/static/wallet/eye-${show ? 's' : 'h'}-${userTheme}.png`"
                                           mode="widthFix"
                                           @click="show = !show">
                                    </image>
                                    <view class="safe-box">
                                        <image class="safe-icon"
                                               src="/static/wallet/safe-icon.png"
                                               mode="widthFix">
                                        </image>
                                        <text class="font-10  color-primary">
                                            {{ $t('wallete.t2') }}
                                        </text>
                                    </view>
                                </view>
                            </view>
                            <view class="row">
                                <template v-if="show">
                                    <view class="row-left">
                                        <text class="font-24 font-bold color-black">
                                            {{ $util.thousandSeparator(total) }}
                                            {{ profit ? +$util.thousandSeparator(profit) : '' }}
                                        </text>
                                        <!--                                   dropdownMenu/ rangeItemClick-->
                                        <view class="rang-button"
                                              @click="preferenceVisble = true">
                                            <text class="font-12 color-black font-bold rang-text">
                                                {{ range }}
                                            </text>
                                            <image class="down-icon"
                                                   :src="`/static/img/tactic/down-${userTheme}.png`"
                                                   mode="widthFix">
                                            </image>
                                        </view>
                                    </view>
                                </template>
                                <template v-else>
                                    <text class="font-24 font-bold color-black">
                                        ******
                                    </text>
                                </template>
                            </view>
                            <view class="row">
                                <text class="font-11 color-gray"
                                      v-if="show">
                                    ≈{{
                                        symbol
                                    }}{{ $util.thousandSeparator((total + (profit ? profit : 0)) * symbol_rate) }}
                                </text>
                                <text class="font-11 color-gray"
                                      v-else>
                                    ******
                                </text>
                            </view>
                        </view>
                        <view class="menu">
                            <view class="item" @click="$mroute.recharge()">
                                <view class="image-box">
                                    <image class="menu-image"
                                           :src="`/static/wallet/cz-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                                <text class="font-11 color-black font-weight">{{ $t('wallet.desposit') }}</text>
                            </view>
                            <view class="item" @click="$mroute.withdraw()">
                                <view class="image-box">
                                    <image class="menu-image"
                                           :src="`/static/wallet/tx-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                                <text class="font-11 color-black font-weight">{{ $t('wallet.withdraw') }}</text>
                            </view>
                            <view class="item" @click="$mroute.exchange()">
                                <view class="image-box">
                                    <image class="menu-image"
                                           :src="`/static/wallet/hz-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                                <text class="font-11 color-black font-weight">{{ $t('wallet.transfer') }}</text>
                            </view>
                        </view>
                        <!-- <view class="nil-assets"
                              v-if="total == 0">
                            <view class="content-box border-solid">
                                <image class="banner-image"
                                       src="/static/wallet/nil-assets.webp"
                                       mode="widthFix">
                                </image>
                                <text class="font-14 color-black font-weight context">
                                    {{ $t('wallete.t26') }} 3200 {{ $t('wallete.t27') }}
                                </text>
                                <view class="button button-active bg-black">
                                    <text class="font-13 font-weight color-white">
                                        {{ $t('wallete.t7') }}
                                    </text>
                                </view>
                            </view>
                        </view> -->
                    </view>
                    <view class="asset-distribution"
                          v-if="tendency">
                        <view class="title-box">
                            <text class="font-14 font-weight color-black">
                                {{ $t('wallet.qs') }}
                            </text>
                        </view>
                        <view class="chart-time">
                            <view class="item"
                                  :class="timeActive == index ? 'bg-black' : 'bg-gray'"
                                  v-for="(item,index) in timeGroup" :key="index"
                                  @click="timeActive = index">
                                <text class="font-11 color-black "
                                      :class="timeActive == index ? 'color-white' : 'color-gray'">
                                    {{ item }}{{ $t('financing.t10') }}
                                </text>
                            </view>
                        </view>
                        <view class="chart-box">
                            <web-view :fullscreen="false" class="webView"
                                      src="/hybrid/html/trade.html">
                            </web-view>
                        </view>
                    </view>
                    <view class="my-account">
                        <view class="title-box">
                            <text class="font-14 font-weight color-black">
                                {{ $t('wallete.t5') }}
                            </text>
                            <view class="hide-assets"
                                  @click="showZero = !showZero">
                                <view class="check-box bg-gray border-solid"
                                      :class="{'border-primary': showZero}">
                                    <image class="check-icon"
                                           src="/static/img/tactic/check-s.png"
                                           mode="widthFix"
                                           v-if="showZero">
                                    </image>
                                </view>
                                <text class=" color-gray font-10">
                                    {{ $t('wallete.hide') }} 0 {{ $t('wallete.t20') }}
                                </text>
                            </view>
                        </view>
                        <view class="account-list">
                            <view class="cell"
                                  @click="tab = 1">
                                <view class="left">
                                    <view class="row row-first">
                                        <text class="font-13 font-weight color-black">
                                            {{ $t('wallete.capital_acc') }}
                                        </text>
                                        <text class="font-13 font-weight color-black">
                                            {{ show ? $util.thousandSeparator(balance, 2) : '******' }} USDT
                                        </text>
                                    </view>
                                    <view class="row row-last">
                                        <text class=" font-11 color-gray"
                                              v-if="show">
                                            ≈{{ symbol }}{{ $util.thousandSeparator(balance * symbol_rate) }}
                                        </text>
                                        <text class=" font-11 color-gray"
                                              v-else>
                                            ******
                                        </text>
                                    </view>
                                </view>
                                <view class="right-icon">
                                    <fui-icon name="arrowright"
                                              color="var(--content-tertiary)"
                                              size="30">
                                    </fui-icon>
                                </view>
                            </view>
                            <view class="cell"
                                  @click="tab = 2">
                                <view class="left">
                                    <view class="row row-first">
                                        <text class="font-13 font-weight color-black">
                                            {{ $t('wallete.spot_acc') }}
                                        </text>
                                        <text class="font-13 font-weight color-black">
                                            {{ show ? $util.thousandSeparator(trade, 2) : '******' }} USDT
                                        </text>
                                    </view>
                                    <view class="row row-last">
                                        <text class=" font-11 color-gray"
                                              v-if="show">
                                            ≈{{ symbol }}{{ $util.thousandSeparator(trade * symbol_rate) }}
                                        </text>
                                        <text class=" font-11 color-gray"
                                              v-else>
                                            ******
                                        </text>
                                    </view>
                                </view>
                                <view class="right-icon">
                                    <fui-icon name="arrowright"
                                              color="var(--content-tertiary)"
                                              size="30">
                                    </fui-icon>
                                </view>
                            </view>
                            <view class="cell"
                                  @click="tab = 3">
                                <view class="left">
                                    <view class="row row-first">
                                        <text class="font-13 font-weight color-black">
                                            {{ $t('wallete.contract_acc') }}
                                        </text>
                                        <text class="font-13 font-weight color-black">
                                            {{
                                                show ? $util.thousandSeparator(contract + (profit ? profit : 0), 2) : '******'
                                            }} USDT
                                        </text>
                                    </view>
                                    <view class="row row-last">
                                        <text class=" font-11 color-gray"
                                              v-if="show">
                                            ≈{{
                                                symbol
                                            }}{{
                                                $util.thousandSeparator((contract + (profit ? profit : 0)) * symbol_rate)
                                            }}
                                        </text>
                                        <text class=" font-11 color-gray"
                                              v-else>
                                            ******
                                        </text>
                                    </view>
                                </view>
                                <view class="right-icon">
                                    <fui-icon name="arrowright"
                                              color="var(--content-tertiary)"
                                              size="30">
                                    </fui-icon>
                                </view>
                            </view>
                            <view class="cell"
                                  @click="tab = 4">
                                <view class="left">
                                    <view class="row row-first">
                                        <text class="font-13 font-weight color-black">
                                            {{ $t('wallete.options_acc') }}
                                        </text>
                                        <text class="font-13 font-weight color-black">
                                            {{ show ? $util.thousandSeparator(future, 2) : '******' }} USDT
                                        </text>
                                    </view>
                                    <view class="row row-last">
                                        <text class=" font-11 color-gray"
                                              v-if="show">
                                            ≈{{ symbol }}{{ $util.thousandSeparator(future * symbol_rate) }}
                                        </text>
                                        <text class=" font-11 color-gray"
                                              v-else>
                                            ******
                                        </text>
                                    </view>
                                </view>
                                <view class="right-icon">
                                    <fui-icon name="arrowright"
                                              color="var(--content-tertiary)"
                                              size="30">
                                    </fui-icon>
                                </view>
                            </view>
                            
                            <view class="cell"
                                  @click="tab = 5">
                                <view class="left">
                                    <view class="row row-first">
                                        <text class="font-13 font-weight color-black">
                                            {{ $t('wallete.fin_acc') }}
                                        </text>
                                        <text class="font-13 font-weight color-black">
                                            {{ show ? $util.thousandSeparator(finance, 2) : '******' }} USDT
                                        </text>
                                    </view>
                                    <view class="row row-last">
                                        <text class=" font-11 color-gray"
                                              v-if="show">
                                            ≈{{ symbol }}{{ $util.thousandSeparator(finance * symbol_rate) }}
                                        </text>
                                        <text class=" font-11 color-gray"
                                              v-else>
                                            ******
                                        </text>
                                    </view>
                                </view>
                                <view class="right-icon">
                                    <fui-icon name="arrowright"
                                              color="var(--content-tertiary)"
                                              size="30">
                                    </fui-icon>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>

            <swiper-item class="swiper-item">
                <scroll-view :refresher-threshold="25"
                             :refresher-enabled="true"
                             refresher-default-style="none"
                             :refresher-triggered="refresherTriggered"
                             @refresherrefresh="onRefresh"
                             @refresherrestore="onRestore"
                             @refresherabort="onAbort"
                             @refresherpulling="onPulling"
                             scroll-y
                             refresher-background="var(--background-secondary)"
                             class="scroll-view"
                             :style="{'height': scrollHeight + 'px'}">
                    <template v-if="_refresherShow">
                        <view class="refresher-box">
                            <image :class="refresherTriggered ? 'animation':''"
                                   src="/static/wallet/refresher.png"
                                   mode="">
                            </image>
                            <text class="font-13 font-weight color-gray">
                                {{ refresherText }}
                            </text>
                        </view>
                    </template>
                    <view class="scroll-head">
                        <view class="asset-val">
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-11 font-weight color-black">
                                        {{ $t('wallete.t18') }}
                                    </text>
                                    <image class="see-icon"
                                           :src="`/static/wallet/eye-${show ? 's' : 'h'}-${userTheme}.png`"
                                           mode="widthFix"
                                           @click="show = !show">
                                    </image>
                                </view>
                                <view class="order-box"
                                      @click="$mroute.cashflow()">
                                    <image class="order-icon"
                                           :src="`/static/img/tactic/order-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                            </view>
                            <!--     -->
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-24 font-bold color-black">
                                        {{ show ? $util.thousandSeparator(balance) : '******' }}
                                    </text>
                                    <view class="rang-button"
                                          @click="preferenceVisble = true">
                                        <text class="font-12 color-black font-bold rang-text">
                                            {{ range }}
                                        </text>
                                        <image class="down-icon"
                                               :src="`/static/img/tactic/down-${userTheme}.png`"
                                               mode="widthFix">
                                        </image>
                                    </view>
                                </view>
                            </view>
                            <!--     -->
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-11 color-gray"
                                          v-if="show">
                                        ≈{{ symbol }}{{ $util.thousandSeparator(balance * symbol_rate) }}
                                    </text>
                                    <text class="font-11 color-gray"
                                          v-else>
                                        ******
                                    </text>
                                </view>
                            </view>
                        </view>
                        <view class="menu">
                            <view class="item" @click="$mroute.recharge()">
                                <view class="image-box">
                                    <image class="menu-image"
                                           :src="`/static/wallet/cz-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                                <text class="font-11 color-black font-weight">{{ $t('wallet.desposit') }}</text>
                            </view>
                            <view class="item" @click="$mroute.withdraw()">
                                <view class="image-box">
                                    <image class="menu-image"
                                           :src="`/static/wallet/tx-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                                <text class="font-11 color-black font-weight">{{ $t('wallet.withdraw') }}</text>
                            </view>
                            <view class="item" @click="$mroute.exchange()">
                                <view class="image-box">
                                    <image class="menu-image"
                                           :src="`/static/wallet/hz-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                                <text class="font-11 color-black font-weight">{{ $t('wallet.transfer') }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="coin-list">
                        <view class="title-box">
                            <view class="search bg-gray">
                                <image class="search-icon"
                                       src="/static/newImage/search-gray.png"
                                       mode="widthFix">
                                </image>
                                <input class="input color-black"
                                       type="text"
                                       @input="search"
                                       @confirm="search"
                                       :placeholder="$t('wallete.search')"
                                       placeholder-class="input_placeholder">
                            </view>
                            <view class="check-label" @click="showZero = !showZero">
                                <view class="check-box border-solid bg-gray"
                                      :class="{'border-primary': showZero}">
                                    <image class="check-image"
                                           src="/static/img/tactic/check-s.png"
                                           mode="widthFix"
                                           v-if="showZero">
                                    </image>
                                </view>
                                <text class="font-10 color-gray">
                                    {{ $t('wallete.hide') }} 0 {{ $t('wallete.balances') }}
                                </text>
                            </view>
                        </view>
                        <view class="coin-body">
                            <view class="coin-item"
                                  v-for="(item, index) in list" :key="index"
                                  @click="$mroute.walletInfo(tab)">
                                <view class="image-box">
                                    <image class="coin-image"
                                           :src="item.icon"
                                           mode="widthFix">
                                    </image>
                                </view>
                                <view class="center-box">
                                    <view class="row">
                                        <text class="font-13 font-weight color-black">
                                            {{ item.symbol }}
                                        </text>
                                        <text class="font-13 font-weight color-black">
                                            {{
                                                show ? $util.float(item.balance) : '******'
                                            }}
                                        </text>
                                    </view>
                                    <view class="row">
                                        <text class="font-10 color-gray ">
                                            {{item.chain_text}}
                                        </text>
                                        <text class="font-10 color-gray "
                                              v-if="show">
                                            ≈{{
                                                symbol
                                            }}{{ $util.thousandSeparator(item.balance * item.new_price * symbol_rate) }}
                                        </text>
                                        <text class="font-10 color-gray "
                                              v-else>
                                            ******
                                        </text>
                                    </view>
                                </view>
                            </view>
                            <empty-view :visible="list.length == 0"
                                        :width="750"
                                        :height="700"
                                        :title="$t('list.not_data')">
                            </empty-view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <!--   现货/TAB2   -->
            <swiper-item class="swiper-item">
                <scroll-view :refresher-threshold="25"
                             :refresher-enabled="true"
                             refresher-default-style="none"
                             :refresher-triggered="refresherTriggered"
                             @refresherrefresh="onRefresh"
                             @refresherrestore="onRestore"
                             @refresherabort="onAbort"
                             @refresherpulling="onPulling"
                             scroll-y
                             refresher-background="var(--background-secondary)"
                             class="scroll-view"
                             :style="{'height': scrollHeight + 'px'}">
                    <!--     刷新区域    -->
                    <template v-if="_refresherShow">
                        <view class="refresher-box">
                            <image :class="refresherTriggered ? 'animation':''"
                                   src="/static/wallet/refresher.png"
                                   mode=""></image>
                            <text class="font-13 font-weight color-gray">
                                {{ refresherText }}
                            </text>
                        </view>
                    </template>
                    <view class="scroll-head">
                        <!--     {{$t('tab.assets')}}估值     -->
                        <view class="asset-val">
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-11 font-weight color-black">
                                        {{ $t('wallete.t15') }}
                                    </text>
                                    <image class="see-icon"
                                           :src="`/static/wallet/eye-${show ? 's' : 'h'}-${userTheme}.png`"
                                           mode="widthFix"
                                           @click="show = !show">
                                    </image>
                                </view>
                                <view class="order-box"
                                      @click="$mroute.cashflow()">
                                    <image class="order-icon"
                                           :src="`/static/img/tactic/order-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                            </view>
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-24 font-bold color-black">
                                        {{ show ? $util.thousandSeparator(trade) : '******' }}
                                    </text>
                                    <view class="rang-button"
                                          @click="preferenceVisble = true"
                                          v-if="show">
                                        <text class="font-12 color-black font-bold rang-text">
                                            {{ range }}
                                        </text>
                                        <image class="down-icon"
                                               :src="`/static/img/tactic/down-${userTheme}.png`"
                                               mode="widthFix">
                                        </image>
                                    </view>
                                </view>
                            </view>
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-11 color-gray"
                                          v-if="show">
                                        ≈{{ symbol }}{{ $util.thousandSeparator(trade * symbol_rate) }}
                                    </text>
                                    <text class="font-11 color-gray"
                                          v-else>
                                        ******
                                    </text>
                                </view>
                            </view>
                        </view>
                        <view class="menu">
                            <view class="item" @click="$mroute.recharge()">
                                <view class="image-box">
                                    <image class="menu-image"
                                           :src="`/static/wallet/cz-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                                <text class="font-11 color-black font-weight">{{ $t('wallet.desposit') }}</text>
                            </view>
                            <view class="item" @click="$mroute.withdraw()">
                                <view class="image-box">
                                    <image class="menu-image"
                                           :src="`/static/wallet/tx-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                                <text class="font-11 color-black font-weight">{{ $t('wallet.withdraw') }}</text>
                            </view>
                            <view class="item" @click="$mroute.exchange()">
                                <view class="image-box">
                                    <image class="menu-image"
                                           :src="`/static/wallet/hz-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                                <text class="font-11 color-black font-weight">{{ $t('wallet.transfer') }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="coin-list">
                        <view class="title-box">
                            <view class="search bg-gray">
                                <image class="search-icon"
                                       src="/static/newImage/search-gray.png"
                                       mode="widthFix">
                                </image>
                                <input class="input color-black"
                                       type="text"
                                       @input="search"
                                       @confirm="search"
                                       :placeholder="$t('wallete.search')"
                                       placeholder-class="input_placeholder">
                            </view>
                            <view class="check-label" @click="showZero = !showZero">
                                <view class="check-box border-solid bg-gray"
                                      :class="{'border-primary': showZero}">
                                    <image class="check-image"
                                           src="/static/img/tactic/check-s.png"
                                           mode="widthFix"
                                           v-if="showZero">
                                    </image>
                                </view>
                                <text class="font-10 color-gray">
                                    {{ $t('wallete.hide') }} 0 {{ $t('wallete.balances') }}
                                </text>
                            </view>
                        </view>
                        <view class="coin-body">
                            <view class="coin-item"
                                  v-for="(item, index) in list" :key="index"
                                  @click="$mroute.walletInfo(tab)">
                                <view class="image-box">
                                    <image class="coin-image" :src="item.icon" mode="widthFix"></image>
                                </view>
                                <view class="center-box">
                                    <view class="row">
                                        <text class="font-13 font-weight color-black">
                                            {{ item.symbol }}
                                        </text>
                                        <text class="font-13 font-weight color-black">
                                            {{
                                                show ? $util.float($util.str2number($util.thousandSeparator(item.trade_balance, 8))) : '******'
                                            }}
                                        </text>
                                    </view>
                                    <view class="row">
                                        <text class="font-10 color-gray">
                                            {{item.chain_text}}
                                        </text>
                                        <text class="font-10 color-gray">
                                            ≈{{ symbol }}
                                            {{
                                                show ? $util.thousandSeparator(item.trade_balance * item.new_price * symbol_rate) : '******'
                                            }}
                                        </text>
                                    </view>
                                </view>
                            </view>
                            <empty-view :visible="list.length == 0"
                                        :width="750"
                                        :height="700"
                                        :title="$t('list.not_data')">
                            </empty-view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <!--   合约/TAB3   -->
            <swiper-item class="swiper-item">
                <scroll-view :refresher-threshold="25"
                             :refresher-enabled="true"
                             refresher-default-style="none"
                             :refresher-triggered="refresherTriggered"
                             @refresherrefresh="onRefresh"
                             @refresherrestore="onRestore"
                             @refresherabort="onAbort"
                             @refresherpulling="onPulling"
                             scroll-y
                             refresher-background="var(--background-secondary)"
                             class="scroll-view"
                             :style="{'height': scrollHeight + 'px'}">
                    <!--     刷新区域    -->
                    <template v-if="_refresherShow">
                        <view class="refresher-box">
                            <image :class="refresherTriggered ? 'animation':''" src="/static/wallet/refresher.png"
                                   mode=""></image>
                            <text class="font-13 font-weight color-gray">{{ refresherText }}</text>
                        </view>
                    </template>
                    <view class="scroll-head">
                        <!--     {{$t('tab.assets')}}估值     -->
                        <view class="asset-val">
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-11 font-weight color-black">
                                        {{ $t('wallete.asset_val') }}
                                    </text>
                                    <image class="see-icon"
                                           :src="`/static/wallet/eye-${show ? 's' : 'h'}-${userTheme}.png`"
                                           mode="widthFix"
                                           @click="show = !show">
                                    </image>
                                </view>
                                <view class="order-box"
                                      @click="$mroute.cashflow()">
                                    <image class="order-icon"
                                           :src="`/static/img/tactic/order-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                            </view>
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-24 font-bold color-black">
                                        {{
                                            show ? $util.thousandSeparator(contract + (profit ? profit : 0)) : '******'
                                        }}
                                    </text>
                                    <view class="rang-button"
                                          @click="preferenceVisble = true"
                                          v-if="show">
                                        <text class="font-12 color-black font-bold rang-text">
                                            {{ range }}
                                        </text>
                                        <image class="down-icon"
                                               :src="`/static/img/tactic/down-${userTheme}.png`"
                                               mode="widthFix">
                                        </image>
                                    </view>
                                </view>
                            </view>
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-11 color-gray"
                                          v-if="show">
                                        ≈{{
                                            symbol
                                        }}{{
                                            $util.thousandSeparator((contract + (profit ? profit : 0)) * symbol_rate)
                                        }}
                                    </text>
                                    <text class="font-11 color-gray"
                                          v-else>
                                        ******
                                    </text>
                                </view>
                            </view>
							<!-- 这里暂时注释，功能还没有做 -->
                            <view class="row mt-10">
                                <view class="row-left">
                                    <text class="font-11 color-black">
                                        {{ $t('wallete.t8') }}
                                    </text>
                                    <view class="tag-button bg-gray">
                                        <text class="font-10 color-black ">{{$t("newcontract.t72")}}</text>
                                        <image class="down-icon"
                                               :src="`/static/img/tactic/down-${userTheme}.png`"
                                               mode="widthFix">
                                        </image>
                                    </view>
                                </view>
                            </view>
                            <view class="row mt-5">
                                <view class="row-left" @click="$mroute.analyze()">
                                    <text class="font-weight font-11 color-black">
										{{symbol}}{{$util.thousandSeparator(dayProfit * symbol_rate,2)}}
										</text>
                                    <fui-icon name="arrowright"
                                              color="var(--content-tertiary)"
                                              size="30">
                                    </fui-icon>
                                </view>
                            </view>
                        </view>
                        <view class="menu">
                            <view class="menu-button button-active bg-black"
                                  @click="$mroute.exchange()">
                                <text class="font-13 font-weight color-white">
                                    {{ $t('wallete.t10') }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="coin-list">
                        <view class="title-box">
                            <view class="search bg-gray">
                                <image class="search-icon"
                                       src="/static/newImage/search-gray.png"
                                       mode="widthFix">
                                </image>
                                <input class="input color-black"
                                       type="text"
                                       @input="search"
                                       @confirm="search"
                                       :placeholder="$t('wallete.search')"
                                       placeholder-class="input_placeholder">
                            </view>
                            <view class="check-label" @click="showZero = !showZero">
                                <view class="check-box border-solid bg-gray"
                                      :class="{'border-primary': showZero}">
                                    <image class="check-image"
                                           src="/static/img/tactic/check-s.png"
                                           mode="widthFix"
                                           v-if="showZero">
                                    </image>
                                </view>
                                <text class="font-10 color-gray">
                                    {{ $t('wallete.hide') }} 0 {{ $t('wallete.balances') }}
                                </text>
                            </view>
                        </view>
                        <view class="coin-body">
                            <view class="coin-item"
                                  v-for="(item, index) in list.filter(item=>item.symbol=='USDT')"
                                  :key="index" @click="$mroute.walletInfo(tab)">
                                <view class="image-box">
                                    <image class="coin-image" :src="item.icon" mode="widthFix"></image>
                                </view>
                                <view class="center-box">
                                    <view class="row">
                                        <text class="font-13 font-weight color-black">
                                            {{ item.symbol }}
                                        </text>
                                        <text class="font-13 font-weight color-black">
                                            {{
                                                show ? item.contract_balance : '******'
                                            }}
                                        </text>
                                    </view>
                                    <view class="row">
                                        <text class="font-10 color-gray">
                                            {{item.chain_text}}
                                        </text>
                                        <text class="font-10 color-gray">
                                            ≈{{ symbol }}
                                            {{
                                                show ? $util.thousandSeparator(item.contract_balance * item.new_price * symbol_rate) : '******'
                                            }}
                                        </text>
                                    </view>
                                </view>
                            </view>
                            <empty-view :visible="list.length == 0"
                                        :width="750"
                                        :height="700"
                                        :title="$t('list.not_data')">
                            </empty-view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <!--   期权/TAB4   -->
            <swiper-item class="swiper-item">
                <scroll-view :refresher-threshold="25"
                             :refresher-enabled="true"
                             refresher-default-style="none"
                             :refresher-triggered="refresherTriggered"
                             @refresherrefresh="onRefresh"
                             @refresherrestore="onRestore"
                             @refresherabort="onAbort"
                             @refresherpulling="onPulling"
                             scroll-y
                             refresher-background="var(--background-secondary)"
                             class="scroll-view"
                             :style="{'height': scrollHeight + 'px'}">
                    <!--     刷新区域    -->
                    <template v-if="_refresherShow">
                        <view class="refresher-box">
                            <image :class="refresherTriggered ? 'animation':''" src="/static/wallet/refresher.png"
                                   mode=""></image>
                            <text class="font-13 font-weight color-gray">{{ refresherText }}</text>
                        </view>
                    </template>
                    <view class="scroll-head">
                        <!--     {{$t('tab.assets')}}估值     -->
                        <view class="asset-val">
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-11 font-weight color-black">
                                        {{ $t('wallete.t23') }}
                                    </text>
                                    <image class="see-icon"
                                           :src="`/static/wallet/eye-${show ? 's' : 'h'}-${userTheme}.png`"
                                           mode="widthFix"
                                           @click="show = !show">
                                    </image>
                                </view>
                                <view class="order-box"
                                      @click="$mroute.cashflow()">
                                    <image class="order-icon"
                                           :src="`/static/img/tactic/order-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                            </view>
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-24 font-bold color-black">
                                        {{ show ? $util.thousandSeparator(future) : '******' }}
                                    </text>
                                    <view class="rang-button"
                                          @click="preferenceVisble = true"
                                          v-if="show">
                                        <text class="font-12 color-black font-bold rang-text">
                                            {{ range }}
                                        </text>
                                        <image class="down-icon"
                                               :src="`/static/img/tactic/down-${userTheme}.png`"
                                               mode="widthFix">
                                        </image>
                                    </view>
                                </view>
                            </view>
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-11 color-gray"
                                          v-if="show">
                                        ≈{{ symbol }}{{ $util.thousandSeparator(future * symbol_rate) }}
                                    </text>
                                    <text class="font-11 color-gray"
                                          v-else>
                                        ******
                                    </text>
                                </view>
                            </view>
                        </view>
                        <view class="menu">
                            <view class="menu-button bg-black button-active"
                                  @click="$mroute.exchange()">
                                <text class="font-13 font-weight color-white">
                                    {{ $t('wallete.t10') }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="coin-list">
                        <view class="title-box">
                            <view class="search bg-gray">
                                <image class="search-icon"
                                       src="/static/newImage/search-gray.png"
                                       mode="widthFix">
                                </image>
                                <input class="input color-black"
                                       type="text"
                                       @input="search"
                                       @confirm="search"
                                       :placeholder="$t('wallete.search')"
                                       placeholder-class="input_placeholder">
                            </view>
                            <view class="check-label" @click="showZero = !showZero">
                                <view class="check-box border-solid bg-gray"
                                      :class="{'border-primary': showZero}">
                                    <image class="check-image"
                                           src="/static/img/tactic/check-s.png"
                                           mode="widthFix"
                                           v-if="showZero">
                                    </image>
                                </view>
                                <text class="font-10 color-gray">
                                    {{ $t('wallete.hide') }} 0 {{ $t('wallete.balances') }}
                                </text>
                            </view>
                        </view>
                        <view class="coin-body">
                            <view class="coin-item"
                                  v-for="(item, index) in list" :key="index" @click="$mroute.walletInfo(tab)">
                                <view class="image-box">
                                    <image class="coin-image" :src="item.icon" mode="widthFix"></image>
                                </view>
                                <view class="center-box">
                                    <view class="row">
                                        <text class="font-13 font-weight color-black">
                                            {{ item.symbol }}
                                        </text>
                                        <text class="font-13 font-weight color-black">
                                            {{
                                                show ? $util.float(item.future_balance) : '******'
                                            }}
                                        </text>
                                    </view>
                                    <view class="row">
                                        <text class="font-10 color-gray">
                                            {{item.chain_text}}
                                        </text>
                                        <text class="font-10 color-gray">
                                            ≈{{ symbol }}
                                            {{
                                                show ? $util.thousandSeparator(item.future_balance * item.new_price * symbol_rate) : '******'
                                            }}
                                        </text>
                                    </view>
                                </view>
                            </view>
                            <empty-view :visible="list.length == 0"
                                        :width="750"
                                        :height="700"
                                        :title="$t('list.not_data')">
                            </empty-view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <!--   理财/TAB5   -->
            <swiper-item class="swiper-item">
                <scroll-view :refresher-threshold="25"
                             :refresher-enabled="true"
                             refresher-default-style="none"
                             :refresher-triggered="refresherTriggered"
                             @refresherrefresh="onRefresh"
                             @refresherrestore="onRestore"
                             @refresherabort="onAbort"
                             @refresherpulling="onPulling"
                             scroll-y
                             refresher-background="var(--background-secondary)"
                             class="scroll-view"
                             :style="{'height': scrollHeight + 'px'}">
                    <!--     刷新区域    -->
                    <template v-if="_refresherShow">
                        <view class="refresher-box">
                            <image :class="refresherTriggered ? 'animation':''"
                                   src="/static/wallet/refresher.png"></image>
                            <text class="font-13 font-weight color-gray">{{ refresherText }}</text>
                        </view>
                    </template>
                    <view class="scroll-head">
                        <!--     {{$t('tab.assets')}}估值     -->
                        <view class="asset-val">
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-11 font-weight color-black">
                                        {{ $t('wallete.t19') }}
                                    </text>
                                    <image class="see-icon"
                                           :src="`/static/wallet/eye-${show ? 's' : 'h'}-${userTheme}.png`"
                                           mode="widthFix"
                                           @click="show = !show">
                                    </image>
                                </view>
                                <view class="order-box"
                                      @click="$mroute.cashflow()">
                                    <image class="order-icon"
                                           :src="`/static/img/tactic/order-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                            </view>
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-24 font-bold color-black">
                                        {{ show ? $util.thousandSeparator(finance) : '******' }}
                                    </text>
                                    <view class="rang-button"
                                          @click="preferenceVisble = true"
                                          v-if="show">
                                        <text class="font-12 color-black font-bold rang-text">
                                            {{ range }}
                                        </text>
                                        <image class="down-icon"
                                               :src="`/static/img/tactic/down-${userTheme}.png`"
                                               mode="widthFix">
                                        </image>
                                    </view>
                                </view>
                            </view>
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-11 color-gray"
                                          v-if="show">
                                        ≈{{ symbol }}{{ $util.thousandSeparator(finance * symbol_rate) }}
                                    </text>
                                    <text class="font-11 color-gray"
                                          v-else>
                                        ******
                                    </text>
                                </view>
                            </view>
                        </view>
                        <view class="nil-assets"
                              v-if="finance == 0">
                            <view class="content-box border-solid">
                                <image class="banner-image"
                                       src="/static/wallet/nil-assets.webp"
                                       mode="widthFix">
                                </image>
                                <text class="font-14 color-black font-weight context">
                                    {{ $t('wallete.t28') }}
                                </text>
                                <view class="button button-active bg-black">
                                    <text class="font-13 font-weight color-white">
                                        {{ $t('wallete.t24') }}
                                    </text>
                                </view>
                                <view class="button button-active bg-green">
                                    <text class="font-13 font-weight always-white">
                                        {{ $t('wallete.t25') }}
                                    </text>
                                </view>
                            </view>
                        </view>
                        <!--		菜单	  -->
                        <view class="menu">
                            <view class="item" @click="$mroute.exchange()">
                                <view class="image-box">
                                    <image class="menu-image"
                                           :src="`/static/wallet/hz-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                                <text class="font-11 color-black font-weight">{{ $t('wallet.transfer') }}</text>
                            </view>
                            <view class="item" @click="$mroute.indexFinance()">
                                <view class="image-box">
                                    <image class="menu-image"
                                           :src="`/static/wallet/lc-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                                <text class="font-11 color-black font-weight">{{ $t('wallete.earn') }}</text>
                            </view>
                            <view class="item" @click="$mroute.eaorderPage()">
                                <view class="image-box">
                                    <image class="menu-image"
                                           :src="`/static/wallet/lcjl-${userTheme}.png`"
                                           mode="widthFix">
                                    </image>
                                </view>
                                <text class="font-11 color-black font-weight">{{ $t('wallete.sub_record') }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="coin-list">
                        <view class="title-box">
                            <view class="search bg-gray">
                                <image class="search-icon"
                                       src="/static/newImage/search-gray.png"
                                       mode="widthFix">
                                </image>
                                <input class="input color-black"
                                       type="text"
                                       @input="search"
                                       @confirm="search"
                                       :placeholder="$t('wallete.search')"
                                       placeholder-class="input_placeholder">
                            </view>
                            <view class="check-label" @click="showZero = !showZero">
                                <view class="check-box border-solid bg-gray"
                                      :class="{'border-primary': showZero}">
                                    <image class="check-image"
                                           src="/static/img/tactic/check-s.png"
                                           mode="widthFix"
                                           v-if="showZero">
                                    </image>
                                </view>
                                <text class="font-10 color-gray">
                                    {{ $t('wallete.hide') }} 0 {{ $t('wallete.balances') }}
                                </text>
                            </view>
                        </view>
                        <view class="coin-body">
                            <view class="cell-card"
                                  v-for="(item, index) in list" :key="index" @click="$mroute.walletInfo(tab)">
                                <!--奔富理财-->
                                <view class="cell" style="padding:0">
                                    <view class="cell-left">
                                        <image :src="item.icon" mode=""></image>
                                        <text class="font-13 font-weight color-black">{{ item.symbol }}</text>
                                    </view>
                                    <view class="cell-right" v-if="show">
                                        <text class="font-13 font-weight color-black">
                                            {{ $util.float(item.finance_balance) }}
                                        </text>
                                        <text class="font-10 color-gray">
                                            {{ symbol }} {{
                                                $util.thousandSeparator(item.finance_balance * item.new_price * symbol_rate)
                                            }}
                                        </text>
                                    </view>
                                    <view class="cell-right" v-else>
                                        <text class="font-13 font-weight color-black">*****</text>
                                        <text class="font-10 color-gray">*****</text>
                                    </view>
                                </view>
                                <view class="cell-row">
                                    <view class="cell-row-left">
                                        <text class="font-13 font-weight color-black">{{ $t('financing.t1') }}</text>
                                    </view>
                                    <view class="cell-row-right">
                                        <text class="font-13 font-weight color-black" v-if="show">
                                            {{ $util.float(item.finance_pro) }}
                                        </text>
                                        <text class="font-13 font-weight color-black" v-else>*****</text>
                                    </view>
                                </view>
                                <!--活币宝-->
                                <view class="cell-row">
                                    <view class="cell-row-left">
                                        <text class="font-13 font-weight color-black">{{ $t('financing.t2') }}</text>
                                    </view>
                                    <view class="cell-row-right">
                                        <text class="font-13 font-weight color-black" v-if="show">
                                            {{ $util.float(item.finance_dep) }}
                                        </text>
                                        <text class="font-13 font-weight color-black" v-else>*****</text>
                                    </view>
                                </view>
                            </view>

                            <empty-view :visible="list.length == 0"
                                        :width="750"
                                        :height="700"
                                        :title="$t('list.not_data')">
                            </empty-view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <!--      策略      -->
            <swiper-item class="swiper-item"
                         :style="`height: ${bodyHeight}px`">
                <scroll-view :refresher-threshold="25"
                             :refresher-enabled="true"
                             refresher-default-style="none"
                             :refresher-triggered="refresherTriggered"
                             @refresherrefresh="onRefresh"
                             @refresherrestore="onRestore"
                             @refresherabort="onAbort"
                             @refresherpulling="onPulling"
                             scroll-y
                             refresher-background="var(--background-secondary)"
                             class="scroll-view"
                             :style="{'height': scrollHeight + 'px'}">
                    <!--     刷新区域    -->
                    <template v-if="_refresherShow">
                        <view class="refresher-box">
                            <image :class="refresherTriggered ? 'animation':''"
                                   src="/static/wallet/refresher.png"></image>
                            <text class="font-13 font-weight color-gray">{{ refresherText }}</text>
                        </view>
                    </template>
                    <view class="scroll-head">
                        <view class="asset-val">
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-11 font-weight color-black">
                                        {{ $t('wallete.t17') }}
                                    </text>
                                    <image class="see-icon"
                                           :src="`/static/wallet/eye-s-${userTheme}.png`"
                                           mode="widthFix"
                                           @click="show = !show">
                                    </image>
                                </view>
                            </view>
                            <view class="row">
                                <view class="row-left">
                                    <text class="font-24 font-bold color-black">
                                        {{ show ? $util.thousandSeparator(strategy) : '******' }}
                                    </text>
                                    <view class="rang-button"
                                          @click="preferenceVisble = true"
                                          v-if="show">
                                        <text class="font-12 color-black  font-bold rang-text">
                                            {{ range }}
                                        </text>
                                        <image class="down-icon"
                                               :src="`/static/img/tactic/down-${userTheme}.png`"
                                               mode="widthFix">
                                        </image>
                                    </view>
                                </view>
                            </view>
                            <view class="row">
                                <text class="font-11  color-gray"
                                      v-if="show">
                                    ≈{{ symbol }}{{ $util.thousandSeparator(strategy * symbol_rate) }}
                                </text>
                                <text class="font-11  color-gray"
                                      v-else>
                                    ******
                                </text>
                            </view>
                        </view>
                        <view class="strategy-tabs">
                            <fui-tabs scroll
                                      alignLeft
                                      :height="78"
                                      :tabs="strategyTabs"
                                      :current="strategyTabIndex"
                                      background="var(--background-primary)"
                                      :size="28"
                                      scale="1"
                                      color="var(--content-tertiary)"
                                      :selectedSize="28"
                                      selectedColor="var(--content-primary)"
                                      slider-background="var(--content-primary)"
                                      :isSlider="true"
                                      :short="false"
                                      @change="strategyTabIndex = $event.index">
                            </fui-tabs>
                        </view>
                    </view>
                    <view class="sub-swiper-warp">
                        <swiper class="sub-swiper"
                                :current="strategyTabIndex"
                                :style="`height: ${scrollHeight - 63}px`"
                                @change="strategyTabIndex = $event.detail.current">
                            <swiper-item class="sub-swiper-item"
                                         :style="`height: ${scrollHeight - 63}px`"
                                         v-for="item in strategyTabs.length">
                                <scroll-view class="sub-swiper-scroll"
                                             :style="`height: ${scrollHeight - 63}px`">
                                    <view class="header">
                                        <view class="row">
                                            <text class="font-11 color-black font-weight">
                                                {{ $t('wallete.t23') }}
                                            </text>
                                        </view>
                                        <view class="row mt-5">
                                            <text class="font-14 color-black font-weight">0.00000000 USDT</text>
                                        </view>
<!--                                        <view class="button-group">-->
<!--                                            <view class="button bg-black button-active">-->
<!--                                                <text class="font-13 font-weight color-white">-->
<!--                                                    {{ $t('wallete.t13') }}-->
<!--                                                </text>-->
<!--                                            </view>-->
<!--                                            <view class="button bg-white button-active">-->
<!--                                                <text class="font-13 font-weight color-black">-->
<!--                                                    {{ $t('wallete.t14') }}-->
<!--                                                </text>-->
<!--                                            </view>-->
<!--                                        </view>-->
                                    </view>
                                    <view class="list-tabs">
                                        <view class="search bg-gray">
                                            <image class="search-icon"
                                                   src="/static/newImage/search-gray.png"
                                                   mode="widthFix">
                                            </image>
                                            <input class="input color-black "
                                                   type="text"
                                                   @input="search"
                                                   @confirm="search"
                                                   :placeholder="$t('wallete.search')"
                                                   placeholder-class="input_placeholder">
                                        </view>
                                        <view class="check-label"
                                              @click="showZero = !showZero">
                                            <view class="check-box bg-gray border-solid"
                                                  :class="{'border-primary': showZero}">
                                                <image class="check-image"
                                                       src="/static/img/tactic/check-s.png"
                                                       mode="widthFix"
                                                       v-if="showZero">
                                                </image>
                                            </view>
                                            <text class="font-10 color-gray">
                                                {{ $t('wallete.hide') }} 0 {{ $t('wallete.balances') }}
                                            </text>
                                        </view>
                                    </view>
                                    <view class="coin-body">
                                        <view class="coin-item"
                                              v-for="(item, index) in list.filter(item=>item.symbol=='USDT')"
                                              :key="index" @click="$mroute.walletInfo(tab)">
                                            <view class="image-box">
                                                <image class="coin-image" :src="item.icon" mode="widthFix"></image>
                                            </view>
                                            <view class="center-box">
                                                <view class="row">
                                                    <text class="font-13 font-weight color-black">
                                                        {{ item.symbol }}
                                                    </text>
                                                    <text class="font-13 font-weight color-black">
                                                        {{
                                                            show ? item.strategy_balance : '******'
                                                        }}
                                                    </text>
                                                </view>
                                                <view class="row">
                                                    <text class="font-10 color-gray">
                                                        {{item.chain_text}}
                                                    </text>
                                                    <text class="font-10 color-gray">
                                                        ≈{{ symbol }}
                                                        {{
                                                            show ? $util.thousandSeparator(item.strategy_balance * item.new_price * symbol_rate) : '******'
                                                        }}
                                                    </text>
                                                </view>
                                            </view>
                                        </view>
                                        <empty-view :visible="list.length == 0"
                                                    :width="750"
                                                    :height="700"
                                                    :title="$t('list.not_data')">
                                        </empty-view>
                                    </view>
                                </scroll-view>
                            </swiper-item>
                        </swiper>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>
        <fui-bottom-popup :show="preferenceVisble"
                          z-index="999"
                          background="var(--background-primary)"
                          @close="preferenceVisble = false">
            <view class="preference-warp">
                <view class="title-box border-bottom">
                    <text class="font-15 font-weight color-black">
                        {{$t("wallet.t001")}}
                    </text>
                    <view class="close"
                          @click="preferenceVisble = false">
                        <fui-icon name="close"
                                  color="var(--content-primary)"
                                  size="48">
                        </fui-icon>
                    </view>
                </view>
                <view class="search-box bg-gray">
                    <image class="search-icon"
                           src="/static/newImage/search-gray.png"
                           mode="widthFix">
                    </image>
                    <input class="input color-black "
                           type="text"
                           :placeholder="$t('wallete.search')"
                           placeholder-class="input_placeholder">
                </view>
                <scroll-view class="currency-list"
                             :style="`height: ${scrollHeight - 150}px`">
                    <view class="desc-box bg-gray">
                        <text class="font-12 color-gray ">
                             {{$t("wallet.t002")}}
                        </text>
                    </view>
                    <view class="cell border-bottom"
                          v-for="(item,index) in downMenu" :key="index"
                          @click="rangeItemClick(item)">
                        <view class="cell-left">
                            <image class="coin-image"
                                   :src="`/static/exchangeRate/${item.text.toLowerCase()}.png`"
                                   mode="widthFix">
                            </image>
                            <text class="font-13 color-black font-weight">
                                {{ item.value }}
                            </text>
                        </view>
                        <image class="select-icon"
                               src="/static/img/tactic/check-select.png"
                               mode="widthFix"
                               v-if="range == item.value">
                        </image>
                    </view>
                </scroll-view>
            </view>
        </fui-bottom-popup>
        <loading ref="loading"></loading>
    </view>
</template>

<script>
import fuiTabs from "@/components/firstui/fui-tabs/fui-tabs.vue"
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue"
import fuiSkeleton from "@/components/firstui/fui-skeleton/fui-skeleton.vue"
import fuiDropdownMenu from "@/components/firstui/fui-dropdown-menu/fui-dropdown-menu.vue"
import emptyView from "@/components/emptyView/emptyView.vue";

import userApi from '@/common/api/user.js';
import commonApi from '@/common/api/common.js';
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex';

var currency;
var init = 0;
export default {
    components: {
        fuiTabs,
        fuiNavBar,
        fuiEmpty,
        fuiSkeleton,
        fuiDropdownMenu,
        emptyView
    },
    data() {
        return {
            assetsDisplay:false,
            bodyHeight:"",
            windowHeight: uni.getSystemInfoSync().windowHeight,
            scrollHeight: "",
            refresherTriggered: false,
            _refresherShow: false,
            refresherText: "下拉可刷新",
            tendency: false,
            timeGroup: ["7", "30", "90", "180"],
            duration: 0,
            tab: 0,
            show: true,
            showZero: false,
            list: [],
            total: "--",
            trade: "--",
            contract: '--',
            future: "--",
            finance: '--',
            balance: '--',
            strategy:'--',
            keyword: "",
			dayProfit:0,
            strategyTabs: [
                this.$t('wallete.t11'),
                this.$t('wallete.t12'),
            ],
            strategyTabIndex: 0,
            tabOption: [
                this.$t('wallete.overview'),
                this.$t('wallete.funding'),
                this.$t('wallete.spot'),
                this.$t('wallete.futures'),
                this.$t('wallete.options'),
                this.$t('wallete.earn'),
                //this.$t('wallete.t6'),
            ],
            swiperCurrent: 0,
            symbol: this.$util.getLCS(),
            symbol_rate: this.$util.getLCR(),
            timeActive: 0,
            preferenceVisble: false,
            downMenu: [
                {
                    text: "USD",
                    texts: this.$t('setup.usd'),
                    color: '#000000',
                    value: "USD",
                    symbol: "$",
                    checked: true
                },
				{
				    text: "GBP",
				    texts: this.$t('setup.gbp'),
				    color: '#000000',
				    value: "GBP",
				    symbol: "￡",
				    checked: false
				},
                {
                    text: "CNY",
                    texts: this.$t('setup.cny'),
                    color: '#000000',
                    value: "CNY",
                    symbol: "¥",
                    checked: false
                },
                {
                    text: "JPY",
                    texts: this.$t('setup.jpy'),
                    color: '#000000',
                    value: "JPY",
                    symbol: "¥",
                    checked: false
                },
                {
                    text: "EUR",
                    texts: this.$t('setup.eur'),
                    color: '#000000',
                    value: "EUR",
                    symbol: "€",
                    checked: false
                },
                {
                    text: "INR",
                    texts: this.$t('setup.inr'),
                    color: '#000000',
                    value: "INR",
                    symbol: "€",
                    checked: false
                },
            ],
            range: "USD",
            rangeShow: false,
            // 理财订单骨架
            preloadList: [{
                left: 15,
                top: 15,
                bottom: 220,
                width: 30,
                height: 30,
                type: 'rect'
            }, {
                left: 60,
                top: 15,
                width: 100,
                height: 30,
                type: 'rect'
            }, {
                top: 15,
                left: 285,
                width: 80,
                height: 15,
                type: 'rect'
            }, {
                top: 33,
                left: 285,
                width: 80,
                height: 12,
                type: 'rect'
            }, {
                top: 60,
                left: 285,
                width: 80,
                height: 30,
                type: 'rect'
            }, {
                top: 110,
                left: 285,
                width: 80,
                height: 30,
                type: 'rect'
            }, {
                top: 160,
                left: 285,
                width: 80,
                height: 30,
                type: 'rect'
            }, {
                left: 15,
                top: 60,
                width: 105,
                height: 30,
                type: 'rect'
            }, {
                left: 15,
                top: 110,
                width: 105,
                height: 30,
                type: 'rect'
            }, {
                left: 15,
                top: 160,
                width: 105,
                height: 30,
                type: 'rect'
            }],
            // 资金列表骨架
            fundPreloadList: [{
                left: 15,
                top: 15,
                bottom: 220,
                width: 30,
                height: 30,
                type: 'rect'
            }, {
                left: 60,
                top: 15,
                width: 100,
                height: 30,
                type: 'rect'
            }, {
                top: 15,
                left: 285,
                width: 80,
                height: 15,
                type: 'rect'
            }, {
                top: 33,
                left: 285,
                width: 80,
                height: 12,
                type: 'rect'
            }, {
                left: 15,
                top: 80,
                bottom: 220,
                width: 30,
                height: 30,
                type: 'rect'
            }, {
                left: 60,
                top: 80,
                width: 100,
                height: 30,
                type: 'rect'
            }, {
                top: 80,
                left: 285,
                width: 80,
                height: 15,
                type: 'rect'
            }, {
                top: 98,
                left: 285,
                width: 80,
                height: 12,
                type: 'rect'
            }, {
                left: 15,
                top: 145,
                bottom: 220,
                width: 30,
                height: 30,
                type: 'rect'
            }, {
                left: 60,
                top: 145,
                width: 100,
                height: 30,
                type: 'rect'
            }, {
                top: 145,
                left: 285,
                width: 80,
                height: 15,
                type: 'rect'
            }, {
                top: 163,
                left: 285,
                width: 80,
                height: 12,
                type: 'rect'
            }, {
                left: 15,
                top: 210,
                bottom: 220,
                width: 30,
                height: 30,
                type: 'rect'
            }, {
                left: 60,
                top: 210,
                width: 100,
                height: 30,
                type: 'rect'
            }, {
                top: 210,
                left: 285,
                width: 80,
                height: 15,
                type: 'rect'
            }, {
                top: 228,
                left: 285,
                width: 80,
                height: 12,
                type: 'rect'
            },],
            profitList: [],
            profit: false
        }
    },
    onReady() {
        uni.$on('currency', () => {
            this.symbol = this.$util.getLCS();
            this.symbol_rate = this.$util.getLCR();
        });
        let _this = this;
        uni.$on('profit', (id, amount) => {
            _this.profitList[id] = parseFloat(amount);
            let total = 0;
            _this.profitList.map((val) => {
                total += parseFloat(val);
            });
            _this.profit = total;
        });
        uni.$on('no_position', () => {
            _this.profit = false;
            _this.getBalance();
        });
    },
    onShow() {
        if (!this.isLogin && init === 0) {
            init = 1;
            return this.$mroute.login();
        } else {
            this.getBalance();
        }
        this.setMenu();
        var local = uni.getStorageSync('local-currency');
        this.range = local ? local['text'] : 'USD';
        this.symbol = this.$util.getLCS();
        this.symbol_rate = this.$util.getLCR();
        this.setTabText();
        // setTimeout(() => {
        // 	this.navInit();
        // }, 100)
    },
    computed: {
        ...mapGetters(['isLogin', 'userTheme']),
    },
    watch: {

        showZero(v) {
            if (v == true) {
                this.list = currency.filter((item) => {
                    if (this.tab == 1 && parseFloat(item.balance) > 0) {
                        return true;
                    }
                    if (this.tab == 2 && parseFloat(item.trade_balance) > 0) {
                        return true;
                    }
                    if (this.tab == 3 && parseFloat(item.contract_balance) > 0) {
                        return true;
                    }
                    if (this.tab == 4 && parseFloat(item.future_balance) > 0) {
                        return true;
                    }
                    if (this.tab == 5 && parseFloat(item.finance_balance) > 0) {
                        return true;
                    }
                    return false;
                });
            } else {
                this.list = currency;
            }
        },
        tab(v) {
            if (this.showZero == true) {
                this.list = currency.filter((item) => {
                    if (this.tab == 1 && parseFloat(item.balance) > 0) {
                        return true;
                    }
                    if (this.tab == 2 && parseFloat(item.trade_balance) > 0) {
                        return true;
                    }
                    if (this.tab == 3 && parseFloat(item.contract_balance) > 0) {
                        return true;
                    }
                    if (this.tab == 4 && parseFloat(item.future_balance) > 0) {
                        return true;
                    }
                    if (this.tab == 5 && parseFloat(item.finance_balance) > 0) {
                        return true;
                    }
                    return false;
                });
            } else {
                this.list = currency;
            }
        },
        preferenceVisble(v) {
            if(v) {
                this.hideTabBar();
            }else {
                this.showTabbar();
            }
        }
    },
    methods: {
        hideTabBar() {
            uni.hideTabBar({
                animation: true
            });
        },
        showTabbar() {
            uni.showTabBar({
                animation: true
            });
        },
        navInit(e) {
            console.log(e);
            this.scrollHeight = this.windowHeight - e.height - e.statusBarHeight;
        },
        filterTap() {
            //显示下拉框
            this.$refs.ddmRange.show()
            this.rangeShow = true;
        },
        rangeItemClick(e) {
            this.range = e.text
            uni.setStorageSync('local-currency', e);
            this.$refs.loading.open();
            commonApi.getCurrencyFee(e.value).then(fee => {
                this.$refs.loading.close();
                if (fee.code == 200) {
                    uni.setStorageSync('local-fee', fee.data.tether[e.value.toLowerCase()]);
                    uni.$emit('currency');
                }
            }).catch((e) => {
                this.$refs.loading.close();
            })
            this.rangeClose()
        },
        rangeClose() {
            this.rangeShow = false;
        },
        setMenu() {
            this.tabOption = [
                this.$t('wallete.overview'),
                this.$t('wallete.funding'),
                this.$t('wallete.spot'),
                this.$t('wallete.futures'),
                this.$t('wallete.options'),
                this.$t('wallete.earn'),
                //this.$t('wallete.t6'),
            ];
        },
        search(v) {
            this.list = currency.filter(item => item.symbol.toLowerCase().includes(v.toLowerCase()))
        },
        getBalance() {
            userApi.getBalance().then(res => {
                if (res.code == 200) {
                    var balance = 0;
                    var total = 0;
                    var trade = 0;
                    var contract = 0;
                    var future = 0;
                    var finance = 0;
                    var strategy = 0;
                    res.data.balance.map((item) => {
                        if (item.symbol == 'USDT') {
                            total += parseFloat(item.balance) + parseFloat(item.contract_balance) +
                                parseFloat(item.finance_balance) + parseFloat(item.future_balance) +
                                parseFloat(item.trade_balance);
                            balance += parseFloat(item.balance);
                            trade += parseFloat(item.trade_balance);
                            contract += parseFloat(item.contract_balance);
                            future += parseFloat(item.future_balance);
                            finance += parseFloat(item.finance_balance);
                            strategy += parseFloat(item.strategy_balance);

                        } else {
                            var new_price = parseFloat(item.new_price != null ? item.new_price : 0);
                            total += (parseFloat(item.balance) + parseFloat(item.contract_balance) +
                                parseFloat(item.finance_balance) + parseFloat(item
                                    .future_balance) +
                                parseFloat(item.trade_balance) + parseFloat(item.strategy_balance)) * new_price;

                            balance += parseFloat(item.balance) * new_price;
                            trade += parseFloat(item.trade_balance) * new_price;
                            contract += parseFloat(item.contract_balance) * new_price;
                            future += parseFloat(item.future_balance) * new_price;
                            finance += parseFloat(item.finance_balance) * new_price;
                            strategy += parseFloat(item.strategy_balance) * new_price;
                        }
                    });

                    this.total = total;
                    this.balance = balance;
                    this.trade = trade;
                    this.contract = contract;
                    this.future = future;
                    this.finance = finance;
                    this.strategy = strategy;
                    this.list = res.data.balance;
					this.dayProfit = res.data.dayProfit;
                    currency = res.data.balance;
                }
            });
        },
        tabChange(e) {
            this.tab = e.index;
            this.duration = 0;
        },
        swiperChange(e) {
            this.tab = e.detail.current;
        },
        transition() {
            this.duration = 300;
        },
        onPulling(e) {
            this._refresherShow = true;
            if (e.detail.deltaY > 30) {
                this.refresherText = this.$t('wallet.xin2');
            }
            if (e.detail.deltaY < 30) {
                this.refresherText = this.$t('wallet.xin1');
            }
        },
        onRefresh() {
            console.log("自定义下拉刷新被触发");
            this.refresherTriggered = true;
            this._refresherShow = true;
            this.refresherText = this.$t('wallet.xin3');
            setTimeout(() => {
                this.refresherTriggered = false;
                this._refresherShow = false;
                this.refresherText = this.$t('wallet.xin1');
            }, 1000)
        },
        onRestore() {
            console.log("自定义下拉刷新被复位");
            this.refresherTriggered = false;
            this._refresherShow = false;
        },
        onAbort() {
            console.log("自定义下拉刷新被中止");
            this.refresherTriggered = false;
            this._refresherShow = false;
        },
        setTabText(){
            uni.setTabBarItem({
                index: 0,
                text: this.$t('tab.home')
            })
            uni.setTabBarItem({
                index: 1,
                text: this.$t('tab.quote')
            })
            uni.setTabBarItem({
                index: 2,
                text: this.$t('tab.trade')
            })
            uni.setTabBarItem({
                index: 3,
                text: this.$t('tab.contract')
            })
            uni.setTabBarItem({
                index: 4,
                text: this.$t('tab.assets')
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@import "wallet";
</style>