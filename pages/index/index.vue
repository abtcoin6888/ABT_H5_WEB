<template>
	<view class="content">
		<van-sticky>
			<!-- #ifdef APP-PLUS -->
			<view class="header header_app">
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="header flex" style="align-items: center;">
			<!-- #endif -->
				<view class="avatar">
					<van-image @click="openMine" class="avatar_view" src="static/img/avatar.png" width="35px" height="35px"></van-image>
				</view>
				<view class="search_bar">
					<van-search @click="toSearch()" :readonly="true" class="search_view" placeholder="BTC" />
				</view>
				<view class="tool_bar">
					<view>
						<van-icon @click="scan" size="20px" color="#fff" name="scan"></van-icon>
					</view>
					<view>
						<van-icon size="20px" color="#fff" name="service-o"></van-icon>
					</view>
					<view>
						<van-icon @click="$mroute.message()" size="20px" color="#fff" dot name="envelop-o"></van-icon>
					</view>
				</view>
			</view>
		</van-sticky>
		<view class="banner">
			<swiper class="my-swipe" :autoplay="true" :interval="3000">
				<template v-if="banner.length == 0">
					<swiper-item>
						<van-image
						  width="100%"
						  height="100%"
						  src="/static/banner/1.jpg"
						/>
					</swiper-item>
				</template>
				<template v-else v-for="(item,index) in banner" :key="'banner-'+item.object_id">
					<swiper-item>
						<van-image
						  width="100%"
						  height="100%"
						  :src="item['cover']"
						/>
					</swiper-item>
				</template>
			</swiper>
		</view>
		<view class="notice_panel" :style="{width:$device.windowWidth+'px'}">
			<view class="notice_bar" style="display: flex;align-items: center;">
				<view style="display: flex;">
					<van-icon name="volume-o" size="16px"></van-icon>
				</view>
			    <view style="width: 90%;">
					<cc-noticeBar :noticeList="notice" style="padding-left: 10px;font-size: 12px;font-weight: 500;"></cc-noticeBar>
				</view>	
			  <van-icon @click="$mroute.notice()" size="16" name="arrow"></van-icon>
			</view>
		</view>
		<view class="container">
			<view class="menu">
				<van-grid :border="false" :gutter="-20" :column-num="5" :icon-size="28">
				  <van-grid-item @click="$mroute.recharge()" icon="photo-o" text="在线充值">
					  <template #icon>
						  <van-icon name="static/img/cz.png" size="28"></van-icon>
					  </template>
				  </van-grid-item>
				  <van-grid-item @click="$mroute.invaite()" icon="photo-o" text="邀请好友" >
					  <template #icon>
					  		<van-icon name="static/img/yqhy.png" size="28"></van-icon>
					  </template>
				  </van-grid-item>
				  <van-grid-item @click="$mroute.financeInfo(1)" icon="photo-o" text="平台质押">
					  <template #icon>
					  		<van-icon name="static/img/ptbdy.png" size="28"></van-icon>
					  </template>
				  </van-grid-item>
				  <van-grid-item @click="$mroute.blindbox()" icon="photo-o" text="爆富盲盒">
					  <template #icon>
					  		<van-icon name="static/img/bfmh.png" size="28"></van-icon>
					  </template>
				  </van-grid-item>
				  <van-grid-item @click="$mroute.indexFinance()" icon="photo-o" text="爆富理财">
					  <template #icon>
						<van-icon name="static/img/bflc.png" size="28"></van-icon>
					  </template>
				  </van-grid-item>
				  <van-grid-item @click="$mroute.futures()" icon="photo-o" text="闪期权">
					  <template #icon>
						<van-icon name="static/img/sfsqq.png" size="28"></van-icon>
					  </template>
				  </van-grid-item>
				  <van-grid-item @click="$mroute.floworder()" icon="photo-o" text="跟单交易">
					  <template #icon>
					  	<van-icon name="static/img/hygd.png" size="28"></van-icon>
					  </template>
				  </van-grid-item>
				  <van-grid-item @click="setMoni()" icon="photo-o" text="模拟合约">
					  <template #icon>
					  	<van-icon name="static/img/mnhy.png" size="28"></van-icon>
					  </template>
				  </van-grid-item>
				  <van-grid-item icon="photo-o" text="帮助中心">
					  <template #icon>
					  	<van-icon name="static/img/bzzx.png" size="28"></van-icon>
					  </template>
				  </van-grid-item>
				  <van-grid-item @click="$mroute.indexMore()" icon="photo-o" text="更多">
					  <template #icon>
					  	<van-icon name="static/img/gd.png" size="28"></van-icon>
					  </template>
				  </van-grid-item>
				</van-grid>
			</view>
			<view class="topCurrency">
				<scroll-view @scroll="topScroll" :scroll-x="true" :show-scrollbar="false" :scroll-y="false" class="scrollble">
					<view class="top_item" v-for="(item,index) in hotCurrencyList" :key="index" @click="$mroute.toKline(1)">
						<view class="line">
							<text class="font-12 font-weight">{{item['symbol']}}/USDT</text> <text class="font-10 price_down">{{$util.thousandSeparator(item['change_rate'],2)}}%</text>
						</view>
						<view class="line">
							<text class="price_down font-14 font-weight">{{$util.thousandSeparator(item['new_price'],2)}}</text>
						</view>
						<view class="line">
							<text class="font-10 font-weight">¥ {{$util.thousandSeparator(parseFloat(item['new_price']) * 7)}}</text>
						</view>
					</view>
				</scroll-view>
				<view class="scrollble" @scroll="topScroll">
					
				</view>
				<view class="top_indicators">
					<view :style="{width:scrollTop+'%'}" class="top_indicators_active"></view>
				</view>
			</view>
			<view class="coin_content">
				<van-tabs v-model:active="active" line-height="0" shrink>
				  <van-tab title="涨幅榜">
					 <view class="coin_panel">
						<view class="coin_panel_header">
							<view>
								<text class="font-12 font-weight color-999">名称</text>
							</view>
							<view>
								<text class="font-12 font-weight color-999">最新价格</text>
							</view>
							<view>
								<text class="font-12 font-weight color-999">涨跌幅</text>
							</view>
						</view>
						<view class="coin_list">
							<view class="coin_line" v-for="(item,index) in currencyDesc" :key="index" @click="$mroute.toKline(item['currency_id'])">
								<view class="one">
									<view style="width: 35px;">
										<van-icon size="25" :name="item['icon']"></van-icon>
									</view>
									<view>
										<view >
											<text class="font-13 font-weight">{{item['symbol']}}</text>
										</view>
										<view>
											<text class="font-10 font-weight" style="color:#999">USDT</text>
										</view>
									</view>
								</view>
								<view class="two">
									<text class="font-13 font-weight" :class="{'price_up':item.change_rate >= 0,'price_down':item.change_rate < 0}">{{$util.thousandSeparator(item['new_price'],item['decimals'])}}</text>
								</view>
								<view>
									<view class="badge_width" :class="{'badge_up':item.change_rate >= 0,'badge_down':item.change_rate < 0}">
										<text class="font-10 font-weight">{{$util.Number2(item['change_rate'])}}%</text>
									</view>
								</view>
							</view>
						</view>
					 </view>
				  </van-tab>
				  <van-tab title="跌幅榜">
				    <view class="coin_panel">
						<view class="coin_panel_header">
							<view>
								<text class="font-12 font-weight color-999">名称</text>
							</view>
							<view>
								<text class="font-12 font-weight color-999">最新价格</text>
							</view>
							<view>
								<text class="font-12 font-weight color-999">涨跌幅</text>
							</view>
						</view>
						<view class="coin_list">
							<view class="coin_line" v-for="(item,index) in currencyASC" :key="index" @click="$mroute.toKline(item['currency_id'])">
								<view class="one">
									<view style="width: 35px;">
										<van-icon size="25" :name="item['icon']"></van-icon>
									</view>
									<view>
										<view >
											<text class="font-13 font-weight">{{item['symbol']}}</text>
										</view>
										<view>
											<text class="font-10 font-weight" style="color:#999">USDT</text>
										</view>
									</view>
								</view>
								<view class="two">
									<text class="font-13 font-weight" :class="{'price_up':item.change_rate >= 0,'price_down':item.change_rate < 0}">{{$util.thousandSeparator(item['new_price'],item['decimals'])}}</text>
								</view>
								<view>
									<view class="badge_width" :class="{'badge_up':item.change_rate >= 0,'badge_down':item.change_rate < 0}">
										<text class="font-11 font-weight">{{$util.Number2(item['change_rate'])}}%</text>
									</view>
								</view>
							</view>
						</view>
				    </view>
				  </van-tab>
				  <van-tab title="成交额">
				    <view class="coin_panel">
				    	<view class="coin_panel_header">
				    		<view>
				    			<text class="font-12 font-weight color-999">名称</text>
				    		</view>
				    		<view>
				    			<text class="font-12 font-weight color-999">最新价</text>
				    		</view>
				    		<view>
				    			<text class="font-12 font-weight color-999">成交额(24H)</text>
				    		</view>
				    	</view>
						<view class="coin_list">
							<view class="coin_line" v-for="(item,index) in currencyQuan" :key="index" @click="$mroute.toKline(item['currency_id'])">
								<view class="one">
									<view style="width: 35px;">
										<van-icon size="25" :name="item['icon']"></van-icon>
									</view>
									<view>
										<view >
											<text class="font-13 font-weight">{{item['symbol']}}</text>
										</view>
										<view>
											<text class="font-10 font-weight" style="color:#999">USDT</text>
										</view>
									</view>
								</view>
								<view class="two">
									<text class="font-13 font-weight" :class="{'price_up':item.change_rate >= 0,'price_down':item.change_rate < 0}">{{$util.thousandSeparator(item['new_price'],item['decimals'])}}</text>
								</view>
								<view>
									<view class="color-black  font-weight">
										<text class="font-12 color-black font-weight">{{$util.bigNumberToString(item['quota'])}}</text>
									</view>
								</view>
							</view>
						</view>
				    </view>
				  </van-tab>
				</van-tabs>
			</view>
		</view>
	</view>
	<uni-drawer ref="showRight" style="z-index: 999999;" mode="left" :width="$device.screenWidth" :mask-click="false">
		<view class="mineContainer">
			<view class="loginAndFile">
				<!-- #ifdef APP-PLUS -->
				<view class="status_bar"></view>
				<!-- #endif -->
				<view class="mineClose">
					<van-icon @click="closeMine" size="25" name="static/img/close1.png"></van-icon>
				</view>
				<view class="logreg flex" style="align-items: center;">
					<view v-if="userinfo['avatar'] == null">
						<van-image
						  width="50px"
						  height="50px"
						  fit="cover"
						  round
						  src="static/img/avatar.png"
						/>
					</view>
					<view v-else>
						<van-image
						  width="50px"
						  height="50px"
						  fit="cover"
						  round
						  :src="userinfo['avatar']"
						/>
					</view>
					<view @click="!isLogin ? $mroute.login() : $mroute.profile()">
						<view>
							<text class="font-14 font-weight" v-if="isLogin == false">登录 / 注册</text>
							<text class="font-16 font-weight" v-else>{{ userNickname }}</text>
						</view>
						<view class="mt-5">
							<text class="color-999 font-12 "  v-if="isLogin == false">欢迎来到{{config['site_name']}}</text>
							<text class="color-999 font-12 "  v-else>UID:{{userinfo['id']}}</text>
						</view>
					</view>
				</view>
				<view class="yqpannel">
					<view class="yqbj" @click="$mroute.invaite()">
						<view>
							<text class="font-14 font-weight color-white">邀请有礼</text>
						</view>
						<view>
							<text class="font-12 color-999">无需交易，坐享收益</text>
						</view>
					</view>
				</view>
				<view class="settingItems">
					<van-cell-group :border="false">
						<van-cell v-if="isLogin" @click="$mroute.userauth()" is-link :border="false" value="未认证">
						   <template #title>
							   <text class="font-13 font-weight pl-5">身份认证</text>
						   </template>
						   <template #icon>
							   <van-icon size="22px" name="static/img/sfrz.png"></van-icon>
						   </template>
						</van-cell>
						<van-cell v-if="isLogin" is-link @click="$mroute.secrety()" :border="false">
						   <template #title>
							   <text class="font-13 font-weight pl-5">安全中心</text>
						   </template>
						   <template #icon>
							   <van-icon size="22px" name="static/img/aqzx.png"></van-icon>
						   </template>
						</van-cell>
					   <van-cell is-link @click="$mroute.setting()" :border="false">
						   <template #title>
							   <text class="font-13 font-weight pl-5">设置</text>
						   </template>
						   <template #icon>
							   <van-icon size="22px" name="static/img/config.png"></van-icon>
						   </template>
					   </van-cell>
					   <view style="height: 5px;width: 100%;background-color: #ddd;"></view>
					   <van-cell is-link :border="false" @click="$mroute.webview(1,'fee')">
						   <template #title>
							   <text class="font-13 font-weight pl-5">费率标准</text>
						   </template>
						   <template #icon>
							   <van-icon size="22px" name="static/img/felilv.png"></van-icon>
						   </template>
					   </van-cell>
					   <van-cell is-link :border="false" @click="$mroute.webview(1,'zz')">
						   <template #title>
							   <text class="font-13 font-weight pl-5">BBB资质</text>
						   </template>
						   <template #icon>
							   <van-icon size="22px" name="static/img/zz.png"></van-icon>
						   </template>
					   </van-cell>
					   <van-cell is-link @click="$mroute.contact()" :border="false">
						   <template #title>
							   <text class="font-13 font-weight pl-5">联系我们</text>
						   </template>
						   <template #icon>
							   <van-icon size="22px" name="static/img/lxw.png"></van-icon>
						   </template>
					   </van-cell>
					   <van-cell @click="$mroute.about()" is-link :border="false">
						   <template #title>
							   <text class="font-13 font-weight pl-5">关于我们</text>
						   </template>
						   <template #icon>
							   <van-icon size="22px" name="static/img/about.png"></van-icon>
						   </template>
					   </van-cell>
					</van-cell-group>
				</view>
				<view style="position: fixed;bottom: 20px;width: 100%;" v-if="isLogin">
					<view class="pd-15">
						<view @click="loginOut" class="defaultBtn center bg-gray radus-5 border-none ">
							<text class="color-black font-13 font-weight">退出登录</text>
						</view>
					</view>
				</view>
			</view>
		</view>
