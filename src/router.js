import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import ServerEdit from "./views/ServerEdit.vue";
import ServerList from "./views/ServerList.vue";
import UserEdit from "./views/UserEdit.vue";
import UserList from "./views/UserList.vue";
import ChartMain from "./views/ChartMain.vue";

import MobileMain from "./mobile-views/Main.vue";
import MobileServerList from "./mobile-views/ServerList.vue";
import MobileUserList from "./mobile-views/UserList.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      children: [
        {
          path: "/servers/edit",
          component: ServerEdit,
        },
        {
          path: "/servers/edit/:id",
          component: ServerEdit,
          props: true,
        },
        {
          path: "/servers",
          component: ServerList,
        },
        {
          path: "/users/edit",
          component: UserEdit,
        },
        {
          path: "/users/edit/:id",
          component: UserEdit,
          props: true,
        },
        {
          path: "/users",
          component: UserList,
        },
        {
          path: "/chart",
          component: ChartMain,
        },
      ],
    },
    {
      path: "/mobile",
      name: "mobile-main",
      component: MobileMain,
      children: [
        {
          path: "/mobile/servers",
          component: MobileServerList,
        },
        {
          path: "/mobile/users",
          component: MobileUserList,
        },
      ],
    },
  ],
});
