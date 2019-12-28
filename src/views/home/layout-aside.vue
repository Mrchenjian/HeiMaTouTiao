<template>
<!-- 左侧导航 -->
<div class='layout-aside' style="height:100vh ; background-color: #353b4e">
    <div class='title'>
        <!-- :src="collaspse ? smallImg : bigImg"  -->
        <img :src="collaspse ? smallImg : bigImg"  alt="">
    </div>
    <!--router 开启路由 -->
 <el-menu  router  :collapse="collaspse"  :style="{width: collaspse ? '60px': '231px'}"    style="width:231px" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
      <!-- 导航组件 index作为跳转的地址  类似于 router-link  to -->
      <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
          <span>首页</span>
      </el-menu-item>
      <!-- 二级导航 -->
      <el-submenu index="1">
          <!-- 具名插槽 -->
          <template slot='title'>
               <i class="el-icon-tickets"></i>
              <span >内容管理</span>
          </template>
          <!-- 放置 el-menu-item -->
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/articles">内容列表</el-menu-item>
          <el-menu-item index="/home/comment">评论列表</el-menu-item>
          <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-coin"></i>
                    <span>粉丝管理</span>
                </template>
          <el-menu-item index="/home/picture">图文数据</el-menu-item>
          <el-menu-item index="/home/fansinfo">粉丝画像</el-menu-item>
          <el-menu-item index="/home/fanslife">粉丝概况</el-menu-item>
          <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item  index="/home/acount">
      <i class="el-icon-s-custom"></i>
          <span>账户信息</span>
      </el-menu-item>
  </el-menu>
</div>

</template>

<script>
export default {
  props: ['collaspse'],
  data: function () {
    return {
      bigImg: require('../../assets/logo_admin.png'),
      smallImg: require('../../assets/toutiao.png')
    }
  }
}
</script>

<style lang='less' scoped>
.layout-aside {
    width: 230px;
    overflow: hidden;
    .title {
        text-align: left;
        background-color: #2e2f32;
        padding: 10px 0;
        img {
            height: 35px;
        }

    }
}
</style>
