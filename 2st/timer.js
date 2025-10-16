//timer.js
//setTimeout, setInterval

const fs = require("fs");
const process = require("process");
const os = require("os");
const path = require("path");

//process
console.log(process.env.USERNAME);
// process.exit();

//os
console.log(os.networkInterfaces());
//path

//url

setTimeout(() => {
  console.log("한번만 실행");
}, 1000);

fs.readFile("./sample.txt111", "utf-8", (err, data) => {
  //
  if (err) {
    return;
  }

  let cnt = 0;
  let max = data.length;
  let job = setInterval(() => {
    console.clear();
    console.log(data.substring(0, cnt++));
    if (cnt == max) {
      clearInterval(job);
    }
  }, 200);
});
