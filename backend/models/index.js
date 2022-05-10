const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
// db.chatRoom = require('./chatRooms')
// db.message = require('./messages')
// db.donor = require('./donors')
// db.donor_aadharfile_files = require('./aadharFile')

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;