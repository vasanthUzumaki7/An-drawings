const wishlist = require('../model/WishlistSchema');

// Get all wishlist products
exports.getWishlistProducts = async (req, res) => {
    try {
        const allProducts = await wishlist.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(404).json(error)
    }
};

// Add a product to wishlist
exports.AddWishlistProduct = async (req, res) => {
    try {
        const { id, title, type, description, price, img } = req.body
        const newProducts = new wishlist({
            id, title, type, description, price, img
        })
        const savedProduct = await newProducts.save();
        res.status(201).json({
            success: true, product: savedProduct
        })

    } catch (error) {
        console.error('Error adding products', error);
        res.status(500).json({ success: false, message: 'Failed to add product' })
    }
};

// Delete a product from wishlist
exports.deleteWishlistProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const productDelete = await wishlist.findByIdAndDelete(productId);

        if (!productDelete) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully', product: productDelete });
    } catch (error) {
        console.error('Error deleting product', error);
        res.status(500).json({ success: false, message: 'Product not deleted' });
    }
}

