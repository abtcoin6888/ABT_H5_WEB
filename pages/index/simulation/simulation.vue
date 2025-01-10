<template>
    <view class="simulated" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     :title="$t('recod.t1')"
                     zIndex="9"
                     background="var(--color-gray-bg)"
                     color="var(--black)"
                     @leftClick="$mroute.back()"
                     custom
                     @init="navInit">
            <view class="nav-bar">
                <view class="nav-bar-left">
                    <text class="font-16 color-black font-weight">
                        {{ $t('simulation.title') }}
                    </text>
                </view>
                <view class="nav-bar-right">
                    <fui-button width="140rpx"
                                height="58rpx"
                                radius="10rpx"
                                size="26"
                                background="var(--blue)"
                                :text="$t('simulation.firm_offer')"
                                @click="backHome()">
                    </fui-button>
                </view>
            </view>
        </fui-nav-bar>

        <view class="simulated-body">
            <view class="simulated-body-card">
                <!-- 资产 -->
                <view class="asset">
                    <view class="asset-cell">
                        <text class="font-12 color-gray">
                            {{ $t('index.asset') }}(USDT)
                        </text>
                        <fui-icon :name="show ? 'visible' : 'invisible'"
                                  size="38"
                                  color="var(--color-text-dark-gray)"
                                  @click="show = !show">
                        </fui-icon>
                    </view>
                    <view class="asset-cell">
                        <text class="font-18 color-white font-weight">
                            {{ show ? '1000.00' : '*****' }}
                        </text>
                    </view>
                    <view class="asset-cell">
                        <text class="font-12 color-gray">
                            {{ show ? '¥7021.00' : '*****' }}
                        </text>
                    </view>
                </view>
                <!-- 胜率 -->
                <view class="win-rate">
                    <view class="win-rate-chart">
                        <view class="chart-box">
                            <qiun-data-charts
                                type="arcbar"
                                :opts="opts"
                                :chartData="chartData"
                            />
                        </view>
                    </view>
                    <view class="win-rate-data">
                        <view class="data-column">
                            <view class="data-column-item">
                                <text class="font-14 color-black font-weight">
                                    129
                                </text>
                                <text class="font-12 color-gray">
                                    {{ $t('simulation.open_record') }}
                                </text>
                            </view>
                            <view class="data-column-item">
                                <text class="font-14 color-black font-weight">
                                    120
                                </text>
                                <text class="font-12 color-gray">
                                    {{ $t('simulation.close_record') }}
                                </text>
                            </view>
                            <view class="data-column-item">
                                <text class="font-14 color-black font-weight">
                                    305
                                </text>
                                <text class="font-12 color-gray">
                                    {{ $t('simulation.cp_pr') }}
                                </text>
                            </view>
                        </view>
                        <view class="data-button">
                            <fui-button height="88rpx"
                                        radius="16rpx"
                                        size="26"
                                        bold
                                        background="var(--blue)"
                                        :text="$t('simulation.challenge_off')"
                                        @click="backHome()">
                            </fui-button>
                        </view>
                    </view>
                </view>
            </view>
            <view class="simulated-body-card">
                <view class="profit">
                    <view class="profit-cell">
                        <text class="font-14 color-black font-weight">
                            {{ $t('simulation.pro_days') }}
                        </text>
                        <text class="font-14 price_down font-weight">
                            -125.96 USDT
                        </text>
                    </view>
                    <view class="profit-chart">
                        <qiun-data-charts
                            type="tarea"
                            :opts="optdata"
                            :chartData="profitData"
                        />
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import {mapGetters} from 'vuex';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";

export default {
    components: {fuiNavBar},
    data() {
        return {
            show: true,
            opts: {
                color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
                padding: undefined,
                title: {
                    name: "50%",
                    fontSize: 35,
                    color: "#2fc25b"
                },
                subtitle: {
                    name: this.$t('tradeInfo.winning_percentage'),
                    fontSize: 14,
                    color: "#333"
                },
                extra: {
                    arcbar: {
                        type: "circle",
                        width: 8,
                        backgroundColor: "#E9E9E9",
                        startAngle: 1.5,
                        endAngle: 0,
                        gap: 2,
                        linearType: "custom"
                    }
                }
            },
            chartData: null,
            optdata: {
                color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
                padding: [15, 10, 0, 15],
                enableScroll: false,
                legend: {},
                xAxis: {
                    disableGrid: true
                },
                yAxis: {
                    disabled: true,
                    showTitle: true,
                    gridType: "dash",
                    dashLength: 2,
                    disableGrid: true
                },
                extra: {
                    area: {
                        type: "curve",
                        opacity: 0.2,
                        addLine: true,
                        width: 2,
                        gradient: true,
                        activeType: "hollow"
                    }
                }
            },
            profitData: null,
            navHeight: ""
        }
    },
    onShow() {
        this.getServerData();
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        navInit(e) {
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            this.navHeight = e.height + e.statusBarHeight;
        },
        getServerData() {
            let data = {
                series: [
                    {
                        name: this.$t('tradeInfo.winning_percentage'),
                        color: "#2fc25b",
                        data: 0.5
                    }
                ]
            };
            this.chartData = JSON.parse(JSON.stringify(data));
            let datas = {
                categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
                series: [
                    {
                        name: "",
                        data: [35, 8, 25, 37, 4, 20]
                    },
                ]
            };
            this.profitData = JSON.parse(JSON.stringify(datas));
        },
        backHome() {
            //切换为模拟合约操作

            uni.setTabBarItem({
                index: 3,
                pagePath: "/pages/contract/contract",
                text: "合约"
            });
            uni.setTabBarItem({
                index: 4,
                pagePath: "/pages/wallet/wallet"
            });
            uni.setTabBarItem({
                index: 1,
                visible: true,
            });
            uni.setTabBarItem({
                index: 2,
                visible: true
            });
            uni.setTabBarItem({
                index: 0,
                pagePath: "/pages/newindex/newindex",
                complete() {
                    // #ifdef H5
                    uni.switchTab({
                        url: "/pages/newindex/newindex",
                        complete() {
                            window.location.reload();
                        }
                    })

                    // #endif
                    // #ifdef APP-PLUS
                    uni.switchTab({
                        url: "/pages/newindex/newindex",
                    })
                    // #endif
                }
            });

        }
    }
}
</script>

<style lang="scss" scoped>
@import "simulation";
</style>
