import{u as t,q as o,w as e,v as s,C as l,x as a,z as i,y as n,D as u,br as r,A as c,B as d,F as f,E as _,H as p,t as y}from"./index-CGNx3rpF.js";import{_ as g}from"./_plugin-vue_export-helper.BCo6x5W8.js";const k=uni&&uni.$fui&&uni.$fui.color&&uni.$fui.color.primary||"#465CFF";const m=g({name:"fui-dialog",emits:["click","close"],props:{show:{type:Boolean,default:!1},title:{type:String,default:"温馨提示"},color:{type:String,default:"#333"},content:{type:String,default:""},contentColor:{type:String,default:"#7F7F7F"},buttons:{type:Array,default:()=>[{text:"取消"},{text:"确定",color:k}]},background:{type:String,default:"#fff"},radius:{type:[Number,String],default:24},maskBackground:{type:String,default:"rgba(0,0,0,.6)"},maskClosable:{type:Boolean,default:!0}},data:()=>({visible:!1,isNvue:!1}),methods:{handleClick(t){this.$emit("click",{index:t,...this.buttons[t]})},maskClose(){this.maskClosable&&this.$emit("close",{})},stop(){}}},[["render",function(g,k,m,b,C,h){const v=p,x=y;return C.visible||!C.isNvue?(t(),o(x,{key:0,onClick:h.maskClose,style:l({background:m.maskBackground}),class:u(["fui-dialog__wrap",{"fui-wrap__show":m.show}]),onTouchmove:_(h.stop,["stop","prevent"]),ref:"fui_dialog_ani"},{default:e((()=>[s(x,{class:"fui-dialog__inner",style:l({background:m.background,borderRadius:m.radius+"rpx"}),onClick:_(h.stop,["stop"])},{default:e((()=>[m.title?(t(),o(v,{key:0,class:"fui-dialog__title",style:l({color:m.color})},{default:e((()=>[a(i(m.title),1)])),_:1},8,["style"])):n("",!0),s(x,{class:u(["fui-dialog__body",{"fui-dialog__mtop":!m.title}])},{default:e((()=>[m.content?(t(),o(v,{key:0,class:"fui-dialog__descr",style:l({color:m.contentColor})},{default:e((()=>[a(i(m.content),1)])),_:1},8,["style"])):n("",!0),r(g.$slots,"default",{},void 0,!0)])),_:3},8,["class"]),s(x,{class:"fui-dialog__footer"},{default:e((()=>[(t(!0),c(f,null,d(m.buttons,((s,n)=>(t(),o(v,{key:n,style:l({color:s.color||"#333333"}),class:u(["fui-dialog__btn",{"fui-dialog__btn-first":0===n}]),onClick:t=>h.handleClick(n)},{default:e((()=>[a(i(s.text),1)])),_:2},1032,["style","class","onClick"])))),128))])),_:1})])),_:3},8,["style","onClick"])])),_:3},8,["onClick","style","class","onTouchmove"])):n("",!0)}],["__scopeId","data-v-246f627d"]]);export{m as _};
