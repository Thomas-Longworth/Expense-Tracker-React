var pg = require('pg');


var conString = "postgres://twqanulq:JibQhhCdJA7ZNyKBXhJRrJ7ESNVxxR6J@ruby.db.elephantsql.com/twqanulq" //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
 
   
    client.end();
  });
});