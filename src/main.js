import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import './styles/element-variables.scss' // 自定义element-ui的样式
// import 'element-ui/lib/theme-chalk/index.css'

// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import i18n from './lang' // internationalization
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as filters from './filters' // global filters
import Cookies from 'js-cookie'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'

if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
  size: Cookies.get('size') || 'medium'
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})