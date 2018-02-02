'use strict'
const fs = require('fs')
const yamljs = require('yamljs')
const path = require('path')
const config = require('../config/config')

let basePath = process.env.PWD || '/usr/src/app'

// FEAT: for yaml schema validation use Kwalify

exports.getQuestionnaireById = function (id) {
  let form = {}
  let dir = getDirById(id);
  let layoutData = getLayoutFile(id)
  if (layoutData) {
    form.name = layoutData.name;
    form.id = layoutData.id;
    form.version = layoutData.version;
    form.labels = {}
    form.labels.horizontal = layoutData.labels[0]
    form.labels.vertical = layoutData.labels[1]
    form.colors = layoutData.colors;

    form.header = layoutData.header;
    form.footer = layoutData.footer;
    form.links = layoutData.links;
    form.iconURL = layoutData.iconURL;

    let pathToIntro = getPathForFilenameInDir(layoutData.introYaml, dir)
    form.intro_form = getJsonByPath(pathToIntro)

    form.questionnaire = []
    let model = layoutData.model;

    for (var i = 0; i < model.length; i++) {
      let tileNames = model[i];
      form.questionnaire[i] = []
      var row = []
      for (var j = 0; j < tileNames.length; j++) {
        let tile = tileNames[j];
        if (tile.length === 0) {
          row[j] = undefined;
        } else {
          let tilePath = getPathForFilenameInDir(tile, dir)
          let yamlString = fs
            .readFileSync(tilePath)
            .toString();
          let jsonData = yamljs.parse(yamlString);
          row[j] = jsonData
        }
      }
      form.questionnaire[i] = row;
    }
    return form
  }
}

// returns an unordered array of all forms
exports.getAllFormsInQuestionnaire = function(id) {
  let form = {}
  let formIDs = []
  let dir = getDirById(id);
  let layoutData = getLayoutFile(id)
  if (layoutData) {
    let model = layoutData.model;

    for (var i = 0; i < model.length; i++) {
      let tileNames = model[i];
      for (var j = 0; j < tileNames.length; j++) {
        let tile = tileNames[j];
        let tilePath = getPathForFilenameInDir(tile, dir)
        let yamlString = fs
          .readFileSync(tilePath)
          .toString();
        let jsonData = yamljs.parse(yamlString);
        formIDs.push(jsonData.id)
      }
    }
    return formIDs
  }
}

function getPathForFilenameInDir(filename, dir) {
  let allFiles = getAllFilesInDir(dir)
  for (var index = 0; index < allFiles.length; index++) {
    var filePath = allFiles[index];
    if (filePath.includes(filename + '.yml')) {
      return filePath;
    }
  }
}

function getLayoutFile(id) {
  let dir = getDirById(id);
  if (!dir) {
    return null;
  }
  let pathToLayout = path.join(getDirById(id), "Layout.yml")
  let yamlData = fs
    .readFileSync(pathToLayout)
    .toString()
  let jsonData = yamljs.parse(yamlData);
  return jsonData;
}

function getJsonByPath(path) {
  if (!path) {
    return null;
  }
  if (fs.statSync(path)) {
    let yamlString = fs
      .readFileSync(path)
      .toString();
    let jsonData = yamljs.parse(yamlString);
    return jsonData;
  } else {
    return null;
  }
}

function getDirById(id) {
  let dirPath = path.join(__dirname, '../../', config.contentDir)
  let questionnaireDirs = getDirsWithLayoutFile(dirPath)

  for (var index = 0; index < questionnaireDirs.length; index++) {
    let dir = questionnaireDirs[index];
    let yamlPath = path.join(dir, "Layout.yml")
    let stat = fs.statSync(yamlPath)
    if (stat && stat.isFile()) {
      let yamlString = fs
        .readFileSync(yamlPath)
        .toString();
      let jsonData = yamljs.parse(yamlString);
      if (jsonData.id === id) {
        return dir;
      }
    }
  }
}

// returns an array of JSON object questionnaires given the absolute path to a
// directory
function getAllQuestionsInDir(contentDirectory) {
  let items = getAllFilesInDir(contentDirectory);
  let responseArray = items.filter(function (item) {
    let itemName = item
      .split('/')
      .slice(-1)[0];
    if (itemName !== "Layout.yml" && itemName !== "layout.yml") {
      return true
    } else {
        return false
      }
    })
    .map(function (item) {
      let data = fs.readFileSync(item);
      let yamlString = data.toString();
      let doc = yamljs.parse(yamlString)
      return doc;
    })
  return responseArray;
}

function getDirsWithLayoutFile(dir) {
  var dirsWithConfigFile = []
  var list = fs.readdirSync(dir)
  list.forEach(function (file) {
    if (file === "Layout.yml") {
      dirsWithConfigFile.push(dir)
    }
    file = path.join(dir, file)
    var stat = fs.statSync(file)
    // do recursive search through subfolders
    if (stat && stat.isDirectory())
      dirsWithConfigFile = dirsWithConfigFile.concat(getDirsWithLayoutFile(file))
  })
  return dirsWithConfigFile
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
