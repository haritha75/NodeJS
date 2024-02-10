const fs = require("fs");

console.log("first line");

let data = fs.readFileSync("./f1.txt");
console.log("data is -> " + data);

console.log("last line");
