<template>
    <fui-bottom-popup
        background="var(--background-primary)"
        z-index="1000"
        :show="visible"
        @close="handClose">
        <view class="terminationStrategy">
            <view class="title-box">
                <text>
                    {{$t('strategy.t33')}}
                </text>
                <fui-icon @click="handClose" name="close" size="42" color="var(--content-primary)"></fui-icon>
            </view>
            <view class="container">
                <text class="warning-title">
                    {{$t('strategy.t34').replace("%s", item.currency?item.currency.symbol:'')}}
                </text>
                <radio-group class="checkbox-group" @change="checkChange">
                    <label class="checkbox-label"
                           :style="`--background-image:url('/static/img/tactic/selected-${userTheme}.webp')`"
                           :class="{'checkbox-active':checkIndex == index}"
                           v-for="(item,index) in checkGroup" :key="item.type">
                        <radio :value="item.type" :checked="checkIndex == index"></radio>
                        <text class="_title">
                            {{ item.title }}
                        </text>
                        <text class="_desc">
                            {{ item.desc }}
                        </text>
                    </label>
                </radio-group>
                <view class="footer">
                    <text>
                        {{$t('strategy.t35')}}
                    </text>
                    <button class="button" @click="stop">
                        {{$t('strategy.t36')}}
                    </button>
                </view>
            </view>
        </view>
    </fui-bottom-popup>
</template>

<script>
	import strategy from "@/common/api/strategy.js"
export default {
    name: "terminationStrategy",
    props: {
        visible: {
            default: false,
            type: Boolean
        },
        item: {
            default: {},
            type: Object
        }
    },
	computed:{
		checkGroup(){
			let s = 'USDT'
			if(this.item.type_id == 1 && (this.item.direction ==1|| this.item.direction ==3)){
				s = this.item.currency.symbol
			}
			return [{
                type: '0',
                title: this.$t('strategy.t37'),
                desc: this.$t('strategy.t38').replace("%s", this.item.amount + s)
            }, {
                type: '1',
                title: this.$t('strategy.t39')
            }]
		}
	},
    data() {
        return {
            checkIndex: 0
        }
    },
    methods: {
        checkChange(e) {
            for (let i = 0; i < this.checkGroup.length; i++) {
                if (this.checkGroup[i].type == e.detail.value) {
                    this.checkIndex = i;
                    break;
                }
            }
        },
        handClose() {
            
        },
        async stop() {
			let res = await strategy.stop({gird_id:this.item.id,sell:this.checkIndex?0:1})
			if(res.code == 200){
				uni.$emit('stopStrategy',this.item)
			}
        },
    }
}
</script>

<style lang="scss" scoped>
@import "terminationStrategy";
</style>