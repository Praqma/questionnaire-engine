<template>
<div class="box">
  <h4>{{title}} </h4>
</div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      msg: 'Hello from Tile!'
    }
  }
}
</script>

<style>
.box {
  display: inline-block;
	width:100px;
  height:100px;
  border: 1px solid black;
  margin: 10px;
  background-color: #ff9800;
  padding: 7px;
}

h4:hover {
  font-weight: bold;
}

</style>
