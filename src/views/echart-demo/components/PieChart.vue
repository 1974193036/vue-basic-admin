<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>
<script>
import echarts from 'echarts'

var placeHolderStyle = {
  normal: {
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    color: 'transparent',
    borderWidth: 0
  },
  emphasis: {
    color: 'transparent',
    borderWidth: 0
  }
};


// require('echarts/theme/macarons') // echarts theme

export default {
  name: 'PieChart2222',
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
        backgroundColor: '#0E1A3A',
        title: {
          text: '异常签收率',
          left: '15%',
          top: '0%',
          textAlign: 'center',
          backgroundColor: '#012A64',
          // borderColor: 'red',
          // borderWidth: 2,
          padding: [30, 60],
          textStyle: {
            fontWeight: 'bold',
            fontSize: 12,
            color: '#fff'
          }
        },
        series: [
          // 底层圆形
          {
            type: 'pie',
            z: 1,
            hoverAnimation: false, // 鼠标经过的特效
            radius: ['25%', '45%'],
            center: ['20%', '40%'],
            //clockwise: false,
            startAngle: 162,
            animationDuration: 1400,
            animationEasing: 'quarticInOut',
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: 40,
              itemStyle: {
                normal: {
                  color: '#022258',
                  // borderWidth: 2,
                  // borderColor: '#022258',
                  shadowColor: '#2169B2',
                  shadowBlur: 12
                }
              },
            }, {
              value: 60,
              itemStyle: placeHolderStyle,
            }
            ]
          },
          // 上层圆形
          {
            type: 'pie',
            z: 2,
            hoverAnimation: false, //鼠标经过的特效
            radius: ['25%', '45%'],
            center: ['20%', '40%'],
            // clockwise: false,
            startAngle: 163,
            animationDuration: 1400,
            animationEasing: 'quarticInOut',
            labelLine: {
              normal: {
                show: false
              }
            },
            // markLine: {
            //   symbol: 'arrow',
            //   symbolSize: 50,
            //   lineStyle: {
            //     color: 'red'
            //   }
            // },
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: 40 * 0.5, // 0.2是原数据的占比
              itemStyle: {
                normal: {
                  shadowColor: '#2169B2',
                  shadowBlur: 12,
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: '#016ec5'
                  }, {
                    offset: 1,
                    color: '#17c7ef'
                  }])
                }
              },
              label: {
                normal: {
                  formatter: (e) => {
                    // console.log(e)
                    // return 0.2 * 100 + '%\n' + '完成值'
                    return [`{label1|${0.2 * 100}%}`, `{label2|完成值}`].join('\n')
                  },
                  rich: {
                    label1: {
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 'bold',
                      // lineHeight: 18,
                      padding: [30, 0, -20, 0]
                    },
                    label2: {
                      color: '#AADDFF',
                      fontSize: 13,
                      fontWeight: 'bold',
                      // lineHeight: 18,
                      padding: [20, 0, -28, 0]
                    },
                  },
                  position: 'center',
                  show: true
                  // textStyle: {
                  //   fontSize: '14',
                  //   fontWeight: 'bold',
                  //   color: '#AAAFC8'
                  // }
                }
              }
            }, {
              value: 100 - 40 * 0.5,
              itemStyle: {
                normal: {
                  color: 'transparent'
                }
              }
            }
            ]
          }
        ]
      })
    }
  }
}
</script>