<template>
    <view class="check-box-label"
          @click="changeChecked">
        <view class="check-box bg-gray">
            <image class="check-image"
                   :src="src"
                   mode="widthFix"
                   v-if="checked"></image>
        </view>
        <text class="check-text font-12 font-weight color-black">
            {{ text }}
        </text>
    </view>
</template>
<script>
export default {
    name: "labelCheckBox",
    props: {
        checked: {
            type: [Boolean, String],
            default: false,
            required: true
        },
        text: {
            type: String,
            default: ""
        },
        src: {
            type: String,
            default: "/static/img/tactic/check-s.png"
        }
    },
    data() {
        return {}
    },
    methods: {
        changeChecked() {
            this.$emit('change')
        }
    },
}
</script>

<style scoped>
.check-box-label {
    /* #ifndef APP-NVUE	*/
    display: inline-flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.check-box {
    width: 30rpx;
    height: 30rpx;
    border-radius: 8rpx;
    overflow: hidden;
    margin-right: 16rpx;
}

.check-image {
    width: 30rpx;
    height: 30rpx;
    border-radius: 8rpx;
}
</style>