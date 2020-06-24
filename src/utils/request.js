/**
 *  request.js 是对请求做一些处理 token处理
 */
import axios from 'axios'
// 引入处理大数字类型 的json-bigint
import JSONBig from 'json-bigint'
import store from '@/store' // 引入vuex中的store实例对象 相当于组件中的 this.$store
import router from '@/router'
// 新创建一个 axios的实例
const instance = axios.create({
  // 设置baseURl
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 基础的请求地址
  // 处理大数字问题,transformResponse是后台响应回来但是没进入到 axios的响应拦截器时执行 数组可以写多个函数
  transformResponse: [function (data) {
    // data是后台返回的字符串
    // JSON.parse(data)
    return data ? JSONBig.parse(data) : {}
  }]

})

// 请求拦截器   token的注入   应该是在请求之前
instance.interceptors.request.use(function (config) {
// 如果token存在 读取配置的信息 给配置注入token
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config // 返回配置
}, function (error) {
  // 直接返回 promise错误,直接进入到axios的catch中
  return Promise.reject(error)
})

// 响应拦截器  处理返回结果的数据  将对嵌套的结构 解构出来
instance.interceptors.response.use(function (response) {
  // response是 已经被axios默认包了一层数据
  try {
    return response.data.data // 如果成功则返回 如果两层可以解开就返回两层
  } catch (error) {
    // 如果失败 说明 response.data不存在 两层  就解一层
    return response.data
  }
}, async function (error) {
/**
 * error
 * config
 * status
 */
  //  如果请求失败或者token失效 会进入到 响应拦截的错误区域
  // 1. 判断 响应状态码是不是401
  // 1.1 是401---则看本地有没有refresh_token --- 有 -->将本地和vuex的token换取
  // 1.2  没有refresh_token=> try{换取token} catch{则跳到登录页-}--有没有在其他页面地址
  //
  // 则去跳转login 把当前携带的地址也传入到login
  // 只要是401 就是token失效---没携带token 导航守卫直接拦截
  if (error.response && error.response.status === 401) {
    // 抽取 跳转
    const path = {
      path: '/login', // 地址
      query: {
        // 需要传递的query参数
        redirectUrl: router.currentRoute.fullPath // 表示登录页需要跳转的地址
      }
      // 路由传参的两个写法  动态路由  query()
    }
    if (store.state.user.refresh_token) {
      try {
        // 有refresh_token 调接口
        const result = await axios({
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          method: 'put',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })

        // 如果 请求成功，把result返回值  取出新token---则更新之前失效的token
        // 更新vuex的数据
        store.commit('updateUser', {
          user: {
            token: result.data.data.token, // 更新token
            refres_token: store.state.user.refresh_token // 还是之前的refresh_token
          }
        })

        // 401更新了token 再次发送请求
        return instance(error.config)// 相当于执行之前出现401错误的请求
      } catch (error) {
        router.push(path)
      }
    } else {
      router.push(path)
    }
  }

  return Promise.reject(error)
})

// 导出instance
export default instance
