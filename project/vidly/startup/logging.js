require("express-async-errors");
const winston = require("winston");
const {
  transports: { File },
} = winston; // Destructure transports from winston
// const { MongoDB } = require("winston-mongodb");

module.exports = function () {
  // Initialize Winston logger
  const logger = winston.createLogger({
    transports: [
      new File({ filename: "logfile.log" }),
      new File({
        filename: "uncaughtException.log",
        level: "error",
      }),

      // new MongoDB({ db: "mongodb://localhost/vidly", level: "info" }),
    ],
  });

  // Handle uncaught exceptions
  process.on("uncaughtException", (ex) => {
    winston.error(ex.message, ex);
    logger.error(ex.message, ex); // Log the exception
    process.exit(1); // Optionally, exit the process
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message, ex);
    logger.error(ex.message, ex); // Log the exception
    process.exit(1); // Optionally, exit the process
  });

  // Log a test message to the file
  logger.info("Testing logging to file");
};

// // Initialize Winston logger
// const logger = winston.createLogger({
//   transports: [
//     new File({ filename: "logfile.log" }),
//     new File({
//       filename: "uncaughtException.log",
//       level: "error",
//     }),
//     new MongoDB({ db: "mongodb://localhost/vidly" }), // Initialize MongoDB transport directly
//   ],
// });
// // to handle the exceptions use this one like catching the exceptions

// process.on("uncaughtException", (ex) => {
//   //it works only synchrous operations
//   // console.log("WE GOT AN UNCAUGHT EXCEPTION");
//   logger.error(ex.message, ex);
//   winston.error(ex.message, ex);
//   process.exit(1);
// });
// // every time we are wrriten seperate function we can use single function also like this
// process.on("unhandledRejection", (ex) => {
//   //it works only synchrous operations
//   // console.log("WE GOT AN UNHANDLED REJECTION");
//   logger.error(ex.message, ex);
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

// // instread above function use this one
// // winston.exceptions.handle(
// //   new winston.transports.File({ filename: "uncaughtException.log" })
// // );
// // process.on("unhandledRejection", (ex) => {
// //   throw ex; //whenver thow the error above function catch the error and loged it and terminate the process
// // });
// // Log a test message to the file
// logger.info("Testing logging to file");
// // logger.info("User login", { userId: "12345", ipAddress: "192.168.1.100" });

// // winston.add(winston.transports.File, { filename: "logfile.log" });
// // winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });

// const p = Promise.reject(new Error("Something failed miserably!"));
// p.then(() => console.log("Done"));
