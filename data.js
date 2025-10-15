//data.js
//module기능.
const studentsAry = [
  { sno: 100, sname: "홍길동", score: 80 },
  { sno: 200, sname: "김민수", score: 57 },
  { sno: 300, sname: "박철민", score: 77 },
  { sno: 400, sname: "오영수", score: 92 },
];

function sum(a, b) {
  return a + b;
}
const PI = 3.14;

function getStudentInfo() {
  return ["홍길동", "김민수", "박충원", "홍영기"];
}

let jsonString = `[{"id":1,"first_name":"Abby","last_name":"Gurr","email":"agurr0@cnet.com","gender":"Female","salary":3218},
{"id":2,"first_name":"Rutherford","last_name":"Carragher","email":"rcarragher1@newyorker.com","gender":"Male","salary":4194},
{"id":3,"first_name":"Bill","last_name":"Roggeman","email":"broggeman2@edublogs.org","gender":"Female","salary":6250},
{"id":4,"first_name":"Jervis","last_name":"Wile","email":"jwile3@blogger.com","gender":"Male","salary":6396},
{"id":5,"first_name":"Neill","last_name":"Silverwood","email":"nsilverwood4@squarespace.com","gender":"Male","salary":8846},
{"id":6,"first_name":"Crissy","last_name":"Guslon","email":"cguslon5@unesco.org","gender":"Female","salary":5101},
{"id":7,"first_name":"Nealson","last_name":"Rekes","email":"nrekes6@usnews.com","gender":"Male","salary":7415},
{"id":8,"first_name":"Malena","last_name":"Yanyshev","email":"myanyshev7@flavors.me","gender":"Female","salary":9427},
{"id":9,"first_name":"Jilli","last_name":"O'Hartnedy","email":"johartnedy8@reddit.com","gender":"Female","salary":7179},
{"id":10,"first_name":"Celesta","last_name":"Bray","email":"cbray9@sitemeter.com","gender":"Female","salary":5737},
{"id":11,"first_name":"Tabb","last_name":"Povah","email":"tpovaha@google.ca","gender":"Male","salary":6258},
{"id":12,"first_name":"Albie","last_name":"Cherryman","email":"acherrymanb@google.com.hk","gender":"Male","salary":6279},
{"id":13,"first_name":"Jaquenetta","last_name":"McElane","email":"jmcelanec@ucla.edu","gender":"Female","salary":3337},
{"id":14,"first_name":"Nancie","last_name":"Gillions","email":"ngillionsd@loc.gov","gender":"Female","salary":7611},
{"id":15,"first_name":"Rory","last_name":"Catherine","email":"rcatherinee@php.net","gender":"Female","salary":5086}]`;

export { studentsAry, sum, PI, getStudentInfo, jsonString };
