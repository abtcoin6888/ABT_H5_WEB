<template>
    <view class="liveCoinAuto" :data-theme="userTheme" id="auto">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     :title="$t('livecoin.t1')"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <!--  -->
        <view class="liveCoinAuto-body">
            <view class="body-tip">
                <text class="font-12 color-gray">
                    {{$t("livecoin.t2")}}
                </text>
            </view>
            <view class="body-list">
                <view class="body-list-item" v-for="(item, index) in list" :key="index">
                    <view class="flex align-center">
                        <image :src="item.icon" mode="widthFix"></image>
                        <text class="font-14 color-black">
                            {{ item.symbol }}
                        </text>
                    </view>
                    <fui-switch
                        :scaleRatio="0.7"
                        color="var(--color-primary)"
                        :checked="item.oid || item.checked ? true : false"
                        @change="switchChange(index)">
                    </fui-switch>
                </view>
            </view>
        </view>
        <loading ref="loading"></loading>
        <alert ref="alert" ctxt="" :content="content"></alert>
    </view>
</template>
<script>
import Api from '@/common/api/deposit.js';

import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            list: [],
            content: ""
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    onShow() {
        this.getItems();
    },
    methods: {
        getItems() {
            Api.getItems().then(res => {
                this.list = res.data;
            });
        },
        switchChange(e) {
            this.$refs.loading.open();
            var _this = this;
            Api.changeAuto(_this.list[e]['id']).then(res => {
                _this.$refs.loading.close();
                if (res.code != 200) {
                    _this.content = res.message;
                    _this.$refs.alert.open();
                } else {
                    _this.content = "操作成功";
                    _this.$refs.alert.open();
                }
            }).catch((e) => {
                _this.$refs.loading.close();
                _this.content = "未知错误:".e;
                _this.$refs.alert.open();
            });
        }
    }
}
</script>
<style lang="scss">
@import "auto.scss";
</style>

<style scoped>
/deep/ .uni-toast {
    background-color: #333;
}

/deep/ .uni-toast__content {
    font-size: 26rpx;
    margin-top: 20rpx;
}

/deep/ .uni-toast__icon {
    width: 36px !important;
    height: 36px !important;
}
</style>