import Vue from 'vue'
import App from './App.vue'
import './styles/index.less'
import router from './router/index'
import axios from './interceptor/demand'
// import axios from 'axios'  被拦截器替换
import './promission/index'
import Ftext from 'vue-quill-editor' // vue-quill-editor富文本编辑器
import components from './components/index'
// import '' // 全局定义面包屑组件
import ElementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(components)
Vue.use(Ftext)
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
