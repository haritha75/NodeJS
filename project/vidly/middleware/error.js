const winston = require("winston");
module.exports = function (err, req, res, next) {
  // log the exception
  winston.error(err.message, err); //to log the error use winston
  logger.error(err.message, err);

  res.status(500).send("Something failed.");
};
