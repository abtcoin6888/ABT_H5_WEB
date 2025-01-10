<template>
    <view class="eaOrders" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     :title="$t('wallete.sub_record')"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="eaOrders-body">
            <view class="eaOrders-body-tabs">
                <fui-tabs scroll
                          alignLeft
                          :height="88"
                          background="var(--background-primary)"
                          color="var(--content-tertiary)"
                          selectedSize="28"
                          selectedColor="var(--content-primary)"
                          slider-background="var(--content-primary)"
                          scale="1"
                          :short="false"
                          :current="active"
                          :tabs="tabList"
                          @change="active = $event.index">
                </fui-tabs>
            </view>
            <view class="eaOrders-body-container"
                  :style="{'height': ($device.windowHeight - navHeight - 44) + 'px'}">
                <swiper class="swiper"
                        :current="active"
                        :duration="300"
                        @change="swiperChange">
                    <!-- 奔富理财 -->
                    <swiper-item class="swiper-item">
                        <scroll-view scroll-y
                                     class="scroll"
                                     @scrolltolower="getBuyList()">
                            <view class="not-data" v-if="buyList.length === 0">
                                <fui-empty
                                    :width="180"
                                    :height="180"
                                    :size="26"
                                    color="var(--content-tertiary)"
                                    :src="`/static/img/tactic/not_data-${userTheme}.png`"
                                    :title="$t('list.not_data')">
                                </fui-empty>
                            </view>
                            <view class="scroll-item"
                                  v-else
                                  v-for="(item,idx) in buyList"
                                  :key="idx">
                                <view class="scroll-item-cell">
                                    <text class="font-14 color-black font-weight">
                                        {{ item.product.name }}
                                    </text>
                                </view>
                                <view @click="toInfo(item.id)">
                                    <!-- 申购时间 -->
                                    <view class="scroll-item-cell">
                                        <text class="font-13 color-gray">
                                            {{ $t('financing.t3') }}
                                        </text>
                                        <text class="font-13 color-black">
                                            {{ item.created_at }}
                                        </text>
                                    </view>
                                    <!-- 申购数量 -->
                                    <view class="scroll-item-cell">
                                        <text class="font-13 color-gray">
                                            {{ $t('financing.t4') }}
                                        </text>
                                        <text class="font-13 color-black">
                                            {{ $util.thousandSeparator(item.amount) }}
                                            {{ item.product.buy_currency.symbol }}
                                        </text>
                                    </view>
                                    <!-- 期限 -->
                                    <view class="scroll-item-cell">
                                        <text class="font-13 color-gray">
                                            {{ $t('financing.t8') }}
                                        </text>
                                        <text class="font-13 color-black">
                                            {{ item.product.time_limit }}
                                            {{ $t('financing.t10') }}
                                        </text>
                                    </view>
                                    <!-- 状态 -->
                                    <view class="scroll-item-cell">
                                        <text class="font-13 color-gray">
                                            {{ $t('financing.t9') }}
                                        </text>
                                        <text class="font-13 color-black" v-if="item.status === 1">
                                            {{ $t('financing.t12') }}
                                        </text>
                                        <text class="font-13 color-black" v-if="item.status === 2">
                                            {{ $t('financing.t13') }}
                                        </text>
                                        <text class="font-13 color-black" v-if="item.status === 3">
                                            {{ $t('financing.t14') }}
                                        </text>
                                    </view>
                                </view>
                            </view>
                        </scroll-view>
                    </swiper-item>
                    <!-- 质押生息 -->
                    <swiper-item class="swiper-item">
                        <scroll-view scroll-y
                                     class="scroll"
                                     @scrolltolower="getDepositList()">
                            <view class="not-data" v-if="depositList.length === 0">
                                <fui-empty
                                    :width="180"
                                    :height="180"
                                    :size="26"
                                    color="var(--content-tertiary)"
                                    :src="`/static/img/tactic/not_data-${userTheme}.png`"
                                    :title="$t('list.not_data')">
                                </fui-empty>
                            </view>
                            <view class="scroll-item"
                                  v-else
                                  v-for="(item,index) in depositList"
                                  :key="index">
                                <view class="scroll-item-cell image-cell" v-if="item.currency">
                                    <view class="flex align-center">
                                        <image :src="item.currency.icon" mode="widthFix"></image>
                                        <text class="font-14 color-black font-weight">
                                            {{ item.currency.symbol }}
                                        </text>
                                    </view>
                                </view>
                                <view>
                                    <view class="scroll-item-cell">
                                        <text class="font-13 color-gray">
                                            {{ $t('financing.t3') }}
                                        </text>
                                        <text class="font-13 color-black">
                                            {{
                                                $util.dateFormatter(item.created_at, 'y-m-d')
                                            }}
                                        </text>
                                    </view>
                                    <view class="scroll-item-cell">
                                        <text class="font-13 color-gray">
                                            {{ $t('financing.t4') }}
                                        </text>
                                        <text class="font-13 color-black">
                                            {{
                                                $util.thousandSeparator(item.amount)
                                            }}
                                            {{ item.currency ? item.currency.symbol : '' }}
                                        </text>
                                    </view>
                                    <!-- 期限 -->
                                    <view class="scroll-item-cell">
                                        <text class="font-13 color-gray">
                                            {{ $t('financing.t9') }}
                                        </text>
                                        <text class="font-13 color-black" v-if="item.status === 1">
                                            {{ $t('financing.t54') }}
                                        </text>
                                        <text class="font-13 color-black" v-if="item.status === 2">
                                            {{ $t('financing.t55') }}
                                        </text>
                                        <text class="font-13 color-black" v-if="item.status === 3">
                                            {{ $t('financing.t56') }}
                                        </text>
                                    </view>
                                    <view class="scroll-item-cell">
                                        <text class="font-13 color-gray">
                                            {{ $t('financing.t53') }}
                                        </text>
                                        <text class="font-13 color-black">
                                            {{
                                                $util.getDateAddDay(item.created_at, 1)
                                            }}
                                        </text>
                                    </view>
                                </view>
                            </view>
                        </scroll-view>
                    </swiper-item>
                </swiper>
            </view>
        </view>
        <uni-popup ref="alertDialog" type="dialog">
            <uni-popup-dialog type="info"
                              :cancelText="$t('取消')"
                              :confirmText="$t('确定')"
                              :title="$t('financing.t24')"
                              @confirm="dialogConfirm">
            </uni-popup-dialog>
        </uni-popup>
    </view>
