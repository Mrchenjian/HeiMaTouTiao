import Vue from 'vue'
import App from './App.vue'
import './styles/index.less'
import router from './router/index'
import axios from './interceptor/demand'
// import axios from 'axios'  被拦截器替换
import './promission/index'
import ElementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
