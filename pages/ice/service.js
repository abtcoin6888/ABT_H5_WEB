import level from "./level"
import {mapState, mapGetters, mapMutations} from 'vuex';
import commonApi from '@/common/api/common.js';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";

export default {
	components: {fuiNavBar},
    data() {
        return {
            bannerCurrent: 0,
            tabIndex: 0,
            windowHeight: "",
            levelOption: [],
            miningStart: false,
            menuShow: false,
            dropShow: false,
			hours:0,
			active:{currency:{symbol:'--'}},
			info:{},
			teamList:[],
			time:0,
			isColon:false,
			start:false,
			content:""
        }
    },
	onReady(){
		this.windowHeight = uni.getSystemInfoSync().windowHeight;
		this.levelOption = level['options'];
		
		this.hours = (new Date).getHours();
		var lang = uni.getStorageSync('lang');
		this.isColon = lang === 'zh' ? false : true;
	},
	onLoad(){
		
	},
	onShow(){
		this.getActive();
		this.getInfo();
	},
    computed: {
        ...mapState(['config', 'userinfo']),
        ...mapGetters(['isLogin', 'userAccount', 'userNickname', 'userTheme'])
    },
	watch:{
		tabIndex(v){
			if(v == 0){
				this.teamList = [];
				this.getteamList(1);
			}else{
				this.teamList = [];
				this.getteamList(2);
			}
		}
	},
    methods: {
		end(){
			
		},
		clickMargin(){
			if(!this.start){
				return false;
			}
			this.startMin(true);
		},
		startMin(flag = false){
			uni.showLoading();
			commonApi.startMin(flag).then(res=>{
				uni.hideLoading();
				if(res.code == 200){
					if(Math.abs(res.data.date) === 0){
						this.time = 0;
						this.miningStart = false;
					}else{
						this.time = Math.abs(res.data.date);
						this.miningStart = true;
					}
					
				}else{
					this.content = res.message;
					this.$refs.alert.open();
				}
			});
		},
		getTime(dates){
			let startDate = new Date(dates);
			
			// 获取24小时后的时间
			let endDate = new Date(startDate);
			endDate.setHours(endDate.getHours() + 24);
			
			// 获取当前时间
			let currentDate = new Date();
			// 如果当前时间已经超过了结束时间，则返回0
			console.log(currentDate);
			console.log(endDate);
			if (currentDate >= endDate) {
			    this.time = 0;
				this.miningStart = false;
			} else {
			    // 计算当前时间和结束时间之间的差值，转换为秒
			    let differenceInSeconds = (endDate - currentDate) / 1000;
				this.miningStart = true;
			    this.time = differenceInSeconds;
				console.log(this.time);
			}
			
		},
		getteamList(t){
			commonApi.mingTeamList(t).then(res=>{
				this.teamList = res.data.list;
			});
		},
		getInfo(){
			commonApi.mingInfo().then(res=>{
				this.info = res.data;
			});
		},
		getActive(){
			commonApi.mingActive().then(res=>{
				this.active = res.data.mining;
				this.start = (new Date(Date.parse(this.active['start_at']))) <= Date.now();
				if(!this.start){
					let currentDate = new Date();
					let targetDateString = this.active['start_at'];
					// 解析给定日期字符串为 Date 对象
					let targetDate = new Date(targetDateString);
					// 计算当前时间到指定日期的毫秒数
					let differenceInMilliseconds = targetDate - currentDate;
					// 转换毫秒数为秒数
					this.time = Math.floor(differenceInMilliseconds / 1000);
					
				}else{
					this.getteamList(1);
					this.startMin();
				}
				
			});
		},
        menuTap() {
            this.menuShow = !this.menuShow;
            console.log(this.menuShow)
        }
    }
}