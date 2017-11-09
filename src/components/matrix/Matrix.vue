<template>
  <div class="container-fluid no-padding">

    <div id="startIntroBtn" class="container" v-if="data.intro_form">
      <button v-if="!didOpenIntro" type="button" class="btn btn-secondary btn-lg btn-block" data-toggle="modal" data-target="#intro-form" @click="onIntroOpen">Start here...</button>
      <div class="modal fade" id="intro-form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <formy :form-data="data.intro_form" :questionnaire-id="data.id"></formy>
        </div>
      </div>
    </div>

    <div class="row no-gutters">
      <div class="col-1 label-vertical"></div>
      <div class="col text-center label-horizontal" v-for="(horizontalLabel, index) in data.labels.horizontal" :key="index">
        <span class="label">{{horizontalLabel}}</span>
      </div>
    </div>

    <div v-for="(row, index) in data.questionnaire" :key="index">
      <tile :row-index="index + 1" :row="row" :row-label="data.labels.vertical[index]" :row-length="rowLength" :color="data.colors[index]" :questionnaire-id="data.id">
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
      rowLength: this.calculateRowLength(this.data.questionnaire),
      didOpenIntro: false
    }
  },
  watch: {
    'data.questionnaire': function(val) {
      this.$data.rowLength = this.calculateRowLength(this.data.questionnaire);
      // console.log('updated rl');
    },
    data: function(val) {
      console.log('data changed');
      // console.log(this.data);

    }
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
        return 0;
      }
    },
    onIntroOpen() {
      this.didOpenIntro = true;
      this.$emit('introOpened')
    }
  }
}
</script>

<style>

</style>
