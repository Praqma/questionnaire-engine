<template>
  <div v-if="results">
    <div v-for="(chart, index) in results" :key="index">
      <chart :id="index" :chartData="chart"></chart>
    </div>
  </div>
</template>
<script>
import Chart from './Chart.vue'

export default {
  props: ['id', 'chartData'],
  data() {
    return {
      results: {},
      requestOk: null
    }
  },
  components: { chart: Chart },
  mounted: function() {
    this.loadChartData();
  },
  methods: {
    loadChartData() {
      let self = this
      let pathname = this.$props.id;
      if (!pathname) {
        return console.log('FATAL: could not get pathname.')
      }
      $.ajax("/api/results/" + pathname)
        .done(function(data) {
          self.results = data.results;
          console.log(self.results);
          self.requestOk = true;
          console.log('requestok: ' + self.requestOk);
        })
        .fail(function() {
          console.warn('Request failed.');
          self.requestOk = false;
        })
        .always(function() {
          console.log('Request is over.');
        });
    }
  }
}
</script>

