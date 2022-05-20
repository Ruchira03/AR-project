const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    cart_id: String,
    user_id: String,
    product_id: String,
    name: { type: String, trim: true, required: true },
    desc: String,
    price: Number,
    image_path: String,
})

const Cart = mongoose.models.carts || mongoose.model('carts', cartSchema);

module.exports = Cart;