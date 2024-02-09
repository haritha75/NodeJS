const express = require("express");
const app = express();

// by using the app we will access methods get,post,put,delete
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/haritha", (req, res) => {
  res.send("update data haritha");
});
app.listen(3000, () => {
  console.log("30000");
});
