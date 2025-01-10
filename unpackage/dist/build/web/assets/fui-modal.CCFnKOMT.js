import{u as t,q as e,w as a,v as o,C as l,x as i,z as s,y as r,D as d,br as n,A as u,B as c,F as p,E as f,H as m,t as _}from"./index-Crl9YJuv.js";import{_ as b}from"./_plugin-vue_export-helper.BCo6x5W8.js";const y=b({name:"fui-modal",emits:["click","cancel"],props:{show:{type:Boolean,default:!1},title:{type:String,default:""},size:{type:[Number,String],default:34},color:{type:String,default:"#333"},descr:{type:String,default:""},descrSize:{type:[Number,String],default:28},descrColor:{type:String,default:"#7F7F7F"},buttons:{type:Array,default:()=>[{text:"取消",plain:!0},{text:"确定"}]},direction:{type:String,default:"row"},radius:{type:[Number,String],default:16},width:{type:[Number,String],default:640},background:{type:String,default:"#FFFFFF"},boxRadius:{type:[Number,String],default:16},padding:{type:[Number,String],default:32},maskBackground:{type:String,default:"rgba(0,0,0,.6)"},maskClosable:{type:Boolean,default:!1},zIndex:{type:Number,default:996}},data:()=>({isShow:!1,isNvue:!1,vals:[]}),computed:{getWidth(){return"width:"+(Number(this.width)-60)+"rpx"},primaryColor(){const t=uni&&uni.$fui&&uni.$fui.color;return t&&t.primary||"#465CFF"}},watch:{show:{handler(t){t?this.open():this.close()},immediate:!0},buttons(t){this.initData(t)}},created(){this.initData(this.buttons)},methods:{initData(t){t&&t.length>0&&("object"!=typeof t[0]&&(t=t.map((t=>({text:t})))),this.vals=t)},stop(){},closeModal(){this.maskClosable&&this.$emit("cancel",{})},handleClick(t,e){this.isShow&&this.$emit("click",{index:Number(e),...this.vals[e]})},open(){this.isShow=!0},close(t){this.isShow=!1}}},[["render",function(b,y,h,g,k,x){const S=m,w=_;return k.isShow||!k.isNvue?(t(),e(w,{key:0,class:d(["fui-modal__wrap",{"fui-modal__fadein":k.isShow}]),style:l({background:h.maskBackground,zIndex:h.zIndex}),onClick:x.closeModal,onTouchmove:f(x.stop,["stop","prevent"]),ref:"fui_modal_ani"},{default:a((()=>[o(w,{class:"fui-modal__inner",style:l({width:h.width+"rpx",background:h.background,borderRadius:h.boxRadius+"rpx",paddingTop:h.padding+"rpx",paddingBottom:h.padding+"rpx"}),onClick:f(x.stop,["stop"])},{default:a((()=>[h.title&&!0!==h.title?(t(),e(S,{key:0,class:"fui-modal__title",style:l({fontSize:h.size+"rpx",color:h.color})},{default:a((()=>[i(s(h.title),1)])),_:1},8,["style"])):r("",!0),h.descr&&!0!==h.descr?(t(),e(S,{key:1,class:d(["fui-modal__descr",{"fui-modal__descr-pt":!h.title}]),style:l({fontSize:h.descrSize+"rpx",color:h.descrColor})},{default:a((()=>[i(s(h.descr),1)])),_:1},8,["style","class"])):r("",!0),n(b.$slots,"default",{},void 0,!0),k.vals.length>0?(t(),e(w,{key:2,class:d(["fui-modal__btn-wrap",{"fui-modal__btn-row":"row"===h.direction}]),style:l(x.getWidth)},{default:a((()=>[(t(!0),u(p,null,c(k.vals,((r,n)=>(t(),e(w,{class:d(["fui-modal__button",{"fui-model__button-full":"row"===h.direction,"fui-modal__button-col":"column"===h.direction&&n!==k.vals.length-1,"fui-modal__button-bg":!r.plain&&!r.background,"fui-modal__button-border":r.plain,"fui-modal__button-bc":r.plain&&!r.background}]),style:l({borderRadius:h.radius+"rpx",background:r.plain?"transparent":r.background||x.primaryColor,borderColor:r.plain?r.background||x.primaryColor:"transparent"}),key:n},{default:a((()=>[o(S,{class:d(["fui-modal__button-inner",{"fui-modal__button-color":!r.color&&r.plain}]),style:l({color:r.color||(r.plain?x.primaryColor:"#fff"),borderRadius:h.radius+"rpx"}),onClick:f((t=>x.handleClick(t,n)),["stop"])},{default:a((()=>[i(s(r.text),1)])),_:2},1032,["class","style","onClick"])])),_:2},1032,["class","style"])))),128))])),_:1},8,["style","class"])):r("",!0)])),_:3},8,["style","onClick"])])),_:3},8,["style","class","onClick","onTouchmove"])):r("",!0)}],["__scopeId","data-v-27855efd"]]);export{y as _};
