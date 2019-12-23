<template>
<!-- 基本的页面结构 -->
  <el-card>
      <bread-crumb slot="header">
         <template slot="title">素材管理</template>
      </bread-crumb>
      <!-- 素材管理 -->
      <el-tabs v-model="activeName"  @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
          <div class="img-list">
                <el-card  class="img-card"    v-for='item in list' :key='item.id'>
                    <img :src="item.url" alt="">
                    <el-row class="operate" type="flex" justify="space-around" >
                      <i class="el-icon-star-on"></i>
                       <i class="el-icon-delete-solid"></i>
                    </el-row>
                </el-card>
          </div>
          <el-row type="flex" justify="center" style="height: 80px: align: middle">
             <el-pagination background layout="prev, pager, next"
             :total="page.total"
             :current-page="page.currentPage"
             :page-size="page.pageSize"
             @current-change="changePage">

            </el-pagination>
          </el-row>
      </el-tab-pane>
      <!-- 收藏素材 -->
      <el-tab-pane label="收藏素材" name="collect">
           <div class="img-list">
                <el-card  class="img-card"    v-for='item in list' :key='item.id'>
                    <img :src="item.url" alt="">
                    <el-row class="operate" type="flex" justify="space-around" >
                      <i class="el-icon-star-on"></i>
                       <i class="el-icon-delete-solid"></i>
                    </el-row>
                </el-card>
          </div>
       <el-row type="flex" justify="center" style="height: 80px; align: middle"  >
          <el-pagination background ayout="prev, pager, next" :total="1000">
          </el-pagination>
          </el-row>
    </el-tab-pane>

      </el-tabs>
  </el-card>
</template>

<script>

export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1, // 当前页码
        pageSize: 8, // 每页全部数据
        total: 0 // 总条数
      }
    }
  },
  methods: {
    changeTab () {
      this.page.currentPage = 1
      this.getAllMaterial()
      // alert(this.activeName)
    },
    getAllMaterial () {
      //   获取所有素材
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage // 切换分页时获取分页的数据
      this.getAllMaterial()
    }

  },
  created () {
    this.getAllMaterial() // 获取所有的素材
  }
}

</script>

<style lang='less' scoped>
.img-list{
  display: flex;
  flex-wrap:  wrap;
  .img-card{
          width: 200px;
          height: 240px;
          margin: 20px 20px;
          position: relative;
          img{
            width: 100%;
            height: 100%;
          }
          .operate{
            width: 100%;
             font-size: 20px;
             position: absolute;
             bottom : 0 ;
             background-color: #f4f5f6;
             height: 30px;
             margin-left: -20px;
          }
    }
}

</style>
