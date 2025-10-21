const express = require("express");
const fs = require("fs");
const mysql = require("./sql");
const xlsx = require("xlsx");
const multer = require("multer");
const excel = require("./index");
const mail = require("./sendmail");
const cron = require("./node_cron");

const app = express();
const PORT = 3000;

//정적 디렉토리 설정
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    limit: "50mb",
  })
);

// 파일 업로드 설정
const storage = multer.diskStorage({
  // 업로드된 파일이 저장될 위치 설정
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
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

//라우팅 정보
app.get("/", (req, res) => {
  res.send("Hello World");
});

//customer 테이블 조회 -> 엑셀 => 이메일로 전송시 첨부 파일.
//'customersInfo' Get 요청처리
app.get("/customersInfo", (req, res) => {
  mysql
    .queryExecute(
      "select id,name,email,phone,address from customers where id > 15",
      []
    )
    .then((result) => {
      console.log(result);
      const workbook = xlsx.utils.book_new();
      const firstSheet = xlsx.utils.json_to_sheet(result, {
        header: ["id", "name", "email", "phone", "address"],
      });
      //워크북에 시트추가
      const name = "customers3";
      const path = "./files/customers3.xlsx";
      xlsx.utils.book_append_sheet(workbook, firstSheet, name);
      xlsx.writeFile(workbook, path);
      mail.mailSendFunc(name, path);
    })
    .catch((err) => {
      console.log(err);
    });
  res.send("ok");
});

//고객 정보 -> 이메일로 발송
//cron/start get 요청. 10분단위로 고객의 정보 전체를 xlsx파일로 발송
//id, name,email/phond/address
//21,황인하/inha@email.com/010-0000-0000/제주시 100번지
//22,백지민/jimin@email.com/010-1111-2222/세종특별시100번지
//cron/stop get요청 cron작업 종료
let task;
app.get("/cron/start", (req, res) => {
  try {
    mysql
      .queryExecute(`select id,name,email,phone,address from customers`, [])
      .then((result) => {
        console.log(result);

        const workbook = xlsx.utils.book_new();
        const firstSheet = xlsx.utils.json_to_sheet(result, {
          header: ["id", "name", "email", "phone", "address"],
        });
        //워크북에 시트추가
        const name = "customersInfo";
        const path = "./files/customersInfo.xlsx";
        xlsx.utils.book_append_sheet(workbook, firstSheet, name);
        xlsx.writeFile(workbook, path);
        cron.sendInfo(name, path);
      });

    res.send("고객정보가 정상적으로 발송됐습니다.");
  } catch (err) {
    console.error(err);
  }
});
app.get("/cron/stop", (req, res) => {
  cron.stop();
  res.send("고객 정보 발송을 종료합니다.");
});

//이미지 업로드 처리
app.post("/upload/:productId/:type/:fileName", (req, res) => {
  const dir = `uploads/${req.params.productId}/${req.params.type}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // console.log(req.params);
  // console.log(
  //   req.body.imageBase64.slice(req.body.imageBase64.indexOf(";base64") + 8)
  // );
  const filePath = `${dir}/${req.params.fileName}`;
  const base64Data = req.body.imageBase64.slice(
    req.body.imageBase64.indexOf(";base64") + 8
  );

  fs.writeFile(`${filePath}`, base64Data, "base64", (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("파일 저장 중 오류가 발생했습니다.");
    }
    console.log("파일이 성공적으로 저장되었습니다.");
  });

  res.send("OK");
});

app.post("/upload/excels", upload.single("excelFile"), (req, res) => {
  //멀티파트 폼데이터 처리. => db저장
  const workbook = xlsx.readFile(`${req.file.path}`);
  const firstSheetName = workbook.SheetNames[0]; //첫번째 시트명
  const firstSheet = workbook.Sheets[firstSheetName]; //첫번째 시트
  const excelData = xlsx.utils.sheet_to_json(firstSheet); //시트->json배열
  console.log(excelData);
  try {
    for (const item of excelData) {
      mysql.queryExecute(`insert into customers set ?`, [item]);
    }
    res.send("파일 업로드 완료!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("데이터베이스 저장중 오류가 발생했습니다.");
  } finally {
    //업로드된 파일 삭제
    // fs.unlink(req.file.path, (err) => {
    //   if (err) {
    //     console.error("파일 삭제 중 오류발생:", err);
    //   } else {
    //     console.log("업로드된 파일이 삭제되었습니다.");
    //   }
    // });
    console.log("업로드된 파일 경로:", req.file.path);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http:localhost:${PORT}`);
});
