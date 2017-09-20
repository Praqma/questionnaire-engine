<template>
  <div class="container-fluid no-padding">
    <div class="row no-gutters">
      <div class="col-1"></div>
      <div class="col text-center label-horizontal" v-for="(horLabels, index) in labels.horizontal" :key="index">
        <span class="label">{{horLabels}}</span>
      </div>
    </div>

    <div v-for="(row, index) in matrix" :key="index">
      <tile :rowIndex="index + 1" :row="row" :rowLabel="labels.vertical[index]">
      </tile>
    </div>
  </div>
</template>

<script>
import Tile from './Tile.vue'

export default {
  data() {
    return {
      title: "Title of the Tile.",
      matrix: [],
      labels: {}
    }
  },
  components: { tile: Tile },
  mounted: function() {
    var self = this;
    $.ajax("api/forms/100003")
      .done(function(data) {
        self.matrix = data.questionnaire;
        console.log('length: ' + data.questionnaire.length);

        self.labels = data.labels;
      })
      .fail(function() {
        console.warn('Request failed.');
      })
      .always(function() {
        console.log('Request is over.');
      });

    let generateRows = function(items) {
      let matrix = [];
      let rowLength = Math.ceil(Math.sqrt(items.length))

      for (var index = 0; index < items.length; index++) {
        let element = items[index];
        let rowIndex = Math.ceil((index + 1) / rowLength) - 1;
        if (typeof matrix[rowIndex] === "undefined") {
          matrix[rowIndex] = []
        }
        matrix[rowIndex].push(element)
      }

      // fill out with blank array the last row if there aren't enough elements
      let lastRow = matrix[matrix.length - 1]
      while (lastRow.length !== rowLength) {
        lastRow.push([])
      }
      matrix[matrix.length - 1] = lastRow;
      return matrix;
    }
  }
}
</script>

<style>
</style>
