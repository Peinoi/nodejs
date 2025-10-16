//crypto.js
//암호화
const { rejects } = require("assert");
const crypto = require("crypto");
const { resolve } = require("path");

let cryptPasswd = crypto
  .createHash("sha256")
  .update("sample123")
  .digest("base64");
//같은 임의의 값만을 출력
// console.log(cryptPasswd);

//1.DB의 값을 암호화값 VS. 사용자가 입력한 값 => 비교후 판별.
let fiexedSalt =
  "u5kilYK2tNQIfHih+GtWCfNVJxkYrTBisDhJCJdw1Vivt8u0nYTBeLx2XBxsLI4r/+5WYv/w8QEMjMwgiPvhkg==";

async function getCryptoPassword(password) {
  //1. salting 임의의 구문. => 동일한 평문(비밀번호) -> 다른 암호값.
  // let salt = crypto.randomBytes(64).toString("base64");
  let dbPass =
    "uLw5uhR1WRr/hdkqNmpeVNMMbfCMee47X+fwm1IM/mc4bff0dKdrizCuYQBxrBcu3h7Px0/5IySxYUzPj4IU5Q==";
  // console.log(fiexedSalt);
  // console.log(salt);

  return new Promise((resolve, rejects) => {
    crypto.pbkdf2(password, fiexedSalt, 10000, 64, "sha512", (err, key) => {
      if (err) {
        console.log(err);
        return;
      }
      // console.log(key.toString("base64"));

      // console.log(key.toString("base64") ? "same" : "different");
      resolve(dbPass == key.toString("base64") ? "same" : "different");
    });
  });
}

getCryptoPassword("sample123")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
