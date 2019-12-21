import Vue from 'vue'
import VueRouter from 'vue-router'
// import bghome from '../views/home/bghom.vue'
import Home from '../views/home/index'
import Login from '../views/login/index'
Vue.use(VueRouter)
const routes = [
  {
    // 主页
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        // path: '',
        // component: bghome
        path: '/home/comment',
        component: () => import('../views/comment/')

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
