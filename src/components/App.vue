<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img v-bind:src="respData.iconURL" width="30" height="30" alt="">
      </a>
      <a class="navbar-brand" href="#">{{respData.header}}</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <button class="btn btn-outline-success" v-show="didOpenIntro" data-toggle="modal" data-target="#intro-form" @click="onIntroOpen" type="button"> {{ respData.intro_form.title }} </button>
          <a class="nav-item nav-link" v-for="(link, index) in respData.links" :key="index" v-bind:href="link.url" target="_blank"> {{link.title}} </a>
        </div>
      </div>
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
</template>

<script>
import Matrix from './Matrix.vue'

export default {
  data() {
    return {
      respData: {},
      didOpenIntro: false
    }
  },
  components: { matrix: Matrix },
  mounted: function() {
    var self = this;
    let regular_matrix = "forms/regular-matrix"
    let irregular_matrix = "forms/irregular-questionnaire"
    $.ajax(irregular_matrix)
      .done(function(data) {
        self.respData = data;
      })
      .fail(function() {
        console.warn('Request failed.');
      })
      .always(function() {
        console.log('Request is over.');
      });
  },
  methods: {
    onIntroOpen() {
      this.didOpenIntro = true;
    }
  }
}
</script>

<style>
</style>
