const mysql = require("./sql");
const xlsx = require("xlsx");

function excel_to_db() {
  //mysql->excel
  //workbook - sheet
  const workbook = xlsx.readFile(`./files/new_customers.xlsx`);
  const firstSheetName = workbook.SheetNames[0]; //첫번째 시트명
  const firstSheet = workbook.Sheets[firstSheetName]; //첫번째 시트
  const excelData = xlsx.utils.sheet_to_json(firstSheet); //시트->json배열
  console.log(firstSheet);

  //json배열 ->mysql insert
  excelData.forEach(async (item) => {
    await mysql
      .queryExecute(`insert into customers set ?`, [item])
      .then((result) => {
        console.log(result);
      });
  });
}
// excel_to_db();
//엑셀파일 열기
function db_to_excel() {
  //mysql에서 고객 데이터 조회 -> 엑셀 파일로 저장
  mysql
    .queryExecute("select id,name,email,phone,address from customers", [])
    .then((result) => {
      console.log(result);
      //워크북 생성
      const workbook = xlsx.utils.book_new();
      const firstSheet = xlsx.utils.json_to_sheet(result, {
        header: ["id", "name", "email", "phone", "address"],
      });
      //워크북에 시트추가
      xlsx.utils.book_append_sheet(workbook, firstSheet, "customers");
      xlsx.writeFile(workbook, "./files/customers.xlsx");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = { excel_to_db };
