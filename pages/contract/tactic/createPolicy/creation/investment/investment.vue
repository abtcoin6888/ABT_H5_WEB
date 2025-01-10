<template>
    <!--    现货定投-->
    <view class="investment">
        <view class="head">
            <view class="tabs">
                <view class="item"
                      :class="{'item-active': tabActive == index}"
                      v-for="(item,index) in tabs" :key="index"
                      @click="tabChange(index)">
                    <text>{{ item }}</text>
                </view>
            </view>
            <view class="tip-box" v-if="tabActive == 0">
                <text>推荐策略</text>
                <view class="select-box" @click="menuShow = !menuShow">
                    <text>{{ selectVal }}</text>
                    <fui-icon name="turningdown" size="30" color="var(--content-tertiary)"></fui-icon>
                </view>
            </view>
            <view class="fiex-menu" :class="{'fiex-menu-show': menuShow}">
                <view class="item"
                      :class="{'item-active': menuActive == index}"
                      v-for="(item,index) in timeMenu" :key="index"
                      @click="menuChange(item,index)">
                    <text>{{ item }}</text>
                </view>
            </view>
        </view>
        <swiper class="swiper"
                :current="tabActive"
                :duration="200"
                :style="`height: ${swiperHeight}px`">
            <swiper-item class="swiper-item">
                <scroll-view scroll-y="true"
                             class="scroll-list">
                    <view class="card-item" v-for="item in 30">
                        <view class="item-head">
                            <view class="_title">
                                <text>BTC/USDT</text>
                                <text>趋势行情</text>
                            </view>
                            <view class="tag-group">
                                <fui-tag :padding="['8rpx','16rpx']"
                                         :radius="4"
                                         background="var(--background-secondary)"
                                         color="var(--content-tertiary)"
                                         marginRight="16"
                                         :size="24">
                                    现货 CTA-MACD
                                </fui-tag>
                                <fui-tag :padding="['8rpx','16rpx']"
                                         :radius="4"
                                         background="var(--background-secondary)"
                                         color="var(--content-tertiary)"
                                         marginRight="16"
                                         :size="24">
                                    1H
                                </fui-tag>
                            </view>
                        </view>
                        <view class="item-content">
                            <view class="item-content-left">
                                <text>24.77%</text>
                                <text>近30天 年化收益率</text>
                            </view>
                        </view>
                        <view class="item-footer">
                            <view class="row">
                                <image :src="`/static/img/tactic/people-${userTheme}.webp`"></image>
                                <text>66</text>
                            </view>
                            <button class="button">
                                使用
                            </button>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <scroll-view scroll-y="true"
                             class="scroll-list">
                    <view class="list-warp-box">
                        <view class="label">
                            <text class="label-title">投资组合</text>
                            <view class="label-input">
                                <view class="desc">
                                    <text>投资币种</text>
                                </view>
                                <view class="input">
                                    <text>USDT</text>
                                </view>
                            </view>
                            <view class="label-input">
                                <view class="desc">
                                    <text>币种配置</text>
                                    <text class="change-text" v-if="selectOptions.length != 0">平均分配</text>
                                </view>
                                <view class="input-box" v-for="item in selectOptions">
                                    <view class="input-box-left">
                                        <view class="coin">
                                            <image src="@/static/coin/usdt.png"></image>
                                            <text>{{ item.coin }}</text>
                                        </view>
                                        <view class="input">
                                            <input type="text">
                                            <text>%</text>
                                        </view>
                                    </view>
                                    <view class="input-box-close">
                                        <fui-icon name="close" size="44" color="var(--content-tertiary)"></fui-icon>
                                    </view>
                                </view>
                                <view class="surplus" v-if="selectOptions.length != 0">
                                    <text>剩余 0% / 100%</text>
                                </view>
                                <button class="button" @click="popupVisible = true">
                                    添加币种
                                </button>
                            </view>
                        </view>
                        <view class="label">
                            <text class="label-title">投资金额</text>
                            <view class="label-input">
                                <view class="desc">
                                    <text>每期金额</text>
                                </view>
                                <view class="label-input-box">
                                    <input type="text" placeholder="最小值：10">
                                    <text>USDT</text>
                                </view>
                            </view>
                            <view class="balance">
                                <text>可用</text>
                                <text>0 USDT</text>
                            </view>
                        </view>
                        <view class="label">
                            <text class="label-title">时间设置</text>
                            <view class="label-input">
                                <view class="desc">
                                    <text>频率</text>
                                </view>
                                <view class="button-group">
                                    <view class="item"
                                          :class="{'item-active': freIndex == index}"
                                          v-for="(item,index) in frequency" :key="index"
                                          @click="freIndex = index">
                                        <text>{{ item }}</text>
                                    </view>
                                </view>
                            </view>
                            <template v-if="freIndex == 0">
                                <view class="label-input">
                                    <view class="desc">
                                        <text>每月定投日期</text>
                                    </view>
                                    <view class="label-input-box">
                                        <input type="text" placeholder="请输入1-100">
                                    </view>
                                </view>
                            </template>
                            <template v-if="freIndex == 1">
                                <view class="label-input">
                                    <view class="desc">
                                        <text>每隔</text>
                                    </view>
                                    <view class="label-input-box">
                                        <input type="text" placeholder="请输入1-100">
                                        <text>天</text>
                                    </view>
                                </view>
                            </template>
                            <view class="label-input">
                                <view class="desc">
                                    <text>本地时间</text>
                                    <text>设备时间：20:02（UTC+8）</text>
                                </view>
                                <view class="label-input-box">
                                    <text>21:00</text>
                                    <fui-icon name="turningdown"
                                              size="28"
                                              :color="popupShow == true ? 'var(--green)' : 'var(--text-black)'">
                                    </fui-icon>
                                </view>
                            </view>
                            <view class="label-input">
                                <view class="desc">
                                    <text>首次定投时间</text>
                                </view>
                                <view class="button-group">
                                    <view class="item"
                                          :class="{'item-active': inveIndex == index}"
                                          v-for="(item,index) in investmentTime" :key="index"
                                          @click="inveIndex = index">
                                        <text>{{ item }}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <label class="label-checkbox" @click="ruleChecked = !ruleChecked">
                            <view class="checkbox">
                                <checkbox :checked="ruleChecked"></checkbox>
                                <image v-if="ruleChecked" src="/static/img/tactic/check-s.png"></image>
                            </view>
                            <text>定投触发时，如果账户资金不足，则自动停止定投策略</text>
                        </label>
                        <button class="create-button">
                            创建订单
                        </button>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>

        <fui-bottom-popup :show="popupVisible"
                          background="var(--background-primary)"
                          @close="popupVisible = false">
            <view class="popup-warp">
                <view class="title-box">
                    <text>添加币种</text>
                    <text @click="popupVisible = false">关闭</text>
                </view>
                <view class="container">
                    <view class="select-box" v-if="selectOptions.length != 0">
                        <view class="item" v-for="item in selectOptions">
                            <text>{{ item.coin }}</text>
                            <fui-icon name="close" size="28" color="var(--content-tertiary)"></fui-icon>
                        </view>
                    </view>
                    <view class="search">
                        <fui-icon name="search" size="32" color="var(--content-tertiary)"></fui-icon>
                        <input type="text">
                    </view>
                    <view class="list">
                        <view class="list-top">
                            <view class="item" @click="switchSort(0)">
                                <text>币种</text>
                                <image class="change-icon"
                                       :src="sort[0]['active']"></image>
                            </view>
                            <view class="item" @click="switchSort(1)">
                                <text>最新价</text>
                                <image class="change-icon"
                                       :src="sort[1]['active']"></image>
                            </view>
                            <view class="item" @click="switchSort(2)">
                                <text>涨跌幅</text>
                                <image class="change-icon"
                                       :src="sort[2]['active']"></image>
                            </view>
                        </view>
                        <scroll-view scroll-y="true"
                                     class="scroll-view">
                            <view class="coin-warp">
                                <label class="cell" v-for="(item,index) in coinList" :key="index"
                                       @click="selectCoin(item)">
                                    <view class="item">
                                        <view class="checkbox" :class="{'checked': item.checked}">
                                            <checkbox :checked="item.checked"></checkbox>
                                            <image v-if="item.checked" src="/static/img/tactic/check-s.png"></image>
                                        </view>
                                        <text>{{ item.coin }}</text>
                                    </view>
                                    <view class="item">
                                        <text>4.0800</text>
                                    </view>
                                    <view class="item">
                                        <text class="price_down">-24.67%</text>
                                    </view>
                                </label>
                            </view>
                        </scroll-view>
                    </view>
                    <view class="footer">
                        <text>您最多可以选择10个币种</text>
                        <button class="button">
                            确认(已选{{ selectOptions.length }}种)
                        </button>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
    </view>
