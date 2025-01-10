<template>
    <view class="invite" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     statusBar
                     isOccupy
                     zIndex="9"
                     background="#161819"
                     color="#ffffff"
                     :title="this.$t('index.menu_invite')"
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft" size="56" color="#ffffff"></fui-icon>
            <template v-slot:right>
                <text class="font-13 font-weight always-white mr-10"
                      @click="$mroute.webview(1,'fyrule',$t('invite.rule'))">
                    {{ $t('invite.rule') }}
                </text>
            </template>
        </fui-nav-bar>
        <scroll-view scroll-y class="invite-scroll" @scroll="scroll" :style="`height: ${scrollHeight}px`">
            <view class="invite-scroll-head">
                <view class="head-banner">
                    <image v-if="lang === 'zh-Hant'" src="/static/invaite/index_bg.png" mode="widthFix"></image>
                    <image v-else src="/static/invaite/index_bg_en.png" mode="widthFix"></image>
                </view>
                <view class="head-card">
                    <view class="head-card-content">
                        <view class="content-title">
                            <text class="font-14 color-black font-weight">
                                {{ $t('invite.t1') }}
                            </text>
                            <view class="flex align-center" @click="$mroute.setLink()">
                                <text class="font-12 color-gray">{{ $t('invite.t2') }}</text>
                                <fui-icon name="arrowright" size="30" color="var(--content-primary)"></fui-icon>
                            </view>
                        </view>
                        <view class="content-column">
                            <!-- 我的现货返佣 -->
                            <view class="content-column-item">
                                <text class="font-12 color-gray">{{ $t('invite.t3') }}</text>
                                <text class="font-18 color-black font-weight">
                                    {{ config ? config['mtrade'] : '0' }}%
                                </text>
                            </view>
                            <!-- 好友现货返现 -->
                            <view class="content-column-item">
                                <text class="font-12 color-gray">{{ $t('invite.t5') }}</text>
                                <text class="font-18 color-black font-weight">
                                    {{ config['ftrade'] ? config['ftrade'] : '0' }}%
                                </text>
                            </view>
                            <!-- 我的合约返佣 -->
                            <view class="content-column-item">
                                <text class="font-12 color-gray">{{ $t('invite.t4') }}</text>
                                <text class="font-18 color-black font-weight">
                                    {{ config['mcontract'] ? config['mcontract'] : '0' }}%
                                </text>
                            </view>
                            <!-- 好友合约返现 -->
                            <view class="content-column-item">
                                <text class="font-12 color-gray">{{ $t('invite.t6') }}</text>
                                <text class="font-18 color-black font-weight">
                                    {{ config['fcontract'] ? config['fcontract'] : '0' }}%
                                </text>
                            </view>
                        </view>
                        <!-- 邀请码 -->
                        <view class="content-cell">
                            <text class="font-13 color-gray">
                                {{ $t('invite.t7') }}
                            </text>
                            <view class="flex align-center">
                                <text class="font-13 color-black">
                                    {{ config['share_code'] ? config['share_code'] : '--' }}
                                </text>
                                <image @click="copy"
                                       class="copy-icon"
                                       :src="`/static/invaite/icopy-${userTheme}.png`"
                                       mode="widthFix">
                                </image>
                            </view>
                        </view>
                        <!-- 邀请链接 -->
                        <view class="content-cell">
                            <text class="font-13 color-gray" style="width: 100px;">
                                {{ $t('invite.t8') }}
                            </text>
                            <view class="flex align-center" style="text-wrap:nowrap;text-align: right;">
                                <text class="font-13 color-black">
                                    {{
                                        invite_link
                                    }}
                                </text>
                                <image @click="copyLink"
										style="width: 48rpx;"
                                       class="copy-icon"
                                       :src="`/static/invaite/icopy-${userTheme}.png`"
                                       mode="widthFix">
                                </image>
                            </view>
                        </view>
                        <view class="content-buttons">
                            <view class="button">
                                <fui-button height="78rpx"
                                            radius="78rpx"
                                            size="26"
                                            color="var(--background-primary)"
                                            background="var(--content-primary)"
                                            :text="$t('invite.t9')"
                                            @click="openPoster">
                                </fui-button>
                            </view>
                            <view class="code-button" @click="open">
                                <image :src="`/static/newImage/qrcode-${userTheme}.png`" mode="widthFix"></image>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="invite-scroll-bottom">
                <!-- 我的返佣 -->
                <view class="bottom-cell" @click="$mroute.myrebate()">
                    <text class="font-14 color-black font-weight">
                        {{ $t('invite.my_rebate') }}
                    </text>
                    <fui-icon name="arrowright" size="38" color="var(--content-primary)"></fui-icon>
                </view>
                <view class="bottom-card flex align-center">
                    <view class="bottom-card-column">
                        <text class="font-12 color-gray">
                            {{ $t('invite.t10') }}(USDT)
                        </text>
                        <text class="font-18 color-black font-weight">
                            {{ $util.thousandSeparator(share.group.charge_num,2) }}
                        </text>
                    </view>
                    <view class="bottom-card-column">
                        <text class="font-12 color-gray">
                            {{ $t('invite.t11') }}({{ $t('invite.t12') }})
                        </text>
                        <text class="font-18 color-black font-weight">
                            {{ share.group.num }}
                        </text>
                    </view>
                </view>
                <!-- 邀请攻略 -->
                <view class="bottom-cell" @click="$mroute.myrebate()">
                    <text class="font-14 color-black font-weight">
                        {{ $t('invite.t13') }}
                    </text>
                </view>
                <view class="bottom-card">
                    <view class="bottom-card-row">
                        <image src="/static/invaite/tips1.png" mode="widthFix"></image>
                        <text class="font-13 color-black">
                            {{ $t('invite.t9') }}
                            <text class="font-11 color-gray">
                                /{{ $t('invite.t16') }}
                            </text>
                        </text>
                    </view>
                    <view class="bottom-card-row">
                        <image src="/static/invaite/tips2.png" mode="widthFix"></image>
                        <text class="font-13 color-black">
                            {{ $t('invite.t18') }}
                            <text class="font-11 color-gray">
                                /{{ $t('invite.t17') }}
                            </text>
                        </text>
                    </view>
                    <view class="bottom-card-row">
                        <image src="/static/invaite/tips3.png" mode="widthFix"></image>
                        <text class="font-13 color-black">
                            {{ $t('invite.t15') }}
                            <text class="font-11 color-gray">
                                /{{ $t('invite.t14') }}
                            </text>
                        </text>
                    </view>
                </view>
                <!-- 24小时返佣排行 -->
                <view class="bottom-cell">
                    <text class="font-14 color-black font-weight">
                        {{ $t('invite.t19') }}
                    </text>
                </view>
                <view class="bottom-list">
                    <view class="bottom-list-cell" v-if="share['topUser'] != ''" v-for="(item,index) in share['topUser']">
						<view class="flex align-center" v-if="index < 3">
						    <image v-if="index === 0" src="/static/invaite/top_1.webp" mode="widthFix"></image>
						    <image v-if="index === 1" src="/static/invaite/top_2.webp" mode="widthFix"></image>
						    <image v-if="index === 2" src="/static/invaite/top_3.webp" mode="widthFix"></image>
						    <text class="font-13 color-black rank-num" v-if="index > 2">
						        {{ index + 1 }}
						    </text>
						    <text class="font-13 color-black">
						        UID：{{ item.user_id }}
						    </text>
						</view>
						<text class="font-13 color-black" v-if="index < 3">
						    {{ $util.thousandSeparator(item.total_income,2) }} USDT
						</text>
                    </view>
                    <view class="not-data" v-else>
                        <fui-empty width="200"
                                   height="200"
                                   src="/static/newImage/not-order.png"
                                   size="26"
                                   color="var(--color-text-dark-gray)"
                                   :title="$t('list.not_data')">
                        </fui-empty>
                    </view>
                </view>
            </view>
            <view class="fixed-button" v-if="scrollTop >= 200">
                <view class="fixed-button-top">
                    <fui-tag :padding="['10rpx','16rpx']"
                             :text="$t('invite.t20')"
                             :isBorder="false"
                             size="22"
                             type="warning"
                             theme="light">
                    </fui-tag>
                </view>
                <fui-button height="78rpx"
                            radius="78rpx"
                            size="26"
                            color="var(--background-primary)"
                            background="var(--content-primary)"
                            @click="openPoster">
                    {{ $t('invite.t9') }}
                </fui-button>
            </view>
        </scroll-view>
        <!-- QRCODE弹窗 -->
        <fui-backdrop :show="codePopup" closable @click="codePopup=false">
            <view class="qrcode-popup">
                <view class="qrcode-head">
                    <view class="cell">
                        <image src="/static/img/cblogo.png" mode=""></image>
                        <text class="font-14 color-black font-weight">ABT</text>
                    </view>
                    <view class="cell">
                        <text class="font-13 color-black">{{ $t('invaite.tt1') }}</text>
                    </view>
                    <view class="code-box">
                        <view class="canvas-box"
                              :style="`width: ${qrsize+10}px; height: ${qrsize+10}px`">
                            <canvas class="code-canvas"
                                    ref="uqrcode"
                                    id="qrcode"
                                    canvas-id="qrcode"
                                    :style="`width: ${qrsize}px; height: ${qrsize}px`">
                            </canvas>
                        </view>
                        <text class="font-13 color-gray">{{ $t('invaite.tt2') }}</text>
                        <text class="font-14 color-black font-weight">{{ config['share_code'] }}</text>
                    </view>
                </view>
                <view class="qrcode-close" @click="codePopup=false">
                    <fui-icon name="close" size="36" color="var(--content-primary)"></fui-icon>
                </view>
            </view>
        </fui-backdrop>
        <!-- 邀请好友弹窗 -->
        <fui-backdrop :show="posterPopup" @click="posterPopup=false">
            <view class="poster-popup">
                <view class="poster-top">
                    <l-painter style="margin-top: 35rpx;margin-left: 50rpx;" ref="dpainter" :hidpi="true" hybrid
                               isCanvasToTempFilePath :pixel-ratio="2"/>
                </view>
                <view class="poster-bottom">
                    <view class="title">
                        <text class="font-16 color-black font-weight">{{ $t('invaite.tt3') }}</text>
                        <fui-icon class="close-icon" name="close" size="48" color="var(--content-primary)"
                                  @click="posterPopup=false"></fui-icon>
                    </view>
                    <view class="group">
                        <view class="item" @click="savePoster">
                            <image src="/static/invaite/ic_save.webp" mode=""></image>
                            <text class="font-12 color-black font-weight">{{ $t('invaite.tt4') }}</text>
                        </view>
                        <view class="item" @click="copyLink">
                            <image src="/static/invaite/ic_copy.webp" mode=""></image>
                            <text class="font-12 color-black font-weight">{{ $t('invaite.tt5') }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </fui-backdrop>
    </view>
</template>

<script>
import service from './service';
export default service;
</script>

<style lang="scss" scoped>
@import "invaite.scss";
</style>