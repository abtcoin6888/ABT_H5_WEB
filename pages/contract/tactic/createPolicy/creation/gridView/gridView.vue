<template>
    <view class="creation-body">
        <view class="head">
            <view class="tab-box">
                <view class="item"
                      :class="{'item-active': tb_idx === index}"
                      v-for="(item,index) in tabs"
                      :key="index"
                      @click="changeTab(index)">
                    <text>{{ item }}</text>
                </view>
                <view class="slide-box"
                      :style="`transform: translateX(${tb_idx === 0 ? '0%' : '100%'})`">
                </view>
            </view>
        </view>
        <swiper class="swiper"
                :duration="200"
                :current="tb_idx"
                :disable-touch="true"
                @change="tb_idx = $event.detail.current">
            <!--    AI策略-->
            <swiper-item class="swiper-item">
                <scroll-view scroll-y="true"
                             class="ai-list">
                    <view class="card-warp">
                        <view class="card-item"
                              v-for="(item,idx) in list"
                              @click="$mroute.policyParameter(item.id,type_id,title)">
                            <view class="card-item-top">
                                <view class="row">
                                    <text class="coin">{{ coin }}/USDT</text>
                                    <text class="currency-type">
                                        {{ item.mold == 1 ? '进取型' : (item.mold == 2 ? '稳健型' : '保守型') }}
                                    </text>
                                </view>
                                <view class="row">
                                    <view class="row-left">
                                        <fui-tag :padding="['6rpx','12rpx']"
                                                 :radius="4"
                                                 :size="20"
                                                 :marginRight="16"
                                                 color="var(--content-tertiary)"
                                                 background="var(--background-secondary)">
                                            {{ type_id == 1 ? '现货网格' : '合约网格' }}
                                        </fui-tag>
                                        <fui-tag :padding="['6rpx','12rpx']"
                                                 :radius="4"
                                                 :size="20"
                                                 color="var(--content-always-white)"
                                                 background="var(--color-primary)">
                                            {{ item.direction == 1 ? '做多' : (item.direction == 2 ? '做空' : '中性') }}
                                        </fui-tag>
                                    </view>
                                </view>
                            </view>
                            <view class="card-item-content">
                                <view class="chart-warp">
                                    <view class="_left">
                                        <text class="color-primary card-rate">{{ item.rate }}%</text>
                                        <text>年化收益率</text>
                                    </view>
                                    <view class="canvas-box"
                                          id="canvasBox">
                                        <tatic-chart :width="canvasInfo.width"
                                                     :height="canvasInfo.height"
                                                     :chartdata="chartdata"></tatic-chart>
                                    </view>
                                </view>
                                <view class="content-row">
                                    <view class="column-item">
                                        <text class="font-11 color-black font-weight">585.25496379 USDT</text>
                                        <text class="font-11 color-gray">最小投资额</text>
                                    </view>
                                    <view class="column-item">
                                        <text class="font-11 color-black font-weight">7-30天</text>
                                        <text class="font-11 color-gray">建议投资周期</text>
                                    </view>
                                </view>
                            </view>
                            <view class="card-item-footer">
                                <view class="row">
                                    <image :src="`/static/newImage/people-${userTheme}.png`"></image>
                                    <text>{{ item.use_num }}</text>
                                </view>
                                <button class="button">使用</button>
                            </view>
                        </view>
                    </view>
                    <view class="note-data"
                          v-if="list && list.length == 0">
                        <fui-empty :src="`/static/img/tactic/not_data-${userTheme}.png`"
                                   width="160"
                                   height="160"
                                   size="26"
                                   title="暂无策略数据"
                                   color="var(--content-tertiary)">
                        </fui-empty>
                    </view>
                </scroll-view>
            </swiper-item>
            <!--    手动创建-->
            <swiper-item class="swiper-item">
                <view class="manual-creation">
                    <view class="tabs">
                        <view class="item"
                              :class="{'item-active': subTabIndex == 0}"
                              @click="subTabIndex = 0;formData.direction=1">
                            <text>做多</text>
                            <image v-if="subTabIndex == 0"
                                   :src="`/static/img/tactic/button-bg/zd-s.png`"></image>
                            <image v-else
                                   :src="`/static/img/tactic/button-bg/zd-n-${userTheme}.png`"></image>
                        </view>
                        <view class="item"
                              :class="{'item-active': subTabIndex == 1}"
                              @click="subTabIndex = 1;formData.direction=2">
                            <text>做空</text>
                            <image v-if="subTabIndex == 1"
                                   :src="`/static/img/tactic/button-bg/zk-s.png`"></image>
                            <image v-else
                                   :src="`/static/img/tactic/button-bg/zk-n-${userTheme}.png`"></image>
                        </view>
                        <view class="item"
                              :class="{'item-active': subTabIndex == 2}"
                              @click="subTabIndex = 2;formData.direction=3">
                            <text>中性</text>
                            <image v-if="subTabIndex == 2"
                                   :src="`/static/img/tactic/button-bg/zx-s-${userTheme}.png`"></image>
                            <image v-else
                                   :src="`/static/img/tactic/button-bg/zx-n-${userTheme}.png`"></image>
                        </view>
                    </view>
                    <scroll-view scroll-y="true"
                                 class="manual-container">
                        <view class="label-warp">
                            <view class="label">
                                <text class="label-title">
                                    价格区间
                                </text>
                                <view class="label-input-group">
                                    <view class="label-input">
                                        <input type="text"
                                               placeholder="最低"
                                               :adjust-position="false"
                                               :auto-blur="true"
                                               :cursor-spacing="10"
                                               v-model="formData.min">
                                        <text>USDT</text>
                                    </view>
                                    <view class="label-input">
                                        <input type="text"
                                               placeholder="最高"
                                               :adjust-position="false"
                                               :auto-blur="true"
                                               :cursor-spacing="10"
                                               v-model="formData.max">
                                        <text>USDT</text>
                                    </view>
                                </view>
                            </view>
                            <view class="label">
                                <text class="label-title">
                                    网格数量
                                </text>
                                <view class="label-input-box">
                                    <input type="text"
                                           placeholder="2-190"
                                           :adjust-position="false"
                                           :auto-blur="true"
                                           :cursor-spacing="10"
                                           v-model="formData.grid_num">
                                    <text>USDT</text>
                                </view>
                                <view class="label-tips">
                                    <text class="tips-gray underline-text"
                                          @click="showTooltip(0)">
                                        每格利润
                                    </text>
                                    <text>--</text>
                                </view>
                            </view>

                            <view class="label"
                                  v-if="formData.direction==3 && type_id==1">
                                <text class="label-title"
                                      style="font-weight: bold;">
                                    投入币种
                                </text>
                            </view>
                            <view class="label"
                                  v-if="(formData.direction==1||formData.direction==3) && (type_id==1 || type_id==2)">
                                <text class="label-title underline-text"
                                      @click="showTooltip(5)">
                                    投资额
                                </text>
                                <view class="label-input-box">
                                    <input type="text"
                                           placeholder="投资额"
                                           :adjust-position="false"
                                           :auto-blur="true"
                                           :cursor-spacing="10"
                                           v-model="formData.amount">
                                    <text>USDT</text>
                                </view>
                            </view>
                            <view class="label"
                                  v-if="(formData.direction==1||formData.direction==3) && (type_id==1 || type_id==2)">
                                <view class="label-slider">
                                    <view class="slider">
                                        <slider :value="sliderVal"
                                                activeColor="transparent"
                                                backgroundColor="transparent"
                                                block-size="16"
                                                min="0"
                                                max="100"
                                                step="1"
                                                @change="slideChange"
                                                @changing="slideChange" />
                                    </view>
                                    <view class="slider-box">
                                        <view class="slider-active-background"
                                              :style="`width: ${sliderVal}%`">
                                        </view>
                                        <view class="slider-dot-warp">
                                            <view class="dot"
                                                  :class="{'dot-active': sliderVal > i}"
                                                  v-for="i in [0, 25, 50, 75, 100]">
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                <view class="balance">
                                    <text>可用</text>
                                    <text class="font-weight">{{ $util.thousandSeparator(balance) }} USDT</text>
                                    <image src="/static/newImage/transfer-icon.png"
                                           mode="widthFix"></image>
                                </view>
                            </view>

                            <view class="label"
                                  v-if="(formData.direction==3||formData.direction == 2) && type_id==1">
                                <text class="label-title underline-text"
                                      @click="showTooltip(5)">
                                    投资额
                                </text>
                                <view class="label-input-box">
                                    <input type="text"
                                           placeholder="投资额"
                                           :adjust-position="false"
                                           :auto-blur="true"
                                           :cursor-spacing="10"
                                           v-model="formData.coin_amount">
                                    <text>{{ coin }}</text>
                                </view>
                            </view>
                            <view class="label"
                                  v-if="(formData.direction==3||formData.direction == 2) && type_id==1">
                                <view class="label-slider">
                                    <view class="slider">
                                        <slider :value="sliderVal2"
                                                activeColor="transparent"
                                                backgroundColor="transparent"
                                                block-size="16"
                                                min="0"
                                                max="100"
                                                step="1"
                                                @change="slideChange2"
                                                @changing="slideChange2" />
                                    </view>
                                    <view class="slider-box">
                                        <view class="slider-active-background"
                                              :style="`width: ${sliderVal2}%`">
                                        </view>
                                        <view class="slider-dot-warp">
                                            <view class="dot"
                                                  :class="{'dot-active': sliderVal2 > i}"
                                                  v-for="i in [0, 25, 50, 75, 100]">
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                <view class="balance">
                                    <text>可用</text>
                                    <text class="font-weight">0 {{ coin_symbol }}</text>
                                    <image src="/static/newImage/transfer-icon.png"
                                           mode="widthFix"></image>
                                </view>
                            </view>

                            <!--   保证金  -->
                            <view v-if="type_id === 2">
                                <view class="label">
                                    <view class="label-title-warp">
                                        <text class="font-13 color-black underline-text"
                                              @click="showTooltip(7)">
                                            保证金
                                        </text>
                                        <view class="lever-button bg-gray"
                                              @click="adjustLeverage = true">
                                            <text class="font-11 font-weight color-black">{{ p_leverage_number }}X</text>
                                            <image :src="`/static/img/tactic/down-${userTheme}.png`"
                                                   mode="widthFix"></image>
                                        </view>
                                    </view>
                                    <view class="label-input-box">
                                        <input type="text"
                                               placeholder=">0"
                                               :adjust-position="set ? false : true"
                                               :auto-blur="true"
                                               :cursor-spacing="10">
                                        <text>USDT</text>
                                    </view>
                                </view>
                                <view class="label">
                                    <view class="label-slider">
                                        <view class="slider">
                                            <slider :value="securityDeposit"
                                                    activeColor="transparent"
                                                    backgroundColor="transparent"
                                                    block-size="16"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    @change="securityDeposit = $event.detail.value"
                                                    @changing="securityDeposit = $event.detail.value" />
                                        </view>
                                        <view class="slider-box">
                                            <view class="slider-active-background"
                                                  :style="`width: ${securityDeposit}%`">
                                            </view>
                                            <view class="slider-dot-warp">
                                                <view class="dot"
                                                      :class="{'dot-active': securityDeposit > i}"
                                                      v-for="i in [0, 25, 50, 75, 100]">
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                    <view class="balance">
                                        <text>可用</text>
                                        <text class="font-weight">0 {{ coin_symbol }}</text>
                                        <image src="/static/newImage/transfer-icon.png"
                                               mode="widthFix"></image>
                                    </view>
                                    <view class="balance">
                                        <text class="underline-text"
                                              @click="showTooltip(8)">预估爆仓价
                                        </text>
                                        <text class="font-weight">--USDT</text>
                                    </view>
                                </view>
                            </view>

                            <view class="label">
                                <label-check-box :checked="checked"
                                                 :text="$t('strategy.t67')"
                                                 @change="checked = !checked">
                                </label-check-box>
                            </view>
                            <view class="label">
                                <view class="label-row">
                                    <text>移动网格</text>
                                    <fui-switch :scaleRatio="0.8"
                                                color="var(--color-primary)"
                                                @change="moveGridChange"></fui-switch>
                                </view>
                            </view>
                            <view class="label">
                                <view class="label-row"
                                      @click="set = !set">
                                    <text>高级设置</text>
                                    <fui-icon name="turningdown"
                                              size="32"
                                              color="var(--content-primary)"></fui-icon>
                                </view>
                            </view>
                            <template v-if="set == true">
                                <view class="label">
                                    <text class="label-title underline-text"
                                          @click="showTooltip(1)">
                                        触发价
                                    </text>
                                    <view class="label-input-box">
                                        <input type="text"
                                               placeholder="请输入"
                                               :adjust-position="false"
                                               :auto-blur="true"
                                               :cursor-spacing="10"
                                               v-model="formData.trigger_price">
                                        <text>USDT</text>
                                    </view>
                                </view>
                                <view class="label">
                                    <text class="label-title underline-text"
                                          @click="showTooltip(2)">
                                        止盈价格
                                    </text>
                                    <view class="label-input-box">
                                        <input type="text"
                                               placeholder="请输入"
                                               :adjust-position="false"
                                               :auto-blur="true"
                                               :cursor-spacing="10"
                                               v-model="formData.price_up">
                                        <text>USDT</text>
                                    </view>
                                </view>
                                <view class="label">
                                    <text class="label-title underline-text"
                                          @click="showTooltip(3)">
                                        止损价格
                                    </text>
                                    <view class="label-input-box">
                                        <input type="text"
                                               placeholder="请输入"
                                               :adjust-position="true"
                                               :auto-blur="true"
                                               :cursor-spacing="140"
                                               v-model="formData.price_down">
                                        <text>USDT</text>
                                    </view>
                                </view>
                                <view class="label">
                                    <text class="label-title underline-text"
                                          @click="showTooltip(4)">
                                        网格挂单模式
                                    </text>
                                    <view class="mode-group">
                                        <view class="item"
                                              :class="{'item-active': modeIndex == index}"
                                              v-for="(item,index) in modeGroup"
                                              :key="index"
                                              @click="modeIndex = index;formData.mode=(index+1)">
                                            <text>{{ item }}</text>
                                        </view>
                                    </view>
                                </view>
                                <view class="label">
                                    <text class="label-title underline-text"
                                          @click="showTooltip(6)">
                                        开单限价
                                    </text>
                                    <view class="price-group">
                                        <view class="item"
                                              :class="{'item-active': priceIndex == index}"
                                              v-for="(item,index) in priceGroup"
                                              :key="index"
                                              @click="priceIndex = index;formData.open_limit=(index+1)">
                                            <text>{{ item }}</text>
                                        </view>
                                    </view>
                                </view>
                            </template>
                            <view class="button-box">
                                <fui-button height="78rpx"
                                            radius="78rpx"
                                            background="var(--content-primary)"
                                            color="var(--background-primary)"
                                            size="26"
                                            bold
                                            text="创建订单"
                                            @click="add">
                                </fui-button>
                            </view>
                        </view>
                    </scroll-view>
                </view>
                <view class="note-data"
                      v-if="false">
                    <fui-empty :src="`/static/img/tactic/not_data-${userTheme}.png`"
                               width="160"
                               height="160"
                               size="26"
                               title="暂无订单"
                               color="var(--content-tertiary)">
                    </fui-empty>
                </view>
            </swiper-item>
        </swiper>

        <tooltip :show="tooltipShow"
                 :title="tooltipInfo[tooltipIndex].title"
                 :content="tooltipInfo[tooltipIndex].content"
                 @close="tooltipShow = false">
            <template v-slot:custom-content>
                <view v-if="tooltipIndex === 4">
                    <text class="font-14 color-black">
                        {{ tooltipInfo[tooltipIndex].content1 }}
                    </text>
                </view>
            </template>
        </tooltip>

        <fui-bottom-popup :show="adjustLeverage"
                          background="var(--background-primary)">
            <view class="adjust-leverage">
                <view class="title-warp">
                    <text class="font-16 font-weight color-black">调整杠杆</text>
                    <fui-icon name="close"
                              size="52"
                              color="var(--content-primary)"
                              @click="adjustLeverage = false"></fui-icon>
                </view>
                <view class="adjust-leverage-container">
                    <view class="input-bumber">
                        <fui-input-number :custom="true"
                                          :min="0"
                                          :max="125"
                                          :size="42"
                                          v-model="p_leverage_number"
                                          backgroundColor="transparent"
                                          color="var(--content-primary)">
                            <template v-slot:default>
                                <fui-icon name="minus"
                                          size="62"
                                          color="var(--content-primary)"></fui-icon>
                            </template>
                            <template v-slot:plus>
                                <fui-icon name="plus"
                                          size="62"
                                          color="var(--content-primary)"></fui-icon>
                            </template>
                        </fui-input-number>
                    </view>
                    <view class="slider-warp">
                        <view class="slider-box">
                            <view class="slider">
                                <slider :value="p_leverage_val"
                                        activeColor="transparent"
                                        backgroundColor="transparent"
                                        block-size="16"
                                        min="0"
                                        max="125"
                                        step="1"
                                        @change="p_leverage_number = p_leverage_val = $event.detail.value"
                                        @changing="p_leverage_number = p_leverage_val = $event.detail.value" />
                            </view>
                            <view class="sldier-background">
                                <view class="slider-active-background"
                                      :style="`width: ${p_leverage_val * 5.52}rpx`"></view>
                                <view class="slider-dots">
                                    <view class="dots"
                                          v-for="i in [1, 25, 50, 75, 100, 125]"></view>
                                </view>
                            </view>
                            <view class="slider-dot-number">
                                <text class="font-10 color-gray"
                                      :class="{'color-black' : p_leverage_val >= i, 'text-padding': i > 1 && i < 125}"
                                      v-for="i in [1, 25, 50, 75, 100, 125]">
                                    {{ i }}X
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="confirm-button bg-black"
                          @click="adjustLeverage = false">
                        <text class="font-14 font-weight color-white">确定</text>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
    </view>
