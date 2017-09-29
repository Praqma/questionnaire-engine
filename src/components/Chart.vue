<template>
  <div>
    <canvas id="someid" width="400" height="400"></canvas>
  </div>
</template>
<script>
export default {
  props: ['id', 'chartData'],
  data() {
    return {

    }
  },
  mounted: function() {
    var ctx = document.getElementById("someid");
    var myChart = new Chart(ctx, this.chartData);
  }
}

</script>
