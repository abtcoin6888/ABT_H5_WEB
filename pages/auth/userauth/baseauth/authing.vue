<template>
    <view class="authing" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     color="var(--content-primary)"
                     background="var(--background-primary)">
        </fui-nav-bar>
        <view class="authing-container"
              :style="{'height': ($device.windowHeight - 260) + 'px'}">
            <image class="typeImage"
                   src="/static/img/shenhe.webp" mode="widthFix">
            </image>
            <text class="font-16 color-black font-bold">{{ $t('auths.t41') }}</text>
            <text class="font-13 color-gray">
                {{ $t('auths.t43') }}
            </text>
            <view class="close-button">
                <fui-button height="78rpx"
                            background="var(--content-primary)"
                            color="var(--background-primary)"
                            size="26"
                            radius="78rpx"
                            :text="$t('auths.t44')"
                            @click="close">
                </fui-button>
            </view>
        </view>
    </view>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        close() {
            uni.navigateBack({
                delta: 3
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.authing {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    &-container {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30rpx 60rpx;
        box-sizing: border-box;

        image {
            width: 70%;
            margin: 60rpx 0;
        }

        text {
            margin-top: 40rpx;
            text-align: center;
            line-height: 42rpx;
        }

        .close-button {
            width: 80%;
            margin-top: 60rpx;
        }
    }
}
</style>
