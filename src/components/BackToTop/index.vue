<template>
  <el-tooltip placement="top" content="返回顶部">
    <transition :name="transitionName">
      <div v-show="visible" :style="customStyle" class="back-to-ceiling" @click="backToTop">
        <svg
          width="16"
          height="16"
          viewBox="0 0 17 17"
          xmlns="http://www.w3.org/2000/svg"
          class="Icon Icon--backToTopArrow"
          aria-hidden="true"
          style="height:16px;width:16px"
        >
          <path
            d="M12.036 15.59a1 1 0 0 1-.997.995H5.032a.996.996 0 0 1-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z"
          />
        </svg>
      </div>
    </transition>
  </el-tooltip>
</template>
<script>
export default {
  name: 'BackToTop',
  props: {
    customStyle: {
      type: Object,
      default: () => ({
        width: '40px',
        height: '40px',
        right: '50px',
        bottom: '50px',
        'border-radius': '4px',
        'line-height': '45px',
        background: '#e7eaf1'
      })
    },
    transitionName: {
      type: String,
      default: 'fade'
    },
    visibilityHeight: {
      type: Number,
      default: 400
    },
    backPosition: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    handleScroll() {
      this.visible = window.pageYOffset > this.visibilityHeight
    },
    backToTop() {
      if (this.isMoving) {
        return
      }
      const start = window.pageYOffset
      let i = 0
      this.isMoving = true
      this.interval = setInterval(() => {
        // start = start - 200
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
        if (next <= this.backPosition) {
          clearInterval(this.interval)
          window.scrollTo(0, this.backPosition)
          this.isMoving = false
        } else {
          // window.scrollTo(0, start)
          window.scrollTo(0, next)
        }
        i++
      }, 16.7)
    },
    easeInOutQuad(t, b, c, d) {
      // 0 2108 -2108 500
      // t = t/250 = 0  return -2108/2*0*0+2108 = 2108

      // 10 2108 -2108 500
      // t = t/250 = 0.04 return -2108/2*0.04*0.04+2108 = 2106.3136

      // 20 2108 -2108 500
      // t = t/250 = 0.08 return -2108/2*0.08*0.08+2108 = 2101.2544
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * (--t * (t - 2) - 1) + b
    }
  }
}
</script>
<style scoped>
.back-to-ceiling {
  position: fixed;
  text-align: center;
  cursor: pointer;
}

.back-to-ceiling:hover {
  background: #d5dbe7 !important;
}

.back-to-ceiling .Icon {
  fill: #9aaabf;
  background: none;
}
</style>
