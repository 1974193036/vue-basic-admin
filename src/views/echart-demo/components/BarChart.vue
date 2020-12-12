<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

const BAR_WIDTH = 40 // 柱形图宽度
const CIRCLE_WIDTH = BAR_WIDTH // 圆片宽度
const CIRCLE_HEIGHT = 14 // 圆片高度

const MAX_DATA = [100, 100, 100] // 最大值，百分比
const DATA = [0, 40, 100] // 实际数据，百分比
const MINUS_DATA = [100 - 0, 100 - 40, 100 - 100] // 剩余数据，百分比

// require('echarts/theme/macarons') // echarts theme

export default {
  name: 'BarChart',
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
    },
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)

      this.chart.setOption({
        title: {
          // text: '3D立体图分段柱状图',
          // x: 'center',
        },
        backgroundColor: '#0E1A3A',
        tooltip: {
          show: true,
          trigger: 'item'
        },
        xAxis: [
          {
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              margin: 30, // 刻度标签与轴线之间的距离
              textStyle: {
                color: '#fff',
                backgroundColor: '#012A64',
                padding: [6, 10],
                align: 'center',
                lineHeight: 16,
                fontSize: 12
              }
            },
            data: ['接送货外请\n占比', '其他费用\n占比', '其他费用\n占比2']
          },
          {
            position: 'bottom',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              margin: 90, // 刻度标签与轴线之间的距离s
              formatter: (e) => {
                return [`{axisLabel1|${e.split('-')[0]}}`, `{axisLabel2|${e.split('-')[1]}}`].join('\n')
              },
              rich: {
                axisLabel1: {
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 'bold'
                },
                axisLabel2: {
                  color: '#fff',
                  fontSize: 12,
                  padding: 8
                }
              }
            },
            data: ['70%-环比上月', '70%-环比上月', '70%-环比上月']
          }
        ],
        yAxis: {
          show: false,
          // splitLine: {
          //   show: false
          // },
          // axisTick: {
          //   show: false,
          // },
          // axisLine: {
          //   show: false,
          // },
          // axisLabel: {
          //   show: false
          // }
        },
        grid: {
          left: 100,
          right: 100,
          top: 100,
          bottom: 140,
          containLabel: false
        },
        series: [
          // 最底下的圆片
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [CIRCLE_WIDTH, 10], // 圆片宽度
            symbolOffset: [0, 5],
            z: 12,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: '#104285'
                  },
                  {
                    offset: 0.5,
                    color: '#3486E6'
                  },
                  {
                    offset: 1,
                    color: '#104285'
                  }
                ]),
                // 无数据的时候展示的底部圆片
                // color: new echarts.graphic.RadialGradient(
                //   0.5,
                //   0.46,
                //   0.5,
                //   [
                //     { offset: 0, color: 'transparent' },
                //     { offset: 0.5, color: 'transparent' },
                //     { offset: 1, color: '#247DCE' }
                //   ],
                //   false
                // )
              }
            },
            data: [100, 100, 100, 100, 100, 100]
          },
          // 顶部圆片
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [CIRCLE_WIDTH, CIRCLE_HEIGHT], // 圆片宽度
            symbolOffset: [0, -6],
            symbolPosition: 'end',
            z: 12,
            itemStyle: {
              normal: {
                color: new echarts.graphic.RadialGradient(
                  0.5,
                  0.4,
                  0.5,
                  [
                    { offset: 0, color: 'transparent' },
                    { offset: 0.5, color: 'transparent' },
                    { offset: 1, color: '#247DCE' }
                  ],
                  false
                )
              }
            },
            data: MAX_DATA // 顶部最大值
          },
          // 中间圆片
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [CIRCLE_WIDTH, CIRCLE_HEIGHT], // 圆片宽度
            symbolOffset: [0, -6],
            symbolPosition: 'end',
            z: 12,
            itemStyle: {
              normal: {
                color: new echarts.graphic.RadialGradient(
                  0.5,
                  0.5,
                  0.5,
                  [
                    {
                      offset: 0,
                      color: '#00408A'
                    },
                    {
                      offset: 1,
                      color: '#1C6DCD'
                    }
                  ],
                  false
                )
              }
            },
            data: DATA
          },
          // 下半截柱状图
          {
            name: '',
            type: 'bar',
            barWidth: BAR_WIDTH, // 柱形图宽度
            barGap: '-100%',
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  type: 'linear',
                  global: false,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#104285'
                    },
                    {
                      offset: 0.5,
                      color: '#3486E6'
                    },
                    {
                      offset: 1,
                      color: '#104285'
                    }
                  ]
                }
              }
            },
            data: DATA
          },
          // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
          {
            type: 'bar',
            barWidth: BAR_WIDTH, // 柱形图宽度
            // barGap: '-100%',
            stack: '迭代上半部分柱形图',
            itemStyle: {
              color: 'transparent'
            },
            data: DATA
          },
          // 上半截柱状图
          {
            name: '',
            type: 'bar',
            barWidth: BAR_WIDTH, // 柱形图宽度
            // barGap: '-100%',
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  type: 'linear',
                  global: false,
                  colorStops: [
                    { offset: 0, color: '#247DCE' },
                    { offset: 0.15, color: 'transparent' },
                    { offset: 0.25, color: 'transparent' },
                    { offset: 0.375, color: 'transparent' },
                    { offset: 0.5, color: 'transparent' },
                    { offset: 0.625, color: 'transparent' },
                    { offset: 0.75, color: 'transparent' },
                    { offset: 0.85, color: 'transparent' },
                    { offset: 1, color: '#247DCE' }
                  ]
                }
              }
            },
            label: {
              show: true,
              position: 'top',
              distance: 20,
              align: 'center',
              formatter: (e) => {
                const per = parseInt(100 - e.value)
                return ['{label1|完成值}', `{label2|${per}%}`].join('\n')
              },
              rich: {
                label1: {
                  color: '#9ED0FF',
                  fontSize: 14,
                  fontWeight: 'bold'
                },
                label2: {
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 5
                }
              }
            },
            stack: '迭代上半部分柱形图',
            data: MINUS_DATA
          }
        ]
      })
    }
  }
}
</script>