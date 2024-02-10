

const express = require("express");
const app = express();

function requestLoggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  console.log(`${timestamp} - ${method} request received.`);
  next();
}

app.use(requestLoggerMiddleware);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("server is running on the port 3000");
});
