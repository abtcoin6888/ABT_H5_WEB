import{Z as t,c as e,m as l,a,l as s,i as o,O as d,o as i,P as A,r as c,q as n,w as u,S as g,u as r,v as m,x as C,z as I,T as h,C as Q,y as k,A as B,F as E,B as f,D as w,G as p,t as _,H as K,J as y,_ as x,a0 as J,a1 as S}from"./index-CGNx3rpF.js";import{_ as Y,a as v,b as T,c as V,d as M,e as b,f as G,g as F,h as U,i as j,j as R,k as Z}from"./drawer-icon4.BSuimZSR.js";import{r as q}from"./uni-app.es.BAGiN-2A.js";import{_ as D}from"./uni-icons.vZ9nyOfD.js";import{_ as N}from"./fui-drawer.DL1Ufi8u.js";import{_ as z}from"./_plugin-vue_export-helper.BCo6x5W8.js";const P=z({data(){return{windowWidth:t().windowWidth,drawerActive:!1,tabIndex:0,list:[],iosActive:!1,drawerShow:!1,items:[{value:"zh",name:"home.t69",checked:"true"},{value:"zh-Hant",name:"繁體中文"},{value:"en",name:"home.t70"},{value:"ja",name:"home.t71"},{value:"ko",name:"home.t72"}],checkedTxt:this.$t("home.t69"),lang:"en",scrollTop:0,collapse:[{title:"home.t53",list:[{t:"home.t54",code:"gywm"},{t:"home.t55",code:"blog"},{t:"home.t56",code:"white"}]},{title:"home.t57",list:[{t:"home.t58",code:"yhxy"},{t:"home.t59",code:"ysxy"},{t:"home.t60",code:"mzsm"}]},{title:"home.t61",list:[{t:"home.t62",code:"flbz"},{t:"home.t63",code:"sbsq"},{t:"home.t64",p:e.HELP_URL}]},{title:"home.t65",list:[{t:"home.t66",p:e.HELP_URL},{t:"home.t67",code:"wtfk"},{t:"home.t68",u:this.$mroute.downloadPage}]}],contact:{}}},computed:{...l(["config","userinfo"]),...a(["userTheme"])},onShow(){var t=s("lang");void 0!==t&&""!=t||(t="en"),this.list=[{title:"dw.t9",contxt:"dw.t10",src:`/static/home/img1-${t}.png`},{title:"dw.t11",contxt:"dw.t12",src:`/static/home/img2-${t}.png`},{title:"dw.t13",contxt:"dw.t14",src:`/static/home/img3-${t}.png`},{title:"dw.t15",contxt:"dw.t16",src:`/static/home/img4-${t}.png`}],this.getContact()},methods:{openContact(t){window.open(t)},getContact(){o.config(5).then((t=>{this.contact=t.data}))},themChange(t){console.log(t),this.toggleUserTheme(t.detail.value,"light"==t.detail.value?0:1),d("mthem",t.detail.value),this.userTheme=t.detail.value},navIcat(t){return void 0!==t.u?t.u():void 0!==t.p?this.$mroute.webview(2,t.p,this.$t(t.t)):this.$mroute.webview(1,t.code,this.$t(t.t))},scroll(t){this.scrollTop=t.detail.scrollTop},downApp(t=!1){t?window.open(this.config.ios_url):window.open(this.config.download)},isIOS(){var t=navigator.userAgent.toLowerCase();return/iPhone|iPad/i.test(t)},changeType(t){this.drawerActive=t},tutorialChange(){this.iosActive=!this.iosActive},showDrawer(){this.drawerShow=!0},closeDrawer(){this.drawerShow=!1},radioChange:function(t){console.log(t);var e=t.detail.value;for(let l=0;l<this.items.length;l++)if(this.items[l].value===t.detail.value){this.checkedTxt=this.items[l].name,this.$i18n.locale=e,this.lang=e,i({key:"lang",data:this.items[l].value,success(){A("switchLan")}});break}}}},[["render",function(t,e,l,a,s,o){const d=p,i=_,A=K,z=q(c("uni-collapse-item"),Y),P=q(c("uni-collapse"),v),W=q(c("uni-icons"),D),X=y,$=x,O=J,H=S,L=q(c("fui-drawer"),N),tt=g;return r(),n(tt,{"scroll-y":"","show-scrollbar":!1,class:"download",onScroll:o.scroll},{default:u((()=>[m(i,{class:"nav"},{default:u((()=>[m(i,{class:"logo",onClick:t.$mroute.back},{default:u((()=>[m(d,{class:"logoImage",src:T,mode:"widthFix"})])),_:1},8,["onClick"]),m(i,{class:"menu",onClick:o.showDrawer},{default:u((()=>[s.scrollTop<30?(r(),n(d,{key:0,class:"menuImage",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAABftJREFUeF7t28FtHDkYROEdxaKjgpAiMxyZHYSOikWzl716QbBMdKP+z2eymvVKDz7N4x//EEDgjwQe2CCAwJ8JEMRfBwL/Q4Ag/jwQIIi/AQT2CPgfZI+bW0MIEGTI0GruESDIHje3hhAgyJCh1dwjQJA9bm4NIUCQIUOruUeAIHvc3BpCgCBDhlZzjwBB9ri5NYQAQYYMreYeAYLscXNrCAGCDBlazT0CBNnj5tYQAgQZMrSaewQIssfNrSEECDJkaDX3CBBkj5tbQwgQZMjQau4RIMgeN7eGECDIkKHV3CNAkD1ubg0hQJAhQ6u5R4Age9zcGkKAIEOGVnOPAEH2uLk1hABBhgyt5h4Bguxxc2sIAYIMGVrNPQKxIK+vb+/Px+PH3ufdQuAcgcfz+fPr6/N38oW/I8jLy6/kEe4icILA4/v7gyAnyMqsIECQihmVOEWAIKfIyq0gQJCKGZU4RYAgp8jKrSBAkIoZlThFgCCnyMqtIECQihmVOEWAIKfIyq0gQJCKGZU4RYAgp8jKrSBAkIoZlThFgCCnyMqtIECQihmVOEWAIKfIyq0gcAtBKkgqgcAfCMQ/mEIWgWYCBGleV7eYAEFihAKaCRCkeV3dYgIEiREKaCZAkOZ1dYsJECRGKKCZAEGa19UtJkCQGKGAZgIEaV5Xt5gAQWKEApoJEKR5Xd1iAgSJEQpoJkCQ5nV1iwkQJEYooJkAQZrX1S0mQJAYoYBmAgRpXle3mABBYoQCmgkQpHld3WICBIkRCmgmQJDmdXWLCRAkRiigmQBBmtfVLSZAkBihgGYCBGleV7eYAEFihAKaCRCkeV3dYgIEiREKaCZAkOZ1dYsJECRGKKCZAEGa19UtJkCQGKGAZgIEaV5Xt5gAQWKEApoJEKR5Xd1iAgSJEQpoJkCQ5nV1iwkQJEYooJkAQZrX1S0mEAvy+vr2Hr9CAAKHCHx9ff5Oov+KIM+Xl1/JI9xF4ASBx/f3B0FOkJVZQYAgFTMqcYoAQU6RlVtBgCAVMypxigBBTpGVW0GAIBUzKnGKAEFOkZVbQYAgFTMqcYoAQU6RlVtBgCAVMypxigBBTpGVW0GAIBUzKnGKAEFOkZVbQYAgFTMqcYoAQU6RlVtB4DaCVNBUopLA5b8HqaSqFAL/EYh/UYgkAs0ECNK8rm4xAYLECAU0EyBI87q6xQQIEiMU0EyAIM3r6hYTIEiMUEAzAYI0r6tbTIAgMUIBzQQI0ryubjEBgsQIBTQTIEjzurrFBAgSIxTQTIAgzevqFhMgSIxQQDMBgjSvq1tMgCAxQgHNBAjSvK5uMQGCxAgFNBMgSPO6usUECBIjFNBMgCDN6+oWEyBIjFBAMwGCNK+rW0yAIDFCAc0ECNK8rm4xAYLECAU0EyBI87q6xQQIEiMU0EyAIM3r6hYTIEiMUEAzAYI0r6tbTIAgMUIBzQQI0ryubjEBgsQIBTQTIEjzurrFBAgSIxTQTIAgzevqFhMgSIxQQDMBgjSvq1tMIBbk9fXt/fny8it+iQAE/jKBx/f3x9fX5+8kliAJPXdvTYAgt57H464mQJCrF/D9WxMgyK3n8birCRDk6gV8/9YECHLreTzuagIEuXoB3781AYLceh6Pu5oAQa5ewPdvTYAgt57H464mQJCrF/D9WxMgyK3n8birCRDk6gV8/9YECHLreTzuagIEuXoB3781gfsI8nj8uDUpjxtJ4PF8/rz89yAjySs9hkD8g6kxpBQdSYAgI2dXepUAQVZJOTeSAEFGzq70KgGCrJJybiQBgoycXelVAgRZJeXcSAIEGTm70qsECLJKyrmRBAgycnalVwkQZJWUcyMJEGTk7EqvEiDIKinnRhIgyMjZlV4lQJBVUs6NJECQkbMrvUqAIKuknBtJgCAjZ1d6lQBBVkk5N5IAQUbOrvQqAYKsknJuJAGCjJxd6VUCBFkl5dxIAgQZObvSqwQIskrKuZEECDJydqVXCRBklZRzIwkQZOTsSq8SIMgqKedGEiDIyNmVXiVAkFVSzo0kQJCRsyu9SuBfw5GY2KglNTkAAAAASUVORK5CYII=",mode:"widthFix"})):(r(),n(d,{key:1,class:"menuImage",src:"data:image/png;base64,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",mode:"widthFix"}))])),_:1},8,["onClick"])])),_:1}),m(i,{class:"download-body"},{default:u((()=>[m(i,{class:"header"},{default:u((()=>[m(A,{class:"title"},{default:u((()=>[C(I(t.$t("home.t16"))+" "+I(t.config.site_name)+" App，"+I(t.$t("dw.tt1")),1)])),_:1}),m(A,{class:"subText"},{default:u((()=>[C(I(t.$t("dw.tt2")),1)])),_:1}),h("div",{class:"download-content"},[m(d,{class:"bgImage",src:"/assets/h5-download-Bxke6Xcc.png"}),m(i,{class:"download-tab"},{default:u((()=>[m(A,{onClick:e[0]||(e[0]=t=>s.tabIndex=0)},{default:u((()=>[C("IOS")])),_:1}),m(A,{onClick:e[1]||(e[1]=t=>s.tabIndex=1)},{default:u((()=>[C("Android")])),_:1}),m(i,{class:"slide",style:Q({"--translateX":1==s.tabIndex?"100%":"0%"})},null,8,["style"])])),_:1})]),0===s.tabIndex?(r(),n(i,{key:0,class:"download-buttons"},{default:u((()=>[m(i,{class:"button",onClick:e[2]||(e[2]=t=>o.downApp(!0))},{default:u((()=>[m(d,{src:"/assets/appStore-Cz9oqVUy.png",mode:"scaleToFill"}),m(A,null,{default:u((()=>[C("App Store")])),_:1})])),_:1}),m(i,{class:"button",onClick:e[3]||(e[3]=t=>o.downApp(!0))},{default:u((()=>[m(d,{src:"/assets/iOS-dark-DaTPk3Q1.png",mode:"scaleToFill"}),m(A,null,{default:u((()=>[C("IOS "+I(t.$t("dw.tt3")),1)])),_:1})])),_:1})])),_:1})):k("",!0),1===s.tabIndex?(r(),n(i,{key:1,class:"download-buttons"},{default:u((()=>[m(i,{class:"button",onClick:e[4]||(e[4]=t=>o.downApp(!1))},{default:u((()=>[m(d,{src:"/assets/googleplay-dark-CMDqoemr.png",mode:"scaleToFill"}),m(A,null,{default:u((()=>[C("Google Play")])),_:1})])),_:1}),m(i,{class:"button",onClick:e[5]||(e[5]=t=>o.downApp(!1))},{default:u((()=>[m(d,{src:"/assets/android-dark-B3Pmbjoh.png",mode:"scaleToFill"}),m(A,null,{default:u((()=>[C("Android")])),_:1})])),_:1})])),_:1})):k("",!0),m(i,{class:"download-qrcode"},{default:u((()=>[m(i,{class:"qrcode-box"},{default:u((()=>[m(d,{src:t.config.dpage,mode:"scaleToFill"},null,8,["src"])])),_:1}),m(A,null,{default:u((()=>[C(I(t.$t("contract.pt4")),1)])),_:1})])),_:1})])),_:1}),m(i,{class:"course"},{default:u((()=>[0===s.tabIndex?(r(),B(E,{key:0},[m(A,{class:"title"},{default:u((()=>[C(I(t.$t("dw.tt4")),1)])),_:1}),m(i,{class:"item an_item"},{default:u((()=>[m(A,{class:"step_num"},{default:u((()=>[C("1.")])),_:1}),m(A,{class:"context_an"},{default:u((()=>[C(I(t.$t("dw.tt5"))+" ",1),m(A,null,{default:u((()=>[C("[ App Store ]")])),_:1}),C("，"+I(t.$t("dw.tt6")),1)])),_:1})])),_:1}),m(i,{class:"item an_item"},{default:u((()=>[m(A,{class:"step_num"},{default:u((()=>[C("2.")])),_:1}),m(A,{class:"context_an"},{default:u((()=>[C(I(t.$t("dw.tt7"))+" ",1),m(A,null,{default:u((()=>[C("[ "+I(t.$t("dw.tt8"))+" ]",1)])),_:1}),C(" "+I(t.$t("dw.tt9"))+"。 ",1)])),_:1})])),_:1})],64)):k("",!0),1===s.tabIndex?(r(),B(E,{key:1},[m(A,{class:"title"},{default:u((()=>[C(I(t.$t("dw.tt12")),1)])),_:1}),m(i,{class:"item an_item"},{default:u((()=>[m(A,{class:"step_num"},{default:u((()=>[C("1.")])),_:1}),m(A,{class:"context_an"},{default:u((()=>[C(I(t.$t("dw.tt10"))+" ",1),m(A,null,{default:u((()=>[C("[ Android ]")])),_:1}),C(" "+I(t.$t("dw.tt11"))+"。 ",1)])),_:1})])),_:1}),m(i,{class:"item an_item"},{default:u((()=>[m(A,{class:"step_num"},{default:u((()=>[C("2.")])),_:1}),m(A,{class:"context_an"},{default:u((()=>[C(I(t.$t("dw.tt7"))+" ",1),m(A,null,{default:u((()=>[C("[ "+I(t.$t("dw.tt8"))+" ]",1)])),_:1}),C(" "+I(t.$t("dw.tt9"))+"。 ",1)])),_:1})])),_:1})],64)):k("",!0)])),_:1})])),_:1}),m(i,{class:"footer"},{default:u((()=>[m(i,{class:"f_h"},{default:u((()=>[m(d,{src:T,mode:"widthFix"}),m(A,null,{default:u((()=>[C(I(t.$t("home.t14")),1)])),_:1})])),_:1}),m(i,{class:"f_c"},{default:u((()=>[m(P,{style:{"min-height":"80rpx"}},{default:u((()=>[(r(!0),B(E,null,f(s.collapse,((e,l)=>(r(),n(z,{title:t.$t(e.title),key:l},{default:u((()=>[(r(!0),B(E,null,f(e.list,((e,l)=>(r(),n(i,{class:"txt-item",key:l,onClick:t=>o.navIcat(e)},{default:u((()=>[m(A,null,{default:u((()=>[C(I(t.$t(e.t)),1)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:2},1032,["title"])))),128))])),_:1}),m(i,{class:"m_i"},{default:u((()=>[m(A,null,{default:u((()=>[C(I(t.$t("home.t19")),1)])),_:1}),m(i,{class:"medias"},{default:u((()=>[m(d,{src:V,mode:"",onClick:e[6]||(e[6]=t=>o.openContact(s.contact.twitter))}),m(d,{src:M,mode:"",onClick:e[7]||(e[7]=t=>o.openContact(s.contact.facebook))}),m(d,{src:b,mode:"",onClick:e[8]||(e[8]=t=>o.openContact(s.contact.instagram))}),m(d,{src:G,mode:""}),m(d,{src:F,mode:""}),m(d,{src:U,mode:"",onClick:e[9]||(e[9]=t=>o.openContact(s.contact.telegram))})])),_:1})])),_:1})])),_:1}),m(i,{class:"f_b"},{default:u((()=>[m(A,null,{default:u((()=>[C(I(t.config.site_name)+" © 2020 - 2024",1)])),_:1})])),_:1})])),_:1}),m(L,{show:s.drawerShow,direction:t.right,maskClosable:!0,onClose:o.closeDrawer},{default:u((()=>[m(i,{class:"drawer-box"},{default:u((()=>[m(i,{class:"close"},{default:u((()=>[m(W,{onClick:o.closeDrawer,type:"closeempty",color:"var(--black)",size:"24"},null,8,["onClick"])])),_:1}),m(i,{class:"not-log"},{default:u((()=>[m(X,{onClick:e[10]||(e[10]=e=>t.$mroute.login())},{default:u((()=>[C(I(t.$t("home.t17")),1)])),_:1}),m(X,{onClick:e[11]||(e[11]=e=>t.$mroute.login())},{default:u((()=>[C(I(t.$t("home.t1")),1)])),_:1})])),_:1}),m(i,{class:"list"},{default:u((()=>[m(i,{class:"_row",onClick:e[12]||(e[12]=t=>o.downApp(!0))},{default:u((()=>[m(d,{src:j,mode:""}),m(A,null,{default:u((()=>[C(I(t.$t("home.t16")),1)])),_:1})])),_:1}),m(P,{style:{"min-height":"120rpx"}},{default:u((()=>[m(z,{open:!0},{title:u((()=>[m(d,{src:R,mode:""}),m(A,null,{default:u((()=>[C(I(t.$t(s.checkedTxt)),1)])),_:1})])),default:u((()=>[m(i,{class:"content"},{default:u((()=>[m(H,{onChange:o.radioChange},{default:u((()=>[(r(!0),B(E,null,f(s.items,((e,l)=>(r(),n(O,{class:"label",key:e.value},{default:u((()=>[m(A,null,{default:u((()=>[C(I(t.$t(e.name)),1)])),_:2},1024),m($,{value:e.value,checked:s.lang==e.value},null,8,["value","checked"]),m(i,{class:w(["radio",s.lang==e.value?"radio-active":""])},null,8,["class"])])),_:2},1024)))),128))])),_:1},8,["onChange"])])),_:1})])),_:1})])),_:1}),m(P,{style:{"min-height":"120rpx"}},{default:u((()=>[m(z,{open:!1},{title:u((()=>[m(d,{src:R,mode:""}),m(A,null,{default:u((()=>[C(I(t.$t("common.them")),1)])),_:1})])),default:u((()=>[m(i,{class:"content"},{default:u((()=>[m(H,{onChange:o.themChange},{default:u((()=>[m(O,{class:"label"},{default:u((()=>[m(A,null,{default:u((()=>[C(I(t.$t("common.light")),1)])),_:1}),m($,{value:"light",checked:"light"==t.userTheme},null,8,["checked"]),m(i,{class:w(["radio","light"==t.userTheme?"radio-active":""])},null,8,["class"])])),_:1}),m(O,{class:"label"},{default:u((()=>[m(A,null,{default:u((()=>[C(I(t.$t("common.dark")),1)])),_:1}),m($,{value:"dark",checked:"dark"==t.userTheme},null,8,["checked"]),m(i,{class:w(["radio","dark"==t.userTheme?"radio-active":""])},null,8,["class"])])),_:1})])),_:1},8,["onChange"])])),_:1})])),_:1})])),_:1}),m(i,{class:"_row",onClick:e[13]||(e[13]=e=>t.$mroute.webview(1,"gywm","关于我们"))},{default:u((()=>[m(d,{src:Z,mode:""}),m(A,null,{default:u((()=>[C(I(t.$t("home.t18")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["show","direction","onClose"])])),_:1},8,["onScroll"])}],["__scopeId","data-v-42960bdd"]]);export{P as default};
