import{_ as t}from"./uni-popup-dialog.jPMVSOx-.js";import{r as e,u as o,q as i,w as n,v as s,t as a}from"./index-CvJkP8r7.js";import{r}from"./uni-app.es.4grYzir1.js";import{_ as l}from"./uni-popup.BKNKbknm.js";import{_ as p}from"./_plugin-vue_export-helper.BCo6x5W8.js";const c=p({name:"alert",props:{ctxt:{type:String,default:""},ftxt:{type:String,default:"确定"},content:{type:String,default:""},title:{type:String,default:""}},data:()=>({}),computed:{cancelText(){return"取消"===this.ctxt?this.$t("取消"):this.ctxt},confirmText(){return"确定"===this.ftxt?this.$t("确定"):this.ftxt}},methods:{dialogConfirm(){this.$emit("confirm",!0),this.close()},dialogClose(){this.$emit("cancel",!0),this.close()},open(){this.$refs.alertDialog.open()},close(){this.$refs.alertDialog.close()}}},[["render",function(p,c,f,m,u,d){const h=r(e("uni-popup-dialog"),t),x=r(e("uni-popup"),l),g=a;return o(),i(g,{"data-theme":p.userTheme},{default:n((()=>[s(x,{ref:"alertDialog",type:"dialog"},{default:n((()=>[s(h,{type:"success",cancelText:d.cancelText,confirmText:d.confirmText,title:f.title,content:f.content,onConfirm:d.dialogConfirm,onClose:d.dialogClose},null,8,["cancelText","confirmText","title","content","onConfirm","onClose"])])),_:1},512)])),_:1},8,["data-theme"])}],["__scopeId","data-v-921a0b9d"]]);export{c as _};
