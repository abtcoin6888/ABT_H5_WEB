import{a as t,m as e,g as s,r as a,q as r,w as i,t as o,u as n,v as l,x as c,z as d,A as f,B as u,F as p,G as m,H as x,y as h}from"./index-Crl9YJuv.js";import{_ as g}from"./fui-icon.DR4EBh1k.js";import{r as _}from"./uni-app.es.DGAn-rK5.js";import{_ as b}from"./fui-nav-bar.BWTrzAGW.js";import{_ as w}from"./banner_bg.v8WC1IbS.js";import{_ as B}from"./_plugin-vue_export-helper.BCo6x5W8.js";const k=B({data(){return{containerHeight:"",stepsArr:[{title:this.$t("registerBlindBox.text4"),index:1},{title:"",descr:this.$t("registerBlindBox.text6"),index:2}]}},computed:{...t(["userTheme"]),...e(["config"]),pageTitle(){return this.$t("registerBlindBox.text1").replace("{}",this.config.site_name)},rewardText(){const t='<text class="color-primary ml-5 mr-5">'+this.$t("registerBlindBox.rewardCenter")+"</text>";return this.$t("registerBlindBox.text2").replace("{}",t).replace("site_name",this.config.site_name)},stepText(){return this.$t("registerBlindBox.text5").replace("{}","35$").replace("site_name",this.config.site_name)}},mounted(){this.setStepInfo()},methods:{navInit(t){const e=t.height+t.statusbarHeight,a=s.windowHeight;this.containerHeight=a-e},setStepInfo(){this.stepsArr[1].title=this.stepText}}},[["render",function(t,e,s,B,k,v){const y=_(a("fui-icon"),g),$=_(a("fui-nav-bar"),b),T=m,I=x,H=o;return n(),r(H,{class:"page-warp","data-theme":t.userTheme},{default:i((()=>[l($,{background:"var(--background-primary)",color:"var(--content-primary)",statusBar:"",isFixed:"",isOccupy:"",onRightClick:e[0]||(e[0]=e=>t.$mroute.switchIndex()),onInit:v.navInit},{right:i((()=>[l(y,{name:"close",size:"56",color:"var(--content-primary)"})])),_:1},8,["onInit"]),l(H,{class:"page-container"},{default:i((()=>[l(T,{class:"logo-image",src:w,mode:"widthFix"}),l(H,{class:"title-warp"},{default:i((()=>[l(I,{class:"font-28 font-bold color-black title-text"},{default:i((()=>[c(d(v.pageTitle),1)])),_:1}),l(H,{class:"font-14 color-black desc-text",innerHTML:v.rewardText},null,8,["innerHTML"]),l(I,{class:"font-14 color-black desc-text"},{default:i((()=>[c(d(t.$t("registerBlindBox.text3")),1)])),_:1})])),_:1}),l(H,{class:"step-warp"},{default:i((()=>[(n(!0),f(p,null,u(k.stepsArr,((t,e)=>(n(),r(H,{class:"step-item",key:e},{default:i((()=>[l(H,{class:"node-warp"},{default:i((()=>[1===t.index?(n(),r(H,{key:0,class:"node-box"},{default:i((()=>[l(y,{name:"check",size:"32",fontWeight:"bold",color:"var(--content-primary)"})])),_:1})):h("",!0),2===t.index?(n(),r(H,{key:1,class:"node-box node-active"},{default:i((()=>[l(I,{class:"font-14 font-weight color-black"},{default:i((()=>[c(d(t.index),1)])),_:2},1024)])),_:2},1024)):h("",!0)])),_:2},1024),l(H,{class:"node-text"},{default:i((()=>[l(I,{class:"_tit font-16 font-bold color-black"},{default:i((()=>[c(d(t.title),1)])),_:2},1024),l(I,{class:"_desc font-12 color-gray"},{default:i((()=>[c(d(t.descr),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1}),l(H,{class:"button",onClick:e[1]||(e[1]=e=>t.$mroute.switchIndex())},{default:i((()=>[l(I,{class:"font-14 color-black font-weight"},{default:i((()=>[c(d(t.$t("welfare.btn5")),1)])),_:1})])),_:1})])),_:1})])),_:1},8,["data-theme"])}],["__scopeId","data-v-5c1029fd"]]);export{k as default};
