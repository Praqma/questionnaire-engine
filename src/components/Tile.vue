<template>
  <div class="row">
    <div class="col" v-for="(item, index) in row" :key="index">
      <div id="box-container" v-if="item.id">
        <a href="#" data-toggle="modal" :data-target="'#' + item.id">
          <div class="box">
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
  props: ['row'],
  data() {
    return {
      // divId: "#" + this.item.id
    }
  },
  components: { formy: Formy }
}
</script>

<style>
.box-container {
  display: inline-block;
}

.box {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  padding: 7px;
  margin: 10px;
  background-color: #ff9800;
}

.box:hover {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: initial;
}
</style>
