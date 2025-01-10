<template>
    <view class="about" :data-theme="userTheme">
        <fui-nav-bar background="var(--background-primary)"
                     color="var(--content-primary)"
                     statusBar
                     isFixed
                     isOccupy
                     :title="$t('about.us')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="header">
            <image class="logo" :src="config['logo']"></image>
            <text class="font-14 color-black">{{ list.app_version }}</text>
        </view>
        <view class="container">
            <view class="cell" @click="copy(list['twitter'])">
                <view class="cell-left">
                    <image src="/static/img/twitter.png"></image>
                    <text class="font-14 color-black">
                        Twitter
                    </text>
                </view>
                <view class="cell-right">
                    <text class="font-14 color-gray">
                        {{ list['twitter'] }}
                    </text>
                    <fui-icon name="arrowright" size="34" color="var(--content-tertiary)"></fui-icon>
                </view>
            </view>
            <view class="cell" @click="copy(list['facebook'])">
                <view class="cell-left">
                    <image src="/static/img/facebook.png"></image>
                    <text class="font-14 color-black">
                        Facebook
                    </text>
                </view>
                <view class="cell-right">
                    <text class="font-14 color-gray">
                        {{ list['facebook'] }}
                    </text>
                    <fui-icon name="arrowright" size="34" color="var(--content-tertiary)"></fui-icon>
                </view>
            </view>
            <view class="cell" @click="copy(list['instagram'])">
                <view class="cell-left">
                    <image src="/static/img/ins.png"></image>
                    <text class="font-14 color-black">
                        Instagram
                    </text>
                </view>
                <view class="cell-right">
                    <text class="font-14 color-gray">
                        {{ list['instagram'] }}
                    </text>
                    <fui-icon name="arrowright" size="34" color="var(--content-tertiary)"></fui-icon>
                </view>
            </view>
            <view class="cell" @click="copy(list['telegram'])">
                <view class="cell-left">
                    <image src="/static/img/tg.png"></image>
                    <text class="font-14 color-black">
                        Telegram
                    </text>
                </view>
                <view class="cell-right">
                    <text class="font-14 color-gray">
                        {{ list['telegram'] }}
                    </text>
                    <fui-icon name="arrowright" size="34" color="var(--content-tertiary)"></fui-icon>
                </view>
            </view>
        </view>
        <view class="footer-box">
            <text @click="checkUpdate()" class="font-14 color-primary">
                {{ $t('about.check') }}
            </text>
            <view class="_context">
                <text class="font-12 color-gray">
                    <text @click="$mroute.webview(1,'gywm',$t('about.us'))">
                        {{ config['site_name'] }}{{ $t('about.profile') }} |
                    </text>
                    <text @click="$mroute.webview(1,'yhxys',$t('about.xieyi'))">
                        {{ $t('about.xieyi') }} |
                    </text>
                    <text @click="$mroute.webview(1,'ysxy',$t('about.yszc'))">
                        {{ $t('about.yszc') }} |
                    </text>
                    <text @click="$mroute.webview(1,'mzsm',$t('about.mzsm'))">
                        {{ $t('about.mzsm') }}
                    </text>
                </text>
            </view>
        </view>
    </view>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import commonApi from '/common/api/common.js';

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
        ...mapState(['config', 'userTheme'])
    },
    methods: {
        checkUpdate() {
            uni.showToast({
                title: this.$t('about.zxbb'),
                icon: "none"
            })
        },
        copy(v) {
            uni.setClipboardData({
                data: v,
                success() {
                    uni.showToast({
                        title: this.$t('about.fzcg'),
                    })
                }
            })
        },
        getConfig() {
            commonApi.config(5).then(res => {
                this.list = res.data;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.about {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    .header {
        width: 100%;
        height: auto;
        padding: 40rpx 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .logo {
            width: 150rpx;
            height: 150rpx;
            border-radius: 16rpx;
            margin-bottom: 30rpx;
        }
    }

    .container {
        width: 100%;
        height: auto;

        .cell {
            width: 100%;
            height: 88rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30rpx;
            box-sizing: border-box;

            &-left {
                display: flex;
                align-items: center;

                image {
                    width: 46rpx;
                    height: 46rpx;
                    margin-right: 16rpx;
                }
            }

            &-right {
                @extend .cell-left;
            }
        }
    }

    .footer-box {
        width: 100%;
        height: auto;
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 20rpx 30rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        ._context {
            width: 90%;
            text-align: center;
            margin-top: 16rpx;
        }
    }
}
</style>
