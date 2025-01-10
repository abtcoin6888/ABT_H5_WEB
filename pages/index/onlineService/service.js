import { mapState, mapGetters, mapMutations } from 'vuex';
import Api from '@/common/api/serviceapi.js';

import fuiLoadmore from "@/components/firstui/fui-loadmore/fui-loadmore.vue"

var lang ;
export default {
	components:{
		fuiLoadmore
	},
	data() {
		return {
			navHeight: '',
			bodyHeight: '',
			popupShow: false,
			voiceInput: false,
			emoteShow: false,
			inputVal: '',
			selectEmote: '',
			focusState: false,
			service:false,
			content:""
		}
	},
	computed: {
		...mapState(['config', 'userinfo']),
		...mapGetters(['isLogin', 'userAccount', 'userNickname', 'userTheme'])
	},
	onReady(){
		uni.$on('connect',()=>{
			this.checkConnect();
		});
	},
	onShow(){
		this.checkConnect();
		lang = uni.getStorageSync('lang');
	},
	methods: {
		sendMsg(){
			if(this.inputVal === ''){
				return false;
			}
			
			uni.showLoading();
			const form = {
				type:"text",
				content:this.inputVal,
				sid : this.service.id,
				lang : lang
			};
			
		},
		navInit(e) {
			const windowHeight = uni.getSystemInfoSync().windowHeight;
			this.navHeight = e.height + e.statusBarHeight;
			this.bodyHeight = windowHeight - this.navHeight;
		},
		checkConnect(){
			uni.showLoading({
				title:'链接中'
			});
			try{
				getApp().globalData.socket.send({data:'ping'});
				Api.getContact().then(res=>{
					uni.hideLoading();
					if(res.code != 200){
						this.content = "~暂无在线客服，请稍后再访问~";
						this.$refs.alert.open();
					}else{
						this.service = res.data;
					}
				}).catch((e)=>{
					console.log(e);
				});
			}catch(e){
				console.log(e);
				uni.hideLoading();
				uni.$emit('reconnect');
			}
		}
	}
}