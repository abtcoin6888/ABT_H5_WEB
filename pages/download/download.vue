<template>
    <scroll-view scroll-y
                 :show-scrollbar="false"
                 class="download"
                 @scroll="scroll">
        <view class="nav">
            <view class="logo"
                  @click="$mroute.back">
                <image class="logoImage"
                       src="@/static/home/cvlogo.png"
                       mode="widthFix" />
            </view>
            <view class="menu"
                  @click="showDrawer">
                <image class="menuImage"
                       src="/static/home/menu-light.png"
                       mode="widthFix"
                       v-if="scrollTop < 30" />
                <image class="menuImage"
                       src="/static/home/menu-dark.png"
                       mode="widthFix"
                       v-else />
            </view>
        </view>
        <view class="download-body">
            <view class="header">
                <text class="title">{{$t('home.t16')}} {{config['site_name']}} App，{{$t('dw.tt1')}}</text>
                <text class="subText">{{$t('dw.tt2')}}</text>
                <div class="download-content">
                    <image class="bgImage"
                           src="@/static/home/h5-download.png" />
                    <view class="download-tab">
                        <text @click="tabIndex = 0">IOS</text>
                        <text @click="tabIndex = 1">Android</text>
                        <view class="slide"
                              :style="{ '--translateX': (tabIndex == 1 ? '100%' : '0%') }"></view>
                    </view>
                </div>
                <template v-if="tabIndex === 0">
                    <view class="download-buttons">
                        <view class="button"
                              @click="downApp(true)">
                            <image src="/static/home/appStore.png"
                                   mode="scaleToFill" />
                            <text>App Store</text>
                        </view>
                        <view class="button"
                              @click="downApp(true)">
                            <image src="/static/home/iOS-dark.png"
                                   mode="scaleToFill" />
                            <text>IOS {{$t('dw.tt3')}}</text>
                        </view>
                    </view>
                </template>
                <template v-if="tabIndex === 1">
                    <view class="download-buttons">
                        <view class="button"
                              @click="downApp(false)">
                            <image src="/static/home/googleplay-dark.png"
                                   mode="scaleToFill" />
                            <text>Google Play</text>
                        </view>
                        <view class="button"
                              @click="downApp(false)">
                            <image src="/static/home/android-dark.png"
                                   mode="scaleToFill" />
                            <text>Android</text>
                        </view>
                    </view>
                </template>
                <view class="download-qrcode">
                    <view class="qrcode-box">
                        <image :src="config['dpage']"
                               mode="scaleToFill" />
                    </view>
                    <text>{{$t('contract.pt4')}}</text>
                </view>
            </view>

            <view class="course">
                <template v-if="tabIndex === 0">
                    <!-- <text class="title">IOS教程</text>
                    <view class="item">
                        <text class="step">第一步</text>
                        <text class="context">请确保您已拥有美国的 Apple ID</text>
                        <button>如何注册</button>
                    </view>
                    <view class="item">
                        <text class="step">第二步</text>
                        <text class="context">在 App Store 切换 Apple ID</text>
                        <text class="context">1.打开
                            <image src="/static/home/appStore.png"
                                   mode="scaleToFill" />
                            App Store 应用，点击左上角的头像，退出登录
                        </text>
                        <image class="courseImage"
                               src="/static/home/ios_course1.png"
                               mode="widthFix" />
                        <image class="courseImage"
                               src="/static/home/ios_course2.png"
                               mode="widthFix" />
                        <text class="context">2.使用美国的 Apple ID 登录</text>
                        <image class="courseImage"
                               src="/static/home/ios_course3.png"
                               mode="widthFix" />
                        <text class="context">如果提示“无法登录”，可能是您近期切换账号过于频繁。您可以更换 ID 或者几小时后重试。如果 ID 被锁定，则需要进行验证或更换 ID
                            后再试。</text>
                    </view>
                    <view class="item">
                        <text class="step">第三步</text>
                        <text class="context">1.登录成功后，会自动跳转至 ID 对应地区的 App Store。在 App Store
                            中搜索“Bitget”，点击“GET”即可开始安装。</text>
                        <image class="courseImage"
                               src="/static/home/ios_course4.png"
                               mode="widthFix" />
                        <text class="context">2.回到桌面即可看到 Bitget App 已安装成功。</text>
                        <image class="courseImage"
                               src="/static/home/ios_course5.png"
                               mode="widthFix" />
                    </view> -->
					<text class="title">{{$t('dw.tt4')}}</text>
					<view class="item an_item">
					    <text class="step_num">1.</text>
					    <text class="context_an">
					        {{$t('dw.tt5')}} <text>[ App Store ]</text>，{{$t('dw.tt6')}}
					    </text>
					</view>
					<view class="item an_item">
					    <text class="step_num">2.</text>
					    <text class="context_an">
					        {{$t('dw.tt7')}} <text>[ {{$t('dw.tt8')}} ]</text> {{$t('dw.tt9')}}。
					    </text>
					</view>
                </template>
                <template v-if="tabIndex === 1">
                    <text class="title">{{$t('dw.tt12')}}</text>
                    <view class="item an_item">
                        <text class="step_num">1.</text>
                        <text class="context_an">
                            {{$t('dw.tt10')}} <text>[ Android ]</text> {{$t('dw.tt11')}}。
                        </text>
                    </view>
                    <view class="item an_item">
                        <text class="step_num">2.</text>
                        <text class="context_an">
                            {{$t('dw.tt7')}} <text>[ {{$t('dw.tt8')}} ]</text> {{$t('dw.tt9')}}。
                        </text>
                    </view>
                </template>
            </view>
        </view>
        <!-- footer -->
        <view class="footer">
            <view class="f_h">
                <image src="/static/home/cvlogo.png"
                       mode="widthFix"></image>
                <text>
                    {{ $t('home.t14') }}
                </text>
            </view>
            <view class="f_c">
                <uni-collapse style="min-height: 80rpx;">
                    <uni-collapse-item v-for="(item, index) in collapse"
                                       :title="$t(item.title)"
                                       :key="index">
                        <view class="txt-item"
                              v-for="(sitem, sindex) in item.list"
                              :key="sindex"
                              @click="navIcat(sitem)">
                            <text>{{ $t(sitem.t) }}</text>
                        </view>
                    </uni-collapse-item>
                </uni-collapse>
                <view class="m_i">
                    <text>{{ $t('home.t19') }}</text>
                    <view class="medias">
                        <image src="/static/home/medias-icon1.png"
                               mode="" @click="openContact(contact['twitter'])"></image>
                        <image src="/static/home/medias-icon2.png"
                               mode="" @click="openContact(contact['facebook'])"></image>
                        <image src="/static/home/medias-icon3.png"
                               mode="" @click="openContact(contact['instagram'])"></image>
                        <image src="/static/home/medias-icon4.png"
                               mode=""></image>
                        <image src="/static/home/medias-icon5.png"
                               mode=""></image>
                        <image src="/static/home/medias-icon6.png"
                               mode="" @click="openContact(contact['telegram'])"></image>
                    </view>
                </view>
            </view>
            <view class="f_b">
                <text>{{ config['site_name'] }} © 2020 - 2024</text>
            </view>
        </view>
        <!-- drawer -->
        <fui-drawer :show="drawerShow"
                    :direction="right"
                    :maskClosable="true"
                    @close="closeDrawer">
            <view class="drawer-box">
                <view class="close">
                    <uni-icons @click="closeDrawer"
                               type="closeempty"
                               color="var(--black)"
                               size="24"></uni-icons>
                </view>
                <!-- not login -->
                <view class="not-log">
                    <button @click="$mroute.login()">{{ $t('home.t17') }}</button>
                    <button @click="$mroute.login()">{{ $t('home.t1') }}</button>
                </view>
                <!-- list -->
                <view class="list">
                    <view class="_row"
                          @click="downApp(true)">
                        <image src="/static/home/drawer-icon2.png"
                               mode=""></image>
                        <text>{{ $t('home.t16') }}</text>
                    </view>
                    <uni-collapse style="min-height: 120rpx;">
                        <uni-collapse-item :open="true">
                            <template v-slot:title>
                                <image src="/static/home/drawer-icon3.png"
                                       mode=""></image>
                                <text>{{ $t(checkedTxt) }}</text>
                            </template>
                            <view class="content">
                                <radio-group @change="radioChange">
                                    <label class="label"
                                           v-for="(item, index) in items"
                                           :key="item.value">
                                        <text>{{ $t(item.name) }}</text>
                                        <radio :value="item.value"
                                               :checked="lang == item.value" />
                                        <!-- radio -->
                                        <view class="radio"
                                              :class="lang == item.value ? 'radio-active' : ''"></view>
                                    </label>
                                </radio-group>
                            </view>
                        </uni-collapse-item>
                    </uni-collapse>
					
					 <!-- 主题切换 -->
							  <uni-collapse style="min-height: 120rpx;">
							    <uni-collapse-item :open="false">
							      <template v-slot:title>
							        <image src="/static/home/drawer-icon3.png" mode=""></image>
							        <text>{{ $t('common.them') }}</text>
							      </template>
							      <view class="content">
							        <radio-group @change="themChange">
							          <label class="label">
							            <text>{{ $t('common.light') }}</text>
							            <radio value="light" :checked="userTheme == 'light'" />
							            <!-- radio -->
							            <view class="radio" :class="userTheme == 'light' ? 'radio-active' : ''"></view>
							          </label>
									  <label class="label">
											<text>{{ $t('common.dark') }}</text>
											<radio value="dark" :checked="userTheme == 'dark'" />
											<!-- radio -->
											<view class="radio" :class="userTheme == 'dark' ? 'radio-active' : ''"></view>
										</label>
							        </radio-group>
							      </view>
							    </uni-collapse-item>
							  </uni-collapse>
                    <view class="_row"
                          @click="$mroute.webview(1, 'gywm', '关于我们')">
                        <image src="/static/home/drawer-icon4.png"
                               mode=""></image>
                        <text>{{ $t('home.t18') }}</text>
                    </view>
                </view>
            </view>
        </fui-drawer>
    </scroll-view>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import config from "@/common/api/config";
