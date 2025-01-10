<template>
    <fui-bottom-popup :show="show"
                      :background="themeColor[userTheme == 'light' ? 0 : 1]">
        <view class="layer-warp bg-white" @click="hiden">
            <view class="title-warp border-bottom">
                <text class="font-14 font-weight color-black">
                    {{$t('cor.t26') }}
                </text>
                <fui-icon name="close"
                          size="52"
                          :color="themeColor[userTheme == 'light' ? 1 : 0]"
                          @click="handClose">
                </fui-icon>
            </view>
            <view class="popup-container">
                <view class="c-head border-bottom">
                    <view class="currency-warp">
                        <view class="tag-view bg-red">
                            <text class="font-10 font-weight always-white">
                                {{position['direction'] === 1 ? $t('entrust.t5'):$t('entrust.t6')}}
                            </text>
                        </view>
                        <text class="font-14 font-weight color-red">
                            {{position['muilt'] }}X
                        </text>
                        <text class="font-14 font-weight color-black currency-txt">
                            {{position['symbol'] }}USDT
                        </text>
                        <view class="tag-view bg-gray">
                            <text class="font-10 font-weight color-gray">
                                {{position['margin_type'] === 1 ? $t('entrust.t7'):$t('entrust.t8')}}
                            </text>
                        </view>
                    </view>
                    <view class="currency-row-group">
                        <view class="h-row">
                            <text class="font-12 color-gray">
                                {{$t('newcontract.t34') }}
                            </text>
                            <text class="font-12 color-black font-weight">
                                {{util.thousandSeparator(priceBook[position['currency_id']],currency['decimals']) }} USDT
                            </text>
                        </view>
                        <view class="h-row">
                            <text class="font-12 color-gray">
                                {{$t('tradeInfo.average_op') }}
                            </text>
                            <text class="font-12 color-black font-weight">
                                {{util.thousandSeparator(position['price'],currency['decimals']) }} USDT
                            </text>
                        </view>
                        <view class="h-row h-row-last">
                            <text class="font-12 color-gray">
                                {{$t('newcontract.t35') }}
                            </text>
                            <text class="font-12 color-black font-weight">
                                {{util.thousandSeparator(position['stopPrice'],currency['decimals']) }} USDT
                            </text>
                        </view>
                    </view>
                </view>
                <!--        止盈        -->
                <view class="form-warp">
                    <view class="from-price-input-warp">
                        <view class="price-input-item">
                            <text class="font-13 font-weight color-gray">
                                {{$t('contruct.trigger_price') }}{{position['direction'] === 1 ? '≥' : '≤' }}
                            </text>
                            <view class="price-input bg-gray">
                                <input class="input font-12 color-black"
                                       type="digit"
                                       :auto-blur="true"
                                       v-model="wwprice"
                                       :cursor-spacing="10"
                                       :placeholder="$t('contract.t104')">
                                <text class="font-12 color-black font-weight sysmol-txt">
                                    USDT
                                </text>
                            </view>
                        </view>
                        <view class="price-input-item">
                            <text class="font-13 color-gray">
                                {{$t('newcontract.t36') }}{{position['direction'] === 1 ? '≥' : '≤' }}
                            </text>
                            <view class="price-input bg-gray">
                                <input class="input font-12 color-black"
                                       :type="!wtype ? 'text':'digit'"
                                       :disabled="!wtype"
                                       :auto-blur="true"
                                       :cursor-spacing="10"
                                       v-model="wpprice"
                                       :placeholder="wtype ? $t('contract.t103'):$t('contruct.bmp')">
                                <text class="font-12 color-black font-weight sysmol-txt" @click="wtype=!wtype">
                                    {{!wtype ? $t('trade.mk_pr') : $t('trade.lm_pr')}}
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="from-num-input-warp bg-gray">
                        <input class="input font-12 color-black"
                               type="digit"
                               :auto-blur="true"
                               :cursor-spacing="10"
                               v-model="wamount"
                               :placeholder="$t('financing.t86')">
                        <text class="font-12 color-black font-weight sysmol-txt">
                            {{ position['symbol'] }}
                        </text>
                    </view>
                    <view class="from-slider-warp">
                        <view class="slider-warp">
                            <view class="slider-background bg-gray">
                                <view class="slider-active bg-green"
                                      :style="`width: ${stopProfitVal * 6.9}rpx`">
                                </view>
                                <view class="slider-dots bg-white"
                                      v-for="item in markArr">
                                </view>
                            </view>
                        </view>
                        <view class="slider">
                            <slider activeColor="transparent"
                                    backgroundColor="transparent"
                                    :value="stopProfitVal"
                                    :block-size="18"
                                    :block-color="sliderBlockColor[0]"
                                    @change="stopProfitChange"
                                    @changing="stopProfitChange"/>
                        </view>
                        <view class="bottom-mark">
                            <text class="mark-txt font-10"
                                  :class="stopProfitVal >= item ? 'color-black' : 'color-gray'"
                                  :style="`left: ${index * 160}rpx`"
                                  v-for="(item, index) in markArr"
                                  :key="index">
                                {{ item }}%
                            </text>
                        </view>
                    </view>
                    <view class="label-context"
                          v-if="wwprice >0 && (wtype && wpprice > 0 || !wtype) && wamount > 0">
                        <text class="font-12 color-gray  desc-text">
                            {{$t('newcontract.t37') }}
                            {{estimateRate(true) }}%
                            ，{{ $t('newcontract.t94') }}{{position['direction'] === 1 ? '≥' : '≤' }}
                            {{wtype ? util.float(wpprice) : wwprice }}
                            USDT{{$t('newcontract.t38') }}
                            {{util.float(wamount) }}
                            {{position['symbol'] }}，
                            {{$t('newcontract.t39') }}
                            {{
                                estimateProfit(
                                        position['price'],
                                        (!wtype ? wwprice : wpprice),
                                        wamount,
                                        position['direction']
                                )
                            }} USDT
                        </text>
                    </view>
                </view>
                <!--        止损        -->
                <view class="form-warp">
                    <view class="from-price-input-warp">
                        <view class="price-input-item">
                            <text class="font-13 font-weight color-gray">
                                {{$t('contruct.trigger_price') }} {{position['direction'] === 1 ? '≤' : '≥' }}
                            </text>
                            <view class="price-input bg-gray">
                                <input class="input font-12 color-black"
                                       type="digit"
                                       :auto-blur="true"
                                       :cursor-spacing="10"
                                       v-model="lwprice"
                                       :placeholder="$t('contract.t104')">
                                <text class="font-12 color-black font-weight sysmol-txt">
                                    USDT
                                </text>
                            </view>
                        </view>
                        <view class="price-input-item">
                            <text class="font-13 font-weight color-gray">
                                    {{$t('newcontract.t40') }}
                                    {{position['direction'] === 1 ? '≤' : '≥' }}
                            </text>
                            <view class="price-input bg-gray">
                                <input class="input font-12 color-black"
                                       :type="ltype ? 'digit':'text'"
                                       :auto-blur="true"
                                       :disabled="!ltype"
                                       :cursor-spacing="10"
                                       v-model="lpprice"
                                       :placeholder="ltype ? $t('contract.t103'):$t('contruct.bmp')">
                                <text class="font-12 color-black font-weight sysmol-txt" @click="ltype=!ltype">
                                    {{!ltype ? $t('trade.mk_pr') : $t('trade.lm_pr')}}
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="from-num-input-warp bg-gray">
                        <input class="input font-13 color-black"
                               type="digit"
                               :auto-blur="true"
                               :cursor-spacing="10"
                               v-model="lamount"
                               :placeholder="$t('quickly.tt59')">
                        <text class="font-12 color-black font-weight sysmol-txt">
                            {{ position['symbol'] }}
                        </text>
                    </view>
                    <view class="from-slider-warp">
                        <view class="slider-warp">
                            <view class="slider-background bg-gray">
                                <view class="slider-active bg-red"
                                      :style="`width: ${stopLossVal * 6.9}rpx`">
                                </view>
                                <view class="slider-dots bg-white"
                                      v-for="item in markArr">
                                </view>
                            </view>
                        </view>
                        <view class="slider">
                            <slider activeColor="transparent"
                                    backgroundColor="transparent"
                                    :block-size="18"
                                    :value="stopLossVal"
                                    :block-color="sliderBlockColor[1]"
                                    @change="stopLossVal = $event.detail.value"
                                    @changing="stopLossVal = $event.detail.value"/>
                        </view>
                        <view class="bottom-mark">
                            <text class="mark-txt font-10"
                                  :class="stopLossVal >= item ? 'color-black' : 'color-gray'"
                                  :style="`left: ${index * 160}rpx`"
                                  v-for="(item, index) in markArr"
                                  :key="index">
                                {{ item }}%
                            </text>
                        </view>
                    </view>
                    <view class="label-context"
                          v-if="lwprice > 0 && (ltype && lpprice > 0 || !ltype) && lamount >0">
                        <text class="font-12 color-gray  desc-text">
                            {{$t('newcontract.t37') }}
                            -{{estimateRate(false) }}%
                            ，{{ $t('newcontract.t94') }}{{position['direction'] === 1 ? '≤' : '≥' }}
                            {{!ltype ? lwprice : util.float(lpprice) }}
                            {{$t('newcontract.t41') }}
                            {{util.float(lamount) }}
                            {{position['symbol'] }}，{{$t('newcontract.t39') }}
                            {{
                                util.float(estimateProfit(
                                        position['price'],
                                        (!ltype ? lwprice : lpprice),
                                        lamount,
                                        position['direction']
                                ))
                            }} USDT
                        </text>
                    </view>
                </view>
                <view class="confirm-button bg-black"
                      @click="handConfirm">
                    <text class="font-14 font-weight color-white">
                        {{$t('hand.confirm_t') }}
                    </text>
                </view>
            </view>
        </view>
    </fui-bottom-popup>
</template>
<script>
import service from './service';
export default service;
</script>
<style scoped>
@import "profit-loss-popup.css";
</style>