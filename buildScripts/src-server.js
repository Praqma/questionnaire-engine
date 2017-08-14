import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

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
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    [
      {
        id: 11,
        title: "First text"
      }, {
        id: 12,
        title: "Second text"
      }, {
        id: 13,
        title: "Third text"
      }
    ],
    [
      {
        id: 21,
        title: "Fourth text"
      }, {
        id: 22,
        title: "Fifth text"
      }, {
        id: 23,
        title: "Sixth text"
      }
    ],
    [
      {
        id: 31,
        title: "Fourth text"
      }, {
        id: 31,
        title: "Fifth text"
      }
    ],
    [
      {
        id: 41,
        title: "Fourth text"
      }, {
        id: 42,
        title: "Fifth text"
      }, {
        id: 43,
        title: "Sixth text"
      }
    ]
  ]);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
