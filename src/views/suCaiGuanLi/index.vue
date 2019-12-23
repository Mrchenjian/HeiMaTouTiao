<template>
<!-- 基本的页面结构 -->
  <el-card>
      <bread-crumb slot="header">
         <template slot="title">素材管理</template>
      </bread-crumb>
      <!-- 素材管理 -->
      <el-tabs v-model="activeName">
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
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">456</el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>

export default {
  data () {
    return {
      activeName: 'collect',
      list: []
    }
  },
  methods: {
    getAllMaterial () {
      //   获取所有素材
      this.$axios({
        url: '/user/images',
        params: { collect: false }
      }).then(result => {
        debugger
        this.list = result.data.results
      })
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
