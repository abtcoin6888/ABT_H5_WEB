import{a as t,a2 as e,a3 as a,r as s,q as o,w as i,t as r,u as n,v as l,A as c,B as u,F as m,x as d,z as p,G as f,H as h}from"./index-CGNx3rpF.js";import{_}from"./fui-icon.CJc-PGr7.js";import{r as b}from"./uni-app.es.BAGiN-2A.js";import{_ as x}from"./fui-nav-bar.Dp0oIG0k.js";import{_ as g}from"./alert.CYRqa6G9.js";import{A as v}from"./deposit.Blfo980K.js";import{_ as j}from"./_plugin-vue_export-helper.BCo6x5W8.js";import"./uni-popup-dialog.CkggB2-U.js";import"./uni-popup.D4WMjfzs.js";const k=j({data:()=>({list:[],active:0,bindex:0,content:""}),computed:{...t(["userTheme"])},onShow(){this.getItems()},methods:{confirm(){e(),v.back({did:this.list[this.bindex].oid,type:1===this.active?1:0}).then((t=>{a(),this.$refs.type.close(),this.content=this.$t("dps.t9"),this.$refs.alert.open(),setTimeout((()=>{this.getItems()}),1500)})).catch((t=>{a()}))},back(t){if(null===this.list[t].amount||parseFloat(this.list[t].amount)<=0)return!1;this.bindex=t,this.$refs.type.open()},getItems(){v.getItems().then((t=>{this.list=t.data}))}}},[["render",function(t,e,a,v,j,k){const y=b(s("fui-icon"),_),$=b(s("fui-nav-bar"),x),w=f,I=h,F=r,z=b(s("alert"),g);return n(),o(F,{class:"recoredPage","data-theme":t.userTheme},{default:i((()=>[l($,{statusBar:"",isFixed:"",isOccupy:"",zIndex:"9",title:t.$t("dps.t1"),color:"var(--content-primary)",background:"var(--background-primary)",onLeftClick:e[0]||(e[0]=e=>t.$mroute.back())},{default:i((()=>[l(y,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["title"]),l(F,{class:"container"},{default:i((()=>[(n(!0),c(m,null,u(j.list,((e,a)=>(n(),o(F,{class:"container-cell",key:a},{default:i((()=>[l(F,{class:"container-cell-item"},{default:i((()=>[l(w,{src:e.icon,mode:"widthFix"},null,8,["src"]),l(I,{class:"font-14 color-black font-weight"},{default:i((()=>[d(p(e.symbol),1)])),_:2},1024)])),_:2},1024),l(F,{class:"container-cell-item"},{default:i((()=>[l(I,{class:"font-13 color-black font-weight"},{default:i((()=>[d(p(t.$util.float(null==e.amount?0:e.amount)),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1}),l(z,{ref:"alert",content:j.content,ctxt:t.$t("取消")},null,8,["content","ctxt"])])),_:1},8,["data-theme"])}],["__scopeId","data-v-9a38b81b"]]);export{k as default};
