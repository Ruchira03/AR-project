const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    user_id:String,
    name: {type: String, trim: true, required: true},
    password: String,
    email: String  
})

const Owner = mongoose.models.owners || mongoose.model('owners', ownerSchema);

module.exports = Owner;