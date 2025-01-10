import{a6 as e,r as t,u as s,q as i,w as a,v as r,E as o,C as l,x as d,z as n,y as c,D as h,t as u,H as f,G as g,g as p,k as m,f as y,a7 as _,a8 as v,a9 as x}from"./index-Crl9YJuv.js";import{_ as w}from"./fui-icon.DR4EBh1k.js";import{r as b}from"./uni-app.es.DGAn-rK5.js";import{_ as S}from"./_plugin-vue_export-helper.BCo6x5W8.js";var C=0,k=0;function N(){if("object"!=typeof navigator)return!1;for(var e=navigator.userAgent,t=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],s=!0,i=0;i<t.length-1;i++)if(e.indexOf(t[i])>0){s=!1;break}return s}var I=!1;function P(e,t){var s=e.instance.getState(),i=e.touches[0]||e.changedTouches[0];I&&N()&&(i=e);var a=e.instance.getDataset();s.startX=i.pageX,C=+a.width,k=+a.swidth,s.disabled=1==+a.disabled}function B(e,t,s){if(s){var i=s.selectComponent(".fui-rv__slider"),a=s.selectComponent(".fui-rv__image");a&&i&&(0==e&&0==t?(i.removeClass("fui-rv__un-ani"),a.removeClass("fui-rv__un-ani"),i.addClass("fui-rv__rest-ani"),a.addClass("fui-rv__rest-ani")):(i.removeClass("fui-rv__rest-ani"),a.removeClass("fui-rv__rest-ani"),i.addClass("fui-rv__un-ani"),a.addClass("fui-rv__un-ani")),i.setStyle({transform:"translate3d("+e+"px,0,0)"}),a.setStyle({transform:"rotate("+t+"deg)"}))}}function F(e,t,s){e.preventDefault&&e.preventDefault();var i={},a={};if(I&&N()?(a=e,i=s.instance.getState()):(i=e.instance.getState(),a=e.touches[0]||e.changedTouches[0]),!i.disabled){var r=a.pageX,o=r-i.startX+(i.lastLeft||0),l=C-k;o=(o=o<0?0:o)>=l?l:o,i.startX=r,i.lastLeft=o,B(o,360/l*o,t)}}function T(e,t,s){var i={};if(!(i=I&&N()?s.instance.getState():e.instance.getState()).disabled){var a=360/(C-k)*i.lastLeft;t.callMethod("verify",{angle:a})}}"object"==typeof window&&(I=!0);var W=!1;const z={touchstart:P,touchmove:F,touchend:T,mousedown:function(e,t){I&&N()&&(P(e),W=!0,window.onmousemove=function(s){I&&N()&&W&&F(s,t,e)},window.onmouseup=function(s){I&&N()&&W&&(T(s,t,e),W=!1)})},slidereset:function(e,t,s,i){var a=i.getState();e>0&&(a.startX=0,a.lastLeft=0,a.disabled=!1,B(0,0,s))}},R=e=>{e.$wxs||(e.$wxs=[]),e.$wxs.push("parse"),e.mixins||(e.mixins=[]),e.mixins.push({beforeCreate(){this.parse=z}})},H={name:"fui-rotate-verify",mixins:[{},{}],emits:["verify"],props:{width:{type:[Number,String],default:600},background:{type:String,default:"#FFFFFF"},title:{type:String,default:"安全验证"},color:{type:String,default:"#B2B2B2"},size:{type:[Number,String],default:28},desc:{type:String,default:""},descrColor:{type:String,default:"#333333"},descrSize:{type:[Number,String],default:32},src:{type:String,default:""},imgWidth:{type:[Number,String],default:240},borderColor:{type:String,default:"#EEEEEE"},sliderBgColor:{type:String,default:"#FFFFFF"},closeColor:{type:String,default:"#B2B2B2"},slideColor:{type:String,default:"#333333"},passColor:{type:String,default:""},failColor:{type:String,default:""},zIndex:{type:[Number,String],default:996},maskBgColor:{type:String,default:"rgba(0,0,0,.6)"},maskClosable:{type:Boolean,default:!1}},watch:{imgWidth(e){this.imgW=this.getPx(e)},width(e){this.sliderWidth=this.getPx(Number(e)-64)}},computed:{getColor(){const e=uni&&uni.$fui&&uni.$fui.color;let t=this.passColor||e&&e.success||"#09BE4F",s=this.failColor||e&&e.danger||"#FF2B2B";return this.isPass?t:s}},data:()=>({isNvue:!1,isShow:!1,isPass:!1,disabled:!1,showRes:!1,sliderHeight:0,imgW:0,sliderWidth:0,resetNum:0}),created(){this.sliderWidth=this.getPx(Number(this.width)-64),this.sliderHeight=this.getPx(92),this.imgW=this.getPx(this.imgWidth)},methods:{getPx(t){let s=parseInt(e(Number(t)));return s%2==0?s:s+1},success(){this.isPass=!0},fail(){this.showRes=!0,this.isPass=!1,setTimeout((()=>{this.reset()}),300)},verify(e){this.disabled=!0,this.$emit("verify",e)},verifyRes(e,t,s,i){let a=!1;(Math.abs(e+t-360)<=s||Math.abs(e+t)<=s)&&(a=!0),i&&i(a)},maskClose(){this.maskClosable&&this.closeVerify()},closeVerify(){this.reset(),this.isShow=!1},show(){this.isShow=!0},reset(){this.resetNum+=1,this.isPass=!1,this.disabled=!1,this.showRes=!1},stop(){}}};R(H);const M=S(H,[["render",function(e,p,m,y,_,v){const x=b(t("fui-icon"),w),S=u,C=f,k=g;return _.isShow||!_.isNvue?(s(),i(S,{key:0,class:h(["fui-rotate__verify-wrap",{"fui-rv__wrap-show":_.isShow}]),style:l({background:m.maskBgColor,zIndex:m.zIndex}),onClick:v.maskClose,onTouchmove:o(v.stop,["stop","prevent"]),ref:"fui_rv_ani"},{default:a((()=>[r(S,{class:"fui-rotate__verify",style:l({width:m.width+"rpx",background:m.background}),onClick:o(v.stop,["stop"])},{default:a((()=>[r(S,{class:"fui-rv__close",onClick:o(v.closeVerify,["stop"])},{default:a((()=>[r(x,{name:"close",color:m.closeColor},null,8,["color"])])),_:1},8,["onClick"]),r(C,{class:"fui-rv__title",style:l({color:m.color,fontSize:m.size+"rpx"})},{default:a((()=>[d(n(m.title),1)])),_:1},8,["style"]),r(C,{class:"fui-rv__descr",style:l({color:m.descrColor,fontSize:m.descrSize+"rpx"})},{default:a((()=>[d(n(m.desc),1)])),_:1},8,["style"]),r(S,{class:"fui-rv__image-box",style:l({width:_.imgW+"px",height:_.imgW+"px",borderRadius:_.isNvue?_.imgW+"px":"50%"})},{default:a((()=>[r(k,{class:"fui-rv__image",src:m.src,style:l({width:_.imgW+"px",height:_.imgW+"px",borderRadius:_.isNvue?_.imgW+"px":"50%"}),ref:"imgRef"},null,8,["src","style"]),_.showRes||_.isPass?(s(),i(S,{key:0,class:"fui-rv__result",style:l({width:_.imgW+"px",height:_.imgW+"px",borderRadius:_.isNvue?_.imgW+"px":"50%"})},{default:a((()=>[r(x,{name:_.isPass?"check":"close",size:96,color:v.getColor},null,8,["name","color"])])),_:1},8,["style"])):c("",!0)])),_:1},8,["style"]),r(S,{class:"fui-rv__slidebar",style:l({width:_.sliderWidth+"px",height:_.sliderHeight+"px",borderColor:m.borderColor,borderRadius:_.sliderHeight+"px"})},{default:a((()=>[r(S,{class:"fui-rv__slider",style:l({width:_.sliderHeight+"px",height:_.sliderHeight-2+"px",background:m.sliderBgColor,borderColor:m.borderColor,borderRadius:_.isNvue?_.sliderHeight+"px":"50%"}),"change:prop":e.parse.slidereset,prop:_.resetNum,"data-width":_.sliderWidth,"data-swidth":_.sliderHeight,"data-disabled":_.isPass||_.disabled||!_.isShow?1:0,onTouchstart:e.parse.touchstart,onTouchmove:e.parse.touchmove,onTouchend:e.parse.touchend,onMousedown:e.parse.mousedown},{default:a((()=>[r(x,{name:"slide",size:60,color:m.slideColor},null,8,["color"])])),_:1},8,["style","change:prop","prop","data-width","data-swidth","data-disabled","onTouchstart","onTouchmove","onTouchend","onMousedown"])])),_:1},8,["style"])])),_:1},8,["style","onClick"])])),_:1},8,["class","style","onClick","onTouchmove"])):c("",!0)}],["__scopeId","data-v-3f1387e1"]]);var X=300,$=32,A=3,j=0,L=0,D=1;function E(){if("object"!=typeof navigator)return!1;for(var e=navigator.userAgent,t=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],s=!0,i=0;i<t.length-1;i++)if(e.indexOf(t[i])>0){s=!1;break}return s}var V=!1;function O(e){var t=X-j-44,s=e/(X-$)*t;return s>t?t:s}function G(e,t){if(t&&t.selectComponent(".fui-sc__slot-box")){var s=O(e),i=t.selectComponent(".fui-sc__slider"),a=t.selectComponent(".fui-sc__slot-box");i&&a&&(0==e?(i.removeClass("fui-sc__un-ani"),a.removeClass("fui-sc__un-ani"),i.addClass("fui-sc__reset-ani"),a.addClass("fui-sc__reset-ani")):(i.removeClass("fui-sc__reset-ani"),a.removeClass("fui-sc__reset-ani"),i.addClass("fui-sc__un-ani"),a.addClass("fui-sc__un-ani")),i.setStyle({transform:"translate3d("+e+"px,0,0)"}),a.setStyle({transform:"translate3d("+s+"px,0,0)"}))}}function Y(e,t){var s=e.instance.getState(),i=e.touches[0]||e.changedTouches[0];V&&E()&&(i=e);var a=e.instance.getDataset();s.startX=i.pageX,D=+a.type,j=+a.start,L=+a.end,$=+a.swidth,A=+a.range,X=+a.width,s.disabled=1==+a.disabled}function q(e,t,s){e.preventDefault&&e.preventDefault();var i={},a={};if(V&&E()?(a=e,i=s.instance.getState()):(i=e.instance.getState(),a=e.touches[0]||e.changedTouches[0]),!i.disabled){var r=a.pageX,o=r-i.startX+(i.lastLeft||0),l=X-$;o=(o=o<0?0:o)>=l?l:o,i.startX=r,i.lastLeft=o,G(o,t)}}function Q(e,t,s){var i={};if(!(i=V&&E()?s.instance.getState():e.instance.getState()).disabled){var a=O(i.lastLeft);if(1==D){var r=L-j;Math.abs(a-r)<=A?(i.disabled=!0,t.callMethod("success")):(i.startX=0,i.lastLeft=0,i.disabled=!1,G(0,t),t.callMethod("fail"))}else t.callMethod("verify",{slip:a})}}"object"==typeof window&&(V=!0);var J=!1;const K={touchstart:Y,touchmove:q,touchend:Q,mousedown:function(e,t){V&&E()&&(Y(e),J=!0,window.onmousemove=function(s){V&&E()&&J&&q(s,t,e)},window.onmouseup=function(s){V&&E()&&J&&(Q(s,t,e),J=!1)})},slidereset:function(e,t,s,i){var a=i.getState();e>0&&(a.startX=0,a.lastLeft=0,a.disabled=!1,G(0,s))}},U=e=>{e.$wxs||(e.$wxs=[]),e.$wxs.push("parse"),e.mixins||(e.mixins=[]),e.mixins.push({beforeCreate(){this.parse=K}})},Z={name:"fui-slider-captcha",mixins:[{},{}],emits:["success","fail","verify","init"],props:{type:{type:[Number,String],default:1},range:{type:[Number,String],default:3},location:{type:Object,default:()=>({})},src:{type:String,default:""},imageType:{type:[Number,String],default:1},width:{type:[Number,String],default:550},height:{type:[Number,String],default:280},background:{type:String,default:"#FFFFFF"},title:{type:String,default:"安全验证"},desc:{type:String,default:"拖动下方滑块完成拼图"},color:{type:String,default:"#B2B2B2"},size:{type:[Number,String],default:28},descrColor:{type:String,default:"#333333"},descrSize:{type:[Number,String],default:32},closeColor:{type:String,default:"#B2B2B2"},sliderBgColor:{type:String,default:""},slideColor:{type:String,default:"#FFFFFF"},zIndex:{type:[Number,String],default:996},maskBgColor:{type:String,default:"rgba(0,0,0,.6)"},maskClosable:{type:Boolean,default:!1}},watch:{src(e,t){1==this.type?e&&this.handleImage():void 0!==this.location.x&&e&&this.handleImage()},location(e){2==this.type&&e&&(this.x=e.x||10,this.y=e.y||10,this.x1=e.x1||160,(this.x+this.y+this.x1)%2==0?this.circle=!0:this.circle=!1,this.src&&this.handleImage())}},computed:{getSliderBgColor(){return this.sliderBgColor}},data(){let e=p();const t=`fui_sc_${Math.ceil(1e6*Math.random()).toString(36)}`;let s=2;return s=1==e.pixelRatio?2:e.pixelRatio,{pixelRatio:s,isNvueAndroid:!1,canvasId:t,isNvue:!1,isShow:!1,w:320,h:160,sliderH:0,imgSrc:"",slotSrc:"",x:0,y:0,x1:0,circle:!1,resetNum:0,isPass:!1,disabled:!1,times:0}},created(){this.w=this.getPx(this.width),this.h=this.getPx(this.height),this.sliderH=this.getPx(64),this.$emit("init",{width:this.w,height:this.h,cutGraphWidth:44})},mounted(){this.$nextTick((()=>{setTimeout((()=>{1==this.type?this.src&&this.handleImage():void 0!==this.location.x&&this.src&&this.handleImage()}),50)}))},methods:{getPx(t){let s=parseInt(e(Number(t)));return s%2==0?s:s+1},getImage(e,t){m({url:e,success:e=>{t&&t(e.tempFilePath)},fail:e=>{t&&t(!1)}})},getImagebyBase64(e,t){Math.ceil(1e6*Math.random()).toString(36),t&&t(e)},toast(e){y({title:e,icon:"none"})},getRandom(e,t){let s=Array.from(new Array(t+1).keys()).slice(e);return s[Math.floor(Math.random()*s.length)]},getXY(){this.x=this.getRandom(20,this.w/2-44),this.y=this.getRandom(20,this.h-60),this.x1=this.getRandom(this.w/2+44,this.w-60),(this.x+this.y+this.x1)%2==0?this.circle=!0:this.circle=!1},darwImage(e){let t=_(this.canvasId,this);t.drawImage(e,0,0,this.w,this.h),t.draw(!1,(()=>{setTimeout((()=>{v({canvasId:this.canvasId,x:this.x1,y:this.y,width:44,height:44,success:e=>{this.slotSrc=e.tempFilePath},fail:e=>{this.toast("图片资源处理失败~")}},this)}),200)}))},handleImage(){this.slotSrc="",this.times=0,1==this.type&&this.getXY(),this.reset(),1==this.imageType?this.getImage(this.src,(e=>{e?(this.imgSrc=e,this.darwImage(e)):this.toast("图片资源处理失败~")})):2==this.imageType?this.getImagebyBase64(this.src,(e=>{e?(this.imgSrc=e,this.darwImage(e)):this.toast("图片资源处理失败~")})):(this.imgSrc=this.src,this.darwImage(this.imgSrc))},reset(){this.resetNum+=1,this.isPass=!1,this.disabled=!1},verify(e){this.disabled=!0,this.$emit("verify",{x:this.x,x1:this.x1,slipDistance:e.slip})},success(){this.isPass=!0,1==this.type&&this.$emit("success",{})},fail(){1==this.type&&(this.times+=1,this.$emit("fail",{times:this.times})),this.reset()},maskClose(){this.maskClosable&&this.closeVerify()},closeVerify(){this.reset(),this.isShow=!1},show(e){e&&(1==this.type?this.src&&this.handleImage():void 0!==this.location.x&&this.src&&this.handleImage()),this.isShow=!0},stop(){}}};U(Z);const ee=S(Z,[["render",function(e,p,m,y,_,v){const S=x,C=f,k=g,N=u,I=b(t("fui-icon"),w);return _.isShow||!_.isNvue?(s(),i(N,{key:0,class:h(["fui-slider__captcha-wrap",{"fui-sc__wrap-show":_.isShow}]),style:l({background:m.maskBgColor,zIndex:m.zIndex}),onClick:v.maskClose,onTouchmove:o(v.stop,["stop","prevent"]),ref:"fui_sc_ani"},{default:a((()=>[_.canvasId?(s(),i(S,{key:0,class:"fui-sc__canvas","canvas-id":_.canvasId,id:_.canvasId,style:l({width:_.w+"px",height:_.h+"px"})},null,8,["canvas-id","id","style"])):c("",!0),r(N,{class:"fui-slider__captcha",style:l({background:m.background}),onClick:o(v.stop,["stop"])},{default:a((()=>[r(C,{class:"fui-sc__title",style:l({width:_.w+"px",color:m.color,fontSize:m.size+"rpx"})},{default:a((()=>[d(n(m.title),1)])),_:1},8,["style"]),r(C,{class:"fui-sc__descr",style:l({width:_.w+"px",color:m.descrColor,fontSize:m.descrSize+"rpx"})},{default:a((()=>[d(n(m.desc),1)])),_:1},8,["style"]),r(N,{class:"fui-sc__img-box",style:l({width:_.w+"px"})},{default:a((()=>[m.src?(s(),i(k,{key:0,class:"fui-sc__img",src:m.src,style:l({width:_.w+"px",height:_.h+"px"})},null,8,["src","style"])):c("",!0),_.slotSrc?(s(),i(N,{key:1,class:h(["fui-sc__slot",{"fui-sc__slot-circle":_.circle,"fui-sc__slot-bs":!_.isNvueAndroid}]),style:l({left:_.x1+"px",top:_.y+"px"})},null,8,["class","style"])):c("",!0),r(N,{class:h(["fui-sc__slot-box",{"fui-sc__slot-circle":_.circle,"fui-sc__sb-hidden":!_.slotSrc,"fui-sc__sb-bs":!_.isNvueAndroid}]),ref:"imgRef",style:l({left:_.x+"px",top:_.y+"px"})},{default:a((()=>[r(k,{src:_.slotSrc,class:h(["fui-sc__slot-img",{"fui-sc__slot-circle":_.circle&&_.isNvue,"fui-sc__img-border":_.isNvueAndroid}])},null,8,["src","class"])])),_:1},8,["class","style"])])),_:1},8,["style"]),r(N,{class:"fui-sc__sliderbar",style:l({width:_.w+"px",height:_.sliderH+"px"})},{default:a((()=>[r(N,{class:"fui-sc__bar",style:l({width:_.w+"px",height:_.sliderH/2+"px",borderRadius:_.sliderH+"px"})},null,8,["style"]),r(N,{class:h(["fui-sc__slider",{"fui-sc__slider-bg":!v.getSliderBgColor}]),style:l({width:2*_.sliderH+"px",height:_.sliderH+"px",borderRadius:_.sliderH+"px",background:v.getSliderBgColor}),"change:prop":e.parse.slidereset,prop:_.resetNum,"data-type":m.type,"data-width":_.w,"data-start":_.x,"data-end":_.x1,"data-swidth":2*_.sliderH,"data-disabled":!_.slotSrc||_.isPass||_.disabled||!_.isShow?1:0,"data-range":m.range,onTouchstart:e.parse.touchstart,onTouchmove:e.parse.touchmove,onTouchend:e.parse.touchend,onMousedown:e.parse.mousedown},{default:a((()=>[r(I,{name:"slide",size:56,color:m.slideColor},null,8,["color"])])),_:1},8,["class","style","change:prop","prop","data-type","data-width","data-start","data-end","data-swidth","data-disabled","data-range","onTouchstart","onTouchmove","onTouchend","onMousedown"])])),_:1},8,["style"]),r(N,{class:"fui-sc__close",onClick:o(v.closeVerify,["stop"])},{default:a((()=>[r(I,{name:"close",color:m.closeColor},null,8,["color"])])),_:1},8,["onClick"])])),_:1},8,["style","onClick"])])),_:1},8,["class","style","onClick","onTouchmove"])):c("",!0)}],["__scopeId","data-v-3e324f7f"]]);export{M as _,ee as f};
