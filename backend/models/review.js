const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    review_id : String,
    user_id: String,
    product_id: String,
    name: { type: String, trim: true, required: true },
    rating : Number,
    review : String
})

const Review = mongoose.models.reviews || mongoose.model('reviews', reviewSchema);

module.exports = Review;