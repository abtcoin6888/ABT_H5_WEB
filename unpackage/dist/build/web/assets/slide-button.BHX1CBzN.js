import{u as t,q as e,w as r,A as a,B as i,F as d,v as n,C as s,t as o,x as l,z as u,H as p}from"./index-CvJkP8r7.js";import{_ as g}from"./_plugin-vue_export-helper.BCo6x5W8.js";const h=g({name:"slide-button",props:{options:{type:Array,default:()=>[]},width:{type:[Number,String],default:""},height:{type:[Number,String],default:68},padding:{type:[Number,String],default:8},activeColor:{type:String,default:"var(--color-title-black)"},background:{type:String,default:"var(--color-gray-bg)"},slideBackground:{type:String,default:"var(--white)"},fontWeight:{type:[Number,String],default:500},color:{type:String,default:"var(--color-text-dark-gray)"},size:{type:[Number,String],default:26},radius:{type:[Number,String],default:10},current:{type:Number,default:0},keys:{type:String,default:"symbol"}},methods:{switchChange(t,e,r){this.current!=e&&this.$emit("change",{index:e,name:t})}}},[["render",function(g,h,c,y,f,b){const x=p,m=o;return t(),e(m,{class:"slide-button light",style:s({width:c.width+"rpx",height:c.height+"rpx",padding:c.padding+"rpx","border-radius":c.radius+"rpx",background:c.background})},{default:r((()=>[(t(!0),a(d,null,i(c.options,((a,i)=>(t(),e(m,{class:"slide-btn-box",key:i,style:s({width:c.width/c.options.length-2*c.padding+"rpx",height:c.height-2*c.padding+"rpx"}),onClick:t=>b.switchChange(a,i,t)},{default:r((()=>[n(x,{ref_for:!0,ref:"context",class:"context",style:s({color:c.current===i?c.activeColor:c.color,"font-size":c.size+"rpx","font-weight":c.current===i?c.fontWeight:500})},{default:r((()=>[l(u(a&&a.symbol?a.symbol:a),1)])),_:2},1032,["style"])])),_:2},1032,["style","onClick"])))),128)),n(m,{class:"slide-move-block",style:s({width:c.width/c.options.length-2*c.padding+"rpx",height:c.height-2*c.padding+"rpx","border-radius":c.radius+"rpx","--translateX":c.padding+"rpx",left:c.width/c.options.length*c.current+"rpx",background:c.slideBackground})},null,8,["style"])])),_:1},8,["style"])}],["__scopeId","data-v-85a20d8b"]]);export{h as _};
