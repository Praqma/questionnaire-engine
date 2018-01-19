'use strict';module.exports = function () {
  require('dotenv').load();
  var configuration = require('./config').default;
  var MongoClient = require('mongodb').MongoClient;
  var connection = void 0;

  var uri = void 0;
  if (process.env.DB_PASSWORD) {
    uri = configuration.dbUri.replace('<dbpassword>', process.env.DB_PASSWORD);
  } else {
    console.log('Could not find database password in environment variables. Try adding "--env DB_PASSWORD:somepass" to your docker command.');
  }

  var connect = function connect(done) {
    if (connection) return done();
    MongoClient.connect(uri, function (err, db) {
      if (err) {
        return done(err);
      }
      connection = db;
      done();
    });
  };
  var get = function get() {
    return connection;
  };
  var close = function close(done) {
    if (connection) {
      connection.close(function (err, result) {
        connection = null;
        if (done)
        done(err, result);
      });
    }
  };

  return {
    connect: connect,
    get: get,
    close: close };

}();