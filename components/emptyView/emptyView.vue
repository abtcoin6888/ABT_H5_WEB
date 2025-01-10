<template>
    <view v-if="visible"
          class="not-data"
          :style="`width:${width}rpx;height:${height}rpx`">
        <fui-empty width="160"
                   height="160"
                   :size="26"
                   color="#898989"
                   :src="`/static/img/tactic/not_data-${userTheme}.png`"
                   :title="title">
            <slot name="custom-content"></slot>
        </fui-empty>
    </view>
</template>
<script>
import {
    mapGetters
} from 'vuex';

export default {
    name: "emptyView",
    props: {
        visible: {
            default: false,
            type: Boolean
        },
        width: {
            default: 200,
            type: Number
        },
        height: {
            default: 150,
            type: Number
        },
        title: {
            default: "",
            type: String
        }
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    data() {
        return {}
    }
}
</script>

<style scoped>
.not-data {
    display: flex;
    align-items: center;
    justify-content: center;
}

/deep/.fui-empty__title {
    width: 670rpx;
    text-align: center;
}
</style>