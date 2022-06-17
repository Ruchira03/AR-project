const { nanoid } = require("nanoid");
const db = require("../models/index");
const Review = db.review;
const Order = db.order;
const Product = db.product;
const ErrorResponse = require("../utils/errorResponse");
const round = require("mongo-round");

exports.addReview = (req, res, next) => {
  Order.findOne({
    user_id: req.userId,
    product_id: req.body.product_id,
    status: "Successful",
  }).exec((err, order) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      if (!order) {
        next(
          new ErrorResponse(
            "Please complete an order before providing rating",
            401
          )
        );
      } else {
        const review = new Review({
          review_id: nanoid(10),
          user_id: req.userId,
          product_id: req.body.product_id,
          name: req.userName,
          rating: req.body.rating,
          review: req.body.review,
        });

        review.save((err, review) => {
          if (err) {
            next(new ErrorResponse(err, 500));
          } else {
            console.log(req.body.average_rating);
            Product.findOneAndUpdate(
              { product_id: req.body.product_id },
              {
                rating: req.body.average_rating,
              },
              { upsert: true }
            ).exec((err, result) => {
              if (err) {
                next(new ErrorResponse(err, 500));
              } else {
                return res
                  .status(200)
                  .send({ message: "Review Added!", review_data: review });
              }
            });
          }
        });
      }
    }
  });
};

exports.getAllReviews = (req, res, next) => {
  Review.find({ product_id: req.params.product_id }).exec((err, reviews) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    } else {
      res.status(200).send({ reviews: reviews });
    }
  });
};
