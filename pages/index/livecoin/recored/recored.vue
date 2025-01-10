<template>
    <view class="recoredPage" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     :title="$t('dps.t1')"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="container">
            <view class="container-cell" v-for="(item,index) in list" :key="index">
                <view class="container-cell-item">
                    <image :src="item.icon" mode="widthFix"></image>
                    <text class="font-14 color-black font-weight">
                        {{ item.symbol }}
                    </text>
                </view>
                <view class="container-cell-item">
                    <text class="font-13 color-black font-weight">
                        {{ $util.float(item.amount == null ? 0 : item.amount) }}
                    </text>
                </view>
<!--                <view class="container-cell-item">-->
<!--                    <text class="font-13 color-blue font-weight" @click="back(index)">-->
<!--                        {{ $t('dps.t2') }}-->
<!--                    </text>-->
<!--                </view>-->
            </view>
        </view>
<!--        <uni-popup type="bottom" ref="type">-->
<!--            <view class="popup-warp">-->
<!--                <view class="popup-warp-title">-->
<!--                    <text class="font-16 font-weight color-black">{{ $t('dps.t3') }}</text>-->
<!--                    <view class="close-icon" @click="this.$refs.type.close()">-->
<!--                        <fui-icon name="close" size="48" color="var(&#45;&#45;content-primary)"></fui-icon>-->
<!--                    </view>-->
<!--                </view>-->
<!--                <view class="popup-warp-container">-->
<!--                    <view class="bg-gray radus-5 pd-15" @click="active=1">-->
<!--                        <view class="flex">-->
<!--                            <view style="width: 20%;" class="flex acenter">-->
<!--                                <image :src="active===1?'/static/img/blue-gou-sm.png':'/static/white-gou-sm.png'"-->
<!--                                       style="width: 20px;height: 20px;" mode=""></image>-->
<!--                            </view>-->
<!--                            <view style="width: 80%;">-->
<!--                                <view>-->
<!--                                    <text class="font-14 font-weight color-black">T+1 {{ $t('dps.t4') }}</text>-->
<!--                                </view>-->
<!--                                <view class="mt-5">-->
<!--                                    <text class="font-12 color-gray">-->
<!--                                        {{ $t('dps.t5') }}-->
<!--                                    </text>-->
<!--                                </view>-->
<!--                            </view>-->
<!--                        </view>-->
<!--                    </view>-->

<!--                    <view class="bg-gray radus-5 pd-15 mt-15" @click="active=2">-->
<!--                        <view class="flex">-->
<!--                            <view style="width: 20%;" class="flex acenter">-->
<!--                                <image :src="active===2?'/static/img/blue-gou-sm.png':'/static/white-gou-sm.png'"-->
<!--                                       style="width: 20px;height: 20px;" mode=""></image>-->
<!--                            </view>-->
<!--                            <view style="width: 80%;">-->
<!--                                <view>-->
<!--                                    <text class="font-14 font-weight color-black">{{ $t('dps.t6') }}</text>-->
<!--                                </view>-->
<!--                                <view class="mt-5">-->
<!--                                    <text class="font-12 color-gray">-->
<!--                                        {{ $t('dps.t7') }}-->
<!--                                    </text>-->
<!--                                </view>-->
<!--                            </view>-->
<!--                        </view>-->
<!--                    </view>-->
<!--                    <view class="mt-15">-->
<!--                        <button @click="confirm" class="defaultBtn bg-black color-white border-none font-13 font-weight">-->
<!--                            {{ $t('dps.t8') }}-->
<!--                        </button>-->
<!--                    </view>-->
<!--                </view>-->
<!--            </view>-->
<!--        </uni-popup>-->
        <alert ref="alert" :content="content" :ctxt="$t('取消')"></alert>
    </view>
</template>

<script>
import Api from '@/common/api/deposit.js';

import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            list: [],
            active: 0,
            bindex: 0,
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
        confirm() {
            uni.showLoading();
            Api.back({did: this.list[this.bindex]['oid'], type: this.active === 1 ? 1 : 0}).then(res => {
                uni.hideLoading();
                this.$refs.type.close();
                this.content = this.$t('dps.t9');
                this.$refs.alert.open();
                setTimeout(() => {
                    this.getItems();
                }, 1500);
            }).catch((e) => {
                uni.hideLoading();
            })
        },
        back(i) {
            if (this.list[i]['amount'] === null || parseFloat(this.list[i]['amount']) <= 0) {
                return false;
            }
            this.bindex = i;
            this.$refs.type.open();
        },
        getItems() {
            Api.getItems().then(res => {
                this.list = res.data;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "recored";
</style>