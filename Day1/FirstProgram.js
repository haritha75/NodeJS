console.log("My first Node js program");

function sayHello() {
  console.log("hello.......");
}
sayHello();

console.log(global);
// it is like a window in js but here gloabl object

let name = "haritha";
console.log(global.name);
//  it gives undefined because in node js variables are  with in the file scope only
