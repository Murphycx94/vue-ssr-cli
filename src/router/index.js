'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export function createRouter () {
  return new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { name: 'home', path: '/home', component: resolve => require(['../views/index.vue'], resolve)},
      { path: '*', redirect: { name: 'home' } }
    ]
  })
}
