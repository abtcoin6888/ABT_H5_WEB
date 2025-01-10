<template>
    <view class="rewards bg-dark" :data-theme="userTheme">
        <fui-nav-bar :title="$t('welfare.txt1')"
                     background="var(--white)"
                     color="var(--black)"
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft" size="56" color="var(--black)"></fui-icon>
        </fui-nav-bar>
        <scroll-view scroll-y class="scroll-warp bg-dark" :style="{'height': scrollHeight + 'px'}">
            <view class="card bg-linear-dark">
                <view class="cell">
                    <text class="font-12 color-white font-weight">{{ $t('welfare.txt4') }}</text>
                </view>
                <view class="tag-cell bg-golden cell" v-if="userinfo.authStatus != 1">
                    <view class="left">
                        <fui-icon name="info-fill" size="30" :color="'var(--color-text-golden)'"></fui-icon>
                        <text class="font-11 color-golden ml-5">{{ $t('welfare.txt13') }}</text>
                    </view>
                    <view class="right" @click="$mroute.baseauth()">
                        <text class="font-11 color-white">{{ $t('welfare.btn3') }}</text>
                        <fui-icon name="arrowright" size="38" :color="'var(--white)'"></fui-icon>
                    </view>
                </view>
				<view class="tag-cell bg-golden cell">
				    <view class="left">
				        <fui-icon name="info-fill" size="30" :color="'var(--color-text-golden)'"></fui-icon>
				        <text class="font-11 color-golden ml-5">{{ $t('c.first.trade') }}</text>
				    </view>
				    <view class="right" @click="$mroute.switchContract()">
				        <text class="font-11 color-white">{{ $t('c.first.go') }}</text>
				        <fui-icon name="arrowright" size="38" :color="'var(--white)'"></fui-icon>
				    </view>
				</view>
                <view class="cell">
                    <view class="left">
                        <view class="_item">
                            <text class="mr-5 linear-golden font-16 font-weight">{{ $util.thousandSeparator(avaAmount,2) }}</text>
                            <text class="mr-5 font-12 color-white">USDT</text>
                        </view>
                        <view class="_item mt-5">
                            <text class="mr-5 font-11 color-gray">{{ $t('welfare.txt32') }} 150.00 USDT
                                {{ $t('welfare.txt33') }}
                            </text>
                        </view>
                    </view>
                    <view class="right">
						<!--  -->
                        <button :disabled="parseFloat(avaAmount)<150 ? true :false"  @click="withdraw" class="button bg-linear-golden">
                            <text class="font-13 font-weight" :class="parseFloat(avaAmount)<150 ? 'color-gray' :'color-balck'">
                                {{ $t('welfare.txt34') }}
                            </text>
                        </button>
                    </view>
                </view>
                
            </view>
            <view class="rewards-list">
                <view class="rewards-tab">
                    <fui-tabs size="28"
                              background="#121417"
                              color="var(--color-text-dark-gray)"
                              selectedColor="#ffffff"
                              :isSlider="false" height="66"
                              scale="1" padding="0" :tabs="tabOption" scroll alignLeft @change="tabChange"></fui-tabs>
                </view>
                <view class="list-con" v-if="tabCurrent == 0">
                    <view class="not-date" v-if="completed.length == 0">
                        <fui-empty descrSize="26"
                                   descrColor="var(--color-text-dark-gray)"
                                   width="200"
                                   height="200"
                                   src="/static/newImage/not-order.png"
                                   :descr="$t('common.no_records')">
                        </fui-empty>
                    </view>
                    <view class="cell" v-for="(item,index) in completed" :key="'c'+item.id">
                        <view class="_col">
                            <text class="font-12 color-gray font-weight">{{ $t('welfare.txt37') }}</text>
                            <text class="font-12 color-white font-weight mt-5">{{item.created_at}}</text>
                        </view>
                        <view class="_col">
                            <text class="font-12 color-gray font-weight">{{ $t('welfare.txt38') }}</text>
                            <text class="font-12 color-white font-weight mt-5">{{item.title}}</text>
                        </view>
                        <view class="_col">
                            <text class="font-12 color-gray font-weight">{{ $t('welfare.txt9') }}</text>
                            <text class="font-12 color-white font-weight mt-5">{{item.amount}} USDT</text>
                        </view>
                        <view class="_col">
                            <text class="font-12 color-gray font-weight">{{ $t('welfare.txt40') }}</text>
                            <view class="type mt-5">
                                <text class="point bg-green"></text>
                                <text class="font-12 color-white font-weight">{{ $t('welfare.txt43') }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="list-con" v-if="tabCurrent == 1">
					<view class="not-date" v-if="withlist.length == 0">
                        <fui-empty descrSize="26"
                                   descrColor="var(--color-text-dark-gray)"
                                   width="200"
                                   height="200"
                                   src="/static/newImage/not-order.png"
                                   :descr="$t('common.no_records')">
                        </fui-empty>
					</view>
                    <view class="cell" v-if="withlist.length > 0">
						<template v-for="(item,index) in withlist" :key="'w'+item.id">
							<view class="_col">
								<text class="font-12 color-gray font-weight">{{ $t('welfare.txt37') }}</text>
								<text class="font-12 color-white font-weight mt-5">{{item.created_at}}</text>
							</view>
							<view class="_col">
								<text class="font-12 color-gray font-weight">{{ $t('welfare.txt38') }}</text>
								<text class="font-12 color-white font-weight mt-5">{{ $t('welfare.txt34') }}</text>
							</view>
							<view class="_col">
								<text class="font-12 color-gray font-weight">{{ $t('welfare.txt9') }}</text>
								<text class="font-12 color-white font-weight mt-5">{{$util.thousandSeparator(item.amount,2)}}</text>
							</view>
							<view class="_col">
								<text class="font-12 color-gray font-weight">{{ $t('welfare.txt40') }}</text>
								<view class="type mt-5">
									<text class="point bg-green"></text>
									<text class="font-12 color-white font-weight">{{ $t('welfare.txt43') }}</text>
								</view>
							</view>
						</template>
                        
                    </view>
                </view>
            </view>
        </scroll-view>
		<fui-toast size="26" :background="'var(--mask-bakground-bg)'" ref="toast"></fui-toast>
    </view>
</template>

<script>
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";
import fuiTabs from "@/components/firstui/fui-tabs/fui-tabs.vue"
import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"

import commonApi from '@/common/api/common.js';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    components: {fuiNavBar,fuiTabs,fuiToast},
    data() {
        return {
            navHeight: "",
            windowHeight: "",
            scrollHeight: "",
            maxU: 150.00 ,
            maxB: 10,
            uNum: 0.6,
            bibNum: 8,
            tabOption:[this.$t('welfare.txt35'),this.$t('welfare.txt36')],
            tabCurrent: 0,
			avaAmount:'--',
			completed:[],
			withlist:[]
        }
    },
	onShow() {
		this.getAvaAmount();
		this.getList();
	},
	computed: {
		...mapState(['userinfo']),
	    ...mapGetters(['isLogin', 'userAccount', 'userNickname', 'userTheme'])
	},
    methods: {
		withdraw(){
			if(parseFloat(this.avaAmount) <= 150){
				this.showToast(this.$t('welfare.txt32') + ' 150.00 USDT' + this.$t('welfare.txt33'), 1500)
				return false;
			}
			uni.showLoading();
			commonApi.activeWithdraw().then(res=>{
				uni.hideLoading();
				
				if(res.code == 200){
					this.showToast(this.$t('welfare.suc'),1500);
					this.getAvaAmount();
				}else{
					this.showToast(res.message, 1500)
				}
			}).catch((e)=>{
				uni.hideLoading();
				this.showToast(res.message, 1500)
			})
		},
		getList(){
			commonApi.getCompletedList().then(res=>{
				this.completed = res.data.list;
				this.withlist = res.data.with;
			});
		},
		getAvaAmount(){
			commonApi.getAvaAmount().then(res=>{
				this.avaAmount = res.data.amount;
			});
		},
		showToast(type, time) {
		    let options = {}
		    //提示信息
		    options.text = type;
		    options.duration = time;
		    this.$refs.toast.show(options)
		},
        navInit(e) {
            console.log(e);
            this.getWindowHeight();
            this.navHeight = e.height + e.statusBarHeight;
            this.scrollHeight = this.windowHeight - this.navHeight;
        },
        getWindowHeight() {
            this.windowHeight = uni.getSystemInfoSync().windowHeight;
        },
        tabChange(e){
            this.tabCurrent = e.index;
        },
        justTT() {
            console.log("79878979")
        }
    }
}
</script>

<style lang="scss" scoped>
@import "rewards";
</style>

<style scoped>
page {
    background-color: #121417 !important;
}

/deep/uni-button[disabled]:not([type]) {
    background: #2d3039 !important;
}

/deep/.fui-tabs__item {
    padding: 0 50rpx 0 0 !important;
}
</style>