<!-- 		<auth v-if="showAuth" ref="auth"></auth> -->
		<alert ref="nologin" title="系统提示" content="登录系统异常,请重新登录"></alert>
	</uni-drawer>
</template>

<script>
	import {Image as VanImage,Sticky,Search,Icon,NoticeBar,Grid, GridItem,Tab, Tabs,Cell, CellGroup} from 'vant';
	import currency from '/common/api/currency.js';
	import {mapState,mapGetters,mapMutations} from 'vuex';
	import common from '../../common/api/common';
	export default {
		components:{
			[VanImage.name]:VanImage,
			[Sticky.name]:Sticky,
			[Search.name]:Search,
			[Icon.name]:Icon,
			[NoticeBar.name]:NoticeBar,
			[Grid.name]:Grid,
			[GridItem.name]:GridItem,
			[Tab.name]:Tab,
			[Tabs.name]:Tabs,
			[Cell.name]:Cell,
			[CellGroup.name]:CellGroup
		},
		data() {
			return {
				showAuth:false,
				screenWidth:400,
				scrollTop:"75",
				active:0,
				currencyDesc:[],
				currencyASC:[],
				currencyQuan:[],
				hotCurrencyList:[],
				notice:[],
				banner:[]
			}
		},
		onLoad() {
			const device = uni.getSystemInfoSync();
			this.screenWidth = device.screenWidth;
		},
		async onShow() {
			setTimeout(()=>{
				uni.setTabBarItem({
					index:0,
					pagePath:"pages/index/index",
				})
			},300);
			// #ifdef H5
			uni.onTabBarMidButtonTap(function(){
				console.log(1231);
			})
			// #endif
			this.getBanner();
			this.getNotice();
		},
		onHide() {
		},
		onReady() {
			console.log("onready");
			this.getTradeCurrencyList();
		},
		computed:{
			...mapState(['config','userinfo']),
			...mapGetters(['isLogin','userAccount','userNickname'])
		},
		methods: {
			...mapMutations(['userLogin']),
			async getTradeCurrencyList(){
				let tradeCurrency = await currency.tradeCurrencyList();
				uni.setStorage({
					key:"trade-currency",
					data:tradeCurrency['data']
				})
				this.currencyDesc = this.$util.sortDesc(tradeCurrency['data'][0]['currency']);
				this.currencyASC = this.$util.sortAsc(tradeCurrency['data'][0]['currency']);
				this.currencyQuan = this.$util.sortQuan(tradeCurrency['data'][0]['currency']);
				this.hotCurrencyList = tradeCurrency['data'][0]['currency'].slice(0,3);
			},
			onTradeMessage(data){
				// console.log(data);
				if(data.type != 100){
					return false;
				}
				if(this.active === 0 && this.currencyDesc.length > 0){
					const index = this.currencyDesc.findIndex(item => item.id == data.currency_id);
					this.currencyDesc[index]['new_price'] = data['data']['c'];
					this.currencyDesc[index]['change_rate'] = data['data']['P'];
				}
				if(this.active === 1 && this.currencyASC.length > 0){
					const index = this.currencyASC.findIndex(item => item.id == data.currency_id);
					this.currencyASC[index]['new_price'] = data['data']['c'];
					this.currencyASC[index]['change_rate'] = data['data']['P'];
				}
				if(this.active === 2 && this.currencyQuan.length > 0){
					const index = this.currencyQuan.findIndex(item => item.id == data.currency_id);
					this.currencyQuan[index]['new_price'] = data['data']['c'];
					this.currencyQuan[index]['change_rate'] = data['data']['P'];
				}
			},
			async getBanner(){
				var banner = uni.getStorageSync('banner');
				if(banner == '' || typeof banner == 'undefined'){
					var result = await common.getBanner();
					uni.setStorageSync('banner',result.data);
					banner = result.data;
				}
				this.banner = banner;
				this.$nextTick(()=>{
					common.getBanner().then(res=>{
						uni.setStorageSync('banner',res.data);
					});
				});
			},
			async getNotice(){
				let notice = await common.getNotice();
				this.notice = notice.data;
			},
			scan(){
				uni.scanCode({
					success(e) {
						console.log(e);
					}
				})
			},
			openLogin(){
				this.showAuth =  true;
				setTimeout(()=>{
					this.$refs.auth.open();
				},200);
			},
			openMine(){
				this.$refs.showRight.open();
			},
			closeMine(){
				this.$refs.showRight.close();
			},
			topScroll(e){
				setTimeout(()=>{
					this.scrollTop = (e.detail.scrollLeft + 375 / e.detail.scrollWidth) <= 75 ? 75 : e.detail.scrollLeft + 375 / e.detail.scrollWidth;
				},100);
			},
			toSearch(){
				console.log(1);
				this.$mroute.coinSearch();
				return false;
				// uni.navigateTo({
				// 	url:"/pages/store/search/search",
				// 	animationType:"fade-in"
				// })
			},
			notopen(){
				uni.showToast({
					title:'此功能暂未开放',
					icon:"none",
					duration:2000
				})
			},
			setMoni(){
				//切换为模拟合约操作
				uni.setTabBarItem({
					index:1,
					visible:false
				});
				uni.setTabBarItem({
					index:2,
					visible:false
				});
				uni.setTabBarItem({
					index:0,
					pagePath:"pages/index/simulation/simulation"
				});
				uni.setTabBarItem({
					index:3,
					pagePath:"pages/index/simulation/contruct/contruct",
					text:"交易"
				});
				uni.setTabBarItem({
					index:4,
					pagePath:"pages/index/simulation/wallet/wallet"
				});
				uni.switchTab({
					url:"/pages/index/simulation/simulation"
				})
			},
			loginOut(){
				this.userLogin(false);
			}
		}
	}
</script>

<style>
	@import 'index.css';
</style>
