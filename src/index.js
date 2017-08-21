import $ from 'jquery'
import './style.css'
import './style/main.scss'

import Vue from 'vue'
import App from './components/App.vue'
// import Tile from './components/Tile.vue'
// Vue.component('tile', Tile)

var matrix = new Vue({
  el: "#matrix",
  components: { App },
  methods: {
    compiled: function() {
      console.log('test');
      $.ajax("api/all")
      .done(function (data) {
        data.forEach(function(questionaire_data) {
          this.json = questionaire_data;
          console.log('data should be loaded');


        }, this);

        // loadBoxes(data)

      })
      .fail(function () {
        console.log('fail');

      })
      .always(function () {
        console.log('request over.');

      });
    }
  }
})


$(document).ready(function () {
  $.ajax("api/all")
    .done(function (data) {
      data.forEach(function(questionaire_data) {
        console.log(questionaire_data.version);

      }, this);

      // loadBoxes(data)

    })
    .fail(function () {
      console.log('fail');

    })
    .always(function () {
      console.log('request over.');

    });

});



// let generateBoxes = function (y, x) {
//   console.log('generate boxes of size: ' + x + y);

//   let htmlString = ""
//   for (let i = 0; i < x; i++) {
//     htmlString += '<div class="container">'
//     for (let j = 0; j < y; j++) {
//       htmlString += '<div class="box" id=' + (i + 1) + (j + 1) + '>' + (i + 1) + (j + 1) + '</div>'
//     }
//     htmlString += "</div>"
//   }
//   return htmlString;
// }

// $("#press").on("click", function () {
//   let x = $("#x-input").val()
//   let y = $("#y-input").val()

//   let htmlString = generateBoxes(x, y);
//   $("#box-container").html(htmlString);

//   $(".box").on("click", function (event) {

//     $("#info").text("clicked: " + event.target.id)
//   })

// })

// function loadBoxes(data) {
//   let htmlString = ""

//   data.forEach(function(row) {
//     htmlString += "<div class='container'>"

//     row.forEach(function(element) {
//       console.log('elemID: ' + element.id);
//       htmlString += '<div class="box" id=' + element.id + '>' + element.title + '</div>'
//     })

//     htmlString += "</div>"

//   }, this);

//   $("#box-container").html(htmlString)
//   console.log(htmlString);


// }

