<template>
  <div>
    <tile
      v-for="(item, index) in items" :key="index" v-bind:title="item.title" v-bind:item="item">
    </tile>
  </div>
</template>

<script>
import Tile from './Tile.vue'

export default {
  data() {
    return {
      title: "Title of the Tile",
      items: []
    }
  },
  components: { tile: Tile },
  mounted: function () {
    var self = this;
    $.ajax("api/all")
      .done(function (data) {
        self.items = data;
      })
      .fail(function () {
        console.log('fail');
      })
      .always(function () {
        console.log('request over.');
      });
  }
}
</script>

<style>

</style>
