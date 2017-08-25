<template>
  <!-- <div>
      <div v-for="(item, index) in questions" :key="index">
        <h4>{{item.ask}}</h4>
        <p>{{item.description}}</p>
      </div>
    </div> -->
  <div>
    <button class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>
    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          Questionaire comes below
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['questions']
}
</script>

<style>

</style>
