const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_id:String,
    name: {type: String, trim: true, required: true},
    desc : String  
})

const Category = mongoose.models.categories || mongoose.model('categories', categorySchema);

module.exports = Category;