import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import yaml from 'yamljs'
import fs from 'fs'

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/api/questionaire', function(req, res) {
  try {
    fs.readFile('./src/data.yml', function(err, data) {
      if (err) {
        throw(err)
      }
      let yamlString = data.toString();
      let doc = yaml.parse(yamlString)
      res.json(doc)
    })
  } catch (e) {
    res.json("{'message': 'error'}")
  }

  // Hard coding for simplicity. Pretend this hits a real database
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