</template>
<script>
export default {
    name: "spotInvestment",
    data() {
        return {
            tabActive: 0,
            tabs: ['推荐组合', '手动创建'],
            timeMenu: ['近5年', '近3年', '近1年', '近半年', '近3个月', '近1一个月'],
            menuActive: 2,
            menuShow: false,
            selectVal: "近1年",
            swiperHeight: "",
            frequency: ['每月', '按天', '按小时'],
            freIndex: 0,
            investmentTime: ['立即', '今天', '明天'],
            inveIndex: 0,
            popupVisible: false,
            selectOptions: [],
            coinList: [{
                coin: 'BTC',
                checked: false
            }, {
                coin: 'BTC',
                checked: false
            }],
            ruleChecked: false,
            sort: [
                {
                    type: 0,
                    active: "/static/img/z-nomal.png",
                    img: "/static/img/z-nomal.png",
                    up: "/static/img/z-up-sms.png",
                    down: "/static/img/z-down-sms.png"
                },
                {
                    type: 0,
                    active: "/static/img/z-nomal.png",
                    img: "/static/img/z-nomal.png",
                    up: "/static/img/z-up-sms.png",
                    down: "/static/img/z-down-sms.png"
                },
                {
                    type: 0,
                    active: "/static/img/z-nomal.png",
                    img: "/static/img/z-nomal.png",
                    up: "/static/img/z-up-sms.png",
                    down: "/static/img/z-down-sms.png"
                }
            ],
        }
    },
    created() {
        if (this.tabActive == 1) {
            this.swiperHeight = uni.getSystemInfoSync().windowHeight - 175;
        } else {
            this.swiperHeight = uni.getSystemInfoSync().windowHeight - 214;
        }
    },
    methods: {
        tabChange(e) {
            this.tabActive = e;
            if (this.tabActive == 1) {
                this.swiperHeight = uni.getSystemInfoSync().windowHeight - 175;
            } else {
                this.swiperHeight = uni.getSystemInfoSync().windowHeight - 214;
            }
        },
        menuChange(item, index) {
            this.menuActive = index;
            this.selectVal = item;
            this.menuShow = false;
        },
        selectCoin(e) {
            e.checked = !e.checked
            if (e.checked) {
                this.selectOptions.push(e)
            }
        },
        switchSort(index, sort) {
            this.sindex = sort;
            if (this.sort[index]['type'] == 0) {
                this.sort[index]['type'] = 1;
                this.sort[index]['active'] = this.sort[index]['down'];
                this.sortCurrency(index);
                return;
            }
            if (this.sort[index]['type'] == 1) {
                this.sort[index]['type'] = 2;
                this.sort[index]['active'] = this.sort[index]['up'];
                this.sortCurrency(index);
                return;
            }
            if (this.sort[index]['type'] == 2) {
                this.sort[index]['type'] = 0;
                this.sort[index]['active'] = this.sort[index]['img'];
                this.sortCurrency(index);
                return;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "investment";
</style>