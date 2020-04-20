import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import ServerEdit from "./views/ServerEdit.vue";
import ServerList from "./views/ServerList.vue";
import UserEdit from "./views/UserEdit.vue";
import UserList from "./views/UserList.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      children: [
        {
          path: "/server/edit",
          component: ServerEdit
        },
        {
          path: "/server/edit/:id",
          component: ServerEdit,
          props: true
        },
        {
          path: "/server",
          component: ServerList
        },
        {
          path: "/user/edit",
          component: UserEdit
        },
        {
          path: "/user/edit/:id",
          component: UserEdit,
          props: true
        },
        {
          path: "/user",
          component: UserList
        }
      ]
    }
  ]
});
