// import LayoutAside from './home/layout-aside'
// import LayoutHeader from './home/layout-header'
import BreadCrumb from './common/BreadCrumb.vue' // 面包屑组件
import { quillEditor } from 'vue-quill-editor'
import up from '../components/publish/'
import coverPicture from '../components/CoverTheContent/index.vue'
export default {
  install (Vue) {
    // Vue.component('layout-aside', LayoutAside) // 全局注册
    // Vue.component('layout-header', LayoutHeader) // 全局注册
    Vue.component('bread-crumb', BreadCrumb)// 全局注册一个面包屑组件
    Vue.component('quill-editor', quillEditor) // 全局注册富文本
    Vue.component('Upload', up)
    Vue.component('cover-show', coverPicture)
  }
}
