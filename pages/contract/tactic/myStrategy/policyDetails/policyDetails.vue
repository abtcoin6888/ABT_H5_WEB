<template>
    <view class="details-warp" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     zIndex="9"
                     title="策略详情"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     @init="navInit"
                     @left-click="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="container">
            <!--    策略操作-->
            <view class="card">
                <text class="font-12 color-gray mb-10">
                    订单数据非实时更新，请下拉刷新
                </text>
                <view class="mb-10">
                    <fui-tag size="20"
                             :padding="['12rpx','16rpx']"
                             :radius="4"
                             background="var(--content-trade-buy)"
                             color="#f5f5f5">
                        {{item.status==2?'已结束':'进行中'}}
                    </fui-tag>
                </view>
                <view class="coin-info">
                    <view class="coin-info-left">
                        <view class="cell mb-5">
                            <text class="coin">
                                {{item.currency.symbol}} / USDT
                            </text>
                            <text class="tag">{{item.type_id==1?'现货':'合约'}}</text>
                        </view>
                        <view class="cell">
                            <fui-tag color="var(--content-primary)"
                                     size="24"
                                     background="var(--background-secondary)">
                                {{item.direction == 1?'做多':(item.direction==2?'做空':'中性')}}
                            </fui-tag>
                        </view>
                    </view>
                    <view class="share-box">

                    </view>
                </view>
                <text class="font-12 color-gray mb-5">
                    运行时间：1D 19H 15M
                </text>
                <text class="font-12 color-gray">
                    创建时间：{{item.created_at}}
                </text>
                <view class="checkbox-label"  v-if="item.status!=2">
                    <fui-checkbox color="var(--green)"
                                  borderRadius="4rpx"
                                  scaleRatio="0.8"
                                  value="1" checked>
                    </fui-checkbox>
                    <text class="color-black font-14">终止时全部卖出</text>
                </view>
                <button class="button" @click="visible = true" v-if="item.status!=2">
                    <text>终止策略</text>
                </button>
            </view>
            <!--    策略详情-->
            <view class="card">
                <view class="item">
                    <text class="font-12 color-gray mb-5">
                        总收益(USDT)
                    </text>
                    <view class="item-cell">
                        <text class="color-primary">
                            {{item.profit}}
                            <text>
                                <!-- 0.25% -->
                            </text>
                        </text>
                    </view>
                </view>
                <view class="item">
                    <text class="font-12 color-gray mb-5">
                        网格利润(USDT)
                    </text>
                    <view class="item-cell">
                        <text class="color-black">
                            {{item.profit}}
                            <text>
                                <!-- 0.25% -->
                            </text>
                        </text>
                    </view>
                </view>
                <view class="item">
                    <text class="font-12 color-gray mb-5">
                        非配对利润(USDT)
                    </text>
                    <view class="item-cell">
                        <text class="color-primary">
                            {{item.pairedProfit}}
                            <text>
                                <!-- 0.25% -->
                            </text>
                        </text>
                    </view>
                </view>
                <view class="item">
                    <text class="font-12 color-gray mb-5">
                        年化收益率
                    </text>
                    <view class="item-cell">
                        <text class="color-black">
                            {{item.rate}}%
                        </text>
                    </view>
                </view>
                <view class="item">
                    <text class="font-12 color-gray mb-5">
                        总投资额
                    </text>
                    <view class="item-cell">
                        <text class="color-black">
                            {{item.amount}} USDT
                        </text>
                    </view>
                </view>
                <view class="item">
                    <text class="font-12 color-gray mb-5">
                        最新价(USDT)
                    </text>
                    <view class="item-cell">
                        <text class="color-black">
                            {{item.new_price}}
                        </text>
                    </view>
                </view>
                <view class="item">
                    <text class="font-12 color-gray mb-5">
                        价格区间(USDT)
                    </text>
                    <view class="item-cell">
                        <text class="color-black">
                            {{ $util.thousandSeparator(item.min) }} - {{ $util.thousandSeparator(item.max) }}
                        </text>
                    </view>
                </view>
                <view class="item">
                    <text class="font-12 color-gray mb-5">
                        止盈/止损价
                    </text>
                    <view class="item-cell" @click="editPriceUpDown">
                        <text class="color-black">
                            {{parseFloat(item.price_up)>0?$util.thousandSeparator(item.price_up):'--'}}/{{parseFloat(item.price_down)>0?$util.thousandSeparator(item.price_down):'--'}}
                        </text>
                        <image :src="`/static/img/tactic/bj-${userTheme}.png`"></image>
                    </view>
                </view>
            </view>
            <!--    策略参数-->
            <view class="row-box" @click="$mroute.policyParameter(item.id,item.type_id)">
                <text>策略参数</text>
                <fui-icon name="turningright" size="30" color="var(--content-primary)"></fui-icon>
            </view>
            <!--    策略列表-->
            <view class="list-warp">
                <fui-tabs :tabs="listTabs"
                          :short="false"
                          :size="26"
                          :scale="1"
                          color="var(--text-gray)"
                          selectedFontWeight="600"
                          selectedColor="var(--content-primary)"
                          background="var(--background-primary)"
                          sliderBackground="var(--green)"
                          @change="tabChange">
                </fui-tabs>
                <template v-if="tabActive === 0">
                    <view class="list-content">
                        <view class="list-content-top">
                            <text class="title">
                                网格资产
                            </text>
                            <view class="item">
                                <text class="font-12 color-gray">
                                    当前资产
                                </text>
                                <view class="item-cell">
                                    <text class="font-14 color-black font-bold">
                                        {{item.asset}} {{item.currency.symbol}}
                                    </text>
                                    <text class="font-14 color-black font-bold">
                                        {{item.asset_coin}} USDT
                                    </text>
                                </view>
                            </view>
                            <view class="item">
                                <text class="font-12 color-gray">
                                    预留手续费
                                </text>
                                <view class="item-cell">
                                    <text class="font-14 color-black font-bold">
                                        {{item.coin_commission}} {{item.currency.symbol}}
                                    </text>
                                    <text class="font-14 color-black font-bold">
                                        {{item.commission}} USDT
                                    </text>
                                </view>
                            </view>
                            <view class="item">
                                <view class="item-column">
                                    <text class="font-12 color-gray">
                                        每笔数量（{{item.currency.symbol}}）
                                    </text>
                                    <text class="font-14 color-black font-bold">
                                        {{item.order_coin}}
                                    </text>
                                </view>
                                <view class="item-column">
                                    <text class="font-12 color-gray">
                                        最新价（USDT）
                                    </text>
                                    <text class="font-14 color-black font-bold">
                                        {{item.new_price}}
                                    </text>
                                </view>
                            </view>
                        </view>
                        <view class="list-content-bottom">
                            <view class="not-data">
                                <fui-empty :src="`/static/img/tactic/not_data-${userTheme}.png`"
                                           width="160"
                                           height="160"
                                           size="26"
                                           title="暂无数据"
                                           color="var(--dark-gray)">
                                </fui-empty>
                            </view>
                        </view>
                    </view>
                </template>
                <template v-if="tabActive === 1">
                    <view class="order-warp">
                        <text class="title">委托订单</text>
                        <view class="order-list">
                            <view class="cell">
                                <text class="font-13 color-gray">
                                    方向
                                </text>
                                <text class="font-13 color-gray" >
                                    数量（{{item.currency.symbol}}）
                                </text>
                                <text class="font-13 color-gray">
                                    价格（USDT）
                                </text>
                            </view>
                            <view class="cell" v-for="(order,idx) in item.trade">
								<template v-if="order.status == 0">
                                <text class="font-14 color-primary">
                                    {{order.direction == 1?'买入':'卖出'}}
                                </text>
                                <text class="font-14 color-black" v-if="order.direction == 1">
                                    {{$util.thousandSeparator(parseFloat(order.amount)/parseFloat(order.price),8)}}
                                </text>
                                <text class="font-14 color-black" v-else>
                                    {{order.amount}}
                                </text>
                                <text class="font-14 color-black">
                                    {{order.price}}
                                </text>
								</template>
                            </view>
                        </view>
                        <view class="not-data" v-if="!item.trade.length">
                            <fui-empty :src="`/static/img/tactic/not_data-${userTheme}.png`"
                                       width="160"
                                       height="160"
                                       size="26"
                                       title="暂无订单"
                                       color="var(--dark-gray)">
                            </fui-empty>
                        </view>
                    </view>
                </template>
                <template v-if="tabActive === 2">
                        <view class="order-warp">
                            <view class="order-list">
                                <view class="cell">
                                    <text class="font-13 color-gray">
                                        方向
                                    </text>
                                    <text class="font-13 color-gray" >
                                        数量（{{item.currency.symbol}}）
                                    </text>
                                    <text class="font-13 color-gray">
                                        价格（USDT）
                                    </text>
                                </view>
                                <view class="cell" v-for="(order,idx) in item.trade">
                    				<template v-if="order.status == 1">
                                    <text class="font-14 color-primary">
                                        {{order.direction == 1?'买入':'卖出'}}
                                    </text>
                                    <text class="font-14 color-black" v-if="order.direction == 1">
                                        {{$util.thousandSeparator(parseFloat(order.amount)/parseFloat(order.price),8)}}
                                    </text>
                                    <text class="font-14 color-black" v-else>
                                        {{order.amount}}
                                    </text>
                                    <text class="font-14 color-black">
                                        {{order.price}}
                                    </text>
                    				</template>
                                </view>
                            </view>
                            <view class="not-data" v-if="!item.trade.length">
                                <fui-empty :src="`/static/img/tactic/not_data-${userTheme}.png`"
                                           width="160"
                                           height="160"
                                           size="26"
                                           title="暂无订单"
                                           color="var(--dark-gray)">
                                </fui-empty>
                            </view>
                        </view>
                </template>
            </view>
        </view>
    </view>
    <termination-strategy :item="item" :visible="visible" @close="visible = false"></termination-strategy>

    <!--    止盈止损弹窗-->
    <fui-bottom-popup
        background="var(--background-primary)"
        z-index="1000"
        :show="popupShow"
        @close="popupShow = false">
        <view class="popup-warp">
            <view class="title-box">
                <text>
                    修改止盈/止损
                </text>
                <text @click="popupShow = false">
                    关闭
                </text>
            </view>
            <view class="container">
                <view class="warning-title">
                    <text>价格区间</text>
                    <text>{{ $util.thousandSeparator(item.min) }} - {{ $util.thousandSeparator(item.max) }} USDT</text>
                </view>
                <view class="form-box">
                    <view class="label">
                        <text class="label-desc">
                            止盈价
                        </text>
                        <view class="label-input">
                            <input type="text" placeholder="请输入" v-model="price_up">
                            <text>USDT</text>
                        </view>
                    </view>
                    <view class="label">
                        <text class="label-desc">
                            止损价
                        </text>
                        <view class="label-input">
                            <input type="text" placeholder="请输入" v-model="price_down">
                            <text>USDT</text>
                        </view>
                    </view>
                </view>
                <view class="footer">
                    <button class="button" @click="priceUpDown">
                        确认
                    </button>
                </view>
            </view>
        </view>
    </fui-bottom-popup>
