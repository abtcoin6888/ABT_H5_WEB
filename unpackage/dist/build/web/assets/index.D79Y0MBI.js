import{af as e,aJ as a,az as t,aL as l,aw as s,aA as i,aB as r,aC as o,v as n,al as c,ap as d,am as f,aE as h,av as b,bE as g,bF as x,I as p,aD as v}from"./index-Crl9YJuv.js";function u(c,d){const f=((n,c)=>{const d=e(),f=()=>{d.value=o(n).height};return a((()=>{if(t(f),c)for(let e=1;e<=3;e++)setTimeout(f,100*e)})),l((()=>t(f))),s([i,r],f),d})(c,!0);return e=>n("div",{class:d("placeholder"),style:{height:f.value?`${f.value}px`:void 0}},[e()])}const[T,k]=c("nav-bar");const D=v(d({name:T,props:{title:String,fixed:Boolean,zIndex:f,border:h,leftText:String,rightText:String,leftDisabled:Boolean,rightDisabled:Boolean,leftArrow:Boolean,placeholder:Boolean,safeAreaInsetTop:Boolean,clickable:h},emits:["clickLeft","clickRight"],setup(a,{emit:t,slots:l}){const s=e(),i=u(s,k),r=e=>{a.leftDisabled||t("clickLeft",e)},o=e=>{a.rightDisabled||t("clickRight",e)},c=()=>{const{title:e,fixed:t,border:i,zIndex:c}=a,d=b(c),f=a.leftArrow||a.leftText||l.left,h=a.rightText||l.right;return n("div",{ref:s,style:d,class:[k({fixed:t}),{[x]:i,"van-safe-area-top":a.safeAreaInsetTop}]},[n("div",{class:k("content")},[f&&n("div",{class:[k("left",{disabled:a.leftDisabled}),a.clickable&&!a.leftDisabled?g:""],onClick:r},[l.left?l.left():[a.leftArrow&&n(p,{class:k("arrow"),name:"arrow-left"},null),a.leftText&&n("span",{class:k("text")},[a.leftText])]]),n("div",{class:[k("title"),"van-ellipsis"]},[l.title?l.title():e]),h&&n("div",{class:[k("right",{disabled:a.rightDisabled}),a.clickable&&!a.rightDisabled?g:""],onClick:o},[l.right?l.right():n("span",{class:k("text")},[a.rightText])])])])};return()=>a.fixed&&a.placeholder?i(c):c()}}));export{D as N};
