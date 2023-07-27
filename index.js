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
