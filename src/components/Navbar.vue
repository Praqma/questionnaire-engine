<template>
  <nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      <!-- <img v-bind:src="respData.iconURL" width="30" height="30" alt=""> -->
    </a>
    <a class="navbar-brand" href="#">Results</a>
    <a class="navbar-brand" href="#" v-if="title">{{title | titleCase}}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: ["title"],
  filters: {
    titleCase: function(value) {
      return value
        .split("-")
        .map(function(word) {
          return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        })
        .join(" ");
    }
  }
};
</script>
