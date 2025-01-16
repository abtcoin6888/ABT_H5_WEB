import{f as t,u as e,q as s,w as a,v as i,D as r,E as l,C as n,x as h,z as o,y as u,A as d,B as c,F as m,t as y,H as g,bz as f,bA as p}from"./index-CGNx3rpF.js";import{_ as k}from"./_plugin-vue_export-helper.BCo6x5W8.js";const _=k({name:"fui-date-picker",emits:["change","cancel"],props:{show:{type:Boolean,default:!1},type:{type:[Number,String],default:1},value:{type:String,default:""},valueEnd:{type:String,default:""},minDate:{type:String,default:"2010-01-01"},maxDate:{type:String,default:"2030-12-31"},hourRange:{type:Array,default:()=>[0,23]},minuteRange:{type:Array,default:()=>[0,59]},secondRange:{type:Array,default:()=>[0,59]},unit:{type:Boolean,default:!0},range:{type:Boolean,default:!1},year_t:{type:String,default:"年"},month_t:{type:String,default:"月"},day_t:{type:String,default:"日"},start:{type:String,default:"起始日期"},end:{type:String,default:"结束日期"},rangeBackground:{type:String,default:""},radius:{type:Boolean,default:!1},height:{type:[Number,String],default:520},size:{type:[Number,String],default:16},color:{type:String,default:""},title:{type:String,default:""},titleSize:{type:[Number,String],default:28},titleColor:{type:String,default:""},confirmText:{type:String,default:"确定"},confirmColor:{type:String,default:""},cancelText:{type:String,default:"取消"},cancelColor:{type:String,default:""},btnSize:{type:[Number,String],default:32},background:{type:String,default:""},theme:{type:String,default:"light"},maskClosable:{type:Boolean,default:!0},maskBackground:{type:String,default:"rgba(0,0,0,.6)"},zIndex:{type:[Number,String],default:996},isClose:{type:Boolean,default:!0},param:{type:[Number,String],default:0}},created(){this.initialize(),this.isShow=this.show},computed:{cancelStyl(){let t=`font-size:${this.btnSize}rpx;`;return this.cancelColor&&(t+=`color:${this.cancelColor};`),t},confrimStyl(){let t=`font-size:${this.btnSize}rpx;`,e=this.confirmColor;return e&&(t+=`color:${e};`),t},titleStyl(){let t=`font-size:${this.titleSize}rpx;`;return this.titleColor&&(t+=`color:${this.titleColor};`),t},contentStyl(){let t=`font-size:${this.size}px;`;return this.color&&(t+=`color:${this.color};`),t},headerStyl(){let t="";return this.background&&(t+=`background:${this.background};`),t},maskStyl(){return`background:${this.maskBackground};z-index:${Number(this.zIndex-10)};`},initChange(){return`${this.type}_${this.value}_${this.minDate}_${this.maxDate}`},startStyl(){let t="",e=this.rangeBackground;return 1==this.isActive&&e&&(t=`background:${e};`),t},endStyl(){let t="",e=this.rangeBackground;return 2==this.isActive&&e&&(t=`background:${e};`),t}},watch:{initChange(t){this.initialize()},hourRange(t){this.getHours()},minuteRange(t){this.getMinutes()},secondRange(t){this.getSeconds()},isShow:{handler(t){t&&(this.isInitShow=!0)},immediate:!0},show(t){this.isShow=t}},data:()=>({immediate:!0,years:[],months:[],days:[],hours:[],minutes:[],seconds:[],vals:[],nvueVals:[],values:[],minArr:[],maxArr:[],darkStyle:"background-image: -webkit-linear-gradient(top, rgba(17, 17, 17, .95), rgba(17, 17, 17, .6)), -webkit-linear-gradient(bottom, rgba(17, 17, 17, .95), rgba(17, 17, 17, .6));",indicatorStyl:"border-color: #333;height: 44px;",darkBottomStyle:"",lightStyle:"background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, .95), rgba(255, 255, 255, .6)), -webkit-linear-gradient(bottom, rgba(255, 255, 255, .95), rgba(255, 255, 255, .6));",isEnd:!0,isShow:!1,isActive:1,startDate:{},endDate:{},isInitShow:!1}),methods:{initialize(){this.reset(),this.getDefaultOptions(this.value),this.handleDate(),setTimeout((()=>{this.initData()}),50)},btnCancel(t){this.isShow=!1,this.$emit("cancel",{param:this.param})},maskClick(t){this.maskClosable&&this.btnCancel(t)},reset(){this.vals=[[0],[0,0],[0,0,0],[0,0,0,0],[0,0,0,0,0],[0,0],[0,0,0],[0,0]][Number(this.type)-1],this.isActive=1,this.startDate={},this.endDate={}},open(){this.isShow=!0},close(){this.isShow=!1},compareDate(t,e){return 8==Number(this.type)&&(t="00:"+t,e="00:"+e),t=t.replace(/\-/g,"/"),e=e.replace(/\-/g,"/"),-1==t.indexOf("/")&&(t=`2001/01/01 ${t}`,e=`2001/01/01 ${e}`),new Date(t).getTime()<=new Date(e).getTime()},formatVal:t=>t<10?`0${t}`:t+"",toArray:(t,e)=>Array.from(new Array(e+1).keys()).slice(t),getStrCount(t){let e=new RegExp("/","g"),s=t.match(e);return s?s.length:0},getValueToDate(t){let e=[],s=Number(this.type);if(1==s&&0===this.getStrCount(t))return[Number(t),-1,-1,-1,-1,-1];8==s&&(t="00:"+t);let a=t.replace(/\-/g,"/");2==s&&1===this.getStrCount(t)&&(a+="/01"),-1==a.indexOf("/")&&(a=`2001/01/01 ${a}`);try{const t=new Date(a),s=t.getFullYear(),i=t.getMonth()+1,r=t.getDate(),l=t.getHours(),n=t.getMinutes();e=[s,i,r,l,n,t.getSeconds()]}catch(i){console.log("默认日期时间格式有误！")}return e},getRangeInitRes(t){const e=Number(this.type);let s={param:this.param};switch(e){case 1:s.year=t[0],s.result=s.year;break;case 2:s.year=t[0],s.month=this.formatVal(t[1]),s.result=`${s.year}-${s.month}`;break;case 3:s.year=t[0],s.month=this.formatVal(t[1]),s.day=this.formatVal(t[2]),s.result=`${s.year}-${s.month}-${s.day}`;break;case 4:s.year=t[0],s.month=this.formatVal(t[1]),s.day=this.formatVal(t[2]),s.hour=this.formatVal(t[3]),s.result=`${s.year}-${s.month}-${s.day} ${s.hour}:00`;break;case 5:s.year=t[0],s.month=this.formatVal(t[1]),s.day=this.formatVal(t[2]),s.hour=this.formatVal(t[3]),s.minute=this.formatVal(t[4]),s.result=`${s.year}-${s.month}-${s.day} ${s.hour}:${s.minute}`;break;case 6:s.hour=this.formatVal(t[3]),s.minute=this.formatVal(t[4]),s.result=`${s.hour}:${s.minute}`;break;case 7:s.hour=this.formatVal(t[3]),s.minute=this.formatVal(t[4]),s.second=this.formatVal(t[5]),s.result=`${s.hour}:${s.minute}:${s.second}`;break;case 8:s.minute=this.formatVal(t[4]),s.second=this.formatVal(t[5]),s.result=`${s.minute}:${s.second}`}return s},getDefaultOptions(t){if(t&&!0!==t&&"true"!==t)if(this.range){const e=this.getValueToDate(t);if(this.valueEnd){const t=this.getValueToDate(this.valueEnd);this.values=t,this.startDate=this.getRangeInitRes(e),this.endDate=this.getRangeInitRes(t),this.isActive=2}else this.values=e,this.startDate=this.getRangeInitRes(e)}else this.values=this.getValueToDate(t);else this.values=[]},toDate(t,e,s){if(!0!==t&&"true"!==t&&t){const e=t.replace(/\-/g,"/"),a=e.split("/");if(1===a.length)t=s?`${e}/01/01`:`${e}/12/31`;else if(2===a.length)if(s)t=`${e}/01`;else{t=`${e}/${new Date(a[0],a[1],0).getDate()}`}}else t=e;return new Date(t.replace(/\-/g,"/"))},handleDate(){const t=this.toDate(this.minDate,"2010-01-01",!0),e=this.toDate(this.maxDate,"2030-12-31",!1);this.minArr=[t.getFullYear(),t.getMonth()+1,t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds()],this.maxArr=[e.getFullYear(),e.getMonth()+1,e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds()]},getYears(){let t=this.minArr[0],e=this.maxArr[0];e=e<t?t:e,this.years=this.toArray(t,e)},getMonths(t){let e=this.years[t],s=1,a=12;e==this.minArr[0]&&(s=this.minArr[1]),e==this.maxArr[0]&&(a=this.maxArr[1]),a=a<s?s:a,this.months=this.toArray(s,a)},getDays(t,e){let s=1,a=this.years[t],i=this.months[e],r=new Date(a,i,0).getDate();a==this.minArr[0]&&i==this.minArr[1]&&(s=this.minArr[2]),a==this.maxArr[0]&&i==this.maxArr[1]&&(r=this.maxArr[2]),r=!r||r<s?s:r,this.days=this.toArray(s,r)},getHours(){let t=this.hourRange||[0,23],e=Number(t[0]||0),s=Number(t[1]||23);e=Math.floor(e<0||e>23?0:e),s=Math.floor(s<0||s>23?23:s),s=s<e?e:s,this.hours=this.toArray(e,s)},getMinutes(){let t=this.minuteRange||[0,59],e=Number(t[0]||0),s=Number(t[1]||59);e=Math.floor(e<0||e>59?0:e),s=Math.floor(s<0||s>59?59:s),s=s<e?e:s,this.minutes=this.toArray(e,s)},getSeconds(){let t=this.secondRange||[0,59],e=Number(t[0]||0),s=Number(t[1]||59);e=Math.floor(e<0||e>59?0:e),s=Math.floor(s<0||s>59?59:s),s=s<e?e:s,this.seconds=this.toArray(e,s)},getIndex(t,e){if(!t||0===t.length||!e)return 0;let s=t.indexOf(e);return-1===s?0:s},initData(){let t=Number(this.type),e=0,s=0;t<6&&(this.getYears(),e=this.getIndex(this.years,this.values[0]),t>1&&(this.getMonths(e),s=this.getIndex(this.months,this.values[1]),t>2&&this.getDays(e,s))),t>3&&t<8&&this.getHours(),t>4&&this.getMinutes(),t>6&&this.getSeconds(),this.$nextTick((()=>{setTimeout((()=>{let a=this.getIndex(this.days,this.values[2]),i=this.getIndex(this.hours,this.values[3]),r=this.getIndex(this.minutes,this.values[4]),l=this.getIndex(this.seconds,this.values[5]);this.vals=[[e],[e,s],[e,s,a],[e,s,a,i],[e,s,a,i,r],[i,r],[i,r,l],[r,l]][t-1]}),220)}))},getResult(){const t=this.vals,e=Number(this.type);let s={param:this.param},a=0,i=0,r=0,l=0;switch(e){case 1:s.year=this.years[t[0]],s.result=s.year;break;case 2:s.year=this.years[t[0]],a=this.months.length-1,r=t[1],s.month=this.formatVal(this.months[r>a?a:r]),s.result=`${s.year}-${s.month}`;break;case 3:s.year=this.years[t[0]],a=this.months.length-1,i=this.days.length-1,r=t[1],l=t[2],s.month=this.formatVal(this.months[r>a?a:r]),s.day=this.formatVal(this.days[l>i?i:l]),s.result=`${s.year}-${s.month}-${s.day}`;break;case 4:s.year=this.years[t[0]],a=this.months.length-1,i=this.days.length-1,r=t[1],l=t[2],s.month=this.formatVal(this.months[r>a?a:r]),s.day=this.formatVal(this.days[l>i?i:l]),s.hour=this.formatVal(this.hours[t[3]]),s.result=`${s.year}-${s.month}-${s.day} ${s.hour}:00`;break;case 5:s.year=this.years[t[0]],a=this.months.length-1,i=this.days.length-1,r=t[1],l=t[2],s.month=this.formatVal(this.months[r>a?a:r]),s.day=this.formatVal(this.days[l>i?i:l]),s.hour=this.formatVal(this.hours[t[3]]),s.minute=this.formatVal(this.minutes[t[4]]),s.result=`${s.year}-${s.month}-${s.day} ${s.hour}:${s.minute}`;break;case 6:s.hour=this.formatVal(this.hours[t[0]]),s.minute=this.formatVal(this.minutes[t[1]]),s.result=`${s.hour}:${s.minute}`;break;case 7:s.hour=this.formatVal(this.hours[t[0]]),s.minute=this.formatVal(this.minutes[t[1]]),s.second=this.formatVal(this.seconds[t[2]]),s.result=`${s.hour}:${s.minute}:${s.second}`;break;case 8:s.minute=this.formatVal(this.minutes[t[0]]),s.second=this.formatVal(this.seconds[t[1]]),s.result=`${s.minute}:${s.second}`}return s},emitChange(){let t={};t=this.range?{startDate:this.startDate,endDate:this.endDate}:this.getResult(),setTimeout((()=>{this.$emit("change",t)}),0)},waitForTrigger(t=0){this.isEnd?this.emitChange():(++t>=10&&(this.isEnd=!0),setTimeout((()=>{this.waitForTrigger(t)}),50))},btnConfirm(e){if(this.range){let e=this.startDate.result,s=this.endDate.result;if(!e&&!s)return this.startDate=this.getResult(),this.isActive=2,void t({title:this.$t("请选择")+`${this.end}`,icon:"none"});if(e&&!s&&(this.endDate=this.getResult(),s=this.endDate.result),!this.compareDate(e,s))return void t({title:`${this.end}不能小于${this.start}`,icon:"none"})}setTimeout((()=>{this.isClose&&(this.isShow=!1),this.waitForTrigger()}),80)},pickerChange(t){let e=t.detail.value,s=Number(this.type);const a=[1,2,3,4,5,2,3,2][s-1];this.isInitShow&&e.length==a&&(s>1&&s<6&&(e[0]!=this.vals[0]?(this.getMonths(e[0]),s>2&&this.getDays(e[0],e[1])):e[1]!=this.vals[1]&&s>2&&this.getDays(e[0],e[1])),this.vals=e,this.range&&setTimeout((()=>{1==this.isActive?this.startDate=this.getResult():this.endDate=this.getResult()}),50),this.isEnd=!0)},pickerstart(){this.isEnd=!1},rangeChange(t,e){this.isActive=e},stop(t){}}},[["render",function(t,k,_,S,b,$){const D=y,x=g,v=f,V=p;return e(),s(D,{class:"fui-date__picker-wrap",onTouchend:$.stop},{default:a((()=>[i(D,{class:r(["fui-date__picker-mask",{"fui-dpk__mask-show":b.isShow}]),onTouchmove:l($.stop,["stop","prevent"]),style:n($.maskStyl),ref:"fui_dpkm_ani",onClick:l($.maskClick,["stop"])},null,8,["onTouchmove","class","style","onClick"]),(e(),s(D,{key:_.theme,class:r(["fui-date__picker-content",{"fui-dpk__content-dark":"dark"===_.theme,"fui-dpk__content-light":"dark"!==_.theme,"fui-dpk__content-show":b.isShow,"fui-date__picker-radius":_.radius}]),style:n({zIndex:_.zIndex}),ref:"fui_dpk_ani"},{default:a((()=>[i(D,{class:r(["fui-date__picker-header",{"fui-dpk__header-dark":"dark"===_.theme,"fui-date__picker-radius":_.radius}]),style:n($.headerStyl)},{default:a((()=>[i(x,{class:r(["fui-dpk_btn-cancel",["dark"===_.theme?"fui-dpk__cancel-color_dark":"fui-dpk__cancel-color"]]),style:n($.cancelStyl),onClick:l($.btnCancel,["stop"])},{default:a((()=>[h(o(_.cancelText),1)])),_:1},8,["class","style","onClick"]),i(x,{class:r(["fui-date__picker-title",["dark"===_.theme?"fui-dpk__title-color_dark":"fui-dpk__title-color"]]),style:n($.titleStyl)},{default:a((()=>[h(o(_.title),1)])),_:1},8,["class","style"]),i(x,{class:r(["fui-dpk__btn-sure",{"fui-dpk__sure-color":!_.confirmColor}]),style:n($.confrimStyl),onClick:l($.btnConfirm,["stop"])},{default:a((()=>[h(o(_.confirmText),1)])),_:1},8,["class","style","onClick"])])),_:1},8,["class","style"]),_.range?(e(),s(D,{key:0,class:r(["fui-dpk__range-wrap",["dark"===_.theme?"fui-dpk__range-dark":"fui-dpk__range-light"]])},{default:a((()=>[i(D,{class:r(["fui-dpk__range-inner",["dark"===_.theme?"fui-dpk__range-dark":"fui-dpk__range-light"]])},{default:a((()=>[i(x,{class:r(["fui-dpk__range-text",{"fui-dpk__range-active":1==b.isActive}]),style:n($.startStyl),onClick:k[0]||(k[0]=l((t=>$.rangeChange(t,1)),["stop"]))},{default:a((()=>[h(o(b.startDate.result||_.start),1)])),_:1},8,["class","style"]),i(x,{class:r(["fui-dpk__range-text",{"fui-dpk__range-active":2==b.isActive}]),style:n($.endStyl),onClick:k[1]||(k[1]=l((t=>$.rangeChange(t,2)),["stop"]))},{default:a((()=>[h(o(b.endDate.result||_.end),1)])),_:1},8,["class","style"])])),_:1},8,["class"])])),_:1},8,["class"])):u("",!0),i(D,{onTouchstart:l($.pickerstart,["stop"])},{default:a((()=>[(e(),s(V,{"mask-top-style":"dark"===_.theme?b.darkStyle:"","mask-bottom-style":"dark"===_.theme?b.darkBottomStyle:"","mask-style":"dark"===_.theme?b.darkStyle:b.lightStyle,"indicator-style":"dark"===_.theme?b.indicatorStyl:"height: 44px;border-top-width:0.5px;border-bottom-width:0.5px;","indicator-class":"dark"===_.theme?"fui-date__picker-indicator":"",class:"fui-date__picker-view",style:n({height:_.height+"rpx"}),key:_.theme+_.type,value:b.vals,"immediate-change":b.immediate,onChange:$.pickerChange},{default:a((()=>[1==_.type||2==_.type||3==_.type||4==_.type||5==_.type?(e(),s(v,{key:0},{default:a((()=>[(e(!0),d(m,null,c(b.years,((t,i)=>(e(),s(x,{style:n($.contentStyl),key:i,class:r(["fui-date__picker-text",{"fui-dpk__color-dark":"dark"===_.theme}])},{default:a((()=>[h(o($.formatVal(t))+o(_.unit?_.year_t:""),1)])),_:2},1032,["style","class"])))),128))])),_:1})):u("",!0),2==_.type||3==_.type||4==_.type||5==_.type?(e(),s(v,{key:1},{default:a((()=>[(e(!0),d(m,null,c(b.months,((t,i)=>(e(),s(x,{style:n($.contentStyl),key:i,class:r(["fui-date__picker-text",{"fui-dpk__color-dark":"dark"===_.theme}])},{default:a((()=>[h(o($.formatVal(t))+o(_.unit?_.month_t:""),1)])),_:2},1032,["style","class"])))),128))])),_:1})):u("",!0),3==_.type||4==_.type||5==_.type?(e(),s(v,{key:2},{default:a((()=>[(e(!0),d(m,null,c(b.days,((t,i)=>(e(),s(x,{style:n($.contentStyl),key:i,class:r(["fui-date__picker-text",{"fui-dpk__color-dark":"dark"===_.theme}])},{default:a((()=>[h(o($.formatVal(t))+o(_.unit?_.day_t:""),1)])),_:2},1032,["style","class"])))),128))])),_:1})):u("",!0),4==_.type||5==_.type||6==_.type||7==_.type?(e(),s(v,{key:3},{default:a((()=>[(e(!0),d(m,null,c(b.hours,((t,i)=>(e(),s(x,{style:n($.contentStyl),key:i,class:r(["fui-date__picker-text",{"fui-dpk__color-dark":"dark"===_.theme}])},{default:a((()=>[h(o($.formatVal(t))+o(_.unit?"时":""),1)])),_:2},1032,["style","class"])))),128))])),_:1})):u("",!0),5==_.type||6==_.type||7==_.type||8==_.type?(e(),s(v,{key:4},{default:a((()=>[(e(!0),d(m,null,c(b.minutes,((t,i)=>(e(),s(x,{style:n($.contentStyl),key:i,class:r(["fui-date__picker-text",{"fui-dpk__color-dark":"dark"===_.theme}])},{default:a((()=>[h(o($.formatVal(t))+o(_.unit?"分":""),1)])),_:2},1032,["style","class"])))),128))])),_:1})):u("",!0),7==_.type||8==_.type?(e(),s(v,{key:5},{default:a((()=>[(e(!0),d(m,null,c(b.seconds,((t,i)=>(e(),s(x,{style:n($.contentStyl),key:i,class:r(["fui-date__picker-text",{"fui-dpk__color-dark":"dark"===_.theme}])},{default:a((()=>[h(o($.formatVal(t))+o(_.unit?"秒":""),1)])),_:2},1032,["style","class"])))),128))])),_:1})):u("",!0)])),_:1},8,["mask-top-style","mask-bottom-style","mask-style","indicator-style","indicator-class","style","value","immediate-change","onChange"]))])),_:1},8,["onTouchstart"])])),_:1},8,["class","style"]))])),_:1},8,["onTouchend"])}],["__scopeId","data-v-76cf6570"]]);export{_};
