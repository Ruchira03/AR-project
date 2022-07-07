const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.category = require("./category");
db.product = require("./product");
db.owner = require("./owner");
db.cart = require("./cart");
db.order = require("./order");
db.review = require("./review")
db.wishlist = require("./wishlist")
// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
