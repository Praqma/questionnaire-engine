<template>
  <div class="form container">
    Questionaire comes below <br>
    {{questions}}
  </div>
</template>

<script>
export default {
  props: ['questions']
}
</script>

<style>
.form {
  all: revert;
}
</style>
