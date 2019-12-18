<template>
    <div class="login">
        <el-card>
            <div class="title">
                <img src="../../assets/logo_index.png">
            </div>
            <el-form style="margin-top:20px">
                <el-form-item>
                    <!-- 手机号 -->
                    <el-input placeHolder="请输入手机号"></el-input>
                </el-form-item>
            <el-form-item>
                 <!-- 验证码 -->
                 <el-input style="width:60%" placeHolder="请输入验证码" ></el-input>
                 <!-- 发送验证码 -->
                 <el-button style="float:right">发送验证码</el-button>
             </el-form-item>
              <el-form-item>
                 <!-- 同意选项 -->
                 <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
             </el-form-item>
              <el-form-item>
                  <!-- 登录按钮 -->
                  <el-button type="primary" style="width:100%">登录</el-button>
              </el-form-item>
              </el-form>
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .login {
            background-image: url('../../assets/login_bg.jpg');
            background-size: cover ;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            .login-card {
                width: 440px;
                height: 350px;
                .title {
                    text-align : center;
                    img {
                         height:45px;
                    }
                }
            }
    }
</style>
