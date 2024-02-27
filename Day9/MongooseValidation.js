const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
});

const User = mongoose.model("User", userSchema);

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

function addUserWithValidation(user) {
  const newUser = new User(user);

  newUser.save(function (err, savedUser) {
    if (err) {
      console.error("Error saving user:", err.message);
    } else {
      console.log("User successfully added:", savedUser);
    }
  });
}

addUserWithValidation({ username: "john_doe", email: "invalid-email" });
