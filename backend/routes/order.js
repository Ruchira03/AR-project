const router = require("express").Router();
const authJWT = require("../middleware/authJWT");
const controller = require("../controllers/order");

router.post("/placeorder", [authJWT.verifyToken], controller.placeOrder);

router.get("/order/:user_id", [authJWT.verifyToken], controller.getOrders);

router.put("/order/cancel", [authJWT.verifyToken], controller.cancelOrder);

router.put("/order/execute", [authJWT.verifyToken], controller.executeOrder);

router.get(
  "/order/status/:status",
  [authJWT.verifyToken],
  controller.OrderByStatus
);

router.get("/allorders", [authJWT.verifyToken], controller.allOrders);

router.post(
  "/orderbystatus",
  [authJWT.verifyToken],
  controller.userOrdersByStatus
);

module.exports = router;
