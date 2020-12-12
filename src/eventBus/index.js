import Vue from 'vue'

const vue = new Vue()

vue.back = (that) => {
  that.$store.dispatch('tagsView/delView', that.$route)
  that.$router.replace(that.$route.meta.activeMenu)
}

export default vue