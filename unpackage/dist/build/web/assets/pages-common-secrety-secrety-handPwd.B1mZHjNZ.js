import{_ as t}from"./fui-icon.CJc-PGr7.js";import{a7 as i,u as e,q as o,w as s,v as a,C as r,a9 as n,t as h,a as c,r as d,x as l,z as u,H as p}from"./index-CGNx3rpF.js";import{r as C}from"./uni-app.es.BAGiN-2A.js";import{_ as f}from"./fui-nav-bar.Dp0oIG0k.js";import{_ as g}from"./_plugin-vue_export-helper.BCo6x5W8.js";import{_ as m}from"./fui-button.CVs2sbja.js";import{_ as v}from"./authPop.B7WqBCU0.js";import"./uni-popup.D4WMjfzs.js";let b;const y=g({name:"draw-lock",props:{width:{type:Number,default:300},height:{type:Number,default:300},background:{type:String,default:"rgba(0,0,0,0)"},lineColor:{type:String,default:"rgb(252,64,96)"},lineBackground:{type:String,default:"rgba(252,64,96,.5)"},circleWidth:{type:Number,default:64},rowPont:{type:Number,default:3},colPont:{type:Number,default:3}},data:()=>({initCircleCoordinate:[],selectedCoordinate:[],candidateCoordinate:[],isActive:!1,circleR:0,password:""}),created(){this.$nextTick((()=>{this.circleR=28*this.width/375,this.width>this.height&&(this.circleR=28*this.height/375),b=i("firstCanvas"),this.initCanvas()}))},methods:{initCanvas(){this.initCircleCoordinate=this.getCircleCoordinate(),this.candidateCoordinate=this.initCircleCoordinate,this.selectedCoordinate=[],this.draw()},touchEnd(t){this.isActive&&(this.isActive=!1,this.draw(),this.password=this.getPassword(),this.initCanvas(),this.$emit("change",this.password))},getPassword(){return this.selectedCoordinate.map((function(t){return t.key}))},updateCanvas(t){this.draw();var i=this.selectedCoordinate[this.selectedCoordinate.length-1];b.beginPath(),b.moveTo(t.x,t.y),b.lineTo(i.x,i.y),b.closePath(),b.stroke();for(var e=0;e<this.candidateCoordinate.length;e++)if(this.collisionDetection(t,this.candidateCoordinate[e])){this.isActive=!0,this.selectedCoordinate.push(this.candidateCoordinate[e]),this.candidateCoordinate.splice(e,1);break}},touchMove(t){if(this.isActive){var i=this.getPosition(t);if(!i)return;this.updateCanvas(i)}this.$emit("move",t)},collisionDetection(t,i){var e=Math.abs(t.x-i.x),o=Math.abs(t.y-i.y);return e*e+o*o<this.circleR*this.circleR},getPosition(t){if(!(t.touches.length<1))return{x:t.touches[0].x,y:t.touches[0].y}},draw(){this.onDefaultDraw()},touchStart(t){var i=this.getPosition(t);if(i){for(var e=0;e<this.candidateCoordinate.length;e++)if(this.collisionDetection(i,this.candidateCoordinate[e])){this.isActive=!0,this.selectedCoordinate.push(this.candidateCoordinate[e]),this.candidateCoordinate.splice(e,1),this.draw();break}this.$emit("start",t)}},onDefaultDraw(){b.clearRect(0,0,this.width,this.height),b.setFillStyle(this.background),b.fillRect(0,0,this.width,this.height),b.setLineWidth(1),b.setStrokeStyle(this.lineColor),b.beginPath();for(var t=0;t<this.initCircleCoordinate.length;t++)b.moveTo(this.initCircleCoordinate[t].x+this.circleR,this.initCircleCoordinate[t].y),b.arc(this.initCircleCoordinate[t].x,this.initCircleCoordinate[t].y,this.circleR,0,2*Math.PI,!0);b.stroke(),b.closePath(),b.setStrokeStyle(this.lineColor),b.beginPath();for(var i=0;i<this.selectedCoordinate.length;i++)b.lineTo(this.selectedCoordinate[i].x,this.selectedCoordinate[i].y);b.stroke(),b.closePath(),b.setFillStyle(this.lineBackground),b.beginPath();for(var e=0;e<this.selectedCoordinate.length;e++)b.moveTo(this.selectedCoordinate[e].x+this.circleR/2,this.selectedCoordinate[e].y),b.arc(this.selectedCoordinate[e].x,this.selectedCoordinate[e].y,this.circleR,0,2*Math.PI,!0);b.fill(),b.closePath(),b.setFillStyle(this.lineColor),b.beginPath();for(var o=0;o<this.selectedCoordinate.length;o++)b.moveTo(this.selectedCoordinate[o].x+this.circleR/2,this.selectedCoordinate[o].y),b.arc(this.selectedCoordinate[o].x,this.selectedCoordinate[o].y,20*this.circleR/56,0,2*Math.PI,!0);b.fill(),b.closePath(),b.draw()},getCircleCoordinate(){for(var t=(this.width-this.rowPont*this.circleR*2)/(this.rowPont+1),i=(this.height-this.rowPont*this.circleR*2)/(this.colPont+1),e=[],o=0;o<this.colPont;o++)for(var s=0;s<this.rowPont;s++)e.push({x:t*(s+1)+this.circleR*(2*s+1),y:i*(o+1)+this.circleR*(2*o+1),key:3*o+s+1});return e},canvasIdErrorCallback:function(t){console.error(t.detail.errMsg)}}},[["render",function(t,i,c,d,l,u){const p=n,C=h;return e(),o(C,null,{default:s((()=>[a(p,{style:r("width: "+c.width+"px; height: "+c.height+"px;display:inline-block"),"canvas-id":"firstCanvas",id:"firstCanvas",onError:u.canvasIdErrorCallback,onTouchstart:u.touchStart,onTouchmove:u.touchMove,onTouchend:u.touchEnd},null,8,["style","onError","onTouchstart","onTouchmove","onTouchend"])])),_:1})}]]);const w=g({data(){return{width:.9*this.$device.windowWidth,height:300,num:0,first:[],second:[],title:this.$t("hand.page_c")}},computed:{...c(["userTheme"])},methods:{complet(t){if(0==this.num)return this.first=t,this.title=this.$t("hand.tip_c1"),void(this.num=1);1==this.num&&(this.second=t,this.num=2,console.log(this.first.join(""),this.second.join("")),this.first.join("")==this.second.join("")?(this.title=this.$t("hand.tip_c3"),this.$refs.authpop.open()):(this.title=this.$t("hand.tip_c2"),this.num=0,this.first=[],this.second=[]))},startDraw(t){}}},[["render",function(i,r,n,c,g,b){const w=C(d("fui-icon"),t),k=C(d("fui-nav-bar"),f),P=p,x=h,_=C(d("hackout-draw-lock"),y),R=C(d("fui-button"),m),T=C(d("authPop"),v);return e(),o(x,{class:"gestureUnlocking","data-theme":i.userTheme},{default:s((()=>[a(k,{statusBar:"",isFixed:"",isOccupy:"",zIndex:"9",title:i.$t("hand.page_title"),color:"var(--content-primary)",background:"var(--background-primary)",onLeftClick:r[0]||(r[0]=t=>i.$mroute.back())},{default:s((()=>[a(w,{name:"arrowleft",size:"56",color:"var(--content-primary)"})])),_:1},8,["title"]),a(x,{class:"unlock-body"},{default:s((()=>[a(x,{class:"unlock-body-title"},{default:s((()=>[a(P,{class:"font-16 color-black font-weight"},{default:s((()=>[l(u(g.title),1)])),_:1})])),_:1}),a(x,{class:"unlock-body-container"},{default:s((()=>[a(_,{width:g.width,background:"rgba(0, 0, 0, 0)","circle-width":100,"line-color":"rgba(226, 83, 85, 1)","line-background":"rgba(226, 83, 85, 0.5)",height:g.height,onStart:b.startDraw,onChange:b.complet},null,8,["width","height","onStart","onChange"])])),_:1}),a(x,{class:"unlock-body-buttons"},{default:s((()=>[a(R,{height:"78rpx",radius:"78rpx",size:"26",color:"var(--background-primary)",background:"var(--content-primary)",text:i.$t("hand.confirm_t"),onClick:r[1]||(r[1]=t=>i.$refs.authpop.open())},null,8,["text"])])),_:1})])),_:1}),a(T,{ref:"authpop",title:this.$t("authPop.input_phoneCode")},null,8,["title"])])),_:1},8,["data-theme"])}],["__scopeId","data-v-5bc0ca68"]]);export{w as default};
