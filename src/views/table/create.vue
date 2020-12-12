<template>
  <div>
    <h1>这里是新增页面</h1>
    <el-button type="primary" @click="confirm">确定</el-button>
  </div>
</template>
<script>
import Bus from '@/eventBus'

export default {
  methods: {
    confirm() {
      // this.$store.dispatch('tagsView/delView', this.$route)
      // this.$router.replace(this.$route.meta.activeMenu)
      Bus.back(this)
      Bus.$emit('load', { type: 'create' })
    }
  }
}
</script>