import common from '@/common/api/common.js';

export default {
    data() {
        return {
            windowWidth: uni.getWindowInfo().windowWidth,
            drawerActive: false,
            tabIndex: 0,
            list: [],
            iosActive: false,
            drawerShow: false,
            items: [
                {
                    value: 'zh',
                    name: 'home.t69',
                    checked: 'true'
                },
                {
                    value: 'zh-Hant',
                    name: '繁體中文'
                },
                {
                    value: 'en',
                    name: 'home.t70'
                },
                {
                    value: 'ja',
                    name: 'home.t71'
                },
                {
                    value: 'ko',
                    name: 'home.t72'
                },
            ],
            checkedTxt: this.$t('home.t69'),
            lang: "en",
            scrollTop: 0,
            collapse: [{
                title: "home.t53",
                list: [{ t: "home.t54", code: "gywm" }, { t: "home.t55", code: "blog" }, { t: "home.t56", code: "white" }]
            }, {
                title: "home.t57",
                list: [{ t: "home.t58", code: "yhxy" }, { t: "home.t59", code: "ysxy" }, { t: "home.t60", code: "mzsm" }]
            }, {
                title: "home.t61",
                list: [{ t: "home.t62", code: "flbz" }, { t: "home.t63", code: "sbsq" }, {
                    t: "home.t64",
                    p: config.HELP_URL
                }]
            }, {
                title: "home.t65",
                list: [{ t: "home.t66", p: config.HELP_URL }, { t: "home.t67", code: "wtfk" }, {
                    t: "home.t68",
                    u: this.$mroute.downloadPage
                }]
            }],
			contact:{}
        }
    },
    computed: {
        ...mapState(['config', 'userinfo']),
		...mapGetters(['userTheme'])
    },
    onShow() {
		// this.userTheme = 'light';
        var lang = uni.getStorageSync('lang');
        if (typeof lang == 'undefined' || lang == '') {
            lang = 'en';
        }
        this.list = [{
            title: "dw.t9",
            contxt: "dw.t10",
            src: `/static/home/img1-${lang}.png`
        }, {
            title: "dw.t11",
            contxt: "dw.t12",
            src: `/static/home/img2-${lang}.png`
        }, {
            title: "dw.t13",
            contxt: "dw.t14",
            src: `/static/home/img3-${lang}.png`
        }, {
            title: "dw.t15",
            contxt: "dw.t16",
            src: `/static/home/img4-${lang}.png`
        }];
		this.getContact();
    },
    methods: {
		openContact(u){
			window.open(u);
		},
		getContact() {
			  common.config(5).then(res => {
				  this.contact = res.data;
			  })
		  },
		themChange(e){
		  console.log(e);
		  this.toggleUserTheme(e.detail.value, e.detail.value == 'light' ? 0 : 1);
		  uni.setStorageSync('mthem',e.detail.value);
		  this.userTheme = e.detail.value;
	  },
		navIcat(item) {
		  if (typeof item.u != 'undefined') {
			return item.u();
		  }
		  if (typeof item.p != 'undefined') {
			return this.$mroute.webview(2, item.p, this.$t(item.t));
		  }
		  return this.$mroute.webview(1, item.code, this.$t(item.t));
		},
        scroll(e) {
            this.scrollTop = e.detail.scrollTop
        },
        downApp(ios=false) {
            if (ios) {
                window.open(this.config['ios_url']);
            } else {
                window.open(this.config['download']);
            }
        },
        isIOS() {
            var ua = navigator.userAgent.toLowerCase();
            return /iPhone|iPad/i.test(ua)
        },
        changeType(e) {
            this.drawerActive = e;
        },
        tutorialChange() {
            this.iosActive = !this.iosActive;
        },
        showDrawer() {
            this.drawerShow = true;
        },
        closeDrawer() {
            this.drawerShow = false;
        },
        radioChange: function (evt) {
            console.log(evt);
            var _this = this;
            var lang = evt.detail.value;
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].value === evt.detail.value) {
                    this.checkedTxt = this.items[i].name;
                    _this.$i18n.locale = lang;
                    this.lang = lang;
                    uni.setStorage({
                        key: "lang",
                        data: _this.items[i].value,
                        success() {
                            uni.$emit('switchLan');
                        }
                    });
                    break;
                }
            }
        }
    }
}
</script>
<style lang="scss">
@import "download.scss";
</style>


<style>
/deep/ .uni-swiper-slides {
    transition: all 1s;
}

/deep/ .uni-collapse,
/deep/ .uni-collapse-item__title-box,
/deep/ .uni-collapse-item__wrap {
    background-color: transparent;
    font-weight: 600;
    font-family: "PingFang";
}

/deep/ .uni-collapse-item--border {
    border: none;
}

/deep/ .uni-collapse-item__title-wrap {
    width: 100%;
    height: 88rpx;
    display: flex;
    align-items: center;
}

/deep/ .uni-collapse-item__title-wrap image {
    width: 48rpx;
    height: 48rpx;
    margin-right: 16rpx;
}

/deep/ .uni-collapse-item__title-wrap text {
    font-size: 26rpx;
    /* color: var(--black); */
    /* font-weight: 600; */
}

/deep/ .uni-radio-input {
    width: 32rpx;
    height: 32rpx;
    background-color: #9197a4;
}

/deep/.uni-collapse-item__wrap-content .txt-item text {
    font-size: 24rpx !important;
    font-weight: 500;
    color: var(--text-gray);
    padding-inline-start: 20rpx;
}</style>