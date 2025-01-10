function isLogin() {
    //如果没有登录信息，则在当前页面调用打开auth 的方法
    return new Promise((r, v) => {
        if (uni.getStorageSync('token') == '') {
            uni.navigateTo({
                url: "/pages/login/login",
                animationType: "slide-in-bottom"
            })
            v(false);
        }
        r(true);
    });
}

export default {
    back(i = 0) {
        if (i === 0) {
            uni.navigateBack();
        } else {
            uni.navigateBack({
                delta: i,
            });
        }
    },
    register() {
        uni.navigateTo({
            url: "/pages/auth/register/register",
        });
    },
    forgetpwd() {
        //忘记密码页面
        uni.navigateTo({
            url: "/pages/auth/forget/forget",
        });
    },
    authVerify(type = "phone", account, o = "") {
        uni.navigateTo({
            url:
                "/pages/auth/verify/verify?type=" +
                type +
                "&account=" +
                account +
                "&o=" +
                o,
        });
    },
    setPwd(account, code, o, find = 0) {
        uni.navigateTo({
            url:
                "/pages/auth/setpwd/setpwd?a=" +
                account +
                "&c=" +
                code +
                "&o=" +
                o +
                "&find=" +
                find,
        });
    },
    stoter() {
        uni.navigateTo({
            url: "/pages/auth/stoter/stoter",
        });
    },
    home() {
        uni.navigateTo({
            url: "/pages/home/home",
        });
    },
    userauth() {
        uni.navigateTo({
            url: "/pages/auth/userauth/userauth",
        });
    },
    baseauth() {
        uni.navigateTo({
            url: "/pages/auth/userauth/baseauth/baseauth",
        });
    },
    baseauth2(index) {
        uni.navigateTo({
            url: "/pages/auth/userauth/baseauth/authsetp2?index=" + index,
        });
    },
    authing() {
        uni.navigateTo({
            url: "/pages/auth/userauth/baseauth/authing",
        });
    },
    secrety() {
        uni.navigateTo({
            url: "/pages/common/secrety/secrety/secrety",
        });
    },
    phoneAuth(first, type) {
        uni.navigateTo({
            url:
                "/pages/common/secrety/secrety/phoneAuth?new=" +
                first +
                "&type=" +
                type,
        });
    },
    openGooleAuth() {
        uni.navigateTo({
            url: "/pages/common/secrety/secrety/googleAuth",
        });
    },
    newpwd() {
        uni.navigateTo({
            url: "/pages/common/secrety/secrety/newpwd",
        });
    },
    secretlog() {
        uni.navigateTo({
            url: "/pages/common/secrety/secrety/secretlog",
        });
    },
    setting() {
        uni.navigateTo({
            url: "/pages/common/setting/setting/setting",
        });
    },
    contact() {
        uni.navigateTo({
            url: "/pages/common/contact/contact",
        });
    },
    about() {
        uni.navigateTo({
            url: "/pages/common/about/about",
        });
    },
    async message() {
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url: "/pages/index/message/message",
        });
    },
    async recharge() {
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url: "/pages/index/recharge/recharge",
        });
    },
    async rechargeRecord() {
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url: "/pages/index/recharge/record",
        });
    },
    tabStore() {
        uni.switchTab({
            url: "/pages/store/store",
        });
    },
    switchIndex() {
        uni.switchTab({
            url: "/pages/newindex/newindex",
        });
    },
    editMine(type) {
        uni.navigateTo({
            url: "/pages/store/editMine/editMine?type=" + type,
        });
    },
    coinSearch() {
        uni.navigateTo({
            url: "/pages/store/search/search",
            animationType: "fade-in",
        });
    },
    toKline(t, c, m) {
        uni.navigateTo({
            url: "/pages/trade/kline?type=" + t + "&id=" + c + "&cid=" + m,
        });
    },
    entrust(item) {
        uni.setStorageSync("futures-order", item);
        uni.navigateTo({
            url: "/pages/contract/entrust/entrust",
        });
    },
    contractInfo(symbol = 1) {
        uni.navigateTo({
            url: "/pages/contract/info/info?symbol=" + symbol,
        });
    },
    calculator(symbol = 1) {
        uni.navigateTo({
            url: "/pages/contract/calculator/calculator?symbol=" + symbol,
        });
    },
    contractOrder(symbol = 1) {
        uni.navigateTo({
            url: "/pages/contract/order/order?symbol=" + symbol,
        });
    },
    login() {
        uni.navigateTo({
            url: "/pages/login/login",
            animationType: "slide-in-bottom",
        });
    },
    async withdraw() {
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url: "/pages/wallet/withdraw/withdraw",
        });
    },
    async exchange(id = 0) {
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url: "/pages/wallet/exchange/exchange?id=" + id,
        });
    },
    async cashflow() {
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url: "/pages/wallet/cashflow/cashflow",
        });
    },
    async walletInfo(tab) {
        return false;
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url: "/pages/wallet/info/info?item=" + JSON.stringify(tab),
        });
    },
    notice() {
        uni.navigateTo({
            url: "/pages/index/notice/notice",
        });
    },
    content(id = 0) {
        uni.navigateTo({
            url: "/pages/wallet/info/content/content?id=" + id,
        });
    },
    async invaite() {
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url: "/pages/index/invaite/invaite",
        });
    },
    invaiteRules() {
        uni.navigateTo({
            url: "/pages/index/invaite/rules/rules",
        });
    },
    indexFinance() {
        uni.navigateTo({
            url: "/pages/index/finance/finance",
        });
    },
    financeInfo(id = 0) {
        uni.navigateTo({
            url: "/pages/index/finance/info/info?id=" + id,
        });
    },
    financeConfirm(id = 0) {
        uni.navigateTo({
            url: "/pages/index/finance/confirm/confirm?id=" + id,
        });
    },
    financeHelp() {
        uni.navigateTo({
            url: "/pages/index/finance/help/help",
        });
    },
    indexMore() {
        uni.navigateTo({
            url: "/pages/index/more/more",
        });
    },
    switchContract() {
        uni.switchTab({
            url: "/pages/newContract/newContract",
        });
    },
    switchTrade() {
        uni.switchTab({
            url: "/pages/trade/trade",
        });
    },
    floworder() {
        uni.navigateTo({
            url: "/pages/index/floworder/floworder",
        });
    },
    traderinfo(id = 0) {
        uni.navigateTo({
            url: "/pages/index/floworder/traderinfo/traderinfo?id=" + id,
        });
    },
    tradeConfirm(id = 0) {
        uni.navigateTo({
            url: "/pages/index/floworder/confirm/confirm?id=" + id,
        });
    },
    tradeMine() {
        uni.navigateTo({
            url: "/pages/index/floworder/mine/mine",
        });
    },
    flowFocus() {
        uni.navigateTo({
            url: "/pages/index/floworder/focus/focus",
        });
    },
    flowApply() {
        uni.navigateTo({
            url: "/pages/index/floworder/apply/apply",
        });
    },
    applyForm() {
        uni.navigateTo({
            url: "/pages/index/floworder/apply/applyForm/applyForm",
        });
    },
    traderorder() {
        uni.navigateTo({
            url: "/pages/index/floworder/traderorder/traderorder",
        });
    },
    blindbox() {
        uni.navigateTo({
            url: "/pages/index/blindbox/blindbox",
        });
    },
    registerBlindbox(){
        uni.navigateTo({
            url: "/pages/registerBlindbox/registerBlindbox",
        });
    },
    futures() {
        uni.navigateTo({
            url: "/pages/index/futures/futures",
        });
    },
    profile() {
        uni.navigateTo({
            url: "/pages/index/profile/profile",
        });
    },
    authhight() {
        uni.navigateTo({
            url: "/pages/auth/userauth/baseauth/authhight/authhight",
        });
    },
    setHandPwd() {
        uni.navigateTo({
            url: "/pages/common/secrety/secrety/handPwd",
        });
    },
    webview(type, params, title = "", extend = 0) {
        //1 文章code 2 url
        uni.navigateTo({
            url:
                "/pages/common/webview/webview?type=" +
                type +
                "&params=" +
                escape(params) +
                "&title=" +
                title +
                "&ext=" +
                extend
        });
    },
    tradeList() {
        uni.navigateTo({
            url: "/pages/trade/list/list",
        });
    },
    downloadPage() {
        uni.navigateTo({
            url: "/pages/download/download",
        });
    },
    async livePage() {
        uni.navigateTo({
            url: "/pages/index/livecoin/livecoin",
        });
    },
    async liveAuto() {
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url: "/pages/index/livecoin/auto/auto",
        });
    },
    async eaorderPage() {
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url: "/pages/index/livecoin/eaorders/eaorders",
        });
    },
    async subscribePage() {
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url: "/pages/index/livecoin/subscribe/subscribe",
        });
    },
    uflestaPage() {
        uni.navigateTo({
            url: "/pages/index/flesta/flesta",
        });
    },
    setLink() {
        uni.navigateTo({
            url: "/pages/index/invaite/setlink/setlink"
        })
    },
    addLink() {
        uni.navigateTo({
            url: "/pages/index/invaite/setlink/addlink/addlink"
        })
    },
    myrebate() {
        uni.navigateTo({
            url: "/pages/index/invaite/myrebate/myrebate"
        })
    },
    recordInfo(info) {
        uni.setStorageSync('recharge', info);
        uni.navigateTo({
            url: "/pages/index/recharge/recordInfo/recordInfo"
        })
    },
    withrecord() {
        uni.navigateTo({
            url: "/pages/wallet/withdraw/record"
        })
    },
    welfare() {
        uni.navigateTo({
            url: "/pages/index/welfare/welfare"
        })
    },
    rewardsInfo() {
        uni.navigateTo({
            url: "/pages/index/welfare/rewards/rewards"
        })
    },
    toSelectCoin() {
        uni.navigateTo({
            url: "/pages/contract/calculator/selectcoin/selectcoin"
        })
    },
    async toQuickly() {
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url: "/pages/contract/quickly/quickly"
        })
    },
    async toQuicklyMoon(moonKey) {
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url:
                "/pages/common/webview/webview?type=" +
                2 +
                "&params=https://buy-sandbox.moonpay.com/?apiKey=" + moonKey +
                "&title=" +
                "Buy coins quickly" +
                "&ext=" +
                0
        });
    },
    toMyorder() {
        uni.navigateTo({
            url: "/pages/contract/quickly/myorder/myorder"
        })
    },
    toMerchants() {
        uni.navigateTo({
            url: "/pages/contract/quickly/merchants/merchants"
        })
    },
    toPaymentMethod() {
        uni.navigateTo({
            url: "/pages/contract/quickly/payment/payment"
        })
    },
    toAddMethod() {
        uni.navigateTo({
            url: "/pages/contract/quickly/payment/addmethod/addmethod"
        })
    },
    addNext(type) {
        uni.navigateTo({
            url: "/pages/contract/quickly/payment/addmethod/detail/detail?type=" + type
        })
    },
    toPayStatus() {
        uni.navigateTo({
            url: "/pages/contract/quickly/paystatus/paystatus"
        })
    },
    toSelldetail() {
        uni.navigateTo({
            url: "/pages/contract/quickly/selldetail/selldetail"
        })
    },
    async toIce() {
        if (!(await isLogin())) {
            return;
        }
        uni.navigateTo({
            url: "/pages/ice/ice"
        })
    },
    toThememode() {
        uni.navigateTo({
            url: "/pages/common/setting/setting/thememode/thememode"
        })
    },
    onlineService() {
        uni.navigateTo({
            url: "/pages/index/onlineService/onlineService"
        })
    },
    // 策略
    toTactic() {
        uni.navigateTo({
            url: "/pages/contract/tactic/tactic"
        })
    },
    // 策略详情
    policyDetails(gird_id, type_id) {
        uni.navigateTo({
            url: "/pages/contract/tactic/myStrategy/policyDetails/policyDetails?gird_id=" + gird_id + "&type_id=" + type_id
        })
    },
    // 创建策略
    creations(e) {
        uni.navigateTo({
            url: "/pages/contract/tactic/createPolicy/creation/creation?type_id=" + e.id
        })
    },
    // 策略参数
    policyParameter(id, type_id) {
        uni.navigateTo({
            url: "/pages/contract/tactic/policyParameter/policyParameter?id=" + id + '&type_id=' + type_id
        })
    },
    // 合约新增订单页
    newOrders() {
        uni.navigateTo({
            url: "/pages/contract/orders/orders"
        })
    },
    // 合约新增订单详情页
    newOrderDetails() {
        uni.navigateTo({
            url: "/pages/contract/orders/orderDetails/orderDetails"
        })
    },
    scanLogin() {
        uni.navigateTo({
            url: "/pages/scanLogin/scanLogin"
        })
    },
    analyze() {
        uni.navigateTo({
            url: "/pages/wallet/analyze/analyze"
        })
    },
    analyzeDetails() {
        uni.navigateTo({
            url: "/pages/wallet/analyze/datedetails/datedetails"
        })
    },
    addressBook(){
        uni.navigateTo({
            url: "/pages/wallet/withdraw/addressBook/addressBook"
        })
    },
    toAddAddress(){
        uni.navigateTo({
            url: "/pages/wallet/withdraw/addressBook/addAddress/addAddress"
        })
    },
    toInstantExchange(){
        uni.navigateTo({
            url: "/pages/instant-exchange/instant-exchange"
        })
    },
    toJumpstart(){
        uni.navigateTo({
            url: "/pages/jumpstart/jumpstart"
        })
    },
    toEventdetails(id){
        uni.navigateTo({
            url: "/pages/jumpstart/event-details/event-details?id=" + id
        })
    },
    toViewMore(){
        uni.navigateTo({
            url: "/pages/jumpstart/view-more/view-more"
        })
    }
};
