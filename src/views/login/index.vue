<template>
<div class="container">
    <van-nav-bar left-arrow title='登录' @click-left="$router.back()"></van-nav-bar>
    <!-- 登录布局 -->
    <van-cell-group>
      <van-field label="手机号" placeholder="请输入手机号"></van-field>
      <van-field label="验证码" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
      <div class="login-box">
        <van-button type="info" round  block>登录</van-button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style>
.login-box{
  padding: 20px;
}
</style>
