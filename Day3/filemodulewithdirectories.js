const fs = require("fs");

// create a directory
//fs.mkdirSync("mydirectory");
let folderPath = "/home/haritha/Documents/GitHub/NodeJS/Day3/mydirectory";
let foldercon = fs.readFileSync(folderPath);
console.log("folder conten " + foldercon);

let exits = fs.existsSync("mydirectory");
console.log(exits);

// remove  directory

fs.rmdirSync("mydirectory");
// before deleting the directory we want remove all the files and inside the directory.
