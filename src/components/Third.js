import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import '../components/third.css';
import Viewproduct from './Viewproduct';

const Third = ({ products, setProducts, fetchWishList, fetchCartItems }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setTimeout(() => {
      setIsOverlayActive(true);
    }, 10); // Slight delay to trigger the transition
  };

  const handleClose = () => {
    setIsOverlayActive(false);
    setTimeout(() => {
      setSelectedProduct(null);
    }, 300); // Wait for the transition to finish
  };

  const AddWishlist = async (product) => {
    try {
      const response = await axios.post('http://localhost:5000/wishlist/add-wishlist', {
        id: product.id,
        title: product.title,
        type: product.type,
        description: product.description,
        price: product.price,
        img: product.img
      });

      console.log('Product added to wishlist successfully!', response.data);
      window.alert("Product Added in Wishlist");
      fetchWishList(); // Refresh wishlist data

    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      // Optionally, show an error message to the user
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id='third' className='third-container'>
      <div className='third-title'>
        <span>
          <h1>Drawings for sale</h1>
          <p>Displaying only the finest lines, buy original drawings on Artfinder.</p>
        </span>
        <input
          type="search"
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='third-overall'>
        {filteredProducts.map((item) => (
          <div key={item._id} className="card" onClick={() => handleCardClick(item)}>
            <img src={item.img[0]} alt="Artwork" />
            <h4>{item.title}</h4>
            <p>{item.type}</p>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{item.price}$</strong>
              <FaHeart
                className='card-heart'
                onClick={(e) => {
                  e.stopPropagation();
                  AddWishlist(item);
                }}
              />
            </span>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className={`view-product-overlay ${isOverlayActive ? 'active' : ''}`}>
          <Viewproduct
            selectedProduct={selectedProduct}
            setProducts={setProducts}
            products={products}
            setSelectedProduct={setSelectedProduct}
            onClose={handleClose}
            fetchCartItems={fetchCartItems}
          />
        </div>
      )}
    </div>
  );
};

export default Third;
