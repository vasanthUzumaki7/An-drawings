const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
});

const CartlistSchema = new mongoose.Schema({
    address: { type: addressSchema, required: true },
    products: [{ 
        id: { type: String, required: true },
        title: { type: String, required: true },
        type: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        img: { type: [String], required: true },
        quantity: { type: Number, required: true },
    }]
});

const CartlistAddress = mongoose.model('CartlistAddress', CartlistSchema);

module.exports = CartlistAddress;
