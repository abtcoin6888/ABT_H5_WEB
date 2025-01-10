<template>
    <view class="myorder" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     :title="$t('quickly.tt52')"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back"
                     @rightClick="sift = true"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
            <template v-slot:right>
                <fui-icon name="screen"
                          size="40"
                          color="var(--content-primary)">
                </fui-icon>
            </template>
        </fui-nav-bar>
        <view class="myorder-container">
            <scroll-view @scrolltolower="loadMore"
                         scroll-y class="myorder-container-scroll"
                         :style="{'height': windowHeight + 'px'}">
                <!--  无数据  -->
                <empty-view :visible="list.length === 0"
                            :width="690"
                            :height="800"
                            :title="$t('list.not_data')">
                </empty-view>
                <view class="card" v-for="(item,index) in list" :key="index">
                    <view class="card-cell">
                        <view class="card-cell-left">
                            <text class="font-14 color-green font-weight" v-if="item.type === 1">{{$t('quickly.tt50')}}</text>
                            <text class="font-14 color-green font-weight" v-else>{{$t('quickly.tt8a')}}</text>
                            <text class="dot" :class="item.type == 1 ? 'bg-green' : 'bg-red'"></text>
                            <text class="font-14 color-black font-weight">{{ item.symbol }}</text>
                        </view>
                        <view class="card-cell-right">
                            <fui-tag :isBorder="false"
                                     color="var(--content-warning)"
                                     :padding="['10rpx','10rpx']"
                                     :size="22"
                                     :radius="4"
                                     background="var(--content-warning-light)"
                                     :text="$t('quickly.tt53')"
                                     v-if="item.status == 0">
                            </fui-tag>
                            <fui-tag :isBorder="false"
                                     color="var(--color-primary)"
                                     :padding="['10rpx','10rpx']"
                                     :size="22"
                                     :radius="4"
                                     background="var(--color-primary-light)"
                                     :text="$t('quickly.tt54')"
                                     v-if="item.status == 1 && item.type == 1">
                            </fui-tag>
                            <fui-tag :isBorder="false"
                                     color="var(--content-warning)"
                                     :padding="['10rpx','10rpx']"
                                     :size="22"
                                     :radius="4"
                                     background="var(--content-warning-light)"
                                     :text="$t('quickly.tt55')"
                                     v-if="item.status == 1 && item.type == 2"
                            >
                            </fui-tag>
                            <fui-tag :isBorder="false"
                                     color="var(--color-primary)"
                                     :padding="['10rpx','10rpx']"
                                     :size="22"
                                     :radius="4"
                                     background="var(--color-primary-light)"
                                     :text="$t('quickly.tt56')"
                                     v-if="item.status == 2"
                            >
                            </fui-tag>
                            <fui-tag :isBorder="false"
                                     color="var(--content-tertiary)"
                                     :padding="['10rpx','10rpx']"
                                     :size="22"
                                     :radius="4"
                                     background="var(--background-secondary)"
                                     :text="$t('quickly.tt57')"
                                     v-if="item.status == 3">
                            </fui-tag>
                            <fui-icon name="arrowright" size="36" color="var(--content-tertiary)"></fui-icon>
                        </view>
                    </view>
                    <view class="card-cell">
                        <view class="card-cell-left">
                            <text class="font-12 color-gray mr-10">{{$t('trade.price')}}</text>
                            <text class="font-12 color-black font-weight">{{ item.price }}</text>
                        </view>
                        <view class="card-cell-right">
                            <text class="font-12 color-gray mr-10">{{$t('quickly.tt58')}}</text>
                            <text class="font-12 color-black font-weight">
                                ¥{{ item.type == 1 ? $util.float(item.amount) : $util.float(item.t_amount) }}
                            </text>
                        </view>
                    </view>
                    <view class="card-cell">
                        <view class="card-cell-left">
                            <text class="font-12 color-gray mr-10">{{$t('quickly.tt59')}}</text>
                            <text class="font-12 color-black font-weight">
                                {{ item.type == 1 ? item.t_amount : item.amount }}
                            </text>
                        </view>
                        <view class="card-cell-right">
                            <text class="font-12 color-gray mr-10" v-if="item.type === 1">{{$t('quickly.tt60')}}</text>
                            <text class="font-12 color-gray mr-10" v-else>{{$t('quickly.tt9')}}</text>
                            <view class="flex align-center">
                                <image src="/static/quickly/wechatpay.png" v-if="item.t_type == 1"></image>
                                <image src="/static/quickly/alipay.png" v-if="item.t_type == 2"></image>
                                <image src="/static/quickly/unionpay.png" v-if="item.t_type == 3"></image>
                                <text class="font-12 color-black font-weight" v-if="item.t_type == 1">{{$t('quickly.tt43')}}</text>
                                <text class="font-12 color-black font-weight" v-if="item.t_type == 2">{{$t('quickly.tt41')}}</text>
                                <text class="font-12 color-black font-weight" v-if="item.t_type == 3">{{$t('quickly.tt42')}}</text>
                            </view>
                        </view>
                    </view>
                    <view class="card-cell">
                        <view class="card-cell-left">
                            <text class="font-12 color-gray mr-10">{{$t('quickly.tt61')}}</text>
                            <text class="font-12 color-black font-weight">{{ item.merchant }}</text>
                        </view>
                        <view class="card-cell-right">
                            <text class="font-12 color-gray">{{ item.created_at }}</text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <!-- 筛选 sift-->
        <fui-drawer background="var(--background-primary)"
                    maskBackground="var(--mask-bakground-bg)"
                    :show="sift"
                    direction="left"
                    @close="closeDrawer">
            <view class="drawer" :style="{'height': darwerHeight + 'px'}">
                <view class="title">
                    <view class="status-bar"></view>
                    <text class="font-16 color-black font-weight">{{$t('quickly.tt62')}}</text>
                </view>
                <!--          日期-->
                <view class="group-box">
                    <text class="font-13 color-gray">{{$t('quickly.tt63')}}</text>
                    <view class="group-list">
                        <view class="item" v-for="(item,index) in dateGroup" :key="index" @click="dataIndex = index">
                            <view class="item-box" :class="dataIndex === index ? 'active-box' : ''">
                                <text class="font-12 color-dark">{{ item }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <!--          币种-->
                <view class="group-box">
                    <text class="font-13 color-gray">{{$t('quickly.tt64')}}</text>
                    <view class="group-list">
                        <view class="item" @click="coinIndex = 0">
                            <view class="item-box" :class="coinIndex === 0 ? 'active-box' : ''">
                                <text class="font-12 color-dark">{{$t('quickly.tt65')}}</text>
                            </view>
                        </view>
                        <view class="item" v-for="(item,index) in coinList" :key="index" @click="coinIndex = index+1">
                            <view class="item-box" :class="coinIndex === index+1 ? 'active-box' : ''">
                                <text class="font-12 color-dark">{{ item['symbol'] }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <!--          交易类型-->
                <view class="group-box">
                    <text class="font-13 color-gray">{{$t('quickly.tt66')}}</text>
                    <view class="group-list">
                        <view class="item" v-for="(item,index) in methodList" :key="index" @click="mdIndex = index">
                            <view class="item-box" :class="mdIndex === index ? 'active-box' : ''">
                                <text class="font-12 color-dark">{{ item }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <!--          状态-->
                <view class="group-box">
                    <text class="font-13 color-gray">{{$t('quickly.tt67')}}</text>
                    <view class="group-list">
                        <view class="item" v-for="(item,index) in typeList" :key="index" @click="tpIndex = index">
                            <view class="item-box" :class="tpIndex === index ? 'active-box' : ''">
                                <text class="font-12 color-dark">{{ item }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="drawer-button">
                    <view class="_button" @click="resetTap">
                        <text class="font-13 color-black">{{$t('quickly.tt68')}}</text>
                    </view>
                    <view class="_button" @click="sift=false">
                        <text class="font-13 color-white">{{$t('quickly.tt69')}}</text>
                    </view>
                </view>
            </view>
        </fui-drawer>
    </view>
</template>
<script>
import userApi from '@/common/api/user.js';
import commonApi from '@/common/api/common.js';
import emptyView from "@/components/emptyView/emptyView.vue";

var page = 1;
export default {
    components: {
        emptyView
    },
    data() {
        return {
            navHeight: "",
            windowHeight: "",
            darwerHeight: "",
            sift: false,
            dataIndex: 0,
            dateGroup: [this.$t('quickly.tt65'), this.$t('quickly.tt76'), this.$t('quickly.tt77'), this.$t('quickly.tt78'), this.$t('quickly.tt79')],
            coinIndex: 0,
            // coinList:['全部','USDT','BTC','ETH','USDC','BGB','DAI'],
            mdIndex: 0,
            methodList: [this.$t('quickly.tt65'), this.$t('quickly.tt50'), this.$t('quickly.tt8a')],
            tpIndex: 0,
            typeList: [this.$t('quickly.tt65'), this.$t('quickly.tt70'),this.$t('quickly.tt71'), this.$t('quickly.tt72'), this.$t('quickly.tt73'), this.$t('quickly.tt74'), this.$t('quickly.tt75')],
            coinList: [],
            list: []
        }
    },
    onShow() {
        page = 1;
        this.getRechargeList();
    },
    onReady() {
        this.getOrder();
    },
    methods: {
        loadMore(e) {
            page += 1;
            uni.showLoading();
            this.getOrder();
            uni.hideLoading();
        },
        getOrder() {
            commonApi.c2cOrder(page).then(res => {
                this.list = this.list.concat(res.data.list);
            })
        },
        getRechargeList() {
            commonApi.getRechargeCurrency(true).then(res => {
                this.coinList = res.data.list;
            });
        },
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
            this.darwerHeight = uni.getSystemInfoSync().windowHeight;
            this.windowHeight = uni.getSystemInfoSync().windowHeight - e.height - e.statusBarHeight;
        },
        closeDrawer() {
            this.sift = false;
        },
        resetTap() {
            this.dataIndex = 0;
            this.coinIndex = 0;
            this.mdIndex = 0;
            this.tpIndex = 0;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "myorder.scss";
</style>