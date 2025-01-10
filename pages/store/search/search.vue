<template>
    <view class="searchWrap" :data-theme="userTheme" :platform="$platform">
        <fui-nav-bar statusBar
                     :padding="0"
                     isFixed
                     isOccupy
                     background="var(--background-new)"
                     zIndex="9"
                     custom
                     @init="navInit">
            <view class="nav-bar">
                <fui-search-bar :paddingLr="0"
                                :height="68"
                                :radius="68"
                                background="var(--background-new)"
                                inputBackground="var(--background-secondary)"
                                cancelColor="var(--content-primary)"
                                searchColor="var(--color-primary)"
                                color="var(--content-primary)"
                                :placeholder="this.$t('search.please_enter')"
                                v-model="value"
                                :focus="true"
                                :searchText="$t('wallete.search')"
                                :cancelText="$t('login.cancel')"
                                @search="onSearch"
                                @cancel="back"
                                @clear="value = ''">
                </fui-search-bar>
            </view>
        </fui-nav-bar>
        <scroll-view scroll-y="true"
                     class="scroll-view"
                     :style="`height:${scrollHeight}px`">
            <!--       历史搜索 -->
            <view class="historical-search"
                  v-if="history.length != 0">
                <view class="title-box">
                    <text>
                        {{ $t('search.history_search') }}
                    </text>
                    <view class="delete-box" @click="clearHistory()">
                        <image :src="`/static/newImage/delete-${userTheme}.png`" mode="widthFix"></image>
                    </view>
                </view>
                <view class="tag-group">
                    <view class="item"
                          v-for="(item,index) in history" :key="'h' + item.iid"
                          @click="$mroute.toKline(0, item.id, 1)">
                        <text class="font-weight">
                            {{ item.symbol }}
                        </text>
                        <text>/ USDT</text>
                    </view>
                </view>
            </view>
            <!--       热门搜索 -->
            <template v-if="list.length != 0">
                <view class="hot-title">
                    <text>
                        {{ $t('search.hot_search') }}
                    </text>
                </view>
                <view class="hot-list">
                    <template v-for="(item,index) in list" :key="index">
                        <view class="hot-item" @click="addHistory(index)">
                            <view class="hot-item-left">
                                <view class="collect-box">
                                    <image src="/static/img/tactic/sc-n.webp"
                                           mode="widthFix"
                                           @click="selected(index)"
                                           v-if="!item.select || item.select == 0">
                                    </image>
                                    <image src="/static/img/tactic/sc-s.webp"
                                           mode="widthFix"
                                           @click="deleted(index)"
                                           v-if="item.select && item.select != 0">
                                    </image>
                                </view>
                                <view class="row">
                                    <text class="font-weight">
                                        {{ item.symbol }}
                                    </text>
                                    <text>
                                        / USDT
                                    </text>
                                    <text class="mini-tag"
                                          v-if="item.is_contract == 1">
                                        {{ $t('tab.contract') }}
                                    </text>
                                    <text class="mini-tag"
                                          v-if="item.is_trade == 1">
                                        {{ $t('index.spot') }}
                                    </text>
                                    <text class="mini-tag"
                                          v-if="item.is_futures == 1">
                                        {{ $t('search.option') }}
                                    </text>
                                </view>
                            </view>
                            <view class="hot-item-right">
                                <view class="column">
                                    <text class="color-black font-weight"
                                          :class="{'price_down': item.change_rate < 0, 'price_up': item.change_rate > 0}">
                                        {{ $util.thousandSeparator(item.new_price, item.decimals) }}
                                    </text>
                                    <text class="color-black"
                                          :class="{'price_down': item.change_rate < 0, 'price_up': item.change_rate > 0}">
                                        {{ item.change_rate ? item.change_rate : '--' }}%
                                    </text>
                                </view>
                            </view>
                        </view>
                    </template>
                </view>
            </template>
            <!--       没有数据 -->
            <empty-view :visible="list.length == 0"
                        :width="750"
                        :height="700"
                        :title="$t('list.not_data')">
            </empty-view>
        </scroll-view>
    </view>
</template>

<script>
import currencyApi from '/common/api/currency.js';
import emptyView from "@/components/emptyView/emptyView.vue";

import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex';

