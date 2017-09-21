<template>
  <div class="container-fluid no-padding">
    <div class="row no-gutters">
      <div class="col-1"></div>
      <div class="col text-center label-horizontal" v-for="(horLabels, index) in labels.horizontal" :key="index">
        <span class="label">{{horLabels}}</span>
      </div>
    </div>

    <div v-for="(row, index) in matrix" :key="index">
      <tile :rowIndex="index + 1" :row="row" :rowLabel="labels.vertical[index]" :rowLength="rowLength" :color="colors[index]">
      </tile>
    </div>
  </div>
</template>

<script>
import Tile from './Tile.vue'

export default {
  data() {
    console.log('Header data called');

    return {
      title: "Title of the Tile.",
      matrix: [],
      rowLength: 0, // = max row length
      labels: {},
      colors: [],
      header: "test"
    }
  },
  components: { tile: Tile },
  mounted: function() {
    var self = this;
    $.ajax("api/forms/100004")
      .done(function(data) {
        self.matrix = data.questionnaire;
        self.rowLength = self.calculateRowLength(data.questionnaire)
        self.labels = data.labels;
        self.colors = data.colors
        self.header = data.header;
        console.log('Header data received');

      })
      .fail(function() {
        console.warn('Request failed.');
      })
      .always(function() {
        console.log('Request is over.');
      });
  },
  methods: {
    calculateRowLength: function(array) {
      let maxLength = 0;
      for (let index = 0; index < array.length; index++) {
        let element = array[index]
        if (element.length > maxLength){
          maxLength = element.length;
        }
      }
      return maxLength;
    }
  }
}
</script>

<style>
</style>
