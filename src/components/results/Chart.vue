<template>
  <div class="canvas-wrap">
    <canvas :id="canvasID" width="400" height="400"></canvas>
  </div>
</template>
<script>
export default {
  props: ['id', 'chartData'],
  data() {
    return {
      canvasID: this.getCanvasID()
    }
  },
  mounted: function() {
    var ctx = document.getElementById(this.canvasID);
    let type = this.$props.chartData.type
    let data = this.$props.chartData.data
    var myChart = new Chart(ctx, { type, data });
  },
  methods: {
    getCanvasID() {
      let minimum = 10000
      let maximum = 90000
      let randomID = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      let canvasID = 'canvas' + randomID
      console.log('ID: ' + canvasID);
      return canvasID
    }
  }
}

</script>

<style>
  .canvas-wrap {
    width: 300px;
    height: 300px;
  }
</style>
