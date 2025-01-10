<template>
    <view class="list-components"
          :class="userTheme"
          v-for="(item,index) in position"
          :key="index">
        <view class="lc-head">
            <view class="tag-view" :class="item.direction === 1 ? 'bg-green' : 'bg-red'">
                <text class="font-10 always-white font-weight">
                    {{ item.direction === 1 ? $t('tradeInfo.many') : $t('tradeInfo.null') }}
                </text>
            </view>
            <text class="font-15 font-weight color-red hd-txt ratio">
                {{ item['muilt'] }}X
            </text>
            <text class="font-15 font-weight color-black hd-txt currency">
                {{ item['symbol'] }}
            </text>
            <view class="tag-view bg-gray">
                <text class="font-10 color-gray">
                    {{ item.margin_type === 1 ? $t('cor.t46') : $t('contruct.wbw') }}
                </text>
            </view>
            <view class="tag-view bg-gray">
                <text class="font-10 color-gray">USDT</text>
            </view>
            <image class="kline-icon"
                   @click="mroute.toKline(0,item.currency_id,2)"
                   :src="`/static/img/newContract/kline-icon-${userTheme}.webp`"
                   mode="widthFix">
            </image>
        </view>
        <view class="lc-container">
            <view class="top">
                <view class="column">
                    <text class="font-12 color-gray mb-5">
                        {{ $t('newcontract.t9') }}(USDT)
                    </text>
                    <view class="pl-price">
                        <text class="font-16  font-weight mr-5"
                              :class="{'price_up' : item.p > 0 ,'price_down':item.p < 0, 'color-black': item.p === 0}">
                            {{ item.p > 0 ? '+' : '' }}{{ util.thousandSeparator(item.p) }}
                        </text>
                        <text class="font-11 color-gray">
                            ≈{{ util.thousandSeparator(util.getLCR() * item.p) }}{{ util.getLCS() }}
                        </text>
                    </view>
                </view>
                <view class="column column-last">
                    <text class="font-12 color-gray mb-5">
                        {{$t('contruct.response_rate')}}
                    </text>
                    <text class="font-14 font-weight" :class="{'price_up' : item.p > 0 ,'price_down':item.p < 0, 'color-black': item.p === 0}">
                        {{item.rate ? item.rate : '--' }}%
                    </text>
                </view>
            </view>
            <view class="bottom">
                <view class="row-group">
                    <view class="item">
                        <text class="font-11 color-gray mb-5">
                            {{$t('newcontract.t10') }}({{item['symbol'] }})
                        </text>
                        <text class="font-12 font-weight color-black">
                            {{util.thousandSeparator(item['amount'] - item['close'], item.decimals) }}
                        </text>
                    </view>
                    <view class="item column-center">
                        <text class="font-11 color-gray mb-5">
                            {{$t('contruct.avp_price') }}
                        </text>
                        <text class="font-12 font-weight color-black">
                            {{util.thousandSeparator(item.price, item.decimals) }}
                        </text>
                    </view>
                    <view class="item column-last">
                        <text class="font-11 color-gray mb-5">
                            {{$t('newcontract.t11') }}
                        </text>
                        <text class="font-12 font-weight color-black">
                            {{util.thousandSeparator(item.mr) }}%
                        </text>
                    </view>
                </view>
                <view class="row-group">
                    <view class="item">
                        <text class="font-11 color-gray mb-5">
                            {{$t('newcontract.t12') }}(USDT)
                        </text>
                        <text class="font-12 font-weight color-black">
                            {{util.float(priceBook[item.currency_id] ? priceBook[item.currency_id] : 0) }}
                        </text>
                    </view>
                    <view class="item column-center">
                        <text class="font-11 color-gray mb-5">
                            {{$t('contract.tt4') }}
                        </text>
                        <text class="font-12 font-weight color-black">
                            {{item.stopPrice <= 0 ? $t('contruct.nl_yp') : util.thousandSeparator(item.stopPrice, item.decimals) }}
                        </text>
                    </view>
                    <view class="item column-last">
                        <text class="font-11 color-gray mb-5">
                            {{$t('contruct.margin') }}(USDT)
                        </text>
                        <text class="font-12 font-weight color-black">
                            {{util.thousandSeparator(item.margin, 2) }}
                        </text>
                    </view>
                </view>
            </view>
        </view>
        <view class="lc-buttons border-top">
            <view class="btn-item border-right"
                  @click="onProfitLossClick(index)">
                <text class="font-13 font-weight color-green">
                    {{$t('contruct.tp_sl')}}
                </text>
            </view>
            <view class="btn-item border-right"
                  @click="onBackhandClick(index)">
                <text class="font-13 font-weight color-green">
                    {{$t('newcontract.t13')}}
                </text>
            </view>
            <view class="btn-item border-right"
                  @click="onClosePositionClick(index)">
                <text class="font-13 font-weight color-green">
                    {{$t('contruct.close_position')}}
                </text>
            </view>
            <image class="share-icon"
                   :src="`/static/img/tactic/share-${userTheme}.png`"
                   mode="widthFix"
                   @click="onShareClick(index)">
            </image>
        </view>
        <view class="lc-line bg-gray"></view>
    </view>
</template>
<script>
import service from "./service"

export default service
</script>
<style scoped>
@import "listComponents.css";
</style>