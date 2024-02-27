const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

function authenticateAndAuthorize(roles) {
  return (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    try {
      const decoded = jwt.verify(token, "secret");

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      req.user = decoded;

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

app.get("/admin", authenticateAndAuthorize(["admin"]), (req, res) => {
  res.send("Admin route");
});

app.get("/user", authenticateAndAuthorize(["user", "admin"]), (req, res) => {
  res.send("User route");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
