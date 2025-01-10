import fuiButton from "@/components/firstui/fui-button/fui-button.vue"
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue"
import fuiLandscape from "@/components/firstui/fui-landscape/fui-landscape.vue"
import fuiToast from "@/components/firstui/fui-toast/fui-toast.vue"

import { mapState, mapGetters, mapMutations } from 'vuex';

import commonApi from '@/common/api/common.js';

export default {
    components: {
        fuiButton,
        fuiNavBar,
        fuiLandscape,
        fuiToast
    },
    data() {
        return {
			btnActive:0,
            navHeight: "",
            windowHeight: "",
            scrollHeight: "",
            checkinPop: false,
            checkGroup: [{
                text: this.$t('welfare.st4'),
                checked: false,
                rewards: "0.2"
            }, {
                text: this.$t('welfare.st5'),
                checked: false,
                rewards: "0.2"
            }, {
                text: this.$t('welfare.st6'),
                checked: false,
                rewards: "0.2"
            }, {
                text: this.$t('welfare.st7'),
                checked: false,
                rewards: "0.2"
            }, {
                text: this.$t('welfare.st8'),
                checked: false,
                rewards: "1"
            }],
            isChecked: false,
			taskList:[],
			qdList:[],
			todaySign:false,
			day:0,
			avaAmount:'--'
        }
    },
    onReady() {

    },
    onShow() {
		this.gettask();
		this.getqdlist();
		this.$nextTick(()=>{
			this.getAvaAmount();
		});
    },
	computed: {
		...mapState(['userinfo']),
	    ...mapGetters(['isLogin', 'userAccount', 'userNickname', 'userTheme'])
	},
	watch:{
		btnActive(v){
			this.gettask();
		}
	},
    methods: {
		getReward(item){
			uni.showLoading();
			commonApi.getReward(item.task_id,item.id).then(res=>{
				uni.hideLoading();
				if(res.code === 200){
					this.showToast(this.$t('welfare.suc'),1500);
					this.getAvaAmount();
					this.gettask();
				}else{
					this.showToast(res.message,1500);
				}
			}).catch((e)=>{
				uni.hideLoading();
				this.showToast(res.message,1500);
			});
		},
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
		getAvaAmount(){
			commonApi.getAvaAmount().then(res=>{
				this.avaAmount = res.data.amount;
			});
		},
		getqdlist(){
			commonApi.getQdList().then(res=>{
				this.qdList = res.data.list;
				if(res.data.tsign){
					this.todaySign = true;
				}
				//const date = new Date();
				// if(!res.data.sign){
				// 	this.todaySign = true;
				// }else{
				// 	var tdate = date.getFullYear()+"-"+((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1):'0'+(date.getMonth() + 1))+"-"+(date.getDate() >= 10 ? date.getDate():'0'+date.getDate());
				// 	if(Date.parse(tdate) > Date.parse(res.data.sign)){
				// 		this.todaySign = true;
				// 	}
				// }
				
				this.day = res.data.day;
			});
		},
		gettask(){
			var task = uni.getStorageSync('task_list');
			if(typeof task == 'object' && task != ''){
				this.taskList = task;
			}
			commonApi.getNewUserTaskList(this.btnActive).then(res=>{
				this.taskList = res.data.list;
				uni.setStorageSync('task_list',res.data.list);
			});
			
		},
		navtoTask(item){
			if(item.path == "/pages/trade/trade" || item.path == "/pages/newContract/newContract"){
				uni.switchTab({
					url:item.path
				});
			}else{
				uni.navigateTo({
					url:item.path
				})
			}
		},
        navInit(e) {
            this.getWindowHeight();
            this.navHeight = e.height + e.statusBarHeight;
            this.scrollHeight = this.windowHeight - this.navHeight;
        },
        getWindowHeight() {
            this.windowHeight = uni.getSystemInfoSync().windowHeight;
        },
        showTips(index) {
            if (index == 0) {
                this.showToast(this.$t('welfare.txt32') + ' 150.00 USDT' + this.$t('welfare.txt33'), 1000)
            }

            if (index == 1) {
                this.showToast(this.$t('welfare.txt32') + '--USDT' + this.$t('welfare.txt33'), 1000)
            }
        },
        checkIn() {
            if (this.isLogin) {
				uni.showLoading();
				commonApi.userSign(this.day).then(res=>{
					uni.hideLoading();
					this.closePopup();
					if(res.code == 200){
						this.todaySign = false;
						this.showToast(this.$t('welfare.st9'), 1500);
						this.getqdlist();
						this.getAvaAmount();
					}else{
						this.showToast(res.message, 1500);
					}
				});
                // this.isChecked = true;
                // this.checkGroup[0].checked = true;
                // this.showToast(this.$t('welfare.st9') + this.checkGroup[0].rewards + 'USDT', 1000);
                // this.closePopup();
            } else {
                this.showToast(this.$t('welfare.st11'), 1000);
            }
        },
        showToast(type, time) {
            let options = {}
            //提示信息
            options.text = type;
            options.duration = time;
            this.$refs.toast.show(options)
        },
        closePopup() {
			if(this.isLogin){
				this.checkinPop = false;
			}
        }
    }
}