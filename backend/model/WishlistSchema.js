const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: [String],
        required: true
    }

})

const wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = wishlist;

