<template>
  <el-container>
  <!-- 左右布局 -->
  <el-aside>
    <layout-aside></layout-aside>

  </el-aside>
  <!-- 再放置一个container -->
  <el-container>
    <!-- 上下布局 -->
    <el-header>
      <!-- 头部 -->
      <layout-header></layout-header>
    </el-header>
    <!-- 主要区域 -->
    <el-main>
      主要区域
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import layout from './layout-aside'
import header from './layout-header'
export default {
  components: {
    'layout-aside': layout,
    'layout-header': header
  }
}
</script>

<style>

</style>
