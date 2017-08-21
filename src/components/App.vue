<template>
  <div>
    <tile v-bind:title="title"></tile>
  </div>
</template>

<script>
import Tile from './Tile.vue'

export default {
  data() {
    return {
      title: "Title of the Tile"
    }
  },
  components: {tile: Tile}
}
</script>

<style>

</style>
