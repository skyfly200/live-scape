import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store/index";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dash",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dash" */ "../views/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: () => import(/* webpackChunkName: "jobs" */ "../views/Jobs.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () =>
      import(/* webpackChunkName: "tasks" */ "../views/Tasks.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/clock",
    name: "Tiemclock",
    component: () =>
      import(/* webpackChunkName: "timeclock" */ "../views/Timeclock.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/*",
    name: "Error404",
    component: () =>
      import(/* webpackChunkName: "error404" */ "@/views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
