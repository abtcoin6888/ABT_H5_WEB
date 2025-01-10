<template>
    <view class="liveCoin" :data-theme="userTheme" id="liveCoin">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     :title="$t('more.deposit')"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
            <template v-slot:right>
                <fui-icon name="info-fill"
                          color="var(--content-tertiary)"
                          size="40"
                          class="mr-10"
                          @click="$mroute.webview(1,'zysx',$t('dp.t1'))">
                </fui-icon>
                <fui-icon name="order-fill"
                          color="var(--content-tertiary)"
                          size="40"
                          @click="toConfirm()">
                </fui-icon>
            </template>
        </fui-nav-bar>
        <!--  -->
        <view class="liveCoin-body">
            <view class="body-head">
                <view class="body-head-cell">
                    <text class="font-13 always-white">
                        {{ $t('dp.t2') }}(USDT)
                    </text>
                    <view class="tag_box" @click="$mroute.liveAuto()">
                        <text class="font-13 always-white">
                            {{ $t('dp.t3') }}
                        </text>
                        <fui-icon name="arrowright" size="40" color="var(--content-always-white)"></fui-icon>
                    </view>
                </view>
                <view class="body-head-cell mt-10">
                    <view class="flex align-center" @click="toRecord()">
                        <text class="font-18 always-white font-weight">
                            {{ $util.float(profit['total'] ? profit['total'] : 0) }}
                        </text>
                        <fui-icon name="arrowright" size="40" color="var(--content-always-white)"></fui-icon>
                    </view>
                </view>
                <view class="body-head-column mt-10">
                    <!-- 今日收益 -->
                    <view class="body-head-column-item">
                        <text class="font-12 always-white">
                            {{ $t('dp.t4') }}
                        </text>
                        <text class="font-14 always-white mt-5">
                            {{ $util.float($util.thousandSeparator(profit['profit'], 8)) }}
                        </text>
                    </view>
                    <!-- 累计收益 -->
                    <view class="body-head-column-item">
                        <text class="font-12 always-white">
                            {{ $t('dp.t5') }}
                        </text>
                        <text class="font-14 always-white mt-5">
                            {{ $util.float($util.thousandSeparator(profit['profit'], 8)) }}
                        </text>
                    </view>
                </view>
            </view>

            <view class="body-banner" @click="$mroute.indexFinance()">
                <image :src="'/static/livecoin/'+adimg" mode="widthFix"></image>
            </view>

            <view class="body-list">
                <view class="not-data" v-if="list.length === 0">
                    <fui-empty
                        :width="180"
                        :height="180"
                        :size="26"
                        color="var(--content-tertiary)"
                        :src="`/static/img/tactic/not_data-${userTheme}.png`"
                        :title="$t('list.not_data')">
                    </fui-empty>
                </view>
                <view class="body-list-item"
                      v-else
                      v-for="(item, index) in list" :key="index"
                      @click="goSubscrition(item)">
                    <view class="body-list-item-coin">
                        <view class="body-list-item-coin-cell">
                            <view class="flex align-center">
                                <image :src="item.icon" mode="widthFix"></image>
                                <text class="font-14 color-black font-weight">
                                    {{ item.symbol }}
                                </text>
                            </view>
                            <button class="button"
                                    @click="goSubscrition(item)">
                                {{ $t('dp.t7') }}
                            </button>
                        </view>
                        <view class="body-list-item-coin-cell mt-10">
                            <view class="flex align-center">
                                <view class="mr-10">
                                    <fui-tag
                                        :isBorder="false"
                                        :padding="['10rpx','16rpx']"
                                        :text="$t('dp.t8') + item.day_rate + '%'"
                                        :size="22"
                                        type="warning"
                                        theme="light">
                                    </fui-tag>
                                </view>
                                <view class="mr-10">
                                    <fui-tag
                                        :isBorder="false"
                                        :padding="['10rpx','16rpx']"
                                        :text="$t('dp.t9') + item.year_rate + '%'"
                                        :size="22"
                                        type="warning"
                                        theme="light">
                                    </fui-tag>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import Api from '@/common/api/deposit';
import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            list: [],
            adimg: "ad_item.webp",
            profit: {
                profit: 0,
                today: 0,
                total: 0
            }
        }
    },
    onShow() {
        var lang = uni.getStorageSync('lang');
        if (lang != 'zh_CN') {
            this.adimg = "ad_item_en.webp";
        }
        this.getItems();
        this.getProfit();
    },
    computed: {
        ...mapGetters(['isLogin', 'userTheme'])
    },
    methods: {
        toRecord() {
            if (!this.isLogin) {
                this.$mroute.login();
                return;
            }
            uni.navigateTo({
                url: "recored/recored"
            })
        },
        getProfit() {
            Api.getProfit().then(res => {
                if (res.code == 200) {
                    this.profit = res.data;
                }

            });
        },
        goSubscrition(item) {
            uni.setStorageSync('deposit-item', item);
            this.$mroute.subscribePage();
        },
        getItems() {
            Api.getItems().then(res => {
                this.list = res.data;
            })
        },
        toConfirm() {
            if (!this.isLogin) {
                this.$mroute.login();
                return;
            }
            uni.navigateTo({
                url: "/pages/index/livecoin/eaorders/eaorders",
            });
        }
    }
}
</script>
<style lang="scss" scoped>
@import "livecoin";
</style>