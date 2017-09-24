<template>
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="exampleModalLongTitle">{{formData.title}}</h3>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <!-- <p>{{response}}</p> -->
      <div style="color: red; margin-bottom: 15px;">* Required</div>
      <form>
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
            <span v-for="(option, index) in question.checkboxes.options" :key="index">
              <input type="checkbox" v-model="response[question.checkboxes.id]" :id="option" :value="option" :name="question.checkboxes.id" :required="question.checkboxes.conditions.required">
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
      </form>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary">Save changes</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['formData'],
  data() {
    return {
      response: this.initResponse()
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
    submitForm() {
      console.log(data)
    }
  }
}
</script>

<style>
.form {
  all: revert;
}
</style>
