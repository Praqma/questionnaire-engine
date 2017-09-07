<template>
  <div class="row no-gutters">
    <div class="col" v-for="(item, index) in row" :key="index">
      <div v-if="item.id" class="box">
        <a href="" data-toggle="modal" :data-target="'#' + item.id">
          <div class="content text-uppercase" :class="'color' + rowIndex" :style="'opacity: ' + colorOpacity(index)">
            <b> {{item.title}} </b>
          </div>
        </a>
      </div>

      <div class="modal fade" v-bind:id="item.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <formy :formData="item"></formy>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Formy from './Formy.vue'

export default {
  props: ['row', 'rowIndex'],
  data() {
    return {
      rowLength: this.row.length
    }
  },
  components: { formy: Formy },
  methods: {
    colorOpacity: function(index) {
      let base = 0.5;
      let fading = 1 - base;
      let individualOpacity = fading / this.rowLength;
      let opacity = base + individualOpacity * index + individualOpacity;
      return opacity
    }
  }
}
</script>

<style>

</style>
