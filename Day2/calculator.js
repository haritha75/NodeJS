function add(a, b) {
  console.log(a + b);
}
function sub(a, b) {
  console.log(a - b);
}

function mul(a, b) {
  console.log(a * b);
}

function div(a, b) {
  console.log(a / b);
}

function mod(a, b) {
  console.log(a % b);
}

//  if you want to use this function anothe file then modularity come in picture create one module and key attach that function t o key

module.exports = {
  addition: add,
  substraction: sub,
  multiplication: mul,
  division: div,
  modulo: mod,
};
//  we can import this module whcih file we want to use
//  here addition is the key
