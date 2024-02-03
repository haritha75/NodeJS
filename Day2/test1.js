const calculator = require("./calculator");
//  here i am importing the calculator module so we can use all the functions and variables inside the calculator file into this class.

calculator.addition(4, 5);
//  here i am calling the that method.

calculator.substraction(5, 3);
calculator.multiplication(3, 5);
calculator.division(2, 6);
calculator.modulo(9, 5);

let age = 12;
console.log(global.age);
//  it gives undefined because in node js variables are  with in the file scope only
