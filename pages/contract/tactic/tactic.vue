<template>
    <view class="tactic-warp"
          :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     zIndex="9"
                     :title="navTitle"
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     @init="navInit"
                     @left-click="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">
            </fui-icon>
        </fui-nav-bar>
        <view class="tactic-container"
              :style="`height: ${containerHeight}px`">
            <!--   总览  -->
            <over-view v-if="barActive === 0"></over-view>
            <!--   创建策略  -->
            <create-policy v-if="barActive === 1"></create-policy>
            <!--   我的策略  -->
            <my-strategy v-if="barActive === 2"></my-strategy>
        </view>
        <view class="footer-bar"
              id="toggleBar">
            <view class="bar-item"
                  :class="{'bar-active': barActive === index}"
                  v-for="(item,index) in footerBar"
                  :key="index"
                  @click="barActive = index">
                <image v-if="barActive != index"
                       :src="`/static/img/tactic/${item.src}`"
                       mode="widthFix">
                </image>
                <image v-else
                       :src="`/static/img/tactic/${userTheme == 'light' ? item.selected_light : item.selected_dark}`"
                       mode="widthFix">
                </image>
                <text>{{ item.text }}</text>
            </view>
        </view>
        <tactic-popup :visible="visible"
                      @close="visible = false">
        </tactic-popup>
    </view>
</template>
<script>
import {
    mapGetters
} from 'vuex';
import strategy from "@/common/api/strategy.js"

import overView from "@/pages/contract/tactic/overview/overview.vue"
import createPolicy from "@/pages/contract/tactic/createPolicy/createPolicy.vue";
import myStrategy from "@/pages/contract/tactic/myStrategy/myStrategy.vue";
import tacticPopup from "@/components/tacticPopup/tacticPopup.vue";

export default {
    components: {
        overView,
        createPolicy,
        myStrategy,
        tacticPopup,
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    onLoad(option) {
        if (option.barActive) {
            this.barActive = parseInt(option.barActive)
        } else {
            this.visible = false;
        }
    },
    onShow() {
        this.getType()
    },
    data() {
        return {
            navHeight: "",
            toggleBarHeight: "",
            containerHeight: "",
            navTitle: this.$t('strategy.t41'),
            footerBar: [{
                src: "zl-n.webp",
                selected_light: "zl-s-light.webp",
                selected_dark: "zl-s-dark.webp",
                text: this.$t('strategy.t44')
            }, {
                src: "cjcl-n.webp",
                selected_light: "cjcl-s-light.webp",
                selected_dark: "cjcl-s-dark.webp",
                text: this.$t('strategy.t42')
            }, {
                src: "wdcl-n.webp",
                selected_light: "wdcl-s-light.webp",
                selected_dark: "wdcl-s-dark.webp",
                text: this.$t('strategy.t43')
            }],
            barActive: 0,
            visible: false
        }
    },
    watch: {
        barActive(value) {
            switch (value) {
                case 0:
                    this.navTitle = this.$t('strategy.t41');
                    break;
                case 1:
                    this.navTitle = this.$t('strategy.t42');
                    break;
                case 2:
                    this.navTitle = this.$t('strategy.t43');
                    break;
            }
        }
    },
    mounted() {
        this.getElementHeight();
    },
    methods: {
        navInit(e) {
            this.navHeight = e.height + e.statusBarHeight;
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            this.containerHeight = windowHeight - this.navHeight - this.toggleBarHeight;
        },
        getElementHeight() {
            const query = uni.createSelectorQuery().in(this);
            query.select(`#toggleBar`).boundingClientRect(data => {
                this.toggleBarHeight = data.height;
            }).exec();
        },
        async getType() {
            let res = await strategy.type()
            uni.setStorageSync('strategyType', res.data)
        }
    }
}
</script>
<style lang="scss"
       scoped>
@import "tactic";
</style>