import React, { useState, useEffect } from 'react';
import { FaUpload } from "react-icons/fa";
import '../components/uploadproduct.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const NewPro = ({ products, setProducts }) => {
  const [imageURL, setImageURL] = useState('');
  const [formProduct, setFormProduct] = useState({
    title: '',
    type: '',
    description: '',
    price: '',
    img: []
  });
  const [editProductId, setEditProductId] = useState(null);

  // Function to set form fields with product data for editing
  const handleEdit = (product) => {
    setEditProductId(product._id);
    setFormProduct({
      title: product.title,
      type: product.type,
      description: product.description,
      price: product.price,
      img: product.img
    });
  };

  // Reset form and edit state after successful submission or cancel edit
  const resetForm = () => {
    setEditProductId(null);
    setFormProduct({
      title: '',
      type: '',
      description: '',
      price: '',
      img: []
    });
    setImageURL('');
  };

  // Handle form submission for adding new or updating existing product
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editProductId) {
      // Update existing product
      try {
        const response = await axios.put(`http://localhost:5000/productslist/update-product/${editProductId}`, formProduct);
        console.log('Product updated successfully', response.data);
        const updatedProducts = products.map((product) =>
          product._id === editProductId ? { ...product, ...formProduct } : product
        );
        setProducts(updatedProducts);
        resetForm();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      // Add new product
      const newProduct = {
        ...formProduct,
        id: uuidv4()
      };
      try {
        const response = await axios.post("http://localhost:5000/productslist/add-product", newProduct);
        console.log('Product added successfully', response.data);
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        resetForm();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  // Function to handle deletion of a product
  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/productslist/delete-product/${productId}`);
      if (response.status === 200 || response.status === 204) {
        console.log('Product deleted successfully');
        setProducts(products.filter(product => product._id !== productId));
      } else {
        throw new Error('Product not deleted');
      }
    } catch (error) {
      console.log('Product deleting error', error);
    }
  };

  // Function to handle input changes in the form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormProduct((prevFormProduct) => ({
      ...prevFormProduct,
      [name]: value
    }));
  };

  // Function to handle adding image URLs to the form
  const handleImageURLChange = (event) => {
    setImageURL(event.target.value);
  };

  const addImageURL = () => {
    if (imageURL.trim()) {
      setFormProduct((prevFormProduct) => ({
        ...prevFormProduct,
        img: [...prevFormProduct.img, imageURL.trim()]
      }));
      setImageURL('');
    }
  };

  return (
    <div className='upload-container'>
      <form className='upload-container1' onSubmit={handleSubmit}>
        <div className="image-preview">
          {formProduct.img.map((src, index) => (
            <img key={index} src={src} alt={`preview ${index}`} style={{ width: '30px', height: '30px', margin: '5px' }} />
          ))}
        </div>
        <input
          type='text'
          placeholder='Image URL'
          value={imageURL}
          onChange={handleImageURLChange}
        />
        <button type='button' onClick={addImageURL}>Add Image URL</button>
        <input
          type='text'
          placeholder='Name of the Paint'
          name='title'
          value={formProduct.title}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Type of paint'
          name='type'
          value={formProduct.type}
          onChange={handleChange}
        />
        <input
          type='number'
          placeholder='Price'
          name='price'
          value={formProduct.price}
          onChange={handleChange}
        />
        <textarea
          name='description'
          cols='30'
          rows='3'
          placeholder='Write something about Painting'
          value={formProduct.description}
          onChange={handleChange}
        />
        <button type='submit' className='upload-btn'>{editProductId ? 'Update' : 'Upload'} <FaUpload /></button>
        {editProductId && (
          <button type="button" onClick={resetForm}>Cancel Edit</button>
        )}
      </form>
      <div className='upload-container2'>
        {products.map((item) => (
          <div key={item._id} className='upload-card'>
            {item.img && item.img.length > 0 ? (
              <img src={item.img[0]} alt="Artwork" />
            ) : (
              <p>No image available</p>
            )}
            <div className='upload-card-right'>
              <p>{item.title}</p>
              <p>{item.type}</p>
              <strong>{item.price}$</strong><br />
              <button className='update-btn' onClick={() => handleEdit(item)}>Update</button>
              <button className='delete-btn' onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewPro;
