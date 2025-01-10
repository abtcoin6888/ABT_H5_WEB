<template>
    <view class="message-warp bg-white"
          :data-theme="userTheme">
        <fui-nav-bar zIndex="9"
                     :title="$t('message.t1')"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     statusBar
                     isFixed
                     isOccupy
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>

        <view class="container">
            <view class="item"
                  v-for="(item,index) in list"
                  :key="index">
                <view class="flex align-center justify-center">
                    <text class="font-12 color-gray">{{ item.created_at }}</text>
                </view>
                <view class="message-box bg-gray">
                    <view>
                        <text class="font-14 color-black font-weight">
                            {{ item.title }}
                        </text>
                    </view>
                    <view class="mt-10">
                        <text class="font-12 color-gray">
                            {{ item.content }}
                        </text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import Api from '@/common/api/common.js';

import {mapGetters} from 'vuex';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";

export default {
    components: {fuiNavBar},
    data() {
        return {
            list: []
        }
    },
    onShow() {
        this.getMessage();
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        getMessage() {
            Api.getMessage().then(res => {
                this.list = res.data.list;
            });
        }
    }
}
</script>

<style scoped>
.message-warp {
    width: 100%;
    /* #ifndef APP-NVUE */
    min-height: 100vh;
    background: var(--background-primary);
    /* #endif */

    .container {
        width: 100%;
        padding: 30rpx;
        /* #ifndef APP-NVUE */
        height: auto;
        box-sizing: border-box;
        /* #endif */

        .item {
            width: 100%;
            /* #ifndef APP-NVUE */
            height: auto;
            /* #endif */
            margin-bottom: 30rpx;

            .message-box {
                margin-top: 24rpx;
                width: 100%;
                padding: 30rpx;
                /* #ifndef APP-NVUE */
                height: auto;
                box-sizing: border-box;
                background: var(--background-secondary);
                /* #endif */
                border-radius: 8rpx;
            }
        }
    }
}
</style>
