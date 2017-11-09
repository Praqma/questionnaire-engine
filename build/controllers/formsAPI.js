'use strict';Object.defineProperty(exports, "__esModule", { value: true });

var _yamlData = require('../models/yamlData');var yalmData = _interopRequireWildcard(_yamlData);
var _formDB = require('../models/formDB');var formDB = _interopRequireWildcard(_formDB);
var _config = require('../config/config');function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}var express = require('express');var router = express.Router();

router.get('/', function (req, res) {
  // load default template content
  var jsonData = yalmData.getQuestionnaireById(_config.defaultQuestionnaire);

  if (jsonData) {
    res.json(jsonData);
  } else {
    res.status(501);
    res.json({ error: "The requested questionnaire could not be found." });
  }
});

router.get('/:questionnaireID', function (req, res) {
  var questionnaireID = req.params.questionnaireID;
  var jsonData = yalmData.getQuestionnaireById(questionnaireID);

  if (jsonData) {
    res.json(jsonData);
  } else {
    res.status(501);
    res.json({ error: "The requested questionnaire could not be found." });
  }
});

router.post('/:questionnaireID', function (req, res) {
  var questionnaireID = req.params.questionnaireID;
  var formResponse = req.body;

  if (!formResponse) {
    req.status(400);
    res.json({ error: "Did not receive payload." });
  }

  formDB.insertFormResponse(questionnaireID, formResponse, function (err, result) {
    if (err) {
      res.status(501);
      res.json({ error: "The data could not be stored in the database." });
    } else {
      res.json({ status: 100, message: "Successfuly inserted data." });
    }
  });

});exports.default =

router;