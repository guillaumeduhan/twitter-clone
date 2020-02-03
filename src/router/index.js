import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import Timeline from '@/views/Timeline.vue'
import TweetView from '@/views/TweetView.vue'

import NotFound from '@/components/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      sidebar: false,
    },
  }, {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      auth: false,
      sidebar: true,
    },
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      auth: false,
      sidebar: false,
    },
  }, {
    path: '/timeline',
    name: 'Timeline',
    component: Timeline,
    meta: {
      auth: false,
      sidebar: true,
    },
  }, {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    meta: {
      auth: false,
      sidebar: true,
    },
  }, {
    path: '/tweet/:id',
    name: 'TweetView',
    component: TweetView,
    meta: {
      auth: false,
      sidebar: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
