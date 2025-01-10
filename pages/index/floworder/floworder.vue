<template>
    <view class="floworder" :data-theme="userTheme">
        <!--  标题栏  -->
        <fui-nav-bar zIndex="9"
                     isFixed
                     isOccupy
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('follow.page_title')"
                     @leftClick="$mroute.back()"
                     @rightClick="helpPopup = true"
                     @init="navInit">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
            <template v-slot:right>
                <fui-icon name="help-fill" class="mr-5" size="42" color="var(--content-tertiary)"></fui-icon>
            </template>
        </fui-nav-bar>
        <!--  导航菜单  -->
        <view class="tab-box">
            <fui-tabs zIndex="8"
                      :top="navHeight"
                      :current="current"
                      scroll
                      alignLeft
                      isSticky
                      size="30"
                      color="var(--content-tertiary)"
                      scale="1"
                      background="var(--background-primary)"
                      :short="false"
                      selectedColor="var(--content-primary)"
                      sliderBackground="var(--content-primary)"
                      height="88"
                      :tabs="tabOptions"
                      @change="onClickItem">
            </fui-tabs>
        </view>
        <!--  主体  -->
        <swiper :current="current" :duration="200" :style="{'height': scrollHeight + 'px'}" @change="swiperChange">
            <swiper-item>
                <scroll-view scroll-y class="scroll-view" :scroll-anchoring="scrollAnchoring" :scroll-top="scrollTop"
                             :style="{'height': scrollHeight + 'px'}" @scroll="scroll">
                    <view class="banner">
                        <view class="item" @click="$mroute.tradeMine()">
                            <text class="font-14 font-weight always-white">{{ $t('follow.my_follow') }}</text>
                            <text class="font-12 color-gray mt-5">{{ $t('follow.check_follow') }}</text>
                            <image src="/static/img/Swa.webp" mode="widthFix"></image>
                        </view>
                        <view class="item" @click="$mroute.flowApply()">
                            <text class="font-14 font-weight color-black">{{ $t('follow.become_expert') }}</text>
                            <text class="font-12 color-gray mt-5">{{ $t('follow.start_order') }}</text>
                        </view>
                    </view>
                    <!--    -->
                    <view class="expert">
                        <view class="expert-title">
                            <view class="item">
                                <text class="font-16 color-black font-weight">{{ $t('follow.trad_expert') }}</text>
                                <fui-icon name="info-fill" size="30" color="#84898f"
                                          @click="expertTip = true"></fui-icon>
                            </view>
                            <view class="item" @click="rankPopup = true">
                                <text class="font-13 color-gray">{{ orderUnitValue }}</text>
                                <fui-icon name="turningdown" size="34" color="#84898f"></fui-icon>
                            </view>
                        </view>
                        <!--  搜索  -->
                        <view class="search-box">
                            <fui-icon name="search" size="34" color="#84898f"></fui-icon>
                            <text class="font-13 color-light">{{ $t('follow.search_t') }}</text>
                        </view>
                        <!--  交易员  -->
                        <view class="expert-main">
                            <view class="expert-card" v-for="i in 5" :key="i" @click="$mroute.traderinfo(i)">
                                <view class="c-top">
                                    <view class="avatar">
                                        <fui-avatar width="100" height="100" src="/static/img/avatar.png"></fui-avatar>
                                    </view>
                                    <view class="info">
                                        <view class="info-cell">
                                            <text
                                                class="font-14 color-black font-weight mr-5">
                                                {{ $t('follow.system_trader') }}
                                            </text>
                                        </view>
                                        <view class="info-cell">
                                            <text class="font-11 color-light">@BGUSER-FDYUHJ9</text>
                                        </view>
                                        <view class="info-cell">
                                            <image src="/static/img/qz.png" mode=""></image>
                                            <text
                                                class="font-11 color-gray font-weight">{{
                                                    $t('follow.cur_follow')
                                                }}741/500
                                            </text>
                                        </view>
                                    </view>
                                    <view class="btn-box">
                                        <view class="button" @click.stop="$mroute.tradeConfirm(i)">
                                            <text class="font-12 color-white font-weight">跟单</text>
                                        </view>
                                    </view>
                                </view>
                                <view class="c-center">
                                    <view class="c-left">
                                        <text class="font-12 color-gray">{{ $t('follow.rate_return') }}</text>
                                        <text class="font-18 font-bold price_up rate">+254.69%</text>
                                        <view class="_v">
                                            <text class="font-12 color-gray">{{ $t('follow.total_revenue') }}</text>
                                            <text class="font-12 color-black font-weight">$24,352.13</text>
                                        </view>
                                    </view>
                                    <view class="c-right">
                                        <view class="chart-box">
                                            <qiun-data-charts type="tarea" :opts="opts"
                                                              :chartData="groupData['incomeRate']"/>
                                        </view>
                                    </view>
                                </view>
                                <view class="c-bottom">
                                    <view class="c_cell">
                                        <view class="item">
                                            <text class="font-12 color-gray mr-5">跟单者收益</text>
                                            <text class="font-12 color-gray font-weight">$1,246,243.34</text>
                                        </view>
                                        <view class="item">
                                            <text class="font-12 color-gray mr-5">AUM</text>
                                            <text class="font-12 color-gray font-weight">$1,246,243.34</text>
                                        </view>
                                    </view>
                                    <view class="c_cell">
                                        <view class="item">
                                            <image src="/static/img/coinicon.webp" mode=""></image>
                                        </view>
                                        <view class="item">
                                            <fui-tag marginRight="10" :padding="['6rpx','14rpx']" size="22"
                                                     :text="$t('follow.high_frequency')" type="warning"
                                                     theme="light"></fui-tag>
                                            <fui-tag marginRight="10" :padding="['6rpx','14rpx']" size="22"
                                                     :text="$t('follow.keen_on')+' BTC'" type="warning"
                                                     theme="light"></fui-tag>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item>
                <scroll-view scroll-y class="scroll-view" :scroll-anchoring="scrollAnchoring" :scroll-top="scrollTop"
                             :style="{'height': scrollHeight + 'px'}" @scroll="scroll">
                    <view class="banner">
                        <view class="item" @click="$mroute.tradeMine()">
                            <text class="font-14 font-weight always-white">{{ $t('follow.my_follow') }}</text>
                            <text class="font-12 color-gray mt-5">{{ $t('follow.check_follow') }}</text>
                            <image src="/static/img/Swa.webp" mode="widthFix"></image>
                        </view>
                        <view class="item" @click="$mroute.flowApply()">
                            <text class="font-14 font-weight color-black">{{ $t('follow.become_expert') }}</text>
                            <text class="font-12 color-gray mt-5">{{ $t('follow.start_order') }}</text>
                        </view>
                    </view>
                    <!--    -->
                    <view class="expert">
                        <view class="expert-title">
                            <view class="item">
                                <text class="font-16 color-black font-weight">{{ $t('follow.trad_expert') }}</text>
                                <fui-icon name="info-fill" size="30" color="#84898f"
                                          @click="expertTip = true"></fui-icon>
                            </view>
                            <view class="item" @click="rankPopup = true">
                                <text class="font-13 color-gray">{{ orderUnitValue }}</text>
                                <fui-icon name="turningdown" size="34" color="#84898f"></fui-icon>
                            </view>
                        </view>
                        <!--  搜索  -->
                        <view class="search-box">
                            <fui-icon name="search" size="34" color="#84898f"></fui-icon>
                            <text class="font-13 color-light">{{ $t('follow.search_t') }}</text>
                        </view>
                        <!--  交易员  -->
                        <view class="expert-main">
                            <view class="expert-card" v-for="i in 5" :key="i" @click="$mroute.traderinfo(i)">
                                <view class="c-top">
                                    <view class="avatar">
                                        <fui-avatar width="100" height="100" src="/static/img/avatar.png"></fui-avatar>
                                    </view>
                                    <view class="info">
                                        <view class="info-cell">
                                            <text
                                                class="font-14 color-black font-weight mr-5">
                                                {{ $t('follow.system_trader') }}
                                            </text>
                                        </view>
                                        <view class="info-cell">
                                            <text class="font-11 color-light">@BGUSER-FDYUHJ9</text>
                                        </view>
                                        <view class="info-cell">
                                            <image src="/static/img/qz.png" mode=""></image>
                                            <text
                                                class="font-11 color-gray font-weight">{{
                                                    $t('follow.cur_follow')
                                                }}741/500
                                            </text>
                                        </view>
                                    </view>
                                    <view class="btn-box">
                                        <view class="button">
                                            <text class="font-12 color-white font-weight">跟单</text>
                                        </view>
                                    </view>
                                </view>
                                <view class="c-center">
                                    <view class="c-left">
                                        <text class="font-12 color-gray">{{ $t('follow.rate_return') }}</text>
                                        <text class="font-18 font-bold price_up rate">+254.69%</text>
                                        <view class="_v">
                                            <text class="font-12 color-gray">{{ $t('follow.total_revenue') }}</text>
                                            <text class="font-12 color-black font-weight">$24,352.13</text>
                                        </view>
                                    </view>
                                    <view class="c-right">
                                        <view class="chart-box">
                                            <qiun-data-charts type="tarea" :opts="opts"
                                                              :chartData="groupData['incomeRate']"/>
                                        </view>
                                    </view>
                                </view>
                                <view class="c-bottom">
                                    <view class="c_cell">
                                        <view class="item">
                                            <text class="font-12 color-gray mr-5">跟单者收益</text>
                                            <text class="font-12 color-gray font-weight">$1,246,243.34</text>
                                        </view>
                                        <view class="item">
                                            <text class="font-12 color-gray mr-5">AUM</text>
                                            <text class="font-12 color-gray font-weight">$1,246,243.34</text>
                                        </view>
                                    </view>
                                    <view class="c_cell">
                                        <view class="item">
                                            <image src="/static/img/coinicon.webp" mode=""></image>
                                        </view>
                                        <view class="item">
                                            <fui-tag marginRight="10" :padding="['6rpx','14rpx']" size="22"
                                                     :text="$t('follow.high_frequency')" type="warning"
                                                     theme="light"></fui-tag>
                                            <fui-tag marginRight="10" :padding="['6rpx','14rpx']" size="22"
                                                     :text="$t('follow.keen_on')+' BTC'" type="warning"
                                                     theme="light"></fui-tag>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>
        <view class="backtop">
            <fui-backtop custom :scrollTop="old.scrollTop" @click="backTops">
                <fui-icon name="up" :size="52"></fui-icon>
            </fui-backtop>
        </view>
        <!-- 交易专家说明弹窗 -->
        <fui-dialog :show="expertTip"
                    :title="$t('follow.kind_tips')"
                    :content="infotext"
                    maskClosable
                    background="var(--background-primary)"
                    color="var(--content-primary)"
                    contentColor="var(--content-tertiary)"
                    :buttons="buttons"
                    @click="expertTip=false">
        </fui-dialog>
        <!--综合排名弹窗-->
        <fui-bottom-popup background="var(--background-primary)" :show="rankPopup" @close="closePopup">
            <view class="popup-wrap">
                <view class="popup-cell" :class="sortIndex == index ? 'active' : ''" v-for="(item,index) in sortType"
                      :key="index" @click="selectType(item,index)">
                    <text class="font-14 color-black font-weight">{{ item }}</text>
                </view>
                <view class="popup-cell" @click="closePopup">
                    <text class="font-14 color-black font-weight">{{ $t('login.cancel') }}</text>
                </view>
            </view>
        </fui-bottom-popup>
        <fui-bottom-popup background="var(--background-primary)"
                          :show="helpPopup"
                          @close="closePopup">
            <view class="popup-wrap">
                <view class="popup-title">
                    <text class="font-16 color-black font-weight">跟单帮助</text>
                    <view class="close-icon" @click="closePopup">
                        <fui-icon name="close" size="48" :color="'var(--content-primary)'"></fui-icon>
                    </view>
                </view>
                <view class="popup-contxt">
                    <text class="font-13 color-black font-weight">{{ $t('follow.help_t') }}</text>
                    <text class="font-12 color-gray pl-15">{{ $t('follow.help_c') }}</text>
                    <text class="font-12 color-gray pl-15">{{ $t('follow.help_c1') }}</text>
                    <text class="font-12 color-gray pl-15">{{ $t('follow.help_c2') }}</text>
                    <text class="font-12 color-gray pl-15">{{ $t('follow.help_c3') }}</text>
                    <text class="font-13 color-black font-weight">{{ $t('follow.help_c4') }}</text>
                    <text class="font-12 color-gray pl-15">{{ $t('follow.help_c5') }}</text>
                    <text class="font-12 color-gray pl-15">{{ $t('follow.help_c6') }}</text>
                    <text class="font-12 color-gray pl-15">{{ $t('follow.help_c7') }}</text>
                    <text class="font-12 color-gray pl-15">{{ $t('follow.help_c8') }}</text>
                    <text class="font-12 color-gray pl-15">{{ $t('follow.help_c9') }}</text>
                </view>
            </view>
        </fui-bottom-popup>
    </view>
