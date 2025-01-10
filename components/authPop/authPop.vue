<template>
    <view class="authPop" :data-theme="userTheme">
        <uni-popup ref="popup" type="bottom" :mask-background-color="'var(--mask-bakground-bg)'" :mask-click="false"
                   :is-mask-click="false">
            <view class="authPanel">
                <view class="authPanel-conbox">
                    <view class="title">
                        <text class="font-16 font-weight color-black">{{ $t('authPop.safety_ver') }}</text>
                        <view class="close">
                            <fui-icon name="close" size="48" :color="'var(--black)'" @click="close()"></fui-icon>
                        </view>
                    </view>
                    <view class="input-label">
                        <text class="font-13 color-black">{{ title + ' ' + $t('authPop.ver_code') }}</text>
                        <view class="input-box mt-10">
                            <input type="number"
                                   maxlength="6"
                                   v-model="code"
                                   :placeholder="this.$t('authPop.enter_code')"
                                   placeholder-class="placeholder"/>
                            <text class="font-13 color-primary font-weight" @click="resend()">{{ txt }}</text>
                        </view>
                    </view>
                    <view class="button-box">
                        <fui-button @click="confirm()"
                                    height="78rpx"
                                    radius="78rpx"
                                    size="26"
                                    :background="code.length >= 6 ? 'var(--content-primary)' : 'var(--background-secondary)'"
                                    :color="code.length >= 6 ? 'var(--background-primary)' : 'var(--content-tertiary)'"
                                    :text="$t('hand.confirm_t')">
                        </fui-button>
                    </view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
import {mapGetters} from 'vuex';

var time = 300;
var set;
export default {
    name: "authPop",
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            onFocus: false,
            txt: this.$t('authPop.resend'),
            code: ""
        };
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        confirm() {
            console.log(this.code);
            if (this.code.length > 5) {
                this.$emit('callback', this.code);
            }
        },
        resend() {
            this.$emit('resend', true);
            clearInterval(set);
            time = 300;
            this.initTime();
        },
        initTime() {
            var _this = this;
            time = 300;
            set = setInterval(() => {
                if (time <= 0) {
                    clearInterval(set);
                    this.txt = _this.$t('authPop.resend');
                }
                this.txt = time + 's';
                time--;
            }, 1000);
        },
        open() {
            this.$refs.popup.open();
            this.initTime();
        },
        close() {
            this.$refs.popup.close();
        }
    }
}
</script>

<style lang="scss" scoped>
.authPanel {
    width: 100%;
    height: 500rpx;
    background-color: var(--background-primary);
    border-radius: 24rpx 24rpx 0 0;

    .authPanel-conbox {
        width: 100%;
        height: auto;
        padding: 30rpx;
        box-sizing: border-box;

        .title {
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            .close {
                position: absolute;
                right: 0;
            }
        }

        .input-label {
            width: 100%;
            height: auto;
            padding: 30rpx 0;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;

            .input-box {
                width: 100%;
                height: 78rpx;
                padding: 0 16rpx;
                box-sizing: border-box;
                border-radius: 8rpx;
                background-color: var(--background-secondary);
                border: 2rpx solid var(--background-secondary);
                display: flex;
                align-items: center;
                justify-content: space-between;

                input {
                    width: calc(100% - 140rpx);
                    height: 78rpx;
                    line-height: 78rpx;
                    border: none;
                    outline: none;
                    font-size: 26rpx;
                    color: var(--content-primary);
                }

                &:focus-within {
                    border-color: var(--color-primary);
                }
            }
        }

        .button-box {
            width: 100%;
            height: auto;
            margin-top: 70rpx;
        }
    }
}
</style>