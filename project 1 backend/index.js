const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3500;
const mongodb = require("mongodb");
const userdata = require("./modules/usersdata")
const userDetails = require("./modules/userdetail")
const productCollection = require("./modules/productCollection")

const mongoose = require('mongoose');
var cors = require('cors');
const config = require('./database');
const { query, response } = require('express');

 
/*
*@description : To handle multipart/formdata.
*/
const multer = require('multer');
const cartCollection = require('./modules/cartCollection');
const userdetail = require('./modules/userdetail');
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`)
    },
  }),
  // fileFilter: (req, file, cb) => {

})

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
/*
*@By : Anil Kumar
*@Date : 10-10-2022
*@description : To make connection with database..
*/
const connection = mongoose.connect(config.database, {
  useNewUrlParser: true, useUnifiedTopology: true
})

if (connection) {
  console.log("database connected");
}
else {
  console.log("database connection error");
}
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors())

app.use(bodyParser.json())

app.post("/register", async function (req, res) {

  const registeruser = new userdata({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const adduser = await registeruser.save()

  const userDetail = new userDetails({
    user_id: adduser._id
  });
  await userDetail.save();

  res.json(adduser)
})

app.post("/login", async function (req, res) {
  const loginuser = await userdata.findOne({ email: req.body.email, password: req.body.password })
  if (loginuser) {
    const msg = { massge: "login succes", login: true, Userdata: loginuser }
    res.json(msg)
  }
  else {
    const msg = { message: "incorrect email and password", is_login: false }
    res.json(msg)

  }
})
/*
*@By : Anil Kumar
*@Date : 11-10-2022
*@description : Used to single product api.   
*/

app.post("/addproduct", upload.single("files"), async function (req, res) {
  // console.log("---->", req.file, req.body);

  const addProduct = new productCollection({
    name: req.body.name,
    price: req.body.price,
    date: req.body.date,
    img: req.file.originalname
  });
  const product = await addProduct.save()
  res.send(product)
  // console.log(product)
})
/*
*Description : To Edit product information.
*/
app.put("/EditProduct/:id", upload.single("files"), async function (req, res) {

  let updationObj;
  if (req.file) {
    updationObj = { name: req.body.name, img: req.file.originalname, price: req.body.price, date: req.body.date }
  }
  else {
    updationObj = { name: req.body.name, price: req.body.price, date: req.body.date }
  }

  let result = await productCollection.updateOne(

    { _id: new mongodb.ObjectId(req.params.id) },
    { $set: updationObj }
  )

  res.send({ satuts: result })
})
app.delete("/deleteProduct/:id", async function (req, res) {
  // console.log(req.params.id)
  const result = await productCollection.deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
  res.send(result)
})
app.get("/productdataget/:searchItem", async function (req, res) {

  let query = {}
  // console.log(req.params.searchItem)
  if (req.params.searchItem != 'null') {
    query = { 'name': { '$regex': req.params.searchItem, '$options': 'i' } }
  }
  const all_Product = await productCollection.find(query);
  res.json(all_Product)

})
app.get("/getProductInfo/:id", async function (req, res) {
  //  console.log(req.params.id)
  const result = await productCollection.findOne({ _id: new mongodb.ObjectId(req.params.id) })
  res.send({ Product: result, status: "ok" })
})
app.get("/productGet/:searchData", async function (req, res) {

  let query = {}
  // console.log(typeof req.params.searchData)
  if (req.params.searchData != 'null') {
    query = { 'name': { '$regex': req.params.searchData, '$options': 'i' } }


  }
  // console.log("query--------->",query)
  const Product = await productCollection.find(query);
  res.json(Product)
})
/*
*@description : Used to product  Add to cart 
*/
app.post("/addCart/:product_id/:user_id", async function (req, res) {
  // console.log(req.params)
  let result = new cartCollection({
    product_id: req.params.product_id,
    user_id: req.params.user_id,
  });
  const product = await result.save()
  res.send(product)
})
/*
*@description : Used to get data  for Add to cart page
*/
app.get("/getCart/:user_id", async function (req, res) {
  // console.log(req.params.user_id)
  const userId = req.params.user_id;
  const getData = await cartCollection.aggregate([
    { $match: { user_id: mongoose.Types.ObjectId(userId) } },
    {
      $lookup:
      {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "products"
      }
    },
    {
      $lookup:
      {
        from: "userdatas",
        localField: "user_id",
        foreignField: "_id",
        as: "userInfo"
      }
    },
  ])
  res.send(getData)
});
app.delete("/productDelete/:id", async function (req, res) {
  const result = await cartCollection.deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
  res.send(result)
})
/*
*@description : Used to profile update.
*/
app.put("/profileUpdate/:id", upload.single("files"), async function (req, res) {

  console.log(req.params.id)
  let updationObj;
  if (req.file) {
    updationObj = { name: req.body.name, img: req.file.originalname, phone: req.body.phone, address: req.body.address, gender: req.body.gender }
  }
  else {
    updationObj = { name: req.body.name, phone: req.body.phone, address: req.body.address, gender: req.body.gender }
  }

  let result = await userDetails.updateOne(

    { _id: new mongodb.ObjectId(req.params.id) },
    { $set: updationObj }
  )
  console.log(result)
  res.send({ satuts: result })
})
/*
*@description : Used to getdata  for profile update 
*/
app.get("/getuserInfo/:user_id", async function (req, res) {
  const userId = req.params.user_id;
  const getData = await userDetails.aggregate([
    { $match: { user_id: mongoose.Types.ObjectId(userId) } },
    {
      $lookup:
      {
        from: "userdetails",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $lookup:
      {
        from: "userdatas",
        localField: "user_id",
        foreignField: "_id",
        as: "userInfo"
      }
    },
  ])
  res.send(getData)

});


/*
*@description : To make connection with port. 
*/

app.listen(port, function () {
  console.log("server is " + port);
}); 
