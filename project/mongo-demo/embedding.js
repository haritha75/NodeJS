const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playgroundDemo1")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
    //in previous  we are refere the type will be author but here directly mention type  will be  another  Schema
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}
//addAuthor("6602b26407ea3572eb3dc562", new Author({ name: "Army" })); // here what happend based on id we are add the authour name means already existing

async function removeAuthor(courseId, authorID) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorID);
  author.deleteOne();
  course.save();
}
removeAuthor("6602b26407ea3572eb3dc562", "6602b28b3bfcc0e35796d4fe");

async function updateAuthor(courseID) {
  const course = await Course.findById(courseID);
  course.authors.name = "Haritha";
  course.save();
}
//updateAuthor("66026894153572e8df3ec1a3");

// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "Haritha" }),
// ]);
