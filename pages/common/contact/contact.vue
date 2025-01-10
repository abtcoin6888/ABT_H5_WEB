<template>
    <view class="contact" :data-theme="userTheme">
        <fui-nav-bar background="var(--background-primary)"
                     color="var(--content-primary)"
                     statusBar
                     isFixed
                     isOccupy
                     :title="$t('index.connect')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="contact-container">
            <!-- <view class="contact-container-cell" @click="$mroute.webview(2,list.zxkf,$t('common.kefu'),100)">
                <view class="cell-left">
                    <text class="font-14 color-black">
                        {{ $t('contact.online_service') }}
                    </text>
                </view>
                <view class="cell-right">
                    <fui-icon name="arrowright" size="38" color="var(--content-tertiary)"></fui-icon>
                </view>
            </view> -->
            <view class="contact-container-cell">
                <view class="cell-left">
                    <text class="font-14 color-black">
                        {{ $t('contact.contact_email') }}
                    </text>
                </view>
                <view class="cell-right">
                    <text class="font-14 color-gray">
                        {{ list.lxyx }}
                    </text>
                    <fui-icon name="arrowright" size="38" color="var(--content-tertiary)"></fui-icon>
                </view>
            </view>
			
            <view class="contact-container-cell">
                <view class="cell-left">
                    <text class="font-14 color-black font-weight">
                        {{ $t('contact.feedback') }}
                    </text>
                </view>
                <view class="cell-right">
                    <text class="font-14 color-gray">
                        {{ list.wtfk }}
                    </text>
                    <fui-icon name="arrowright" size="38" color="var(--content-tertiary)"></fui-icon>
                </view>
            </view>
			
            <view class="contact-container-line"></view>
            <!-- <view class="contact-container-cell" @click="$mroute.webview(1,'sbsq',$t('contact.apply'))">
                <view class="cell-left">
                    <text class="font-14 color-black">
                        {{ $t('contact.apply') }}
                    </text>
                </view>
                <view class="cell-right">
                    <fui-icon name="arrowright" size="38" color="var(--content-tertiary)"></fui-icon>
                </view>
            </view> -->
        </view>
    </view>
</template>

<script>
import commonApi from '/common/api/common.js';
import config from '/common/api/config.js';
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex';

export default {
    data() {
        return {
            list: {}
        }
    },
    onShow() {
        this.getConfig();
    },
    computed: {
        ...mapGetters(['userTheme','config']),
    },
    methods: {
        getConfig() {
            commonApi.config(5).then(res => {
                this.list = res.data;
				console.log(this.list)
            })

        },
        copy(v) {
            uni.setClipboardData({
                data: v,
                success() {
                    uni.showToast({
                        title: "已复制"
                    })
                }
            })
        },
        notOpen() {
            uni.showToast({
                title: "暂未设置",
                icon: "none"
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.contact {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    &-container {
        width: 100%;
        height: auto;

        &-cell {
            width: 100%;
            height: 88rpx;
            padding: 0 30rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .cell-left {
                height: 88rpx;
                display: flex;
                align-items: center;

                text {
                    display: inline-block;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }

            .cell-right {
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
        }

        &-line {
            width: 100%;
            height: 16rpx;
            background: var(--background-secondary);
        }
    }
}
</style>
