import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '../store'
import { Auth } from '@/firebase/auth'
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/Jobs.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/jobs/:id',
    name: 'Job',
    component: () => import(/* webpackChunkName: "job" */ '../views/Job.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () =>
      import(/* webpackChunkName: "tasks" */ '../views/Tasks.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () =>
      import(/* webpackChunkName: "contacts" */ '../views/Contacts.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/locations',
    name: 'Locations',
    component: () =>
      import(/* webpackChunkName: "locations" */ '../views/Locations.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () =>
      import(/* webpackChunkName: "clients" */ '../views/Clients.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/contractors',
    name: 'Contractors',
    component: () =>
      import(/* webpackChunkName: "contractors" */ '../views/Contractors.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () =>
      import(/* webpackChunkName: "schedule" */ '../views/Schedule.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/clock',
    name: 'Timeclock',
    component: () =>
      import(/* webpackChunkName: "timeclock" */ '../views/Timeclock.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/*',
    name: 'Error404',
    component: () =>
      import(/* webpackChunkName: "error404" */ '@/views/404.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    await store.dispatch('auth/syncAuth')
    if (Auth.currentUser !== null) {
      next()
    } else {
      next('/')
    }
  }
  next()
})

export default router
