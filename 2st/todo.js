//todo.js
//sample.txt 단어 갯수=> ? 'e'문자가 포함된 단어의 갯수 => ?
const fs = require("fs");
let text;
let e_text = 0;
fs.readFile("sample.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  // console.log(data);
  text = data.split(" ");
  for (let i = 0; i < text.length; i++) {
    if (text[i].includes("e")) {
      e_text++;
    }
  }
  console.log(`총 단어 갯수 : ${text.length}, e가포함된 단어 ${e_text}`);

  // let obj = { cnt: 0, e_cnt: 0 };
  // const result = data.split(" ").reduce((acc, elem, idx, ary) => {
  //   obj.cnt++;
  //   if (elem.includes("e")) {
  //     obj.e_cnt++;
  //   }
  //   if (ary.length == obj.cnt) {
  //     acc.push(obj);
  //   }
  //   return acc;
  // }, []);
  // console.table(result);
});
