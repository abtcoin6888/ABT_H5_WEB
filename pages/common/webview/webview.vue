<template>
    <view class="webview-page" :data-theme="userTheme">
        <fui-nav-bar background="var(--background-primary)"
                     color="var(--content-primary)"
                     statusBar
                     isFixed
                     isOccupy
                     :title="title"
                     @leftClick="$mroute.back()"
                     @init="navInit">
            <fui-icon name="arrowleft" size="56" color="var(--content-primary)"></fui-icon>
        </fui-nav-bar>
        <view class="container">
            <view class="container-rich" v-if="type == 1">
                <rich-text :nodes="nodes"></rich-text>
            </view>
            <view v-if="type == 2">
                <view class="status_bar"></view>
                <web-view
                    class="webview"
                    :fullscreen="true"
                    :style="{'height':$device.screenHeight-45+'px','width':'100%','margin-top':$device.statusBarHeight+54+'px'}"
                    :webview-styles="{'margin-top':$device.statusBarHeight+'px'}"
                    :src="params">
                </web-view>
            </view>
        </view>
    </view>
</template>

<script>
var type;
var params;
import commonApi from '/common/api/common.js';
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex';

export default {
    data() {
        return {
            title: "",
            nodes: "",
            type: 1,
            params: ''
        }
    },
    onLoad(e) {
        console.log(e.type)
        this.type = e.type;
        this.params = e.params;
        this.title = e.title ? e.title : ''
        this.getData();
    },
    onReady() {
        // const device = uni.getSystemInfoSync();
        // var wv = plus.webview.create(this.params, 'id', {
        //     // 'kernel': 'UIWebview',
        // 	'uni-app':'none',
        // 	top:device.statusBarHeight+44
        // });
        // wv.loadURL(this.params);
        // wv.setStyle({
        // 	height:750
        // });
        // var currentWebview = this.$scope.$getAppWebview();
        // currentWebview.append(wv);
        // console.log(wv.getStyle())
    },
    computed: {
        ...mapGetters(['userTheme']),
    },
    methods: {
        navInit(e) {
            console.log(e)
        },
        getData() {
            if (this.type == 1) {
                commonApi.articleDetail({key: this.params}).then(res => {
                    this.nodes = res.data.content;
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.webview-page {
    width: 100%;
    min-height: 100vh;
    background: var(--background-primary);
}

.container-rich {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;

    rich-text {
        background: var(--background-primary);

        img {
            width: 100% !important;
            margin: 30rpx 0;
        }

        p {
            margin-bottom: 20rpx;
            line-height: 36rpx;
            font-size: 26rpx;
            font-weight: normal;
            color: var(--content-primary);
        }
    }

    .webview {
        background: var(--background-primary);
    }
}
</style>
