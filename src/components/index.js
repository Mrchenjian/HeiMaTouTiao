
import BreadCrumb from './common/BreadCrumb.vue' // 面包屑组件
import { quillEditor } from 'vue-quill-editor'
import up from '../components/publish/'
import coverPicture from '../components/CoverTheContent/cover-image.vue'
import pictureUpload from '../components/CoverTheContent/select-image.vue'
export default {
  install (Vue) {
    Vue.component('bread-crumb', BreadCrumb)// 全局注册一个面包屑组件
    Vue.component('quill-editor', quillEditor) // 全局注册富文本
    Vue.component('Upload', up)
    Vue.component('cover-show', coverPicture) // 图片封面 素材库组件
    Vue.component('select-image', pictureUpload)
  }
}
