// child process is node module used to create sub process within a script

const cp = require("child_process");
cp.execSync("calc");
cp.execSync("start chrome");
