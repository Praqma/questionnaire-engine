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
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {"labels":["First option","Second option","Third option"],"datasets":[{"backgroundColor":["#4872b5","#f1c6ff","#f8c0f9"],"data":[0,1,1]}]}
    });
  }
}

</script>
