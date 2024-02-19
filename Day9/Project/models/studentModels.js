const mongoose = require("mongoose");
const Joi = require("joi"); // Capitalized Joi to match the required import

// creating schema

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, minglenght: 3, maxlength: 30 },
  isEntrolled: {
    type: Boolean,
    default: false,
  },
  Phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 25,
  },
});
// create model

const Student = mongoose.model("Student", studentSchema);
function validateData(student) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    Phone: Joi.string().min(10).max(50).required(),
    isEntrolled: Joi.Boolean(),
  };

  return Joi.validate(student, schema); // Execute Joi validation against provided data
}
exports.Student = Student;
exports.validate = validateData;
