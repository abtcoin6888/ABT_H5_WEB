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
import mroute from '@/common/route';

let set ;

export default {
    name: "listComponents",
    props: {
        data: {
            type: Array,
            default: () => []
        },
        ticker:{
            type:Object
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    mounted() {
        let _this = this;
		setInterval(()=>{
			_this.calculationPosition();
		},500);
    },
    data() {
        return {
            position : [],
			util:util,
            mroute:mroute,
            priceBook:{}
        }
    },
    watch:{
        data(value){
            this.position = value;
        },
        ticker(value){
            //接收到最新价格后计算仓位数据 ，计算所有有行情最新价格保存过来的仓位，不然浮动盈亏会乱跳
            this.priceBook[value.currency_id] = value['data']['c'];
            //this.calculationPosition();
        },
		position(v){
			if(!v || v.length === 0){
				uni.$emit('no_position');
			}
		}
    },
    emits: ['stopProfitLossClick', 'closePositionClick', 'backhandClick', 'shareClick'],
    methods: {
        calculationPosition(){
            if (this.position.length === 0) {
				// uni.$emit('no_position');
                return false;
            }
            try {
                //let currencyPosition = this.position.findIndex((item)=>item.currency_id === ticker.currency_id);
                let profit = 0;
				let _this = this;
                this.position.map((item)=>{
					if(this.priceBook[item.currency_id] && this.priceBook[item.currency_id] > 0){
						let newPrice = this.priceBook[item.currency_id];
						let amount = parseFloat(item['amount']) - parseFloat(item['close']);
						let o = parseFloat(item['price']);
						//let newPrice = parseFloat(ticker['data']['c']);
						let p;
						if (parseInt(item['direction']) === 1) {
						    p = amount * (newPrice - o)
						} else {
						    p = amount * (o - newPrice)
						}
						item['p'] = p;
						profit += p;
						//rate
						let pr;
						if (parseInt(item['direction']) === 1) {
						    pr = item.amount * (newPrice - item.price) / item.margin * 100;
						} else {
						    pr = item.amount * (item.price - newPrice) / item.margin * 100;
						}
						item['rate'] = pr > 0 ? '+' + util.thousandSeparator(pr, 2) : util.thousandSeparator(pr)
												
						if (parseInt(item['direction']) === 1) {
						    p = util.thousandSeparator(item.amount * (newPrice - item.price), 4);
						} else {
						    p = util.thousandSeparator(item.amount * (item.price - newPrice), 4);
						}
						item['mr'] = util.thousandSeparator((parseFloat(item.margin) + parseFloat(p)) / parseFloat(item.margin) * 100, 2);
						// position[i] = item;
						//this.position[currencyPosition] = item;
						return item;
					}
                });
                if(profit !== 0){
                    uni.$emit('profit', 1, profit);
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 点击止盈止损
        onProfitLossClick(index) {
            this.$emit('stopProfitLossClick',index)
        },
        // 点击平仓
        onClosePositionClick(index) {
            this.$emit('closePositionClick',index)
        },
        // 点击反手
        onBackhandClick(index) {
            this.$emit('backhandClick',index)
        },
        // 点击分享图标
        onShareClick(index) {
            this.$emit('shareClick',index)
        },
        $t(key) {
            return i18n.t(key);
        },
    }
}
