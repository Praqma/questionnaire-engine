/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser'
import open from 'open';
import helmet from 'helmet'
import compression from 'compression'

import formsAPI from '../api/controllers/formsAPI'
import resultsAPI from '../api/controllers/resultsAPI'
import * as db from '../api/config/dbConnection'

const port = 3000;
const app = express();

app.use(express.static('dist'))
app.use(compression)
app.use(helmet());
app.use(bodyParser.json());

app.use('/static', express.static('src/static'))

app.use('/api/forms', formsAPI);
app.use('/api/results', resultsAPI)

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

db.connect(function (err) {
  if (err) {
    console.log("Could not connect to Database");
    return;
  }
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Dev server started on port ' + port);

    open('http://localhost:' + port);
  }
});

