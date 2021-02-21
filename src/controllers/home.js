import { jwtSecret } from '../settings';

const jwt = require('njwt')

function verifyToken (token) {
  jwt.verify(token, jwtSecret, (err, verifiedJwt) => {
    if (err) {
      return true;
    } else {
      return false;
    }
  })
}
