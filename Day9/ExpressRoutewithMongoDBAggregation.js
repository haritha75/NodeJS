const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
const User = mongoose.model("User", userSchema);
async function averageAgeOfUsers(req, res) {
  try {
    const averageAgeResult = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: "$age" },
        },
      },
    ]);
    if (averageAgeResult.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    const averageAge = averageAgeResult[0].averageAge;
    res.json({ averageAge });
  } catch (error) {
    console.error("Error calculating average age:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
app.get("/average-age", averageAgeOfUsers);
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
