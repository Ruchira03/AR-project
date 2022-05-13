const router = require("express").Router();
const authJWT = require("../middleware/authJWT");
const controller = require("../controllers/category");

router.post('/categories/add', controller.addCategory)

module.exports = router;
