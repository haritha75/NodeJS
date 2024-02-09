function mymiddlewar(req, res, next) {
  console.log("this is a custome middlewar");
  next();
  // here next method indicates whenver one middlesware completes the work and go to the next middleswar or send to the next middlesware to the request that mans to pass control to the next middleware
}

module.exports = mymiddlewar;
