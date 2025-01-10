<template>
    <view class="payment-methods"
          :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     :padding="15"
                     zIndex="9"
                     :title="$t('quickly.tt9')"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="payment-methods-container">
            <scroll-view scroll-y class="scroll-view" :style="{'height': scrollHeight + 'px'}">
                <!--  无数据  -->
                <empty-view :visible="list.length === 0"
                            :width="690"
                            :height="800"
                            :title="$t('list.not_data')">
                </empty-view>
                <view class="scroll-view-item" v-for="(item,index) in list" :key="index">
                    <view class="left">
                        <view class="left-cell">
                            <image src="/static/quickly/alipay.png" mode="widthFix" v-if="item.type == 2"></image>
                            <image src="/static/quickly/wechatpay.png" mode="widthFix" v-if="item.type == 1"></image>
                            <image type="unionpay" src="/static/quickly/unionpay.png" mode="widthFix"
                                   v-if="item.type == 3"></image>
                            <text class="font-14 color-black font-weight" v-if="item.type == 1">{{$t('quickly.tt43')}}</text>
                            <text class="font-14 color-black font-weight" v-if="item.type == 2">{{$t('quickly.tt41')}}</text>
                            <text class="font-14 color-black font-weight" v-if="item.type == 3">{{$t('quickly.tt42')}}</text>
                        </view>
                        <view class="left-cell">
                            <text class="font-13 color-gray">{{item.account}}</text>
                        </view>
                        <view class="left-cell">
                            <text class="font-13 color-gray">{{item.name}}</text>
                        </view>
                    </view>
                    <view class="right">
                        <image @click="qrcode = item.qrcode;backdropShow = true"
                               :src="`/static/newImage/qrcode-${userTheme}.png`"></image>
                    </view>
                </view>
            </scroll-view>
        </view>
        <view class="footer-button">
            <fui-button
                height="78rpx"
                radius="78rpx"
                :size="26"
                color="var(--background-primary)"
                background="var(--content-primary)"
                @click="$mroute.toAddMethod()">
                {{$t('editMine.append')}}
            </fui-button>
        </view>
        <!-- 收款二维码预览  -->
        <fui-backdrop closable @click="backdropShow = false" :show="backdropShow">
            <view class="preview-box">
                <image class="code-image" :src="qrcode" mode="widthFix"></image>
            </view>
        </fui-backdrop>
    </view>
</template>

<script>
import userApi from '@/common/api/user.js';
import {mapGetters} from 'vuex';
import emptyView from "@/components/emptyView/emptyView.vue";

export default {
    components: {
        emptyView
    },
    data() {
        return {
            windowHeight: uni.getSystemInfoSync().windowHeight,
            navHeight: "",
            scrollHeight: "",
            backdropShow: false,
            list: [],
            qrcode: ""
        }
    },
    onShow() {
        userApi.getPaymentList().then(res => {
            this.list = res.data.list;
        });
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        navInit(e) {
            console.log(e)
            this.navHeight = e.height + e.statusBarHeight;
            this.scrollHeight = this.windowHeight - this.navHeight;
        },
        getList() {

        }
    }
}
</script>

<style lang="scss" scoped>
@import "payment";
</style>