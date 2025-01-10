<template>
    <view class="edidMine" :data-theme="userTheme">
        <fui-nav-bar padding="15"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     statusBar
                     isFixed
                     zIndex="9"
                     isOccupy
                     :title="$t('editMine.page_title')"
                     @leftClick="$mroute.coinSearch()"
                     @rightClick="complete()"
                     @init="navInit">
            <text class="font-14 font-weight color-primary">{{ $t('editMine.append') }}</text>
            <template v-slot:right>
                <text class="font-14 font-weight color-primary" v-if="list.length != 0">{{
                        $t('editMine.complete')
                    }}
                </text>
                <text class="font-14 font-weight color-primary" v-else>{{ $t('login.cancel') }}</text>
            </template>
        </fui-nav-bar>
        <view class="edidMine-body"
              :style="`height: ${bodyHeight}px`">
            <!--     顶部提示 -->
            <view class="desc-box" v-if="list.length != 0">
                <text>{{ $t('editMine.currency') }}</text>
                <text>{{ $t('editMine.pinned') }}</text>
            </view>
            <!--     内容滚动区域 -->
            <scroll-view scroll-y="true"
                         class="scroll-view"
                         :style="`height: ${scrollHeight}px`">
                <view class="label-group"
                      v-if="list.length != 0">
                    <view class="label-item"
                          v-for="(item,index) in list" :key="index">
                        <view class="label-item-info" @click="selectChange(item)">
                            <view class="checkbox">
                                <view class="not-check"
                                      v-if="!item.select || item.select == 0">
                                </view>
                                <image src="/static/img/tactic/check-s.png"
                                       v-if="item.select == 1">
                                </image>
                            </view>
                            <view class="column">
                                <view class="row">
                                    <text class="font-14 color-black font-weight mr-5">
                                        {{ item.symbol }}
                                    </text>
                                    <text class="font-12 color-gray">
                                        / USDT
                                    </text>
                                </view>
                                <view class="row">
                                    <text class="mini-tag">
                                        {{ type == 0 ? this.$t('index.spot') : this.$t('index.popup_c') }}
                                    </text>
                                </view>
                            </view>
                        </view>
                        <view class="label-item-toggle"
                              @click="exchange(index)">
                            <image :src="`/static/newImage/sticky-${userTheme}.png`" mode="widthFix"></image>
                        </view>
                    </view>
                </view>
                <!--        没有数据-->
                <empty-view :visible="list.length == 0"
                            :width="750"
                            :height="800"
                            :title="$t('list.not_data')">
                </empty-view>
            </scroll-view>
            <!--     底部操作栏 -->
            <view class="footer-box"
                  v-if="list.length != 0">
                <view class="label" @click="selectAll">
                    <view class="checkbox">
                        <view class="not-check"
                              v-if="all == 0">
                        </view>
                        <image src="/static/img/tactic/check-s.png"
                               v-if="all == 1">
                        </image>
                    </view>
                    <text class="font-14 color-black font-weight">
                        {{ $t('confirm.select_all') }}
                    </text>
                </view>
                <view class="delete-box" @click="deleteCurrency()">
                    <image :src="`/static/newImage/delete-${userTheme}.png`" mode="widthFix"></image>
                    <text class="font-14 color-black font-weight">
                        {{ $t('editMine.delete') }}
                    </text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex';

import emptyView from "@/components/emptyView/emptyView.vue";

export default {
    components: {
        emptyView
    },
    data() {
        return {
            list: [],
            type: 0,
            all: 0,
            bodyHeight: "", //除导航栏以外区域
            scrollHeight: "" //滚动内容区域
        }
    },
    onLoad(e) {
        this.type = e.type;
        this.getList();

        uni.$on('addSelect', () => {
            console.log("执行自选数据加载");
            this.getList();
        });
    },
    watch: {
        all(v) {
            var list = [...this.list];
            for (var i = 0; i < list.length; i++) {
                list[i]['select'] = v;
            }
            this.list = list;
        }
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    methods: {
        navInit(e) {
            const windowHeight = this.$device.windowHeight;
            var navHeight = e.height + e.statusBarHeight;
            this.bodyHeight = windowHeight - navHeight;
            this.scrollHeight = this.bodyHeight - 78;
        },
        selectChange(item) {
            if (item.select == 0) {
                item.select = 1;
            } else {
                item.select = 0;
            }
        },
        selectAll() {
            if (this.all == 0) {
                this.all = 1;
            } else {
                this.all = 0
            }
        },
        deleteCurrency() {
            var list = [...this.list];
            var newl = [];
            for (var i = 0; i < list.length; i++) {
                if (typeof list[i]['select'] == 'undefined' || list[i]['select'] == 0) {
                    newl.push(list[i]);
                }
            }
            if (this.type == 1) {
                uni.setStorageSync("select-contract", newl);
            } else {
                uni.setStorageSync('select-trade', newl);
            }
            this.list = newl;
        },
        complete() {
            if (this.type == 1) {
                uni.setStorageSync("select-contract", this.list);
            } else {
                uni.setStorageSync('select-trade', this.list);
            }
            uni.setStorageSync('load', 1);
            this.$mroute.back();
        },
        exchange(i) {
            [this.list[0], this.list[i]] = [this.list[i], this.list[0]];
        },
        getList() {
            this.list = this.type == 1 ? uni.getStorageSync('select-contract') : uni.getStorageSync('select-trade');
        }
    }
}
</script>

<style lang="scss" scoped>
@import "editMine";
</style>
