<template>
    <view class="setting" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('index.security_center')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="container-box">
            <!-- email-->
            <view class="container-box-cell flex align-center justify-between"
                  @click="$mroute.phoneAuth(!userEmail ? 0:1,'email')">
                <view class="cell-left flex align-center">
                    <text class="font-14 color-black">
                        {{ $t('secrety.email_ver') }}
                    </text>
                </view>
                <view class="flex align-center justify-end cell-right">
                    <text class="font-14 color-gray">
                        {{ !userEmail ? this.$t('secrety.binding_status') : userEmail }}
                    </text>
                    <fui-icon name="arrowright" 
                              size="34" 
                              color="var(--content-tertiary)">
                    </fui-icon>
                </view>
            </view>
            <!-- userPhone-->
            <view class="container-box-cell flex align-center justify-between"
                  @click="$mroute.phoneAuth(!userPhone ? 0:1,'phone')">
                <view class="cell-left flex align-center">
                    <text class="font-14 color-black">
                        {{ $t('secrety.phone_ver') }}
                    </text>
                </view>
                <view class="flex align-center justify-end cell-right">
                    <text class="font-14 color-gray">
                        {{ !userPhone ? this.$t('secrety.binding_status') : userPhone }}
                    </text>
                    <fui-icon name="arrowright"
                              size="34"
                              color="var(--content-tertiary)">
                    </fui-icon>
                </view>
            </view>
            <!-- google_ver-->
            <view class="container-box-cell flex align-center justify-between"
                  @click="$mroute.openGooleAuth()">
                <view class="cell-left flex align-center">
                    <text class="font-14 color-black">
                        {{ $t('secrety.google_ver') }}
                    </text>
                </view>
                <view class="flex align-center justify-end cell-right">
                    <text class="font-14 color-gray">
                        {{ !googleCode ? this.$t('secrety.binding_status') : $t('google.modify_bind') }}
                    </text>
                    <fui-icon name="arrowright"
                              size="34"
                              color="var(--content-tertiary)">
                    </fui-icon>
                </view>
            </view>
            <view class="container-box-line"></view>
            <!-- newpwd-->
            <view class="container-box-cell flex align-center justify-between"
                  @click="$mroute.newpwd()">
                <view class="cell-left flex align-center">
                    <text class="font-14 color-black">
                        {{ $t('secrety.log_pwd') }}
                    </text>
                </view>
                <view class="flex align-center justify-end cell-right">
                    <fui-icon name="arrowright"
                              size="34"
                              color="var(--content-tertiary)">
                    </fui-icon>
                </view>
            </view>
            <view class="container-box-line"></view>
            <!-- safety_record-->
            <!-- <view class="container-box-cell flex align-center justify-between"
                  @click="$mroute.secretlog()">
                <view class="cell-left flex align-center">
                    <text class="font-14 color-black">
                        {{ $t('secrety.safety_record') }}
                    </text>
                </view>
                <view class="flex align-center justify-end cell-right">
                    <fui-icon name="arrowright"
                              size="34"
                              color="var(--content-tertiary)">
                    </fui-icon>
                </view>
            </view>
            <view class="container-box-line"></view> -->
            <!-- safety_record-->
            <!-- <view class="container-box-cell flex align-center justify-between"
                   @click="setAuth(item)">
               <view class="cell-left flex align-center">
                 <text class="font-14 color-black font-weight">
                   {{ $t('secrety.log_out') }}
                 </text>
               </view>
               <view class="flex align-center justify-end cell-right">
                 <fui-icon name="arrowright" size="34" color="var(--content-tertiary)"></fui-icon>
               </view>
             </view> -->
        </view>
    </view>
    <authpwd ref="authpwd" @callback="authCall"></authpwd>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';

export default {
    data() {
        return {
            supportMode: []
        }
    },
    onReady() {
        // #ifdef APP-PLUS
        let _this = this;
        uni.checkIsSupportSoterAuthentication({
            success(e) {
                console.log(e);
                _this.supportMode = e.supportMode;
            }
        });
        // #endif
    },
    onShow() {

    },
    computed: {
        ...mapGetters(['userPhone', 'userEmail', 'googleCode', 'userTheme']),
        ...mapState(['userinfo'])
    },
    methods: {
        setAuth(type) {
            console.log(type);
            uni.startSoterAuthentication({
                requestAuthModes: [type],
                challenge: "test",
                success(e) {
                    console.log(e);
                }
            });
        },
        authCall(e) {
            console.log(e);
        },
        openAuth() {
            this.$refs.authpwd.open();
        }
    }
}
</script>

<style>
.line {
    width: 100%;
    height: 5px;
    background-color: #eee;
}
</style>


<style lang="scss" scoped>
.setting {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    .container-box {
        width: 100%;
        height: auto;

        &-cell {
            width: 100%;
            height: 96rpx;
            padding: 0 30rpx;
            box-sizing: border-box;

            .cell-left {
                width: 55%;
                height: 88rpx;

                text {
                    display: inline-block;
                    width: 80%;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }

            .cell-right {
                width: 60%;
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