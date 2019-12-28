import Vue from 'vue'
import VueRouter from 'vue-router'
import bghome from '../views/home/bghom.vue'
import Home from '../views/home/index'
import Login from '../views/login/index'
// import material from '../views/suCaiGuanLi/'
Vue.use(VueRouter)
const routes = [
  {
    // 主页
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      { path: '',
        component: bghome },
      { // 评论列表
        path: '/home/comment',
        component: () => import('../views/comment/')

      }, { // 素材管理
        path: '/home/material',
        component: () => import('../views/suCaiGuanLi/')
      }, { // 内容列表
        path: '/home/articles',
        component: () => import('../views/contentsList/')
      }, {// 修改内容列表
        path: '/home/publish/:id',
        component: () => import('../views/publish/')
      },
      { // 发布文章
        path: '/home/publish',
        component: () => import('../views/publish/')
      }, {
        path: '/home/acount',
        component: () => import('../views/account')
      }, { // 404 找不到页面的地址
        path: '*', // 匹配任何地址 但是如果其他的可以匹配 优先匹配其他 否则匹配该组件
        component: () => import('../views/404 找不到页面/404.vue')
      }

    ]
  },
  {
    // 登录页
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
