<template>
    <view class="record" :data-theme="userTheme">
        <!-- nav -->
        <fui-nav-bar :title="$t('recod.t1')"
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     statusBar
                     isFixed
                     isOccupy
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <!-- scroll -->
        <scroll-view class="scroll-view" 
                     :show-scrollbar="false" scroll-y
                     :style="{'height': windowHeight - navHeight + 'px'}" 
                     @scrolltolower="getRechargeLog()">
            <!-- list -->
            <view class="list">
                <!-- scroll-tab -->
                <view class="scroll-tab">
                    <view class="tag" @click="show = true">
                        <text class="tag_text">{{ $t(timer) }}</text>
                        <fui-icon name="turningdown" color="var(--content-tertiary)" size="30"></fui-icon>
                    </view>
                    <!-- <view class="tag" @click="stateShow = true">
                        <text>{{ $t(stateVal) }}</text>
                        <fui-icon name="turningdown" color="#909399" size="30"></fui-icon>
                    </view> -->
                    <view class="tag" @click="coinTypeShow = true">
                        <text>{{ $t(coinVal) }}</text>
                        <fui-icon name="turningdown" color="#909399" size="30"></fui-icon>
                    </view>
                </view>
                <view class="cell" @click="$mroute.recordInfo(item)" v-for="(item, index) in list" v-if="list.length">
                    <image class="coin-img" :src="item.icon" mode="widthFix"></image>
                    <view class="coin-info">
                        <view class="row">
                            <text class="font-14 font-weight color-black">{{ item.symbol }}</text>
                            <text class="font-14 font-weight color-black">+{{ $util.thousandSeparator(item.amount) }}
                            </text>
                        </view>
                        <view class="row">
                            <text class="font-12 color-gray">{{ item.created_at }}</text>
                            <text class="font-12 color-gray" v-if="item.status == 1">{{ $t('common.rs') }}</text>
							<text class="font-12 color-gray" v-else>{{ $t('common.rssh') }}</text>
                        </view>
                    </view>
                </view>
                <view class="not-date" :style="{'height': (windowHeight / 2) + 'px'}" v-else>
                    <fui-empty descrSize="26" descrColor="var(--content-tertiary)" width="200" height="200"
                               src="/static/newImage/not-order.png" :descr="$t('common.no_records')"></fui-empty>
                </view>
            </view>
        </scroll-view>
        <!-- 时间 -->
        <fui-date-picker range
                         :start="$t('开始时间')"
                         :title="$t('recod.t4')"
                         titleSize="30"
                         btnSize="28"
                         background="var(--background-primary)"
                         titleColor="var(--content-primary)"
                         :theme="userTheme"
                         minDate="2023-01-01"
                         :value="$util.getDateStr()"
                         radius
						 :confirmText="$t('确定')"
						 :cancelText="$t('取消')"
						 :end="$t('结束时间')" :year_t="$t('年')" :month_t="$t('月')" :day_t="$t('日')"
                         :show="show" 
                         type="3" 
                         @change="change" 
                         @cancel="cancel">
        </fui-date-picker>
        <!-- 状态 -->
        <fui-bottom-popup background="var(--background-primary)"
                          radius="30"
                          :show="stateShow"
                          @close="closePopup">
            <view class="popup-wrap">
                <view class="title">
                    <text class="font-16 color-black font-weight">{{ $t('recod.t2') }}</text>
                    <fui-icon @click="closePopup" class="close" name="close" size="44"></fui-icon>
                </view>
                <view class="list">
                    <view class="cell" :class="stateIndex == index ? 'cell-active' : ''"
                          v-for="(item,index) in shateOption" :key="index" @click="stateChange(item,index)">
                        <text>{{ item }}</text>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!-- 币种 -->
        <fui-bottom-popup background="var(--background-primary)" r
                          adius="30"
                          :show="coinTypeShow"
                          @close="closePopup">
            <view class="popup-wrap" type="coinList">
                <view class="title">
                    <text class="font-16 color-black font-weight">{{ $t('recod.t3') }}</text>
                    <view class="close">
                        <fui-icon @click="closePopup" name="close" size="44" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="search">
                    <fui-icon name="search" size="32" color="var(--content-tertiary)"></fui-icon>
                    <input type="text" :placeholder="$t('common.area.search')">
                </view>
                <scroll-view scroll-y :show-scrollbar="false" class="list">
                    <view class="cell" :class="coinIndex == index ? 'cell-active' : ''" v-for="(item,index) in coinList"
                          :key="index" @click="coinSelect(item,index)">
                        <text v-if="item">{{ item.symbol }}</text>
                    </view>
                </scroll-view>
            </view>
        </fui-bottom-popup>
    </view>
</template>

<script>
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue"
import fuiDatePicker from "@/components/firstui/fui-date-picker/fui-date-picker.vue"
import fuiBottomPopup from "@/components/firstui/fui-bottom-popup/fui-bottom-popup.vue"
import currency from '../../../common/api/currency.js'
import common from '../../../common/api/common.js'
import {mapGetters} from 'vuex';

export default {
    components: {
        fuiNavBar,
        fuiTag,
        fuiDatePicker,
        fuiBottomPopup
    },
    data() {
        return {
            navHeight: "",
            windowHeight: uni.getSystemInfoSync().windowHeight,
            show: false,
            timer: "时间",
            startText: "开始时间",
            endText: "结束时间",
            stateShow: false,
            stateVal: "状态",
            shateOption: ["全部", "充值成功", "充值失败"],
            stateIndex: 0,
            coinTypeShow: false,
            coinVal: "币种",
            coinIndex: 0,
            coinList: [],
            list: [],
            param: {
                start_at: '',
                end_at: '',
                currency_id: 0,
                page: 1
            },
        }
    },
    mounted() {
        this.getCurrencyList()
        this.getRechargeLog()
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
        },
        change(e) {
            this.show = false
            this.timer = e.startDate.result + "~" + e.endDate.result
            this.param.start_at = e.startDate.result
            this.param.end_at = e.endDate.result
            this.resetList()
        },
        cancel() {
            this.show = false
        },
        stateChange(item, index) {
            this.stateIndex = index;
            this.stateVal = item;
            this.closePopup();
        },
        coinSelect(item, index) {
            this.coinIndex = index;
            this.coinVal = item.symbol;
            this.param.currency_id = item.id
            this.resetList()
            this.closePopup();
        },
        closePopup() {
            this.stateShow = false;
            this.coinTypeShow = false;
        },
        async getCurrencyList() {
            let res = await common.getRechargeCurrency()
            this.coinList = [{
                id: 0,
                symbol: this.$t('financing.t68')
            }]
            this.coinList = this.coinList.concat(res.data.list)
        },
        resetList() {
            this.list = []
            this.param.page = 1
            this.getRechargeLog()
        },
        async getRechargeLog() {
            let res = await currency.getRechargeLog(this.param)
            this.list = this.list.concat(res.data.list)
            console.log(this.list);
            this.param.page++
        }
    }
}
</script>

<style lang="scss" scoped>
@import "record.scss";
</style>

<style scoped>
/deep/ .fui-bottom__popup {
    border-bottom: none;
}

/deep/ uni-picker-view-column:nth-of-type(1) .uni-picker-view-indicator {
    border-radius: 10rpx 0 0 10rpx;
}

/deep/ uni-picker-view-column:nth-of-type(3) .uni-picker-view-indicator {
    border-radius: 0 10rpx 10rpx 0;
}

/deep/ .uni-picker-view-indicator {
    background-color: rgba(144, 147, 153, .2);
}
</style>