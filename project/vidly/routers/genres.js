const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.post("/", (req, res) => {
  // validation
  const { error } = validateCourse(req.body); //result.error

  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }

  const gen = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(gen);
  res.send(gen);
});

router.put("/:id", (req, res) => {
  // look up the course
  // if not exisitng, return 404
  const gen = genres.find((c) => c.id === parseInt(req.params.id));
  if (!gen) {
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

  gen.name = req.body.name;
  // return the updated course
  res.send(gen);
});

router.delete("/:id", (req, res) => {
  const gen = genres.find((c) => c.id === parseInt(req.params.id));
  if (!gen) {
    res.status(404).send("given id is not found");
    return;
  }
  // delete
  const index = genres.indexOf(gen);
  genres.splice(index, 1);
  res.send(gen);
});

router.get("/:id", (req, res) => {
  const gen = genres.find((c) => c.id === parseInt(req.params.id));
  if (!gen) {
    res.status(404).send("given id is not found");
    return;
  }
  res.send(gen);
});

function validateCourse(gen) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(gen, schema);
}

module.exports = router;
