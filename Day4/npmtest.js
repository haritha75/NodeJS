const figlet = require("figlet");

figlet("hello world", function (err, data) {
  if (err) {
    console.log("something wen twrong....");
    console.dir(err);
    return;
  }
  console.log(data);
});
