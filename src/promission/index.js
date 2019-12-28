import router from '../router'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  progress.start() // 开启进度条
  // 拦截谁 判断拦截地址
  console.log(to.path)

  if (to.path !== '/login') {
    //   进行权限判断 判断有无token 如果有token 放过 如果没有 回到登录页
    let token = window.localStorage.getItem('user-token')
    if (token) {
    //    直接放过
      next()
    } else {
      next('/login') // 强制跳转到登录页
    }
  } else {
    next() // 直接放行
  }
})
router.afterEach(function (to, from, next) {
  progress.done() // 关闭进度条
})
