<template>
    <view class="page-warp bg-white" :data-theme="userTheme">
        <fui-nav-bar zIndex="1"
                     isFixed
                     isOccupy
                     :padding="15"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('financing.t81')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        
        <view class="exchange-symbol">
            <view class="currency-label bg-gray"
                  :style="`transform: ${isLabel1First ? 'translateY(0)' : 'translateY(116%)'}`">
                <view class="label-top">
                    <view class="intro" @click="showCurrencyPopup(0)">
                        <image class="currency-image" :src="baseCurrency.icon || '/static/coin/usdt.png'" mode="widthFix"></image>
                        <text class="font-16 font-bold color-black mr-5">{{ baseCurrency.symbol }}</text>
                        <fui-icon name="arrowright" size="38" color="var(--content-tertiary)"></fui-icon>
                    </view>
                    <input class="input font-16 font-bold color-black" placeholder="0" type="text" v-model="inputValue1" @input="handleInput1">
                </view>
                <view class="label-bottom">
                    <text class="font-12 color-gray">可用 {{ baseBalance }}</text>
                </view>
            </view>
            
            <view class="line"></view>
            
            <view class="currency-label bg-gray"
                  :style="`transform: ${isLabel1First ? 'translateY(0)' : 'translateY(-116%)'}`">
                <view class="label-top">
                    <view class="intro" @click="showCurrencyPopup(1)">
                        <image class="currency-image" :src="targetCurrency.icon || '/static/coin/usdt.png'" mode="widthFix"></image>
                        <text class="font-16 font-bold color-black mr-5">{{ targetCurrency.symbol }}</text>
                        <fui-icon name="arrowright" size="38" color="var(--content-tertiary)"></fui-icon>
                    </view>
                    <input class="input font-16 font-bold color-black" v-model="inputValue2" @input="handleInput2" placeholder="0" type="text">
                </view>
                <view class="label-bottom">
                    <text class="font-12 color-gray">≈ ${{ targetCurrencyPrice }}</text>
                </view>
            </view>
            
            <view class="price-box">
                <text class="font-12 color-gray">1 {{ baseCurrency.symbol }} ≈ {{ exchangeRate }} {{ targetCurrency.symbol }}</text>
            </view>
            
            <view class="exchange-button" @click="swapLabels">
                <image class="icon" :src="`/static/wallet/exchange-${userTheme}.png`"></image>
            </view>
        </view>
        
        <view class="confirm" :class="isBalanceSufficient ? 'bg-black' : 'bg-gray'">
            <text class="font-14 font-bold color-gray" v-if="!isBalanceSufficient">{{ baseCurrency.symbol }}余额不足</text>
            <text class="font-14 font-bold color-white" @click="exchange()" v-else>兑换</text>
        </view>
        
        <uni-popup ref="currencyPopup" type="bottom" :safe-area="false">
            <view class="currency-popup-warp bg-white" :style="`height: ${$device.windowHeight}px`">
                <fui-nav-bar statusBar isOccupy
                             :title="$t('financing.t95')"
                             @leftClick="$refs.currencyPopup.close()"
                             background="var(--background-primary)"
                             color="var(--content-primary)">
                    <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
                </fui-nav-bar>
                
                <view class="currency-list-container" :style="`height: ${$device.windowHeight - navHeight}px`">
                    <coin-indexed-xlist name-key="symbol"
                                        nameKey="symbol"
                                        :dataList="coinArr"
                                        :showAvatar="true"
                                        @itemclick="currencyChange">
                    </coin-indexed-xlist>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
import { mapGetters } from "vuex";
import commonApi from '/common/api/common.js';
import currencyApi from '@/common/api/currency.js';
import userApi from '@/common/api/user.js';

