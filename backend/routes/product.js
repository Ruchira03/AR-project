const router = require("express").Router();
const authJWT = require("../middleware/authJWT");
const controller = require("../controllers/product");
const multer = require("multer")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

router.post('/product/add', upload, controller.addImage)

module.exports = router;
