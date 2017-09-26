import * as connection from '../config/dbConnection'
import assert from 'assert'

module.exports.allAnswers = function (callback) {
  connection.connect(function() {
    var db = connection.get();
    console.log('got... :');
    console.log(db);

    var collection = db.collection("test-collection");
    collection.find({}).toArray(function (err, docs) {
      if (err) {
        return callback(err, docs)
      }
      return callback(err, docs);
    });

  })

};

module.exports.addAnswer = function (answerToAdd, callback) {
  connection.connect(function() {
    var db = connection.get();
    var collection = db.collection('test-collection');
    collection.insertOne(answerToAdd, function (err, res) {
      if (err) {
        return callback(err);
      }
      return callback(err, res);
    });
    connection.close();
  })

};
