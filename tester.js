const yaml = require('yamljs');
const fs = require('fs');

try {
  fs.readFile('./src/data.yml', function(err, data) {
    if (err) {
      throw(err)
    }
    let yamlString = data.toString();
    let doc = yaml.parse(yamlString)
    console.log(doc);
  })
} catch (e) {
  console.log(e);
}
