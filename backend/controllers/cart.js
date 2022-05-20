const { nanoid } = require("nanoid");
const db = require("../Models");
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
  console.log("delete req bandide but body li enu illa lo");
  console.log(req.body);
  Cart.deleteOne({ cart_id: req.body.cart_id }).exec((err, result) => {
    if (err) next(new ErrorResponse(err, 500));
    else {
      res.status(200).send({ message: "Item Deleted From Cart" });
    }
  });
};
