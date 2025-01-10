<template>
    <view class="page-warp bg-white"
          :data-theme="userTheme">
        <fui-nav-bar custom
                     statusBar
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
                        {{ $t('analyze.text0') }}
                    </text>
                </view>
            </view>
        </fui-nav-bar>
        <scroll-view class="page-scroll-view"
                     :scroll-y="true"
                     :show-scrollbar="false"
                     :scroll-with-animation="true"
                     :scroll-into-view="`tab${primaryTabCurrent}`"
                     :style="`height: ${pageBodyHeight}px;`">
            <view class="scroll-container">
                <!--      assets     -->
                <view class="assets">
                    <view class="assets-container">
                        <view class="estimate"
                              v-for="item in assetsArr['assetsContent']">
                            <text class="font-12 font-weight color-gray">
                                {{ item.title }}(USDT)
                            </text>
                            <text class="font-22 font-bold color-black">
                                {{ item.limit }}
                            </text>
                        </view>
                        <view class="pl-array">
                            <view class="pl-item" v-for="item in assetsArr['plArr']">
                                <text class="font-11 font-weight color-gray">
                                    {{ item.text }}
                                </text>
                                <text class="font-12 color-black">
                                    ${{ item.amount }}
                                </text>
                            </view>
                        </view>
                        <image class="order-icon" v-if="false"
                               :src="`/static/img/tactic/order-${userTheme}.png`"
                               @click="toDetails()">
                        </image>
                    </view>
                    <view class="update-time">
                        <text class="font-11 color-gray">
                            {{ $t('analyze.text19') }}：{{timedate}}
                        </text>
                    </view>
                </view>
                <fui-sticky>
                    <!--      tabs       -->
                    <view class="tabs-warp bg-white">
                        <view class="primary-tabs">
                            <view class="item"
                                  v-for="(item,index) in primaryTabs"
                                  :key="index"
                                  @click="primaryTabSwtich(index)">
                                <text class="font-13"
                                      :class="primaryTabCurrent == index ? 'item-active color-black font-weight' : 'color-gray'">
                                    {{ item }}
                                </text>
                            </view>
                        </view>
                        <view class="time-tabs">
                            <view class="item"
                                  v-for="(item,index) in timeTabs"
                                  :key="index"
                                  @click="timeTabSwitch(index)">
                                <text class="font-11"
                                      :class="timeTabCurrent == index ? 'time-active color-black font-weight' : 'color-gray'">
                                    {{ item }}
                                </text>
                            </view>
                        </view>
                    </view>
                </fui-sticky>
                <!--      chart      -->
                <view class="chart-arr">
                    <!--          Cumulative profit and loss          -->
                    <view class="chart-item"
                          id="tab0">
                        <view class="item-title"
                              @click="modalOpen(0)">
                            <text class="font-15 font-bold color-black">
                                {{ $t('analyze.text5') }}
                            </text>
                            <fui-icon name="info"
                                      size="32"
                                      color="var(--content-tertiary)">
                            </fui-icon>
                        </view>
                        <view class="item-descr">
                            <text class="font-11 color-gray">
                                {{ $t('analyze.text11') }}
                            </text>
                            <text class="font-11 color-black limit-text font-weight">
                                ${{$util.thousandSeparator(total)}}
                            </text>
                        </view>
                        <view class="chart-container">
                            <qiun-data-charts type="tarea"
                                              :opts="opts.sum"
                                              :chartData="groupData['sumProfit']"/>
                        </view>
                    </view>
                    <!--         Daily profit and loss           -->
                    <view class="chart-item"
                          id="tab1">
                        <view class="item-title"
                              @click="modalOpen(1)">
                            <text class="font-15 font-bold color-black">
                                {{ $t('analyze.text6') }}
                            </text>
                            <fui-icon name="info"
                                      size="32"
                                      color="var(--content-tertiary)">
                            </fui-icon>
                        </view>
                        <view class="item-descr descr-padding bg-gray">
                            <text class="font-11 color-gray">
                                {{group['dayList'] ? group['dayList']['key'][group['dayList']['key'].length - 1] : 0}}
                            </text>
                            <view class="descr-cell">
                                <text class="font-11 color-black limit-text font-weight">
                                    ${{$util.thousandSeparator(group['dayList'] ? group['dayList']['value'][group['dayList']['value'].length - 1]:0)}}
                                </text>
                                <view class="cell-right">
                                    <text class="font-11 color-black">
                                        {{ $t('analyze.text12') }}
                                    </text>
                                    <text class="font-11 color-black">
                                        {{ $t('analyze.text13') }}
                                    </text>
                                </view>
                            </view>
                        </view>
                        <view class="chart-container">
                            <qiun-data-charts type="column"
                                              :opts="opts.day"
                                              :chartData="groupData['dayProfit']"/>
                        </view>
                    </view>
                    <!--       Asset trend        -->
                    <view class="chart-item"
                          id="tab2">
                        <view class="item-title"
                              @click="modalOpen(2)">
                            <text class="font-15 font-bold color-black">
                                {{ $t('analyze.text7') }}
                            </text>
                            <fui-icon name="info"
                                      size="32"
                                      color="var(--content-tertiary)">
                            </fui-icon>
                        </view>
                        <view class="item-descr descr-padding bg-gray">
                            <text class="font-11 color-gray">
<!--                                {{ $t('analyze.text11') }}-->
                                {{group['balanceList'] ? group['balanceList']['key'][group['balanceList']['key'].length - 1] : 0}}
                            </text>
                            <text class="font-11 color-black limit-text font-weight">
                                ${{$util.thousandSeparator(group['balanceList'] ? group['balanceList']['value'][group['balanceList']['value'].length - 1]:0)}}
                            </text>
                        </view>
                        <view class="chart-container">
                            <qiun-data-charts type="tarea"
                                              :opts="opts.balance"
                                              :chartData="groupData['balance']"/>
                        </view>
                    </view>
                </view>
                <view class="prompt-text">
                    <text class="font-11 color-gray">
                        {{ $t('analyze.text17') }}
                    </text>
                    <text class="font-11 color-gray">
                        {{ $t('analyze.text18') }}
                    </text>
                </view>
            </view>
        </scroll-view>
        <fui-modal :show="modalShow"
                   :title="primaryTabs[modalActive]"
                   :descr="modalContent[modalActive]"
                   :buttons="[]"
                   size="32"
                   color="var(--content-primary)"
                   descrColor="var(--content-primary)"
                   background="var(--background-primary)">
            <view class="modal-button bg-black button-active"
                  @click="modalShow = false">
                <text class="font-14 font-weight color-white">
                    {{ $t('entrust.t37') }}
                </text>
            </view>
        </fui-modal>
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
        <loading ref="loading"></loading>
    </view>
</template>
<script>
import service from "./service"

export default service;
</script>
<style lang="scss">
@import "analyze";
</style>