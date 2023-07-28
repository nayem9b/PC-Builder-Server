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
const motherBoard = client
  .db("PC_Builder_Bangladesh")
  .collection("motherBoard");
const ram = client.db("PC_Builder_Bangladesh").collection("featured");
const powerSupplyUnit = client
  .db("PC_Builder_Bangladesh")
  .collection("powerSupplyUnit");
const storageDevice = client
  .db("PC_Builder_Bangladesh")
  .collection("storageDevice");
const monitor = client.db("PC_Builder_Bangladesh").collection("monitor");

app.get("/api/category/:id", async (req, res) => {
  const filter = req.params.id;
  const featured = await products.find({ category: filter }).toArray();
  res.send(featured);
});
app.get("/api/category", async (req, res) => {
  const featured = await products.find({}).toArray();
  res.send(featured);
});
app.get("/api/products", async (req, res) => {
  const allProducts = await products.find({ featured: "true" }).toArray();
  res.send(allProducts);
});
app.get("/api/productdetails/:id", async (req, res) => {
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
