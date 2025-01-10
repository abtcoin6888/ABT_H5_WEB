<template>
    <view :data-theme="userTheme">
        <uni-popup ref="alertDialog" type="dialog">
            <uni-popup-dialog type="success"
                              :cancelText="cancelText"
                              :confirmText="confirmText"
                              :title="title"
                              :content="content"
                              @confirm="dialogConfirm"
                              @close="dialogClose">
            </uni-popup-dialog>
        </uni-popup>
    </view>
</template>

<script>
export default {
    name: "alert",
    props: {
        ctxt: {
            type: String,
            default: ""
        },
        ftxt: {
            type: String,
            default: "确定"
        },
        content: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        }
    },
    data() {
        return {};
    },
    computed: {
        // title() {
        //     return this.$t('rec.t19');
        // },
        cancelText() {
            if (this.ctxt === "取消") {
                return this.$t('取消')
            } else {
                return this.ctxt;
            }
        },
        confirmText() {
            if (this.ftxt === "确定") {
                return this.$t('确定')
            } else {
                return this.ftxt;
            }
        }
    },
    methods: {
        dialogConfirm() {
            this.$emit('confirm', true);
            this.close();
        },
        dialogClose() {
            this.$emit('cancel', true);
            this.close();
        },
        open() {
            this.$refs.alertDialog.open();
        },
        close() {
            this.$refs.alertDialog.close();
        }
    }
}
</script>

<style lang="scss" scoped>
:deep(.uni-popup) {
    .uni-popup-dialog {
        background: var(--background-primary);
    }

    .uni-dialog-title {
        padding-top: 34rpx;

        &-text {
            color: var(--content-primary);
            font-size: 32rpx;
        }
    }

    .uni-dialog-content-text {
        color: var(--content-tertiary);
        font-size: 26rpx;
    }

    .uni-dialog-button-group {
        border-color: var(--border-strength-100);

        .uni-border-left {
            border-color: var(--border-strength-100);
        }

        .uni-dialog-button {
            &:nth-of-type(1){
                .uni-dialog-button-text {
                    color: var(--content-tertiary);
                }
            }

            &:nth-of-type(2),
            &:last-of-type {
                .uni-dialog-button-text {
                    color: var(--color-primary);
                }
            }
        }
    }
}
</style>