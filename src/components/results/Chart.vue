<!-- HTML code -->
<template>
  <div class="canvas-wrap">
    <canvas :id="canvasID" width="400" height="400"></canvas>
  </div>
</template>

<!-- JavaScript code -->
<script>
export default {
  // Properties received from parent component that instantiates this
  props: ['id', 'chart-data'],
  // Handling data with binding in mind
  data() {
    return {
      canvasID: this.getCanvasID()
    }
  },
  // Method to execute when the element gets mounted to the DOM
  mounted: function() {
    var ctx = document.getElementById(this.canvasID);
    let type = this.$props.chartData.type
    let data = this.$props.chartData.data
    var myChart = new Chart(ctx, { type, data });
  },
  // Methods that can be called inside the component
  methods: {
    getCanvasID() {
      // Replace this with GUID
      let minimum = 10000
      let maximum = 90000
      let randomID = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      let canvasID = 'canvas' + randomID
      return canvasID
    }
  }
}
</script>

<!-- CSS code - can be local to this component or global for the whole app -->
<style>
  .canvas-wrap {
    width: 300px;
    height: 300px;
  }
</style>
