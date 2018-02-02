require('dotenv').load();
const connection = require('../config/dbConnection')
const yamlData = require('./yamlData')
const assert = require('assert')
const async = require('async')
const randomColor = require('../helpers/randomColor')
// let exports = module.exports = {};

exports.getAllAnswersById = function (questionnaireID, callback) {
  let response = {
    results: []
  }
  let formIDs = yamlData.getAllFormsInQuestionnaire(questionnaireID)

  async.each(formIDs, (formID, asyncDone) => {

    getFormInfo(questionnaireID, formID, (formInfo) => {
      let formResults = []
      let objectsToFill = formInfo.questions.length

      getAnswersByQuestionID(questionnaireID, formID).then(answers => {
        if (!answers) {
          throw new Error("Could not query database.")
        }
        for (let index = 0; index < formInfo.questions.length; index++) {
          let question = formInfo.questions[index]
          distributePreparation(question, answers, function (data) {
            if (!data) {
              return
            }
            formResults.push(data)
            if (formResults.length === objectsToFill) {
              response.results.push({
                formID, formResults
              })
              return asyncDone()
            }
          })
        }

      }).catch(err => {
        throw err
      })
    })
  }, (err) => {
    // if any of the file processing produced an error, err would equal that error
    if (err) {
      // One of the iterations produced an error. All processing will now stop.
      console.log('A file failed to process');
      return callback(err)
    } else {
      // console.log('All files have been processed successfully');
      connection.close()
      return callback(null, response)
    }
  })

}

function objectCount(obj) {
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

// function refactoredObjectCount(obj) {
//   let keys = Object.keys(obj)
//   let count = keys.filter(key => {
//     return obj[key] !== undefined
//   }).length
//   return count
// }

var distributePreparationCalled = 0
function distributePreparation(question, answers, callback) {
  let response = {}
  let questionType = Object.keys(question)[0]

  switch (questionType) {
    case "short_answer":
      {
        let data = prepareShortAsnwer(question.short_answer, answers)
        return callback(data)
        break;
      }
    case "paragraph":
      {
        let data = prepareShortAsnwer(question.paragraph, answers)
        return callback(data)
        break;
      }
    case "radio":
      {
        prepareRadioData(question.radio, answers).then(data => {
          return callback(data)
        }).catch(err => {
          console.error(err)
          // return callback(null)
        })
        // DON'T FORGET THE BREAK!!
        break;
      }
    case 'checkboxes':
      {
        prepareCheckboxData(question.checkboxes, answers).then(data => {
          return callback(data)
        }).catch(err => {
          console.error(err)
          // return callback(null)
        });
        break;
      }
    case 'dropdown':
      {
        return callback("ERR: [" + questionType + "] not supported yet")
        break;
      }
    default:
      {
        console.log('ATTENTION: default switch called')
        return callback("ERR: [" + questionType + "] not supported yet")
        break;
      }

  }
}

function prepareShortAsnwer(question, answers) {
  let response = {
    id: question.id,
    type: 'short_answer',
    data: [],
    question
  }
  for (var index = 0; index < answers.length; index++) {
    var element = answers[index];
    let singleEntry = element.answers[question.id]
    if (!singleEntry) {
      break
    }
    if (singleEntry.length === 0) {
      break
    }
    response.data.push(singleEntry)
  }
  return response
}

function prepareRadioData(question, answers) {
  return new Promise((resolve, reject) => {
    let data = {}
    data.labels = question.options
    data.datasets = []
    let singleDataset = {}
    singleDataset.backgroundColor = []
    let dataPoints = []

    for (let labelIndex = 0; labelIndex < question.options.length; labelIndex++) {
      let label = question.options[labelIndex]
      dataPoints[labelIndex] = 0
      singleDataset.backgroundColor[labelIndex] = randomColor()
      for (let answerIndex = 0; answerIndex < answers.length; answerIndex++) {
        let singleAnswer = answers[answerIndex]
        if (singleAnswer.answers[question.id] === label) {
          dataPoints[labelIndex]++
        }
      }
    }
    singleDataset.data = dataPoints
    data
      .datasets
      .push(singleDataset)
    let response = {
      id: question.id,
      type: 'pie',
      data: data,
      question: question
    }
    if (dataPoints.length === 0) {
      reject("Options null")
    }
    resolve(response)
  })
}

function prepareCheckboxData(question, answers) {
  return new Promise((resolve, reject) => {
    let data = {}
    data.labels = question.options
    data.datasets = []
    let singleDataset = {}
    singleDataset.backgroundColor = []
    let dataPoints = []

    for (let labelIndex = 0; labelIndex < question.options.length; labelIndex++) {
      let label = question.options[labelIndex]
      dataPoints[labelIndex] = 0
      singleDataset.backgroundColor[labelIndex] = randomColor()
      for (let answerIndex = 0; answerIndex < answers.length; answerIndex++) {
        let checkboxOptions = answers[answerIndex].answers[question.id]

        if (!checkboxOptions) {
          break;
        }

        if (checkboxOptions.length > 0 && checkboxOptions.includes(label)) {
          dataPoints[labelIndex]++
        }
      }
    }
    singleDataset.data = dataPoints
    data
      .datasets
      .push(singleDataset)
    let response = {
      id: question.id,
      type: 'pie',
      data: data,
      question: question
    }
    if (dataPoints.length === 0) {
      reject("Options null")
    }
    resolve(response)
  })
}
var tempCounter = 0
function getAnswersByQuestionID(questionnaireID, formID) {
  return new Promise(function (resolve, reject) {
    connection.connect((err) => {
      if (err) {
        throw err
      }
      let db = connection.get()
      let collection = db.collection(questionnaireID)
      collection.find({
        formID: formID
      }, (err, docs) => {
        if (err) {
          reject(err)
        }
        docs.toArray((err, docs) => {
          if (err) {
            reject(err)
          }
          resolve(docs)
        })
      })
    })
  })
}

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
  if (!questionnaireID || !formID)
    return

  let questionnaireData = yamlData.getQuestionnaireById(questionnaireID)

  questionnaireData
    .questionnaire
    .forEach(function (rowArray) {
      rowArray
        .forEach(function (form) {
          if (!form) {
            return
          }
          if (form.id === formID) {
            return callback(form)
          }
        })
    })
}

