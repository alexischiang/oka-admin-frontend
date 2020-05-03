<template>
  <div class="mobile-main">
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="desktop-o" to="/mobile/servers"
        >服务器</van-tabbar-item
      >
      <van-tabbar-item icon="vip-card-o" to="/mobile/users"
        >用户</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style></style>
