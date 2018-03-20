'use strict';var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}require('dotenv').load();
var connection = require('../config/dbConnection');
var yamlData = require('./yamlData');
var assert = require('assert');
var async = require('async');
var randomColor = require('../helpers/randomColor');
var _ = require('lodash');
// let exports = module.exports = {};

exports.getAllAnswersById = function (questionnaireID, callback) {
  var response = {
    results: [] };

  var formIDs = yamlData.getAllFormsInQuestionnaire(questionnaireID);

  async.each(formIDs, function (formID, asyncDone) {

    getFormInfo(questionnaireID, formID, function (formInfo) {
      var formResults = [];
      var objectsToFill = formInfo.questions.length;

      getAnswersByQuestionID(questionnaireID, formID).then(function (answers) {
        if (!answers) {
          throw new Error("Could not query database.");
        }
        for (var index = 0; index < formInfo.questions.length; index++) {
          var question = formInfo.questions[index];
          distributePreparation(question, answers, function (data) {
            if (!data) {
              return;
            }
            formResults.push(data);
            if (formResults.length === objectsToFill) {
              response.results.push({
                formID: formID, formResults: formResults });

              return asyncDone();
            }
          });
        }

      }).catch(function (err) {
        throw err;
      });
    });
  }, function (err) {
    // if any of the file processing produced an error, err would equal that error
    if (err) {
      // One of the iterations produced an error. All processing will now stop.
      console.log('A file failed to process');
      return callback(err);
    } else {
      // console.log('All files have been processed successfully');
      connection.close();
      response.results = _.sortBy(response.results, ['formID'], ['asc']);
      return callback(null, response);
    }
  });

};

function objectCount(obj) {
  var keys = (0, _keys2.default)(obj);
  var count = 0;
  for (var index = 0; index < keys.length; index++) {
    var key = keys[index];
    if (typeof obj[key] !== 'undefined') {
      count++;
    }
  }
  return count;
}

// function refactoredObjectCount(obj) {
//   let keys = Object.keys(obj)
//   let count = keys.filter(key => {
//     return obj[key] !== undefined
//   }).length
//   return count
// }

var distributePreparationCalled = 0;
function distributePreparation(question, answers, callback) {
  var response = {};
  var questionType = (0, _keys2.default)(question)[0];

  switch (questionType) {
    case "short_answer":
      {
        var data = prepareShortAsnwer(question.short_answer, answers);
        return callback(data);
        break;
      }
    case "paragraph":
      {
        var _data = prepareShortAsnwer(question.paragraph, answers);
        return callback(_data);
        break;
      }
    case "radio":
      {
        prepareRadioData(question.radio, answers).then(function (data) {
          return callback(data);
        }).catch(function (err) {
          console.error(err);
          // return callback(null)
        });
        // DON'T FORGET THE BREAK!!
        break;
      }
    case 'checkboxes':
      {
        prepareCheckboxData(question.checkboxes, answers).then(function (data) {
          return callback(data);
        }).catch(function (err) {
          console.error(err);
          // return callback(null)
        });
        break;
      }
    case 'dropdown':
      {
        return callback("ERR: [" + questionType + "] not supported yet");
        break;
      }
    default:
      {
        console.log('ATTENTION: default switch called');
        return callback("ERR: [" + questionType + "] not supported yet");
        break;
      }}


}

function prepareShortAsnwer(question, answers) {
  var response = {
    id: question.id,
    type: 'short_answer',
    data: [],
    question: question };

  for (var index = 0; index < answers.length; index++) {
    var element = answers[index];
    var singleEntry = element.answers[question.id];
    if (!singleEntry) {
      break;
    }
    if (singleEntry.length === 0) {
      break;
    }
    response.data.push(singleEntry);
  }
  return response;
}

function prepareRadioData(question, answers) {
  return new _promise2.default(function (resolve, reject) {
    var data = {};
    data.labels = question.options;
    data.datasets = [];
    var singleDataset = {};
    singleDataset.backgroundColor = [];
    var dataPoints = [];

    for (var labelIndex = 0; labelIndex < question.options.length; labelIndex++) {
      var label = question.options[labelIndex];
      dataPoints[labelIndex] = 0;
      singleDataset.backgroundColor[labelIndex] = randomColor();
      for (var answerIndex = 0; answerIndex < answers.length; answerIndex++) {
        var singleAnswer = answers[answerIndex];
        if (singleAnswer.answers[question.id] === label) {
          dataPoints[labelIndex]++;
        }
      }
    }
    singleDataset.data = dataPoints;
    data.
    datasets.
    push(singleDataset);
    var response = {
      id: question.id,
      type: 'pie',
      data: data,
      question: question };

    if (dataPoints.length === 0) {
      reject("Options null");
    }
    resolve(response);
  });
}

