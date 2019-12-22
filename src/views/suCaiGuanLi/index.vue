<template>
<!-- 基本的页面结构 -->
  <el-card>
      <bread-crumb slot="header">
         <template slot="title">素材管理</template>
      </bread-crumb>
      <!-- 素材管理 -->
      <el-tabs v-model="activeName">
      <el-tab-pane label="全部素材" name="all">123</el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">456</el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'collect'
    }
  }

}
</script>

<style>

</style>
