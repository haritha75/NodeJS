const mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres = require("./routers/genres");
const customers = require("./routers/customers");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("connected to Mongodb..."))
  .catch((err) => console.error("could not connect to Mongodb..."));
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("on port " + port);
});