export default {
    data() {
        return {
            navHeight: "",
            isLabel1First: true,
            coinArr: [],
            baseCurrency: { symbol: '', icon: '', balance: 0 },
            targetCurrency: { symbol: '', icon: '', balance: 0 },
            baseBalance: 0,
            baseCurrencyPrice: 0,
            targetCurrencyPrice: 0,
            inputValue1: '',
            inputValue2: ''
        };
    },
    computed: {
        ...mapGetters(['userTheme', 'isLogin']),
        exchangeRate() {
            return (this.baseCurrencyPrice && this.targetCurrencyPrice) 
                   ? (this.baseCurrencyPrice / this.targetCurrencyPrice).toFixed(8) 
                   : 0;
        },
        isBalanceSufficient() {
            return parseFloat(this.inputValue1) <= parseFloat(this.baseBalance);
        }
    },
    mounted() {
        this.initializeCurrency();
    },
    methods: {
        async initializeCurrency() {
            if (!this.isLogin) {
                return uni.redirectTo({ url: "/pages/login/login" });
            }
            try {
                const res = await commonApi.getAccountCurrency();
                this.coinArr = res.data;
                this.baseCurrency = this.coinArr.find(coin => coin.symbol === 'USDT') || this.coinArr[0];
                this.targetCurrency = this.coinArr.find(coin => coin.symbol === 'BTC') || this.coinArr[1];
                await this.updateBalancesAndPrices();
            } catch (error) {
                console.error("Failed to load currencies:", error);
            }
        },
        async updateBalancesAndPrices() {
            await Promise.all([this.getBalance(this.baseCurrency), this.getBalance(this.targetCurrency)]);
            await this.getCurrencyPrice(this.baseCurrency);
            await this.getCurrencyPrice(this.targetCurrency);
            this.updateExchangeRate();
        },
        async getBalance(currency) {
            try {
                const res = await userApi.getCurrencyBalance(currency.id);
                currency.balance = res.data.balance;
                this.baseBalance = currency.id === this.baseCurrency.id ? currency.balance : this.baseBalance;
            } catch (error) {
                console.error(`Failed to get balance for ${currency.symbol}:`, error);
            }
        },
        async getCurrencyPrice(currency) {
            try {
                const res = await currencyApi.getCurrencyInfo(currency.id, 1, 0);
                if (currency.id === this.baseCurrency.id) {
                    this.baseCurrencyPrice = res.data.new_price;
                } else {
                    this.targetCurrencyPrice = res.data.new_price;
                }
            } catch (error) {
                console.error(`Failed to get price for ${currency.symbol}:`, error);
            }
        },
        async swapLabels() {
            [this.baseCurrency, this.targetCurrency] = [this.targetCurrency, this.baseCurrency];
            [this.baseCurrencyPrice, this.targetCurrencyPrice] = [this.targetCurrencyPrice, this.baseCurrencyPrice];

            this.updateExchangeRate();
            await this.updateBalancesAndPrices();

            this.handleInput1();
        },
        updateExchangeRate() {
            this.exchangeRate = (this.baseCurrencyPrice && this.targetCurrencyPrice) 
                                ? (this.baseCurrencyPrice / this.targetCurrencyPrice).toFixed(8) 
                                : 0;
        },
        handleInput1() {
            if (parseFloat(this.baseBalance) === 0) {
                this.inputValue1 = '0.00000000';
                this.inputValue2 = '0.00000000';
                return;
            }
            if (this.inputValue1 === '') {
                this.inputValue2 = '';
                return;
            }
            this.inputValue2 = (this.inputValue1 * this.exchangeRate).toFixed(8);
        },
        handleInput2() {
            if (parseFloat(this.baseBalance) === 0) {
                this.inputValue1 = '0.00000000';
                this.inputValue2 = '0.00000000';
                return;
            }
            this.inputValue1 = (this.inputValue2 / this.exchangeRate).toFixed(8);
        },
        async updateBalances() {
            try {
                const baseBalanceRes = await userApi.getCurrencyBalance(this.baseCurrency.id);
                const targetBalanceRes = await userApi.getCurrencyBalance(this.targetCurrency.id);
                
                this.baseBalance = baseBalanceRes.data.balance;
                this.targetBalance = targetBalanceRes.data.balance;
            } catch (error) {
                console.error("Failed to update balances:", error);
            }
        },
        showCurrencyPopup(id) {
            this.show_id = id;
            this.$refs.currencyPopup.open();
        },
        async currencyChange(event) {
            this.$refs.currencyPopup.close();
            if (this.show_id === 0) {
                this.baseCurrency = event;
            } else {
                this.targetCurrency = event;
            }
            await this.updateBalancesAndPrices();
            this.handleInput1();
        },
        async exchange() {
            if (parseFloat(this.inputValue1) > 0) {
                try {
                    await commonApi.fastExchange({
                        key1: this.inputValue1,
                        key2: this.inputValue2,
                        currency1: this.baseCurrency.id,
                        currency2: this.targetCurrency.id,
                    });
                    uni.showToast({ title: '兑换成功', icon: "success" });
					
                } catch (error) {
                    console.error("Exchange failed:", error);
                    uni.showToast({ title: '兑换失败', icon: "none" });
                }
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/wallet/wallet'
					});
				}, 1500);
            } else {
                uni.showToast({ title: '请输入兑换数量', icon: "none" });
            }
        }
    }
};
</script>

<style scoped>
@import "instant-exchange.css";
</style>
