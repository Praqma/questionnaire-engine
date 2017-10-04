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
    let resp = {"type":"pie","data":{"labels":["First option","Second option","Third option"],"datasets":[{"backgroundColor":["#ef62e6","#d339cb","#991d3c"],"data":[7,3,4]}]}}
    var myChart = new Chart(ctx, {
      type: resp.type,
      data: resp.data
    });
  }
}

</script>
