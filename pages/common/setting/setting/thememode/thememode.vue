<template>
    <view class="themeMode" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     background="var(--background-primary)"
                     color="var(--color-title-black)"
                     :title="$t('common.them')"
                     @leftClick="$mroute.back()">
            <fui-icon name="arrowleft"
                      size="56"
                      color="var(--content-primary)">

            </fui-icon>
        </fui-nav-bar>
        <view class="theme-list">
            <view class="theme-list-item"
                  v-for="(item, index) in themeGroup" :key="index"
                  @click="themeChange(item, index)">
                <text class="font-14 color-black">
                    {{ item.name }}
                </text>
                <image v-if="selectIndex == index"
                       src="/static/img/tactic/check-select.png"
                       mode="widthFix">
                </image>
            </view>
        </view>
    </view>
</template>
<script>
import {
    mapGetters,
    mapMutations
} from 'vuex';
import {
    backTopProps
} from 'vant';

export default {
    data() {
        return {
            themeGroup: [{
                name: this.$t('common.light'),
                themeType: 'light'
            },
                {
                    name: this.$t('common.dark'),
                    themeType: 'dark'
                }
            ],
            selectIndex: 0
        };
    },
    computed: {
        ...mapGetters(['userTheme', 'userThemeIndex'])
    },
    created() {
        switch (this.userTheme) {
            case 'light':
                this.selectIndex = 0;
                break;
            case 'dark':
                this.selectIndex = 1;
                break;
        }

    },
    methods: {
        themeChange(item, index) {
            this.selectIndex = index;
            this.toggleUserTheme(item.themeType)
            // this.toggleUserTheme(item.themeType, index);
            uni.setStorageSync('mthem', item.themeType);
            // console.log('mthem',item.themeType);
            // #ifdef APP-PLUS
            plus.runtime.restart();
            // #endif
        },
    }
};
</script>

<style lang="scss" scoped>
.themeMode {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);

    .theme-list {
        width: 100%;

        &-item {
            width: 100%;
            height: 96rpx;
            padding: 0 30rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;

            image {
                width: 30rpx;
            }
        }
    }
}
</style>