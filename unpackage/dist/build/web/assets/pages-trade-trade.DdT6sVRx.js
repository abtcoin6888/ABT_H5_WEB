import{$ as t,R as e,a as r,h as a,s,g as l,l as i,O as o,n as c,d as n,r as d,Q as u,q as h,w as f,t as g,u as p,v as m,x as _,z as y,D as b,T as w,C as k,y as x,U as C,V as $,A as v,B as S,F as T,H as F,G as U,W as D,X as j,J as I,S as L,K as z,L as V}from"./index-CvJkP8r7.js";import{_ as O}from"./fui-nav-bar.CZAK61wT.js";import{r as H}from"./uni-app.es.4grYzir1.js";import{_ as P}from"./fui-dropdown-menu.BHMwY7Zs.js";import{_ as R}from"./fui-tabs.CUA6et_I.js";import{_ as B}from"./fui-tag.59N7WC6w.js";import{_ as M}from"./fui-icon.BbrID5X2.js";import{_ as W}from"./fui-drawer.CFcYbB8R.js";import{_ as A}from"./alert.DkjAnFY_.js";import{_ as q}from"./loading.CdlUmBbP.js";import{_ as K}from"./fui-top-popup.DgwciW-9.js";import{t as E}from"./timeIndex.BC1hOYxu.js";import{u as N}from"./user.PBjN9YNI.js";import{t as Q}from"./trade.BDUSKrg7.js";import{T as X}from"./lightweight-charts.production.CvOsW4GM.js";import{c as G}from"./currency.KCotsIzN.js";import{e as J}from"./emptyView.CQsvyaQG.js";import{f as Y}from"./fui-load-ani.CRERqj-O.js";import{_ as Z,a as tt}from"./Br.CYZ7Wh00.js";import{_ as et}from"./tran-icon.DWd0NTvl.js";import{_ as rt}from"./check-s.DGG9M_rm.js";import{_ as at}from"./usdt.N9PTOXHS.js";import{_ as st}from"./success-icon.Cp7Rjh9U.js";import{_ as lt}from"./_plugin-vue_export-helper.BCo6x5W8.js";import"./uni-popup-dialog.jPMVSOx-.js";import"./uni-popup.BKNKbknm.js";import"./fui-loading.BOHvl-ks.js";import"./fui-empty.VeTvFZSY.js";var it,ot,ct,nt,dt,ut,ht=0,ft=0;const gt=lt({components:{fuiLoadAni:Y,fuiDropdownMenu:P,emptyView:J},data(){return{listBarOptions:[this.$t("trade.cur_order"),this.$t("trade.assets")],windowHeight:"",navHeight:"",scrollHeight:"",timeIndex:0,time:E.time,OrderType:"",value:"0",showPopover:!1,actions:[this.$t("trade.market_order"),this.$t("trade.limit_order")],orderUnitValue:this.$t("trade.by_num"),orderUnit:[this.$t("trade.by_num"),this.$t("trade.on_tur")],showUnitValue:"",showUnit:["0.01","0.1","1"],active:0,sort:[{type:0,active:"/static/img/z-nomal.png",img:"/static/img/z-nomal.png",up:"/static/img/z-up-sms.png",down:"/static/img/z-down-sms.png"},{type:0,img:"/static/img/z-nomal.png",up:"/static/img/z-up-sms.png",down:"/static/img/z-down-sms.png"},{type:0,img:"/static/img/z-nomal.png",up:"/static/img/z-up-sms.png",down:"/static/img/z-down-sms.png"},{type:0,img:"/static/img/z-nomal.png",up:"/static/img/z-up-sms.png",down:"/static/img/z-down-sms.png"}],showUOrder:!0,IsShow:!1,content:"",ctxt:this.$t("login.cancel"),orderResult:{},ticker:{P:"0.00"},currency:[],currentCurrency:!1,like:!1,rateValue:0,showOrder:!0,orderTabCurrent:0,depthDecimal:0,asks:[],bids:[],mlist:[],mindex:[],popTabIndex:0,searchValue:"",balance:{},direction:0,trade_type:0,order_price:"",order_type:1,amount:"",price:"",orderList:[],showPop:!1,range:this.$t("trade.limit_order"),drawerPopup:!1,selectIndex:0,listTabIndex:0,symbol:this.$util.getLCS(),symbol_rate:this.$util.getLCR()}},onReady(){this.getCurrrency(),this.checkMlist(),this.getWindowHeight();let r=this;t("trades",(t=>{r.onTradeMessageHandler(t)})),t("addSelect",(()=>{this.checkMlist()})),t("reconnected-t",(()=>{r.subscribeDepth()})),setInterval((()=>{0===e().globalData.socket.getStatus()&&r.subscribeDepth()}),500)},onShow(){this.getChoiceCurrency();var t=0,e=setInterval((()=>{this.isLogin&&(this.getBalance(),this.getOrderList(),clearInterval(e)),(t+=1)>=25&&clearInterval(e)}),200);this.getWindowHeight(),this.setTabbarLanguage(),this.setTabText()},onHide(){},computed:{...r(["balanceNull","isLogin"])},watch:{IsShow(t){},searchValue(t){0==this.mindex?this.mlist=ot.filter((e=>e.symbol.toLowerCase().includes(t.toLowerCase()))):this.currency[0].currency=ct.filter((e=>e.symbol.toLowerCase().includes(t.toLowerCase())))},order_type(t){1==t&&(this.order_price=parseFloat(this.ticker.c).toFixed(this.currentCurrency.decimals))},showOrder(t){t||this.isLogin||this.$mroute.login()},showUOrder(t){this.getOrderList()},drawerPopup(t){t?a():s()}},methods:{setPrice(t){console.log(t[0]),this.order_price=t[0]},Kcreate(){nt=X(document.getElementById("kline"),{width:window.screen.availWidth,height:245,layout:{background:{color:"#fff"},textColor:"#333"},grid:{vertLines:{color:"#ddd"},horzLines:{color:"#ddd"}},priceScale:{borderColor:"rgba(242, 250, 255, 0.8)"},timeScale:{borderColor:"rgba(242, 250, 255, 0.8)"}}),dt=nt.addAreaSeries({topColor:"#00ddfa",bottomColor:"rgba(41, 98, 255, 0.1)",lineColor:"#2979ff",lineWidth:1,lastPriceAnimation:1}),(ut=nt.addAreaSeries({lastValueVisible:!1,crosshairMarkerVisible:!1,lineColor:"transparent",topColor:"rgba(102, 57, 220, 0.6)",bottomColor:"rgba(102, 57, 220, 0.1)"})).priceScale().applyOptions({scaleMargins:{top:.1,bottom:.2,right:.2,left:.2}}),this.loadKline(),window.addEventListener("resize",(()=>{nt.resize(window.innerWidth,this.$device.screenWidth)}))},loadKline(){var t={interval:"1s",currency_id:this.currentCurrency.id,limit:200};G.contractLine(t).then((t=>{if(200===t.code){nt.timeScale().applyOptions({barSpacing:7,borderColor:"#71649C",timeVisible:!0,secondsVisible:!0,scrollToRealTime:!0,tickMarkFormatter:(t,e,r)=>{var a=new Date(t);return`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}:${String(a.getSeconds()).padStart(2,"0")}`}}),nt.timeScale().scrollToRealTime();const t=nt.timeScale().scrollPosition();nt.timeScale().scrollToPosition(t+15,!1),nt.applyOptions({localization:{priceFormatter:this.PriceFormatter,timeFormatter:t=>{var e=new Date(t);return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}:${String(e.getSeconds()).padStart(2,"0")}`}},watermark:{visible:!0,fontSize:24,horzAlign:"center",vertAlign:"center",color:"rgba(171, 71, 188, 0.5)",text:"ABT"}})}}))},PriceFormatter(t){return parseFloat(t).toFixed(this.currentCurrency.decimals)},navInit(t){this.getWindowHeight(),this.navHeight=t.height+t.statusBarHeight,this.scrollHeight=this.windowHeight-this.navHeight},getWindowHeight(){this.windowHeight=l().windowHeight},timeChange(t){this.timeIndex=t.index},orderTabChange(t){console.log(t),this.listTabIndex=t.index,1===t.index?this.showOrder=!1:this.showOrder=!0},optionalChange(){console.log(this.like),this.like?(this.like=!1,this.remFav(1,this.currentCurrency.id)):(this.like=!0,this.addFav(1,this.currentCurrency))},filterTap(t){0===t&&this.$refs.ddmRange.show(),1===t&&this.$refs.numRange.show(),2===t&&this.$refs.decimal.show()},updatePrice(t,e){var r=(new Date).getTime();ut.update({time:r,value:parseFloat(e)}),dt.update({time:r,value:parseFloat(e)}),nt.timeScale().scrollToRealTime();const a=nt.timeScale().scrollPosition();nt.timeScale().scrollToPosition(a,!1)},onTradeMessageHandler(t){if(100===t.type){let r=this.$util.getCurrentTicker(this.currentCurrency.id,t.data);this.ticker=r,this.currentCurrency.change_rate=r.P;try{this.mlist.length>0&&(this.mlist=this.$util.compareCurrency(this.mlist,t.data)),this.currency[0].currency=this.$util.compareCurrency(this.currency[0].currency,t.data)}catch(e){}0!==ft&&ft===parseFloat(r.c)||!this.IsShow||(this.updatePrice(r.C,r.c),ft=parseFloat(r.c))}101==t.type&&t.currency_id==this.currentCurrency.id&&(this.asks=0==ht?t.data.asks.slice(0,4):t.data.asks.slice(0,5),this.bids=0==ht?t.data.bids.slice(0,4):t.data.bids.slice(0,5)),300==t.type&&(this.$refs.alert.close(),this.orderResult=t,this.showPop=!0,console.log("订单成交通知：",t),this.getOrderList(),this.getBalance())},submit(){if(0!=this.order_type&&(""==this.order_price||parseFloat(this.order_price)<=0))return this.content=this.$t("contruct.pl19"),this.ctxt="",this.$refs.alert.open(),!1;if(""==this.amount||parseFloat(this.amount)<=0)return this.content=this.$t("trade.enter_tn"),this.ctxt="",this.$refs.alert.open(),!1;if(0==this.direction){if(0==this.order_type)var t=parseFloat(0==this.trade_type?this.amount*this.ticker.c:this.amount).toFixed(2);if(1==this.order_type)t=parseFloat(0==this.trade_type?this.amount*this.order_price:this.amount).toFixed(2)}if(1==this.direction){if(0==this.order_type)t=parseFloat(0==this.trade_type?this.amount:this.amount/this.ticker.c).toFixed(this.currentCurrency.trade_decimals);if(1==this.order_type)t=parseFloat(0==this.trade_type?this.amount:this.amount/this.order_price).toFixed(this.currentCurrency.trade_decimals)}if(0==this.direction&&parseFloat(this.balance.legal_balance)<parseFloat(t))return this.content="USDT"+this.$t("trade.inaqu"),this.ctxt="",this.$refs.alert.open(),!1;if(1==this.direction&&parseFloat(this.balance.trade_balance)<parseFloat(t))return this.content=this.currentCurrency.symbol+this.$t("trade.inaqu"),this.ctxt="",this.$refs.alert.open(),!1;var e={cmd_id:it,currency_id:this.currentCurrency.id,order_type:0==this.order_type?1:2,direction:0==this.direction?1:2,trade_type:0==this.trade_type?1:2,price:0==this.order_type?parseFloat(this.ticker.c).toFixed(this.currentCurrency.decimals):this.order_price,amount:t};console.log(e),this.$refs.loading.open(),Q.tradeSubmit(e).then((t=>{this.$refs.loading.close(),200!=t.code?(this.content=t.message,this.$refs.alert.open()):(this.content=this.$t("trade.order_suc"),this.$refs.alert.open(),this.order_price="",this.amount="",this.getOrderList(),setTimeout((()=>{this.getBalance(),this.getOrderList()}),2500))})).catch((t=>{this.$refs.loading.close(),this.content=this.$t("trade.unknown_error"),this.$refs.alert.open()}))},cancelOrder(t=0){0==t&&(t=this.orderList.map((t=>t.id)),console.log(t),console.log(this.orderList),t=t.join(",")),this.$refs.loading.open(),Q.orderCancel(t).then((t=>{this.$refs.loading.close(),200==t.code?(this.content=this.$t("trade.suc_wid"),this.$refs.alert.open(),this.getOrderList()):(this.content=t.message,this.$refs.alert.open())}))},getCurrrency(){this.currency=i("trade-currency"),ct=this.currency[0].currency,it=this.currency[0].id},getCurrentCurrency(){var t=i("trade-current");void 0!==t&&""!=t&&t||((t=this.currency[0].currency[0]).cm_id=this.currency[0].id,o("trade-current",t)),this.currentCurrency=t,this.subscribeDepth(),this.getBalance(),this.setUnitList(),this.depthDecimal=t.decimals,this.like=this.favStatus(1,t.id)},getChoiceCurrency(){this.getCurrrency();const t=i("trade-currency"),e=i("choice-trade");if(void 0!==e&&""!=e&&e){const r=e[0].currency_id;let a=t[0].currency.find((t=>t.id===r));a.cm_id=t[0].id,o("trade-current",a),this.currentCurrency=a,this.subscribeDepth(),this.getBalance(),this.setUnitList(),this.depthDecimal=a.decimals,this.like=this.favStatus(1,a.id)}else this.getCurrentCurrency()},subscribeDepth(){try{this.bids=[],this.asks=[],e().globalData.socket.send({event:"trade_depth_subscribe",cm_id:this.currentCurrency.cm_id,currency_id:this.currentCurrency.id})}catch(t){setTimeout((()=>{e().globalData.socket.restart(),this.subscribeDepth()}),2e3)}},checkMlist(){if(void 0===(ot=i("select-trade"))||0==ot.length)return!1;this.mlist=ot,void 0===ot&&ot||ot.map(((t,e,r)=>{t.id===this.currentCurrency.id&&(this.like=1)}))},switchCurrency(t,e){if(console.log(t,e),this.selectIndex=e,0==this.mindex)var r=ot.filter((e=>e.id==t));else r=ct.filter((e=>e.id==t));r[0].cm_id=it,this.currentCurrency=r[0],this.subscribeDepth(),this.checkMlist(),this.getBalance(),o("trade-current",r[0]),this.setUnitList(),this.depthDecimal=this.currentCurrency.decimals,this.closeDrawer(),this.order_price="",this.amount="",this.rateValue=0,this.loadKline()},setUnitList(){this.showUnit=[parseFloat(1/10**this.currentCurrency.decimals).toFixed(this.currentCurrency.decimals),parseFloat(1/10**(this.currentCurrency.decimals-1)).toFixed(this.currentCurrency.decimals-1),parseFloat(1/10**(this.currentCurrency.decimals-2)).toFixed(this.currentCurrency.decimals-2)],this.showUnitValue=this.showUnit[0]},async getBalance(){if(!this.isLogin)return!1;if(this.currentCurrency&&this.currentCurrency.id){const t=await N.getCurrencyBalance(this.currentCurrency.id);200==t.code?this.balance=t.data:(this.content=t.message,this.$refs.alert.open(),this.balance=this.balanceNull)}else setTimeout((()=>{this.getBalance()}),2e3)},getOrderList(){Q.tradeOrderList(this.showUOrder?0:this.currentCurrency.id).then((t=>{200==t.code&&(this.orderList=t.data)}))},selectTradeType(t){console.log(t),this.orderUnitValue=t.text,this.trade_type=t.index,this.amount="",this.rateValue=0},selectDecimal(t){console.log(t.index),this.showUnitValue=t.text,0==t.index&&(this.depthDecimal=this.currentCurrency.decimals),1==t.index&&(this.depthDecimal=this.currentCurrency.decimals-1),2==t.index&&(this.depthDecimal=this.currentCurrency.decimals-2),3==t.index&&(this.depthDecimal=this.currentCurrency.decimals,this.showUnitValue=this.showUnit[0])},sliderChange(t){if(this.rateValue=t.detail.value,parseFloat(this.balance.legal_balance)<=0&&void 0!==this.balance.legal_balance)return!1;this.balance.legal_balance=parseFloat(this.balance.legal_balance),0==this.direction&&(0==this.trade_type?this.amount=parseFloat(t.detail.value*this.balance.legal_balance/this.ticker.c/100).toFixed(this.currentCurrency.trade_decimals):this.amount=parseFloat(t.detail.value*this.balance.legal_balance/100).toFixed(2)),1==this.direction&&(0==this.trade_type?this.amount=parseFloat(t.detail.value/100*this.balance.trade_balance).toFixed(this.currentCurrency.trade_decimals):this.amount=parseFloat(t.detail.value/100*this.balance.trade_balance*this.ticker.c).toFixed(2))},selectType(t){this.range=t.text,ht=t.index,this.order_type=t.index,1===t.index&&this.order_price<0&&(this.order_price=this.ticker.c)},onSelect(t){},switchSort(t){return console.log(t),0==this.sort[t].type?(this.sort[t].type=1,void(this.sort[t].active=this.sort[t].down)):1==this.sort[t].type?(this.sort[t].type=2,void(this.sort[t].active=this.sort[t].up)):2==this.sort[t].type?(this.sort[t].type=0,void(this.sort[t].active=this.sort[t].img)):void 0},closeDrawer(){this.drawerPopup=!1},toKline(){c({url:"/pages/trade/kline?type=0&id="+this.currentCurrency.id+"&cid="+it})},setTabText(){n({index:0,text:this.$t("tab.home")}),n({index:1,text:this.$t("tab.quote")}),n({index:2,text:this.$t("tab.trade")}),n({index:3,text:this.$t("tab.contract")}),n({index:4,text:this.$t("tab.assets")})}}},[["render",function(t,e,r,a,s,l){const i=F,o=U,c=g,n=H(d("fui-nav-bar"),O),E=H(d("fui-dropdown-menu"),P),N=D,Q=j,X=I,G=H(d("fui-tabs"),R),J=H(d("fui-tag"),B),Y=u("empty-view"),lt=L,it=z,ot=V,ct=H(d("fui-icon"),M),nt=H(d("fui-drawer"),W),dt=H(d("alert"),A),ut=H(d("loading"),q),ht=H(d("fui-top-popup"),K);return p(),h(c,{class:"trade","data-theme":t.userTheme},{default:f((()=>[m(n,{isFixed:"",isOccupy:"",statusBar:"",padding:"0",custom:"",zIndex:"9",background:"var(--background-primary)",onInit:t.navInit},{default:f((()=>[m(c,{class:"nav-bar flex align_center jus-bet"},{default:f((()=>[m(c,{class:"flex flex-column align-start justify-center",onClick:e[0]||(e[0]=e=>t.drawerPopup=!0)},{default:f((()=>[m(c,{class:"flex flex-row align-center justify-start"},{default:f((()=>[m(i,{class:"font-16 color-black font-bold mr-4"},{default:f((()=>[_(y(t.currentCurrency.symbol)+"/USDT ",1)])),_:1}),m(o,{class:"down-icon",src:`/static/img/tactic/down-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1}),m(i,{class:b(["font-11 font-weight mt-3",{price_down:t.currentCurrency.change_rate<0,price_up:t.currentCurrency.change_rate>0,"color-black":0==t.currentCurrency.change_rate}])},{default:f((()=>[_(y(t.$util.thousandSeparator(t.currentCurrency.change_rate,2))+"% ",1)])),_:1},8,["class"])])),_:1}),m(c,{class:"flex flex-row align-center justify-end"},{default:f((()=>[m(c,{class:"btn-img",onClick:t.optionalChange},{default:f((()=>[t.like?(p(),h(o,{key:1,class:"likeIcon",src:Z,mode:"widthFix"})):(p(),h(o,{key:0,class:"likeIcon",src:`/static/newImage/collect-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"]))])),_:1},8,["onClick"]),m(c,{class:"btn-img",onClick:t.toKline},{default:f((()=>[m(o,{class:"zdIcon",src:`/static/newImage/zd-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1},8,["onClick"]),m(c,{class:"btn-img",onClick:e[1]||(e[1]=e=>t.IsShow=!t.IsShow)},{default:f((()=>[m(o,{src:`/static/newImage/zdpl-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1})])),_:1})])),_:1},8,["onInit"]),m(lt,{"scroll-y":"",class:"scroll-view",style:k({height:t.scrollHeight+"px"})},{default:f((()=>[t.IsShow?(p(),h(c,{key:0,class:"kline-wrap"},{default:f((()=>[w("div",null,[w("div",{class:"kline",id:"kline",ref:"kline",style:k({width:t.$device.windowWidth+"px",height:"250px"})},null,4)])])),_:1})):x("",!0),m(c,{class:"scroll-top"},{default:f((()=>[m(c,{class:"scroll-top-left"},{default:f((()=>[m(c,{class:"left-top",style:k("height: "+(0==t.order_type?"525rpx":"610rpx"))},{default:f((()=>[m(c,{class:"cell-row flex flex-row"},{default:f((()=>[m(c,{type:"buy",class:b(["cell-button flex justify-center align-center",{"cell-active":0===t.direction}]),onClick:e[2]||(e[2]=e=>t.direction=0)},{default:f((()=>[0===t.direction?(p(),h(o,{key:0,class:"button-image",src:"/static/img/button_bg/buy-s.png"},null,8,["src"])):(p(),h(o,{key:1,class:"button-image",src:`/static/img/button_bg/buy-n-${t.userTheme}.png`},null,8,["src"])),m(i,{class:b(["font-13 font-weight button-text",0===t.direction?"always-white":"color-gray"])},{default:f((()=>[_(y(t.$t("trade.buy")),1)])),_:1},8,["class"])])),_:1},8,["class"]),m(c,{type:"sell",class:b(["cell-button flex justify-center align-center",{"cell-active":1===t.direction}]),onClick:e[3]||(e[3]=e=>t.direction=1)},{default:f((()=>[1===t.direction?(p(),h(o,{key:0,class:"button-image",src:"/static/img/button_bg/sell-s.png"},null,8,["src"])):(p(),h(o,{key:1,class:"button-image",src:`/static/img/button_bg/sell-n-${t.userTheme}.png`},null,8,["src"])),m(i,{class:b(["font-13 font-weight button-text",1===t.direction?"always-white":"color-gray"])},{default:f((()=>[_(y(t.$t("trade.sell")),1)])),_:1},8,["class"])])),_:1},8,["class"])])),_:1}),m(E,{background:"var(--background-secondary)",minWidth:412,maxHeight:151,size:24,isCheckbox:!1,radius:8,padding:"12rpx",color:"var(--content-primary)",selectedColor:"var(--color-primary)",options:t.actions,ref:"ddmRange",onClick:t.selectType},{default:f((()=>[m(c,{class:"cell-row select-box bg-gray flex flex-row justify-between align-center",onClick:e[4]||(e[4]=e=>t.filterTap(0))},{default:f((()=>[m(i,{class:"font-13 color-black"},{default:f((()=>[_(y(t.range),1)])),_:1}),m(o,{class:"down-icon",src:`/static/img/tactic/down-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1},8,["options","onClick"]),C(m(c,{class:"cell-row cell-row-box bg-gray flex flex-row justify-between align-center"},{default:f((()=>[m(N,{type:"text",class:"color-black",modelValue:t.order_price,"onUpdate:modelValue":e[5]||(e[5]=e=>t.order_price=e),placeholder:this.$t("trade.price"),"placeholder-class":"placeholder"},null,8,["modelValue","placeholder"]),m(i,{class:"font-13 color-black"},{default:f((()=>[_("USDT")])),_:1})])),_:1},512),[[$,1==t.order_type]]),m(E,{background:"var(--background-secondary)",minWidth:412,maxHeight:151,size:24,isCheckbox:!1,radius:8,padding:"12rpx",color:"var(--content-primary)",selectedColor:"var(--color-primary)",options:t.orderUnit,ref:"numRange",onClick:t.selectTradeType},{default:f((()=>[m(c,{class:"num-drop-box bg-gray flex flex-row align-center",onClick:e[6]||(e[6]=e=>t.filterTap(1))},{default:f((()=>[m(i,{class:"font-13 font-weight color-black mr-5"},{default:f((()=>[_(y(t.orderUnit[t.trade_type]),1)])),_:1}),m(o,{src:`/static/img/tactic/down-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1},8,["options","onClick"]),m(c,{class:"cell-row cell-row-box bg-gray flex flex-row justify-between align-center"},{default:f((()=>[m(N,{type:"text",class:"color-black",modelValue:t.amount,"onUpdate:modelValue":e[7]||(e[7]=e=>t.amount=e),placeholder:0===t.trade_type?this.$t("trade.num"):this.$t("trade.vol_bus"),"placeholder-class":"placeholder"},null,8,["modelValue","placeholder"]),m(i,{class:"font-13 color-black"},{default:f((()=>[_(y(0===t.trade_type?t.currentCurrency.symbol:"USDT"),1)])),_:1})])),_:1}),m(c,{class:"slider-box"},{default:f((()=>[m(c,{class:"slider-dot bg-gray"},{default:f((()=>[m(c,{class:"active-box",style:k(`width: ${t.rateValue}%`)},null,8,["style"]),(p(),v(T,null,S([0,25,50,75,100],(t=>m(c,{class:"dot"}))),64))])),_:1}),m(c,{class:"slider"},{default:f((()=>[m(Q,{activeColor:"transparent",backgroundColor:"transparent","block-color":"var(--background-primary)","block-size":"13",value:t.rateValue,step:"1",onChange:t.sliderChange,onChanging:t.sliderChange},null,8,["value","onChange","onChanging"])])),_:1}),m(c,{class:"slider-number"},{default:f((()=>[(p(),v(T,null,S([0,25,50,75,100],(e=>m(i,{class:b(["font-10",t.rateValue>=e?"color-black":"color-gray"])},{default:f((()=>[_(y(e)+"% ",1)])),_:2},1032,["class"]))),64))])),_:1})])),_:1}),m(c,{class:"cell-row flex flex-row justify-between align-center"},{default:f((()=>[m(c,null,{default:f((()=>[0===t.trade_type?(p(),h(i,{key:0,class:"font-11 color-gray"},{default:f((()=>[_(y(t.$t("trade.es_tur")),1)])),_:1})):(p(),h(i,{key:1,class:"font-11 color-gray"},{default:f((()=>[_(y(t.$t("trade.es_tdv")),1)])),_:1}))])),_:1}),m(c,null,{default:f((()=>[0==t.direction?(p(),v(T,{key:0},[0==t.trade_type&&0==t.order_type?(p(),h(i,{key:0,class:"font-11 color-black font-weight"},{default:f((()=>[_(y(t.$util.thousandSeparator(t.amount*t.ticker.c,t.currentCurrency.decimals)),1)])),_:1})):x("",!0),1==t.trade_type&&0==t.order_type?(p(),h(i,{key:1,class:"font-11 color-black font-weight"},{default:f((()=>[_(y(t.$util.thousandSeparator(t.amount/t.ticker.c,t.currentCurrency.trade_decimals)),1)])),_:1})):x("",!0),0==t.trade_type&&1==t.order_type?(p(),h(i,{key:2,class:"font-11 color-black font-weight"},{default:f((()=>[_(y(t.$util.thousandSeparator(t.amount*t.order_price,t.currentCurrency.decimals)),1)])),_:1})):x("",!0),1==t.trade_type&&1==t.order_type?(p(),h(i,{key:3,class:"font-11 color-black font-weight"},{default:f((()=>[_(y(t.$util.thousandSeparator(t.amount/t.order_price,t.currentCurrency.trade_decimals)),1)])),_:1})):x("",!0)],64)):(p(),v(T,{key:1},[0==t.trade_type&&0==t.order_type?(p(),h(i,{key:0,class:"font-11 color-black font-weight"},{default:f((()=>[_(y(t.$util.thousandSeparator(t.amount*t.ticker.c,t.currentCurrency.decimals)),1)])),_:1})):x("",!0),1==t.trade_type&&0==t.order_type?(p(),h(i,{key:1,class:"font-11 color-black font-weight"},{default:f((()=>[_(y(t.$util.thousandSeparator(t.amount/t.ticker.c,t.currentCurrency.trade_decimals)),1)])),_:1})):x("",!0),0==t.trade_type&&1==t.order_type?(p(),h(i,{key:2,class:"font-11 color-black font-weight"},{default:f((()=>[_(y(t.$util.thousandSeparator(t.amount*t.order_price,t.currentCurrency.decimals)),1)])),_:1})):x("",!0),1==t.trade_type&&1==t.order_type?(p(),h(i,{key:3,class:"font-11 color-black font-weight"},{default:f((()=>[_(y(t.$util.thousandSeparator(t.amount/t.order_price,t.currentCurrency.trade_decimals)),1)])),_:1})):x("",!0)],64)),m(i,{class:"font-11 font-weight color-black ml-5"},{default:f((()=>[_(y(1==t.trade_type?t.currentCurrency.symbol:"USDT"),1)])),_:1})])),_:1})])),_:1}),m(c,{class:"cell-row flex flex-row justify-between align-center"},{default:f((()=>[m(i,{class:"font-11 color-gray"},{default:f((()=>[_(y(t.$t("trade.usable")),1)])),_:1}),m(c,{class:"flex flex-row align-center"},{default:f((()=>[0==t.direction?(p(),h(i,{key:0,class:"font-11 font-weight color-black mr-5"},{default:f((()=>[_(y(t.$util.float(t.balance.legal_balance)),1)])),_:1})):(p(),h(i,{key:1,class:"font-11 font-weight color-black mr-5"},{default:f((()=>[_(y(t.$util.float(t.balance.trade_balance)),1)])),_:1})),0==t.direction?(p(),h(i,{key:2,class:"font-11 font-weight color-black"},{default:f((()=>[_(" USDT ")])),_:1})):(p(),h(i,{key:3,class:"font-11 font-weight color-black"},{default:f((()=>[_(y(t.currentCurrency.symbol),1)])),_:1})),m(o,{onClick:e[8]||(e[8]=e=>t.$mroute.exchange(t.currentCurrency.id)),class:"tran-image",src:et,mode:"widthFix"})])),_:1})])),_:1})])),_:1},8,["style"]),m(c,{class:"cell-row button-box"},{default:f((()=>[t.isLogin?(p(),h(c,{key:0},{default:f((()=>[m(X,{class:b(["button",0==t.direction?"bg-green":"bg-red"]),onClick:t.submit},{default:f((()=>[_(y(0==t.direction?this.$t("trade.buy"):this.$t("trade.sell"))+" "+y(t.currentCurrency.symbol),1)])),_:1},8,["class","onClick"])])),_:1})):(p(),h(c,{key:1},{default:f((()=>[m(X,{class:"login-button",onClick:e[9]||(e[9]=e=>t.$mroute.login())},{default:f((()=>[_(y(t.$t("trade.lg_rg")),1)])),_:1})])),_:1}))])),_:1})])),_:1}),m(c,{class:"scroll-top-right"},{default:f((()=>[m(c,{class:"right-top",style:k("height: "+(0==t.order_type?"545rpx":"630rpx"))},{default:f((()=>[m(c,{class:"right-title"},{default:f((()=>[m(c,{class:"item"},{default:f((()=>[m(i,{class:"font-10 color-gray"},{default:f((()=>[_(y(t.$t("trade.price")),1)])),_:1}),m(i,{class:"font-10 color-gray"},{default:f((()=>[_("(USDT)")])),_:1})])),_:1}),m(c,{class:"item"},{default:f((()=>[m(i,{class:"font-10 color-gray"},{default:f((()=>[_(y(t.$t("trade.num")),1)])),_:1}),m(i,{class:"font-10 color-gray"},{default:f((()=>[_("("+y(t.currentCurrency.symbol)+")",1)])),_:1})])),_:1})])),_:1}),t.bids.length>0?(p(),h(c,{key:0,class:"price-list"},{default:f((()=>[(p(!0),v(T,null,S(t.asks,((e,r)=>(p(),h(c,{class:"cell",key:"asks"+r,onClick:r=>t.setPrice(e)},{default:f((()=>[m(c,{class:"bg-box bg-green",style:k({width:100*e[1]+"%"})},null,8,["style"]),m(i,{class:"font-10 font-weight price_up"},{default:f((()=>[_(y(t.$util.thousandSeparator(e[0],t.depthDecimal)),1)])),_:2},1024),m(i,{class:"font-10 font-weight color-black"},{default:f((()=>[_(y(t.$util.thousandUnit(e[1],t.currentCurrency.decimals)),1)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})):x("",!0),m(c,{class:"price-center"},{default:f((()=>[m(i,{class:"font-14 color-primary font-weight"},{default:f((()=>[_(y(t.$util.thousandSeparator(t.ticker.c,t.depthDecimal)),1)])),_:1}),m(i,{class:"font-10 color-gray"},{default:f((()=>[_(" ≈"+y(t.symbol)+y(t.$util.thousandSeparator(t.ticker.c*t.symbol_rate,2)),1)])),_:1})])),_:1}),t.bids.length>0?(p(),h(c,{key:1,class:"price-list"},{default:f((()=>[(p(!0),v(T,null,S(t.bids,((e,r)=>(p(),h(c,{class:"cell",key:"bids"+r,onClick:r=>t.setPrice(e)},{default:f((()=>[m(c,{class:"bg-box bg-red",style:k({width:100*e[1]+"%"})},null,8,["style"]),m(i,{class:"font-10 font-weight price_down"},{default:f((()=>[_(y(t.$util.thousandSeparator(e[0],t.depthDecimal)),1)])),_:2},1024),m(i,{class:"font-10 font-weight color-black"},{default:f((()=>[_(y(t.$util.thousandUnit(e[1],t.currentCurrency.decimals)),1)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})):x("",!0)])),_:1},8,["style"]),m(c,{class:"cell-row"},{default:f((()=>[m(E,{background:"var(--background-secondary)",minWidth:155,maxHeight:270,size:24,isCheckbox:!1,radius:8,padding:"12rpx",color:"var(--content-primary)",selectedColor:"var(--color-primary)",options:t.showUnit,ref:"decimal",onClick:t.selectDecimal},{default:f((()=>[m(c,{class:"select-box bg-gray",onClick:e[10]||(e[10]=e=>t.filterTap(2))},{default:f((()=>[m(i,{class:"font-11 color-black"},{default:f((()=>[_(y(t.showUnitValue),1)])),_:1}),m(o,{src:`/static/img/tactic/down-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1},8,["options","onClick"]),m(c,{class:"image-box bg-gray"},{default:f((()=>[m(o,{src:tt,mode:"widthFix"})])),_:1})])),_:1})])),_:1})])),_:1}),m(c,{class:"list-bar"},{default:f((()=>[m(c,{class:"list-bar-left"},{default:f((()=>[m(G,{alignLeft:"",scroll:"",isSlider:!1,scale:1,size:28,height:58,current:t.listTabIndex,background:"var(--background-primary)",color:"var(--content-tertiary)",selectedColor:"var(--content-primary)",tabs:t.listBarOptions,onChange:t.orderTabChange},null,8,["current","tabs","onChange"])])),_:1}),m(c,{class:"list-bar-right"},{default:f((()=>[m(o,{onClick:e[11]||(e[11]=e=>t.$mroute.tradeList()),src:`/static/img/tactic/order-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1}),m(ot,{class:"bottom-swiper",current:t.listTabIndex,duration:300,style:k(`height: ${t.scrollHeight-44}px`),onChange:e[14]||(e[14]=e=>t.listTabIndex=e.detail.current)},{default:f((()=>[m(it,{class:"scroll-bottom"},{default:f((()=>[m(c,{class:"tip-box bg-gray"},{default:f((()=>[m(c,{class:"flex flex-row align-center desc-check",onClick:e[12]||(e[12]=e=>t.showUOrder=!t.showUOrder)},{default:f((()=>[m(c,{class:"checkbox"},{default:f((()=>[t.showUOrder?(p(),h(o,{key:0,class:"check-icon",src:rt,mode:"widthFix"})):x("",!0)])),_:1}),m(i,{class:"font-11 color-black font-weight"},{default:f((()=>[_(y(t.$t("trade.view"))+" USDT "+y(t.$t("trade.all_order")),1)])),_:1})])),_:1}),t.orderList.length>0?(p(),h(i,{key:0,class:"font-11 color-primary font-weight",onClick:e[13]||(e[13]=e=>t.cancelOrder(0))},{default:f((()=>[_(y(t.$t("trade.batch_wd")),1)])),_:1})):x("",!0)])),_:1}),m(lt,{"scroll-y":"true",class:"order-container"},{default:f((()=>[m(c,{class:"list-content"},{default:f((()=>[(p(!0),v(T,null,S(t.orderList,((e,r)=>(p(),h(c,{class:"item",key:"o"+r},{default:f((()=>[m(c,{class:"item-row flex flex-row align-center justify-between"},{default:f((()=>[m(c,{class:"flex flex-row align-center"},{default:f((()=>[m(J,{size:"22",radius:4,padding:["8rpx","10rpx"],marginRight:10,color:"var(--content-always-white)",background:1==e.direction?"var(--color-primary)":"var(--content-trade-sell)",text:1==e.direction?t.$t("trade.buy"):t.$t("trade.sell")},null,8,["background","text"]),m(i,{class:"font-14 color-black font-weight ml-5"},{default:f((()=>[_(y(e.symbol)+"/USDT ",1)])),_:2},1024)])),_:2},1024),m(i,{class:"font-12 color-primary font-weight",onClick:r=>t.cancelOrder(e.id)},{default:f((()=>[_(y(t.$t("trade.wd_order")),1)])),_:2},1032,["onClick"])])),_:2},1024),m(c,{class:"item-row flex flex-row align-center"},{default:f((()=>[m(i,{class:"font-12 color-black mr-5"},{default:f((()=>[_(y(e.created_at),1)])),_:2},1024),m(J,{text:1==e.order_type?t.$t("trade.mk_od"):t.$t("trade.lm_od"),size:"22",radius:4,padding:["8rpx","10rpx"],marginLeft:10,color:"var(--content-always-white)",background:"var(--background-secondary)",theme:"dark"},null,8,["text"])])),_:2},1024),m(c,{class:"item-row flex flex-row align-center justify-between"},{default:f((()=>[m(i,{class:"font-12 color-gray"},{default:f((()=>[_(y(t.$t("trade.price"))+"(USDT) ",1)])),_:1}),m(i,{class:"font-12 color-black font-weight"},{default:f((()=>[_(y(t.$util.float(e.price)),1)])),_:2},1024)])),_:2},1024),m(c,{class:"item-row flex flex-row align-center justify-between"},{default:f((()=>[2==e.direction?(p(),h(i,{key:0,class:"font-12 color-gray"},{default:f((()=>[_(y(t.$t("trade.num"))+"("+y(e.symbol)+") ",1)])),_:2},1024)):(p(),h(i,{key:1,class:"font-12 color-gray"},{default:f((()=>[_(y(t.$t("trade.vl_tan"))+"(USDT) ",1)])),_:1})),2==e.direction?(p(),h(i,{key:2,class:"font-12 color-black font-weight"},{default:f((()=>[_(y(t.$util.float(e.amount)),1)])),_:2},1024)):(p(),h(i,{key:3,class:"font-12 color-black font-weight"},{default:f((()=>[_(y(t.$util.thousandSeparator(e.amount,2)),1)])),_:2},1024))])),_:2},1024),1==e.direction?(p(),h(c,{key:0,class:"item-row flex flex-row align-center justify-between"},{default:f((()=>[m(i,{class:"font-12 color-gray"},{default:f((()=>[_(y(t.$t("trade.ex_tran"))+"("+y(e.symbol)+") ",1)])),_:2},1024),m(i,{class:"font-12 color-black font-weight"},{default:f((()=>[_(y(t.$util.thousandSeparator(e.amount/e.price,e.decimals)),1)])),_:2},1024)])),_:2},1024)):x("",!0),m(c,{class:"item-row flex flex-row align-center justify-between"},{default:f((()=>[m(i,{class:"font-12 color-gray"},{default:f((()=>[_(y(t.$t("trade.traded")),1)])),_:1}),m(i,{class:"font-12 color-black font-weight"},{default:f((()=>[_(" 0.00 ")])),_:1})])),_:1})])),_:2},1024)))),128)),m(Y,{visible:!0,width:690,height:700,title:t.$t("trade.not_order")},null,8,["title"])])),_:1})])),_:1})])),_:1}),m(it,{class:"scroll-bottom"},{default:f((()=>[m(c,{class:"tip-box bg-gray"},{default:f((()=>[m(c,{class:"flex flex-row align-center"},{default:f((()=>[m(i,{class:"font-11 color-black font-weight"},{default:f((()=>[_(y(t.$t("trade.ccpa")),1)])),_:1})])),_:1})])),_:1}),m(c,{class:"assets-list"},{default:f((()=>[m(c,{class:"item"},{default:f((()=>[m(o,{class:"coim-image",src:t.currentCurrency.icon,mode:"widthFix"},null,8,["src"]),m(c,{class:"item-info"},{default:f((()=>[m(c,{class:"row"},{default:f((()=>[m(i,{class:"font-14 font-weight color-black"},{default:f((()=>[_(y(t.currentCurrency.symbol),1)])),_:1})])),_:1}),m(c,{class:"row"},{default:f((()=>[m(i,{class:"font-12 color-gray"},{default:f((()=>[_(y(t.$t("trade.frozen")),1)])),_:1}),m(i,{class:"font-12 color-black font-weight"},{default:f((()=>[_(y(t.$util.float(t.balance.lock_trade)),1)])),_:1})])),_:1}),m(c,{class:"row"},{default:f((()=>[m(i,{class:"font-12 color-gray"},{default:f((()=>[_(y(t.$t("trade.usable")),1)])),_:1}),m(i,{class:"font-12 color-black font-weight"},{default:f((()=>[_(y(t.$util.float(t.balance.trade_balance)),1)])),_:1})])),_:1})])),_:1})])),_:1}),m(c,{class:"item"},{default:f((()=>[m(o,{class:"coim-image",src:at,mode:"widthFix"}),m(c,{class:"item-info"},{default:f((()=>[m(c,{class:"row"},{default:f((()=>[m(i,{class:"font-14 font-weight color-black"},{default:f((()=>[_(" USDT ")])),_:1})])),_:1}),m(c,{class:"row"},{default:f((()=>[m(i,{class:"font-12 color-gray"},{default:f((()=>[_(y(t.$t("trade.frozen")),1)])),_:1}),m(i,{class:"font-12 color-black font-weight"},{default:f((()=>[_(y(t.$util.float(t.balance.legal_lock)),1)])),_:1})])),_:1}),m(c,{class:"row"},{default:f((()=>[m(i,{class:"font-12 color-gray"},{default:f((()=>[_(y(t.$t("trade.usable")),1)])),_:1}),m(i,{class:"font-12 color-black font-weight"},{default:f((()=>[_(y(t.$util.float(t.balance.legal_balance)),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["current","style"])])),_:1},8,["style"]),m(nt,{radius:"0",zIndex:"999",direction:"left",background:"var(--background-primary)",maskBackground:"rgba(0, 0, 0, .8)",show:t.drawerPopup,onClose:t.closeDrawer},{default:f((()=>[m(c,{class:"drawer"},{default:f((()=>[m(c,{class:"drawer-top"},{default:f((()=>[m(c,{class:"title"},{default:f((()=>[m(i,{class:"font-16 color-black font-weight"},{default:f((()=>[_(y(t.$t("index.spot")),1)])),_:1})])),_:1}),m(c,{class:"drawer-search bg-gray"},{default:f((()=>[m(ct,{name:"search",color:"var(--content-tertiary)",size:"32"}),m(N,{class:"color-black",modelValue:t.searchValue,"onUpdate:modelValue":e[15]||(e[15]=e=>t.searchValue=e),placeholder:t.$t("trade.search_cc"),"placeholder-class":"placeholder"},null,8,["modelValue","placeholder"])])),_:1}),m(c,{class:"tag-buttons"},{default:f((()=>[m(c,{class:b(["tag",0===t.popTabIndex?"bg-gray":""]),onClick:e[16]||(e[16]=e=>{t.popTabIndex=0,t.mindex=0})},{default:f((()=>[m(i,{class:b(["font-13 font-weight",(t.popTabIndex,"color-black")])},{default:f((()=>[_(y(t.$t("index.tab_t1")),1)])),_:1},8,["class"])])),_:1},8,["class"]),m(c,{class:b(["tag",1===t.popTabIndex?"bg-gray":""]),onClick:e[17]||(e[17]=e=>{t.popTabIndex=1,t.mindex=1})},{default:f((()=>[m(i,{class:b(["font-13 font-weight",(t.popTabIndex,"color-black")])},{default:f((()=>[_(" USDT-M ")])),_:1},8,["class"])])),_:1},8,["class"])])),_:1}),m(c,{class:"list-title"},{default:f((()=>[m(c,{class:"left flex flex-row align-center",onClick:e[18]||(e[18]=e=>t.switchSort(0))},{default:f((()=>[m(i,{class:"font-11 color-gray"},{default:f((()=>[_(y(t.$t("index.name")),1)])),_:1}),m(o,{src:t.sort[0].active,mode:"widthFix"},null,8,["src"])])),_:1}),m(c,{class:"right flex flex-row align-center"},{default:f((()=>[m(c,{class:"item flex flex-row align-center"},{default:f((()=>[m(i,{class:"font-11 color-gray"},{default:f((()=>[_(y(t.$t("index.latest_price"))+" / "+y(t.$t("index.quote_change")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),m(lt,{"scroll-y":"",class:"drawer-bottom",style:k({height:t.windowHeight-130+"px"})},{default:f((()=>[0==t.mindex?(p(),v(T,{key:0},[m(Y,{visible:0==t.mlist.length,width:540,height:600,title:t.$t("list.not_data")},null,8,["visible","title"]),(p(!0),v(T,null,S(t.mlist,((e,r)=>(p(),h(c,{class:b(["drawer-coin-cell",t.selectIndex==r?"bg-gray":""]),key:r,onClick:a=>t.switchCurrency(e.id,r)},{default:f((()=>[m(c,{class:"left"},{default:f((()=>[m(i,{class:"font-13 color-black font-weight mr-5"},{default:f((()=>[_(y(e.symbol)+"/USDT",1)])),_:2},1024),m(i,{class:"font-11 color-gray"})])),_:2},1024),m(c,{class:"right"},{default:f((()=>[m(i,{class:b(["font-13 font-weight color-black",{price_up:e.change_rate>=0,price_down:e.change_rate<0}])},{default:f((()=>[_(y(t.$util.thousandSeparator(e.new_price,e.decimals)),1)])),_:2},1032,["class"]),m(i,{class:b(["font-11 color-black mt-4",{price_up:e.change_rate>=0,price_down:e.change_rate<0}])},{default:f((()=>[_(y(t.$util.thousandSeparator(e.change_rate))+"% ",1)])),_:2},1032,["class"])])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))],64)):x("",!0),1==t.mindex?(p(),v(T,{key:1},[m(Y,{visible:0==t.currency[0].currency.length,width:540,height:600,title:t.$t("list.not_data")},null,8,["visible","title"]),(p(!0),v(T,null,S(t.currency[0].currency,((e,r)=>(p(),h(c,{class:b(["drawer-coin-cell",t.selectIndex==r?"bg-gray":""]),key:r,onClick:a=>t.switchCurrency(e.id,r)},{default:f((()=>[m(c,{class:"left"},{default:f((()=>[m(i,{class:"font-13 color-black font-weight mr-5"},{default:f((()=>[_(y(e.symbol)+"/USDT",1)])),_:2},1024)])),_:2},1024),m(c,{class:"right"},{default:f((()=>[m(i,{class:b(["font-13 font-weight color-black",{price_up:e.change_rate>=0,price_down:e.change_rate<0}])},{default:f((()=>[_(y(t.$util.thousandSeparator(e.new_price,e.decimals)),1)])),_:2},1032,["class"]),m(i,{class:b(["font-11 color-black mt-4",{price_up:e.change_rate>=0,price_down:e.change_rate<0}])},{default:f((()=>[_(y(t.$util.thousandSeparator(e.change_rate))+"% ",1)])),_:2},1032,["class"])])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))],64)):x("",!0)])),_:1},8,["style"])])),_:1})])),_:1},8,["show","onClose"]),m(dt,{ref:"alert",title:this.$t("login.tip_t2"),content:t.content,ctxt:t.ctxt},null,8,["title","content","ctxt"]),m(ut,{ref:"loading"},null,512),m(ht,{ref:"orderResult",background:"var(--background-primary)",show:t.showPop,onClose:e[20]||(e[20]=e=>t.showPop=!1)},{default:f((()=>[m(c,{class:"topPopup"},{default:f((()=>[m(c,{class:"status_bar"}),m(c,{class:"title"},{default:f((()=>[m(c,{class:"flex flex-column align-center justify-center"},{default:f((()=>[m(i,{class:"font-16 color-black font-weight"},{default:f((()=>[_(y(t.$t("trade.ts_noti")),1)])),_:1}),m(i,{class:"font-12 color-gray mt-4"},{default:f((()=>[_(y(t.$t("trade.mo_tr")),1)])),_:1})])),_:1}),m(c,{class:"close-icon",onClick:e[19]||(e[19]=e=>t.showPop=!1)},{default:f((()=>[m(ct,{name:"close",size:52,color:"var(--content-primary)"})])),_:1})])),_:1}),m(c,{class:"image-box"},{default:f((()=>[m(o,{class:"type-img",src:st,mode:"widthFix"})])),_:1}),m(c,{class:"content-box"},{default:f((()=>[m(i,{class:"font-14 color-black font-weight"},{default:f((()=>[_(y(t.$t("trade.your"))+y(t.orderResult.symbol)+y(1==t.orderResult.order_type?this.$t("trade.mk_pr"):this.$t("trade.lm_pr"))+y(1==t.orderResult.direction?this.$t("trade.buy_on"):this.$t("trade.sell_on"))+y(t.$t("trade.price_only"))+y(t.orderResult.price?t.orderResult.price:"--")+y(t.$t("trade.ddqu"))+y(t.$util.float(t.orderResult.amount))+y(1==t.orderResult.direction?t.orderResult.symbol:"USDT")+y(t.$t("trade.tfee"))+y(t.$util.float(t.orderResult.charge))+y(1==t.orderResult.direction?t.orderResult.symbol:"USDT")+". ",1)])),_:1})])),_:1}),m(c,{class:"descr"},{default:f((()=>[m(i,{class:"font-13 color-gray"},{default:f((()=>[_(y(t.$t("trade.see_detail")),1)])),_:1})])),_:1})])),_:1})])),_:1},8,["show"])])),_:1},8,["data-theme"])}],["__scopeId","data-v-b65ebc65"]]);export{gt as default};
