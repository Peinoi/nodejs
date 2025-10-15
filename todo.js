//todo.js
import { jsonString } from "./data.js";
let jsonObj = JSON.parse(jsonString);
//console.table(jsonObj);
//reduce 출력 : gender-> FEMALE 인것만 ID , FULLNAME, EMAIL, SALARY => resultAry

let resultAry = jsonObj.reduce((acc, elem) => {
  let obj = {};
  if (elem.gender === "Female") {
    obj.id = elem.id;
    // obj.gender = elem.gender;
    obj.FullName = elem.first_name + " " + elem.last_name;
    obj.email = elem.email;
    obj.salary = elem.salary;

    acc.push(obj);
  }
  return acc;
}, []);
//console.table(resultAry);
//jsonObj의 gender별 인원.
//Male:[]
//Female:[]
//Genderqueer:[]
//Agender:[]

resultAry = jsonObj.reduce((acc, elem, idx, ary) => {
  const key = elem["gender"];
  if (!acc[key]) {
    acc[key] = []; // 객체의 속성
  }
  acc[key].push(elem.first_name);

  return acc;
}, {});
console.table(resultAry);
