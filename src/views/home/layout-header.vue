<template>
  <!-- 头部组件 -->
  <el-row class='layout-header' type="flex" align="middle" justify="space-between">
      <!-- 左侧 -->
      <el-col class='left' :span="8">
          <!-- 左侧图标   -->
          <i :class="{'el-icon-s-unfold' : showClass ,'el-icon-s-fold' : !showClass}" class="iconpic" @click="collaspseOrOpen"></i>
          <span class='title'>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <!-- 右侧 -->
      <el-col class='right' :span="4">
          <el-row type='flex' justify="end" align="middle">
            <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
             <!-- 下拉菜单 -->
             <el-dropdown  @command="handle">
                 <span>{{ userInfo.name }}</span>
                 <!-- 下拉菜单  具名插槽 -->
                 <el-dropdown-menu slot="dropdown">
                     <!-- 下拉内容 -->
                      <el-dropdown-item command="info">个人信息</el-dropdown-item>
                      <el-dropdown-item command="git">Git地址</el-dropdown-item>
                      <el-dropdown-item command="lgout">退出</el-dropdown-item>
                 </el-dropdown-menu>
            </el-dropdown>
          </el-row>
      </el-col>

  </el-row>
</template>

<script>
import eventBus from '../../router/untils/eventBus'
export default {
  data () {
    return {
      // 改变图标方向
      showClass: true,
      userInfo: {}, // 用户信息
      defaultImg: require('../../assets/header.jpg') // 先把地址转换成变量
    }
  },
  created () {
    let token = window.localStorage.getItem('user-token') // 获取令牌
    // 查询数据
    this.$axios({
      url: '/user/profile',
      //   headers参数
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      this.userInfo = result.data // 获取用户个人信息
    })
    eventBus.$on('update', () => {
      this.getUserInfo()
    })
  },
  methods: {
    // 绑定图标点击事件
    collaspseOrOpen () {
      this.showClass = !this.showClass
      eventBus.$emit('changeCollapse') // 改变了折叠状态
    },
    getUserInfo () {
      let token = window.localStorage.getItem('user-token') // 获取令牌
      // 查询数据
      this.$axios({
        url: '/user/profile',
        //   headers参数
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(result => {
        this.userInfo = result.data // 获取用户个人信息
      })
      eventBus.$on('update', () => {
        this.getUserInfo()
      })
    },
    handle (commad) {
      // 区分点击的菜单项
      if (commad === 'lgout') {
        //   退出
        window.localStorage.removeItem('user-token') // 删除用户的令牌
        this.$router.push('/login')
      } else if (commad === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/89heimatoutiao'
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .layout-header {
      height:60px;
      .left {
          font-size: 20px;
          .iconpic{
              font-size: 30px;
          }
          .title {
              margin-left:4px;
              color: #2c3e50;
              font-size:16px;
          }
      }
      .right {
          img {
              width:40px;
              height: 40px;
              border-radius: 50%;
              margin-right:5px;
          }
      }
  }
</style>
