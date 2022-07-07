const { nanoid } = require("nanoid");
const db = require("../models/index");
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
    // console.log("request bandide but adralli enu ilaa kano sorry");

    // console.log(req.body)
    console.log(req.files);

    const imagefile = req.files.image[0];
    const glbfile = req.files.glb[0];

    console.log(product_id);

    // Step 1. Create reference for file name in cloud storage
    const imageRef = ref(storage, `${product_id}/${imagefile.originalname}`);
    const glbRef = ref(storage, `${product_id}/${glbfile.originalname}`);
    // const binRef = ref(storage, `${product_id}/${binfile.originalname}`);
    // console.log(gltfRef)

    // Step 2. Upload the file in the bucket storage
    uploadBytes(imageRef, imagefile.buffer).then((snapshot) => {
      console.log("Uploaded image file...");

      uploadBytes(glbRef, glbfile.buffer).then((snapshot) => {
        console.log("Uploaded glb file...");
        // Step 3. Grab the public url

        getDownloadURL(imageRef).then((image_url) => {
          console.log(image_url);

          getDownloadURL(glbRef).then((glb_url) => {
            console.log(glb_url);
            const product = new Product({
              product_id: product_id,
              name: req.body.name,
              desc: req.body.desc,
              price: req.body.price,
              model_3D_path: glb_url,
              image_path: image_url,
              quantity: req.body.quantity,
              category_id: req.body.category_id,
              rating: 0,
              discount : req.body.discount
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
      });
    });
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
      discount : req.body.discount
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

exports.getProductDetails = (req, res, next) => {
  {
    Product.findOne({ product_id: req.params.product_id }).exec(
      (err, productDetails) => {
        if (err) {
          next(new ErrorResponse(err, 500));
        } else {
          res.status(200).send({ productDetails: productDetails });
        }
      }
    );
  }
};
