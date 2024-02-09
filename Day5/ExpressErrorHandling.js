

const express = require("express");
const app = express();

function positiveIntegerHandler(req, res, next) {
  const number = parseInt(req.query.number);
  if (Number.isInteger(number) && number > 0) {
    res.status(200).json({ message: "Success" });
  } else {
    next(new Error("Parameter 'number' must be a positive integer"));
  }
}

function errorHandler(err, req, res, next) {
  res.status(400).json({ error: err.message });
}

app.get("/positive", positiveIntegerHandler);
app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
