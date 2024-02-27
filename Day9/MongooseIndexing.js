const Product = require("./models/Product");

async function createProductNameIndex() {
  try {
    await Product.collection.createIndex({ name: 1 });
    console.log("Index created successfully.");
  } catch (error) {
    console.error("Error creating index:", error);
  }
}

createProductNameIndex();
