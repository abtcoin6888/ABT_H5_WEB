<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<uni-popup ref="popup" type="bottom" :mask="false" background-color="#fff">
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<uni-popup ref="popup" type="bottom" :mask="false" background-color="#fff" style="height: 100%;width: 100%;">
		<!-- #endif -->
			<view>
				<view class="bg" style="padding: 0 15px;" :style="{height:$device.windowHeight+'px'}">
					<!-- #ifdef APP-PLUS -->
					<view class="status_bar" style="height: 75px;"></view>
					<!-- #endif -->
					<view style="height: 32px;">
						<image @click="close()" src="../../static/img/close1.png" style="width: 25px;height: 25px;" mode=""></image>
					</view>
					<view style="margin-top: 20px;">
						<text class="font-14 font-weight">{{login == 1 ? 'BBB账号登录' :'BBB账号注册'}}</text>
					</view>
					<view class="switchTab">
						<view class="tab-con" >
							<view @click="active=0" :class="active == 0 ? 'tab-active' : ''">
								<text  class="font-12">手机</text>
							</view>
							<view @click="active=1" :class="active == 1 ? 'tab-active' : ''">
								<text  class="font-12">邮箱</text>
							</view>
						</view>
					</view>
					
					<view class="form" style="margin-top: 20px;">
						<uni-section :titleFontSize="'12'" style="background: none;" class="mb-10" :title="active == 0 ? '手机号' :'邮箱账号'"></uni-section>
						<view v-if="active==0" class="radus-5 border-gray " :class="onFocus == 'phone' ? 'onFocus':''" style="height: 40px;background-color: #f8f8f8;display: flex;line-height: 40px;">
							<view style="padding: 0 15px;" @click="showArea">
								<text class="font-12">{{showareacode}}</text>
								<van-icon name="arrow-down" />
							</view>
							<view style="display: flex;">
								<text>|</text>
								<input class="pl-5" @focus="onFocus='phone'" @blur="onFocus=''" type="text" value="" style="border:none;height: 40px;line-height: 40px;" />
							</view>
						</view>
						<view v-if="active==1" class="radus-5 border-gray " :class="onFocus == 'email' ? 'onFocus':''" style="height: 40px;background-color: #f8f8f8;display: flex;line-height: 40px;">
							<view style="display: flex;padding: 0 15px;">
								<input class="pl-5" @focus="onFocus='email'" @blur="onFocus=''" placeholder="请输入邮箱账号" type="text" value="" style="border:none;height: 40px;line-height: 40px;" />
							</view>
						</view>
						<uni-section v-if="login==1" :titleFontSize="'12'" style="background: none;" class="mb-10" title="密码"></uni-section>
						<view v-if="login==1" class="radus-5 border-gray " :class="onFocus == 'pwd' ? 'onFocus':''" style="height: 40px;background-color: #f8f8f8;display: flex;line-height: 40px;width: 100%;">
							<view  style="display: flex;padding: 0 15px;width: 100%;">
								<input class="pl-5" @focus="onFocus='pwd'" @blur="onFocus=''" placeholder="请输入登录密码" :type="itype" value="" style="border:none;height: 40px;line-height: 40px;width: 90%;" />
								<van-icon :name="eye" @click="changeInput" size="22px" style="margin-top: 8px;"></van-icon>
							</view>
						</view>
						
						<uni-section v-if="login==0" :titleFontSize="'12'" style="background: none;" class="mb-10" title="邀请码(选填)"></uni-section>
						<view v-if="login==0" class="radus-5 border-gray " :class="onFocus == 'pwd' ? 'onFocus':''" style="height: 40px;background-color: #f8f8f8;display: flex;line-height: 40px;width: 100%;">
							<view  style="display: flex;padding: 0 15px;width: 100%;">
								<input class="pl-5" @focus="onFocus='pwd'" @blur="onFocus=''" placeholder="请输入邀请码" type="text" value="" style="border:none;height: 40px;line-height: 40px;width: 90%;" />
								
							</view>
						</view>
						
						<view class="radus-5" style="height: 40px;background-color: #f8f8f8;display: flex;line-height: 40px;width: 100%;margin-top: 20px;">
							<view style="display: flex;width: 100%;text-align: center;">
								<button @click="verifyShow" class="loginBtn font-14 font-weight" style="color:#babec5;width: 100%;border:none">{{login == 1 ? '登录' : '注册'}}</button>
							</view>
						</view>
						<view style="width: 100%;margin-top: 10px;" v-if="login==1">
							<view style="float: left;">
								<text class="font-12 color-blue" @click="login=0">立即注册</text>
							</view>
							<view style="float: right;">
								<text class="font-12" @click="$mroute.forgetpwd()">忘记密码?</text>
							</view>
						</view>
						<view v-if="login!=1" style="width: 100%;margin-top: 10px;text-align: center;">
							<text class="font-12 color-blue" @click="login=1">立即登录</text>
						</view>
					</view>
					
					<view class="bottomLink">
						<view >
							<text class="font-10 color-999">使用其他方式登录</text>
						</view>
						<view>
							<van-icon name="static/img/google1.png" size="32"></van-icon>
						</view>
						<view v-if="login!=1">
							<text class="font-10 color-999">
								注册账号即代表您同意了BBB的
							</text>
							<text class="font-10">用户协议</text>
							<text class="font-10 color-999">和</text>
							<text class="font-10">隐私条款</text>
						</view>
					</view>
				</view>
			</view>
			<uni-popup ref="verifypop" :style="{width:$device.screenWidth+'px'}" type="center">
				<view style=" height: 150px;background-color: #fff;width: 90%; margin: auto;border-radius: 5px;box-shadow: 0 0 5px rgba($color: #d8d8d8, $alpha: 0.5);" :style="{width:($device.screenWidth - 40)+'px'}">
					<view style="text-align: center;padding: 10px;">
						<text class="font-14 font-weight">请拖动滑块完成验证</text>
					</view>
					<liu-slider-verify style="width: 90%;margin: auto;;height: 40px;" ref="verify" @change='verifyResult'></liu-slider-verify>
					<view style="text-align: center;margin-top: 20px;">
						<text class="font-12" >
							请完成人机验证，进行下一步操作
						</text>
					</view>
				</view>
			</uni-popup>
		</uni-popup>
	</view>
	<areacode ref="areacode" @itemclick="areacode"></areacode>
	<alert ref="alert" title="测试" content="显示内容"></alert>
