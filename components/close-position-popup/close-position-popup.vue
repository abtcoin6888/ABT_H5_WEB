<template>
    <fui-bottom-popup :show="show"
                      :background="themeColor[userTheme == 'light' ? 0 : 1]">
        <view class="layer-warp" @click="hiden">
            <view class="title-warp border-bottom">
                <text class="font-16 font-weight color-black">
                    {{$t('newcontract.t42') }}
                </text>
                <fui-icon name="close"
                          size="52"
                          :color="themeColor[userTheme == 'light' ? 1 : 0]"
                          @click="handClose">
                </fui-icon>
            </view>
            <view class="popup-container">
                <view class="c-head">
                    <view class="currency-warp">
                        <view class="tag-view bg-red">
                            <text class="font-10 font-weight always-white">
                                {{position['direction'] === 1 ? $t('entrust.t5'):$t('entrust.t6')}}
                            </text>
                        </view>
                        <text class="font-15 font-weight color-red">
                            {{position['muilt']}}X
                        </text>
                        <text class="font-15 font-weight color-black currency-txt">
                            {{position['symbol']}}USDT
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
                                {{util.thousandSeparator(priceBook[position['currency_id']],currency['decimals'])}} USDT
                            </text>
                        </view>
                        <view class="h-row h-row-last">
                            <text class="font-12 color-gray">
                                {{$t('tradeInfo.average_op') }}
                            </text>
                            <text class="font-12 color-black font-weight">
                                {{util.thousandSeparator(position['price'],2) }} USDT
                            </text>
                        </view>
                    </view>
                </view>
                <view class="from-warp">
                    <text class="font-12 color-black font-weight">
                        {{$t('contruct.close_price') }}
                    </text>
                    <view class="price-input-warp">
                        <view class="price-input bg-gray">
                            <input class="input font-13 color-black"
                                   type="digit"
                                   :disabled="priceDisabled"
                                   :auto-blur="true"
                                   :cursor-spacing="10"
                                   v-model="pprice"
                                   :placeholder="priceDisabled ? $t('contruct.bmp'):$t('newcontract.t43')"/>
                            <text class="sysmol-txt font-12 font-weight color-black">
                                USDT
                            </text>
                        </view>
                        <view class="price-type-button bg-gray"
                              @click="priceDisabled = !priceDisabled">
                            <text class="font-12 font-weight color-green">
                                {{ priceDisabled ? $t('trade.lm_pr') : $t('trade.mk_pr') }}
                            </text>
                        </view>
                    </view>
                    <text class="font-12 color-black font-weight">
                        {{$t('trade.num') }}
                    </text>
                    <view class="number-input-warp bg-gray">
                        <input class="input font-13 color-black"
                               type="digit"
                               :auto-blur="true"
                               :cursor-spacing="10"
                               v-model="pamount"
                               :placeholder="$t('newcontract.t44')"/>
                        <text class="sysmol-txt font-12 font-weight color-black">
                            {{position['symbol']}}
                        </text>
                    </view>
                    <view class="form-slider-warp">
                        <view class="slider-background bg-gray">
                            <view class="slider-active bg-black"
                                  :style="`width: ${closePositionSliderVal * 6.9}rpx`">
                            </view>
                            <view class="slider-dots bg-white"
                                  v-for="item in markArr">
                            </view>
                        </view>
                        <view class="slider">
                            <slider activeColor="transparent"
                                    backgroundColor="transparent"
                                    :value="closePositionSliderVal"
                                    :block-size="18"
                                    :block-color="sliderBlockColor[userTheme === 'light' ? 0 : 1]"
                                    @change="closePositionSliderVal = $event.detail.value"
                                    @changing="closePositionSliderVal = $event.detail.value"/>
                        </view>
                        <view class="bottom-mark">
                            <text class="mark-txt font-10"
                                  :class="closePositionSliderVal >= item ? 'color-black' : 'color-gray'"
                                  :style="`left: ${index * 160}rpx`"
                                  v-for="(item, index) in markArr"
                                  :key="index">
                                {{ item }}%
                            </text>
                        </view>
                    </view>
                    <view class="form-row-group">
                        <view class="row-item">
                            <text class="font-12 color-gray">
                                {{$t('newcontract.t10') }}
                            </text>
                            <text class="font-12 color-black font-weight">
                                {{util.float(position['amount']) }} {{position['symbol'] }}
                            </text>
                        </view>
                        <view class="row-item">
                            <text class="font-12 color-gray">
                                {{$t('newcontract.t45') }}
                            </text>
                            <text class="font-12 color-black font-weight">
                                {{util.thousandSeparator(position['amount'] - position['close'],currency['decimals']) }}
                                {{position['symbol'] }}
                            </text>
                        </view>
                        <view class="row-item">
                            <text class="font-12 color-gray">
                                {{$t('contruct.ep_loss') }}
                            </text>
                            <text class="font-12 color-black font-weight">
                                {{
                                    pamount > 0 ? estimateProfit(
                                            position['price'],
                                            priceDisabled ? util.str2number(priceBook[position['currency_id']]) : pprice > 0 ? pprice:0,
                                            pamount,
                                            position['direction']
                                    ) : '0.00'
                                }} USDT
                            </text>
                        </view>
                        <!-- <view class="row-item">
                            <text class="font-12 color-gray">
                                {{$t('newcontract.t46') }}
                            </text>
                            <text class="font-12 color-black font-weight">
                                {{
                                    pamount > 0 ? util.thousandSeparator(pamount * (priceDisabled ? priceBook[position['currency_id']] : pprice) * currency['fee_close']) : '0.00'
                                }}
                                USDT
                            </text>
                        </view> -->
                    </view>
                    <view class="confirm-button bg-black"
                          @click="handComfirm">
                        <text class="font-14 color-white font-weight">
                            {{$t('hand.confirm_t') }}
                        </text>
                    </view>
                </view>
            </view>
        </view>
    </fui-bottom-popup>
