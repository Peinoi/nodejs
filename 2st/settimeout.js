//settimeout.js
//비동기 처리
// 10 -> 2 -> * 2 -> 5 => 결과로 출력.\

//promise를 async/await

function delayFunc(delay, perations) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      perations();
      resolve(result);
    }, delay);
  });
}

let result = 10;
async function runPromise() {
  try {
    await delayFunc(500, () => (result += 2));
    console.log(result);

    await delayFunc(1000, () => (result *= 2));
    console.log(result);

    await delayFunc(800, () => (result += 5));
    console.log(result);
  } catch (err) {
    console.log(new Error("Error"));
  }
  // promise
  //   .then((resp) => {
  //     // console.log(resp);
  //     return new Promise((resolve, reject) => {
  //       setTimeout(function () {
  //         result *= 2;
  //         resolve(result);
  //       }, 1000); //*2
  //     });
  //   })
  //   .then((resp) => {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(function () {
  //         result += 5;
  //         resolve(result);
  //       }, 800); //*2
  //     });
  //   })
  //   .then((data) => {
  //     console.log(result);
  //   })
  //   .catch((err) => console.log(err));
} //runPromise
runPromise();
