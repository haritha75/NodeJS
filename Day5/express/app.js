// express is a framework it is used to make code fast in server side part
const express = require("express");
const app = express();

app.use(express.json);
// data converting into the json format

//  this use method allows the middlewars

// get,put,post, delete and get method is used read the data from resources

// handling multiple routers parameters

const courses = [
  { id: 1, name: "java" },
  { id: 2, name: "js" },
];

// get method is used read the data
app.get("courses/:id", (req, res) => {
  let course = courses.find((course) => course.id === parseInt(req.params.id));

  res.send(course);
  //  it means whenver user enter the id that is euqal to the courses id then it return the data. find method is used find the exact object for that one uses find method.
});

app.get("courses/:coursename", (req, res) => {
  let course = courses.find((course) => course.name === req.params.coursename);

  res.send(course);
  //  it means whenver user enter the id that is euqal to the courses id then it return the data. find method is used find the exact object for that one uses find method.

  if (!course) res.status(404).res.send("your courses not in the list");
  // if courses not in the array then we have to handle error or resonse right so use above one.
});

app.get("/courses", (req, res) => {
  res.send(courses);
});

//  if you want create new object inside other object or add a data inside other data use post
// middlewars is nothing piece of code it is used connect one http request to other http request

// post method used create something
app.post("/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  // here what heppening i am creating one object and that object oush in to the courses
  courses.push(course);
  res.send(course);
});

app.get("/", (req, res) => {
  // here / means default router here i mentioning 3000 port
  res.send("helo ....");
});

app.get("/about", (req, res) => {
  //  like this also we have to create this is another router
  res.send(
    "if you update the data then it will already running state it will not print the data again start server newly"
  );
});

// route paramters

app.get("/course/:id", (req, res) => {
  console.log(req.params);
  res.send(req.params.id);
  // whnevr enter the localhost:3000/courses/1 here 1 consider as a id and it will print it
});

// here id is called route paramter and req.params object stores the that router paramters

// app.listen(3000, () => {
//   console.log("it is running on the 3000 port");
// });
// here we are using port is 3000 that means code will be run on this port here we are setting port number right
// here every time updating the data again we have start server right so it will take some time so use nodemon so for this one no need to start every tiime server

//  if you donot want to mentioning port use like this

// put method is used to updated already existing data
app.put("courses/:coursename", (req, res) => {
  let course = courses.find((course) => course.name === req.params.coursename);
  if (!course) res.status(404).res.send("your courses not in the list");

  course.name = req.body.name;
  res.send(course);
});

app.delete("courses:/coursename", (req, res) => {
  let updateCourse = courses.filter(
    (course) => course.name !== req.params.coursename
  );

  courses = updateCourse;
  res.send(courses);
});

// use only one delete method in the same router
app.delete("courses:/id", (req, res) => {
  let course = courses.find((course) => course.id === parseInt(req.params.id));
  if (!course) res.status(404).res.send("your courses not in the list");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const port = process.env.PORT || 3000;
// env.port is it is environment variable

app.listen(port, () => {
  console.log(`port is running on the ${port}`);
});
