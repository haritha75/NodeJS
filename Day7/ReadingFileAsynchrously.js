const fs = require("fs");

console.log("first line");

fs.readFile("f1.txt", cb2); // this file read the data asynchrously whenver read the file and calling call back function here we are attaching callbck to the that file.

function cb2(err, data) {
  if (err) {
    console.log("if the data not getting from the file it print error message");
  }
  console.log("data -> " + data);
}

fs.readFile("f2.txt", cb1); // this file read the data asynchrously whenver read the file and calling call back function here we are attaching callbck to the that file.

function cb1(err, data) {
  if (err) {
    console.log("if the data not getting from the file it print error message");
  }
  console.log("data -> " + data);
}

//  here data will be read asynchrosly so it does not wait for other one it will do it's work whenver that methods time come it will executes that's it.
console.log("last line");
// actually async code print randomly.
