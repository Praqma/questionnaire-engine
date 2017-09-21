/*eslint no-unused-vars: 1*/

import $ from 'jquery'
import './style/main.scss'

import Vue from 'vue'
import App from './components/App.vue'
// import Tile from './components/Tile.vue'
// Vue.component('tile', Tile)

var matrix = new Vue({
  el: "#matrix",
  components: { App }
})

let infoComponent = new Vue({
  el: '#app',
  data: {
    header: matrix.components.App.data().header
  }
})

$(document).ready(function () {

  // should trigger jenkins build
});

