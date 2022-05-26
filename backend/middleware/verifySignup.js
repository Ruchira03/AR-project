const db = require("../models/index");
const User = db.user;
const dotenv = require("dotenv");
const ErrorResponse = require("../utils/errorResponse");
dotenv.config();
const client = require("twilio")(process.env.accountSID, process.env.authToken);

checkDuplicateEmailOrMobileNumber = (req, res, next) => {
  console.log(req.body.mobile_number);
  User.findOne({
    $or: [{ email: req.body.email }, { mobile_number: req.body.mobile_number }],
  }).exec((err, user) => {
    if (err) {
      next(new ErrorResponse(err, 500));
    }
    if (user) {
      next(
        new ErrorResponse(
          "Failed! Mobile number or Email is already in use!",
          401
        )
      );
    }
    next();
  });
};

sendOTPToMobileNumber = (req, res) => {
  client.verify
    .services(process.env.serviceID)
    .verifications.create({
      to: `+${req.body.mobile_number}`,
      channel: "sms",
    })
    .then((data) => {
      console.log(data);
      res
        .status(200)
        .send(
          `OTP sent to ${req.body.mobile_number} and is valid for only 10 minutes`
        );
    })
    .catch((err) => {
      console.log("error ide !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! rest exepton");
      console.log(err);
      res.status(400).send({ errorMessage: "invalid parameter" });
      next(new ErrorResponse("err", 500));
      return;
    });
};

verifyOTP = (req, res, next) => {
  client.verify
    .services(process.env.serviceID)
    .verificationChecks.create({
      to: `+${req.body.mobile_number}`,
      code: req.body.otp,
    })
    .then((data) => {
      if (data.valid) {
        req.body.data = data;
        next();
      } else {
        // res.status(500).send('Incorrect OTP! Please try again')
        next(new ErrorResponse("Incorrect OTP! Please try again", 500));
        return;
      }
    })
    .catch((err) => {
      // res.status(500).send({ message: err });
      next(new ErrorResponse(err, 500));
      return;
    });
};

const verifySignUp = {
  checkDuplicateEmailOrMobileNumber,
  sendOTPToMobileNumber,
  verifyOTP,
};

module.exports = verifySignUp;
