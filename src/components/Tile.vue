<template>
  <div>
    <div id="box-container">
      <a data-toggle="modal" :data-target="divId">
        <div class="box">
          <b> {{item.title}} </b>
        </div>
      </a>
    </div>
    <div class="modal fade bd-example-modal-lg" v-bind:id="item.id" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <formy :questions="item.questions"></formy>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Formy from './Formy.vue'

export default {
  props: ['item'],
  data() {
    return {
      // title: this.item.title,
      divId: "#" + this.item.id
      // formData: this.item.questions
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
