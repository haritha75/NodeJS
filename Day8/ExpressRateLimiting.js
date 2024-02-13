

const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();

function rateLimitMiddleware() {
  const limiter = rateLimit({
    windowMS: 15 * 60 * 1000,
    max: 3,
    message: "Too many requests, please try again later.",
  });

  return (req, res, next) => {
    limiter(req, res, (err) => {
      if (err) {
        return res.status(429);
      }
      next();
    });
  };
}

app.use(rateLimitMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
