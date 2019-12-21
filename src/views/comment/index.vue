<template>
            <el-card>
                <!-- 面包屑给了卡片的具名插槽 -->
                <bread-crumb slot="header">
                <!-- 插槽内容 -->
                <template slot="title">评论列表</template>
                </bread-crumb>
                <el-table :data='list'>
                <!-- 列组件 label 表头-->
                <el-table-column prop="title"  width="600" label="标题"></el-table-column>
                <el-table-column  :formatter="formatterBool"  prop="comment_status" label="评论状态"></el-table-column>
                <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
                <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="obj">
                    <el-button type="text">修改</el-button>
                    <el-button type="text">{{obj.row.comment_status ? '关闭评论' : '打开'}}</el-button>
                  </template>
                </el-table-column>
                </el-table>
            </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getcomment () {
      this.$axios({
        url: '/articles', params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results
      })
    },
    formatterBool (row, column, cellValue, index) {
      // row 当前数据
      //  column 当前列的属性
    //   debugger
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getcomment()
  }
}
</script>

<style>

</style>
