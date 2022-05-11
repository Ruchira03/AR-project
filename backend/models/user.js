const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id:String,
    name: {type: String, trim: true, required: true},
    password: String,
    email: String,
    mobile_number: Number,
    address: String,
    state: String,
    district: String,
    role: {type: String, default: "user"},  
})

const User = mongoose.models.users || mongoose.model('users', userSchema);

module.exports = User;