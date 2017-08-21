<template>
<div class="box">
  <b> {{title}} </b>
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

b:hover {
  font-weight: bold;
}

</style>
