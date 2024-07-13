const mongoose = require('mongoose');

const CartlistSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: [String], required: true },
    quantity: { type: Number, default: 1 }  // Ensure the quantity field is included
});

const Cartlist = mongoose.model('Cartlist', CartlistSchema);

module.exports = Cartlist;