</template>

<script>
import financing from '../../../../common/api/financing.js'
import deposit from '../../../../common/api/deposit.js'

import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            active: 0,
            tabList: [],
            height: uni.getWindowInfo().windowHeight,
            page: 1,
            buyList: [],
            depositList: [],
            page2: 1,
            cancel_id: 0,
            cancel_id_idx: 0,

            navHeight: ""
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    mounted() {
        this.getBuyList()
        this.getDepositList()
    },
    onShow() {
        this.setMenu();
    },
    methods: {
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
        },
        setMenu() {
            this.tabList = [
                this.$t('financing.t1'),
                this.$t('financing.t2'),
            ];
        },
        swiperChange(e) {
            this.active = e.detail.current;
        },
        async getBuyList() {
            let res = await financing.buyList({
                page: this.page
            })
            if (res.data.list.length) {
                this.buyList = this.buyList.concat(res.data.list)
            }
            this.page++
        },
        async getDepositList() {
            let res = await deposit.list({
                page: this.page2
            })
            if (res.data.list.length) {
                this.depositList = this.buyList.concat(res.data.list)
            }
            this.page2++
        },
        toInfo(id) {
            uni.navigateTo({
                url: "info/info?id=" + id
            })
        },
        cancel(id, idx) {
            this.$refs.alertDialog.open()
            this.cancel_id = id
            this.cancel_id_idx = idx
        },
        async dialogConfirm() {
            let res = await financing.cancel({
                id: this.cancel_id
            })
            this.buyList[this.cancel_id_idx].status = 2
        },

    }
}
</script>

<style lang="scss">
@import "eaorders.scss";
</style>
<style scoped>
/deep/ .van-icon {
    font-size: 44rpx;
    color: #353537;
}

/deep/ .van-nav-bar {
    background-color: #f8f8f8;
}
</style>