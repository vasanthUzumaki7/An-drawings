import React, { useEffect, useState } from 'react';
import '../components/home.css'
import Second from './Second';
import Third from './Third';
import Footer from './Footer';

const Home = ({products,fetchCartItems, setProducts,fetchWishList}) => {
 

  return (
    <>
    
    <div className='home-container'>
        <div className='corousel-left'>
          <h1>Art Paintings</h1>
          <p>Paintings are a form of visual art that captures the expression of ideas and emotions on a two-dimensional surface.</p>
          <button>Shop Now</button>
        </div>
        <img src='https://images2.alphacoders.com/592/thumb-1920-592552.jpg'/>
    </div>
    <Second/>
    <Third products={products} setProducts={setProducts} fetchCartItems={fetchCartItems} fetchWishList={fetchWishList}/>
    <Footer/>


    </>
  );
};

export default Home;
