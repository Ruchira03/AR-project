const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.category = require('./category')
db.product = require('./product')


// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;