import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)

// console.log(req)
// ƒ webpackContext(req) {
//   var id = webpackContextResolve(req);
//   return __webpack_require__(id);
// }

// console.log(req.keys()) // ["./dashboard.svg", "./example.svg", "./eye-open.svg", "./eye.svg", "./form.svg", "./link.svg", "./nested.svg", "./password.svg", "./table.svg", "./tree.svg", "./user.svg"]

// console.log(req('./user.svg'))

const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
