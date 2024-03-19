const EvenEmitter = require("events");
// Evenemitter is a class contains all the methods

var url = "http://mylogger.io/log";

class Logger extends EvenEmitter {
  log(message) {
    // send an http request

    console.log(message);
    this.emit("messageLogged", { id: 1, url: "http://" });
  }
}

module.exports.log = Logger;

// module.exports.endPointurl = url;
