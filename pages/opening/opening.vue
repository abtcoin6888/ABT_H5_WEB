<template>
    <view class="page-image"
          :style="`height: ${windowHeight}px`">
        <!-- <image class="video-image"
               src="/static/video/start.gif"
               :style="`height: ${windowHeight}px`"
               >
        </image> -->
    </view>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            windowHeight: ""
        }
    },
    created() {
        this.windowHeight = uni.getSystemInfoSync().windowHeight;
    },
    onShow() {
		let _this = this;
        // #ifdef H5
        if(!this.isLogin){
            setTimeout(() => {
                _this.$mroute.home();
            }, 1);
        }else{
            this.$mroute.home();
        }
    },
    computed: {
        ...mapGetters(['userTheme','isLogin'])
    },
	methods:{
		end(){
			this.$mroute.home();
		}
	}
}
</script>

<style lang="scss" scoped>
.page-image {
    width: 100%;

    .video-image {
        width: 750rpx;
    }
}
</style>