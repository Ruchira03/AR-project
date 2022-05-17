const router = require("express").Router();
const authJWT = require("../middleware/authJWT");
const controller = require("../controllers/product");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
  { name: "image", maxCount: 1 },
  { name: "gltf", maxCount: 1 },
  { name: "bin", maxCount: 1 },
  { name: "folder", maxCount: 50 },
]);
router.post("/product/add", authJWT.verifyToken, upload, controller.addProduct);

router.get("/products", authJWT.verifyToken, controller.getAllProducts);

router.get(
  "/products/?category_id",
  authJWT.verifyToken,
  controller.getProductByCategory
);

router.put("/product/edit", authJWT.verifyToken, controller.editProduct);

router.delete("/product/delete", authJWT.verifyToken, controller.deleteProduct);

module.exports = router;
