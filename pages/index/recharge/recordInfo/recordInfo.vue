<template>
    <view class="recordInfo" :data-theme="userTheme">
        <fui-nav-bar :title="$t('recinfo.t6')"
                     zIndex="9"
                     isFixed
                     isOccupy
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="record-container">
            <view class="top-box">
                <image src="/static/coin/usdt.png" mode=""></image>
                <text class="font-13 color-gray font-weight">{{ info.symbol }}</text>
                <text class="color-black font-weight price_num">+{{ info.amount }}</text>
                <view class="type-box">
                    <fui-icon class="icon" color="#35ad7a" name="checkbox-fill" size="44"></fui-icon>
                    <text class="font-12 color-black font-weight">{{ $t('common.rs') }}</text>
                </view>
            </view>
            <view class="bottom-box">
                <view class="cell">
                    <view class="item">
                        <text class="font-13 color-gray">{{ $t('recinfo.t1') }}</text>
                    </view>
                    <view class="item">
                        <text class="font-13 color-black font-weight">20/20</text>
                    </view>
                </view>
                <view class="cell">
                    <view class="item">
                        <text class="font-13 color-gray">{{ $t('recinfo.t2') }}</text>
                    </view>
                    <view class="item">
                        <text class="font-13 color-black font-weight" v-if="info.chain_network === 1">Tron(TRC20)</text>
                        <text class="font-13 color-black font-weight" v-if="info.chain_network === 2">Bitcoin(OMNI)
                        </text>
                        <text class="font-13 color-black font-weight" v-if="info.chain_network === 3">ETHEREUM(ERC20)
                        </text>
                    </view>
                </view>
                <view class="cell">
                    <view class="item">
                        <text class="font-13 color-gray">{{ $t('recinfo.t3') }}</text>
                    </view>
                    <view class="item">
                        <text class="font-13 color-black font-weight">{{ info.to }}</text>
                        <image :src="`/static/newImage/copy-${userTheme}.png`"
                               @click="copy(info.to)">
                        </image>
                    </view>
                </view>
                <view class="cell">
                    <view class="item">
                        <text class="font-13 color-gray">{{ $t('recinfo.t4') }}</text>
                    </view>
                    <view class="item">
                        <text
                            class="font-13 color-blue font-line font-weight" @click="open">
                            {{ info.txid }}
                        </text>
                        <image :src="`/static/newImage/copy-${userTheme}.png`"
                               @click="copy(info.txid)">
                        </image>
                    </view>
                </view>
                <view class="cell">
                    <view class="item">
                        <text class="font-13 color-gray">{{ $t('recinfo.t5') }}</text>
                    </view>
                    <view class="item">
                        <text class="font-13 color-black font-weight">{{ info.created_at }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
import {showToast} from "vant";
import {mapGetters} from 'vuex';

export default {
    components: {
        fuiNavBar
    },
    data() {
        return {
            info: {}
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    onReady() {
        var info = uni.getStorageSync('recharge');
        this.info = info;
    },
    methods: {
        copy(v) {
            uni.setClipboardData({
                data: v,
                success() {
                    uni.showToast({
                        icon: "success",
                        title: ""
                    })
                }
            })
        },
        open() {
            if (this.info.chain_network === 1) {
                plus.runtime.openURL("https://tronscan.org/#/transaction/" + this.info.txid)
            }
            if (this.info.chain_network === 3) {
                plus.runtime.openURL("https://etherscan.io/tx/" + this.info.txid)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "recordInfo.scss";
</style>