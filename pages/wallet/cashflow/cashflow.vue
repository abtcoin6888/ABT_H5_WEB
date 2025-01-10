<template>
	<view class="cashflow" :data-theme="userTheme" :style="{'height': windowHeight + 'px'}">
		<fui-nav-bar @init="navInit"
                     zIndex="9" 
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     isFixed isOccupy
                     :title="$t('financing.t61')"
			@leftClick="$mroute.back()">
			<fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
		</fui-nav-bar>
		<view class="cash-container">
			<view class="tab-box" id="tabBox">
				<fui-tabs isSticky zIndex="9" :scale="1" :tabs="tabOption" :current="tab" :top="0" :short="false" scroll alignLeft
					padding="0" height="66" fontWeight="500" size="30" selectedSize="30" color="var(--content-tertiary)"
					selectedColor="var(--content-primary)" sliderBackground="var(--content-primary)" background="var(--background-primary)"
					@change="tabChange"></fui-tabs>
				<view class="selct-box">
					<view class="tag" @click="show = true">
						<text>{{ timer == '' ? $t('financing.t67') : timer }}</text>
						<fui-icon name="turningdown" color="#909399" size="28"></fui-icon>
					</view>
					<view class="tag" @click="stateShow = true">
						<text>{{ stateVal == '' ? $t('financing.t69') : stateVal }}</text>
						<fui-icon name="turningdown" color="#909399" size="28"></fui-icon>
					</view>
					<view class="tag" @click="coinTypeShow = true">
						<text>{{ coinVal == '' ? $t('financing.t68') : coinVal }}</text>
						<fui-icon name="turningdown" color="#909399" size="28"></fui-icon>
					</view>
				</view>
			</view>
			<view class="main-box" :style="{'height': swiperHeight + 'px'}">
				<swiper class="swiper" easing-function="linear" :current="current" :duration="200"
					:style="{'height': swiperHeight + 'px'}" @change="swiperChange">
					<swiper-item v-for="(item,index) in tabOption.length">
						<scroll-view scroll-y class="swiper-scroll" :style="{'height': swiperHeight + 'px'}" @scrolltolower="getCpitalFlow()">
							<view class="cell" v-if="dataList['list'+(index+1)].length"
								v-for="(item,index) in dataList['list'+(index+1)]">
								<view class="row">
									<text class="font-14 color-black font-weight">{{types[item.type]}}</text>
									<text class="font-14 color-black font-weight">{{item.amount}} {{item.currency ? item.currency.symbol:'USDT'}}</text>
								</view>
								<view class="row">
									<text class="font-12 color-gray">{{item.created_at}}</text>
									<text class="font-12 color-gray">{{$t('financing.t99')}} {{item.after}}</text>
								</view>
							</view>
							<!--              -->
							<view class="not-data"  v-else>
                                <fui-empty width="200" height="200" size="26" color="var(--content-tertiary)"
                                           src="/static/newImage/not-order.png" :title="$t('common.no_records')"></fui-empty>
                            </view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 时间 -->
		<fui-date-picker :theme="userTheme" range :start="startText" :title="$t('recod.t4')" titleSize="32" radius
			:end="endText" :show="show" type="3" @change="change" @cancel="cancel" :confirmText="$t('确定')" :cancelText="$t('取消')"
			:year_t="$t('年')" :month_t="$t('月')" :day_t="$t('日')">
		</fui-date-picker>
		<!-- 状态 -->
		<fui-bottom-popup background="var(--background-primary)" radius="30" :show="stateShow" @close="closePopup">
			<view class="popup-wrap">
				<view class="title">
					<text class="font-16 color-black font-weight">{{$t('recod.t2')}}</text>
                    <view class="close">
                        <fui-icon @click="closePopup" color="var(--content-primary)" name="close" size="44"></fui-icon>
                    </view>
				</view>
				<view class="list">
					<view class="cell" :class="stateIndex == index ? 'cell-active' : ''"
						v-for="(item,index) in shateOption" :key="index" @click="stateChange(item,index)">
						<text v-if="item">{{ item.label }}</text>
					</view>
				</view>
			</view>
		</fui-bottom-popup>
		<!-- 币种 -->
		<fui-bottom-popup background="var(--background-primary)" radius="30" :show="coinTypeShow" @close="closePopup">
			<view class="popup-wrap" type="coinList">
				<view class="title">
					<text class="font-16 color-black font-weight">{{$t('recod.t3')}}</text>
                    <view class="close">
                        <fui-icon @click="closePopup" color="var(--content-primary)" name="close" size="44"></fui-icon>
                    </view>
				</view>
				<view class="search">
					<fui-icon name="search" size="32" color="var(--content-tertiary)"></fui-icon>
					<input type="text" :placeholder="$t('common.area.search')">
				</view>
				<scroll-view scroll-y :show-scrollbar="false" class="list">
					<view class="cell" :class="coinIndex == index ? 'cell-active' : ''" v-for="(item,index) in coinList"
						:key="index" @click="coinSelect(item,index)">
						<text v-if="item">{{ item.symbol }}</text>
					</view>
				</scroll-view>
			</view>
		</fui-bottom-popup>
	</view>
