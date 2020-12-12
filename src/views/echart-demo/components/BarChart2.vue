<template>
  <div style="position: relative">
    <div :class="className" :style="{height:height,width:width}" />
    <div class="left" ref="leftContainer">
      <!-- <div class="left-index" v-for="(item, index) in sourceName">{{index + 1}}</div> -->
      <div class="left-container scroll-container" v-for="(item, index) in sourceName">
        <div class="left-index">{{index+1}}</div>
        <div class="left-item">
          <span>{{item}}</span>
        </div>
      </div>
      <!-- <div>上海青浦营业部1上海青浦营业部1上海青浦营业部1</div>
      <div>上海青浦营业部2上海青浦营业部2上海青浦营业部2</div>
      <div>上海青浦营业部3上海青浦营业部3上海青浦营业部3</div>
      <div>上海青浦营业部4</div>
      <div>上海青浦营业部5</div>
      <div>上海青浦营业部6</div>
      <div>上海青浦营业部7</div>
      <div>上海青浦营业部8</div>
      <div>上海青浦营业部9</div>
      <div>上海青浦营业部10上海青浦营业部10上海青浦营业部10</div>-->
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

const BAR_COLORS = ['#08A895', '#045EC4', '#4732B8']
const SOURCE_NAME = [
  // '上海青浦营业部上海青浦营业营业营业',
  '上海青浦营业部---1---2---3---4---5---6---7---8---9---0',
  '上海青浦营业部2上海青浦营业部2上海青浦营业部2',
  '上海青浦营业部3上海青浦营业部3上海青浦营业部3',
  '上海青浦营业部4',
  '上海青浦营业部5',
  '上海青浦营业部6',
  '上海青浦营业部7',
  '上海青浦营业部8',
  '上海青浦营业部9',
  '上海青浦营业部10上海青浦营业部10上海青浦营业部10'
]

// require('echarts/theme/macarons') // echarts theme

export default {
  name: 'BarChart2',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      sourceName: SOURCE_NAME,
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initTitle()
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.disspose()
    this.chart = null
  },
  methods: {
    initTitle() {
      // console.log(this.$refs.leftContainer.children)
      const childList = this.$refs.leftContainer.children
      const length = childList.length
      for (let i = 0; i < length; i++) {
        const $el_inner = childList[i].children[1].children[0]
        const $el_outer = childList[i]
        // console.log($el.scrollWidth, childList[i].offsetWidth)
        if ($el_inner.scrollWidth > $el_outer.offsetWidth) {
          let speed = 100
          let ml = 0
          let distance = $el_inner.scrollWidth - $el_outer.offsetWidth + 35 // 额外向左滚动 px
          // console.log(childList[i])
          // console.log(childList[i].children[1])
          // console.log(childList[i].children[1].children[0])
          let that = this
          function Marquee() {
            if (ml < distance) {
              ml++
              $el_inner.style.marginLeft = '-' + ml + 'px'
            } else if (ml < distance + 10) { // 到头后停顿N个周期
              ml++
              $el_inner.style.marginLeft = 0
            } else {
              ml = 0
            }
          }

          let inter = setInterval(Marquee, speed)
          // console.log(this.leftDistance)
          $el_outer.onmouseover = function () {
            clearInterval(inter)
          }
          $el_outer.onmouseout = function () {
            inter = setInterval(Marquee, speed)
          }
        }
      }

      // elem.scrollWidth > elem.offsetWidth
    },
    initChart() {
      this.chart = echarts.init(this.$el.children[0])

      this.chart.setOption({
        backgroundColor: '#0E1A3A',
        tooltip: {
          show: true,
          textStyle: {
            fontSize: 16
          }
        },
        grid: {
          top: 20,
          bottom: 20,
          left: 330,
          right: 300
        },
        xAxis: {
          type: 'value',
          show: false
          // splitLine: {
          //   show: false,
          // },
          // axisLabel: {
          //   show: false,
          // },
          // axisTick: {
          //   show: false,
          // },
          // axisLine: {
          //   show: false,
          // },
        },
        yAxis: {
          // z: 12,
          show: false,
          type: 'category',
          inverse: true,
          triggerEvent: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisPointer: {
            label: {
              show: true,
              margin: 100
            }
          },
          axisLabel: {
            margin: 300, // 刻度标签与轴线之间的距离
            // fontSize: 16,
            align: 'left',
            formatter: function (value, index) {
              index += 1
              console.log(value, index)
              if (index < 4) {
                return [
                  '{nt' +
                  index +
                  '|' +
                  index +
                  '}' +
                  '  {title' +
                  index +
                  '|' +
                  value +
                  '}',
                ].join('\n')
              } else {
                return ['{nt|' + index + '}' + '  {title|' + value + '}'].join(
                  '\n'
                )
              }
            },
            rich: {
              nt1: {
                fontSize: 16,
                color: '#fff',
                backgroundColor: BAR_COLORS[0],
                width: 24,
                height: 24,
                align: 'center',
                borderRadius: 24
              },
              nt2: {
                fontSize: 16,
                color: '#fff',
                backgroundColor: BAR_COLORS[1],
                width: 24,
                height: 24,
                align: 'center',
                borderRadius: 24
              },
              nt3: {
                fontSize: 16,
                color: '#fff',
                backgroundColor: BAR_COLORS[2],
                width: 24,
                height: 24,
                align: 'center',
                borderRadius: 24
              },
              nt: {
                fontSize: 16,
                color: '#fff',
                // backgroundColor: 'transparent',
                width: 24,
                height: 24,
                align: 'center',
                borderRadius: 24
              },
              title1: {
                fontSize: 15,
                // backgroundColor: BAR_COLORS[0],
                color: '#fff',
                align: 'left',
                padding: 5
              },
              title2: {
                fontSize: 15,
                // backgroundColor: BAR_COLORS[1],
                color: '#fff',
                align: 'left',
                padding: 5
              },
              title3: {
                fontSize: 15,
                // backgroundColor: BAR_COLORS[2],
                color: '#fff',
                align: 'left',
                padding: 5
              },
              title: {
                fontSize: 15,
                // backgroundColor: 'transparent',
                color: '#fff',
                align: 'left',
                padding: 5
              }
            }
          },
          data: SOURCE_NAME
        },
        series: [
          {
            z: 2,
            type: 'bar',
            barWidth: 20,
            animationDuration: 1500,
            // barCategoryGap: 50,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: '#4EF1FF'
                  },
                  {
                    offset: 1,
                    color: '#0098C8'
                  }
                ])
                // barBorderRadius: 2,
              }
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                color: '#fff',
                fontSize: 14,
                offset: [10, 0]
              }
            },
            data: [170, 160, 150, 140, 130, 120, 110, 100, 70, 34]
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.left {
  position: absolute;
  width: 300px;
  /* height: 90%; */
  top: 29px;
  bottom: 26px;
  left: 30px;
  /* background: red; */
}

.left .left-container {
  display: flex;
  height: 20px;
  /* margin-top: 13px; */
  margin-bottom: 16px;
  /* margin-left: 0; */
  overflow: hidden;
  white-space: nowrap;
  color: #fff;
  font-size: 15px;
  margin-left: 10px;
  margin-right: 10px;
}
.left-item {
  margin-left: 6px;
  width: 250px;
  overflow: hidden;
}
.left-item span {
  display: inline-block;
}
.left-index {
  width: 20px;
  height: 20px;
  background: #08a895;
  border-radius: 50%;
  margin-left: 4px;
  /* vertical-align: top; */
  margin-top: 0px;
  text-align: center;
  line-height: 20px;
}
</style>