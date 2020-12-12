import router, { resetRouter } from '@/router'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'
import store from '@/store'
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 触发取消请求队列里的事件
  store.dispatch('request/clearRequest')

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      console.log(to.path)
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // const hasGetUserInfo = store.getters.name
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        // 刚登录后和刷新页面情况下获取用户信息
        try {
          const { roles, menuList } = await store.dispatch('user/getInfo')
          // console.log(roles) // ['admin'] ['editor']

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', { roles, menuList })

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // next()
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token */

    if (whiteList.indexOf(to.path) !== -1) {
      // 如果直接输入的是登录页面
      await store.dispatch('user/resetToken')
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page
      await store.dispatch('user/resetToken')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  // finish progress bar
  NProgress.done()
  // if login page to other page，close Message
  if (from.path === '/login') {
    Message.closeAll()
  }
  // function createScript() {
  //   var jsTag = document.createElement('script')
  //   jsTag.setAttribute('id', 'wiki')
  //   jsTag.src = '//pingjs.qq.com/h5/stats.js?v2.0.4&time=' + new Date().getTime()
  //   document.body.appendChild(jsTag)
  // }
  //
  // setTimeout(() => {
  //   (function () {
  //     if (from.name) {
  //       let jsTag = document.getElementById('wiki')
  //       if (!jsTag) {
  //         createScript()
  //       } else {
  //         document.body.removeChild(jsTag)
  //         createScript()
  //       }
  //     }
  //   })()
  // }, 30)
})
