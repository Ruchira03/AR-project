const router = require("express").Router();
const authJWT = require("../middleware/authJWT");
const controller = require("../controllers/cart");

router.post("/cart/add", [authJWT.verifyToken], controller.addToCart);

router.get("/cart/:user_id", [authJWT.verifyToken], controller.getItemsInCart);

router.delete("/cart/delete", [authJWT.verifyToken], controller.deleteFromCart);

router.put("/cart/product/quantity/add", [authJWT.verifyToken], controller.addingQuantityToCart);

router.put("/cart/product/quantity/subtract", [authJWT.verifyToken],controller.subtractQuantityFromCart )

module.exports = router;