</template>

<script>
	import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
	import fuiTabs from "@/components/firstui/fui-tabs/fui-tabs.vue"
	import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue"
	import fuiDatePicker from "@/components/firstui/fui-date-picker/fui-date-picker.vue"
	import user from '../../../common/api/user.js'
	import common from '../../../common/api/common.js'
    import {mapGetters} from 'vuex';

	export default {
		components: {
			fuiNavBar,
			fuiTabs,
			fuiEmpty,
			fuiDatePicker
		},
		data() {
			return {
				tab: 0,
				tabOption: [],
				tabBoxHeight: 0,
				navHeight: 0,
				containerHeight: 0,
				swiperHeight: 0,
				current: 0,
				windowHeight: uni.getSystemInfoSync().windowHeight,
				startText: "",
				endText: "",
				show: false,
				timer: "",
				stateShow: false,
				coinTypeShow: false,
				stateVal: "",
				shateOption: [],
				stateIndex: 0,
				coinVal: "",
				coinIndex: 0,
				coinList: [],
				param: {
					account: 1,
					start_at: '',
					end_at: '',
					currency_id: 0,
					type: 0,
					page: 1
				},
				page: [1, 1, 1, 1, 1],
				types: {},
				dataList: {
					'list1': [],
					'list2': [],
					'list3': [],
					'list4': [],
					'list5': [],
				}
			}
		},
		onReady() {
			this.setMenu();
			this.getTabInfo();
		},
		onShow() {
			this.setMenu();
			this.getTabInfo();
		},
		mounted() {
			this.getCurrencyList()
				this.getCpitalFlow()

		},
        computed: {
            ...mapGetters(['userTheme'])
        },
		methods: {
			navInit(e) {
				this.navHeight = e.height + e.statusBarHeight;
			},
			setMenu() {
				this.tabOption = [
					this.$t('financing.t62'),
					this.$t('financing.t63'),
					this.$t('financing.t64'),
					this.$t('financing.t65'),
					this.$t('financing.t66')
				];
				this.startText = this.$t('开始时间')
				this.endText = this.$t('结束时间')
			},
			getTabInfo() {
				setTimeout(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('#tabBox').boundingClientRect(data => {
						this.tabBoxHeight = data.height;
					}).exec();
					this.swiperHeight = this.windowHeight - this.tabBoxHeight - this.navHeight;
				}, 100)
			},
			tabChange(e) {
				this.tab = e.index;
				this.current = e.index;
				this.param.account = e.index + 1
				this.resetList()
			},
			swiperChange(e) {
				this.tab = e.detail.current;
			},
			change(e) {
				this.show = false
				this.timer = e.startDate.result + "~" + e.endDate.result
				this.param.start_at = e.startDate.result
				this.param.end_at = e.endDate.result
				this.resetList()
			},
			cancel() {
				this.show = false
			},
			stateChange(item, index) {
				this.stateIndex = index;
				this.stateVal = item.label;
				this.param.type = item.value
				this.resetList()
				this.closePopup();
			},
			coinSelect(item, index) {
				this.coinIndex = index;
				this.coinVal = item.symbol;
				this.param.currency_id = item.id
				this.resetList()
				this.closePopup();
			},
			closePopup() {
				this.stateShow = false;
				this.coinTypeShow = false;
			},
			async getCurrencyList() {
				let res = await common.getRechargeCurrency()
				this.coinList = [{
					id: 0,
					symbol: this.$t('financing.t68')
				}]
				this.coinList = this.coinList.concat(res.data.list)
			},
			async getCpitalFlowType() {
				let res = await user.getCpitalFlowType()
			},
			async getCpitalFlow() {
				this.param.page = this.page[this.current]
				let res = await user.getCpitalFlow(this.param)
				this.shateOption = [{
					label: this.$t('financing.t69'),
					value: 0
				}]
				this.shateOption = this.shateOption.concat(res.data.types)
				res.data.types.map((v, i) => {
					this.types[v.value] = v.label
				})
				let k = 'list' + (this.current + 1);
				this.dataList[k] = this.dataList[k].concat(res.data.list)
				this.page[this.current]++
			},
			resetList() {
				this.dataList['list' + (this.current + 1)] = []
				this.page[this.current] = 1

				this.getCpitalFlow()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./cashflow.scss";
</style>

<style scoped>
	/deep/ .fui-tabs__text {
		text-transform: capitalize;
	}

	/deep/ uni-picker-view-column:nth-of-type(1) .uni-picker-view-indicator {
		border-radius: 10rpx 0 0 10rpx;
	}

	/deep/ uni-picker-view-column:nth-of-type(3) .uni-picker-view-indicator {
		border-radius: 0 10rpx 10rpx 0;
	}

	/deep/ .uni-picker-view-indicator {
		background-color: rgba(144, 147, 153, .2);
	}
</style>