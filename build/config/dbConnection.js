'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.close = exports.get = exports.connect = undefined;


var _config = require('./config');var MongoClient = require('mongodb').MongoClient;var connection;
var uri = "mongodb://eddie:" + _config.DB_PASSWORD + "@praqma-db-shard-00-00-tgeam.mongodb.net:27017,praqma-db-shard-00-01-tgeam.mongodb.net:27017,praqma-db-shard-00-02-tgeam.mongodb.net:27017/PRAQ-FORMS?ssl=true&replicaSet=praqma-db-shard-0&authSource=admin";

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
};exports.

connect = connect;exports.get = get;exports.close = close;