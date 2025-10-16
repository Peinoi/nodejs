//Class.js
//Object
//자동차 => 도면
let obj = new Object();
obj.name = "김민수";

let student1 = {
  sno: 100,
  sname: "홍길동",
  grade: 1,
  height: 170,
  weight: 65,
  showInfo: function () {
    return `학번:${this.sno}, 이름:${this.sname}`;
  },
};

let student2 = {
  sno: 300,
  sname: "최길동",
  grade: 1,
  height: 175,
  weight: 77,
  showInfo: function () {
    return `학번:${this.sno}, 이름:${this.sname}`;
  },
};

//학생 => 정의()
class Student {
  //속성 : 학번,이름,학년,키,몸무게....
  //메소드(기능) : 공부, 식사, 수면....
  constructor(sno, sname, grade, height, weight) {
    this.sno = sno;
    this.sname = sname;
    this.grade = grade;
    this.height = height;
    this.weight = weight;
  }
  showInfo() {
    return `학번:${this.sno}, 이름:${this.sname}`;
  }
}

//인스턴스 생성.
let std1 = new Student(200, "김민규", 2, 165, 56);
let std2 = new Student(400, "박민규", 3, 180, 86);
console.log(student1.showInfo());
