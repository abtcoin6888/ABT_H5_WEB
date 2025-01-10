<template>
    <view class="finance" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     statusBar
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('financing.t1')"
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
            <template v-slot:right>
                <fui-icon class="mr-10"
                          color="var(--content-tertiary)"
                          size="40"
                          name="help-fill"
                          @click="$mroute.financeHelp()">
                </fui-icon>
                <fui-icon class="mr-10"
                          color="var(--content-tertiary)"
                          size="40"
                          name="order-fill"
                          @click="$mroute.eaorderPage()">
                </fui-icon>
            </template>
        </fui-nav-bar>
        <scroll-view scroll-y class="container" :style="{'height': scrollHeight + 'px'}">
            <!-- <view class="banner">
                <image src="/static/img/swiper7.jpg" mode="widthFix"></image>
            </view> -->
            <view class="search-box">
                <fui-icon name="search" size="38" color="var(--content-tertiary)"></fui-icon>
                <input type="text" :placeholder="$t('common.area.search')">
            </view>
            <view class="list">
                <view class="not-data" v-if="list.length === 0">
                    <fui-empty
                        :width="180"
                        :height="180"
                        :size="26"
                        color="var(--content-tertiary)"
                        src="/static/newImage/not-order.png"
                        :title="$t('list.not_data')">
                    </fui-empty>
                </view>
                <view class="items"
                      v-else
                      v-for="(item,index) in list" :key="index">
                    <view class="items-cell">
                        <text class="font-15 font-weight color-black">{{ item.name }}</text>
                        <button @click="$mroute.financeInfo(item.id)">
                            {{ $t('financing.t25') }}
                        </button>
                    </view>
                    <view class="items-cell">
                        <view class="items-cell_i">
                            <text class="price_up font-18 font-bold">{{ item.eay }}%</text>
                        </view>
                        <view class="items-cell_i">
                            <text class="color-black font-14 font-weight">{{ item.buy_currency }}</text>
                        </view>
                        <view class="items-cell_i">
                            <text class="color-black font-14 font-weight">{{ item.time_limit }}
                                {{ $t('financing.t10') }}
                            </text>
                        </view>
                    </view>
                    <view class="items-cell">
                        <view class="items-cell_i">
                            <text class="font-12 color-gray">{{ $t('financing.t7') }}</text>
                        </view>
                        <view class="items-cell_i">
                            <text class="color-gray font-12">{{ $t('financing.t6') }}</text>
                        </view>
                        <view class="items-cell_i">
                            <text class="color-gray font-12">
                                {{ $t('financing.t8') }}({{ $t('financing.t10') }})
                            </text>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import financing from '../../../common/api/financing.js'
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"

import {mapGetters} from 'vuex';

export default {
    components: {
        fuiNavBar
    },
    data() {
        return {
            list: [],
            navHeight: "",
            scrollHeight: ""
        }
    },
    mounted() {
        this.getList()
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        navInit(e) {
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            this.navHeight = e.height + e.statusBarHeight;
            this.scrollHeight = windowHeight - this.navHeight;
        },
        async getList() {
            let res = await financing.list()
            this.list = res.data.list
        }
    }
}
</script>
<style lang="scss" scoped>
@import "finance.scss";
</style>