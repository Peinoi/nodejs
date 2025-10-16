//array.js
//Array.prototype.sort();
//console.log("abc".split("").sort());
let fruits = ["banana", "apple", "mango"];
console.log(fruits.sort());

let points = [2, 14, 10, 100, 1];
points.sort(function (a, b) {
  //오름차순 -값 반환
  // return  b-a;
  //내림차순 +값 반환
  return a - b;
});
console.log(points);

const students = [];
students.push({ sno: 100, sname: "홍길동", score: 78 });
students.push({ sno: 200, sname: "김찬성", score: 55 });
students.push({ sno: 300, sname: "박인규", score: 95 });

students.sort(function (a, b) {
  return a.sname > b.sname ? 1 : -1;
});
// console.log(students);

//filter(function(요소,인덱스,배열){})=> 조건을 만족하는 배열
let filter_result = students.filter((elem, idx, ary) => elem.score < 80);
console.log(filter_result);

//map(function)=> 매핑 (A -> 'A') 학생번호 +이름+점수 => 학생번호+이름 + 통과
let map_result = students.map(function ({ sno, sname, score }) {
  //{sno,sname,score} = elem 객체 디스트럭칭 object destructuring.
  const obj = {};
  obj.sno = sno;
  obj.sname = sname;
  obj.pass = score >= 60 ? "P" : "F";
  return obj;
});
console.log(map_result);
