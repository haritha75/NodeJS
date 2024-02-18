const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

mongoose
  .connect("mongodb://localhost:27017/my_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

async function addUserToDatabase(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log("User added successfully.");
  } catch (error) {
    console.error("Error adding user:", error.message);
  }
}

addUserToDatabase({ username: "john_doe", email: "john@example.com" });
