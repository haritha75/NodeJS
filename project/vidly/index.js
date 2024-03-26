const mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres = require("./routers/genres");
const customers = require("./routers/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("connected to Mongodb..."))
  .catch((err) => console.error("could not connect to Mongodb..."));
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("on port " + port);
});
