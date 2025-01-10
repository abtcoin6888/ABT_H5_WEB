<template>
    <view class="withdraw" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     zIndex="9"
                     isOccupy
                     statusBar
                     :title="$t('with.t1')"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     @leftClick="$mroute.back()"
                     @rightClick="$mroute.withrecord()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
            <template v-slot:right>
                <fui-icon class="mr-10"
                          name="order-fill"
                          size="40"
                          color="var(--content-tertiary)">
                </fui-icon>
            </template>
        </fui-nav-bar>

        <view class="withdraw-body">
            <!--      提现币种      -->
            <view class="withdraw-body-cell">
                <text class="font-13 color-black font-weight">
                    {{ $t('with.t2') }}
                </text>
                <view class="withdraw-body-cell-box mt-10" @click="$refs.selectp.open()">
                    <template v-if="current===false">
                        <view class="flex align-center">
                            <image class="coin-icon" src="/static/coin/btc.png" mode="widthFix"></image>
                            <text class="font-12 color-black font-weight">BTC</text>
                        </view>
                    </template>
                    <template v-else>
                        <view class="flex align-center">
                            <image class="coin-icon" :src="current['icon']" mode="widthFix"></image>
                            <text class="font-12 color-black font-weight">{{ current['symbol'] }}</text>
                        </view>
                    </template>
                    <image class="down-icon" :src="`/static/img/tactic/down-${userTheme}.png`" mode="widthFix"></image>
                </view>
            </view>
            <!--      提现网络      -->
            <view class="withdraw-body-cell mt-15">
                <text class="font-13 color-black font-weight">
                    {{ $t('with.t3') }}
                </text>
                <view class="withdraw-body-cell-box mt-10" @click="$refs.chain.open()">
                    <view class="flex align-center">
                        <text class="font-12 color-gray" v-if="net===false">
                            {{ $t('with.t4') }}
                        </text>
                        <text class="font-12 color-black font-weight" v-else>
                            {{ netlist[net]['symbol'] }}
                        </text>
                    </view>
                    <image class="down-icon" :src="`/static/img/tactic/down-${userTheme}.png`" mode="widthFix"></image>
                </view>
            </view>
            <!--      提现地址      -->
            <view class="withdraw-body-cell mt-15">
                <text class="font-13 color-black font-weight">
                    {{ $t('with.t5') }}
                </text>
                <view class="withdraw-body-cell-box mt-10">
                    <input type="text"
                           v-model="token"
                           class="font-13 color-black font-weight"
                           :placeholder="$t('with.t25')"
                           placeholder-class="placeholder"/>
                    <!-- <view class="other-toggle">
                        <image :src="`/static/wallet/address_book-${userTheme}.png`" mode="widthFix" @click="$mroute.addressBook()"></image>
                        <view class="before-line"></view>
                        <image :src="`/static/wallet/scan_code-${userTheme}.png`" mode="widthFix"></image>
                    </view> -->
                </view>
            </view>
            <!--      提现数量      -->
            <view class="withdraw-body-cell mt-15">
                <view class="flex align-center justify-between">
                    <text class="font-13 color-black font-weight">
                        {{ $t('with.t6') }}
                    </text>
                    <view v-if="current !== false">
                        <text class="font-13 font-weight color-black">
                            {{ $t('with.t7') }}
                            {{ $util.thousandSeparator($util.str2number(current['balance'])) }}
                            {{ current['symbol'] }}
                        </text>
                    </view>
                </view>
                <view class="withdraw-body-cell-box mt-10">
                    <input type="number" v-model="amount"
                           :disabled="current === false || current['balance'] <=0 ? true:false"
                           class="font-13 font-weight color-black"
                           :placeholder="current===false || current['balance'] <=0 ? $t('with.t8'):''"
                           placeholder-class="placeholder">
                    <view @click="current['balance'] > 0 ? amount = $util.str2number($util.float(current['balance'])):amount=''">
                        <text class="font-13 font-weight color-primary">
                            {{ $t('with.t9') }}
                        </text>
                    </view>
                </view>
            </view>
            <!--      提币最小额、限额      -->
            <view class="withdraw-body-card mt-15">
                <view class="withdraw-body-card-cell">
                    <text class="font-12 color-gray">
                        {{ $t('with.t10') }}
                    </text>
                    <text class="font-12 color-black font-weight">
                        {{ current['with_min'] }}
                        {{ current['symbol'] }}
                    </text>
                </view>
                <view class="withdraw-body-card-cell">
                    <text class="font-12 color-gray">
                        {{ $t('with.t11') }}
                    </text>
                    <text class="font-12 color-black font-weight">
                        {{ current['with_max'] }} {{ current['symbol'] }}
                    </text>
                </view>
                <view class="withdraw-body-card-cell">
                    <text class="font-12 color-gray">
                        {{ $t('with.t12') }}
                    </text>
                    <text class="font-12 color-black font-weight">
                        {{ current['with_max'] }} {{ current['symbol'] }}
                    </text>
                </view>
            </view>
            <!--      提币提醒     -->
            <view class="withdraw-body-tips mt-15">
                <text class="font-13 color-black font-weight">
                    {{ $t('with.t13') }}
                </text>
                <text class="font-12 color-gray">
                    {{ $t('with.t14') }}
                </text>
                <text class="font-12 color-gray">
                    {{ $t('with.t15') }}
                </text>
            </view>
        </view>

        <view class="withdraw-footer">
            <view class="withdraw-footer-left">
                <view class="flex align-center">
                    <text class="font-13 color-gray mr-10">
                        {{ $t('with.t16') }}
                    </text>
                    <text class="font-13 color-black font-weight" v-if="amount == '' || amount < 0">
                        0.00 {{ current['symbol'] }}
                    </text>
                    <text class="font-13 color-black font-weight" v-else>
                        {{ $util.float(amount - current['with_charge']) }} {{ current['symbol'] }}
                    </text>
                </view>
                <view class="flex align-center mt-5">
                    <text class="font-13 color-gray mr-10">
                        {{ $t('with.t17') }}
                    </text>
                    <text class="font-13 color-black font-weight">
                        {{ $util.float($util.str2number(current['with_charge'])) }} {{ current['symbol'] }}
                        <!-- {{ current['symbol'] }} -->
                    </text>
                </view>
            </view>
            <button hover-class="none" class="withdraw-footer-button button-active" @click="withDraw()">
                <text class="font-13 color-white font-weight">
                    {{ $t('with.t18') }}
                </text>
            </button>
        </view>

        <uni-popup ref="selectp" :safe-area="false" type="bottom" style="height: 100%;width: 100%;">
            <view :style="{height:($device.windowHeight + 'px')}">
                <fui-nav-bar zIndex="2"
                             :statusBar="true"
                             background="var(--background-primary)"
                             color="var(--content-primary)"
                             :title="$t('financing.t85')"
                             @leftClick="$refs.selectp.close()">
                    <fui-icon name="arrowleft"
                              size="56"
                              color="var(--content-primary)">
                    </fui-icon>
                </fui-nav-bar>
                <coin-indexed-xlist name-key="symbol"
                                    nameKey="symbol"
                                    :dataList="coin"
                                    :showAvatar="true"
                                    @itemclick="itemclick">
                </coin-indexed-xlist>
            </view>
        </uni-popup>

        <uni-popup ref="chain" :safe-area="false" type="bottom">
            <view class="popup-wrap">
                <view class="popup-wrap-title">
                    <text class="font-16 color-black font-weight">
                        {{ $t('with.t20') }}
                    </text>
                    <view class="close-icon" @click="$refs.chain.close()">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popup-wrap-content">
                    <view class="popup-wrap-content-tip">
                        <text class="font-12 color-gray">
                            {{ $t('with.t21') }}
                        </text>
                    </view>
                    <view class="popup-wrap-content-list">
                        <template v-for="(item,index) in netlist">
                            <view @click="net=index;$refs.chain.close()"
                                  class="popup-wrap-content-list-item"
                                  :class="{'popup-wrap-content-list-item-active':net === index}">
                                <text class="font-13 font-weight color-black mr-10">
                                    {{ item.symbol }}
                                </text>
                                <text class="font-12 font-weight color-gray">
                                    {{ $t('with.t22') }}：{{
                                        $util.float($util.str2number(current['with_charge']))
                                    }}
									{{current['symbol']}}
                                </text>
                            </view>
                        </template>
                    </view>
                </view>
            </view>
        </uni-popup>
        <alert ref="alert" :title="$t('with.t23')" :content="content"></alert>
        <loading ref="loading"></loading>
        <authPop ref="authPop" :title="title" @callback="confirm"></authPop>
    </view>
