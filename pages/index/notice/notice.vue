<template>
    <view class="notice" :data-theme="userTheme">
        <fui-nav-bar background="var(--background-primary)"
                     color="var(--content-primary)"
                     statusBar
                     isFixed
                     isOccupy
                     :title="$t('home.t64')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="notice-contianer">
            <view class="notice-contianer-item" v-for="(item,index) in list" :key="item.id">
                <view class="time">
                    <text class="font-12 color-gray">
                        {{ item['created_at'] }}
                    </text>
                </view>
                <view class="card" @click="$mroute.webview(1,item.id,item.title)">
                    <text class="font-14 color-black">
                        {{ item['title'] }}
                    </text>
                    <text class="font-12 color-gray">
                        {{ item['subtitle'] }}
                    </text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import commonApi from '/common/api/common.js';

var page = 1;
export default {
    data() {
        return {
            list: []
        }
    },
    onShow() {
        this.getList();
    },
    methods: {
        getList() {
            commonApi.getNoticeList(page).then(res => {
                this.list = res.data;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.notice {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    &-contianer {
        width: 100%;
        height: auto;
        padding: 30rpx;
        box-sizing: border-box;

        &-item {
            width: 100%;
            height: auto;
            margin-bottom: 30rpx;

            .time {
                width: 100%;
                height: 88rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 10rpx;
            }

            .card {
                width: 100%;
                height: auto;
                padding: 30rpx;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                border-radius: 16rpx;
                background: var(--background-secondary);

                text:nth-of-type(2) {
                    margin-top: 10rpx;
                    line-height: 38rpx;
                }
            }
        }
    }
}
</style>
