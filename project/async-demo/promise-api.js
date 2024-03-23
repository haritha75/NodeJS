// const p = Promise.resolve({ id: 1 });
// p.then((result) => console.log(result));

// const p1 = Promise.reject(new Error("reason for rejection..."));
// p.catch((error) => console.log(error));

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(2);
  }, 2000);
});
Promise.all([p1, p2]).then((result) => console.log(result));

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 3...");
    reject(new Error("because something failed..."));
  }, 2000);
});

const p4 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 4...");
    resolve(4);
  }, 2000);
});
Promise.race([p3, p4])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
// Promise.all([p3, p4])
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));
