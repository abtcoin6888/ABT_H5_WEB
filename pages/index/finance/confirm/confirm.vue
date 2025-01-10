<template>
    <view class="confirmPage" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     statusBar
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="item.name"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="container">
            <!--   期限   -->
            <view class="container-cell flex align-center justify-between">
                <text class="font-13 color-gray">{{ $t('financing.t8') }}</text>
                <text class="font-13 color-black font-weight">
                    {{ item.time_limit }}{{ $t('financing.t10') }}
                </text>
            </view>
            <!--   申购数量   -->
            <view class="container-cell flex flex-column">
                <text class="font-13 color-gray">{{ $t('financing.t4') }}</text>
                <view class="container-cell-input">
                    <input type="number"
                           v-model="amount"
                           :placeholder="$t(('financing.t40'))"
                           class="font-13 color-black">
                    <view class="flex align-center input_right">
                        <text class="font-12 color-black">
                            {{ item.buy_currency.symbol }}
                        </text>
                        <text class="line"></text>
                        <view @click="amount = $util.str2number(item.show_user_balance)">
                            <text class="font-12 font-weight color-primary">
                                {{ $t('financing.t36') }}
                            </text>
                        </view>
                    </view>
                </view>
            </view>
            <!--   可用余额  -->
            <view class="container-cell flex align-center justify-between">
                <text class="font-13 color-gray">{{ $t('financing.t37') }}</text>
                <view class="flex align-center">
                    <text class="font-13 font-weight color-black">
                        {{ item.show_user_balance }}
                        {{ item.buy_currency.symbol }}
                    </text>
                    <view @click="$mroute.exchange()" v-if="item.show_user_balance <= 0">
                        <text class="font-13 font-weight color-primary pl-10">{{ $t('bbox.t10') }}</text>
                    </view>
                </view>
            </view>
            <!--   本次可购   -->
            <view class="container-cell flex align-center justify-between">
                <view class="flex align-center">
                    <text class="font-13 color-gray mr-5">{{ $t('financing.t38') }}</text>
                    <fui-icon @click="$refs.notice.open()" name="help-fill" size="34"
                              color="var(--content-tertiary)"></fui-icon>
                </view>
                <text class="font-13 font-weight color-black">{{ item.show_user_remaining }}
                    {{ item.buy_currency.symbol }}
                </text>
            </view>
            <!--   产品可购额度   -->
            <view class="container-cell flex align-center justify-between">
                <text class="font-13 color-gray">{{ $t('financing.t39') }}</text>
                <text class="font-13 font-weight color-black">{{ item.remaining }}
                    {{ item.buy_currency.symbol }}
                </text>
            </view>
            <!--   收益率   -->
            <view class="container-card">
                <view class="container-card-box">
                    <uni-steps :options="list2" active-color="var(--blue)" :active="active" direction="column"/>
                    <view class="container-card-box-cell">
                        <text class="font-13 color-gray">{{ $t('financing.t7') }}</text>
                        <text class="font-13 font-weight color-black">{{ item.eay }}%</text>
                    </view>
                    <view class="container-card-box-cell">
                        <text class="font-13 color-gray">{{ $t('financing.t41') }}</text>
                        <text class="font-13 font-weight color-black">{{ pre_income }}</text>
                    </view>
                </view>
            </view>
            <view class="footer">
                <view class="footer-top">
                    <view class="check-box" @click="checked = !checked">
                        <image src="/static/img/tactic/check-s.png"
                               mode="widthFix"
                               v-if="checked">
                        </image>
                    </view>
                    <view class="footer-top-right">
                        <text class="font-13 color-gray" @click="checked = !checked">
                            {{ $t('financing.t42') }}
                            <text class="font-13 font-weight color-primary"
                                  @click.stop="$mroute.webview(1,'bflc')">
                                《{{ $t('financing.t43') }}》
                            </text>
                        </text>
                    </view>
                </view>
                <button class="footer-button button-active"
                        hover-class="none"
                        :class="checked ? 'bg-black' : 'bg-gray'"
                        @click="apply">
                    <text class="font-13 font-weight"
                          :class="checked ? 'color-white' : 'color-gray'">
                        {{ $t('hand.confirm_t') }}
                    </text>
                </button>
            </view>
            <!--   本次可购弹窗     -->
            <uni-popup ref="notice" type="bottom">
                <view class="popup-wrap">
                    <view class="popup-wrap-title">
                        <text class="font-16 color-black font-weight">
                            {{ $t('financing.t44') }}
                        </text>
                        <view class="close-icon" @click="$refs.notice.close()">
                            <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                        </view>
                    </view>
                    <view class="popup-wrap-content">
                        <text class="font-13 color-gray">
                            {{ $t('financing.t45') }}
                        </text>
                    </view>
                </view>
            </uni-popup>
        </view>
    </view>
</template>

<script>
import financing from '../../../../common/api/financing.js'
import util from '../../../../common/util.js'

import {mapGetters} from 'vuex';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";

