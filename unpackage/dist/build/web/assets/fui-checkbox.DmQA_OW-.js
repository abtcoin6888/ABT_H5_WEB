import{u as e,q as t,w as o,C as a,y as l,v as r,D as s,E as i,t as c,bs as h}from"./index-CvJkP8r7.js";import{_ as u}from"./_plugin-vue_export-helper.BCo6x5W8.js";const d=u({name:"fui-checkbox",emits:["change"],props:{value:{type:String,default:""},checked:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},color:{type:String,default:""},borderColor:{type:String,default:"#ccc"},borderRadius:{type:String,default:"50%"},isCheckMark:{type:Boolean,default:!1},checkMarkColor:{type:String,default:"#fff"},scaleRatio:{type:[Number,String],default:1}},created(){this.val=this.checked,this.group=this.getParent(),this.group&&(this.group.childrens.push(this),this.group.value&&this.group.value.length>0&&(this.val=this.group.value.includes(this.value)),this.group.modelValue&&this.group.modelValue.length>0&&(this.val=this.group.modelValue.includes(this.value))),this.label=this.getParent("fui-label"),this.label&&this.label.childrens.push(this)},watch:{checked(e){this.val=e},val(e){this.group&&this.group.changeValue(this.val,this)}},computed:{getColor(){return this.color}},data:()=>({val:!1,isNvue:!1}),methods:{getBackgroundColor(e,t){let o=e?this.getColor:"#fff";return t&&(o="transparent"),o},getBorderColor(e,t){let o=e?this.getColor:this.borderColor;return t&&(o="transparent"),o},checkboxChange(e){this.disabled||(this.val=!this.val,this.$emit("change",{checked:this.val,value:this.value}))},getParent(e="fui-checkbox-group"){let t=this.$parent,o=t.$options.name;for(;o!==e;){if(t=t.$parent,!t)return!1;o=t.$options.name}return t},labelClick(){this.checkboxChange()}}},[["render",function(u,d,n,g,p,k){const b=c,v=h;return e(),t(b,{class:s(["fui-checkbox__input",{"fui-checkbox__disabled":n.disabled,"fui-checkbox__color":!k.getColor&&p.val&&!n.isCheckMark}]),style:a({backgroundColor:k.getBackgroundColor(p.val,n.isCheckMark),borderColor:k.getBorderColor(p.val,n.isCheckMark),zoom:p.isNvue?1:n.scaleRatio,transform:`scale(${p.isNvue?n.scaleRatio:1})`,borderRadius:n.borderRadius}),onClick:i(k.checkboxChange,["stop"])},{default:o((()=>[p.val?(e(),t(b,{key:0,class:"fui-check__mark",style:a({borderBottomColor:n.checkMarkColor,borderRightColor:n.checkMarkColor})},null,8,["style"])):l("",!0),r(v,{class:"fui-checkbox__hidden",style:{opacity:"0",position:"absolute"},color:k.getColor,disabled:n.disabled,value:n.value,checked:p.val},null,8,["color","disabled","value","checked"])])),_:1},8,["class","style","onClick"])}],["__scopeId","data-v-0733105c"]]);export{d as _};
