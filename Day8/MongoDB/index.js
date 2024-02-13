const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/testDatabase")
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Schema

const courseSchema = new mongoose.Schema({
  name: String,
  creator: String,
  publishDate: { type: Date, default: DAte.now },
  isPublished: Boolean,
});
// here createing schema and setting the attribute means rows name

const Course = mongoose.model("Course", courseSchema);
// here creating model using above schema like a table name course
// models are used structuring and managing the data.
async function createCourse() {
  const course = new Course({
    name: "javascript",
    creator: "haritha",
    isPublished: true,
  });
  // here create the dataset for that schema means like a setting values in table.
  const res = await course.save(); // we are saving that data save method is asyn so use async
  console.log(res);
}
createCourse();
//  till now we are creating the data and post in the table now we can print the data or query from that table or document

async function getCourse() {
  const course = await Course.find({ creator: "haritha" });
  console.log(course);
  // here what happend based on the creator name we have to get the course and print in console
}
getCourse();

async function getCourse() {
  const course = await Course.find({ creator: "haritha" })
    .select({
      name: 1,
      publishDate: 1,
    })
    .sort({ name: 1 }); //if yowant sort name in descding order metnion 1 other mention -1
  console.log(course);
  // here what happend based on the creator name we have to get the course and print in console
}
getCourse();

// if you want particular attribute use select method.
