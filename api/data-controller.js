import fs from 'fs'
import yamljs from 'yamljs'
import path from 'path'
import { dataDir } from './config'

// for yaml schema validation use Kwalify

// get all yaml files in data dir and return converted json array of the content
export function getAllData(callback) {
  let responseArray = []

  fs.readdir(path.join(__dirname, dataDir), function (err, items) {
    if (err) {
      callback(err)
    }

    let processedItems = 0;
    items.forEach(function (itemName) {
      try {
        fs.readFile(path.join(__dirname, dataDir, itemName), function (err, data) {
            if (err) {
              callback(err)
            }
            let yamlString = data.toString();
            let doc = yamljs.parse(yamlString)
            responseArray.push(doc)
            processedItems++;
            if (processedItems === items.length) {
              callback(null, responseArray)
            }
          })
      } catch (e) {
        callback(e)
      }
    })
  })
}
