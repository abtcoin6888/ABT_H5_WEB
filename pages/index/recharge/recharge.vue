<template>
    <view class="recharge" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     :padding="15"
                     zIndex="2"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     :title="$t('rec.t1')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
            <template v-slot:right>
                <fui-icon class="mr-10"
                          name="order-fill"
                          size="40"
                          color="var(--content-tertiary)"
                          @click="$mroute.rechargeRecord()">
                </fui-icon>
            </template>
        </fui-nav-bar>

        <view class="recharge-body">
            <!--    充值币种   -->
            <view class="recharge-body-cell">
                <text class="font-13 font-weight color-black">
                    {{ $t('rec.t2') }}
                </text>
                <view class="recharge-body-cell-select mt-10"
                      @click="$refs.selectp.open()">
                    <template v-if="current">
                        <view class="flex align-center">
                            <image class="coin-icon" :src="current.icon" mode="widthFix"></image>
                            <text class="font-13 color-black font-weight">
                                {{ current.symbol }}
                            </text>
                        </view>
                    </template>
                    <template v-else>
                        <view class="flex align-center">
                            <text class="font-13 color-black font-weight">
                                {{ $t('rec.t3') }}
                            </text>
                        </view>
                    </template>
                    <image class="down-icon"
                           :src="`/static/img/tactic/down-${userTheme}.png`"
                           mode="widthFix">
                    </image>
                </view>
            </view>
            <!--    充值网络   -->
            <view class="recharge-body-cell mt-15">
                <text class="font-13 font-weight color-black">
                    {{ $t('rec.t4') }}
                </text>
                <view class="recharge-body-cell-select mt-10" @click="$refs.chain.open()">
                    <view class="flex align-center">
                        <text class="font-13 color-black font-weight" v-if="net===false && current===false">
                            {{ $t('rec.t5') }}
                        </text>
                        <text class="font-13 color-black font-weight" v-else>
                            {{ netlist[net]['symbol'] }}
                        </text>
                    </view>
                    <image class="down-icon"
                           :src="`/static/img/tactic/down-${userTheme}.png`"
                           mode="widthFix">
                    </image>
                </view>
            </view>
            <!--    充值地址   -->
            <view class="recharge-body-card mt-15">
                <view class="canvas-wrap">
                    <view class="canvas-box"
                          :style="`width: ${qrsize + 10}px; height: ${qrsize + 10}px`">
                        <canvas id="qrcode"
                                canvas-id="qrcode"
                                class="canvas-qrcode"
                                :style="`width: ${qrsize}px; height: ${qrsize}px`">
                        </canvas>
                    </view>
                </view>
                <view class="recharge-body-card-column">
                    <text class="font-13 color-gray">{{ $t('rec.t6') }}</text>
                    <text class="font-13 font-weight color-black">
                        {{ token }}
                    </text>
                </view>
            </view>

           <!--    充值金额填写   -->
		   <view style="margin-top:30rpx;" v-if="current['d_token']">
			   <view class="recharge-body-cell mt-15">
			       <text class="font-13 font-weight color-black">
			           {{ $t('rec.t20') }}  
			       </text>
			       <view class="recharge-body-cell-select mt-10">
			           <view class="flex align-center">
			               <input type="text"
			                      v-model="amount"
			                      class="font-13 color-black font-weight"
			                      :placeholder="$t('recharge.t5')"
			                      placeholder-class="placeholder"/>
			           </view>
			       </view>
			   </view>
			   <view class="recharge-body-card mt-15">
				   <text class="font-13 font-weight color-black" v-if="!this.voucherImg">
				       {{ $t('recharge.t6') }}  
				   </text>
			            <view class="voucher-box"
			                  :style="`width: ${qrsize + 10}px; height: ${qrsize + 10}px`">
			                  <image class="avatar-image"
			                    @click="uploadVoucher()"
			                    :src="voucherImg ? voucherImg : '/static/img/upload.png'">
			                </image>
			            </view>
			   
			        <view class="button_save" @click="saveVoucher">
			            <text class="font-13 font-weight color-black">
			                {{ $t('rec.t21') }}
			            </text>
			        </view>
			    </view>
		   </view>

            <!--    最小充值数、确认数   -->
            <view class="recharge-body-card mt-15">
                <view class="recharge-body-card-row">
                    <text class="font-12 color-gray">
                        {{ $t('rec.t7') }}
                    </text>
                    <text class="font-12 color-black font-weight">
                        {{ current ? current['recharge_min'] : '--' }} {{ current['symbol'] }}
                    </text>
                </view>
                <view class="recharge-body-card-row">
                    <text class="font-12 color-gray">
                        {{ $t('rec.t8') }}
                    </text>
                    <text class="font-12 color-black font-weight">
                        20
                    </text>
                </view>
                <view class="recharge-body-card-row">
                    <text class="font-12 color-gray">
                        {{ $t('rec.t9') }}
                    </text>
                    <text class="font-12 color-black font-weight">
                        20
                    </text>
                </view>
            </view>
            <!--    充值提醒   -->
            <view class="recharge-body-cell flex flex-column mt-15 recharge-body-last-tips">
                <text class="font-13 color-black font-weight">
                    {{ $t('rec.t10') }}
                </text>
                <template v-if="current.d_c === 0">
                    <text class="font-12 color-gray mt-15">
                        {{ $t('rec.t11').replace('Ethereum(ERC20)_USDT', current.symbol) }}
                    </text>
                    <text class="font-12 color-gray mt-10">
                        {{ $t('rec.t12') }}
                    </text>
                    <text class="font-12 color-gray mt-10">
                        {{ $t('rec.t13') }}
                    </text>
                    <!-- <text class="font-12 color-gray mt-10">
                        支付切换
                    </text> -->
                </template>
                <template v-else>
                    <text class="font-12 color-gray mt-15">
                        {{ remark[lang] }}
                    </text>
                </template>
            </view>
        </view>

        <view class="recharge-footer">
            <view class="button button-active" @click="saveImg">
                <text class="font-13 font-weight color-black">
                    {{ $t('rec.t14') }}
                </text>
            </view>
            <view class="button button-active" @click="copy">
                <text class="font-13 font-weight color-white">
                    {{ $t('rec.t15') }}
                </text>
            </view>
        </view>

        <uni-popup ref="selectp" :safe-area="false" type="bottom" style="height: 100%;width: 100%;">
            <view :style="{height:($device.windowHeight + 'px')}">
                <fui-nav-bar zIndex="2"
                             background="var(--background-primary)"
                             color="var(--content-primary)"
                             :title="$t('rec.t16')"
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
                        {{ $t('rec.t17') }}
                    </text>
                    <view class="close-icon" @click="$refs.chain.close()">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popup-wrap-content">
                    <view class="popup-wrap-content-tip">
                        <text class="font-12 color-gray">
                            {{ $t('rec.t18') }}
                        </text>
                    </view>
                    <view class="popup-wrap-content-list">
                        <template v-for="(item,index) in netlist">
                            <view class="popup-wrap-content-list-item"
                                  :class="{'popup-wrap-content-list-item-active':net===index}"
                                  @click="net = index;$refs.chain.close()">
                                <text class="font-12 color-black font-weight">
                                    {{ item.symbol }}
                                </text>
                            </view>
                        </template>
                    </view>
                </view>
            </view>
        </uni-popup>

        <loading ref="loading"></loading>
        <alert ref="alert" :title="$t('rec.t19')" :content="content"></alert>

        <fui-toast ref="toast" size="26" color="#ffffff" background="rgba(0,0,0,.8)">
            <fui-icon name="checkbox" color="#fff"></fui-icon>
        </fui-toast>
    </view>
