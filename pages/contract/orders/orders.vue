<template>
    <view class="order-warp" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     zIndex="9"
                     custom
                     :padding="0"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     @init="navInit">
            <view class="nav-bar">
                <view class="nav-bar-back">
                    <fui-icon name="arrowleft"
                              size="56"
                              color="var(--content-primary)"
                              @click="$mroute.back()">
                    </fui-icon>
                </view>
                <view class="nav-bar-title">
                    <text class="font-weight">{{$t('newOrder.title')}}</text>
<!--                    <view class="nav-select-box">-->
<!--                        <text>全部</text>-->
<!--                        <image :src="`/static/img/tactic/down-${userTheme}.png`" mode="widthFix"></image>-->
<!--                    </view>-->
                </view>
                <view class="nav-bar-images">
                    <view class="image-item">
                        <image :src="`/static/img/tactic/order-nav-image-${userTheme}.png`" mode="widthFix"></image>
                    </view>
                </view>
            </view>
        </fui-nav-bar>
        <view class="swiper-warp"
              :style="`height: ${swiperHeight}px`">
            <view class="list-tabs">
                <fui-tabs :tabs="tabOptions"
                          :short="false"
                          :current="tabActive"
                          :height="88"
                          scroll
                          alignLeft
                          background="var(--background-primary)"
                          color="var(--content-tertiary)"
                          selectedSize="28"
                          selectedColor="var(--content-primary)"
                          scale="1"
                          sliderBackground="var(--content-primary)"
                          @change="tabChange">
                </fui-tabs>
            </view>
            <swiper class="swiper"
                    :current="tabActive"
                    :duration="duration"
                    @change="tabActive = $event.detail.current"
                    @transition="duration = 500">
                <swiper-item class="swiper-item">
                    <view class="select-warp">
                        <view class="dropdown-group">
                            <view class="dropdown-group-item" @click="coinShow=true">
                                <text class="font-weight">{{currency_id === 0 ? this.$t('list.all_t') : symbol}}</text>
                                <image :src="`/static/img/tactic/down-${userTheme}.png`" mode="widthFix"></image>
                            </view>
                            <view class="dropdown-group-item" @click="showType=true">
                                <text class="font-weight">{{typeList[otype]}}</text>
                                <image :src="`/static/img/tactic/down-${userTheme}.png`" mode="widthFix"></image>
                            </view>
<!--                            <view class="dropdown-group-item">-->
<!--                                <text>全部</text>-->
<!--                                <image :src="`/static/img/tactic/down-${userTheme}.png`" mode="widthFix"></image>-->
<!--                            </view>-->
                        </view>
                        <view class="right">
                            <view class="image-item" @click="timeShow=true">
                                <image src="/static/img/tactic/time-gray.png" mode="widthFix"/>
                            </view>
                        </view>
                    </view>
                    <view class="time-box" v-if="dateFilter">
                        <text>{{start}} - {{end}}</text>
                    </view>
                    <view class="list-warp">
                        <scroll-view class="list-body"
                                     :scroll-y="true"
                                     @scrolltolower="loadMore">
                            <empty-view :visible="!list.entrust || list.entrust.list.length === 0"
                                        :width="690"
                                        :height="690"
                                        :title="$t('list.not_data')">
                            </empty-view>
                            <view class="card-item" v-for="(item,index) in list.entrust ? list.entrust.list : []" :key="'e'+item.id">
                                <view class="row">
                                    <view class="coin">
                                        <text class="color-primary font-weight price_down" v-if="item.type === 1">
                                            {{$t('cor.t13')}}
                                        </text>
                                        <text class="color-primary font-weight" v-if="item.type === 2">
                                            {{$t('cor.t14')}}
                                        </text>
                                        <text class="color-primary font-weight " v-if="item.type === 3">
                                            {{$t('cor.t15')}}
                                        </text>
                                        <text class="color-primary font-weight price_down" v-if="item.type === 4">
                                            {{$t('cor.t16')}}
                                        </text>
                                        <text class="color-primary font-weight price_down" v-if="item.type === 5">
                                            {{$t('cor.t17')}}
                                        </text>
                                        <text class="color-primary font-weight price_down" v-if="item.type === 6">
                                            {{$t('cor.t18')}}
                                        </text>
                                        <text class="color-primary font-weight"
                                              :class="{'price_down': item.order.direction === 2}">
                                            {{item.order.muilt}}X
                                        </text>
                                        <text class="font-weight">
                                            {{item.symbol}}
                                        </text>
                                        <text class="tag">
                                            USDT
                                        </text>
                                    </view>
                                    <view class="toggle-button">