var defaultList;
export default {
    components: {
        emptyView
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    data() {
        return {
            value: "",
            list: [],
            history: [],
            scrollHeight: ""
        }
    },
    onReady() {
        this.getMatchesList();
        this.history = uni.getStorageSync('chistory');
    },
    watch: {
        value(v) {
            this.list = defaultList.filter(item => item.symbol.toLowerCase().includes(v.toLowerCase()));
        }
    },
    methods: {
        navInit(e) {
            var navBarHeight = e.height + e.statusBarHeight;
            this.scrollHeight = this.$device.windowHeight - navBarHeight;
        },
        back() {
            console.log(1);
            uni.navigateBack({
                animationType: "fade-out",
                animationDuration: 200
            })
            //this.$mroute.back();
        },
        clearHistory() {
            uni.removeStorageSync('chistory');
            this.history = [];
        },
        addHistory(index) {
            var history = uni.getStorageSync('chistory');
            if (typeof history == 'undefined' || !history) {
                history = [];
            }
            history = history.filter(item => item.id != this.list[index].id);
            history.push(this.list[index]);
            uni.setStorageSync('chistory', history);
            this.history = history;
            this.$mroute.toKline(0, this.list[index].id, 1);

        },
        toKlines(item) {
            this.$mroute.toKline();
        },
        selected(index) {
            this.list = this.list.map((val, idx, arr) => {
                if (idx == index) {
                    val['select'] = 1;
                }
                return val;
            });
            if (this.list[index]['is_contract'] == 1) {
                var contradeList = uni.getStorageSync('select-contract');
                contradeList.filter(item => item.id != this.list[index].id);
                contradeList.push(this.list[index]);
                uni.setStorageSync('select-contract', contradeList);
            }
            if (this.list[index]['is_trade'] == 1) {
                var tradeList = uni.getStorageSync('select-trade');
                tradeList.filter(item => item.id != this.list[index].id);
                tradeList.push(this.list[index]);
                uni.setStorageSync('select-trade', tradeList);
            }
            uni.setStorageSync('load', 1);
            uni.$emit('addSelect');
            uni.showToast({
                title: this.$t('trade.ts1'),
                icon: 'none'
            })
        },
        deleted(index) {
            var change;
            this.list = this.list.map((val, idx, arr) => {
                if (idx == index) {
                    val['select'] = 0;
                    change = val;
                }
                return val;
            });
            //这样写有点傻逼，算了后面再改吧
            if (change['is_contract'] == 1) {
                //合约的自选的删除
                var contradeList = uni.getStorageSync('select-contract');
                contradeList = contradeList.filter(item => item.id != change.id);
                uni.setStorageSync('select-contract', contradeList);
            }
            if (change['is_trade'] == 1) {
                //现货的自选的删除
                var tradeList = uni.getStorageSync('select-trade');
                tradeList = tradeList.filter(item => item.id != change.id);
                uni.setStorageSync('select-trade', tradeList);
            }
            uni.setStorageSync('load', 1);
            uni.$emit('addSelect');
            uni.showToast({
                title: this.$t('trade.ts2'),
                icon: 'none'
            })
        },
        async getMatchesList() {
            var list = await currencyApi.matchesCurrency();
            var tradeList = uni.getStorageSync('select-trade');
            if (typeof tradeList == 'undefined' || tradeList.length == 0) {
                tradeList = [];
            }
            var contractList = uni.getStorageSync('select-contract');
            if (typeof contractList == 'undefined' || contractList.length == 0) {
                contractList = [];
            }
            if (list.code == 200) {
                for (var i = 0; i < list.data.length; i++) {
                    list.data = list.data.filter(item => !this.hideFutures(item.is_futures));

                    if (list.data[i]['is_trade'] == 1 && tradeList.length > 0) {
                        list.data[i]['select'] = tradeList.filter(item => item.id == list.data[i]['id']);
                    }
                    if (list.data[i]['is_contract'] == 1 && contractList.length > 0) {
                        list.data[i]['select'] = contractList.filter(item => item.id == list.data[i]['id']);
                    }
                }
                defaultList = list.data;
                this.list = list.data;
            }
        },
        hideFutures(item){
            if(item == 1) {
                return true
            } else {
                return  false
            }
        },
        onSearch(e) {
            this.value = e.detail.value;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "search";
</style>

<style scoped>
/deep/ .fui-search__bar-input {
    font-size: 28rpx !important;
}

/deep/ .fui-search__bar-btn {
    font-size: 28rpx !important;
}

/deep/ .fui-search__bar-pl {
    line-height: 78rpx;
    color: var(--color-text-gray) !important;
    font-weight: normal !important;
}
</style>
