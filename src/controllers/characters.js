const User = require("./user.js");
const Db = require('./db.js');

export const charactersList = async (req, res) => {

  var token = req.body.token;

  let tokenValues = User.verifyToken(token);
  console.log("tokenValues = ", tokenValues);

  if (tokenValues.isValid == false) {
    res.status(401).send('unauthorized');
  }

  var userId = tokenValues.datas.id;
  var sql = { name: "GetCharactersByUserId", params: [ userId ] };

  Db.storedProcedure(sql, function (err, data) {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    return res.status(200).send({ characters: data });
  });

}
