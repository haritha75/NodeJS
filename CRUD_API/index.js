const express = require("express");
const app = express();

const Product = require("./models/productmodels.js");
const productRoute = require("./routes/productroute.js");
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", productRoute);

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/testDatabase")
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("hello from node api");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
