<template>
	<view class="setLink" :data-theme="userTheme">
		<fui-nav-bar isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('stl.t1')"
                     @leftClick="$mroute.back()">
			<fui-icon name="arrowleft" 
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
		</fui-nav-bar>

        <view class="setLink-body">
            <view class="not-data" v-if="list.length === 0">
                <fui-empty width="200"
                           height="200"
                           size="26"
                           color="var(--content-tertiary)"
                           :src="`/static/img/tactic/not_data-${userTheme}.png`"
                           :title="$t('list.not_data')">
                </fui-empty>
            </view>
            <view class="card" v-for="(item,index) in list" :key="index">
                <!-- 邀请码/设置默认 -->
                <view class="card-cell">
                    <view class="flex align-center">
                        <text class="font-14 color-black font-weight">
                            {{item.share_code}}
                        </text>
                        <image @click="copy(item.share_code)" :src="`/static/newImage/copy-${userTheme}.png`" mode="widthFix"></image>
                    </view>
                    <text class="font-13 color-primary font-weight" @click="setShareDefault(item.id)">
                        {{$t('stl.t2')}}
                    </text>
                </view>
                <!-- 我的现货返佣 -->
                <view class="card-cell">
                    <view class="flex align-center">
                        <text class="font-13 color-black font-weight">
                            {{$t('stl.t3')}}
                        </text>
                    </view>
                    <text class="font-13 color-black font-weight">
                        {{item.mtrade}}%
                    </text>
                </view>
                <!-- 好友现货返现 -->
                <view class="card-cell">
                    <view class="flex align-center">
                        <text class="font-13 color-black font-weight">
                            {{$t('stl.t4')}}
                        </text>
                    </view>
                    <text class="font-13 color-black font-weight">
                        {{item.ftrade}}%
                    </text>
                </view>
                <!-- 我的合约返佣 -->
                <view class="card-cell">
                    <view class="flex align-center">
                        <text class="font-13 color-black font-weight">
                            {{$t('stl.t5')}}
                        </text>
                    </view>
                    <text class="font-13 color-black font-weight">
                        {{item.mcontract}}%
                    </text>
                </view>
                <!-- 好友合约返现 -->
                <view class="card-cell">
                    <view class="flex align-center">
                        <text class="font-13 color-black font-weight">
                            {{$t('stl.t6')}}
                        </text>
                    </view>
                    <text class="font-13 color-black font-weight">
                        {{item.fcontract}}%
                    </text>
                </view>
                <!-- 邀请链接 -->
                <view class="card-cell">
                    <view class="flex align-center">
                        <text class="font-13 color-black font-weight">
                            {{$t('stl.t7')}}
                        </text>
                    </view>
                    <view class="flex align-center justify-end">
                        <text class="font-13 color-black font-weight">
                            https://h5.ABT.pro/#/s?code={{item.share_code}}
                        </text>
                        <image class="copy-link"
                               @click="copy(config['DOMAIN']+'/#/s?code='+item.share_code)"
                               :src="`/static/newImage/copy-${userTheme}.png`" mode="widthFix">
                        </image>
                    </view>
                </view>
            </view>
        </view>
		<view class="footer-button">
			<fui-button @click="$mroute.addLink()"
                        height="78rpx"
                        radius="78rpx"
                        size="26"
                        color="var(--background-primary)"
                        background="var(--content-primary)">
                {{$t('stl.t8')}}
            </fui-button>
		</view>
		<!-- 设置默认弹窗 -->
		<fui-modal background="var(--background-primary)" :buttons="[]" padding="0" radius="30" width="600" :show="modalShow">
			<view class="modal-warp">
				<view class="modal-top">
					<text class="font-16 color-black font-weight">{{$t('stl.t9')}}</text>
					<text class="font-13 color-gray">{{$t('stl.t10')}}</text>
					<text class="font-13 color-gray">{{$t('stl.t11')}}</text>
				</view>
				<view class="button-group">
					<view class="item" @click="modalShow = false">
						<text class="font-14 color-gray">{{$t('stl.t12')}}</text>
					</view>
					<view class="item" @click="subDefault">
						<text class="font-14 color-primary">{{$t('stl.t13')}}</text>
					</view>
				</view>
			</view>
		</fui-modal>
		
		<loading ref="loading"></loading>
	</view>
</template>

<script>
	import fuiButton from "@/components/firstui/fui-button/fui-button.vue"
	import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
	import fuiModal from "@/components/firstui/fui-modal/fui-modal.vue"
	
	import config from '@/common/api/config.js';
	import commonApi from '@/common/api/common.js';

    import {
        mapGetters
    } from 'vuex';
    import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue";

	var keyId = 0;
	export default {
		components: {
            fuiEmpty,
			fuiButton,
			fuiNavBar,
			fuiModal
		},
		data() {
			return {
				modalShow: false,
				list:[],
				config:config
			}
		},
		onShow() {
			this.getList();
		},
        computed: {
            ...mapGetters(['userTheme']),
        },
		methods: {
			setShareDefault(id){
				keyId = id;
				this.modalShow = true;;
				
			},
			subDefault(){
				this.modalShow = false;
				this.$refs.loading.open();
				commonApi.setShareDefault(keyId).then(res=>{
					this.$refs.loading.close();
					this.getList();
				});
			},
			getList(){
				commonApi.getShareSetting().then(res=>{
					this.list = res.data;
				});
			},
			copy(t) {
				uni.setClipboardData({
					data: t,
					success() {
						uni.showToast({
							title: 'copy',
							icon: "success"
						});
					}
				})
			},
			setDefault() {
				this.modalShow = true;;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "setlink.scss";
</style>