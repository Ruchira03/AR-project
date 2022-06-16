const router = require("express").Router();
const authJWT = require("../middleware/authJWT");
const controller = require("../controllers/review");

router.post("/review/add", [authJWT.verifyToken], controller.addReview);

router.get("/review/:product_id", [authJWT.verifyToken],controller.getAllReviews)

module.exports = router;