</template>

<script>
import {NavBar, Icon, IndexBar, IndexAnchor, Cell, CellGroup} from 'vant';
import commonApi from '@/common/api/common';
import userApi from '@/common/api/user';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"

import {mapGetters} from 'vuex';

var init = 0;
export default {
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [IndexBar.name]: IndexBar,
        [IndexAnchor.name]: IndexAnchor,
        [Cell.name]: Cell,
        fuiNavBar
    },
    data() {
        return {
            coin: [],
            netlist: [],
            net: false,
            current: false,
            token: "",
            amount: "",
            content: "",
            title: "",
            type: ""
        }
    },
    onShow() {
        setTimeout(() => {
            if (init === 0) {
                init = 1;
                this.$refs.selectp.open();
            }
        }, 200);
    },
    onReady() {
        init = 0;
        this.getCurrency();
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        confirm(code) {
            this.$refs.authPop.close();
            this.$refs.loading.open();
            commonApi.postWithdraw({
                amount: this.amount,
                network: this.netlist[this.net]['id'],
                currency_id: this.current['id'],
                address: this.token,
                code: code,
                type: this.type
            }).then(res => {
                this.$refs.loading.close();
                if (res.code != 200) {
                    this.content = res.message;
                    this.$refs.alert.open();
                    return false;
                }
                this.current['balance'] = parseFloat(this.current['balance']) - this.amount;
                this.amount = '';
                this.content = this.$t('with.t26');
                this.$refs.alert.open();
            }).catch((e) => {
                this.$refs.loading.close();
            })
        },
        withDraw() {
            if (this.current === false || this.net === false) {
                return false;
            }
            if (this.token == '' || this.amount == '' || parseFloat(this.amount) <= 0) {
                this.content = this.$t('with.t27');
                this.$refs.alert.open();
                return false;
            }
            if (parseFloat(this.amount) <= parseFloat(this.current['recharge_min'])) {
                this.content = this.$t('with.t28') + this.current['recharge_min'] + this.current['symbol'];
                this.$refs.alert.open();
                return false;
            }
            if (parseFloat(this.amount) > parseFloat(this.current['balance'])) {
                return false;
            }
            this.$refs.loading.open();
            userApi.getUniCode().then(res => {
                this.$refs.loading.close();
                if (res.data.type != 0) {
                    this.type = res.data.type;
                    if (res.data.type === 'google') {
                        this.title = this.$t('secrety.google_ver')
                    }
                    if (res.data.type === 'email') {
                        this.title = this.$t('secrety.email_ver')
                    }
                    if (res.data.type === 'phone') {
                        this.title = this.$t('secrety.phone_ver')
                    }
                    this.$refs.authPop.open();
                } else {
                    this.content = this.$t('secrety.fail_send');
                    this.$refs.alert.open();
                }
            });

        },
        getCurrency() {
            commonApi.getAccountCurrency().then(res => {
				this.coin = res.data;
                if (this.coin.length > 0) {
					this.current = this.coin[0]; // 设置默认显示的币种为过滤后的第一个币种
					this.getNetList(this.coin[0]['id']); // 使用过滤后的第一个币种的id调用 getNetList 方法
				} else {
					console.log("No ETH or BTC currencies with positive balance.");
				}
            });
        },
        getNetList(currency_id) {
            commonApi.getNetList(currency_id).then(res => {
                this.netlist = res.data.list;
                this.net = 0;
            })
        },
        itemclick(e) {
            this.current = e;
            this.getNetList(e.id);
            this.$refs.selectp.close();
        },
        scan() {
            // #ifdef H5
            uni.showToast({
                title: this.$t('with.t29'),
                icon: "none",
                duration: 2000
            });
            // #endif
            // #ifdef APP-PLUS
            uni.scanCode({
                scanType: ['qrCode'],
                success(e) {
                    this.token = e.result;
                }
            })
            // #endif
        }
    }
}
</script>

