

const express = require("express");

const app = express();

function greetHandler(req, res) {
  const name = req.query.name;

  if (name) {
    res.send(`Hello, ${name}!`);
  } else {
    res.send("Hello, Guest!");
  }
}

app.get("/greet", greetHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
