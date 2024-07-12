import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import '../components/viewproduct.css';
import axios from 'axios';

const Viewproduct = ({ selectedProduct, setSelectedProduct, onClose,fetchCartItems }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const buyNow = async () => {
    try {
      const response = await axios.post('http://localhost:5000/cartlist/add-to-cart', {
        id: selectedProduct.id,
        title: selectedProduct.title,
        type: selectedProduct.type,
        description: selectedProduct.description,
        price: selectedProduct.price,
        img: selectedProduct.img
      });

      console.log('Product bought successfully!', response.data);
      window.alert("Product Added in Cart")
      fetchCartItems();//cart database reload
    } catch (error) {
      console.error('Error buying product:', error);
      // Optionally, show an error message to the user
    }
  };

  const nextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % selectedProduct.img.length);
  };

  const prevImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + selectedProduct.img.length) % selectedProduct.img.length);
  };

  return (
    <div className='productview'>
      <div className='product-left'>
        <img src={selectedProduct.img[imageIndex]} alt={selectedProduct.title} />
        <button className='dots left-dot' onClick={prevImage}>&#8249;</button>
        <button className='dots right-dot' onClick={nextImage}>&#8250;</button>
      </div>
      <div className='product-right'>
        <h1>{selectedProduct.title}</h1>
        <span>
          <button className='btn-1'>4.5 &#9734;</button>
          <p>710 Ratings & 103 Reviews</p>
        </span>
        <p style={{ color: "rgb(56, 143, 60)" }}>Special Price</p>
        <span>
          <h1>${selectedProduct.price}</h1>
          <p style={{ textDecoration: "line-through", opacity: "0.5" }}> $700</p>
          <p style={{ color: "rgb(56, 143, 60)" }}> 17% off</p>
        </span>
        <p style={{ color: "red" }}>Hurry, Only a few left!</p>
        <p style={{ marginTop: "10px", marginBottom: "10px" }}>{selectedProduct.type}</p>
        <table>
          <tbody>
            <tr>
              <td style={{ paddingRight: "20px" }}>Specification</td>
              <td>
                <ul>
                  <li>{selectedProduct.description}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <button className='btn-2' onClick={buyNow}>&#9735; BUY NOW</button>
      </div>
      <RxCross1 className='pro-menu' onClick={onClose} />
    </div>
  );
};

export default Viewproduct;
