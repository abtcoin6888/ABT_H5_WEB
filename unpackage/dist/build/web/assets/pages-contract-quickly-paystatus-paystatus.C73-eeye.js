import{m as t,a,l,i as o,bP as e,e as s,f as r,g as c,a2 as n,a3 as u,r as d,q as i,w as f,t as y,u as _,v as h,x as k,z as m,C as p,y as g,H as b,G as w,S as $}from"./index-CvJkP8r7.js";import{_ as q}from"./fui-icon.BbrID5X2.js";import{r as v}from"./uni-app.es.4grYzir1.js";import{_ as C}from"./fui-nav-bar.CZAK61wT.js";import{_ as x}from"./fui-count-down.Cjkxn7F7.js";import{_ as T}from"./fui-button.BkeFLZEF.js";import{_ as z}from"./fui-bottom-popup.DM1MES5b.js";import{_ as P}from"./fui-toast.DHo7TUdh.js";import{_ as I,a as j,b as H}from"./unionpay.Cord5WeR.js";import{_ as O}from"./cblogo192.1ShK8jq0.js";import{_ as S}from"./_plugin-vue_export-helper.BCo6x5W8.js";var F=null;const E=S({components:{fuiToast:P,fuiCountDown:x},data(){return{payType:!1,navHeight:"",windowHeight:"",cancelTran:!1,codePopup:!1,sellerInfo:!1,confirmOrder:!1,order:{},astatus:!1,tip:!1,symbol:this.$util.getLCS(),symbol_rate:this.$util.getLCR()}},computed:{...t(["config","userinfo"]),...a(["userTheme"])},onShow(){this.order=l("c2c-buy"),null!=F&&clearInterval(F),this.orderStatus(),F=setInterval((()=>{this.orderStatus()}),2e3)},onHide(){clearInterval(F)},methods:{orderStatus(){var t=this;o.c2cOrderStatus(this.order.id).then((a=>{t.order.status=a.data.status,2!==this.order.status||t.tip||(t.tip=!0,t.showToast(this.$t("quickly.tt150"),5e3))}))},approveC(){if(this.astatus)return this.$mroute.webview(2,this.config.kefu_url,this.$t("common.kefu"),100)},approve(){this.showToast(this.$t("quickly.tt151"),1500),this.astatus=!0},timeEnd(){this.showToast(this.$t("quickly.tt152"),1500),o.cancelCOrder(_this.order.id).then((t=>{200==t.code?_this.order.status=3:_this.showToast(t.message)})).catch((t=>{_this.showToast(t.message)}))},cancelOrder(){var t=this;e({content:this.$t("quickly.tt153"),confirmText:this.$t("quickly.tt154"),cancelText:this.$t("quickly.tt155"),success(a){a.confirm&&o.cancelCOrder(t.order.id).then((a=>{200==a.code?t.order.status=3:t.showToast(a.message)})).catch((a=>{t.showToast(a.message)}))}})},copyText(t){s({data:t,success(){r({icon:"success",title:"copy success"})}})},navInit(t){console.log(t),this.navHeight=t.height+t.statusBarHeight,this.windowHeight=c().windowHeight-t.height-t.statusBarHeight},next(){this.confirmOrder=!0},confrimTap(){n(),o.payed(this.order.id).then((t=>{u(),this.closePopup(),200==t.code&&(this.order.status=1),this.showToast(t.message)})).catch((t=>{this.closePopup(),this.showToast(t.message)}))},closePopup(){this.cancelTran=!1,this.codePopup=!1,this.sellerInfo=!1,this.confirmOrder=!1},showToast(t,a){let l={};l.text=t,l.duration=a,this.$refs.toast.show(l)}}},[["render",function(t,a,l,o,e,s){const r=v(d("fui-icon"),q),c=b,n=v(d("fui-nav-bar"),C),u=v(d("fui-count-down"),x),S=y,F=w,E=$,L=v(d("fui-button"),T),B=v(d("fui-bottom-popup"),z),R=v(d("fui-toast"),P);return _(),i(S,{class:"paystatus","data-theme":t.userTheme},{default:f((()=>[h(n,{statusBar:"",isFixed:"",isOccupy:"",padding:15,zIndex:"9",title:t.$t("quickly.tt101"),color:"var(--content-primary)",background:"var(--background-primary)",onLeftClick:t.$mroute.back,onInit:s.navInit},{right:f((()=>[h(c,{class:"font-12 color-gray",onClick:a[0]||(a[0]=a=>t.$mroute.webview(2,t.config.kefu_url,t.$t("common.kefu"),100))},{default:f((()=>[k(m(t.$t("quickly.tt102")),1)])),_:1})])),default:f((()=>[h(r,{name:"arrowleft",size:"56",color:"var(--color-title-black)"})])),_:1},8,["title","onLeftClick","onInit"]),h(S,{class:"paystatus-container"},{default:f((()=>[h(E,{"scroll-y":"",class:"paystatus-container-scroll",style:p({height:e.windowHeight+"px"})},{default:f((()=>[h(S,{class:"scroll-card"},{default:f((()=>[h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left flex flex-column align-start justify-start"},{default:f((()=>[3==e.order.status?(_(),i(c,{key:0,class:"font-20 color-black font-weight"},{default:f((()=>[k(m(t.$t("quickly.tt103")),1)])),_:1})):g("",!0),2==e.order.status?(_(),i(c,{key:1,class:"font-20 color-black font-weight"},{default:f((()=>[k(m(t.$t("quickly.tt104")),1)])),_:1})):g("",!0),0==e.order.status&&1==e.order.result.type?(_(),i(c,{key:2,class:"font-20 color-black font-weight"},{default:f((()=>[k(m(t.$t("quickly.tt70")),1)])),_:1})):g("",!0),1==e.order.status&&1==e.order.result.type?(_(),i(c,{key:3,class:"font-20 color-black font-weight"},{default:f((()=>[k(m(t.$t("quickly.tt55")),1)])),_:1})):g("",!0),0==e.order.status&&2==e.order.result.type?(_(),i(c,{key:4,class:"font-20 color-black font-weight"},{default:f((()=>[k(m(t.$t("quickly.tt105")),1)])),_:1})):g("",!0),0==e.order.status&&1==e.order.result.type?(_(),i(S,{key:5,class:"time-text"},{default:f((()=>[h(c,{class:"font-16 color-black font-weight"},{default:f((()=>[k(m(t.$t("quickly.tt106")),1)])),_:1}),h(u,{background:"var(--background-secondary)",size:"20",borderColor:"var(--background-secondary)",color:"var(--content-primary)",colonColor:"var(--content-tertiary)",isHours:!1,value:600,onEnd:s.timeEnd},null,8,["onEnd"]),h(c,{class:"font-16 color-black font-weight"},{default:f((()=>[k(m(t.$t("quickly.tt107")),1)])),_:1})])),_:1})):g("",!0),1==e.order.status&&1==e.order.result.type?(_(),i(c,{key:6,class:"font-12 color-gray mt-5"},{default:f((()=>[k(m(t.$t("quickly.tt108")),1)])),_:1})):g("",!0),2==e.order.status&&1==e.order.result.type?(_(),i(c,{key:7,class:"font-16 color-black font-weight mt-5"},{default:f((()=>[k(m(t.$t("quickly.tt109"))+m(e.order.t_amount)+" "+m(e.order.currency.symbol),1)])),_:1})):g("",!0)])),_:1}),h(S,{class:"right"},{default:f((()=>[h(S,{class:"kf-box"},{default:f((()=>[h(F,{class:"kf-img",src:`/static/img/kf-${t.userTheme}.webp`,mode:"widthFix",onClick:a[1]||(a[1]=a=>t.$mroute.webview(2,t.config.kefu_url,t.$t("common.kefu"),100))},null,8,["src"])])),_:1})])),_:1})])),_:1})])),_:1}),h(S,{class:"scroll-card"},{default:f((()=>[h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left flex align-center"},{default:f((()=>[h(F,{src:e.order.currency.icon},null,8,["src"]),h(c,{class:"font-16 color-black font-bold"},{default:f((()=>[k(m(t.$t("quickly.tt50"))+m(e.order.currency.symbol),1)])),_:1})])),_:1})])),_:1}),h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-12 color-gray"},{default:f((()=>[k(m(t.$t("trade.price")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(c,{class:"font-13 color-black font-weight"},{default:f((()=>[k(m(e.symbol)+" "+m(e.order.price),1)])),_:1})])),_:1})])),_:1}),h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-12 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt59")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(c,{class:"font-13 color-black font-weight"},{default:f((()=>[k(m(e.order.t_amount)+" "+m(e.order.currency.symbol),1)])),_:1})])),_:1})])),_:1}),h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-12 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt58")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(c,{class:"font-16 color-black font-weight"},{default:f((()=>[k(m(e.symbol)+" "+m(t.$util.thousandSeparator(e.order.amount)),1)])),_:1}),h(F,{class:"copy-icon",src:`/static/img/copy-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1}),h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-12 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt110")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>["alipay"==e.order.payment?(_(),i(F,{key:0,src:I})):g("",!0),"wechatpay"==e.order.payment?(_(),i(F,{key:1,src:j})):g("",!0),"bank"==e.order.payment?(_(),i(F,{key:2,src:H})):g("",!0),"alipay"==e.order.payment?(_(),i(c,{key:3,class:"font-13 color-black font-weight ml-5"},{default:f((()=>[k(m(t.$t("quickly.tt41")),1)])),_:1})):g("",!0),"bank"==e.order.payment?(_(),i(c,{key:4,class:"font-13 color-black font-weight ml-5"},{default:f((()=>[k(m(t.$t("quickly.tt42")),1)])),_:1})):g("",!0),"wechatpay"==e.order.payment?(_(),i(c,{key:5,class:"font-13 color-black font-weight ml-5"},{default:f((()=>[k(m(t.$t("quickly.tt43")),1)])),_:1})):g("",!0)])),_:1})])),_:1}),0==e.order.status&&1==e.order.result.type?(_(),i(S,{key:0,class:"scroll-card-tip"},{default:f((()=>[h(c,{class:"font-12 color-warring"},{default:f((()=>[h(r,{name:"info-fill",size:"24",color:"var(--color-warring)"}),k(" "+m(t.$t("quickly.tt111")),1)])),_:1})])),_:1})):g("",!0)])),_:1}),h(S,{class:"scroll-card"},{default:f((()=>[h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-12 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt112")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(c,{class:"font-13 color-black font-weight",onClick:a[2]||(a[2]=t=>e.sellerInfo=!0)},{default:f((()=>[k(m(e.order.merchant.name),1)])),_:1}),h(r,{name:"arrowright",size:"36",color:"var(--color-title-black)"})])),_:1})])),_:1}),h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-12 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt113")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(c,{class:"font-13 color-black font-weight"},{default:f((()=>[k(m(e.order.merchant.merchant_name),1)])),_:1}),h(F,{class:"copy-icon",src:`/static/img/copy-${t.userTheme}.png`,mode:"widthFix",onClick:a[3]||(a[3]=t=>s.copyText(e.order.merchant.merchant_name))},null,8,["src"])])),_:1})])),_:1}),h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-12 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt114")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>["alipay"!=e.order.payment?(_(),i(c,{key:0,class:"font-13 color-black font-weight"},{default:f((()=>[k(m(e.order.merchant.merchant_account),1)])),_:1})):(_(),i(c,{key:1,class:"font-13 color-black font-weight"},{default:f((()=>[k(m(e.order.merchant.merchant_bank),1)])),_:1})),"alipay"!=e.order.payment?(_(),i(F,{key:2,class:"copy-icon",src:`/static/img/copy-${t.userTheme}.png`,mode:"widthFix",onClick:a[4]||(a[4]=t=>s.copyText(e.order.merchant.merchant_name))},null,8,["src"])):(_(),i(F,{key:3,class:"copy-icon",src:`/static/img/copy-${t.userTheme}.png`,mode:"widthFix",onClick:a[5]||(a[5]=t=>s.copyText(e.order.merchant.merchant_name))},null,8,["src"]))])),_:1})])),_:1}),h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-12 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt115")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>["bank"==e.order.payment?(_(),i(c,{key:0,class:"font-13 color-black font-weight"},{default:f((()=>[k(m(e.order.merchant.merchant_bank),1)])),_:1})):g("",!0),h(F,{class:"copy-icon",src:`/static/img/copy-${t.userTheme}.png`,mode:"widthFix",onClick:a[6]||(a[6]=t=>s.copyText(e.order.merchant.merchant_bank))},null,8,["src"])])),_:1})])),_:1}),h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-12 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt116")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(F,{onClick:a[7]||(a[7]=t=>e.codePopup=!0),class:"qrcode",src:`/static/quickly/qrcode-${t.userTheme}.png`},null,8,["src"])])),_:1})])),_:1})])),_:1}),h(S,{class:"scroll-card"},{default:f((()=>[h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-12 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt117")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(c,{class:"font-13 color-black font-weight order-number"},{default:f((()=>[k(m(e.order.result.id),1)])),_:1}),h(F,{class:"copy-icon",src:`/static/img/copy-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1}),h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-12 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt118")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(c,{class:"font-13 color-black font-weight"},{default:f((()=>[k(m(e.order.result.created_at),1)])),_:1})])),_:1})])),_:1}),h(S,{class:"scroll-card-row"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-12 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt119")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(c,{class:"font-13 color-black font-weight"},{default:f((()=>[k(m(t.$t("quickly.tt120")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["style"])])),_:1}),0==e.order.status&&1==e.order.result.type?(_(),i(S,{key:0,class:"paystatus-footer"},{default:f((()=>[h(S,{class:"button-item"},{default:f((()=>[h(L,{height:"78rpx",radius:"78rpx",size:26,color:"var(--content-tertiary)",background:"var(--background-secondary)",onClick:s.cancelOrder},{default:f((()=>[k(m(t.$t("quickly.tt121")),1)])),_:1},8,["onClick"])])),_:1}),h(S,{class:"button-item"},{default:f((()=>[h(L,{height:"78rpx",radius:"78rpx",size:26,color:"var(--background-primary)",background:"var(--content-primary)",onClick:s.next},{default:f((()=>[k(m(t.$t("quickly.tt122")),1)])),_:1},8,["onClick"])])),_:1})])),_:1})):g("",!0),1==e.order.status&&1==e.order.result.type?(_(),i(S,{key:1,class:"paystatus-footer"},{default:f((()=>[h(S,{class:"button-item"},{default:f((()=>[h(L,{onClick:s.approveC,height:"78rpx",radius:"78rpx",size:26,color:"var(--content-tertiary)",background:"var(--background-secondary)"},{default:f((()=>[k(m(t.$t("quickly.tt123"))+" ",1),e.astatus?g("",!0):(_(),i(u,{key:0,isHours:!1,size:"24",color:"var(--content-primary)",colonColor:"var(--content-tertiary)",background:"var(--background-secondary)",borderColor:"var(--background-secondary)",value:300,onEnd:s.approve},null,8,["onEnd"]))])),_:1},8,["onClick"])])),_:1}),h(S,{class:"button-item"},{default:f((()=>[h(L,{height:"78rpx",radius:"78rpx",size:26,color:"var(--content-always-white)",background:"var(--content-trade-sell)",onClick:s.cancelOrder},{default:f((()=>[k(m(t.$t("quickly.tt124")),1)])),_:1},8,["onClick"])])),_:1})])),_:1})):g("",!0),h(B,{show:e.cancelTran,onClose:s.closePopup},null,8,["show","onClose"]),h(B,{background:"var(--background-primary)",show:e.codePopup,onClose:s.closePopup},{default:f((()=>[h(S,{class:"code-popup"},{default:f((()=>[h(S,{class:"title"},{default:f((()=>[h(c,{class:"font-15 color-black font-weight"},{default:f((()=>[k(m(t.$t("quickly.tt125")),1)])),_:1}),h(c,{class:"font-13 color-gray",onClick:s.closePopup},{default:f((()=>[k(m(t.$t("quickly.tt126")),1)])),_:1},8,["onClick"])])),_:1}),h(S,{class:"code-popup-content"},{default:f((()=>[h(S,{class:"account-info"},{default:f((()=>[h(S,{class:"image-box"},{default:f((()=>[h(F,{src:e.order.merchant.logo},null,8,["src"])])),_:1}),h(S,{class:"info-box"},{default:f((()=>[h(c,{class:"font-16 color-black"},{default:f((()=>[k(m(e.order.merchant.merchant_name),1)])),_:1}),"bank"===e.order.payment?(_(),i(c,{key:0,class:"font-12 color-gray mt-5"},{default:f((()=>[k(m(t.$t("quickly.tt127"))+":"+m(e.order.merchant.bank_name),1)])),_:1})):g("",!0),"bank"===e.order.payment?(_(),i(c,{key:1,class:"font-12 color-gray mt-5"},{default:f((()=>[k(m(t.$t("quickly.tt128"))+": "+m(e.order.merchant.merchant_bank),1)])),_:1})):g("",!0),h(c,{class:"font-12 color-gray mt-5"},{default:f((()=>[k(m(t.$t("quickly.tt129"))+": "+m(e.order.merchant.merchant_account),1)])),_:1})])),_:1})])),_:1}),h(S,{class:"qrcode"},{default:f((()=>["alipay"===e.order.payment?(_(),i(c,{key:0,class:"font-13 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt130")),1)])),_:1})):g("",!0),"wechatpay"===e.order.payment?(_(),i(c,{key:1,class:"font-13 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt131")),1)])),_:1})):g("",!0),"bank"===e.order.payment?(_(),i(c,{key:2,class:"font-13 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt132")),1)])),_:1})):g("",!0),h(F,{src:e.order.merchant.merchant_qrcode},null,8,["src"])])),_:1})])),_:1})])),_:1})])),_:1},8,["show","onClose"]),h(B,{background:"var(--background-primary)",show:e.sellerInfo,onClose:s.closePopup},{default:f((()=>[h(S,{class:"bottom-popup"},{default:f((()=>[h(S,{class:"title"},{default:f((()=>[h(c,{class:"font-15 color-black font-weight"},{default:f((()=>[k(m(t.$t("quickly.tt133")),1)])),_:1}),h(c,{class:"font-13 color-gray",onClick:s.closePopup},{default:f((()=>[k(m(t.$t("quickly.tt134")),1)])),_:1},8,["onClick"])])),_:1}),h(S,{class:"popup-content"},{default:f((()=>[h(S,{class:"cell"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(F,{src:O}),h(c,{class:"font-14 color-black font-weight"},{default:f((()=>[k(m(e.order.merchant.name),1)])),_:1})])),_:1})])),_:1}),h(S,{class:"cell-column"},{default:f((()=>[h(c,{class:"font-13 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt135")),1)])),_:1}),h(S,{class:"column-group"},{default:f((()=>[h(S,{class:"_item"},{default:f((()=>[h(c,{class:"font-14 color-black font-weight"},{default:f((()=>[k(m(e.order.merchant.buy_num),1)])),_:1}),h(c,{class:"font-13 color-green mt-5"},{default:f((()=>[k(m(t.$t("quickly.tt136")),1)])),_:1})])),_:1}),h(S,{class:"_item"},{default:f((()=>[h(c,{class:"font-14 color-black font-weight"},{default:f((()=>[k(m(e.order.merchant.sale_num),1)])),_:1}),h(c,{class:"font-13 color-red mt-5"},{default:f((()=>[k(m(t.$t("quickly.tt137")),1)])),_:1})])),_:1})])),_:1})])),_:1}),h(S,{class:"cell not-margin"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-13 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt138")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(c,{class:"font-13 color-black"},{default:f((()=>[k(m(e.order.merchant.buy_haddle_time)+m(t.$t("quickly.tt139")),1)])),_:1})])),_:1})])),_:1}),h(S,{class:"cell not-margin"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-13 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt140")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(c,{class:"font-13 color-black"},{default:f((()=>[k(m(e.order.merchant.created_at),1)])),_:1})])),_:1})])),_:1}),h(S,{class:"button-box"},{default:f((()=>[h(L,{height:"78rpx",radius:"78rpx",size:"26",color:"var(--background-primary)",background:"var(--content-primary)",onClick:s.closePopup},{default:f((()=>[k(m(t.$t("quickly.tt141")),1)])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})])),_:1},8,["show","onClose"]),h(B,{background:"var(--background-primary)",show:e.confirmOrder,onClose:s.closePopup},{default:f((()=>[h(S,{class:"bottom-popup"},{default:f((()=>[h(S,{class:"title"},{default:f((()=>[h(c,{class:"font-15 color-black font-weight"},{default:f((()=>[k(m(t.$t("quickly.tt142")),1)])),_:1}),h(c,{class:"font-13 color-gray",onClick:s.closePopup},{default:f((()=>[k(m(t.$t("quickly.tt143")),1)])),_:1},8,["onClick"])])),_:1}),h(S,{class:"popup-content"},{default:f((()=>[h(S,{class:"popup-content-head border-bottom"},{default:f((()=>[h(S,{class:"cell-tip"},{default:f((()=>[h(c,{class:"font-12 color-warring"},{default:f((()=>[h(r,{name:"info-fill",size:"24",color:"var(--color-warring)"}),k(" "+m(t.$t("quickly.tt144")),1)])),_:1})])),_:1}),h(S,{class:"cell"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-14 color-black font-weight"},{default:f((()=>[k(m(t.$t("quickly.tt145")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(c,{class:"font-16 color-black font-weight"},{default:f((()=>[k(m(e.symbol)+" "+m(t.$util.thousandSeparator(e.order.amount,2)),1)])),_:1})])),_:1})])),_:1})])),_:1}),h(S,{class:"cell not-margin"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-13 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt146")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(c,{class:"font-13 color-black"},{default:f((()=>[k(m(e.order.merchant.buy_haddle_time)+m(t.$t("quickly.tt147")),1)])),_:1})])),_:1})])),_:1}),h(S,{class:"cell not-margin"},{default:f((()=>[h(S,{class:"left"},{default:f((()=>[h(c,{class:"font-13 color-gray"},{default:f((()=>[k(m(t.$t("quickly.tt148")),1)])),_:1})])),_:1}),h(S,{class:"right"},{default:f((()=>[h(c,{class:"font-13 color-black"},{default:f((()=>[k(m(e.order.merchant.created_at.split(" ")[0]),1)])),_:1})])),_:1})])),_:1}),h(S,{class:"button-box"},{default:f((()=>[h(L,{height:"78rpx",radius:"78rpx",size:"26",color:"var(--content-always-white)",background:"var(--content-trade-buy)",onClick:s.confrimTap},{default:f((()=>[k(m(t.$t("quickly.tt149")),1)])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})])),_:1},8,["show","onClose"]),h(R,{size:"26",background:"var(--mask-bakground-bg)",ref:"toast"},null,8,["background"])])),_:1},8,["data-theme"])}],["__scopeId","data-v-37fae691"]]);export{E as default};
