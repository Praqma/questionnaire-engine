<template>
  <div class="container-fluid no-padding">
    <div>
      <span v-for="(horLabel, index) in labels.horizontal" class="badge badge-info" :key="index">Default</span>
    </div>
    <tile v-for="(row, index) in matrix" :key="index" :rowIndex="index + 1" :row="row">
    </tile>
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
