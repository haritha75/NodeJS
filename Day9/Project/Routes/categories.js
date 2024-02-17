// in this applicaton we are creating croud operation using routers

const express = require("express");
const Joi = require("joi"); // Capitalized Joi to match the required import
const router = express.Router();

// Corrected category IDs
const categories = [
  { id: 1, name: "Web" },
  { id: 2, name: "Mobile" },
  { id: 3, name: "Photography" },
];

router.get("/api/categories", (req, res) => {
  res.send(categories);
});

router.post("/api/categories", (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message); // Corrected typo

  const category = {
    id: categories.length + 1, // Incrementing the length of the array for a unique ID
    name: req.body.name,
  };
  categories.push(category);
  res.send(category);
});

router.put("/api/categories/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send("The category with the given id was not found");

  category.name = req.body.name;
  res.send(category);
});

router.delete("/api/categories/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send("The category with the given id was not found");

  const index = categories.indexOf(category);
  categories.splice(index, 1);
  res.send(category);
});

router.get("/api/categories/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));

  if (!category)
    return res.status(404).send("The category with the given id was not found");
  res.send(category);
});

function validateData(category) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(category, schema); // Execute Joi validation against provided data
}

module.exports = router;
// here we are exporting this router to another file  now we can use this data in other file also.