</template>

<script>
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
import commonApi from '@/common/api/common.js';
import UQRCode from 'uqrcodejs';

import {mapGetters} from 'vuex';

export default {
    components: {
        fuiNavBar
    },
    data() {
        return {
            coin: [],
            netlist: [],
            net: false,
            current: false,
            token: "",
            content: "",
            remark: false,
            lang: '',
            qrsize: 120,
			amount:'',
            voucherImg:undefined,

        }
    },
    onLoad() {
        this.getRechargeCurrency();
    },
    onShow() {
        this.lang = uni.getStorageSync('lang');
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    onReady() {
        setTimeout(() => {
            this.$refs.selectp.open();
        }, 200);
    },
    watch: {
        net(v) {
            if (v !== false) {
                this.getRechargeToken();
            }
        }
    },
    methods: {
        uploadVoucher(){
            let _this = this;
			
            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                success(res) {
                    console.log(res);
                    uni.showLoading({
                        title: '上传中'
                    });
                    commonApi.uploadFile(res.tempFilePaths[0]).then(res => {
                        uni.hideLoading();
                        if (res.statusCode == 200) {
                            var res = JSON.parse(res.data);
                            _this.voucherImg = res.data.url;
                        }
                    }).catch(res => {
                        uni.hideLoading();
                    });
                }
            })
        },
        saveVoucher(){
			if(!this.amount){
			    uni.showToast({
			        title: this.$t('recharge.t5'),
			        icon: 'none',
			        mask: true
			    })
				return false;
			}
            if(!this.token&&!this.current.id){
                uni.showToast({
                    title: '請選擇網絡',
                    icon: 'none',
                    mask: true
                })
            }
            if(!this.voucherImg){
                uni.showToast({
                    title: this.$t('recharge.t6'),
                    icon: 'none',
                    mask: true
                })
				return false;
            }
			
            this.$refs.loading.open();
            commonApi.saveRecharge(
				{
					voucherImg:this.voucherImg,
					token:this.token,
					chain_network:this.current.id,
					amount:this.amount
				}).then(res => {
                this.$refs.loading.close();
                uni.showToast({
                    title: this.$t('recharge.t7'),
                    icon: 'none',
                    mask: true
                })
            })
        },
        saveImg() {
            // #ifdef H5
            this.content = this.$t("recharge.t1");
            this.$refs.alert.open();
            // #endif
            // #ifdef APP-PLUS
            var _this = this;
            uni.canvasToTempFilePath({
                canvasId: "qrcode",
                success: res => {
                    uni.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: res => {
                            _this.content = _this.$t('recharge.t2');
                            _this.$refs.alert.open();
                        },
                        fail: err => {
                            _this.showToast(_this.$t('recharge.t3'), 1000);
                        }
                    });
                }
            });
            // #endif
        },
        copy() {
            var _this = this;
            if (_this.token != '') {
                uni.setClipboardData({
                    data: _this.token,
                    showToast: false,
                    success() {
                        _this.showToast(_this.$t('recharge.t3'), 1000);
                    }
                })
            }
        },
        getRechargeToken() {
            if (!this.current) {
                return false;
            }
            if (parseInt(this.current.d_c) === 1) {
				this.recharge_token = JSON.parse(this.current.d_token);
				this.key_token = this.netlist[this.net]['symbol']
                this.remark = JSON.parse(this.current.remark);
                this.token = this.recharge_token[this.key_token];
                var qr = new UQRCode();
                qr.data = this.token;
                qr.size = this.qrsize;
                qr.make();
                var canvasContext = uni.createCanvasContext('qrcode', this);
                qr.canvasContext = canvasContext;
                qr.drawCanvas();
            } else {
                this.$refs.loading.open();
                commonApi.getRechargeToken(this.netlist[this.net]['id']).then(res => {
                    this.$refs.loading.close();
                    this.token = res.data.address;
                    var qr = new UQRCode();
                    qr.data = res.data.address;
                    qr.size = this.qrsize;
                    qr.make();
                    var canvasContext = uni.createCanvasContext('qrcode', this);
                    qr.canvasContext = canvasContext;
                    qr.drawCanvas();
                });
            }
        },
        getNetList(currency_id) {
            commonApi.getNetList(currency_id).then(res => {
                this.netlist = res.data.list;
                this.net = 0;
                this.getRechargeToken();
            })
        },
        getRechargeCurrency() {
            commonApi.getRechargeCurrency().then(res => {
                this.coin = res.data.list;
                console.log(this.coin);
                this.getNetList(this.coin[0]['id']);
            });
        },
        itemclick(e) {
            console.log(e);
            this.current = e;
            this.$refs.selectp.close();
            this.getNetList(e.id);
        },
        showToast(type, duration) {
            let options = {}
            //提示信息
            options.text = type;
            options.duration = duration;
            this.$refs.toast.show(options)
        }
    }
}
</script>

