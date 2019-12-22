import axios from 'axios'
import router from '../router/index'
import { Message } from 'element-ui' // 引入提示对象
import JSONBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 黑马头条PC-接口访问-axios拦截器-统一处理请求token
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
}
)
// 后台数据 到达 响应拦截之前走的一个函数
axios.defaults.transformResponse = [function (data) {
  // debugger
  return JSONBig.parse(data) // JSONbig.parse 替换 JSON.parse  保证数字的正确
}]
// 黑马头条PC--接口访问-axios拦截器-统一处理响应数据
axios.interceptors.response.use(function (response) {
  // debugger
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status // 获取状态码
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误(你手机验证码不正确)'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 清空缓存
      router.push('/login') // this.$router.push()
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message }) // 提示消息
  return Promise.reject(error)
})
export default axios
