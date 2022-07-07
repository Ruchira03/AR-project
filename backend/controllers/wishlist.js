const ErrorResponse = require("../utils/errorResponse");
const db = require("../models/index");
const Wishlist = db.wishlist;
const { nanoid } = require("nanoid");

exports.addProducttoWishlist = (req, res, next) => {
  const wishlist = new Wishlist({
    wishlist_id: nanoid(10),
    user_name: req.userName,
    user_id: req.userId,
    price: req.body.price,
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    desc: req.body.desc,
    image_path: req.body.image_path,
  });

  wishlist.save((err, wishlist) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      return res
        .status(200)
        .send({
          message: "Product Added successfully to wishlist!",
          wishlist_data: wishlist,
        });
    }
  });
};

exports.getWishlist = (req, res, next) => {
  Wishlist.find({ user_id: req.userId }).exec((err, wishlist) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      res.status(200).send({ Items: wishlist });
    }
  });
};

exports.deleteProductFromWishlist = (req, res, next) => {
  Wishlist.deleteOne({ wishlist_id: req.body.wishlist_id }).exec(
    (err, result) => {
      if (err) next(new ErrorResponse(err, 500));
      else {
        res.status(200).send({ message: "Item Deleted From Wishlist" });
      }
    }
  );
};
