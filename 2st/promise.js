//promise.js
//pending / fulfilled/ rejectd
const promise = new Promise(function (resolve, reject) {
  //resolve -> 처리 성공 reject -> 실패
  try {
    // console.logs("asfd");
    setTimeout(() => {
      resolve({ retCode: "Success", retVal: ["hong", "kim", "park"] });
    }, 1000); //1초 뒤에 실행
  } catch (err) {
    reject(new Error("Error !!!"));
  }
});

promise
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  });

fetch("")
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
