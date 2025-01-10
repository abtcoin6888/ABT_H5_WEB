<template>
    <view class="welfare bg-dark" :data-theme="userTheme">
        <fui-nav-bar :title="$t('welfare.txt1')"
                     background="var(--white)"
                     color="var(--black)"
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft" size="56" color="var(--black)"></fui-icon>
        </fui-nav-bar>
        <scroll-view scroll-y class="scroll-view bg-dark" :style="{'height': scrollHeight + 'px'}">
            <view class="banner">
                <view class="banner-title">
                    <text class="font-18 font-weight color-white">{{ $t('welfare.txt1') }}</text>
                    <text class="font-13 font-weight color-white mt-15">{{ $t('welfare.txt2') }}</text>
                </view>
                <view class="checkin" @click="checkinPop = isLogin">
                    <image src="/static/welfare/CheckIn.png" mode=""></image>
                    <text class="font-12 color-white font-weight" v-if="isLogin">{{ $t('welfare.txt3') }}</text>
					<text class="font-12 color-white font-weight" v-else>{{ $t('welfare.btn0') }}</text>
                    <fui-icon name="arrowright" size="38" color="#ffffff"></fui-icon>
                </view>
            </view>
            <view class="v-box">
                <view class="payments bg-linear-dark">
                    <view class="title">
                        <text class="font-12 color-white font-weight">{{ $t('welfare.txt4') }}</text>
						<!-- @click="$mroute.rewardsInfo()" -->
                        <view class="right" @click="$mroute.rewardsInfo()">
                            <text class="font-12 color-white">{{ $t('welfare.txt5') }}</text>
                            <fui-icon name="arrowright" size="38" :color="'var(--white)'"></fui-icon>
                        </view>
                    </view>
                    <!-- not login -->
                    <view class="payments-bottom" v-if="isLogin == false">
                        <view class="item">
                            <view class="cell">
                                <text class="mr-5 linear-golden font-20 font-weight">****</text>
                                <text class="mr-5 font-12 color-white">USDT</text>
                                <fui-icon name="help-fill" size="30" :color="'var(--dark-gray)'"
                                          @click="showTips(0)"></fui-icon>
                            </view>
                        </view>
                        <view class="item mt-15">
                            <view class="button font-13 bg-linear-golden color-black font-weight"
                                  @click="$mroute.login()">
                                {{ $t('welfare.btn0') }}
                            </view>
                        </view>
                    </view>
                    <!-- is login -->
				
                    <view class="payments-bottom isloginbox mt-15" v-else>
					
                        <view class="tag-cell bg-golden" v-if="userinfo.status !== 1">
                            <view>
                                <fui-icon name="info-fill" size="30" :color="'var(--color-text-golden)'"></fui-icon>
                                <text class="font-11 color-golden ml-5">{{ $t('welfare.txt13') }}</text>
                            </view>
                            <view  @click="$mroute.baseauth()">
                                <text class="font-11 color-white">{{ $t('welfare.btn3') }}</text>
                                <fui-icon name="arrowright" size="38" :color="'var(--white)'"></fui-icon>
                            </view>
                        </view>
                        <view class="l-cell mt-15">
                            <view class="left">
                                <text class="mr-5 linear-golden font-16 font-weight">{{$util.thousandSeparator(avaAmount,2)}}</text>
                                <text class="mr-5 font-12 color-white">USDT</text>
                                <fui-icon name="help-fill" size="26" :color="'var(--dark-gray)'" @click="showTips(0)"></fui-icon>
                            </view>
                            <view @click="withdraw()" :class="{'color-gray':avaAmount<150,'color-white':avaAmount>=150}" class="button bg-gray font-13  font-weight">{{ $t('welfare.txt34') }}</view>
                        </view>
                    </view>
                </view>
            </view>
            <!-- Task list -->
            <view class="task-list">
                <view class="title">
                    <text class="font-16  font-weight" :class="{'color-white':btnActive===0,'color-999':btnActive!=0}" @click="btnActive=0">{{ $t('welfare.txt6') }}</text>
					<text class="font-16  font-weight" :class="{'color-white':btnActive===1,'color-999':btnActive!=1}" @click="btnActive=1" style="margin-left: 20rpx;">{{ $t('welfare.txt6s') }}</text>
                </view>
                <view class="list-con bg-linear-dark">
                    <view class="title">
                        <text class="font-15 color-white font-weight">{{ btnActive === 0 ? $t('welfare.txt6'):$t('welfare.txt6s') }}</text>
                    </view>
					<template v-for="(item,index) in taskList" :key="index">
						<view class="cell-box" >
						    <image class="left-image" :src="item.icon" mode=""></image>
						    <view class="center">
						        <text class="font-14 color-white font-weight">{{ item.title }}</text>
						        <text class="font-12 color-gray mt-5">
									{{ item.desc }}
						        </text>
						    </view>
						    <view class="button">
						        <text class="font-12 color-golden font-weight" @click="navtoTask(item)" v-if="item.status == 0">{{ item.btn_text }}</text>
								<text class="font-12 color-golden font-weight" v-if="item.status == 1">{{ $t('welfare.txt43') }}</text>
						    </view>
						</view>
					</template>
                </view>
            </view>
        </scroll-view>
        <!--  Check-in-Pop  -->
        <fui-landscape :show="checkinPop" :maskBackground="'var(--mask-bakground-bg)'" :closable="false">
            <view class="check-in-pop">
                <view class="check-in-pop-top">
                    <view class="check-in-title">
                        <text class="font-16 font-weight color-white">
                            {{ $t('welfare.st1') }}
                            <text class="color-golden font-weight">{{ $t('welfare.st2') }}</text>
                        </text>
                        <text class="font-12 color-gray">{{ $t('welfare.st3') }} 25.00 USDT</text>
                    </view>
                    <view class="check-in-group">
                        <view class="check-item" :class="item.status ? '' : 'checked'"
                              v-for="(item,index) in qdList" :key="index">
                            <image src="/static/welfare/check.png" mode=""></image>
                            <text class="font-12 color-white font-weight">{{$t('welfare.d')}}{{ item.day }}{{$t('welfare.day')}}</text>
                            <text class="font-12 color-white font-weight">+{{ item.amount }} USDT</text>
                        </view>
                    </view>
                    <view class="check-in-button bg-linear-golden" v-if="todaySign && day <= qdList.length" @click="checkIn">
                        <text class="font-13 color-black font-weight">{{ $t('welfare.st10') }}</text>
                    </view>
                    <view class="check-in-button bg-gray" v-else>
                        <text class="font-13 color-gray font-weight" v-if="day < qdList.length">{{ $t('welfare.st12') }}</text>
						<text class="font-13 color-gray font-weight" v-else>{{ $t('welfare.st12s') }}</text>
					</view>
                </view>
                <view class="close" @click="closePopup">
                    <fui-icon name="clear-fill" size="56" :color="'var(--color-text-dark-gray)'"></fui-icon>
                </view>
            </view>
        </fui-landscape>
        <!--  提示  -->
        <fui-toast size="26" :background="'var(--mask-bakground-bg)'" ref="toast"></fui-toast>
    </view>
</template>

<script>
import service from './service.js'
export default service;
</script>

<style lang="scss" scoped>
@import "welfare.scss";
</style>

<style scoped>
page {
    background-color: #121417;
}
</style>