<style lang="scss" scoped>
.recharge {
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

            &-select {
                width: 100%;
                height: 78rpx;
                border-radius: 8rpx;
                background: var(--background-secondary);
                padding: 0 16rpx;
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
            }

        }

        &-last-tips {
            padding-bottom: 200rpx;
            box-sizing: border-box;
        }

        &-card {
            width: 100%;
            height: auto;
            padding: 30rpx;
            box-sizing: border-box;
            border-radius: 8rpx;
            background: var(--background-secondary);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .canvas-wrap {
                width: 100%;
                height: auto;
                padding: 30rpx 0 60rpx 0;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;

                .canvas-box {
                    background: var(--content-always-white);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }

            &-column {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: column;

                text {
                    display: inline-block;
                    width: 100%;
                    word-break: break-all;

                    &:nth-of-type(2) {
                        margin-top: 20rpx;
                    }
                }
            }

            &-row {
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

        .button {
            width: calc(100% / 2 - 10rpx);
            height: 78rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 78rpx;

            &:nth-of-type(1) {
                background: var(--background-secondary);
            }

            &:nth-of-type(2) {
                background: var(--content-primary);
            }
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
.button_save{
    padding-bottom: 20rpx;
    text{
        background: white;
        padding: 20rpx 50rpx;
        color: black;
        border-radius: 30rpx;
    }
}
.voucher-box{
    width: 100rpx;
    height: 100rpx;
    margin-bottom: 60rpx;
    image{
        width: 100%;
        height: 100%;
    }
}
</style>

<style scoped>
/deep/ .fui-toast__text {
    margin-top: 20rpx;
}
</style>