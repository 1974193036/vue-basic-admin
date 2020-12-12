<template>
  <div class="echart-demo-container">
    <div class="chart-wrapper">
      <bar-chart />
    </div>
    <div class="chart-wrapper">
      <bar-chart2 />
    </div>
    <div class="chart-wrapper">
      <pie-chart />
    </div>
  </div>
</template>
<script>
import BarChart from './components/BarChart'
import BarChart2 from './components/BarChart2'
import PieChart from './components/PieChart'

export default {
  name: 'Echart',
  components: { BarChart, BarChart2, PieChart },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  margin-bottom: 30px;
}
</style>
