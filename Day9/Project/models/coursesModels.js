const mongoose = require("mongoose");
const Joi = require("joi"); // Capitalized Joi to match the required import
const { categorySchema } = require("../models/categoriesModels");
const courseSchema = new mongoose.Schema({
  title: {
    type: string,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  category: { type: categorySchema, required: true }, //here we are placing one schma into another schema
  creator: { type: string, required: true },
  rating: { type: Number, required: true },
});
const Course = mongoose.model("Couse", courseSchema);

function validateData(couse) {
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    category: Joi.string().required(),
    creator: Joi.string().min(5).required(),
    rating: Joi.string().min(0).required(),
  };

  return Joi.validate(couse, schema); // Execute Joi validation against provided data
}

exports.Couse = Course;
exports.validate = validateData;
