//literal.js
import { getStudentInfo } from "./data.js";
let myName = "홍길동";
console.log("Hellow, " + myName);
console.log(`Hellow, ${myName}`);

let n1 = 10;
let n2 = 11;
console.log(`n1+n2=${n1 + n2}`);

console.log(
  `${getStudentInfo()
    .map((person) => "친구이름=>" + person + "\n")
    .join(" ")}`
);

//펼침 연산자(sprad operator)
let friends = ["김민규", "박철홍"];
console.log(...friends);

let newAry = [...friends, ...getStudentInfo()];
console.log("이거" + newAry);

//Object Destrusturing
const person = {
  firstName: "Kildon",
  lastName: "Hong",
  age: 20,
};
let { firstName: fn, lastName: ln, age } = person;
console.log(fn, ln, age);
//Array Destrusturing
//"홍길동", "김민수", "박충원", "홍영기"
let [ary1, ary2, ary3, ary4] = getStudentInfo();
console.log(ary1, ary2, ary3);

//default function prameter
function minus(n1 = 0, n2 = 0) {
  return n1 - n2;
}
console.log(minus(10));