export default {
    components: {
        fuiNavBar
    },
    data() {
        return {
            active: 0,
            amount: '',
            list2: [],
            checked: false,
            item: {
                name: '',
                buy_currency: {},
                pay_currency: {},
            },
            pre_income: '--'
        }
    },
    watch: {
        amount: function (val) {
            this.pre_income = this.$util.thousandSeparator(this.amount * this.item.eay / 100)
        },
    },
    onLoad(option) {
        this.id = option.id
    },
    mounted() {
        this.getDetail()
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    onReady() {
        this.list2.push({
            title: this.$t('financing.t46'),
            desc: '-'
        });
        this.list2.push({
            title: this.$t('financing.t47'),
            desc: '-'
        });
        this.list2.push({
            title: this.$t('financing.t48'),
            desc: '-'
        });
    },
    onShow() {

    },
    methods: {
        scroll(e) {
            this.scrollTop = e.detail.scrollTop
        },
        async getDetail() {
            let res = await financing.detail({
                id: this.id
            })
            this.list2[0]['desc'] = util.getDateStr()
            this.list2[1]['desc'] = util.getDateAddDay(this.list2[0]['desc'], 1)
            this.list2[2]['desc'] = util.getDateAddDay(this.list2[0]['desc'], res.data.time_limit)
            res.data.remaining = util.thousandSeparator(res.data.remaining)
            res.data.show_user_remaining = util.thousandSeparator(res.data.user_remaining)
            res.data.show_user_balance = util.thousandSeparator(res.data.user_balance, 2)
            res.data.user_balance = parseFloat(res.data.user_balance)
            res.data.user_remaining = parseFloat(res.data.user_remaining)
            this.item = res.data
        },
        auto(e) {
            if (e.detail.value) {
                this.$refs.autobut.open();
            }
        },
        maxBuy() {
            this.amount = this.item.user_remaining
        },
        async apply() {
            if (!this.checked) {
                return
            }
            if (this.amount < parseFloat(this.item.min_buy)) {
                uni.showToast({
                    icon: 'none',
                    title: this.$t('financing.t26') + ' ' + this.item.min_buy + ' ' + this.item.buy_currency.symbol
                })
                return
            }
            if (this.amount > parseFloat(this.item.user_remaining)) {
                if (parseFloat(this.item.user_remaining) == 0) {
                    uni.showToast({
                        icon: 'none',
                        title: this.$t('financing.t27')
                    })
                    return
                }
                uni.showToast({
                    icon: 'none',
                    title: this.$t('financing.t27') + this.item.user_remaining + ' ' + this.item.buy_currency.symbol
                })
                return
            }
            let res = await financing.apply({
                financing_product_id: this.id,
                amount: this.amount,
            })
            if (res.code == 200) {
                uni.redirectTo({
                    url: "/pages/index/finance/confirm/result?symbol=" +
                        this.item.buy_currency.symbol +
                        '&amount=' + this.amount +
                        '&start_at=' + this.list2[1]['desc'] +
                        '&end_at=' + this.list2[2]['desc'],
                });
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.confirmPage {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    .container {
        width: 100%;
        height: auto;
        padding: 30rpx 0;
        box-sizing: border-box;

        &-cell {
            width: 100%;
            height: auto;
            padding: 0 30rpx;
            box-sizing: border-box;
            margin-bottom: 24rpx;

            &-input {
                margin-top: 16rpx;
                width: 100%;
                height: 78rpx;
                border-radius: 8rpx;
                background: var(--background-secondary);
                padding: 0 20rpx;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 2rpx solid transparent;

                &:focus-within {
                    border-color: var(--color-primary);
                }

                input {
                    width: calc(100% - 200rpx);
                    height: 78rpx;
                }

                .input_right {
                    .line {
                        display: inline-block;
                        width: 2rpx;
                        height: 30rpx;
                        background: rgba(0, 0, 0, .2);
                        margin: 0 16rpx;
                    }
                }
            }
        }

        &-card {
            width: 100%;
            height: auto;
            padding: 30rpx;
            box-sizing: border-box;

            &-box {
                width: 100%;
                height: auto;
                padding: 30rpx;
                box-sizing: border-box;
                border-radius: 8rpx;
                background: var(--background-secondary);

                &-cell {
                    width: 100%;
                    height: auto;
                    margin-top: 24rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }

        .footer {
            width: 100%;
            height: auto;
            padding: 20rpx 30rpx;
            box-sizing: border-box;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 9;
            background: var(--background-primary);
            display: flex;
            flex-direction: column;

            &-top {
                width: 100%;
                height: auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 24rpx;

                .check-box {
                    width: 30rpx;
                    height: 30rpx;
                    border-radius: 4rpx;
                    background: var(--background-secondary);
                    display: flex;
                    align-items: center;
                    margin-right: 10rpx;
                    position: relative;

                    image {
                        width: 30rpx;
                        border-radius: 4rpx;
                        position: absolute;
                    }
                }

                &-right {
                    width: calc(100% - 55rpx);
                }
            }

            &-button {
                width: 100%;
                height: 78rpx;
                border-radius: 78rpx;
                display: flex;
                align-items: center;
                justify-content: center;
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
                min-height: 300rpx;
                padding: 30rpx;
                box-sizing: border-box;

                text {
                    line-height: 38rpx;
                }
            }
        }
    }
}
</style>

<style scoped>
/deep/ .uni-steps__column-text {
    height: 36rpx;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 0;
    margin-top: 10rpx;
}

/deep/ .uni-steps__column-title {
    font-size: 26rpx;
    color: var(--content-tertiary) !important;
}

/deep/ .uni-steps__column-desc {
    font-size: 26rpx;
    color: var(--content-primary) !important;
    font-weight: 500;
}

/deep/ .uni-steps__column-circle {
    border-radius: 0;
    transform: rotate(45deg);
    background-color: var(--color-primary) !important;
}

/deep/ .uni-steps__column-check {
    width: 5px;
    height: 5px;
    transform: rotate(45deg);
    background-color: var(--color-primary) !important;
}

/deep/ .uniui-checkbox-filled::before {
    content: "";
}

/deep/ .uni-steps__column-line--before {
    height: 15px;
    transform: translate(0, 0);
}
</style>