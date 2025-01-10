<template>
    <view class="secretLog" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('secrety.safety_record')"
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="secretLog-body">
            <view class="switchTab">
                <view class="tab-box">
                    <view class="item"
                          @click="active=0" :class="active == 0 ? 'active' : ''">
                        <text class="font-13">
                            {{ $t('secretlog.log_his') }}
                        </text>
                    </view>
                    <view class="item"
                          @click="active=1" :class="active == 1 ? 'active' : ''">
                        <text class="font-13">
                            {{ $t('secretlog.set_his') }}
                        </text>
                    </view>
                </view>
            </view>
            <scroll-view scroll-y="true"
                         show-scrollbar="false"
                         class="list-warp"
                         :style="`height: ${scrollHeight}px`">
                <template v-for="(item,index) in list" :key="item.id">
                    <view class="items">
                        <view class="items-image">
                            <image v-if="item.platform == 0"
                                   src="/static/img/phonel.png"
                                   mode="widthFix">
                            </image>
                            <image v-else
                                   src="/static/img/dn.png"
                                   mode="widthFix">
                            </image>
                        </view>
                        <view class="items-info">
                            <text class="font-14 color-black font-weight">
                                {{ item.device }}
                            </text>
                            <text class="font-12 color-gray">
                                {{ item.content }}｜IP：{{ item.ip }}
                            </text>
                            <text class="font-12 color-gray">
                                {{ item.created_at }}
                            </text>
                        </view>
                    </view>
                </template>
            </scroll-view>
        </view>
    </view>
</template>

<script>
import user from '/common/api/user.js';
import {mapGetters} from 'vuex';

var page = 1;
export default {
    data() {
        return {
            active: 0,
            list: [],
            navHeight: "",
            scrollHeight: ""
        }
    },
    onReady() {
        this.getList();
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    methods: {
        navInit(e) {
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            this.navHeight = e.height + e.statusBarHeight;
            this.scrollHeight = windowHeight - this.navHeight - 90;
        },
        getList() {
            uni.showLoading({
                title: 'loading'
            });
            user.secretLog(this.active == 0 ? 1 : 2, page).then(res => {
                uni.hideLoading();
                this.list = res.data.list;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.secretLog {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    &-body {
        width: 100%;
        height: auto;

        .switchTab {
            width: 100%;
            height: auto;
            padding: 30rpx;
            box-sizing: border-box;
            background: var(--background-primary);

            .tab-box {
                width: 100%;
                height: 80rpx;
                border-radius: 16rpx;
                padding: 8rpx;
                box-sizing: border-box;
                background-color: var(--background-secondary);
                display: flex;
                align-items: center;

                .item {
                    width: 50%;
                    height: 100%;
                    border-radius: 12rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    text {
                        color: var(--content-tertiary);
                    }
                }

                .active {
                    background-color: var(--border-strength-100);

                    text {
                        color: var(--content-primary);
                    }
                }
            }
        }

        .list-warp {
            width: 100%;
            height: auto;
            padding: 0 30rpx;
            box-sizing: border-box;

            .items {
                width: 100%;
                height: auto;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin-top: 30rpx;

                &-image {
                    width: 70rpx;

                    image {
                        width: 55rpx;
                    }
                }

                &-info {
                    width: calc(100% - 70rpx);
                    height: auto;
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }
}
</style>
