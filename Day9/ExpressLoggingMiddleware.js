const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const requrest = req.method;
  const url = req.path;
  const header = req.header;
  const body = req.body;
  console.log("Timestamp = ", timestamp);
  console.log("http method = ", requrest);
  console.log("URL = ", url);
  console.log("Header = ", header);
  console.log("Body = ", body);
  next();
}

app.use(loggingMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.post("/", (req, res) => {
  const name = req.body.name;
  res.send(`Hello ${name}`);
});

app.listen(3000, () => {
  console.log(" Server listening on port 3000");
});
