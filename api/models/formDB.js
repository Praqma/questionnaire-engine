import * as connection from '../config/dbConnection'
import * as yamlData from './yamlData'
// import * as prepareData from './prepareData'
import assert from 'assert'

export function getAllAnswersById(questionnaireID, callback) {

  prepareData(questionnaireID, function (res) {
    return callback(null, res)
  })

}

function prepareData(questionnaireID, callback) {
  let response = {}

  getFormInfo(questionnaireID, 'authentication-and-access', (formInfo) => {

    for (let index = 0; index < formInfo.questions.length; index++) {
      let question = formInfo.questions[index]
      let questionType = Object.keys(question)[0]
      response[questionType] = {}

      switch (questionType) {
        case "short_answer":
          {
            break;
          }
        case "paragraph":
          {
            break;
          }
        case "radio":
          {
            console.log('RADIO CALLED ONCE');

            getAnswersByQuestionID(questionnaireID, formInfo.id).then((answers) => {
              prepareRadioData(question.radio, answers).then((data) => {
                response[questionType] = data
                console.log('-- RADIO DATA CAME BACK');

                return callback(response)
              })

            })
            break;
          }
          case 'checkboxes':
          {
            break;
          }
        case 'dropdown':
          {
            break;
          }
        default:
          {

            break;
          }
      }
    }
    console.log('for should be done');
    console.log(response);


  })
}

function prepareRadioData(question, answers) {
  return new Promise((resolve, reject) => {
    let response = {}
    response.labels = question.options
    response.datasets = []
    let data = []

    question.options.forEach((label, labelIndex) => {
        data[labelIndex] = 0
        answers.forEach((singleAnswer) => {
          if (singleAnswer.answers[question.id] === label) {
            data[labelIndex]++
          }
        })
      })

    response.datasets.push(data)
    if (data.length === 0) {
      reject("Options null")
    }
    console.log('resolved');
    console.log(response);

    resolve(response)
  })
}

function getAnswersByQuestionID(questionnaireID, formID) {
  return new Promise(function (resolve, reject) {
    connection.connect(() => {
      let db = connection.get()
      let collection = db.collection(questionnaireID)
      collection.find({
        formID: formID
      }, (err, docs) => {
        if (err) {
          reject(err)
        }
        console.log('formid: ' + formID);
        docs.toArray((err, docs) => {
          resolve(docs)
        })
      })
    })

  })
}

// FOR EACH DOESN'T WORK
// returns an array of form id's in a questionnaire
function getFormIDsInQuestionnaire(questionnaireID, callback) {
  let questionnaireData = yamlData
    .getQuestionnaireById(questionnaireID)
    .questionnaire
  let formIDs = []
  questionnaireData.forEach(function (rowArray) {
    rowArray
      .forEach(function (form) {
        if (typeof form === 'undefined') {
          return
        }
        if (!formIDs.includes(form.id)) {
          formIDs.push(form.id)
        }
      }, function () {
        return callback(formIDs)
      })
  })
}

function getDBObjectsByForm(formID, callback) {
  connection
    .connect(function () {
      let db = connection.get()
      let collection = db.collection(QUESTIONNAIRE_ID)
      collection.find({
        formID: formID
      }, function (err, docs) {
        if (err) {
          return callback(err)
        }
        return callback(null, docs)
      })
    })
}

function getQuestionInfo(questionnaireID, formID, questionID, callback) {
  let questionnaireData = yamlData
    .getQuestionnaireById(questionnaireID)
    .questionnaire
  questionnaireData.forEach(function (rowArray) {
    rowArray
      .forEach(function (form) {
        if (typeof form === 'undefined') {
          return
        }
        if (form.id === formID) {
          form
            .questions
            .forEach(function (question) {
              let questionType = Object.keys(question)[0]
              let id = question[questionType].id
              if (id === questionID) {
                callback(question)
              }
            })
        }
      })
  })
}

function getFormInfo(questionnaireID, formID, callback) {
  let questionnaireData = yamlData.getQuestionnaireById(questionnaireID)
  questionnaireData
    .questionnaire
    .forEach(function (rowArray) {
      rowArray
        .forEach(function (form) {
          if (typeof form === 'undefined') {
            return
          }
          if (form.id === formID) {
            return callback(form)
          }
        })
    })
}

export function insertFormResponse(questionnaireID, requestPayload, callback) {
  let version = requestPayload.version;
  let clientID = requestPayload.clientID;
  let formID = Object.keys(requestPayload.answers)[0]
  let formResponse = requestPayload.answers[formID]

  connection.connect(function () {
    var db = connection.get();
    var collection = db.collection(questionnaireID);

    let queryObj = {
      "version": version,
      clientID: clientID,
      formID: formID
    }
    collection
      .find(queryObj)
      .toArray(function (err, docs) {

        let insertObj = {
          version: version,
          clientID: clientID,
          formID: formID,
          lastUpdated: new Date(),
          answers: formResponse
        }

        if (docs.length > 0) {
          assert.equal(1, docs.length);
          let writeResult = collection.update(queryObj, insertObj, {upsert: true})
          if (writeResult.writeError) {
            return callback(writeResult.writeError)
          }
          return callback(null, writeResult)

        } else if (docs.length === 0) {
          collection
            .insertOne(insertObj, function (err, result) {
              if (err) {
                return callback(err)
              }
              return callback(err, result)
            })
        }
      })

  })

}
