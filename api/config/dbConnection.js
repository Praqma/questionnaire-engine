module.exports = (function () {
  require('dotenv').load();
  let MongoClient = require('mongodb').MongoClient;
  let connection;
  const DB_URI_PROD = require('../../config/dbConfig').DB_URI_PROD

  let uri
  if (DB_URI_PROD && process.env.DB_PASSWORD_PROD) {
    if (DB_URI_PROD.includes('<DB_PASSWORD_PROD>')) {
      uri = DB_URI_PROD.replace('<DB_PASSWORD_PROD>', process.env.DB_PASSWORD_PROD)
    } else {
      console.log('DB_URI does not match the required format. Missing "<DB_PASSWORD_PROD>" from DB_URI string.')
      process.exit(1)
    }
  } else {
    console.log('Could not find database URI in environment variables. Try adding "--env DB_URI:<uri>" to your docker run command.')
    process.exit(1)
  }

  const connect = function(done) {
    if (connection) return done()
    MongoClient.connect(uri, function(err, db) {
      if (err){
        return done(err);
      }
      connection = db;
      done();
    })
  }
  const get = function() {
    return connection;
  }
  const close = function(done) {
    if (connection) {
      connection.close(function(err, result) {
        connection = null;
        if (done)
          done(err,result)
      })
    }
  }

  return {
    connect,
    get,
    close
  }
})()
