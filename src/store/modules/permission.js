import { asyncRoutes, constantRoutes, lastRoutes } from '@/router'
import Layout from '@/layout'


/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */

export function generaMenu(routes, data) {
  data.forEach(item => {
    // alert(JSON.stringify(item))
    const menu = {
      path: item.url,
      // component: item.url === '#' ? Layout : () => import(`@/views/${item.url}/index`),
      component: item.url.includes('/') ? Layout : resolve => require([`@/views/${item.url}/index`], resolve),
      // hidden: true,
      children: [],
      name: 'menu_' + item.menu_id,
      meta: { title: item.menu_name, id: item.menu_id, icon: item.icon }
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
}


/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  /** 1. 菜单根据角色编码控制 */
  // generateRoutes({ commit }, { roles }) {
  //   // console.log(roles) // ['admin'] ['editor']
  //   return new Promise(resolve => {
  //     let accessedRoutes
  //     if (roles.includes('admin')) {
  //       accessedRoutes = asyncRoutes || []
  //     } else {
  //       accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
  //     }
  //     // console.log(accessedRoutes)
  //     commit('SET_ROUTES', accessedRoutes)
  //     resolve(accessedRoutes)
  //   })
  // }
  /** 2. 菜单根据后台返回的数据配置 */
  generateRoutes({ commit }, { roles, menuList }) {
    // console.log(roles) // ['admin'] ['editor']
    return new Promise(resolve => {
      // 获取后台返回的菜单数据
      const loadMenuData = [...menuList]
      // 把后台返回的菜单数据组装进asyncRoutes里
      const asyncRoutesData = [...asyncRoutes]
      generaMenu(asyncRoutesData, loadMenuData)
      let accessedRoutes
      if (roles.includes('admin')) {
        // alert(JSON.stringify(asyncRoutes))
        accessedRoutes = asyncRoutesData || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutesData, roles)
      }
      accessedRoutes.push(...lastRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
