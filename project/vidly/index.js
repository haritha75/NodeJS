const Joi = require("joi");
const express = require("express");
const app = express();

const genres = require("./routers/genres");

app.use(express.json());
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("on port " + port);
});
