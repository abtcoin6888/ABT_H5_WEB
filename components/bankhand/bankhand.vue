<template>
    <fui-bottom-popup :show="show"
                      :background="themeColor[userTheme == 'light' ? 0 : 1]">
        <view class="layer-warp bg-white">
            <view class="title-warp border-bottom">
                <text class="font-16 font-weight color-black">
                    {{$t('newcontract.t47') }}
                </text>
                <fui-icon name="close"
                          size="52"
                          :color="themeColor[userTheme == 'light' ? 1 : 0]"
                          @click="handClose">
                </fui-icon>
            </view>
            <view class="popup-container">
                <text class="font-13 color-black">
                    {{$t('newcontract.t48') }}.
                </text>
                <view class="check-box-warp"
                      @click="checked = !checked">
                    <view class="check-box bg-dark border-solid"
                          :class="{'border-primary bg-green': checked}">
                        <image class="check-icon"
                               src="/static/img/tactic/check-s.png"
                               mode="widthFix"
                               v-if="checked">
                        </image>
                    </view>
                    <text class="font-11 color-gray">
                        {{$t('newcontract.t49') }}
                    </text>
                </view>
                <view class="confirm-button bg-black"
                      @click="onConfirmClick">
                    <text class="font-14 color-white font-weight">
                        {{$t('hand.confirm_t') }}
                    </text>
                </view>
            </view>
        </view>
    </fui-bottom-popup>
</template>
<script>
import {
    mapGetters
} from 'vuex';

import {
    initVueI18n
} from '@dcloudio/uni-i18n'
import en from '@/local/en.json';
import zh_Hant from "@/local/zh-Hant.json"
import ja from '@/local/ja.json'
import ko from '@/local/ko.json'

const messages = {
    en,
    'zh-Hant': zh_Hant,
    'ja': ja,
    'ko': ko
}
const localLang = uni.getStorageSync('lang');
const i18n = initVueI18n(typeof localLang != 'undefined' && localLang !== '' ? localLang : 'en', messages);

export default {
    name: "bank-hand-popup",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    data() {
        return {
            themeColor: ["#ffffff", "#111111"],
            checked: false
        }
    },
    methods: {
        handClose() {
            this.$emit('close')
        },
        onConfirmClick() {
            this.$emit('confirm',this.checked)
        },
        $t(key){
            return i18n.t(key);
        }
    }
}
</script>

<style scoped>
@import "bankhand.css";
</style>