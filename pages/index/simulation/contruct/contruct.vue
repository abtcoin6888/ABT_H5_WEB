<template>
	<view class="light">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar bg-gray"></view>
		<!-- #endif -->
		<view class="headers">
			<view class="flex p-15" style="height: 45px;line-height: 45px;align-items: center;">
				<view class="flex"  style="width: 70%;">
					<view class="flex" @click="$refs.showSelect.open()" style="align-items: center;">
						<image src="/static/img/zy.png" style="height: 16px;width: 18px;" mode=""></image>
					</view>
					<view class="pl-5 flex" style="align-items: center;" @click="$refs.showSelect.open()">
						<text class="font-14 font-weight color-black">BTC/USDT</text>
						<uni-tag class="pl-5" :text="this.$t('simulation.title')" type="warning" size="small" />
						<text class="font-12 price_down pl-5 font-weight">-3.13%</text>
					</view>
				</view>
				<view class="flex" style="width: 30%;justify-content: flex-end;">
					<view class="flex" style="align-items: center;">
						<image src="/static/img/x-s.png" style="width: 18px;height: 20px;" mode=""></image>
					</view>
					<view class="pl-10 flex" style="align-items: center;" @click="$mroute.toKline()">
						<image src="/static/img/4-1.png" style="width: 18px;height: 20px;" mode=""></image>
					</view>
					<view @click="IsShow=!IsShow" class="pl-10 flex" style="align-items: center;">
						<image src="/static/img/4-2.png" style="width: 18px;height: 20px;" mode=""></image>
					</view>
					<view @click="showMenu=!showMenu" class="pl-10 flex" style="align-items: center;">
						<image src="/static/img/wf.webp"  style="width: 16px;height: 16px;" mode=""></image>
					</view>
					<view v-show="showMenu" class="menuStyle">
						<view class="p-l-r-15">
							<view>
								<text class="font-12 font-weight">资金划转</text>
							</view>
							<view @click="$mroute.contractOrder(1);showMenu=false">
								<text class="font-12 font-weight">资金流水</text>
							</view>
							<view @click="$mroute.contractInfo(1);showMenu=false">
								<text class="font-12 font-weight">合约信息</text>
							</view>
							<!-- <view>
								<text class="font-12 font-weight">合约设置</text>
							</view> -->
							<!-- <view @click="$mroute.calculator(1);showMenu=false">
								<text class="font-12 font-weight">计算器</text>
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="container" style="margin-top: 40px;">
			<!-- v-show="KLine.IsShow == true" -->
			<view class="kline" style="width: 100%;height: 288.5px;" v-show="IsShow == true">
				<view class="flex scroll-container">
					<view class="flex scroll-content" style="padding: 0 15px;" :style="{'width':$device.windowWidth+'px'}">
						<view class="pl-10" v-for="(item,index) in time" :key="index" @click="timeIndex=index">
							<view>
								<text class="font-12" :class="{'color-black':timeIndex===index,'color-999':timeIndex!=index}">{{item}}</text>
							</view>
							<view :class="{'timeActive':timeIndex===index}"></view>
						</view>
					</view>
				</view>
				<!--  #ifdef  H5 -->
				<div>
					<div class='kline' :style="{'width':$device.windowWidth+'px','height':'250px'}" id="kline" ref='kline'></div>
				</div>
				<!--  #endif -->
				<!-- #ifdef APP-PLUS -->
				<canvas id="klineapp" ref="klineapp" canvas-id='klineapp' class='klineapp' :style="{'width':$device.windowWidth+'px','height':'250px'}" @touchstart="KLineTouchStart" @touchmove='KLineTouchMove' @touchend='KLineTouchEnd' ></canvas>  
				<!-- #endif -->
			</view>
			<view class="pd-15 flex">
				<view class="left" style="width: 60%;">
					<view class="flex">
						<view @click="$refs.showPosition.open()" class="bg-gray center radus-5" style="width: 50px;height: 30px;line-height: 30px;padding: 0 10px;">
							<text class="font-12 color-black">全仓</text>
							<image class="pl-5" src="/static/img/Dg.webp" style="height: 8px;width: 10px;" mode=""></image>
						</view>
						<view @click="$refs.showMuitl.open()" class="bg-gray center radus-5" style="width: 50px;height: 30px;line-height: 30px;margin-left: 10px;padding: 0 10px;">
							<text class="font-12 color-black">50X</text>
							<image class="pl-5" src="/static/img/Dg.webp" style="height: 8px;width: 10px;" mode=""></image>
						</view>
					</view>
					<view class="flex mt-10">
						<view class="rectangle center rectangle_buy" style="width: 48%;">
							<text class="font-14">开仓</text>
						</view>
						<view class="rectangle_sell center rectangleStyle_sell rectangleStyle_sell_active" style="width: 48%;">
							<text class="font-14">平仓</text>
						</view>
					</view>
					<view class="mt-10">
						<view class="flex">
							<view style="width: 50%;">
								<text class="font-10 color-999">可用</text>
							</view>
							<view class="flex" style="align-items: center;">
								<text class="font-10 font-weight color-black">1000.00</text>
								<text class="font-10 font-weight color-black pl-5">USDT</text>
								<image class="pl-5" src="/static/img/9i.png" style="height: 12px;width: 12px;" mode=""></image>
							</view>
						</view>
					</view>
					<view class="mt-10">
						<view class="defaultBtns bg-gray" style="width: 100%;">
							<view class="p-15 flex">
								<view style="width: 90%;">
									<!-- <text class="font-12 font-weight color-black">限价单</text> -->
									<uni-combox ref="xjse" @input="selectType" :label="'市价下单'" :border="false" class="font-12 font-weight color-black" :candidates="actions" v-model="OrderType"></uni-combox>
								</view>
								<view style="width: 10%;">
									<image @click="$refs.xjse.toggleSelector()" src="/static/img/Dg.webp" style="width: 12px;height: 10px;" mode=""></image>
								</view>
							</view>
						</view>
						<!-- <view>实现一个气泡弹窗</view> -->
					</view>
					<view class="mt-10" v-show="OrderType == '限价下单'">
						<view class="defaultBtns bg-gray flex">
							<view style="width: 80%;">
								<input type="text" placeholder="29142.01" class="defaultBtns font-12 color-black" style="padding-left: 15px;">
							</view>
							<view>
								<text class="font-12 font-weight color-999">USDT</text>
							</view>
						</view>
					</view>
					<view class="mt-10">
						<view class="flex" style="align-items: center;">
							<uni-combox ref="orderunit" style="width: 110px;" :label="'按数量下单'" @input="selectType" :border="false" class="font-12 font-weight color-black" :candidates="orderUnit" v-model="orderUnitValue"></uni-combox>
							<!-- <text class="font-12 font-weight color-black">按数量下单</text> -->
							<image class="pl-5" src="/static/img/Dg.webp" style="width: 10px;height: 8px;" mode=""></image>
						</view>
						<view class="defaultBtns bg-gray flex mt-5">
							<view style="width: 80%;">
								<input type="text" placeholder="数量" class="defaultBtns font-12 color-black" style="padding-left: 15px;">
							</view>
							<view>
								<text class="font-12 font-weight color-999">BTC</text>
							</view>
						</view>
					</view>
					<view class="mt-10">
						<view>
							<slider style="margin: 0;" value="0" @change="sliderChange" block-color="#8A6DE9" block-size="20" step="1" />
						</view>
						<view class="flex" style="width: 100%;">
							<view>
								<text class="font-10 color-999">0%</text>
							</view>
							<view style="width: 25%;height:5px;text-align: right;">
								<text class="font-10 color-999">25%</text>
							</view>
							<view style="width: 25%;height:5px;text-align: right;">
								<text class="font-10 color-999">50%</text>
							</view>
							<view style="width: 25%;height:5px;text-align: right;">
								<text class="font-10 color-999">75%</text>
							</view>
							<view style="width: 25%;height:5px;text-align: right;">
								<text class="font-10 color-999">100%</text>
							</view>
						</view>
					</view>
					<view class="mt-10">
						<view class="flex">
							<view style="align-items: center;" class="flex">
								<image @click="stopProfit=!stopProfit" :src="stopProfit?'/static/img/xA.png':'/static/img/qF1.png'" style="width:16px;height: 16px;" mode=""></image>
							</view>
							<view style="align-items: center;" class="flex"> 
								<text class="font-10 pl-5 font-weight color-999">止盈止损</text>
							</view>
							<view style="align-items: center;" class="flex">
								<image @click="$refs.showPFti.open()" src="/static/img/e4.webp" class="pl-5" style="width:12px;height: 12px;" mode=""></image>
							</view>
						</view>
						<view class="mt-5 flex" v-show="stopProfit">
							<view class="" style="width: 45%;margin-right: 1%;">
								<input type="text" style="padding-left: 10px;" class="defaultBtns-sm bg-gray border-gray radus-5 "  placeholder="止盈价">
							</view>
							<view class="flex" style="width: 45%;margin-left: 5%;justify-content: flex-end;">
								<input type="text" class="defaultBtns-sm bg-gray radus-5 border-gray" style="padding-left: 10px;"  placeholder="止损价">
							</view>
						</view>
					</view>
					<view class="btn-group" v-if="true">
						<view class="mt-10">
							<view class="flex">
								<view style="width: 50%;align-items: center;" class="flex">
									<text class="font-10 font-weight color-999">可开多</text>
									<image @click="openSupport(0)" class="pl-5" src="/static/img/e4.webp" style="width: 12px;height: 12px;" mode=""></image>
								</view>
								<view style="width: 50%;text-align: right;">
									<text class="font-10 font-weight color-black">0.00 BTC</text>
								</view>
							</view>
							<view class="flex">
								<view style="width: 50%;">
									<text class="font-10 font-weight color-999">保证金</text>
								</view>
								<view style="width: 50%;text-align: right;" class="mt-5">
									<text class="font-10 font-weight color-black">0.00 USDT</text>
								</view>
							</view>
						</view>
						<view>
							<view>
								<button class="defaultBtns bg-buy color-white font-14">开多(看涨)</button>
							</view>
						</view>
						<view class="mt-10">
							<view class="flex">
								<view style="width: 50%;align-items: center;" class="flex">
									<text class="font-10 font-weight color-999">可开空</text>
									<image @click="openSupport(1)" class="pl-5" src="/static/img/e4.webp" style="width: 12px;height: 12px;" mode=""></image>
								</view>
								<view style="width: 50%;text-align: right;">
									<text class="font-10 font-weight color-black">0.00 BTC</text>
								</view>
							</view>
							<view class="flex">
								<view style="width: 50%;">
									<text class="font-10 font-weight color-999">保证金</text>
								</view>
								<view style="width: 50%;text-align: right;" class="mt-5">
									<text class="font-10 font-weight color-black">0.00 USDT</text>
								</view>
							</view>
						</view>
						<view>
							<view>
								<button class="defaultBtns bg-sell color-white font-14">开空(看跌)</button>
							</view>
						</view>
					</view>
					<view class="btn-group mt-15" v-else>
						<view>
							<view>
								<button class="defaultBtns bg-blue color-white font-14">请登录或注册</button>
							</view>
						</view>
					</view>
				</view>
				<view class="right" style="width: 40%;">
					<view>
						<view class="flex" style="justify-content: flex-end;align-items: center;">
							<image @click="$refs.showZjfl.open()" src="/static/img/e4.webp" style="height: 12px;width: 12px;" mode=""></image>
							<text class="font-10 color-999">资金费率/结算时间</text>
						</view>
						<view class="flex" style="justify-content: flex-end;">
							<text class="font-10 color-black">0.0100%/07:27:00</text>
						</view>
					</view>
					<view class="flex mt-5">
						<view style="width: 60%;" class="pl-5">
							<view>
								<text class="font-10 color-999">价格</text>
							</view>
							<view>
								<text class="font-10 color-999">(USDT)</text>
							</view>
						</view>
						<view style="width: 40%;text-align: right;">
							<view>
								<text class="font-10 color-999">数量</text>
							</view>
							<view>
								<text class="font-10 color-999">(BTC)</text>
							</view>
						</view>
					</view>
					<view class="listUp">
						<view class="flex" v-for="i in (OrderType == '限价下单' ? 7 : 6)" :key="i">
							<view style="width: 60%;" class="mt-5 pl-5">
								<text class="font-10 price_up">29,096,92</text>
							</view>
							<view style="width: 40%;text-align: right;" class="mt-5">
								<text class="font-10 font-weight color-black">0.319769</text>
							</view>
						</view>
					</view>
					<view class="center mt-10" style="margin-bottom: 10px;">
						<view>
							<text class="font-14 font-weight price_up">29,096.11</text>
						</view>
						<view>
							<text class="font-10 color-999">标记价格</text>
							<text class="font-10 price_up pl-5">29,096.11</text>
						</view>
					</view>
					<view class="listBottom">
						<view class="flex" v-for="i in (OrderType == '限价下单' ? 7 : 6)" :key="i">
							<view style="width: 60%;" class="mt-5 pl-5">
								<text class="font-10 price_down">29,095,23</text>
							</view>
							<view style="width: 40%;text-align: right;" class="mt-5">
								<text class="font-10 font-weight color-black">0.319769</text>
							</view>
						</view>
					</view>
					<view class="flex mt-10">
						<view style="width: 70%;" class="pl-5">
							<view class="defaultBtns-sm  bg-gray flex pl-5" style="align-items: center;">
								<uni-combox ref="showUnit" style="width: 80px;" :label="'0.1'" @input="selectType" :border="false" class="font-12 font-weight color-black" :candidates="showUnit" v-model="showUnitValue"></uni-combox>
								<image class="pl-5" src="/static/img/Dg.webp" style="width: 10px;height: 8px;" mode=""></image>
							</view>
						</view>
						<view class="flex bg-gray" style="width: 30%;margin-left: 10px;">
							<view class="flex bg-gray" style="align-items: center;margin: auto;">
								<image src="/static/img/Br.png" style="width: 22px;height: 22px;" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="width: 100%; height: 5px;background-color: #f8f8f8;"></view>
			<view class="flex" style="align-items: center;padding: 10px 15px;">
				<view class="flex" style="width: 95%;">
					<view>
						<text class="font-14" @click="showOrder=1" :class="{'color-black':showOrder==1,'color-999':showOrder!=1}">当前持仓(1)</text>
					</view>
					<view style="margin-left: 15px;">
						<text class="font-14" @click="showOrder=2" :class="{'color-black':!showOrder==2,'color-999':showOrder!=2}">当前委托</text>
					</view>
					<view style="margin-left: 15px;">
						<text class="font-14" @click="showOrder=3" :class="{'color-black':!showOrder==3,'color-999':showOrder!=3}">计划委托</text>
					</view>
				</view>
				<view style="width: 5%;align-items: center;" class="flex">
					<image src="/static/img/order.webp" style="width: 14px;height: 16px;" mode=""></image>
				</view>
			</view>
			<!-- 持仓区域 -->
			<view v-show="showOrder==1" style="height: 30px;background-color: #f8f8f8;align-items: center;padding-left: 15px;" class="flex">
				<view class="flex" style="align-items: center;width: 95%;">
					<view style="width: 50%;align-items: center;" class="flex">
						<image src="/static/img/qF1.png" style="width: 16px;height: 16px;" mode=""></image>
						<text class="font-10 color-999 pl-5">仅当前合约</text>
					</view>
					<view style="align-items: center;justify-content: flex-end;width: 50%;" class="flex">
						<text class="font-12 font-weight color-blue" @click="allPingcang()">一键平仓</text>
					</view>
				</view>
			</view>
			<view class="pd-15" v-show="showOrder==1">
				<view class="nodata center " style="align-items: center;margin:auto;margin-top: 30px;" v-if="false">
					<view>
						<image src="/static/img/noorder.png" style="height: 100px;width: 90px;" mode=""></image>
					</view>
					<view>
						<text class="font-14 color-999">暂无订单</text>
					</view>
				</view>
				
				<view class="list">
					<view class="flex">
						<view class="flex" style="width: 80%;align-items: center;">
							<text class="font-12 color-white  kong">空</text>
							<text class="font-14 font-weight color-black pl-5">BTCUSDT 永续</text>
							<text class="font-10 price_down pl-5">全仓50X</text>
						</view>
						<view class="flex" style="width: 20%;justify-content: flex-end;">
							<image src="/static/img/FD.png" style="height: 18px;width: 18px;" mode=""></image>
						</view>
					</view>
					<view class="mt-10">
						<view class="flex">
							<view style="width:60%;">
								<text class="font-12 color-999">盈亏(USDT)</text>
							</view>
							<view style="width: 40%; justify-content: flex-end;" class="flex">
								<text class="font-12 color-999">回报率</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width:60%;">
								<text class="font-14 font-weight price_up">
									+1,439.6105
								</text>
							</view>
							<view style="width: 40%; justify-content: flex-end;" class="flex">
								<text class="font-14 font-weight price_up">
									+58.79%
								</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width:60%;">
								<text class="font-12 color-999">持仓均价</text>
							</view>
							<view style="width: 40%; justify-content: flex-end;" class="flex">
								<text class="font-12 color-999">预期强平价格</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width:60%;">
								<text class="font-12 font-weight color-black">
									29,847,58
								</text>
							</view>
							<view style="width: 40%; justify-content: flex-end;" class="flex">
								<text class="font-12 font-weight color-black">
									32.779.04
								</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width: 33%;">
								<text class="font-10 color-999">标记价格</text>
							</view>
							<view style="width: 33%;" class="center">
								<text class="font-10 color-999">保证金(USDT)</text>
							</view>
							<view style="width: 33%;text-align: right;">
								<text class="font-10 color-999">总持仓(USDT)</text>
							</view>
						</view>
						<view class="flex">
							<view style="width: 33%;">
								<text class="font-10 color-black">29,481,88</text>
							</view>
							<view style="width: 33%;" class="center">
								<text class="font-10 color-black">14,553,4191</text>
							</view>
							<view style="width: 33%;text-align: right;">
								<text class="font-10 color-black">123,470,1134</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width: 33%;align-items: center;" class="flex">
								<text class="font-10 color-999">已结算盈亏</text>
								<image @click="$refs.jiesuan.open()" src="/static/img/e4.webp" style="height: 12px;width: 12px;" mode=""></image>
							</view>
							<view style="width: 33%;" class="center">
								<text class="font-10 color-999">保证金率</text>
							</view>
							<view style="width: 33%;text-align: right;">
								<text class="font-10 color-999">可平仓(USDT)</text>
							</view>
						</view>
						<view class="flex">
							<view style="width: 33%;">
								<text class="font-10 color-black">-74.9841</text>
							</view>
							<view style="width: 33%;" class="center">
								<text class="font-10 color-black">11.60%</text>
							</view>
							<view style="width: 33%;text-align: right;">
								<text class="font-10 color-black">124,984.0092</text>
							</view>
						</view>
					</view>
					<view class="flex mt-10">
						<view @click="$mroute.entrust()" style="width: 33.3%;">
							<view style="width: 80%;margin: auto;" class="defaultBtns-sm bg-gray border-gray center radus-2">
								<text class="font-12 color-black">止盈止损</text>
							</view>
						</view>
						<view style="width: 33.3%;">
							<view @click="$refs.actionOrder.open()" style="width: 80%;margin: auto;" class="defaultBtns-sm radus-2 bg-gray border-gray center">
								<text class="font-12 color-black">平仓</text>
							</view>
						</view>
						<view style="width: 33.3%;">
							<view @click="$refs.speedAction.open()" style="width: 80%;margin: auto;" class="defaultBtns-sm radus-2  bg-gray border-gray center">
								<text class="font-12 color-black">闪电平仓</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 当前委托区域 -->
			<view v-show="showOrder==2">
				<view class="flex" style="height: 30px;background-color: #f8f8f8;align-items: center;padding-left: 15px;">
					<!-- <text class="font-10 color-999 pl-5">当前币对资产</text> -->
					<view style="width: 50%;align-items: center;" class="flex">
						<image src="/static/img/qF1.png" style="width: 16px;height: 16px;" mode=""></image>
						<text class="font-10 color-999 pl-5">仅当前合约</text>
					</view>
				</view>
				<view class="p-l-r-15 mt-10">
					<view class="items">
						<view class="">
							<view class="flex" style="align-items: center;">
								<view style="width: 65%;align-items: center;" class="flex">
									<view class="label_buy">
										<text class="color-white font-12">买入开多</text>
									</view>
									<view class="pl-5">
										<text class="font-12 font-weight color-black">BTCUSDT</text>
										<text class="pl-5 font-12 font-weight color-black">永续</text>
									</view>
								</view>
								<view style="width: 35%;justify-content: flex-end;" class="flex">
									<text class="font-12 color-blue">撤单</text>
								</view>
							</view>
						</view>
						<view class="flex mt-5">
							<view>
								<text class="color-999 font-10">2023-08-03 15:12</text>
								<text class="color-999 font-10 pl-5">限价单</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width: 60%;" class="flex">
								<text class="font-10 color-999">委托价格(USDT)</text>
							</view>
							<view style="width: 40%;justify-content: flex-end;" class="flex">
								<text class="font-10 color-black">28,500.00</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width: 60%;" class="flex">
								<text class="font-10 color-999">成交均价(USDT)</text>
							</view>
							<view style="width: 40%;justify-content: flex-end;" class="flex">
								<text class="font-10 color-black">--</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width: 60%;" class="flex">
								<text class="font-10 color-999">止盈/止损</text>
							</view>
							<view style="width: 40%;justify-content: flex-end;" class="flex">
								<text class="font-10 color-black">--/--</text>
							</view>
						</view>
					</view>
					<view class="items mt-10">
						<view class="">
							<view class="flex" style="align-items: center;">
								<view style="width: 65%;align-items: center;" class="flex">
									<view class="label_sell">
										<text class="color-white font-12">卖出开空</text>
									</view>
									<view class="pl-5">
										<text class="font-12 font-weight color-black">BTCUSDT</text>
										<text class="pl-5 font-12 font-weight color-black">永续</text>
									</view>
								</view>
								<view style="width: 35%;justify-content: flex-end;" class="flex">
									<text class="font-12 color-blue">撤单</text>
								</view>
							</view>
						</view>
						<view class="flex mt-5">
							<view>
								<text class="color-999 font-10">2023-08-03 15:12</text>
								<text class="color-999 font-10 pl-5">限价单</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width: 60%;" class="flex">
								<text class="font-10 color-999">委托价格(USDT)</text>
							</view>
							<view style="width: 40%;justify-content: flex-end;" class="flex">
								<text class="font-10 color-black">28,500.00</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width: 60%;" class="flex">
								<text class="font-10 color-999">成交均价(USDT)</text>
							</view>
							<view style="width: 40%;justify-content: flex-end;" class="flex">
								<text class="font-10 color-black">--</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width: 60%;" class="flex">
								<text class="font-10 color-999">止盈/止损</text>
							</view>
							<view style="width: 40%;justify-content: flex-end;" class="flex">
								<text class="font-10 color-black">--/--</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 计划委托区域 -->
			<view v-show="showOrder == 3">
				<view class="flex" style="height: 30px;background-color: #f8f8f8;align-items: center;padding-left: 15px;">
					<view style="width: 50%;align-items: center;" class="flex">
						<image src="/static/img/qF1.png" style="width: 16px;height: 16px;" mode=""></image>
						<text class="font-10 color-999 pl-5">仅当前合约</text>
					</view>
				</view>
				<view class="p-l-r-15 mt-10">
					<view class="items mt-10">
						<view class="">
							<view class="flex" style="align-items: center;">
								<view style="width: 65%;align-items: center;" class="flex">
									<view class="label_sell">
										<text class="color-white font-12">卖出开空</text>
									</view>
									<view class="pl-5">
										<text class="font-12 font-weight color-black">BTCUSDT</text>
										<text class="pl-5 font-12 font-weight color-black">永续</text>
									</view>
								</view>
								<view style="width: 35%;justify-content: flex-end;" class="flex">
									<text class="font-12 color-blue">撤单</text>
								</view>
							</view>
						</view>
						<view class="flex mt-5">
							<view>
								<text class="color-999 font-10">2023-08-03 15:12</text>
								<text class="color-999 font-10 pl-5">止盈单</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width: 60%;" class="flex">
								<text class="font-10 color-999">触发价格</text>
							</view>
							<view style="width: 40%;justify-content: flex-end;" class="flex">
								<text class="font-10 color-black">28,500.00</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width: 60%;" class="flex">
								<text class="font-10 color-999">委托价格</text>
							</view>
							<view style="width: 40%;justify-content: flex-end;" class="flex">
								<text class="font-10 color-black">市价</text>
							</view>
						</view>
						<view class="flex mt-5">
							<view style="width: 60%;" class="flex">
								<text class="font-10 color-999">委托数量(BTC)</text>
							</view>
							<view style="width: 40%;justify-content: flex-end;" class="flex">
								<text class="font-10 color-black">4.244</text>
							</view>
						</view>
						<view style="width: 100%;height: 1px;background-color: #eee;margin-top: 15px;"></view>
					</view>
				</view>
			</view>
			
		</view> 
		<!-- 闪电平仓 -->
		<uni-popup ref="speedAction" type="bottom" style="z-index: 20000;">
			<view class="authPanel">
				<view class="pd-15">
					<view class="center flex" style="align-items: center;">
						<view style="width: 95%;">
							<text class="font-14 font-weight color-black">闪电平仓</text>
						</view>
						<view>
							<image @click="$refs.speedAction.close()" src="/static/img/close2.png" style="width: 25px;height: 25px;" mode=""></image>
						</view>
					</view>
					<view class="mt-10">
						<view class="flex">
							<view class="flex" style="width: 80%;align-items: center;">
								<text class="font-12 color-white  kong">空</text>
								<text class="font-14 font-weight color-black pl-5">BTCUSDT 永续</text>
								<text class="font-10 price_down pl-5">全仓50X</text>
							</view>
						</view>
					</view>
					<view class="mt-10">
						<view class="flex">
							<view style="width: 50%;">
								<text class="font-12 color-black">价格</text>
							</view>
							<view style="width: 50%;text-align: right;">
								<text class="font-12 font-weight color-black">市价</text>
							</view>
						</view>
					</view>
					<view class="mt-10">
						<view class="flex">
							<view style="width: 50%;">
								<text class="font-12 color-black">数量</text>
							</view>
							<view style="width: 50%;text-align: right;">
								<text class="font-12 font-weight color-black">全部仓位</text>
							</view>
						</view>
					</view>
					
				</view>
				<view class="mt-10" style="position: absolute;bottom: 10px;width: 100%;">
					<view style="width: 95%; margin: auto;">
						<button class="bg-blue defaultBtn font-14 font-weight radus-5">确认平仓</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 平仓操作 -->
		<uni-popup ref="actionOrder" type="bottom" style="z-index: 20000;">
			<view class="authPanel">
				<view class="pd-15">
					<view class="center flex" style="align-items: center;">
						<view style="width: 95%;">
							<text class="font-14 font-weight color-black">平仓</text>
						</view>
						<view>
							<image @click="$refs.actionOrder.close()" src="/static/img/close2.png" style="width: 25px;height: 25px;" mode=""></image>
						</view>
					</view>
					<view class="mt-10">
						<view class="flex">
							<view class="flex" style="width: 80%;align-items: center;">
								<text class="font-12 color-white  kong">空</text>
								<text class="font-14 font-weight color-black pl-5">BTCUSDT 永续</text>
								<text class="font-10 price_down pl-5">全仓50X</text>
							</view>
						</view>
					</view>
					<view class="mt-10">
						<view>
							<text class="font-12 color-black">价格</text>
						</view>
						<view class="flex mt-5">
							<view style="width: 80%;">
								<view class="flex bg-gray radus-5" :class="{'border-blue':priceInput,'border-gray':!priceInput}" style="width: 100%;height: 35px;line-height: 35px;">
									<view style="width: 70%;">
										<input @focus="priceInput=true" @blur="priceInput=false" style="height: 35px;line-height: 35px;" class="font-12 color-black pl-5" type="text" value="29379.44">
									</view>
									<view style="justify-content: flex-end;width: 30%;padding-right: 5px;" class="flex">
										<text class="font-12 font-weight color-black">USDT</text>
									</view>
								</view>
							</view>
							<view style="width: 20%;">
								<view class="bg-gray radus-5 border-gray center" style="height: 35px;line-height: 35px;width: 80%;margin: auto;">
									<text class="font-12 color-black">市价</text>
								</view>
							</view>
						</view>
						<view class="mt-10">
							<text class="font-12 color-black">数量</text>
						</view>
						<view class="mt-5">
							<view>
								<view class="flex bg-gray radus-5" :class="{'border-blue':priceNum,'border-gray':!priceNum}" style="width: 100%;height: 35px;line-height: 35px;">
									<view style="width: 70%;">
										<input @focus="priceNum=true" @blur="priceNum=false" style="height: 35px;line-height: 35px;" class="font-12 color-black pl-5" type="text" value="29379.44">
									</view>
									<view style="justify-content: flex-end;width: 30%;padding-right: 5px;" class="flex">
										<text class="font-12 font-weight color-black">USDT</text>
									</view>
								</view>
							</view>
						</view>
						<view class="mt-10">
							<view>
								<view>
									<slider style="margin: 0;" :max="125" :min="1" :value="mutil" @change="changeMutil" block-color="#8A6DE9" block-size="20" step="1" />
								</view>
								<view class="flex" style="width: 100%;">
									<view>
										<text class="font-10 color-999">0%</text>
									</view>
									<view style="width: 25%;height:5px;text-align: right;">
										<text class="font-10 color-999">25%</text>
									</view>
									<view style="width: 25%;height:5px;text-align: right;">
										<text class="font-10 color-999">50%</text>
									</view>
									<view style="width: 25%;height:5px;text-align: right;">
										<text class="font-10 color-999">75%</text>
									</view>
									<view style="width: 25%;height:5px;text-align: right;">
										<text class="font-10 color-999">100%</text>
									</view>
								</view>
							</view>
						</view>
						<view class="mt-10">
							<view class="flex">
								<view style="width: 60%;">
									<text class="font-12 color-black">可平仓位</text>
								</view>
								<view style="width: 40%;text-align: right;">
									<text class="font-12 color-black">124526.25 USDT</text>
								</view>
							</view>
							<view class="flex">
								<view style="width: 60%;">
									<text class="font-12 color-black">预估盈亏</text>
								</view>
								<view style="width: 40%;text-align: right;">
									<text class="font-12 color-black">458.7447 USDT</text>
								</view>
							</view>
						</view>
						<view class="mt-10">
							<button class="bg-blue defaultBtn font-14 font-weight radus-5">确认平仓</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 仓位选择 -->
		<uni-popup ref="showPosition" type="bottom" style="z-index: 20000;">
			<view class="authPanel">
				<view class="pd-15">
					<view class="center flex" style="align-items: center;">
						<view style="width: 95%;">
							<text class="font-14 font-weight color-black">保证金模式</text>
						</view>
						<view>
							<image @click="$refs.showPosition.close()" src="/static/img/close2.png" style="width: 25px;height: 25px;" mode=""></image>
						</view>
					</view>
					<view class="flex mt-10">
						<view style="width: 50%;">
							<view class="bg-gray defaultBtn border-blue radus-5 center" style="width: 90%;margin: auto;">
								<text class="font-14 font-weight color-black">全仓</text>
							</view>
						</view>
						<view style="width: 50%;">
							<view class="bg-gray defaultBtn border-gray radus-5 center" style="width: 90%;margin: auto;">
								<text class="font-14 font-weight color-black">逐仓</text>
							</view>
						</view>
					</view>
					<view class="mt-10">
						<view>
							<text class="font-12 font-weight price_up">
								持有任何仓位或有任何挂单时不可改变保
							</text>
						</view>
						<view class="mt-10 flex">
							<uni-collapse >
								<uni-collapse-item title="保证金模式什么是全仓和逐仓?" :show-animation="true">
									<view class="content">
										<view>
											<text class="text font-12 color-999">
												全仓模式: 所有用来担保全仓仓位的保证金。当全仓仓位被强制平仓时，会损失这些资产。请注意: 转入合约账户的资产会自动作为全仓保证金。
											</text>
										</view>
										<view class="mt-10">
											<text class="text font-12 color-999 ">
												逐仓模式: 所有用来担保逐仓仓位的保证金。逐仓保证金和全仓分开，全仓仓位被强制平仓不会影响到这部分资产。
											</text>
										</view>
									</view>
								</uni-collapse-item>
							</uni-collapse>
						</view>
						<view class="mt-10">
							<button class="defaultBtn bg-blue radus-5 font-14 font-weight">确认</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 杠杆设置 -->
		<uni-popup ref="showMuitl" type="bottom" style="z-index: 20000;">
			<view class="authPanel">
				<view class="pd-15">
					<view class="center flex" style="align-items: center;">
						<view style="width: 95%;">
							<text class="font-14 font-weight color-black">调整杠杆</text>
						</view>
						<view>
							<image @click="$refs.showMuitl.close()" src="/static/img/close2.png" style="width: 25px;height: 25px;" mode=""></image>
						</view>
					</view>
					
					<view class="mt-10">
						<uni-number-box style="width: 100%;height: 40px;" :min="1" :max="125" v-model="mutil"  />
					</view>
					<view class="mt-10">
						<view>
							<slider style="margin: 0;" :max="125" :min="1" :value="mutil" @change="changeMutil" block-color="#8A6DE9" block-size="20" step="1" />
						</view>
						<view class="flex" style="width: 100%;">
							<view>
								<text class="font-10 color-999">1X</text>
							</view>
							<view style="width: 20%;height:5px;text-align: right;">
								<text class="font-10 color-999">25X</text>
							</view>
							<view style="width: 20%;height:5px;text-align: right;">
								<text class="font-10 color-999">50X</text>
							</view>
							<view style="width: 20%;height:5px;text-align: right;">
								<text class="font-10 color-999">75X</text>
							</view>
							<view style="width: 20%;height:5px;text-align: right;">
								<text class="font-10 color-999">100X</text>
							</view>
							<view style="width: 20%;height:5px;text-align: right;">
								<text class="font-10 color-999">125X</text>
							</view>
						</view>
					</view>
					<view class="mt-10 flex">
						<view class="center" style="width: 50%;">
							<view>
								<text class="font-12 font-weight color-999">当前杠杆持仓上限(BTC)</text>
							</view>
							<view class="mt-10">
								<text class="font-14 font-weight color-black">17.127</text>
							</view>
						</view>
						<view class="center" style="width: 50%;">
							<view>
								<text class="font-12 font-weight color-999">可开(BTC)</text>
							</view>
							<view class="mt-10">
								<text class="font-14 font-weight color-black">0.00</text>
							</view>
						</view>
					</view>
					<view class="mt-10">
						<button class="defaultBtn bg-blue radus-5 font-14 font-weight">确认</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 止盈止损帮助 -->
		<uni-popup ref="showPFti" type="bottom" style="z-index: 20000;">
			<view class="authPanel">
				<view class="pd-15">
					<view class="center flex" style="align-items: center;">
						<view style="width: 95%;">
							<text class="font-14 font-weight color-black">止盈止损</text>
						</view>
						<view>
							<image @click="$refs.showPFti.close()" src="/static/img/close2.png" style="width: 25px;height: 25px;" mode=""></image>
						</view>
					</view>
					<view class="mt-10">
						<text class="font-12 color-999">
							开仓成交后止盈止损方可生效，触发止盈或止损后将自动以市价进行平仓
						</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 开仓帮助 -->
		<uni-popup ref="showSupport" type="bottom" style="z-index: 20000;">
			<view class="authPanel">
				<view class="pd-15">
					<view class="center flex" style="align-items: center;">
						<view style="width: 95%;">
							<text class="font-14 font-weight color-black">{{support == 0 ?'可开多':'可开空'}}</text>
						</view>
						<view>
							<image @click="$refs.showSupport.close()" src="/static/img/close2.png" style="width: 25px;height: 25px;" mode=""></image>
						</view>
					</view>
					<view class="mt-10">
						<text class="font-12 color-999" v-if="support == 0">
							不考虑手续费时，您的可用余额在当前杠杆水平和最新市场价下的理论最大可开多数量或对应的价值。
						</text>
						<text class="font-12 color-999" v-if="support == 1">
							不考虑手续费时，您的可用余额在当前杠杆水平和最新市场价下的理论最大可开空数量或对应的价值。
						</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 资金费率说明 -->
		<uni-popup ref="showZjfl" type="bottom" style="z-index: 20000;">
			<view class="authPanel">
				<view class="pd-15">
					<view class="center flex" style="align-items: center;">
						<view style="width: 95%;">
							<text class="font-14 font-weight color-black">资金费率/结算时间</text>
						</view>
						<view>
							<image @click="$refs.showZjfl.close()" src="/static/img/close2.png" style="width: 25px;height: 25px;" mode=""></image>
						</view>
					</view>
					<view class="mt-10">
						<view class="flex">
							<view style="width: 50%;">
								<text class="font-12 color-999">
									当期结算时间
								</text>
							</view>
							<view style="width: 50%; text-align: right;">
								<text class="font-12 color-black">
									07月29日 00时00分 01:01:37
								</text>
							</view>
						</view>
						<view class="flex mt-10">
							<view style="width: 50%;">
								<text class="font-12 color-999">
									当期资金费率（多仓支付）
								</text>
							</view>
							<view style="width: 50%; text-align: right;">
								<text class="font-12 color-black">
									0.0100%
								</text>
							</view>
						</view>
						
					</view>
					<view class="flex mt-10">
						<text class="font-14 font-weight color-black">
							什么是资金费率？
						</text>
					</view>
					<view >
						<view>
							<text class="font-12 color-999">
								资金费率的主要用途是缩小永续合约价格与标的资产市场公允价格的价差。
							</text>
						</view>
						<view class="mt-10">
							<text class="font-12 color-999">
								资金费用每8个小时结算一次，若结算时资金费率为正，则由持多仓用户向空仓用户支付资金费用。若结算时的资金费率为负，
								则由持空仓用户向多仓用户支付资金费用。
							</text>
						</view>
						<view class="mt-10">
							<text class="font-12 color-999">
								资金费用 = 持仓价值 * 资金费率
							</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 结算盈亏说明 -->
		<uni-popup ref="jiesuan" type="bottom" style="z-index: 20000">
			<view class="authPanel">
				<view class="pd-15">
					<view class="center flex" style="align-items: center;">
						<view style="width: 95%;">
							<text class="font-14 font-weight color-black">已结算盈亏</text>
						</view>
						<view>
							<image @click="$refs.jiesuan.close()" src="/static/img/close2.png" style="width: 25px;height: 25px;" mode=""></image>
						</view>
					</view>
					<view class="mt-10">
						<view class="flex">
							<view style="width: 50%;">
								<text class="font-12 font-weight color-black">已结算盈亏</text>
							</view>
							<view style="width: 50%;text-align: right;">
								<text class="font-12 font-weight price_down">-30.0453 </text>
								<text class="font-12 font-weight color-black pl-5">USDT</text>
							</view>
						</view>
					</view>
					<view class="mt-10">
						<view class="flex">
							<view style="width: 50%;">
								<text class="font-12 color-999">手续费</text>
							</view>
							<view style="width: 50%;text-align: right;">
								<text class="font-12 font-weight color-black">-74.9840 </text>
								<text class="font-12 font-weight color-black pl-5">USDT</text>
							</view>
						</view>
					</view>
					<view class="mt-10">
						<view class="flex">
							<view style="width: 50%;">
								<text class="font-12 color-999">持仓结算</text>
							</view>
							<view style="width: 50%;text-align: right;">
								<text class="font-12 font-weight color-black">+44.9387 </text>
								<text class="font-12 font-weight color-black pl-5">USDT</text>
							</view>
						</view>
					</view>
					<view class="mt-10">
						<text class="font-12 color-999">
							已结算盈亏为已结算到用户余额中的收益，包含交易手续费，资金费用，平仓盈亏，结算收益费用相加。
						</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 提示框 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" cancelText="取消" confirmText="确认" title="确定要一键平仓吗？" :content="alertMsg" @confirm="dialogConfirm"
				@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		<uni-drawer ref="showSelect" mode="left" :showrAudus="true" :width="$device.windowWidth*0.8" style="z-index: 10002;">
			<scroll-view scroll-y="true" :style="{'height':$device.windowHeight+'px'}">
				<!-- #ifdef APP-PLUS -->
				<view class="status_bar bg-gray"></view>
				<!-- #endif -->
				<view class="pd-15">
					<view>
						<text class="font-14 color-black">模拟交易</text>
					</view>
					<view>
						<uni-search-bar @confirm="search" :cancelButton="false" v-model="searchValue" @input="input" placeholder="搜索"></uni-search-bar>
					</view>
					<view class="flex">
						<view class="badge_tab badge_tab_active">
							<text class="font-12">自选</text>
						</view>
						<view class="badge_tab">
							<text class="font-12 color-999">交易标的</text>
						</view>
					</view>
					<view class="mt-10">
						<view class="flex">
							<view class="flex" style="width: 40%;">
								<view class="flex m-l-5" style="align-items: center;" @click="switchSort(0)">
									<text class="font-12 font-weight color-999">名称</text>
									<image :src="sort[0]['active']" style="height: 22rpx;width: 16rpx;margin-left: 8rpx;" mode=""></image>
								</view>
							</view>
							<view class="flex center" style="width: 30%;">
								<view class="flex m-l-5" style="width: 100%;align-items: center;">
									<text class="font-12 font-weight color-999" style="width: 100%;text-align: right;">最新价</text>
									<image src="/static/img/z-nomal.png" style="height: 22rpx;width: 16rpx;margin-left: 8rpx;" mode=""></image>
								</view>
							</view>
							<view class="flex center" style="width: 30%;">
								<view class="flex m-l-5" style="width: 100%;align-items: center;">
									<text class="font-12 font-weight color-999" style="width: 100%;text-align: right;">涨跌幅</text>
									<image src="/static/img/z-nomal.png" style="height: 22rpx;width: 16rpx;margin-left: 8rpx;" mode=""></image>
								</view>
							</view>
						</view>
						<view class="flex plr-15" style="height: 40px;align-items: center;">
							<view class="" style="width:40%;">
								<view class="flex m-l-5" style="height: 20px;line-height: 20px;align-items: center;">
									<text class="font-14 font-weight color-black">BTC</text>
									<text class="font-12 color-999 m-l-5"> /USDT</text>
								</view>
							</view>
							<view class="" style="width: 30%;">
								<view class="flex" style="height: 20px;line-height: 20px;align-items: center;width: 100%;text-align: right;">
									<text class="font-12 font-weight price_up" style="width: 100%;text-align: right;">
										29,884.87
									</text>
								</view>
							</view>
							<view class="" style="width: 30%;">
								<view class="flex" style="height: 20px;line-height: 20px;align-items: center;float:right;text-align: right;">
									<view class="price_up" style="margin: auto;">
										<text class="font-12">+0.33%</text>
									</view>
								</view>
							</view>
						</view>
						<view class="flex plr-15" style="height: 40px;align-items: center;">
							<view class="" style="width:40%;">
								<view class="flex m-l-5" style="height: 20px;line-height: 20px;align-items: center;">
									<text class="font-14 font-weight color-black">ETH</text>
									<text class="font-12 color-999 m-l-5"> /USDT</text>
								</view>
							</view>
							<view class="" style="width: 30%;">
								<view class="flex" style="height: 20px;line-height: 20px;align-items: center;width: 100%;text-align: right;">
									<text class="font-12 font-weight price_up" style="width: 100%;text-align: right;">
										1932.21
									</text>
								</view>
							</view>
							<view class="" style="width: 30%;">
								<view class="flex" style="height: 20px;line-height: 20px;align-items: center;float:right;text-align: right;">
									<view class="price_up" style="margin: auto;">
										<text class="font-12">+0.12%</text>
									</view>
								</view>
							</view>
						</view>
						<view class="flex plr-15" style="height: 40px;align-items: center;">
							<view class="" style="width:40%;">
								<view class="flex m-l-5" style="height: 20px;line-height: 20px;align-items: center;">
									<text class="font-14 font-weight color-black">BCH</text>
									<text class="font-12 color-999 m-l-5"> /USDT</text>
								</view>
							</view>
							<view class="" style="width: 30%;">
								<view class="flex" style="height: 20px;line-height: 20px;align-items: center;width: 100%;text-align: right;">
									<text class="font-12 font-weight price_up" style="width: 100%;text-align: right;">
										234.21
									</text>
								</view>
							</view>
							<view class="" style="width: 30%;">
								<view class="flex" style="height: 20px;line-height: 20px;align-items: center;float:right;text-align: right;">
									<view class="price_up" style="margin: auto;">
										<text class="font-12">+0.21%</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>
