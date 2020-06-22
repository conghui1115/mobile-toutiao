<template>
  <div class="container">
    <!-- 采用vant 组件导航 -->
    <van-nav-bar v-if="showNavBar" title="头条" right-text="搜索"></van-nav-bar>
    <!-- 二级路由容器-->
    <div class="my-wrapper" :class="{noTop: !showNavBar}">
      <router-view></router-view>
    </div>
    <!-- 底部标签栏 -->
  <van-tabbar route>
    <van-tabbar-item to='/' icon='home-o'>首页</van-tabbar-item>
    <van-tabbar-item to='/question' icon='chat-o'>问答</van-tabbar-item>
    <van-tabbar-item to='/video' icon='video-o'>视频</van-tabbar-item>
    <van-tabbar-item to='/user' icon='user-o'>我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  computed: {
    // 是否显示navbar
    showNavBar () {
      return this.$route.path !== '/user'
    }
  }

}
</script>

<style lang='less' scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
