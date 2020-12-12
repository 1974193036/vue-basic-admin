<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name: {{ name }}</div>-->
    <component :is="currentRole" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    // console.log(this.name)
    if (this.name !== 'Super Admin') {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>

<style lang="scss" scoped>
/*.dashboard {*/
/*&-container {*/
/*margin: 30px;*/
/*}*/
/*&-text {*/
/*font-size: 30px;*/
/*line-height: 46px;*/
/*}*/
/*}*/
</style>
