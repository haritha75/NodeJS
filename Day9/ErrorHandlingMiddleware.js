const express = require("express");

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  if (err.statusCode && err.message) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const app = express();

app.get("/example", (req, res, next) => {
  const err = new Error("Example error");
  err.statusCode = 400;
  next(err);
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
