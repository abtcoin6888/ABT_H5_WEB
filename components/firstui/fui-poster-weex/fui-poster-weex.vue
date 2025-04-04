
<template>
	<gcanvas class="fui-poster__canvas" :ref="canvasId" :style="{ width: w + 'px', height: h + 'px'  }">
	</gcanvas>
</template>

<script>
	/*!
	 * 生成海报
	 * nvue端专用，需真机运行查看效果，其他端请使用fui-poster组件
	 * poster - v1.0.0 (2021/7/19, 16:52:14 PM)
	 *
	 * 官网地址：https://firstui.cn/
	 * 文档地址：https://doc.firstui.cn/
	 */
	import {
		enable,
		WeexBridge
	} from './gcanvas/index.js';
	export default {
		name: "fui-poster-weex",
		emits: ['ready'],
		props: {
			//画布宽度，单位rpx
			width: {
				type: [Number, String],
				default: 750
			},
			//画布高度，单位rpx
			height: {
				type: [Number, String],
				default: 1024
			},
			//像素比率，缩放比
			pixelRatio: {
				type: [Number, String],
				default: 2
			}
		},
		data() {
			//如果小程序端无法识别，则使用固定值
			const canvasId = `fui_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				canvasId,
				w: 750,
				h: 1024
			};
		},
		watch: {
			width(val) {
				this.w = this._toPx(val)
			},
			height(val) {
				this.h = this._toPx(val)
			}
		},
		created() {
			this.context = null;
			this.w = this._toPx(this.width)
			this.h = this._toPx(this.height)
		},
		mounted() {
			this.$nextTick(() => {
				let ganvas = this.$refs[this.canvasId];
				/*通过元素引用获取canvas对象*/
				let canvasObj = enable(ganvas, {
					bridge: WeexBridge
				});
				/*获取绘图所需的上下文，暂不支持3d*/
				this.context = canvasObj.getContext('2d');
				setTimeout(() => {
					this.$emit('ready')
				}, 50)
			})
		},
		methods: {
			_toPx(rpx) {
				return uni.upx2px(Number(rpx) * Number(this.pixelRatio))
			},
			_getTextWidth(context, text, fontSize) {
				//measureText首次获取可能为空对象，.width为undefined
				let width;// = context.measureText(text).width;
				if (!width && width !== 0) {
					let sum = 0;
					for (let i = 0, len = text.length; i < len; i++) {
						if (text.charCodeAt(i) >= 0 && text.charCodeAt(i) <= 255)
							sum = sum + 1;
						else
							sum = sum + 2;
					}
					width = sum / 2 * this._toPx(fontSize)
				}

				return width
			},
			//canvas文字换行，rows=-1则不限制行数
			_wrapText(text, fontSize, textWidth, width, context, rows = 2) {
				let textArr = [];
				if (textWidth > width) {
					let fillText = '';
					let lines = 1;
					let arr = text.split('')
					for (let i = 0, len = arr.length; i < len; i++) {
						fillText = fillText + arr[i];
						if (this._getTextWidth(context, fillText, fontSize) >= width) {
							if (lines === rows && rows !== -1) {
								if (i !== arr.length - 1) {
									fillText = fillText.substring(0, fillText.length - 1) + '...';
								}
								textArr.push(fillText);
								break;
							}
							textArr.push(fillText);
							fillText = '';
							lines++;
						} else if (i === arr.length - 1) {
							textArr.push(fillText);
						}
					}
				} else {
					textArr.push(text)
				}
				return textArr;
			},
			_drawText(context, params) {
				let {
					x,
					y,
					fontSize,
					color,
					baseLine = 'normal',
					textAlign = 'left',
					frontText,
					frontSize,
					spacing, //单位rpx
					text,
					opacity = 1,
					lineThrough = false,
					width, //单位rpx
					rows = 1,
					lineHeight = 0,
					fontWeight = 'normal',
					fontStyle = 'normal',
					fontFamily = "sans-serif"
				} = params;
				const ratio = this.pixelRatio === 1 ? 2 : this.pixelRatio;
				context.save();
				context.beginPath();
				context.font = fontStyle + " " + fontWeight + " " + this._toPx(fontSize) + "px " + fontFamily
				context.setGlobalAlpha(opacity);
				context.setFontSize(this._toPx(fontSize));
				context.setFillStyle(color);
				context.setTextBaseline(baseLine);
				context.setTextAlign(textAlign);
				let textWidth = this._getTextWidth(context, text, fontSize);
				width = this._toPx(width);
				let textArr = this._wrapText(text, fontSize, textWidth, width, context, rows)
				//如果文本前面有其他文本内容
				if (frontText) {
					context.setFontSize(this._toPx(frontSize));
					x = this._getTextWidth(context, frontText, frontSize) + this._toPx(x + spacing);
					context.setFontSize(this._toPx(fontSize));
				} else {
					x = this._toPx(x)
				}
				textArr.forEach((item, index) => {
					context.fillText(item, x, this._toPx(y + (lineHeight || fontSize) * index))
				})
				context.restore();
				if (lineThrough) {
					let lineY = y;
					// 根据baseLine的不同对贯穿线的Y坐标做相应调整
					switch (baseLine) {
						case 'top':
							lineY += fontSize / 2 + 5;
							break;
						case 'middle':
							break;
						case 'bottom':
							lineY -= fontSize / 2 + 5;
							break;
						default:
							lineY -= fontSize / 2 - 5;
							break;
					}
					context.save();
					context.moveTo(x, this._toPx(lineY));
					context.lineTo(x + textWidth + 2, this._toPx(lineY));
					context.setStrokeStyle(color);
					context.stroke();
					context.restore();
				}
			},
			_drawRadiusRect(context, params) {
				let {
					x,
					y,
					width,
					height,
					borderRadius
				} = params;
				let r = this._toPx(borderRadius / 2);

				x = this._toPx(x)
				y = this._toPx(y)
				width = this._toPx(width)
				height = this._toPx(height)

				context.beginPath();
				context.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
				context.moveTo(x + r, y);
				context.lineTo(x + width - r, y);
				context.lineTo(x + width, y + r);

				context.arc(x + width - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
				context.lineTo(x + width, y + height - r);
				context.lineTo(x + width - r, y + height);

				context.arc(x + width - r, y + height - r, r, 0, Math.PI * 0.5);
				context.lineTo(x + r, y + height);
				context.lineTo(x, y + height - r);

				context.arc(x + r, y + height - r, r, Math.PI * 0.5, Math.PI);
				context.lineTo(x, y + r);
				context.lineTo(x + r, y);
			},
			_drawImage(context, params) {
				let {
					imgResource,
					x,
					y,
					width,
					height,
					sx,
					sy,
					sw,
					sh,
					borderRadius = 0,
					borderWidth = 0,
					borderColor
				} = params;
				context.save();
				if (borderRadius > 0) {
					this._drawRadiusRect(context, params);
					context.strokeStyle = 'rgba(255,255,255,0)';
					context.stroke();
					context.clip();
				}
				if (sw && sh) {
					//根据画布的宽高计算出图片绘制的大小，可保证图片绘制不变形
					//暂时未使用此api，后期如果有需要再进行优化
					context.drawImage(imgResource, this._toPx(sx), this._toPx(sy), this._toPx(sw), this._toPx(sh),
						this._toPx(x), this._toPx(y), this._toPx(width), this._toPx(height));
				} else {
					context.drawImage(imgResource, this._toPx(x), this._toPx(y), this._toPx(width), this._toPx(
						height))
				}

				if (borderWidth > 0) {
					context.setStrokeStyle(borderColor);
					context.setLineWidth(this._toPx(borderWidth));
					context.stroke();
				}
				context.restore();
			},
			_drawBlock(context, params) {
				let {
					width,
					height,
					x,
					y,
					borderWidth,
					backgroundColor,
					gradientColor,
					gradientType = 1,
					borderColor,
					borderRadius = 0,
					opacity = 1
				} = params;
				if (backgroundColor) {
					context.save();
					context.setGlobalAlpha(opacity);
					if (gradientColor) {
						let grd = null;
						if (gradientType == 1) {
							//从上到下
							grd = context.createLinearGradient(0, 0, this._toPx(width), this._toPx(height))
						} else {
							//从左到右
							grd = context.createLinearGradient(0, this._toPx(width), this._toPx(height), 0)
						}
						grd.addColorStop(0, backgroundColor)
						grd.addColorStop(1, gradientColor)
						// Fill with gradient
						context.setFillStyle(grd);
					} else {
						context.setFillStyle(backgroundColor);
					}

					//nvue不支持setShadow

					if (borderRadius > 0) {
						// 画圆角矩形
						this._drawRadiusRect(context, params);
						context.fill();
					} else {
						context.fillRect(this._toPx(x), this._toPx(y), this._toPx(width), this._toPx(height));
					}
					context.restore();
				}
				if (borderWidth) {
					// 画线
					context.save();
					context.setGlobalAlpha(opacity);
					context.setStrokeStyle(borderColor);
					context.setLineWidth(this._toPx(borderWidth));
					if (borderRadius > 0) {
						// 画圆角矩形边框
						this._drawRadiusRect(context, params);
						context.stroke();
					} else {
						context.strokeRect(this._toPx(x), this._toPx(y), this._toPx(width), this._toPx(height));
					}
					context.restore();
				}

			},
			_drawLine(context, params) {
				let {
					x,
					y,
					endX,
					endY,
					color,
					width
				} = params;
				context.save();
				context.beginPath();
				context.setStrokeStyle(color);
				context.setLineWidth(this._toPx(width));
				context.moveTo(this._toPx(x), this._toPx(y));
				context.lineTo(this._toPx(endX), this._toPx(endY));
				context.stroke();
				context.closePath();
				context.restore();
			},
			//ios用户拒绝相册访问 ，引导用户到设置页面，开启相册访问权限
			//-1=未请求  1 = 已允许，0 = 拒绝|受限
			_judgeIosPermissionPhotoLibrary() {
				var result = 0;
				var PHPhotoLibrary = plus.ios.import("PHPhotoLibrary");
				var authStatus = PHPhotoLibrary.authorizationStatus();
				if (authStatus === 0) {
					result = -1;
				} else if (authStatus == 3) {
					result = 1;
					console.log("相册权限已经开启");
				} else {
					result = 0;
					console.log("相册权限没有开启");
				}
				plus.ios.deleteObject(PHPhotoLibrary);
				return result;
			},
			// Android权限查询
			_requestAndroidPermission(permissionID) {
				return new Promise((resolve, reject) => {
					plus.android.requestPermissions(
						// 理论上支持多个权限同时查询，本函数封装只处理了一个权限的情况。有需要的可自行扩展封装
						[permissionID],
						function(resultObj) {
							var result = 0;
							for (var i = 0; i < resultObj.granted.length; i++) {
								var grantedPermission = resultObj.granted[i];
								console.log('已获取的权限：' + grantedPermission);
								result = 1
							}
							for (var i = 0; i < resultObj.deniedPresent.length; i++) {
								var deniedPresentPermission = resultObj.deniedPresent[i];
								console.log('拒绝本次申请的权限：' + deniedPresentPermission);
								result = 0
							}
							for (var i = 0; i < resultObj.deniedAlways.length; i++) {
								var deniedAlwaysPermission = resultObj.deniedAlways[i];
								console.log('永久拒绝申请的权限：' + deniedAlwaysPermission);
								result = -1
							}
							resolve(result);
							// 若所需权限被拒绝,则打开APP设置界面,可以在APP设置界面打开相应权限
						},
						function(error) {
							console.log('申请权限错误：' + error.code + " = " + error.message);
							resolve({
								code: error.code,
								message: error.message
							});
						}
					);
				});
			},
			// 跳转到**应用**的权限页面
			_gotoAppPermissionSetting(isAndroid) {
				if (!isAndroid) {
					var UIApplication = plus.ios.import("UIApplication");
					var application2 = UIApplication.sharedApplication();
					var NSURL2 = plus.ios.import("NSURL");
					// var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");
					var setting2 = NSURL2.URLWithString("app-settings:");
					application2.openURL(setting2);

					plus.ios.deleteObject(setting2);
					plus.ios.deleteObject(NSURL2);
					plus.ios.deleteObject(application2);
				} else {
					// console.log(plus.device.vendor);
					var Intent = plus.android.importClass("android.content.Intent");
					var Settings = plus.android.importClass("android.provider.Settings");
					var Uri = plus.android.importClass("android.net.Uri");
					var mainActivity = plus.android.runtimeMainActivity();
					var intent = new Intent();
					intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
					var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
					intent.setData(uri);
					mainActivity.startActivity(intent);
				}
			},
			_modal: function(callback, confirmColor, confirmText) {
				uni.showModal({
					title: '提示',
					content: '您还没有开启相册权限，是否立即设置？',
					showCancel: true,
					cancelColor: '#B2B2B2',
					confirmColor: confirmColor || "#181818",
					confirmText: confirmText || "确定",
					success(res) {
						if (res.confirm) {
							callback && callback(true)
						} else {
							callback && callback(false)
						}
					}
				})
			},
			//相册权限查询，如果没有权限则提示打开设置页面
			_judgePermissionPhotoLibrary: async function(callback) {
				const res = uni.getSystemInfoSync();
				let result;
				let isAndroid = res.platform.toLocaleLowerCase() == "android";
				if (isAndroid) {
					result = await this._requestAndroidPermission('android.permission.WRITE_EXTERNAL_STORAGE')
				} else {
					result = this._judgeIosPermissionPhotoLibrary()
				}
				if (result == 1) {
					callback && callback(true)
				} else {
					if (!(!isAndroid && result == -1)) {
						this._modal((res) => {
							if (res) {
								this._gotoAppPermissionSetting(isAndroid)
							}
						})
					} else {
						callback && callback(true)
					}
				}
			},
			_getPosterData(texts, blocks, lines, imgs) {
				let queue = [].concat(texts.map((item) => {
					item.type = 'text';
					item.zIndex = item.zIndex || 0;
					return item;
				})).concat(blocks.map((item) => {
					item.type = 'block';
					item.zIndex = item.zIndex || 0;
					return item;
				})).concat(lines.map((item) => {
					item.type = 'line';
					item.zIndex = item.zIndex || 0;
					return item;
				})).concat(imgs.map((item) => {
					item.type = 'image';
					item.zIndex = item.zIndex || 0;
					return item;
				}));
				// 按照顺序排序
				queue.sort((a, b) => a.zIndex - b.zIndex);
				return queue;
			},
			_getImage(url) {
				return new Promise((resolve, reject) => {
					uni.downloadFile({
						url: url,
						success: res => {
							resolve(res.tempFilePath);
						},
						fail: res => {
							reject(false)
						}
					})
				})
			},
			_getImagebyBase64(base64) {
				//使用前先查看支持平台
				const uniqueId = `fui_${Math.ceil(Math.random() * 10e5).toString(36)}`
				return new Promise((resolve, reject) => {
					let bitmap = new plus.nativeObj.Bitmap(uniqueId);
					bitmap.loadBase64Data(base64, function() {
						//console.log("加载Base64图片数据成功");
						bitmap.save(`_doc/${uniqueId}.png`, {}, function(e) {
							//console.log('保存图片成功：' + JSON.stringify(i));
							let target = e.target; // 保存后的图片url路径，以"file://"开头
							resolve(target);
						}, function(e) {
							console.log('保存图片失败：' + JSON.stringify(e));
							reject(false)
						});
					}, function() {
						console.log('加载Base64图片数据失败：' + JSON.stringify(e));
						reject(false)
					});
				})
			},
			_generatePoster(cw, ch, queue, callback) {
				const context = this.context;
				if (context) {
					context.clearRect(0, 0, this._toPx(cw), this._toPx(ch))
					queue.forEach((params) => {
						if (params.type === 'image') {
							this._drawImage(context, params)
						} else if (params.type === 'text') {
							this._drawText(context, params)
						} else if (params.type === 'block') {
							this._drawBlock(context, params)
						} else if (params.type === 'line') {
							this._drawLine(context, params)
						}
					});
					const sys = uni.getSystemInfoSync();
					let time = 100;
					if (sys.platform === 'android') {
						time = 300;
					}
					context.draw(false, () => {
						const ratio = sys.pixelRatio === 1 ? 2 : sys.pixelRatio;
						setTimeout(() => {
							context.toTempFilePath(
								0,
								0,
								this.w * ratio,
								this.h * ratio,
								this.w * ratio,
								this.h * ratio,
								"png",
								1,
								function(res) {
									callback && callback(res.tempFilePath)
								}
							)
						}, time)
					})
				} else {
					callback && callback(false)
				}
			},
			//生成海报
			generatePoster(params, callback) {
				let {
					texts = [], imgs = [], blocks = [], lines = []
				} = params;
				//需要看平台支持情况，如果对应平台不支持将会绘制失败
				//图片处理 type：1-无需处理（base64或者网络路径，需在平台支持下），2-网络图片，下载 3-base64转本地图片
				if (imgs.length > 0) {
					let funcArr = []
					let idxArr = []
					imgs.forEach((item, index) => {
						if (item.type == 2) {
							funcArr.push(this._getImage(item.imgResource))
							idxArr.push(index)
						}
						// #ifdef APP-PLUS || H5 || MP-WEIXIN
						if (item.type == 3) {
							funcArr.push(this._getImagebyBase64(item.imgResource))
							idxArr.push(index)
						}
						// #endif
					})
					if (funcArr.length > 0) {
						Promise.all(funcArr).then(res => {
							res.forEach((imgRes, idx) => {
								let item = imgs[idxArr[idx]]
								item.imgResource = imgRes
							})
							const queue = this._getPosterData(texts, blocks, lines, imgs);
							this._generatePoster(this.width, this.height, queue, callback)

						}).catch(err => {
							console.log(err)
							uni.showToast({
								title: '图片资源处理失败',
								icon: 'none'
							})
						})
					} else {
						const queue = this._getPosterData(texts, blocks, lines, imgs);
						this._generatePoster(this.width, this.height, queue, callback)
					}
				} else {
					const queue = this._getPosterData(texts, blocks, lines, imgs);
					this._generatePoster(this.width, this.height, queue, callback)
				}
			},
			// 将海报图片保存到本地
			saveImage(filePath) {
				//检查是否授权相册权限
				this._judgePermissionPhotoLibrary((res) => {
					//保存图片
					if (res) {
						uni.saveImageToPhotosAlbum({
							filePath: filePath,
							success(res) {
								uni.showToast({
									title: '图片保存成功',
									icon: 'none'
								})
							},
							fail(res) {
								uni.showToast({
									title: '图片保存失败',
									icon: 'none'
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.fui-poster__canvas {
		position: fixed;
		left: -6666px;
		bottom: 0;
	}
</style>