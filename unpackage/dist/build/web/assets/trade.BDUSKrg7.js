import{bv as r}from"./index-CvJkP8r7.js";const e={tradeSubmit:e=>r.request("api/trade/submit",e,"POST"),tradeOrderList:e=>r.request("api/trade/list",{currency_id:e},"POST"),orderCancel:e=>r.request("api/trade/cancel",{id:e},"POST"),orderHistory:(e,t=1)=>r.request("api/trade/history",{currency_id:e,page:t},"POST")};export{e as t};
