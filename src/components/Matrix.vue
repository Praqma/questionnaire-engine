<template>
  <div class="container-fluid no-padding">
    <div class="row no-gutters">
      <div class="col-1"></div>
      <div class="col text-center label-horizontal" v-for="(horLabels, index) in data.labels.horizontal" :key="index">
        <span class="label">{{horLabels}}</span>
      </div>
    </div>

    <div v-for="(row, index) in data.questionnaire" :key="index">
      <tile :rowIndex="index + 1" :row="row" :rowLabel="data.labels.vertical[index]" :rowLength="rowLength" :color="data.colors[index]">
      </tile>
    </div>
  </div>
</template>

<script>
import Tile from './Tile.vue'

export default {
  props: ['data'],
  components: { tile: Tile },
  data() {
    return {
      rowLength: 0
    }
  },
  beforeUpdate() {
    this.rowLength = this.calculateRowLength(this.data.questionnaire)
  },
  methods: {
    calculateRowLength: function(array) {
      if (array && array != null) {
        let maxLength = 0;
        for (let index = 0; index < array.length; index++) {
          let element = array[index]
          if (element.length > maxLength) {
            maxLength = element.length;
          }
        }
        return maxLength;
      } else {
        return 5;
      }

    }
  }
}
</script>

<style>

</style>
