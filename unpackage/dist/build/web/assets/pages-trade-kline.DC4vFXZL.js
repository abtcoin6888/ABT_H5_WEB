import{_ as e}from"./fui-icon.CJc-PGr7.js";import{a as t,$ as a,R as r,bC as s,l as i,g as c,bD as l,o as n,bp as o,f as d,n as u,O as h,r as f,Q as _,q as m,w as p,t as y,u as w,v as g,D as b,x as k,z as I,A as v,B as C,F as $,C as x,y as S,H as T,G as D,S as L,K as F,L as H,W as M}from"./index-CGNx3rpF.js";import{r as B}from"./uni-app.es.BAGiN-2A.js";import{_ as V}from"./fui-nav-bar.Dp0oIG0k.js";import{_ as j}from"./fui-drawer.DL1Ufi8u.js";import{_ as A}from"./loading.CoINn4zM.js";import{t as z}from"./timeIndex.BC1hOYxu.js";import{c as N}from"./currency.ug_aPBB0.js";import{e as O}from"./emptyView.hFc9NIsn.js";import{i as P}from"./index.esm.C1f77HPW.js";import{c as E}from"./chartStyle.B9xwTzDH.js";import{_ as q}from"./_plugin-vue_export-helper.BCo6x5W8.js";import"./fui-loading.BRvRDlQ9.js";import"./uni-popup.D4WMjfzs.js";import"./fui-empty.CqMMajk4.js";const R={components:{emptyView:O},computed:{...t(["userTheme","lang"])},data(){return{searchValue:"",tabactive:0,overlay:{ma:!1,ema:!1,boll:!1},time:[],timeIndex:3,sort:[{type:0,active:"/static/img/z-nomal.png",img:"/static/img/z-nomal.png",up:"/static/img/z-up-sms.png",down:"/static/img/z-down-sms.png"},{type:0,img:"/static/img/z-nomal.png",up:"/static/img/z-up-sms.png",down:"/static/img/z-down-sms.png"},{type:0,img:"/static/img/z-nomal.png",up:"/static/img/z-up-sms.png",down:"/static/img/z-down-sms.png"},{type:0,img:"/static/img/z-nomal.png",up:"/static/img/z-up-sms.png",down:"/static/img/z-down-sms.png"}],orderTab:[],odActive:0,drawerShow:!1,drawerTab:0,currency:[],mlist:[],currencyInfo:{change_rate:0,symbol:"",new_price:"",decimals:"",high_price:""},symbol:this.$util.getLCS(),symbol_rate:this.$util.getLCR(),type:0,currency_id:0,cm_id:0,bids:[],asks:[],trades:[],info:!1,ma:!1,ema:!1,boll:!1,selectCoinIndex:0,listTabs:[this.$t("kline.com_od"),this.$t("kline.rt_tr"),this.$t("kline.currency_info")],kheight:"",history:!1,them:"",ticker:!1,fchart:"MA",indicator:["VOL"],bar:!1,collectType:!1,timeId:"",klineBar:["MA","EMA","BOLL","VOL","MACD","KDJ","RSI"],scrollTop:0,drawerNavHeight:"",show_cm_id:0,drawerTabIndex:0,drawerSwiperHeight:"",searchVal:"",dotWidth:"5",pageNavBarHeight:""}},onLoad(e){this.type=parseInt(e.type),this.currency_id=parseInt(e.id),this.cm_id=parseInt(e.cid),this.show_cm_id=parseInt(e.cid),this.drawerTabIndex=parseInt(e.type)},onReady(){1===this.cm_id?(this.getTradeCurrencyList(),setTimeout((()=>{this.tradeSubscribeDepth()}),500)):(this.getContractCurrency(),setTimeout((()=>{this.contractSubscribeDepth()}),500)),a("currency",(()=>{this.symbol=util.getLCS(),this.symbol_rate=util.getLCR()})),a("switchLan",(()=>{this.setTab()})),this.time=z.time.map((e=>this.$t(e))),this.kheight=this.$device.screenHeight-400,this.$nextTick((()=>{this.getCurrencyInfo()}));let e=this;1===this.cm_id?(a("trades",(e=>{this.onTradeMessage(e)})),setInterval((()=>{this.tradeSubscribeDepth(),0===r().globalData.socket.getStatus()&&e.tradeSubscribeDepth()}),1e3)):(a("contract",(e=>{this.onContractMessage(e)})),setInterval((()=>{0===s.prototype.getStatus()&&a("contract",(e=>{this.onContractMessage(e)}))}),1e3))},onShow(){var e=i("local-kline");void 0!==e&&""!=e&&(this.bar=e),this.them=i("mthem"),this.them=this.userTheme},watch:{timeIndex(e){var t="";t=0===e?"1s":z.time[e],this.loadHistory(this.currency_id,t)}},methods:{navBarInit(e){this.pageNavBarHeight=e.height+e.statusBarHeight},drawerNavInit(e){const t=c().windowHeight;this.drawerNavHeight=e.height+e.statusBarHeight,this.drawerSwiperHeight=t-this.drawerNavHeight-72},collect(){this.collectType=!this.collectType},klineTime(e){this.$nextTick((()=>{this.timeIndex=e}))},bodyScroll(e){this.scrollTop=e.detail.scrollTop},addIndicator(e){this.indicator.includes(e)?this.indicator.splice(this.indicator.indexOf(e),1):this.indicator.push(e);var t=l();t[t.length-1].switchCharts(this.indicator)},search(){},input(){},createCharts(){this.loadHistory(this.currency_id,"15m")},loadHistory(e,t){let a=t,r={interval:a,currency_id:e,limit:1e3,cm_id:this.cm_id,type:this.type},s=this;this.$refs.loading.open(),N.contractLine(r).then((e=>{this.$refs.loading.close(),200===e.code&&(s.history={data:e,interval:s.timeIndex},s.time.map(((e,t)=>{e.toLowerCase()===a.toLowerCase()&&(s.timeIndex=t)})))})).catch((e=>{this.$refs.loading.close()})),console.log(s.timeIndex),console.log({interval:s.timeIndex})},getCurrencyInfo(e=!0){N.getCurrencyInfo(this.currency_id,this.cm_id,this.type).then((t=>{this.currencyInfo=t.data,e&&this.createCharts(),""!==this.currencyInfo.currency_info&&(this.currencyInfo.currency_info?this.info=JSON.parse(this.currencyInfo.currency_info):this.info=[])}))},switchCurrency(e){this.selectCoinIndex=e,this.currency_id=e,this.trades=[],this.drawerShow=!1,this.getCurrencyInfo(!1),1===this.cm_id?this.tradeSubscribeDepth():this.contractSubscribeDepth();var t=z.time[this.timeIndex];this.loadHistory(this.currency_id,t),this.drawerShow=!1},async getTradeCurrencyList(){let e=await N.tradeCurrencyList();this.currency=e.data},async getContractCurrency(){const e=await N.contractCurrencyList();this.currency=e.data},getMlistCurrency(){mlist=i("select-contract"),this.mlist=mlist},onContractMessage(e){if(200===e.type&&2===parseInt(this.cm_id)){try{this.currency[0].currency=this.$util.compareCurrency(this.currency[0].currency,e.data),this.mlist.length>0&&(this.mlist=this.$util.compareCurrency(this.mlist,e.data))}catch(s){}if(this.currency_id===e.data.currency_id){var t=e.data.data;this.currencyInfo.change_rate=t.P,this.currencyInfo.new_price=t.c,this.ticker=t}}if(600===e.type&&5===parseInt(this.cm_id)||700===e.type&&6===parseInt(this.cm_id)){try{this.currency[0].currency=this.$util.compareCurrency(this.currency[0].currency,e.data.data),this.mlist.length>0&&(this.mlist=this.$util.compareCurrency(this.mlist,e.data.data))}catch(s){}(t=this.$util.getCurrentTicker(this.currency_id,e.data.data)).c?(this.currencyInfo.change_rate=t.P,this.currencyInfo.new_price=t.c,this.ticker=t):this.currencyInfo.change_rate=t.P}if(201===e.type&&2===parseInt(this.cm_id)&&e.data.currency_id===this.currency_id&&(this.bids=e.data.data.b,this.asks=e.data.data.a),203===e.type&&2===parseInt(this.cm_id)&&e.data.currency_id===this.currency_id){var a=new Date(e.data.data.E),r=this.trades;r.length>20&&(r=r.slice(1)),r.push({time:a.getHours()+":"+a.getMinutes()+":"+a.getSeconds(),price:e.data.data.p,vol:e.data.data.q}),this.trades=r,lastVolc=e.data.data.q}},onTradeMessage(e){if(100===e.type&&1===this.cm_id){try{this.currency[0].currency=this.$util.compareCurrency(this.currency[0].currency,e.data),this.mlist.length>0&&(this.mlist=util.compareCurrency(this.mlist,e.data))}catch(r){}var t=this.$util.getCurrentTicker(this.currency_id,e.data);this.currencyInfo.change_rate=t.P,this.currencyInfo.new_price=t.c,this.ticker=t}if(101===e.type&&1===this.cm_id&&e.currency_id===this.currency_id&&(this.bids=e.data.bids,this.asks=e.data.asks),102===e.type&&1===this.cm_id&&e.currency_id===this.currency_id){const t=new Date(e.data.E);var a=this.trades;a.length>10&&(a=a.slice(1)),a.push({time:t.getHours()+":"+t.getMinutes()+":"+t.getSeconds(),price:e.data.p,vol:e.data.q}),this.trades=a,lastVol=e.data.q}},contractSubscribeDepth(){try{r().globalData.csocket.send({event:"contrade_depth_subscribe",cm_id:this.cm_id,currency_id:this.currency_id})}catch(e){setTimeout((()=>{this.contractSubscribeDepth()}),2e3)}},tradeSubscribeDepth(){try{r().globalData.socket.send({event:"trade_depth_subscribe",cm_id:this.cm_id,currency_id:this.currency_id})}catch(e){setTimeout((()=>{this.tradeSubscribeDepth()}),2e3)}},optionalChange(){this.like=!this.like,this.like?this.showToast("添加自选成功",500):this.showToast("删除自选成功",500)},showToast(e,t){let a={};a.text=e,a.duration=t,this.$refs.toast.show(a)},timerChange(e){console.log(e);var t="";t=0===e.index?"1s":e.name,console.log("loadHistory("+this.currency_id+",'"+t+"')"),this.$refs.webview&&this.$refs.webview.evalJs("loadHistory("+this.currency_id+",'"+t+"')")},orderChange(e){this.odActive=e.index,console.log(this.odActive)},closeDrawer(){this.drawerShow=!1},onBack(){const e=[];return e.push(this.currencyInfo),1===this.cm_id?(this.setStorage("choice-trade",e),this.$mroute.switchTrade()):(this.setStorage("choice-contract",e),this.$mroute.switchContract())},setStorage(e,t){n({key:e,data:t,success:e=>{console.log(e)}})},capture(){var e=l();console.log(e);var t=e[e.length-1],a=null;console.log(t);var r=t.$getAppWebview();a=new plus.nativeObj.Bitmap("amway_img"),r.draw(a,(function(){let e="_doc/"+Math.floor(1e4*Math.random())+"a.jpg";a.save(e,{},(function(e){o({filePath:e.target,success:function(){d({title:"保存图片成功",mask:!1,duration:1500})}})}),(function(e){alert("保存图片失败："+JSON.stringify(e))}))}),(function(e){alert("截屏绘制图片失败："+JSON.stringify(e))}))},switchSort(e){return 0==this.sort[e].type?(this.sort[e].type=1,this.sortCurrency(e,field,1),void(this.sort[e].active=this.sort[e].down)):1==this.sort[e].type?(this.sort[e].type=2,this.sortCurrency(e,field,2),void(this.sort[e].active=this.sort[e].up)):2==this.sort[e].type?(this.sort[e].type=0,this.sortCurrency(e,field,0),void(this.sort[e].active=this.sort[e].img)):void 0},toKline(){console.log(1),u({url:"/pages/trade/kline?type=0&id="+this.currentCurrency.id+"&cid="+cm_id})},drawerTabChange(e,t,a){this.drawerTabIndex=a,this.show_cm_id=t.id},sortCurrency(e,t,a){let r=this.currency[this.drawerTabIndex].currency;r=0===a?r.sort(((e,t)=>e.id-t.id)):r.sort(((e,r)=>{const s="symbol"===t?e[t].toLowerCase():parseFloat(e[t]),i="symbol"===t?r[t].toLowerCase():parseFloat(r[t]);if("symbol"===t){if(-1===a)return e[t].localeCompare(r[t],"en",{numeric:!1});if(1===a)return r[t].localeCompare(e[t],"en",{numeric:!1})}else{if(-1===a)return s-i;if(1===a)return i-s}})),this.currency[this.drawerTabIndex].currency=r},setCurrentCurrency(e,t){e.cm_id=t.id,e.currency_type=t.currency_type,h("current-contract",e),this.cm_id=e.cm_id,this.currency_id=e.id,this.show_cm_id=this.cm_id,this.getCurrencyInfo(!1),1===this.cm_id?this.tradeSubscribeDepth():this.contractSubscribeDepth(),this.trades=[];var a=z.time[this.timeIndex];this.loadHistory(this.currency_id,a),this.drawerShow=!1}}};var U,J,Q=!1,K=0;const W=[0,1,5,15,30,60,240,720,1440,10080],G={data:()=>({history:[],decimals:2,interval:0,bar:{upColor:"#2DC08E",downColor:"#F92855",upBorderColor:"#2DC08E",downBorderColor:"#F92855"}}),mounted(){},methods:{setThem(e){""!==e&&(J=e)},setDecimals(e){this.decimals=e.decimals},setBar(e){e&&(this.bar.upColor=e.up,this.bar.upBorderColor=e.up,this.bar.downColor=e.dn,this.bar.downBorderColor=e.dn)},update(e){if(!Q)return!0;if(0===this.interval&&(K=parseFloat(e.c),Q.updateData({timestamp:e.E,open:K,close:K,high:K,low:K,volume:parseInt(e.Q),turnover:parseInt(e.Q)})),0!=this.interval){var t=60*W[this.interval]*1e3;if(K=parseFloat(e.c),parseInt(e.E)-U.timestamp>t){var a={timestamp:parseInt(e.E),open:K,close:K,high:K,low:K,volume:parseInt(e.Q),turnover:parseInt(e.Q)};Q.updateData(a),U=a}else{a={timestamp:U.timestamp,open:U.open,close:K,high:U.high<K?K:U.high,low:U.low>K?K:U.low,volume:U.volume+parseInt(e.Q),turnover:U.volume+parseInt(e.Q)};Q.updateData(a),U=a}}},initChart(e){if(!e)return!0;if(Q){try{document.getElementById("kline").innerHTML="",Q.dispose()}catch(r){}Q=!1}if(!Q){Q=P("kline");let e="light"===J?"#333333":"#FFFFFF",t="light"===J?"#ffffff":"#333333",a="#999";E.candle.tooltip.text.color=a,E.candle.tooltip.text.borderColor=a,E.candle.tooltip.rect.color=e,E.xAxis.axisLine.color=t,E.xAxis.tickText.color=e,E.yAxis.axisLine.color=t,E.yAxis.tickText.color=e,E.yAxis.tickLine.color=t,E.candle.priceMark.high.color=e,E.candle.priceMark.low.color=e,E.candle.priceMark.last.upColor=e,E.candle.priceMark.last.downColor=e,E.candle.priceMark.last.noChangeColor=e,E.candle.priceMark.last.line.color=t,E.candle.priceMark.last.text.color="light"===J?"#FFFFFF":"#333333",E.grid.show=!1,E.candle.bar=this.bar?this.bar:{upColor:"#2DC08E",downColor:"#F92855",upBorderColor:"#2DC08E",downBorderColor:"#F92855"},Q.setStyles(E),Q.createIndicator({name:"MA",calcParams:[7,15,30]},!1,{id:"candle_pane"}),Q.createIndicator({name:"VOL",calcParams:[7,16,31]},!1,{id:"candle_panef-VOL"}),window.addEventListener("resize",(()=>{Q.resize()}))}0!==parseInt(e.interval)?(Q.setStyles({candle:{type:"candle_solid"}}),Q.createIndicator({name:"MA",calcParams:[5,10,30]},!1,{id:"candle_pane"})):(Q.removeIndicator("candle_pane"),Q.setStyles({candle:{type:"area"}}));for(var t=[],a=0;a<e.data.data.length;a++)t.push({timestamp:e.data.data[a].time,open:e.data.data[a].open,close:e.data.data[a].close,high:e.data.data[a].high,low:e.data.data[a].low,volume:e.data.data[a].vol,turnover:e.data.data[a].amount});U=t[t.length-1],this.interval=e.interval,Q.applyNewData(t),Q.setPriceVolumePrecision(this.decimals,this.decimals)},switchChart(e){if(Q){if("MA"===e)var t=[5,10,30];!1===e&&Q.removeIndicator("candle_pane"),Q.createIndicator({name:e,calcParams:t},!1,{id:"candle_pane"})}},switchCharts(e){Q&&(Q.removeIndicator("candle_panef-VOL","VOL"),Q.removeIndicator("candle_panef-MACD","MACD"),Q.removeIndicator("candle_panef-KDJ","KDJ"),Q.removeIndicator("candle_panef-RSI","RSI"),e.map((e=>{var t=[];"VOL"===e&&(t=[7,15,30]),"MACD"===e&&(t=[12,26,9]),"KDJ"===e&&(t=[9,3,3]),"RSI"===e&&(t=[7,15,30]),Q.createIndicator({name:e,calcParams:t},!1,{id:"candle_panef-"+e})})))}}},X=e=>{e.$renderjs||(e.$renderjs=[]),e.$renderjs.push("render"),e.mixins||(e.mixins=[]),e.mixins.push({beforeCreate(){this.render=this},mounted(){this.$ownerInstance=this.$gcd(this,!0)}}),e.mixins.push(G)},Y=R;X(Y);const Z=q(Y,[["render",function(t,a,r,s,i,c){const l=B(f("fui-icon"),e),n=T,o=D,d=y,u=B(f("fui-nav-bar"),V),h=L,z=F,N=_("empty-view"),O=H,P=M,E=B(f("fui-drawer"),j),q=B(f("loading"),A);return w(),m(d,{class:"kline","data-theme":t.userTheme},{default:p((()=>[g(u,{padding:0,statusBar:"",isFixed:"",isOccupy:"",zIndex:"9",background:"var(--background-primary)",custom:"",onInit:t.navBarInit},{default:p((()=>[g(d,{class:"nav-bar"},{default:p((()=>[g(d,{class:"nav-bar-left"},{default:p((()=>[g(l,{onClick:a[0]||(a[0]=e=>t.$mroute.back()),name:"arrowleft",size:"56",marginLeft:0,color:"var(--content-primary)"}),g(d,{class:b(["column",t.scrollTop>90?"show":"hide"]),onClick:a[1]||(a[1]=e=>t.drawerShow=!0)},{default:p((()=>[g(d,{class:"row"},{default:p((()=>[g(n,{class:"coin font-bold"},{default:p((()=>[k(I(t.currencyInfo.symbol?t.currencyInfo.symbol:"--/")+"USDT ",1)])),_:1}),g(o,{class:"down-icon",src:`/static/img/tactic/down-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1}),g(d,{class:"row"},{default:p((()=>[g(n,{class:b(["font-weight",t.currencyInfo.change_rate>0?"price_up":"price_down"])},{default:p((()=>[k(I(t.$util.thousandSeparator(t.currencyInfo.new_price,t.currencyInfo.decimals)),1)])),_:1},8,["class"]),g(n,{class:b(["font-weight",t.currencyInfo.change_rate>0?"price_up":"price_down"])},{default:p((()=>[k(I(t.$util.Number2(t.currencyInfo.change_rate?t.currencyInfo.change_rate:"--"))+"% ",1)])),_:1},8,["class"])])),_:1})])),_:1},8,["class"])])),_:1}),g(d,{class:"nav-bar-right"},{default:p((()=>[g(d,{class:"image-box",onClick:a[2]||(a[2]=e=>t.collect())},{default:p((()=>[g(o,{src:`/static/img/tactic/sc-${t.collectType?"s":"n"}.webp`,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1})])),_:1})])),_:1},8,["onInit"]),g(h,{"scroll-y":"true",class:"kline-body",style:x(`height: ${t.$device.windowHeight-t.pageNavBarHeight}px`),onScroll:t.bodyScroll},{default:p((()=>[g(d,{class:"body-box"},{default:p((()=>[g(d,{class:"top-box"},{default:p((()=>[g(d,{class:"price-box"},{default:p((()=>[g(d,{class:"row"},{default:p((()=>[g(n,{class:b(["font-22 color-black font-bold",t.currencyInfo.change_rate>0?"price_up":"price_down"])},{default:p((()=>[k(I(t.$util.thousandSeparator(t.currencyInfo.new_price,t.currencyInfo.decimals)),1)])),_:1},8,["class"])])),_:1}),g(d,{class:"row"},{default:p((()=>[g(n,{class:"font-weight"},{default:p((()=>[k(" ≈"+I(t.symbol)+I(t.$util.thousandSeparator(t.currencyInfo.new_price*t.symbol_rate,t.currencyInfo.decimals)),1)])),_:1}),g(n,{class:b(["font-weight",t.currencyInfo.change_rate>0?"price_up":"price_down"])},{default:p((()=>[k(I(t.$util.Number2(t.currencyInfo.change_rate?t.currencyInfo.change_rate:"0"))+"% ",1)])),_:1},8,["class"])])),_:1})])),_:1}),g(d,{class:"price-info"},{default:p((()=>[g(d,{class:"item"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.max_price")),1)])),_:1}),g(n,{class:"font-weight"},{default:p((()=>[k(I(t.$util.thousandSeparator(t.currencyInfo.high_price,t.currencyInfo.decimals)),1)])),_:1})])),_:1}),g(d,{class:"item"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.h_vol")),1)])),_:1}),g(n,{class:"font-weight"},{default:p((()=>[k(I(t.$util.thousandSeparator(t.currencyInfo.quantity,t.currencyInfo.decimals)),1)])),_:1})])),_:1}),g(d,{class:"item"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.min_price")),1)])),_:1}),g(n,{class:"font-weight"},{default:p((()=>[k(I(t.$util.thousandSeparator(t.currencyInfo.low_price,t.currencyInfo.decimals)),1)])),_:1})])),_:1}),g(d,{class:"item"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.h_tur")),1)])),_:1}),g(n,{class:"font-weight"},{default:p((()=>[k(I(t.$util.bigNumberToString(t.currencyInfo.quota,t.currencyInfo.decimals)),1)])),_:1})])),_:1})])),_:1})])),_:1}),g(h,{"scroll-x":"true","enable-flex":"true","scroll-with-animation":"true","scroll-into-view":"time"+t.timeIndex,class:"time-box"},{default:p((()=>[(w(!0),v($,null,C(t.time,((e,a)=>(w(),m(d,{class:b(["item",{active:t.timeIndex==a}]),key:a,id:"time"+(a+1),onClick:e=>t.klineTime(a)},{default:p((()=>[g(n,{class:"font-weight"},{default:p((()=>[k(I(e),1)])),_:2},1024)])),_:2},1032,["id","class","onClick"])))),128))])),_:1},8,["scroll-into-view"]),g(d,{class:"kline-box"},{default:p((()=>[g(d,{id:"kline",ref:"kline",currencyInfo:t.currencyInfo,"change:currencyInfo":t.render.setDecimals,history:t.history,"change:history":t.render.initChart,them:t.userTheme,"change:them":t.render.setThem,ticker:t.ticker,"change:ticker":t.render.update,fchart:t.fchart,"change:fchart":t.render.switchChart,indicator:t.indicator,"change:indicator":t.render.switchCharts,bar:t.bar,"change:bar":t.render.setBar,style:x({height:t.kheight+"px",width:t.$device.windowWidth+"px"})},null,8,["currencyInfo","change:currencyInfo","history","change:history","them","change:them","ticker","change:ticker","fchart","change:fchart","indicator","change:indicator","bar","change:bar","style"])])),_:1}),g(d,{class:"kline-bar"},{default:p((()=>[(w(!0),v($,null,C(t.klineBar.slice(0,3),(e=>(w(),m(d,{class:"item",onClick:a=>t.fchart==e?t.fchart=!1:t.fchart=e},{default:p((()=>[g(n,{class:b(["font-weight",t.fchart==e?"color-black":"color-gray"])},{default:p((()=>[k(I(e),1)])),_:2},1032,["class"])])),_:2},1032,["onClick"])))),256)),(w(!0),v($,null,C(t.klineBar.slice(3,t.klineBar.length),(e=>(w(),m(d,{class:"item",onClick:a=>t.addIndicator(e)},{default:p((()=>[g(n,{class:b(["font-weight",t.indicator.includes(e)?"color-black":"color-gray"])},{default:p((()=>[k(I(e),1)])),_:2},1032,["class"])])),_:2},1032,["onClick"])))),256))])),_:1}),g(d,{class:"list-tabs"},{default:p((()=>[(w(!0),v($,null,C(t.listTabs,((e,a)=>(w(),m(d,{class:b(["item",{active:t.tabactive==a}]),key:a,onClick:e=>t.tabactive=a},{default:p((()=>[g(n,{class:b(["font-weight",t.tabactive==a?"color-black":"color-gray"])},{default:p((()=>[k(I(e),1)])),_:2},1032,["class"])])),_:2},1032,["class","onClick"])))),128))])),_:1}),g(O,{class:"list-swiper",duration:"300",current:t.tabactive,style:x(`height:${t.$device.windowHeight-160}px`),onChange:a[3]||(a[3]=e=>t.tabactive=e.detail.current)},{default:p((()=>[g(z,{class:"list-swiper-item"},{default:p((()=>[g(d,{class:"desc-box"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.buy_nm")),1)])),_:1}),g(n,null,{default:p((()=>[k(I(t.$t("kline.price"))+"(USDT) ",1)])),_:1}),g(n,null,{default:p((()=>[k(I(t.$t("kline.num")),1)])),_:1})])),_:1}),g(d,{class:"order-container"},{default:p((()=>[(w(),v($,null,C(20,(e=>g(d,{class:"row",key:e},{default:p((()=>[g(d,{class:"row-item"},{default:p((()=>[g(n,{class:"price_up font-weight"},{default:p((()=>[k(I(t.bids[e-1]?t.$util.float(t.bids[e-1][1]):"--"),1)])),_:2},1024),g(n,{class:"color-black font-weight"},{default:p((()=>[k(I(t.bids[e-1]?t.$util.thousandSeparator(t.bids[e-1][0],t.currencyInfo.decimals):"--"),1)])),_:2},1024),g(d,{class:"row-bg bg-green",style:x(`width: ${t.bids[e-1]?100*t.$util.float(t.bids[e-1][1]):0}%`)},null,8,["style"])])),_:2},1024),g(d,{class:"row-item"},{default:p((()=>[g(n,{class:"color-black font-weight"},{default:p((()=>[k(I(t.asks[e-1]?t.$util.float(t.asks[e-1][0]):"--"),1)])),_:2},1024),g(n,{class:"price_down font-weight"},{default:p((()=>[k(I(t.asks[e-1]?t.$util.thousandSeparator(t.asks[e-1][1],t.currencyInfo.decimals):"--"),1)])),_:2},1024),g(d,{class:"row-bg bg-red",style:x(`width: ${t.asks[e-1]?100*t.$util.thousandSeparator(t.asks[e-1][1]):0}%`)},null,8,["style"])])),_:2},1024)])),_:2},1024))),64))])),_:1})])),_:1}),g(z,{class:"list-swiper-item"},{default:p((()=>[0!=t.trades.length?(w(),v($,{key:0},[g(d,{class:"desc-box"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.time")),1)])),_:1}),g(n,null,{default:p((()=>[k(I(t.$t("kline.price"))+"(USDT) ",1)])),_:1}),g(n,null,{default:p((()=>[k(I(t.$t("kline.num")),1)])),_:1})])),_:1}),g(d,{class:"order-container"},{default:p((()=>[(w(!0),v($,null,C(t.trades,((e,a)=>(w(),m(d,{class:"row",key:"trade"+a},{default:p((()=>[g(d,{class:"row-cell"},{default:p((()=>[g(n,{class:"color-black font-weight"},{default:p((()=>[k(I(e.time),1)])),_:2},1024),g(n,{class:b(["font-weight color-black",e.vol>0?"price_up":"price_down"])},{default:p((()=>[k(I(t.$util.thousandSeparator(e.price,t.currencyInfo.decimals)),1)])),_:2},1032,["class"]),g(n,{class:"color-black font-weight"},{default:p((()=>[k(I(e.vol),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})],64)):S("",!0),g(N,{visible:0==t.trades.length,width:750,height:600,title:t.$t("list.not_data")},null,8,["visible","title"])])),_:1}),g(z,{class:"list-swiper-item"},{default:p((()=>[g(h,{"scroll-y":"","show-scrollbar":"",class:"coin-info"},{default:p((()=>[g(d,{class:"coin-info-box"},{default:p((()=>[g(d,{class:"top"},{default:p((()=>[g(o,{src:t.currencyInfo.icon,mode:"widthFix"},null,8,["src"]),g(n,{class:"font-16 color-black font-bold"},{default:p((()=>[k(I(t.currencyInfo.symbol),1)])),_:1})])),_:1}),g(d,{class:"card"},{default:p((()=>[g(d,{class:"title"},{default:p((()=>[g(n,{class:"font-14 color-black font-weight"},{default:p((()=>[k(I(t.$t("kline.gjxx")),1)])),_:1})])),_:1}),g(d,{class:"row"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.mk_val")),1)])),_:1}),g(n,null,{default:p((()=>[k(I(t.symbol)+I(t.info?t.info.marketValue:"--"),1)])),_:1})])),_:1}),g(d,{class:"row"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.liutong")),1)])),_:1}),g(n,null,{default:p((()=>[k(I(t.symbol)+I(t.info?t.info.Circulation:"--"),1)])),_:1})])),_:1}),g(d,{class:"row"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.zuidag")),1)])),_:1}),g(n,null,{default:p((()=>[k(I(t.symbol)+I(t.info?t.info.totalCurrency:"--"),1)])),_:1})])),_:1}),g(d,{class:"row"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.flow_rate")),1)])),_:1}),g(n,null,{default:p((()=>[k(I(t.info?t.info.CirculationRate:"--")+"% ",1)])),_:1})])),_:1}),g(d,{class:"row"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.high_price")),1)])),_:1}),g(n,null,{default:p((()=>[k(I(t.symbol)+I(t.info?t.info.hightPrice:"--"),1)])),_:1})])),_:1}),g(d,{class:"row"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.max_price")),1)])),_:1}),g(n,null,{default:p((()=>[k(" $"+I(t.$util.thousandSeparator(t.currencyInfo.high_price,t.currencyInfo.decimals)),1)])),_:1})])),_:1}),g(d,{class:"row"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.h_vol")),1)])),_:1}),g(n,null,{default:p((()=>[k(I(t.$util.thousandSeparator(t.currencyInfo.quantity,t.currencyInfo.decimals)),1)])),_:1})])),_:1}),g(d,{class:"row"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.min_price")),1)])),_:1}),g(n,null,{default:p((()=>[k(" $"+I(t.$util.thousandSeparator(t.currencyInfo.low_price,t.currencyInfo.decimals)),1)])),_:1})])),_:1}),g(d,{class:"row"},{default:p((()=>[g(n,null,{default:p((()=>[k(I(t.$t("kline.h_tur")),1)])),_:1}),g(n,null,{default:p((()=>[k(I(t.$util.bigNumberToString(t.currencyInfo.quota,t.currencyInfo.decimals)),1)])),_:1})])),_:1})])),_:1}),t.info.about?(w(),m(d,{key:0,class:"card"})):S("",!0)])),_:1})])),_:1})])),_:1})])),_:1},8,["current","style"]),g(d,{class:"footer"},{default:p((()=>[g(d,{class:"_button bg-green button-active",onClick:t.onBack},{default:p((()=>[g(n,{class:"font-13 always-white font-weight"},{default:p((()=>[k(I(t.$t("trade.buy")),1)])),_:1})])),_:1},8,["onClick"]),g(d,{class:"_button bg-red button-active",onClick:t.onBack},{default:p((()=>[g(n,{class:"font-13 always-white font-weight"},{default:p((()=>[k(I(t.$t("trade.sell")),1)])),_:1})])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1},8,["style","onScroll"]),g(E,{show:t.drawerShow,radius:0,direction:"left",background:"var(--background-primary)",onClose:a[13]||(a[13]=e=>t.drawerShow=!1)},{default:p((()=>[1===t.cm_id?(w(),m(d,{key:0,class:"drawer",style:x({height:t.$device.windowHeight+"px"})},{default:p((()=>[g(d,{class:"status_bar"}),g(d,{class:"drawer-title"},{default:p((()=>[g(n,{class:"font-16 color-black font-weight"},{default:p((()=>[k(I(1===t.cm_id?t.$t("index.spot"):t.$t("tab.contract")),1)])),_:1})])),_:1}),g(d,{class:"drawer-search"},{default:p((()=>[g(o,{src:`/static/newImage/search-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"]),g(P,{type:"text",modelValue:t.searchValue,"onUpdate:modelValue":a[4]||(a[4]=e=>t.searchValue=e),placeholder:t.$t("contruct.pl10"),onInput:t.input,"placeholder-class":"placeholder"},null,8,["modelValue","placeholder","onInput"])])),_:1}),g(d,{class:"drawer-tabs"},{default:p((()=>[g(d,{class:b(["drawer-tabs-item",{"bg-gray":0===t.drawerTab}]),onClick:a[5]||(a[5]=e=>t.drawerTab=0)},{default:p((()=>[g(n,{class:b(["font-13 font-weight",0===t.drawerTab?"color-black":"color-gray"])},{default:p((()=>[k(I(t.$t("index.tab_t1")),1)])),_:1},8,["class"])])),_:1},8,["class"]),g(d,{class:b(["drawer-tabs-item",{"bg-gray":1===t.drawerTab}]),onClick:a[6]||(a[6]=e=>t.drawerTab=1)},{default:p((()=>[g(n,{class:b(["font-13 font-weight",1===t.drawerTab?"color-black":"color-gray"])},{default:p((()=>[k(" USDT ")])),_:1},8,["class"])])),_:1},8,["class"])])),_:1}),g(d,{class:"drawer-desc"},{default:p((()=>[g(d,{class:"drawer-desc-item",onClick:a[7]||(a[7]=e=>t.switchSort(0))},{default:p((()=>[g(n,{class:"font-11 color-gray"},{default:p((()=>[k(I(t.$t("index.name")),1)])),_:1}),g(o,{src:t.sort[0].active,mode:"widthFix"},null,8,["src"])])),_:1}),g(d,{class:"drawer-desc-item"},{default:p((()=>[g(n,{class:"font-11 color-gray"},{default:p((()=>[k(I(t.$t("index.latest_price")),1)])),_:1})])),_:1}),g(d,{class:"drawer-desc-item"},{default:p((()=>[g(n,{class:"font-11 color-gray"},{default:p((()=>[k(I(t.$t("index.quote_change")),1)])),_:1})])),_:1})])),_:1}),g(h,{class:"drawer-list mt-10","scroll-y":!0,"show-scrollbar":!1},{default:p((()=>[0===t.drawerTab?(w(),v($,{key:0},[g(N,{visible:0==t.mlist.length,width:570,height:600,title:t.$t("list.not_data")},null,8,["visible","title"]),(w(!0),v($,null,C(t.mlist,((e,a)=>(w(),m(d,{class:"drawer-list-cell",key:"m"+a,onClick:r=>t.switchCurrency(e.id,a)},{default:p((()=>[g(d,{class:"drawer-list-cell-item"},{default:p((()=>[g(n,{class:"font-14 color-black font-weight"},{default:p((()=>[k(I(e.symbol)+" / USDT ",1)])),_:2},1024)])),_:2},1024),g(d,{class:"drawer-list-cell-item"},{default:p((()=>[g(n,{class:b(["font-14 color-black font-weight",{price_up:e.change_rate>=0,price_down:e.change_rate<0}])},{default:p((()=>[k(I(t.$util.thousandSeparator(e.new_price,e.decimals)),1)])),_:2},1032,["class"])])),_:2},1024),g(d,{class:"drawer-list-cell-item"},{default:p((()=>[g(n,{class:b(["font-14 color-black font-weight",{price_up:e.change_rate>=0,price_down:e.change_rate<0}])},{default:p((()=>[k(I(t.$util.thousandSeparator(e.change_rate))+"% ",1)])),_:2},1032,["class"])])),_:2},1024)])),_:2},1032,["onClick"])))),128))],64)):S("",!0),1===t.drawerTab?(w(),v($,{key:1},[g(N,{visible:0==t.currency[0].currency.length,width:570,height:600,title:t.$t("list.not_data")},null,8,["visible","title"]),g(d,{class:"drawer-list-warp"},{default:p((()=>[(w(!0),v($,null,C(t.currency[0].currency,((e,a)=>(w(),m(d,{class:"drawer-list-cell",key:"m"+a,onClick:r=>t.switchCurrency(e.id,a)},{default:p((()=>[g(d,{class:"drawer-list-cell-item"},{default:p((()=>[g(n,{class:"font-14 color-black font-weight"},{default:p((()=>[k(I(e.symbol)+" / USDT ",1)])),_:2},1024)])),_:2},1024),g(d,{class:"drawer-list-cell-item"},{default:p((()=>[g(n,{class:b(["font-14 color-black font-weight",{price_up:e.change_rate>=0,price_down:e.change_rate<0}])},{default:p((()=>[k(I(t.$util.thousandSeparator(e.new_price,e.decimals)),1)])),_:2},1032,["class"])])),_:2},1024),g(d,{class:"drawer-list-cell-item"},{default:p((()=>[g(n,{class:b(["font-14 color-black font-weight",{price_up:e.change_rate>=0,price_down:e.change_rate<0}])},{default:p((()=>[k(I(t.$util.thousandSeparator(e.change_rate))+"% ",1)])),_:2},1032,["class"])])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})],64)):S("",!0)])),_:1})])),_:1},8,["style"])):(w(),m(d,{key:1,class:"drawer",style:x({height:t.$device.windowHeight+"px"})},{default:p((()=>[g(d,{class:"drawer-header"},{default:p((()=>[g(u,{custom:"",padding:0,background:"light"==t.userTheme?"#ffffff":"#111111",onInit:t.drawerNavInit},{default:p((()=>[g(d,{class:"drawer-title"},{default:p((()=>[g(n,{class:"font-16 font-weight color-black"},{default:p((()=>[k(I(t.$t("newcontract.t19")),1)])),_:1})])),_:1})])),_:1},8,["background","onInit"]),g(d,{class:"drawer-search bg-gray"},{default:p((()=>[g(P,{class:"search-input font-12",placeholder:t.$t("newcontract.t20"),modelValue:t.searchVal,"onUpdate:modelValue":a[8]||(a[8]=e=>t.searchVal=e),type:"text"},null,8,["placeholder","modelValue"]),g(o,{class:"search-icon",src:`/static/newImage/search-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1}),g(d,{class:"drawer-tab-warp"},{default:p((()=>[g(h,{"scroll-x":!0,"show-scrollbar":!1,class:"tab-scroll","scroll-with-animation":!0,"scroll-into-view":`drawerTab${t.drawerTabIndex}`},{default:p((()=>[(w(!0),v($,null,C(t.currency,((e,a)=>(w(),m(d,{class:b(["item",{"item-active":e.id===t.show_cm_id}]),id:`drawerTab${a+1}`,key:"tab"+e.id,onClick:r=>t.drawerTabChange(r,e,a)},{default:p((()=>[g(n,{class:b(["font-13",e.id===t.show_cm_id?"color-black":"color-gray"])},{default:p((()=>[k(I(e.title[t.lang]),1)])),_:2},1032,["class"]),t.show_cm_id===e.id?(w(),m(d,{key:0,class:"dot",style:x(`width: ${t.dotWidth}px;`)},null,8,["style"])):S("",!0)])),_:2},1032,["id","class","onClick"])))),128))])),_:1},8,["scroll-into-view"])])),_:1}),g(O,{class:"drawer-swiper",duration:300,current:t.drawerTabIndex,style:x(`height: ${t.drawerSwiperHeight}px`),onChange:a[12]||(a[12]=e=>{t.show_cm_id=t.currency[e.detail.current].id,t.drawerTabIndex=e.detail.current})},{default:p((()=>[(w(!0),v($,null,C(t.currency,((e,r)=>(w(),m(z,{class:"drawer-swiper-item",style:x(`height: ${t.drawerSwiperHeight}px`),key:"tlist"+e.id},{default:p((()=>[g(d,{class:"drawer-swiper-list"},{default:p((()=>[g(d,{class:"desc-box"},{default:p((()=>[g(d,{class:"row"},{default:p((()=>[g(d,{class:"row-item",onClick:a[9]||(a[9]=e=>t.switchSort(0,"symbol"))},{default:p((()=>[g(n,{class:"font-12 color-gray"},{default:p((()=>[k(I(t.$t("index.name")),1)])),_:1}),g(o,{class:"toggle-icon",src:t.sort[0].active,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1}),g(d,{class:"row"},{default:p((()=>[g(d,{class:"row-item",onClick:a[10]||(a[10]=e=>t.switchSort(2,"new_price"))},{default:p((()=>[g(n,{class:"font-12 color-gray"},{default:p((()=>[k(I(t.$t("index.latest_price")),1)])),_:1}),g(o,{class:"toggle-icon",src:t.sort[2].active,mode:"widthFix"},null,8,["src"])])),_:1}),g(d,{class:"row-item",onClick:a[11]||(a[11]=e=>t.switchSort(3,"change_rate"))},{default:p((()=>[g(n,{class:"font-12 color-gray"},{default:p((()=>[k(" /"+I(t.$t("contruct.pl14")),1)])),_:1}),g(o,{class:"toggle-icon",src:t.sort[3].active,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1})])),_:1}),g(h,{class:"drawer-swiper-list-scroll","scroll-y":!0,"show-scrollbar":!1,style:x(`height: ${t.drawerSwiperHeight-48}px`)},{default:p((()=>[g(N,{visible:!t.currency[t.drawerTabIndex]||0===t.currency[t.drawerTabIndex].currency.length,width:600,height:400,title:t.$t("list.not_data")},null,8,["visible","title"]),g(d,{class:"coin-warp"},{default:p((()=>[(w(!0),v($,null,C(""===t.searchVal?t.currency[r].currency:t.currency[r].currency.filter((e=>e.symbol.toLowerCase().includes(t.searchVal.toLowerCase()))),((a,r)=>(w(),m(d,{class:"coin-item",key:"currencylist"+a.id,onClick:r=>t.setCurrentCurrency(a,e)},{default:p((()=>[g(d,{class:"coin-name"},{default:p((()=>[g(n,{class:"font-14 font-weight color-black"},{default:p((()=>[k(I(a.symbol),1)])),_:2},1024),g(n,{class:"font-11 color-gray"},{default:p((()=>[k("/USDT")])),_:1})])),_:2},1024),g(d,{class:"coin-price"},{default:p((()=>[g(d,{class:"coin-price-text"},{default:p((()=>[g(n,{class:b(["font-14 font-bold",{price_up:a.change_rate>0,price_down:a.change_rate<0,"color-black":0===a.change_rate}])},{default:p((()=>[k(I(t.$util.thousandSeparator(a.new_price,e.decimals)),1)])),_:2},1032,["class"]),g(n,{class:b(["font-11 font-weight",{price_up:a.change_rate>0,price_down:a.change_rate<0,"color-black":0===a.change_rate}])},{default:p((()=>[k(I(a.change_rate>0?"+":"")+I(t.$util.thousandSeparator(a.change_rate,e.decimals))+"% ",1)])),_:2},1032,["class"])])),_:2},1024)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:2},1024)])),_:2},1032,["style"])])),_:2},1024)])),_:2},1032,["style"])))),128))])),_:1},8,["current","style"])])),_:1},8,["style"]))])),_:1},8,["show"]),g(q,{ref:"loading"},null,512)])),_:1},8,["data-theme"])}],["__scopeId","data-v-2b8e0d88"]]);export{Z as default};
