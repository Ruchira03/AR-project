const { nanoid } = require("nanoid");
const db = require("../models/index");
const Product = db.product;
const Cart = db.cart;
const ErrorResponse = require("../utils/errorResponse");

exports.addToCart = (req, res, next) => {
  console.log(req.body);
  const cart = new Cart({
    cart_id: nanoid(10),
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    image_path: req.body.image_path,
    quantity : req.body.quantity
  });

  cart.save((err, cart) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      return res
        .status(200)
        .send({ message: "Cart Added successfully!", cart_data: cart });
    }
  });
};

exports.getItemsInCart = (req, res, next) => {
  Cart.find({ user_id: req.params.user_id }).exec((err, cart) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      res.status(200).send({ Items: cart });
    }
  });
};

exports.deleteFromCart = (req, res, next) => {
  
  console.log(req.body);
  Cart.deleteOne({ cart_id: req.body.cart_id }).exec((err, result) => {
    if (err) next(new ErrorResponse(err, 500));
    else {
      res.status(200).send({ message: "Item Deleted From Cart" });
    }
  });
};

exports.addingQuantityToCart = (req, res, next) => {
  const current_quantity = req.body.quantity;
  Product.findOne({ product_id: req.body.product_id }).exec((err, product) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      if(!product) 
        next(new ErrorResponse("Product not found", 404))

      else {
        console.log(product)
        if(current_quantity + 1 > product.quantity) {
          next(new ErrorResponse(`Only ${product.quantity} units are available`));
        }
        else{
          Cart.findOneAndUpdate( {
            cart_id : req.body.cart_id
          }, 
          {
            quantity : current_quantity + 1
          }).exec((err, cart) => {
            if (err) {
              next(new ErrorResponse(err, 500));
            }
            else {
              res.status(200).send({message : "Successfully added"})
            }
          })
        }
      }  
    }
  });
}

exports.subtractQuantityFromCart = (req, res, next) => {
  const current_quantity = req.body.quantity;
  
        
        if(current_quantity == 1 ) {
          next(new ErrorResponse(`Minimum one unit order is neccessary`));
        }
        else{
          Cart.findOneAndUpdate( {
            cart_id : req.body.cart_id
          }, 
          {
            quantity : current_quantity - 1
          }).exec((err, cart) => {
            if (err) {
              next(new ErrorResponse(err, 500));
            }
            else {
              res.status(200).send({message : "Successfully deleted"})
            }
          })
        } 
}