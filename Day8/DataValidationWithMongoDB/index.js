// IN THIS MODULE WE CAN SEE CRUD OPERATIONS WITH MONGODB USIMG NODE JS CODE

const mongoose = require("mongoose");

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017/mydatabase";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Schema

//DATA VALIDATION IN MONGODB USING NODE JS  CODE nothing validate the data if data is not validate then print error
// in below we mention requred that means we have to mention that attribute if not then we have to print error

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 200 },
  // customer data validation
  tags: {
    type: Array,
    validate: {
      //validate working like required
      validator: function (tags) {
        // here validtor is method it can validate the data
        return tags.length > 1; // if setting  or given array length is 2 or more than 2 it return true.
      },
    },
  },
  category: {
    type: String,
    retuired: true,
    enum: ["DSA", "WEB", "MOBILE", "DATA SCIENCE"],
  },
  creator: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
  isPublished: { type: String, required: true },
  rating: {
    type: Number,
    required: function () {
      return this.isPublished;
      // here what happends whenever we set the publish value to true then if not mention rating  in the create course but  published true right mention in funcion we mention published so true but we are not given rating  that means their is no number type but it return true  typ must be number but their is no number so it gives error like this we can use.
    },
  },
});
// here createing schema and setting the attribute means rows name

const Course = mongoose.model("Course", courseSchema);
// here creating model using above schema like a table name course
// models are used structuring and managing the data.
// CREATING DATA
async function createCourse() {
  const course = new Course({
    name: "javascript",
    tags: ["mongodb", "nodejs"],
    category: "database", // if it is not in the list it gives error
    creator: "haritha",
    isPublished: true,
    rating: 4.5,
  });
  // here create the dataset for that schema means like a setting values in table.
  //  if you want to more rows then you can execute after execute the data will be stored in table then again change value after changing we can execute again and again how many times you want that's it.
  try {
    //await course.validate(); // it is a inbuilt method we can use this is also in place below one
    const res = await course.save(); // we are saving that data save method is asyn so use async
    console.log(res);
  } catch (err) {
    // error validation  means to identifing where error happening  what is that error use like this
    for (field in err.errors) {
      //here we have many attributes in can identify which attribute getting error and also on this attribute what is error it can specify
      console.log(err.errors[field]);
    }
  }
}
createCourse();
//  till now we are creating the data and post in the table now we can print the data or query from that table or document
// READING DATA
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

// let's see comparision query operator
// for example which curse have 4 above then you can comparision operators

// eq(equal), gt(greater than), gte(greater than are  equal to) ,lt ,lte, in ,not in and in node js we cannot use symbols we can like this only

async function getCourse() {
  const course = await Course.find({ $rating: { $gte: 4 } })
    .select({
      name: 1,
      publishDate: 1,
    })
    .sort({ name: 1 }); //if yowant sort name in descding order metnion 1 other mention -1
  console.log(course);
  // here what happend based on the creator name we have to get the course and print in console
}
getCourse();

// here we are given condtion which course have more than 4 rating we can get that course.

// if you want specific course  then use this in operator

async function getCourse() {
  const course = await Course.find({ $in: [3, 4.2] })
    .select({
      name: 1,
      publishDate: 1,
    })
    .sort({ name: 1 }); //if yowant sort name in descding order metnion 1 other mention -1
  console.log(course);
  // here what happend based on the creator name we have to get the course and print in console
}
getCourse();
// htat mean if rating have 3 or 4.2 it will give the courses name only 3 or 4.2 rating. it working like a or operator.

// logical operators
// or, and operators

async function getCourse() {
  const course = await Course.find({ $in: [3, 4.2] })
    .select({
      name: 1,
      publishDate: 1,
    })
    .or([{ creator: "haritha" }, { rating: 4.1 }]);

  console.log(course);
}
getCourse();
// in operators takes array but or operators takes objects and or operator if one is valid it will print here i am given rating is wrong still it gives answer because creator is valid right
// if inplace of or put and both conditon are true then that time only return result.

// how to update existing document or table
// UPDATING DATA
async function updateCourse(id) {
  let course = await Course.findById(id);
  if (!course) return;
  course.name = "python";
  course.creator = "raj";
  const update = await course.save();
  console.log(update);
}

updateCourse(
  "nodejs create own id then we can place here go to mongodb and copy paste it"
);

// DETETING DATA FROM THE DOCUMENT OR TABLE

async function deleteCourse(id) {
  let course = await Course.findByIdAndDelete(id);
  console.log(course);
}

deleteCourse("passid from mangodb copy and paste here");
