import{l as t,a,a2 as i,a3 as o,bk as s,i as e,r as n,q as l,w as r,t as m,u,v as c,x as h,z as d,y as g,H as p,G as f}from"./index-Crl9YJuv.js";import{_ as w}from"./fui-icon.DR4EBh1k.js";import{r as _}from"./uni-app.es.DGAn-rK5.js";import{_ as b}from"./fui-nav-bar.BWTrzAGW.js";import{_ as x}from"./fui-button.DywjBHJb.js";import{_ as $}from"./alert.BH0adChV.js";import{_ as k}from"./fui-bottom-popup.B6kgpvzO.js";import{u as y}from"./user.CIfdEhcm.js";import{_ as v}from"./_plugin-vue_export-helper.BCo6x5W8.js";import"./uni-popup-dialog.D9c9DJQu.js";import"./uni-popup.xy3aTQLU.js";var j;const I=v({data(){return{img:[{},{title:this.$t("auths.t26"),title2:this.$t("auths.t27"),imgnumshow:!0,imgnum:"/static/img/cardnumw.png",imgimgshow:!0,imgimg:"/static/img/cardimgw.png"},{title:this.$t("auths.t28"),imgnumshow:!0,imgnum:"/static/img/huzhaow.png",imgimgshow:!1},{title:this.$t("auths.t29"),imgnumshow:!0,imgnum:"/static/img/carimgw.png",imgimgshow:!1},{title:this.$t("auths.t30"),imgnumshow:!0,imgnum:"/static/img/imgw.png",imgimgshow:!1}],index:3,title:this.$t("login.tip_t2"),content:"",ctxt:this.$t("取消"),photoShow:!1}},onLoad(a){a.index&&(this.index=parseInt(a.index)),j=t("authInfo")},onShow(){this.getInfo()},computed:{...a(["userTheme"])},methods:{submit(){if(!j.img1||void 0===j.img1)return this.content=this.$t("auths.t31"),this.$refs.alert.open(),!1;i(),y.submitAuthInfo(j).then((t=>{o(),200!=t.code?(this.content=t.message,this.$refs.alert.open()):this.$mroute.authing()})).catch((t=>{this.content=this.$t("auths.t32"),this.$refs.alert.open(),o()}))},getInfo(){y.baseAuthInfo().then((t=>{void 0!==t.data.id&&t.data.id&&(this.cardType=t.data.type,this.img[this.cardType].imgnum=t.data.img1,this.img[this.cardType].imgimg=t.data.img2,this.$forceUpdate())}))},upload(t){this.i=t,this.photoShow=!0},chooseImage(t){var a=this;a.photoShow=!1,s({count:1,sizeType:["compressed"],sourceType:[0===t?"camera":"album"],success(t){i({title:"uploading"}),e.uploadFile(t.tempFilePaths[0]).then((t=>{o(),console.log(t.data);let i=JSON.parse(t.data);200!=i.code&&(a.content=t.message,a.$refs.alert.open()),1==a.i?(a.img[a.index].imgnum=i.data.url,j.img1=i.data.url):(j.img2=i.data.url,a.img[a.index].imgimg=i.data.url)})).catch((t=>{o(),a.content=a.$t("auths.t32"),a.$refs.alert.open()}))}})}}},[["render",function(t,a,i,o,s,e){const y=_(n("fui-icon"),w),v=_(n("fui-nav-bar"),b),j=p,I=f,S=m,T=_(n("fui-button"),x),C=_(n("alert"),$),z=_(n("fui-bottom-popup"),k);return u(),l(S,{class:"baseAuth","data-theme":t.userTheme},{default:r((()=>[c(v,{statusBar:"",isFixed:"",isOccupy:"",zIndex:"9",title:t.$t("auths.t21"),color:"var(--content-primary)",background:"var(--background-primary)",onLeftClick:a[0]||(a[0]=a=>t.$mroute.back())},{default:r((()=>[c(y,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["title"]),c(S,{class:"baseAuth-container"},{default:r((()=>[c(S,{class:"upload-label"},{default:r((()=>[c(j,{class:"font-14 color-black font-weight"},{default:r((()=>[h(d(s.img[s.index].title),1)])),_:1}),c(I,{class:"upload-image",src:s.img[s.index].imgnum,onClick:a[1]||(a[1]=t=>e.upload(1)),mode:"widthFix"},null,8,["src"])])),_:1}),s.img[s.index].imgimgshow?(u(),l(S,{key:0,class:"upload-label"},{default:r((()=>[c(j,{class:"font-14 color-black font-weight"},{default:r((()=>[h(d(s.img[s.index].title2),1)])),_:1}),c(I,{class:"upload-image",src:s.img[s.index].imgimg,onClick:a[2]||(a[2]=t=>e.upload(2)),mode:"widthFix"},null,8,["src"])])),_:1})):g("",!0),c(S,{class:"upload-tips"},{default:r((()=>[c(j,{class:"font-13 color-black font-weight"},{default:r((()=>[h(d(t.$t("auths.t22")),1)])),_:1}),c(j,{class:"font-13 color-gray mt-10"},{default:r((()=>[h(d(t.$t("auths.t23")),1)])),_:1}),c(j,{class:"font-13 color-gray mt-5"},{default:r((()=>[h(d(t.$t("auths.t24")),1)])),_:1})])),_:1})])),_:1}),c(S,{class:"footer-button"},{default:r((()=>[c(T,{background:"var(--content-primary)",color:"var(--background-primary)",size:"26",radius:"78rpx",height:"78rpx",text:t.$t("auths.t25"),onClick:a[3]||(a[3]=t=>e.submit())},null,8,["text"])])),_:1}),c(C,{ref:"alert",title:s.title,content:s.content,ctxt:s.ctxt},null,8,["title","content","ctxt"]),c(z,{show:s.photoShow,background:"var(--background-primary)",safeArea:!1,onClose:a[6]||(a[6]=t=>s.photoShow=!1)},{default:r((()=>[c(S,{class:"card-popup bg-white"},{default:r((()=>[c(S,{class:"list"},{default:r((()=>[c(S,{class:"_row",onClick:a[4]||(a[4]=t=>e.chooseImage(1))},{default:r((()=>[c(j,{class:"font-15 font-weight color-black"},{default:r((()=>[h(d(t.$t("chooseimage.txt2")),1)])),_:1})])),_:1})])),_:1}),c(S,{class:"cancel-button",onClick:a[5]||(a[5]=t=>s.photoShow=!1)},{default:r((()=>[c(j,{class:"font-15 font-weight color-black"},{default:r((()=>[h(d(t.$t("login.cancel")),1)])),_:1})])),_:1})])),_:1})])),_:1},8,["show"])])),_:1},8,["data-theme"])}],["__scopeId","data-v-4df402a1"]]);export{I as default};
