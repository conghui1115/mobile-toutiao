/**
 * 在 文件中做登录前的 导航守卫
 */
import router from '@/router'
import store from '@/store'
// 导航守卫
// 每当路由发生变化时
router.beforeEach(function (to, from, next) {
  // 判断 以/user开头则需要携带并且没有token
  if (to.path.startsWith('/user') && !store.state.user.token) {
    // 还要判断是否在别的页面跳转到登录，记录此页面的地址
    next({
      path: '/login',
      query: {
        redirectUrl: to.fullPath
      }
    })
  } else {
    // 直接放行
    next()
  }
})
