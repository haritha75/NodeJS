const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/vidly", {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Add this option to use the new Server Discovery and Monitoring engine
    })
    .then(() => {
      winston.info("Connected to MongoDB...");
    });
};
