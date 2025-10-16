//path.js
const process = require("process");
const os = require("os");
const path = require("path");
const url = require("url");

//process
console.log(process.env.USERNAME);
// process.exit();

//os
console.log(os.networkInterfaces());

//path
console.log(__filename);
console.log(path.basename(__filename));
console.log(path.basename(__filename, ".js"));
console.log(path.delimiter);
console.log(path.extname("index.html"));

//url
const myUrl = new URL("https://www.youtube.com/#fgo");
console.log(myUrl);
console.log(myUrl.hash);
myUrl.hash = "baz";
console.log(myUrl.href);
console.log(myUrl.searchParams.get("user"));
console.log(myUrl.searchParams.has("user"));
console.log(myUrl.searchParams.keys());
console.log(myUrl.searchParams.values());

//레거시 API
console.log(url.parse("https://www.youtube.com/#hash"));