</template>

<script>
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
import fuiTabs from "@/components/firstui/fui-tabs/fui-tabs.vue"
import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue"
import fuiAvatar from "@/components/firstui/fui-avatar/fui-avatar.vue"
import fuiBottomPopup from "@/components/firstui/fui-bottom-popup/fui-bottom-popup.vue"
import fuiDialog from "@/components/firstui/fui-dialog/fui-dialog.vue"
import fuiBacktop from "@/components/firstui/fui-backtop/fui-backtop.vue"

import {mapGetters} from 'vuex';

export default {
    components: {
        fuiNavBar,
        fuiTabs,
        fuiTag,
        fuiBottomPopup,
        fuiDialog,
        fuiAvatar,
        fuiBacktop
    },
    data() {
        return {
            windowHeight: uni.getSystemInfoSync().windowHeight,
            navHeight: "",
            scrollHeight: "",
            current: 0,
            tabOptions: [this.$t('follow.contract'), this.$t('follow.spot_goods')],
            activeColor: '#000',
            infotext: this.$t('follow.info_text'),
            scrollTop: 0,
            old: {
                scrollTop: 0
            },
            scrollAnchoring: true,
            sortType: [
                this.$t('follow.total_rank'),
                this.$t('follow.rate_return'),
                this.$t('follow.total_revenue'),
                this.$t('follow.weeks_earn'),
                this.$t('follow.copy_num'),
                this.$t('follow.current_order')
            ],
            sortIndex: 0,
            orderUnitValue: this.$t('follow.total_rank'),
            rankPopup: false,
            helpPopup: false,
            expertTip: false,
            buttons: [{
                text: this.$t('follow.see_t'),
                color: 'var(--content-primary)'
            }],
            opts: {
                color: ['#0072f5', '#0072f5'],
                padding: [15, 0, 15, 0],
                animation: true,
                dataLabel: false,
                enableScroll: false,
                legend: {},
                xAxis: {
                    disabled: true,
                    disableGrid: true,
                    axisLine: false,
                    title: "",
                    titleFontSize: 0,
                    boundaryGap: 'center'
                },
                yAxis: {
                    disabled: true,
                    disableGrid: true,
                    axisLine: false,
                    data: [{
                        type: "value",
                        position: "left",
                        axisLine: false,
                        calibration: false,
                        fontSize: 0
                    }]
                },
                extra: {
                    tooltip: {
                        showBox: false,
                        splitLine: false,
                    },
                    area: {
                        type: "step",
                        opacity: 0.5,
                        addLine: true,
                        width: 2,
                        gradient: true,
                        activeType: "none"
                    }
                }
            },
            groupData: {
                'incomeRate': {
                    categories: [10, 20, 50, 30, 70, 90, 60, 20, 10, 5, 7],
                    series: [{
                        data: [10, 20, 50, 30, 70, 90, 60, 20, 10, 5, 7],
                        legendText: false,
                        legendShape: "none",
                        pointShape: "none",
                        name: ''
                    }]
                }
            },
        }
    },
    onReady() {
        this.getWindowHeight();
    },
    onShow() {
        // showLoadingToast({
        //   message: '加载中...',
        //   forbidClick: true,
        // });
        this.getWindowHeight();
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        onClickItem(e) {
            this.current = e.index;
        },
        swiperChange(e) {
            this.current = e.detail.current;
        },
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
            this.scrollHeight = this.windowHeight - this.navHeight - 44;
        },
        getWindowHeight() {
            this.windowHeight = uni.getSystemInfoSync().windowHeight;
        },
        selectType(item, index) {
            this.sortIndex = index;
            this.orderUnitValue = item;
            this.closePopup();
        },
        scroll(e) {
            this.old.scrollTop = e.detail.scrollTop;
            this.scrollAnchoring = true;
        },
        backTops() {
            this.scrollTop = this.old.scrollTop;
            this.$nextTick(function () {
                this.scrollTop = 0
            });
        },
        closePopup() {
            this.rankPopup = false;
            this.helpPopup = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "floworder.scss";
</style>

<style scoped>
/deep/ .fui-dialog__inner {
    width: 600rpx;
}

/deep/ .fui-dialog__title {
    padding: 30rpx 0 10rpx 0;
    font-size: 32rpx !important;
}

/deep/ .fui-dialog__body {
    margin-bottom: 0;
    padding: 40rpx;
}

/deep/ .fui-dialog__body .fui-dialog__descr {
    font-size: 26rpx !important;
    color: var(--dark-gray) !important;
}

/deep/ .fui-dialog__footer,
/deep/ .fui-dialog__btn {
    font-size: 28rpx;
    height: 88rpx;
    line-height: 88rpx;
    color: var(--blue) !important;
}

/deep/ .fui-dialog__btn:active {
    background: var(--white);
}
</style>