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
    name: "profit-loss-popup",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        ticker:{
            type:Object
        },
        currency:{
            type:Object
        },
        position:{
            type:Object
        }
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    data() {
        return {
            themeColor:["#ffffff", "#111111"],
            markArr: [0, 25, 50, 75, 100],
            profitSliderVal: 0,
            lossSliderVal: 0,
            sliderBlockColor: ["#03aac7", "#f1493f"],
            util:util,
            priceBook:{},
            wwprice:'',
            wpprice:"",
            wamount:"",
            wtype:false,
            stopProfitVal:0,
            lwprice:"",
            lamount:"",
            stopLossVal:0,
            lpprice:"",
            ltype:false
        }
    },
    watch:{
        ticker(value){
            //接收到最新价格后计算仓位数据
            this.priceBook[value.currency_id] = value['data']['c'];
        },
        wamount(v){
            //止盈数量输入变化
            if(v > 0 ){
                let amount = this.position['amount'] - this.position['close'];
                if(v > amount){
                    this.wamount = amount;
                    v = amount;
                }
                if ((v / amount * 100) > 100) {
                    this.stopProfitVal = 100;
                } else {
                    this.stopProfitVal = v / amount * 100
                }
            }
        },
        lamount(v){
            //止损数量的变化
            if(v > 0 ){
                let amount = this.position['amount'] - this.position['close'];
                if(v > amount){
                    this.lamount = amount;
                    v = amount;
                }
                if ((v / amount * 100) > 100) {
                    this.stopLossVal = 100;
                } else {
                    this.stopLossVal = v / amount * 100
                }
            }
        },
        stopLossVal(v){
            let amount = this.position['amount'] - this.position['close'];
            this.lamount = util.thousandSeparator(amount * v / 100,this.currency['decimals']);
        }
    },
    methods: {
        setStopProfitVal(e) {
            let val = e.detail.value;
        },
        stopProfitChange(e) {
            this.stopProfitVal = e.detail.value;
            let amount = this.position['amount'] - this.position['close'];
            this.wamount = util.thousandSeparator(amount * e.detail.value / 100,this.currency['decimals']);
        },
        /**
         * 盈亏百分比
         * @param d 方向  true 止盈 false 止损
         */
        estimateRate(d) {
            let _d = this.position['direction'] === 1 && d ? 1 : 2
            let profit = this.estimateProfit(
                this.position['price'],
                d ? this.wwprice : this.lwprice,
                d ? this.wamount : this.lamount,
                _d
            );
            let margin = this.position['margin'];
            return parseFloat(util.str2number(profit) / margin * 100).toFixed(2);
        },
        estimateProfit(o, s, a, d) {
            let c = d === 1 ? s - o : o - s;
            let p = c * a;
            return util.thousandSeparator(p,2);
        },
        handClose() {
            this.$emit('close')
        },
        handConfirm() {
            this.$emit('confirm',{
                wwprice:this.wwprice,
                wpprice:this.wpprice,
                wamount:this.wamount,
                lwprice:this.lwprice,
                lamount:this.lamount,
                lpprice:this.lpprice
            });
            this.wwprice = '';
            this.wpprice = '';
            this.wamount = '';
            this.lwprice = '';
            this.lamount = '';
            this.lpprice = '';
            this.$emit('close')
        },
        hiden(){
            this.$emit('hiddenKeybord');
        },
        $t(key){
            return i18n.t(key);
        }
    }
}