import{a as t,g as a,r as e,q as l,w as r,t as o,u as s,v as n,x as c,z as i,C as d,D as f,y as u,A as g,B as p,F as m,H as _,G as h,S as y,K as b,L as x}from"./index-Crl9YJuv.js";import{_ as w}from"./fui-icon.DR4EBh1k.js";import{r as k}from"./uni-app.es.DGAn-rK5.js";import{_ as A}from"./fui-nav-bar.BWTrzAGW.js";import{f as v}from"./fui-avatar.D6LBhr0h.js";import{_ as I}from"./fui-tag.DJOFUAYN.js";import{_ as C}from"./fui-tabs.Cts06ewl.js";import{_ as B}from"./fui-button.DywjBHJb.js";import{_ as $}from"./qiun-data-charts.B2_9-cA9.js";import{_ as j}from"./fui-empty.DB1Js3PB.js";import{_ as D}from"./qz.ClKCTYFe.js";import{_ as F}from"./_plugin-vue_export-helper.BCo6x5W8.js";import"./u-charts.sQW8Av4g.js";const T=F({components:{fuiEmpty:j,fuiAvatar:v,fuiNavBar:A},data(){return{navHeight:"",scrollHeight:"",duration:"500",oindex:0,current:0,items:[this.$t("follow.contract"),this.$t("follow.spot_goods")],tab:0,menu:[this.$t("tradeInfo.chart"),this.$t("tradeInfo.data"),this.$t("tradeInfo.order"),this.$t("tradeInfo.follow_od")],opts:{color:["#3070ec","#3070ec"],padding:[15,0,15,0],enableScroll:!1,legend:{},xAxis:{boundaryGap:"justify",disableGrid:!0,axisLine:!1,title:"",titleFontSize:0,fontSize:12,fontColor:"#85898e",rotateLabel:!1},yAxis:{disableGrid:!0,axisLine:!1,data:[{min:0,type:"value",position:"left",axisLine:!1}]},extra:{area:{type:"curve",opacity:.5,addLine:!0,width:2,gradient:!0,activeType:"none"}}},groupData:{incomeRate:{categories:["08-08","08-09","08-10","08-11","08-12","08-13"],series:[{itemCount:6,data:[55,25,50,10,30,57],legendText:this.$t("follow.rate_return"),legendShape:"none",name:this.$t("follow.rate_return")}]},currency:{series:[{data:[{name:"ETHUSDT",value:50},{name:"BTCUSDT",value:50}]}]},scatter:{series:[{name:this.$t("tradeInfo.profit"),data:[[1,8.04],[1,6.95],[1,7.58]]},{name:this.$t("tradeInfo.loss"),data:[[1,7.2],[1.5,7.2],[1.03,4.23]]}]},column:{categories:["2018","2019","2020","2021","2022","2023"],series:[{name:this.$t("tradeInfo.trading_volume"),data:[35,36,31,33,13,34]}]}},circle:{color:["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],padding:[5,5,5,5],enableScroll:!1,extra:{pie:{activeOpacity:.5,activeRadius:10,offsetAngle:0,labelWidth:15,border:!0,borderWidth:3,borderColor:"#FFFFFF"}}},scatter:{color:["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],padding:[15,15,0,15],dataLabel:!1,enableScroll:!1,legend:{},xAxis:{disableGrid:!0,gridType:"dash",splitNumber:5,boundaryGap:"justify",min:0,axisLine:!1},yAxis:{disableGrid:!1,gridType:"solid",gridColor:"#f8f8f8",data:[{type:"value",position:"left",axisLine:!1}]},extra:{scatter:{}}},column:{color:["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],padding:[15,15,0,5],enableScroll:!1,legend:{},xAxis:{disableGrid:!0},yAxis:{gridType:"solid",gridColor:"#f8f8f8",data:[{type:"value",position:"left",axisLine:!1}]},extra:{column:{type:"group",width:30,activeBgColor:"#000000",activeBgOpacity:.08}}}}},computed:{...t(["userTheme"])},methods:{navInit(t){this.navHeight=t.height+t.statusBarHeight,this.scrollHeight=a().windowHeight-this.navHeight-44},menuClick(t){this.tab=t.index,this.duration=0},swiperChange(t){this.tab=t.detail.current},changeIng(){this.duration="300"}}},[["render",function(t,a,F,T,S,U){const R=k(e("fui-icon"),w),P=k(e("fui-nav-bar"),A),z=_,H=h,E=o,G=k(e("fui-avatar"),v),M=k(e("fui-tag"),I),L=k(e("fui-tabs"),C),N=k(e("fui-button"),B),W=k(e("qiun-data-charts"),$),X=y,Q=b,J=(k(e("fui-empty"),j),x);return s(),l(E,{class:"traderInfo","data-theme":t.userTheme},{default:r((()=>[n(P,{zIndex:"9",background:"var(--background-primary)",color:"var(--content-primary)",statusBar:"",isFixed:"",isOccupy:"",onLeftClick:a[0]||(a[0]=a=>t.$mroute.back()),onInit:U.navInit},{default:r((()=>[n(R,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["onInit"]),n(E,{class:"traderInfo-body"},{default:r((()=>[n(E,{class:"traderInfo-body-head"},{default:r((()=>[n(E,{class:"traderInfo-body-head-top"},{default:r((()=>[n(E,{class:"flex flex-column"},{default:r((()=>[n(E,{class:"flex align-center"},{default:r((()=>[n(z,{class:"font-16 color-black font-weight"},{default:r((()=>[c(" BGUSER-6DMSN87L ")])),_:1}),n(H,{class:"hot-icon",src:"data:image/webp;base64,UklGRgoFAABXRUJQVlA4WAoAAAAQAAAARwAARwAAQUxQSI8CAAABoC3Jtmnb6kvHtm3btm3btm3btn3Om22fc237bnu3i7nmaGOM/QERMQGic/2Weh5JEgtF44sp6ZMCuQjg7yXpk4DF+P9vo7zWdXcAHpawrVsQRA2zbHAwYF9yqya6wfU0Nu1xhccZLXrjDndTWJM6XgGnvbZ0gPJMW06oxVa1I1W4Gj5LYcUgMGfY4PmIEpLVgg7gbjDP/5oUmsa4iWCPNC1vKO1NsJytjUj5FPwiDnlPYZ8JnpPQOOZ/jUKA4SasgM4rItI0GkATA0ZBa4RPivwFABX0VYnTgyKee/h/eW0pP4bmtoPgWF3bKuie/a1TZ11FYrT9Cufpus7B2POaysPc35LRhqcUkVMGYTQr8Nt6kXzxJn3jJ7VDQmVZBqN7kU4AV3w/mnWPEwgBMAKGl6E0BYDvTFtBWfs/47/xMO5agSoEX4Qd8whlYecDwkBL4lKobbMENdWu6fjoqI5xag919PMd17BD7SMNX/jFd4p3Te1nDUNExH+B9k4tmvelX0Qk1TPWH2qhvAHimPNbUojaZ7S3XicpF8EJU7tHayPBh3Ii1M6ybovbM5Rv1NaxqrvK+CPjjlp70kFx35txRC1DAuXPbApyjzBLTZ5SeopqVUJVwlzGQVG/rvSbl5AtWu3LNIQWSkeFuU+toxA936nUoJRNUHkk1PUKN4S7WaUfp5FCY1Kab92FpeKkTXB1TtgtEl3dFPKnbr7OSJMprtaybrmIqykat7sZy7oYLGGw6PTtdzGddTdITFfRvCzYYtbHTmFNRPvAcKfjrL8d3pcXA4u/cPjVz6kMALGrU4iR/okhANCNsxjAleJibPZNUcCHACPFdwlnKovROZb+jIWM7vPyifGBdocbEHQCAFZQOCBUAgAAUA4AnQEqSABIAD6ROJZIJakioTHzfREgEglsAMjMhYjvtn4jdE91Nig0qPlnnAbYDzAeSN+wHuA9AD+k/5nrAPQA/bH04vYw8rAmWUiryWpcXfHvuWlFO3ZRrtb20sYnkKeV1XssNFcgJthNNFtlp18vAWksHAjVdWGAAP78rR9cOljpleiezbSPkl9d2Pc+3H/890Oqkhu+m8sYSH/+DWs9vXbMZEzR/aSGXUsoQs2jV1EonfEazB9t0yxll/x6a04G9LEN29yqQiN6P/xcoSoaeTH/xg7iXZ745WD4I73le/8bY1lr9hb50cxjx5G2U7VOn4WjZdurJVIMTuMszmXCR+iU92ok5j3Cws+jkhj2J+zoss+Hqc7DD1TLlpijM/O+dX1Qeqn4HOC6uK7b6nRExAkpv+GBy8HAP8gAX6YmM/IkTTA+i1Wt+ILAm82hlfmgGGwZe+1wrhEV7r6wozGH/yYp/vQ3mP1fm9cP0AgLoi1wAYpgKzuwHtW/HQ/9kHESjBD/QA/sifUgf45URfyrlSpg253JCOrmFRMYKPAArz+tevuYR5sZfa6egH+tagm04hjGyN/5E5t97y83JKzXgL1zOYAP77tUx1BnPgBjrhsc9Xw4M+HHbH87FhTtdldiGhlOFMxg9npSAz7cb98xzN39fQTouMOai/VyySDGnuW4fzoYHJyU4DeE/ao+/tIa9WSQw2NCpXP9rpXvceEVefPXSJKfJol5ZqZUy57DA6lzMP3pClt0X6Oy0j2+9IRrdj3ENuCuODGWJq4JgFBAAAA=",mode:"widthFix"})])),_:1}),n(E,{class:"flex align-center mt-5"},{default:r((()=>[n(z,{class:"font-12 color-dark"},{default:r((()=>[c(" @BGUSER-6DMSN87L ")])),_:1})])),_:1}),n(E,{class:"flex align-center mt-5"},{default:r((()=>[n(H,{class:"flow-icon",src:D,mode:"widthFix"}),n(z,{class:"font-12 color-gray"},{default:r((()=>[c("898/1000")])),_:1})])),_:1})])),_:1}),n(E,{class:"flex align-center"},{default:r((()=>[n(G,{background:"var(--background-secondary)",width:"150",height:"150",src:"/static/img/davatar.webp"})])),_:1})])),_:1}),n(E,{class:"traderInfo-body-head-bottom"},{default:r((()=>[n(M,{isBorder:!1,padding:["8rpx","10rpx"],text:t.$t("follow.high_income"),marginRight:10,radius:4,type:"warning",theme:"light"},null,8,["text"]),n(M,{isBorder:!1,padding:["8rpx","10rpx"],text:t.$t("follow.steady"),marginRight:10,radius:4,type:"warning",theme:"light"},null,8,["text"]),n(M,{isBorder:!1,padding:["8rpx","10rpx"],text:t.$t("follow.high_frequency"),marginRight:10,radius:4,type:"warning",theme:"light"},null,8,["text"])])),_:1})])),_:1}),n(E,{class:"traderInfo-body-container"},{default:r((()=>[n(E,{class:"tab-cell"},{default:r((()=>[n(L,{scroll:"",alignLeft:"",color:"var(--content-tertiary)",selectedColor:"var(--content-primary)",selectedSize:"28",sliderBackground:"var(--content-primary)",background:"var(--background-primary)",height:"78",scale:1,current:S.current,tabs:S.items,short:!1,onClick:t.onClickItem},null,8,["current","tabs","onClick"])])),_:1}),n(E,{class:"content-box"},{default:r((()=>[n(E,{class:"content-box-item"},{default:r((()=>[n(z,{class:"font-14 color-black font-weight"},{default:r((()=>[c(" **** ")])),_:1}),n(E,{class:"flex align-center mt-5"},{default:r((()=>[n(z,{class:"font-12 color-gray"},{default:r((()=>[c(i(t.$t("tradeInfo.total_equity")),1)])),_:1})])),_:1})])),_:1}),n(E,{class:"content-box-item"},{default:r((()=>[n(z,{class:"font-14 color-black font-weight"},{default:r((()=>[c(" 637 ")])),_:1}),n(z,{class:"font-12 color-gray mt-5"},{default:r((()=>[c(i(t.$t("tradeInfo.total_number")),1)])),_:1})])),_:1}),n(E,{class:"content-box-item"},{default:r((()=>[n(z,{class:"font-14 color-black font-weight"},{default:r((()=>[c(" 126 ")])),_:1}),n(z,{class:"font-12 color-gray mt-5"},{default:r((()=>[c(i(t.$t("tradeInfo.join_time")),1)])),_:1})])),_:1})])),_:1}),n(E,{class:"content-buttons"},{default:r((()=>[n(E,{class:"content-buttons-item"},{default:r((()=>[n(N,{height:"78rpx",radius:"60rpx",color:"var(--background-primary)",background:"var(--content-primary)",size:"26",text:t.$t("tradeInfo.vacancy_reminder"),onClick:a[1]||(a[1]=a=>t.$mroute.tradeConfirm(1))},null,8,["text"])])),_:1}),n(E,{class:"content-buttons-item"},{default:r((()=>[n(N,{height:"78rpx",radius:"60rpx",background:"var(--background-secondary)",color:"var(--content-primary)",size:"26"},{default:r((()=>[n(R,{name:"plus",size:"40",color:"var(--content-primary)"}),c(" "+i(t.$t("tradeInfo.focus_on")),1)])),_:1})])),_:1})])),_:1}),n(E,{class:"tab-cell"},{default:r((()=>[n(L,{scroll:"",alignLeft:"",color:"var(--content-tertiary)",selectedColor:"var(--content-primary)",selectedSize:"28",sliderBackground:"var(--content-primary)",background:"var(--background-primary)",height:"78",scale:1,current:S.tab,tabs:S.menu,short:!1,onChange:U.menuClick},null,8,["current","tabs","onChange"])])),_:1}),n(J,{current:S.tab,duration:S.duration,onChange:U.swiperChange,onTransition:U.changeIng,class:"swiper-warp",style:d(`height: ${S.scrollHeight}px`)},{default:r((()=>[n(Q,{class:"swiper-warp-item"},{default:r((()=>[n(X,{"scroll-y":"",class:"swiper-scroll"},{default:r((()=>[n(E,{class:"chart-card"},{default:r((()=>[n(E,{class:"chart-card-cell"},{default:r((()=>[n(E,{class:"flex align-center"},{default:r((()=>[n(z,{class:"font-13 color-black font-weight mr-5"},{default:r((()=>[c(i(t.$t("follow.rate_return")),1)])),_:1}),n(R,{name:"info",size:"30",color:"var(--content-tertiary)"})])),_:1}),n(E,{class:"flex align-center"},{default:r((()=>[n(z,{class:"font-12 color-gray mr-5"},{default:r((()=>[c(i(t.$t("tradeInfo.last_day")),1)])),_:1}),n(R,{name:"turningdown",size:"30",color:"var(--content-tertiary)"})])),_:1})])),_:1}),n(E,{class:"chart-card-box"},{default:r((()=>[n(W,{type:"area",opts:S.opts,chartData:S.groupData.incomeRate},null,8,["opts","chartData"])])),_:1})])),_:1}),n(E,{class:"chart-card"},{default:r((()=>[n(E,{class:"chart-card-cell"},{default:r((()=>[n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(i(t.$t("tradeInfo.currency_pre")),1)])),_:1}),n(E,{class:"flex align-center"},{default:r((()=>[n(z,{class:"font-12 color-gray mr-5"},{default:r((()=>[c(i(t.$t("tradeInfo.last_day")),1)])),_:1}),n(R,{name:"turningdown",size:"30",color:"var(--content-tertiary)"})])),_:1})])),_:1}),n(E,{class:"chart-card-box"},{default:r((()=>[n(W,{type:"pie",opts:S.circle,chartData:S.groupData.currency},null,8,["opts","chartData"])])),_:1})])),_:1}),n(E,{class:"chart-card"},{default:r((()=>[n(E,{class:"chart-card-cell"},{default:r((()=>[n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(i(t.$t("tradeInfo.holding_time")),1)])),_:1}),n(E,{class:"flex align-center"},{default:r((()=>[n(z,{class:"font-12 color-gray mr-5"},{default:r((()=>[c(i(t.$t("tradeInfo.last_day")),1)])),_:1}),n(R,{name:"turningdown",size:"30",color:"var(--content-tertiary)"})])),_:1})])),_:1}),n(E,{class:"chart-card-box"},{default:r((()=>[n(W,{type:"scatter",opts:S.scatter,chartData:S.groupData.scatter},null,8,["opts","chartData"])])),_:1})])),_:1}),n(E,{class:"chart-card"},{default:r((()=>[n(E,{class:"chart-card-cell"},{default:r((()=>[n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(i(t.$t("tradeInfo.trading_volume")),1)])),_:1}),n(E,{class:"flex align-center"},{default:r((()=>[n(z,{class:"font-12 color-gray mr-5"},{default:r((()=>[c(i(t.$t("tradeInfo.last_day")),1)])),_:1}),n(R,{name:"turningdown",size:"30",color:"var(--content-tertiary)"})])),_:1})])),_:1}),n(E,{class:"chart-card-box"},{default:r((()=>[n(W,{type:"column",opts:S.column,chartData:S.groupData.column},null,8,["opts","chartData"])])),_:1})])),_:1})])),_:1})])),_:1}),n(Q,{class:"swiper-warp-item"},{default:r((()=>[n(E,{class:"data-card"},{default:r((()=>[n(E,{class:"data-card-cell"},{default:r((()=>[n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(i(t.$t("follow.rate_return")),1)])),_:1}),n(z,{class:"font-13 price_up font-weight"},{default:r((()=>[c(" +4566.10% ")])),_:1})])),_:1}),n(E,{class:"data-card-cell"},{default:r((()=>[n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(i(t.$t("tradeInfo.maximum_drawdown")),1)])),_:1}),n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(" +10.10% ")])),_:1})])),_:1}),n(E,{class:"data-card-cell"},{default:r((()=>[n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(i(t.$t("follow.grand_total_people")),1)])),_:1}),n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(" 108 ")])),_:1})])),_:1}),n(E,{class:"data-card-cell"},{default:r((()=>[n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(i(t.$t("follow.total_revenue")),1)])),_:1}),n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(" $11758.30 ")])),_:1})])),_:1}),n(E,{class:"data-card-cell"},{default:r((()=>[n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(i(t.$t("tradeInfo.winning_percentage")),1)])),_:1}),n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(" 93.46% ")])),_:1})])),_:1}),n(E,{class:"data-card-cell"},{default:r((()=>[n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(" AUM ")])),_:1}),n(z,{class:"font-13 color-black font-weight"},{default:r((()=>[c(" 4389352.90 ")])),_:1})])),_:1}),n(E,{class:"data-card-label"},{default:r((()=>[n(z,{class:"font-13 color-black font-weight title"},{default:r((()=>[c(i(t.$t("tradeInfo.with_stp")),1)])),_:1}),n(E,{class:"tag-group"},{default:r((()=>[n(M,{padding:["12rpx","16rpx"],isBorder:!1,radius:8,marginRight:10,type:"warning",theme:"light",text:"BTCUSDT"}),n(M,{padding:["12rpx","16rpx"],isBorder:!1,radius:8,marginRight:10,type:"warning",theme:"light",text:"ETHUSDT"})])),_:1})])),_:1})])),_:1})])),_:1}),n(Q,{class:"swiper-warp-item"},{default:r((()=>[n(X,{"scroll-y":"",class:"swiper-scroll"},{default:r((()=>[n(E,{class:"order-tabs"},{default:r((()=>[n(E,{class:"order-tabs-left"},{default:r((()=>[n(E,{class:f(["tab-item",0===S.oindex?"tab-item-active":""]),onClick:a[2]||(a[2]=t=>S.oindex=0)},{default:r((()=>[n(z,{class:f(["font-13",0===S.oindex?"color-black":"color-gray"])},{default:r((()=>[c(i(t.$t("tradeInfo.history_bl")),1)])),_:1},8,["class"])])),_:1},8,["class"]),n(E,{class:f(["tab-item",1===S.oindex?"tab-item-active":""]),onClick:a[3]||(a[3]=t=>S.oindex=1)},{default:r((()=>[n(z,{class:f(["font-13",1===S.oindex?"color-black":"color-gray"])},{default:r((()=>[c(i(t.$t("tradeInfo.cur_order"))+"26 ",1)])),_:1},8,["class"])])),_:1},8,["class"])])),_:1}),n(E,{class:"order-tabs-right"},{default:r((()=>[n(E,{class:"flex align-center"},{default:r((()=>[n(z,{class:"font-12 color-gray mr-5"},{default:r((()=>[c(i(t.$t("tradeInfo.details")),1)])),_:1}),n(R,{name:"turningdown",size:"30",color:"var(--content-tertiary)"})])),_:1})])),_:1})])),_:1}),0===S.oindex?(s(),l(E,{key:0,class:"order-list"},{default:r((()=>[u("",!0),(s(),g(m,null,p(2,(a=>n(E,{class:"order-list-item",key:a},{default:r((()=>[n(E,{class:"order-list-item-cell"},{default:r((()=>[1===a?(s(),l(M,{key:0,isBorder:!1,padding:["8rpx","10rpx"],text:t.$t("tradeInfo.many"),marginRight:20,radius:4,type:"success",theme:"dark"},null,8,["text"])):u("",!0),2===a?(s(),l(M,{key:1,isBorder:!1,padding:["8rpx","10rpx"],text:t.$t("tradeInfo.null"),marginRight:20,radius:4,type:"danger",theme:"dark"},null,8,["text"])):u("",!0),n(z,{class:"font-14 color-black font-weight"},{default:r((()=>[c(" BTCUSDT ")])),_:1}),n(M,{isBorder:!1,padding:["8rpx","10rpx"],text:t.$t("tradeInfo.full_w")+"50X",marginLeft:20,marginRight:10,radius:4,type:"warning",theme:"light"},null,8,["text"]),n(M,{isBorder:!1,padding:["8rpx","10rpx"],text:"USDT",marginRight:10,radius:4,type:"warning",theme:"light"})])),_:2},1024),n(E,{class:"order-list-item-column"},{default:r((()=>[n(E,{class:"item"},{default:r((()=>[n(z,{class:"font-14 color-black"},{default:r((()=>[c(" 19536.55 ")])),_:1}),n(z,{class:"font-12 color-gray"},{default:r((()=>[c(i(t.$t("tradeInfo.average_op")),1)])),_:1})])),_:1}),n(E,{class:"item"},{default:r((()=>[n(z,{class:"font-14 color-black"},{default:r((()=>[c(" 19536.55 ")])),_:1}),n(z,{class:"font-12 color-gray"},{default:r((()=>[c(i(t.$t("tradeInfo.current_price")),1)])),_:1})])),_:1}),n(E,{class:"item"},{default:r((()=>[n(z,{class:"font-14 color-black"},{default:r((()=>[c(" 19536.55 ")])),_:1}),n(z,{class:"font-12 color-gray"},{default:r((()=>[c(i(t.$t("follow.rate_return")),1)])),_:1})])),_:1})])),_:1}),n(E,{class:"order-list-item-cell flex align-center justify-between mt-5"},{default:r((()=>[n(z,{class:"font-12 color-gray"},{default:r((()=>[c(" 08/14 10:12:52 ")])),_:1}),n(R,{name:"back",size:"40",color:"var(--content-tertiary)"}),n(z,{class:"font-12 color-gray"},{default:r((()=>[c(" 08/14 21:12:52 ")])),_:1})])),_:1})])),_:2},1024))),64))])),_:1})):u("",!0),1===S.oindex?(s(),l(E,{key:1,class:"order-list"},{default:r((()=>[u("",!0),(s(),g(m,null,p(2,(a=>n(E,{class:"order-list-item",key:a},{default:r((()=>[n(E,{class:"order-list-item-cell"},{default:r((()=>[2===a?(s(),l(M,{key:0,isBorder:!1,padding:["8rpx","10rpx"],text:t.$t("tradeInfo.many"),marginRight:20,radius:4,type:"success",theme:"dark"},null,8,["text"])):u("",!0),1===a?(s(),l(M,{key:1,isBorder:!1,padding:["8rpx","10rpx"],text:t.$t("tradeInfo.null"),marginRight:20,radius:4,type:"danger",theme:"dark"},null,8,["text"])):u("",!0),n(z,{class:"font-14 color-black font-weight"},{default:r((()=>[c(" BTCUSDT ")])),_:1}),n(M,{isBorder:!1,padding:["8rpx","10rpx"],text:t.$t("tradeInfo.full_w")+"50X",marginLeft:20,marginRight:10,radius:4,type:"warning",theme:"light"},null,8,["text"]),n(M,{isBorder:!1,padding:["8rpx","10rpx"],text:"USDT",marginRight:10,radius:4,type:"warning",theme:"light"})])),_:2},1024),n(E,{class:"order-list-item-column"},{default:r((()=>[n(E,{class:"item"},{default:r((()=>[n(z,{class:"font-14 color-black"},{default:r((()=>[c(" 19536.55 ")])),_:1}),n(z,{class:"font-12 color-gray"},{default:r((()=>[c(i(t.$t("tradeInfo.average_op")),1)])),_:1})])),_:1}),n(E,{class:"item"},{default:r((()=>[n(z,{class:"font-14 color-black"},{default:r((()=>[c(" 19536.55 ")])),_:1}),n(z,{class:"font-12 color-gray"},{default:r((()=>[c(i(t.$t("tradeInfo.current_price")),1)])),_:1})])),_:1}),n(E,{class:"item"},{default:r((()=>[n(z,{class:"font-14 color-black"},{default:r((()=>[c(" 19536.55 ")])),_:1}),n(z,{class:"font-12 color-gray"},{default:r((()=>[c(i(t.$t("follow.rate_return")),1)])),_:1})])),_:1})])),_:1}),n(E,{class:"order-list-item-cell flex align-center justify-between mt-5"},{default:r((()=>[n(z,{class:"font-12 color-gray"},{default:r((()=>[c(" 08/14 10:12:52 ")])),_:1}),n(R,{name:"back",size:"40",color:"var(--content-tertiary)"}),n(z,{class:"font-12 color-gray"},{default:r((()=>[c(" 08/14 21:12:52 ")])),_:1})])),_:1})])),_:2},1024))),64))])),_:1})):u("",!0)])),_:1})])),_:1}),n(Q,{class:"swiper-warp-item"},{default:r((()=>[n(X,{"scroll-y":"",class:"swiper-scroll"},{default:r((()=>[n(E,{class:"flower-list"},{default:r((()=>[(s(),g(m,null,p(5,(a=>n(E,{class:"flower-list-cell",key:a},{default:r((()=>[n(E,{class:"flower-list-cell-image"},{default:r((()=>[n(G,{width:"90",height:"90",background:"var(--color-gray-bg)",src:"/static/img/avatar.png"})])),_:1}),n(E,{class:"flower-list-cell-info"},{default:r((()=>[n(z,{class:"font-14 color-black font-weight"},{default:r((()=>[c(" MarcAurel ")])),_:1}),n(z,{class:"font-12 color-gray"},{default:r((()=>[c(i(t.$t("tradeInfo.follow_total"))+"：363173.12 USDT ",1)])),_:1}),n(z,{class:"font-12 color-gray"},{default:r((()=>[c(i(t.$t("tradeInfo.follow_earn"))+"：+104501.7153 USDT ",1)])),_:1})])),_:1})])),_:2},1024))),64))])),_:1})])),_:1})])),_:1})])),_:1},8,["current","duration","onChange","onTransition","style"])])),_:1})])),_:1})])),_:1},8,["data-theme"])}],["__scopeId","data-v-96f9771d"]]);export{T as default};
