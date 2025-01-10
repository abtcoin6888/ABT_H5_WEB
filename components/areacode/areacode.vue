<template>
	<view :data-theme="userTheme">
		<uni-popup ref="popup"
                   :safe-area="false"
                   type="bottom">
			<view class="arCodePopup" 
                  :style="{'height': windowHeight + 'px'}">
                <fui-nav-bar isFixed 
                             isOccupy
                             statusBar
                             zIndex="9" 
                             background="var(--background-primary)" 
                             :color="'var(--content-primary)'" 
                             :title="$t('common.area.t1')"
                             @leftClick="close()"
                             @init="navInit">
                    <fui-icon name="arrowleft"
                              size="56"
                              :color="'var(--content-primary)'">
                    </fui-icon>
                </fui-nav-bar>
				<next-indexed-xlist :dataList="list" :adjust-position="false" :showAvatar="true" @itemclick="itemclick"></next-indexed-xlist>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import country from '../../common/area.js';
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex';
	export default {
		name:"areacode",
		data() {
			return {
				list:country['countryList'],
                windowHeight: uni.getSystemInfoSync().windowHeight,
                navHeight: ""
			}
		},
    computed: {
      ...mapGetters(['userTheme']),
    },
		created() {
			//this.list = country['countryList'];
		},
		methods: {
            navInit(e){
                this.navHeight = this.windowHeight - e.height - e.statusBarHeight;
            },
			open(){
				this.$refs.popup.open();
			},
			close(){
				this.$refs.popup.close();
			},
			itemclick(e){
				this.$emit('itemclick',e);
				this.close();
			}
		}
	}
</script>

<style scoped>
.arCodePopup {
    width: 100%;
    background: var(--background-primary);
}
</style>
