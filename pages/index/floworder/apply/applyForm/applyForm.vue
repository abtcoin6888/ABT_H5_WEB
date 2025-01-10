<template>
    <view class="applyForm" :data-theme="userTheme">
        <fui-nav-bar zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     statusBar isFixed isOccupy
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>

        <view class="applyForm-body">
            <view class="applyForm-body-label">
                <text class="font-16 color-black font-weight">
                    {{ $t('applyForm.title') }}
                </text>
            </view>
            <!--    联系邮箱   -->
            <view class="applyForm-body-label mt-15">
                <text class="font-13 color-black">
                    * {{ $t('contact.contact_email') }}
                </text>
                <view class="applyForm-body-label-input mt-10">
                    <input type="text"
                           v-model="value"
                           :placeholder="this.$t('login.email_p')"
                           placeholder-class="placeholder">
                </view>
            </view>
            <!--    手机号码   -->
            <view class="applyForm-body-label mt-15">
                <text class="font-13 color-black">
                    * {{ $t('applyForm.phone_num') }}
                </text>
                <view class="applyForm-body-label-input mt-10">
                    <input type="text"
                           v-model="value"
                           :placeholder="this.$t('login.phone_p')"
                           placeholder-class="placeholder">
                </view>
            </view>
            <!--    社交账号   -->
            <view class="applyForm-body-label mt-15">
                <text class="font-13 color-black">
                    {{ $t('applyForm.social_account') }}
                </text>
                <view class="applyForm-body-label-input flex align-center mt-10" @click="showC">
                    <text class="font-13 color-black font-weight">
                        Telegram
                    </text>
                </view>
                <view class="applyForm-body-label-input mt-10">
                    <input type="text"
                           v-model="value"
                           :placeholder="this.$t('applyForm.enter_acc')"
                           placeholder-class="placeholder">
                </view>
            </view>
            <!--    个人介绍   -->
            <view class="applyForm-body-label mt-15">
                <text class="font-13 color-black">
                    * {{ $t('applyForm.self_intro') }}
                </text>
                <view class="applyForm-body-label-input mt-10">
                    <textarea v-model="value"
                              :placeholder="this.$t('applyForm.enter_info')">
                    </textarea>
                </view>
            </view>
            <!--    附件   -->
            <view class="applyForm-body-label mt-15">
                <text class="font-13 color-black">
                    * {{ $t('applyForm.attach') }}
                </text>
                <view class="flex align-center justify-between mt-10">
                    <text class="font-12 color-gray">
                        {{ $t('applyForm.max_up') }}
                    </text>
                    <text class="font-12 color-black">
                        {{ urls.length }} / 9
                    </text>
                </view>
                <view class="applyForm-body-label-upload mt-10">
                    <fui-upload
                        radius="16"
                        max="9"
                        borderColor="var(--border-strength-100)"
                        background="var(--background-secondary)"
                        addColor="var(--content-primary)"
                        immediate
                        :url="url"
                        ref="upload"
                        @success="success"
                        @error="error"
                        @complete="complete">
                    </fui-upload>
                </view>
            </view>
        </view>

        <view class="applyForm-footer">
            <fui-button height="78rpx"
                        radius="78rpx"
                        size="26"
                        color="var(--background-primary)"
                        background="var(--content-primary)">
                {{ $t('secrety.submit') }}
            </fui-button>
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
    data(){
        return {
            //上传接口地址
            url: 'https://ffa.firstui.cn/api/example/upload-file',
            //上传状态，用于保存或其他操作时做判断
            status: '',
            //上传的图片地址列表
            urls: []
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {
        showC() {
            uni.showActionSheet({
                itemList: ['Telegram', 'Twitter', 'Facebook', this.$t('applyForm.other')],
                success: function (res) {
                    console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
                },
                fail: function (res) {
                    console.log(res.errMsg);
                }
            });
        },
        //上传成功时触发
        success(e) {
            console.log(e)
            //e.res 为服务器返回数据
            //上传成功回调，处理服务器返回数据【此处根据实际返回数据进行处理】
            let res = JSON.parse(e.res.data.replace(/\ufeff/g, "") || "{}")
            this.status = e.status
            if (res.data.url) {
                //处理结果返回给组件
                //res.data.url为上传成功后返回的图片地址
                //e.index为图片索引值
                this.$refs.upload.result(res.data.url, e.index)
            }
        },
        //上传失败时触发
        error(e) {
            this.status = e.status
        },
        //选择图片或上传完成时触发
        complete(e) {
            this.status = e.status
            this.urls = e.urls
            if (this.status === 'success' && e.action === 'upload') {
                this.fui.toast('上传完成！')
                //已上传完成的图片列表 this.urls
                console.log(this.urls)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.applyForm {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    &-body {
        width: 100%;
        height: auto;
        padding: 30rpx 30rpx 200rpx 30rpx;
        box-sizing: border-box;

        &-label {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;

            &-input {
                width: 100%;
                min-height: 78rpx;
                border-radius: 8rpx;
                background: var(--background-secondary);
                border: 2rpx solid var(--background-secondary);
                padding: 0 20rpx;
                box-sizing: border-box;

                &:focus-within {
                    border-color: var(--color-primary);
                }

                input {
                    width: 100%;
                    height: 78rpx;
                    color: var(--content-primary);
                    font-size: 26rpx;
                }

                textarea {
                    width: 100%;
                    height: 200rpx;
                    padding: 20rpx 0;
                    box-sizing: border-box;
                    font-size: 26rpx;
                    color: var(--content-primary);
                }
            }
        }
    }

    &-footer {
        width: 100%;
        height: auto;
        padding: 20rpx 30rpx;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 9;
        background: var(--background-primary);
    }
}
</style>
