const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); //  implementation of authentication and improving overall security.
const config = require("config");

const _ = require("lodash");
// Lodash provides many useful functions for working with arrays, objects, strings, and more.
const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const auth = require("../middleware/auth"); //authorization(have the permission or not to the user) not authetications(validation of password or id's like that)

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password"); //excluding the password
  res.send(user);
});

router.post("/", async (req, res) => {
  // validation
  const { error } = validateUser(req.body); //result.error

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered");
  }

  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });

  // instread of above use this one for better maintability
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken(); //it is name of the application seting in the config file
  res
    .header("x-auth-token", token) //here we are setting token to header and send  respodnds to the client
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
