<template>
    <view class="page-warp bg-gray" :data-theme="userTheme">
        <fui-nav-bar zIndex="9"
                     isFixed
                     isOccupy
                     :padding="15"
                     :background="pageNavBackground"
                     :color="pageNavColor"
                     title="SUI"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      :color="pageNavColor">
            </fui-icon>
        </fui-nav-bar>
        <scroll-view class="scroll-view bg-gray" :scroll-y="true"
                     :style="`height: ${$device.windowHeight}px`"
                     @scroll="bodyScroll">
            <view class="banner" id="banner">
                <image class="banner-image" src="/static/jumpstart-card.webp" mode="aspectFill"></image>
                <view class="banner-content">
                    <view class="intro">
                        <image class="currency-icon" src="/static/coin/usdt.png" mode="widthFix"></image>
                        <text class="font-22 font-bold always-white symbol-txt">SUI</text>
                        <view class="tag" :class="selectIndex === 0 ? 'bg-green' : 'bg-warring'">
                            <text class="font-12 always-white">{{ selectIndex === 0 ? '认购抽签' : '打折销售' }}</text>
                        </view>
                    </view>
                    <view class="banner-row">
                        <text class="font-13 color-gray">销售价格</text>
                        <text class="font-13 font-bold always-white">$ 0.1</text>
                    </view>
                    <view class="banner-row">
                        <text class="font-13 color-gray">本轮总量</text>
                        <text class="font-13 font-bold always-white">225000000 SUI</text>
                    </view>
                    <view class="banner-row" v-if="selectIndex === 0">
                        <text class="font-13 color-gray">认购总量</text>
                        <text class="font-13 font-bold always-white">3741590</text>
                    </view>
                </view>
            </view>
            <view class="list-warp bg-gray" :style="`top: ${bannerHeight - 10}px`">
                <view class="step-box">
                    <view class="before" :style="`width: ${690 / rowStep.length * (rowStep.length - 1)}rpx`"></view>
                    <view class="step-item" :style="`width: ${690 / rowStep.length}rpx`" v-for="item in rowStep">
                        <view class="dot"></view>
                        <text class="step-time font-11 color-black mb-5">{{ item.time }}</text>
                        <text class="step-txt font-11 color-black">{{ item.txt }}</text>
                    </view>
                </view>
                <view class="card-box before-card bg-white">
                    <view class="after-box" :style="`left: ${rowStepActive * (100 / rowStep.length) + 3}%`"></view>
                    <view class="card-tab">
                        <view class="item" :class="{'active': selectIndex == index}" v-for="(item,index) in cardTab"
                              :key="index" @click="selectIndex = index">
                            <text class="font-16 font-weight"
                                  :class="selectIndex == index ? 'color-black' : 'color-gray'">{{ item }}
                            </text>
                        </view>
                    </view>
                    <view class="label">
                        <view class="label-title">
                            <view class="row-item">
                                <image class="label-icon" src="/static/img/blogo.png" mode="widthFix"></image>
                                <text class="font-16 font-bold color-black">已结束</text>
                            </view>
                        </view>
                        <text class="font-12 color-black">
                            您所获得的代币和剩余的OKB资产已发送到资金账户，请前往资金账户查看。
                        </text>
                    </view>
                    <view class="label" v-if="selectIndex === 1">
                        <view class="label-title">
                            <text class="font-16 font-bold color-black">预约记录</text>
                        </view>
                        <view class="label-content" v-if="subRecord && subRecord.length === 0">
                            <view class="row">
                                <text class="font-13 color-gray">您未参与本次活动</text>
                            </view>
                        </view>
                        <view class="label-content" v-else>
                            <view class="record-list bg-gray">
                                <view class="record-row">
                                    <view class="item">
                                        <text class="font-12 color-gray">数量</text>
                                    </view>
                                    <view class="item">
                                        <text class="font-12 color-gray">金额</text>
                                    </view>
                                    <view class="item">
                                        <text class="font-12 color-gray">时间</text>
                                    </view>
                                </view>
                                <view class="record-row" v-for="item in subRecord" :key="item">
                                    <view class="item">
                                        <text class="font-13 color-black">{{ item.number }}</text>
                                    </view>
                                    <view class="item">
                                        <text class="font-13 color-black">{{ item.price }}</text>
                                    </view>
                                    <view class="item">
                                        <text class="font-13 color-black">{{ item.time }}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <template v-if="selectIndex === 0">
                        <view class="label">
                            <view class="label-title">
                                <text class="font-16 font-bold color-black">发放周期</text>
                            </view>
                            <text class="font-12 color-gray">中签新币将根据以下周期进行解锁</text>
                            <view class="label-step">
                                <view class="before"></view>
                                <view class="step-item" v-for="item in displayCycle">
                                    <view class="item-cell">
                                        <view class="dot"></view>
                                        <text class="font-13 color-black">{{ item.time }}</text>
                                    </view>
                                    <view class="item-cell">
                                        <view class="tag bg-gray">
                                            <text class="font-11 color-gray">{{ stateTxt[item.state] }}</text>
                                        </view>
                                        <text class="font-13 color-black">{{ item.rate }}%</text>
                                    </view>
                                </view>
                            </view>
                            <view class="view-more-step">
                                <fui-icon :class="{'up-icon': moreStep}" name="arrowdown" size="38"
                                          color="var(--content-primary)" @click="moreStep = !moreStep"></fui-icon>
                            </view>
                        </view>
                        <view class="label">
                            <view class="label-title">
                                <text class="font-16 font-bold color-black">认购记录</text>
                            </view>
                            <view class="label-content" v-if="subRecord && subRecord.length === 0">
                                <view class="row">
                                    <text class="font-13 color-gray">您未参与本次活动</text>
                                </view>
                            </view>
                            <view class="label-content" v-else>
                                <view class="record-list bg-gray">
                                    <view class="record-row">
                                        <view class="item">
                                            <text class="font-12 color-gray">数量</text>
                                        </view>
                                        <view class="item">
                                            <text class="font-12 color-gray">金额</text>
                                        </view>
                                        <view class="item">
                                            <text class="font-12 color-gray">时间</text>
                                        </view>
                                    </view>
                                    <view class="record-row" v-for="item in subRecord" :key="item">
                                        <view class="item">
                                            <text class="font-13 color-black">{{ item.number }}</text>
                                        </view>
                                        <view class="item">
                                            <text class="font-13 color-black">{{ item.price }}</text>
                                        </view>
                                        <view class="item">
                                            <text class="font-13 color-black">{{ item.time }}</text>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </template>
                    <view class="label">
                        <view class="label-title">
                            <text class="font-16 font-bold color-black">参与条件</text>
                        </view>
                        <view class="label-content">
                            <view class="row">
                                <view class="row-item">
                                    <text class="font-13 color-gray">可参与国家/地区</text>
                                </view>
                                <view class="row-item">
                                    <image class="icon" :src="`/static/img/${iconName}.png`" mode="widthFix"></image>
                                </view>
                            </view>
                            <view class="row">
                                <view class="row-item">
                                    <text class="font-13 color-gray">身份认证</text>
                                </view>
                                <view class="row-item">
                                    <image class="icon" :src="`/static/img/${iconName}.png`" mode="widthFix"></image>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="label">
                        <view class="label-title">
                            <text class="font-16 font-bold color-black">活动规则</text>
                            <view class="row-item">
                                <text class="font-12 price_up">查看详情</text>
                                <fui-icon name="arrowright" size="30" color="var(--color-primary)"></fui-icon>
                            </view>
                        </view>
                        <view class="label-content">
                            <template v-if="selectIndex === 0">
                                <view class="row">
                                    <text class="font-13 color-gray">签数数量</text>
                                    <text class="font-13 color-black">2250000 签</text>
                                </view>
                                <view class="row">
                                    <text class="font-13 color-gray">单签数量</text>
                                    <text class="font-13 color-black">100 SUI</text>
                                </view>
                                <view class="row">
                                    <text class="font-13 color-gray">中签上限</text>
                                    <text class="font-13 color-black">100 签</text>
                                </view>
                            </template>
                            <template v-else>
                                <view class="row">
                                    <text class="font-13 color-gray">预约上限</text>
                                    <text class="font-13 color-black">1500 SUI</text>
                                </view>
                            </template>
                        </view>
                    </view>
                    <view class="purchase bg-black" @click="purchase = true">
                        <text class="font-13 font-weight color-white">立即申购</text>
                    </view>
                </view>
                <view class="card-box bg-white">
                    <view class="label">
                        <view class="label-title">
                            <text class="font-16 font-bold color-black">项目详情</text>
                        </view>
                        <view class="label-content">
                            <view class="content-text">
                                <text class="font-13 color-black">
                                    这里是关于项目的详情介绍，这里是关于项目的详情介绍，这里是关于项目的详情介绍，这里是关于项目的详情介绍，这里是关于项目的详情介绍，这里是关于项目的详情介绍，这里是关于项目的详情介绍，这里是关于项目的详情介绍。
                                </text>
                            </view>
                            <view class="row">
                                <view class="row-item">
                                    <text class="font-13 color-gray">发行总量</text>
                                </view>
                                <view class="row-item">
                                    <text class="font-14 font-weight color-black">100000000000</text>
                                </view>
                            </view>
                            <view class="row">
                                <view class="row-item">
                                    <text class="font-13 color-gray">代币种类</text>
                                </view>
                                <view class="row-item">
                                    <text class="font-14 font-weight color-black">Mainnet</text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="label">
                        <view class="label-title">
                            <text class="font-16 font-bold color-black">代币分配比例</text>
                        </view>
                        <view class="label-canvas">
                            <canvas class="canvas" canvas-id="chart" id="chart" @touchend="tap"></canvas>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>

        <fui-bottom-popup :show="purchase" background="var(--background-primary)" :safeArea="false" @close="closePopup">
            <view class="purchase-popup">
                <view class="title-box">
                    <text class="font-16 font-weight color-black">确认申购</text>
                    <fui-icon name="close" size="48" color="var(--content-primary)" @click="closePopup"></fui-icon>
                </view>
                <view class="purchase-popup-form">
                    <text class="font-13 color-gray">申购数量</text>
                    <view class="input-box" :class="{'input-unfilled': purchaseTip}">
                        <input class="input font-14 font-weight color-black" type="number" :min="min_number"
                               :max="max_number" v-model="purchase_number"
                               :placeholder="`请填写申购数量(${min_number} - ${max_number})`">
                    </view>
                    <text class="font-12 price_down" v-if="purchaseTip">{{ message }}</text>
                    <view class="confirm-button bg-black" @click="submit">
                        <text class="font-14 font-weight color-white">提交</text>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
    </view>
