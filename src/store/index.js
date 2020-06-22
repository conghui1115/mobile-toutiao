import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 专门来放置需要共享的状态
    user: auth.getUser()// token 对象  做持久化 如果缓存中有 token 读取缓存
  },
  mutations: {
    // 修改token
    updateUser (state, payload) {
      // 定义在何种的user 书记给state
      state.user = payload.user
      // 更新vuex的时候 应该将最新的数据 存入本地缓存
      auth.setUser(payload.user)// 保持 vuex和本地存储的同步
    },
    // 删除token
    delUser (state) {
      // 将vuex中的token设置为空对象
      state.user = {}
      // 删除本地缓存中的token
      auth.delUser()
    }

  },
  actions: {
  },
  modules: {
  }
})
