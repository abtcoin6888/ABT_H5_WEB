import{l as t,a,n as e,O as i,r as s,q as o,w as l,t as r,u as n,v as d,x as c,z as f,A as u,B as m,F as p,H as h,G as _,J as g}from"./index-CGNx3rpF.js";import{_ as y}from"./fui-icon.CJc-PGr7.js";import{r as w}from"./uni-app.es.BAGiN-2A.js";import{_ as b}from"./fui-nav-bar.Dp0oIG0k.js";import{_ as $}from"./fui-empty.CqMMajk4.js";import{_ as x}from"./fui-tag.BJQXPHDO.js";import{A as v}from"./deposit.Blfo980K.js";import{_ as k}from"./_plugin-vue_export-helper.BCo6x5W8.js";const C=k({data:()=>({list:[],adimg:"ad_item.webp",profit:{profit:0,today:0,total:0}}),onShow(){"zh_CN"!=t("lang")&&(this.adimg="ad_item_en.webp"),this.getItems(),this.getProfit()},computed:{...a(["isLogin","userTheme"])},methods:{toRecord(){this.isLogin?e({url:"recored/recored"}):this.$mroute.login()},getProfit(){v.getProfit().then((t=>{200==t.code&&(this.profit=t.data)}))},goSubscrition(t){i("deposit-item",t),this.$mroute.subscribePage()},getItems(){v.getItems().then((t=>{this.list=t.data}))},toConfirm(){this.isLogin?e({url:"/pages/index/livecoin/eaorders/eaorders"}):this.$mroute.login()}}},[["render",function(t,a,e,i,v,k){const C=w(s("fui-icon"),y),z=w(s("fui-nav-bar"),b),j=h,S=r,F=_,B=w(s("fui-empty"),$),I=g,L=w(s("fui-tag"),x);return n(),o(S,{class:"liveCoin","data-theme":t.userTheme,id:"liveCoin"},{default:l((()=>[d(z,{statusBar:"",isFixed:"",isOccupy:"",title:t.$t("more.deposit"),color:"var(--content-primary)",background:"var(--background-primary)",onLeftClick:a[2]||(a[2]=a=>t.$mroute.back())},{right:l((()=>[d(C,{name:"info-fill",color:"var(--content-tertiary)",size:"40",class:"mr-10",onClick:a[0]||(a[0]=a=>t.$mroute.webview(1,"zysx",t.$t("dp.t1")))}),d(C,{name:"order-fill",color:"var(--content-tertiary)",size:"40",onClick:a[1]||(a[1]=t=>k.toConfirm())})])),default:l((()=>[d(C,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["title"]),d(S,{class:"liveCoin-body"},{default:l((()=>[d(S,{class:"body-head"},{default:l((()=>[d(S,{class:"body-head-cell"},{default:l((()=>[d(j,{class:"font-13 always-white"},{default:l((()=>[c(f(t.$t("dp.t2"))+"(USDT) ",1)])),_:1}),d(S,{class:"tag_box",onClick:a[3]||(a[3]=a=>t.$mroute.liveAuto())},{default:l((()=>[d(j,{class:"font-13 always-white"},{default:l((()=>[c(f(t.$t("dp.t3")),1)])),_:1}),d(C,{name:"arrowright",size:"40",color:"var(--content-always-white)"})])),_:1})])),_:1}),d(S,{class:"body-head-cell mt-10"},{default:l((()=>[d(S,{class:"flex align-center",onClick:a[4]||(a[4]=t=>k.toRecord())},{default:l((()=>[d(j,{class:"font-18 always-white font-weight"},{default:l((()=>[c(f(t.$util.float(v.profit.total?v.profit.total:0)),1)])),_:1}),d(C,{name:"arrowright",size:"40",color:"var(--content-always-white)"})])),_:1})])),_:1}),d(S,{class:"body-head-column mt-10"},{default:l((()=>[d(S,{class:"body-head-column-item"},{default:l((()=>[d(j,{class:"font-12 always-white"},{default:l((()=>[c(f(t.$t("dp.t4")),1)])),_:1}),d(j,{class:"font-14 always-white mt-5"},{default:l((()=>[c(f(t.$util.float(t.$util.thousandSeparator(v.profit.profit,8))),1)])),_:1})])),_:1}),d(S,{class:"body-head-column-item"},{default:l((()=>[d(j,{class:"font-12 always-white"},{default:l((()=>[c(f(t.$t("dp.t5")),1)])),_:1}),d(j,{class:"font-14 always-white mt-5"},{default:l((()=>[c(f(t.$util.float(t.$util.thousandSeparator(v.profit.profit,8))),1)])),_:1})])),_:1})])),_:1})])),_:1}),d(S,{class:"body-banner",onClick:a[5]||(a[5]=a=>t.$mroute.indexFinance())},{default:l((()=>[d(F,{src:"/static/livecoin/"+v.adimg,mode:"widthFix"},null,8,["src"])])),_:1}),d(S,{class:"body-list"},{default:l((()=>[0===v.list.length?(n(),o(S,{key:0,class:"not-data"},{default:l((()=>[d(B,{width:180,height:180,size:26,color:"var(--content-tertiary)",src:`/static/img/tactic/not_data-${t.userTheme}.png`,title:t.$t("list.not_data")},null,8,["src","title"])])),_:1})):(n(!0),u(p,{key:1},m(v.list,((a,e)=>(n(),o(S,{class:"body-list-item",key:e,onClick:t=>k.goSubscrition(a)},{default:l((()=>[d(S,{class:"body-list-item-coin"},{default:l((()=>[d(S,{class:"body-list-item-coin-cell"},{default:l((()=>[d(S,{class:"flex align-center"},{default:l((()=>[d(F,{src:a.icon,mode:"widthFix"},null,8,["src"]),d(j,{class:"font-14 color-black font-weight"},{default:l((()=>[c(f(a.symbol),1)])),_:2},1024)])),_:2},1024),d(I,{class:"button",onClick:t=>k.goSubscrition(a)},{default:l((()=>[c(f(t.$t("dp.t7")),1)])),_:2},1032,["onClick"])])),_:2},1024),d(S,{class:"body-list-item-coin-cell mt-10"},{default:l((()=>[d(S,{class:"flex align-center"},{default:l((()=>[d(S,{class:"mr-10"},{default:l((()=>[d(L,{isBorder:!1,padding:["10rpx","16rpx"],text:t.$t("dp.t8")+a.day_rate+"%",size:22,type:"warning",theme:"light"},null,8,["text"])])),_:2},1024),d(S,{class:"mr-10"},{default:l((()=>[d(L,{isBorder:!1,padding:["10rpx","16rpx"],text:t.$t("dp.t9")+a.year_rate+"%",size:22,type:"warning",theme:"light"},null,8,["text"])])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1})])),_:1},8,["data-theme"])}],["__scopeId","data-v-7da5a764"]]);export{C as default};
