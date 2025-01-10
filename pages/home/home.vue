<template>
    <view class="home" id="home" :data-theme="userTheme">
        <view class="header">
            <view class="openApp">
                <image class="logo" src="@/static/home/cblogo192.png" mode="widthFix"></image>
                <view class="info">
                    <view class="infoLeft">
                        <text class="font-14 color-black">{{ config['site_name'] }}</text>
                        <text class="font-12 color-gray">{{ $t('home.t15') }}</text>
                    </view>
                    <button class="openButton" @click="$mroute.downloadPage()">{{ $t('home.t16') }}</button>
                </view>
            </view>
            <view class="nav">
                <image class="logo" :src="`/static/home/${userTheme == 'light' ? 'cc' : 'cv'}logo.png`" mode="widthFix"></image>
                <div class="_r">
                    <button @click="$mroute.login">{{ $t('home.t1') }}</button>
                    <image @click="showDrawer" class="menuImage" :src="`/static/home/menu-${userTheme}.png`"
                           mode="widthFix"></image>
                </div>
            </view>
        </view>

        <view class="banner">
            <text class="color-black font-24 font-bold">
                {{ config['site_name'] }}
            </text>
            <text class="color-black font-18 font-bold">
                {{ $t('home.t2') }}
            </text>
            <view class="_rg">
                <image :src="`/static/home/banner_rewards_${userTheme}.png`" mode="widthFix"></image>
                <text>{{ $t('home.tt1') }}</text>
                <fui-icon name="arrowright" color="var(--black)" size="40"></fui-icon>
            </view>
            <button class="rg_button" @click="$mroute.login()">
                {{ $t('home.t3') }}
            </button>
        </view>

        <view class="notice">
            <image src="/static/home/icon-notice.png" mode="widthFix"></image>
            <swiper class="noticeInfo" :autoplay="true" :circular="true" :vertical="true" :interval="3000"
                    :duration="500">
                <swiper-item class="item" v-for="(item, index) in notice" :key="index" @click="toNoticeDetail(item)">
                    <text>{{ item.name }}</text>
                </swiper-item>
            </swiper>
        </view>

        

        <view class="currencies">
            <text class="title">{{ $t('home.tt2') }}</text>
            <view class="tab">
                <view class="item" :class="{ 'item-active': tabActive == index }" v-for="(item, index) in tab"
                      :key="index"
                      @click="tabChange(index)">
                    <text>{{ $t(item) }}</text>
                </view>
            </view>
            <view class="coinList">
                <view class="_hd">
                    <view class="item">
                        <text>#</text>
                    </view>
                    <view class="item">
                        <text>{{ $t('home.t4') }}</text>
                    </view>
                    <view class="item">
                        <text>{{ $t('home.t5') }}</text>
                    </view>
                    <view class="item">
                        <text>{{ $t('home.t6') }}</text>
                    </view>
                </view>
                <view class="_btm">
                    <template v-if="tabActive === 0">
                        <view class="cell" v-for="(item, index) in hotCurrencyList.slice(0,10)">
                            <view class="item">
                                <text>{{ index + 1 }}</text>
                            </view>
                            <view class="item">
                                <image :src="item.icon" mode="widthFix"></image>
                                <text class="font-14 color-black font-bold">{{ item.symbol }}</text>
                                <text class="font-12 color-gray ml-5">/USDT</text>
                            </view>
                            <view class="item">
                                <text class="font-14 color-black font-bold">{{
                                        $util.thousandSeparator(item.new_price)
                                    }}
                                </text>
                            </view>
                            <view class="item">
                                <text class="font-14 font-bold"
                                      :class="{ 'price_up': item.change_rate > 0, 'color-black': item.change_rate == 0, 'price_down': item.change_rate < 0 }">
                                    {{ $util.thousandSeparator(item.change_rate) }}%
                                </text>
                            </view>
                        </view>
                    </template>
                    <template v-if="tabActive === 1">
                        <view class="cell" v-for="(item, index) in currencyDesc.slice(0, 10)">
                            <view class="item">
                                <text>{{ index + 1 }}</text>
                            </view>
                            <view class="item">
                                <image :src="item.icon" mode="widthFix"></image>
                                <text class="font-14 color-black font-bold">{{ item.symbol }}</text>
                                <text class="font-12 color-gray ml-5">/USDT</text>
                            </view>
                            <view class="item">
                                <text class="font-14 color-black font-bold">{{
                                        $util.thousandSeparator(item.new_price)
                                    }}
                                </text>
                            </view>
                            <view class="item">
                                <text class="font-14 font-bold"
                                      :class="{ 'price_up': item.change_rate > 0, 'color-black': item.change_rate == 0, 'price_down': item.change_rate < 0 }">
                                    {{ $util.thousandSeparator(item.change_rate) }}%
                                </text>
                            </view>
                        </view>
                    </template>
                    <template v-if="tabActive === 2">
                        <view class="cell" v-for="(item, index) in currencyASC.slice(0, 10)">
                            <view class="item">
                                <text>{{ index + 1 }}</text>
                            </view>
                            <view class="item">
                                <image :src="item.icon" mode="widthFix"></image>
                                <text class="font-14 color-black font-bold">{{ item.symbol }}</text>
                                <text class="font-12 color-gray ml-5">/USDT</text>
                            </view>
                            <view class="item">
                                <text class="font-14 color-black font-bold">{{
                                        $util.thousandSeparator(item.new_price)
                                    }}
                                </text>
                            </view>
                            <view class="item">
                                <text class="font-14 font-bold"
                                      :class="{ 'price_up': item.change_rate > 0, 'color-black': item.change_rate == 0, 'price_down': item.change_rate < 0 }">
                                    {{ $util.thousandSeparator(item.change_rate) }}%
                                </text>
                            </view>
                        </view>
                    </template>
                    <template v-if="tabActive === 3">
                        <view class="cell" v-for="(item, index) in currencyQuan.slice(0, 10)">
                            <view class="item">
                                <text>{{ index + 1 }}</text>
                            </view>
                            <view class="item">
                                <image :src="item.icon" mode="widthFix"></image>
                                <text class="font-14 color-black font-bold">{{ item.symbol }}</text>
                                <text class="font-12 color-gray ml-5">/USDT</text>
                            </view>
                            <view class="item">
                                <text class="font-14 color-black font-bold">{{
                                        $util.thousandSeparator(item.new_price)
                                    }}
                                </text>
                            </view>
                            <view class="item">
                                <text class="font-14 font-bold"
                                      :class="{ 'price_up': item.change_rate > 0, 'color-black': item.change_rate == 0, 'price_down': item.change_rate < 0 }">
                                    {{ $util.thousandSeparator(item.change_rate) }}%
                                </text>
                            </view>
                        </view>
                    </template>
                    <view class="seeAll">
                        <button @click="$mroute.login()">
                            {{ $t('home.tt3') }}
                            <fui-icon name="arrowright" size="38" color="var(--black)"></fui-icon>
                        </button>
                    </view>
                    <view class="tranList">
                        <view class="rowGroup">
                            <view class="item" v-for="(item,index) in hotCurrencyList" :key="'scroll'+item.id">
                                <image :src="item['icon']" mode="widthFix"></image>
                                <view class="info">
                                    <text class="coin">{{ item['symbol'] }}USDT</text>
                                    <view class="rt">
                                        <text>{{ $util.thousandSeparator(item['new_price'], item['decimals']) }}</text>
                                        <text class="font-12"
                                              :class="{ 'price_up': item.change_rate > 0, 'color-black': item.change_rate == 0, 'price_down': item.change_rate < 0 }">
                                            {{ $util.thousandSeparator(item.change_rate, 2) }}%
                                        </text>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="rowGroup">
                            <view class="item" v-for="(item,index) in currencyQuan" :key="'scr2'+item.id">
                                <image :src="item['icon']" mode="widthFix"></image>
                                <view class="info">
                                    <text class="coin">{{ item['symbol'] }}USDT</text>
                                    <view class="rt">
                                        <text>{{ $util.thousandSeparator(item['new_price'], item['decimals']) }}</text>
                                        <text class="font-12"
                                              :class="{ 'price_up': item.change_rate > 0, 'color-black': item.change_rate == 0, 'price_down': item.change_rate < 0 }">
                                            {{ $util.thousandSeparator(item.change_rate, 2) }}%
                                        </text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- <view class="copy">
            <image class="bgImage" :src="`/static/home/copyhomebg_${userTheme}.png`" mode="widthFix"></image>
            <text class="title">{{ $t('跟单交易') }}</text>
            <text class="font-20 color-black mb-15">{{ $t('home.tt4') }}</text>
            <text class="font-24 color-black mb-5">100,000+</text>
            <text class="font-12 color-black mb-15">{{ $t('home.tt5') }}</text>
            <text class="font-24 color-black mb-5">410,000+</text>
            <text class="font-12 color-black mb-15">{{ $t('home.tt6') }}</text>
            <text class="font-24 color-black mb-5">$350,0000,000+</text>
            <text class="font-12 color-black">{{ $t('home.tt7') }}</text>
            <view class="seeAll">
                <button>
                    {{ $t('home.tt3') }}
                    <fui-icon name="arrowright" size="38" color="var(--black)"></fui-icon>
                </button>
            </view>
            <view class="listWrap">
                <view class="cardList">
                    <view class="cardItem" v-for="i in 20">
                        <view class="head">
                            <view class="usImage">
                                <image src="/static/img/avatar.png"></image>
                                <image class="rankIcon" src="/static/home/trader_top_1.svg" v-show="i == 1"></image>
                                <image class="rankIcon" src="/static/home/trader_top_2.svg" v-show="i == 2"></image>
                                <image class="rankIcon" src="/static/home/trader_top_3.svg" v-show="i == 3"></image>
                            </view>
                            <view class="usInfo">
                                <view class="row">
                                    <text class="font-16 color-black font-bold">
                                        {{ randName[i] ? randName[i] : 'CBUSER-TB130' + i }}
                                    </text>
                                    <image src="/static/home/bronze.png" v-if="i == 1"></image>
                                    <image src="/static/home/platinum.png" v-if="i == 2"></image>
                                    <image src="/static/home/gold.png" v-if="i == 3"></image>
                                    <image src="/static/home/legend.png" v-if="i == 4"></image>
                                </view>
                                <view class="row">
                                    <text class="font-12 color-black">
                                        @{{ randName[i] ? randName[i] : 'CBUSER-TB130' + i }}
                                    </text>
                                </view>
                            </view>
                        </view>
                        <view class="content">
                            <text class="font-23 font-bold price_up mb-10 _rate">
                                {{ parseFloat(Math.random(1000, 100000) * 100).toFixed(2) }}%
                            </text>
                            <view class="row">
                                <text class="font-12 color-gray">{{ $t('follow.rate_return') }}</text>
                            </view>
                            <view class="canvasBox">
                                <canvas></canvas>
                            </view>
                            <view class="row">
                                <text class="font-12 color-gray">{{ $t('follow.total_revenue') }}</text>
                                <text class="font-14 color-black">
                                    ${{ parseFloat(Math.random(10000, 100000000) * 100000).toFixed(2) }}
                                </text>
                            </view>
                            <view class="row">
                                <text class="font-12 color-gray">{{ $t('home.tt8') }}</text>
                                <text class="font-14 color-black">
                                    ${{ parseFloat(Math.random(10000, 100000000) * 1000).toFixed(2) }}
                                </text>
                            </view>
                            <view class="row">
                                <text class="font-12 color-gray">AUM</text>
                                <text class="font-14 color-black">
                                    ${{ parseFloat(Math.random(10000, 100000000) * 10000000).toFixed(2) }}
                                </text>
                            </view>
                            <view class="row">
                                <text class="font-12 color-gray">{{ $t('tradeInfo.maximum_drawdown') }}</text>
                                <text class="font-14 color-black">
                                    {{ parseFloat(Math.random(10000, 100000000) * 1000).toFixed(2) }}%
                                </text>
                            </view>
                            <view class="row">
                                <view class="coinImage">
                                    <image src="https://static-dev.bbbtrade.net/coin/btc.png"></image>
                                    <image src="https://static-dev.bbbtrade.net/coin/eth.png"></image>
                                    <image src="https://static-dev.bbbtrade.net/coin/usdt.png"></image>
                                </view>
                                <view class="rate">
                                    <text>
                                        <image :src="`/static/home/i1-${userTheme}.png`" mode="widthFix"></image>
                                        {{ parseFloat(Math.random(1000, 100000) * 100).toFixed(0) }}
                                    </text>
                                    <text>
                                        <image :src="`/static/home/i2-${userTheme}.png`" mode="widthFix"></image>
                                        {{ parseFloat(Math.random(1000, 100000) * 100).toFixed(2) }}%
                                    </text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view> -->
        <view class="panel">
            <text class="title">{{ $t('home.tt9') }}</text>
            <text class="font-13 color-black">{{ $t('home.tt10') }}</text>
            <view class="scrollWarp">
                <scroll-view :scroll-x="true" :show-scrollbar="false" class="scrollX">
                    <view class="item _item">
                        <image src="/static/home/one_proof_dark.png"></image>
                        <text class="font-20 color-black font-bold mb-15">{{ $t('home.tt11') }}</text>
                        <text class="font-14 color-gray">{{ $t('home.tt12') }}</text>
                    </view>
                    <view class="item _item">
                        <image src="/static/home/two_storage_dark.png"></image>
                        <text class="font-20 color-black font-bold mb-15">{{ $t('home.tt13') }}</text>
                        <text class="font-14 color-gray">{{ $t('home.tt14') }}</text>
                    </view>
                    <view class="item _item">
                        <image src="/static/home/three_protection_dark.png"></image>
                        <text class="font-20 color-black font-bold mb-15">{{ $t('home.tt15') }}</text>
                        <text class="font-14 color-gray">{{ $t('home.tt16') }}</text>
                    </view>
                </scroll-view>
            </view>
        </view>
        <view class="panel" v-for="(item, index) in ecologyGroup">
            <text class="title">{{ $t(item.title) }}</text>
            <view class="meta" v-if="index == 1">
                <text class="color-gray">{{ $t('home.t7') }}</text>
                <fui-icon name="arrowright" color="var(--text-gray)" size="36"></fui-icon>
            </view>
            <view class="scrollWarp" v-if="index == 0">
                <scroll-view :scroll-x="true" :show-scrollbar="false" class="scrollX">
                    <view class="item" v-for="(sitem, sindex) in item.swiper">
                        <image :src="sitem.src"></image>
                        <text class="font-20 color-black font-bold mb-15">{{ $t(sitem.title) }}</text>
                        <text class="font-14 color-gray">{{ $t(sitem.content) }}</text>
                    </view>
                </scroll-view>
            </view>
            <view class="product" v-if="index == 1">
                <view class="product-item" v-for="(sitem, sindex) in item.product" :key="sindex">
                    <image :src="sitem.src" mode=""></image>
                    <text>{{ $t(sitem.text) }}</text>
                </view>
                <image class="float-image" src="/static/home/ecology-float.png" mode="widthFix"></image>
            </view>
        </view>

        <!-- download wrap -->
        <view class="download-wrap">
            <text class="title">{{ $t('home.t8') }}</text>
            <image class="download-banner" src="/static/home/mobile-download.png" mode="widthFix"></image>
            <view class="package">
                <view class="item" @click="downloadApp(0)">
                    <image :src="`/static/home/iOS-${userTheme}.png`" mode="widthFix"></image>
                    <text>IOS</text>
                </view>
                <view class="item" @click="downloadApp(1)">
                    <image :src="`/static/home/android-${userTheme}.png`" mode="widthFix"></image>
                    <text>Android</text>
                </view>
                <view class="item" @click="downloadApp(1)">
                    <image :src="`/static/home/googleplay-${userTheme}.png`" mode="widthFix"></image>
                    <text>Google Play</text>
                </view>
            </view>
            <!-- qrcode -->
            <view class="download-qrcode">
                <image class="qrcode" :src="config['dpage']" mode=""></image>
                <view class="_con">
                    <text>{{ $t('home.t9') }}</text>
                    <text>iOS & Android</text>
                </view>
            </view>
        </view>
        <!-- invite -->
        <view class="invite-wrap">
            <view class="content">
                <view class="title-box">
                    <text>{{ $t('home.t10') }}{{ config['site_name'] }}{{ $t('home.t11') }}</text>
                    <text>{{ $t('home.t12') }}</text>
                </view>
                <image src="/static/home/invite-banner.png" mode=""></image>
                <button @click="$mroute.login">{{ $t('home.t13') }}</button>
            </view>
        </view>
        <!-- footer -->
        <view class="footer">
            <view class="f_h">
                <image src="/static/home/cvlogo.png" mode="widthFix"></image>
                <text>
                    {{ $t('home.t14') }}
                </text>
            </view>
            <view class="f_c">
                <uni-collapse style="min-height: 80rpx;">
                    <uni-collapse-item v-for="(item, index) in collapse" :title="$t(item.title)" :key="index">
                        <view class="txt-item" v-for="(sitem, sindex) in item.list" :key="sindex"
                              @click="navIcat(sitem)">
                            <text>{{ $t(sitem.t) }}</text>
                        </view>
                    </uni-collapse-item>
                </uni-collapse>
                <view class="m_i">
                    <text>{{ $t('home.t19') }}</text>
                    <view class="medias">
                        <image src="/static/home/medias-icon1.png"
                               mode="" @click="openContact(contact['twitter'])"></image>
                        <image src="/static/home/medias-icon2.png"
                               mode="" @click="openContact(contact['facebook'])"></image>
                        <image src="/static/home/medias-icon3.png"
                               mode="" @click="openContact(contact['instagram'])"></image>
                        <image src="/static/home/medias-icon4.png"
                               mode=""></image>
                        <image src="/static/home/medias-icon5.png"
                               mode=""></image>
                        <image src="/static/home/medias-icon6.png"
                               mode="" @click="openContact(contact['telegram'])"></image>
                    </view>
                </view>
            </view>
            <view class="f_b">
                <text>{{ config['site_name'] }} © 2020 - 2024</text>
            </view>
        </view>
        <!-- drawer -->
        <fui-drawer :show="drawerShow" :direction="right" :maskClosable="true" @close="closeDrawer">
            <view class="drawer-box">
                <view class="close">
                    <uni-icons @click="closeDrawer" type="closeempty" color="var(--black)" size="24"></uni-icons>
                </view>
                <!-- not login -->
                <view class="not-log">
                    <button @click="$mroute.login()">{{ $t('home.t17') }}</button>
                    <button @click="$mroute.login()">{{ $t('home.t1') }}</button>
                </view>
                <!-- list -->
                <view class="list">
                    <view class="_row" @click="$mroute.downloadPage()">
                        <image src="/static/home/drawer-icon2.png" mode=""></image>
                        <text>{{ $t('home.t16') }}</text>
                    </view>
                    <uni-collapse style="min-height: 120rpx;">
                        <uni-collapse-item :open="true">
                            <template v-slot:title>
                                <image src="/static/home/drawer-icon3.png" mode=""></image>
                                <text>{{ $t(checkedTxt) }}</text>
                            </template>
                            <view class="content">
                                <radio-group @change="radioChange">
                                    <label class="label" v-for="(item, index) in items" :key="item.value">
                                        <text>{{ $t(item.name) }}</text>
                                        <radio :value="item.value" :checked="lang === item.value"/>
                                        <!-- radio -->
                                        <view class="radio" :class="lang === item.value ? 'radio-active' : ''"></view>
                                    </label>
                                </radio-group>
                            </view>
                        </uni-collapse-item>
                    </uni-collapse>
                    <!-- 主题切换 -->
                    <uni-collapse style="min-height: 120rpx;">
                        <uni-collapse-item :open="false">
                            <template v-slot:title>
                                <image src="/static/home/drawer-icon3.png" mode=""></image>
                                <text>{{ $t('common.them') }}</text>
                            </template>
                            <view class="content">
                                <radio-group @change="themChange">
                                    <label class="label">
                                        <text>{{ $t('common.light') }}</text>
                                        <radio value="light" :checked="userTheme == 'light'"/>
                                        <!-- radio -->
                                        <view class="radio" :class="userTheme == 'light' ? 'radio-active' : ''"></view>
                                    </label>
                                    <label class="label">
                                        <text>{{ $t('common.dark') }}</text>
                                        <radio value="dark" :checked="userTheme == 'dark'"/>
                                        <!-- radio -->
                                        <view class="radio" :class="userTheme == 'dark' ? 'radio-active' : ''"></view>
                                    </label>
                                </radio-group>
                            </view>
                        </uni-collapse-item>
                    </uni-collapse>
                    <view class="_row" @click="$mroute.webview(1, 'gywm', $t('home.t18'))">
                        <image src="/static/home/drawer-icon4.png" mode=""></image>
                        <text>{{ $t('home.t18') }}</text>
                    </view>
                </view>
            </view>
        </fui-drawer>
    </view>
