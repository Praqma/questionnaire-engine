import fs from 'fs'
import yamljs from 'yamljs'
import path from 'path'
// import { dataDir } from './config'

let basePath = process.env.PWD;
let dataDir = "/content_data"

// FEAT: for yaml schema validation use Kwalify

export function getAllQuestionnaire() {
  let questionnaireDirs = getDirsWithLayoutFile(path.join(basePath, "/content_data"))
  // let allData = getAllDataInDir(questionnaireDirs[1]);

  let allData = questionnaireDirs.map(function(dir){
    return getAllDataInDir(dir);
  })
  return allData;
}

// returns an array of JSON object questionnaires given the absolute path to a directory
export function getAllDataInDir(dataDir) {
  let items = getAllFilesInDir(dataDir);
  let responseArray = items.filter(function(item){
    let itemName = item.split('/').slice(-1)[0];
    if (itemName !== "Layout.yml" && itemName !== "layout.yml") {
      return true
    } else {
      return false
    }
  }).map(function (item) {
      let data = fs.readFileSync(item);
      let yamlString = data.toString();
      let doc = yamljs.parse(yamlString)
      return doc;
  })
  return responseArray;
}


function getDirsWithLayoutFile(dir) {
  var dirsWithConfigFile = []
  // var results = []
  var list = fs.readdirSync(dir)
  list.forEach(function (file) {
    if (file === "Layout.yml") {
      dirsWithConfigFile.push(dir)
    }

    // file = dir + '/' + file
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

