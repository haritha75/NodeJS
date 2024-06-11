// _id: "6603052719d8017a4f388eb9"
// 12bytes
// 4 bytes: timestamp
// 3 bytes: machine identifier
// 2 bytes : process identifier
// 3 bytes counter

// Driver willl generate id automatically --> MongoDB

//  also create id explictly

const mongoose = require("mongoose");
const id = new mongoose.Types.ObjectId();
console.log(id);
console.log(id.getTimestamp());
console.log(mongoose.Types.ObjectId.isValid("1234"));
