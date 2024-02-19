// using mongodb creating schema
const express = require("express");
const router = express.Router();
const { Student, validateData } = require("../models/studentModels");

router.get("/", async (req, res) => {
  let students = await Student.find();
  res.send(students);
});

router.post("/", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message); // Corrected typo

  const student = new Student({
    name: req.body.name,
    isEntrolled: req.body.isEntrolled,
    Phone: req.body.Phone,
  });

  await student.save();
  res.send(student);
});

router.put("/:id", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message); // Corrected typo

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      Phone: req.body.Phone,
      isEntrolled: req.body.isEntrolled,
    },
    { new: true }
  );
  if (!student)
    return res.status(404).send("The category with the given id was not found");

  res.send(student);
});

router.delete("/:id", async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student)
    return res.status(404).send("The category with the given id was not found");

  res.send(student);
});

router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student)
    return res.status(404).send("The category with the given id was not found");
  res.send(student);
});

module.exports = router;
// here we are exporting this router to another file  now we can use this data in other file also.
