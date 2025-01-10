<template>
    <view class="buyCoinsQuickly"
          :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     color="var(--content-primary)"
                     background="var(--background-primary)"
                     :title="$t('index.addfunds_t5')"
                     @leftClick="$mroute.back"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
            <template v-slot:right>
                <view class="nav-bar-right">
                    <view class="nav-bar-right-select mr-5" v-if="false">
                        <text class="font-13 color-black font-weight">CNY</text>
                        <image class="toggle-image" :src="`/static/newImage/toggle-${userTheme}.png`"></image>
                    </view>
                    <view class="nav-bar-right-more" @click="menuShow = !menuShow">
                        <fui-icon name="more-fill" size="56" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
            </template>
        </fui-nav-bar>

        <view class="quickly-container">
            <view class="quickly-container-header">
                <view class="quickly-container-tabs">
                    <slide-button
                        :size="28"
                        :width="240"
                        :height="68"
                        background="var(--background-secondary)"
                        slide-background="var(--background-strength)"
                        :current="direction"
                        :options="directionOption"
                        :radius="10"
                        @change="directionChange"
                    ></slide-button>
                    <image @click="$mroute.toMyorder()"
                           :src="`/static/img/tactic/order-${userTheme}.png`"
                           mode="widthFix">
                    </image>
                </view>
                <view class="quickly-container-cointab">
                    <fui-tabs :scale="1"
                              :tabs="coinList"
                              :current="subCoinCurrent"
                              :short="false"
                              scroll
                              alignLeft
                              padding="0"
                              height="78"
                              size="26"
                              selectedSize="26"
                              fontWeight="500"
                              color="var(--content-tertiary)"
                              selectedColor="var(--content-primary)"
                              sliderBackground="var(--content-primary)"
                              background="var(--background-primary)"
                              @change="coinChange">
                    </fui-tabs>
                </view>
            </view>
            <view class="quickly-container-swiper" :style="{ height: swiperHeight + 'px' }">
                <!--    directionOption Swiper    -->
                <swiper :duration="duration"
                        :current="direction"
                        :style="{ height: swiperHeight + 'px' }">
                    <swiper-item v-for="(item,index) in directionOption.length" :key="index">
                        <!--   sub coinoptions swiper    -->
                        <swiper :duration="duration"
                                :current="subCoinCurrent"
                                :style="{ height: swiperHeight + 'px' }"
                                @change="subSwiperChange"
                                @transition="swiperTransition">
                            <swiper-item v-for="(subitem,subindex) in subCoinOption.length" :key="subindex">
                                <!-- pay -->
                                <view v-if="direction === 0">
                                    <view class="input-label">
                                        <text class="font-13 color-black">{{$t('quickly.tt1')}}</text>
                                        <view class="input-label-box">
                                            <input type="digit" v-model="amount"
                                                   :placeholder="$t('quickly.tt7a') + ($util.thousandSeparator((amount == '' ? current['recharge_min'] : amount) * current['new_price'] * currency_rate,2))"
                                                   placeholder-class="placeholder"/>
                                            <text class="font-13 color-black desc">{{symbol}}</text>
                                        </view>
                                    </view>
                                    <view class="input-label">
                                        <text class="font-13 color-black">{{$t('quickly.tt2')}}</text>
                                        <view class="input-label-box">
                                            <input type="text" :disabled="true"
                                                   :placeholder="$t('quickly.tt7a') + (amount == '' ? current['recharge_min'] : $util.thousandSeparator(amount / (current['new_price'] * currency_rate),8))"
                                                   placeholder-class="placeholder"/>
                                            <text class="font-13 color-black desc">{{ current['symbol'] }}</text>
                                        </view>
                                    </view>
                                    <view class="tip">
                                        <text class="font-11 color-gray">{{$t('quickly.tt3')}}：1.00 {{ current['symbol'] }}=
                                            {{ $util.thousandSeparator(current['new_price'] * currency_rate) }} {{symbol}}
                                        </text>
                                    </view>
                                    <view class="quickly-container-button">
                                        <fui-button height="78rpx"
                                                    radius="78rpx"
                                                    color="var(--content-always-white)"
                                                    background="var(--content-trade-buy)"
                                                    size="26"
                                                    @click="buyConfirm">
                                            {{ $t('trade.buy') }} {{ current['symbol'] }}
                                        </fui-button>
                                    </view>
                                </view>
                                <!-- sell -->
                                <view v-if="direction === 1">
                                    <view class="input-label">
                                        <text class="font-13 color-black">{{$t('quickly.tt4')}}</text>
                                        <view class="input-label-box">
                                            <input type="digit" v-model="amount"
                                                   :placeholder="$t('quickly.tt7a') + current['with_min'] "
                                                   placeholder-class="placeholder"/>
                                            <view class="flex flex-row align-center desc-box">
                                                <text class="font-13 color-primary mr-10"
                                                      @click="amount = $util.float(balance.balance)">{{$t('quickly.tt5')}}
                                                </text>
                                                <text class="font-13 color-black">{{
                                                        current['symbol']
                                                    }}
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <!-- 可用余额 -->
                                    <view class="tip flex flex-row align-center justify-between">
                                        <view class="flex flex-row align-center">
                                            <text class="font-12 color-gray mr-5">{{$t('quickly.tt6')}}</text>
                                            <fui-icon @click="modalShow = true" name="warning" size="30"
                                                      color="var(--content-tertiary)"></fui-icon>
                                            <text class="font-12 color-warring font-weight ml-5">
                                                {{ $util.float(balance.balance) }}
                                                {{ current['symbol'] }}
                                            </text>
                                        </view>
                                        <view class="flex flex-row align-center" @click="$mroute.exchange()">
                                            <image class="cell-toggle-icon"
                                                   src="/static/img/tactic/tran-icon.png"
                                                   mode="widthFix">
                                            </image>
                                            <text class="font-12 color-primary ml-5">{{$t('quickly.tt7')}}</text>
                                        </view>
                                    </view>

                                    <view class="input-label">
                                        <text class="font-13 color-black">{{$t('quickly.tt8')}}</text>
                                        <view class="input-label-box">
                                            <input type="text" :disabled="true"
                                                   :placeholder="$t('quickly.tt7a') + $util.thousandSeparator((amount == '' ? current['with_min'] : amount) * current['new_price'] * currency_rate,2)"
                                                   placeholder-class="placeholder"/>
                                            <text class="font-13 color-black desc">{{symbol}}</text>
                                        </view>
                                    </view>
                                    <!-- 参考价格 -->
                                    <view class="tip">
                                        <text class="font-11 color-gray">{{$t('quickly.tt3')}}：1 USDT = {{ currency_rate }} {{symbol}}
                                        </text>
                                    </view>
                                    <view class="quickly-container-button">
                                        <fui-button height="78rpx"
                                                    radius="78rpx"
                                                    background="var(--content-trade-sell)"
                                                    size="26"
                                                    @click="sellerPopup = true">
                                            {{$t('quickly.tt8a')}} {{ current['symbol'] }}
                                        </fui-button>
                                    </view>
                                </view>
                            </swiper-item>
                        </swiper>
                    </swiper-item>
                </swiper>
            </view>
        </view>

        <!--  导航/更多  -->
        <view class="menu-wrap" :class="menuShow ? 'menuShow' : 'menuHide'" :style="{'top': navHeight + 'px'}">
            <!--收款方式-->
            <view class="menu-item" @click="menuShow = false; $mroute.toPaymentMethod()">
                <text class="font-13 color-black">{{$t('quickly.tt9')}}</text>
            </view>
            <!--发布广告-->
            <!-- <view class="menu-item">
              <text class="font-13 color-black">发布广告</text>
            </view> -->
            <!--C2C管理-->
            <!--  <view class="menu-item">
                <text class="font-13 color-black">C2C管理</text>
              </view> -->
            <!--新手引导-->
            <view class="menu-item" @click="menuShow = false; beginnerTutorial = true;">
                <text class="font-13 color-black">{{$t('quickly.tt10')}}</text>
            </view>
            <!--申请商家-->
            <view class="menu-item" @click="close()">
                <text class="font-13 color-black">{{$t('quickly.tt11')}}</text>
            </view>
            <!--广告口令-->
            <!-- <view class="menu-item" @click="menuShow = false; advertising = true;">
               <text class="font-13 color-black">广告口令</text>
             </view> -->
            <!--联系客服-->
            <view class="menu-item">
                <text class="font-13 color-black">{{$t('quickly.tt12')}}</text>
            </view>
        </view>
        <!-- 未实名弹窗 -->
        <fui-bottom-popup background="var(--background-primary)" :show="realName" @close="closePopup">
            <view class="bottom-popup-wrap">
                <view class="bottom-popup-wrap-title">
                    <text class="font-16 color-black font-weight">{{$t('quickly.tt13')}}</text>
                    <view class="close-icon" @click="closePopup">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="bottom-popup-wrap-container">
                    <view class="real-name-label">
                        <view class="real-name-label-left">
                            <fui-icon name="idcard" size="36" color="var(--content-primary)"></fui-icon>
                            <text class="font-14 color-black font-weight">{{$t('quickly.tt14')}}</text>
                        </view>
                        <view class="real-name-label-right">
                            <text class="font-12 color-gray" @click="realName=false;$mroute.userauth()"
                                  v-if="userinfo['authStatus'] !== 1">{{$t('quickly.tt15')}}
                            </text>
                            <text class="font-12 color-gray" v-else>{{$t('quickly.tt16')}}</text>
                            <fui-icon name="arrowright" size="36" color="var(--content-tertiary)"></fui-icon>
                        </view>
                    </view>
                    <view class="real-name-label">
                        <view class="real-name-label-left">
                            <fui-icon name="mail" size="36" color="var(--content-primary)"></fui-icon>
                            <text class="font-14 color-black font-weight">{{$t('quickly.tt17')}}</text>
                        </view>
                        <view class="real-name-label-right">
                            <text class="font-12 color-gray" @click="realName=false;$mroute.phoneAuth(0,'email')"
                                  v-if="userinfo['email'] == null || userinfo['email'] == ''">{{$t('quickly.tt18')}}
                            </text>
                            <text class="font-12 color-gray" v-else>{{$t('quickly.tt19')}}</text>
                            <fui-icon name="arrowright" size="36" color="var(--content-tertiary)"></fui-icon>
                        </view>
                    </view>
                    <view class="real-name-label">
                        <view class="real-name-label-left">
                            <fui-icon name="mobile" size="36" color="var(--content-primary)"></fui-icon>
                            <text class="font-14 color-black font-weight">{{$t('quickly.tt20')}}</text>
                        </view>
                        <view class="real-name-label-right">
                            <text class="font-12 color-gray" @click="realName=false;$mroute.phoneAuth(0,'phone')"
                                  v-if="userinfo['phone'] == null || userinfo['phone'] == ''">{{$t('quickly.tt18')}}
                            </text>
                            <text class="font-12 color-gray" v-else>{{$t('quickly.tt19')}}</text>
                            <fui-icon name="arrowright" size="36" color="var(--content-tertiary)"></fui-icon>
                        </view>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--	新手教程弹窗 / Beginner tutorial  -->
        <!--	新手教程弹窗 / Beginner tutorial  -->
        <fui-bottom-popup background="var(--background-primary)"
                          radius="30"
                          :show="beginnerTutorial"
                          @close="closePopup">
            <view class="bottom-popup-wrap beginner-tutorial-wrap">
                <view class="bottom-popup-wrap-title">
                    <text class="font-16 color-black font-weight">{{$t('quickly.tt20a')}}</text>
                    <view class="close-icon" @click="closePopup">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="bottom-popup-wrap-container">
                    <view class="beginner-tutorial-wrap-head">
                        <swiper duration="300" :current="beginCurrent" class="beginner-tutorial-wrap-swiper"
                                @change="beginSwiper">
                            <swiper-item>
                                <image src="/static/quickly/beginner-img1.png" mode="widthFix"></image>
                                <text class="font-13 color-black mt-15">{{$t('quickly.tt21')}}</text>
                                <text class="font-13 color-primary font-weight mt-15">{{$t('quickly.tt22')}}</text>
                            </swiper-item>
                            <swiper-item>
                                <image src="/static/quickly/beginner-img2.png" mode="widthFix"></image>
                                <text class="font-16 color-black mt-15">{{$t('quickly.tt23')}}</text>
                                <text class="font-13 color-gray mt-15">
                                    {{$t('quickly.tt24')}}
                                </text>
                            </swiper-item>
                            <swiper-item>
                                <image src="/static/quickly/beginner-img3.png" mode="widthFix"></image>
                                <text class="font-16 color-black mt-15">{{$t('quickly.tt25')}}</text>
                                <text class="font-13 color-gray mt-15">{{$t('quickly.tt26')}}
                                </text>
                            </swiper-item>
                            <swiper-item>
                                <image src="/static/quickly/beginner-img4.png" mode="widthFix"></image>
                                <text class="font-16 color-black mt-15">{{$t('quickly.tt27')}}</text>
                                <text class="font-13 color-gray mt-15">
                                    {{$t('quickly.tt28')}}
                                </text>
                            </swiper-item>
                        </swiper>
                    </view>
                    <view class="beginner-tutorial-wrap-bottom">
                        <view class="left">
                            <text class="dots" :class="beginCurrent === index ? 'dot-active' : ''"
                                  v-for="(item,index) in 4"
                                  :key="index"></text>
                        </view>
                        <view class="right">
                            <view class="button" @click="nextTap">
                                <image v-if="beginCurrent < 3" src="/static/quickly/M4Z.png"></image>
                                <text v-else class="font-13 always-white">{{$t('quickly.tt29')}}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--	广告口令 / advertising  -->
        <fui-bottom-popup background="var(--background-primary)"
                          :show="advertising" @close="closePopup">
            <view class="bottom-popup-wrap advertising-wrap">
                <view class="bottom-popup-wrap-title">
                    <text class="font-16 color-black font-weight">{{$t('quickly.tt30')}}</text>
                    <view class="close-icon" @click="closePopup">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="bottom-popup-wrap-container">
                    <view class="advertising-label">
                        <text class="font-13 color-black">{{$t('quickly.tt31')}}</text>
                        <view class="advertising-label-box">
                            <input type="text" :placeholder="$t('quickly.tt32')" placeholder-class="placeholder"/>
                        </view>
                    </view>
                    <view class="advertising-button">
                        <fui-button height="78rpx"
                                    radius="78rpx"
                                    background="var(--content-primary)"
                                    size="26"
                                    color="var(--background-primary)">
                            {{$t('quickly.tt33')}}
                        </fui-button>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--  可出售模态框 /modalShow  -->
        <fui-modal :buttons="[]" background="transparent" width="600" :show="modalShow">
            <view class="modal-wrap">
                <text class="font-16 color-black font-weight">{{$t('quickly.tt34')}}</text>
                <text class="font-14 color-black describe mt-15">
                    {{$t('quickly.tt35')}}
                </text>
                <view class="modal-wrap-content">
                    <view class="item">
                        <text class="font-12 color-gray">{{$t('quickly.tt36')}}：</text>
                        <text class="font-12 color-gray font-weight">{{ $util.float(balance.balance) }}
                            {{ current['symbol'] }}
                        </text>
                    </view>
                    <view class="item">
                        <text class="font-12 color-gray">{{$t('quickly.tt37')}}：</text>
                        <text class="font-12 color-gray font-weight">0 {{ current['symbol'] }}</text>
                    </view>
                    <view class="item">
                        <text class="font-12 color-gray">{{$t('quickly.tt38')}}：</text>
                        <text class="font-12 color-gray font-weight">{{ $util.float(balance.balance) }}
                            {{ current['symbol'] }}
                        </text>
                    </view>
                </view>
                <view class="modal-wrap-button">
                    <fui-button height="78rpx"
                                :size="26"
                                background="var(--content-primary)"
                                color="var(--background-primary)"
                                radius="78rpx"
                                @click="modalShow = false">
                        {{$t('quickly.tt39')}}
                    </fui-button>
                </view>
            </view>
        </fui-modal>
        <!--  设置昵称提示  -->
        <alert ref="alert" :ctxt="ctxt" :ftxt="ftxt" :title="title" @confirm="$refs.alert.close()"
               :content="content"></alert>
        <!--  购买/付款弹窗 /paymentPopup  -->
        <fui-bottom-popup background="var(--background-primary)"
                          radius="30"
                          :show="paymentPopup"
                          @close="closePopup">
            <view class="bottom-popup-wrap advertising-wrap">
                <view class="bottom-popup-wrap-title">
                    <text class="font-16 color-black font-weight">{{$t('quickly.tt40')}}</text>
                    <view class="close-icon" @click="closePopup">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="bottom-popup-wrap-container">
                    <template v-for="(item,index) in merchant" :key="index">
                        <view class="pay-item" :class="{'pay-item-active' : paymentActive === index}"
                              @click="paymentChange(index)">
                            <view class="left">
                                <image src="/static/quickly/alipay.png" mode="widthFix" v-if="index=='alipay'"></image>
                                <image src="/static/quickly/wechatpay.png" mode="widthFix"
                                       v-if="index=='wechatpay'"></image>
                                <image src="/static/quickly/unionpay.png" mode="widthFix" v-if="index=='bank'"></image>
                                <text class="font-14 color-black" v-if="index=='alipay'">{{$t('quickly.tt41')}}</text>
                                <text class="font-14 color-black" v-if="index=='bank'">{{$t('quickly.tt42')}}</text>
                                <text class="font-14 color-black" v-if="index=='wechatpay'">{{$t('quickly.tt43')}}</text>
                            </view>
                            <view class="right">
                                <text class="font-13 color-black font-weight">￥{{ amount }}</text>
                            </view>
                        </view>
                    </template>

                    <view class="advertising-button">
                        <fui-button height="78rpx"
                                    radius="78rpx"
                                    color="var(--content-always-white)"
                                    background="var(--content-trade-buy)"
                                    size="26"
                                    @click="this.closePopup(); submitOrder(1) ">
                            {{$t('quickly.tt33')}}
                        </fui-button>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--  出售/选择收款方式弹窗 /sellerPopup  -->
        <fui-bottom-popup background="var(--background-primary)"
                          radius="30"
                          :show="sellerPopup"
                          @close="closePopup">
            <view class="bottom-popup-wrap advertising-wrap">
                <view class="bottom-popup-wrap-title">
                    <text class="font-16 color-black font-weight">{{$t('quickly.tt44')}}</text>
                    <view class="close-icon" @click="closePopup">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="bottom-popup-wrap-container">
                    <template v-for="(item,index) in payment" :key="'p'+index">
                        <view class="seller-item" :class="{'item-active' : sellerActive === index}"
                              @click="sellerChange(index)">
                            <view class="left">
                                <image src="/static/quickly/alipay.png" v-if="item.type === 2"></image>
                                <image src="/static/quickly/wechatpay.png" v-if="item.type === 1"></image>
                                <image src="/static/quickly/unionpay.png" v-if="item.type === 3"></image>
                            </view>
                            <view class="right">
                                <view class="right-column">
                                    <text class="font-13 color-black" v-if="item.type === 2">{{$t('quickly.tt41')}}</text>
                                    <text class="font-13 color-black" v-if="item.type === 1">{{$t('quickly.tt42')}}</text>
                                    <text class="font-13 color-black" v-if="item.type === 3">{{$t('quickly.tt43')}}</text>
                                    <text class="font-12 color-gray">{{ item.account }} {{ item.name }}</text>
                                </view>
                                <!-- <view class="right-end">
                                    <text class="font-13 color-black font-weight">¥ {{currency_rate}}</text>
                                    <view class="flex align-center justify-end"
                                          @click="this.closePopup();$mroute.toPaymentMethod()" >
                                        <fui-icon name="plus" color="var(--blue)" size="40" fontWeight="500"></fui-icon>
                                        <text class="font-12 color-primary font-weight">添加</text>
                                    </view>
                                </view> -->
                            </view>
                        </view>
                    </template>

                    <view class="advertising-button" v-if="payment.length > 0">
                        <fui-button height="78rpx"
                                    radius="78rpx"
                                    color="var(--content-always-white)"
                                    background="var(--content-trade-sell)"
                                    size="26"
                                    @click="this.closePopup(); fundPopup = true; ">
                            {{$t('quickly.tt45')}}
                        </fui-button>
                    </view>
                    <view class="advertising-button" v-else>
                        <fui-button height="78rpx"
                                    radius="78rpx"
                                    color="var(--background-primary)"
                                    background="var(--content-primary)"
                                    size="26"
                                    @click="this.closePopup();$mroute.toAddMethod() ">
                             {{$t('quickly.tt46')}}
                        </fui-button>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <!--  资金密码弹窗 / fundPopup -->
        <fui-bottom-popup background="var(--background-primary)"
                          radius="30"
                          :show="fundPopup"
                          @close="closePopup">
            <view class="bottom-popup-wrap advertising-wrap">
                <view class="bottom-popup-wrap-title">
                    <text class="font-16 color-black font-weight">{{$t('quickly.tt47')}}</text>
                    <view class="close-icon" @click="closePopup">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="bottom-popup-wrap-container">
                    <view class="advertising-label">
                        <view class="advertising-label-box">
                            <input type="password" v-model="password" :placeholder="$t('quickly.tt48')"
                                   placeholder-class="placeholder"/>
                        </view>
                    </view>
                    <view class="mt-10">
                        <text class="font-12 color-primary" @click="$mroute.forgetpwd()">{{$t('quickly.tt49')}}</text>
                    </view>
                    <view class="advertising-button">
                        <fui-button height="78rpx"
                                    radius="78rpx"
                                    color="var(--background-primary)"
                                    background="var(--content-primary)"
                                    size="26"
                                    @click="verifyPwd()">
                            {{$t('quickly.tt33')}}
                        </fui-button>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
        <fui-toast size="26" :background="'var(--mask-bakground-bg)'" ref="toast"></fui-toast>
    </view>
</template>

<script>
import service from './service.js';

export default service;
</script>

<style lang="scss" scoped>
@import 'quickly.scss';
</style>

<style scoped>
/deep/ .fui-tabs__item {
    padding: 0 26rpx 0 16rpx !important;
}
</style>
