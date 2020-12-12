<template>
  <div>
    <h1>这里是编辑页面</h1>
    <h2>根据传递过来的参数 id {{ $route.params }} 进行请求获取详情</h2>
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
      // Bus.$emit('load')
      Bus.back(this)
      Bus.$emit('load', { type: 'edit' })
    }
  }
}
</script>