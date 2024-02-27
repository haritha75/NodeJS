const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);

async function getProductsPopulatedWithCategory() {
  try {
    const productsWithCategory = await Product.find()
      .populate("category")
      .exec();
    return productsWithCategory;
  } catch (error) {
    console.error("Error fetching products with category:", error);
    return [];
  }
}

(async () => {
  try {
    const category1 = await Category.create({
      name: "Electronics",
      description: "Electronic products",
    });
    const category2 = await Category.create({
      name: "Clothing",
      description: "Clothing products",
    });

    await Product.create({
      name: "Laptop",
      description: "A powerful laptop",
      price: 1000,
      category: category1._id,
    });
    await Product.create({
      name: "T-shirt",
      description: "A comfortable t-shirt",
      price: 20,
      category: category2._id,
    });

    const products = await getProductsPopulatedWithCategory();
    console.log(products);
  } catch (error) {
    console.error("Error:", error);
  }
})();
