import{u as t,q as e,w as o,v as a,br as i,A as n,F as s,B as r,C as l,E as h,x as c,z as d,t as u,H as f,a as m,g as p,r as g,S as w,G as b}from"./index-CGNx3rpF.js";import{_}from"./fui-icon.CJc-PGr7.js";import{r as v}from"./uni-app.es.BAGiN-2A.js";import{_ as S}from"./fui-nav-bar.Dp0oIG0k.js";import{_ as y}from"./_plugin-vue_export-helper.BCo6x5W8.js";const k={data:()=>({isShow:!1,isDisabled:!1,thresholdVal:30}),watch:{show(t){this.isShow=this.show},disabled(t){this.isDisabled=this.disabled},threshold(t){this.thresholdVal=Number(this.threshold)}},created(){this.group=this.getParent(),void 0!==this.group.children&&this.group.children.push(this)},mounted(){this.$nextTick((()=>{setTimeout((()=>{this.isShow=this.show,this.isDisabled=this.disabled,this.thresholdVal=Number(this.threshold)}),10)}))},methods:{closeSwipe(t){this.autoClose&&this.group&&this.group.closeAuto(this)},change(t){this.$emit("change",{isOpen:"right"===t.open,param:this.param}),this.isShow!==t.open&&(this.isShow=t.open)},isPC(){var t=navigator.userAgent,e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],o=!0;for(let a=0;a<e.length-1;a++)if(t.indexOf(e[a])>0){o=!1;break}return o},appTouchStart(t){if(this.isPC())return;const{clientX:e}=t.changedTouches[0];this.clientX=e,this.timestamp=(new Date).getTime()},appTouchEnd(t,e,o){if(this.isPC())return;const{clientX:a}=t.changedTouches[0];let i=Math.abs(this.clientX-a),n=(new Date).getTime()-this.timestamp;i<40&&n<300&&this.$emit("click",{index:e,item:o,param:this.param})},handleClick(t,e){this.isPC()&&this.$emit("click",{index:t,item:e,param:this.param})}}};function x(){if("object"!=typeof navigator)return!1;for(var t=navigator.userAgent,e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],o=!0,a=0;a<e.length-1;a++)if(t.indexOf(e[a])>0){o=!1;break}return o}var T=!1;function C(t,e){var o=t.getState(),a=e.selectComponent(".fui-swipe__action-right");if(a)if(T||x())a.$el?o.rightWidth=a.$el.offsetWidth||0:o.rightWidth=0;else{var i=a.getBoundingClientRect();o.rightWidth=i.width||0}else o.rightWidth=0}function M(t,e){var o=t.instance,a=o.getState();C(o,e),a.disabled||(o.requestAnimationFrame((function(){o.removeClass("fui-swipe__action-ani"),e.callMethod("closeSwipe")})),a.x=a.left||0,function(t){var e=t.instance,o=e.getState();B(e);var a=t.touches[0];T&&x()&&(a=t),o.startX=a.clientX,o.startY=a.clientY}(t))}function $(t,e,o){t=t||0;var a=e.getState(),i=a.rightWidth;a.left=Math.min(Math.max(t,-i),0),e.requestAnimationFrame((function(){e.setStyle({transform:"translateX("+a.left+"px)","-webkit-transform":"translateX("+a.left+"px)"})}))}function A(t,e){var o=t.instance,a=o.getState();a.disabled||(!function(t){var e,o,a=t.instance.getState(),i=t.touches[0];T&&x()&&(i=t),a.deltaX=i.clientX-a.startX,a.deltaY=i.clientY-a.startY,a.offsetY=Math.abs(a.deltaY),a.offsetX=Math.abs(a.deltaX),a.direction=a.direction||(e=a.offsetX,o=a.offsetY,e>o&&e>10?"horizontal":o>e&&o>10?"vertical":"")}(t),"horizontal"===a.direction&&(t.preventDefault&&t.preventDefault(),$(a.x+a.deltaX,o)))}function X(t,e,o){var a=e.getState();a.leftWidth;var i=a.rightWidth,n="";a.open=a.open?a.open:"none",n="right"===t||!0===t?-i:0,a.open!==t&&(a.throttle=!0,o.callMethod("change",{open:t})),a.open=t,e.requestAnimationFrame((function(){e.addClass("fui-swipe__action-ani"),$(n,e)}))}function P(t,e){var o=t.instance,a=o.getState();a.disabled||function(t,e,o){var a=e.getState(),i=a.threshold||30;a.position;var n=a.open||"none",s=a.rightWidth;0!==a.deltaX?X("none"===n&&s>0&&-t>i||"none"!==n&&s>0&&s+t<i?"right":"none",e,o):X("none",e,o)}(a.left,o,e)}function B(t){var e=t.getState();e.direction="",e.deltaX=0,e.deltaY=0,e.offsetX=0,e.offsetY=0}"object"==typeof window&&(T=!0);var z=!1;const D={touchstart:M,touchmove:A,touchend:P,mousedown:function(t,e){T&&x()&&(M(t,e),z=!0)},mousemove:function(t,e){T&&x()&&z&&A(t)},mouseup:function(t,e){T&&x()&&(P(t,e),z=!1)},mouseleave:function(t,e){T&&x()&&(z=!1)},disabledChange:function(t,e,o,a){a.getState().disabled=t},thresholdChange:function(t,e,o,a){a.getState().threshold=t||30},showChange:function(t,e,o,a){var i=a.getState();C(a,o),t&&"none"!==t?X(t||"right",a,o):(i.left&&X("none",a,o),B(a))}},F=t=>{t.$wxs||(t.$wxs=[]),t.$wxs.push("handler"),t.mixins||(t.mixins=[]),t.mixins.push({beforeCreate(){this.handler=D}})},W=uni&&uni.$fui&&uni.$fui.color&&uni.$fui.color.danger||"#FF2B2B",Y={name:"fui-swipe-action",mixins:[k,{},{}],emits:["click","change"],props:{buttons:{type:Array,default:()=>[{text:"删除",background:W}]},size:{type:[Number,String],default:32},color:{type:String,default:"#fff"},show:{type:Boolean,default:!1},threshold:{type:[Number,String],default:30},disabled:{type:Boolean,default:!1},autoClose:{type:Boolean,default:!0},marginTop:{type:[Number,String],default:0},marginBottom:{type:[Number,String],default:0},param:{type:[Number,String],default:0}},beforeUnmount(){this.__beforeUnmount=!0,this.unInstall()},methods:{unInstall(){this.group&&this.group.children.forEach(((t,e)=>{t===this&&this.group.children.splice(e,1)}))},getParent(t="fui-swipeaction-group"){let e=this.$parent,o=e.$options.name;for(;o!==t;){if(e=e.$parent,!e)return!1;o=e.$options.name}return e}}};F(Y);const I=y(Y,[["render",function(m,p,g,w,b,_){const v=u,S=f;return t(),e(v,{class:"fui-swipe__action-wrap",style:l({marginTop:g.marginTop+"rpx",marginBottom:g.marginBottom+"rpx"})},{default:o((()=>[a(v,{class:"fui-swipe__action-inner",show:m.isShow,"change:show":m.handler.showChange,threshold:m.thresholdVal,"change:threshold":m.handler.thresholdChange,disabled:m.isDisabled,"change:disabled":m.handler.disabledChange,onTouchstart:m.handler.touchstart,onTouchmove:m.handler.touchmove,onTouchend:m.handler.touchend,onMousedown:m.handler.mousedown,onMousemove:m.handler.mousemove,onMouseup:m.handler.mouseup,onMouseleave:m.handler.mouseleave},{default:o((()=>[a(v,{class:"fui-swipe__action-left"},{default:o((()=>[i(m.$slots,"default",{},void 0,!0)])),_:3}),a(v,{class:"fui-swipe__action-right"},{default:o((()=>[i(m.$slots,"buttons",{},(()=>[(t(!0),n(s,null,r(g.buttons,((i,n)=>(t(),e(v,{class:"fui-swipe__action-btn",style:l({background:i.background}),key:n,onTouchstart:m.appTouchStart,onTouchend:t=>m.appTouchEnd(t,n,i),onClick:h((t=>m.handleClick(n,i)),["stop"])},{default:o((()=>[a(S,{class:"fui-swipe__action-text",style:l({fontSize:(i.size||g.size)+"rpx",color:i.color||g.color})},{default:o((()=>[c(d(i.text),1)])),_:2},1032,["style"])])),_:2},1032,["style","onTouchstart","onTouchend","onClick"])))),128))]),!0)])),_:3})])),_:3},8,["show","change:show","threshold","change:threshold","disabled","change:disabled","onTouchstart","onTouchmove","onTouchend","onMousedown","onMousemove","onMouseup","onMouseleave"])])),_:3},8,["style"])}],["__scopeId","data-v-63e8ea5b"]]);const q=y({name:"fui-swipeaction-group",data:()=>({}),created(){this.children=[]},methods:{reset(){},close(){this.children.forEach((t=>{t.isShow=!1}))},closeAuto(t){this.children.forEach((e=>{e!==t&&(e.isShow=!1)}))}}},[["render",function(a,n,s,r,l,h){const c=u;return t(),e(c,null,{default:o((()=>[i(a.$slots,"default")])),_:3})}]]);const R=y({data:()=>({scrollViewHeight:null,actionShow:[],swipeActionArr:[{currency:"USDT",network:"TRC20",address:"TRMtqugM99mKD5BP6FbGdMUf9yzdik34XmTRMtqugM99mKD5BP6FbGdMUf9yzdik34Xm",remark:"地址备注-地址备注"},{currency:"USDT",network:"TRC20",address:"TRMtqugM99mKD5BP6FbGdMUf9yzdik34XmTRMtqugM99mKD5BP6FbGdMUf9yzdik34Xm",remark:"地址备注-地址备注"}]}),computed:{...m(["userTheme"])},methods:{navInit(t){const e=t.height+t.statusBarHeight,o=p().windowHeight;this.scrollViewHeight=o-e},delectAction(t){this.swipeActionArr=this.swipeActionArr.splice(t,1)}}},[["render",function(i,h,m,p,y,k){const x=v(g("fui-icon"),_),T=v(g("fui-nav-bar"),S),C=f,M=u,$=b,A=v(g("fui-swipe-action"),I),X=v(g("fui-swipeaction-group"),q),P=w;return t(),e(M,{class:"page-warp bg-white","data-theme":i.userTheme},{default:o((()=>[a(T,{zIndex:"9",statusBar:!0,title:i.$t("address.text1"),background:"var(--background-primary)",color:"var(--content-primary)",onLeftClick:h[0]||(h[0]=t=>i.$mroute.back()),onInit:k.navInit},{default:o((()=>[a(x,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["title","onInit"]),a(P,{class:"scroll-warp",style:l(`height: ${y.scrollViewHeight}px`)},{default:o((()=>[a(M,{class:"scroll-container"},{default:o((()=>[a(X,null,{default:o((()=>[(t(!0),n(s,null,r(y.swipeActionArr,((n,s)=>(t(),e(A,{custom:!0,show:y.actionShow[s],"margin-bottom":45,key:s},{buttons:o((()=>[a(M,{class:"menu-warp bg-gray"},{default:o((()=>[a(M,{class:"delect-box bg-white",onClick:t=>k.delectAction(s)},{default:o((()=>[a(x,{name:"delete",size:"48",color:"var(--content-secondary)"})])),_:2},1032,["onClick"])])),_:2},1024)])),default:o((()=>[a(M,{class:"swipe-action"},{default:o((()=>[a(M,{class:"row"},{default:o((()=>[a(M,{class:"row-item"},{default:o((()=>[a(C,{class:"font-16 font-bold color-black"},{default:o((()=>[c(d(n.currency),1)])),_:2},1024),a(C,{class:"row-tag bg-gray font-11 color-gray"},{default:o((()=>[c(d(n.network),1)])),_:2},1024)])),_:2},1024),a($,{class:"more-icon",src:`/static/img/newContract/more-${i.userTheme}.png`,mode:"widthFix",onClick:t=>y.actionShow[s]=!y.actionShow[s]},null,8,["src","onClick"])])),_:2},1024),a(M,{class:"row"},{default:o((()=>[a(C,{class:"row-text font-11 color-gray"},{default:o((()=>[c(d(n.address),1)])),_:2},1024)])),_:2},1024),a(M,{class:"row"},{default:o((()=>[a(C,{class:"row-text font-12 color-black font-weight"},{default:o((()=>[c(d(n.remark),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1032,["show"])))),128))])),_:1})])),_:1})])),_:1},8,["style"]),a(M,{class:"toggle-button bg-white"},{default:o((()=>[a(M,{class:"button bg-black",onClick:h[1]||(h[1]=t=>i.$mroute.toAddAddress())},{default:o((()=>[a(C,{class:"font-14 font-weight color-white"},{default:o((()=>[c(d(i.$t("address.text2")),1)])),_:1})])),_:1})])),_:1})])),_:1},8,["data-theme"])}],["__scopeId","data-v-5778a261"]]);export{R as default};
