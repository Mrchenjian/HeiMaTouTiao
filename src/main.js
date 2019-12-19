import Vue from 'vue'
import App from './App.vue'
import './styles/index.less'
import router from './router/index'
import axios from 'axios'
import ElementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.prototype.$http = axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
