const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
  // validation
  const { error } = validateCourse(req.body); //result.error

  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  // look up the course
  // if not exisitng, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("given id is not found");
    return;
  }

  // validate
  // if invalid , return 400-bad request

  const { error } = validateCourse(req.body); //result.error

  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }

  // update course

  course.name = req.body.name;
  // return the updated course
  res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("given id is not found");
    return;
  }
  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("given id is not found");
    return;
  }
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

module.exports = router;
