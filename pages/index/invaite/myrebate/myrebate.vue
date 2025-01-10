<template>
    <view class="myrebate" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('minv.t1')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="content-warp">
            <view class="top-box">
                <view class="cell_row">
                    <text class="font-11 color-warring">
                        <fui-icon name="help-fill"
                                  size="26"
                                  color="var(--content-warning)">
                        </fui-icon>
                        {{ $t('minv.t2') }}
                    </text>
                </view>
                <view class="cell_row">
                    <view class="_item">
                        <text class="font-13 color-gray">{{ $t('minv.t3') }}</text>
                        <text class="font-20 color-black font-bold">{{ group['group']['num'] }}</text>
                    </view>
                    <view class="_item">
                        <text class="font-13 color-gray">{{ $t('minv.t4') }}</text>
                        <text class="font-20 color-black font-bold">
                            {{ group['group']['trade_num'] }}
                        </text>
                    </view>
                </view>
                <view class="cell_row">
                    <view class="_item">
                        <text class="font-13 color-gray">{{ $t('minv.t5') }}(USDT)</text>
                        <text class="font-20 color-black font-bold">{{ $util.thousandSeparator(group['group']['spot_charge'],2) }}</text>
                    </view>
                </view>
                <view class="cell_row">
                    <view class="_item">
                        <text class="font-13 color-gray">{{ $t('minv.t6') }}(USDT)</text>
                        <text class="font-20 color-black font-bold">{{ $util.thousandSeparator(group['group']['charge_num'],2) }}</text>
                    </view>
                </view>
                <view class="cell_row">
                    <view class="_item">
                        <text class="font-13 color-gray">{{ $t('minv.t7') }}(USDT)</text>
                        <text class="font-20 color-black font-bold">{{ $util.thousandSeparator(parseFloat(group['group']['charge_num']) + parseFloat(group['group']['spot_charge'])) }}</text>
                    </view>
                    <!-- <view class="_item">
                        <text class="font-13 color-gray">{{ $t('minv.t8') }}(USDT)</text>
                        <text class="font-20 color-black font-bold">0</text>
                    </view> -->
                </view>
            </view>
            <view class="bottom-list">
                <view class="bottom-title">
                    <fui-icon class="mr-5" name="my-fill" size="40" color="var(--content-primary)"></fui-icon>
                    <text class="font-14 color-black font-weight">{{ $t('minv.t9') }}</text>
                </view>
				<view class="bottom-list">
				    <view class="bottom-list-cell" v-if="group['users'] != ''" v-for="(item,index) in group['users']">
						<view class="flex align-center" v-if="index < 3">
						    <image style="width:25px" v-if="index === 0" src="/static/invaite/top_1.webp" mode="widthFix"></image>
						    <image style="width:25px" v-if="index === 1" src="/static/invaite/top_2.webp" mode="widthFix"></image>
						    <image style="width:25px" v-if="index === 2" src="/static/invaite/top_3.webp" mode="widthFix"></image>
						    <text class="font-13 color-black rank-num" v-if="index > 2">
						        {{ index + 1 }}
						    </text>
						    <text class="font-13 color-black">
						        UID：{{ item.user_id }}
						    </text>
						</view>
						<text class="font-13 color-black" v-if="index < 3">
						    {{ $util.thousandSeparator(item.total_income,2) }} USDT
						</text>
				    </view>
				    <view class="not-date" v-else>
				        <fui-empty width="200"
				                   height="200"
				                   size="26"
				                   color="var(--content-tertiary)"
				                   :src="`/static/img/tactic/not_data-${userTheme}.png`"
				                   :title="$t('list.not_data')">
				        </fui-empty>
				    </view>
				</view>
                
            </view>
        </view>
    </view>
</template>

<script>
import fuiSwitch from "@/components/firstui/fui-switch/fui-switch.vue"
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue"

import commonApi from '@/common/api/common.js';

import {
    mapGetters
} from 'vuex';

export default {
    components: {
        fuiSwitch,
        fuiNavBar,
        fuiEmpty
    },
    data() {
        return {
            group: {group:{},topUser:[],users:[]}
        }
    },
    onShow() {
        this.getShareData();
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    methods: {
        getShareData() {
            commonApi.getShareData().then(res => {
                this.group = res.data;
            });

            console.log(this.group)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "myrebate.scss";
</style>