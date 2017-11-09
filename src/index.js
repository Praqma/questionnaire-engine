/*eslint no-unused-vars: 1*/

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/matrix/App.vue'
import Results from './components/results/Results.vue'
import NotFound from './components/NotFound.vue'
import './style/main.scss'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: App
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
