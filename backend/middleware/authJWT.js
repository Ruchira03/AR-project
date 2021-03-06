const jwt = require("jsonwebtoken");
const db = require("../models/index");
const ErrorResponse = require("../utils/errorResponse");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  // console.log(token);
  if (!token) {
    next(new ErrorResponse("No token provided", 404));
  } else {
    jwt.verify(token, process.env.jwtSecretKey, (err, decoded) => {
      if (err) {
        next(new ErrorResponse("Unauthorised", 401));
      }

      req.userId = decoded.user_id;
      req.userName = decoded.user_name;
      next();
    });
  }
};

const authJWT = {
  verifyToken,
};
module.exports = authJWT;