<!--                                        <button>修改</button>-->
                                        <button @click="cancelOrder(item.id)">{{$t('financing.t11')}}</button>
                                    </view>
                                </view>
                                <view class="row">
                                    <view class="column">
                                        <text>{{$t('contruct.com_pr')}}(USDT)</text>
                                        <text class="font-weight">
                                            {{$util.float(item.price)}}
                                        </text>
                                    </view>
                                    <view class="column">
                                        <text>{{$t('contruct.od_quan')}}({{item.symbol}})</text>
                                        <text class="font-weight">
                                            {{$util.float(item.amount)}}
                                        </text>
                                    </view>
                                    <view class="column">
                                        <text>{{$t('newOrder.tamount')}}({{item['symbol']}})</text>
                                        <text class="font-weight">
                                            0.00
                                        </text>
                                    </view>
                                </view>
                                <view class="row">
                                    <view class="column">
                                        <text>{{$t('newOrder.decry')}}</text>
                                        <text class="font-weight">{{$t('newOrder.notn')}}</text>
                                    </view>
                                </view>
                                <view class="row-footer">
                                    <text class="time">
                                        {{item.created_at}}
                                    </text>
                                    <view class="_right" v-if="false">
                                        <text>{{$t('contruct.tp')}}/{{$t('contruct.sl')}}--/--</text>
                                        <image :src="`/static/img/tactic/bj-${userTheme}.png`" mode="widthFix"></image>
                                    </view>
                                </view>
                            </view>
                        </scroll-view>
                    </view>
                </swiper-item>
                <swiper-item class="swiper-item">
                    <view class="select-warp">
                        <view class="dropdown-group">
                            <view class="dropdown-group-item" @click="coinShow=true">
                                <text>{{currency_id === 0 ? $t('list.all_t') : symbol}}</text>
                                <image :src="`/static/img/tactic/down-${userTheme}.png`" mode="widthFix"></image>
                            </view>
                            <view class="dropdown-group-item" @click="showType=true">
                                <text>{{typeList[otype]}}</text>
                                <image :src="`/static/img/tactic/down-${userTheme}.png`" mode="widthFix"></image>
                            </view>
                            <!--                            <view class="dropdown-group-item">-->
                            <!--                                <text>全部</text>-->
                            <!--                                <image :src="`/static/img/tactic/down-${userTheme}.png`" mode="widthFix"></image>-->
                            <!--                            </view>-->
                        </view>
                        <view class="right">
                            <view class="image-item" @click="timeShow=true">
                                <image src="/static/img/tactic/time-gray.png" mode="widthFix"/>
                            </view>
                        </view>
                    </view>
                    <view class="time-box" v-if="dateFilter">
                        <text>{{start}} - {{end}}</text>
                    </view>
                    <view class="list-warp">
                        <scroll-view class="list-body"
                                     :scroll-y="true"
                                     @scrolltolower="loadMore"
                        >
                            <empty-view :visible="!list.history || list.history.list.length === 0"
                                        :width="690"
                                        :height="690"
                                        :title="$t('list.not_data')">
                            </empty-view>
                            <view class="card-item" v-for="(item,index) in list.history ? list.history.list : []" :key="'h'+item.id">
                                <view class="row">
                                    <view class="coin">
                                        <text class="color-primary font-weight" v-if="item.type === 1">
                                            {{$t('cor.t33')}}
                                        </text>
                                        <text class="price_down font-weight" v-if="item.type === 2">
                                            {{$t('cor.t34')}}
                                        </text>
                                        <text class="color-primary font-weight" v-if="item.type === 3">
                                            {{$t('contruct.pindo')}}
                                        </text>
                                        <text class="price_down font-weight" v-if="item.type === 4">
                                            {{$t('contruct.empty')}}
                                        </text>
                                        <text class="color-primary font-weight" v-if="item.type === 5">
                                            {{$t('contruct.tp')}}
                                        </text>
                                        <text class="color-primary font-weight" v-if="item.type === 6">
                                            {{$t('contruct.sl')}}
                                        </text>
                                        <text class="color-primary font-weight"
                                              :class="{'price_down': item.type === 2 || item.type === 4}">
                                            {{item.order.muilt}}X
                                        </text>
                                        <text class="font-weight">
                                            {{item.symbol}}USDT
                                        </text>
                                    </view>
                                    <view class="state-box">
                                        <text>{{item.status === 2 ? $t('cor.t28') : $t('financing.t11')}}</text>
