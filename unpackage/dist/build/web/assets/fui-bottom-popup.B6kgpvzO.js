import{u as e,q as o,w as s,v as a,D as t,C as p,E as r,br as u,y as i,t as d}from"./index-Crl9YJuv.js";import{_ as l}from"./_plugin-vue_export-helper.BCo6x5W8.js";const n=l({name:"fui-bottom-popup",emits:["close","toggle"],props:{show:{type:Boolean,default:!1},background:{type:String,default:"#fff"},radius:{type:[Number,String],default:24},zIndex:{type:[Number,String],default:996},maskClosable:{type:Boolean,default:!0},maskBackground:{type:String,default:"rgba(0,0,0,.6)"},safeArea:{type:Boolean,default:!0}},data:()=>({iphoneX:!1,isNvue:!1,isShow:!1,isAndroid:!1}),created(){},methods:{handleClose(e){this.maskClosable&&this.$emit("close",{})},stop(e,o){}}},[["render",function(l,n,f,c,_,m){const b=d;return _.isShow||!_.isNvue?(e(),o(b,{key:0,class:t(["fui-bottom__popup-wrap",{"fui-bottom__popwrap-show":f.show}]),style:p({zIndex:f.zIndex,background:f.maskBackground}),onClick:r(m.handleClose,["stop"]),onTouchmove:r(m.stop,["stop","prevent"]),ref:"fui_bp_mk_ani"},{default:s((()=>[a(b,{ref:"fui_bp_ani",class:t(["fui-bottom__popup",{"fui-bottom__popup-show":f.show,"fui-bp__safe-weex":_.iphoneX&&f.safeArea}]),style:p({borderTopLeftRadius:f.radius+"rpx",borderTopRightRadius:f.radius+"rpx",background:f.background}),onClick:n[0]||(n[0]=r((e=>m.stop(e,!0)),["stop"]))},{default:s((()=>[u(l.$slots,"default",{},void 0,!0)])),_:3},8,["class","style"])])),_:3},8,["class","style","onClick","onTouchmove"])):i("",!0)}],["__scopeId","data-v-e07057ce"]]);export{n as _};
