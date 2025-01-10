<template>
    <fui-bottom-popup background="var(--background-primary)"
                      :show="visible"
                      @close="handClose">
        <view class="popup-warp">
            <view class="title">
                <text>调整杠杆</text>
                <text @click="handClose">关闭</text>
            </view>
            <view class="content-box">
                <view class="input-warp">
                    <input type="text" :value="leverVal">
                    <view class="_right">
                        <text>X</text>
                        <text>最高倍数 {{ leverGroup[leverGroup.length-1] }}X</text>
                    </view>
                </view>
                <view class="slider-warp">
                    <slider :value="leverVal"
                            backgroundColor="var(--background-secondary)"
                            activeColor="var(--color-primary)"
                            block-size="20"
                            :min="leverGroup[0]"
                            :max="leverGroup[leverGroup.length-1]"
                            step="1"
                            @changing="leverChange"/>
                    <view class="slider-dot"
                          :class="{'slider-dot-active': leverVal > i}"
                          v-for="i in leverGroup"></view>
                    <view class="num-box">
                        <view class="slider-num" v-for="i in leverGroup">
                            <text>{{ i }}X</text>
                        </view>
                    </view>
                </view>
                <button class="button">
                    确定
                </button>
            </view>
        </view>
    </fui-bottom-popup>
</template>
<script>
export default {
    name: "strategicLeverage",
    props: {
        visible: {
            default: false,
            type: Boolean
        },
        leverVal: {
            default: 1,
            type: Number, String
        },
        leverGroup: {
            default: [],
            type: Array
        }
    },
    data() {
        return {}
    },
    methods: {
        handClose() {
            this.$emit('close', false)
        },
        leverChange(e) {
            this.$emit('leverChange', e)
        },
    }
}
</script>

<style lang="scss" scoped>
@import "strategicLeverage";
</style>