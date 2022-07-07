const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    wishlist_id:String,
    user_name: String,
    user_id : String,
    price : Number,
    product_id : String,
    product_name : String,
    desc : String,
    image_path : String
})

const Wishlist = mongoose.models.wishlists || mongoose.model('wishlists', wishlistSchema);

module.exports = Wishlist;