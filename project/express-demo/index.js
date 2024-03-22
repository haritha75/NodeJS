const debug = require("debug")("app:startup");

const config = require("config");
const joi = require("joi"); //to validate data use joi function
const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const helment = require("helmet"); //protect yor app from other web vulnerabilities
const morgan = require("morgan");
const courses = require("./routes/courses");
const home = require("./routes/home");

app.set("view engine", "pug"); //express internally load pug module if you want return html to the client use view engine pug is aslo view engine

app.set("views", "./views");

app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
app.use(helment());
app.use("/api/courses", courses);
app.use("/", home);

// configuration

console.log("Application Name: " + config.get("name"));
console.log("Mail Server Name: " + config.get("mail.host"));
console.log("Mail Password Name: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("morgan enabled...");
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("on port " + port);
});
