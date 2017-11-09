'use strict';
var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _bodyParser = require('body-parser');var _bodyParser2 = _interopRequireDefault(_bodyParser);
var _open = require('open');var _open2 = _interopRequireDefault(_open);
var _chalk = require('chalk');var _chalk2 = _interopRequireDefault(_chalk);

var _webpackConfig = require('../webpack.config.prod');var _webpackConfig2 = _interopRequireDefault(_webpackConfig);
var _formsAPI = require('./controllers/formsAPI');var _formsAPI2 = _interopRequireDefault(_formsAPI);
var _resultsAPI = require('./controllers/resultsAPI');var _resultsAPI2 = _interopRequireDefault(_resultsAPI);
var _dbConnection = require('./config/dbConnection');var db = _interopRequireWildcard(_dbConnection);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var cors = require('cors'); /* eslint-disable no-console */

var port = process.env.PORT || 3030;
var app = (0, _express2.default)();

app.use(cors());
app.use(_bodyParser2.default.json());

app.use('/api/forms', _formsAPI2.default);
app.use('/api/results', _resultsAPI2.default);


db.connect(function (err) {
  if (err) {
    console.log(_chalk2.default.red("Could not connect to Database"));
    return;
  }
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(_chalk2.default.green('API server started on port ' + port));
  }
});