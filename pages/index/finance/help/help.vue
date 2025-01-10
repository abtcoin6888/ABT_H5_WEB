<template>
    <view class="help" :data-theme="userTheme">
        <fui-nav-bar isFixed
                     isOccupy
                     statusBar
                     background="var(--background-primary)"
                     color="var(--content-primary)"
                     :title="$t('follow.help_lc')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="container">
            <fui-collapse>
                <fui-collapse-item borderColor="var(--background-primary)"
                                   arrowColor="var(--content-primary)"
                                   contentBg="var(--background-primary)"
                                   background="var(--background-primary)"
                                   :isBorder="false"
                                   :index="index"
                                   :open="item.isOpen"
                                   v-for="(item,index) in items"
                                   :key="index">
                    <view class="collapse-title">
                        <text class="font-14 color-black font-weight">
                            {{ item.title }}
                        </text>
                    </view>
                    <template v-slot:content>
                        <view class="collapse-descr">
                            <text class="font-13 color-gray">
                                {{ item.descr }}
                            </text>
                        </view>
                    </template>
                </fui-collapse-item>
            </fui-collapse>
        </view>
    </view>
</template>

<script>
import {mapGetters} from 'vuex';
import fuiNavBar from "@/components/firstui/fui-nav-bar/fui-nav-bar.vue";

export default {
    components: {
        fuiNavBar
    },
    data() {
        return {
            items: [{
                title: this.$t('follow.help_c10'),
                descr: this.$t('follow.help_c11'),
                isOpen: true,
            }, {
                title: this.$t('follow.help_c12'),
                descr: this.$t('follow.help_c13'),
                isOpen: true,
            }]
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
.help {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    .container {
        width: 100%;
        height: auto;
        padding: 30rpx;
        box-sizing: border-box;
    }
}
</style>

<style scoped>
/deep/.fui-collapse-item__title {
    height: 88rpx;
}

/deep/.fui-collapse__content {
    padding: 30rpx 0;
    box-sizing: border-box;
}
</style>
