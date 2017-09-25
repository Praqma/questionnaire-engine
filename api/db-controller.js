var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
import { DB_PASSWORD } from './db-config'

var uri = "mongodb://eddie:" + DB_PASSWORD + "@praqma-db-shard-00-00-tgeam.mongodb.net:27017,praqma-db-shard-00-01-tgeam.mongodb.net:27017,praqma-db-shard-00-02-tgeam.mongodb.net:27017/PRAQ-FORMS?ssl=true&replicaSet=praqma-db-shard-0&authSource=admin"
MongoClient.connect(uri, function(err, db) {
  assert.equal(null, err);

  db.collection('')

  db.listCollections().toArray(function(err, items) {
    assert.equal(null, err);
    console.log(items);

    db.close();
  });
  console.log("Connected correctly to server");

  db.close();
});