</template>

<script>
	import {Icon} from 'vant';
	export default {
		components:{
			[Icon.name]:Icon
		},
		name:"auth",
		props:{
			show:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				login:1,
				height:"100%",
				active:0,
				eye:"eye-o",
				itype:"password",
				onFocus:"",
				showareacode:"+86",
				verifyRes:false
			}
		},
		mounted(){
			// this.$refs.alert.open();
		},
		methods: {
			verifyResult(e){
				this.verifyRes = e.state;
				if(e.state){
					setTimeout(()=>{
						this.verifyHide();
						this.register();
					},1500);
				}
			},
			register(){
				this.$mroute.authVerify('email');
			},
			showArea(){
				this.$refs.areacode.open();
			},
			areacode(e){
				this.showareacode = e.dialingCode;
			},
			verifyShow(){
				this.$refs.verifypop.open();
			},
			verifyHide(){
				this.$refs.verifypop.close();
			},
			open(){
				this.$refs.popup.open();
			},
			close(){
				this.$refs.popup.close();
			},
			switchPanel(){
				
			},
			changeInput(){
				if(this.itype == 'text'){
					this.itype = 'password'
					this.eye = 'eye-o';
				}else{
					this.itype = 'text'
					this.eye = 'browsing-history-o';
				}
			}
		}
	}
</script>

<style>
	.authPanel {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		z-index: 9999;
	}
	.onFocus {
		border:solid 1px #2979ff;
	}
	.bottomLink {
		position: fixed;
		bottom: 25px;
		text-align: center;
		width: 100%;
	}
	.loginBtn:after {
		border:none
	}
	.tab-active {
		background: #fff;
		border:solid 5px #f2f3f5;
		height: 30px !important;
		line-height: 30px !important;
		font-weight: 500;
		border-radius: 10px;
	}
	.tab-con view {
		width: 50%;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
	.tab-con {
		width: 150px;
		height: 40px;
		background-color: #f2f3f5;
		margin: 20px 0px 0px 15px;
		border-radius: 7px;
		display: flex;
	}
	.bg {
		background: url('../../static/img/minebg.png') no-repeat;
		background-size: 100%  30%;
		height: 100%;
	}
</style>
