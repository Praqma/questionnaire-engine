const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors');

const formsAPI = require('./build/controllers/formsAPI').default;
const resultsAPI = require('./build/controllers/resultsAPI').default;
const db = require('./build/config/dbConnection')

const port = process.env.PORT || 3030;
const app = express();

app.use(express.static('dist'))

app.use(cors());
// Enable gzip compression - off since it interferes with API server
// app.use(compression)
app.use(helmet());
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.use('/api/forms', formsAPI);
app.use('/api/results', resultsAPI)

db.connect(function (err) {
  if (err) {
    console.log("Could not connect to Database");
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
