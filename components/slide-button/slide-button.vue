<template>
  <view class="slide-button light" :style="{
      'width': width + 'rpx',
			'height': height + 'rpx',
			'padding': padding + 'rpx',
			'border-radius': radius + 'rpx',
			'background': background
		}">
    <view class="slide-btn-box" v-for="(name,index) in options" :key="index"
          :style="{
                'width': (width / options.length - (padding*2)) + 'rpx',
                'height': (height - (padding*2)) + 'rpx'
              }"
          @click="switchChange(name,index,$event)">
      <text ref="context" class="context" :style="{
                'color': current === index ? activeColor : color,
                'font-size': size + 'rpx',
                'font-weight': current === index ? fontWeight : 500
            }">
        {{ (name &&name.symbol) ? name.symbol : name }}
      </text>
    </view>
    <view class="slide-move-block" :style="{
				'width': (width / options.length - (padding*2)) + 'rpx',
				'height': (height - (padding*2)) + 'rpx',
				'border-radius': radius + 'rpx',
				'--translateX': padding + 'rpx',
				'left': ((width / options.length) * current) + 'rpx',
				'background': slideBackground
			}">
    </view>
  </view>
</template>

<script>
export default {
  name: "slide-button",
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    width: {
      type: [Number, String],
      default: ''
    },
    height: {
      type: [Number, String],
      default: 68
    },
    padding: {
      type: [Number, String],
      default: 8
    },
    activeColor: {
      type: String,
      default: 'var(--color-title-black)'
    },
    background: {
      type: String,
      default: 'var(--color-gray-bg)'
    },
    slideBackground: {
      type: String,
      default: 'var(--white)'
    },
    fontWeight: {
      type: [Number, String],
      default: 500
    },
    color: {
      type: String,
      default: 'var(--color-text-dark-gray)'
    },
    size: {
      type: [Number, String],
      default: 26
    },
    radius: {
      type: [Number, String],
      default: 10
    },
    current: {
      type: Number,
      default: 0
    },
	keys:{
		type:String,
		default:"symbol"
	}
  },
  methods: {
    switchChange(name, index, e) {
      if (this.current == index) return;
      this.$emit('change', {
        index,
        name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 1;

  .slide-move-block {
    position: absolute;
    transform: translateX(var(--translateX));
    z-index: 1;
    transition: all 0.25s;
  }

  .slide-btn-box {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s;

    .context {
      font-size: 26rpx;
    }
  }
}
</style>