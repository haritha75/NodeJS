const genres = require("../routers/genres");
const customers = require("../routers/customers");
const movies = require("../routers/movies.js");
const rentals = require("../routers/rentals.js");
const users = require("../routers/users");
const auth = require("../routers/auth");
const express = require("express");
const error = require("../middleware/error");

module.exports = function (app) {
  // middlewares
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  // to handle the errors based on the features situaions use like this
  // here first we register this function  after all the existing middlewares function(means above all) when we call next end up here(this function)
  app.use(error);
};
