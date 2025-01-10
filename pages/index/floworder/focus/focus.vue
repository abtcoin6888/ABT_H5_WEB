<template>
    <view class="focus" :data-theme="userTheme">
        <fui-nav-bar zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('myFollow.my_focus')"
                     statusBar isFixed isOccupy
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>

        <view class="focus-body">
            <view class="focus-body-cell" v-for="i in 2">
                <fui-avatar width="100"
                            height="100"
                            background="var(--background-secondary)"
                            src="/static/img/davatar.webp">
                </fui-avatar>
                <view class="focus-body-cell-info">
                    <view class="flex flex-column left">
                        <text class="font-14 color-black font-weight">
                            User Nickname
                        </text>
                        <text class="font-12 color-gray">
                            9171 {{ $t('focus.fan') }}
                        </text>
                        <text class="font-12 color-gray">
                            0 {{ $t('tradeInfo.focus_on') }}
                        </text>
                    </view>
                    <view class="focus-button button-active"
                          :class="focusType ? 'followed' : 'not-focus'"
                          @click="focusType = !focusType">
                        <text class="font-13"
                              :class="focusType ? 'color-gray' : 'color-white'">
                            {{ focusType ? $t('focus.already_follow') : '关注' }}
                        </text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>

import {mapGetters} from 'vuex';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";

export default {
    components: {
        fuiNavBar
    },
    data() {
        return {
            focusType: false
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
.focus {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    &-body {
        width: 100%;
        height: auto;
        padding: 30rpx;
        box-sizing: border-box;

        &-cell {
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30rpx;

            &-info {
                width: calc(100% - 130rpx);
                height: auto;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .left {
                    text {
                        margin-top: 6rpx;

                        &:first-of-type {
                            margin-top: 0;
                        }
                    }
                }
            }

            .focus-button {
                min-width: 145rpx;
                height: 64rpx;
                padding: 0 20rpx;
                box-sizing: border-box;
                border-radius: 10rpx;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .not-focus {
                background: var(--content-primary);
            }

            .followed {
                background: var(--background-secondary);
            }
        }
    }
}
</style>
