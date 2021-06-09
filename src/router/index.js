import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'


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

  // 通知公告
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/table',
    name: '通知公告管理',
    meta: { title: '通知公告管理', icon: '通知公告'},
    children: [
      {
        path: 'table',
        name: '公告列表',
        component: () => import('@/views/notice/list'),
        meta: { title: '公告列表', icon: '通知公告列表' }
      },
      {
        path: 'save',
        name: '添加公告',
        component: () => import('@/views/notice/save'),
        meta: { title: '添加公告', icon: '添加文件' }
      },
      {
        path: 'details/:id',
        name: '公告详情',
        component: () => import('@/views/notice/details'),
        meta: { title: '公告详情', noCache: 'true' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: '编辑公告',
        component: () => import('@/views/notice/save'),
        meta: { title: '编辑公告', noCache: 'true' },
        hidden: true
      }
    ]
  },

  // 志愿风采
  {
    path: '/elegant',
    component: Layout,
    redirect: '/elegant/table',
    name: '志愿风采管理',
    meta: { title: '志愿风采管理', icon: '通知公告'},
    children: [
      {
        path: 'table',
        name: '风采列表',
        component: () => import('@/views/elegant/list'),
        meta: { title: '优秀志愿者列表', icon: '通知公告列表' }
      },
      {
        path: 'save',
        name: '添加风采',
        component: () => import('@/views/elegant/save'),
        meta: { title: '添加优秀志愿者', icon: '添加文件' }
      },
      {
        path: 'edit/:id',
        name: '编辑风采',
        component: () => import('@/views/elegant/save'),
        meta: { title: '编辑优秀志愿者', noCache: 'true' },
        hidden: true
      }
    ]
  },

]

export const asyncRoutes = [
  /**
   *  1  超级管理员
   *  2  用户管理员
   *  3  活动管理员
   *  4  高级管理员
   *  5  无权限管理员
   *  6  文件管理员
  */

  // 普通用户管理
  {
    path: '/manageusers',
    component: Layout,
    redirect: '/manageusers/table',
    name: '用户管理',
    meta: { title: '普通用户管理', icon: '用户管理', roles: ['1','2','4']},
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

  // 志愿活动管理
  {
    path: '/manageactivity',
    component: Layout,
    redirect: '/manageactivity/table',
    name: '活动管理',
    meta: { title: '志愿活动管理', icon: '活动管理', roles: ['1','3','4']},
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
      },
      {
        path: 'print',
        name: '打印活动',
        component: () => import('@/views/manageactivity/print'),
        meta: { title: '打印活动', noCache: 'true' },
        hidden: true
      }
    ]
  },

  // 管理员管理
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/table',
    name: 'Nested',
    meta: {
      title: '管理员管理',
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

  // 政策文件管理
  {
    path: '/policy',
    component: Layout,
    redirect: '/policy/table',
    name: '政策文件管理',
    meta: { title: '政策文件管理', icon: '文件管理', roles: ['1','4','6']},
    children: [
      {
        path: 'table',
        name: '文件列表',
        component: () => import('@/views/policy/list'),
        meta: { title: '文件列表', icon: 'policy' }
      },
      {
        path: 'save',
        name: '添加文件',
        component: () => import('@/views/policy/save'),
        meta: { title: '添加文件', icon: '添加文件' }
      },
      {
        path: 'details/:id',
        name: '文件详情',
        component: () => import('@/views/policy/details'),
        meta: { title: '文件详情', noCache: 'true' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: '编辑文件',
        component: () => import('@/views/policy/save'),
        meta: { title: '编辑文件', noCache: 'true' },
        hidden: true
      }
    ]
  },

  // 404
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  base:'/admin/',
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
