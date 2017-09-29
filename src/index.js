/*eslint no-unused-vars: 1*/

import $ from 'jquery'
import './style/main.scss'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Results from './components/Results.vue'
import NotFound from './components/NotFound.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/:id',
      component: App,
      props: true
    },
    {
      path: '/results/:id',
      component: Results,
      props: true
    }
  ]
});

var app = new Vue({router}).$mount('#app')
