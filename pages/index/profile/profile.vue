<template>
    <view class="profile" :data-theme="userTheme">
        <fui-nav-bar :title="$t('profile.profile')"
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     statusBar
                     isFixed
                     isOccupy
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="profile-body">
            <view class="header">
                <image class="avatar-image"
                       @click="uploadAvatar()"
                       :src="userinfo['avatar'] ? userinfo['avatar'] : '/static/img/avatar.png'">
                </image>
                <view class="row">
                    <text class="font-16 color-black font-weight"
                          @click="editPopup = true">
                        {{ userinfo['nickname'] != null ? userinfo['nickname'] : $t('profile.unset') }}
                    </text>
                    <image class="edit-icon"
                           :src="`/static/img/tactic/bj-${userTheme}.png`"
                           mode="widthFix"
                           @click="editPopup = true">
                    </image>
                </view>
                <view class="real"
                      @click="$mroute.userauth()">
                    <image class="real-image"
                           :src="`/static/newImage/real-${userinfo.authStatus == 1 ? 's' : 'n'}.png`"
                           mode="widthFix">
                    </image>
                    <view class="real-type"
                          :class="userinfo.authStatus == 1 ? 'real-suc' : 'bg-gray'">
                        <text class="font-11 color-gray  font-weight"
                              v-if="userinfo.authStatus === -2">
                            {{ $t('index.notAuth') }}
                        </text>
                        <text class="font-11 color-gray  font-weight"
                              v-if="userinfo.authStatus === -1">
                            {{ $t('usAuth.type_c2') }}
                        </text>
                        <text class="font-11 color-gray  font-weight"
                              v-if="userinfo.authStatus === 0">
                            {{ $t('usAuth.type_c') }}
                        </text>
                        <text class="font-11 color-gray  font-weight"
                              v-if="userinfo.authStatus === 1">
                            {{ $t('usAuth.type_c1') }}
                        </text>
                    </view>
                </view>
            </view>
            <view class="container">
                <view class="row">
                    <text class="font-14 color-gray">
                        {{ $t('profile.account') }}
                    </text>
                    <view class="row-item">
                        <text class="font-14 color-black">
                            {{ userAccount }}
                        </text>
                    </view>
                </view>
                <view class="row">
                    <text class="font-14 color-gray">
                        {{ $t('profile.astatus') }}
                    </text>
                    <view class="row-item">
                        <text class="font-14"
                              :class="userinfo['status'] == 1?'color-green':'color-red'">
                            {{ userinfo['status'] == 1 ? $t('profile.status') : $t('profile.fail') }}
                        </text>
                    </view>
                </view>
            </view>
        </view>

        <fui-bottom-popup :show="editPopup"
                          background="var(--background-primary)"
                          @close="editPopup = false">
            <view class="popup-warp">
                <view class="popup-title">
                    <text class="font-15 color-black font-weight">
                        {{ $t('profile.pop_t1') }}
                    </text>
                    <view class="close"
                          @click="editPopup = false">
                        <fui-icon name="close"
                                  size="48"
                                  color="var(--content-primary)">
                        </fui-icon>
                    </view>
                </view>
                <view class="popup-content">
                    <input type="text"
                           v-model="name"
                           :placeholder="$t('profile.unset')"
                           placeholder-class="placeholder">
                    <view class="tips">
                        <text class="font-12 color-black">
                            {{ $t('profile.pop_t2') }}
                        </text>
                        <text class="font-12 color-black">
                            {{ $t('profile.pop_t3') }}
                        </text>
                        <text class="font-12 color-red">
                            {{ $t('profile.pop_t4') }}
                        </text>
                        <text class="font-12 color-black">
                            {{ $t('profile.pop_t5') }}
                        </text>
                    </view>
                    <button class="button bg-black" hover-class="none"
                            @click="dialogInputConfirm(name)">
                        <text class="font-13 color-white font-weight">
                            {{ $t('login.confirm') }}
                        </text>
                    </button>
                </view>
            </view>
        </fui-bottom-popup>
    </view>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import common from '../../../common/api/common';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";
import fuiAvatar from "@/components/firstui/fui-avatar/fui-avatar.vue"

export default {
    components: {
        fuiAvatar,
        fuiNavBar
    },
    data() {
        return {
            editPopup: false,
            name: "",
        }
    },
    computed: {
        ...mapState(['userinfo']),
        ...mapGetters(['userAccount', 'userTheme'])
    },
    methods: {
        ...mapMutations(['updateInfo']),
        dialogInputConfirm(e) {
            if (e.length > 20) {
                uni.showToast({
                    title: '昵称过长，请重新输入',
                    icon: "none"
                });
                return false;
            } else {
                uni.showLoading({
                    title: '保存中'
                });
                common.saveNickname(e).then(res => {
                    uni.hideLoading();
                    if (res.code == 200) {
                        this.updateInfo('nickname', e);
                        this.userinfo['nickname'] = e;
                        this.$forceUpdate();
                    }
                })
                this.editPopup = false;
            }
        },
        uploadAvatar() {
            let _this = this;
            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                success(res) {
                    console.log(res);
                    uni.showLoading({
                        title: '上传中'
                    });
                    common.uploadFile(res.tempFilePaths[0]).then(res => {
                        uni.hideLoading();
                        if (res.statusCode == 200) {
                            var res = JSON.parse(res.data);
                            _this.updateInfo('avatar', res.data.url);
                            _this.userinfo['avatar'] = res.data.url;
                            common.saveUploadAvatar(res.data.url);
                            _this.$forceUpdate();
                        }
                    }).catch(res => {
                        uni.hideLoading();
                    });
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "profile";
</style>
