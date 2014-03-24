var pg = require('pg');
var pg_cs = "tcp://postgres@localhost/echelon";

exports.disconnect = function () {
  pg.end()
};

exports.query = function( sql, callback ) {
  pg.connect(pg_cs, function(err, client, done) {
    if (err) {
      callback(err, null);
      return;
    };
    
    client.query(sql, function(err, result) {
      done()
      if (err) {
        callback(err, null);
        return;
      };

      if (result) {
        callback(null, result);
      }
    });
  });
}
