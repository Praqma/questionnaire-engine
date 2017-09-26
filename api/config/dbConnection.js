var MongoClient = require('mongodb').MongoClient;
var connection;

import { DB_PASSWORD } from './config'
var uri = "mongodb://eddie:" + DB_PASSWORD + "@praqma-db-shard-00-00-tgeam.mongodb.net:27017,praqma-db-shard-00-01-tgeam.mongodb.net:27017,praqma-db-shard-00-02-tgeam.mongodb.net:27017/PRAQ-FORMS?ssl=true&replicaSet=praqma-db-shard-0&authSource=admin"

var connect = function(done) {
  if (connection) return done()
  MongoClient.connect(uri, function(err, db) {
    if (err){
      return done(err);
    }
    connection = db;
    console.log('DB assigned to Connection');

    done();
  })
}
var get = function() {
  console.log('Returning: ' + connection);

  return connection;
}
var close = function(done) {
  console.log('XXX closing connection');

  if (connection) {
    connection.close(function(err, result) {
      connection = null;
      if (done)
        done(err,result)
    })
  }
}

export { connect, get, close }