</template>

<script>
import {windowWidth} from 'vant/lib/utils';
import {mapState, mapGetters} from 'vuex';
import common from "@/common/api/common";
import currency from "@/common/api/currency";
import config from "@/common/api/config";

export default {
    data() {
        return {
            current: 0,
            swiper: ["slide2", "slide4"],
            tab: ["home.t20", "home.t21", "home.t22", "home.t23"],
            tabActive: 0,
            brandGroup: [{
                src: "/static/home/m-brand1.png",
                title: "home.t24",
                gradient: "home.t25",
                contxt: "home.t26",
            }, {
                src: "/static/home/m-brand2.png",
                title: "home.t27",
                gradient: "home.t28",
                contxt: "home.t29",
            }, {
                src: "/static/home/m-brand3.png",
                title: "home.t30",
                gradient: "home.t31",
                contxt: "home.t32",
            }, {
                src: "/static/home/m-brand4.png",
                title: "home.t33",
                gradient: "home.t34",
                contxt: "home.t35",
            }],
            ecologyGroup: [{
                title: 'home.t36',
                swiper: [{
                    title: 'home.t37',
                    content: 'home.t38',
                    src: "/static/home/product1.png"
                }, {
                    title: 'home.t39',
                    content: 'home.t40',
                    src: "/static/home/product2.png"
                }, {
                    title: 'home.t41',
                    content: 'home.t42',
                    src: "/static/home/product3.png"
                }, {
                    title: 'home.t43',
                    content: 'home.t44',
                    src: "/static/home/product4.png"
                }, {
                    title: 'home.t45',
                    content: 'home.t46',
                    src: "/static/home/product5.png"
                }]
            }, {
                title: this.$t('home.t47'),
                product: [{
                    src: "/static/home/ecology1.png",
                    text: "home.t48",
                }, {
                    src: "/static/home/ecology2.png",
                    text: "home.t49",
                }, {
                    src: "/static/home/ecology3.png",
                    text: "home.t50",
                }, {
                    src: "/static/home/ecology4.png",
                    text: "home.t51",
                }, {
                    src: "/static/home/ecology5.png",
                    text: "home.t52",
                }]
            }
            ],
            collapse: [{
                title: "home.t53",
                list: [{t: "home.t54", code: "gywm"}, {t: "home.t55", code: "blog"}, {t: "home.t56", code: "white"}]
            }, {
                title: "home.t57",
                list: [{t: "home.t58", code: "yhxy"}, {t: "home.t59", code: "ysxy"}, {t: "home.t60", code: "mzsm"}]
            }, {
                title: "home.t61",
                list: [{t: "home.t62", code: "flbz"}, {t: "home.t63", code: "sbsq"}, {
                    t: "home.t64",
                    p: config.HELP_URL
                }]
            }, {
                title: "home.t65",
                list: [{t: "home.t66", p: config.HELP_URL}, {t: "home.t67", code: "wtfk"}, {
                    t: "home.t68",
                    u: this.$mroute.downloadPage
                }]
            }],
            windowWidth: uni.getWindowInfo().windowWidth,
            items: [
                {
                    value: 'zh-Hant',
                    name: '繁體中文'
                },
                {
                    value: 'en',
                    name: 'English'
                },
                {
                    value: 'ja',
                    name: '日本語'
                },
                {
                    value: 'ko',
                    name: '한국인'
                },
            ],
            checked: 0,
            checkedTxt: 'setting.language_select',
            notice: [],
            banner: [],
            currencyDesc: [],
            currencyASC: [],
            currencyQuan: [],
            hotCurrencyList: [],
            lang: "en",

            drawerShow: false,
            randName: [
                "日进斗金", "CBUSER-TO1231", "趋势之王", "Super Trader", "Get-richtogether", "WinMore", "Professional Bit", "CBUSER-T1242"
            ],
            contact: {}
        }
    },
    computed: {
        ...mapState(['config', 'userinfo']),
        ...mapGetters(['userTheme'])
    },
    onShow() {
        // this.userTheme = 'light';
        this.getNotice();
        this.getBanner();
        var lang = uni.getStorageSync('lang');
        if (typeof lang != 'undefined' && lang != '') {
            this.lang = lang;
        } else {
            this.lang = 'en';
        }
    },
    onReady() {
        this.getTradeCurrencyList();
        this.getContact();
        // setInterval(()=>{
        // 	this.getTradeCurrencyList();
        // },4000);

        uni.$on('trades', (data) => {
            this.onTradeMessage(data);
        });
    },
    methods: {
        onTradeMessage(data) {
            if (data.type !== 100) {
                return false;
            }
            //接收现货行情数据
            if(this.tabActive === 0){
                this.hotCurrencyList = this.$util.compareCurrency(this.hotCurrencyList,data.data);
            }
            if(this.tabActive === 1){
                this.currencyDesc = this.$util.compareCurrency(this.hotCurrencyList,data.data);
            }
            if(this.tabActive === 2){
                this.currencyASC = this.$util.compareCurrency(this.hotCurrencyList,data.data);
            }
            if(this.tabActive === 3){
                this.currencyQuan = this.$util.compareCurrency(this.hotCurrencyList,data.data);
            }
            this.$forceUpdate();
        },
        getContact() {
            common.config(5).then(res => {
                this.contact = res.data;
            })
        },
        openContact(u) {
            window.open(u);
        },
        themChange(e) {
            console.log(e);
            this.toggleUserTheme(e.detail.value, e.detail.value == 'light' ? 0 : 1);
            uni.setStorageSync('mthem', e.detail.value);
            this.userTheme = e.detail.value;
        },
        navIcat(item) {
            if (typeof item.u != 'undefined') {
                return item.u();
            }
            if (typeof item.p != 'undefined') {
                return this.$mroute.webview(2, item.p, this.$t(item.t));
            }
            return this.$mroute.webview(1, item.code, this.$t(item.t));
        },
        downloadApp(e) {
            if (e === 0) {
                window.location.href = this.config['ios_url']
            } else {
                window.location.href = this.config['download']
            }
        },
        async getTradeCurrencyList() {
            const tradeCurrency = await currency.tradeCurrencyList(1);
            uni.setStorage({
                key: "trade-currency",
                data: tradeCurrency['data']
            });
            this.currencyDesc = this.$util.sortDesc(tradeCurrency['data'][0]['currency']);
            this.currencyASC = this.$util.sortAsc(tradeCurrency['data'][0]['currency']);
            this.currencyQuan = this.$util.sortQuan(tradeCurrency['data'][0]['currency']);
            this.hotCurrencyList = tradeCurrency['data'][0]['currency'].slice(0, 5);
        },
        async getBanner() {
            var result = await common.getBanner('h5banner');
            this.banner = result.data;
        },
        async getNotice() {
            let notice = await common.getNotice();
            this.notice = notice.data;
        },
        navBanner(item) {
            if (parseInt(item.object_type) === 1) {
                uni.navigateTo({
                    url: item.url
                })
            }
            if (item.object_type == 4) {
                this.$mroute.webview(1, item.object_id, item.name);
            }
        },
        toNoticeDetail(item) {
            if (item.object_type == 4) {
                this.$mroute.webview(1, item.object_id, item.name);
            }
        },
        getCur(e) {
            this.current = e.detail.current;
        },
        tabChange(index) {
            this.tabActive = index;
        },
        showDrawer() {
            this.drawerShow = true;
        },
        closeDrawer() {
            this.drawerShow = false;
        },
        radioChange: function (evt) {
            console.log(evt);
            var _this = this;
            var lang = evt.detail.value;
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].value === evt.detail.value) {
                    this.checkedTxt = this.items[i].name;
                    _this.$i18n.locale = lang;
                    this.lang = lang;
                    uni.setStorage({
                        key: "lang",
                        data: _this.items[i].value,
                        success() {
                            uni.$emit('switchLan');
                            _this.getNotice();
                        }
                    });
                    break;
                }
            }
        }
    }
}
</script>

<style lang="scss">
@import "home.scss";
</style>

<style>
/deep/ .uni-swiper-slides {
    transition: all 1s;
}

/deep/ .uni-collapse,
/deep/ .uni-collapse-item__title-box,
/deep/ .uni-collapse-item__wrap {
    background-color: transparent;
    color: var(--black);
    font-weight: 600;
    font-family: "PingFang";
}

/deep/ .uni-collapse-item--border {
    border: none;
}

/deep/ .uni-collapse-item__title-wrap {
    width: 100%;
    height: 88rpx;
    display: flex;
    align-items: center;
}

/deep/ .uni-collapse-item__title-wrap image {
    width: 48rpx;
    height: 48rpx;
    margin-right: 16rpx;
}

/deep/ .uni-collapse-item__title-wrap text {
    font-size: 26rpx;
    color: var(--black);
    font-weight: 600;
}

/deep/ .uni-radio-input {
    width: 32rpx;
    height: 32rpx;
    background-color: #9197a4;
}

/deep/ .uni-collapse-item__wrap-content .txt-item text {
    font-size: 24rpx !important;
    font-weight: 500;
    color: var(--text-gray);
    padding-inline-start: 20rpx;
}
</style>