import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全部导入 vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant) // 全局注册  实际调用了vant  导出的对象的方法 install方法
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')