<template>
  <div id="main-wrapper" data-spy="scroll" data-target="#navbar-results" data-offset="20" v-if="results">
    <navbar></navbar>
    <div class="container-fluid" v-if="requestOk">
      <div class="row">

        <div class="col-md-4 col-lg-3 col-xl-2">
          <nav id="navbar-results" class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <nav class="nav nav-pills flex-column dropdown">
              <div v-for="(result, formIndex) in results" :key="formIndex">
                <a class="nav-link" :href="'#item-' + formIndex">{{result.formID | titleCase}}</a>
              </div>
            </nav>
          </nav>
        </div>

        <div class="col">
          <div class="row" v-for="(result, formIndex) in results" :key="formIndex" :id="'item-' + formIndex" role="tablist">

            <div class="col-12" style="margin-top:10px;">
              <h1>{{result.formID | titleCase}}</h1><hr>
            </div>

            <div v-for="(singleResult, itemIndex) in result.formResults" :key="itemIndex"   v-if="singleResult"
            :id="'item-' + formIndex + '-' + itemIndex" class="col-lg-6 col-xl-4" style="width: 20rem;">
              <div class="card" style="width: 20rem;">
                <!-- <h2>Item {{formIndex}}-{{itemIndex}}</h2> -->

                <div v-if="singleResult.type === 'pie'">
                  <!-- {{result.formID}} -->
                  <div class="card-body">
                    <h4 class="card-title">{{singleResult.question.ask}}</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{{singleResult.question.description}}</h6>
                    <p class="card-text"></p>
                    <chart :id="itemIndex" :chart-data="singleResult"></chart>
                  </div>
                </div>

                <div v-else-if="singleResult.type === 'short_answer'">
                  <!-- {{result.formID}} -->
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

                <div v-else>
                  <div class="card-body">
                    <h4 class="card-title">&#9888; Nothing to show</h4>
                    <h6 class="card-subtitle mb-2 text-muted">This feature is currently under development.</h6>
                    <p class="card-text"><code>{{singleResult}}</code></p>
                  </div>
                </div>

                <hr>

                <div v-if="!result" class="alert alert-warning" role="alert">
                  This data type is in development.
                </div>
              </div>
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
                <ul class="nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/irregular-questionnaire">Irregular questionnaire</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/regular-matrix">Regular matrix</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/results/irregular-questionnaire">Results</router-link>
          </li>
        </ul>
      </nav>
    </div>
</template>


<script>
  import Chart from "./Chart.vue";
  import Navbar from "../Navbar.vue";

  export default {
    props: ["id"],
    data() {
      return {
        results: {},
        requestOk: null
      };
    },
    components: {
      chart: Chart,
      navbar: Navbar
    },
    mounted: function () {
      this.loadChartData();
    },
    filters: {
      titleCase: function(value) {
        return value.split('-').map(function(word) {
          return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
        }).join(' ')
      }
    },
    methods: {
      loadChartData() {
        let self = this;
        let pathname = this.$props.id;
        if (!pathname) {
          return console.log("FATAL: could not get pathname.");
        }

        // ============= DEBUG ==============
        //  REPLACE:
        //  /api/results/ + pathname
        // =========== END OF DEBUG =========
        $.ajax("/static/template.json")
          .done(function (data) {
            self.results = data.results;
            console.log(self.results);
            self.requestOk = true;
          })
          .fail(function () {
            console.warn("Request failed.");
            self.requestOk = false;
          })
          .always(function () {
            console.log("Request is over.");
          });
      }
    }
  };

</script>

<style>
  .alert-center {
    margin-left: 40vw;
    margin-top: 10vw;
  }

  .list-group {
    max-height: 200px;
    overflow-x: scroll;
  }

  .list-group-item {
    height: 40px;
    padding-top: 0.5rem;
  }

  ul.list-group.list-group-striped li:nth-of-type(odd) {
    background: white;
  }

  ul.list-group.list-group-striped li:nth-of-type(even) {
    background: whitesmoke;
  }
  /* Ensure navbar scrolling behaviour */

  #main-wrapper {
    position: fixed;
    height: 100vh;
    overflow-y: scroll;
  }

  #navbar-results {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    bottom: 0;
  }

.card {
  margin-bottom: 15px;
}

</style>

<style scoped>
h1:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>
