import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 按需加载的方式配置路由
const layout = () => import('@/views/layout') // 公共组件
const home = () => import('@/views/home') // home 二级路由
const question = () => import('@/views/question') // question 二级路由
const video = () => import('@/views/video') // video二级路由
const user = () => import('@/views/user') // user二级路由

// 其他的一级路由
const chat = () => import('@/views/user/chat') // 小智同学
const login = () => import('@/views/login') // 登录模式
const profile = () => import('@/views/user/profile') // 编辑资料
const search = () => import('@/views/search') // 搜索中心
const searchResult = () => import('@/views/search/result') // 搜索结果
const article = () => import('@/views/article') // 文章中心

const routes = [
  {
    path: '/',
    // redirect: '/home'// redirect别写错
    component: layout,
    children: [{
      path: '',
      component: home
    }, {
      path: '/question',
      component: question
    },
    {
      path: '/video',
      component: video
    }, {
      path: '/user',
      component: user
    }
    ]
  },
  {
    path: '/user/chat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: chat
  }, {
    path: '/login',
    component: login
  }, {
    path: '/user/profile',
    component: profile
  }, {
    path: '/search',
    component: search
  }, {
    path: '/search/result',
    component: searchResult
  }, {
    path: '/article',
    component: article
  }
]

const router = new VueRouter({
  routes
})

export default router
