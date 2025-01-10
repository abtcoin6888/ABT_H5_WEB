<template>
	<view class="resultPage" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     statusBar
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     title=""
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="resultPage-body">
            <view class="resultPage-body-head">
                <image src="../../../static/img/success-icon.png" mode="widthFix"></image>
				<text class="font-16 font-bold color-black">{{$t('dps.t12')}}</text>
            </view>
            <view class="resultPage-body-cell">
                <text class="font-13 color-gray">{{$t('dps.t13')}}</text>
                <text class="font-13 font-weight">{{amount}} {{symbol}}</text>
            </view>
            <view class="resultPage-body-cell">
                <text class="font-13 color-gray">{{$t('dps.t14')}}</text>
                <text class="font-13 font-weight">{{$util.getDateStr()}}</text>
            </view>
            <view class="resultPage-body-cell">
                <text class="font-13 color-gray">{{$t('dps.t15')}}</text>
                <text class="font-13 font-weight">{{$util.getDateStr()}}</text>
            </view>
            <view class="resultPage-body-footer">
                <fui-button background="var(--content-primary)"
                            color="var(--background-primary)"
                            height="78rpx"
                            radius="78rpx"
                            size="26"
                            :text="$t('dps.t16')"
                            @click="toOrder">
                </fui-button>
            </view>
        </view>
	</view>
</template>

<script>
import {mapGetters} from 'vuex';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";
	export default {
        components: {fuiNavBar},
		data() {
			return {
                symbol:"",
                amount:""
			}
		},
        onLoad(e) {
            this.symbol = e.symbol;
            this.amount = e.amount;
        },
        computed: {
            ...mapGetters(['userTheme'])
        },
		methods: {
			toOrder(){
				uni.redirectTo({
				  url: "/pages/index/livecoin/eaorders/eaorders",
				});
			}
		}
	}
</script>


<style lang="scss" scoped>
.resultPage {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    &-body {
        width: 100%;
        height: auto;
        padding: 30rpx;
        box-sizing: border-box;

        &-head {
            width: 100%;
            height: auto;
            padding: 60rpx 0;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            image {
                width: 140rpx;
                margin-bottom: 30rpx;
            }
        }

        &-cell {
            width: 100%;
            height: 68rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &-footer {
            width: 100%;
            height: auto;
            padding: 20rpx 30rpx;
            box-sizing: border-box;
            background: var(--background-primary);
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 9;
        }
    }
}
</style>

