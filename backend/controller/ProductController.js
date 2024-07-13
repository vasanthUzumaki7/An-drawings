const productslist = require('../model/ProductSchema');

exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await productslist.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(404).json(error);
    }
};

exports.addNewProduct = async (req, res) => {
    try {
        const { id, title, type, description, price, img } = req.body;
        const newProduct = new productslist({ id, title, type, description, price, img });
        const savedProduct = await newProduct.save();
        res.status(201).json({ success: true, product: savedProduct });
    } catch (error) {
        console.error('Error adding product', error);
        res.status(500).json({ success: false, message: 'Failed to add product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const productDelete = await productslist.findByIdAndDelete(productId);

        if (!productDelete) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully', product: productDelete });
    } catch (error) {
        console.error('Error deleting product', error);
        res.status(500).json({ success: false, message: 'Product not deleted' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { title, type, description, price, img } = req.body;

        const updatedProduct = await productslist.findByIdAndUpdate(
            productId,
            { title, type, description, price, img },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error('Error updating product', error);
        res.status(500).json({ success: false, message: 'Failed to update product' });
    }
};
