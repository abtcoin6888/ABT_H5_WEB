<template>
    <view class="myStrategy"
          :data-theme="userTheme">
        <view class="page-tabs border-bottom">
            <fui-tabs :tabs="tabs"
                      :height="80"
                      alignLeft
                      scroll
                      :size="28"
                      :scale="1"
                      :selectedSize="28"
                      :short="false"
                      @change="tabsSelect"
                      color="var(--content-tertiary)"
                      selectedColor="var(--content-primary)"
                      sliderBackground="var(--content-primary)"
                      background="var(--background-primary)">
            </fui-tabs>
        </view>
        <view class="mine-tag-box">
            <scroll-view class="sroll-view-tabs">
                <view class="item"
                      :class="{'active': mineTabsSelectIdx == index}"
                      v-for="(item,index) in mineTabs"
                      :key="index"
                      @click="mineTabsSelect(index)">
                    <text class="font-11">{{ item }}</text>
                </view>
            </scroll-view>
            <view class="icon-box">
                <fui-icon name="screen"
                          size="34"
                          color="var(--content-tertiary)"
                          @click="filterShow = true">
                </fui-icon>
            </view>
        </view>
        <view class="list-warp">
            <scroll-view scroll-y="true"
                         class="tactic-list">
                <view class="tactic-list-item"
                      v-for="(item,idx) in list">
                    <view class="head">
                        <view class="row">
                            <text class="coin">{{ item.currency.symbol }}/USDT</text>
                            <view class="row-right">
                                <text class="color-black font-12">{{ item.new_price }}</text>
                                <text class="color-primary font-12">{{ item.change_rate }}%</text>
                            </view>
                        </view>
                        <view class="row">
                            <view class="row-left">
                                <fui-tag :text="item.type_id==1?$t('strategy.t15'):$t('strategy.t16')"
                                         size="20"
                                         color="var(--content-tertiary)"
                                         background="var(--background-gray)">
                                </fui-tag>
                                <fui-tag :text="item.direction==1?$t('strategy.t17'):(item.direction==2?$t('strategy.t18'):$t('strategy.t19'))"
                                         size="20"
                                         color="var(--text-green)"
                                         background="var(--light-green)">
                                </fui-tag>
                            </view>
                        </view>
                    </view>
                    <view class="content-box">
                        <view class="item">
                            <text>{{ $t('strategy.t20') }}</text>
                            <text class="color-primary">{{ item.profit }} USDT</text>
                        </view>
                        <view class="item">
                            <text>{{ $t('strategy.t21') }}</text>
                            <text class="color-primary">{{ item.rate }}%</text>
                        </view>
                        <view class="item">
                            <text>{{ $t('strategy.t22') }}</text>
                            <text class="color-black">{{ item.amount }} USDT</text>
                        </view>
                        <view class="item">
                            <text>{{ $t('strategy.t23') }}</text>
                            <text class="color-black">{{ item.pairedProfit }} USDT</text>
                        </view>
                        <view class="item">
                            <text>{{ $t('strategy.t24') }}</text>
                            <text class="color-black">{{ item.profit }} USDT</text>
                        </view>
                        <view class="item">
                            <text>{{ $t('strategy.t25') }}</text>
                            <text class="color-black">--/--</text>
                        </view>
                        <view class="item">
                            <text>{{ $t('strategy.t26') }}</text>
                            <text class="color-black">{{ item.created_at }}</text>
                        </view>
                        <view class="item">
                            <text>{{ $t('strategy.t27') }}</text>
                            <text class="color-black">{{ item.run_time }}</text>
                        </view>
                    </view>
                    <view class="footer">
                        <button class="button"
                                v-if="item.status==2">{{ $t('strategy.t31') }}
                        </button>
                        <button class="button"
                                @click="stop(item)"
                                v-else>{{ $t('strategy.t32') }}
                        </button>
                        <button class="button"
                                @click="$mroute.policyDetails(item.id,item.type_id)">{{ $t('strategy.t28') }}
                        </button>
                        <view class="share-box"
                              @click="shareItem=item;shareShow = true">
                            <image :src="`/static/img/tactic/share-${userTheme}.png`"></image>
                        </view>
                    </view>
                </view>

                <empty-view :visible="list && list.length == 0"
                            :width="690"
                            :height="600"
                            :title="emptyTitle">
                    <template v-slot:custom-content>
                        <button class="empty-button bg-black">
                            <text class="font-12 color-white">{{ $t('mystrategy.text2') }}</text>
                        </button>
                    </template>
                </empty-view>
            </scroll-view>
        </view>

        <termination-strategy :item="item"
                              :visible="visible"
                              @close="visible = false"></termination-strategy>

        <tactic-share :visible="shareShow"
                      @close="shareShow = false"
                      :item="shareItem"></tactic-share>

        <fui-bottom-popup :show="filterShow"
                          z-index="1100"
                          background="var(--background-primary)">
            <view class="filter-warp">
                <view class="filter-title">
                    <text class="font-16 font-weight color-black">筛选</text>
                    <view class="close-icon">
                        <fui-icon name="close"
                                  size="42"
                                  color="var(--content-primary)"
                                  @click="filterShow = false"></fui-icon>
                    </view>
                </view>
                <view class="filter-container">
                    <view class="item">
                        <text class="font-13 font-weight color-black">币种</text>
                        <view class="item-box">
                            <text class="font-13 color-black">{{ selectCurrency }}</text>
                            <image src="/static/img/tactic/down-light.png"></image>
                        </view>
                    </view>
                    <view class="item">
                        <text class="font-13 font-weight color-black">方向</text>
                        <view class="item-group">
                            <view class="g-i"
                                  :class="{'active': dtActive == index}"
                                  v-for="(item,index) in direction"
                                  @click="dtActive = index">
                                <text class="font-13 color-black">{{ item }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="item">
                        <text class="font-13 font-weight color-black">时间</text>
                        <view class="item-box">
                            <text class="font-13 color-black">{{ selectTimer }}</text>
                            <image src="/static/img/tactic/down-light.png"></image>
                        </view>
                    </view>
                </view>
                <view class="filter-buttons">
                    <view class="b-i">
                        <text class="font-14 font-weight color-black">重置</text>
                    </view>
                    <view class="b-i"
                          @click="filterShow = false">
                        <text class="font-14 font-weight color-white">确定</text>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
    </view>
</template>

<script>
import {
    mapGetters
} from 'vuex'

import terminationStrategy from "@/components/terminationStrategy/terminationStrategy.vue";
import tacticShare from "@/components/tacticShare/tacticShare.vue";
import emptyView from "@/components/emptyView/emptyView.vue";

import strategy from "@/common/api/strategy.js"

export default {
    name: "myStrategy",
    computed: {
        ...mapGetters(['userTheme']),
        emptyTitle() {
            const paltform = "ABT";
            return this.$t('mystrategy.text1').replace('{}', paltform)
        }
    },
    components: {
        terminationStrategy,
        tacticShare,
        emptyView
    },
    data() {
        return {
            visible: false,
            coin: [],
            tabs: [this.$t('strategy.t29'), this.$t('strategy.t30')],
            mineTabs: [],
            shareShow: false,
            list: [],
            tabsIdx: 0,
            mineTabsSelectIdx: 0,
            type_ids: [],
            item: {},
            shareItem: {},

            filterShow: false,
            selectCurrency: '全部',
            selectTimer: '全部',
            direction: ['全部', '正向', '反向', '中性'],
            dtActive: 0
        }
    },
    created() {
        this.getType()
        uni.$on('stopStrategy', (data) => {
            this.getList()
            this.visible = false
        })
    },
    methods: {
        async getType() {
            let data = uni.getStorageSync('strategyType')
            if (!data) {
                let res = await strategy.type()
                data = res.data
            }
            let t = []
            data.level1.map((item) => {
                t.push(item.name)
                this.type_ids.push(item.id)
            })
            data.level2.map((item) => {
                t.push(item.name)
                this.type_ids.push(item.id)
            })
            this.mineTabs = t
            this.getList()
        },
        async getList() {
            let type_id = this.type_ids[this.mineTabsSelectIdx]
            let status = this.tabsIdx == 1 ? 2 : 0
            let res = await strategy.getList(type_id, status)
            // console.log(res)
            this.list = res.data.list
        },
        tabsSelect(event) {
            this.tabsIdx = event.index
            this.getList()
        },
        mineTabsSelect(event) {
            this.mineTabsSelectIdx = event
            this.getList()
        },
        stop(item) {
            this.item = item
            // console.log(this.coin)
            this.visible = true
        }

    }
}
</script>

<style lang="scss"
       scoped>
@import "myStrategy";
</style>