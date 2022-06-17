const db = require("../models/index");
const User = db.user;
const Owner = db.owner;
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = (req, res, next) => {
  let userId = nanoid(10);
  console.log(req.body.mobile_number);
  const user = new User({
    user_id: userId,
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    mobile_number: Number(req.body.mobile_number),
  });

  // console.log(publicKey, privateKey);
  var token = jwt.sign(
    { user_id: userId, user_name: req.body.name, user_email: req.body.email },
    process.env.jwtSecretKey,
    {
      expiresIn: 86400, // 24 hours
    }
  );

  user.save((err, user) => {
    if (err) {
      console.log("hyy lo naan helillva naane tondre kododu anta");
      console.log(err);
      next(new ErrorResponse(err, 500));
    } else {
      res.send({
        message: "User verified and registered successfully!",
        userData: user,
        access_token: token,
        verifieddata: req.body.data,
      });
    }
  });
};

exports.signin_email = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    }
    if (user === null) {
      res.status(404).send({ errorMessage: "User Not found" });
    } else {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        next(new ErrorResponse("Invalid Password!", 401));
      } else {
        var token = jwt.sign(
          {
            user_id: user.user_id,
            user_name: user.name,
            user_email: req.body.email,
          },
          process.env.jwtSecretKey,
          {
            expiresIn: 86400, // 24 hours
          }
        );

        res.status(200).send({
          userData: user,
          access_token: token,
        });
      }
    }
  });
};

exports.signin_mobile_password = (req, res, next) => {
  User.findOne({ mobile_number: req.body.mobile_number }).exec((err, user) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    }

    if (user === null) {
      next(new ErrorResponse("User Not found", 404));
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      next(new ErrorResponse("Invalid Password!", 401));
    }

    var token = jwt.sign(
      { user_id: user.user_id, user_name: user.name, user_email: user.email },
      process.env.jwtSecretKey,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).send({
      userData: user,
      accessToken: token,
    });
  });
};

exports.ownerSignIn = (req, res, next) => {
  Owner.findOne({ email: req.body.email }).exec((err, owner) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    }
    if (owner === null) {
      res.status(404).send({ errorMessage: "Unauthorized!" });
    } else {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        owner.password
      );

      if (!passwordIsValid) {
        next(new ErrorResponse("Invalid Password!", 401));
      } else {
        var token = jwt.sign(
          {
            user_id: owner.owner_id,
            user_name: owner.name,
            user_email: req.body.email,
          },
          process.env.jwtSecretKey,
          {
            expiresIn: 86400, // 24 hours
          }
        );

        res.status(200).send({
          userData: owner,
          access_token: token,
        });
      }
    }
  });
};
