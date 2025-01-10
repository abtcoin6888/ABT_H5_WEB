<template>
	<view class="next-list">
		<view class="next-search" :style="{'top':($device.statusBarHeight+45)+'px'}">
			<image class="next-search-img" :src="nextSearchImgSrc"></image>
			<input class="next-input" @input="search" v-model="searchStr" placeholder="搜索币种" maxlength="50"
				placeholder-class="next-placeholder" />
		</view>
		<!-- #ifdef H5 -->
		<view style="width: 100%;" :style="{'height':($device.statusBarHeight + 50)+'px'}"></view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view style="width: 100%;" :style="{'height':($device.statusBarHeight )+'px'}"></view>
		<!-- #endif -->
		<scroll-view @scroll="scrollCallback" class="next-scroll-left" scroll-y="true" :scroll-with-animation="true"
			:scroll-into-view="scrollIntoView">
			<view id="TOP"><slot></slot></view>
			
			<view style="width: 100%;height: 50px"></view>
			
			<view style="clear: both;" class="left-list" v-for="(item,index) of scrollLeftObj" :key="index" :id="index!='#'?index:'BOTTOM'">
				<view :id="`item${index}`" class="left-item-title" v-if="item && item.length">{{index}}</view>
				<view class="left-item-card" v-for="(mess,inx) in item" @click.stop="chooseItem(mess)">
					<view class="left-item-card-img">
						<image :src="mess.img" style="height: 25px;width: 25px;" mode=""></image>
					</view>
					<view class="left-item-card-info">
						<view class="left-item-card-name">{{mess[nameKey] || ''}}</view>
					</view>
				</view>
			</view>
			<view class="no-data" v-if="!hasData">
				<image class="no-data-img" :src="noDataImgSrc"></image>
				<view class="no-data-name">暂无数据</view>
			</view>
		</scroll-view>
		<view class="next-scroll-right" v-if="hasData">
			<!-- <image class="next-scroll-right-top" :src="nextScrollRightTopSrc" @click.stop="scrollTop"></image> -->
			<view :class="{'next-scroll-right-name':true,'next-scroll-right-select':item==scrollIntoViewCopy}"
				v-for="(item,index) in scrollRightList" :key="index" @click.stop="chooseType(item)">{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	import nextSearchImgSrc from '../../static/search.png'
	import noDataImgSrc from '../../static/noData.png'
	import nextScrollRightTopSrc from '../../static/top.png'
	import pinyin from './js-pinyin/dist/pinyin.js'
	import { Col, Row } from 'vant';
	
	// 创建pinyin实例
	const pinyinInstance = new pinyin({charCase:0})
	
	const position = {}
	
	export default {
		name:"coin-indexed-xlist",
		components:{
			[Col.name]:Col,
			[Row.name]:Row,
		},
		props: {
			dataList: {
				type: Array,
				required: true,
				default: () => {
					return []
				}
			},
			//显示的主键key值
			idKey: {
				type: String,
				default: 'code'
			},
			nameKey: {
				type: String,
				default: 'cnName'
			},
			phoneKey: {
				type: String,
				default: 'dialingCode'
			},
			imgKey: {
				type: String,
				default: 'img'
			},
			radius: {
				type: String,
				default: '6rpx'
			},
			showAvatar: {
				type: Boolean,
				default: false
			},
			isInterlock: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				searchStr: '',
				scrollIntoView: '',
				scrollIntoViewCopy: '',
				scrollLeftObj: {},
				oldObj: {},
				scrollRightList: [],
				hasData: true,
				nextSearchImgSrc,
				noDataImgSrc,
				nextScrollRightTopSrc
			};
		},
		created() {
			this.$watch(() => this.dataList, (newList) => {
				if (newList && newList.length) this.cleanData(newList)
			}, {
				immediate: true,
				deep: true,
			})
			
			if(this.isInterlock) {
				this.$nextTick(() => {
					Object.keys(this.scrollRightList).map(key => {
						uni.createSelectorQuery().in(this).select(`#item${this.scrollRightList[key]}`).boundingClientRect(res => {
							const { top } = res
							position[this.scrollRightList[key]] = top
						}).exec()
					})
				})
			}
		},
		methods: {
			search() {
				if (this.searchStr) {
					let has = false
					this.scrollLeftObj = JSON.parse(JSON.stringify(this.oldObj))
					for (let i in this.scrollLeftObj) {
						this.scrollLeftObj[i] = this.scrollLeftObj[i].filter(item => {
							return (item[this.nameKey].indexOf(this.searchStr.toUpperCase()) != -1) || item[this.phoneKey]
								.indexOf(this.searchStr.toUpperCase()) != -1
						})
						if (this.scrollLeftObj[i].length) has = true
					}
					if (has) this.hasData = true
					else this.hasData = false
				} else {
					this.hasData = true
					this.scrollLeftObj = JSON.parse(JSON.stringify(this.oldObj))
				}
			},
			scrollCallback(e) {
				const { detail } = e
				const { scrollTop, scrollHeight } = detail
				if (this.scrollIntoView === 'TOP') {
					this.scrollIntoView = ''
				}
				
				if (this.isInterlock) {
					for (let key in position) {
						if (position[key] - scrollTop > 0 && position[key] - scrollTop <= scrollHeight) {
							this.scrollIntoViewCopy = key
							return
						}
					}
				}	
			},
			scrollTop() {
				this.scrollIntoView = 'TOP'
			},
			cleanData(list) {
				this.scrollRightList = this.getLetter()
				let newList = []
				list.forEach(res => {
					let initial = pinyinInstance.getCamelChars(res.cnName.trim())
					let firsfirs = initial ? initial.substring(0, 1) : ''
					if (!newList[firsfirs]) newList[firsfirs] = []
					newList[firsfirs].push({
						[this.idKey]: res[this.idKey] || '',
						[this.nameKey]: res[this.nameKey].trim() || '',
						[this.phoneKey]: res[this.phoneKey] || '',
						[this.imgKey]: res['img'] || ''
					})
				})
				this.scrollRightList.forEach(t => {
					if (newList[t]) {
						this.$set(this.scrollLeftObj, t, newList[t])
					} else {
						this.$set(this.scrollLeftObj, t, [])
					}
				})
				let surplusList = []
				for (var i in newList) {
					let han = this.scrollRightList.find(v => {
						return v == i
					})
					if (!han) surplusList.push(newList[i])
				}
				surplusList.forEach(item => {
					this.scrollLeftObj['#'] = this.scrollLeftObj['#'].concat(item)
				})
				this.oldObj = JSON.parse(JSON.stringify(this.scrollLeftObj))
				
				// 过滤不存在的关键索引
				const existList = Object.keys(this.scrollLeftObj).filter(key => {
					return this.scrollLeftObj[key].length
				})
				this.scrollRightList = this.scrollRightList.filter(key => {
					return existList.some(k => k === key)
				})
			},
			getLetter() {
				let list = []
				for (var i = 0; i < 26; i++) {
					list.push(String.fromCharCode(65 + i))
				}
				list.push('#')
				return list
			},
			chooseType(item) {
				if (item == '#') item = 'BOTTOM'
				this.scrollIntoView = item
				this.scrollIntoViewCopy = item
			},
			preview(img) {
				uni.previewImage({
					current: 0,
					urls: [img]
				})
			},
			chooseItem(item) {
				this.$emit('itemclick', item)
			}
		},
	};
