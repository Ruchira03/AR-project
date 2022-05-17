const { nanoid } = require("nanoid");
const db = require("../Models");
const Product = db.product;
const ErrorResponse = require("../utils/errorResponse");
const firebase = require("../utils/firebaseDB");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const storage = getStorage(firebase); // create a reference to storage
global.XMLHttpRequest = require("xhr2"); // must be used to avoid bug

// Add Image to Storage and return the file path
exports.addProduct = (req, res, next) => {
  try {
    const product_id = nanoid(10);

    // Grab the file
    console.log("request bandide but adralli enu ilaa kano sorry");
    console.log(req.files);
    const imagefile = req.files.image;
    const gltffile = req.files.gltf;
    const binfile = req.files.bin;
    const folder = req.files.folder;
    const fileName = imagefile.originalname;

    // Step 1. Create reference for file name in cloud storage
    const imageRef = ref(storage, `${product_id}/${fileName}`);

    // Step 2. Upload the file in the bucket storage
    uploadBytes(imageRef, req.files.buffer).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      // Step 3. Grab the public url
      getDownloadURL(imageRef).then((url) => {
        console.log(url);
        const product = new Product({
          product_id: product_id,
          name: req.body.name,
          desc: req.body.desc,
          price: req.body.price,
          model_3D_path: "",
          image_path: url,
          quantity: req.body.quantity,
          category_id: req.body.category_id,
        });

        console.log(product);

        product.save((err, category) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send({
              message: "Product Added successfully!",
              category_data: category,
            });
          }
        });
      });
    });

    // res.send(downloadURL);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

exports.getAllProducts = (req, res, next) => {
  Product.find({}).exec((err, products) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      res.status(200).send({ products: products });
    }
  });
};

exports.getProductByCategory = (req, res, next) => {
  Product.find({
    category_id: req.params.category_id,
  }).exec((err, products) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      res.status(200).send({ products: products });
    }
  });
};

exports.editProduct = (req, res, next) => {
  console.log("edit product reached");
  console.log(req.body);
  Product.findOneAndUpdate(
    { product_id: req.body.product_id },
    {
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      quantity: req.body.quantity,
      category_id: req.body.category_id,
    },
    { upsert: true }
  ).exec((err, result) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      res.status(200).send({ result: result });
    }
  });
};

exports.deleteProduct = (req, res, next) => {
  console.log(req.body);
  Product.deleteOne({ product_id: req.body.product_id }).exec((err, result) => {
    if (err) next(new ErrorResponse(err, 500));
    else {
      res.status(200).send({ message: "Product Deleted" });
    }
  });
};
