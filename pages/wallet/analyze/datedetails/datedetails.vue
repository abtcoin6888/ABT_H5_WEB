<template>
    <view class="page-warp bg-gray"
          :data-theme="userTheme">
        <fui-nav-bar custom
                     statusBar
                     isFixed
                     isOccupy
                     background="var(--background-primary)"
                     @init="initNavigation">
            <view class="page-navigation">
                <view class="nav-back">
                    <fui-icon name="arrowleft"
                              size="56"
                              color="var(--content-primary)"
                              @click="$mroute.back()">
                    </fui-icon>
                </view>
                <view class="nav-title">
                    <text class="font-16 font-weight color-black">
                        {{ $t('detail.text1') }}
                    </text>
                </view>
                <view class="nav-right">
                    <image class="time-icon"
                           :src="`/static/newImage/time-${userTheme}.png`"
                           @click="datePickerShow = true">
                    </image>
                </view>
            </view>
        </fui-nav-bar>
        <scroll-view class="page-scroll-view"
                     :scroll-y="true"
                     :show-scrollbar="false"
                     :style="`height: ${pageBodyHeight}px;`">
            <view class="scroll-container">
                <fui-sticky>
                    <view class="date-range bg-gray">
                        <text class="font-11 font-weight color-gray">
                            {{ startTime }} To {{ endTime }}
                        </text>
                    </view>
                </fui-sticky>
                <view class="date-arr">
                    <view class="date-item bg-white"
                          v-for="item in dataList"
                          :key="item">
                        <view class="item-time">
                            <text class="font-13 font-bold color-black">
                                {{ item.time }}
                            </text>
                        </view>
                        <view class="cell-list">
                            <view class="cell"
                                  v-for="(sitem,sindex) in item.dataArr"
                                  :key="sindex"
                                  :class="{'not-margin': sindex > 2}">
                                <text class="font-11 color-gray">
                                    {{ sitem.text }}
                                </text>
                                <text class="font-12 color-black font-weight">
                                    ￥{{ sitem.limit }}
                                </text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
        <fui-date-picker :show="datePickerShow"
                         :theme="userTheme"
                         :range="true"
                         :start="$t('text.start_time')"
                         :end="$t('text.end_time')"
                         :cancelText="$t('login.cancel')"
                         :confirmText="$t('login.confirm')"
                         type="3"
                         @change="pickerChange"
                         @cancel="datePickerShow = false">
        </fui-date-picker>
    </view>
</template>
<script>
import service from "./service"

export default service;
</script>
<style lang="scss">
@import "datedetails";
</style>