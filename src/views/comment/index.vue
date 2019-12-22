<template>
  <el-card>
    <!-- 面包屑给了卡片的具名插槽 -->
    <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <!-- 列组件 label 表头-->
      <el-table-column prop="title" width="600" label="标题"></el-table-column>
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="openComment(obj)"
          >{{obj.row.comment_status ? '关闭评论' : '打开'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 放置分页组件 -->
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  methods: {
    getcomment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 获取文章总条数
      })
    },
    formatterBool (row, column, cellValue, index) {
      // row 当前数据
      //  column 当前列的属性
      //   debugger
      return cellValue ? '正常' : '关闭'
    },
    // 打开或关闭评论
    openComment (obj) {
      // console.log(obj.row.comment_status)

      let status = obj.row.comment_status ? '打开' : '关闭'
      this.$confirm(`你确定要${status}评论`).then(() => {
        console.log(obj.row.id)
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: obj.row.id.toString() },
          data: {
            allow_comment: !obj.row.comment_status
          }
        })
          .then(result => {
            // 打开或者关闭评论成功之后
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getcomment()
          })
          .catch(() => {
            this.$message({
              type: 'success',
              message: '操作失败'
            })
          })
      })
    },
    // 分页插件
    changePage (newPage) {
      //  修改当前页码
      this.page.currentPage = newPage
      this.getComment()
    },
    // 请求评论列表数据
    getComment () {
      // axios 是默认是get 类型
      // query 参数 /路由参数 地址参数 get参数 axios params
      // body 参数 给data
      // 身份信息 headers
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results // 获取评论列表数据
        this.page.total = result.data.total_count // 获取文章总条数
      })
    }
  },
  created () {
    this.getcomment()
  }
}
</script>

<style>
</style>