<!-- 
 1.在页面的关闭或者隐藏的时候清除数据的实时加载，
 2.ws 接收到数据后，将数据写入本地缓存中，维护一个最新价格缓存和一个全量列表缓存
 3.在界面不需要渲染的时候，将收到的数据写入缓存，界面从缓存中读取数据
 4.应用启动的时候加载一次k线缓存数据，在ws
 
 最小的价格数据一次包可能会推送多个币种，单k线图详情界面订阅后只会推一种币种的数据
 最新价格数据是全局实时推送，要做好缓存的处理。
 -->
<script>
	import kdata from "@/common/contract/h5kdata.js";//k线的测试数据
	import testdata from "@/common/contract/newtest.js";//测试数据集
	import timeIndex from "@/common/timeIndex.js";
	var tindex = 0;
	var  recreate = 0;
	// #ifdef H5
	import HQChart from "@/uni_modules/jones-hqchart2/contract/umychart.uniapp.h5.js"

	HQChart.JSConsole.Chart.Log=()=>{ }
	HQChart.JSConsole.Complier.Log=()=>{ }

	HQChart.MARKET_SUFFIX_NAME.GetMarketStatus = function (symbol)
	{
	     return 2; //一直交易
	}
	
	import DefaultData from '@/common/contract/klineh5.js';
	//周期枚举
	var PERIOD_ID = DefaultData.PERIOD_ID;
	// #endif
	
	// #ifndef H5
	import {JSCommon} from "@/uni_modules/jones-hqchart2/contract/umychart.wechat.3.0.js"
	import {JSConsole} from '@/uni_modules/jones-hqchart2/contract/umychart.console.wechat.js'
	JSCommon.MARKET_SUFFIX_NAME.GetMarketStatus = function (symbol) { return 2; }
	
	import DefaultData from '@/common/contract/appOption.js';
	
	//周期枚举
	var PERIOD_ID = DefaultData.PERIOD_ID;
	
	var appKLine=
	{
		JSChart:false
	};
	
	//禁用日志
	JSConsole.Complier.Log=()=>{ };
	JSConsole.Chart.Log=()=>{ };
	
	// #endif
	
	import { Popover,Slider,Dialog } from 'vant';
	export default {
		components:{
			[Popover.name]:Popover,
			[Slider.name]:Slider,
			[Dialog.name]:Dialog
		},
		data() {
			return {
				timeIndex:0,
				time:timeIndex.time,
				OrderType:"",
				value:"0",
				showPopover:false,
				actions:[
					'市价下单',
					'限价下单',
					'条件单',
					'只做maker',
				],
				orderUnitValue:"",
				orderUnit:[
					"按数量开仓",
					"按仓位价值开仓",
					"按保证金开仓"
				],
				showUnitValue:"",
				showUnit:[
					"0.01",
					"0.1",
					"1",
					"取消"
				],
				active:0,
				sort:[
					{
						type:0,
						active:"/static/img/z-nomal.png",
						img:"/static/img/z-nomal.png",
						up:"/static/img/z-up-sms.png",
						down:"/static/img/z-down-sms.png"
					},
					{
						type:0,
						img:"/static/img/z-nomal.png",
						up:"/static/img/z-up-sms.png",
						down:"/static/img/z-down-sms.png"
					},
					{
						type:0,
						img:"/static/img/z-nomal.png",
						up:"/static/img/z-up-sms.png",
						down:"/static/img/z-down-sms.png"
					},
					{
						type:0,
						img:"/static/img/z-nomal.png",
						up:"/static/img/z-up-sms.png",
						down:"/static/img/z-down-sms.png"
					}
				],
				showOrder:true,
				ChartWidth:"",
				ChartHeight:"",
				// Symbol:'BTCUSDT.BIT',	
				Symbol:'600000.sh',
				KLine:
				{
					Option:DefaultData.GetKLineOption(),
					IsShow:false,
					Display:'none',
					Width:this.$device.windowWidth,
					Height:250,
					JSChart:false,
				},
				IsShow:false,
				update : false,
				PERIOD_ID:PERIOD_ID ? PERIOD_ID : {},
				showMenu:false,
				mutil:1,
				stopProfit:false,
				support:0,
				priceInput:false,
				priceNum:false,
				alertMsg:"一键平仓将会撤销合约下所有挂单并以市价委托方式平仓合约下所有相关键仓位。"
			}
		},
		onReady() {
			
		},
		onShow() {
		},
		onHide() {
		},
		watch:{
			timeIndex(index){
				this.reDrawKline(index)
			},
			IsShow(value){
				if(value){
					setTimeout(()=>{
						// #ifdef APP-PLUS
						this.ChangeKLinePeriod(PERIOD_ID.KLINE_MINUTE_ID);
						// #endif
						// #ifdef H5
						this.$nextTick(()=>
						{
							this.OnSize();
							this.CreateKLineChart_h5(); 
						});
						// #endif
					},500);
				}
			}
		},
		methods: {
			allPingcang(){
				this.$refs.alertDialog.open();
			},
			changeMutil(e){
				this.mutil = e.detail.value;
			},
			CreateKLineChart_h5(){
				//h5
				if (this.KLine.JSChart) return;
				console.log("创建");
				this.KLine.Option.Symbol = this.Symbol;
				this.KLine.Option.NetworkFilter = this.NetworkFilter;
				
				var resource = HQChart.JSChart.GetResource();
		
				resource.CloseLineWidth = 4;
				resource.CloseLineColor = 'rgb(0,114,245)';
				resource.CloseLineAreaColor=['rgba(122,175,154)','rgba(255,255,255)','rgba(255,255,255)'];
				resource.UpBarColor = 'rgb(255,92,81)';
				resource.DownBarColor = 'rgb(53,173,122)';
				
				let chart = HQChart.JSChart.Init(this.$refs.kline);
				chart.SetOption(this.KLine.Option);
				this.KLine.JSChart = chart;
			},
			OnSize()
			{
				//h5
				var chartHeight = this.ChartHeight;
				var chartWidth = this.ChartWidth;
	 
				var kline=this.$refs.kline;
				kline.style.width=chartWidth+'px';
				kline.style.height=chartHeight+'px';
				if (this.KLine.JSChart) this.KLine.JSChart.OnSize();
			},
			CreateKLineChart:function()
			{
				if (appKLine.JSChart) return;
				
				let element = new JSCommon.JSCanvasElement();
				// #ifdef APP-PLUS
				element.IsUniApp=true;	//canvas需要指定下 是uniapp的app
				// #endif
				element.ID = 'klineapp';
				element.Height = this.KLine.Height;  //高度宽度需要手动绑定!!
				element.Width = this.KLine.Width;
				
				var resource = JSCommon.JSChart.GetResource();
						
				resource.CloseLineWidth = 4;
				resource.CloseLineColor = 'rgb(0,114,245,1)';
				resource.CloseLineAreaColor=['rgba(122,175,154,1)','rgba(255,255,255,1)','rgba(255,255,255,1)'];
				resource.UpBarColor = 'rgb(255,92,81)';
				resource.DownBarColor = 'rgb(53,173,122)';
				
				appKLine.JSChart = JSCommon.JSChart.Init(element);
				
				
				this.KLine.Option.NetworkFilter = this.NetworkFilter;
				this.KLine.Option.Symbol = this.Symbol;
				this.KLine.Option.IsFullDraw = false; 	//每次手势移动全屏重绘
				appKLine.JSChart.SetOption(this.KLine.Option);
				console.log("app create");
			},
			
			//K线周期切换
			ChangeKLinePeriod:function(period)
			{
				if (!appKLine.JSChart)    //不存在创建
				{
					console.log('create');
					this.KLine.Option.Period=period;
					this.CreateKLineChart();
				}
				else
				{
					console.log('updatecreate');
					appKLine.JSChart.ChangeKLineDrawType(period);
				}
			},
			
			NetworkFilter:function(data, callback)
			{
				//console.log('[HQChart:NetworkFilter] data', data.Name);
				data.PreventDefault=true;
				
				switch(data.Name){
					case 'KLineChartContainer::ReqeustHistoryMinuteData':
						var self = this;
						var symbol = data.Request.Data.symbol;
						self.RecvHistoryMinuteData(kdata,callback); 
						//callback(kdata['data']);
						break;
					case 'KLineChartContainer::RequestMinuteRealtimeData':
						this.RequestMinuteRealtimeData(data,callback);
						break;
					case 'KLineChartContainer::RequestHistoryData':
						this.RequestMinuteRealtimeData(data,callback);
						break;
				}
				
			},
			RequestMinuteRealtimeData(data,callback){
				//更新当前最新数据或者增加
				var self=this;
				var symbol=data.Request.Data.symbol;
				
				var data = testdata;
				var hqChartData={code:0, data:kdata.data, ver:2.0 };
				hqChartData.symbol='BTCUSDT.BIT';
				hqChartData.name='BTCUSDT';
				
				//从本地缓存读取数据，读取到数据，注意币种的切换和时间状态的切换
				
				var yClose=0;
				var i = tindex;
				var item=data.data[i];
				var timestamp = item.id;
				var dateTime = new Date();
				dateTime.setTime(timestamp * 1000);
				
				var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
				var time=dateTime.getHours()*100+dateTime.getMinutes();
				var newItem=[date,yClose, item.open, item.high, item.low, item.close, item.vol, item.amount, time];
				
				yClose=item.close;
				hqChartData.data.push(newItem);
				tindex+=1;
				callback(hqChartData);

			},
			RecvHistoryMinuteData(kdata,callback){
				//初始化历史数据
				console.log(kdata);
				var hqChartData={code:0, data:[],version:'2.0'};
				
				// #ifdef H5
				hqChartData.symbol='BTCUSDT.BIT';
				hqChartData.name='BTCUSDT';
				console.log(kdata.data.length);
				var yClose=8150;
				for(var i=kdata.data.length-1; i>=0; --i)
				{
					var item=kdata.data[i];
					var timestamp = item.id;
					var dateTime = new Date();
					dateTime.setTime(timestamp * 1000);
				
					var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
					var time=dateTime.getHours()*100+dateTime.getMinutes();
					var newItem=[date,yClose, item.open, item.high, item.low, item.close, item.vol, item.amount, time];
				
					yClose=item.close;
					hqChartData.data.push(newItem);
				}
				// #endif
				
				// #ifdef APP-PLUS
				//不是这个数据的问题，是插件程序的问题
				hqChartData.symbol='600000.sh';
				hqChartData.name='浦发银行';
				console.log(kdata.data.length);
				var yClose=8150;
				for(var i=kdata.data.length-1; i>=0; --i)
				{
					var item=kdata.data[i];
					var timestamp = item.id;
					var dateTime = new Date();
					dateTime.setTime(timestamp * 1000);
				
					var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
					var time=dateTime.getHours()*100+dateTime.getMinutes();
					var newItem=[date,yClose, item.open, item.high, item.low, item.close, item.vol, item.amount, time];
				
					yClose=item.close;
					hqChartData.data.push(newItem);
				}
				hqChartData.count = hqChartData.data.length;
				// #endif
				callback(hqChartData);
			},
			//KLine事件
			KLineTouchStart: function (event) 
			{
			  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchStart(event);
			},
			
			KLineTouchMove: function (event) 
			{
			  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchMove(event);
			},
			
			KLineTouchEnd: function (event) 
			{
			  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchEnd(event);
			},
			sliderChange(e){
				console.log(e);
			},
			selectType(e){
				console.log(e);
			},
			onSelect(e){
				
			},
			reDrawKline(e){
				//仅仅切换绘制类型，面积图或者实心图
				// #ifdef H5
				this.KLine.JSChart.ChangeKLineDrawType(e > 0 ? 0 : 4);
				this.KLine.Option = DefaultData.GetKLineOption(e > 0 ? 0 : 4)
				// #endif
				// #ifdef APP-PLUS
				console.log('switch');
				this.ChangeKLinePeriod(e > 0 ? 0 : 4);
				this.KLine.Option = DefaultData.GetKLineOption(e > 0 ? 0 : 4)
				// #endif
			},
			stopUpdate(){
				console.log("清空");
				// #ifdef H5
				this.KLine.JSChart.StopAutoUpdate();
				this.KLine.JSChart.ChartDestroy();
				while (document.getElementById('kline').hasChildNodes()) 
				{
					document.getElementById('kline').removeChild(document.getElementById('kline').lastChild);
				}
				this.KLine.JSChart = false;
				// #endif
				// #ifdef APP-PLUS
				appKLine.JSChart.StopAutoUpdate();
				appKLine.JSChart.ChartDestroy();
				appKLine.JSChart = false;
				// #endif
				this.IsShow = false;
			},
			startUpdate(){
				// #ifdef APP-PLUS
				appKLine.JSChart.JSChartContainer.IsAutoUpdate = true;
				appKLine.JSChart.JSChartContainer.ChangeSymbol(this.KLine.symbol)
				// #endif
				
			},
			switchSort(index){
				console.log(index);
				if(this.sort[index]['type'] == 0){
					this.sort[index]['type'] = 1;
					this.sort[index]['active'] = this.sort[index]['down']; 
					return;
				}
				if(this.sort[index]['type'] == 1){
					this.sort[index]['type'] = 2;
					this.sort[index]['active'] = this.sort[index]['up']; 
					return;
				}
				if(this.sort[index]['type'] == 2){
					this.sort[index]['type'] = 0;
					this.sort[index]['active'] = this.sort[index]['img']; 
					return;
				}
			},
			openSupport(index){
				this.support = index;
				this.$refs.showSupport.open();
			}
		}
	}
</script>

<style>
	@import './contruct.css';
</style>
