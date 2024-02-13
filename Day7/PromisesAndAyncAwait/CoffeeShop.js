function placeOrder(drink) {
  return new Promise(function (resolve, reject) {
    if (drink == "coffee") {
      resolve(" coffee will be received");
    } else {
      reject("your order  rejected");
    }
  });
}

function processOrder(order) {
  return new Promise(function (resolve) {
    console.log("Order is being Processed");
    resolve(`${order} is served`);
  });
}
// placeOrder("coffee")
//   .then(function (res) {
//     console.log(res);
//     let orderISProcessed = processOrder(res);
//     return orderISProcessed;
//   })
//   .then(function (process) {
//     // to get the resolve value we are using then method.
//     console.log(process);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// here we are chaning the promises using then method this is called chaning of promises,
//  if you have more promises cahngings then it get complicated we can use async and await

// Async Await both are keywords

async function serverOrder() {
  try {
    let orderPlaced = await placeOrder("coffee"); // to resolve the promises we are using await keyword if you not used then it js engine does not wait for the promises it will goto next step.
    console.log(orderPlaced);

    let process = await processOrder(orderPlaced);
    console.log(process);
  } catch (err) {
    console.log(err);
  }
}
serverOrder();
// just wait for the promises to resolve the promises or complete the work
