/* eslint-disable no-console */
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')
// import open from 'open';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static('dist'))
app.use(compression)

app.use(helmet());
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Dev server started on port ' + port);
    // Don't run open in prod
    // open('http://localhost:' + port);
  }
});

