const express = require('express');
const accountController = require('../controller/AccountController');
const productController = require('../controller/ProductController');
const wishlistController = require('../controller/WishlistController');
const cartlistController = require('../controller/CartlistController');
const addressController = require('../controller/AddressController');

const router = express.Router();

router.post('/account/newaccount', accountController.addAccount);
router.post('/account/login', accountController.login);

router.get('/productslist/get-all-products', productController.getAllProducts);
router.post('/productslist/add-product', productController.addNewProduct);
router.delete('/productslist/delete-product/:productId', productController.deleteProduct);
router.put('/productslist/update-product/:productId', productController.updateProduct);

router.get('/wishlist/get-wishlist', wishlistController.getWishlistProducts);
router.post('/wishlist/add-wishlist', wishlistController.AddWishlistProduct);
router.delete('/wishlist/delete-wishlist/:productId', wishlistController.deleteWishlistProduct);


router.post('/cartlist/add-to-cart', cartlistController.addToCart);
router.get('/cartlist/get-cartlist', cartlistController.getcartProducts);
router.delete('/cartlist/delete-cart/:productId', cartlistController.deletecartlistProduct);
router.put('/cartlist/update-quantity', cartlistController.updateQuantity);
router.post('/cartlist/add-multiple-to-cart', cartlistController.addMultipleToCart); // New route

router.post('/cartAddress/get-address', addressController.submitCart);

module.exports = router;
