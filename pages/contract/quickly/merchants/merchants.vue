<template>
    <view class="merchants" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     @leftClick="$mroute.back"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="merchants-container">
            <view class="merchants-container-header">
                <view class="banner-top">
                    <view class="banner-left">
                        <text class="font-20 font-weight color-black">申请广告主{{$t('quickly.tt52')}}</text>
                        <text class="font-13 color-gray">成为Combit广告商，0手续费发布广告{{$t('quickly.tt53')}}</text>
                    </view>
                    <image class="banner-bg" src="/static/quickly/banner-bg.png" mode="widthFix"></image>
                </view>
                <view class="banner-bottom">
                    <view class="card">
                        <image src="/static/quickly/card-img1.png"></image>
                        <view class="card-info">
                            <text class="font-14 color-black font-weight">免手续费{{$t('quickly.tt54')}}</text>
                            <text class="font-12 color-gray">发布广告0手续费{{$t('quickly.tt55')}}</text>
                        </view>
                    </view>
                    <view class="card">
                        <image src="/static/quickly/card-img2.png"></image>
                        <view class="card-info">
                            <text class="font-14 color-black font-weight">商家身份标识{{$t('quickly.tt56')}}</text>
                            <text class="font-12 color-gray">为认证的广告商添加认证标签{{$t('quickly.tt57')}}</text>
                        </view>
                    </view>
                    <view class="card">
                        <image src="/static/quickly/card-img3.png"></image>
                        <view class="card-info">
                            <text class="font-14 color-black font-weight">专属服务{{$t('quickly.tt58')}}</text>
                            <text class="font-12 color-gray">7x24小时线上服务{{$t('quickly.tt59')}}</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="title-box">
                <text class="font-16 color-black font-weight">申请条件{{$t('quickly.tt60')}}</text>
            </view>
            <view v-if="realType === true">
                <view class="merchants-container-item">
                    <text class="font-13 color-gray mt-10">资金证明{{$t('quickly.tt61')}}</text>
                    <text class="font-13 color-gray mt-5">您可以提供如下资料来进行资金的证明：{{$t('quickly.tt62')}}</text>
                    <text class="font-12 color-gray mt-5">1.名下任意银行账户近30日的交易历史和余额证明；{{$t('quickly.tt63')}}</text>
                    <text class="font-12 color-gray mt-5">2.在任意平台上拥有的数字货币数量的证明(如有)；{{$t('quickly.tt64')}}</text>
                    <text class="font-12 color-gray mt-5">3.您的资金和数字货币资产来源并提供相关证明。{{$t('quickly.tt65')}}</text>
                    <view class="upload-box">
                        <fui-upload
                            immediate
                            max="3"
                            width="160"
                            height="160"
                            addSize="56"
                            background="var(--background-secondary)"
                            addColor="var(--content-primary)"
                            radius="8"
                            borderSytle="dashed"
                            borderColor="var(--border-strength-100)"
                            :url="url"
                            ref="upload"
                            @success="success"
                            @error="error"
                            @complete="complete"
                        ></fui-upload>
                    </view>
                    <text class="font-12 color-gray mt-5">仅支持PNG、JPG、JPEG、PDF格式，每张大小显示在5M以内。{{$t('quickly.tt66')}}</text>
                    <text class="font-12 color-primary font-weight mt-10">上传PDF文件{{$t('quickly.tt67')}}</text>
                </view>
            </view>
            <view class="merchants-container-item">
                <text class="font-13 color-gray mt-10">上传身份证明{{$t('quickly.tt68')}}</text>
                <text class="font-13 color-gray mt-5">上传手持身份证正面和广告主声明内容照片{{$t('quickly.tt69')}}</text>
                <text class="font-12 color-gray mt-5">拍摄要求：{{$t('quickly.tt70')}}</text>
                <text class="font-12 color-gray mt-5">1.手持身份证和广告主声明文件{{$t('quickly.tt71')}}</text>
                <text class="font-12 color-gray mt-5">2.脸部无遮挡，身份证、声明文件清晰可见{{$t('quickly.tt72')}}</text>
                <view class="upload-box">
                    <fui-upload
                        immediate
                        max="3"
                        width="160"
                        height="160"
                        addSize="56"
                        background="var(--background-secondary)"
                        addColor="var(--content-primary)"
                        radius="8"
                        borderSytle="dashed"
                        borderColor="var(--border-strength-100)"
                        :url="url"
                        ref="upload"
                        @success="success"
                        @error="error"
                        @complete="complete"
                    ></fui-upload>
                </view>
                <text class="font-12 color-gray mt-5">仅支持PNG、JPG、JPEG、PDF格式，每张大小显示在5M以内。{{$t('quickly.tt66')}}</text>
                <!-- <text class="font-12 color-primary font-weight mt-10">广告主声明文件.pdf</text> -->
            </view>
            <view class="merchants-container-item">
                <view class="row-cell" @click="realType = true">
                    <text class="font-13 color-black">身份认证</text>
                    <view class="flex flex-row align-center" v-if="realType === false">
                        <text class="font-12 color-primary">去认证</text>
                        <fui-icon name="arrowright" size="36" color="var(--content-tertiary)"></fui-icon>
                    </view>
                    <view class="flex flex-row align-center" v-else>
                        <text class="font-12 color-gray">已认证</text>
                    </view>
                </view>
                <view class="row-cell" @click="realType = true">
                    <text class="font-13 color-black">绑定邮箱</text>
                    <view class="flex flex-row align-center" v-if="realType === false">
                        <text class="font-12 color-primary">去绑定</text>
                        <fui-icon name="arrowright" size="36" color="var(--content-tertiary)"></fui-icon>
                    </view>
                    <view class="flex flex-row align-center" v-else>
                        <text class="font-12 color-gray">已绑定</text>
                    </view>
                </view>
                <view class="row-cell" @click="realType = true">
                    <text class="font-13 color-black">绑定手机</text>
                    <view class="flex flex-row align-center" v-if="realType === false">
                        <text class="font-12 color-primary">去绑定</text>
                        <fui-icon name="arrowright" size="36" color="var(--content-tertiary)"></fui-icon>
                    </view>
                    <view class="flex flex-row align-center" v-else>
                        <text class="font-12 color-gray">已绑定</text>
                    </view>
                </view>
            </view>
            <view class="merchants-container-item">
                <view class="row-cell not-bottom">
                    <text class="font-13 color-black">现货账户资产不低于：{{ minAsset }} USDT</text>
                    <view class="flex flex-row align-center" v-if="minAsset < 2000">
                        <text class="font-12 color-primary">去充值</text>
                        <fui-icon name="arrowright" size="36" color="var(--content-tertiary)"></fui-icon>
                    </view>
                    <view class="flex flex-row align-center" v-else>
                        <text class="font-12 color-gray">已满足</text>
                    </view>
                </view>
                <view class="row-cell">
                    <text class="font-12 color-gray">
                        提交申请后将冻结相应数量资产作为保证金，撤销商家身份后可联系客服解冻。
                    </text>
                </view>
            </view>
            <view v-if="realType === true">
                <!-- 联系方式 -->
                <view class="merchants-container-item">
                    <view class="row-cell not-bottom">
                        <text class="font-13 color-black">填写联系方式</text>
                    </view>
                    <view class="row-box" @click="showArea">
                        <text class="font-14 color-black">{{ showareacode }}</text>
                        <image src="/static/img/h0.png" mode=""></image>
                    </view>
                    <view class="row-box">
                        <input type="number" placeholder="联系方式" placeholder-class="placeholder"/>
                    </view>
                </view>
                <!-- 紧急联系人 -->
                <view class="merchants-container-item">
                    <view class="row-cell not-bottom">
                        <text class="font-13 color-black">紧急联系人</text>
                    </view>
                    <view class="row-box">
                        <input type="text" placeholder="姓名" placeholder-class="placeholder"/>
                    </view>
                    <view class="row-box" @click="showArea">
                        <text class="font-14 color-black">{{ showareacode }}</text>
                        <image src="/static/img/h0.png" mode=""></image>
                    </view>
                    <view class="row-box">
                        <input type="number" placeholder="联系方式" placeholder-class="placeholder"/>
                    </view>
                    <view class="row-box" @click="relational = true">
                        <text class="font-14 color-black">{{ tiesGroup[tiesIndex] }}</text>
                        <image src="/static/img/h0.png" mode=""></image>
                    </view>
                </view>
                <!-- 常用地址 -->
                <view class="merchants-container-item">
                    <view class="row-cell not-bottom">
                        <text class="font-13 color-black">常用地址</text>
                    </view>
                    <view class="row-box" @click="regionPopup = true">
                        <text class="font-14 color-black">{{ regionSelect }}</text>
                        <image src="/static/img/h0.png"></image>
                    </view>
                    <view class="row-box">
                        <input type="text" placeholder="请输入详细地址" placeholder-class="placeholder"/>
                    </view>
                </view>
            </view>
            <view class="merchants-container-item">
                <view class="row-cell not-bottom">
                    <text class="font-13 color-black">社交账号</text>
                </view>
                <view class="row-box" @click="socialAccounts = true">
                    <text class="font-14 color-black">{{ socialGroup[socialIndex] }}</text>
                    <image src="/static/img/h0.png" mode=""></image>
                </view>
                <view class="row-box">
                    <input type="text" placeholder="请输入社交账号" placeholder-class="placeholder"/>
                </view>
            </view>
        </view>
        <view class="footer-box">
            <view class="check-label">
                <fui-label class="flex flex-row align-center" @click="checkChange">
                    <fui-checkbox color="var(--color-primary)"
                                  scaleRatio="0.7"
                                  borderRadius="6rpx"
                                  value="1"
                                  :checked="checked"
                                  @click="checkChange"></fui-checkbox>
                    <text class="font-12 color-gray ml-5">我已仔细阅读并同意遵守</text>
                </fui-label>
                <text class="font-12 color-primary font-weight">《商家服务协议》</text>
            </view>
            <view class="button-box">
                <fui-button height="78rpx"
                            size="26"
                            radius="78rpx"
                            color="var(--background-primary)"
                            background="var(--content-primary)"
                            @click="submitApplication">提交申请
                </fui-button>
            </view>
        </view>
        <!--  提示  -->
        <fui-toast ref="toast"></fui-toast>
        <!-- 社交账号弹窗 -->
        <fui-bottom-popup background="var(--background-primary)" :show="socialAccounts" @close="closePopup">
            <view class="bottom-popup-wrap">
                <view class="list-box">
                    <view class="list-box-cell" :class="{'active': socialIndex == index }"
                          v-for="(item, index) in socialGroup"
                          :key="index" @click="sociaTap(index)">
                        <text class="font-14 color-gray">{{ item }}</text>
                    </view>
                </view>
                <view class="bottom-popup-wrap-cell" @click="closePopup">
                    <text class="font-14 color-black">取消</text>
                </view>
            </view>
        </fui-bottom-popup>
        <!-- 地址 -->
        <fui-picker :theme="userTheme" radius size="15" linkage :layer="3" :options="areaOptions" :show="regionPopup"
                    @change="regionChange"
                    @cancel="closePopup"></fui-picker>
        <!-- 关系-->
        <fui-bottom-popup background="var(--background-primary)" :show="relational" @close="closePopup">
            <view class="bottom-popup-wrap">
                <view class="list-box">
                    <view class="list-box-cell" :class="{'active': tiesIndex == index }"
                          v-for="(item, index) in tiesGroup"
                          :key="index" @click="tiesTap(index)">
                        <text class="font-14 color-gray">{{ item }}</text>
                    </view>
                </view>
                <view class="bottom-popup-wrap-cell" @click="closePopup">
                    <text class="font-14 color-black">取消</text>
                </view>
            </view>
        </fui-bottom-popup>
        <areacode ref="areacode" @itemclick="areacode"></areacode>
    </view>