<!--                                        <fui-icon name="arrowright" color="var(&#45;&#45;content-tertiary)"-->
<!--                                                  size="34"></fui-icon>-->
                                    </view>
                                </view>
                                <view class="row-group">
                                    <text class="tag">
                                        {{item.order.margin_type === 1 ? $t('entrust.t7'):$t('entrust.t8')}}
                                    </text>
                                    <text class="tag">
                                        USDT
                                    </text>
                                </view>
                                <view class="row">
                                    <view class="column">
                                        <text>{{$t('contruct.com_pr')}}(USDT)</text>
                                        <text class="font-weight">{{item.price > 0 ? $util.float(item.price) : $t('contruct.bmp')}}</text>
                                    </view>
                                    <view class="column">
                                        <text>{{$t('contruct.od_quan')}}({{item.symbol}})</text>
                                        <text class="font-weight">{{$util.thousandSeparator(item.amount,item.decimals)}}</text>
                                    </view>
                                    <view class="column">
                                        <text>{{$t('newOrder.tamount')}}({{item.symbol}})</text>
                                        <text class="font-weight">{{item.status === 2 ? $util.thousandSeparator(item.amount,item.decimals):'--'}}</text>
                                    </view>
                                </view>
                                <view class="row">
                                    <view class="column">
                                        <text>{{$t('list.at_price')}}(USDT)</text>
                                        <text class="font-weight">{{$util.thousandSeparator(item.status === 2 ? item.t_price:0,item.decimals)}}</text>
                                    </view>
                                    <view class="column" v-if="item.type === 3 || item.type === 4">
                                        <text>{{$t('contruct.avp_price')}}(USDT)</text>
                                        <text class="font-weight">{{$util.thousandSeparator(item.order.price,2)}}</text>
                                    </view>

                                    <view class="column" v-if="item.type === 3 || item.type === 4">
                                        <text>{{$t('contruct.pl22')}}(USDT)</text>
                                        <text class="font-weight">{{$util.thousandSeparator(item.charge,2)}}</text>
                                    </view>

                                    <view class="column" v-if="item.type === 1 || item.type === 2">
                                        <text>{{$t('contruct.pl22')}}(USDT)</text>
                                        <text class="font-weight">{{$util.thousandSeparator(item.charge,2)}}</text>
                                    </view>
                                    <view class="column" v-if="item.type === 1 || item.type === 2">
                                        <text>{{$t('newOrder.decry')}}</text>
                                        <text class="font-weight">{{$t('newOrder.notn')}}</text>
                                    </view>
                                </view>
                                <view class="row" v-if="item.type > 2">
                                    <view class="column">
                                        <text>{{$t('newOrder.decry')}}</text>
                                        <text class="font-weight">{{$t('newOrder.yesn')}}</text>
                                    </view>
                                    <view class="column">
                                        <text>{{$t('cor.t35')}}</text>
                                        <text class="font-weight" :class="{'price_down':item.profit < 0}">{{$util.thousandSeparator(item.profit,2)}}</text>
                                    </view>
                                    <view class="column" v-if="item.type === 3 || item.type === 4">
                                        <text>{{$t('dp.t16')}}</text>

                                        <text class="font-weight" :class="{'price_down':item.profit < 0}">{{getProfitRate(item.price > 0 ? item.price:item.t_price,item.amount,item.order.muilt,item.profit)}}%</text>
                                    </view>
                                </view>
                                <view class="row-footer">
                                    <text class="time">
                                        {{item.created_at}}
                                    </text>
                                </view>
                            </view>
                        </scroll-view>
                    </view>
                </swiper-item>
                <swiper-item class="swiper-item">
                    <view class="select-warp">
                        <view class="dropdown-group">
                            <view class="dropdown-group-item" @click="coinShow=true">
                                <text>{{currency_id === 0 ? $t('list.all_t') : symbol}}</text>
                                <image :src="`/static/img/tactic/down-${userTheme}.png`" mode="widthFix"></image>
                            </view>
                            <view class="dropdown-group-item" @click="showType=true">
                                <text>{{typeList[otype]}}</text>
                                <image :src="`/static/img/tactic/down-${userTheme}.png`" mode="widthFix"></image>
                            </view>
                            <!--                            <view class="dropdown-group-item">-->
                            <!--                                <text>全部</text>-->
                            <!--                                <image :src="`/static/img/tactic/down-${userTheme}.png`" mode="widthFix"></image>-->
                            <!--                            </view>-->
                        </view>
                        <view class="right">
                            <view class="image-item" @click="timeShow=true">
                                <image src="/static/img/tactic/time-gray.png" mode="widthFix"/>
                            </view>
                        </view>
                    </view>
                    <view class="time-box" v-if="dateFilter">
                        <text>{{start}} - {{end}}</text>
                    </view>
                    <view class="list-warp">
                        <scroll-view class="list-body"
                                     :scroll-y="true"
                                     @scrolltolower="loadMore"
                        >
                            <empty-view :visible="!list.profit || list.profit.list.length === 0"
                                        :width="690"
                                        :height="690"
                                        :title="$t('list.not_data')">
                            </empty-view>
                            <view class="card-item" v-for="(item,index) in list.profit ? list.profit.list : []" :key="'p'+item.id">
                                <view class="row">
                                    <view class="coin">
                                        <text class="color-primary font-weight"
                                              :class="{'price_down': item.direction === 2}">
                                            {{ item.direction === 2 ? $t('entrust.t6') : $t('entrust.t5') }}
                                        </text>
                                        <text class="font-weight">
                                            {{item.symbol}}USDT
                                        </text>
                                        <text>
                                            {{item.margin_type === 1 ? $t('entrust.t7'):$t('cor.t47')}}
                                        </text>
                                    </view>
                                    <view class="share-image">
                                        <image @click="setPoster(item)" :src="`/static/img/tactic/share-${userTheme}.png`"
                                               mode="widthFix"></image>
                                    </view>
                                </view>
                                <view class="row">
                                    <view class="column">
                                        <text>{{$t('newOrder.pprofit')}}(USDT)</text>
                                        <text class="font-weight" :class="{'price_down':item.profit < 0}">{{$util.thousandSeparator(item.profit,item.decimals)}}</text>
                                    </view>
                                    <view class="column">
                                        <text>{{$t('contruct.close_num')}}</text>
                                        <text class="font-weight">{{$util.thousandSeparator(item.amount,item.decimals)}}</text>
                                    </view>
                                </view>
                                <view class="row">
                                    <view class="column">
                                        <text>{{$t('myFollow.open_time')}}</text>
                                        <text class="font-weight">{{this.convertToEasternTime(item.created_at,"-05:00")}}</text>
                                    </view>
                                    <view class="column">
                                        <text>{{$t('newOrder.ptime')}}</text>
                                        <text class="font-weight">{{this.convertToEasternTime(item.updated_at,"-18:00")}}</text>
                                    </view>
                                </view>
                                <view class="row">
                                    <view class="column">
                                        <text>{{$t('tradeInfo.average_op')}}</text>
                                        <text class="font-weight">{{$util.thousandSeparator(item.price,2)}}</text>
                                    </view>
                                    <view class="column">
                                        <text>{{$t('myFollow.average_clos')}}</text>
                                        <text class="font-weight">{{$util.thousandSeparator(item.t_price_3 != null ? item.t_price_3 : item.t_price_4)}}</text>
                                    </view>
                                </view>
                            </view>
                        </scroll-view>
                    </view>
                </swiper-item>
            </swiper>
        </view>

        <!-- 订单币种选择 -->
        <fui-bottom-popup :show="coinShow"
                          :radius="16"
                          background="var(--background-primary)">
            <view class="popup-wrap">
                <view class="popup-title">
                    <text class="font-16 color-black font-weight">
                        {{ $t('list.select_cur') }}
                    </text>
                    <fui-icon class="close-icon"
                              name="close"
                              :size="48"
                              color="var(--content-primary)"
                              @tap="coinShow = false">
                    </fui-icon>
                </view>
                <scroll-view scroll-y
                             class="popup-scroll-view"
                             :style="`height: ${contianerHeight - 150}px`">
                    <view class="cell" @click="currency_id=0;coinShow=false">
                        <text class="font-13 color-black" :class="{'color-primary font-weight': currency_id == 0}">
                            {{ $t('list.all_t') }}
                        </text>
                        <image src="/static/img/tactic/check-select.png"
                               mode="widthFix"
                               v-if="currency_id == 0">
                        </image>
                    </view>
                    <view class="cell" v-for="(item,index) in currency['currency']" :key="index" @click="currency_id=item.id;symbol=item.symbol;coinShow=false">
                        <text class="font-13 color-black"
                              :class="{'color-primary font-weight': currency_id == item.id}">
                            {{ item.symbol }}/USDT
                        </text>
                        <image src="/static/img/tactic/check-select.png"
                               mode="widthFix"
                               v-if="currency_id == item.id">
                        </image>
                    </view>
                </scroll-view>
            </view>
        </fui-bottom-popup>

        <!-- 订单类型选择 -->
        <fui-bottom-popup :show="showType"
                          :radius="16"
                          background="var(--background-primary)">
            <view class="popup-wrap">
                <view class="popup-title">
                    <text class="font-16 color-black font-weight">
                        {{ $t('list.select_odtype') }}
                    </text>
                    <fui-icon class="close-icon"
                              name="close"
                              :size="48"
                              color="var(--content-primary)"
                              @tap="showType = false">
                    </fui-icon>
                </view>
                <scroll-view scroll-y class="popup-scroll-view">
                    <view class="cell"
                          :class="{'active': otype == index}"
                          v-for="(item,index) in typeList" :key="index"
                          @click="otype=index;showType=false">
                        <text class="font-13 color-black"
                              :class="{'color-primary font-weight': otype == index}">
                            {{ item }}
                        </text>
                        <image src="/static/img/tactic/check-select.png"
                               mode="widthFix"
                               v-if="otype == index">
                        </image>
                    </view>
                </scroll-view>
            </view>
        </fui-bottom-popup>

        <fui-date-picker
                :theme="userTheme"
                range
                :start="$t('开始时间')"
                :title="$t('recod.t4')"
                titleSize="32"
                radius
                :end="$t('结束时间')"
                :show="timeShow"
                type="3"
                @change="setDate"
                @cancel="timeShow=false;dateFilter=false;start='';end='';getData()"
                :maxDate="maxDate"
                minDate="2024-01-01"
				:confirmText="$t('确定')" :cancelText="$t('取消')"
				:year_t="$t('年')" :month_t="$t('月')" :day_t="$t('日')"
        >
        </fui-date-picker>

        <alert ref="alert"
               :title="this.$t('login.tip_t2')"
               :ctxt="this.$t('login.cancel')"
               :ftxt="this.$t('login.confirm')"
               @confirm="confirm"
               :content="content">
        </alert>

        <loading ref="loading"></loading>
        <view class="myStrategy" :data-theme="userTheme">
            <fui-backdrop :show="visible"
                          :closable="false"
                          :z-index="1000"
                          @click="handClose">
                <view class="share-warp">
                    <view class="share-top">
                        <view class="canvas-box">
                            <l-painter ref="dpainter"
                                       :hidpi="true"
                                       hybrid
                                       isCanvasToTempFilePath
                                       @success="renderSuccess"
                                       :pixel-ratio="2"/>
                        </view>
                    </view>
                    <view class="share-footer">
                        <view class="toggle-group">
                            <view class="item" @click="copyLink">
                                <view class="image-box">
                                    <image :src="`/static/img/tactic/share-link-${userTheme}.png`" mode="widthFix"></image>
                                </view>
                                <text>
                                    {{$t('invaite.tt5')}}
                                </text>
                            </view>
                            <view class="item" @click="savePoster">
                                <view class="image-box">
                                    <image :src="`/static/img/tactic/share-down-${userTheme}.png`" mode="widthFix"></image>
                                </view>
                                <text>
                                    {{$t('invaite.tt4')}}
                                </text>
                            </view>
                            <view class="item" @click="more">
                                <view class="image-box">
                                    <image :src="`/static/img/tactic/share-more-${userTheme}.png`" mode="widthFix"></image>
                                </view>
                                <text>
                                    {{$t('更多')}}
                                </text>
                            </view>
                        </view>
                        <view class="cancel" @click="handClose">
                            <text>
                                {{$t('profile.ca')}}
                            </text>
                        </view>
                    </view>
                </view>
            </fui-backdrop>
        </view>
    </view>
</template>
<script>
import service from './service';
export default service;
</script>

<style lang="scss" scoped>
@import "orders";
</style>