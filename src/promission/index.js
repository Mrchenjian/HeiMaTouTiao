import router from '../router'
router.beforeEach(function (to, from, next) {
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
