const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.error("could not connect tto mongodb...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "React Course",
    author: "Raj",
    tags: ["React", "frontend"],
    isPublished: true,
    price: 599,
  });

  const result = await course.save();
  console.log(result);
}
//createCourse();

async function getCourses() {
  const courses = await Course.find({ author: "Haritha" })
    //.find({ price: { $gte: 10, $lte: 20 } })
    //.find({ price: { $in: [10, 20, 30] } })
    .limit(3)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, _id: 0 }); //here we are slelecting only name and tags but id automatically displays so if you donot want to that make it 0. instead of select use count it returns number of documents.
  console.log(courses);
}
//getCourses();

// logical query

// async function getCourses() {
//   const courses = await Course.find()
//     .or([{ author: "Haritha" }, { isPublished: true }])
//     .and([])
//     .limit(3)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1, _id: 0 }); //here we are slelecting only name and tags but id automatically displays so if you donot want to that make it 0.
//   console.log(courses);
// }
// getCourses();

// regular expression

// async function getCourses() {
//   const courses = await Course
//     // starts with Hari
//     .find({ author: /^Hari/ })
//     // ends with j
//     .find({ author: /j$/i }) //if you want case in sensitive use i
//     // contains anywhere
//     .find({ author: /.*Hari.*/i }) //.* means zero or one more characters

//     .limit(3)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1, _id: 0 }); //here we are slelecting only name and tags but id automatically displays so if you donot want to that make it 0.
//   console.log(courses);
// }
// getCourses();

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
updateCourse("65ffa94ceab5912ae4c315fe");

// delete document

async function deleteCourse(id) {
  const res = await Course.deleteOne({ _id: id });
  //const course = await Course.findByIdAndRemove(id); //you can use this one also
  console.log(res);
}
deleteCourse("65ffa94ceab5912ae4c315fe");
