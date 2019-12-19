<template>
  <div class="login">
    <el-card>
      <div class="title">
        <img src="../../assets/logo_index.png" />
      </div>
      <el-form style="margin-top:20px" ref="myForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <!-- 手机号 -->
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile" ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 验证码 -->
          <el-input style="width:60%" placeholder="请输入验证码" v-model="loginForm.code" ></el-input>
          <!-- 发送验证码 -->
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <!-- 同意选项 -->
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    // 绑定数据
    return {
      // 定义一个表单数据对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选
      },
      loginRules: {
        // 验证规则 验证登录表单的  key(字段名):value(数组)
        // required true -> 必填
        mobile: [{ required: true, message: '请输入您的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确'
        }],
        code: [{ required: true, message: '请输入您的验证码' }, {
          pattern: /^\d{6}$/,
          message: '验证码格式不正确'
        }],
        // 自定义函数
        check: [{ validator: function (rule, value, callback) {
          //   rule当前的规则 没什么用
          // value指的就是我们要校验的字段的值
          console.log(value)

          if (value) {
            //  认为校验通过 放过去
            callback() // 直接执行callback 认为通过
          } else {
            //  认为校验不通过 要提示信息
            callback(new Error('不勾选无法登陆'))
          }
        } }]
      }
    }
  },
  methods: {
    login () {
      // 校验整个表单的规则
      // validate 是一个方法 => 方法中传入的一个函数 两个校验参数  是否校验成功/未校验成功的字段
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          // console.log(this)
          // console.log('校验成功')
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            console.log(result)
            window.localStorage.setItem('user-token', result.data.data.token) // 前端缓存令牌
            this.$router.push('/home') // 跳转到主页
          }).catch(() => {
            // elementUI的方法
            console.log('进来了')
            this.$message({
              message: '您的手机号或者验证码不正确',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-image: url("../../assets/login_bg.jpg");
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 350px;
    .title {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
