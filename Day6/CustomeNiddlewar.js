const express = require("express");

const morgan = require("morgan");
// it is a third party middlewar it is logged all the details. that means it rack the request.

const app = express();
const middlewarFunction = require("./middlewar/middlewar1");
// here i am importing the middle from other file

app.use(middlewarFunction);
// here i am using that middlewarfunction

// here first middleware print after next method control to pass the next middle that means second middleware print
app.use(function (req, res, next) {
  console.log("this is second middleware");
  next();
});

//  lie you can use like this or we can import middlewars both are gives same results.

app.use(morgan()); // here  are using morgan function it print logged details if you want short time message use like this
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("hello......");
});

app.listen(3120, () => {
  console.log("server run on the 3000 port");
});

// the next() method is a function that is passed to middleware functions and
// is used to pass control to the next middleware function in the stack.
// It's typically called within the middleware function to indicate that the middleware has completed its processing and
// that Express should move on to the next middleware in line.
