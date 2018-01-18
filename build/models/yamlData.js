'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.









getQuestionnaireById = getQuestionnaireById;exports.















































getAllFormsInQuestionnaire = getAllFormsInQuestionnaire;var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);var _yamljs = require('yamljs');var _yamljs2 = _interopRequireDefault(_yamljs);var _path = require('path');var _path2 = _interopRequireDefault(_path);var _config = require('../config/config');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var basePath = process.env.PWD || '/usr/src/app'; // FEAT: for yaml schema validation use Kwalify
function getQuestionnaireById(id) {var form = {};var dir = getDirById(id);var layoutData = getLayoutFile(id);if (layoutData) {form.name = layoutData.name;form.id = layoutData.id;form.version = layoutData.version;form.labels = {};form.labels.horizontal = layoutData.labels[0];form.labels.vertical = layoutData.labels[1];form.colors = layoutData.colors;form.header = layoutData.header;form.footer = layoutData.footer;form.links = layoutData.links;form.iconURL = layoutData.iconURL;var pathToIntro = getPathForFilenameInDir(layoutData.introYaml, dir);form.intro_form = getJsonByPath(pathToIntro);form.questionnaire = [];var model = layoutData.model;for (var i = 0; i < model.length; i++) {var tileNames = model[i];form.questionnaire[i] = [];var row = [];for (var j = 0; j < tileNames.length; j++) {var tile = tileNames[j];if (tile.length === 0) {row[j] = undefined;} else {var tilePath = getPathForFilenameInDir(tile, dir);var yamlString = _fs2.default.readFileSync(tilePath).toString();var jsonData = _yamljs2.default.parse(yamlString);row[j] = jsonData;}}form.questionnaire[i] = row;}return form;}} // returns an unordered array of all forms
function getAllFormsInQuestionnaire(id) {var form = {};var formIDs = [];
  var dir = getDirById(id);
  var layoutData = getLayoutFile(id);
  if (layoutData) {
    var model = layoutData.model;

    for (var i = 0; i < model.length; i++) {
      var tileNames = model[i];
      for (var j = 0; j < tileNames.length; j++) {
        var tile = tileNames[j];
        var tilePath = getPathForFilenameInDir(tile, dir);
        var yamlString = _fs2.default.
        readFileSync(tilePath).
        toString();
        var jsonData = _yamljs2.default.parse(yamlString);
        formIDs.push(jsonData.id);
      }
    }
    return formIDs;
  }
}

function getPathForFilenameInDir(filename, dir) {
  var allFiles = getAllFilesInDir(dir);
  for (var index = 0; index < allFiles.length; index++) {
    var filePath = allFiles[index];
    if (filePath.includes(filename + '.yml')) {
      return filePath;
    }
  }
}

function getLayoutFile(id) {
  var dir = getDirById(id);
  if (!dir) {
    return null;
  }
  var pathToLayout = _path2.default.join(getDirById(id), "Layout.yml");
  var yamlData = _fs2.default.
  readFileSync(pathToLayout).
  toString();
  var jsonData = _yamljs2.default.parse(yamlData);
  return jsonData;
}

function getJsonByPath(path) {
  if (!path) {
    return null;
  }
  if (_fs2.default.statSync(path)) {
    var yamlString = _fs2.default.
    readFileSync(path).
    toString();
    var jsonData = _yamljs2.default.parse(yamlString);
    return jsonData;
  } else {
    return null;
  }
}

function getDirById(id) {
  var dirPath = _path2.default.join(basePath, _config.contentDir);
  var questionnaireDirs = getDirsWithLayoutFile(dirPath);

  for (var index = 0; index < questionnaireDirs.length; index++) {
    var dir = questionnaireDirs[index];
    var yamlPath = _path2.default.join(dir, "Layout.yml");
    var stat = _fs2.default.statSync(yamlPath);
    if (stat && stat.isFile()) {
      var yamlString = _fs2.default.
      readFileSync(yamlPath).
      toString();
      var jsonData = _yamljs2.default.parse(yamlString);
      if (jsonData.id === id) {
        return dir;
      }
    }
  }
}

// returns an array of JSON object questionnaires given the absolute path to a
// directory
function getAllQuestionsInDir(contentDirectory) {
  var items = getAllFilesInDir(contentDirectory);
  var responseArray = items.filter(function (item) {
    var itemName = item.
    split('/').
    slice(-1)[0];
    if (itemName !== "Layout.yml" && itemName !== "layout.yml") {
      return true;
    } else {
      return false;
    }
  }).
  map(function (item) {
    var data = _fs2.default.readFileSync(item);
    var yamlString = data.toString();
    var doc = _yamljs2.default.parse(yamlString);
    return doc;
  });
  return responseArray;
}

function getDirsWithLayoutFile(dir) {
  var dirsWithConfigFile = [];
  var list = _fs2.default.readdirSync(dir);
  list.forEach(function (file) {
    if (file === "Layout.yml") {
      dirsWithConfigFile.push(dir);
    }
    file = _path2.default.join(dir, file);
    var stat = _fs2.default.statSync(file);
    // do recursive search through subfolders
    if (stat && stat.isDirectory())
    dirsWithConfigFile = dirsWithConfigFile.concat(getDirsWithLayoutFile(file));
  });
  return dirsWithConfigFile;
}

function getAllFilesInDir(dir, fileList) {
  fileList = fileList || [];

  var files = _fs2.default.readdirSync(dir);
  for (var i in files) {
    if (!files.hasOwnProperty(i))
    continue;
    var name = dir + '/' + files[i];
    if (_fs2.default.statSync(name).isDirectory()) {
      getAllFilesInDir(name, fileList);
    } else {
      fileList.push(name);
    }
  }

  return fileList;
}