function prepareCheckboxData(question, answers) {
  return new _promise2.default(function (resolve, reject) {
    var data = {};
    data.labels = question.options;
    data.datasets = [];
    var singleDataset = {};
    singleDataset.backgroundColor = [];
    var dataPoints = [];

    for (var labelIndex = 0; labelIndex < question.options.length; labelIndex++) {
      var label = question.options[labelIndex];
      dataPoints[labelIndex] = 0;
      singleDataset.backgroundColor[labelIndex] = randomColor();
      for (var answerIndex = 0; answerIndex < answers.length; answerIndex++) {
        var checkboxOptions = answers[answerIndex].answers[question.id];

        if (!checkboxOptions) {
          break;
        }

        if (checkboxOptions.length > 0 && checkboxOptions.includes(label)) {
          dataPoints[labelIndex]++;
        }
      }
    }
    singleDataset.data = dataPoints;
    data.
    datasets.
    push(singleDataset);
    var response = {
      id: question.id,
      type: 'pie',
      data: data,
      question: question };

    if (dataPoints.length === 0) {
      reject("Options null");
    }
    resolve(response);
  });
}
var tempCounter = 0;
function getAnswersByQuestionID(questionnaireID, formID) {
  return new _promise2.default(function (resolve, reject) {
    connection.connect(function (err) {
      if (err) {
        throw err;
      }
      var db = connection.get();
      var collection = db.collection(questionnaireID);
      collection.find({
        formID: formID },
      function (err, docs) {
        if (err) {
          reject(err);
        }
        docs.toArray(function (err, docs) {
          if (err) {
            reject(err);
          }
          resolve(docs);
        });
      });
    });
  });
}

function getFormIDsInQuestionnaire(questionnaireID, callback) {
  var questionnaireData = yamlData.
  getQuestionnaireById(questionnaireID).
  questionnaire;
  var formIDs = [];

  for (var i = 0; i < questionnaireData.length; i++) {
    var rowArray = questionnaireData[i];
    for (var j = 0; j < rowArray.length; j++) {
      var form = rowArray[j];
      if (typeof form === 'undefined') {
        return;
      }
      if (!formIDs.includes(form.id)) {
        formIDs.push(form.id);
      }
    }
  }
  return callback(formIDs);
}

function getDBObjectsByForm(formID, callback) {
  connection.
  connect(function () {
    var db = connection.get();
    var collection = db.collection(QUESTIONNAIRE_ID);
    collection.find({
      formID: formID },
    function (err, docs) {
      if (err) {
        return callback(err);
      }
      return callback(null, docs);
    });
  });
}

function getQuestionInfo(questionnaireID, formID, questionID, callback) {
  var questionnaireData = yamlData.
  getQuestionnaireById(questionnaireID).
  questionnaire;
  questionnaireData.forEach(function (rowArray) {
    rowArray.
    forEach(function (form) {
      if (typeof form === 'undefined') {
        return;
      }
      if (form.id === formID) {
        form.
        questions.
        forEach(function (question) {
          var questionType = (0, _keys2.default)(question)[0];
          var id = question[questionType].id;
          if (id === questionID) {
            callback(question);
          }
        });
      }
    });
  });
}

function getFormInfo(questionnaireID, formID, callback) {
  if (!questionnaireID || !formID)
  return;

  var questionnaireData = yamlData.getQuestionnaireById(questionnaireID);

  questionnaireData.
  questionnaire.
  forEach(function (rowArray) {
    rowArray.
    forEach(function (form) {
      if (!form) {
        return;
      }
      if (form.id === formID) {
        return callback(form);
      }
    });
  });
}

// Insert an answer submitted by a client to the database
exports.insertFormResponse = function (questionnaireID, requestPayload, callback) {
  // define required parameters for entry
  var version = requestPayload.version;
  var clientID = requestPayload.clientID;
  var formID = (0, _keys2.default)(requestPayload.answers)[0];
  var formResponse = requestPayload.answers[formID];

  // set up connection to DB
  connection.connect(function () {
    var db = connection.get(); // get Mongo database connection object
    var collection = db.collection(questionnaireID); // get the collection object where the answers are

    // define object that will be the base of the query
    var queryObject = {
      "version": version,
      clientID: clientID,
      formID: formID

      // If an answer was already submitted by that user update it, otherwise insert new
    };collection.
    find(queryObject).
    toArray(function (err, docs) {

      // create the form response object to be inserted into DB
      var insertObj = {
        version: version,
        clientID: clientID,
        formID: formID,
        lastUpdated: new Date(),
        answers: formResponse


        // check if the client already has answer in DB
      };if (docs.length > 0) {
        // answer found, update it
        assert.equal(1, docs.length);
        // perform update on db collection
        var writeResult = collection.update(queryObject, insertObj, {
          upsert: true });

        // check for db errors during update
        if (writeResult.writeError) {
          // error found. return error response further up to be handled
          return callback(writeResult.writeError);
        }
        // no error, update performed -> finish execution
        return callback(null, writeResult);

      } else if (docs.length === 0) {
        // a new client submitted the form response -> insert it into DB
        collection.
        insertOne(insertObj, function (err, result) {
          // error handling
          if (err) {
            return callback(err);
          }
          // insert performed well -> finish execution
          return callback(err, result);
        });
      }
    });
  });
};