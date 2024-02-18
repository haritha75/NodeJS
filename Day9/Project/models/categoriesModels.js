const mongoose = require("mongoose");
const Joi = require("joi"); // Capitalized Joi to match the required import
// creating schema

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, minglenght: 3, maxlength: 30 },
});

const Category = mongoose.model("Category", categorySchema);

function validateData(category) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(category, schema); // Execute Joi validation against provided data
}

exports.Category = Category;
exports.categorySchema = categorySchema;
exports.validate = validateData;
