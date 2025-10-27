//board 서버 프로그램 생성
const express = require("express");
const mysql = require("./sql/index");
const cors = require("cors");

//express setup
const app = express();
const port = 3000;

//정적디렉토리 설정
app.use(express.static("public"));
app.use(cors());
//middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//전체 조회
app.get("/boards", async (req, res) => {
  let sql = `select * from tbl_board`;
  let result = await mysql.queryExecute(sql, []);
  res.send(result);
});
// 조회
app.get("/board/:id", async (req, res) => {
  const id = req.params.id;
  let sql = `select * from tbl_board where id=?`;
  let result = await mysql.queryExecute(sql, [id]);
  res.send(result);
});
// 등록
app.post("/board", async (req, res) => {
  const param = req.body.param;
  console.log(param);
  let sql = `insert into tbl_board set ?
        `;
  let result = await mysql.queryExecute(sql, param);

  res.send(result);
});
// 수정
app.put("/board", async (req, res) => {
  const data = req.body.param;
  const sql = `update tbl_board set title=?,content=? where id=?`;
  const param = [data.title, data.content, data.id]; //  배열로 변환
  // console.log(param);
  let result = await mysql.queryExecute(sql, param);
  res.send(result);
});

// 삭제
app.delete("/board/:id", async (req, res) => {
  const id = req.params.id;
  let result = await mysql.queryExecute(`delete from tbl_board where id =? `, [
    id,
  ]);
  res.send(result);
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
