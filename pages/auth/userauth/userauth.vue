<template>
    <view class="userAuth" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     :title="$t('usAuth.page_title')"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="userAuth-container">
            <view class="label">
                <view class="label-title">
                    <text class="font-14 color-black font-weight">
                        {{ $t('usAuth.card_t') }}
                    </text>
                    <view class="label-title-right" v-if="statusCode != -1">
                        <image :src="status[statusCode]['image']"></image>
                        <text class="font-13 color-primary font-weight">{{ status[statusCode]['title'] }}</text>
                    </view>
                </view>
                <view class="label-card">
                    <text class="font-13 color-gray description">
                        {{ $t('usAuth.card_c') }}
                    </text>
                    <view class="label-card-button" v-if="statusCode != 1">
                        <fui-button type="primary"
                                    height="78rpx"
                                    size="26"
                                    color="var(--background-primary)"
                                    background="var(--content-primary)"
                                    radius="78rpx"
                                    :text="$t('usAuth.btn_t')"
                                    @click="$mroute.baseauth()">
                        </fui-button>
                    </view>
                </view>
            </view>
            <view class="label">
                <view class="label-title">
                    <text class="font-14 color-black font-weight">
                        {{ $t('usAuth.card_t1') }}
                    </text>
                    <view class="label-title-right" v-if="hstatus != -1">
                        <image :src="status[hstatus]['image']"></image>
                        <text class="font-13 color-primary font-weight">{{ status[hstatus]['title'] }}</text>
                    </view>
                </view>
                <view class="label-card">
                    <text class="font-13 color-gray description">
                        {{ $t('usAuth.card_c1') }}
                    </text>
                    <template v-if="hstatus != 1">
                        <view class="label-card-button" v-if="hstatus != 1 && statusCode == 1">
                            <fui-button type="primary"
                                        height="78rpx"
                                        size="26"
                                        color="var(--background-primary)"
                                        background="var(--content-primary)"
                                        radius="78rpx"
                                        :text="$t('usAuth.btn_t')"
                                        @click="$mroute.authhight()">
                            </fui-button>
                        </view>
                        <view class="label-card-button" v-else>
                            <fui-button disabled
                                        type="primary"
                                        height="78rpx"
                                        size="26"
                                        color="var(--content-tertiary)"
                                        disabledBackground="var(--background-disabled)"
                                        radius="78rpx"
                                        :text="$t('usAuth.btn_not')"
                                        @click="$mroute.authhight()">
                            </fui-button>
                        </view>
                    </template>
                </view>
            </view>
            <!--  描述  -->
            <view class="label">
                <text class="font-14 color-black font-weight">
                    {{ $t('usAuth.card_t3') }}
                </text>
                <view class="label-content">
                    <text class="font-12 color-gray">
                        {{ $t('usAuth.card_c2') }}
                    </text>
                    <text class="font-12 color-gray">
                        {{ $t('usAuth.card_c3') }}
                    </text>
                </view>
            </view>
        </view>
        <alert ref="alert"
               @confirm="$mroute.login()"
               :title="this.$t('login.tip_t2')"
               :content="this.$t('usAuth.alert_con')">
        </alert>
    </view>
</template>

<script>
import {Button} from 'vant';
import user from '/common/api/user.js';
import area from '/common/area.js';

import {mapGetters} from 'vuex';

export default {
    components: {
        [Button.name]: Button
    },
    data() {
        return {
            status: [
                {
                    image: "",
                    title: this.$t('usAuth.type_c'),
                    class: "color-warring"
                },
                {
                    image: "/static/img/authsuc.webp",
                    title: this.$t('usAuth.type_c1'),
                    class: "color-success"
                },
                {
                    image: "/static/img/authfail.png",
                    title: this.$t('usAuth.type_c2'),
                    class: "color-warring"
                }
            ],
            statusCode: -1,
            hstatus: -1
        }
    },
    onLoad() {

    },
    onShow() {
        this.getInfo();
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        getInfo() {
            user.baseAuthInfo().then(res => {
                if (typeof res.data['id'] != 'undefined' && res.data['id']) {
                    this.statusCode = res.data['status'];
                    this.hstatus = res.data.img3 ? res.data['hstatus'] : -1;
                    this.$forceUpdate();
                }
                if (res.code != 200) {
                    this.$refs.alert.open();
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "userauth.scss";
</style>
