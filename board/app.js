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

// --- 인증 (Auth) 엔드포인트 ---

/**
 * 로그인 처리 (현재는 Mockup 처리)
 * Vue의 useAuthStore.login()에서 호출됨
 */
app.post("/login", async (req, res) => {
  const { id, pass } = req.body;
  console.log(`API: /login - 로그인 시도 ID: ${id}`);

  // 실제 DB 연동 로직 대신 간단한 하드코딩된 인증 정보 사용
  if (id === "test" && pass === "1234") {
    // 성공 시 사용자 정보 반환 (작성자 필드와 일치하도록 'writer' 정보 제공)
    const userData = {
      id: id,
      writer: "관리자", // 게시글/댓글 작성자 이름과 일치해야 권한 체크 가능
    };
    res.send(userData);
  } else {
    // 실패 시 401 Unauthorized 에러 반환
    res.status(401).send({
      message: "인증 실패: 아이디 또는 비밀번호가 올바르지 않습니다.",
    });
  }
});

// --- 댓글 (tbl_reply) CRUD 엔드포인트 ---

/**
 * 특정 게시글의 댓글 목록 조회
 * Vue의 useReplyStore.fetchReplies()에서 호출됨
 */
app.get("/board/:board_id/replies", async (req, res) => {
  const boardId = req.params.board_id;
  console.log(`API: /board/${boardId}/replies - 댓글 목록 조회`);
  // 댓글 번호 기준 오름차순 정렬
  const sql = `SELECT * FROM tbl_reply WHERE board_id=? ORDER BY idComments ASC`;
  const result = await mysql.queryExecute(sql, [boardId]);
  res.send(result);
});

/**
 * 댓글 등록
 * Vue의 useReplyStore.addReply()에서 호출됨
 */
app.post("/reply", async (req, res) => {
  const newReply = req.body.param;
  console.log("API: /reply - 댓글 등록:", newReply);
  const sql = `INSERT INTO tbl_reply SET ?`;
  const result = await mysql.queryExecute(sql, newReply);
  res.send(result); // { insertId: ... } 반환
});

/**
 * 댓글 수정
 * Vue의 useReplyStore.updateReply()에서 호출됨
 */
app.put("/reply", async (req, res) => {
  const updatedReply = req.body.param;
  console.log(`API: /reply - 댓글 수정: ${updatedReply.idComments}`);
  // idComments를 기준으로 comment 필드만 수정
  const sql = `UPDATE tbl_reply SET comment=? WHERE idComments=?`;
  const param = [updatedReply.comment, updatedReply.idComments];
  const result = await mysql.queryExecute(sql, param);
  res.send(result);
});

/**
 * 댓글 삭제
 * Vue의 useReplyStore.deleteReply()에서 호출됨
 */
app.delete("/reply/:idComments", async (req, res) => {
  const idComments = req.params.idComments;
  console.log(`API: /reply/${idComments} - 댓글 삭제`);
  const sql = `DELETE FROM tbl_reply WHERE idComments=?`;
  const result = await mysql.queryExecute(sql, [idComments]);
  res.send(result);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
