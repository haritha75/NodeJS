const bcrypt = require("bcryptjs");
// password hashin purpose
// Salt is a random string it add some text to the before and after the password fir security
async function run() {
  const salt = await bcrypt.genSalt(10);
  const hased = await bcrypt.hash("1234", salt);
  console.log(salt);
  console.log(hased);
}
run();
