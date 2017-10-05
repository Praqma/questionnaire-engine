<template>
  <div>
    <div v-if="requestOk">
      <nav class="navbar navbar-expand-sm navbar-dark justify-content-center bg-dark">
        <ul class="nav ">
          <li class="nav-item">
            <a class="navbar-brand" href="#">
              <img v-bind:src="respData.iconURL" width="30" height="30" alt="">
            </a>
          </li>
          <li class="nav-item">
            <a class="navbar-brand" href="#">{{respData.header}}</a>
          </li>
          <li class="nav-item">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </li>
          <li class="nav-item">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <button class="btn btn-outline-success" v-show="didOpenIntro" data-toggle="modal" data-target="#intro-form" @click="onIntroOpen" type="button"> {{ respData.intro_form.title }} </button>
                <a class="nav-item nav-link" v-for="(link, index) in respData.links" :key="index" v-bind:href="link.url" target="_blank"> {{link.title}} </a>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <div class="container-fluid">
        <div id="matrix" class="container-fluid matrix-container no-padding">
          <matrix v-bind:data="respData" v-on:introOpened="onIntroOpen"></matrix>
        </div>
      </div>
      <nav class="navbar fixed-bottom navbar-dark bg-dark">
        <a class="navbar-brand" href="#">{{respData.footer}}</a>
      </nav>
    </div>
    <div v-if="requestOk === false">
      <not-found></not-found>
    </div>
  </div>
</template>

<script>
import Matrix from './Matrix.vue'
import NotFound from '../NotFound.vue'
import path from 'path'

export default {
  data() {
    return {
      respData: {},
      didOpenIntro: false,
      requestOk: null
    }
  },
  components: { matrix: Matrix, notFound: NotFound },
  mounted: function() {
    this.loadData();
  },
  watch: {
    '$route.path': function(val) {
      this.loadData()
    }
  },
  methods: {
    onIntroOpen() {
      this.didOpenIntro = true;
    },
    loadData() {
      var self = this;
      let pathname = window.location.pathname.replace("/", "")
      if (!pathname) {
        return self.requestOk = false;
      }
      $.ajax("api/forms/" + pathname)
        .done(function(data) {
          self.respData = data;
          self.requestOk = true;
        })
        .fail(function() {
          console.warn('Request failed.');
          self.requestOk = false;
        })
        .always(function() {
          // console.log('Request is over.');
        });
    }
  }
}
</script>

<style>

</style>
