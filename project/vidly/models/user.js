const Joi = require("joi"); //it is used to validate the genres
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  // in below you can chose any one  based on the situations
  isAdmin: Boolean,
  // roles:[],
  // operations:[]
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  ); //it is name of the application seting in the config file
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}
module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.userSchema = userSchema;
