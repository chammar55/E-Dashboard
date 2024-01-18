const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const app = express();

// middlweres
app.use(express.json()); // to use req.body
app.use(cors()); // to solve the cors error.this error stop us from linking backend with frontend because both are on diff ports

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  // we are hiding the passowrd to not to display in resp.send()
  result = result.toObject(); // convert data into object
  delete result.password; // and then delete pass from data
  resp.send(result);
});

app.post("/login", async (req, resp) => {
  // both password and email must be input by user to login
  if (req.body.password && req.body.email) {
    // ' -password ' mean all items exept password
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    } else {
      resp.send({ result: "No User Found" });
    }
  } else {
    resp.send({ result: "No User Found" });
  }
});

app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Products found" });
  }
});

app.delete("/product/:id", async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send("No Record Found");
  }
});

app.put("/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});
// connection with database and fetch data from it
// const connectDB = async () => {
//   const productSchema = new mongoose.Schema({}); //we can leave it empty cuz we just getting data
//   const product = mongoose.model("products", productSchema);
//   const data = await product.find();
//   console.log(data);
// };

// connectDB();

app.listen(5000);
