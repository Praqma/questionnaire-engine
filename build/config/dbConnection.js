'use strict';module.exports = function () {
  require('dotenv').load();
  var MongoClient = require('mongodb').MongoClient;
  var connection = void 0;

  var uri = void 0;
  if (process.env.DB_URI) {
    if (process.env.DB_URI.includes('<dbpassword>') && process.env.DB_PASSWORD) {
      uri = process.env.DB_URI.replace('<dbpassword>', process.env.DB_PASSWORD);
    } else {
      uri = process.env.DB_URI;
    }
  } else {
    console.log('Could not find database URI in environment variables. Try adding "--env DB_URI:<uri>" to your docker run command.');
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