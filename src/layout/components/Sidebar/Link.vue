<template>
  <!--eslint-disable vue/require-component-is-->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
  <!--<a :href="to" target="_blank" v-if="linkProps(to)">-->
  <!--<slot />-->
  <!--</a>-->
  <!--<router-link :to="to" v-else>-->
  <!--<slot />-->
  <!--</router-link>-->
</template>
<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(url) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener norefferrer'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
<style>

</style>