</template>

<script>
import strategy from "@/common/api/strategy.js"
import taticChart from "@/components/taticChart/taticChart.vue";
import tooltip from "@/components/tooltip/tooltip.vue";
import labelCheckBox from "@/components/labelcheckbox/labelcheck.vue";

export default {
    name: "gridView",
    props: {
        type_id: {
            default: 1,
            type: Number
        },
        title: {
            default: '',
            type: String
        },
        tabActive: {
            default: 0,
            type: Number
        },
        id: {
            default: 0,
            type: Number
        },
        coin: {
            default: '',
            type: String
        },
    },
    components: {
        taticChart,
        tooltip,
        labelCheckBox
    },
    computed: {
        coin_symbol() {
            if (this.symbol) {
                return this.symbol
            }
            return this.coin;
        }
    },
    data() {
        return {
            tabs: ['AI策略', '手动创建'],
            subTabIndex: 0,
            set: false,
            sliderVal: 0,
            sliderVal2: 0,
            checked: false,
            modeGroup: ['等比', '等差'],
            modeIndex: 1,
            priceGroup: ['1%', '2%', '无'],
            priceIndex: 2,
            list: [],
            formData: {
                direction: 1,
                min: '',
                max: '',
                grid_num: '',
                amount: '',
                coin_amount: 0,
                move_grid: 0,
                move_grid_rise: 0,
                move_grid_stop_price: 0,
                trigger_price: '',
                mode: 2,
                open_limit: 3,
                price_up: '',
                price_down: '',
                stop_sell: 0,
                stop_buy: 0,
            },
            balance: '0.00',
            offGird_id: 0,
            symbol: '',
            currentCurrency: {
                cm_id: 0,
                currency_id: 0,
            },
            tb_idx: 0,
            canvasInfo: {
                width: "",
                height: ""
            },
            chartdata: [
                {timestamp: 1624521600000, open: 2320.26, close: 2300.00, low: 2287.3, high: 2362.94},
                {timestamp: 1624608000000, open: 2300.00, close: 2291.30, low: 2288.26, high: 2308.38},
                {timestamp: 1624694400000, open: 2295.35, close: 2346.50, low: 2295.35, high: 2346.92},
                {timestamp: 1624780800000, open: 2347.22, close: 2358.98, low: 2337.35, high: 2363.8},
                {timestamp: 1624867200000, open: 2360.75, close: 2382.48, low: 2347.89, high: 2383.76},
                {timestamp: 1624521600000, open: 2320.26, close: 2300.00, low: 2287.3, high: 2362.94},
                {timestamp: 1624608000000, open: 2300.00, close: 2291.30, low: 2288.26, high: 2308.38},
                {timestamp: 1624694400000, open: 2295.35, close: 2346.50, low: 2295.35, high: 2346.92},
                {timestamp: 1624780800000, open: 2347.22, close: 2358.98, low: 2337.35, high: 2363.8},
                {timestamp: 1624867200000, open: 2360.75, close: 2382.48, low: 2347.89, high: 2383.76}
            ],
            tooltipShow: false,
            tooltipIndex: 0,
            tooltipInfo: [{
                title: "每格利润",
                content: "当前展示数据已扣除手续费，为单网格净利润。每格利润为估算值，仅供参考。"
            }, {
                title: "触发价格",
                content: "当您选择的币对的最新价达到触发价格时，网格才会开始运行。"
            }, {
                title: "止盈价格",
                content: "止盈价需要大于当前价。选中币对的最新价格达到设置的止盈价格后，网格才会停止运行。"
            }, {
                title: "止损价格",
                content: "止损价需要小于当前价。选中币对的最新价格达到设置的止损价格后，网格才会停止运行。"
            }, {
                title: "网络挂单模式",
                content: "等比模式:每个网格之前的涨幅相等。适合向下震荡或窄幅震荡行情。",
                content1: "等差模式:每个网格之前的差价相等。适合向上震荡的行情。"
            }, {
                title: "投资额",
                content: "策略将会使用您现货账户的资产。创建策略时实际使用的资金取决于市场，可能不等于您输入的数量。"
            }, {
                title: "开单限价",
                content: "创建网格订单时，由于市场波动，初始建仓价可能会超过开仓时显示的价格。为了尽可能减少滑点，您可以为初始建仓价格设置限制。"
            }, {
                title: "保证金",
                content: "运行策略所需保证金不足时，您需要手动划转资金以降低风险。"
            }, {
                title: "预估爆仓价",
                content: "该爆仓价为策略爆仓价，即所有委托单成交后的爆仓价。"
            }],

            securityDeposit: 0, //保证金

            adjustLeverage: false, //调整杠杆弹窗
            p_leverage_val: 0,
            p_leverage_number: 1
        }
    },
    watch: {
        p_leverage_val(v) {
            v == 0 ? this.p_leverage_number = 1 : this.p_leverage_number = v;
        },
        p_leverage_number(v) {
            this.p_leverage_val = v;
        }
    },
    created() {
        uni.$on('selectCurrency', (data) => {
            this.currentCurrency = data
            this.getAi(this.type_id)
        })
        uni.$on('selectAi', (data) => {
            this.getAi(data)
        })
        this.getBalance()
        this.tb_idx = this.tabActive
    },
    methods: {
        changeTab(idx) {
            this.tb_idx = idx
            uni.$emit('tab2Change', idx)
        },
        slideChange(e) {
            this.sliderVal = e.detail.value;
            this.formData.amount = parseFloat((parseFloat(this.balance) * e.detail.value / 100).toFixed(8))
        },
        slideChange2(e) {
            this.sliderVal2 = e.detail.value;
            this.formData.coin_amount = parseFloat((parseFloat(this.balance) * e.detail.value / 100).toFixed(8))
        },
        async getAi(type_id) {
            let res = await strategy.ai(type_id, this.currentCurrency.cm_id, this.currentCurrency.id)
            this.list = res.data.list
            if (this.id) {
                this.list.map((item) => {
                    if (item.id == this.id) {
                        uni.$emit('useCurrency', item.currency_id)
                        this.formData = item
                        this.currency_id = item.currency_id
                        this.symbol = item.currency.symbol
                    }
                })
            }
        },
        async add() {
            let data = this.formData
            if (this.type_id == 1) {
                data.stop_sell = this.checked ? 1 : 0
            } else {
                data.stop_buy = this.checked ? 1 : 0
            }
            data.type_id = this.type_id
            data.cm_id = this.currentCurrency.cm_id
            data.currency_id = this.currentCurrency.id
            data.price = this.currentCurrency.new_price
            if (this.formData.open_limit == 3) {
                data.open_limit = 0
            }
            // console.log(data)
            // return
            let res = await strategy.add(data)
            if (res.code == 200) {
                uni.showToast({
                    icon: 'none',
                    title: res.message
                })
                uni.navigateTo({
                    url: "/pages/contract/tactic/tactic"
                })
            }
            if (res.code == 1000) {
                uni.showToast({
                    icon: 'none',
                    title: res.message
                })
            }
        },
        moveGridChange(event) {
            this.formData.move_grid = event.detail.value ? 1 : 0
        },
        getBalance() {
            strategy.getBalance(10).then(res => {
                this.balance = res.data.balance;
            });
        },
        getElementInfo() {
            const query = uni.createSelectorQuery().in(this);
            query.select('#canvasBox').boundingClientRect(data => {
                this.canvasInfo.width = data.width;
                this.canvasInfo.height = data.height;
            }).exec();
        },
        showTooltip(e) {
            this.tooltipShow = true;
            this.tooltipIndex = e;

            if (e === 4) {

            }
        }
    },
}
</script>
<style lang="scss"
       scoped>
@import "gridView";
</style>