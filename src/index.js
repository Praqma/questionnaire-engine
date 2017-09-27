/*eslint no-unused-vars: 1*/

import $ from 'jquery'
import './style/main.scss'

import Vue from 'vue'
import App from './components/App.vue'

var app = new Vue({
  el: "#app",
  components: { App }
})
