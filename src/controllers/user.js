import { jwtSecret } from '../settings';

const jwt = require('njwt')
const bcrypt = require('bcryptjs');
const fs = require('fs')

const Db = require('./db.js');

// **********
// login existing user
// **********
export const login = async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  var sql = { name: "GetUserPasswordByName", params: [ username ] };

  if (validateEmail(req.body.username) == true) {
    sql.name = "GetUserPasswordByEmail";
  }

  Db.storedProcedure(sql, function (err, sp_res) {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    if (sp_res[0].length != 0) {

      bcrypt.compare(password, sp_res[0][0].password, function(comp_err, comp_res) {
        if (comp_err) {
          return res.status(500).send({ message: "InvalidPassword" });
        } else if (comp_res) {
          var claims = { "name": username };
          var token = jwt.create(claims, jwtSecret);

          return res.status(200).send({ auth: true, token: token.compact() });
        } else {
          return res.status(500).send({ message: "InvalidPassword" });
        }
      });
    } else {
      return res.status(500).send({ message: "InvalidUser" });
    }
  });
}


// **********
// Register new user
// **********
export const register = async (req, res) => {
  var username = req.body.username;
  var hashedPassword = await hashPassword(req.body.password);
  var email = req.body.email;

  var sql = { name: "GetUserByName", params: [ username ] };

  Db.storedProcedure(sql, function (err, data) {
    if (err) {
      return res.status(500).send({ message: err.message });
    } else if (data[0].length != 0) {
      return res.status(500).send({message: "UsernameTaken" });
    }

    sql = { name: "GetUserByEmail", params: [ email ] };

    Db.storedProcedure(sql, function (err, data) {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else if (data[0].length != 0) {
        return res.status(500).send({message: "EmailTaken" });
      }

      sql = { name: "InsertNewUser", params: [ username, hashedPassword, email ] };

      Db.storedProcedure(sql, function (err, data) {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        return res.status(200).send({ message: "UserRegistered" });
      });
    });
  });
}


// **********
// Hash password to store in DB
// **********
async function hashPassword (pwd) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pwd, salt);
}

// **********
// Verify if username used in an email
// **********
function validateEmail (emailAdress) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAdress.match(regexEmail)) {
    return true;
  }

  return false;
}
