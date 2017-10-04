import * as connection from '../config/dbConnection'
import * as yamlData from './yamlData'
import assert from 'assert'

export function getAllAnswersById(questionnaireID, callback) {

  getFormInfo(questionnaireID, 'authentication-and-access', (formInfo) => {
    let response = {}
    let objectsToFill = formInfo.questions.length

    for (let index = 0; index < formInfo.questions.length; index++) {
      let question = formInfo.questions[index]
      let questionType = Object.keys(question)[0]
      let questionID = question[questionType].id
      response[questionID] = undefined
      getAnswersByQuestionID(questionnaireID, formInfo.id).then(answers => {
        prepareData(question, answers, function (data) {
          response[questionID] = data
          if (objectCount(response) === objectsToFill) {
            console.log('Finished filling response with data. Returning now.');
            return callback(null, response)
          }
        })
      })
      .catch(err => {
        throw err
      })
    }
  })
}

function objectCount(obj){
  let keys = Object.keys(obj)
  let count = 0;
  for (var index = 0; index < keys.length; index++) {
    var key = keys[index];
    if (typeof obj[key] !== 'undefined') {
      count++
    }
  }
  return count
}


function prepareData(question, answers, callback) {
  let response = {}
  let questionType = Object.keys(question)[0]

  switch (questionType) {
    case "short_answer":
      {
        callback(null)
        break;
      }
    case "paragraph":
      {
        callback(null)
        break;
      }
    case "radio":
      {
        var radioData = prepareRadioData(question.radio, answers)
        radioData.then((data) => {
          callback(data)
        })
      }
    case 'checkboxes':
      {
        callback(null)
        break;
      }
    case 'dropdown':
      {
        callback(null)
        break;
      }
    default:
      {
        break;
      }

  }
}

function prepareRadioData(question, answers) {
  return new Promise((resolve, reject) => {
    let response = {}
    response.labels = question.options
    response.datasets = []
    let data = []

    for (let labelIndex = 0; labelIndex < question.options.length; labelIndex++) {
      let label = question.options[labelIndex]
      data[labelIndex] = 0
      for (let answerIndex = 0; answerIndex < answers.length; answerIndex++) {
        let singleAnswer = answers[answerIndex]
        if (singleAnswer.answers[question.id] === label) {
          data[labelIndex]++
        }
      }
    }

    response
      .datasets
      .push(data)
    if (data.length === 0) {
      reject("Options null")
    }
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
        docs.toArray((err, docs) => {
          resolve(docs)
        })
      })
      connection.close()
    })
  })
}

// FOR EACH DOESN'T WORK returns an array of form id's in a questionnaire
function getFormIDsInQuestionnaire(questionnaireID, callback) {
  let questionnaireData = yamlData
    .getQuestionnaireById(questionnaireID)
    .questionnaire
  let formIDs = []

  for (let i = 0; i < questionnaireData.length; i++) {
    let rowArray = questionnaireData[i]
    for (let j = 0; j < rowArray.length; j++) {
      let form = rowArray[j]

      if (typeof form === 'undefined') {
        return
      }
      if (!formIDs.includes(form.id)) {
        formIDs.push(form.id)
      }
    }
  }
  console.log('returning this:');
  console.log(formIDs);
  return callback(formIDs)

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
