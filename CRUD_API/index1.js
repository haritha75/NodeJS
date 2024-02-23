const express = require("express");
const app = express();

const Product = require("/models/productmodels.js");
const productRoute = require("/routes/productroute.js");
// middlewares
app.use(express.json);
app.use(express.urlencoded({ extended: false }));

// routes

app.use("/api/products", productRoute);

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/testDatabase")
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("hello from node api");
});
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  console.log(req.body);
  res.send(req.body);
});

// update product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpadate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete product

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("server is runnint on port 3000");
});
