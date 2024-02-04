const path = require("path");
//  it is used to work with the specific path we can use this modules.

let ext = path.extname("/home/haritha/Documents/GitHub/NodeJS/Day3/f1.txt");
let basename = path.basename(
  "/home/haritha/Documents/GitHub/NodeJS/Day3/f1.txt"
);
console.log(basename);
console.log(ext);
console.log(__filename);
console.log(__dirname);
