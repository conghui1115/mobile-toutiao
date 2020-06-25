<template>
<div class="container">
    <van-nav-bar left-arrow title='登录' @click-left="$router.back()"></van-nav-bar>
    <!-- 登录布局 -->
    <van-cell-group>
      <van-field  @blur="checkMobile"  :error-message='errorMessage.mobile' v-model.trim='loginForm.mobile' label="手机号" placeholder="请输入手机号"></van-field>
      <van-field  @blur="checkCode" :error-message='errorMessage.code' v-model.trim="loginForm.code" label="验证码" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
      <div class="login-box">
        <van-button type="info" round  block @click="login">登录</van-button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单数据
      loginForm: {
        mobile: '13911111111', // 手机号
        code: '246810'// 验证码
      },
      errorMessage: {
        mobile: '', // 手机错误提示信息
        code: '' // 验证码错误提示信息
      }
    }
  },
  methods: {
    // 定义检查手机号的方法 不能为空手机号格式正确
    checkMobile () {
      // 获取手机号 判断是否为空 满足手机号的格式
      if (!this.loginForm.mobile) {
        this.errorMessage.mobile = '手机号不能为空'
        // 表示没有往下验证的必要了
        return false
      }
      // 手机号格式是否正确
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errorMessage.mobile = '手机号格式不正确'
        return false
      }
      // 如果到了这里  说明验证通过了
      this.errorMessage.mobile = ''
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errorMessage.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errorMessage.code = '验证码为6位数字'
        return false
      }
      // 验证通过
      this.errorMessage.code = ''
      return true
    },
    login () {
      // 说明两个函数返回的都是true
      // 校验格式通过接着调接口看登录名和验证码是否正确
      if (this.checkMobile() && this.checkCode()) {
        console.log('校验通过')
      }
    }
  }
}
</script>

<style>
.login-box{
  padding: 20px;
}
</style>
