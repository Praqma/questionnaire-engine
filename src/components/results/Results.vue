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
    <div class="container-fluid" v-if="requestOk">
      <div class="row">
        <div class="col" v-for="(result, index) in results" :key="index">

          <div v-for="(singleResult, index) in result.formResults" :key="index" class="card" style="width: 20rem;">

            <div v-if="singleResult.type === 'pie'">
              {{result.formID}}
              <div class="card-body">
                <h4 class="card-title">{{singleResult.question.ask}}</h4>
                <h6 class="card-subtitle mb-2 text-muted"></h6>
                <p class="card-text">{{singleResult.question.description}}</p>
                <chart :id="index" :chartData="singleResult"></chart>
              </div>
            </div>

            <div v-if="singleResult.type === 'short_answer'">
              {{result.formID}}
              <div class="card-body">
                <h4 class="card-title">{{singleResult.question.ask}}</h4>
                <h6 class="card-subtitle mb-2 text-muted">{{singleResult.question.description}}</h6>
                <!-- <p class="card-text">{{singleResult.id}}</p> -->
                <div v-if="singleResult.data.length > 0">
                  <ul class="list-group list-group-hover list-group-striped">
                    <li class="list-group-item" v-for="(listElem, index) in singleResult.data" :key="index">
                      {{listElem}}
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p>No answers yet.</p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!result" class="alert alert-warning" role="alert">
            This data type is in development.
          </div>

        </div>
      </div>
    </div>
    <div v-if="requestOk === null" class="alert-center">
      <img src="/static/Preloader_3.gif" alt="">
      <h2>Loading...</h2>
    </div>
    <div v-if="requestOk === false">
      <div class="alert alert-danger" role="alert">
        The server responded with an error. That's all we know now.
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

      // ============= DEBUG ==============
      //  REPLACE:
      //  /api/results/ + pathname
      // =========== END OF DEBUG =========
      $.ajax("/static/template.json")
        .done(function(data) {
          self.results = data.results;
          console.log(self.results);
          self.requestOk = true;
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

<style>
.alert-center {
  margin-left: 40vw;
  margin-top: 10vw;
}

.list-group {
  height: 170px;
  overflow-x: scroll;
}
.list-group-item {
  height: 40px;
  padding-top: 0.5rem
}

ul.list-group.list-group-striped li:nth-of-type(odd) {
  background: white;
}

ul.list-group.list-group-striped li:nth-of-type(even) {
  background: whitesmoke;
}



/* ul.list-group.list-group-hover li:hover{
    background: #D4D7DB;
} */
</style>
