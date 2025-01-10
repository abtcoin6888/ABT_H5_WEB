import{g as e,bl as t,u as i,q as s,w as a,A as n,B as o,F as l,C as r,t as d,D as f}from"./index-Crl9YJuv.js";import{_ as h}from"./_plugin-vue_export-helper.BCo6x5W8.js";const u=h({name:"fui-skeleton",emits:["change"],props:{outerClass:{type:String,default:"fui-skeleton"},selector:{type:Array,default:()=>["fui-round","fui-rect"]},background:{type:String,default:"transparent"},preloadList:{type:Array,default:()=>[]},active:{type:Boolean,default:!0},theme:{type:String,default:"light"}},data:()=>({isNvue:!1,stop:!1,elList:[],height:0}),created(){const t=e();this.height=t.windowHeight,this.preloadList&&this.preloadList.length>0&&(this.elList=this.preloadList)},mounted(){this.$nextTick((()=>{this.nodesRef(this.outerClass).then((e=>{e&&e[0]&&(this.height=e[0].height)})),this.preloadList&&0!==this.preloadList.length||this.selectorQuery()}))},methods:{async selectorQuery(){let e=this.selector||[],t=[];for(let i of e)await this.nodesRef(i).then((e=>{e.map((e=>{e.type=-1===i.indexOf("round")?"rect":"round"})),t=t.concat(e)}));this.elList=t,this.$emit("change",{nodes:t})},nodesRef:async e=>await new Promise(((i,s)=>{t().selectAll(`.${e}`).boundingClientRect((e=>{e?i(e):s(e)})).exec()}))}},[["render",function(e,t,h,u,p,g){const A=d;return i(),s(A,{class:"fui-skeleton__wrap",style:r({background:h.background,height:p.height+"px"}),ref:"fui_skeleton"},{default:a((()=>[(i(!0),n(l,null,o(p.elList,((e,t)=>(i(),s(A,{class:f(["fui-skeleton__item",{"fui-skeleton__dark":"dark"===h.theme,"fui-skeleton__dark-ani":h.active&&"dark"===h.theme,"fui-skeleton__light-ani":h.active&&"dark"!==h.theme}]),style:r({width:e.width+"px",height:e.height+"px",left:e.left+"px",top:e.top+"px",borderRadius:"round"===e.type?p.isNvue?e.width/2+"px":"50%":"6rpx"}),key:t},null,8,["class","style"])))),128))])),_:1},8,["style"])}],["__scopeId","data-v-f8444ad6"]]),p="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABL1BMVEUAAADK4f3o9P8Hd/bB3/+u0/zX6f/j8f/N4/4lh/e01vwNe/ZRn/mCuvtYo/nn8v8dg/dFmfiTw/qZx/xqrfpusPp4tfqfyvyjzPy72v0UfvYvjffJ4v03kfdAlvhLnPhlqvn2/f/p9/87k/hhqPp9t/uKv/vQ5P3e7f+ZxfsqiveEvPup0fxcpfkZgPYyjvcki/R0svqOwfuhy/2iz/oeg/bS5v5Xo/yt0P1KnPmOwfp7tvgAcvUFdfVLnflwsPoOefd1svoxjvet0/4xjPYYf/ckh/c0jvcLePYYgPdbpfkYgfZpqvpAlvVMm/lZovkng/YOevYCdPUvi/Y+lfgBc/UliPY3kPhVofiEu/pFmfiYx/tUofqMvvl1s/uey/0IdvRoqvlfp/g9lPkAcvaM1VCvAAAAZHRSTlMABQ/4PVAnGjHbSfGufqcV4rptZ5aRiGFbROvQN8i/tJsMCMOfg3QtIh3VeFei5swOjHErDDgfGBOgZT7vjoSCZWNaORrYwLatrH5zUUMwKiTi3cSpgHpqX11cWUVANzMuE4t66Dgm2gAAAndJREFUWMPN0ulW2lAUhuFDEAgIIlgURLCAFiMgQ5gHGUVUJmdb57b3fw09ewdcXXQRMDs/+l7As/Z3EqZS6q1R611dGY3VGtNeqtG7NEK/oVvNytn2Ks+4OoGq2piLk6PtbS5xhgBxZv1oCgEFkIZHynXXeQhNTzJWbz9/zp3VagXoCKDLXq3xNmYa6nStH9DJRY5pLXd9aJ1IZ6BoreU/PESJxrB7v1+RuiSGtZJ+lKx3KZIzCCQVqcVIdU4DgSSnrsc0J3UTCIB02mG07iORCJfIzjAYQWnMiJWCQaBaVOeHKwjSL6pTKLlAuinQD4KCA0athNAx2Rns8lyuAhk63oXoBxXsdjuHhmToyQ6VGH0ZQg90aA2hEdkZrUE6LHtC6JwOPSDUp0PnicRaIjHUA4JGdOjnHvROh/YwRu8r9j9BXzBGr47Quz6Qx1OgQ00P9EKH+gj16VDF40mn0006VEjzNut0yFDfhCS61ESoQocqnNnfd+iwbR/TYxtnHI7vdOjFgUn0bTFw9DipwplYLKbHSeB8KxvoJ3GG90w/qQxOJiOTJQkYt9tdJEvPGYTKWfo4N7TxSJayZXA2Nh7J6yTO8La25KUW8NicZHR47exiJxxWkV7R8Xq9NmkBEwqFVCV5S4HicbWjDAJPkea/k1dx4iZTuziPcTonkkHt25kQMkE++R8rLFgslg9Iff7r1LHZbL4VMV8UDMrrCk7LwUEeIZTAUa1oi6MDkG+Ft7OzI4rRqNlsRkiRgF+YbJuBRIRQUiAhtORfLvtw2exF5sk2YJZNav8FibwpBMznCksid2amWQSmKUHKR6MiQGazxan+wH8A59dtq48V+X8AAAAASUVORK5CYII=";export{u as _,p as a};
