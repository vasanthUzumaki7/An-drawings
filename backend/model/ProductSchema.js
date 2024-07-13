const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
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
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const productslist = mongoose.model('Productslist', productSchema);

module.exports = productslist;