// Insert an answer submitted by a client to the database
exports.insertFormResponse = function (questionnaireID, requestPayload, callback) {
  // define required parameters for entry
  let version = requestPayload.version;
  let clientID = requestPayload.clientID;
  let formID = Object.keys(requestPayload.answers)[0]
  let formResponse = requestPayload.answers[formID]

  // set up connection to DB
  connection.connect(function () {
    var db = connection.get(); // get Mongo database connection object
    var collection = db.collection(questionnaireID); // get the collection object where the answers are

    // define object that will be the base of the query
    let queryObject = {
      "version": version,
      clientID: clientID,
      formID: formID
    }
    // If an answer was already submitted by that user update it, otherwise insert new
    collection
      .find(queryObject)
      .toArray(function (err, docs) {

        // create the form response object to be inserted into DB
        let insertObj = {
          version: version,
          clientID: clientID,
          formID: formID,
          lastUpdated: new Date(),
          answers: formResponse
        }

        // check if the client already has answer in DB
        if (docs.length > 0) {
          // answer found, update it
          assert.equal(1, docs.length);
          // perform update on db collection
          let writeResult = collection.update(queryObject, insertObj, {
            upsert: true
          })
          // check for db errors during update
          if (writeResult.writeError) {
            // error found. return error response further up to be handled
            return callback(writeResult.writeError)
          }
          // no error, update performed -> finish execution
          return callback(null, writeResult)

        } else if (docs.length === 0) {
          // a new client submitted the form response -> insert it into DB
          collection
            .insertOne(insertObj, function (err, result) {
              // error handling
              if (err) {
                return callback(err)
              }
              // insert performed well -> finish execution
              return callback(err, result)
            })
        }
      })
  })
}

