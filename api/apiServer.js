/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser'
import open from 'open';
import chalk from 'chalk'

import config from '../webpack.config.prod';
import formsAPI from '../api/controllers/formsAPI'
import resultsAPI from '../api/controllers/resultsAPI'
import * as db from '../api/config/dbConnection'
var cors = require('cors');

const port = process.env.PORT || 3030;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/forms', formsAPI);
app.use('/api/results', resultsAPI)


db.connect(function (err) {
  if (err) {
    console.log(chalk.red("Could not connect to Database"));
    return;
  }
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(chalk.green('API server started on port ' + port));
  }
});