</script>
<style>
	/deep/ ::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
	}
</style>
<style lang="scss" scoped>
	.next-list {
		width: 100%;
		height: 100vh;
		background-color: #F4F4F4;
		box-sizing: border-box;
		padding-top: 1px;
		position: relative;
		.next-scroll-left {
			/* #ifdef APP-PLUS */
			height: 80%;
			/* #endif */
			/* #ifdef H5 */
			height: 90%;
			/* #endif */
			.left-list {
				height: auto;

				.left-item-title {
					width: calc(100% - 24rpx);
					height: 60rpx;
					padding-left: 24rpx;
					text-align: left;
					line-height: 60rpx;
					font-size: 30rpx;
					color: #666666;
				}

				.left-item-card {
					width: 100%;
					height: 40px;
					background-color: #FFFFFF;
					box-sizing: border-box;
					padding-left: 24rpx;
					display: flex;
					align-items: center;
					justify-content: flex-start;

					.left-item-card-img {
						width: 80rpx;
						min-width: 80rpx;
						height: 80rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 36rpx;
						font-weight: bold;
						color: #FFFFFF;
					}

					.img-info {
						background: none;
						border: solid #f0f0f0 1rpx;
					}

					.left-item-card-info {
						width: 100%;
						height: 100%;
						display: flex;
						align-items: flex-start;
						justify-content: center;
						flex-direction: column;

						.left-item-card-name {
							font-size: 24rpx;
							line-height: 24rpx;
							color: #333333;
						}

						.left-item-card-phone {
							margin-top: 14rpx;
							font-size: 24rpx;
							line-height: 24rpx;
							color: #999999;
						}
					}
				}
			}

			.no-data {
				width: 100%;
				display: flex;
				align-items: center;
				justify-items: center;
				flex-direction: column;
				margin-top: 25%;

				.no-data-img {
					width: 200rpx;
					height: 200rpx;
				}

				.no-data-name {
					margin-top: 20rpx;
					font-size: 28rpx;
					color: #666666;
				}
			}
		}

		.next-scroll-right {
			position: fixed;
			right: 0rpx;
			top: 50%;
			transform: translateY(-47%);
			z-index: 999 !important;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.next-scroll-right-top {
				width: 32rpx;
				height: 32rpx;
				margin-right: 14rpx;
				z-index: 999 !important;
			}

			.next-scroll-right-name {
				width: 32rpx;
				padding-right: 14rpx;
				height: 28rpx;
				font-size: 22rpx;
				color: #333333;
				line-height: 22rpx;
				margin-top: 8rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.next-scroll-right-select {
				padding: 0;
				margin-right: 14rpx;
				width: 28rpx;
				height: 28rpx;
				border-radius: 50%;
				background: #2991FF;
				color: #FFFFFF;
			}
		}
	}
	/* #ifdef H5 */
	.next-search {
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		z-index: 9999;
		top: 46px;
		left: 0;
		.next-search-img {
			width: 32rpx;
			height: 32rpx;
			position: absolute;
			left: 64rpx;
		}
	
		.next-input {
			width: calc(100% - 64rpx);
			height: 72rpx;
			background: #EEEEEE;
			border-radius: 36rpx;
			padding: 0 32rpx 0 80rpx;
			box-sizing: border-box;
			color: #333333;
		}
	
		.next-placeholder {
			color: #777777;
		}
	}
	/* #endif */
	/* #ifdef APP-PLUS */
	.next-search {
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		z-index: 9999;
		top: 71px;
		left: 0;
		.next-search-img {
			width: 32rpx;
			height: 32rpx;
			position: absolute;
			left: 64rpx;
		}
	
		.next-input {
			width: calc(100% - 64rpx);
			height: 72rpx;
			background: #EEEEEE;
			border-radius: 36rpx;
			padding: 0 32rpx 0 80rpx;
			box-sizing: border-box;
			color: #333333;
		}
	
		.next-placeholder {
			color: #777777;
		}
	}
	/* #endif */
</style>