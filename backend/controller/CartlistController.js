const Cartlist = require('../model/CartSchema');
const Wishlist = require('../model/WishlistSchema')

exports.addToCart = async (req, res) => {
    try {
        const { id, title, type, description, price, img, quantity = 1 } = req.body; // Default quantity to 1 if not provided
        const newProduct = new Cartlist({
            id, title, type, description, price, img, quantity
        });
        const savedProduct = await newProduct.save();
        res.status(201).json({
            success: true,
            product: savedProduct
        });
    } catch (error) {
        console.error('Error adding products', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add product'
        });
    }
};

exports.getcartProducts = async (req, res) => {
    try{
        const allProducts=await Cartlist.find();
        res.status(200).json(allProducts);
    }catch(error){
        res.status(404).json(error)
    }
};

exports.deletecartlistProduct = async (req, res) => {
    try{
        const productId=req.params.productId
        const productDelete=await Cartlist.findByIdAndDelete(productId);
    
        if(!productId){
            res.status(404).json({success:false,message:'product not found'})
        }
    
        res.status(200).json({success:true,message:'product deleted successfully',product:productDelete})
        }
        catch(error){
            console.log('deleting Error',error)
            res.status(500).json({success:false,message:"Product not deleted"})
    
        }
};


exports.updateQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;  // Extract productId and quantity from the request body
        const updatedProduct = await Cartlist.findOneAndUpdate(
            { _id: productId },  // Assuming you're using MongoDB ObjectID for product identification
            { quantity: quantity },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            product: updatedProduct
        });
    } catch (error) {
        console.error('Error updating quantity', error);
        res.status(500).json({ success: false, message: 'Failed to update quantity' });
    }
};


exports.addMultipleToCart = async (req, res) => {
    try {
        const { items } = req.body; // Expecting an array of items

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ success: false, message: 'Invalid items data' });
        }

        const savedProducts = await Cartlist.insertMany(items.map(item => ({
            id: item.id,
            title: item.title,
            type: item.type,
            description: item.description,
            price: item.price,
            img: item.img,
            quantity: item.quantity || 1
        })));

        // Get the IDs of the saved wishlist items
        const wishlistItemIds = items.map(item => item.id);

        // Delete the cart items from the wishlist collection
        await Wishlist.deleteMany({ id: { $in: wishlistItemIds } });

        res.status(201).json({
            success: true,
            products: savedProducts
        });
    } catch (error) {
        console.error('Error adding products', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add products'
        });
    }
};