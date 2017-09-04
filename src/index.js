/*eslint no-unused-vars: 1*/

import $ from 'jquery'
import './style.css'
import './style/main.scss'

import Vue from 'vue'
import App from './components/App.vue'
// import Tile from './components/Tile.vue'
// Vue.component('tile', Tile)

var matrix = new Vue({
  el: "#matrix",
  components: { App }
})


$(document).ready(function () {


});

