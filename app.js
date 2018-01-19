require('dotenv').load();
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors');
const fallback = require('express-history-api-fallback')

const formsAPI = require('./build/controllers/formsAPI').default;
const resultsAPI = require('./build/controllers/resultsAPI').default;
const db = require('./build/config/dbConnection')

const port = process.env.PORT || 3000;
const app = express();

// serve static files for client
app.use(express.static('dist'))

// client side packages
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// serve index.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

// serve API
app.use('/api/forms', formsAPI);
app.use('/api/results', resultsAPI)

// handle fallback for HTML5 history API - respect order of requests (fallback last)
app.use(fallback(path.join(__dirname, './dist/index.html')))

// Enable gzip compression - last element since it otherwise interferes with API server
app.use(compression)

db.connect(function (err) {
  if (err) {
    console.log("Could not connect to Database", err);
    return 1;
  }
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('App server started on port ' + port);
  }
});
