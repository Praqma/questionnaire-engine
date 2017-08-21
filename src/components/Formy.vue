<template>
  <div>
    <div v-for="(item, index) in questions" :key="index">
      <h4>{{item.ask}}</h4>
      <p>{{item.description}}</p>
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
