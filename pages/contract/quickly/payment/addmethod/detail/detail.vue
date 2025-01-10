<template>
    <view class="detail" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     :title="title"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     @leftClick="$mroute.back"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="detail-container">
            <!--姓名-->
            <view class="label">
                <view class="label-title">
                    <text class="font-13 color-gray">{{$t('quickly.tt83')}}</text>
                </view>
                <view class="label-input">
                    <input type="text" v-model="name" :placeholder="$t('quickly.tt82')" placeholder-class="placeholder"/>
                </view>
            </view>
            <view v-if="typeIndex === '0'">
                <!--银行名称-->
                <view class="label">
                    <view class="label-title">
                        <text class="font-13 color-gray">{{$t('quickly.tt84')}}</text>
                    </view>
                    <view class="label-input">
                        <input type="text" v-model="bank" :placeholder="$t('quickly.tt86')" placeholder-class="placeholder"/>
                    </view>
                </view>
                <!--银行卡号-->
                <view class="label">
                    <view class="label-title">
                        <text class="font-13 color-gray">{{$t('quickly.tt85')}}</text>
                    </view>
                    <view class="label-input">
                        <input type="number" v-model="account" :placeholder="$t('quickly.tt87')"
                               placeholder-class="placeholder"/>
                    </view>
                </view>
                <!--支行名称-->
                <view class="label">
                    <view class="label-title">
                        <text class="font-13 color-gray">{{$t('quickly.tt89')}}</text>
                    </view>
                    <view class="label-input">
                        <input type="text" v-model="subbranch" :placeholder="$t('quickly.tt88')"
                               placeholder-class="placeholder"/>
                    </view>
                </view>
            </view>
            <view v-else>
                <!--账号-->
                <view class="label">
                    <view class="label-title">
                        <text class="font-13 color-black">{{$t('quickly.tt90')}}</text>
                    </view>
                    <view class="label-input">
                        <input type="text" v-model="account" :placeholder="$t('quickly.tt91')" placeholder-class="placeholder"/>
                    </view>
                </view>
                <!--收款码-->

            </view>
            <view class="label">
                <view class="label-title">
                    <text class="font-13 color-gray">{{$t('quickly.tt92')}}</text>
                </view>
                <view class="label-upload">
                    <fui-upload
                        :immediate="false"
                        max="1"
                        width="200"
                        height="200"
                        addSize="66"
                        background="var(--background-secondary)"
                        addColor="var(--content-tertiary)"
                        radius="8"
                        borderSytle="dashed"
                        borderColor="var(--border-strength-100)"
                        :url="url"
                        ref="upload"
                        :callUpload="true"
                        @success="upload"
                        @error="error"
                        @complete="complete"
                    ></fui-upload>
                </view>
            </view>
        </view>

        <view class="footer-button">
            <fui-button
                height="88rpx"
                :size="26"
                radius="88rpx"
                color="var(--background-primary)"
                background="var(--content-primary)"
                @click="confirm">
                {{$t('quickly.tt69')}}
            </fui-button>
        </view>
        <fui-toast :padding="['20rpx','20rpx']"
                   size="26"
                   color="var(--content-always-white)"
                   background="rgba(0,0,0,.7)"
                   ref="toast">
        </fui-toast>
    </view>
</template>

<script>
import common from '@/common/api/common.js';
import userApi from '@/common/api/user.js';

import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            typeIndex: "",
            navHeight: "",
            //上传接口地址
            url: 'https://ffa.firstui.cn/api/example/upload-file',
            //上传状态，用于保存或其他操作时做判断
            status: '',
            //上传的图片地址列表
            urls: [],
            account: "",
            bankNum: "",
            branchName: "",
            bankName: "",
            title: "",

            name: "",
            subbranch: "",
            bank: "",
            qrcode: ""
        }
    },
    onLoad(e) {
        this.typeIndex = e.type;
        if (parseInt(e.type) === 0) {
            this.title = $t('quickly.tt93');
        }
        if (parseInt(e.type) === 1) {
            this.title = $t('quickly.tt94');
        }
        if (parseInt(e.type) === 2) {
            this.title = $t('quickly.tt95');
        }
        this.url = common.getbaseUrl();
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    methods: {
        upload(file) {
            var _this = this;
            return new Promise((r, v) => {
                common.uploadFile(file.path).then(res => {
                    uni.hideLoading();
                    var res = JSON.parse(res.data);
                    if (res.code != 200) {
                        _this.showToast(res.message);
                    }
                    r(res.data.url);
                }).catch(res => {
                    uni.hideLoading();
                    _this.showToast(res.message);
                    v(false);
                });
            })

        },
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
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
                //已上传完成的图片列表 this.urls
                console.log(this.urls)
                //提交
                if (this.typeIndex == 0) {
                    var form = {
                        name: this.name,
                        type: 3,
                        account: this.account,
                        bank: this.bank,
                        qrcode: this.urls[0],
                        subbranch: this.subbranch
                    };
                } else {
                    var form = {
                        name: this.name,
                        account: this.account,
                        type: this.typeIndex == 1 ? 2 : 1,
                        qrcode: this.urls[0]
                    };
                }
                uni.showLoading();
                userApi.savePayment(form).then(res => {
                    uni.hideLoading();
                    if (res.code === 200) {
                        this.showToast($t('quickly.tt96'), 1500);
                        setTimeout(() => {
                            this.$mroute.back(2)
                        }, 1500);
                    } else {
                        this.showToast(res.message, 1500)
                    }
                }).catch((e) => {
                    uni.hideLoading();
                });
            }
        },
        confirm() {
            if (this.account === "") {
                this.showToast($t('quickly.tt97'), 500)
            }
            if (this.bankNum === "" && this.typeIndex == 1) {
                this.showToast($t('quickly.tt98'), 500)
            }
            if (this.subbranch === "" && this.typeIndex == 1) {
                this.showToast($t('quickly.tt99'), 500)
            }
            if (this.name === "" && this.typeIndex == 1) {
                this.showToast($t('quickly.tt100'), 500)
            }


            this.$refs.upload.upload(this.upload).then(res => {
                console.log(res);
            });
        },
        showToast(type, duration) {
            let options = {}
            //提示信息
            options.text = type;
            options.duration = duration;
            this.$refs.toast.show(options)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "detail.scss";
</style>