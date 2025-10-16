//console_class.js

const { Console } = require("console");
const fs = require("fs");
// const { stderr } = require("process");

const output = fs.createWriteStream("./stdout.log", { flags: "a" }); //일반 로그.
const errOutput = fs.createWriteStream("./stderr.log", { flags: "a" }); //에러 로그.

const logger = new Console({ stdout: output, stderr: errOutput });

//log() : 로그, error():에러로그
logger.log("Prints to stdout with newline");
logger.error("Standard I/O Error !!!");
