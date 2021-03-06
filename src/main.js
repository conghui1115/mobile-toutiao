import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission'
// 全部导入 vant
import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/index.less'
// 全局引入自定义样式 覆盖vant的样式
import '@/styles/index.less'

// 屏幕变化，font-size变化，修改rem 基准值的js插件 amfe-flexible
import 'amfe-flexible'
Vue.use(Vant) // 全局注册  实际调用了vant  导出的对象的方法 install方法
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
