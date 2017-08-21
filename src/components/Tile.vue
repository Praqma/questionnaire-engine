<template>
  <div>
    <div class="box">
      <b> {{title}} </b>

    </div>
    <formy :questions="questions"></formy>
  </div>
</template>

<script>
import Formy from './Formy.vue'

export default {
  props: ['title', 'item'],
  data() {
    return {
      questions: this.item.questions
    }
  },
  components: { formy: Formy }
}
</script>

<style>
.box {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  margin: 10px;
  background-color: #ff9800;
  padding: 7px;
}

b:hover {
  font-weight: bold;
}
</style>
