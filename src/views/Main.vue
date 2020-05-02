<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-menu
      default-active="$route.path"
      router
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">服务器</span>
          <el-menu-item index="/servers">服务器列表</el-menu-item>
          <el-menu-item index="/servers/edit">新增服务器</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <span slot="title">账单</span>
          <el-menu-item index="/users">账单列表</el-menu-item>
          <el-menu-item index="/users/edit">新增支付</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/chart">
        <i class="el-icon-s-data"></i>
        <span slot="title">数据图表</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4" disabled>
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>

    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
};
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