</template>
<script>
import {mapGetters} from "vuex";
import FuiNavBar from "../../../components/firstui/fui-nav-bar/fui-nav-bar.vue";
import user from "../../../common/api/user";
import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js';

var uChartsInstance = {};

export default {
    components: {FuiNavBar},
    data() {
        return {
            opacity: 0,
            scrollTop: 0,
            bannerHeight: null,
            cardTab: ['公开销售', '白名单专享'],
            selectIndex: 0,
            rowStepActive: 0,
            rowStep: [{
                time: '04/20 00:00',
                txt: "持仓统计"
            }, {
                time: '04/20 00:00',
                txt: "开始认购"
            }, {
                time: '04/20 00:00',
                txt: "中签统计"
            }, {
                time: '04/20 00:00',
                txt: "结果公布"
            }],
            cycle: [{
                time: "2023年5月3日 14:00",
                state: 0,
                rate: 7.7
            }, {
                time: "2023年5月3日 14:00",
                state: 0,
                rate: 7.7
            }, {
                time: "2023年5月3日 14:00",
                state: 0,
                rate: 7.7
            }, {
                time: "2023年5月3日 14:00",
                state: 0,
                rate: 7.7
            }],
            stateTxt: ["已发放"],
            moreStep: false,
            cWidth: 640,
            cHeight: 400,
            state: 1,
            purchase: false,
            purchase_number: "",
            min_number: 10,
            max_number: 10000,
            purchaseTip: false,
            message: "",
            subRecord:[
                {
                    time: "2024-08-23 10:20",
                    number: 100000,
                    price: "2653.63"
                },
                {
                    time: "2024-08-23 10:20",
                    number: 1000,
                    price: "200053.63"
                }
            ]
        }
    },
    onReady() {
        //这里的 750 对应 css .charts 的 width
        this.cWidth = uni.upx2px(640);
        //这里的 500 对应 css .charts 的 height
        this.cHeight = uni.upx2px(400);
        this.getServerData();
    },
    onShow() {
        this.$nextTick(() => {
            this.getElementInfo();
        })
    },
    computed: {
        ...mapGetters(['userTheme', 'isLogin']),
        pageNavBackground() {
            const opacity = this.opacity;
            return this.userTheme == 'light' ? `rgba(255, 255, 255, ${opacity})` : `rgba(17, 17, 17, ${opacity})`
        },
        pageNavColor() {
            const opacity = this.opacity;
            if (this.scrollTop > 0) {
                return this.userTheme == 'light' ? `rgba(31, 31, 31, ${opacity})` : `rgba(255, 255, 255, ${opacity})`
            } else {
                return `rgba(255, 255, 255, 1)`
            }
        },
        displayCycle() {
            return this.cycle.slice(0, this.moreStep ? this.cycle.length : 3);
        },
        iconName() {
            return this.state === 0 ? 'check' : 'cross'
        }
    },
    watch: {
       purchase_number(v) {
           if(v) {
               this.purchaseTip = false
           }
       }
    },
    methods: {
        bodyScroll(e) {
            this.scrollTop = e.detail.scrollTop;
            this.opacity = e.detail.scrollTop / 150
        },
        getElementInfo() {
            const query = uni.createSelectorQuery().in(this);
            query.select("#banner").boundingClientRect((data) => {
                this.bannerHeight = data.height;
            }).exec();
        },
        getServerData() {
            //模拟从服务器获取数据时的延时
            setTimeout(() => {
                //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
                let res = {
                    series: [
                        {
                            data: [
                                {
                                    "name": "社区基金",
                                    "value": 50
                                },
                                {
                                    "name": "早期贡献者",
                                    "value": 30
                                }, {
                                    "name": "投资人",
                                    "value": 20
                                }, {
                                    "name": "国库",
                                    "value": 18
                                }, {
                                    "name": "社区激励与APP测试者",
                                    "value": 8
                                }]
                        }
                    ]
                };
                this.drawCharts('chart', res);
            }, 500);
        },
        drawCharts(id, data) {
            const ctx = uni.createCanvasContext(id, this);
            uChartsInstance[id] = new uCharts({
                type: "ring",
                context: ctx,
                width: this.cWidth,
                height: this.cHeight,
                series: data.series,
                animation: true,
                rotate: false,
                rotateLock: false,
                background: this.userTheme == 'light' ? '#ffffff' : '#111111',
                color: ["#FEA802", "#FE7434", "#EA515F", "#D94A8C", "#B4418E"],
                padding: [5, 5, 5, 5],
                dataLabel: false,
                enableScroll: false,
                legend: {
                    show: true,
                    position: "right",
                    float: "right",
                    lineHeight: 25,
                    margin: 30
                },
                extra: {
                    ring: {
                        ringWidth: 35,
                        activeOpacity: 0.5,
                        activeRadius: 10,
                        offsetAngle: 0,
                        labelWidth: 15,
                        border: false,
                        borderWidth: 3,
                        borderColor: this.userTheme == 'light' ? '#ffffff' : '#111111',
                        centerColor: this.userTheme == 'light' ? '#ffffff' : '#111111'
                    }
                }
            });
        },
        tap(e) {
            uChartsInstance[e.target.id].touchLegend(e);
            uChartsInstance[e.target.id].showToolTip(e);
        },
        submit() {
            const purchaseArr = {
                p_number: this.purchase_number,
                min_number: this.min_number,
                max_number: this.max_number
            }
            const isValid = purchaseArr['p_number'] !== '' && purchaseArr['p_number'] >= purchaseArr['min_number'] && purchaseArr['p_number'] <= purchaseArr['max_number'];
            if (!isValid) {
                // 不满足条件
                this.purchaseTip = true;
                this.message = purchaseArr['p_number'] === ''
                    ? "请输入购买数量"
                    : (purchaseArr['p_number'] < purchaseArr['min_number']
                        ? `申购数量最小为 ${purchaseArr['min_number']}`
                        : `申购数量最大为 ${purchaseArr['max_number']}`);
                return
            }


            console.log("满足条件")
        },
        closePopup(){
            this.purchase = false;
            this.purchaseTip = false;
        }
    },
}
</script>
<style scoped>
@import "event-details.css";
</style>