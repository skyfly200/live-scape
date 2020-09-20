import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store";

import { Auth } from "@/firebase/auth";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/dash",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dash" */ "../views/Dashboard.vue"),
    meta: {
      requiresAuth: true,
      roleAccess: ["manager", "contractor", "admin"],
    },
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: () => import(/* webpackChunkName: "jobs" */ "../views/Jobs.vue"),
    meta: {
      requiresAuth: true,
      roleAccess: ["manager", "contractor", "admin"],
    },
  },
  {
    path: "/jobs/:id",
    name: "Job",
    component: () => import(/* webpackChunkName: "job" */ "../views/Job.vue"),
    meta: {
      requiresAuth: true,
      roleAccess: ["manager", "contractor", "admin"],
    },
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () =>
      import(/* webpackChunkName: "tasks" */ "../views/Tasks.vue"),
    meta: {
      requiresAuth: true,
      roleAccess: ["manager", "contractor", "admin"],
    },
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: () =>
      import(/* webpackChunkName: "contacts" */ "../views/Contacts.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/locations",
    name: "Locations",
    component: () =>
      import(/* webpackChunkName: "locations" */ "../views/Locations.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/clients",
    name: "Clients",
    component: () =>
      import(/* webpackChunkName: "clients" */ "../views/Clients.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/contractors",
    name: "Contractors",
    component: () =>
      import(/* webpackChunkName: "contractors" */ "../views/Contractors.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
    meta: {
      requiresAuth: true,
      roleAccess: ["admin"],
    },
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: () =>
      import(/* webpackChunkName: "schedule" */ "../views/Schedule.vue"),
    meta: {
      requiresAuth: true,
      roleAccess: ["manager", "contractor", "admin"],
    },
  },
  {
    path: "/clock",
    name: "Timeclock",
    component: () =>
      import(/* webpackChunkName: "timeclock" */ "../views/Timeclock.vue"),
    meta: {
      requiresAuth: true,
      roleAccess: ["manager", "contractor", "admin"],
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
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (Auth.currentUser === null) await store.dispatch("auth/syncAuth");
    if (Auth.currentUser !== null) {
      if (to.matched.some((route) => !!route.meta.roleAccess)) {
        // Confirm the user has a matching role
        const role = store.state.auth.token.claims.role;
        console.log(role);

        if (to.matched.some((route) => route.meta.roleAccess.includes(role))) {
          next();
        } else {
          next("/dash");
        }
      } else {
        next();
      }
    } else {
      next("/");
    }
  } else next();
});

export default router;
