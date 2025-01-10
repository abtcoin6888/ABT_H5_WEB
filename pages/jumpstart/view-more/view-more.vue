<template>
    <view class="page-warp bg-white" :data-theme="userTheme">
        <fui-nav-bar zIndex="1"
                     isFixed
                     isOccupy
                     :padding="15"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     title="往期项目"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="container-warp">
            <view class="list-warp">
                <view class="label-card" v-for="item in cardArr" :key="item.id" @click="$mroute.toEventdetails(item.id)">
                    <view class="image-box">
                        <image class="card-image" :src="item.background_img" mode="aspectFill"></image>
                        <view class="tag bg-gray">
                            <text class="font-12 color-gray">{{ item.type }}</text>
                        </view>
                        <view class="symbol-box">
                            <image class="currency-icon" :src="item.icon" mode="widthFix"></image>
                            <text class="font-16 font-bold always-white symbol-txt mr-5">{{ item.symbol }}</text>
                            <text class="font-13 font-weight color-gray symbol-desc">{{ item.symbol }}</text>
                        </view>
                    </view>
                    <view class="card-row">
                        <text class="font-13 font-weight color-black">历史最高涨幅</text>
                        <text class="font-13 font-weight price_up">+{{ item.highest_increase }}%</text>
                    </view>
                    <view class="card-row">
                        <text class="font-13 font-weight color-black">奖金总量</text>
                        <text class="font-13 font-weight color-black">{{ item.total_bonus }} {{ item.symbol }}</text>
                    </view>
                </view>
                <empty-view :visible="cardArr && cardArr.length == 0" :width="690" :height="750" title="暂无相关数据"></empty-view>
            </view>
        </view>
    </view>
</template>
<script>
import {mapGetters} from "vuex";
import FuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";
import emptyView from "@/components/emptyView/emptyView.vue";


export default {
    components: {FuiNavBar, emptyView},
    data(){
        return{
            cardArr:[{
                id: 0,
                background_img: "/static/jumpstart-card.webp",
                type: "认购抽签",
                icon: "/static/coin/usdt.png",
                symbol: "sui",
                highest_increase: 2182,
                total_bonus: 250000000
            },{
                id: 1,
                background_img: "/static/jumpstart-card.webp",
                type: "打折销售",
                icon: "/static/coin/usdt.png",
                symbol: "sui",
                highest_increase: 2182,
                total_bonus: 250000000
            }]
        }
    },
    computed: {
        ...mapGetters(['userTheme', 'isLogin']),
    },
}
</script>
<style scoped>
@import "view-more.css";
</style>