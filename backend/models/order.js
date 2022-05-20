const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    order_id: String,
    user_id: String,
    product_id: String,
    name: { type: String, trim: true, required: true },
    desc: String,
    price: Number,
    image_path: String,
    quantity: Number,
    status: String
})

const Order = mongoose.models.orders || mongoose.model('orders', orderSchema);

module.exports = Order;