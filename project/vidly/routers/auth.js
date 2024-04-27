const mongoose = require("mongoose");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); //  implementation of authentication and improving overall security.
const Joi = require("joi");
const _ = require("lodash");
// Lodash provides many useful functions for working with arrays, objects, strings, and more.
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

// in this method we are checking already exisiting user valid or not if valid then we are generate the token
router.post("/", async (req, res) => {
  // validation
  const { error } = validate(req.body); //result.error

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password");
  }
  const token = user.generateAuthToken();
  res.send(token);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}
module.exports = router;
