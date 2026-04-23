const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

// Models
const Product = mongoose.model("Product", {
  name: String,
  price: Number
});

const Order = mongoose.model("Order", {
  items: Array
});

// Routes
app.get("/products", async (req, res) => {
  res.json(await Product.find());
});

app.post("/products", async (req, res) => {
  res.json(await Product.create(req.body));
});

app.post("/orders", async (req, res) => {
  res.json(await Order.create(req.body));
});

app.listen(5000, () => console.log("Server running"));