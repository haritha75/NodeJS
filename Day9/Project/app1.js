const express = require("express");
const categories = require("./Routes/categories1");
const students = require("./Routes/students");
const courses = require("./Routes/courses");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/learningPlatform")
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use(express.json());
app.use("/api/categories", categories); //it means that path is default if you add new in the categories that attach to this one.
app.use("/api/students", students);
app.use("/api/courses", courses);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
