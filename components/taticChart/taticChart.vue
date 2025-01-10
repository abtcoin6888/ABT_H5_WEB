<template>
    <view class="kline"
          id="kline"
          ref="kline"
          :style="`width: ${width}rpx; height: ${height}rpx`"
          :chartdata="chartdata"
          :change:chartdata="render.updateChartData">
    </view>
</template>
<script>
export default {
    name: "taticChart",
    props: {
        width: {
            type: [Number, String],
            default: 200
        },
        height: {
            type: [Number, String],
            default: 100
        },
        chartdata: {
            type: Array,
            required: true,
            default: []
        }
    },
    data() {
        return {
        }
    },
    mounted() {

    },
    methods: {

    },
}
</script>
<script module="render"
        lang="renderjs">
import controller from './render.js';
export default controller;
</script>
<style scoped>
.kline {
    width: 100%;
    height: 100%;
}
</style>