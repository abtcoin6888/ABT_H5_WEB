<template>
    <view id="home" class="home" :data-theme="userTheme">
        <fui-nav-bar :zIndex="9"
                     statusBar
                     isFixed
                     isOccupy
                     :padding="15"
                     background="var(--background-primary)"
                     custom
                     @init="navInit">
            <view class="nav-bar">
                <view class="nav-bar-avatar" @click="openDraw()">
                    <fui-avatar width="62"
                                height="62"
                                background="var(--background-primary)"
                                src="/static/img/avatar.png">
                    </fui-avatar>
                </view>
                <view class="nav-bar-search"
                      @click="$mroute.coinSearch()">
                    <image class="searchIcon"
                           src="/static/newImage/search-gray.png"
                           mode="widthFix">
                    </image>
                    <text class="font-11 color-gray">
                        BTC & ETH
                    </text>
                </view>
                <view class="nav-bar-button">
                    <!-- <view class="bar-button" @click="scan">
                        <image :src="`/static/newImage/scan-${userTheme}.png`"></image>
                    </view> -->
                    <view class="bar-button" @click="$mroute.webview(2,config.kefu_url,$t('common.kefu'),100)">
                        <image :src="`/static/newImage/customer-${userTheme}.png`"></image>
                    </view>
                    <view class="bar-button" @click="$mroute.message()">
                        <image :src="`/static/newImage/notify-${userTheme}.png`"></image>
                    </view>
                </view>
            </view>
        </fui-nav-bar>
        <view class="page_main">
            <image class="banner-background-image"
                   :src="`/static/newImage/home-banner-background-${userTheme}.png`"
                   mode="widthFix"
                   v-if="isLogin == false">
            </image>
            <!-- banner -->
            <view class="banner" v-if="isLogin == false">
                <image class="banner-image"
                       src="/static/newImage/banner_bg.png"
                       mode="widthFix">
                </image>
                <text class="font-16 font-weight color-black">
                    {{ $t('index.banner_title') }}
                </text>
                <button class="banner-button"
                        @click="$mroute.login()">
                    <text class="font-13 color-white font-weight">
                        {{ $t('index.banner_con') }}
                    </text>
                </button>
            </view>
            <!-- property -->
            <view class="property" v-if="isLogin">
                <view class="property_top">
                    <text class="font-11 color-gray">
                        {{ $t('index.asset') }} {{ profit ? $t('contract.ppt1') : '' }}(USDT)
                    </text>
                    <fui-icon class="ml-5"
                              color="var(--content-tertiary)"
                              size="38"
                              :name="show ? 'visible' : 'invisible'"
                              @click="show = !show">
                    </fui-icon>
                </view>
                <view class="property_con">
                    <view class="property_con_left">
                        <text class="font-24 color-black font-bold" v-if="show">
                            {{ $util.thousandSeparator(assetsTotal + (profit ? profit : 0)) }}
                        </text>
                        <text class="font-24 color-black font-bold" v-else>
                            *****
                        </text>
                        <text class="font-11 color-gray" v-if="show">
                            ≈{{ symbol }}{{
                                $util.thousandSeparator((assetsTotal + (profit ? profit : 0)) * symbol_rate)
                            }}
                        </text>
                        <text class="font-11 color-gray" v-else>≈*****</text>
                    </view>
                    <fui-button background="var(--content-primary)"
                                color="var(--background-primary)"
                                width="160rpx"
                                height="66rpx"
                                radius="66rpx"
                                :size="26"
                                @click="showAddFunds">
                        {{ $t('index.addfunds_t1') }}
                    </fui-button>
                </view>
            </view>
            <!-- menu -->
            <scroll-view scroll-x="true"
                         show-scrollbar="false"
                         class="menu">
                <view class="menu_item"
                      :style="`--menuItem: ${menuList.length}`"
                      v-for="(menuItem, index) in menuList" :key="index" @click="menuItem.click">
                    <view class="imgBox">
                        <image
                            :src="'/static/newImage/' + (userTheme == 'light' ? menuItem.icon : menuItem.darkIcon) + '.png'">
                        </image>
                    </view>
                    <text class="font-11 color-black">{{ $t(menuItem.text) }}</text>
                </view>
            </scroll-view>
            <!-- swiper_wrap -->
            <view class="swiper_wrap">
                <view class="swiper_wrap_left">
                    <swiper class="swiper"
                            :autoplay="true"
                            easing-function="easeInOutCubic"
                            :circular="true"
                            :interval="5000"
                            :duration="300"
                            @change="changeCurrent">
                        <swiper-item v-for="(swiperItem, index) in banner" :key="index">
                            <view class="swiper_item" @click="navBanner(swiperItem)">
                                <image :src="userTheme === 'light' ? swiperItem.cover : swiperItem.cover_dark"></image>
                            </view>
                        </swiper-item>
                    </swiper>
                    <!-- dot -->
                    <view class="swiper_dot">
                        <view class="dot"
                              :class="isActive == index ? 'dot_active' : ''"
                              v-for="(item, index) in banner" :key="item">
                        </view>
                    </view>
                </view>
                <view class="swiper_wrap_right">
                    <view class="swiper_wrap_right_row">
                        <swiper class="swiper_box" :current="current">
                            <swiper-item class="swiper_box_item" @click="$mroute.welfare()">
                                <image class="sub_icon"
                                       src="/static/img/icon_flzx.png" mode="widthFix">
                                </image>
                                <text class="font-15 font-weight font-bold mt-5">
                                    {{ $t('index.fuli') }}
                                </text>
                                <text class="font-12 color-black mt-5">
                                    {{ $t('index.sw_c') }}
                                </text>
                            </swiper-item>
                            <swiper-item class="swiper_box_item"
                                         @click="$mroute.notice()">
                                <image src="/static/help.png"
                                       mode="widthFix">
                                </image>
                                <text class="font-15 color-black font-bold">
                                    {{ $t('index.sw_t') }}
                                </text>
                                <text class="font-12 color-black">
                                    {{ $t('index.sw_c1') }}
                                </text>
                            </swiper-item>
                        </swiper>
                        <image class="refIcon" src="/static/ref.png" mode="" @click="swiperChange()"></image>
                    </view>
                    <view class="swiper_wrap_right_row" @click="$mroute.toIce()">
                        <image src="/static/coin/usdt.png"></image>
                        <text class="font-14 color-black mt-5 font-bold">{{ $t('ice.t32s') }}</text>
                        <!-- <text class="price_up font-12">
                            {{ symbol }}
                            {{ $util.thousandSeparator(symbol_rate * 0.2) }}
                        </text> -->
                    </view>
                </view>
            </view>
            <!-- notice -->
            <view class="notice">
                <view class="notice_left">
                    <image :src="`/static/newImage/notice-${userTheme}.png`"></image>
                    <swiper class="ntSwiper"
                            :vertical="true"
                            :autoplay="true"
                            :circular="true"
                            :interval="3000"
                            :disable-touch="true"
                            :duration="300">
                        <swiper-item v-for="(ntItem, index) in notice" :key="index">
                            <view class="notice_row"
                                  @click="toNoticeDetail(ntItem)">
                                <text class="font-12 color-black">
                                    {{ ntItem.name }}
                                </text>
                            </view>
                        </swiper-item>
                    </swiper>
                </view>
                <view class="more">
                    <image @click="$mroute.notice()"
                           :src="`/static/newImage/more1-${userTheme}.png`">
                    </image>
                </view>
            </view>
            <!-- content_wrap -->
            <view class="content_wrap">
                <fui-tabs scroll
                          alignLeft
                          background="var(--background-primary)"
                          color="var(--content-tertiary)"
                          selectedColor="var(--content-primary)"
                          :isSlider="false"
                          size="30"
                          selectedSize="30"
                          :scale="1"
                          :height="78"
                          :tabs="tabList"
                          :current="tabActive"
                          @change="tabChange"
                ></fui-tabs>
                <view class="list_wrap">
                    <view class="list_top">
                        <view class="_left">
                            <view class="_item" v-if="tabActive == 0" @click="bottomPopup()">
                                <text class="font-11 color-black font-weight" v-if="acDefalut == 0">{{
                                        $t('index.spot')
                                    }}
                                </text>
                                <text class="font-11 color-black font-weight" v-else>{{ $t('index.popup_c') }}</text>
                                <image :src="`/static/img/tactic/down-${userTheme}.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-11 color-gray" v-if="tabActive != 0">{{ $t('index.name') }}</text>
                            <text class="font-11 color-gray">{{ $t('index.latest_price') }}</text>
                        </view>
                        <view class="_right">
                            <text class="font-11 color-gray" v-if="tabActive != 3">24h {{
                                    $t('index.quote_change')
                                }}
                            </text>
                            <text class="font-11 color-gray" v-if="tabActive == 3">24h {{
                                    $t('index.turnover')
                                }}(CNY)
                            </text>
                        </view>
                    </view>
                    <swiper class="select-swiper"
                            :duration="300"
                            :current="tabActive"
                            :style="{ 'height': windowHeight/1.5 + 'px' }"
                            @change="coinSwiperChange">
                        <swiper-item class="select-swiper-item">
                            <view class="select" v-if="loginType && tabActive === 0">
                                <view class="select_list">
                                    <view class="select_list_item"
                                          :class="{ select_list_active: checkedArrey.indexOf(index) != -1 }"
                                          v-for="(item, index) in currencyDesc.slice(0,6)"
                                          :key="index"
                                          @click="appointment(index)">
                                        <view class="_row flex align-center justify-between">
                                            <text class="font-13 color-black font-bold">{{ item.symbol }}USDT</text>
                                            <view class="check-box">
                                                <fui-checkbox :isCheckMark="true"
                                                              checkMarkColor="#03aac7"
                                                              :checked="!item.select"
                                                              scaleRatio="1.4"
                                                              @change="item['select']=!item['select']">
                                                </fui-checkbox>
                                            </view>
                                        </view>
                                        <text class="font-15 font-bold _centerText color-black">
                                            {{ $util.thousandSeparator(item.new_price) }}
                                        </text>
                                        <text class="font-11 font-weight"
                                              :class="{ price_up: item.change_rate >= 0, price_down: item.change_rate < 0 }">
                                            {{ $util.Number2(item['change_rate']) }}%
                                        </text>
                                    </view>
                                </view>
                                <view class="select_button flex align-center justify-center">
                                    <fui-button background="var(--content-primary)"
                                                color="var(--background-primary)"
                                                width="690rpx"
                                                height="78rpx"
                                                size="26"
                                                radius="78rpx"
                                                @click="selectMine()">
                                        {{ $t('index.add_own') }}
                                    </fui-button>
                                </view>
                            </view>
                            <view class="list" v-if="!loginType && tabActive === 0">
                                <view class="item" v-for="(item, index) in mlist" :key="'m' + index"
                                      @click="toKline(item.id,acDefalut === 0 ? 1 : 2)">
                                    <view class="item_left img_left">
                                        <view class="item_row">
                                            <image :src="item.icon" mode="widthFix"></image>
                                            <view class="item_column">
                                                <text class="font-13 color-black font-bold">{{ item.symbol }}</text>
                                                <text class="font-11 color-gray">USDT</text>
                                            </view>
                                        </view>
                                        <view class="item_row flex flex-column align-end">
                                            <view class="item_column">
                                                <text class="font-13 color-black font-bold">
                                                    {{ $util.thousandSeparator(item.new_price, item.decimals) }}
                                                </text>
                                                <text class="font-11 block font-weight color-gray mt-5">
                                                    ≈{{
                                                        symbol
                                                    }}{{ $util.thousandSeparator(item.new_price * symbol_rate, 2) }}
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <view class="item_right">
                                        <view class="rate-tag"
                                              :class="{'bg-green': item.change_rate >= 0, 'bg-red': item.change_rate < 0 }">
                                            <text class="font-12 font-weight always-white" v-if="tabActive != 3">
                                                {{ $util.Number2(item['change_rate']) }}%
                                            </text>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </swiper-item>
                        <!-- 涨幅榜 -->
                        <swiper-item class="select-swiper-item">
                            <view class="list">
                                <view class="item" v-for="(item, index) in currencyDesc" :key="'desc' + index"
                                      @click="toKline(item.id,1)">
                                    <view class="item_left img_left">
                                        <view class="item_row">
                                            <image :src="item.icon" mode="widthFix"></image>
                                            <view class="item_column">
                                                <text class="font-13 color-black font-bold">{{ item.symbol }}</text>
                                                <text class="font-11 color-gray">USDT</text>
                                            </view>
                                        </view>
                                        <view class="item_row">
                                            <view class="item_column">
                                                <text class="font-13 font-bold color-black">
                                                    {{ $util.thousandSeparator(item.new_price, item.decimals) }}
                                                </text>
                                                <text class="font-11 color-gray">
                                                    ≈{{
                                                        symbol
                                                    }}{{
                                                        $util.thousandSeparator(item.new_price * symbol_rate, 2)
                                                    }}
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <view class="item_right">
                                        <view class="rate-tag"
                                              :class="{'bg-green': item.change_rate >= 0, 'bg-red': item.change_rate < 0 }">
                                            <text class="font-12 font-weight always-white" v-if="tabActive != 3">
                                                {{ $util.Number2(item['change_rate']) }}%
                                            </text>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </swiper-item>
                        <!-- 跌幅榜 -->
                        <swiper-item class="select-swiper-item">
                            <view class="list">
                                <view class="item" v-for="(item, index) in currencyASC" :key="'desc' + index"
                                      @click="toKline(item.id,1)">
                                    <view class="item_left img_left">
                                        <view class="item_row">
                                            <image :src="item.icon" mode="widthFix"></image>
                                            <view class="item_column">
                                                <text class="font-13 color-black font-bold">{{ item.symbol }}</text>
                                                <text class="font-11 color-gray">USDT</text>
                                            </view>
                                        </view>
                                        <view class="item_row">
                                            <view class="item_column">
                                                <text class="font-13 font-bold color-black">
                                                    {{ $util.thousandSeparator(item.new_price, item.decimals) }}
                                                </text>
                                                <text class="font-11 color-gray">
                                                    ≈{{
                                                        symbol
                                                    }}{{
                                                        $util.thousandSeparator(item.new_price * symbol_rate, 2)
                                                    }}
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <view class="item_right">
                                        <view class="rate-tag"
                                              :class="{'bg-green': item.change_rate >= 0, 'bg-red': item.change_rate < 0 }">
                                            <text class="font-12 font-weight always-white" v-if="tabActive != 3">
                                                {{ $util.Number2(item['change_rate']) }}%
                                            </text>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </swiper-item>
                        <!-- 成交额 -->
                        <swiper-item class="select-swiper-item">
                            <view class="list">
                                <view class="item" v-for="(item, index) in currencyQuan" :key="'desc' + index"
                                      @click="toKline(item.id,1)">
                                    <view class="item_left img_left">
                                        <view class="item_row">
                                            <image :src="item.icon" mode=""></image>
                                            <view class="item_column">
                                                <text class="font-13 color-black font-bold">{{ item.symbol }}</text>
                                                <text class="font-11 color-gray">USDT</text>
                                            </view>
                                        </view>
                                        <view class="item_row">
                                            <view class="item_column">
                                                <text class="font-13 font-bold color-black">
                                                    {{ $util.thousandSeparator(item.new_price, item.decimals) }}
                                                </text>
                                                <text class="font-11 color-gray">
                                                    ≈{{
                                                        symbol
                                                    }}{{
                                                        $util.thousandSeparator(item.new_price * symbol_rate, 2)
                                                    }}
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <view class="item_right">
                                        <view v-if="tabActive != 3" class="badge_width"
                                              :class="{ badge_up: item.change_rate >= 0, badge_down: item.change_rate < 0 }">
                                            <text class="font-13 font-bold color-black">
                                                {{ $util.Number2(item['change_rate']) }}%
                                            </text>
                                        </view>
                                        <text class="font-13 font-bold color-black">
                                            {{ $util.bigNumberToString(item['quota']) }}
                                        </text>
                                    </view>
                                </view>
                            </view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>

        <!-- 侧边弹出 -->
        <uni-drawer ref="showRight"
                    background="var(--background-primary)"
                    :width="screenWidth"
                    mode="left"
                    :mask-click="false">
            <view class="mineContainer mineDrawer" :style="{'height': windowHeight + 'px' }">
                <fui-nav-bar background="var(--background-primary)"
                             custom
                             :padding="0"
                             @init="navInit">
                    <view class="mineClose">
                        <fui-icon @click="closeMine"
                                  name="arrowleft"
                                  size="56"
                                  color="var(--content-primary)">
                        </fui-icon>
                    </view>
                </fui-nav-bar>
                <scroll-view class="drawer-scroll-view"
                             :scroll-y="true"
                             :style="`height: ${windowHeight - navHeight}px`">
                    <view class="mineLogin flex flex-column"
                          v-if="isLogin == false">
                        <text class="font-20 color-black font-weight">{{ $t('index.welcome') }} {{
                                config['site_name']
                            }}
                        </text>
                        <text class="font-13 color-gray mt-10">{{ $t('index.banner_title') }}</text>
                        <view class="mineLogin-buttons flex flex-row align-center justify-between">
                            <fui-button width="330rpx"
                                        height="68rpx"
                                        radius="68rpx"
                                        background="var(--background-secondary)"
                                        color="var(--content-primary)"
                                        size="26"
                                        @click="$mroute.login()">
                                {{ $t('login.register') }}
                            </fui-button>
                            <fui-button width="330rpx"
                                        height="68rpx"
                                        radius="68rpx"
                                        color="var(--background-primary)"
                                        background="var(--content-primary)"
                                        size="26"
                                        @click="$mroute.login()">
                                {{ $t('login.login_t') }}
                            </fui-button>
                        </view>
                    </view>
                    <view class="mineInfo mt-15" v-if="isLogin">
                        <view class="mineInfo_avatar" @click="$mroute.profile()">
                            <image class="avatar-image"
                                   :src="userinfo['avatar'] ? userinfo['avatar'] : '/static/img/avatar.png'">
                            </image>
                        </view>
                        <view class="mineInfo_phone">
                            <view class="row">
                                <text class="font-18 font-bold color-black" @click="$mroute.profile()">
                                    {{ $util.hideText(userNickname) }}
                                </text>
                                <text class="info-button font-12 color-black" @click="$mroute.profile()">
                                    {{ $t('profile.profile') }}
                                </text>
                            </view>
                            <view class="row">
                                <text class="font-12 color-gray" @click="copy(userinfo['id'])">UID:{{
                                        userinfo['id']
                                    }}
                                </text>
                                <image class="copy-icon"
                                       src="/static/newImage/copy-gray.png"
                                       mode="widthFix"
                                       @click="copy(userinfo['id'])">
                                </image>
                                <view class="real-box"
                                      @click="$mroute.userauth()">
                                    <image class="real-image"
                                           :src="`/static/newImage/real-${userinfo.authStatus == 1 ? 's' : 'n'}.png`"
                                           mode="widthFix">
                                    </image>
                                    <view class="real-type"
                                          :class="userinfo.authStatus == 1 ? 'real-suc' : 'bg-gray'">
                                        <view class="real-type-text">
                                            <text class="font-11 color-red font-weight real-type-text"
                                                  v-if="userinfo.authStatus === -2">
                                                {{ $t('index.notAuth') }}
                                            </text>
                                            <text class="font-11 color-gray font-weight real-type-text"
                                                  v-if="userinfo.authStatus === -1">
                                                {{ $t('usAuth.type_c2') }}
                                            </text>
                                            <text class="font-11 color-gray font-weight real-type-text"
                                                  v-if="userinfo.authStatus === 0">
                                                {{ $t('usAuth.type_c') }}
                                            </text>
                                            <text class="font-11 always-white font-weight real-type-text"
                                                  v-if="userinfo.authStatus === 1">
                                                {{ $t('usAuth.type_c1') }}
                                            </text>
                                        </view>
                                    </view>
                                </view>
                            </view>

                        </view>
                    </view>
                    <view class="invite bg-gray"
                          @click="$mroute.invaite()">
                        <image class="head-bg"
                               src="/static/img/yw.png"
                               mode="widthFix">
                        </image>
                        <view class="head border-bottom">
                            <image class="invite-image"
                                   src="/static/newImage/invate.webp"
                                   mode="widthFix">
                            </image>
                            <view class="head-content">
                                <text class="font-12 color-gray ">
                                    {{ $t('index.polite_invite') }}
                                </text>
                                <text class="font-14 color-black font-bold mt-5">
                                    {{ $t('index.polite_invite_con') }}
                                </text>
                            </view>
                        </view>
                        <view class="bottom">
                            <view class="invite-code">
                                <text class="font-11 color-gray ">
                                    {{ $t('new_home_yic') }}
                                </text>
                                <view class="row"
                                      @click.stop="copyInvateCode">
                                    <text class="font-12 color-black font-bold">
                                        {{ isLogin ? userinfo['invite_code'] : $t('trade.lg_rg') }}
                                    </text>
                                    <image v-if="isLogin"
                                           class="copy-icon"
                                           src="/static/newImage/copy-gray.png"
                                           mode="widthFix">
                                    </image>
                                </view>
                            </view>
                            <view class="invite-button bg-black button-active"
                                  @click="isLogin ? $mroute.invaite() : $mroute.login()">
                                <text class="font-13 color-white font-bold">
                                    {{ isLogin ? $t('invite.t9') : $t('index.banner_con') }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="mineList">
                        <view v-if="isLogin">
                            <view v-if="false" class="mineList_item flex align-center justify-between"
                                  @click="$mroute.userauth()">
                                <view class="flex align-center">
                                    <image class="cell-image" :src="`/static/home/drawer/icon4.png`"></image>
                                    <text class="font-13 color-black font-weight">
                                        {{ $t('index.auth') }}
                                    </text>
                                </view>
                                <view class="flex align-center">
                                    <text class="font-12 color-gray">
                                        {{ $t('index.notAuth') }}
                                    </text>
                                    <fui-icon name="arrowright" size="34" color="var(--content-tertiary)"></fui-icon>
                                </view>
                            </view>
                            <view class="line-view"></view>
                            <view class="mineList_item flex align-center justify-between" @click="$mroute.secrety()">
                                <view class="flex align-center">
                                    <image class="cell-image" :src="`/static/newImage/safecenter-${userTheme}.png`"></image>
                                    <text class="font-13 color-black font-weight">
                                        {{ $t('index.security_center') }}
                                    </text>
                                </view>
                                <view class="flex align-center">
                                    <fui-icon name="arrowright" size="34" color="var(--content-tertiary)"></fui-icon>
                                </view>
                            </view>
                        </view>
                        <view class="line-view"></view>
                        <view class="mineList_item flex align-center justify-between"
                              @click="$mroute.setting()">
                            <view class="flex align-center">
                                <image class="cell-image" :src="`/static/newImage/set-${userTheme}.png`"></image>
                                <text class="font-13 color-black font-weight">
                                    {{ $t('index.setting') }}
                                </text>
                            </view>
                            <view class="flex align-center">
                                <fui-icon name="arrowright" size="34" color="var(--content-tertiary)"></fui-icon>
                            </view>
                        </view>
                        <view class="line-view"></view>
                        <view class="mineList_item flex align-center justify-between"
                              @click="$mroute.webview(1, 'flbz', $t('index.rate'))">
                            <view class="flex align-center">
                                <image class="cell-image" :src="`/static/newImage/rates-${userTheme}.png`"></image>
                                <text class="font-13 color-black font-weight">
                                    {{ $t('index.rate') }}
                                </text>
                            </view>
                            <view class="flex align-center">
                                <fui-icon name="arrowright" size="34" color="var(--content-tertiary)"></fui-icon>
                            </view>
                        </view>
                        <view class="mineList_item flex align-center justify-between"
                              @click="$mroute.webview(1, 'bbbzz', $t('index.qli'))">
                            <view class="flex align-center">
                                <image class="cell-image" :src="`/static/newImage/cre-${userTheme}.png`"></image>
                                <text class="font-13 color-black font-weight">
                                    {{ $t('index.qli') }}
                                </text>
                            </view>
                            <view class="flex align-center">
                                <fui-icon name="arrowright" size="34" color="var(--content-tertiary)"></fui-icon>
                            </view>
                        </view>
                        <view class="mineList_item flex align-center justify-between" @click="$mroute.contact()">
                            <view class="flex align-center">
                                <image class="cell-image" :src="`/static/newImage/con-${userTheme}.png`"></image>
                                <text class="font-13 color-black font-weight">
                                    {{ $t('index.connect') }}
                                </text>
                            </view>
                            <view class="flex align-center">
                                <fui-icon name="arrowright" size="34" color="var(--content-tertiary)"></fui-icon>
                            </view>
                        </view>
                        <view class="mineList_item flex align-center justify-between" @click="$mroute.about()">
                            <view class="flex align-center">
                                <image class="cell-image" :src="`/static/newImage/about-${userTheme}.png`"></image>
                                <text class="font-13 color-black font-weight">
                                    {{ $t('index.about') }}
                                </text>
                            </view>
                            <view class="flex align-center">
                                <fui-icon name="arrowright" size="34" color="var(--content-tertiary)"></fui-icon>
                            </view>
                        </view>
                    </view>
                    <view class="loginOut-box" v-if="isLogin">
                        <fui-button height="78rpx" radius="78rpx" size="26" color="var(--content-primary)"
                                    background="var(--background-secondary)" @click="loginOut">
                            {{ $t('index.sign_out') }}
                        </fui-button>
                    </view>
                </scroll-view>
            </view>
        </uni-drawer>

        <uni-popup ref="popup" type="bottom" :safe-area="false" :mask-click="false">
            <view class="popup">
                <view class="_title">
                    <text class="font-16 color-black font-weight">{{ $t('index.popup_t') }}</text>
                    <view class="close" @click="closePopup">
                        <fui-icon name="close" size="48" color="var(--black)"></fui-icon>
                    </view>
                </view>
                <view class="popup-content">
                    <view class="item" :class="acDefalut == 0 ? 'active' : ''" @click="btnChange(0)">
                        <text class="font-13" :class="acDefalut == 0 ? 'color-blue' : 'color-gray'">{{
                                $t('index.spot')
                            }}
                        </text>
                    </view>
                    <view class="item" :class="acDefalut == 1 ? 'active' : ''" @click="btnChange(1)">
                        <text class="font-13" :class="acDefalut == 1 ? 'color-blue' : 'color-gray'">
                            {{ $t('index.popup_c') }}
                        </text>
                    </view>
                </view>
            </view>
        </uni-popup>

        <!--升级弹窗-->
        <uni-popup ref="upgrade" type="center" :mask-click="false">
            <view class="upgrade-wrap">
                <text class="up_title">{{ $t('index.new_ver') }}</text>
                <text class="version_num">V:{{ update['app_version'] }}</text>
                <scroll-view class="upgrade-scroll" :scroll-y="true">
                    <text class="font-12 font-weight">{{ update['content'] }}</text>
                </scroll-view>
                <button class="up-button" @click="updateClient(true)">{{ $t('index.upgrade') }}</button>
                <text class="up-tip font-12 font-weight" @click="updateClient(false)">{{ uptext }}</text>
            </view>
        </uni-popup>

        <alert ref="alert" :title="$t('login.tip_t2')" :content="content"></alert>

        <!--新增弹出层-->
        <fui-backdrop :zIndex="999" :show="giftDrop" @click="giftDrop = false">
            <view class="gift-popup" v-if="activeList.length > 0">
                <view class="gift-popup-card" @click="toActive()">
                    <image class="new-popup-bg" :src="activeList[activeIndex]['img1']"></image>
                    <view class="title">
                        <text class="font-27 color-white font-weight">{{ activeList[activeIndex]['title'] }}</text>
                        <text class="font-27 color-white font-weight reward">
                            <text class="color-warring">{{
                                    activeList[activeIndex]['subtitle']
                                }}
                            </text>
                        </text>
                    </view>
                    <view class="time-box">
                        <view class="time-box-con">
                            <view class="top">
                                <text class="font-14 color-white">{{ activeList[activeIndex]['brief'] }}</text>
                            </view>
                            <view class="bottom">
                                <text class="font-13 color-black">{{ activeList[activeIndex]['start_at'] }} -
                                    {{ activeList[activeIndex]['end_at'] }}
                                </text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="gift-popup-close" @click="closeActive">
                    <fui-icon name="clear" size="48" color="#ffffff"></fui-icon>
                </view>
            </view>
        </fui-backdrop>

        <!-- 新增弹窗(添加资产) -->
        <fui-bottom-popup background="var(--background-primary)" :show="addFundsPopup" @close="addFundsPopup = false">
            <view class="addfunds-popup">
                <view class="popup-title">
                    <text class="font-16 color-black font-weight">{{ $t('index.addfunds_t0') }}</text>
                    <view class="close" @click="addFundsPopup = false">
                        <fui-icon name="close" size="48" color="var(--black)"></fui-icon>
                    </view>
                </view>
                <!--  拥有加密货币/Own cryptocurrency  -->
                <view class="list-box">
                    <view class="list-box-tip">
                        <image class="tip-icon" :src="`/static/newImage/safe-${userTheme}.png`" mode="widthFix"></image>
                        <text class="font-12 price_up tip-text">{{ $t('index.addfunds_t2') }}</text>
                    </view>
                    <view class="list-box-title">
                        <text class="font-13 color-dark">{{ $t('index.addfunds_t3') }}</text>
                    </view>
                    <!--   充值   -->
                    <view
                        class="list-box-card"
                        @click="
							addFundsPopup = false;
							$mroute.recharge();
						"
                    >
                        <image class="card-icon" :src="`/static/newImage/recharge-${userTheme}.png`"
                               mode="widthFix"></image>
                        <view class="card-info">
                            <text class="font-14 color-black font-weight">{{ $t('index.recharge') }}</text>
                            <text class="font-11 color-gray desc">{{ $t('index.addfunds_t7') }}</text>
                        </view>
                    </view>
                </view>
                <!--  没有加密货币/no cryptocurrency  -->
<!--                <view class="list-box">-->
<!--                    <view class="list-box-title">-->
<!--                        <text class="font-13 color-dark">{{ $t('index.addfunds_t4') }}</text>-->
<!--                    </view>-->
<!--                    &lt;!&ndash;   快捷买币   &ndash;&gt;-->
<!--                    <view-->

<!--                        class="list-box-card"-->
<!--                        @click="-->
<!--							addFundsPopup = false;-->
<!--							$mroute.toQuickly();-->
<!--						"-->
<!--                    >-->
<!--                        <image class="card-icon" :src="`/static/newImage/quick-${userTheme}.png`"-->
<!--                               mode="widthFix"></image>-->
<!--                        <view class="card-info">-->
<!--                            <text class="font-14 color-black font-weight">{{ $t('index.addfunds_t5') }}</text>-->
<!--                            <text class="font-12 color-gray desc">{{ $t('index.addfunds_t6') }}</text>-->
<!--                        </view>-->
<!--                    </view>-->
<!--                </view>-->




            </view>
        </fui-bottom-popup>
    </view>
</template>

<script>
import service from './servicevue.js'

export default service;
</script>

<style lang="scss">
@import 'index.scss';
</style>

<style scoped>
/deep/ .fui-tabs__item {
    padding: 0 30rpx 0 0 !important;
}

/deep/ .fui-button__active::after {
    background: transparent !important;
}
</style>
