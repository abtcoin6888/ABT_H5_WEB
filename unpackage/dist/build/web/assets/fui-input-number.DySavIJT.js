import{u as e,q as t,w as i,v as u,D as l,C as s,y as a,br as n,t as r,W as d}from"./index-Crl9YJuv.js";import{_ as m}from"./_plugin-vue_export-helper.BCo6x5W8.js";const p=m({name:"fui-input-number",emits:["change","update:modelValue","input","blur"],props:{modelValue:{type:[Number,String],default:1},type:{type:String,default:"number"},min:{type:Number,default:1},max:{type:Number,default:99},step:{type:Number,default:1},disabled:{type:Boolean,default:!1},signWidth:{type:[Number,String],default:24},signColor:{type:String,default:"#181818"},height:{type:[Number,String],default:40},width:{type:[Number,String],default:80},radius:{type:[Number,String],default:8},size:{type:Number,default:26},backgroundColor:{type:String,default:"#EEEEEE"},color:{type:String,default:"#181818"},margin:{type:[Number,String],default:16},custom:{type:Boolean,default:!1},index:{type:[Number,String],default:0},params:{type:[Number,String],default:0}},created(){this.inputValue=this.getValue(this.modelValue)},computed:{getMinHeight(){return Number(this.height)-8+"rpx"}},data:()=>({inputValue:0,oldValue:0,isNvue:!1}),watch:{modelValue(e){this.inputValue=this.getValue(e)},inputValue(e,t){if(!isNaN(Number(e))&&Number(e)!==Number(t)){const t=this.getValue(+e);this.oldValue=t,this.$emit("change",{value:t,index:this.index,params:this.params}),this.$emit("input",t),this.$emit("update:modelValue",+t)}}},methods:{getScale(e,t){let i=1,u=1;return Number.isInteger(t)||(i=Math.pow(10,(t+"").split(".")[1].length)),Number.isInteger(e)||(u=Math.pow(10,(e+"").split(".")[1].length)),Math.max(i,u)},getValue(e){return(e=Number(e))<this.min?e=this.min:e>this.max&&(e=this.max),e},calcNum:function(e){if(this.disabled||this.inputValue==this.min&&"reduce"===e||this.inputValue==this.max&&"plus"===e)return;const t=this.getScale(Number(this.inputValue),Number(this.step));let i=Number(this.inputValue)*t,u=this.step*t;"reduce"===e?i-=u:"plus"===e&&(i+=u);let l=Number((i/t).toFixed(String(t).length-1));l<this.min?l=this.min:l>this.max&&(l=this.max),this.inputValue=String(l)},plus:function(){this.calcNum("plus")},minus:function(){this.calcNum("reduce")},blur:function(e){let t=e.detail.value;t&&!isNaN(Number(t))?(~t.indexOf(".")&&Number.isInteger(this.step)&&Number.isInteger(Number(t))&&(t=t.split(".")[0]),t=this.getValue(t)):t=this.oldValue,setTimeout((()=>{e.detail.value=t,this.$emit("blur",e),this.inputValue=t}),"text"===this.type?100:0)}}},[["render",function(m,p,o,h,g,b){const c=r,f=d;return e(),t(c,{class:"fui-input__number"},{default:i((()=>[u(c,{class:l(["fui-number__minus",[o.disabled||o.min>=g.inputValue?"fui-number__disabled":""]]),onClick:b.minus,style:s({minHeight:b.getMinHeight})},{default:i((()=>[o.custom?a("",!0):(e(),t(c,{key:0,class:"fui-minus__sign",style:s({backgroundColor:o.signColor,width:o.signWidth+"rpx"})},null,8,["style"])),n(m.$slots,"default",{},void 0,!0)])),_:3},8,["class","onClick","style"]),u(f,{type:o.type,modelValue:g.inputValue,"onUpdate:modelValue":p[0]||(p[0]=e=>g.inputValue=e),disabled:o.disabled,onBlur:b.blur,class:"fui-number__input",style:s({color:o.color,fontSize:o.size+"rpx",backgroundColor:o.backgroundColor,height:o.height+"rpx",minHeight:o.height+"rpx",width:o.width+"rpx",borderRadius:o.radius+"rpx",marginLeft:o.margin+"rpx",marginRight:o.margin+"rpx"})},null,8,["type","modelValue","disabled","onBlur","style"]),u(c,{class:l(["fui-number__plus",[o.disabled||g.inputValue>=o.max?"fui-number__disabled":""]]),style:s({minWidth:o.signWidth+"rpx",minHeight:o.signWidth+"rpx"}),onClick:b.plus},{default:i((()=>[o.custom?a("",!0):(e(),t(c,{key:0,class:"fui-plus__sign-col",style:s({height:o.signWidth+"rpx",backgroundColor:o.signColor,left:g.isNvue?o.signWidth/2+"rpx":"50%"})},null,8,["style"])),o.custom?a("",!0):(e(),t(c,{key:1,class:"fui-plus__sign-row",style:s({width:o.signWidth+"rpx",backgroundColor:o.signColor})},null,8,["style"])),n(m.$slots,"plus",{},void 0,!0)])),_:3},8,["style","class","onClick"])])),_:3})}],["__scopeId","data-v-7f1bf214"]]);export{p as _};
