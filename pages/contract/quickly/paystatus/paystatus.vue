<template>
    <view class="paystatus" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     :padding="15"
                     zIndex="9"
                     :title="$t('quickly.tt101')"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--color-title-black)">
            </fui-icon>
            <template v-slot:right>
                <text class="font-12 color-gray"
                      @click="$mroute.webview(2,config['kefu_url'],$t('common.kefu'),100)">
                    {{$t('quickly.tt102')}}
                </text>
            </template>
        </fui-nav-bar>
        <view class="paystatus-container">
            <scroll-view scroll-y class="paystatus-container-scroll" :style="{'height': windowHeight + 'px'}">
                <!--待付款-->
                <view class="scroll-card">
                    <view class="scroll-card-row">
                        <view class="left flex flex-column align-start justify-start">
                            <text class="font-20 color-black font-weight" v-if="order['status'] == 3">
                                 {{$t('quickly.tt103')}}
                            </text>
                            <text class="font-20 color-black font-weight" v-if="order['status'] == 2">
                                 {{$t('quickly.tt104')}}
                            </text>
                            <text class="font-20 color-black font-weight"
                                  v-if="order['status'] == 0 && order['result']['type'] == 1">
                                {{$t('quickly.tt70')}}
                            </text>
                            <text class="font-20 color-black font-weight"
                                  v-if="order['status'] == 1 && order['result']['type'] == 1">
                                {{$t('quickly.tt55')}}
                            </text>

                            <text class="font-20 color-black font-weight"
                                  v-if="order['status'] == 0 && order['result']['type'] == 2">
                                {{$t('quickly.tt105')}}
                            </text>
                            <view class="time-text"
                                  v-if="order['status'] == 0 && order['result']['type'] == 1">
                                <text class="font-16 color-black font-weight">
                                    {{$t('quickly.tt106')}}
                                </text>
                                <fui-count-down background="var(--background-secondary)"
                                                size="20"
                                                borderColor="var(--background-secondary)"
                                                color="var(--content-primary)"
                                                colonColor="var(--content-tertiary)"
                                                :isHours="false"
                                                :value="600"
                                                @end="timeEnd">
                                </fui-count-down>
                                <text class="font-16 color-black font-weight">
                                    {{$t('quickly.tt107')}}
                                </text>
                            </view>
                            <text class="font-12 color-gray mt-5"
                                  v-if="order['status'] == 1 && order['result']['type'] == 1">
                                {{$t('quickly.tt108')}}
                            </text>
                            <text class="font-16 color-black font-weight mt-5"
                                  v-if="order['status'] == 2 && order['result']['type'] == 1">
                                {{$t('quickly.tt109')}}{{ order['t_amount'] }} {{ order['currency']['symbol'] }}
                            </text>
                        </view>
                        <view class="right">
                            <view class="kf-box">
                                <image class="kf-img"
                                       :src="`/static/img/kf-${userTheme}.webp`"
                                       mode="widthFix"
                                       @click="$mroute.webview(2,config['kefu_url'],$t('common.kefu'),100)">
                                </image>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="scroll-card">
                    <view class="scroll-card-row">
                        <view class="left flex align-center">
                            <image :src="order['currency']['icon']"></image>
                            <text class="font-16 color-black font-bold">{{$t('quickly.tt50')}}{{
                                    order['currency']['symbol']
                                }}
                            </text>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('trade.price')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight">{{symbol}} {{ order['price'] }}</text>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt59')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight">{{ order['t_amount'] }}
                                {{ order['currency']['symbol'] }}
                            </text>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt58')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-16 color-black font-weight">
                                {{symbol}} {{ $util.thousandSeparator(order['amount']) }}
                            </text>
                            <image class="copy-icon"
                                   :src="`/static/img/copy-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt110')}}</text>
                        </view>
                        <view class="right">
                            <image src="/static/quickly/alipay.png" v-if="order['payment']=='alipay'"></image>
                            <image src="/static/quickly/wechatpay.png" v-if="order['payment']=='wechatpay'"></image>
                            <image src="/static/quickly/unionpay.png" v-if="order['payment']=='bank'"></image>
                            <text class="font-13 color-black font-weight ml-5" v-if="order['payment']=='alipay'">{{$t('quickly.tt41')}}</text>
                            <text class="font-13 color-black font-weight ml-5" v-if="order['payment']=='bank'">{{$t('quickly.tt42')}}</text>
                            <text class="font-13 color-black font-weight ml-5" v-if="order['payment']=='wechatpay'">{{$t('quickly.tt43')}}</text>
                        </view>
                    </view>
                    <view class="scroll-card-tip" v-if="order['status'] == 0 && order['result']['type'] == 1">
                        <text class="font-12 color-warring">
                            <fui-icon name="info-fill" size="24" color="var(--color-warring)"></fui-icon>
                            {{$t('quickly.tt111')}}
                        </text>
                    </view>
                </view>
                <!--买家信息-->
                <view class="scroll-card">
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt112')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight" @click="sellerInfo = true">
                                {{ order['merchant']['name'] }}
                            </text>
                            <fui-icon name="arrowright" size="36" color="var(--color-title-black)"></fui-icon>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt113')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight">{{ order['merchant']['merchant_name'] }}</text>
                            <image class="copy-icon"
                                   :src="`/static/img/copy-${userTheme}.png`"
                                   mode="widthFix"
                                   @click="copyText(order['merchant']['merchant_name'])">
                            </image>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt114')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight" v-if="order['payment'] != 'alipay'">
                                {{ order['merchant']['merchant_account'] }}
                            </text>
                            <text class="font-13 color-black font-weight" v-else>{{ order['merchant']['merchant_bank'] }}</text>
                            <image class="copy-icon"
                                   :src="`/static/img/copy-${userTheme}.png`"
                                   mode="widthFix"
                                   @click="copyText(order['merchant']['merchant_name'])"
                                   v-if="order['payment'] != 'alipay'">
                            </image>
                            <image class="copy-icon"
                                   :src="`/static/img/copy-${userTheme}.png`"
                                   mode="widthFix"
                                   @click="copyText(order['merchant']['merchant_name'])"
                                   v-else>
                            </image>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt115')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight" v-if="order['payment'] == 'bank'">
                                {{ order['merchant']['merchant_bank'] }}
                            </text>
                            <image class="copy-icon"
                                   :src="`/static/img/copy-${userTheme}.png`"
                                   mode="widthFix"
                                   @click="copyText(order['merchant']['merchant_bank'])">
                            </image>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt116')}}</text>
                        </view>
                        <view class="right">
                            <image @click="codePopup = true" class="qrcode"
                                   :src="`/static/quickly/qrcode-${userTheme}.png`"></image>
                        </view>
                    </view>
                </view>
                <!--订单信息-->
                <view class="scroll-card">
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt117')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight order-number">{{ order['result']['id'] }}</text>
                            <image class="copy-icon"
                                   :src="`/static/img/copy-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt118')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight">{{ order['result']['created_at'] }}</text>
                        </view>
                    </view>
                    <view class="scroll-card-row">
                        <view class="left">
                            <text class="font-12 color-gray">{{$t('quickly.tt119')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black font-weight">{{$t('quickly.tt120')}}</text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <view class="paystatus-footer" v-if="order['status'] == 0 && order['result']['type'] == 1">
            <view class="button-item">
                <fui-button height="78rpx"
                            radius="78rpx"
                            :size="26"
                            color="var(--content-tertiary)"
                            background="var(--background-secondary)"
                            @click="cancelOrder">
                    {{$t('quickly.tt121')}}
                </fui-button>
            </view>
            <view class="button-item">
                <fui-button height="78rpx"
                            radius="78rpx"
                            :size="26"
                            color="var(--background-primary)"
                            background="var(--content-primary)"
                            @click="next">
                    {{$t('quickly.tt122')}}
                </fui-button>
            </view>
        </view>
        <view class="paystatus-footer" v-if="order['status'] == 1 && order['result']['type'] == 1">
            <view class="button-item">
                <fui-button @click="approveC"
                            height="78rpx"
                            radius="78rpx"
                            :size="26"
                            color="var(--content-tertiary)"
                            background="var(--background-secondary)">
                    {{$t('quickly.tt123')}}
                    <fui-count-down v-if="!astatus"
                                    :isHours="false"
                                    size="24"
                                    color="var(--content-primary)"
                                    colonColor="var(--content-tertiary)"
                                    background="var(--background-secondary)"
                                    borderColor="var(--background-secondary)"
                                    :value="300"
                                    @end="approve">
                    </fui-count-down>
                </fui-button>
            </view>
            <view class="button-item">
                <fui-button height="78rpx"
                            radius="78rpx"
                            :size="26"
                            color="var(--content-always-white)"
                            background="var(--content-trade-sell)"
                            @click="cancelOrder">
                    {{$t('quickly.tt124')}}
                </fui-button>
            </view>
        </view>

        <!--  取消交易弹窗  -->
        <fui-bottom-popup :show="cancelTran" @close="closePopup">

        </fui-bottom-popup>
        <!--  收款码弹窗  -->
        <fui-bottom-popup background="var(--background-primary)"
                          :show="codePopup"
                          @close="closePopup">
            <view class="code-popup">
                <view class="title">
                    <text class="font-15 color-black font-weight">{{$t('quickly.tt125')}}</text>
                    <text class="font-13 color-gray" @click="closePopup">{{$t('quickly.tt126')}}</text>
                </view>
                <view class="code-popup-content">
                    <view class="account-info">
                        <view class="image-box">
                            <image :src="order['merchant']['logo']"></image>
                        </view>
                        <view class="info-box">
                            <text class="font-16 color-black">
                                {{ order['merchant']['merchant_name'] }}
                            </text>
                            <text class="font-12 color-gray mt-5"
                                  v-if="order.payment==='bank'">
                                {{$t('quickly.tt127')}}:{{ order['merchant']['bank_name'] }}
                            </text>
                            <text class="font-12 color-gray mt-5"
                                  v-if="order.payment==='bank'">
                                {{$t('quickly.tt128')}}: {{ order['merchant']['merchant_bank'] }}
                            </text>
                            <text class="font-12 color-gray mt-5">
                                {{$t('quickly.tt129')}}: {{ order['merchant']['merchant_account'] }}
                            </text>
                        </view>
                    </view>
                    <view class="qrcode">
                        <text class="font-13 color-gray" v-if="order.payment==='alipay'">
                            {{$t('quickly.tt130')}}
                       </text>
                        <text class="font-13 color-gray" v-if="order.payment==='wechatpay'">
                            {{$t('quickly.tt131')}}
                        </text>
                        <text class="font-13 color-gray" v-if="order.payment==='bank'">
                            {{$t('quickly.tt132')}}
                        </text>
                        <image :src="order['merchant']['merchant_qrcode']"></image>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--  卖家信息弹窗 / sellerInfo -->
        <fui-bottom-popup background="var(--background-primary)" :show="sellerInfo" @close="closePopup">
            <view class="bottom-popup">
                <view class="title">
                    <text class="font-15 color-black font-weight">{{$t('quickly.tt133')}}</text>
                    <text class="font-13 color-gray" @click="closePopup">{{$t('quickly.tt134')}}</text>
                </view>
                <view class="popup-content">
                    <view class="cell">
                        <view class="left">
                            <image src="/static/home/cblogo192.png"></image>
                            <text class="font-14 color-black font-weight">
                                {{ order['merchant']['name'] }}
                            </text>
                        </view>
                    </view>
                    <view class="cell-column">
                        <text class="font-13 color-gray">{{$t('quickly.tt135')}}</text>
                        <view class="column-group">
                            <view class="_item">
                                <text class="font-14 color-black font-weight">
                                    {{ order['merchant']['buy_num'] }}
                                </text>
                                <text class="font-13 color-green mt-5">{{$t('quickly.tt136')}}</text>
                            </view>
                            <view class="_item">
                                <text class="font-14 color-black font-weight">
                                    {{ order['merchant']['sale_num'] }}
                                </text>
                                <text class="font-13 color-red mt-5">{{$t('quickly.tt137')}}</text>
                            </view>
                        </view>
                    </view>
                    <view class="cell not-margin">
                        <view class="left">
                            <text class="font-13 color-gray">{{$t('quickly.tt138')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black">
                                {{ order['merchant']['buy_haddle_time'] }}{{$t('quickly.tt139')}}
                            </text>
                        </view>
                    </view>
                    <view class="cell not-margin">
                        <view class="left">
                            <text class="font-13 color-gray">{{$t('quickly.tt140')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black">
                                {{ order['merchant']['created_at'] }}
                            </text>
                        </view>
                    </view>
                    <view class="button-box">
                        <fui-button height="78rpx"
                                    radius="78rpx"
                                    size="26"
                                    color="var(--background-primary)"
                                    background="var(--content-primary)"
                                    @click="closePopup">
                            {{$t('quickly.tt141')}}
                        </fui-button>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--  确定订单弹窗 / confirmOrder  -->
        <fui-bottom-popup background="var(--background-primary)" :show="confirmOrder" @close="closePopup">
            <view class="bottom-popup">
                <view class="title">
                    <text class="font-15 color-black font-weight">{{$t('quickly.tt142')}}</text>
                    <text class="font-13 color-gray" @click="closePopup">{{$t('quickly.tt143')}}</text>
                </view>
                <view class="popup-content">
                    <view class="popup-content-head border-bottom">
                        <view class="cell-tip">
                            <text class="font-12 color-warring">
                                <fui-icon name="info-fill" size="24" color="var(--color-warring)"></fui-icon>
                                {{$t('quickly.tt144')}}
                            </text>
                        </view>
                        <view class="cell">
                            <view class="left">
                                <text class="font-14 color-black font-weight">{{$t('quickly.tt145')}}</text>
                            </view>
                            <view class="right">
                                <text class="font-16 color-black font-weight">
                                    {{symbol}} {{ $util.thousandSeparator(order['amount'], 2) }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="cell not-margin">
                        <view class="left">
                            <text class="font-13 color-gray">{{$t('quickly.tt146')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black">
                                {{ order['merchant']['buy_haddle_time'] }}{{$t('quickly.tt147')}}
                            </text>
                        </view>
                    </view>
                    <view class="cell not-margin">
                        <view class="left">
                            <text class="font-13 color-gray">{{$t('quickly.tt148')}}</text>
                        </view>
                        <view class="right">
                            <text class="font-13 color-black">
                                {{ order['merchant']['created_at'].split(' ')[0] }}
                            </text>
                        </view>
                    </view>
                    <view class="button-box">
                        <fui-button height="78rpx"
                                    radius="78rpx"
                                    size="26"
                                    color="var(--content-always-white)"
                                    background="var(--content-trade-buy)"
                                    @click="confrimTap">
                            {{$t('quickly.tt149')}}
                        </fui-button>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>

        <fui-toast size="26" :background="'var(--mask-bakground-bg)'" ref="toast"></fui-toast>
    </view>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import commonApi from '@/common/api/common.js';
import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"
import fuiCountDown from "@/components/firstui/fui-count-down/fui-count-down.vue"

var set = null;
export default {
    components: {
        fuiToast,
        fuiCountDown
    },
    data() {
        return {
            payType: false,
            navHeight: "",
            windowHeight: "",
            cancelTran: false,
            codePopup: false,
            sellerInfo: false,
            confirmOrder: false,
            order: {},

            astatus: false,
            tip: false,
			symbol: this.$util.getLCS(),
			symbol_rate: this.$util.getLCR(),
        }
    },
    computed: {
        ...mapState(['config', 'userinfo']),
        ...mapGetters(['userTheme'])
    },
    onShow() {
        this.order = uni.getStorageSync('c2c-buy');
        if (set != null) {
            clearInterval(set);
        }
        this.orderStatus();
        set = setInterval(() => {
            this.orderStatus();
        }, 2000);
    },
    onHide() {
        clearInterval(set);
    },
    methods: {
        orderStatus() {
            var _thss = this;
            commonApi.c2cOrderStatus(this.order.id).then(res => {
                _thss.order['status'] = res.data.status;
                if (this.order['status'] === 2 && !_thss.tip) {
                    _thss.tip = true;
                    _thss.showToast(this.$t('quickly.tt150'), 5000);
                }
            });
        },
        approveC() {
            if (this.astatus) {
                return this.$mroute.webview(2, this.config['kefu_url'], this.$t('common.kefu'), 100);
            }
        },
        approve() {
            //申诉倒计时
            this.showToast(this.$t('quickly.tt151'), 1500);
            this.astatus = true;
        },
        timeEnd() {
            this.showToast(this.$t('quickly.tt152'), 1500);
            commonApi.cancelCOrder(_this.order.id).then(res => {
                if (res.code == 200) {
                    _this.order['status'] = 3;
                } else {
                    _this.showToast(res.message);
                }
            }).catch((e) => {
                _this.showToast(e.message);
            })
        },
        cancelOrder() {
            var _this = this;
            uni.showModal({
                content: this.$t('quickly.tt153'),
                confirmText: this.$t('quickly.tt154'),
                cancelText: this.$t('quickly.tt155'),
                success(e) {
                    if (e.confirm) {
                        commonApi.cancelCOrder(_this.order.id).then(res => {
                            if (res.code == 200) {
                                _this.order['status'] = 3;
                            } else {
                                _this.showToast(res.message);
                            }
                        }).catch((e) => {
                            _this.showToast(e.message);
                        })
                    }
                }
            })
        },
        copyText(e) {
            uni.setClipboardData({
                data: e,
                success() {
                    uni.showToast({
                        icon: "success",
                        title: "copy success"
                    })
                }
            })
        },
        navInit(e) {
            console.log(e);
            this.navHeight = e.height + e.statusBarHeight;
            this.windowHeight = uni.getSystemInfoSync().windowHeight - e.height - e.statusBarHeight;
        },
        next() {
            this.confirmOrder = true;
        },
        confrimTap() {
            uni.showLoading();
            commonApi.payed(this.order.id).then(res => {
                uni.hideLoading();
                this.closePopup();
                if (res.code == 200) {
                    this.order['status'] = 1;
                }
                this.showToast(res.message);
            }).catch((e) => {
                this.closePopup();
                this.showToast(e.message);
            })
            //this.payType = true;

        },
        closePopup() {
            this.cancelTran = false;
            this.codePopup = false;
            this.sellerInfo = false;
            this.confirmOrder = false;
        },
        showToast(type, time) {
            let options = {}
            //提示信息
            options.text = type;
            options.duration = time;
            this.$refs.toast.show(options)
        },
    }
}
</script>

<style lang="scss" scoped>
@import "paystatus";
</style>

<style scoped>
/deep/ .fui-count__down-wrap {
    margin: 0 10rpx !important;
}

/deep/ .fui-count__down-colon {
    margin: 0 4rpx !important;
}
</style>