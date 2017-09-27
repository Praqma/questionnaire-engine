import * as connection from '../config/dbConnection'
import assert from 'assert'

export function allAnswers(callback) {
  connection
    .connect(function () {
      var db = connection.get();
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
  let version = requestPayload.version;
  let clientID = requestPayload.clientID;
  let formID = Object.keys(requestPayload.answers)[0]
  let formResponse = requestPayload.answers[formID]

  connection.connect(function () {
    var db = connection.get();
    var collection = db.collection(questionnaireID);

    let queryObj = {"version": version, clientID: clientID, formID: formID}
    collection.find(queryObj).toArray(function (err, docs) {

        let insertObj = {
          version: version,
          clientID: clientID,
          formID: formID,
          lastUpdated: new Date(),
          answers: formResponse
        }

        if (docs.length > 0) {
          assert.equal(1, docs.length);
          let writeResult = collection.update(
            queryObj,
            insertObj,
            { upsert: true }
          )
          if (writeResult.writeError) {
            return callback(writeResult.writeError)
          }
          return callback(null, writeResult)

        } else if (docs.length === 0) {
          collection.insertOne(insertObj, function (err, result) {
              if (err) {
                return callback(err)
              }
              return callback(err, result)
            })
        }
      })

  })

}
