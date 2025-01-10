<template>
    <view class="addmethod" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     :title="pageTitle"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back"
                     @rightClick="legalTender = true"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
            <template v-slot:right>
                <view class="nav-bar-right">
                    <text class="font-13 color-black font-weight mr-5">{{ coinGroup[coinIndex] }}</text>
                    <image class="toggle-image"
                           :src="`/static/img/tactic/down-${userTheme}.png`"
                           mode="widthFix">
                    </image>
                </view>
            </template>
        </fui-nav-bar>
        <view class="addmethod-container">
            <view class="addmethod-container-search">
                <view class="addmethod-container-search-box">
                    <fui-icon name="search" size="32" color="var(--content-primary)"></fui-icon>
                    <input class="font-13 color-black" :placeholder="$t('wallete.search')" placeholder-class="placeholder"/>
                </view>
            </view>
            <scroll-view scroll-y class="addmethod-container-scroll" :style="{'height': scrollHeight + 'px'}">
                <view v-if="coinIndex != 0">
                    <view class="addmethod-container-scroll-cell" @click="$mroute.addNext(0)">
                        <view class="left">
                            <image type="unionpay" src="/static/quickly/unionpay.png" mode="widthFix"></image>
                            <text class="font-14 color-black font-weight">{{$t('quickly.tt42')}}</text>
                        </view>
                        <fui-icon name="arrowright" size="36" color="var(--color-text-dark-gray)"></fui-icon>
                    </view>
                    <view class="addmethod-container-scroll-cell" @click="$mroute.addNext(1)">
                        <view class="left">
                            <image src="/static/quickly/alipay.png"></image>
                            <text class="font-14 color-black font-weight">{{$t('quickly.tt41')}}</text>
                        </view>
                        <fui-icon name="arrowright" size="36" color="var(--color-text-dark-gray)"></fui-icon>
                    </view>
                    <view class="addmethod-container-scroll-cell" @click="$mroute.addNext(2)">
                        <view class="left">
                            <image src="/static/quickly/wechatpay.png"></image>
                            <text class="font-14 color-black font-weight">{{$t('quickly.tt43')}}</text>
                        </view>
                        <fui-icon name="arrowright" size="36" color="var(--color-text-dark-gray)"></fui-icon>
                    </view>
                </view>
                <empty-view :visible="coinIndex === 0"
                            :width="690"
                            :height="800"
                            :title="$t('list.not_data')">
                </empty-view>
            </scroll-view>
        </view>
        <!--    法币弹窗   -->
        <fui-top-popup background="var(--background-primary)"
                       :show="legalTender"
                       @close="closePopup">
            <view class="top-popup-wrap">
                <view class="status-bar"></view>
                <view class="search">
                    <view class="search-box">
                        <fui-icon name="search" size="32" color="var(--content-primary)"></fui-icon>
                        <input class="font-13 color-black" :placeholder="$t('wallete.search')"
                               placeholder-class="placeholder"/>
                    </view>
                </view>
                <view class="list-box">
                    <view class="list-box-top">
                        <text class="font-12 color-gray">{{$t('quickly.tt80')}}</text>
                        <view class="_row">
                            <text class="font-13 color-primary font-weight">￥</text>
                            <view class="_row_right">
                                <text class="font-13 color-primary font-weight">{{ coinGroup[coinIndex] }}</text>
                                <fui-icon name="check" color="var(--color-primary)" size="40"></fui-icon>
                            </view>
                        </view>
                    </view>
                    <view class="popup-scroll-wrap">
                        <scroll-view scroll-y class="list-box-bottom">
                            <view class="_row" v-for="(item,index) in coinGroup" :key="index"
                                  @click="coinChange(index)">
                                <text class="font-13 color-black font-weight">￥</text>
                                <view class="_row_right">
                                    <text class="font-13 color-black font-weight">{{ item }}</text>
                                </view>
                            </view>
                        </scroll-view>
                    </view>
                </view>
            </view>
        </fui-top-popup>
    </view>
</template>

<script>
import {mapGetters} from 'vuex';
import emptyView from "@/components/emptyView/emptyView.vue";

export default {
    components: {
        emptyView
    },
    data() {
        return {
            pageTitle: this.$t('quickly.tt81'),
            navHeight: "",
            searchHeight: "",
            scrollHeight: "",
            legalTender: false,
            coinGroup: [this.$t('quickly.tt65'), 'CNY', 'USD', 'EUR', 'TRY', 'JPY', 'AED'],
            coinIndex: 1
        }
    },
    mounted() {
        this.getNodeInfo();
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
        },
        getNodeInfo() {
            let view = uni.createSelectorQuery().in(this).select(".addmethod-container-search");
            view.boundingClientRect(data => {
                this.searchHeight = data.height;
                this.scrollHeight = uni.getSystemInfoSync().windowHeight - this.navHeight - this.searchHeight;
            }).exec();
        },
        coinChange(index) {
            this.coinIndex = index;
            this.closePopup();
        },
        closePopup() {
            this.legalTender = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "addmethod";
</style>