const { nanoid } = require("nanoid");
const db = require("../Models");
const Order = db.order;
const Cart = db.cart;
const ErrorResponse = require("../utils/errorResponse");

//user order place madakke                      ------------------------compleated
exports.placeOrder = (req, res, next) => {
  const order = new Order({
    order_id: nanoid(10),
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    image_path: req.body.image_path,
    quantity: req.body.quantity,
    status: "Pending",
  });

  order.save((err, order) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      Cart.deleteOne({ cart_id: req.body.cart_id }).exec((err, result) => {
        if (err) next(new ErrorResponse(err, 500));
        else {
          return res.status(200).send({
            message: "Order Placed Successfully!",
            order_details: order,
          });
        }
      });
    }
  });
};

//get all order for given user                  -------------------------compleated
exports.getOrders = (req, res, next) => {
  Order.find({ user_id: req.params.user_id }).exec((err, order) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      res.status(200).send({ Orders: order });
    }
  });
};

//get order by status for user                  ---------------------------------compleated
exports.userOrdersByStatus = (req, res, next) => {
  console.log(req.body);
  Order.find({
    user_id: req.body.user_id,
    status: req.body.status,
  }).exec((err, order) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      res.status(200).send({ Orders: order });
    }
  });
};

//to cancel order by user                        --------------------------------compleated
exports.cancelOrder = (req, res, next) => {
  console.log(req.body);
  Order.findOneAndUpdate(
    { order_id: req.body.order_id },
    {
      status: "Cancelled",
    }
  ).exec((err, result) => {
    if (err) next(new ErrorResponse(err, 500));
    else {
      res.status(200).send({ message: "Order has been Cancelled" });
    }
  });
};

//to execute order by owner   ------------------------------------------------------compleated
exports.executeOrder = (req, res, next) => {
  Order.findOneAndUpdate(
    { order_id: req.body.order_id },
    {
      status: "Successful",
    }
  ).exec((err, result) => {
    if (err) next(new ErrorResponse(err, 500));
    else {
      res.status(200).send({ message: "Order Succesful!" });
    }
  });
};

//get order by status for owner                 -------------------------------------compleated
exports.OrderByStatus = (req, res, next) => {
  Order.find({
    status: req.params.status,
  }).exec((err, order) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      res.status(200).send({ Orders: order });
    }
  });
};

//get all order for owner                 ----------------------------------->compleated
exports.allOrders = (req, res, next) => {
  Order.find({}).exec((err, order) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      res.status(200).send({ Orders: order });
    }
  });
};