</template>
<script>
import {
    mapGetters
} from 'vuex';
	import strategy from "@/common/api/strategy.js"

import terminationStrategy from "@/components/terminationStrategy/terminationStrategy.vue";

export default {
    computed: {
        ...mapGetters(['userTheme'])
    },
    data() {
        return {
            navHeight: "",
            listTabs: ['正在执行', '委托订单', '已完成'],
            tabActive: 0,
            visible: false,
            item: {currency:{},cm:{}},
            popupShow: false,
			price_up:'',
			price_down:'',
        }
    },
	onLoad(option) {
		this.gird_id = option.gird_id
		this.type_id = option.type_id
		this.getDetail()
		uni.$on('stopStrategy',(data)=>{
			this.getDetail()
			this.visible = false
		})
	},
    components: {
        terminationStrategy
    },
    methods: {
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
        },
        tabChange(e) {
            this.tabActive = e.index;
        },
		async getDetail(){
			let res = await strategy.girdDetail(this.gird_id,this.type_id)
			this.item = res.data
		},
		editPriceUpDown(){
			this.price_up = this.item.price_up
			this.price_down = this.item.price_down
			this.popupShow = true
		},
		async priceUpDown(){
			let res = await strategy.priceUpDown({id:this.item.id,price_up:this.price_up,price_down:this.price_down})
			if(res.code == 200){
				this.item.price_up = this.price_up
				this.item.price_down = this.price_down
			}
			this.popupShow = false
		}
    }
}
</script>

<style lang="scss" scoped>
@import "policyDetails";
</style>

<style scoped>
/deep/ .fui-tabs__item {
    padding: 0;
    justify-content: flex-start;
}
</style>