import fs from 'fs'
import yamljs from 'yamljs'
import path from 'path'
// import { dataDir } from './config'

let basePath = process.env.PWD;
let dataDir = "/content_data"

// FEAT: for yaml schema validation use Kwalify

export function getAllQuestionnaire() {
  let questionnaireDirs = getDirsWithLayoutFile(path.join(basePath, "/content_data"))
  let allData = questionnaireDirs.map(function(dir){
    // console.log("  looking for dir --> " + dir);

    getAllDataInDir(dir, function(err, resp){
      console.log('   resp ->> ' + resp);
    });
  })

  console.log(allData);


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

// returns an array of JSON object questionnaires given the absolute path to a directory
export function getAllDataInDir(dataDir, callback) {
  let responseArray = []
  let items = getAllFilesInDir(dataDir);

  let processedItems = 0
  items.forEach(function (item) {
    let itemName = item.split('/').slice(-1)[0];
    if (itemName !== "Layout.yml" && itemName !== "layout.yml") {
      try {
        fs.readFile(item, function (err, data) {
          if (err) {
            return callback(err)
          }
          let yamlString = data.toString();
          let doc = yamljs.parse(yamlString)
          responseArray.push(doc)
          processedItems++;

          if (processedItems === items.length - 1) {
            return callback(null, responseArray)
          }
        })

      } catch (e) {
        return callback(e)
      }
    }
  })

}
