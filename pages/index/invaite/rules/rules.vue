<template>
    <view class="rules" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     :title="this.$t('rules.page_title')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="container">
            <view class="pd-15">
                <view class="bg-white pd-15 radius-card">
                    <view>
                        <text class="font-14 font-weight color-black">{{ $t('rules.con_t') }}</text>
                    </view>
                    <view class="mt-15 content-text-wrap">
                        <text class="font-12 color-black mb-10 block color-black">
                            {{ $t('rules.con_c') }}
                        </text>
                        <text class="font-12 color-black mb-10 block" style="display: block;">
                            {{ $t('rules.con_c1') }}
                        </text>
                        <text class="font-12 color-black mb-10 block" style="display: block;">
                            {{ $t('rules.con_c2') }}
                        </text>
                        <text class="font-12 color-black mb-10 block">
                            {{ $t('rules.con_c3') }}
                        </text>
                    </view>
                    <view class="mt-15">
                        <text class="font-14 font-weight color-black">{{ $t('rules.con_t1') }}</text>
                    </view>
                    <view class="mt-15 content-text-wrap">
                        <text class="font-12 color-black mb-10 block">
                            {{ $t('rules.con_c4') }}
                        </text>
                        <text class="font-12 color-black  mb-10 block" style="display: block;">
                            {{ $t('rules.con_c5') }}
                        </text>
                        <text class="font-12 color-black block mb-10" style="display: block;">
                            {{ $t('rules.con_c6') }}
                        </text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"

export default {
    components: {
        fuiNavBar
    },
    data() {
        return {}
    },
    methods: {}
}
</script>

<style>
.rules {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);
}

.container {
    background-color: var(--background-primary);
}

.content-text-wrap text {
    line-height: 32rpx;
}

.bg-white {
    background: var(--background-secondary) !important;
}

.radius-card {
    border-radius: 16rpx;
}
</style>
