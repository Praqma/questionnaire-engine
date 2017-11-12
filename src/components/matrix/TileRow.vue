<template>
  <div class="row no-gutters">
    <div class="col-1 d-flex align-items-center justify-content-center label-vertical">
      <span class="label">{{rowLabel}}</span>
    </div>
    <div class="col" v-for="(item, index) in fullRow" :key="index">
      <div v-if="item">
        <div class="box">
          <div v-if="submitted.includes(item.id)" class="ribbon"><span>DONE</span></div>
          <a href="" data-toggle="modal" :data-target="'#' + item.id">
            <div class="content text-uppercase" :style="'background-color: #' + color[0] + '; opacity: ' + colorOpacity(index)">
              <b> {{item.title}} </b>
            </div>
          </a>
        </div>
        <div class="modal fade" v-bind:id="item.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <formy :form-data="item" :questionnaire-id="questionnaireId" @submitted="onSubmitted"></formy>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Formy from './Formy.vue'

export default {
  props: ['row', 'rowIndex', 'rowLabel', 'rowLength', 'color', 'questionnaireId'],
  data() {
    return {
      submitted: []
    }
  },
  computed: {
    fullRow: function() {
      let fullRow = this.row;
      while (fullRow.length < this.rowLength) {
        fullRow.push(null)
      }
      return fullRow;
    }
  },
  components: { formy: Formy },
  methods: {
    colorOpacity: function(index) {
      let base = 0.5;
      let fading = 1 - base;
      let individualOpacity = fading / this.rowLength;
      let opacity = base + individualOpacity * index + individualOpacity;
      return opacity
    },
    onSubmitted: function(val) {
      console.log(`numer: ${val}`)
      this.$data.submitted.push(val)
    }
  }
}
</script>

<style>
.ribbon {
  position: absolute;
  right: -5px; top: -5px;
  z-index: 1;
  overflow: hidden;
  width: 75px; height: 75px;
  text-align: right;
}
.ribbon span {
  font-size: 10px;
  font-weight: bold;
  color: #FFF;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  width: 100px;
  display: block;
  background: #79A70A;
  background: linear-gradient(#9BC90D 0%, #79A70A 100%);
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  position: absolute;
  top: 19px; right: -21px;
}
.ribbon span::before {
  content: "";
  position: absolute; left: 0px; top: 100%;
  z-index: -1;
  border-left: 3px solid #79A70A;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79A70A;
}
.ribbon span::after {
  content: "";
  position: absolute; right: 0px; top: 100%;
  z-index: -1;
  border-left: 3px solid transparent;
  border-right: 3px solid #79A70A;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79A70A;
}
</style>