<style lang="scss" scoped>
.withdraw {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    &-body {
        width: 100%;
        height: auto;
        padding: 30rpx;
        box-sizing: border-box;

        &-cell {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;

            &-box {
                width: 100%;
                height: 78rpx;
                border-radius: 8rpx;
                background: var(--background-secondary);
                padding: 0 20rpx;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .coin-icon {
                    width: 40rpx;
                    margin-right: 20rpx;
                }

                .down-icon {
                    width: 25rpx;
                }

                input {
                    width: calc(100% - 80rpx);
                    height: 78rpx;
                    font-size: 26rpx;
                    color: var(--content-primary);
                }

                .other-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    .before-line {
                        width: 2rpx;
                        height: 40rpx;
                        background: var(--border-strength-100);
                        margin: 0 16rpx;
                    }

                    image {
                        width: 45rpx;
                        height: 45rpx;
                    }
                }
            }
        }

        &-card {
            width: 100%;
            height: auto;
            padding: 30rpx;
            box-sizing: border-box;
            background: var(--background-secondary);
            border-radius: 8rpx;

            &-cell {
                width: 100%;
                height: auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 24rpx;

                &:last-of-type {
                    margin-bottom: 0;
                }
            }
        }

        &-tips {
            width: 100%;
            height: auto;
            padding-bottom: 200rpx;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;

            text {
                margin-bottom: 24rpx;
            }
        }
    }

    &-footer {
        width: 100%;
        height: auto;
        padding: 20rpx 30rpx;
        box-sizing: border-box;
        background: var(--background-primary);
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 9;

        &-left {
            display: flex;
            flex-direction: column;

            text {
                &:first-of-type {
                    min-width: 120rpx;
                }
            }
        }

        &-button {
            height: 78rpx;
            border-radius: 78rpx;
            background: var(--content-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }
    }

    .popup-wrap {
        width: 100%;
        height: auto;
        border-radius: 30rpx 30rpx 0 0;
        background: var(--background-primary);

        &-title {
            width: 100%;
            height: 88rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            .close-icon {
                position: absolute;
                right: 30rpx;
            }
        }

        &-content {
            width: 100%;
            height: auto;
            padding: 30rpx;
            box-sizing: border-box;

            &-tip {
                line-height: 38rpx;
            }

            &-list {
                width: 100%;
                height: auto;
                min-height: 200rpx;
                margin-top: 30rpx;

                &-item {
                    width: 100%;
                    height: 78rpx;
                    border-radius: 8rpx;
                    border: 2rpx solid transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20rpx;

                    &-active {
                        border-color: var(--content-primary);
                        background: var(--background-secondary);
                    }
                }
            }
        }
    }
}
</style>