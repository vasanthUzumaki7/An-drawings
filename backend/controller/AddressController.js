const CartlistAddress = require('../model/AddressSchema');
const Cartlist=require('../model/CartSchema')

const submitCart = async (req, res) => {
    const { address, cartItems } = req.body;

    try {
        // Save the new cartlist address and products
        const newCartlist = new CartlistAddress({
            address,
            products: cartItems
        });
        
        await newCartlist.save();

        // Delete the cart items from the original cartlist collection
        const cartItemIds = cartItems.map(item => item.id);
        await Cartlist.deleteMany({ id: { $in: cartItemIds } });

        res.status(200).send('Cart and address saved successfully!');
    } catch (error) {
        res.status(500).send(`Error saving cart and address: ${error.message}`);
    }
};

module.exports = {
    submitCart,
};
