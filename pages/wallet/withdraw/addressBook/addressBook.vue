<template>
    <view class="page-warp bg-white"
          :data-theme="userTheme">
        <fui-nav-bar zIndex="9"
                     :statusBar="true"
                     :title="$t('address.text1')"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <scroll-view class="scroll-warp"
                     :style="`height: ${scrollViewHeight}px`">
            <view class="scroll-container">
                <fui-swipeaction-group>
                    <fui-swipe-action :custom="true"
                                      :show="actionShow[index]"
                                      :margin-bottom="45"
                                      v-for="(item, index) in swipeActionArr"
                                      :key="index">
                        <view class="swipe-action">
                            <view class="row">
                                <view class="row-item">
                                    <text class="font-16 font-bold color-black">{{ item.currency }}</text>
                                    <text class="row-tag bg-gray font-11 color-gray">{{ item.network }}</text>
                                </view>
                                <image class="more-icon"
                                       :src="`/static/img/newContract/more-${userTheme}.png`"
                                       mode="widthFix"
                                       @click="actionShow[index] = !actionShow[index]"></image>
                            </view>
                            <view class="row">
                                <text class="row-text font-11 color-gray">{{ item.address }}</text>
                            </view>
                            <view class="row">
                                <text class="row-text font-12 color-black font-weight">{{ item.remark }}</text>
                            </view>
                        </view>
                        <template v-slot:buttons>
                            <view class="menu-warp bg-gray">
                                <view class="delect-box bg-white"
                                      @click="delectAction(index)">
                                    <fui-icon name="delete"
                                              size="48"
                                              color="var(--content-secondary)">
                                    </fui-icon>
                                </view>
                            </view>
                        </template>
                    </fui-swipe-action>
                </fui-swipeaction-group>
            </view>
        </scroll-view>
        <view class="toggle-button bg-white">
            <view class="button bg-black"
                  @click="$mroute.toAddAddress()">
                <text class="font-14 font-weight color-white">
                    {{ $t('address.text2') }}
                </text>
            </view>
        </view>
    </view>
</template>
<script>
import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            scrollViewHeight: null,
            actionShow: [],
            swipeActionArr: [{
                currency: "USDT",
                network: "TRC20",
                address: "TRMtqugM99mKD5BP6FbGdMUf9yzdik34XmTRMtqugM99mKD5BP6FbGdMUf9yzdik34Xm",
                remark: "地址备注-地址备注"
            }, {
                currency: "USDT",
                network: "TRC20",
                address: "TRMtqugM99mKD5BP6FbGdMUf9yzdik34XmTRMtqugM99mKD5BP6FbGdMUf9yzdik34Xm",
                remark: "地址备注-地址备注"
            }]
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        navInit(e) {
            const navHeight = e.height + e.statusBarHeight;
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            this.scrollViewHeight = windowHeight - navHeight;
        },
        delectAction(e) {
            this.swipeActionArr = this.swipeActionArr.splice(e, 1);
        }
    },
}
</script>
<style lang="scss"
       scoped>
@import "addressBook";
</style>