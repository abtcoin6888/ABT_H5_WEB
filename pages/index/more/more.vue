<template>
    <view class="more" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="this.$t('more.serve')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="container">
            <view class="container-list">
                <!--     常用   -->
                <view class="list-box">
                    <view class="_title">
                        <text class="font-14 font-weight color-black">{{ $t('more.commonly_used') }}</text>
                    </view>
                    <view class="menu-box">
                        <!--     邀请好友   -->
                        <view class="menu-item" @click="$mroute.invaite()">
                            <view class="image-box" type="invite">
                                <image :src="`/static/newImage/invite-${ userTheme === 'light' ? 'black': 'white'}.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('邀请好友') }}</text>
                        </view>
                        <!--     跟单交易   -->
                        <view class="menu-item" @click="$mroute.floworder()" v-if="false">
                            <view class="image-box">
                                <image :src="`/static/newImage/copy-trading-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.copy_trade') }}</text>
                        </view>
                        <!--     提现   -->
                        <view class="menu-item" @click="$mroute.withdraw()">
                            <view class="image-box">
                                <image :src="`/static/newImage/payouts-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.withdraw') }}</text>
                        </view>
                        <!--     充值   -->
                        <view class="menu-item" @click="$mroute.recharge()">
                            <view class="image-box">
                                <image :src="`/static/newImage/recharge-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.recharge') }}</text>
                        </view>
                        <!--     闪兑   -->
                       <!-- <view class="menu-item" @click="$mroute.toInstantExchange()">
                            <view class="image-box">
                                <image :src="`/static/newImage/recharge-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.i_e') }}</text>
                        </view> -->
                        <!--     Jumpstart   -->
                        <!-- <view class="menu-item" @click="$mroute.toJumpstart()">
                            <view class="image-box">
                                <image :src="`/static/newImage/recharge-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">Jumpstart</text>
                        </view> -->
                        <!--        -->
                        <!--            <view class="menu-item" @click="$mroute.switchContract()">-->
                        <!--              <view class="image-box">-->
                        <!--                <image src="/static/img/hyjy.png" style="width:30px;height: 30px;" mode=""></image>-->
                        <!--              </view>-->
                        <!--              <text class="font-10 font-weight color-black">合约交易</text>-->
                        <!--            </view>-->
                    </view>
                </view>
                <view class="line-view"></view>
                <!--     基础   -->
                <view class="list-box">
                    <view class="_title">
                        <text class="font-14 font-weight color-black">{{ $t('more.basic_fun') }}</text>
                    </view>
                    <view class="menu-box">
                        <!--     提现   -->
                        <view class="menu-item" @click="$mroute.withdraw()">
                            <view class="image-box">
                                <image :src="`/static/newImage/payouts-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.withdraw') }}</text>
                        </view>
                        <!--     充值   -->
                        <view class="menu-item" @click="$mroute.recharge()">
                            <view class="image-box">
                                <image :src="`/static/newImage/recharge-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.recharge') }}</text>
                        </view>
                        <!--     邀请好友   -->
                        <view class="menu-item" @click="$mroute.invaite()">
                            <view class="image-box" type="invite">
                                <image :src="`/static/newImage/invite-${ userTheme === 'light' ? 'black': 'white'}.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('index.menu_invite') }}</text>
                        </view>
                        <!--     帮助中心   -->
                        <view class="menu-item" @click="$mroute.notice()">
                            <view class="image-box">
                                <image :src="`/static/newImage/help-center-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('index.sw_t') }}</text>
                        </view>
                    </view>
                </view>
                <!--     交易   -->
                <view class="list-box">
                    <view class="_title">
                        <text class="font-14 font-weight color-black">{{ $t('more.trade') }}</text>
                    </view>
                    <view class="menu-box">
                        <!--     现货交易   -->
                        <view class="menu-item" @click="$mroute.switchTrade()">
                            <view class="image-box">
                                <image :src="`/static/newImage/spot-trading-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.spot_trade') }}</text>
                        </view>
                        <!--     合约交易   -->
                        <view class="menu-item" @click="$mroute.switchContract()">
                            <view class="image-box">
                                <image :src="`/static/newImage/futures-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.contract_trade') }}</text>
                        </view>
						<!--     闪期权   -->
						<view class="menu-item" @click="$mroute.futures()">
						    <view class="image-box">
						        <image :src="`/static/newImage/sqq-${userTheme}.png`" mode=""></image>
						    </view>
						    <text class="font-12 color-black">{{ $t('futures.tt2') }}</text>
						</view>
                        <!--     跟单交易   -->
                        <view class="menu-item" @click="$mroute.floworder()" v-if="false">
                            <view class="image-box">
                                <image :src="`/static/newImage/copy-trading-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.copy_trade') }}</text>
                        </view>
                        <!--     快捷买币   -->
                        <!-- <view class="menu-item" @click="$mroute.toQuickly()">
                            <view class="image-box">
                                <image :src="`/static/newImage/quick-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('quickly.tt101') }}</text>
                        </view> -->
                        <!--     快捷买币   -->
                        <!-- <view class="menu-item" @click="$mroute.toQuicklyMoon(moonKey)">
                            <view class="image-box">
                                <image :src="`/static/newImage/quick-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('quickly.tt101') }}</text>
                        </view> -->
                    </view>
                </view>
                <!--     衍生品   -->
                <view class="list-box">
                    <view class="_title">
                        <text class="font-14 font-weight color-black">{{ $t('more.rich_paradise') }}</text>
                    </view>
                    <view class="menu-box">
                        <!--     1元购   -->
                        <view v-if="false" class="menu-item" @click="$mroute.uflestaPage()">
                            <view class="image-box">
                                <image src="/static/img/icon_1yg.png" mode=""></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.one_yuan') }}</text>
                        </view>
                        <!--     闪期权   -->
                        <!-- <view class="menu-item" @click="$mroute.futures()">
                            <view class="image-box">
                                <image :src="`/static/newImage/sqq-${userTheme}.png`" mode=""></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('futures.tt2') }}</text>
                        </view> -->
                        <!--     暴富盲盒   -->
                        <view class="menu-item" @click="$mroute.blindbox()">
                            <view class="image-box">
                                <image :src="`/static/newImage/blindbox-${ userTheme === 'light' ? 'black' : 'white' }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.rich_blind_box') }}</text>
                        </view>
                        <!-- 福利中心 -->
                        <view class="menu-item" @click="$mroute.welfare()">
                            <view class="image-box">
                                <image :src="`/static/newImage/welfare-${ userTheme }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.welfare') }}</text>
                        </view>
                    </view>
                </view>
                <!--     理财   -->
                <view class="list-box">
                    <view class="_title">
                        <text class="font-14 font-weight color-black">{{ $t('more.asset_man') }}</text>
                    </view>
                    <view class="menu-box">
                        <!--     暴富理财   -->
                        <view class="menu-item" @click="$mroute.indexFinance()">
                            <view class="image-box">
                                <image :src="`/static/newImage/bflc-${userTheme}.png`" mode=""></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.rich_man') }}</text>
                        </view>
                        <!--     质押生息   -->
                        <view class="menu-item" @click="$mroute.livePage()">
                            <view class="image-box">
                                <image :src="`/static/newImage/impawn-${ userTheme === 'light' ? 'black' : 'white' }.png`" mode="widthFix"></image>
                            </view>
                            <text class="font-12 color-black">{{ $t('more.deposit') }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
import config from '@/common/api/config.js';
import common from '/common/api/common.js';

export default {
    components: {
        fuiNavBar
    },
    data() {
        return {
            lang: false,
            config: config,
            moonKey:""
        }
    },
    onShow() {
        this.lang = uni.getStorageSync('lang');
        this.getConfig()
    },
    methods: {
        getConfig(){
            common.config(1).then((res) => {
                this.moonKey = res.data.moonKey;
            });
        },
        setMoni() {
            //切换为模拟合约操作
            uni.setTabBarItem({
                index: 1,
                visible: false
            });
            uni.setTabBarItem({
                index: 2,
                visible: false
            });
            uni.setTabBarItem({
                index: 0,
                pagePath: "pages/index/simulation/simulation"
            });
            uni.setTabBarItem({
                index: 3,
                pagePath: "pages/index/simulation/contruct/contruct",
                text: "交易"
            });
            uni.setTabBarItem({
                index: 4,
                pagePath: "pages/index/simulation/wallet/wallet"
            });
            uni.switchTab({
                url: "/pages/index/simulation/simulation"
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.more {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    .container {
        .container-list {
            padding-bottom: 60rpx;
            box-sizing: border-box;

            .list-box {
                width: 100%;
                display: flex;
                flex-direction: column;
                padding: 30rpx;
                box-sizing: border-box;

                ._title {
                    width: 100%;
                }

                .menu-box {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    flex-wrap: wrap;

                    .menu-item {
                        width: calc(100% / 4);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-top: 30rpx;

                        .image-box {
                            width: 80rpx;
                            height: 80rpx;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-bottom: 16rpx;
                            border: 1rpx solid var(--border-strength-100);

                            image {
                                width: 45rpx;
                                height: 45rpx;
                            }

                            &[type='invite'] {
                                image {
                                    width: 45rpx;
                                    height: 45rpx;
                                }
                            }
                        }

                        text {
                            text-align: center;
                            text-transform: capitalize;
                        }
                    }
                }
            }
        }
    }
}
</style>