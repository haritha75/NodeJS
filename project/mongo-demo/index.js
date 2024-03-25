const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.error("could not connect tto mongodb...", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },

  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true, //it automatically converts into lowercase
    //uppercase: true,
    trim: true,
  },

  author: String,

  tags: {
    type: Array,
    // Custom validator
    validate: {
      validator: function (v) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const isValid = Array.isArray(v) && v.length > 0;
            // Inside the setTimeout function, it checks if the value (v) is an array with at least one element.
            if (isValid) {
              resolve(true); // Resolve the promise with true if validation passes
            } else {
              reject(new Error("A Course should have at least one tag.")); // Reject the promise with an error message if validation fails
            }
          }, 4000);
        });
      },
    },
  },

  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished; // means price will be required
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v), //even if the database contais double or float when you read it gives round value becausr we mention round
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "C# Course",
    category: "Network",
    author: "Manjula",
    tags: ["C#", "backend"],
    isPublished: true,
    price: 59.8,
  });

  try {
    //await course.validate();
    // we can do in both ways
    const result = await course.save();
    console.log(result);
  } catch (err) {
    for (field in err.errors) console.log(err.errors[field].message);
  }
}
createCourse();

async function getCourses() {
  const courses = await Course.find({ author: "Haritha" })
    .limit(3)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, _id: 0 }); //here we are slelecting only name and tags but id automatically displays so if you donot want to that make it 0. instead of select use count it returns number of documents.
  console.log(courses);
}
//getCourses();

async function updateCourse(id) {
  //  we can use only one  of this
  // two ways
  // 1)  query first findById() and modify its properties and save()

  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = "another author";
  const result = await course.save();
  console.log(result);
  // this one same like below both appoach are same purpose
  // course.set({
  //   isPublished: true,
  //   author: "Another auhtor",
  // });

  // 2) updated first  update directly

  const result1 = await Course.update(
    { _id: id },
    {
      $set: {
        author: "Mosh",
        isPublished: false,
      },
    }
  );

  console.log(result1);

  // 3)
  const result2 = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jack",
        isPublished: true,
      },
    },
    { new: true } //sometimes it gives previous one so if you want update one use this one
  );

  console.log(result2);
}
//updateCourse("65ffa94ceab5912ae4c315fe");

// delete document

async function deleteCourse(id) {
  const res = await Course.deleteOne({ _id: id });
  //const course = await Course.findByIdAndRemove(id); //you can use this one also
  console.log(res);
}
//deleteCourse("65ffa94ceab5912ae4c315fe");
