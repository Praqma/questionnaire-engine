<template>
  <div class="row no-gutters">
    <div class="col" v-for="(item, index) in row" :key="index">
      <div v-if="item.id" class="box">
        <div class="content">
          <a href="#" data-toggle="modal" :data-target="'#' + item.id">
            <b> {{item.title}} </b>
          </a>
        </div>
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

</style>
