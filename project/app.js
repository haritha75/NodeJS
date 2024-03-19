//console.log(module);
// var logger = require("./logger.js"); //to load file we need require function
// console.log(logger);
// logger.log("message");
// //  node directly run ciode it wrap the content inside the function
// const path = require("path"); //here path is a builtin module
// var pathName = path.parse(__filename);
// console.log(pathName);
// const os = require("os");
// var totalMemory = os.totalmem();
// var freememeory = os.freemem();

// console.log("total meory of cuurent os" + totalMemory);
// console.log("free meory of cuurent os" + freememeory);

// const fs = require("fs");
// const files = fs.readdirSync("./");
// console.log(files);
// fs.readdir("./", function (err, files) {
//   if (err) console.log("Error", err);
//   else console.log("Result", files);
// });

// event  is signal something will heppends

// const EvenEmitter = require("events");
// // Evenemitter is a class contains all the methods

// const Logger = require("./logger.js");
// const logger = new Logger();

// // Register a listerner
// logger.on("messageLogged", (arg) => {
//   console.log("Listener called", arg);
// });

// logger.log("message");

// HTTP Server

const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url == "/") res.write("Hello world");
  res.end();

  if (req.url == "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.on("connection", (socker) => {
  console.log("new connection...");
});

server.listen(3000);

console.log("Listening on port 30000...");
