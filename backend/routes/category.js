const router = require("express").Router();
const authJWT = require("../middleware/authJWT");
const controller = require("../controllers/category");

router.post('/categories/add',[authJWT.verifyToken] ,controller.addCategory);

router.get('/categories', [authJWT.verifyToken], controller.showCategories)

module.exports = router;
