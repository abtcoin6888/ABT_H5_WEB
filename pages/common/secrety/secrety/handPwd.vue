<template>
    <view class="gestureUnlocking" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     :title="$t('hand.page_title')"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>

        <view class="unlock-body">
            <view class="unlock-body-title">
                <text class="font-16 color-black font-weight">
                    {{ title }}
                </text>
            </view>
            <view class="unlock-body-container">
                <hackout-draw-lock
                    :width='width'
                    background="rgba(0, 0, 0, 0)"
                    :circle-width="100"
                    line-color="rgba(226, 83, 85, 1)"
                    line-background="rgba(226, 83, 85, 0.5)"
                    :height='height'
                    @start="startDraw"
                    @change="complet"
                ></hackout-draw-lock>
            </view>
            <view class="unlock-body-buttons">
                <fui-button height="78rpx"
                            radius="78rpx"
                            size="26"
                            color="var(--background-primary)"
                            background="var(--content-primary)"
                            :text="$t('hand.confirm_t')"
                            @click="$refs.authpop.open()"></fui-button>
            </view>
        </view>

        <authPop ref="authpop" :title="this.$t('authPop.input_phoneCode')"></authPop>
    </view>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            width: this.$device.windowWidth * 0.9,
            height: 300,
            num: 0,
            first: [],
            second: [],
            title: this.$t('hand.page_c')
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        complet(e) {
            if (this.num == 0) {
                this.first = e;
                this.title = this.$t('hand.tip_c1');
                this.num = 1;
                return;
            }
            if (this.num == 1) {
                this.second = e;
                this.num = 2;
                console.log(this.first.join(''), this.second.join(''));
                if (this.first.join('') == this.second.join('')) {
                    this.title = this.$t('hand.tip_c3');
                    this.$refs.authpop.open();
                } else {
                    this.title = this.$t('hand.tip_c2');
                    this.num = 0;
                    this.first = [];
                    this.second = [];
                }
            }
        },
        startDraw(e) {

        }
    }
}
</script>

<style lang="scss" scoped>
.gestureUnlocking {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    .unlock-body {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 100rpx 30rpx;
        box-sizing: border-box;

        &-title {
            width: 100%;
            height: auto;
            text-align: center;
        }

        &-container {
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 40rpx;
        }

        &-buttons {
            width: 100%;
            height: auto;
            padding: 80rpx 30rpx;
            box-sizing: border-box;
            position: fixed;
            bottom: 0;
            left: 0;
        }
    }
}
</style>
