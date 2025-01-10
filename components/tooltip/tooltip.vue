<template>
    <fui-bottom-popup :show="show"
                      background="var(--background-primary)">
        <view class="tooltip">
            <view class="tooltip-title">
                <text class="font-16 font-weight color-black">{{ title }}</text>
                <fui-icon name="close"
                          size="56"
                          color="var(--content-primary)"
                          @click="handClose"></fui-icon>
            </view>
            <view class="tooltip-container">
                <text class="font-14 color-black">{{ content }}</text>
                <slot name="custom-content"></slot>
            </view>
        </view>
    </fui-bottom-popup>
</template>
<script>
export default {
    name: "tooltip",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        }
    },
    data() {
        return {}
    },
    methods: {
        handClose() {
            this.$emit('close')
        }
    },
}
</script>
<style lang="scss"
       scoped>
.tooltip {
    width: 100%;
    height: auto;

    &-title {
        width: 100%;
        height: 88rpx;
        padding: 0 30rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;

        &:before {
            content: "";
            display: block;
            width: 100%;
            height: 2rpx;
            background: var(--border-strength-100);
            opacity: 0.35;
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }

    &-container {
        width: 100%;
        height: auto;
        padding: 30rpx 30rpx 60rpx 30rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        text {
            line-height: 42rpx;
            margin-bottom: 24rpx;
        }
    }
}
</style>