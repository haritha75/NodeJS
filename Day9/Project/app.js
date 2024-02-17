const express = require("express");
const categories = require("./Routes/categories");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/learningPlatform")
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use(express.json());
app.use(categories);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
