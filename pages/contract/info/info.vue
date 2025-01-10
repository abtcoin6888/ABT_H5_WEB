<template>
	<view class="info" :data-theme="userTheme">
        <fui-nav-bar isFixed isOccupy statusBar
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('cio.t1')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
		<view class="container">
            <view class="cell">
                <text class="font-13 color-gray">{{$t('cio.t2')}}</text>
                <text class="font-13 color-black font-weight">{{symbol}}USDT {{$t('cio.t3')}}</text>
            </view>
            <view class="cell">
                <text class="font-13 color-gray">{{$t('cio.t4')}}</text>
                <text class="font-13 color-black font-weight">{{$t('cio.t5')}}</text>
            </view>
            <view class="cell">
                <text class="font-13 color-gray">{{$t('cio.t6')}}</text>
                <text class="font-13 color-black font-weight">{{symbol}}USDT {{$t('cio.t7')}}</text>
            </view>
            <view class="cell">
                <text class="font-13 color-gray">{{$t('cio.t8')}}</text>
                <text class="font-13 color-black font-weight">USDT</text>
            </view>
            <view class="cell">
                <text class="font-13 color-gray">{{$t('cio.t9')}}</text>
                <text class="font-13 color-black font-weight">0.001{{symbol}}</text>
            </view>
            <view class="cell">
                <text class="font-13 color-gray">{{$t('cio.t10')}}</text>
                <text class="font-13 color-black font-weight">0.01{{symbol}}</text>
            </view>
            <view class="cell">
                <text class="font-13 color-gray">{{$t('cio.t11')}}</text>
                <text class="font-13 color-black font-weight">0.20%</text>
            </view>
            <view class="cell">
                <text class="font-13 color-gray">{{$t('cio.t12')}}</text>
                <text class="font-13 color-black font-weight">{{$t('cio.t13')}}</text>
            </view>
		</view>
	</view>
</template>

<script>
    import {mapGetters} from 'vuex';
	export default {
		onLoad(e) {
			console.log(e);
			this.symbol = e.symbol;
		},
		data() {
			return {
				symbol:""
			}
		},
        computed: {
            ...mapGetters(['userTheme'])
        },
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.info {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    .container {
        .cell {
            padding: 0 30rpx;
            box-sizing: border-box;
            height: 76rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &:first-of-type {
                margin-top: 30rpx;
            }
        }
    }
}
</style>
