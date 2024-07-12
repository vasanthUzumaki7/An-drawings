import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../components/navbar.css';
import axios from 'axios';
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { MdAccountCircle } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = ({ authenticatedUser, logout, ProductWish, cartItems, setCartItems, cartDelete, wishlistItems, setwishlistItems,fetchCartItems,fetchWishList }) => {

  // Calculate total amount for cart items
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2); // Ensures two decimal places for currency display
  };

  // Calculate total amount for wishlist items
  const calculatewishlistTotal = () => {
    let total = 0;
    wishlistItems.forEach((item) => {
      total += item.price;
    });
    return total.toFixed(2); // Ensures two decimal places for currency display
  };

  // Function to delete a wishlist item
  const wishlistDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/wishlist/delete-wishlist/${productId}`);
      if (response.status === 200 || response.status === 204) {
        console.log('Product deleted successfully');
        setwishlistItems(wishlistItems.filter(product => product._id !== productId));
      } else {
        throw new Error('Product not deleted');
      }
    } catch (error) {
      console.log('Product deleting error', error);
    }
  };

  // Function to handle moving wishlist items to the cart
  const proceedToCart = async () => {
    try {
      const response = await axios.post('http://localhost:5000/cartlist/add-multiple-to-cart', { items: wishlistItems });
      if (response.status === 201) {
        console.log('Wishlist items added to cart successfully');
        setwishlistItems([]);
        window.alert('Wishlist items added to cart successfully');
        fetchCartItems(); // Refetch cart items after adding to cart
        fetchWishList();// Refetch wishlist items after adding to wishlist
      } else {
        throw new Error('Failed to add items to cart');
      }
    } catch (error) {
      console.log('Error adding items to cart', error);
    }
  };

  // Combine both WishlistMenu and proceedToCart functions
  const handleProceedToCart = () => {
    proceedToCart();
    WishlistMenu();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const CartMenu = () => {
    setShowCart(!showCart);
  };

  const WishlistMenu = () => {
    setShowWish(!showWish);
  };

  const AccountMenu = () => {
    setShowDetail(!showDetail);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to increase the quantity of a cart item
  const increaseQuantity = (productId) => {
    setCartItems(cartItems.map(item => 
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Function to decrease the quantity of a cart item
  const decreaseQuantity = (productId) => {
    setCartItems(cartItems.map(item => 
      item._id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  return (
    <nav className='nav-header'>
      <a className='nav-logo'>
        <Link to='/uploadproduct'><img src={logo} alt="Logo" /></Link>
      </a>
      <ul className={isOpen ? 'menu-open' : 'menu-close'}>
        <Link to='/home'><li><a>Home</a></li></Link>
        <li><a href='#third'>About</a></li>
        <li><a href='#third'>Product</a></li>
        <li><a href='#footer'>Contact</a></li>
      </ul>
      <div className={`nav-image-container ${isOpen ? '' : 'hidden'}`}>
        <MdAccountCircle onClick={AccountMenu} className='nav-icon' />
        <FaCartShopping onClick={CartMenu} className='nav-icon' />
        <FiShoppingBag onClick={WishlistMenu} className='nav-icon' />
      </div>
      <div className='menu-toggle' onClick={toggleMenu}>
        {isOpen ? <RxCross1 className='menu' /> : <IoMdMenu className='menu' />}
      </div>

      <div className={`${showDetail ? 'account-container' : 'account-container-2'}`}>
        <div>
          <h1>Welcome {authenticatedUser.username}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className={`cart ${showWish ? '' : 'close'}`}>
  <h1>Wishlist</h1>
  {wishlistItems.length === 0 ? (
    <p style={{textAlign:"center",margin:"10px",fontSize:"16px",color:"grey"}}>Your wishlist is empty</p>
  ) : (
    wishlistItems.map((item) => (
      <div className='cart-property' key={item._id}>
        <img src={item.img[0]} alt={item.title} />
        <div className='cart-component'>
          <h3>{item.title}</h3>
          <p>{item.price}</p>
          <RxCross1 className='cart-cross' onClick={(e) => wishlistDelete(item._id)} />
        </div>
      </div>
    ))
  )}
  <div className='order-proceed'>
    <p>Total Amount: ${calculatewishlistTotal()}</p>
    {wishlistItems.length > 0 && (
      <button onClick={handleProceedToCart}>
        Proceed to Cart
      </button>
    )}
  </div>
</div>

<div className={`cart ${showCart ? '' : 'close'}`}>
  <h1>Product Cart</h1>
  {cartItems.length === 0 ? (
    <p style={{textAlign:"center",margin:"10px",fontSize:"16px",color:"grey"}}>Your cart is empty</p>
  ) : (
    cartItems.map((item) => (
      <div className='cart-property' key={item._id}>
        <img src={item.img[0]} alt={item.name} />
        <div className='cart-component'>
          <div className='button-container'>
            <button onClick={() => increaseQuantity(item._id)}>+</button>
            <p>{item.quantity}</p>
            <button onClick={() => decreaseQuantity(item._id)}>-</button>
          </div>
          <h3>{item.title}</h3>
          <p>{item.price}</p>
          <RxCross1 className='cart-cross' onClick={(e) => cartDelete(item._id)} />
        </div>
      </div>
    ))
  )}
  <div className='order-proceed'>
    <p>Total Amount: ${calculateTotal()}</p>
    {cartItems.length > 0 ? (
      <Link to='/Addresspage'><button onClick={CartMenu}>Proceed</button></Link>
    ) : (
      <button disabled onClick={CartMenu}>Proceed</button>
    )}
  </div>
</div>
    </nav>
  );
};

export default Navbar;
