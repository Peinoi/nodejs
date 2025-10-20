//app.js

const express = require("express");
const fs = require("fs");
const cookieSession = require("cookie-session");
//라우터 임포트
const customerRouter = require("./route/customer");
const productsRouter = require("./route/products");
const boardRouter = require("./route/board");
const multer = require("multer");
//서버인스턴스
const app = express();
//body-parser 대신 express 내장 함수 사용.
//parsing application/x-www-form-urlencoded;
app.use(express.urlencoded({ extended: false }));
//parsing application/json
app.use(express.json());
//

//정적 디렉토리
app.use(express.static("public"));

//쿠키 세션 설정
app.use(
  cookieSession({
    name: "session",
    keys: ["sadfsagbrebatrebatedab", "edgwreahredhtreahrehberanb"],
    maxAge: 24 * 60 * 60 * 1000, //24hours
  })
);

// 파일 업로드 설정
const storage = multer.diskStorage({
  // 업로드된 파일이 저장될 위치 설정
  destination: function (req, file, cb) {
    const uploadDir = "uploads/imgs/";
    if (!fs.existsSync(uploadDir)) {
      //폴더가 없으면 동기적으로 생성
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir); // 저장 폴더
  },

  // 업로드 파일 이름 설정
  filename: function (req, file, cb) {
    // DataTransfer → 오타, Date.now()가 맞습니다.
    // 한글 파일명 깨짐 방지를 위해 Buffer → string 변환 사용
    const originalName = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );

    cb(null, Date.now() + "-" + originalName);
  },
});
// multer 객체 생성
const upload = multer({ storage: storage });
//라우팅 정보가 많을 경우 파일로 나눠서 작성
//cutomer.js, products.js
app.use("/customer", customerRouter); //'/','/add'
app.use("/products", productsRouter); //'/','/add'
app.use("/board", boardRouter);

//라우팅 정보 : '/' -> '페이지 정보', '/list' -> '글목록 정보'
//get/post/put/delete 요청정보 처리결과 출력

app.get("/", (req, res) => {
  fs.readFile("./root.html", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    res.send(data);
  });
});

app.post("/uploads", upload.single("profile"), (req, res) => {
  console.log(req.file);
  res.send("파일 업로드 완료!");
});

//숙제 여러파일 업로드 처리.
app.post("/multi_uploads", upload.array("profile2", 2), (req, res) => {
  console.log(req.file);
  res.send("파일 업로드 완료!");
});

// //cookie-session 테스트
// app.get("/login", (req, res) => {
//   if (!req.session.views) {
//     req.session.views = 1;
//   } else {
//     req.session.views++;
//   }
//   res.send(`현재 ${req.session.views}번째 방문입니다.
//     <br><a href="/logout">로그아웃</a>
//     `);
// });
// app.get("/logout", (req, res) => {
//   req.session = null;
//   res.redirect("/login");
// });

app.get("/test/:sno/:sname/:score", (req, res) => {
  const info = req.params;
  // console.log();
  let result = `<table border="1">
  <tr><th>학번</th><td>${info.sno}</td></tr>
  <tr><th>이름</th>    <td> ${info.sname}</td></tr>
  <tr>
  <th>합격여부</th>
   <td>${info.score >= 60 ? "합격" : "불합격"}(${info.score})</td>
</tr>

  </table>
  `;

  res.send(result);
});
app.post("/test", (req, res) => {
  const info = req.params;
  // console.log();
  let result = `<table border="1">
  <tr><th>학번</th><td>${info.sno}</td></tr>
  <tr><th>이름</th>    <td> ${info.sname}</td></tr>
  <tr>
  <th>합격여부</th>
   <td>${info.score >= 60 ? "합격" : "불합격"}(${info.score})</td>
</tr>

  </table>
  `;

  res.send(result);
});
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("POST request to the homepage");
});

app.post("/:user/:score", (req, res) => {
  // localhost:3000/hongkildong/90\
  console.log(req.params);
  res.send("POST request to the homepage");
});

//라우팅 /login
//id,pass 입력
//값이 있으면 3번째 값 불려와 ${3번째값}환영합니다.
//없으면 아이디와 비밀번호를 확인하세요
app.post("/login/:id/:pass", async (req, res) => {
  let fileContents;
  let addinfo = req.params;
  let info; //텍스트 파일 저장
  let obj = { check: false, name: "..." };
  //텍스트 파일읽기
  await fs.readFile("user_info.txt", function (err, data) {
    if (err) {
      console.Error(err);
    }
    fileContents = data;
    // console.log(fileContents.toString("utf-8"));
    info = fileContents.toString("utf-8").split("\n");
    // console.log(info.length);
    info.forEach((elem) => {
      let value = elem.split(",");
      console.log(addinfo.id === value[0] && addinfo.pass == value[1]);
      if (addinfo.id === value[0] && addinfo.pass == value[1]) {
        obj.check = true;
        obj.name = value[2];
      }
    });

    if (obj.check) {
      obj.name += "님 환영합니다.";
      res.send(`${obj.name} `);
    } else {
      res.send("아이디와 비밀번호를 확인하세요");
    }
  });

  //console.log(req.params);
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
