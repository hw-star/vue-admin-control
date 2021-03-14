import Vue from 'vue'
import Router from 'vue-router'
// import { createWebHistory } from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/homes',
    children: [{
      path: 'homes',
      name: 'Home',
      component: () => import('@/views/homes/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/manageusers',
    component: Layout,
    redirect: '/manageusers/table',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'el-icon-user-solid', roles: ['admin']},
    children: [
      {
        path: 'table',
        name: '用户列表',
        component: () => import('@/views/manageusers/list'),
        meta: { title: '用户列表', icon: 'el-icon-tickets' }
      },
      {
        path: 'save',
        name: '添加用户',
        component: () => import('@/views/manageusers/save'),
        meta: { title: '添加用户', icon: 'el-icon-user-solid' }
      },
      {
        path: 'edit/:id',
        name: '编辑用户',
        component: () => import('@/views/manageusers/save'),
        meta: { title: '编辑用户', noCache: 'true' },
        hidden: true
      }
    ]
  },
  {
    path: '/manageactivity',
    component: Layout,
    redirect: '/manageactivity/table',
    name: '活动管理',
    meta: { title: '活动管理', icon: 'el-icon-s-help', roles: ['admin']},
    children: [
      {
        path: 'table',
        name: '活动列表',
        component: () => import('@/views/manageactivity/list'),
        meta: { title: '活动列表', icon: 'el-icon-tickets' }
      },
      {
        path: 'save',
        name: '添加活动',
        component: () => import('@/views/manageactivity/save'),
        meta: { title: '添加活动', icon: 'el-icon-user-solid' }
      },
      {
        path: 'details/:id',
        name: '活动详情',
        component: () => import('@/views/manageactivity/details'),
        meta: { title: '活动详情', noCache: 'true' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: '编辑活动',
        component: () => import('@/views/manageactivity/save'),
        meta: { title: '编辑活动', noCache: 'true' },
        hidden: true
      }
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '权限管理',
      icon: 'nested',
      roles: ['superadmin']
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'),
        name: 'Menu1',
        meta: { title: '角色列表' },
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '权限列表' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  //history: createWebHistory(process.env.VUE_APP_BASE_API),
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
