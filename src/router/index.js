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
      {
        path: '/home/comment',
        component: () => import('../views/comment/')

      }, {
        path: '/home/material',
        component: () => import('../views/suCaiGuanLi/')
      }, {
        path: '/home/articles',
        component: () => import('../views/contentsList/')
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
