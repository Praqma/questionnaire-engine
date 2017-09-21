<template>
  <div class="container-fluid no-padding">

    <div id="startIntroBtn" class="container">
      <button v-if="!openedIntro" type="button" class="btn btn-secondary btn-lg btn-block" data-toggle="modal" data-target="#intro-form" @click="openedIntro = true">Start here...</button>
      <div class="modal fade" id="intro-form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <formy :formData="data.intro_form"></formy>
          </div>
        </div>
    </div>

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
import Formy from './Formy.vue'

export default {
  props: ['data'],
  components: { tile: Tile, formy: Formy },
  data() {
    return {
      rowLength: 0,
      openedIntro: false
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
