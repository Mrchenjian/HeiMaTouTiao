<template>
  <el-container>
  <!-- 左右布局 -->
  <el-aside  :style="{ width: collaspse ? '60px' : '230px' }"    style="transition:all 0.3s;background-color: #353b4e; min-height: 100vh; " >
    <layout-aside :collaspse="collaspse"></layout-aside>
  </el-aside>
  <!-- 再放置一个container -->
  <el-container>
    <!-- 上下布局 -->
    <el-header>
      <!-- 头部 -->
      <layout-header></layout-header>
    </el-header>
    <!-- 主要区域 -->
    <el-main style="padding: 0">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import layout from './layout-aside'
import header from './layout-header'
import eventBus from '../../router/untils/eventBus'
export default {
  data () {
    return {
      collaspse: false // 是否折叠

    }
  },
  components: {
    'layout-aside': layout,
    'layout-header': header
  },
  created () {
    eventBus.$on('changeCollapse', () => {
      this.collaspse = !this.collaspse
    })
  }
}
</script>

<style>

</style>
