import * as connection from '../config/dbConnection'
import assert from 'assert'

export function allAnswers(callback) {
  connection
    .connect(function () {
      var db = connection.get();
      console.log('got... :');
      console.log(db);

      var collection = db.collection("test-collection");
      collection
        .find({})
        .toArray(function (err, docs) {
          if (err) {
            return callback(err, docs)
          }
          return callback(err, docs);
        });

    })

}

export function insertFormResponse(questionnaireID, requestPayload, callback) {
  let formVersion = requestPayload.version;
  let clientID = requestPayload.clientID;
  let formID = Object.keys(requestPayload.answers)[0]
  let formResponse = requestPayload.answers[formID]

  connection.connect(function () {
    var db = connection.get();
    var collection = db.collection(questionnaireID);

    let insertObj = {
      version: formVersion,
      clientID: clientID,
      formID: formID,
      answers: formResponse
    }

    collection.insertOne(insertObj, function(err, result) {
      if (err) {
        return callback(err)
      }
      return callback(err, result)
    })
  })

}
