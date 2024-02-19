const express = require("express");
const router = express.Router();
const { Course, validateData } = require("../models/coursesModels");
const { Category } = require("../models/categoriesModels");

router.get("/", async (req, res) => {
  let courses = await Course.find();
  res.send(courses);
});

router.post("/", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message); // Corrected typo

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid ID");
  const course = new Course({
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name,
    },
    creator: req.body.category,
    rating: req.body.rating,
  });

  await course.save();
  res.send(course);
});

router.put("/:id", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message); // Corrected typo

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid ID");

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      creator: req.body.creator,
      rating: req.body.rating,
      category: {
        _id: category._id,
        name: category.name,
      },
    },
    { new: true }
  );
  if (!course)
    return res.status(404).send("The category with the given id was not found");

  res.send(course);
});

router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course)
    return res.status(404).send("The category with the given id was not found");

  res.send(course);
});
router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course)
    return res.status(404).send("The category with the given id was not found");
  res.send(course);
});
module.exports = router;
