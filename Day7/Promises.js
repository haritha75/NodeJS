//how to produce a promise

let myPromise = new Promise(function (resolve, reject) {
  const a = 4;
  const b = 4;
  setTimeout(() => {
    if (a == b) {
      resolve();
    } else {
      reject();
    }
  }, 2000);
});

console.log(myPromise);
//here we are in pending because js is synchorous right it does not wait anything but dettimeout takes 2sec so it will come to console statement at that time it is pending statemetn
//  to get the result and execute the promises we are uisng two functions that are then and catch function.

// fullfiled state

let myPromise1 = new Promise(function (resolve, reject) {
  const a = 4;
  const b = 4;
  setTimeout(() => {
    if (a == b) {
      resolve("equal");
    } else {
      reject("not equal");
    }
  }, 2000);
});

myPromise1.then(function (result) {
  // whever the promises will get resolved tthen it return the data wheveter inside resolved method that will send to the result paramter

  console.log(result);
});

// reject state

let myPromise2 = new Promise(function (resolve, reject) {
  const a = 4;
  const b = 5;
  setTimeout(() => {
    if (a === b) {
      resolve("equal");
    } else {
      reject("not equal");
    }
  }, 2000);
});

myPromise2.catch(function (result) {
  // whever getting rejct state actually it return error  but we are assuming that whatever the data inside rejected method will return but not like that it returns error so we have to handle that state using catch method.
  console.log(result);
});
// here whatever reject method return that will handled by the catch method and printing it.
