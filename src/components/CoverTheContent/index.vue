<template>
  <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="素材库" name="first">
                 <div class="img-list">
                        <div  class="img-card"    v-for='item in list' :key='item.id'>
                            <img :src="item.url" alt="">
                        </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="上传图片" name="second">上传图片</el-tab-pane>
        </el-tabs>
        <!-- 分页组件 -->
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
        console.log(result.data)
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
</style>
