const express = require("express");
const mysql = require("./sql/index");
const mailer = require("./mailer/index");
const crypto = require("./crypto/index");
//express setup
const app = express();
const port = 3000;

//정적디렉토리 설정
app.use(express.static("public"));

//middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/sendmail", async (req, res) => {
  const { userid, phone } = req.query;
  let result = await mysql.queryExecute(
    `select * from customers where
    name=? and phone=?
    `,
    [userid, phone]
  );
  console.log(result);
  if (result.length === 0) {
    return res.send("No matching user found");
  }
  //to,subject,html
  const to = result[0].email;
  const subject = "Your Requested Information";
  const html = `<h3>${result[0].name}
  New Password is 12345
  `;
  result = await mailer.myMailingFunc(to, subject, html);
  res.send(result);
});

//nodemailer test route
app.post("/signup", async (req, res) => {
  try {
    const { userid, password, email, phone } = req.body;
    //중복처리
    // console.log(userid, password, email, phone);
    // let result = await mysql.queryExecute(
    //   `select * from customers where
    //   email=? and phone=?
    //   `,
    //   [email, phone]
    // );
    // console.log(result);
    // if (result.length !== 0) {
    //   return res.send("No matching user found");
    // }
    //암호화
    let salt = crypto.randomBytes(64).toString("base64");
    let promise = crypto.generateHash(password, salt);
    let cryptoData = await promise;

    // let salt = crypto.randomBytes(64).toString("base64");

    // let finalHash = crypto
    //   .createHash("sha512")
    //   .update("sample123" + salt) // 평문 비밀번호 + 무작위 Salt
    //   .digest("base64");

    let param = {
      name: userid,
      password_hash: cryptoData.password,
      password_salt: cryptoData.salt,
      email: email,
      phone: phone,
    };

    let sql = `insert into customers set ?
        `;
    let resultuser = await mysql.queryExecute(sql, param);
    res.send(resultuser);
  } catch (err) {
    console.log(err);
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    let info = await mysql.queryExecute(
      `select * from customers where
    email=?
    `,
      [email]
    );

    let promise = crypto.generateHash(password, info[0].password_salt);
    let cryptoData = await promise;
    if (cryptoData.password === info[0].password_hash) {
      res.send({ message: "Login successful", userId: info[0].id });
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
  }
});

//customers table - select all
app.get("/customers", async (req, res) => {
  let sql = `select * from customers`;
  let result = await mysql.queryExecute(sql, []);
  res.send(result);
});
app.get("/customers/:id", async (req, res) => {
  const id = req.params.id;
  let sql = `select * from customers where id=?`;
  let result = await mysql.queryExecute(sql, [id]);
  res.send(result);
});

app.post("/customers", async (req, res) => {
  const param = req.body.param;
  let sql = `insert into customers set ?
        `;
  let result = await mysql.queryExecute(sql, param);
  res.send(result);
});

app.put("/customers", async (req, res) => {
  const param = req.body.param;
  // console.log(param);
  const sql = `update customers set ? where id=?`;
  let result = await mysql.ueryExecute(sql, param);
  res.send(result);
});

app.delete("/customers/:id", async (req, res) => {
  const id = req.params.id;
  let result = await mysql.queryExecute(`delete from customers where id =? `, [
    id,
  ]);
  res.send(result);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
