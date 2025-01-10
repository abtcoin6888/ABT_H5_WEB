<template>
    <view class="order" :data-theme="userTheme">
        <!--  nav  -->
        <fui-nav-bar isFixed isOccupy zIndex="9" :background="'var(--color-gray-bg)'"
                     :color="'var(--color-title-black)'"
                     :title="$t('cor.t1')" @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft" size="56" :color="'var(--color-title-black)'"></fui-icon>
        </fui-nav-bar>
        <!--    nav-tab    -->
        <view class="nav-tabs">
            <fui-tabs :isSlider="false" :alignLeft="true" :current="tab"
                      :padding="0" :scale="1" :fontWeight="500"
                      :size="28" :height="80" :selectedSize="28" :short="false"
                      :background="'var(--color-gray-bg)'"
                      :color="'var(--color-text-dark-gray)'"
                      :selectedColor="'var(--color-title-black)'"
                      :tabs="tabOption" @change="navTabChange">
            </fui-tabs>
        </view>
        <view class="container-warp">
            <!--     sub-menus     -->
            <view class="tag-group">
                <view class="tag" @click="show=true">
                    <text class="font-11 color-dark font-weight mr-5" v-if="currency_id == 0">{{ $t('cor.t5') }}</text>
                    <text class="font-11 color-dark font-weight mr-5" v-if="currency_id > 0">{{ symbol }}USDT</text>
                    <fui-icon name="turningdown" size="30" color="#909399"></fui-icon>
                </view>
                <view class="tag" @click="showType=true" v-if="tab < 2">
                    <text class="font-11 color-dark font-weight mr-5" v-if="otype==0">{{ $t('cor.t6') }}</text>
                    <text class="font-11 color-dark font-weight mr-5" v-if="otype==1">{{ $t('cor.t7') }}</text>
                    <text class="font-11 color-dark font-weight mr-5" v-if="otype==2">{{ $t('cor.t8') }}</text>
                    <fui-icon name="turningdown" size="30" color="#909399"></fui-icon>
                </view>
                <view class="tag" @click="showTp=true" v-if="tab < 2">
                    <text class="font-11 color-dark font-weight mr-5">{{ $t('cor.t9') }}</text>
                    <fui-icon name="turningdown" size="30" color="#909399"></fui-icon>
                </view>
                <view class="tag" @click="showD=!showD" v-if="tab == 2">
                    <text class="font-11 color-dark font-weight mr-5" v-if="direction == 0">{{ $t('cor.t10') }}</text>
                    <text class="font-11 color-dark font-weight mr-5" v-if="direction == 1">{{ $t('cor.t11') }}</text>
                    <text class="font-11 color-dark font-weight mr-5" v-if="direction == 2">{{ $t('cor.t12') }}</text>
                    <fui-icon name="turningdown" size="30" color="#909399"></fui-icon>
                </view>
            </view>
            <swiper class="swiper-container"
                    :duration="duration"
                    :current="tab"
                    @transition="transition"
                    @change="swiperChange"
                    :style="{'height': contianerHeight + 'px'}">
                <!--    当前委托    -->
                <swiper-item class="swiper-item">
                    <scroll-layount class="scroll-view"
                                    @refresherrefresh="refresh"
                                    @scrolltolower="loadMore"
                                    refresher
                                    scroll-y
                                    :empty="orderList['entrust']['list'].length == 0 && skeleton == false"
                                    :style="{'height': contianerHeight + 'px'}">
                        <view class="card-item"
                              v-if="skeleton == false"
                              v-for="(item,index) in orderList['entrust']['list']" :key="'t'+index">
                            <view class="card-item-row">
                                <view class="_left">
                                    {{item.type}}
                                    <fui-tag v-if="item.type == 1"
                                             :padding="['6rpx','10rpx']" :radius="6"
                                             :background="'var(--green)'"
                                             color="#ffffff"
                                             :text="$t('cor.t13')"
                                             size="22"></fui-tag>
                                    <fui-tag v-if="item.type == 2"
                                             :padding="['6rpx','10rpx']"
                                             :radius="6"
                                             :background="'var(--red)'"
                                             color="#ffffff"
                                             :text="$t('cor.t14')"
                                             size="22"></fui-tag>
                                    <fui-tag v-if="item.type == 3"
                                             :padding="['6rpx','10rpx']"
                                             :radius="6"
                                             :background="'var(--red)'"
                                             color="#ffffff"
                                             :text="$t('cor.t15')"
                                             size="22"></fui-tag>
                                    <fui-tag v-if="item.type == 4"
                                             :padding="['6rpx','10rpx']"
                                             :radius="6"
                                             :background="'var(--green)'"
                                             color="#ffffff"
                                             :text="$t('cor.t16')"
                                             size="22"></fui-tag>
                                    <fui-tag v-if="item.type == 5"
                                             :padding="['6rpx','10rpx']"
                                             :radius="6"
                                             :background="'var(--green)'"
                                             color="#ffffff"
                                             :text="$t('cor.t17')"
                                             size="22"></fui-tag>
                                    <fui-tag v-if="item.type == 6"
                                             :padding="['6rpx','10rpx']"
                                             :radius="6"
                                             :background="'var(--red)'"
                                             color="#ffffff"
                                             :text="$t('cor.t18')"
                                             size="22"></fui-tag>
                                    <text class="font-13 font-weight color-black ml-5">
                                        {{ item.symbol }}/USDT {{ $t('cor.t19') }}
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 font-weight color-blue" @click="cancelOrder(item.id)">
                                        {{ $t('cor.t20') }}
                                    </text>
                                </view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-gray">{{ item.created_at }}</text>
                                    <text class="font-12 color-gray ml-5" v-if="item.ttype == 1">
                                        {{ $t('cor.t21') }}
                                    </text>
                                    <text class="font-12 color-gray ml-5" v-if="item.ttype == 2">
                                        {{ $t('cor.t22') }}
                                    </text>
                                    <text class="font-12 color-gray ml-5" v-if="item.ttype == 3">
                                        {{ $t('cor.t23') }}
                                    </text>
                                </view>
                                <view class="_right"></view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-gray">
                                        {{ $t('cor.t24') }}(USDT)
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 font-weight color-black"
                                          v-if="item.type != 5 || item.type != 6">
                                        {{ $util.float(item.price) }}
                                    </text>
                                    <text class="font-12 font-weight color-black" v-else>
                                        {{ $util.float(item.wprice) }}
                                    </text>
                                </view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-gray">
                                        {{ $t('cor.t25') }}(USDT)
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 font-weight color-black">--</text>
                                </view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-gray">
                                        {{ $t('cor.t26') }}
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 font-weight color-black">--/--</text>
                                </view>
                            </view>
                        </view>
                        <!--      骨架      -->
                        <view class="skeleton-box" v-if="skeleton">
                            <fui-skeleton :theme="userTheme" outerClass="skeleton-box"
                                          :preloadList="preloadList"></fui-skeleton>
                        </view>
                    </scroll-layount>
                </swiper-item>
                <!--    历史订单    -->
                <swiper-item class="swiper-item">
                    <scroll-layount class="scroll-view"
                                    @refresherrefresh="refresh"
                                    @scrolltolower="loadMore"
                                    refresher
                                    scroll-y
                                    :empty="orderList['history']['list'].length == 0 && skeleton == false"
                                    :style="{'height': contianerHeight + 'px'}">
                        <view v-if="skeleton == false" class="card-item"
                              v-for="(item,index) in orderList['history']['list']" :key="'h'+index">
                            <view class="card-item-row">
                                <view class="_left">
                                    <fui-tag v-if="item.type == 1"
                                             :padding="['6rpx','10rpx']"
                                             :radius="6"
                                             :background="'var(--green)'"
                                             color="#ffffff"
                                             :text="$t('cor.t13')"
                                             size="22">
                                    </fui-tag>
                                    <fui-tag v-if="item.type == 2"
                                             :padding="['6rpx','10rpx']"
                                             :radius="6"
                                             :background="'var(--red)'"
                                             color="#ffffff"
                                             :text="$t('cor.t14')"
                                             size="22">
                                    </fui-tag>
                                    <fui-tag v-if="item.type == 3"
                                             :padding="['6rpx','10rpx']"
                                             :radius="6"
                                             :background="'var(--red)'"
                                             color="#ffffff"
                                             :text="$t('cor.t15')"
                                             size="22">
                                    </fui-tag>
                                    <fui-tag v-if="item.type == 4"
                                             :padding="['6rpx','10rpx']"
                                             :radius="6"
                                             :background="'var(--green)'"
                                             color="#ffffff"
                                             :text="$t('cor.t16')"
                                             size="22">
                                    </fui-tag>
                                    <fui-tag v-if="item.type == 5"
                                             :padding="['6rpx','10rpx']"
                                             :radius="6"
                                             :background="'var(--green)'"
                                             color="#ffffff"
                                             :text="$t('cor.t17')"
                                             size="22">
                                    </fui-tag>
                                    <fui-tag v-if="item.type == 6"
                                             :padding="['6rpx','10rpx']"
                                             :radius="6"
                                             :background="'var(--red)'"
                                             color="#ffffff"
                                             :text="$t('cor.t18')"
                                             size="22">
                                    </fui-tag>
                                    <text class="font-13 font-weight color-black ml-5">
                                        {{ item.symbol }}/USDT
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 color-gray" v-if="item.status == 3">
                                        {{ $t('cor.t27') }}
                                    </text>
                                    <text class="font-12 font-weight color-black" v-if="item.status == 2">
                                        {{ $t('cor.t28') }}
                                    </text>
                                </view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-gray">
                                        {{ item.created_at }}
                                    </text>
                                    <text class="font-12 color-gray ml-5" v-if="item.ttype == 1">
                                        {{ $t('cor.t21') }}
                                    </text>
                                    <text class="font-12 color-gray ml-5" v-if="item.ttype == 2">
                                        {{ $t('cor.t22') }}
                                    </text>
                                    <text class="font-12 color-gray ml-5" v-if="item.ttype == 3">
                                        {{ $t('cor.t23') }}
                                    </text>
                                </view>
                                <view class="_right"></view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-gray">
                                        {{ $t('cor.t29') }}(USDT)
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 font-weight color-black">
                                        {{
                                            item.ttype == 1 ? $t('entrust.t18') : $util.thousandSeparator(item.t_price, 2)
                                        }}
                                        / {{ $util.thousandSeparator(item.wprice) }}
                                    </text>
                                </view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-gray">
                                        {{ $t('cor.t30') }}({{ item.symbol }})
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 font-weight color-black">
                                        {{ $util.float(item.amount) }} / {{ $util.float(item.amount) }}
                                    </text>
                                </view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-gray">
                                        {{ $t('cor.t31') }}(USDT)
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 font-weight color-black">
                                        {{ $util.float(item.charge) }}
                                    </text>
                                </view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-gray">
                                        {{ $t('cor.t32') }}(USDT)
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 font-weight color-black"
                                          v-if="item.type == 3 || item.type == 4">
                                        {{ $util.float(item.profit) }}
                                    </text>
                                    <text class="font-12 font-weight color-black" v-else>--</text>
                                </view>
                            </view>
                        </view>
                        <!--      骨架      -->
                        <view class="skeleton-box" v-if="skeleton">
                            <fui-skeleton :theme="userTheme" outerClass="skeleton-box"
                                          :preloadList="preloadList"></fui-skeleton>
                        </view>
                    </scroll-layount>
                </swiper-item>
                <!--    盈亏记录    -->
                <swiper-item class="swiper-item">
                    <scroll-layount class="scroll-view"
                                    @refresherrefresh="refresh"
                                    @scrolltolower="loadMore"
                                    refresher
                                    scroll-y
                                    :empty="orderList['profit']['list'].length == 0 && skeleton == false"
                                    :style="{'height': contianerHeight + 'px'}">
                        <view v-if="skeleton == false"
                              class="card-item"
                              v-for="(item,index) in orderList['profit']['list']"
                              :key="'h'+index">
                            <view class="card-item-row">
                                <view class="_left">
                                    <fui-tag v-if="item.direction == 1"
                                             :padding="['6rpx','10rpx']"
                                             :radius="6"
                                             :background="'var(--green)'"
                                             color="#ffffff"
                                             :text="$t('cor.t33')"
                                             size="22">
                                    </fui-tag>
                                    <fui-tag v-if="item.direction == 2"
                                             :padding="['6rpx','10rpx']"
                                             :radius="6"
                                             :background="'var(--red)'"
                                             color="#ffffff"
                                             :text="$t('cor.t34')"
                                             size="22">
                                    </fui-tag>
                                    <text class="font-13 font-weight color-black ml-5">
                                        {{ item.symbol }}/USDT
                                        {{ $t('cor.t19') }}
                                    </text>
                                    <text class="font-11 font-weight color-warring ml-5">
                                        {{ item.margin_type == 1 ? $t('cor.t46') : $t('cor.t46') }} {{ item.muilt }}X
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 color-gray" v-if="item.status == 3">
                                        {{ $t('cor.t27') }}
                                    </text>
                                    <text class="font-12 font-weight color-black" v-if="item.status == 2">
                                        {{ $t('cor.t28') }}
                                    </text>
                                </view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-dark">
                                        {{ item.created_at }}
                                    </text>
                                </view>
                                <view class="_right"></view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-gray">
                                        {{ $t('cor.t35') }}(USDT)
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 font-weight color-black">
                                        {{ $util.float(item.profit) }}
                                    </text>
                                </view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-gray">
                                        {{ $t('cor.t36') }}(USDT)
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 font-weight color-black">
                                        {{ $util.float(item.price) }}
                                    </text>
                                </view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-gray">
                                        {{ $t('cor.t37') }}({{ item.symbol }})
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 font-weight color-black">
                                        {{ $util.float(item.amount) }}
                                    </text>
                                </view>
                            </view>
                            <view class="card-item-row">
                                <view class="_left">
                                    <text class="font-12 color-gray">
                                        {{ $t('cor.t31') }}(USDT)
                                    </text>
                                </view>
                                <view class="_right">
                                    <text class="font-12 font-weight color-black">
                                        {{ $util.float(item.charge) }}
                                    </text>
                                </view>
                            </view>
                        </view>
                        <!--      骨架      -->
                        <view class="skeleton-box" v-if="skeleton">
                            <fui-skeleton :theme="userTheme" outerClass="skeleton-box"
                                          :preloadList="preloadList"></fui-skeleton>
                        </view>
                    </scroll-layount>
                </swiper-item>
            </swiper>
        </view>
        <fui-bottom-popup background="var(--white)" :show="show">
            <view class="popup-wrap">
                <view class="popup-title">
                    <text class="font-16 color-black font-weight">{{ $t('cor.t38') }}</text>
                    <fui-icon class="close-icon" name="close" :color="'var(--color-title-black)'" :size="48"
                              @tap="show=false"></fui-icon>
                </view>
                <scroll-view scroll-y class="popup-scroll-view" :style="{'height': contianerHeight + 'px'}">
                    <view class="cell"
                          :class="currency_id == 0 ? 'active' : ''" @click="setCurrencyId(0)">
                        <text class="font-14"
                              :class="currency_id == 0 ? 'color-blue font-weight' : 'color-dark'">
                            {{ $t('cor.t39') }}
                        </text>
                    </view>
                    <view class="cell"
                          :class="currency_id == item.id ? 'active' : ''"
                          @click="setCurrencyId(item.id,index)"
                          v-for="(item,index) in currency['currency']"
                          :key="index">
                        <text class="font-14"
                              :class="currency_id == item.id ? 'color-blue font-weight' : 'color-dark'">
                            {{ item.symbol }}/USDT
                        </text>
                    </view>
                </scroll-view>
            </view>
        </fui-bottom-popup>
        <!-- 订单类型选 -->
        <fui-bottom-popup background="var(--white)" :show="showType">
            <view class="popup-wrap" type="min-wrap">
                <view class="popup-title">
                    <text class="font-16 color-black font-weight">{{ $t('cor.t40') }}</text>
                    <fui-icon class="close-icon" name="close" :color="'var(--color-title-black)'" :size="48"
                              @tap="showType=false"></fui-icon>
                </view>
                <scroll-view scroll-y class="popup-scroll-view">
                    <view class="cell"
                          :class="otype == 0 ? 'active' : ''"
                          @click="setOtype(0)">
                        <text class="font-14"
                              :class="otype == 0 ? 'color-blue font-weight' : 'color-dark'">
                            {{ $t('cor.t41') }}
                        </text>
                    </view>
                    <view class="cell"
                          :class="otype == 1 ? 'active' : ''"
                          @click="setOtype(1)">
                        <text class="font-14"
                              :class="otype == 1 ? 'color-blue font-weight' : 'color-dark'">
                            {{ $t('cor.t42') }}
                        </text>
                    </view>
                    <view class="cell"
                          :class="otype == 2 ? 'active' : ''"
                          @click="setOtype(2)">
                        <text class="font-14"
                              :class="otype == 2 ? 'color-blue font-weight' : 'color-dark'">
                            {{ $t('cor.t43') }}
                        </text>
                    </view>
                </scroll-view>
            </view>
        </fui-bottom-popup>
        <!-- 订单方向 -->
        <fui-bottom-popup background="var(--white)" :show="showD">
            <view class="popup-wrap" type="min-wrap">
                <view class="popup-title">
                    <text class="font-16 color-black font-weight">
                        {{ $t('cor.t44') }}
                    </text>
                    <fui-icon class="close-icon" name="close" :color="'var(--color-title-black)'" :size="48"
                              @tap="showD=false"></fui-icon>
                </view>
                <scroll-view scroll-y class="popup-scroll-view">
                    <view class="cell"
                          :class="direction == 0 ? 'active' : ''"
                          @click="direction=0;showD=false">
                        <text class="font-14"
                              :class="direction == 0 ? 'color-blue font-weight' : 'color-dark'">
                            {{ $t('cor.t45') }}
                        </text>
                    </view>
                    <view class="cell"
                          :class="direction == 1 ? 'active' : ''"
                          @click="direction=1;showD=false">
                        <text class="font-14"
                              :class="direction == 1 ? 'color-blue font-weight' : 'color-dark'">
                            {{ $t('cor.t11') }}
                        </text>
                    </view>
                    <view class="cell"
                          :class="direction == 2 ? 'active' : ''"
                          @click="direction=2;showD=false">
                        <text class="font-14"
                              :class="direction == 2 ? 'color-blue font-weight' : 'color-dark'">
                            {{ $t('cor.t12') }}
                        </text>
                    </view>
                </scroll-view>
            </view>
        </fui-bottom-popup>
        <!-- 类型 -->
        <fui-bottom-popup background="var(--white)" :show="showTp">
            <view class="popup-wrap" type="type-scroll-view">
                <view class="popup-title">
                    <text class="font-16 color-black font-weight">{{ $t('cor.t48') }}</text>
                    <fui-icon class="close-icon" name="close" :color="'var(--color-title-black)'" :size="48"
                              @tap="showTp=false"></fui-icon>
                </view>
                <scroll-view scroll-y class="popup-scroll-view">
                    <view class="cell"
                          :class="tpindex == 0 ? 'active' : ''"
                          @click="tpindex=0;showTp=false">
                        <text class="font-14"
                              :class="tpindex == 0 ? 'color-blue font-weight' : 'color-dark'">
                            {{ $t('cor.t49') }}
                        </text>
                    </view>
                    <view class="cell"
                          :class="tpindex == 1 ? 'active' : ''"
                          @click="tpindex=1;showTp=false">
                        <text class="font-14"
                              :class="tpindex == 1 ? 'color-blue font-weight' : 'color-dark'">
                            {{ $t('cor.t50') }}
                        </text>
                    </view>
                    <!-- <view class="cell" :class="tpindex == 2 ? 'active' : ''" @click="tpindex=2;showTp=false">
                        <text class="font-13 font-weight" :class="{'color-blue':tpindex == 2}">{{ $t('cor.t51') }}
                        </text>
                    </view>
                    <view class="cell" :class="tpindex == 3 ? 'active' : ''" @click="tpindex=3;showTp=false">
                        <text class="font-13 font-weight" :class="{'color-blue':tpindex == 3}">{{ $t('cor.t52') }}
                        </text>
                    </view>
                    <view class="cell" :class="tpindex == 4 ? 'active' : ''" @click="tpindex=4;showTp=false">
                        <text class="font-13 font-weight" :class="{'color-blue':tpindex == 4}">{{ $t('cor.t53') }}
                        </text>
                    </view>
                    <view class="cell" :class="tpindex == 5 ? 'active' : ''" @click="tpindex=5;showTp=false">
                        <text class="font-13 font-weight" :class="{'color-blue':tpindex == 5}">{{ $t('cor.t54') }}
                        </text>
                    </view> -->
                </scroll-view>
            </view>
        </fui-bottom-popup>
        <alert ref="alert" :title="$t('login.tip_t2')" :ctxt="$t('取消')" @confirm="confirm" :content="content"></alert>
        <loading ref="loading"></loading>
    </view>
