const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id:String,
    name: {type: String, trim: true, required: true},
    desc : String,
    price : Number,
    model_3D_path : String,
    image_path : String,
    quantity : Number,
    category_id : String,
    rating : Number
})

const Product = mongoose.models.products || mongoose.model('products', productSchema);

module.exports = Product;