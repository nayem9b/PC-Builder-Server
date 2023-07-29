const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dafmrk2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const featuredProducts = client
  .db("PC_Builder_Bangladesh")
  .collection("featured");
const products = client.db("PC_Builder_Bangladesh").collection("products");
const pcbuilder = client.db("PC_Builder_Bangladesh").collection("pcbuilder");
const categories = client.db("PC_Builder_Bangladesh").collection("category");

app.get("/api/category/:id", async (req, res) => {
  const filter = req.params.id;
  const featured = await products.find({ category: filter }).toArray();
  res.send(featured);
});
app.get("/api/category", async (req, res) => {
  const featured = await products.find({}).toArray();
  res.send(featured);
});
app.get("/api/featured", async (req, res) => {
  const featuredProducts = await products.find({ featured: "true" }).toArray();
  res.send(featuredProducts);
});
// Categories
app.get("/api/categories", async (req, res) => {
  const productCategories = await categories.find({}).toArray();
  res.send(productCategories);
});
app.get("/api/products", async (req, res) => {
  const Products = await products.find({}).toArray();
  res.send(Products);
});
app.get("/api/pcbuilder", async (req, res) => {
  const builder = await pcbuilder.find({}).toArray();
  res.send(builder);
});
app.get("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const productdetails = await products
    .find({ _id: new ObjectId(id) })
    .toArray();
  res.send(productdetails);
});

app.get("/api/featured", async (req, res) => {
  const featured = await featuredProducts.find({}).toArray();
  res.send(featured);
});

app.get("/", async (req, res) => {
  res.send("PC Builder Server is working");
});

app.listen(port, () => {
  console.log(`My app is running on ${port}`);
});