</template>

<script>
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
import fuiTabs from "@/components/firstui/fui-tabs/fui-tabs.vue"
import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue"
import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue"
import fuiSkeleton from "@/components/firstui/fui-skeleton/fui-skeleton.vue"
import scrollLayount from "@/components/scroll/scroll.vue"

import trade from '@/common/api/trade';
import tradeApi from '@/common/api/contract.js';

var page = 1;

import {
    mapGetters
} from 'vuex';

export default {
    components: {
        fuiNavBar,
        fuiTabs,
        fuiTag,
        fuiEmpty,
        fuiSkeleton,
        scrollLayount
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    data() {
        return {
            windowHeight: uni.getSystemInfoSync().windowHeight,
            contianerHeight: "",
            duration: 0,
            tabOption: [],
            tab: 0,
            show: false,
            showType: false,
            showTp: false,
            tpindex: 0,
            currency: [],
            currency_id: 0,
            symbol: "",
            orderList: {
                entrust: {list: []},
                history: {list: []},
                profit: {list: []}
            },
            content: "",
            cids: "",
            history: [],
            otype: 0,
            showD: false,
            direction: 0,
            skeleton: false,
            empty: true,
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
    },
    onReachBottom() {
        console.log("log");
    },
    onShow() {
        page = 1;
        this.setMenu();
        // this.navInit();
    },
    methods: {
        navInit(e) {
            console.log(e);
            this.contianerHeight = this.windowHeight - e.height - e.statusBarHeight - 90;
        },
        setMenu() {
            this.tabOption = [
                this.$t('cor.t2'),
                this.$t('cor.t3'),
                this.$t('cor.t4'),
            ];
        },
        navTabChange(e) {
            this.tab = e.index;
            this.duration = 0;
        },
        swiperChange(e) {
            console.log(e);
            this.tab = e.detail.current;
        },
        transition() {
            this.duration = 300;
        },
        setOtype(e) {
            this.otype = e;
            this.showType = false;
        },
        getHistory() {
            tradeApi.getHistory(this.currency_id, 1).then(res => {
                this.history = res.data;
            });
        },
        confirm() {
            this.docancel();
        },
        docancel() {
            if (this.cid == 0) {
                id = this.orderList.map((item) => {
                    return item.id
                });
                id = id.join(',')
            }
            this.$refs.loading.open();
            tradeApi.orderCancel(id).then(res => {
                this.$refs.loading.close();
                if (res.code == 200) {
                    this.content = this.$t('trade.suc_wid');
                    this.$refs.alert.open();
                    this.getOrderList();
                } else {
                    this.content = res.message;
                    this.$refs.alert.open();
                }
            });
        },
        cancelOrder(id) {
            this.cids = id;
            this.content = "是否撤销当前的挂单信息？";
            this.$refs.alert.open();
        },
        loadMore() {
            console.log("bottom");
            page += 1;
            this.getOrderList();
        },
        getOrderList() {
            if (page > 1) {
                this.$refs.loading.open();
            }
            tradeApi.getHistory(this.currency_id, page).then(res => {
                if (res.code == 200) {
                    if (page === 1) {
                        this.orderList['entrust']['list'] = res.data['entrust']['list'];
                        this.orderList['history']['list'] = res.data['history']['list'];
                        this.orderList['profit']['list'] = res.data['profit']['list'];
                    } else {
                        // 否则，为加载更多操作，追加数据
                        this.orderList['entrust']['list'] = this.orderList['entrust']['list'].concat(res.data['entrust']['list']);
                        this.orderList['history']['list'] = this.orderList['history']['list'].concat(res.data['history']['list']);
                        this.orderList['profit']['list'] = this.orderList['profit']['list'].concat(res.data['profit']['list']);
                    }
                }
                if (page > 1) {
                    this.$refs.loading.close();
                }
            })
        },
        setCurrencyId(e, i = 0) {
            if (e > 0) {
                this.symbol = this.currency['currency'][i]['symbol'];
            }
            this.currency_id = e;
            this.show = false;
            this.getOrderList();
        },
        getCurrency() {
            this.currency = uni.getStorageSync('contract-matches');
        },
        refresh() {
            this.skeleton = true;
            setTimeout(() => {
                page = 1;
                this.getOrderList();
                this.skeleton = false;
            }, 500)
        },
    }
}
</script>

<style scoped lang="scss">
@import "order.scss";
</style>

<style scoped>
.tab_menu {
    width: 25%;
}

.fui-scroll__wrap {
    padding-top: 30rpx;
    position: relative;
}

.fui-title {
    font-size: 30rpx;
    font-weight: bold;
    text-align: center;
    padding-bottom: 24rpx;
}

.fui-icon__close {
    position: absolute;
    top: 24rpx;
    right: 24rpx;
}

.fui-scroll__view {
    width: 100%;
    /* 	min-height: 700rpx; */
}

/deep/ .fui-bottom__popwrap {
    border-bottom-color: transparent;
}

</style>
