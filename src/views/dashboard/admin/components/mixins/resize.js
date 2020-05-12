import { debounce } from '@/utils'

// const chartResize = debounce(function() {
//   if (this.chart) {
//     this.chart.resize()
//   }
// }, 400)

export default {
  data() {
    return {
      $_sidebarElm: null
    }
  },
  mounted() {
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  beforeDestroy() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  // to fixed bug when cached by keep-alive
  // https://github.com/PanJiaChen/vue-element-admin/issues/2116
  activated() {
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  deactivated() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  methods: {
    $_resizeHandler() {
      // 缺陷：没有防抖动
      // if (this.chart) {
      //   this.chart.resize()
      // }

      // 缺陷：每次调用这个$_resizeHandler，debounce(fn, 100)都会产生一个新的函数
      return debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 400)()

      // chartResize生成一个固定的函数（函数指针不变），并用call或者apply把当前this给chartResize
      // chartResize.call(this)
    },
    $_initResizeEvent() {
      window.addEventListener('resize', this.$_resizeHandler)
    },
    $_destroyResizeEvent() {
      window.removeEventListener('resize', this.$_resizeHandler)
    },
    $_sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.$_resizeHandler()
      }
    },
    $_initSidebarResizeEvent() {
      this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    $_destroySidebarResizeEvent() {
      this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    }
  }
}
