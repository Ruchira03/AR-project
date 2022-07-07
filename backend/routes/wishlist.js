const router = require("express").Router();
const authJWT = require("../middleware/authJWT");
const controller = require("../controllers/wishlist");

router.post(
  "/wishlist/add",
  [authJWT.verifyToken],
  controller.addProducttoWishlist
);

router.get("/wishlist", [authJWT.verifyToken], controller.getWishlist);

router.delete(
  "/wishlist/delete",
  [authJWT.verifyToken],
  controller.deleteProductFromWishlist
);

module.exports = router;
