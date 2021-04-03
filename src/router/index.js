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

  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
 
  // 404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/homes',
    children: [{
      path: 'homes',
      name: 'Home',
      component: () => import('@/views/homes/index'),
      meta: { title: '首页', icon: '首页' }
    },
    {
      path: 'information',
      component: Layout,
      name: '个人信息',
      component: () => import('@/views/information/index'),
      meta: { title: '个人信息', noCache: 'true' },
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
  /**
   * admin - all
   * adminUser - user
   * adminActivity - activity
   * adminUserActivity - user,activity
   * 
  */

  // 用户管理 admin,adminUser,adminUserActivity
  {
    path: '/manageusers',
    component: Layout,
    redirect: '/manageusers/table',
    name: '用户管理',
    meta: { title: '用户管理', icon: '用户管理', roles: ['1','2','4']},
    children: [
      {
        path: 'table',
        name: '用户列表',
        component: () => import('@/views/manageusers/list'),
        meta: { title: '用户列表', icon: 'gy用户列表' }
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

  // 活动管理 admin,adminActivity,adminUserActivity
  {
    path: '/manageactivity',
    component: Layout,
    redirect: '/manageactivity/table',
    name: '活动管理',
    meta: { title: '活动管理', icon: '活动管理', roles: ['1','3','4']},
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
        meta: { title: '添加活动', icon: '活动' }
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

  // 权限 admin
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/table',
    name: 'Nested',
    meta: {
      title: '综合管理',
      icon: '综合管理', 
      roles: ['1']
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/nested/role/index'),
        name: 'Role',
        meta: { title: '角色列表',icon: '角色列表'},
      },
      {
        path: 'table',
        component: () => import('@/views/nested/table/index'),
        meta: { title: '角色分配',icon: '角色分配'}
      },
      {
        path: 'save',
        component: () => import('@/views/nested/save/index'),
        meta: { title: '添加管理员', icon: 'el-icon-user-solid' }
      },
      {
        path: 'edit/:id',
        name: '编辑管理员',
        component: () => import('@/views/nested/save/index'),
        meta: { title: '编辑管理员', noCache: 'true' },
        hidden: true
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
  //base:'/admin/',
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
