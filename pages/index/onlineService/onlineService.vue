<template>
    <view class="service"
          :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--white)"
                     color="var(--text-black)"
                     :title="$t('common.kefu')"
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--black)">
            </fui-icon>
        </fui-nav-bar>
        <view class="service-body"
              :style="`height: ${bodyHeight}px`">
            <scroll-view scroll-y
                         class="serviceScroll"
                         :style="{ 'height': (bodyHeight - 55) + 'px' }"
                         :scroll-into-view="(focusState || emoteShow) ? 'plView' : ''"
                         @click="emoteShow = false">
                <view class="messageList">
					<!-- 链接提示 -->
					<view class="messageCell"
					      type="systemService" v-if="service === false">
						<view class="message">
						    <fui-loadmore text=""></fui-loadmore><text class="messageText">
								正在为您分配客服...
							</text>
						</view>
					</view>
                    <!-- 系统客服信息 -->
					<view class="messageCell"
					      type="systemService" v-if="service != false">
						<view class="avatar">
						    <image :src="service['avatar']"
						           mode="scaleToFill" />
						</view>
						<view class="message">
						    <text class="messageText">
								ABT客服 {{service['name']}} 为您服务，请问有什么可以帮您？
							</text>
						</view>
					</view>
                    <view class="messageCell"
                          type="systemService"
                          v-for="i in 0">
                        <view class="avatar">
                            <image style="width: 60px;height: 60px;" src="/static/verify.png"
                                   mode="scaleToFill" />
                        </view>
                        <!-- 文字 -->
                        <view class="message"
                              v-if="i == 1">
                            <text class="messageText">ABT机器人聊天体验,ABT机器人聊天体验,ABT机器人聊天体验</text>
                        </view>
                        <!-- 图片 -->
                        <view class="imageMessage"
                              v-if="i == 2">
                            <image src="/static/verify.png"
                                   mode="widthFix" />
                        </view>
                        <view class="imageMessage"
                              v-if="i == 3">
                            <text class="emote"
                                  :class="selectEmote != '' ? (`${selectEmote}` + ' ' + 'emoteAnimation') : ''"></text>
                        </view>
                    </view>
                    <!-- 用户消息 -->
                    <view class="messageCell"
                          type="userMessage">
                        <view class="message">
                            <text class="messageText">ABT机器人聊天体验,机器人聊天体验,机器人聊天体验</text>
                        </view>
                        <!-- 图片 -->
                        <view class="imageMessage"
                              v-if="false">
                            <image src="/static/verify.png"
                                   mode="widthFix" />
                        </view>
                        <view class="imageMessage"
                              v-if="false">
                            <text class="emote"
                                  :class="selectEmote != '' ? (`${selectEmote}` + ' ' + 'emoteAnimation') : ''"></text>
                        </view>
                        <view class="avatar">
                            <image src="/static/verify.png"
                                   mode="scaleToFill" />
                        </view>
                    </view>
                    <!-- 占位 -->
                    <view class="plView" id="plView" v-if="emoteShow || focusState"></view>
                </view>
            </scroll-view>
            <view class="serviceFooter">
                <view class="footerContent">
                    <view class="imageBox"
                          @click="popupShow = true, emoteShow = false">
                        <image :src="`/static/newImage/service/add-${userTheme}.png`"
                               mode="scaleToFill" />
                    </view>
                    <view class="imageBox"
                          @click="emoteShow = !emoteShow">
                        <image :src="`/static/newImage/service/emote-${userTheme}.png`"
                               mode="scaleToFill" />
                    </view>
                    <view class="inputBox">
                        <input type="text"
                               v-model="inputVal"
                               adjust-position="false"
                               placeholder=""
                               @focus="focusState = true"
                               @blur="focusState = false"
                               placeholder-class="placeholder">
                    </view>
                    <view class="imageBox" @click="sendMsg">
                        <image class="sendIcon" src="/static/newImage/service/send.png"
                               mode="scaleToFill" />
                    </view>
                </view>
                <!-- emote -->
                <view class="emote"
                      v-if="emoteShow">
                    <scroll-view scroll-y
                                 class="emoteScroll">
                        <view class="emoteGroup">
                            <view class="emoteItem"
                                  v-for="(val, index) in 50"
                                  :key="index"
                                  @click="selectEmote = ('emote-a-ThemeFlat-' + (index + 1))">
                                <text class="emote"
                                      :class="`emote-a-ThemeFlat-${index + 1}`"></text>
                            </view>
                        </view>
                    </scroll-view>
                </view>
            </view>
        </view>
        <!--  -->
        <fui-bottom-popup :show="popupShow"
                          background="var(--white)"
                          radius="30"
                          @close="popupShow = false">
            <view class="popupWarp">
                <view class="popupWarp-title">
                    <view class="closeIcon"
                          @click="popupShow = false">
                        <fui-icon name="close"
                                  size="52"
                                  color="var(--text-black)">
                        </fui-icon>
                    </view>
                </view>
                <view class="popupWarp-content">
                    <!-- 文件 -->
                    <view class="menuItem">
                        <view class="iconBox">
                            <image src="/static/newImage/service/popup-icon1.png"
                                   mode="scaleToFill" />
                        </view>
                        <text class="imageText">
                            {{$t('common.menut1')}}
                        </text>
                    </view>
                    <!-- 拍摄 -->
                    <view class="menuItem">
                        <view class="iconBox">
                            <image src="/static/newImage/service/popup-icon2.png"
                                   mode="scaleToFill" />
                        </view>
                        <text class="imageText">
                            {{$t('common.menut2')}}
                        </text>
                    </view>
                    <!-- 照片 -->
                    <view class="menuItem">
                        <view class="iconBox">
                            <image src="/static/newImage/service/popup-icon3.png"
                                   mode="scaleToFill" />
                        </view>
                        <text class="imageText">
                            {{$t('common.menut3')}}
                        </text>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>
		<loading ref="loading"></loading>
		<alert ref="alert" :ctxt="$t('取消')" :content="content" :title="$t('login.tip_t2')"></alert>
    </view>
</template>

<script>
import service from './service.js';
export default service;
</script>

<style lang="scss" scoped>
@import "onlineService";
</style>

<style>
@import url("./emote.css");
</style>