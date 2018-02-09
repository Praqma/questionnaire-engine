module.exports = (function () {
  require('dotenv').load();
  let MongoClient = require('mongodb').MongoClient;
  let connection;

  let uri
  if (process.env.DB_URI) {
    if (process.env.DB_URI.includes('<dbpassword>') && process.env.DB_PASSWORD) {
      uri = process.env.DB_URI.replace('<dbpassword>', process.env.DB_PASSWORD)
    } else {
      uri = process.env.DB_URI
    }
  } else {
    console.log('Could not find database URI in environment variables. Try adding "--env DB_URI:<uri>" to your docker run command.')
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
