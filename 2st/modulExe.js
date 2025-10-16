//modulExe.js
const { error } = require("console");
const { PI, sum } = require("./module.js");
const fs = require("fs"); //내장 모듈 file System

//비동기 처리 = callback함수
// fs.writeFile("sample.txt", "Hello, World", (err) => {
//   if (err) {
//     console.log(new Error(err));
//   } else {
//     console.log("write done!!");
//   }
// });

// fs.writeFileSync("sample2.txt", "비동기처리 완료", "utf-8");
// console.log("쓰기 완료!");

//비동기처리
fs.readFile("sample.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});
//동기처리
let data = fs.readFileSync("sample2.txt", "utf-8");
console.log(data);

console.log(PI);
console.log(sum(1, 2));
