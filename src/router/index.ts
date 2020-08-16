import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dash',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "dash" */ '../views/Dashboard.vue'),
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/Jobs.vue'),
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () =>
      import(/* webpackChunkName: "tasks" */ '../views/Tasks.vue'),
  },
  {
    path: '/clock',
    name: 'Tiemclock',
    component: () =>
      import(/* webpackChunkName: "timeclock" */ '../views/Timeclock.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
