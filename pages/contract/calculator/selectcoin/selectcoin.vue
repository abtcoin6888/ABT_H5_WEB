<template>
    <view class="selectCoin" :data-theme="userTheme">
        <fui-nav-bar isFixed 
                     isOccupy 
                     statusBar
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('recod.t3')" 
                     @leftClick="$mroute.back()" 
                     @init="navInit">
            <fui-icon name="arrowleft" 
                      size="56" 
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="search-box" :style="{'top': navHeight + 'px'}">
            <view class="search-box_box bg-gray">
                <fui-icon name="search" size="36" color="var(--content-tertiary)"></fui-icon>
                <input type="text"
                       class="font-13 color-black font-weight"
                       :placeholder="$t('trade.search_cc')"
                       placeholder-class="placeholder">
            </view>
        </view>
        <scroll-view scroll-y class="scrollView" :style="{'height': scrollHeight + 'px'}">
            <view class="cell" v-for="(item,index) in coinList" :key="index" @click="setC(item)">
                <text class="font-14 color-black font-weight mr-10">
                    {{ item['symbol'] }}USDT
                </text>
                <fui-tag :text="$t('contract.p1')" :isBorder="false" :padding="['8rpx','16rpx']" radius="4"
                         marginLeft="10" size="20" type="warning" theme="light"></fui-tag>
            </view>
        </scroll-view>
    </view>
</template>
<script>
import {mapGetters} from 'vuex';
import currencyApi from "@/common/api/currency";

export default {
    data() {
        return {
            windowHeight: "",
            scrollHeight: "",
            navHeight: "",
            coinList: []
        }
    },
    mounted() {
        this.getContractMatches();
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        navInit(e) {
            console.log(e);
            this.navHeight = e.height - e.statusbarHeight;
            this.windowHeight = uni.getSystemInfoSync().windowHeight;
            this.scrollHeight = this.windowHeight - this.navHeight;
        },
        setC(coin){
            uni.$emit('setC',coin);
            uni.navigateBack();
        },
        async getContractMatches() {
            let matches = uni.getStorageSync('contract-matches');
            if (matches == '' || typeof matches == 'undefined') {
                console.log('reload');
                matches = await currencyApi.contractCurrencyList();
                uni.setStorageSync('contract-matches', matches.data);
                matches = matches.data;
            }
            this.coinList = matches[0]['currency'];
            console.log(this.coinList)
        },
    }
}
</script>

<style lang="scss" scoped>
.selectCoin {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    .search-box {
        width: 100%;
        height: 88rpx;
        padding: 0 30rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        position: sticky;
        z-index: 9;
        background: var(--background-primary);

        &_box {
            width: 100%;
            height: 78rpx;
            border-radius: 78rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16rpx;
            box-sizing: border-box;

            input {
                width: calc(100% - 50rpx);
                height: 78rpx;
                font-size: 26rpx;
                color: var(--content-primary);
            }
        }
    }

    .scrollView {
        width: 100%;
        padding: 0 30rpx;
        box-sizing: border-box;

        .cell {
            width: 100%;
            height: 88rpx;
            display: flex;
            align-items: center;
        }
    }
}
</style>