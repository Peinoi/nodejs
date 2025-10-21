//node_cron.js

const cron = require("node-cron");
const winston = require("winston");
const mysql = require("./sql");
const mail = require("./sendmail");
const logger = winston.createLogger({
  level: "info", //error > warn > info > http > verbose > debug > silly
  // format: winston.format.printf((info) => `${info.level}: ${info.message}`),
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log/info.log" }),
  ],
});

async function customerList() {
  try {
    let result = await mysql.queryExecute(
      `select count(*) as cnt from customers`,
      []
    );
    logger.info(`customers테이블의 현재 건수 ${result[0].cnt}건`);
  } catch (err) {
    logger.error(`Error : ${err}`);
  }
}
//(*시*분*초*일*월)공백으로 구분
cron.schedule("*/5 * * * * *", () => {
  //customerList();
  // logger.info("print info level");
  // logger.debug("print info debug");
  // logger.error("print info error");
  // logger.warn("print info warn");
  // logger.verbose("print info verbose");
  // sql.queryExecute(`select count(*) as cnt from customers`).then((result) => {
  //   //console.log(result[0].cnt);
  //   console.log(`cusomers테이블의 현재 회원수 ${result[0].cnt}`);
  // });
});

//매분마다 customers 데이터 변경된 건수를 출력
//customers 테이블의 현재 건수 : 234건

//고객 정보 -> 이메일로 발송
//cron/start get 요청. 10분단위로 고객의 정보 전체를 xlsx파일로 발송
//id, name,email/phond/address
//21,황인하/inha@email.com/010-0000-0000/제주시 100번지
//22,백지민/jimin@email.com/010-1111-2222/세종특별시100번지
//cron/stop get요청 cron작업 종료
let task = null;

function sendInfo(name, path) {
  task = cron.schedule("*/5 * * * * *", () => {
    mail.mailSendFunc(name, path);
  });
}
function stop() {
  task.stop();
}
module.exports = { stop, sendInfo };
