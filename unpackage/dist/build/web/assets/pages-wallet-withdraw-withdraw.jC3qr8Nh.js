import{al as t,ap as e,af as a,aF as o,aq as s,aG as l,as as i,aR as r,ax as n,aJ as c,aw as u,aH as d,v as f,bG as h,aE as p,am as m,bH as w,az as g,ay as y,ac as _,aC as b,b4 as $,aT as k,aN as v,ar as x,aX as C,au as j,av as T,bF as F,aD as z,I,a as L,i as O,f as S,r as N,q as R,w as V,t as A,u as B,x as P,z as H,y as E,C as D,A as q,B as G,F as U,H as X,G as J,W as K,J as M,D as W}from"./index-CvJkP8r7.js";import{_ as Y}from"./fui-icon.BbrID5X2.js";import{r as Q}from"./uni-app.es.4grYzir1.js";import{_ as Z}from"./fui-nav-bar.CZAK61wT.js";import{_ as tt}from"./coin-indexed-xlist.B8OWLfeG.js";import{_ as et}from"./uni-popup.BKNKbknm.js";import{_ as at}from"./alert.DkjAnFY_.js";import{_ as ot}from"./loading.CdlUmBbP.js";import{_ as st}from"./authPop.CwFbtQQB.js";import{u as lt}from"./user.PBjN9YNI.js";import{_ as it}from"./btc.CQEfMToJ.js";import{_ as rt}from"./_plugin-vue_export-helper.BCo6x5W8.js";import{N as nt}from"./index.yy0eSKon.js";import{C as ct}from"./index.CWiwpfwI.js";import"./uni-popup-dialog.jPMVSOx-.js";import"./fui-loading.BOHvl-ks.js";import"./fui-button.BkeFLZEF.js";import"./use-route.C4IRx7GB.js";const[ut,dt]=t("index-bar"),ft={sticky:p,zIndex:m,teleport:[String,Object],highlightColor:String,stickyOffsetTop:w(0),indexList:{type:Array,default:function(){const t="A".charCodeAt(0);return Array(26).fill("").map(((e,a)=>String.fromCharCode(t+a)))}}},ht=Symbol(ut);var pt=e({name:ut,props:ft,emits:["select","change"],setup(t,{emit:e,slots:p}){const m=a(),w=a(),x=a(""),C=o(),j=s(m),{children:T,linkChildren:F}=l(ht);let z;F({props:t});const I=i((()=>{if(r(t.zIndex))return{zIndex:+t.zIndex+1}})),L=i((()=>{if(t.highlightColor)return{color:t.highlightColor}})),O=(e,a)=>{for(let o=T.length-1;o>=0;o--){const s=o>0?a[o-1].height:0;if(e+(t.sticky?s+t.stickyOffsetTop:0)>=a[o].top)return o}return-1},S=t=>T.find((e=>String(e.index)===t)),N=()=>{if(y(m))return;const{sticky:e,indexList:a}=t,o=_(j.value),s=b(j),l=T.map((t=>t.getRect(j.value,s)));let i=-1;if(z){const e=S(z);if(e){const a=e.getRect(j.value,s);i=t.sticky&&t.stickyOffsetTop?O(a.top-t.stickyOffsetTop,l):O(a.top,l)}}else i=O(o,l);x.value=a[i],e&&T.forEach(((e,a)=>{const{state:r,$el:n}=e;if(a===i||a===i-1){const t=n.getBoundingClientRect();r.left=t.left,r.width=t.width}else r.left=null,r.width=null;if(a===i)r.active=!0,r.top=Math.max(t.stickyOffsetTop,l[a].top-o)+s.top;else if(a===i-1&&""===z){const t=l[i].top-o;r.active=t>0,r.top=t+s.top-l[a].height}else r.active=!1})),z=""},R=()=>{g(N)};n("scroll",N,{target:j,passive:!0}),c(R),u((()=>t.indexList),R),u(x,(t=>{t&&e("change",t)}));const V=a=>{z=String(a);const o=S(z);if(o){const a=_(j.value),s=b(j),{offsetHeight:l}=document.documentElement;if(o.$el.scrollIntoView(),a===l-s.height)return void N();t.sticky&&t.stickyOffsetTop&&($()===l-s.height?k($()):k($()-t.stickyOffsetTop)),e("select",o.index)}},A=t=>{const{index:e}=t.dataset;e&&V(e)},B=t=>{A(t.target)};let P;const H=()=>f("div",{ref:w,class:dt("sidebar"),style:I.value,onClick:B,onTouchstartPassive:C.start},[t.indexList.map((t=>{const e=t===x.value;return f("span",{class:dt("index",{active:e}),style:e?L.value:void 0,"data-index":t},[t])}))]);return d({scrollTo:V}),n("touchmove",(t=>{if(C.move(t),C.isVertical()){v(t);const{clientX:e,clientY:a}=t.touches[0],o=document.elementFromPoint(e,a);if(o){const{index:t}=o.dataset;t&&P!==t&&(P=t,A(o))}}}),{target:w}),()=>{var e;return f("div",{ref:m,class:dt()},[t.teleport?f(h,{to:t.teleport},{default:()=>[H()]}):H(),null==(e=p.default)?void 0:e.call(p)])}}});const[mt,wt]=t("index-anchor");const gt=z(e({name:mt,props:{index:m},setup(t,{slots:e}){const o=x({top:0,left:null,rect:{top:0,height:0},width:null,active:!1}),s=a(),{parent:l}=C(ht);if(!l)return;const r=()=>o.active&&l.props.sticky,n=i((()=>{const{zIndex:t,highlightColor:e}=l.props;if(r())return j(T(t),{left:o.left?`${o.left}px`:void 0,width:o.width?`${o.width}px`:void 0,transform:o.top?`translate3d(0, ${o.top}px, 0)`:void 0,color:e})}));return d({state:o,getRect:(t,e)=>{const a=b(s);return o.rect.height=a.height,t===window||t===document.body?o.rect.top=a.top+$():o.rect.top=a.top+_(t)-e.top,o.rect}}),()=>{const a=r();return f("div",{ref:s,style:{height:a?`${o.rect.height}px`:void 0}},[f("div",{style:n.value,class:[wt({sticky:a}),{[F]:a}]},[e.default?e.default():t.index])])}}})),yt=z(pt);var _t=0;const bt=rt({components:{[nt.name]:nt,[I.name]:I,[yt.name]:yt,[gt.name]:gt,[ct.name]:ct,fuiNavBar:Z},data:()=>({coin:[],netlist:[],net:!1,current:!1,token:"",amount:"",content:"",title:"",type:""}),onShow(){setTimeout((()=>{0===_t&&(_t=1,this.$refs.selectp.open())}),200)},onReady(){_t=0,this.getCurrency()},computed:{...L(["userTheme"])},methods:{confirm(t){this.$refs.authPop.close(),this.$refs.loading.open(),O.postWithdraw({amount:this.amount,network:this.netlist[this.net].id,currency_id:this.current.id,address:this.token,code:t,type:this.type}).then((t=>{if(this.$refs.loading.close(),200!=t.code)return this.content=t.message,this.$refs.alert.open(),!1;this.current.balance=parseFloat(this.current.balance)-this.amount,this.amount="",this.content=this.$t("with.t26"),this.$refs.alert.open()})).catch((t=>{this.$refs.loading.close()}))},withDraw(){return!1!==this.current&&!1!==this.net&&(""==this.token||""==this.amount||parseFloat(this.amount)<=0?(this.content=this.$t("with.t27"),this.$refs.alert.open(),!1):parseFloat(this.amount)<=parseFloat(this.current.recharge_min)?(this.content=this.$t("with.t28")+this.current.recharge_min+this.current.symbol,this.$refs.alert.open(),!1):!(parseFloat(this.amount)>parseFloat(this.current.balance))&&(this.$refs.loading.open(),void lt.getUniCode().then((t=>{this.$refs.loading.close(),0!=t.data.type?(this.type=t.data.type,"google"===t.data.type&&(this.title=this.$t("secrety.google_ver")),"email"===t.data.type&&(this.title=this.$t("secrety.email_ver")),"phone"===t.data.type&&(this.title=this.$t("secrety.phone_ver")),this.$refs.authPop.open()):(this.content=this.$t("secrety.fail_send"),this.$refs.alert.open())}))))},getCurrency(){O.getAccountCurrency().then((t=>{this.coin=t.data,this.coin.length>0?(this.current=this.coin[0],this.getNetList(this.coin[0].id)):console.log("No ETH or BTC currencies with positive balance.")}))},getNetList(t){O.getNetList(t).then((t=>{this.netlist=t.data.list,this.net=0}))},itemclick(t){this.current=t,this.getNetList(t.id),this.$refs.selectp.close()},scan(){S({title:this.$t("with.t29"),icon:"none",duration:2e3})}}},[["render",function(t,e,a,o,s,l){const i=Q(N("fui-icon"),Y),r=Q(N("fui-nav-bar"),Z),n=X,c=J,u=A,d=K,h=M,p=Q(N("coin-indexed-xlist"),tt),m=Q(N("uni-popup"),et),w=Q(N("alert"),at),g=Q(N("loading"),ot),y=Q(N("authPop"),st);return B(),R(u,{class:"withdraw","data-theme":t.userTheme},{default:V((()=>[f(r,{isFixed:"",zIndex:"9",isOccupy:"",statusBar:"",title:t.$t("with.t1"),background:"var(--background-primary)",color:"var(--content-primary)",onLeftClick:e[0]||(e[0]=e=>t.$mroute.back()),onRightClick:e[1]||(e[1]=e=>t.$mroute.withrecord())},{right:V((()=>[f(i,{class:"mr-10",name:"order-fill",size:"40",color:"var(--content-tertiary)"})])),default:V((()=>[f(i,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["title"]),f(u,{class:"withdraw-body"},{default:V((()=>[f(u,{class:"withdraw-body-cell"},{default:V((()=>[f(n,{class:"font-13 color-black font-weight"},{default:V((()=>[P(H(t.$t("with.t2")),1)])),_:1}),f(u,{class:"withdraw-body-cell-box mt-10",onClick:e[2]||(e[2]=e=>t.$refs.selectp.open())},{default:V((()=>[!1===s.current?(B(),R(u,{key:0,class:"flex align-center"},{default:V((()=>[f(c,{class:"coin-icon",src:it,mode:"widthFix"}),f(n,{class:"font-12 color-black font-weight"},{default:V((()=>[P("BTC")])),_:1})])),_:1})):(B(),R(u,{key:1,class:"flex align-center"},{default:V((()=>[f(c,{class:"coin-icon",src:s.current.icon,mode:"widthFix"},null,8,["src"]),f(n,{class:"font-12 color-black font-weight"},{default:V((()=>[P(H(s.current.symbol),1)])),_:1})])),_:1})),f(c,{class:"down-icon",src:`/static/img/tactic/down-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1}),f(u,{class:"withdraw-body-cell mt-15"},{default:V((()=>[f(n,{class:"font-13 color-black font-weight"},{default:V((()=>[P(H(t.$t("with.t3")),1)])),_:1}),f(u,{class:"withdraw-body-cell-box mt-10",onClick:e[3]||(e[3]=e=>t.$refs.chain.open())},{default:V((()=>[f(u,{class:"flex align-center"},{default:V((()=>[!1===s.net?(B(),R(n,{key:0,class:"font-12 color-gray"},{default:V((()=>[P(H(t.$t("with.t4")),1)])),_:1})):(B(),R(n,{key:1,class:"font-12 color-black font-weight"},{default:V((()=>[P(H(s.netlist[s.net].symbol),1)])),_:1}))])),_:1}),f(c,{class:"down-icon",src:`/static/img/tactic/down-${t.userTheme}.png`,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1}),f(u,{class:"withdraw-body-cell mt-15"},{default:V((()=>[f(n,{class:"font-13 color-black font-weight"},{default:V((()=>[P(H(t.$t("with.t5")),1)])),_:1}),f(u,{class:"withdraw-body-cell-box mt-10"},{default:V((()=>[f(d,{type:"text",modelValue:s.token,"onUpdate:modelValue":e[4]||(e[4]=t=>s.token=t),class:"font-13 color-black font-weight",placeholder:t.$t("with.t25"),"placeholder-class":"placeholder"},null,8,["modelValue","placeholder"])])),_:1})])),_:1}),f(u,{class:"withdraw-body-cell mt-15"},{default:V((()=>[f(u,{class:"flex align-center justify-between"},{default:V((()=>[f(n,{class:"font-13 color-black font-weight"},{default:V((()=>[P(H(t.$t("with.t6")),1)])),_:1}),!1!==s.current?(B(),R(u,{key:0},{default:V((()=>[f(n,{class:"font-13 font-weight color-black"},{default:V((()=>[P(H(t.$t("with.t7"))+" "+H(t.$util.thousandSeparator(t.$util.str2number(s.current.balance)))+" "+H(s.current.symbol),1)])),_:1})])),_:1})):E("",!0)])),_:1}),f(u,{class:"withdraw-body-cell-box mt-10"},{default:V((()=>[f(d,{type:"number",modelValue:s.amount,"onUpdate:modelValue":e[5]||(e[5]=t=>s.amount=t),disabled:!1===s.current||s.current.balance<=0,class:"font-13 font-weight color-black",placeholder:!1===s.current||s.current.balance<=0?t.$t("with.t8"):"","placeholder-class":"placeholder"},null,8,["modelValue","disabled","placeholder"]),f(u,{onClick:e[6]||(e[6]=e=>s.current.balance>0?s.amount=t.$util.str2number(t.$util.float(s.current.balance)):s.amount="")},{default:V((()=>[f(n,{class:"font-13 font-weight color-primary"},{default:V((()=>[P(H(t.$t("with.t9")),1)])),_:1})])),_:1})])),_:1})])),_:1}),f(u,{class:"withdraw-body-card mt-15"},{default:V((()=>[f(u,{class:"withdraw-body-card-cell"},{default:V((()=>[f(n,{class:"font-12 color-gray"},{default:V((()=>[P(H(t.$t("with.t10")),1)])),_:1}),f(n,{class:"font-12 color-black font-weight"},{default:V((()=>[P(H(s.current.with_min)+" "+H(s.current.symbol),1)])),_:1})])),_:1}),f(u,{class:"withdraw-body-card-cell"},{default:V((()=>[f(n,{class:"font-12 color-gray"},{default:V((()=>[P(H(t.$t("with.t11")),1)])),_:1}),f(n,{class:"font-12 color-black font-weight"},{default:V((()=>[P(H(s.current.with_max)+" "+H(s.current.symbol),1)])),_:1})])),_:1}),f(u,{class:"withdraw-body-card-cell"},{default:V((()=>[f(n,{class:"font-12 color-gray"},{default:V((()=>[P(H(t.$t("with.t12")),1)])),_:1}),f(n,{class:"font-12 color-black font-weight"},{default:V((()=>[P(H(s.current.with_max)+" "+H(s.current.symbol),1)])),_:1})])),_:1})])),_:1}),f(u,{class:"withdraw-body-tips mt-15"},{default:V((()=>[f(n,{class:"font-13 color-black font-weight"},{default:V((()=>[P(H(t.$t("with.t13")),1)])),_:1}),f(n,{class:"font-12 color-gray"},{default:V((()=>[P(H(t.$t("with.t14")),1)])),_:1}),f(n,{class:"font-12 color-gray"},{default:V((()=>[P(H(t.$t("with.t15")),1)])),_:1})])),_:1})])),_:1}),f(u,{class:"withdraw-footer"},{default:V((()=>[f(u,{class:"withdraw-footer-left"},{default:V((()=>[f(u,{class:"flex align-center"},{default:V((()=>[f(n,{class:"font-13 color-gray mr-10"},{default:V((()=>[P(H(t.$t("with.t16")),1)])),_:1}),""==s.amount||s.amount<0?(B(),R(n,{key:0,class:"font-13 color-black font-weight"},{default:V((()=>[P(" 0.00 "+H(s.current.symbol),1)])),_:1})):(B(),R(n,{key:1,class:"font-13 color-black font-weight"},{default:V((()=>[P(H(t.$util.float(s.amount-s.current.with_charge))+" "+H(s.current.symbol),1)])),_:1}))])),_:1}),f(u,{class:"flex align-center mt-5"},{default:V((()=>[f(n,{class:"font-13 color-gray mr-10"},{default:V((()=>[P(H(t.$t("with.t17")),1)])),_:1}),f(n,{class:"font-13 color-black font-weight"},{default:V((()=>[P(H(t.$util.float(t.$util.str2number(s.current.with_charge)))+" "+H(s.current.symbol),1)])),_:1})])),_:1})])),_:1}),f(h,{"hover-class":"none",class:"withdraw-footer-button button-active",onClick:e[7]||(e[7]=t=>l.withDraw())},{default:V((()=>[f(n,{class:"font-13 color-white font-weight"},{default:V((()=>[P(H(t.$t("with.t18")),1)])),_:1})])),_:1})])),_:1}),f(m,{ref:"selectp","safe-area":!1,type:"bottom",style:{height:"100%",width:"100%"}},{default:V((()=>[f(u,{style:D({height:t.$device.windowHeight+"px"})},{default:V((()=>[f(r,{zIndex:"2",statusBar:!0,background:"var(--background-primary)",color:"var(--content-primary)",title:t.$t("financing.t85"),onLeftClick:e[8]||(e[8]=e=>t.$refs.selectp.close())},{default:V((()=>[f(i,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["title"]),f(p,{"name-key":"symbol",nameKey:"symbol",dataList:s.coin,showAvatar:!0,onItemclick:l.itemclick},null,8,["dataList","onItemclick"])])),_:1},8,["style"])])),_:1},512),f(m,{ref:"chain","safe-area":!1,type:"bottom"},{default:V((()=>[f(u,{class:"popup-wrap"},{default:V((()=>[f(u,{class:"popup-wrap-title"},{default:V((()=>[f(n,{class:"font-16 color-black font-weight"},{default:V((()=>[P(H(t.$t("with.t20")),1)])),_:1}),f(u,{class:"close-icon",onClick:e[9]||(e[9]=e=>t.$refs.chain.close())},{default:V((()=>[f(i,{name:"close",size:"48",color:"var(--content-primary)"})])),_:1})])),_:1}),f(u,{class:"popup-wrap-content"},{default:V((()=>[f(u,{class:"popup-wrap-content-tip"},{default:V((()=>[f(n,{class:"font-12 color-gray"},{default:V((()=>[P(H(t.$t("with.t21")),1)])),_:1})])),_:1}),f(u,{class:"popup-wrap-content-list"},{default:V((()=>[(B(!0),q(U,null,G(s.netlist,((e,a)=>(B(),R(u,{onClick:e=>{s.net=a,t.$refs.chain.close()},class:W(["popup-wrap-content-list-item",{"popup-wrap-content-list-item-active":s.net===a}])},{default:V((()=>[f(n,{class:"font-13 font-weight color-black mr-10"},{default:V((()=>[P(H(e.symbol),1)])),_:2},1024),f(n,{class:"font-12 font-weight color-gray"},{default:V((()=>[P(H(t.$t("with.t22"))+"："+H(t.$util.float(t.$util.str2number(s.current.with_charge)))+" "+H(s.current.symbol),1)])),_:1})])),_:2},1032,["onClick","class"])))),256))])),_:1})])),_:1})])),_:1})])),_:1},512),f(w,{ref:"alert",title:t.$t("with.t23"),content:s.content},null,8,["title","content"]),f(g,{ref:"loading"},null,512),f(y,{ref:"authPop",title:s.title,onCallback:l.confirm},null,8,["title","onCallback"])])),_:1},8,["data-theme"])}],["__scopeId","data-v-c508712c"]]);export{bt as default};
