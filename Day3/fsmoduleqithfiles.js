const fs = require("fs");
// reading a file

let fileContent = fs.readFileSync("f1.txt");
console.log("data of f1 file is-> " + fileContent);
// actually it gives in buffere format to convert into char format use + symbol

// write files

fs.writeFileSync("f3.txt", "this is f3 file data");
// whenver writte like this this data will be ovrrdien use append method
console.log("written");
fs.appendFileSync("f3.txt", " hi, hello everyone........");
// delete a file

fs.writeFileSync("f2.txt", "this data is f2 file");
// if you have not the file it create file and write the data inside the file
fs.unlinkSync("f2.txt");
console.log("file has been deleted");
