<template>
    <view class="apply" :data-theme="userTheme">
        <fui-nav-bar zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     statusBar isFixed isOccupy
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>

        <view class="apply-body">
            <view class="apply-body-banner">
                <view class="apply-body-banner-info">
                    <text class="font-16 color-black font-bold">
                        {{ $t('follow.become_expert') }}
                    </text>
                    <text class="font-16 color-primary font-bold">
                        {{ $t('apply.to_earn') }} 10% {{ $t('apply.profit_sh') }}
                    </text>
                    <text class="font-13 color-gray">
                        {{ $t('apply.en_mode') }}
                    </text>
                </view>
                <image class="apply-body-banner-bg" src="/static/img/flutter_apply_trader_0_light.png"
                       mode="widthFix"></image>
            </view>
            <view class="apple-body-label mt-15">
                <text class="font-13 color-black font-weight">
                    {{ $t('apply.unique') }}
                </text>
            </view>
            <view class="apply-body-card mt-15">
                <image src="/static/img/flutter_apply_trader_2_light.png" mode="widthFix"></image>
                <view class="apply-body-card-info">
                    <text class="font-14 color-black font-weight">
                        {{ $t('apply.card_ct') }}
                    </text>
                    <text class="font-12 color-gray mt-5">
                        {{ $t('apply.card_ct1') }}
                    </text>
                </view>
            </view>
            <view class="apply-body-card mt-15">
                <image src="/static/img/flutter_apply_trader_3_light.png" mode="widthFix"></image>
                <view class="apply-body-card-info">
                    <text class="font-14 color-black font-weight">
                        {{ $t('apply.card_ct2') }}
                    </text>
                    <text class="font-12 color-gray mt-5">
                        {{ $t('apply.card_ct3') }}
                    </text>
                </view>
            </view>
            <view class="apply-body-card mt-15">
                <image src="/static/img/flutter_apply_trader_4_light.png" mode="widthFix"></image>
                <view class="apply-body-card-info">
                    <text class="font-14 color-black font-weight">
                        {{ $t('apply.card_ct4') }}
                    </text>
                    <text class="font-12 color-gray mt-5">
                        {{ $t('apply.card_ct5') }}
                    </text>
                </view>
            </view>
            <view class="apply-body-label mt-15">
                <text class="font-16 color-black font-weight">
                    {{ $t('confirm.profit_ratio') }}
                </text>
                <text class="font-13 color-gray mt-10">
                    {{ $t('apply.card_ct6') }}
                </text>
                <text class="font-13 color-primary font-weight mt-10">
                    {{ selectOption[0] }}%
                </text>
                <text class="font-13 color-gray mt-10">
                    {{ $t('apply.card_lock') }} USDT
                </text>
                <text class="font-13 color-black font-weight mt-10">
                    {{ selectOption[1] }}
                </text>
            </view>
            <view class="apply-body-tagwarp">
                <view class="tag-image">.
                    <view class="dots" :class="`dots-${active}`">
                        <text></text>
                    </view>
                </view>
                <view class="tag-group">
                    <view class="tag"
                          :class="active === index ? 'tag-active' : ''" v-for="(item,index) in tagGroup" :key="index"
                          @click="tagToggle(item,index)">
                        <text class="font-13"
                              :class="active === index ? 'color-black' : 'color-gray'">
                            {{ item.rate }}%
                        </text>
                    </view>
                </view>
            </view>
            <view class="apply-body-label mt-15">
                <text class="font-12 color-gray">
                    {{ $t('apply.card_ct8') }}
                </text>
                <text class="font-12 color-gray mt-10">
                    {{ $t('apply.card_ct9') }}
                </text>
            </view>
        </view>

        <view class="apply-footer">
            <view class="apply-footer-cell">
                <view class="checkbox-label" @click="checked = !checked"  >
                    <view class="checkbox">
                        <image src="/static/img/tactic/check-s.png"
                               mode="widthFix"
                               v-if="checked">
                        </image>
                    </view>
                    <text class=" font-12 color-black">
                        {{ $t('apply.read') }}
                    </text>
                    <text class="font-12 color-primary">
                        {{ $t('apply.ex_agreement') }}
                    </text>
                </view>
            </view>
            <view class="apply-footer-button">
                <fui-button height="78rpx"
                            radius="78rpx"
                            size="26"
                            color="var(--background-primary)"
                            background="var(--content-primary)"
                            @click="$mroute.applyForm()">
                    {{ $t('login.next') }}
                </fui-button>
            </view>
        </view>
    </view>
</template>

<script>

import {mapGetters} from 'vuex';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";

export default {
    components: {
        fuiNavBar
    },
    data() {
        return {
            active: 0,
            selectOption: ['4', '1000'],
            tagGroup: [{
                rate: '4',
                val: '1000',
            }, {
                rate: '6',
                val: '2000',
            }, {
                rate: '8',
                val: '3000',
            }, {
                rate: '10',
                val: '4000',
            }],
            checked: false
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        tagToggle(item, index) {
            this.active = index;
            this.selectOption[0] = item.rate;
            this.selectOption[1] = item.val;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "apply";
</style>
