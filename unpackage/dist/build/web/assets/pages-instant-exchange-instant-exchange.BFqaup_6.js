import{a as e,bM as a,i as t,f as r,j as s,r as n,q as c,w as i,t as l,u as o,v as u,C as h,x as y,z as d,D as p,G as b,H as g,W as f}from"./index-CvJkP8r7.js";import{_ as m}from"./fui-icon.BbrID5X2.js";import{r as C}from"./uni-app.es.4grYzir1.js";import{_ as w}from"./fui-nav-bar.CZAK61wT.js";import{_}from"./coin-indexed-xlist.B8OWLfeG.js";import{_ as x}from"./uni-popup.BKNKbknm.js";import{c as P}from"./currency.KCotsIzN.js";import{u as V}from"./user.PBjN9YNI.js";import{_ as B}from"./_plugin-vue_export-helper.BCo6x5W8.js";const k=B({data:()=>({navHeight:"",isLabel1First:!0,coinArr:[],baseCurrency:{symbol:"",icon:"",balance:0},targetCurrency:{symbol:"",icon:"",balance:0},baseBalance:0,baseCurrencyPrice:0,targetCurrencyPrice:0,inputValue1:"",inputValue2:""}),computed:{...e(["userTheme","isLogin"]),exchangeRate(){return this.baseCurrencyPrice&&this.targetCurrencyPrice?(this.baseCurrencyPrice/this.targetCurrencyPrice).toFixed(8):0},isBalanceSufficient(){return parseFloat(this.inputValue1)<=parseFloat(this.baseBalance)}},mounted(){this.initializeCurrency()},methods:{async initializeCurrency(){if(!this.isLogin)return a({url:"/pages/login/login"});try{const e=await t.getAccountCurrency();this.coinArr=e.data,this.baseCurrency=this.coinArr.find((e=>"USDT"===e.symbol))||this.coinArr[0],this.targetCurrency=this.coinArr.find((e=>"BTC"===e.symbol))||this.coinArr[1],await this.updateBalancesAndPrices()}catch(e){console.error("Failed to load currencies:",e)}},async updateBalancesAndPrices(){await Promise.all([this.getBalance(this.baseCurrency),this.getBalance(this.targetCurrency)]),await this.getCurrencyPrice(this.baseCurrency),await this.getCurrencyPrice(this.targetCurrency),this.updateExchangeRate()},async getBalance(e){try{const a=await V.getCurrencyBalance(e.id);e.balance=a.data.balance,this.baseBalance=e.id===this.baseCurrency.id?e.balance:this.baseBalance}catch(a){console.error(`Failed to get balance for ${e.symbol}:`,a)}},async getCurrencyPrice(e){try{const a=await P.getCurrencyInfo(e.id,1,0);e.id===this.baseCurrency.id?this.baseCurrencyPrice=a.data.new_price:this.targetCurrencyPrice=a.data.new_price}catch(a){console.error(`Failed to get price for ${e.symbol}:`,a)}},async swapLabels(){[this.baseCurrency,this.targetCurrency]=[this.targetCurrency,this.baseCurrency],[this.baseCurrencyPrice,this.targetCurrencyPrice]=[this.targetCurrencyPrice,this.baseCurrencyPrice],this.updateExchangeRate(),await this.updateBalancesAndPrices(),this.handleInput1()},updateExchangeRate(){this.exchangeRate=this.baseCurrencyPrice&&this.targetCurrencyPrice?(this.baseCurrencyPrice/this.targetCurrencyPrice).toFixed(8):0},handleInput1(){if(0===parseFloat(this.baseBalance))return this.inputValue1="0.00000000",void(this.inputValue2="0.00000000");""!==this.inputValue1?this.inputValue2=(this.inputValue1*this.exchangeRate).toFixed(8):this.inputValue2=""},handleInput2(){if(0===parseFloat(this.baseBalance))return this.inputValue1="0.00000000",void(this.inputValue2="0.00000000");this.inputValue1=(this.inputValue2/this.exchangeRate).toFixed(8)},async updateBalances(){try{const e=await V.getCurrencyBalance(this.baseCurrency.id),a=await V.getCurrencyBalance(this.targetCurrency.id);this.baseBalance=e.data.balance,this.targetBalance=a.data.balance}catch(e){console.error("Failed to update balances:",e)}},showCurrencyPopup(e){this.show_id=e,this.$refs.currencyPopup.open()},async currencyChange(e){this.$refs.currencyPopup.close(),0===this.show_id?this.baseCurrency=e:this.targetCurrency=e,await this.updateBalancesAndPrices(),this.handleInput1()},async exchange(){if(parseFloat(this.inputValue1)>0){try{await t.fastExchange({key1:this.inputValue1,key2:this.inputValue2,currency1:this.baseCurrency.id,currency2:this.targetCurrency.id}),r({title:"兑换成功",icon:"success"})}catch(e){console.error("Exchange failed:",e),r({title:"兑换失败",icon:"none"})}setTimeout((()=>{s({url:"/pages/wallet/wallet"})}),1500)}else r({title:"请输入兑换数量",icon:"none"})}}},[["render",function(e,a,t,r,s,P){const V=C(n("fui-icon"),m),B=C(n("fui-nav-bar"),w),k=b,v=g,F=l,I=f,$=C(n("coin-indexed-xlist"),_),A=C(n("uni-popup"),x);return o(),c(F,{class:"page-warp bg-white","data-theme":e.userTheme},{default:i((()=>[u(B,{zIndex:"1",isFixed:"",isOccupy:"",padding:15,background:"var(--background-primary)",color:"var(--content-primary)",title:e.$t("financing.t81"),onLeftClick:a[0]||(a[0]=a=>e.$mroute.back())},{default:i((()=>[u(V,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["title"]),u(F,{class:"exchange-symbol"},{default:i((()=>[u(F,{class:"currency-label bg-gray",style:h("transform: "+(s.isLabel1First?"translateY(0)":"translateY(116%)"))},{default:i((()=>[u(F,{class:"label-top"},{default:i((()=>[u(F,{class:"intro",onClick:a[1]||(a[1]=e=>P.showCurrencyPopup(0))},{default:i((()=>[u(k,{class:"currency-image",src:s.baseCurrency.icon||"/static/coin/usdt.png",mode:"widthFix"},null,8,["src"]),u(v,{class:"font-16 font-bold color-black mr-5"},{default:i((()=>[y(d(s.baseCurrency.symbol),1)])),_:1}),u(V,{name:"arrowright",size:"38",color:"var(--content-tertiary)"})])),_:1}),u(I,{class:"input font-16 font-bold color-black",placeholder:"0",type:"text",modelValue:s.inputValue1,"onUpdate:modelValue":a[2]||(a[2]=e=>s.inputValue1=e),onInput:P.handleInput1},null,8,["modelValue","onInput"])])),_:1}),u(F,{class:"label-bottom"},{default:i((()=>[u(v,{class:"font-12 color-gray"},{default:i((()=>[y("可用 "+d(s.baseBalance),1)])),_:1})])),_:1})])),_:1},8,["style"]),u(F,{class:"line"}),u(F,{class:"currency-label bg-gray",style:h("transform: "+(s.isLabel1First?"translateY(0)":"translateY(-116%)"))},{default:i((()=>[u(F,{class:"label-top"},{default:i((()=>[u(F,{class:"intro",onClick:a[3]||(a[3]=e=>P.showCurrencyPopup(1))},{default:i((()=>[u(k,{class:"currency-image",src:s.targetCurrency.icon||"/static/coin/usdt.png",mode:"widthFix"},null,8,["src"]),u(v,{class:"font-16 font-bold color-black mr-5"},{default:i((()=>[y(d(s.targetCurrency.symbol),1)])),_:1}),u(V,{name:"arrowright",size:"38",color:"var(--content-tertiary)"})])),_:1}),u(I,{class:"input font-16 font-bold color-black",modelValue:s.inputValue2,"onUpdate:modelValue":a[4]||(a[4]=e=>s.inputValue2=e),onInput:P.handleInput2,placeholder:"0",type:"text"},null,8,["modelValue","onInput"])])),_:1}),u(F,{class:"label-bottom"},{default:i((()=>[u(v,{class:"font-12 color-gray"},{default:i((()=>[y("≈ $"+d(s.targetCurrencyPrice),1)])),_:1})])),_:1})])),_:1},8,["style"]),u(F,{class:"price-box"},{default:i((()=>[u(v,{class:"font-12 color-gray"},{default:i((()=>[y("1 "+d(s.baseCurrency.symbol)+" ≈ "+d(P.exchangeRate)+" "+d(s.targetCurrency.symbol),1)])),_:1})])),_:1}),u(F,{class:"exchange-button",onClick:P.swapLabels},{default:i((()=>[u(k,{class:"icon",src:`/static/wallet/exchange-${e.userTheme}.png`},null,8,["src"])])),_:1},8,["onClick"])])),_:1}),u(F,{class:p(["confirm",P.isBalanceSufficient?"bg-black":"bg-gray"])},{default:i((()=>[P.isBalanceSufficient?(o(),c(v,{key:1,class:"font-14 font-bold color-white",onClick:a[5]||(a[5]=e=>P.exchange())},{default:i((()=>[y("兑换")])),_:1})):(o(),c(v,{key:0,class:"font-14 font-bold color-gray"},{default:i((()=>[y(d(s.baseCurrency.symbol)+"余额不足",1)])),_:1}))])),_:1},8,["class"]),u(A,{ref:"currencyPopup",type:"bottom","safe-area":!1},{default:i((()=>[u(F,{class:"currency-popup-warp bg-white",style:h(`height: ${e.$device.windowHeight}px`)},{default:i((()=>[u(B,{statusBar:"",isOccupy:"",title:e.$t("financing.t95"),onLeftClick:a[6]||(a[6]=a=>e.$refs.currencyPopup.close()),background:"var(--background-primary)",color:"var(--content-primary)"},{default:i((()=>[u(V,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["title"]),u(F,{class:"currency-list-container",style:h(`height: ${e.$device.windowHeight-s.navHeight}px`)},{default:i((()=>[u($,{"name-key":"symbol",nameKey:"symbol",dataList:s.coinArr,showAvatar:!0,onItemclick:P.currencyChange},null,8,["dataList","onItemclick"])])),_:1},8,["style"])])),_:1},8,["style"])])),_:1},512)])),_:1},8,["data-theme"])}],["__scopeId","data-v-ce106a12"]]);export{k as default};
