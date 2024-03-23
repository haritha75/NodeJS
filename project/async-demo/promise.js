// to handle asynchrous operations you can use promises
// promise is an object it holds the eventually result to the asynchrous operations.
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve(1);
    reject(new Error("message"));
  }, 2000);
});

p.then((result) => console.log("Result", result)).catch((err) =>
  console.log("Error", err.message)
);
