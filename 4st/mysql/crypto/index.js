const crypto = require("crypto");

function generateHash(password, hashSalt) {
  return new Promise((resolve, rejects) => {
    crypto.pbkdf2(password, hashSalt, 10000, 64, "sha512", (err, key) => {
      if (err) {
        console.log(err);
        return;
      }

      resolve({ salt: hashSalt, password: key.toString("base64") });
    });
  });
}
function randomBytes(size) {
  return crypto.randomBytes(size);
}
module.exports = { generateHash, randomBytes };
