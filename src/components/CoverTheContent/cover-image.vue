<template>
  <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="素材库" name="first">
                 <div class="img-list">
                        <div  class="img-card"    v-for='item in list' :key='item.id' >
                            <img :src="item.url" alt="" @click="getUrl(item.url)">
                        </div>
                </div>
                <el-row type="flex" justify="center">
            <el-pagination  @current-change='CurrentPageIndex'
                        background
                        layout="prev, pager, next"
                        :total="Pagination.total_count"
                        :page-size=8
                        :current-page='Pagination.page'
                        >
            </el-pagination>
          </el-row>
            </el-tab-pane>
            <el-tab-pane label="上传图片" name="second">
              <!-- 定义的新组件 -->
                <!-- <select-image></select-image> -->
                  <el-upload action="" class="upload"
                  :show-file-list="false"
                  :http-request="uploadImg">
                        <i class="el-icon-plus"></i>
                  </el-upload>
              </el-tab-pane>
        </el-tabs>
        <!-- 分页组件 -->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 分页
      Pagination: {
        page: 1, // 当前页码
        per_page: 8, // 每页的条数
        total_count: 0 // 总条数
      },
      activeName: 'second',
      list: [],
      formDate: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    // 上传
    uploadImg (params) {
      let data = new FormData() // 实例化对象
      data.append('image', params.file) // 添加文件参数
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then((result) => {
        console.log(result.data.url)
        this.$emit('coverimage', result.data.url)
      })
    },
    // 点击图片时获取图片 url
    getUrl (url) {
      // alert(url)
      this.$emit('coverimage', url)// 自定义事件名这里不再强制小写
    },
    //   获取当前页码
    CurrentPageIndex (newPage) {
      this.Pagination.page = newPage
      this.getAllImg()
    },
    // 拿到用户基本信息数据
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false,
          page: this.Pagination.page,
          per_page: this.Pagination.per_page
        }
      }).then((result) => {
        this.list = result.data.results
        this.Pagination.total_count = result.data.total_count
      })
    },
    handleClick (tab, event) {
    //   console.log(tab)
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' scopted>
        .img-list{
              display: flex;
              flex-wrap: wrap;
                    .img-card{
                                width: 150px;
                                height: 150px;
                                margin: 5px;
                                img{
                                        width: 100%;
                                        height: 100%;
                                }
                    }
        }
    .upload{
      display: flex;
      justify-content: center;
        i{
              font-size: 50px;
              display: block;
              margin: 20px auto;
              padding: 60px;
              border:  1px dashed #ccc;
              border-radius: 4px;
        }
    }
</style>
