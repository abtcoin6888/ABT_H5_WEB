import{_ as e}from"./fui-icon.BbrID5X2.js";import{a as t,a2 as a,a3 as l,r as o,u as s,q as r,w as n,v as c,C as i,x as u,z as d,H as f,t as p,W as h,m as g,A as m,F as _}from"./index-CvJkP8r7.js";import{r as b}from"./uni-app.es.4grYzir1.js";import{_ as y}from"./fui-nav-bar.CZAK61wT.js";import{_ as w}from"./fui-button.BkeFLZEF.js";import{_ as x}from"./uni-popup.BKNKbknm.js";import{_ as k}from"./_plugin-vue_export-helper.BCo6x5W8.js";const v=k({name:"authpwd",data:()=>({eye:!0,password:""}),computed:{...t(["userTheme"])},methods:{confirm(){if(this.password.length<8)return!1;a({});let e=this;setTimeout((()=>{l(),e.close(),e.$emit("callback",!0)}),1500)},inputPwd(e){this.password=e.detail.value},open(){this.$refs.popup.open()},close(){this.$refs.popup.close()}}},[["render",function(t,a,l,g,m,_){const y=f,k=b(o("fui-icon"),e),v=p,$=h,j=b(o("fui-button"),w),C=b(o("uni-popup"),x);return s(),r(v,{"data-theme":t.userTheme},{default:n((()=>[c(C,{ref:"popup",type:"bottom",style:i({width:t.$device.windowWidth+"px"})},{default:n((()=>[c(v,{class:"popup-wrap"},{default:n((()=>[c(v,{class:"popup-wrap-title"},{default:n((()=>[c(y,{class:"font-16 color-black font-weight"},{default:n((()=>[u(d(t.$t("login.t11")),1)])),_:1}),c(v,{class:"close",onClick:a[0]||(a[0]=e=>_.close())},{default:n((()=>[c(k,{name:"close",size:"48",color:"var(--black)"})])),_:1})])),_:1}),c(v,{class:"popup-wrap-content"},{default:n((()=>[c(v,{class:"label"},{default:n((()=>[c(y,{class:"font-13 color-black"},{default:n((()=>[u(d(t.$t("secrety.log_pwd")),1)])),_:1}),c(v,{class:"label-input"},{default:n((()=>[c($,{type:"text",password:m.eye,onInput:_.inputPwd,placeholder:t.$t("login.pwd_p"),"placeholder-class":"placeholder"},null,8,["password","onInput","placeholder"]),c(k,{name:m.eye?"visible":"invisible",size:"38",color:"var(--color-text-dark-gray)",onClick:a[1]||(a[1]=e=>m.eye=!m.eye)},null,8,["name"])])),_:1})])),_:1}),c(v,{class:"button-box"},{default:n((()=>[c(j,{heihgt:"88rpx",radius:"16rpx",bold:"",size:"26",background:m.password.length>=8?"var(--blue)":"var(--color-gray-bg)",color:m.password.length>=8?"#ffffff":"var(--color-text-dark-gray)",text:t.$t("hand.confirm_t"),onClick:a[2]||(a[2]=e=>_.confirm())},null,8,["background","color","text"])])),_:1})])),_:1})])),_:1})])),_:1},8,["style"])])),_:1},8,["data-theme"])}],["__scopeId","data-v-03ef1592"]]);const $=k({data:()=>({supportMode:[]}),onReady(){},onShow(){},computed:{...t(["userPhone","userEmail","googleCode","userTheme"]),...g(["userinfo"])},methods:{setAuth(e){console.log(e),uni.startSoterAuthentication({requestAuthModes:[e],challenge:"test",success(e){console.log(e)}})},authCall(e){console.log(e)},openAuth(){this.$refs.authpwd.open()}}},[["render",function(t,a,l,r,i,h){const g=b(o("fui-icon"),e),w=b(o("fui-nav-bar"),y),x=f,k=p,$=b(o("authpwd"),v);return s(),m(_,null,[c(k,{class:"setting","data-theme":t.userTheme},{default:n((()=>[c(w,{statusBar:"",isFixed:"",isOccupy:"",zIndex:"9",background:"var(--background-primary)",color:"var(--content-primary)",title:t.$t("index.security_center"),onLeftClick:a[0]||(a[0]=e=>t.$mroute.back())},{default:n((()=>[c(g,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["title"]),c(k,{class:"container-box"},{default:n((()=>[c(k,{class:"container-box-cell flex align-center justify-between",onClick:a[1]||(a[1]=e=>t.$mroute.phoneAuth(t.userEmail?1:0,"email"))},{default:n((()=>[c(k,{class:"cell-left flex align-center"},{default:n((()=>[c(x,{class:"font-14 color-black"},{default:n((()=>[u(d(t.$t("secrety.email_ver")),1)])),_:1})])),_:1}),c(k,{class:"flex align-center justify-end cell-right"},{default:n((()=>[c(x,{class:"font-14 color-gray"},{default:n((()=>[u(d(t.userEmail?t.userEmail:this.$t("secrety.binding_status")),1)])),_:1}),c(g,{name:"arrowright",size:"34",color:"var(--content-tertiary)"})])),_:1})])),_:1}),c(k,{class:"container-box-cell flex align-center justify-between",onClick:a[2]||(a[2]=e=>t.$mroute.phoneAuth(t.userPhone?1:0,"phone"))},{default:n((()=>[c(k,{class:"cell-left flex align-center"},{default:n((()=>[c(x,{class:"font-14 color-black"},{default:n((()=>[u(d(t.$t("secrety.phone_ver")),1)])),_:1})])),_:1}),c(k,{class:"flex align-center justify-end cell-right"},{default:n((()=>[c(x,{class:"font-14 color-gray"},{default:n((()=>[u(d(t.userPhone?t.userPhone:this.$t("secrety.binding_status")),1)])),_:1}),c(g,{name:"arrowright",size:"34",color:"var(--content-tertiary)"})])),_:1})])),_:1}),c(k,{class:"container-box-cell flex align-center justify-between",onClick:a[3]||(a[3]=e=>t.$mroute.openGooleAuth())},{default:n((()=>[c(k,{class:"cell-left flex align-center"},{default:n((()=>[c(x,{class:"font-14 color-black"},{default:n((()=>[u(d(t.$t("secrety.google_ver")),1)])),_:1})])),_:1}),c(k,{class:"flex align-center justify-end cell-right"},{default:n((()=>[c(x,{class:"font-14 color-gray"},{default:n((()=>[u(d(t.googleCode?t.$t("google.modify_bind"):this.$t("secrety.binding_status")),1)])),_:1}),c(g,{name:"arrowright",size:"34",color:"var(--content-tertiary)"})])),_:1})])),_:1}),c(k,{class:"container-box-line"}),c(k,{class:"container-box-cell flex align-center justify-between",onClick:a[4]||(a[4]=e=>t.$mroute.newpwd())},{default:n((()=>[c(k,{class:"cell-left flex align-center"},{default:n((()=>[c(x,{class:"font-14 color-black"},{default:n((()=>[u(d(t.$t("secrety.log_pwd")),1)])),_:1})])),_:1}),c(k,{class:"flex align-center justify-end cell-right"},{default:n((()=>[c(g,{name:"arrowright",size:"34",color:"var(--content-tertiary)"})])),_:1})])),_:1}),c(k,{class:"container-box-line"})])),_:1})])),_:1},8,["data-theme"]),c($,{ref:"authpwd",onCallback:h.authCall},null,8,["onCallback"])],64)}],["__scopeId","data-v-da4015ad"]]);export{$ as default};
