// import './style.scss'
import $ from 'jquery'
import './style.css'

let generateBoxes = function (y, x) {
  console.log('generate boxes of size: ' + x + y);

  let htmlString = ""
  for (let i = 0; i < x; i++) {
    htmlString += '<div class="container">'
    for (let j = 0; j < y; j++) {
      htmlString += '<div class="box" id=' + (i + 1) + (j + 1) + '>' + (i + 1) + (j + 1) + '</div>'
    }
    htmlString += "</div>"
  }
  return htmlString;
}

$("#press").on("click", function () {
  let x = $("#x-input").val()
  let y = $("#y-input").val()

  let htmlString = generateBoxes(x, y);
  $("#box-container").html(htmlString);

  $(".box").on("click", function (event) {

    $("#info").text("clicked: " + event.target.id)
  })

})

function loadBoxes(data) {
  let htmlString = ""

  data.forEach(function(row) {
    htmlString += "<div class='container'>"

    row.forEach(function(element) {
      console.log('elemID: ' + element.id);
      htmlString += '<div class="box" id=' + element.id + '>' + element.title + '</div>'
    })

    htmlString += "</div>"

  }, this);

  $("#box-container").html(htmlString)
  console.log(htmlString);


}

$(document).ready(function () {
  $.ajax("api/questionaire")
    .done(function (data) {
      console.log("data: " + data.version);

      // loadBoxes(data)

    })
    .fail(function () {
      console.log('fail');

    })
    .always(function () {
      console.log('complete');

    });

});
