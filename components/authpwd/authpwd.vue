<template>
	<view :data-theme="userTheme">
		<uni-popup ref="popup" type="bottom" :style="{width:$device.windowWidth+'px'}">
			<view class="popup-wrap">
                <view class="popup-wrap-title">
                    <text class="font-16 color-black font-weight">
                        {{ $t('login.t11') }}
                    </text>
                    <view class="close" @click="close()">
                        <fui-icon name="close" size="48" color="var(--black)"></fui-icon>
                    </view>
                </view>
                <view class="popup-wrap-content">
                    <view class="label">
                        <text class="font-13 color-black">
                            {{ $t('secrety.log_pwd') }}
                        </text>
                        <view class="label-input">
                            <input type="text"
                                   :password="eye"
                                   @input="inputPwd"
                                   :placeholder="$t('login.pwd_p')"
                                   placeholder-class="placeholder">
                            <fui-icon :name="eye ? 'visible' : 'invisible'"
                                      size="38"
                                      color="var(--color-text-dark-gray)"
                                      @click="eye=!eye">
                            </fui-icon>
                        </view>
                    </view>
                    <view class="button-box">
                        <fui-button heihgt="88rpx"
                                    radius="16rpx"
                                    bold
                                    size="26"
                                    :background="password.length >= 8 ? 'var(--blue)' : 'var(--color-gray-bg)'"
                                    :color="password.length >= 8 ? '#ffffff' : 'var(--color-text-dark-gray)'"
                                    :text="$t('hand.confirm_t')"
                                    @click="confirm()">
                        </fui-button>
                    </view>
                </view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
	export default {
		name:"authpwd",
		data() {
			return {
				eye:true,
				password:""
			};
		},
        computed: {
            ...mapGetters(['userTheme'])
        },
		methods:{
			confirm(){
				if(this.password.length < 8){
					return false;
				}
				uni.showLoading({});
				let _this = this;
				setTimeout(()=>{
					uni.hideLoading();
					_this.close();
					_this.$emit('callback',true);
				},1500);
			},
			inputPwd(e){
				this.password = e.detail.value;
			},
			open(){
				this.$refs.popup.open();
			},
			close(){
				this.$refs.popup.close();
			}
		}
	}
</script>

<style lang="scss" scoped>
.popup-wrap {
	width: 100%;
    height: auto;
	background-color: var(--white);
    border-radius: 30rpx 30rpx 0 0;

    &-title {
        width: 100%;
        height: 88rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .close {
            position: absolute;
            right: 30rpx;
        }
    }

    &-content {
        width: 100%;
        height: auto;
        padding: 30rpx;
        box-sizing: border-box;

        .label {
            width: 100%;
            height: auto;

            &-input {
                margin-top: 16rpx;
                width: 100%;
                height: 88rpx;
                border-radius: 16rpx;
                background: var(--color-gray-bg);
                padding: 0 20rpx;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;

                input {
                    width: calc(100% - 70rpx);
                    height: 100%;
                    font-size: 26rpx;
                    color: var(--black);
                }
            }
        }

        .button-box {
            width: 100%;
            height: 88rpx;
            margin-top: 50rpx;
        }
    }
}
</style>