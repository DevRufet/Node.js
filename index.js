
import express from "express";
const app = express();
const port = 3000;
import mongoose from "mongoose";


app.use(express.json())
mongoose
  .connect("mongodb+srv://rufet:rufet@developermongo.nxg6jik.mongodb.net/")
  .then(() => console.log("Connected!"));
const productsSchema = new mongoose.Schema({
  name: String,
  price:Number,
  desc:String,

});
const productsModel = mongoose.model('products', productsSchema);
app.get("/products",async (req, res) => {
    const products=await productsModel.find()
  res.send(products);
});

app.get("/products/:id", async(req, res) => {
    const {id}=req.params
    const products=await productsModel.findById(id)
  res.send(products);
});

app.post("/products",async (req, res) => {
    const body=req.body
    const products=new productsModel(body)
    products.save()
  res.send("Got a POST request");
});

app.put("/products/:id", async (req, res) => {
    const {id}=req.params
    const body=req.body
    const updateid= await productsModel.findByIdAndUpdate(id,body)
  res.send("Got a PUT request at /products");
});

app.delete("/products/:id", async (req, res) => {
    const {id}=req.params
   const deletedId =await productsModel.findByIdAndDelete(id)
  res.send("Got a DELETE request at /products");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
