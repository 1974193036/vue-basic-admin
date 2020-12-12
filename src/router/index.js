import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

// 1. 注册路由插件，如果参数是函数，调用函数方法，如果参数是对象，调用对象内的install方法来注册插件
Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    affix: true                  if set true, the tag will affix in the tags-view
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 路由规则
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/echart-demo',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'index',
      name: 'Echart',
      meta: { title: 'Echart', icon: 'dashboard', affix: true },
      component: () => import('@/views/echart-demo/index')
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'table/create',
        name: 'table-create',
        hidden: true,
        component: () => import('@/views/table/create'),
        meta: { title: 'Table新增', activeMenu: '/example/table' }
      },
      {
        path: 'table/edit/:id',
        name: 'table-edit',
        hidden: true,
        component: () => import('@/views/table/edit'),
        meta: { title: 'Table修改', activeMenu: '/example/table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    redirect: '/form/index',
    children: [{
      path: 'index',
      name: 'Form',
      meta: { title: 'Form', icon: 'form' },
      component: () => import('@/views/form/index')
    }]
  },
  {
    path: '/tab',
    component: Layout,
    redirect: '/tab/index',
    children: [
      {
        path: 'index',
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' },
        component: () => import('@/views/tab/index')
      }
    ]
  },
  {
    path: '/icons',
    component: Layout,
    redirect: '/icons/index',
    children: [
      {
        path: 'index',
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon' },
        component: () => import('@/views/icons/index')
      }
    ]
  },
  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' },
        component: () => import('@/views/i18n-demo/index')
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '页面权限',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '指令权限'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: '角色权限',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const lastRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

// 2. 创建router对象
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
