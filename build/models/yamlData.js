'use strict';
var fs = require('fs');
var yamljs = require('yamljs');
var path = require('path');
var config = require('../config/config');

var basePath = process.env.PWD || '/usr/src/app';

// FEAT: for yaml schema validation use Kwalify

exports.getQuestionnaireById = function (id) {
  var form = {};
  var dir = getDirById(id);
  var layoutData = getLayoutFile(id);
  if (layoutData) {
    form.name = layoutData.name;
    form.id = layoutData.id;
    form.version = layoutData.version;
    form.labels = {};
    form.labels.horizontal = layoutData.labels[0];
    form.labels.vertical = layoutData.labels[1];
    form.colors = layoutData.colors;

    form.header = layoutData.header;
    form.footer = layoutData.footer;
    form.links = layoutData.links;
    form.iconURL = layoutData.iconURL;

    var pathToIntro = getPathForFilenameInDir(layoutData.introYaml, dir);
    form.intro_form = getJsonByPath(pathToIntro);

    form.questionnaire = [];
    var model = layoutData.model;

    for (var i = 0; i < model.length; i++) {
      var tileNames = model[i];
      form.questionnaire[i] = [];
      var row = [];
      for (var j = 0; j < tileNames.length; j++) {
        var tile = tileNames[j];
        if (tile.length === 0) {
          row[j] = undefined;
        } else {
          var tilePath = getPathForFilenameInDir(tile, dir);
          var yamlString = fs.
          readFileSync(tilePath).
          toString();
          var jsonData = yamljs.parse(yamlString);
          row[j] = jsonData;
        }
      }
      form.questionnaire[i] = row;
    }
    return form;
  }
};

// returns an unordered array of all forms
exports.getAllFormsInQuestionnaire = function (id) {
  var form = {};
  var formIDs = [];
  var dir = getDirById(id);
  var layoutData = getLayoutFile(id);
  if (layoutData) {
    var model = layoutData.model;

    for (var i = 0; i < model.length; i++) {
      var tileNames = model[i];
      for (var j = 0; j < tileNames.length; j++) {
        var tile = tileNames[j];
        var tilePath = getPathForFilenameInDir(tile, dir);
        var yamlString = fs.
        readFileSync(tilePath).
        toString();
        var jsonData = yamljs.parse(yamlString);
        formIDs.push(jsonData.id);
      }
    }
    return formIDs;
  }
};

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
  var pathToLayout = path.join(getDirById(id), "Layout.yml");
  var yamlData = fs.
  readFileSync(pathToLayout).
  toString();
  var jsonData = yamljs.parse(yamlData);
  return jsonData;
}

function getJsonByPath(path) {
  if (!path) {
    return null;
  }
  if (fs.statSync(path)) {
    var yamlString = fs.
    readFileSync(path).
    toString();
    var jsonData = yamljs.parse(yamlString);
    return jsonData;
  } else {
    return null;
  }
}

function getDirById(id) {
  var dirPath = path.join(__dirname, '../../', config.contentDir);
  var questionnaireDirs = getDirsWithLayoutFile(dirPath);

  for (var index = 0; index < questionnaireDirs.length; index++) {
    var dir = questionnaireDirs[index];
    var yamlPath = path.join(dir, "Layout.yml");
    var stat = fs.statSync(yamlPath);
    if (stat && stat.isFile()) {
      var yamlString = fs.
      readFileSync(yamlPath).
      toString();
      var jsonData = yamljs.parse(yamlString);
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
    var data = fs.readFileSync(item);
    var yamlString = data.toString();
    var doc = yamljs.parse(yamlString);
    return doc;
  });
  return responseArray;
}

function getDirsWithLayoutFile(dir) {
  var dirsWithConfigFile = [];
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
    if (file === "Layout.yml") {
      dirsWithConfigFile.push(dir);
    }
    file = path.join(dir, file);
    var stat = fs.statSync(file);
    // do recursive search through subfolders
    if (stat && stat.isDirectory())
    dirsWithConfigFile = dirsWithConfigFile.concat(getDirsWithLayoutFile(file));
  });
  return dirsWithConfigFile;
}

function getAllFilesInDir(dir, fileList) {
  fileList = fileList || [];

  var files = fs.readdirSync(dir);
  for (var i in files) {
    if (!files.hasOwnProperty(i))
    continue;
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getAllFilesInDir(name, fileList);
    } else {
      fileList.push(name);
    }
  }

  return fileList;
}