</template>
<script>
import {
    mapGetters
} from 'vuex';

import {
    initVueI18n
} from '@dcloudio/uni-i18n'
import en from '@/local/en.json';
import zh_Hant from "@/local/zh-Hant.json"
import ja from '@/local/ja.json'
import ko from '@/local/ko.json'

const messages = {
    en,
    'zh-Hant': zh_Hant,
    'ja': ja,
    'ko': ko
}
const localLang = uni.getStorageSync('lang');
const i18n = initVueI18n(typeof localLang != 'undefined' && localLang !== '' ? localLang : 'en', messages);

import util from '@/common/util.js';

export default {
    name: "close-position-popup",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        position:{
            type:Object
        },
        ticker:{
            type:Object
        },
        currency:{
            type:Object
        }
    },
    watch:{
        ticker(value){
            //接收到最新价格后计算仓位数据
            this.priceBook[value.currency_id] = value['data']['c'];
        },
        closePositionSliderVal(v){
            if(v > 0){
                let amount = parseFloat(this.position['amount']) - parseFloat(this.position['close']);
                this.pamount = util.thousandSeparator(amount * v / 100,this.currency['decimals']);
            }else{
                this.pamount = '';
            }
        },
        position(v){
            this.pamount = util.thousandSeparator(v['amount'] - v['close'],this.currency['decimals']);
        }
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    data() {
        return {
            themeColor:["#ffffff", "#111111"],
            priceDisabled: true,
            markArr: [0, 25, 50, 75, 100],
            sliderBlockColor: ["#111111", "#ffffff"],
            closePositionSliderVal: 100,
            util:util,
            priceBook:[],
            pamount:'',
            pprice:''
        }
    },
    methods: {
        estimateProfit(o, s, a, d) {
            if(s === 0 || s === ''){
                return '0.00';
            }
            let c = d === 1 ? s - o : o - s;
            let p = c * a;
            return util.thousandSeparator(p,2);
        },
        handClose() {
            this.$emit('close')
        },
        handComfirm(){
            //this.$emit('close');
            this.$emit('confirm',
                this.position['id'],
                util.str2number(this.pamount),
                this.priceDisabled ? this.priceBook[this.position['currency_id']]:this.pprice,
                !this.priceDisabled)
            this.pprice = '';
            this.pamount = '';
            this.closePositionSliderVal = 0;
        },
        $t(key) {
            return i18n.t(key);
        },
        hiden(){
            this.$emit('hiddenKeybord');
        }
    }
}
</script>

<style scoped>
@import "close-position-popup.css";
</style>