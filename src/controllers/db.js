import { dbUsername, dbPwd } from '../settings';

var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: dbUsername,
  password: dbPwd,
  database: "rpproject"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("[DATABASE] Connected!");
});

function storedProcedure(sql, callback) {
  let request = "CALL " + sql.name + "(";

  sql.params.forEach((elem, i) => {
    if (i != 0)
      request += ", ";

    request += "\"" + elem + "\"";
  });

  request += ");";

  console.log(request);

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
