<template>
    <view class="box-wrap light">
        <!--    -->
        <view class="status_bar"></view>
        <view class="back" @click="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="#ffffff"></fui-icon>
        </view>
        <view class="header-wrap">
            <view class="header-image">
                <image v-if="lang == 'zh-Hant'" src="@/static/blindbox/box1.png" mode=""></image>
                <image v-else src="@/static/blindbox/box1En.png" mode=""></image>
                <!--rules-->
                <view class="rules">
                    <view class="r_i font-weight" @click="showrRecord()">
                        <text>{{ $t('bbox.t1') }}</text>
                    </view>
                    <view class="r_i font-weight" @click="showRule()">
                        <text>{{ $t('bbox.t2') }}</text>
                    </view>
                </view>
            </view>
            <!-- button group -->
            <view class="header-button">
                <view class="btn" :class="{'active':btnActive === 1}" @click="btnActive = 1">
                    <text>USDT{{ $t('bbox.t3') }}</text>
                </view>
                <!-- <view class="btn" :class="{'active':btnActive === 0}" @click="btnActive = 0">
                    <text>ABT{{ $t('bbox.t3') }}</text>
                </view> -->
            </view>
            <!-- 总奖池 -->
            <view class="total-box">
                <view class="total-con">
                    <view class="_con">
                        <text>{{ $t('bbox.t4') }}：</text>
                        <text>{{ btnActive == 0 ? box_pool_amount : u_box_poll_amout }}</text>
                        <text>{{ btnActive === 0 ? 'ABT' : 'USDT' }}</text>
                    </view>
                </view>
            </view>
            <!-- 获奖轮播 -->
            <view class="swiper-wrap">
                <swiper class="swiper"
                        :disable-touch="true"
                        :autoplay="true"
                        :circular=true
                        :vertical="true"
                        :interval="3000"
                        :duration="800">
                    <swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
                        <image src="@/static/blindbox/coin.png" mode=""></image>
                        <text class="num">{{ item.amount }} {{ btnActive === 0 ? 'ABT' : 'USDT' }}</text>
                        <text>{{ $t('bbox.t34') }}{{ item.number }}{{ $t('bbox.t35') }}</text>
                    </swiper-item>
                </swiper>
            </view>
        </view>
        <!--  -->
        <view class="box-main">
            <!-- 盒子选择 -->
            <view class="box-tabs">
                <view class="tab_i" :class="tabActive == index ? 'active_tab' : ''" v-for="(item, index) in tabGroup"
                      :key="index" @click="tabChange(item, index)">
                    <image :src="'/static/blindbox/' + item.src + '.png'" mode=""></image>
                    <view class="txt">
                        <text>{{ $t(item.name) }}</text>
                        <text>{{ item.price }} {{ btnActive === 0 ? 'ABT' : 'USDT' }}</text>
                    </view>
                </view>
            </view>
            <!-- 选中展示 -->
            <view class="box-content">
                <view class="box-center">
                    <!--  -->
                    <view class="image-box">
                        <image :src="'/static/blindbox/' + activeArr.src + '.png'" mode=""></image>
                    </view>
                    <!-- 左右切换 -->
                    <view class="swiper-change">
                        <view class="_img" @click="leftChange">
                            <image src="@/static/blindbox/arrowLeft.png" mode=""></image>
                        </view>
                        <view class="_img" @click="rightChange">
                            <image src="@/static/blindbox/arrowRight.png" mode=""></image>
                        </view>
                    </view>
                </view>
                <!--  -->
                <view class="box-info">
                    <view class="_t">
                        <text class="orange font-weight">{{ $t(activeArr.name) }}</text>
                        <text class="font-weight">{{ $t('bbox.t5') }}</text>
                    </view>
                    <text class="orange num font-weight">{{ activeArr.heightPrice }} {{ btnActive === 0 ? 'ABT' : 'USDT' }}
                    </text>
                </view>
            </view>
            <!--  -->
            <view class="footer">
                <!-- btn -->
                <view class="btn-box">
                    <view class="btn_i" @click="openBox(1)">
                        <text class="font-12 font-weight" style="color: #fff;">{{ $t('bbox.t6') }}1{{ $t('bbox.t7') }}
                        </text>
                        <text class="font-12 font-weight" style="color: #fff;">{{ $t('bbox.t8') }} {{ activeArr.price }}
                            {{ btnActive === 0 ? 'ABT' : 'USDT' }}
                        </text>
                    </view>
                    <view class="btn_i" @click="openBox(2)">
                        <text class="font-weight">{{ $t('bbox.t6') }}5{{ $t('bbox.t7') }}</text>
                        <text class="font-weight">{{ $t('bbox.t8') }} {{ activeArr.fivePrice }} {{ btnActive === 0 ? 'ABT' : 'USDT' }}
                        </text>
                    </view>
                </view>
                <!-- login -->
                <!--                <view class="not-login" @click="logTip()">-->
                <!--                    <text>点击登录/注册</text>-->
                <!--                </view>-->
                <view class="mt-15" style="margin-top: 30px;">
                    <view class="amountBg flex">
                        <view style="width: 85%;margin: auto;" v-if="isLogin">
                            <text class="font-12 font-weight" style="color: #fff;">
                                {{ $t('bbox.t9') }}：{{ btnActive == 0 ? trade_balance : u_balance }}
                                {{ btnActive === 0 ? 'ABT' : 'USDT' }}
                            </text>
                            <text @click="$mroute.exchange()" class="font-12 font-weight"
                                  style="color: #ECB177;float: right;">{{ $t('bbox.t10') }}
                            </text>
                        </view>
                        <view style="width: 85%;margin: auto;text-align: center;" v-else>
                            <text class="font-12 color-white font-weight">{{ $t('bbox.t11') }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 登录弹出 -->
        <uni-popup ref="enoughBalance" type="center" mask-background-color="rgba(0,0,0,.7)">
            <view class="log-popup">
                <image @click="closePop()" src="@/static/blindbox/closewhite.png" mode=""></image>
                <text>{{ $t('with.t8') }}</text>
                <button @click="$mroute.exchange()">{{ $t('contruct.fund_tran') }}</button>
            </view>
        </uni-popup>
        <!-- 游戏规则 -->
        <uni-popup ref="gamerule" type="bottom" mask-background-color="rgba(0,0,0,.85)" :mask-click="false">
            <view class="game-rule">
                <view class="rule-title">
                    <image v-if="lang == 'zh'" class="_timg" src="@/static/blindbox/box8.png" mode=""></image>
                    <image v-else class="_timg" src="@/static/blindbox/box8En.png" mode=""></image>
                    <image @click="closePop()" class="close-img" src="@/static/blindbox/cha.png" mode=""></image>
                </view>
                <scroll-view class="rule-content" scroll-y>
                    <text class="_t font-bold">{{ $t('bbox.t13') }}</text>
                    <text class="mb-20">
                        {{ $t('bbox.t14') }}
                    </text>
                    <text class="_t font-bold">{{ $t('bbox.t15') }}：</text>
                    <text>
                        {{ $t('bbox.t16') }}
                    </text>
                    <text>{{ $t('bbox.t17') }}</text>
                    <text>{{ $t('bbox.t18') }}</text>
                    <text>{{ $t('bbox.t19') }}</text>
                    <text>{{ $t('bbox.t20') }}</text>
                    <text>{{ $t('bbox.t21') }}</text>
                    <text>{{ $t('bbox.t22') }}</text>
                    <text class="mb-20">{{ $t('bbox.t23') }}</text>
                    <text class="_t">{{ $t('bbox.t24') }}：</text>
                    <text>
                        {{ $t('bbox.t25') }}
                    </text>
                    <text>
                        {{ $t('bbox.t26') }}
                    </text>
                    <text class="mb-20">{{ $t('bbox.t27') }}</text>
                    <text>{{ $t('bbox.t28') }}</text>
                </scroll-view>
            </view>
        </uni-popup>
        <!-- 盲盒记录 -->
        <uni-popup ref="record" type="bottom" mask-background-color="rgba(0,0,0,.85)" :mask-click="false">
            <view class="game-rule">
                <view class="rule-title">
                    <image v-if="lang=='zh'" class="_timg" src="@/static/blindbox/box7.png" mode=""></image>
                    <image v-else class="_timg" src="@/static/blindbox/box7En.png" mode=""></image>
                    <image @click="$refs.record.close()" class="close-img" src="@/static/blindbox/cha.png"
                           mode=""></image>
                </view>
                <view class="record-content">
                    <view class="_head">
                        <view class="_time" @click="startPicker = true">
                            <text>{{ startTime }}</text>
                            <image src="@/static/blindbox/tag-down.png"></image>
                        </view>
                        <view class="_line"></view>
                        <view class="_time" @click="endPicker = true">
                            <text>{{ endTime }}</text>
                            <image src="@/static/blindbox/tag-down.png"></image>
                        </view>
                        <view class="_time" @click="page=1;listLog=[];log()">
                            <text>{{ $t('bbox.t29') }}</text>
                        </view>
                    </view>
                    <!-- list -->
                    <scroll-view scroll-y class="_list" @scrolltolower="log()">
                        <!-- not -->
                        <view class="_list_item" v-if="listLog.length" v-for="(item,idx) in listLog" :key="idx">
                            <view class="top">
                                <text>{{ $t(item.box) }}</text>
                                <text>{{ parseFloat(item.winning_amount).toFixed(2) }}
                                    {{ btnActive === 0 ? 'ABT' : 'USDT' }}
                                </text>
                            </view>
                            <view class="btm">
                                <text>{{ item.created_at }}</text>
                                <text>{{ $t('bbox.t30') }}</text>
                            </view>
                        </view>
                        <view class="not-date" v-else>
                            <image src="@/static/blindbox/noData.png" mode=""></image>
                            <text>{{ $t('bbox.t31') }}</text>
                        </view>
                    </scroll-view>
                    <!-- 选择开始时间 -->
                    <fui-date-picker theme="dark" radius background="#201c1c" cancelColor="#9b908a"
                                     confirmColor="#f2b57a" size="14" :show="startPicker" type="3" @change="startChange"
                                     @cancel="pickerCancel" :confirmText="$t('确定')" :cancelText="$t('取消')"
									 :year_t="$t('年')" :month_t="$t('月')" :day_t="$t('日')"></fui-date-picker>
                    <fui-date-picker theme="dark" radius background="#201c1c" cancelColor="#9b908a"
                                     confirmColor="#f2b57a" size="14" :show="endPicker" type="3" @change="endChange"
                                     @cancel="pickerCancel" :confirmText="$t('确定')" :cancelText="$t('取消')"
									 :year_t="$t('年')" :month_t="$t('月')" :day_t="$t('日')"></fui-date-picker>
                </view>
            </view>
        </uni-popup>

        <uni-popup type="center" ref="open">
            <view class="before-popup">
                <view class="result-container">
                    <image @click="$refs.open.close()" src="../../../static/blindbox/closewhite.png" mode="widthFix"></image>
                    <text class="c-title always-white font-16 font-weight">{{ $t('bbox.t32') }}</text>
                    <text class="c-content color-warring font-22 font-weight">{{ winning_amount }} {{ btnActive === 0 ? 'TedBit' : 'USDT' }}</text>
                    <text class="c-tip color-gray font-12">{{ $t('bbox.t33') }}</text>
                </view>
            </view>
        </uni-popup>

        <uni-popup type="center" ref="loading">
            <fui-loading type="col" text="loading" :isFixed="false"></fui-loading>
        </uni-popup>
    </view>
</template>

<script>
import fuiDatePicker from "@/components/firstui/fui-date-picker/fui-date-picker.vue"
import fuiLoadAni from "@/components/firstui/fui-load-ani/fui-load-ani.vue"
import box from '@/common/api/box.js'
import {mapState, mapGetters, mapMutations} from 'vuex';

export default {
    components: {
        fuiDatePicker,
        fuiLoadAni
    },
    data() {
        return {
            btnActive: 1,
            boxIndex: 1,
            startTime: '2023-01-01',
            endTime: "2023-12-01",
            list: [],
            listLog: [],
            tabActive: 0,
            tabGroup: [{
                src: 'boxDiamond',
                name: '钻石盒',
                price: '128',
                heightPrice: "8,888",
                fivePrice: "640",
                id: 1
            }, {
                src: 'boxPlatinum',
                name: '铂金盒',
                price: '88',
                heightPrice: "3,888",
                fivePrice: "440",
                id: 2
            }, {
                src: 'boxj',
                name: '金盒',
                price: '38',
                heightPrice: "1,288",
                fivePrice: "190",
                id: 3
            }, {
                src: 'boxy',
                name: '银盒',
                price: '18',
                heightPrice: "688",
                fivePrice: "90",
                id: 4
            }, {
                src: 'boxt',
                name: '铜盒',
                price: '8',
                heightPrice: "188",
                fivePrice: "40",
                id: 5
            }, {
                src: 'boxLron',
                name: '铁盒',
                price: '1',
                heightPrice: "38",
                fivePrice: "5",
                id: 6
            },],
            activeArr: [],
            box_pool_amount: "0.00",
            trade_balance: "0.00",
            winning_amount: "0.00",
            page: 1,
            startPicker: false,
            endPicker: false,
            lang: "en",
            u_balance: 0,
            u_box_poll_amout: 0
        }
    },
    onReady() {
        this.activeArr = this.tabGroup[0];
        this.getTradeBalance();
        let dt = new Date();
        let m = dt.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = dt.getDate();
        d = d < 10 ? ('0' + d) : d
        let y = dt.getFullYear();
        this.currentDate = ['' + y, '' + m, '' + d,];
        this.startingTime = y + '-' + (m) + '-01'
        this.endTime = y + '-' + (m) + '-' + d
        this.log();
    },
    onShow() {
        this.activeArr = this.tabGroup[0];
        this.lang = uni.getStorageSync('lang');
        this.randList();
        console.log(this.lang)
    },
    computed: {
        ...mapGetters(['isLogin'])
    },
    watch: {
        btnActive(v) {
            this.getTradeBalance();
        }
    },
    methods: {
        randList() {
            var list = [];
            for (var i = 0; i < 20; i++) {
                list.push({
                    amount: this.getRandomNumber(),
                    number: this.generateRandomPhoneNumber()
                });
            }
            this.list = list;
        },
        generateRandomPhoneNumber() {
            const countryCode = Math.floor(Math.random() * 900) + 100;
            const lastFourDigits = Math.floor(Math.random() * 10000);
            const countryCodeStr = countryCode.toString();
            const lastFourDigitsStr = lastFourDigits.toString().padStart(4, '0');
            const phoneNumber = `${countryCodeStr}-****-${lastFourDigitsStr}`;
            return phoneNumber;
        },
        getRandomNumber() {
            return Math.floor(Math.random() * 8888) + 1;
        },
        logTip() {
            this.$refs.enoughBalance.open();
        },
        showRule() {
            this.$refs.gamerule.open();
        },
        showrRecord() {
            this.$refs.record.open();
        },
        closePop() {
            this.$refs.enoughBalance.close();
            this.$refs.gamerule.close();
            // this.$refs.record.close();
            //this.$mroute.exchange();
        },
        tabChange(item, index) {
            this.tabActive = index;
            this.activeArr = item;
        },
        leftChange() {
            if (this.tabActive <= this.tabGroup.length - 1 && this.tabActive != 0) {
                this.tabActive--;
            }
            this.activeArr = this.tabGroup[this.tabActive];
        },
        rightChange() {
            if (this.tabActive <= this.tabGroup.length - 1 && this.tabActive != 5) {
                this.tabActive++;
            }
            this.activeArr = this.tabGroup[this.tabActive];
        },
        async openBox(type) {
            if (!this.isLogin) {
                return this.$mroute.login();
            }
            if (this.btnActive === 0) {
                if (parseFloat(this.$util.str2number(this.trade_balance)) < parseFloat(type === 1 ? this.tabGroup[this.tabActive].price : this.tabGroup[this.tabActive].fivePrice)) {
                    this.$refs.enoughBalance.open();
                    return;
                }
            } else {
                if (parseFloat(this.$util.str2number(this.u_balance)) < parseFloat(type === 1 ? this.tabGroup[this.tabActive].price : this.tabGroup[this.tabActive].fivePrice)) {
                    this.$refs.enoughBalance.open();
                    return;
                }
            }

            this.$refs.loading.open();
            let res = await box.open({
                type: type,
                id: this.tabGroup[this.tabActive].id,
                active: this.btnActive
            })
            this.$refs.loading.close();
            // this.box_pool_amount = this.$util.thousandSeparator(res.data.box_pool_amount)
            // this.trade_balance = this.$util.thousandSeparator(res.data.trade_balance)
            this.winning_amount = this.$util.thousandSeparator(res.data.winning_amount)
            this.$refs.open.open();
            this.getTradeBalance();
        },
        async getTradeBalance() {
            let res = await box.getTradeBalance()
            this.box_pool_amount = this.$util.thousandSeparator(res.data.box_pool_amount)
            this.trade_balance = this.$util.thousandSeparator(res.data.trade_balance)
            this.u_balance = this.$util.thousandSeparator(res.data.u_trade_balance);
            this.u_box_poll_amout = this.$util.thousandSeparator(res.data.u_box_pool_amount);
            // this.list = res.data.list.map((item, idx) => {
            // 	item.num = this.$util.thousandSeparator(item.num)
            // 	return item;
            // })
        },
        async log() {
            let res = await box.log({
                page: this.page,
                start_at: this.startTime,
                end_at: this.endTime,
                perPage: 30,
                active: this.btnActive
            })
            if (res.data.list.length) {
                this.listLog = this.listLog.concat(res.data.list.map((item, idx) => {
                    item.winning_amount = this.$util.thousandSeparator(item.winning_amount)
                    return item;
                }))
            }
            this.page++
        },
        startChange(e) {
            this.startPicker = false;
            this.startTime = e.result;
        },
        endChange(e) {
            this.endPicker = false;
            this.endTime = e.result;
        },
        pickerCancel() {
            this.startPicker = false;
        }
    }
}
</script>

<style lang="scss">
@import "blindbox.scss";
</style>
<style scoped>
/deep/ .van-picker {
    background-color: #201c1c;
    font-family: "PingFang";
}

/deep/ .van-picker__cancel {
    color: #9b908a;
    font-family: "PingFang";
}

/deep/ .van-picker__title {
    color: #f8f9fa;
}

/deep/ .van-picker__confirm {
    color: #f2b57a;
    font-family: "PingFang";
}

/deep/ .van-picker__mask {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, .6), rgba(0, 0, 0, .1)), linear-gradient(0deg, rgba(0, 0, 0, .6), rgba(0, 0, 0, .1));
}

/deep/ .van-picker-column__item {
    color: #f1f3f5;
    font-weight: 600;
}
</style>