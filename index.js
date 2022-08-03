const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;

//middlewire
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5l6lw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    console.log("connected");
    const database = client.db("korean_shop_bangladesh");
    const productCollection = database.collection("products");
    const bannerCollection = database.collection("banner_images");
    const magnificOffers = database.collection("magnificOffers");
    const featuredProducts = database.collection("featuredProducts");
    const bestSelling = database.collection("bestSelling");

    //get

    //GET ALL PRODUCTS
    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const products = await cursor.toArray();
      res.json(products);
    });

    app.get("/banners", async (req, res) => {
      const cursor = bannerCollection.find({});
      const products = await cursor.toArray();
      res.json(products);
    });

    app.get("/magnificOffers", async (req, res) => {
      const cursor = magnificOffers.find({});
      const products = await cursor.toArray();
      res.json(products);
    });

    app.get("/featuredProducts", async (req, res) => {
      const cursor = featuredProducts.find({});
      const products = await cursor.toArray();
      res.json(products);
    });

    app.get("/bestSelling", async (req, res) => {
      const cursor = bestSelling.find({});
      const products = await cursor.toArray();
      res.json(products);
    });

    //GET  PRODUCTS BY ID
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.json(product);
    });

    //GET  PRODUCTS BY CATEGORY
    app.get("/products/:category", async (req, res) => {
      const category = req.params.category;
      const query = { specialCategory: category };
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      console.log(query, products);
    });
    
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Korean Shop!");
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
