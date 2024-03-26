//MongoDB is a NoSQL database, which means it doesn't support joins like traditional relational databases. Instead, it encourages denormalization and embedding to improve performance.
// Trade off between query performance vs consistency
// uisng Reference (normalization) -> CONSISTENCY

let auhtor = {
  name: "Haritha",
};
let course = {
  // it takes time because it load two collection seperatly
  auhtor: "id",
};

//   here what happends we are creating differenct collection to make a relation then we are using one collection id nothing reference of collection in another collection
// each collection written in seperately

// using embedded documents (de-normalization) -> PERFORMANCE

// here we are written inside the another collecion

let course1 = {
  //it takes less that why performance fast
  auhtor: {
    name: "Haritha",
  },
};

// hybird
// here both types happends

let author1 = {
  name: "Haritha",
  // 50 other properties
};

let course2 = {
  auhtor1: {
    id: "ref",
    name: "Haritha",
  },
};
