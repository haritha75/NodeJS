const joi = require("joi"); //to validate data use joi function
const express = require("express");
const app = express();

app.use(express.json);

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// app.get("/api/courses", (req, res) => {
//   res.send([1, 2, 3]);
// });

app.post("/api/courses", (req, res) => {
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

app.put("/api/courses/:id", (req, res) => {
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

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("given id is not found");
    return;
  }
  res.send(course);
});

// app.get("/api/posts/:year/:month", (req, res) => {
//   res.send(req.params);
//   //res.send(req.query);
// });

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

app.delete("/api/courses/:id", (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("on port " + port);
});
