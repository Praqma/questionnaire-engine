'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _formDB = require('../models/formDB');var formDB = _interopRequireWildcard(_formDB);var
responseData = _interopRequireWildcard(_formDB);
var _express = require('express');var _express2 = _interopRequireDefault(_express);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}
var router = _express2.default.Router();

router.get("/:id", function (req, res) {
  var questionnaireID = req.params.id;

  if (!questionnaireID) {
    res.status(501);
    return res.json({ error: "The requested questionnaire could not be found." });
  }

  formDB.getAllAnswersById(questionnaireID, function (err, results) {
    if (err) {
      res.status(501);
      return res.json({ error: "The requested questionnaire could not be found." });
    }
    res.json(results);
  });

});exports.default =

router;