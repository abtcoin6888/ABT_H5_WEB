<template>
  <view class="welcome" :data-theme="userTheme">
    <swiper class="swiper" :indicator-dots="false" :duration="300" @change="swiperChange">
      <swiper-item class="swiper-item" v-for="(item,index) in swiperList" :key="index">
        <view class="swiper-item">
          <image :src="'/static/img/' + item" mode="widthFix"></image>
          <text>{{ desc[index]['t1'] }}</text>
          <text>{{ desc[index]['t2'] }}</text>
        </view>
      </swiper-item>
    </swiper>
    <!-- time -->
    <view class="time-box show" @click="toHome">
      <text>{{ $t('welcome.t1') }}</text>
    </view>
    <!-- swiper dot -->
    <view class="swiper-dots">
      <view class="dot"
            :class="isActive == idx ? 'dot-active' : ''"
            v-for="(item,idx) in swiperList.length"
            :key="idx">
      </view>
    </view>
  </view>
</template>

<script>
import fuiCountDown from "@/components/firstui/fui-count-down/fui-count-down.vue"

export default {
  components: {
    fuiCountDown
  },
  data() {
    return {
      swiperList: ["ex_come.png", "wb.png", "wgb.png", "wf.png"],
      desc: [
        {
          t1: this.$t('welcome.t2'),
          t2: this.$t('welcome.t3')
        },
        {
          t1: this.$t('welcome.t4'),
          t2: this.$t('welcome.t5')
        },
        {
          t1: this.$t('welcome.t6'),
          t2: this.$t('welcome.t7')
        },
        {
          t1: this.$t('welcome.t8'),
          t2: this.$t('welcome.t9')
        }
      ],
      windowHeight: uni.getSystemInfoSync().windowHeight,
      isActive: 0,
      timer: 5,
      timeBox: true,
      countdown: true,
      timeTxt: "跳过"
    }
  },
  methods: {
    swiperChange(e) {
      this.isActive = e.detail.current;
      if (e.detail.current == this.swiperList.length - 1) {
        this.timeBox = true;
      }
    },
    end() {
      this.countdown = false;
      this.timeTxt = "跳过";
    },
    toHome() {
      uni.setStorageSync('app-init', 1);
      uni.switchTab({
        url: "/pages/newindex/newindex"
      })
    }
  }
}
</script>

<style lang="scss">
@import "welcome.scss";
</style>

<style scoped>
/deep/ .fui-count__down-colon,
/deep/ .fui-count__down-item {
  font-size: 26rpx !important;
  font-weight: 500;
}
</style>