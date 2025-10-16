//basic.js
console.log("node start");

let items = 3;
const PI = 3.14;

//객체 할당.
const obj = {};
// obj = {age:10};//이건 안됨
obj.age = 10; //속성 추가 변경은 가능
console.log(obj);

for (let i = 1; i < items; i++) {
  console.log(i);
}
{
  let times = 4;
  console.log(times);
  console.log(PI);
}

//1.함수정의.
function sum(n1 = 0, n2 = 0) {
  return n1 + n2;
}

//2.함수표현.
// const sum = (n1 = 0, n2 = 0) => {
//   return n1 + n2;
// };
const sumA = (n1 = 0, n2 = 0) => n1 + n2;
console.log(`sumA(1, 2)의 결과는 ${sumA(1, 2)}`);
