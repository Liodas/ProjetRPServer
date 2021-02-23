import { dbHost, dbUsername, dbPwd, dbName } from '../settings';

var mysql = require('mysql');

var db = mysql.createConnection({
  host: dbHost,
  user: dbUsername,
  password: dbPwd,
  database: dbName
});

db.connect(function(err) {
  if (err) throw err;
  console.log("[DATABASE] Connected!");
});

function buildRequestString(sql)
{
  let request = "CALL " + sql.name + "(";
  sql.params.forEach((elem, i) => {
    if (i != 0)
      request += ", ";

    request += "\"" + elem + "\"";
  });
  request += ");";

  return request;
}

function storedProcedure(sql, callback) {
  let request = buildRequestString(sql);

  db.query(request, true, (err, res, fields) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

module.exports = {
  db,
  storedProcedure
}
