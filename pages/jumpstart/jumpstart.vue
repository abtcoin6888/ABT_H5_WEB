<template>
    <view class="page-warp bg-white" :data-theme="userTheme">
        <fui-nav-bar zIndex="1"
                     isFixed
                     isOccupy
                     :padding="15"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     title="Jumpstart"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="container-warp">
            <view class="banner" v-for="item  in banner" :key="item">
                <image class="banner-image" :src="`/static/jumpstart-banner-${userTheme}.webp`" mode="widthFix"></image>
                <text class="font-22 font-bold color-black">{{ item.t1 }}</text>
                <text class="font-22 font-bold color-black">{{ item.t2 }}</text>
                <view class="row-txt">
                    <view class="txt-item" v-for="sitem in item.list" :key="sitem">
                        <text class="font-15 font-bold color-black">{{ sitem.txt1 }}</text>
                        <text class="font-12 color-gray mt-5">{{ sitem.txt2 }}</text>
                    </view>
                </view>
                <view class="banner-button">
                    <text class="font-12 font-weight color-black">{{ item.button }}</text>
                </view>
            </view>
            <view class="list-warp">
                <view class="label-title">
                    <text class="font-18 font-bold color-black">往期项目</text>
                </view>
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
                <view class="view-more">
                    <text class="font-14 color-black" @click="$mroute.toViewMore">查看更多</text>
                    <fui-icon name="arrowright" size="38" color="var(--content-primary)" @click="$mroute.toViewMore"></fui-icon>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import {mapGetters} from "vuex";
import FuiNavBar from "../../components/firstui/fui-nav-bar/fui-nav-bar.vue";
import user from "../../common/api/user";


export default {
    components: {FuiNavBar},
    data(){
        return{
            banner: [{
                t1: "抢先发现",
                t2: "全球优质新项目",
                list: [{
                    txt1: "125万+",
                    txt2: "浏览人数"
                },{
                    txt1: "$18亿+",
                    txt2: "参与金额"
                },{
                    txt1: "10",
                    txt2: "项目数"
                }],
                button: "什么是Jumpstart？"
            }],
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
@import "jumpstart.css";
</style>