</template>

<script>
import AreaJson from "../../../../common/region"

import {
    mapGetters
} from 'vuex';

export default {
    data() {
        return {
            areaOptions: AreaJson['AreaJson'],
            regionPopup: false,
            regionSelect: "省-市-区",
            showareacode: "+86",
            realType: false,
            relational: false,
            navHeight: '',
            windowHeight: '',
            tiesIndex: 0,
            checked: false,
            //上传接口地址
            url: 'https://ffa.firstui.cn/api/example/upload-file',
            //上传状态，用于保存或其他操作时做判断
            status: '',
            //上传的图片地址列表
            urls: [],
            minAsset: '1000',
            socialAccounts: false,
            socialIndex: 0,
            socialGroup: ['Telegram', 'WhatsAapp', 'Twitter'],
            tiesGroup: ['朋友', '家人', '其他']
        };
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    methods: {
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
            this.windowHeight = uni.getSystemInfoSync().windowHeight - e.height - e.statusBarHeight;
        },
        submitApplication() {
            if (this.checked === false) {
                this.showToast('请先勾选“我已阅读并同意上述条款”', 500);
            } else if (this.urls.length === 0) {
                this.showToast('请上传手持身份证照片', 500);
            }
        },
        checkChange() {
            this.checked = !this.checked;
        },
        sociaTap(index) {
            this.socialIndex = index;
            this.closePopup();
        },
        tiesTap(index) {
            this.tiesIndex = index;
            this.closePopup();
        },
        showToast(type, duration) {
            let options = {};
            //提示信息
            options.text = type;
            options.duration = duration;
            this.$refs.toast.show(options);
        },
        showArea() {
            this.$refs.areacode.open();
        },
        areacode(e) {
            this.showareacode = e.dialingCode;
        },
        //上传成功时触发
        success(e) {
            console.log(e);
            //e.res 为服务器返回数据
            //上传成功回调，处理服务器返回数据【此处根据实际返回数据进行处理】
            let res = JSON.parse(e.res.data.replace(/\ufeff/g, '') || '{}');
            this.status = e.status;
            if (res.data.url) {
                //处理结果返回给组件
                //res.data.url为上传成功后返回的图片地址
                //e.index为图片索引值
                this.$refs.upload.result(res.data.url, e.index);
            }
        },
        //上传失败时触发
        error(e) {
            this.status = e.status;
        },
        //选择图片或上传完成时触发
        complete(e) {
            this.status = e.status;
            this.urls = e.urls;
            if (this.status === 'success' && e.action === 'upload') {
                //已上传完成的图片列表 this.urls
                console.log(this.urls);
            }
        },
        regionChange(e) {
            let value = e.text;
            this.regionSelect = value[0] + '-' + value[1] + '-' + value[2];
            this.closePopup();
        },
        closePopup() {
            this.socialAccounts = false;
            this.regionPopup = false;
            this.relational = false;
        },
    }
};
</script>

<style lang="scss" scoped>
@import 'merchants.scss';
</style>


<style scoped>
/deep/.fui-bottom__popup {
    border-bottom: none;
}

/deep/uni-picker-view-column:nth-of-type(1) .uni-picker-view-indicator {
    border-radius: 10rpx 0 0 10rpx;
}

/deep/uni-picker-view-column:nth-of-type(3) .uni-picker-view-indicator {
    border-radius: 0 10rpx 10rpx 0;
}

/deep/.uni-picker-view-indicator {
    background-color: rgba(144, 147, 153, .2);
}
</style>