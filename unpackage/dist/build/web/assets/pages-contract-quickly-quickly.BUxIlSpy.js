import{_ as t}from"./fui-icon.DR4EBh1k.js";import{m as e,a,a2 as l,i as o,a3 as s,O as r,l as i,g as n,bl as c,r as u,q as d,w as p,t as h,u as f,v as m,y,C as b,A as g,B as _,F as k,x as w,z as C,D as v,H as $,G as q,W as x,K as A,L as P}from"./index-Crl9YJuv.js";import{r as S}from"./uni-app.es.DGAn-rK5.js";import{_ as z}from"./fui-nav-bar.BWTrzAGW.js";import{_ as T}from"./slide-button.Bx73KUd5.js";import{_ as L}from"./fui-tabs.Cts06ewl.js";import{_ as H}from"./fui-button.DywjBHJb.js";import{_ as B}from"./fui-bottom-popup.B6kgpvzO.js";import{_ as j}from"./fui-modal.CCFnKOMT.js";import{_ as F}from"./alert.BH0adChV.js";import{_ as O}from"./fui-toast.CkkCpHLy.js";import{u as N}from"./user.CIfdEhcm.js";import{_ as R}from"./tran-icon.DWd0NTvl.js";import{_ as U,a as V,b as I}from"./unionpay.Cord5WeR.js";import{_ as M}from"./_plugin-vue_export-helper.BCo6x5W8.js";import"./uni-popup-dialog.D9c9DJQu.js";import"./uni-popup.xy3aTQLU.js";const D={components:{slideButton:T,fuiToast:O},data(){return{realType:!0,menuShow:!1,windowHeight:"",navHeight:"",swiperHeight:"",direction:0,directionOption:[{symbol:this.$t("quickly.tt50")},{symbol:this.$t("quickly.tt51")}],subCoinCurrent:0,subCoinValue:"USDT",subCoinOption:["USDT","BTC","ETH","USDC","BGB","DAI","USDT","BTC","ETH","USDC","BGB","DAI"],realName:!1,beginnerTutorial:!1,advertising:!1,modalShow:!1,nickNameTip:!1,paymentPopup:!1,sellerPopup:!1,fundPopup:!1,paymentActive:0,sellerActive:0,duration:0,title:"温馨提示",content:"未设置昵称",ctxt:"取消",ftxt:"去添加",beginCurrent:0,currency_rate:!1,coinList:[],merchant:[],current:{symbol:"",new_price:0,recharge_min:0},amount:"",recvie:"",balance:{balance:"0.00"},payment:[],password:"",symbol:this.$util.getLCS(),symbol_rate:this.$util.getLCR()}},mounted(){this.getNodeInfo()},onShow(){this.showNewY(),this.getCurrencyRate(),this.getRechargeList(),this.getgetMerchantList()},computed:{...e(["config","userinfo"]),...a(["userTheme"])},watch:{sellerPopup(t){if(t){if(""==this.amount||this.amount<=0)return void(this.sellerPopup=!1);if(1!=this.userinfo.authStatus)return this.realName=!0,void(this.sellerPopup=!1);if(null==this.userinfo.email||""==this.userinfo.email)return this.sellerPopup=!1,void(this.realName=!0);if(null==this.userinfo.phone||""==this.userinfo.phone)return this.sellerPopup=!1,void(this.realName=!0);this.getPaymenList()}}},methods:{verifyPwd(){if(""==this.password)return this.showToast("请输入密码"),!1;N.verifyPassword(this.password).then((t=>{this.closePopup(),200==t.code?this.submitOrder(2):this.showToast(t.message)})).catch((t=>{this.closePopup()}))},submitOrder(t){if(""==this.amount||this.amount<=0)return!1;if(2===t&&this.amount>this.balance.balance)return this.showToast(this.$t("with.t8")),!1;try{if(1==t)var e=parseFloat(this.amount/(this.coinList[this.subCoinCurrent].new_price*this.currency_rate)).toFixed(8);else e=parseFloat(this.amount*(this.coinList[this.subCoinCurrent].new_price*this.currency_rate)).toFixed(2);var a={type:t,currency_id:this.coinList[this.subCoinCurrent].id,amount:this.amount,t_amount:e,price:this.currency_rate};1===t&&(a.merchant_id=this.merchant[this.paymentActive].id),2==t&&(a.password=this.password,a.payment_id=this.payment[this.sellerActive].id,1==this.payment[this.sellerActive].type&&(this.paymentActive="wechatpay"),2==this.payment[this.sellerActive].type&&(this.paymentActive="alipay"),3==this.payment[this.sellerActive].type&&(this.paymentActive="bank"),a.merchant_id=this.merchant[this.paymentActive].id),l(),o.c2cSubmit(a).then((a=>{if(s(),200==a.code){var l={};2===t&&(l=this.payment[this.sellerActive]),r(1===t?"c2c-buy":"c2c-sell",{amount:this.amount,t_amount:e,merchant:this.merchant[this.paymentActive],id:a.data.id,result:a.data,currency:this.coinList[this.subCoinCurrent],price:this.currency_rate,payment:this.paymentActive,status:0,recaccount:l}),1==t?this.$mroute.toPayStatus():this.$mroute.toSelldetail()}else this.showToast(a.message)})).catch((t=>{console.log(t)}))}catch(i){console.log(i)}},getPaymenList(){N.getPaymentList().then((t=>{this.payment=t.data.list}))},getgetMerchantList(){o.getMerchantList().then((t=>{this.merchant=t.data}))},getRechargeList(){o.getRechargeCurrency(!0).then((t=>{this.coinList=t.data.list.map((t=>(t.name=t.symbol,t))),this.current=this.coinList[this.subCoinCurrent]}))},getCurrencyRate(){let t=i("local-currency");t=void 0===t||""===t?"CNY":t.value,o.getCurrencyFee(t).then((e=>{this.currency_rate=e.data.tether[t.toLowerCase()]}))},showNewY(){var t=i("c2c-init");1!=parseFloat(t)&&(this.beginnerTutorial=!0,r("c2c-init",1))},navInit(t){console.log(t),this.navHeight=t.height+t.statusBarHeight,this.windowHeight=n().windowHeight-t.height-t.statusBarHeight},close(){this.showToast("暂未开放",1500)},showToast(t,e){let a={};a.text=t,a.duration=e,this.$refs.toast.show(a)},getNodeInfo(){c().in(this).select(".quickly-container-header").boundingClientRect((t=>{this.swiperHeight=this.windowHeight-t.height})).exec()},directionChange(t){this.direction=t.index,this.subCoinCurrent=0,this.duration=0,this.current=this.coinList[0],this.direction&&this.currencyBalance()},currencyBalance(){N.getCurrencyBalance(this.coinList[this.subCoinCurrent].id).then((t=>{this.balance=t.data}))},coinChange(t){this.subCoinCurrent=t.index,this.subCoinValue=t.name,this.current=t,this.duration=0},beginSwiper(t){this.beginCurrent=t.detail.current},nextTap(){this.beginCurrent<3?this.beginCurrent++:this.beginCurrent>=3&&(this.closePopup(),setTimeout((()=>{this.beginCurrent=0}),500))},subSwiperChange(t){let e=t.detail.current;this.subCoinCurrent=e,this.subCoinValue=this.subCoinOption[e],1===this.direction&&this.currencyBalance()},swiperTransition(){this.duration=300},paymentChange(t){console.log(t),this.paymentActive=t},sellerChange(t){this.sellerActive=t},closePopup(){this.realName=!1,this.beginnerTutorial=!1,this.advertising=!1,this.paymentPopup=!1,this.sellerPopup=!1,this.fundPopup=!1,this.sellerActive=0},buyConfirm(){if(""==this.amount||this.amount<this.current.recharge_min*this.current.new_price*this.currency_rate)return this.showToast("最少充值 "+this.$util.thousandSeparator(this.current.recharge_min*this.current.new_price*this.currency_rate,2)+" cny"),!1;1==this.userinfo.authStatus&&null!=this.userinfo.email&&""!=this.userinfo.email&&null!=this.userinfo.phone&&""!=this.userinfo.phone?this.paymentPopup=!0:this.realName=!0}}};const Q=M(D,[["render",function(e,a,l,o,s,r){const i=S(u("fui-icon"),t),n=$,c=q,N=h,M=S(u("fui-nav-bar"),z),D=S(u("slide-button"),T),Q=S(u("fui-tabs"),L),Y=x,G=S(u("fui-button"),H),J=A,E=P,K=S(u("fui-bottom-popup"),B),W=S(u("fui-modal"),j),X=S(u("alert"),F),Z=S(u("fui-toast"),O);return f(),d(N,{class:"buyCoinsQuickly","data-theme":e.userTheme},{default:p((()=>[m(M,{statusBar:"",isFixed:"",isOccupy:"",zIndex:"9",color:"var(--content-primary)",background:"var(--background-primary)",title:e.$t("index.addfunds_t5"),onLeftClick:e.$mroute.back,onInit:e.navInit},{right:p((()=>[m(N,{class:"nav-bar-right"},{default:p((()=>[y("",!0),m(N,{class:"nav-bar-right-more",onClick:a[0]||(a[0]=t=>e.menuShow=!e.menuShow)},{default:p((()=>[m(i,{name:"more-fill",size:"56",color:"var(--content-primary)"})])),_:1})])),_:1})])),default:p((()=>[m(i,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["title","onLeftClick","onInit"]),m(N,{class:"quickly-container"},{default:p((()=>[m(N,{class:"quickly-container-header"},{default:p((()=>[m(N,{class:"quickly-container-tabs"},{default:p((()=>[m(D,{size:28,width:240,height:68,background:"var(--background-secondary)","slide-background":"var(--background-strength)",current:e.direction,options:e.directionOption,radius:10,onChange:e.directionChange},null,8,["current","options","onChange"]),m(c,{onClick:a[1]||(a[1]=t=>e.$mroute.toMyorder()),src:`/static/img/tactic/order-${e.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1}),m(N,{class:"quickly-container-cointab"},{default:p((()=>[m(Q,{scale:1,tabs:e.coinList,current:e.subCoinCurrent,short:!1,scroll:"",alignLeft:"",padding:"0",height:"78",size:"26",selectedSize:"26",fontWeight:"500",color:"var(--content-tertiary)",selectedColor:"var(--content-primary)",sliderBackground:"var(--content-primary)",background:"var(--background-primary)",onChange:e.coinChange},null,8,["tabs","current","onChange"])])),_:1})])),_:1}),m(N,{class:"quickly-container-swiper",style:b({height:e.swiperHeight+"px"})},{default:p((()=>[m(E,{duration:e.duration,current:e.direction,style:b({height:e.swiperHeight+"px"})},{default:p((()=>[(f(!0),g(k,null,_(e.directionOption.length,((t,l)=>(f(),d(J,{key:l},{default:p((()=>[m(E,{duration:e.duration,current:e.subCoinCurrent,style:b({height:e.swiperHeight+"px"}),onChange:e.subSwiperChange,onTransition:e.swiperTransition},{default:p((()=>[(f(!0),g(k,null,_(e.subCoinOption.length,((t,l)=>(f(),d(J,{key:l},{default:p((()=>[0===e.direction?(f(),d(N,{key:0},{default:p((()=>[m(N,{class:"input-label"},{default:p((()=>[m(n,{class:"font-13 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt1")),1)])),_:1}),m(N,{class:"input-label-box"},{default:p((()=>[m(Y,{type:"digit",modelValue:e.amount,"onUpdate:modelValue":a[2]||(a[2]=t=>e.amount=t),placeholder:e.$t("quickly.tt7a")+e.$util.thousandSeparator((""==e.amount?e.current.recharge_min:e.amount)*e.current.new_price*e.currency_rate,2),"placeholder-class":"placeholder"},null,8,["modelValue","placeholder"]),m(n,{class:"font-13 color-black desc"},{default:p((()=>[w(C(e.symbol),1)])),_:1})])),_:1})])),_:1}),m(N,{class:"input-label"},{default:p((()=>[m(n,{class:"font-13 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt2")),1)])),_:1}),m(N,{class:"input-label-box"},{default:p((()=>[m(Y,{type:"text",disabled:!0,placeholder:e.$t("quickly.tt7a")+(""==e.amount?e.current.recharge_min:e.$util.thousandSeparator(e.amount/(e.current.new_price*e.currency_rate),8)),"placeholder-class":"placeholder"},null,8,["placeholder"]),m(n,{class:"font-13 color-black desc"},{default:p((()=>[w(C(e.current.symbol),1)])),_:1})])),_:1})])),_:1}),m(N,{class:"tip"},{default:p((()=>[m(n,{class:"font-11 color-gray"},{default:p((()=>[w(C(e.$t("quickly.tt3"))+"：1.00 "+C(e.current.symbol)+"= "+C(e.$util.thousandSeparator(e.current.new_price*e.currency_rate))+" "+C(e.symbol),1)])),_:1})])),_:1}),m(N,{class:"quickly-container-button"},{default:p((()=>[m(G,{height:"78rpx",radius:"78rpx",color:"var(--content-always-white)",background:"var(--content-trade-buy)",size:"26",onClick:e.buyConfirm},{default:p((()=>[w(C(e.$t("trade.buy"))+" "+C(e.current.symbol),1)])),_:1},8,["onClick"])])),_:1})])),_:1})):y("",!0),1===e.direction?(f(),d(N,{key:1},{default:p((()=>[m(N,{class:"input-label"},{default:p((()=>[m(n,{class:"font-13 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt4")),1)])),_:1}),m(N,{class:"input-label-box"},{default:p((()=>[m(Y,{type:"digit",modelValue:e.amount,"onUpdate:modelValue":a[3]||(a[3]=t=>e.amount=t),placeholder:e.$t("quickly.tt7a")+e.current.with_min,"placeholder-class":"placeholder"},null,8,["modelValue","placeholder"]),m(N,{class:"flex flex-row align-center desc-box"},{default:p((()=>[m(n,{class:"font-13 color-primary mr-10",onClick:a[4]||(a[4]=t=>e.amount=e.$util.float(e.balance.balance))},{default:p((()=>[w(C(e.$t("quickly.tt5")),1)])),_:1}),m(n,{class:"font-13 color-black"},{default:p((()=>[w(C(e.current.symbol),1)])),_:1})])),_:1})])),_:1})])),_:1}),m(N,{class:"tip flex flex-row align-center justify-between"},{default:p((()=>[m(N,{class:"flex flex-row align-center"},{default:p((()=>[m(n,{class:"font-12 color-gray mr-5"},{default:p((()=>[w(C(e.$t("quickly.tt6")),1)])),_:1}),m(i,{onClick:a[5]||(a[5]=t=>e.modalShow=!0),name:"warning",size:"30",color:"var(--content-tertiary)"}),m(n,{class:"font-12 color-warring font-weight ml-5"},{default:p((()=>[w(C(e.$util.float(e.balance.balance))+" "+C(e.current.symbol),1)])),_:1})])),_:1}),m(N,{class:"flex flex-row align-center",onClick:a[6]||(a[6]=t=>e.$mroute.exchange())},{default:p((()=>[m(c,{class:"cell-toggle-icon",src:R,mode:"widthFix"}),m(n,{class:"font-12 color-primary ml-5"},{default:p((()=>[w(C(e.$t("quickly.tt7")),1)])),_:1})])),_:1})])),_:1}),m(N,{class:"input-label"},{default:p((()=>[m(n,{class:"font-13 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt8")),1)])),_:1}),m(N,{class:"input-label-box"},{default:p((()=>[m(Y,{type:"text",disabled:!0,placeholder:e.$t("quickly.tt7a")+e.$util.thousandSeparator((""==e.amount?e.current.with_min:e.amount)*e.current.new_price*e.currency_rate,2),"placeholder-class":"placeholder"},null,8,["placeholder"]),m(n,{class:"font-13 color-black desc"},{default:p((()=>[w(C(e.symbol),1)])),_:1})])),_:1})])),_:1}),m(N,{class:"tip"},{default:p((()=>[m(n,{class:"font-11 color-gray"},{default:p((()=>[w(C(e.$t("quickly.tt3"))+"：1 USDT = "+C(e.currency_rate)+" "+C(e.symbol),1)])),_:1})])),_:1}),m(N,{class:"quickly-container-button"},{default:p((()=>[m(G,{height:"78rpx",radius:"78rpx",background:"var(--content-trade-sell)",size:"26",onClick:a[7]||(a[7]=t=>e.sellerPopup=!0)},{default:p((()=>[w(C(e.$t("quickly.tt8a"))+" "+C(e.current.symbol),1)])),_:1})])),_:1})])),_:1})):y("",!0)])),_:2},1024)))),128))])),_:1},8,["duration","current","style","onChange","onTransition"])])),_:2},1024)))),128))])),_:1},8,["duration","current","style"])])),_:1},8,["style"])])),_:1}),m(N,{class:v(["menu-wrap",e.menuShow?"menuShow":"menuHide"]),style:b({top:e.navHeight+"px"})},{default:p((()=>[m(N,{class:"menu-item",onClick:a[8]||(a[8]=t=>{e.menuShow=!1,e.$mroute.toPaymentMethod()})},{default:p((()=>[m(n,{class:"font-13 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt9")),1)])),_:1})])),_:1}),m(N,{class:"menu-item",onClick:a[9]||(a[9]=t=>{e.menuShow=!1,e.beginnerTutorial=!0})},{default:p((()=>[m(n,{class:"font-13 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt10")),1)])),_:1})])),_:1}),m(N,{class:"menu-item",onClick:a[10]||(a[10]=t=>e.close())},{default:p((()=>[m(n,{class:"font-13 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt11")),1)])),_:1})])),_:1}),m(N,{class:"menu-item"},{default:p((()=>[m(n,{class:"font-13 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt12")),1)])),_:1})])),_:1})])),_:1},8,["class","style"]),m(K,{background:"var(--background-primary)",show:e.realName,onClose:e.closePopup},{default:p((()=>[m(N,{class:"bottom-popup-wrap"},{default:p((()=>[m(N,{class:"bottom-popup-wrap-title"},{default:p((()=>[m(n,{class:"font-16 color-black font-weight"},{default:p((()=>[w(C(e.$t("quickly.tt13")),1)])),_:1}),m(N,{class:"close-icon",onClick:e.closePopup},{default:p((()=>[m(i,{name:"close",size:"48",color:"var(--content-primary)"})])),_:1},8,["onClick"])])),_:1}),m(N,{class:"bottom-popup-wrap-container"},{default:p((()=>[m(N,{class:"real-name-label"},{default:p((()=>[m(N,{class:"real-name-label-left"},{default:p((()=>[m(i,{name:"idcard",size:"36",color:"var(--content-primary)"}),m(n,{class:"font-14 color-black font-weight"},{default:p((()=>[w(C(e.$t("quickly.tt14")),1)])),_:1})])),_:1}),m(N,{class:"real-name-label-right"},{default:p((()=>[1!==e.userinfo.authStatus?(f(),d(n,{key:0,class:"font-12 color-gray",onClick:a[11]||(a[11]=t=>{e.realName=!1,e.$mroute.userauth()})},{default:p((()=>[w(C(e.$t("quickly.tt15")),1)])),_:1})):(f(),d(n,{key:1,class:"font-12 color-gray"},{default:p((()=>[w(C(e.$t("quickly.tt16")),1)])),_:1})),m(i,{name:"arrowright",size:"36",color:"var(--content-tertiary)"})])),_:1})])),_:1}),m(N,{class:"real-name-label"},{default:p((()=>[m(N,{class:"real-name-label-left"},{default:p((()=>[m(i,{name:"mail",size:"36",color:"var(--content-primary)"}),m(n,{class:"font-14 color-black font-weight"},{default:p((()=>[w(C(e.$t("quickly.tt17")),1)])),_:1})])),_:1}),m(N,{class:"real-name-label-right"},{default:p((()=>[null==e.userinfo.email||""==e.userinfo.email?(f(),d(n,{key:0,class:"font-12 color-gray",onClick:a[12]||(a[12]=t=>{e.realName=!1,e.$mroute.phoneAuth(0,"email")})},{default:p((()=>[w(C(e.$t("quickly.tt18")),1)])),_:1})):(f(),d(n,{key:1,class:"font-12 color-gray"},{default:p((()=>[w(C(e.$t("quickly.tt19")),1)])),_:1})),m(i,{name:"arrowright",size:"36",color:"var(--content-tertiary)"})])),_:1})])),_:1}),m(N,{class:"real-name-label"},{default:p((()=>[m(N,{class:"real-name-label-left"},{default:p((()=>[m(i,{name:"mobile",size:"36",color:"var(--content-primary)"}),m(n,{class:"font-14 color-black font-weight"},{default:p((()=>[w(C(e.$t("quickly.tt20")),1)])),_:1})])),_:1}),m(N,{class:"real-name-label-right"},{default:p((()=>[null==e.userinfo.phone||""==e.userinfo.phone?(f(),d(n,{key:0,class:"font-12 color-gray",onClick:a[13]||(a[13]=t=>{e.realName=!1,e.$mroute.phoneAuth(0,"phone")})},{default:p((()=>[w(C(e.$t("quickly.tt18")),1)])),_:1})):(f(),d(n,{key:1,class:"font-12 color-gray"},{default:p((()=>[w(C(e.$t("quickly.tt19")),1)])),_:1})),m(i,{name:"arrowright",size:"36",color:"var(--content-tertiary)"})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["show","onClose"]),m(K,{background:"var(--background-primary)",radius:"30",show:e.beginnerTutorial,onClose:e.closePopup},{default:p((()=>[m(N,{class:"bottom-popup-wrap beginner-tutorial-wrap"},{default:p((()=>[m(N,{class:"bottom-popup-wrap-title"},{default:p((()=>[m(n,{class:"font-16 color-black font-weight"},{default:p((()=>[w(C(e.$t("quickly.tt20a")),1)])),_:1}),m(N,{class:"close-icon",onClick:e.closePopup},{default:p((()=>[m(i,{name:"close",size:"48",color:"var(--content-primary)"})])),_:1},8,["onClick"])])),_:1}),m(N,{class:"bottom-popup-wrap-container"},{default:p((()=>[m(N,{class:"beginner-tutorial-wrap-head"},{default:p((()=>[m(E,{duration:"300",current:e.beginCurrent,class:"beginner-tutorial-wrap-swiper",onChange:e.beginSwiper},{default:p((()=>[m(J,null,{default:p((()=>[m(c,{src:"/assets/beginner-img1-C0W1AlqX.png",mode:"widthFix"}),m(n,{class:"font-13 color-black mt-15"},{default:p((()=>[w(C(e.$t("quickly.tt21")),1)])),_:1}),m(n,{class:"font-13 color-primary font-weight mt-15"},{default:p((()=>[w(C(e.$t("quickly.tt22")),1)])),_:1})])),_:1}),m(J,null,{default:p((()=>[m(c,{src:"/assets/beginner-img2-CUsea8oh.png",mode:"widthFix"}),m(n,{class:"font-16 color-black mt-15"},{default:p((()=>[w(C(e.$t("quickly.tt23")),1)])),_:1}),m(n,{class:"font-13 color-gray mt-15"},{default:p((()=>[w(C(e.$t("quickly.tt24")),1)])),_:1})])),_:1}),m(J,null,{default:p((()=>[m(c,{src:"/assets/beginner-img3-BWYt2dX6.png",mode:"widthFix"}),m(n,{class:"font-16 color-black mt-15"},{default:p((()=>[w(C(e.$t("quickly.tt25")),1)])),_:1}),m(n,{class:"font-13 color-gray mt-15"},{default:p((()=>[w(C(e.$t("quickly.tt26")),1)])),_:1})])),_:1}),m(J,null,{default:p((()=>[m(c,{src:"/assets/beginner-img4-Q_HS4P8B.png",mode:"widthFix"}),m(n,{class:"font-16 color-black mt-15"},{default:p((()=>[w(C(e.$t("quickly.tt27")),1)])),_:1}),m(n,{class:"font-13 color-gray mt-15"},{default:p((()=>[w(C(e.$t("quickly.tt28")),1)])),_:1})])),_:1})])),_:1},8,["current","onChange"])])),_:1}),m(N,{class:"beginner-tutorial-wrap-bottom"},{default:p((()=>[m(N,{class:"left"},{default:p((()=>[(f(),g(k,null,_(4,((t,a)=>m(n,{class:v(["dots",e.beginCurrent===a?"dot-active":""]),key:a},null,8,["class"]))),64))])),_:1}),m(N,{class:"right"},{default:p((()=>[m(N,{class:"button",onClick:e.nextTap},{default:p((()=>[e.beginCurrent<3?(f(),d(c,{key:0,src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAQAAAD/5HvMAAAAhklEQVRo3u3YuQ2AQAwFUUROBezSKn1y1PJJCAhJQLMwU8GTnNjuOjMzMzOzh8qcmcVJgiGdHArpwiGQMmRJWKRR0i3SSiMVSbdIG41UJbVK2mmkSdI7pP7LKy1rZDROpXE2Oa1wCo2zymlkyYedQTQO8JRmPRuA75gLCfZDI3HMzMzM7CcdzJE4dtFCqcYAAAAASUVORK5CYII="})):(f(),d(n,{key:1,class:"font-13 always-white"},{default:p((()=>[w(C(e.$t("quickly.tt29")),1)])),_:1}))])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["show","onClose"]),m(K,{background:"var(--background-primary)",show:e.advertising,onClose:e.closePopup},{default:p((()=>[m(N,{class:"bottom-popup-wrap advertising-wrap"},{default:p((()=>[m(N,{class:"bottom-popup-wrap-title"},{default:p((()=>[m(n,{class:"font-16 color-black font-weight"},{default:p((()=>[w(C(e.$t("quickly.tt30")),1)])),_:1}),m(N,{class:"close-icon",onClick:e.closePopup},{default:p((()=>[m(i,{name:"close",size:"48",color:"var(--content-primary)"})])),_:1},8,["onClick"])])),_:1}),m(N,{class:"bottom-popup-wrap-container"},{default:p((()=>[m(N,{class:"advertising-label"},{default:p((()=>[m(n,{class:"font-13 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt31")),1)])),_:1}),m(N,{class:"advertising-label-box"},{default:p((()=>[m(Y,{type:"text",placeholder:e.$t("quickly.tt32"),"placeholder-class":"placeholder"},null,8,["placeholder"])])),_:1})])),_:1}),m(N,{class:"advertising-button"},{default:p((()=>[m(G,{height:"78rpx",radius:"78rpx",background:"var(--content-primary)",size:"26",color:"var(--background-primary)"},{default:p((()=>[w(C(e.$t("quickly.tt33")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["show","onClose"]),m(W,{buttons:[],background:"transparent",width:"600",show:e.modalShow},{default:p((()=>[m(N,{class:"modal-wrap"},{default:p((()=>[m(n,{class:"font-16 color-black font-weight"},{default:p((()=>[w(C(e.$t("quickly.tt34")),1)])),_:1}),m(n,{class:"font-14 color-black describe mt-15"},{default:p((()=>[w(C(e.$t("quickly.tt35")),1)])),_:1}),m(N,{class:"modal-wrap-content"},{default:p((()=>[m(N,{class:"item"},{default:p((()=>[m(n,{class:"font-12 color-gray"},{default:p((()=>[w(C(e.$t("quickly.tt36"))+"：",1)])),_:1}),m(n,{class:"font-12 color-gray font-weight"},{default:p((()=>[w(C(e.$util.float(e.balance.balance))+" "+C(e.current.symbol),1)])),_:1})])),_:1}),m(N,{class:"item"},{default:p((()=>[m(n,{class:"font-12 color-gray"},{default:p((()=>[w(C(e.$t("quickly.tt37"))+"：",1)])),_:1}),m(n,{class:"font-12 color-gray font-weight"},{default:p((()=>[w("0 "+C(e.current.symbol),1)])),_:1})])),_:1}),m(N,{class:"item"},{default:p((()=>[m(n,{class:"font-12 color-gray"},{default:p((()=>[w(C(e.$t("quickly.tt38"))+"：",1)])),_:1}),m(n,{class:"font-12 color-gray font-weight"},{default:p((()=>[w(C(e.$util.float(e.balance.balance))+" "+C(e.current.symbol),1)])),_:1})])),_:1})])),_:1}),m(N,{class:"modal-wrap-button"},{default:p((()=>[m(G,{height:"78rpx",size:26,background:"var(--content-primary)",color:"var(--background-primary)",radius:"78rpx",onClick:a[14]||(a[14]=t=>e.modalShow=!1)},{default:p((()=>[w(C(e.$t("quickly.tt39")),1)])),_:1})])),_:1})])),_:1})])),_:1},8,["show"]),m(X,{ref:"alert",ctxt:e.ctxt,ftxt:e.ftxt,title:e.title,onConfirm:a[15]||(a[15]=t=>e.$refs.alert.close()),content:e.content},null,8,["ctxt","ftxt","title","content"]),m(K,{background:"var(--background-primary)",radius:"30",show:e.paymentPopup,onClose:e.closePopup},{default:p((()=>[m(N,{class:"bottom-popup-wrap advertising-wrap"},{default:p((()=>[m(N,{class:"bottom-popup-wrap-title"},{default:p((()=>[m(n,{class:"font-16 color-black font-weight"},{default:p((()=>[w(C(e.$t("quickly.tt40")),1)])),_:1}),m(N,{class:"close-icon",onClick:e.closePopup},{default:p((()=>[m(i,{name:"close",size:"48",color:"var(--content-primary)"})])),_:1},8,["onClick"])])),_:1}),m(N,{class:"bottom-popup-wrap-container"},{default:p((()=>[(f(!0),g(k,null,_(e.merchant,((t,a)=>(f(),d(N,{key:a,class:v(["pay-item",{"pay-item-active":e.paymentActive===a}]),onClick:t=>e.paymentChange(a)},{default:p((()=>[m(N,{class:"left"},{default:p((()=>["alipay"==a?(f(),d(c,{key:0,src:U,mode:"widthFix"})):y("",!0),"wechatpay"==a?(f(),d(c,{key:1,src:V,mode:"widthFix"})):y("",!0),"bank"==a?(f(),d(c,{key:2,src:I,mode:"widthFix"})):y("",!0),"alipay"==a?(f(),d(n,{key:3,class:"font-14 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt41")),1)])),_:1})):y("",!0),"bank"==a?(f(),d(n,{key:4,class:"font-14 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt42")),1)])),_:1})):y("",!0),"wechatpay"==a?(f(),d(n,{key:5,class:"font-14 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt43")),1)])),_:1})):y("",!0)])),_:2},1024),m(N,{class:"right"},{default:p((()=>[m(n,{class:"font-13 color-black font-weight"},{default:p((()=>[w("￥"+C(e.amount),1)])),_:1})])),_:1})])),_:2},1032,["class","onClick"])))),128)),m(N,{class:"advertising-button"},{default:p((()=>[m(G,{height:"78rpx",radius:"78rpx",color:"var(--content-always-white)",background:"var(--content-trade-buy)",size:"26",onClick:a[16]||(a[16]=t=>{this.closePopup(),e.submitOrder(1)})},{default:p((()=>[w(C(e.$t("quickly.tt33")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["show","onClose"]),m(K,{background:"var(--background-primary)",radius:"30",show:e.sellerPopup,onClose:e.closePopup},{default:p((()=>[m(N,{class:"bottom-popup-wrap advertising-wrap"},{default:p((()=>[m(N,{class:"bottom-popup-wrap-title"},{default:p((()=>[m(n,{class:"font-16 color-black font-weight"},{default:p((()=>[w(C(e.$t("quickly.tt44")),1)])),_:1}),m(N,{class:"close-icon",onClick:e.closePopup},{default:p((()=>[m(i,{name:"close",size:"48",color:"var(--content-primary)"})])),_:1},8,["onClick"])])),_:1}),m(N,{class:"bottom-popup-wrap-container"},{default:p((()=>[(f(!0),g(k,null,_(e.payment,((t,a)=>(f(),d(N,{key:"p"+a,class:v(["seller-item",{"item-active":e.sellerActive===a}]),onClick:t=>e.sellerChange(a)},{default:p((()=>[m(N,{class:"left"},{default:p((()=>[2===t.type?(f(),d(c,{key:0,src:U})):y("",!0),1===t.type?(f(),d(c,{key:1,src:V})):y("",!0),3===t.type?(f(),d(c,{key:2,src:I})):y("",!0)])),_:2},1024),m(N,{class:"right"},{default:p((()=>[m(N,{class:"right-column"},{default:p((()=>[2===t.type?(f(),d(n,{key:0,class:"font-13 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt41")),1)])),_:1})):y("",!0),1===t.type?(f(),d(n,{key:1,class:"font-13 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt42")),1)])),_:1})):y("",!0),3===t.type?(f(),d(n,{key:2,class:"font-13 color-black"},{default:p((()=>[w(C(e.$t("quickly.tt43")),1)])),_:1})):y("",!0),m(n,{class:"font-12 color-gray"},{default:p((()=>[w(C(t.account)+" "+C(t.name),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128)),e.payment.length>0?(f(),d(N,{key:0,class:"advertising-button"},{default:p((()=>[m(G,{height:"78rpx",radius:"78rpx",color:"var(--content-always-white)",background:"var(--content-trade-sell)",size:"26",onClick:a[17]||(a[17]=t=>{this.closePopup(),e.fundPopup=!0})},{default:p((()=>[w(C(e.$t("quickly.tt45")),1)])),_:1})])),_:1})):(f(),d(N,{key:1,class:"advertising-button"},{default:p((()=>[m(G,{height:"78rpx",radius:"78rpx",color:"var(--background-primary)",background:"var(--content-primary)",size:"26",onClick:a[18]||(a[18]=t=>{this.closePopup(),e.$mroute.toAddMethod()})},{default:p((()=>[w(C(e.$t("quickly.tt46")),1)])),_:1})])),_:1}))])),_:1})])),_:1})])),_:1},8,["show","onClose"]),m(K,{background:"var(--background-primary)",radius:"30",show:e.fundPopup,onClose:e.closePopup},{default:p((()=>[m(N,{class:"bottom-popup-wrap advertising-wrap"},{default:p((()=>[m(N,{class:"bottom-popup-wrap-title"},{default:p((()=>[m(n,{class:"font-16 color-black font-weight"},{default:p((()=>[w(C(e.$t("quickly.tt47")),1)])),_:1}),m(N,{class:"close-icon",onClick:e.closePopup},{default:p((()=>[m(i,{name:"close",size:"48",color:"var(--content-primary)"})])),_:1},8,["onClick"])])),_:1}),m(N,{class:"bottom-popup-wrap-container"},{default:p((()=>[m(N,{class:"advertising-label"},{default:p((()=>[m(N,{class:"advertising-label-box"},{default:p((()=>[m(Y,{type:"password",modelValue:e.password,"onUpdate:modelValue":a[19]||(a[19]=t=>e.password=t),placeholder:e.$t("quickly.tt48"),"placeholder-class":"placeholder"},null,8,["modelValue","placeholder"])])),_:1})])),_:1}),m(N,{class:"mt-10"},{default:p((()=>[m(n,{class:"font-12 color-primary",onClick:a[20]||(a[20]=t=>e.$mroute.forgetpwd())},{default:p((()=>[w(C(e.$t("quickly.tt49")),1)])),_:1})])),_:1}),m(N,{class:"advertising-button"},{default:p((()=>[m(G,{height:"78rpx",radius:"78rpx",color:"var(--background-primary)",background:"var(--content-primary)",size:"26",onClick:a[21]||(a[21]=t=>e.verifyPwd())},{default:p((()=>[w(C(e.$t("quickly.tt33")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["show","onClose"]),m(Z,{size:"26",background:"var(--mask-bakground-bg)",ref:"toast"},null,8,["background"])])),_:1},8,["data-theme"])}],["__scopeId","data-v-3cc33967"]]);export{Q as default};
