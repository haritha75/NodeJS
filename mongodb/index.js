const { MongoClient } = require("mongodb");
//const url = `mongodb://localhost:27017`;

const url = "mongodb+srv://Haritha:Haritha@cluster0.hswddlj.mongodb.net/";

const client = new MongoClient(url);
async function mainModule() {
  let connection = await client.connect();
  let db = await connection.db("sample_analytics");
  let collection = await db.collection("accounts");

  let data = await collection.find({}).toArray();
  // let data = await collection.deleteOne({age:22});
  console.log(data);
}
mainModule();
