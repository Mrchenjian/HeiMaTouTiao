<template>
    <el-card v-loading='loading'>
         <bread-crumb slot="header">
            <template slot="title">
                账户信息
            </template>
        </bread-crumb>
        <!-- 放置上传组件 -->
        <el-upload class='head-upload' action=''  :http-request="uploadImg"
        :show-file-list="false">
            <img :src= 'formData.photo  ? formData.photo  : defaultImg '>
        </el-upload>
        <el-form  :model=" formData"  ref="ruleForm"   :rules="rules" style="margin-left:30px" label-width="100px" class="box">
            <el-form-item label='用户名' prop="name">
                    <el-input style="width:30%;" v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label='简介' prop="intro">
                    <el-input style="width:30%;" v-model="formData.intro"></el-input>
            </el-form-item>
            <el-form-item label='邮箱' prop='email'>
                    <el-input style="width:30%;" v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item label='手机号' prop="email">
                    <el-input disabled style="width:30%;" v-model="formData.mobile"></el-input>
            </el-form-item>
             <el-form-item >
                    <el-button type="primary" @click="uplogon">保存信息</el-button>
            </el-form-item>
        </el-form>
    </el-card>

</template>

<script>
import eventBus from '../../router/untils/eventBus'
export default {
  data () {
    return {
      loading: false,
      // 定义一个表单数据对象
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空' }
        //   { min: 3, max: 5, message: '长度在3到5个字符' }
        ],
        intro: [{ required: true, message: '简介不能为空' }
        ],
        email: [{ required: true, message: '邮箱不能为空' },
          { pattern: /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: '邮箱输入格式错误' }]
      },
      defaultImg: require('../../assets/picture.jpg')
    }
  },
  methods: {
    //   上传图片
    uploadImg (params) {
      this.loading = true // 打开弹层
      let data = new FormData() // 实例化对象
      data.append('photo', params.file) // 加入参数
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.formData.photo = result.data.photo // 设置头像地址
        this.loading = false // 关调弹层
      })
    },
    //  保存信息
    uplogon () {
      this.$refs.ruleForm.validate((isok) => {
        //   调用保存方法
        if (isok) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(result => {
            //   认为保存成功
            this.$message({
              type: 'success',
              message: '保存信息成功'
            })
            eventBus.$emit('update') // 触发一个自定义事件 .$emit('updateUserInfoSuccess') // 触发一个自定义事件
          })
        }
      })
    },
    //   获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo() // 用户个人信息
  }
}
</script>

<style lang='less' scopted>
  .head-upload{
      position: absolute;
      right: 100PX;
      img{
          width: 200px;
          height: 200px;
          border-radius: 50%;
      }

  }
</style>
