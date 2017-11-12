<template>
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="exampleModalLongTitle">{{formData.title}}</h3>


        <div class="p-2" v-show="saveSuccess">
          <small class="d-inline">&#10003; Up to date!</small>
        </div>
        <div class="p-2">
          <small class="d-inline">{{statusUpdate}}</small>
        </div>

      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form id="main-form" v-on:change="onFormChange()" v-on:submit.prevent="onSubmit()">
      <div class="modal-body">
        <div class="required">* Required</div>
        <div class="form-group" v-for="(question, index) in formData.questions" :key="index">

          <div v-if="question.short_answer">
            <legend>
              {{question.short_answer.ask}}
              <span v-show="question.short_answer.conditions.required" style="color: red;">*</span>
            </legend>
            <label class="form-text text-muted">{{question.short_answer.description}}</label>
            <input type="text" class="form-control" v-model="response[question.short_answer.id]" :id="question.short_answer.id" :required="question.short_answer.conditions.required">
          </div>

          <div v-else-if="question.paragraph">
            <legend>
              {{question.paragraph.ask}}
              <span v-show="question.paragraph.conditions.required" style="color: red;">*</span>
            </legend>
            <label class="form-text text-muted">{{question.paragraph.description}}</label>
            <textarea class="form-control" v-model="response[question.paragraph.id]" :id="question.paragraph.id" :required="question.paragraph.conditions.required" placeholder="add multiple lines"></textarea>
          </div>

          <div v-else-if="question.radio">
            <fieldset class="form-group">
              <legend>
                {{question.radio.ask}}
                <span v-show="question.radio.conditions.required" style="color: red;">*</span>
              </legend>
              <label class="form-text text-muted">{{question.radio.description}}</label>
              <div class="form-check" v-for="(option, index) in question.radio.options" :key="index">
                <label class="form-check-label">
                  <input v-model="response[question.radio.id]" type="radio" class="form-check-input" :id="option" :value="option" checked :required="question.radio.conditions.required"> {{option}}
                </label>
              </div>
            </fieldset>
          </div>

          <div v-else-if="question.checkboxes">
            <legend>
              {{question.checkboxes.ask}}
              <span v-show="question.checkboxes.conditions.required" style="color: red;">*</span>
            </legend>
            <label class="form-text text-muted">{{question.checkboxes.description}}</label>
            <span v-for="(option, index) in question.checkboxes.options" :key="index" :required="question.checkboxes.conditions.required">
              <input type="checkbox" v-model="response[question.checkboxes.id]" :id="option" :value="option" :name="question.checkboxes.id">
              <label :for="question.checkboxes.id">{{option}}</label>
              <br>
            </span>
          </div>

          <div v-else-if="question.dropdown">
            <legend>
              {{question.dropdown.ask}}
              <span v-show="question.dropdown.conditions.required" style="color: red;">*</span>
            </legend>
            <label class="form-text text-muted">{{question.dropdown.description}}</label>
            <select class="form-control" id="dropdown" v-model="response[question.dropdown.id]" :required="question.dropdown.conditions.required">
              <option v-for="(option, index) in question.dropdown.options" :key="index">{{option}}</option>
            </select>
          </div>

          <div v-else>
            <div class="alert alert-danger" role="alert">
              <strong>Oh snap!</strong> Question type
              <code>{{ Object.keys(question)[0].toString() }}</code> not supported yet. Change it and try again.
            </div>
          </div>

        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <!-- <button type="submit" class="btn btn-primary">Save changes</button> -->
        <input v-show="!saveSuccess" type="submit" class="btn btn-primary" value="Save changes">
        <button v-show="saveSuccess" type="button" class="btn btn-success">Saved successfully!</button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  props: ['formData', 'questionnaireId'],
  data() {
    return {
      response: this.initResponse(),
      saveSuccess: false,
      lastUpdated: null,
      statusUpdate: ""
    }
  },
  methods: {
    initResponse() {
      let response = {};
      for (let i = 0; i < this.formData.questions.length; i++) {
        let question = this.formData.questions[i]
        let key = Object.keys(question)[0];
        let question_id = question[key].id
        if (question_id) {
          response[question_id] = []
        }
      }
      return response;
    },
    onSubmit() {
      // replace client id with an auto generated one
      let maximum = 9999;
      let minimum = 1000;
      let clientID =Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      let questionnaireId = this.questionnaireId;
      let formID = this.$props.formData.id;

      let formResp = {}
      formResp.version = this.$props.formData.version;
      formResp.clientID = clientID;
      formResp.answers = {}
      formResp.answers[formID] = this.$data.response;

      let onSuccessfulSubmit = this.onSuccessfulSubmit;

      let self = this;
      // enable env variable for backendUrl if backend is separated into different project
      // const backendUrl = process.env.BACKEND_URL || "http://localhost:3030"
      const backendUrl = ''
      this.axios.post(backendUrl + '/api/forms/' + questionnaireId, formResp)
        .then(function(response) {
          let respMessage = response.data.message
          let resCode = response.data.status
          if (resCode == 100)
            onSuccessfulSubmit(respMessage)
            self.$emit('submitted', formID)
        })
        .catch(function(error){
          self.$data.statusUpdate = "Modifications could not be saved. Try again. \_(ʘ_ʘ)_/"
        })
    },
    onSuccessfulSubmit() {
      this.$data.saveSuccess = true;
      this.$data.lastUpdated = new Date().getTime()

      var self = this;
      setInterval(function() {
        let minsSinceUpdated = Math.floor((new Date().getTime() - self.$data.lastUpdated) / 1000 / 60)
        self.$data.statusUpdate = "Saved " + minsSinceUpdated + " m ago";
      }, 1000);
    },
    onFormChange() {
      this.$data.saveSuccess = false;
    }
  }
}
</script>

<style lang="sass">
.form {
  all: revert;
}
.required {
  color: red;
  margin-bottom: 20px;
}
</style>
