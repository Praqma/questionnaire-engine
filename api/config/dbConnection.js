module.exports = (function () {
  require('dotenv').load();
  const configuration = require('./config')
  let MongoClient = require('mongodb').MongoClient;
  let connection;

  let uri
  if (process.env.DB_PASSWORD) {
    uri = configuration.dbUri.replace('<dbpassword>', process.env.DB_PASSWORD)
  } else {
    console.log('Could not find database password in environment variables. Try adding "--env DB_PASSWORD:somepass" to your docker command.')
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
