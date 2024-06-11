module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body); //result.error

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // If there are no validation errors, proceed to the next middleware
    next();
  };
};
