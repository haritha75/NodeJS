const mongoose = require("mongoose");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const { Genre, validateGenre } = require("../models/genres");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
  // throw new Error("Intentional internal server error");
});

router.post("/", auth, async (req, res) => {
  // validation
  const { error } = validateGenre(req.body); //result.error

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body); //result.error

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      name: true,
    }
  );

  if (!genre) {
    res.status(404).send("given id is not found");
    return;
  }

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) {
    res.status(404).send("given id is not found");
    return;
  }

  res.send(genre);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(404).send("given id is not found");
    return;
  }
  res.send(genre);
});

module.exports = router;
