<template>
  <div v-if="results">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <!-- <img v-bind:src="respData.iconURL" width="30" height="30" alt=""> -->
      </a>
      <a class="navbar-brand" href="#">Results</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
        </div>
      </div>
    </nav>
    <div class="container-fluid">

        <div class="col-md-4" v-for="(chart, index) in results" :key="index">
          <chart :id="index" :chartData="chart"></chart>
        </div>


    </div>
    <nav class="navbar fixed-bottom navbar-dark bg-dark">
      <a class="navbar-brand" href="#">footer</a>
    </nav>
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

