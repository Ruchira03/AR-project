const router = require("express").Router();
const verifySignUp = require("../middleware/verifySignup");
const controller = require("../controllers/auth");

// to send otp to a mobile number
router.post(
  "/auth/signup",
  verifySignUp.checkDuplicateEmailOrMobileNumber,
  verifySignUp.sendOTPToMobileNumber
);

// to verify the otp entered and save the user to db
router.post("/auth/verify/signup", [verifySignUp.verifyOTP], controller.signup);

// login using email and password
router.post("/auth/signin/email", controller.signin_email);

router.post("/auth/signin/mobile", controller.signin_mobile_password);

//owner login

router.post("/auth/owner/signin", controller.ownerSignIn);

module.exports = router;
