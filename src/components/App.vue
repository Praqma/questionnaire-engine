<template>
  <div class="container-fluid no-padding">
    <tile v-for="(row, index) in rows" :key="index" :rowIndex="index + 1" :row="row">
    </tile>
  </div>
</template>

<script>
import Tile from './Tile.vue'

export default {
  data() {
    return {
      title: "Title of the Tile.",
      rows: []
    }
  },
  components: { tile: Tile },
  mounted: function() {
    var self = this;
    $.ajax("api/forms/100003")
      .done(function(data) {
        // temporarily remove 1st element as it is something weird
        data.shift();
        self.rows = generateRows(data);
      })
      .fail(function() {
        console.log('Request failed.');
      })
      .always(function() {
        console.log('Request is over.');
      });

    let generateRows = function(items) {
      let rows = [];
      let rowLength = Math.ceil(Math.sqrt(items.length))

      for (var index = 0; index < items.length; index++) {
        let element = items[index];
        let rowIndex = Math.ceil((index + 1) / rowLength) - 1;
        if (typeof rows[rowIndex] === "undefined") {
          rows[rowIndex] = []
        }
        rows[rowIndex].push(element)
      }

      // fill out with blank array the last row if there aren't enough elements
      let lastRow = rows[rows.length - 1]
      console.log("LAST ROW before")
      console.log(lastRow);
      while(lastRow.length !== rowLength) {
        lastRow.push([])
      }
      rows[rows.length - 1] = lastRow;
      console.log("LAST ROW after")
      console.log(lastRow);
      return rows;
    }
  }
}
</script>

<style>

</style>
