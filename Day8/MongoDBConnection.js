const mongoose = require("mongoose");

function connectionToMongoDB() {
  mongoose
    .connect("mongodb://localhost:27017/testDatabase")
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));
}
connectionToMongoDB();
