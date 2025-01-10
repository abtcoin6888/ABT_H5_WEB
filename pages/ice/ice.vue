<template>
    <view class="icePage" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--white)"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="icePage-container">
            <!-- banner swiper -->
            <view class="banner">
                <view class="banner-content">
                    <swiper class="banner-swiper" duration="500" @change="bannerCurrent = $event.detail.current">
                        <swiper-item class="banner-swiper-item">
                            <view class="item-cell">
                                <text class="font-16 color-white font-weight">{{$t('ice.t1')}}</text>
                            </view>
                            <view class="item-cell">
                                <view class="num">
                                    <text class="font-33 color-white font-weight">{{$util.float(info['balance'])}}</text>
                                    <text class="sup font-18 color-white font-weight"></text>
                                </view>
                                <image class="logo-icon" src="/static/ptbw.png"></image>
                                <text class="font-24 color-white font-weight">{{active['currency'] ? active['currency']['symbol']:''}}</text>
                            </view>
                            <view class="item-tag tag-bg">
                                <text class="font-12 color-white font-weight">{{$t('ice.t2')}}</text>
                                <view class="num">
                                    <text class="font-17 color-white font-weight">
									{{info['level_list'] ? $util.float(parseFloat(active['income']) + parseFloat(info['level_list'][info.level-1]['income'])):'--'}}
									</text>
                                </view>
                                <image class="logo-icon wd-30" src="/static/ptbw.png"></image>
                                <text class="font-12 color-white font-weight">{{active['currency'] ? active['currency']['symbol']:''}}/H</text>
                            </view>
                        </swiper-item>
                        <swiper-item class="banner-swiper-item">
                            <view class="item-cell">
                  <!--              <image class="working-icon" src="/static/ptbw.png"></image> -->
                                <text class="font-16 color-white font-weight">{{$t('ice.t3')}}</text>
                            </view>
                            <view class="item-tag tag-bg">
                                <view class="num">
                                    <text class="font-17 color-white font-weight">+
									{{info['level_list'] ? $util.float(parseFloat(active['income']) + parseFloat(info['level_list'][info.level-1]['income'])):'--'}}
									</text>
                                  
                                </view>
                                <image class="logo-icon" src="/static/ptbw.png"></image>
                                <text class="font-12 color-white font-weight">{{active['currency']['symbol']}}/H</text>
                                <text class="font-17 color-white font-weight ml-8">+
								{{info['level_list'] ? $util.float(parseFloat(info['level_list'][info.level-1]['income']) / active['income']):'--'}}%
								</text>
                            </view>
                            <view class="item-tag item-cell">
                                <text class="font-12 color-white">{{$t('ice.t4')}}</text>
                                <view class="num">
                                    <text class="font-14 color-white font-weight">{{active['income']}}</text>
              <!--                      <text class="sup font-10 color-white font-weight">00</text> -->
                                </view>
                                <image class="logo-icon wd-30" src="/static/ptbw.png"></image>
                                <text class="font-12 color-white font-weight">{{active['currency']['symbol']}}/H</text>
                            </view>
                            <view class="item-cell item-rate-card">
                                <view class="_box">
                                    <image class="box-icon" src="/static/ice/users.svg"></image>
                                    <text class="font-15 color-green font-weight">+{{$util.float(parseFloat(info['1_income']) + parseFloat(info['2_income']))}}</text>
                                </view>
                                <view class="_box">
                                    <image class="box-icon wd-30" src="/static/ptbw.png"></image>
                                    <text class="font-15 color-green font-weight">{{$util.float(info['mining'])}}</text>
                                </view>
                                <!-- <view class="_box">
                                    <image class="box-icon" src="/static/ice/money.svg"></image>
                                    <text class="font-15 color-green font-weight">{{$util.float(info['mining'])}}</text>
                                </view> -->
                            </view>
                        </swiper-item>
                        <swiper-item class="banner-swiper-item">
                            <view class="item-cell">
                            <!--    <image class="working-icon" src="/static/ptbw.png"></image> -->
                                <text class="font-16 color-white font-weight">{{$t('ice.t5')}}</text>
                            </view>
                            <view class="item-column">
                                <view class="_cm">
                                    <text class="font-12 color-white">{{$t('ice.t6')}}</text>
                                    <text class="font-27 color-white font-weight">{{$util.thousandUnit(active['total_amount'])}}</text>
                                </view>
                                <view class="_cm">
                                    <text class="font-12 color-white">{{$t('ice.t7')}}</text>
                                    <text class="font-27 color-white font-weight">{{active['cycle']}}</text>
                                </view>
                            </view>
                            <view class="item-cell">
                                <text class="font-12 color-white description">
                                    {{active['brief']}}
                                </text>
                            </view>
                        </swiper-item>
                    </swiper>
                    <!--   swiper dot  -->
                    <view class="swiper-dot">
                        <view class="dot"
                              :class="{'dot-active': bannerCurrent === index}"
                              v-for="(item,index) in 3" :key="index">
                        </view>
                    </view>
                </view>
            </view>
            <!--  overview  -->
            <view class="overview">
                <view class="overview-title">
                    <text class="font-16 color-black font-weight">{{$t('ice.t8')}}</text>
                </view>
                <view class="overview-swiper">
                    <swiper class="scroll-swiper" next-margin="140rpx">
                        <swiper-item>
                            <view class="scroll-swiper-item">
                                <image class="bg-image" src="/static/ice/loop.svg"></image>
                                <view class="cell-row">
                                    <view class="item">
                                        <text class="font-12 color-white font-weight">{{$t('ice.t9')}}</text>
                                    </view>
                                    <view class="item">
                                        <text class="font-12 color-white font-weight">{{$t('ice.t10')}} {{info['level']}}</text>
                                    </view>
                                </view>
                                <view class="cell-column">
                                    <view class="item">
                                        <text class="font-10 color-gray">{{$t('ice.t11')}}</text>
                                        <text class="font-24 color-white font-weight">{{info['team_num']}}</text>
                                    </view>
                                    <view class="item">
                                        <text class="font-10 color-gray">{{$t('ice.t12')}}</text>
                                        <text class="font-24 color-white font-weight">{{info['rank']}}</text>
                                    </view>
                                </view>
                                <view class="cell-row">
                                    <text class="description font-10 color-white">
                                        {{$t('ice.t13')}}
                                        {{active['currency']['symbol']}} {{$t('ice.t14')}}
                                    </text>
                                </view>
                            </view>
                        </swiper-item>
                        <swiper-item>
                            <view class="scroll-swiper-item">
                                <image class="bg-image" src="/static/ice/ice-bg.svg"></image>
                                <view class="cell-row">
                                    <view class="item">
                                        <image src="/static/ice/champ.svg"></image>
                                        <text class="font-12 color-white font-weight">{{$t('ice.t15')}}</text>
                                    </view>
                                    <view class="item">
                                        <image src="/static/ice/user-friends.svg"></image>
                                        <text class="font-12 color-white font-weight">{{info['team_num']}}</text>
                                    </view>
                                </view>
                                <view class="cell-column">
                                    <view class="item">
                                        <text class="font-10 color-gray">{{$t('ice.t16')}}</text>
                                        <text class="font-24 color-white font-weight">{{info['level1_num']}}</text>
                                    </view>
                                    <view class="item">
                                        <text class="font-10 color-gray">{{$t('ice.t17')}}</text>
                                        <text class="font-24 color-white font-weight">{{info['level2_num']}}</text>
                                    </view>
                                </view>
                                <view class="cell-row">
                                    <text class="description font-10 color-white">
                                        {{$t('ice.t18')}}
                                    </text>
                                </view>
                            </view>
                        </swiper-item>
                        <swiper-item>
                            <view class="scroll-swiper-item">
                                <image class="bg-image" src="/static/ice/adoption-bg.svg"></image>
                                <view class="cell-row">
                                    <view class="item">
                                        <image src="/static/ice/adoption.svg"></image>
                                        <text class="font-12 color-white font-weight">{{$t('ice.t19')}}</text>
                                    </view>
                                    <view class="item">
                                        <image src="/static/ice/user-friends.svg"></image>
                                        <text class="font-12 color-white font-weight">{{info['team_num']}}</text>
                                    </view>
                                </view>
                                <scroll-view scroll-y class="cell-level">
                                    <view class="cell-level-row" :class="{'unlock': item.level > info['level']}"
                                          v-for="(item,index) in info['level_list']" :key="index">
                                        <view class="cell-level-row-item">
                                            <text class="font-15 color-white">{{ item.income }}</text>
                                            <view class="_row">
                                                <image class="logo-icon" src="/static/ptbw.png"></image>
                                                <text class="font-12 color-white">{{active['currency']['symbol']}}/H</text>
                                            </view>
                                        </view>
                                        <view class="cell-level-row-item">
                                            <view class="item">
                                                <text class="font-15 ice-level font-weight">{{ item.level }}</text>
                                                <text class="font-12 ice-level">level</text>
                                                <image class="locker-icon"
                                                       src="/static/ice/locker.svg"
                                                       v-if="item.unlock === false">
                                                </image>
                                            </view>
                                        </view>
                                        <view class="cell-level-row-item">
                                            <text class="font-15 color-white">{{ item.referrals_num }}</text>
                                            <text class="font-12 color-white">users</text>
                                        </view>
                                    </view>
                                </scroll-view>
                            </view>
                        </swiper-item>
                    </swiper>
                </view>
                <view class="overview-invite" @click="$mroute.invaite()">
                    <view class="invite-box">
                        <image class="invite-image" src="/static/ice/friends-ico.svg"></image>
                        <view class="invite-info">
                            <text class="font-16 color-white font-weight">{{$t('ice.t20')}}</text>
                            <text class="invite-desc">
                                <text class="font-12 color-white">{{$t('ice.t21')}}</text>
                                <image class="logo-icon" src="/static/ptbw.png"></image>
                                <text class="font-12 color-white">{{$t('ice.t22')}}{{active['currency']['symbol']}}</text>
                            </text>
                        </view>
                        <image class="invite-bg" src="/static/ptbw.png"></image>
                    </view>
                </view>
            </view>
            <!--  Team  -->
            <view class="team" :style="{'height': windowHeight - 50 + 'px'}">
                <view class="team-title">
                    <text class="font-16 color-black font-weight">{{$t('ice.t23')}}</text>
                </view>
                <view class="team-tab">
                    <view class="team-tab-box">
                        <view class="item-active" :style="{'--translateX': (tabIndex === 0 ? '0%' : '100%')}"></view>
                        <view class="item" @click="tabIndex = 0">
                            <image
                                :src="tabIndex === 0 ? '/static/ice/tier1-white.svg' : '/static/ice/tier1.svg'"></image>
                            <text class="font-16 font-weight"
                                  :class="tabIndex === 0 ? 'color-white' : 'color-gray'">
                                {{$t('ice.t24')}}
                            </text>
                        </view>
                        <view class="item" @click="tabIndex = 1">
                            <image
                                :src="tabIndex === 1 ? '/static/ice/tier2-white.svg' : '/static/ice/tier2.svg'"></image>
                            <text class="font-16 font-weight"
                                  :class="tabIndex === 1 ? 'color-white' : 'color-gray'">
                                {{$t('ice.t25')}}
                            </text>
                        </view>
                    </view>
                </view>
                <view class="team-container">
                    <swiper :duration="300" :current="tabIndex" class="team-swiper"
                            @change="tabIndex = $event.detail.current">
                        <swiper-item class="team-swiper-item">
                            <scroll-view scroll-y class="scroll-view">
                                <view class="scroll-top">
                                   <!-- <view class="item">
                                        <text class="font-14 color-gray">Active：</text>
                                        <text class="font-14 color-black font-weight">1/1</text>
                                    </view> -->
                                    <view class="item">
                                        <text class="font-14 color-gray">{{$t('ice.t26')}}：</text>
                                        <text class="font-14 color-black font-weight">{{info['1_income']}}</text>
                                        <image class="logo-icon" src="/static/ptbw.png"></image>
                                        <text class="font-14 color-black font-weight">{{active['currency']['symbol']}}</text>
                                    </view>
                                </view>
								<view class="not-data" v-if="teamList.length <= 0">
								    <image class="empty" src="/static/ice/empty-ill.png" mode="widthFix"></image>
								    <text class="font-14 color-dark tips">
								        {{$t('ice.t27')}}
								        {{$t('ice.t24')}}
								        {{$t('ice.t28')}}
								    </text>
								    <view class="empty-button" @click="$mroute.invaite()">
								        <image src="/static/ice/add-friend.svg"></image>
								        <text class="font-16 color-white font-weight">{{$t('ice.t20')}}</text>
								    </view>
								</view>
                                <view class="scroll-list">
                                    <view class="cell" v-for="(item,index) in teamList" :key="index">
                                        <view class="cell-left">
                                            <view class="image-box">
                                                <image class="avatar"
                                                       :src="item.avatar != null ? item.avatar : '/static/img/avatar.png'"></image>
                                                <view class="status"></view>
                                            </view>
                                            <text class="font-14 color-black font-weight" v-if="item.nickname != null">{{item.nickname}}</text>
											<text class="font-14 color-black font-weight" v-if="item.phone != null">{{$util.hideText(item.phone)}}</text>
											<text class="font-14 color-black font-weight" v-else>{{$util.hideText(item.email)}}</text>
                                        </view>
                                        <view class="cell-right">
                                            <view class="tag">
                                                <text class="font-13 color-black">Ping</text>
                                            </view>
                                            <!-- <image class="nati"
                                                   src="https://cdn.weglot.com/flags/rectangle_mat/cn.svg"></image> -->
                                        </view>
                                    </view>
                                </view>
                            </scroll-view>
                        </swiper-item>
                        <swiper-item class="team-swiper-item">
                            <scroll-view scroll-y class="scroll-view">
                                <view class="scroll-top">
                                   <!-- <view class="item">
                                        <text class="font-14 color-gray">Active：</text>
                                        <text class="font-14 color-black font-weight">0/0</text>
                                    </view> -->
                                    <view class="item">
                                        <text class="font-14 color-gray">{{$t('ice.t29')}}：</text>
                                        <text class="font-14 color-black font-weight">{{info['2_income']}}</text>
                                        <image class="logo-icon" src="/static/ptbw.png"></image>
                                        <text class="font-14 color-black font-weight">{{active['currency']['symbol']}}</text>
                                    </view>
                                </view>
                                <view class="not-data" v-if="teamList.length <= 0">
                                    <image class="empty" src="/static/ice/empty-ill.png" mode="widthFix"></image>
                                    <text class="font-14 color-dark tips">
                                        {{$t('ice.t27')}}
                                        {{$t('ice.t25')}}
                                        {{$t('ice.t28')}}
                                    </text>
                                    <view class="empty-button" @click="$mroute.invaite()">
                                        <image src="/static/ice/add-friend.svg"></image>
                                        <text class="font-16 color-white font-weight">{{$t('ice.t20')}}</text>
                                    </view>
                                </view>
                                <view class="scroll-list">
                                    <view class="cell" v-for="(item,index) in teamList" :key="index">
                                        <view class="cell-left">
                                            <view class="image-box">
                                                <image class="avatar"
                                                       :src="item.avatar != null ? item.avatar : '/static/img/avatar.png'"></image>
                                                <view class="status"></view>
                                            </view>
                                            <text class="font-14 color-black font-weight" v-if="item.nickname != null">{{item.nickname}}</text>
                                    		<text class="font-14 color-black font-weight" v-if="item.phone != null">{{$util.hideText(item.phone)}}</text>
                                    		<text class="font-14 color-black font-weight" v-else>{{$util.hideText(item.email)}}</text>
                                        </view>
                                        <view class="cell-right">
                                            <view class="tag">
                                                <text class="font-13 color-black">Ping</text>
                                            </view>
                                            <!-- <image class="nati"
                                                   src="https://cdn.weglot.com/flags/rectangle_mat/cn.svg"></image> -->
                                        </view>
                                    </view>
                                </view>
                            </scroll-view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
            <!--  底部悬浮 -->
            <view class="footer-box">
                <view class="mining-box" :class="{ 'mining-box-start' : miningStart && start }">
                    <view class="mining-box-left">
                        <image src="/static/ptb.png" style="border-radius:6px;"></image>
                        <view class="_info">
                            <text class="font-16 ice-level font-weight" style="color:#1989fa">{{active['currency']['symbol']}}</text>
                            <fui-count-down borderColor="var(--white)"
                                            width="30"
                                            size="24"
                                            colonSize="24"
											:isDays="!start"
                                            :isColon="isColon"
                                            :value="time"
                                            color="var(--ice-time-blue)"
                                            colonColor="var(--ice-time-blue)"
                                            @end="end"
                                            v-if="miningStart || !start">
                            </fui-count-down>
                            <text class="font-12 ice-level" v-else>{{$t('ice.t30')}}</text>
                        </view>
                    </view>
                    <view class="mining-box-right">
                        <view class="_button" @tap="clickMargin()">
                            <image src="/static/ice/download.svg"></image>
                            <text class="font-12 ice-level" v-if="start" style="color:#1989fa">
                                {{ !miningStart ? $t('ice.t31') : $t('ice.t32') }}
                            </text>
							<text class="font-12 ice-level" v-else>
							    {{$t('ice.t33')}}
							</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
		<alert ref="alert" :content="content" :ctxt="$t('取消')" :ftxt="$t('确定')"></alert>
    </view>
</template>
<script>
import service from './service.js';

export default service;
</script>
<style scoped lang="scss">
@import "ice";
</style>