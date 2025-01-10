<template>
    <view class="kline" :data-theme="userTheme">
        <fui-nav-bar :padding="0"
                     statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     custom
                     @init="navBarInit">
            <view class="nav-bar">
                <view class="nav-bar-left">
                    <fui-icon @click="$mroute.back()"
                              name="arrowleft"
                              size="56"
                              :marginLeft="0"
                              color="var(--content-primary)">
                    </fui-icon>
                    <view class="column"
                          :class="scrollTop > 90 ? 'show' : 'hide'"
                          @click="drawerShow = true">
                        <!--   币名/侧边栏按钮  -->
                        <view class="row">
                            <text class="coin font-bold">
                                {{
                                    currencyInfo['symbol'] ? currencyInfo['symbol'] : '--/'
                                }}USDT
                            </text>
                            <image class="down-icon"
                                   :src="`/static/img/tactic/down-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                        <!--   币价/涨跌  -->
                        <view class="row">
                            <text class="font-weight"
                                  :class="currencyInfo['change_rate'] > 0 ? 'price_up' : 'price_down' ">
                                {{
                                    $util.thousandSeparator(currencyInfo['new_price'], currencyInfo['decimals'])
                                }}
                            </text>
                            <text class="font-weight"
                                  :class="currencyInfo['change_rate'] > 0 ? 'price_up' : 'price_down' ">
                                {{
                                    $util.Number2(currencyInfo['change_rate'] ? currencyInfo['change_rate'] : '--')
                                }}%
                            </text>
                        </view>
                    </view>
                </view>
                <view class="nav-bar-right">
                    <view class="image-box" @click="collect()">
                        <image :src="`/static/img/tactic/sc-${collectType ? 's' : 'n'}.webp`" mode="widthFix"></image>
                    </view>
                    <!-- <view class="image-box" @click="capture()">
                        <image :src="`/static/img/tactic/share-${userTheme}.png`" mode="widthFix"></image>
                    </view> -->
                </view>
            </view>
        </fui-nav-bar>
        <scroll-view scroll-y="true"
                     class="kline-body"
                     :style="`height: ${$device.windowHeight - pageNavBarHeight}px`"
                     @scroll="bodyScroll">
            <view class="body-box">
                <!--      币价详情-->
                <view class="top-box">
                    <!--     -->
                    <view class="price-box">
                        <view class="row">
                            <text class="font-22 color-black font-bold"
                                  :class="currencyInfo['change_rate'] > 0 ? 'price_up' : 'price_down'">
                                {{
                                    $util.thousandSeparator(currencyInfo['new_price'], currencyInfo['decimals'])
                                }}
                            </text>
                        </view>
                        <view class="row">
                            <text class="font-weight">
                                ≈{{
                                    symbol
                                }}{{
                                    $util.thousandSeparator(currencyInfo['new_price'] * symbol_rate,
                                        currencyInfo['decimals'])
                                }}
                            </text>
                            <text class="font-weight"
                                  :class="currencyInfo['change_rate'] > 0 ? 'price_up' : 'price_down'">
                                {{
                                    $util.Number2(currencyInfo['change_rate'] ? currencyInfo['change_rate'] : '0')
                                }}%
                            </text>
                        </view>
                    </view>
                    <!--     -->
                    <view class="price-info">
                        <!--  24小时最高价  -->
                        <view class="item">
                            <text>
                                {{
                                    $t('kline.max_price')
                                }}
                            </text>
                            <text class="font-weight">
                                {{
                                    $util.thousandSeparator(currencyInfo['high_price'], currencyInfo['decimals'])
                                }}
                            </text>
                        </view>
                        <!--  24小时成交量  -->
                        <view class="item">
                            <text>
                                {{
                                    $t('kline.h_vol')
                                }}
                            </text>
                            <text class="font-weight">
                                {{
                                    $util.thousandSeparator(currencyInfo['quantity'], currencyInfo['decimals'])
                                }}
                            </text>
                        </view>
                        <!--  24小时最低价  -->
                        <view class="item">
                            <text>
                                {{
                                    $t('kline.min_price')
                                }}
                            </text>
                            <text class="font-weight">
                                {{
                                    $util.thousandSeparator(currencyInfo['low_price'], currencyInfo['decimals'])
                                }}
                            </text>
                        </view>
                        <!--  24小时成交额  -->
                        <view class="item">
                            <text>
                                {{
                                    $t('kline.h_tur')
                                }}
                            </text>
                            <text class="font-weight">
                                {{
                                    $util.bigNumberToString(currencyInfo['quota'], currencyInfo['decimals'])
                                }}
                            </text>
                        </view>
                    </view>
                </view>
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
                            {{
                                item
                            }}
                        </text>
                    </view>
                </scroll-view>
                <!--      K线图表-->
                <view class="kline-box">
                    <view id="kline"
                          ref="kline"
                          :currencyInfo="currencyInfo"
                          :change:currencyInfo="render.setDecimals"
                          :history="history"
                          :change:history="render.initChart"
                          :them="userTheme"
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
                <!--      K线图底部BAR-->
                <view class="kline-bar">
                    <view class="item" v-for="item in klineBar.slice(0, 3)"
                          @click="fchart == item ? fchart = false : fchart = item">
                        <text class="font-weight"
                              :class="fchart == item ? 'color-black' : 'color-gray'">
                            {{
                                item
                            }}
                        </text>
                    </view>
                    <view class="item"
                          v-for="item in klineBar.slice(3, klineBar.length)"
                          @click="addIndicator(item)">
                        <text class="font-weight"
                              :class="indicator.includes(item) ? 'color-black' : 'color-gray'">
                            {{
                                item
                            }}
                        </text>
                    </view>
                </view>
                <!--      列表菜单-->
                <view class="list-tabs">
                    <view class="item"
                          :class="{'active': tabactive == index}"
                          v-for="(item,index) in listTabs" :key="index"
                          @click="tabactive = index">
                        <text class="font-weight"
                              :class="tabactive == index ? 'color-black' : 'color-gray'">
                            {{
                                item
                            }}
                        </text>
                    </view>
                </view>
                <!--      列表内容-->
                <swiper class="list-swiper"
                        duration="300"
                        :current="tabactive"
                        :style="`height:${$device.windowHeight - 160}px`"
                        @change="tabactive = $event.detail.current">
                    <swiper-item class="list-swiper-item">
                        <view class="desc-box">
                            <text>
                                {{
                                    $t('kline.buy_nm')
                                }}
                            </text>
                            <text>
                                {{
                                    $t('kline.price')
                                }}(USDT)
                            </text>
                            <text>
                                {{
                                    $t('kline.num')
                                }}
                            </text>
                        </view>
                        <view class="order-container">
                            <view class="row" v-for="i in 20" :key="i">
                                <view class="row-item">
                                    <text class="price_up font-weight">
                                        {{
                                            bids[i - 1] ? $util.float(bids[i - 1][1]) : '--'
                                        }}
                                    </text>
                                    <text class="color-black font-weight">
                                        {{
                                            bids[i - 1] ? $util.thousandSeparator(bids[i - 1][0], currencyInfo['decimals'])
                                                : '--'
                                        }}
                                    </text>
                                    <view class="row-bg bg-green"
                                          :style="`width: ${bids[i - 1] ? $util.float(bids[i - 1][1]) * 100 : 0}%`"></view>
                                </view>
                                <view class="row-item">
                                    <text class="color-black font-weight">
                                        {{
                                            asks[i - 1] ? $util.float(asks[i - 1][0]) : '--'
                                        }}
                                    </text>
                                    <text class="price_down font-weight">
                                        {{
                                            asks[i - 1] ? $util.thousandSeparator(asks[i - 1][1], currencyInfo['decimals'])
                                                : '--'
                                        }}
                                    </text>
                                    <view class="row-bg bg-red"
                                          :style="`width: ${asks[i - 1] ? $util.thousandSeparator(asks[i - 1][1]) * 100 : 0}%`"></view>
                                </view>
                            </view>
                        </view>
                    </swiper-item>
                    <swiper-item class="list-swiper-item">
                        <template v-if="trades.length != 0">
                            <view class="desc-box">
                                <text>
                                    {{
                                        $t('kline.time')
                                    }}
                                </text>
                                <text>
                                    {{
                                        $t('kline.price')
                                    }}(USDT)
                                </text>
                                <text>
                                    {{
                                        $t('kline.num')
                                    }}
                                </text>
                            </view>
                            <view class="order-container">
                                <view class="row" v-for="(item,index) in trades" :key="'trade'+index">
                                    <view class="row-cell">
                                        <text class="color-black font-weight">
                                            {{
                                                item.time
                                            }}
                                        </text>
                                        <text class="font-weight color-black"
                                              :class="item.vol > 0 ? 'price_up' : 'price_down'">
                                            {{
                                                $util.thousandSeparator(item.price, currencyInfo['decimals'])
                                            }}
                                        </text>
                                        <text class="color-black font-weight">
                                            {{
                                                item.vol
                                            }}
                                        </text>
                                    </view>
                                </view>
                            </view>
                        </template>
                        <empty-view :visible="trades.length == 0"
                                    :width="750"
                                    :height="600"
                                    :title="$t('list.not_data')">
                        </empty-view>
                    </swiper-item>
                    <swiper-item class="list-swiper-item">
                        <scroll-view scroll-y show-scrollbar class="coin-info">
                            <view class="coin-info-box">
                                <view class="top">
                                    <image :src="currencyInfo['icon']" mode="widthFix"></image>
                                    <text class="font-16 color-black font-bold">
                                        {{
                                            currencyInfo['symbol']
                                        }}
                                    </text>
                                </view>
                                <view class="card">
                                    <view class="title">
                                        <text class="font-14 color-black font-weight">{{ $t('kline.gjxx') }}</text>
                                    </view>
                                    <!-- <view class="row">
                                        <text>
                                            {{
                                                $t('kline.rank')
                                            }}
                                        </text>
                                        <text>
                                            No.{{
                                                info ? info['marketSort'] : '--'
                                            }}
                                        </text>
                                    </view> -->
                                    <view class="row">
                                        <text>
                                            {{
                                                $t('kline.mk_val')
                                            }}
                                        </text>
                                        <text>
                                            {{
                                                symbol
                                            }}{{
                                                info ? info['marketValue'] : '--'
                                            }}
                                        </text>
                                    </view>
                                    <view class="row">
                                        <text>
                                            {{
                                                $t('kline.liutong')
                                            }}
                                        </text>
                                        <text>
                                            {{
                                                symbol
                                            }}{{
                                                info ? info['Circulation'] : '--'
                                            }}
                                        </text>
                                    </view>
                                    <view class="row">
                                        <text>
                                            {{
                                                $t('kline.zuidag')
                                            }}
                                        </text>
                                        <text>
                                            {{
                                                symbol
                                            }}{{
                                                info ? info['totalCurrency'] : '--'
                                            }}
                                        </text>
                                    </view>
                                    <!-- <view class="row">
                                        <text>
                                            {{
                                                $t('kline.occupancy')
                                            }}
                                        </text>
                                        <text>
                                            {{
                                                info ? info['marketShare'] : '--'
                                            }}%
                                        </text>
                                    </view> -->
                                    <view class="row">
                                        <text>
                                            {{
                                                $t('kline.flow_rate')
                                            }}
                                        </text>
                                        <text>
                                            {{
                                                info ? info['CirculationRate'] : '--'
                                            }}%
                                        </text>
                                    </view>
                                    <!-- <view class="row">
                                        <text>
                                            {{
                                                $t('kline.issue_date')
                                            }}
                                        </text>
                                        <text>
                                            {{
                                                info ? info['issueDate'] : '--'
                                            }}
                                        </text>
                                    </view> -->
                                    <!-- <view class="row">
                                        <text>
                                            {{
                                                $t('kline.issue_price')
                                            }}
                                        </text>
                                        <text>
                                            {{
                                                symbol
                                            }}{{
                                                info ? info['IssuePrice'] : '--'
                                            }}
                                        </text>
                                    </view> -->
                                    <view class="row">
                                        <text>
                                            {{
                                                $t('kline.high_price')
                                            }}
                                        </text>
                                        <text>
                                            {{
                                                symbol
                                            }}{{
                                                info ? info['hightPrice'] : '--'
                                            }}
                                        </text>
                                    </view>
                                    <!--  24小时最高价  -->
                                    <view class="row">
                                        <text>
                                            {{
                                                $t('kline.max_price')
                                            }}
                                        </text>
                                        <text>
                                            ${{
                                                $util.thousandSeparator(currencyInfo['high_price'], currencyInfo['decimals'])
                                            }}
                                        </text>
                                    </view>
                                    <!--  24小时成交量  -->
                                    <view class="row">
                                        <text>
                                            {{
                                                $t('kline.h_vol')
                                            }}
                                        </text>
                                        <text>
                                            {{
                                                $util.thousandSeparator(currencyInfo['quantity'], currencyInfo['decimals'])
                                            }}
                                        </text>
                                    </view>
                                    <!--  24小时最低价  -->
                                    <view class="row">
                                        <text>
                                            {{
                                                $t('kline.min_price')
                                            }}
                                        </text>
                                        <text>
                                            ${{
                                                $util.thousandSeparator(currencyInfo['low_price'], currencyInfo['decimals'])
                                            }}
                                        </text>
                                    </view>
                                    <!--  24小时成交额  -->
                                    <view class="row">
                                        <text>
                                            {{
                                                $t('kline.h_tur')
                                            }}
                                        </text>
                                        <text>
                                            {{
                                                $util.bigNumberToString(currencyInfo['quota'], currencyInfo['decimals'])
                                            }}
                                        </text>
                                    </view>
                                </view>
                                <view class="card" v-if="info['about']">
                                    <!-- <view class="title">
                                        <text class="font-14 color-black font-weight">
                                            {{
                                                $t('kline.about_t')
                                            }}
                                        </text>
                                    </view>
                                    <view class="card-content">
										<template v-if="info['about']">
											<text class="color-gray" v-for="(item,index) in info['about']"  :key="index">
											    {{
											        item['text']
											    }}
											</text>
										</template>

                                    </view> -->
                                </view>
                                <!-- <view class="card">
                                    <view class="title">
                                        <text class="font-14 color-black font-weight">
                                            {{
                                                $t('kline.official_link')
                                            }}
                                        </text>
                                    </view>
                                    <view class="row"
                                          @click="mroute.webview(2,info ? info['websiteLink']:'','',200)">
                                        <text>
                                            {{
                                                $t('kline.official_web')
                                            }}
                                        </text>
                                    </view>
                                    <view class="row"
                                          @click="mroute.webview(2,info?info['browserLink']:'','',200)">
                                        <text>
                                            {{
                                                $t('kline.block_bro')
                                            }}
                                        </text>
                                    </view>
                                </view> -->
                            </view>
                        </scroll-view>
                    </swiper-item>
                </swiper>
                <view class="footer">
                    <view class="_button bg-green button-active" @click="onBack">
                        <text class="font-13 always-white font-weight">
                            {{
                                $t('trade.buy')
                            }}
                        </text>
                    </view>
                    <view class="_button bg-red button-active" @click="onBack">
                        <text class="font-13 always-white font-weight">
                            {{
                                $t('trade.sell')
                            }}
                        </text>
                    </view>
                </view>
            </view>
        </scroll-view>

        <fui-drawer
            :show="drawerShow"
            :radius="0"
            direction="left"
            background="var(--background-primary)"
            @close="drawerShow = false">
            <template v-if="cm_id === 1">
                <view class="drawer" :style="{'height': $device.windowHeight + 'px'}">
                    <view class="status_bar"></view>
                    <view class="drawer-title">
                        <text class="font-16 color-black font-weight">
                            {{
                                cm_id === 1 ? $t('index.spot') : $t('tab.contract')
                            }}
                        </text>
                    </view>
                    <view class="drawer-search">
                        <image :src="`/static/newImage/search-${userTheme}.png`" mode="widthFix"></image>
                        <input type="text" v-model="searchValue" :placeholder="$t('contruct.pl10')" @input="input"
                               placeholder-class="placeholder">
                    </view>
                    <view class="drawer-tabs">
                        <view class="drawer-tabs-item" :class="{'bg-gray' : drawerTab === 0}" @click="drawerTab = 0">
                            <text class="font-13 font-weight"
                                  :class="drawerTab === 0 ? 'color-black' : 'color-gray'">
                                {{
                                    $t('index.tab_t1')
                                }}
                            </text>
                        </view>
                        <view class="drawer-tabs-item" :class="{'bg-gray' : drawerTab === 1}" @click="drawerTab = 1">
                            <text class="font-13 font-weight"
                                  :class="drawerTab === 1 ? 'color-black' : 'color-gray'">
                                USDT
                            </text>
                        </view>
                    </view>
                    <view class="drawer-desc">
                        <view class="drawer-desc-item" @click="switchSort(0)">
                            <text class="font-11 color-gray">
                                {{
                                    $t('index.name')
                                }}
                            </text>
                            <image :src="sort[0]['active']" mode="widthFix"></image>
                        </view>
                        <view class="drawer-desc-item">
                            <text class="font-11 color-gray">
                                {{
                                    $t('index.latest_price')
                                }}
                            </text>
                        </view>
                        <view class="drawer-desc-item">
                            <text class="font-11 color-gray">
                                {{
                                    $t('index.quote_change')
                                }}
                            </text>
                        </view>
                    </view>
                    <scroll-view class="drawer-list mt-10"
                                 :scroll-y="true"
                                 :show-scrollbar="false">
                        <template v-if="drawerTab === 0">
                            <empty-view :visible="mlist.length == 0"
                                        :width="570"
                                        :height="600"
                                        :title="$t('list.not_data')">
                            </empty-view>
                            <view class="drawer-list-cell"
                                  v-for="(item,index) in mlist" :key="'m'+index"
                                  @click="switchCurrency(item.id,index)">
                                <view class="drawer-list-cell-item">
                                    <text class="font-14 color-black font-weight">
                                        {{
                                            item['symbol']
                                        }} / USDT
                                    </text>
                                </view>
                                <view class="drawer-list-cell-item">
                                    <text class="font-14 color-black font-weight"
                                          :class="{ 'price_up': item['change_rate'] >= 0, 'price_down': item['change_rate'] < 0 }">
                                        {{
                                            $util.thousandSeparator(item['new_price'], item['decimals'])
                                        }}
                                    </text>
                                </view>
                                <view class="drawer-list-cell-item">
                                    <text class="font-14 color-black font-weight"
                                          :class="{ 'price_up': item['change_rate'] >= 0, 'price_down': item['change_rate'] < 0 }">
                                        {{
                                            $util.thousandSeparator(item['change_rate'])
                                        }}%
                                    </text>
                                </view>
                            </view>
                        </template>
                        <template v-if="drawerTab === 1">
                            <empty-view :visible="currency[0]['currency'].length == 0"
                                        :width="570"
                                        :height="600"
                                        :title="$t('list.not_data')">
                            </empty-view>
                            <view class="drawer-list-warp">
                                <view class="drawer-list-cell"
                                      v-for="(item,index) in  currency[0]['currency']"
                                      :key="'m'+index"
                                      @click="switchCurrency(item.id,index)">
                                    <view class="drawer-list-cell-item">
                                        <text class="font-14 color-black font-weight">
                                            {{
                                                item['symbol']
                                            }} / USDT
                                        </text>
                                    </view>
                                    <view class="drawer-list-cell-item">
                                        <text class="font-14 color-black font-weight"
                                              :class="{ 'price_up': item['change_rate'] >= 0, 'price_down': item['change_rate'] < 0 }">
                                            {{
                                                $util.thousandSeparator(item['new_price'], item['decimals'])
                                            }}
                                        </text>
                                    </view>
                                    <view class="drawer-list-cell-item">
                                        <text class="font-14 color-black font-weight"
                                              :class="{ 'price_up': item['change_rate'] >= 0, 'price_down': item['change_rate'] < 0 }">
                                            {{
                                                $util.thousandSeparator(item['change_rate'])
                                            }}%
                                        </text>
                                    </view>
                                </view>
                            </view>
                        </template>
                    </scroll-view>
                </view>
            </template>
            <template v-else>
                <view class="drawer" :style="{'height': $device.windowHeight + 'px'}">
                    <view class="drawer-header">
                        <fui-nav-bar custom
                                     :padding="0"
                                     :background="userTheme == 'light' ? '#ffffff' : '#111111'"
                                     @init="drawerNavInit">
                            <view class="drawer-title">
                                <text class="font-16 font-weight color-black">
                                    {{
                                        $t('newcontract.t19')
                                    }}
                                </text>
                            </view>
                        </fui-nav-bar>
                        <view class="drawer-search bg-gray">
                            <input class="search-input  font-12" :placeholder="$t('newcontract.t20')"
                                   v-model="searchVal"
                                   type="text">
                            <image class="search-icon"
                                   :src="`/static/newImage/search-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                    </view>
                    <view class="drawer-tab-warp">
                        <scroll-view :scroll-x="true"
                                     :show-scrollbar="false"
                                     class="tab-scroll"
                                     :scroll-with-animation="true"
                                     :scroll-into-view="`drawerTab${drawerTabIndex}`">
                            <view class="item"
                                  :id="`drawerTab${index+1}`"
                                  :class="{'item-active': item['id'] === show_cm_id}"
                                  v-for="(item,index) in currency" :key="'tab'+item.id"
                                  @click="drawerTabChange($event,item,index)">
                                <text class="font-13 "
                                      :class="item['id'] === show_cm_id ? 'color-black' : 'color-gray'">
                                    {{
                                        item.title[lang]
                                    }}
                                </text>
                                <view class="dot"
                                      v-if="show_cm_id === item.id"
                                      :style="`width: ${dotWidth}px;`">
                                </view>
                            </view>
                        </scroll-view>
                    </view>
                    <swiper class="drawer-swiper"
                            :duration="300"
                            :current="drawerTabIndex"
                            :style="`height: ${drawerSwiperHeight}px`"
                            @change="show_cm_id = currency[$event.detail.current]['id'];drawerTabIndex=$event.detail.current">
                        <swiper-item class="drawer-swiper-item"
                                     :style="`height: ${drawerSwiperHeight}px`"
                                     v-for="(item,index) in currency"
                                     :key="'tlist'+item.id">
                            <view class="drawer-swiper-list">
                                <view class="desc-box">
                                    <view class="row">
                                        <view class="row-item" @click="switchSort(0,'symbol')">
                                            <text class="font-12 color-gray">
                                                {{
                                                    $t('index.name')
                                                }}
                                            </text>
                                            <image class="toggle-icon"
                                                   :src="sort[0]['active']"
                                                   mode="widthFix">
                                            </image>
                                        </view>
                                    </view>
                                    <view class="row">
                                        <view class="row-item" @click="switchSort(2,'new_price')">
                                            <text class="font-12 color-gray">
                                                {{
                                                    $t('index.latest_price')
                                                }}
                                            </text>
                                            <image class="toggle-icon"
                                                   :src="sort[2]['active']"
                                                   mode="widthFix">
                                            </image>
                                        </view>
                                        <view class="row-item" @click="switchSort(3,'change_rate')">
                                            <text class="font-12 color-gray">
                                                /{{
                                                    $t('contruct.pl14')
                                                }}
                                            </text>
                                            <image class="toggle-icon"
                                                   :src="sort[3]['active']"
                                                   mode="widthFix">
                                            </image>
                                        </view>
                                    </view>
                                </view>
                                <scroll-view class="drawer-swiper-list-scroll"
                                             :scroll-y="true"
                                             :show-scrollbar="false"
                                             :style="`height: ${drawerSwiperHeight - 48}px`">
                                    <empty-view
                                        :visible="!currency[drawerTabIndex] || currency[drawerTabIndex].currency.length === 0"
                                        :width="600"
                                        :height="400"
                                        :title="$t('list.not_data')">
                                    </empty-view>
                                    <view class="coin-warp">
                                        <view class="coin-item"
                                              v-for="(items,indexs) in searchVal === '' ? currency[index]['currency'] : currency[index]['currency'].filter(i=>i.symbol.toLowerCase().includes(searchVal.toLowerCase()))"
                                              :key="'currencylist'+items.id"
                                              @click="setCurrentCurrency(items,item)">
                                            <view class="coin-name">
                                                <text class="font-14 font-weight color-black">{{
                                                        items.symbol
                                                    }}
                                                </text>
                                                <text class="font-11 color-gray ">/USDT</text>
                                            </view>
                                            <view class="coin-price">
                                                <view class="coin-price-text">
                                                    <text class="font-14 font-bold"
                                                          :class="{'price_up':items.change_rate > 0,'price_down':items.change_rate<0,'color-black':items.change_rate===0}">
                                                        {{
                                                            $util.thousandSeparator(items.new_price, item.decimals)
                                                        }}
                                                    </text>
                                                    <text class="font-11 font-weight"
                                                          :class="{'price_up':items.change_rate > 0,'price_down':items.change_rate<0,'color-black':items.change_rate===0}">
                                                        {{
                                                            items.change_rate > 0 ? '+' : ''
                                                        }}{{
                                                            $util.thousandSeparator(items.change_rate, item.decimals)
                                                        }}%
                                                    </text>
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                </scroll-view>
                            </view>
                        </swiper-item>
                    </swiper>
                </view>
            </template>
        </fui-drawer>
        <loading ref="loading"></loading>
    </view>
</template>

<script>
import service from './klineVue.js';

export default service;
</script>

<script module="render" lang="renderjs">
import controller from './render.js';
export default controller;
</script>
<style lang="scss" scoped>
@import "kline";
</style>
