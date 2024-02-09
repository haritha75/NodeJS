function mymiddle(req, res, next) {
  console.log("this is second middleware");
  next();
}

const exports = mymiddle;
