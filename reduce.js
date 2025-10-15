//reduce.js
//Array.prototype.reduce();
//reduce(function(){...})
//acc:누적값 elem:현재배열의 요소 idx:인덱스번호 ary:배열
//reduce는 acc라는 값을 반환해주는것 return-> acc로 들어간다.

//외부 js에서 함수 호출
import { studentsAry } from "./data.js";

//reduce연습
// let result = [1, 2, 3, 4, 5].reduce((acc, elem, idx, ary) => {
//   console.log(`acc : ${acc}, elem : ${elem}`);
//   if (idx % 2 == 0) {
//     acc.push(elem);
//   }
//   return acc;
// }, []);
// console.log(result);

//위치값
const evenAry = function (acc, elem, idx, ary) {
  //console.log(`acc : ${acc}, elem: ${elem}`);
  if (idx % 2 == 0) {
    acc.push(elem);
  }
  return acc;
};
let result = [1, 2, 3, 4, 5].reduce(evenAry, []);
// console.log(`결과: ${result}`);
//누적값
const sumAry = (acc, elem) => acc + elem;
let sum_result = [1, 2, 3, 4, 5].reduce(sumAry, 0);
// console.log(`합결과: ${sum_result}`);
result = [21, 11, 56, 33, 47].reduce((acc, elem) => {
  return acc < elem ? acc : elem;
}, 100);
//console.log(`최소값: ${result}`);

//60점 이상 패스한 사람만 배열에 저장.
result = studentsAry.reduce((acc, elem) => {
  if (elem.score > 60) {
    acc.push(elem);
  }
  return acc;
}, []);
//console.log(result);

//중복값 판별
const numAry = [23, 12, 45, 87, 12, 45];
result = numAry.reduce((acc, elem) => {
  //내가한거
  // acc.push(elem);
  // let cnt = 0;
  // for (let i = 0; i < acc.length; i++) {
  //   if (acc[i] == elem) {
  //     cnt++;
  //     if (cnt == 2) {
  //       acc.pop();
  //       cnt = 0;
  //       break;
  //     }
  //   }
  // }

  //방법1 <- 비추천
  // let exists = acc.reduce(function (acc2, elem2) {
  //   return acc2 || elem2 == elem;
  // }, false);
  //   // if(!exists){acc.push(elem)}

  //방법2
  if (!acc.includes(elem)) {
    acc.push(elem);
  }
  return acc;
}, []);
console.log(result);
