<template>
    <view class="ed_info" :data-theme="userTheme">
        <!-- title-bar -->
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     title="申购记录详情"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <!--  -->
        <view class="container-wrap">
            <view class="row">
                <text class="font-13 color-gray">{{ $t('financing.t5') }}</text>
                <text class="font-13 font-weight color-black">{{ id }}</text>
            </view>
            <view class="row">
                <text class="font-13 color-gray">
                    {{ $t('financing.t15') }}
                </text>
                <text class="font-13 font-weight color-black">
                    {{ item.product.name }}
                </text>
            </view>
            <view class="row">
                <text class="font-13 color-gray">
                    {{ $t('financing.t6') }}
                </text>
                <text class="font-13 font-weight color-black">
                    {{ item.product.buy_currency.symbol }}
                </text>
            </view>
            <view class="row">
                <text class="font-13 color-gray">
                    {{ $t('financing.t4') }}
                </text>
                <text class="font-13 font-weight color-black">
                    {{ $util.thousandSeparator(item.amount) }}
                    {{ item.product.buy_currency.symbol }}
                </text>
            </view>
            <view class="row">
                <text class="font-13 color-gray">
                    {{ $t('financing.t7') }}
                </text>
                <text class="font-13 font-weight color-black">
                    {{ item.product.eay }}%
                </text>
            </view>
            <view class="row">
                <text class="font-13 color-gray">
                    {{ $t('financing.t17') }}
                </text>
                <text
                    class="font-13 font-weight color-black">
                    {{ $util.thousandSeparator(item.amount * item.product.eay / 100) }}
                    {{ item.product.buy_currency.symbol }}
                </text>
            </view>
            <!-- <view class="row">
                <text class="font-13 color-gray">{{$t('financing.t18')}}</text>
                <text
                    class="font-13 font-weight color-black">{{item.extract_amount?$util.thousandSeparator(item.extract_amount):'--'}}</text>
            </view> -->
            <view class="row">
                <text class="font-13 color-gray">
                    {{ $t('financing.t19') }}
                </text>
                <text class="font-13 font-weight color-black">
                    {{ item.expiration_time }}
                </text>
            </view>
            <view class="row">
                <text class="font-13 color-gray">
                    {{ $t('financing.t3') }}
                </text>
                <text class="font-13 font-weight color-black">
                    {{ item.created_at }}
                </text>
            </view>
            <view class="row">
                <text class="font-13 color-gray">
                    {{ $t('financing.t8') }}
                </text>
                <text class="font-13 font-weight color-black">
                    {{ item.product.time_limit }} {{ $t('financing.t10') }}
                </text>
            </view>
            <view class="row">
                <text class="font-13 color-gray">
                    {{ $t('financing.t9') }}
                </text>
                <text class="font-13 color-black font-weight"
                      v-if="item.status==1">
                    {{ $t('financing.t12') }}
                </text>
                <text class="font-13 color-black font-weight"
                      v-if="item.status==2">
                    {{ $t('financing.t13') }}
                </text>
                <text class="font-13 color-black font-weight"
                      v-if="item.status==3">
                    {{ $t('financing.t14') }}
                </text>
            </view>
            <view class="row">
                <text class="font-13 color-gray">
                    {{ $t('financing.t20') }}
                </text>
                <text class="font-13 font-weight color-black">
                    {{ item.extract_time ? item.extract_time : '--' }}
                </text>
            </view>
            <!-- <view class="row mt-10">
                <text class="font-13 font-weight color-black">自动续购</text>
                <switch color="#35ad7a" />
            </view> -->
        </view>
        <view class="footer" v-if="item.status == 1" @click="dialogType = true;rt=1;ctitle=$t('financing.t24')">
            <button class="button">{{ $t('financing.t11') }}</button>
        </view>
        <view class="footer" v-if="item.status == 2" @click="dialogType = true;rt=2;ctitle=$t('financing.t22')">
            <button class="button">{{ $t('financing.t23') }}</button>
        </view>
        <fui-dialog :show="dialogType"
                    color="var(--content-primary)"
                    contentColor="var(--content-tertiary)"
                    background="var(--background-primary)"
                    :title="ctitle"
                    maskClosable
                    :buttons="buttons"
                    @click="onClick"
                    @close="dialogType = false">
        </fui-dialog>
    </view>
</template>

<script>
import financing from '../../../../../common/api/financing.js'

import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            dialogType: false,
            id: 0,
            item: {
                product: {
                    buy_currency: {}
                },
                status: 0,
                extract_time: ''
            },
            rt: 1,
            ctitle: '',
            navHeight: "",
            buttons: [{
                text: this.$t('取消'),
                color: 'var(--content-tertiary)'
            }, {
                text: this.$t('确定'),
                color: 'var(--content-primary)'
            }]
        }
    },
    onLoad(option) {
        this.id = option.id
    },
    onShow() {
        // this.$refs.alertDialog.open();
    },
    mounted() {
        this.getDetail()
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
        },
        onClick(e) {
            console.log(e);
            if (e.index === 0) {
                this.dialogType = false;
            }

            if (e.index === 1) {
                this.confirm();
            }
        },
        async getDetail() {
            let res = await financing.buyDetail({
                id: this.id
            })
            this.item = res.data

        },
        async confirm() {
            if (this.rt == 1) {
                let res = await financing.cancel({
                    id: this.id
                })
                this.item.status = 2
            }
            if (this.rt == 2) {
                let res = await financing.redemption({
                    id: this.id
                })
                this.item.status = 3
                this.item.extract_time = res.data.t
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "info";
</style>