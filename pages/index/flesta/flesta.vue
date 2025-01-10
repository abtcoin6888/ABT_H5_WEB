<template>
	<view class="flesta light">
		<!-- back -->
		<view class="back" @click="$mroute.back()">
			<uni-icons type="back" color="#ffffff" size="25"></uni-icons>
		</view>
		<!-- header -->
		<view class="head" id="head">
			<image src="/static/one/header_bg_en.webp" mode="widthFix"></image>
			<!-- guide -->
			<view class="guide" @click="openGuide">
				<text>Guide</text>
			</view>
			<!-- notice -->
			<view class="notice">
				<view class="notice-con">
					<swiper autoplay vertical circular :interval="3000" :duration="300">
						<swiper-item v-for="i in 10">
							<text>18USDT-Round 510843 Congratulations,138****523 has USDT-ROUND</text>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- main-wrap -->
		<view class="content-wrap">
			<!--  -->
			<view class="container" v-if="btnActive == 0">
				<!--  -->
				<scroll-view class="scroll-bar" :enable-flex="true" scroll-x>
					<view class="item" :class="active == index ? 'active_tab' : ''" v-for="(item, index) in list"
						:key="index" @click="tabChange(index)">
						<view class="box cur" v-if="active == index">
							<text>当前 {{item.times}} 期</text>
						</view>
						<view class="box" v-else>
							<text>{{$util.thousandSeparator(item.amount)}} USDT奖金</text>
							<text>{{item.times}} 期</text>
						</view>
					</view>
				</scroll-view>
				<!--  -->
				<swiper :current="active" @change="swiperChange">
					<swiper-item v-for="(item, index) in list" :key="index">
						<view class="game-box">
							<view class="my-number" @click="openPopup">
								<text>我的号码</text>
							</view>
							<!-- 奖金总额 -->
							<view class="top">
								<text>奖金 {{$util.thousandSeparator(item.amount)}} USDT</text>
							</view>
							<!-- 进度条/开奖进度 -->
							<view class="progess">
								<progress :border-radius="16" percent="30" :show-info="false" />
								<view class="protext">
									<text>开奖进度</text>
									<view class="flex">
										<text>128</text>
										<text>/188</text>
									</view>
								</view>
							</view>
							<!-- 号码 -->
							<view class="center-box">
								<!--  -->
								<view class="_top">
									<text>1,000 USDT/注</text>
								</view>
								<!-- 号码组 -->
								<view class="_btm">
									<view class="num_box num_ac">
										<text>7</text>
									</view>
									<view class="num_box"></view>
									<view class="num_box"></view>
									<view class="num_box"></view>
									<view class="num_box"></view>
									<view class="num_box"></view>
									<view class="num_box"></view>
								</view>
							</view>
							<!-- 按钮 -->
							<view class="button-box">
								<view class="button_item" :class="btnCheck == 0 ? 'left_btn_active' : ''"
									@click="btnCheck = 0">
									<text>1 注</text>
								</view>
								<view class="button_item" :class="btnCheck == 1 ? 'left_btn_active' : ''"
									@click="btnCheck = 1">
									<text>5 注</text>
								</view>
								<view class="button_item" :class="btnCheck == 2 ? 'right_btn_active' : ''"
									@click="btnCheck = 2">
									<text>10 注</text>
								</view>
								<view class="button_item" :class="btnCheck == 3 ? 'right_btn_active' : ''"
									@click="btnCheck = 3">
									<text>20 注</text>
								</view>
								<button hover-class="center_avtive" class="center_button" @click="confirmPay">
									<view class="txtbox">
										<text>支付</text>
										<text>{{bet_amount}} USDT</text>
									</view>
								</button>
							</view>
							<!-- 可用余额 -->
							<view class="balance">
								<text>现货可用余额 0.00 USDT</text>
								<image src="@/static/img/9i.png" mode=""></image>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="no-records" v-show="false">
					<image src="/static/one/fiesta_empty.webp" mode="widthFix"></image>
					<text>暂无数据</text>
				</view>
			</view>
			<!--  -->
			<view class="container" v-if="btnActive == 1">
				<view class="no-records">
					<image src="/static/one/fiesta_empty.webp" mode="widthFix"></image>
					<text>暂无数据</text>
				</view>
			</view>
			<!--  -->
			<view class="container" v-if="btnActive == 2">
				<!--  -->
				<scroll-view class="scroll-bar" :enable-flex="true" scroll-x>
					<view class="item" :class="active == index ? 'active_tab' : ''" v-for="(item, index) in 5"
						:key="index" @click="tabChange(index)">
						<view class="box cur" v-if="active == index">
							<text>当前 79629 期</text>
						</view>
						<view class="box" v-else>
							<text>688,000 USDT奖金</text>
							<text>79629 期</text>
						</view>
					</view>
				</scroll-view>
				<!--  -->
				<swiper :current="active" @change="swiperChange">
					<swiper-item v-for="(item, index) in 5" :key="index">
						<view class="game-box">
							<view class="my-number" @click="openPopup">
								<text>我的号码</text>
							</view>
							<!-- 奖金总额 -->
							<view class="top">
								<text>已开奖</text>
							</view>
							<!--  -->
							<view class="takein">
								<text>本期未参与</text>
							</view>
							<!-- 号码 -->
							<view class="center-box">
								<!--  -->
								<view class="_top">
									<text>中奖号码</text>
								</view>
								<!-- 号码组 -->
								<view class="_btm">
									<view class="num_box num_ac" v-for="i in 7">
										<text>7</text>
									</view>
								</view>
							</view>
							<!-- 按钮 -->
							<view class="button-box">
								<view class="button_item"></view>
								<view class="button_item"></view>
								<view class="button_item"></view>
								<view class="button_item"></view>
								<button class="center_button center_avtive wqbtn">
									<view class="txtbox">
										<text>已开奖</text>
									</view>

								</button>
							</view>
							<!-- 可用余额 -->
							<view class="balance">
								<text>现货可用余额 0.00 USDT</text>
								<image src="@/static/img/9i.png" mode=""></image>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- footer -->
		<view class="footer" id="footer">
			<view class="btn" @click="btnActive = index" :class="btnActive == index ? 'btnActive' : ''"
				v-for="(item, index) in btnList" :key="index">
				<view class="btn-box">
					<text>{{ item }}</text>
				</view>
			</view>
		</view>
		<!-- 弹窗 My Number-->
		<uni-popup ref="myNumber" type="bottom" mask-background-color="rgba(0, 0, 0, .7)">
			<view class="popup-wrap myNumber">
				<image @click="closePopup" class="close" src="/static/one/pop_close.webp" mode=""></image>
				<view class="title-box">
					<text>Round 79534 My Numbers</text>
				</view>
				<view class="list">
					<view class="item" v-for="i in 5">
						<view class="tag">
							<text>{{ i }}</text>
						</view>
						<view class="ball-box" v-for="i in 7">
							<view class="ball"></view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 弹窗 Guide-->
		<uni-popup ref="guide" type="bottom" mask-background-color="rgba(0, 0, 0, .7)">
			<view class="popup-wrap guide">
				<image @click="closePopup" class="close" src="/static/one/pop_close.webp" mode=""></image>
				<image class="title-image" src="/static/one/header_bg_en.webp" mode="widthFix"></image>
				<scroll-view scroll-y class="guide-list">
					<text>1U Fiesta‘s Guide</text>
					<text class="font-bold mb-5">What is USDT 1U Fiesta?</text>
					<text class="mb-20">USDT 1U Fiesta takes a page from the classic game "1 dollar" users only need to
						pay a
						small amount
						of cryptocurrency (such as 1 USDT or a small amount of USDT) to get a 7-digit lottery number. The
						system will randomly select a winning number for each round, and this number will win the prize
						of
						the current round.
						The lottery will be automatically drawn when the number of bets in that round reaches the
						target.</text>
					<text class="font-bold mb-5">Participation process:</text>
					<text>Step 1: Log in to the product page to view all the 1U Fiesta prizes.</text>
					<text>Step 2: Select the 1U Fiesta prize, and pay the cryptocurrency you chose (e.g. 1USDT or a
						small
						amount
						of USDT); there is a limit on times each person can participate in each round, and you can get
						one
						winning number for each round;</text>
					<text>Step 3: Wait for the prize to be drawn;</text>
					<text class="mb-20">Step 4: Check the winning result; the winner gets all the prizes in that
						round.</text>
					<text class="font-bold mb-5">Lottery conditions:</text>
					<text>This product adopts the automatic lottery mechanism; when the number of bets reaches the
						lottery
						target, the prize will be
						automatically opened and issued immediately.</text>
					<text>*The final right to interpret this product belongs to USDT.</text>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import unionlotto from '../../../common/api/unionlotto.js'
	import util from '../../../common/util.js'
	export default {
		data() {
			return {
				active: 0,
				btnList: ["正在进行中", "我参与的", "往期"],
				btnActive: 0,
				numlist: ["8", "8", "8", "8", "8", "8", ""],
				btnCheck: 0,
				active1: 0,
				bet_amount:'',
				list:[],
			}
		},
		onShow() {
this.getList()
		},
		methods: {
			tabChange(index) {
				this.active = index;
			},
			swiperChange(e) {
				this.active = e.detail.current;
			},
			openPopup() {
				this.$refs.myNumber.open();
			},
			openGuide() {
				this.$refs.guide.open();
			},
			closePopup() {
				this.$refs.myNumber.close();
				this.$refs.guide.close();
			},
			confirmPay() {
				uni.showToast({
					title:"暂未开放",
					icon:"none"
				});
				return false;
				uni.showLoading({
					mask: true,
					title: 'Loading'
				})

				setTimeout(() => {
					uni.hideLoading();
				}, 1000);
			},
			async getList() {
				let res = await unionlotto.list()
				console.log(res)
				this.bet_amount = parseInt(util.thousandSeparator(res.data.bet_amount))
				this.list = res.data.list
			}
		}
	}
</script>

<style lang="scss">
	@import "flesta.scss";
</style>

<style scoped>
	/deep/.uni-progress-bar {
		height: 38rpx !important;
		background: url("@/static/one/begin_time_bg.webp") no-repeat;
		background-size: 100% 100%;
		background-color: transparent !important;
		padding: 7rpx 9rpx;
		box-sizing: border-box;
		border-radius: 48rpx;
	}

	/deep/.uni-progress-inner-bar {
		background: url("@/static/one/progress_content.webp") no-repeat;
		background-size: cover;
		background-color: transparent !important;
		border-radius: 38rpx;
	}
</style>