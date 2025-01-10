<template>
    <!--   策略类型弹窗 -->
    <fui-bottom-popup :show="visible"
                      z-index="1000"
                      background="var(--background-primary)"
                      @close="handleCancel">
        <view class="popup-warp">
            <view class="title">
                <text class="font-16 font-weight color-black">{{$t('strategy.t40')}}</text>
                <fui-icon name="close"
                          size="48"
                          color="var(--content-primary)"
                          @click="handleCancel">
                </fui-icon>
            </view>
            <scroll-view scroll-y="true"
                         class="scroll-view"
                         :style="`height: ${scrollHeight}px`">
                <view class="label">
                    <view class="label-desc">
                        <text>{{$t("strategy.t1")}}</text>
                    </view>
                    <view class="label-card"
                          v-for="(item,idx) in level1"
                          @click="labelChange(item)">
                        <view class="label-card-image">
                            <image :src="item.icon"></image>
                        </view>
                        <view class="label-card-info">
                            <text>{{ item.name }}</text>
                            <text>{{ item.brief }}</text>
                        </view>
                    </view>
                </view>
				<view class="label" v-if="level2.length">
                    <view class="label-desc">
                        <text>{{$t("strategy.t2")}}</text>
                    </view>
                    <view class="label-card"
                          v-for="(item,idx) in level2"
                          @click="labelChange(item)">
                        <view class="label-card-image">
                            <image :src="item.icon"></image>
                        </view>
                        <view class="label-card-info">
                            <text>{{ item.name }}</text>
                            <text>{{ item.brief }}</text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </fui-bottom-popup>
</template>
<script>
import strategy from "@/common/api/strategy.js"
export default {
    name: "tacticPopup",
    props: {
        isChange: {
            default: false,
            type: Boolean
        },
        mode: {
            type: Number
        },
        visible: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            scrollHeight: "",
			level1:[],
			level2:[],
			tb_idx:0
		}
    },
    created() {
        const windowHeight = uni.getSystemInfoSync().windowHeight;
        this.scrollHeight = windowHeight - 190;
		this.getType()
		uni.$on('tab2Change',(data)=>{
			this.tb_idx =data
		})
    },
    methods: {
        handleCancel() {
            this.$emit('close', false)
        },
        labelChange(e) {
            if (this.isChange === false) {
                uni.navigateTo({
                    url: e.path+ "?type_id=" + e.id+"&tb_idx=" + this.tb_idx
                })
                this.handleCancel();
            } else {
                this.$emit('modeChange', e)
            }
        },
		async getType() {
			let data = uni.getStorageSync('strategyType')
			if(!data){
				let res = await strategy.type()
				data = res.data
			}
			this.level1 = data.level1
			this.level2 = data.level2
		}
    }
}
</script>

<style lang="scss" scoped>
@import "tacticPopup";
</style>