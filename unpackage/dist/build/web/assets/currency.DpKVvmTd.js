import{bv as e}from"./index-Crl9YJuv.js";const r={tradeCurrencyList:(r=0)=>e.request("api/currency/getTradeCurrencyList",{n:r}),contractCurrencyList:()=>e.request("api/currency/getContractCurrencyList"),matchesCurrency:()=>e.request("api/currency/getMatchesCurrency"),getCurrencyInfo:(r,c,t=0)=>e.request("api/currency/currencyinfo",{id:r,cm_id:c,type:t},"POST"),getRechargeLog:r=>e.request("api/currency/rechargeLog",r),getWithLog:r=>e.request("api/account/withRecord",r,"POST"),contractLine:r=>e.request("api/currency/contractLine",r,"POST")};export{r as c};
