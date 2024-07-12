import React, { useState } from 'react';
import axios from 'axios';
import '../components/address.css';

const Address = ({ cartItems, setCartItems }) => {
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2); // Ensures two decimal places for currency display
  };

  const [addressForm, setAddressForm] = useState({
    name: '',
    phoneNumber: '',
    pincode: '',
    city: '',
    address: '',
    state: ''
  });

  const AddressHandleChange = (event) => {
    const { name, value } = event.target;
    setAddressForm((prevFormProduct) => ({
      ...prevFormProduct,
      [name]: value
    }));
  };

  const AddressHandleSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      address: addressForm,
      cartItems: cartItems
    };

    try {
      const response = await axios.post("http://localhost:5000/cartAddress/get-address", postData);
      console.log('Data added successfully', response.data);
      setAddressForm({
        name: '',
        phoneNumber: '',
        pincode: '',
        city: '',
        address: '',
        state: ''
      });
      // Optionally, clear the cartItems if needed
      setCartItems([]);
      window.alert('Thanks for Shopping with AN paints You will Receive Your Order next 3 Working Days')
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div className='address-container'>
      <form onSubmit={AddressHandleSubmit}>
        <h1>Order Summary</h1>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={addressForm.name}
          onChange={AddressHandleChange}
          required
        />
        <input
          type='number'
          placeholder='Phone number'
          name='phoneNumber'
          value={addressForm.phoneNumber}
          onChange={AddressHandleChange}
          required
        />
        <input
          type='number'
          placeholder='Pin code'
          name='pincode'
          value={addressForm.pincode}
          onChange={AddressHandleChange}
          required
        />
        <input
          type='text'
          placeholder='City'
          name='city'
          value={addressForm.city}
          onChange={AddressHandleChange}
          required
        />
        <textarea
          name='address'
          cols="20"
          rows="3"
          value={addressForm.address}
          onChange={AddressHandleChange}
          required
          placeholder='Address'
        />
        <input
          type='text'
          placeholder='State'
          name='state'
          value={addressForm.state}
          onChange={AddressHandleChange}
          required
        />
        <button type='submit'>Place Order</button>
      </form>
      <table>
        <thead>
          <tr>
            <th colSpan="2" style={{textAlign:"left"}}><h1>Price Details</h1></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td style={{textAlign:"right"}}>{item.quantity}*{item.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total price:</td>
            <td style={{textAlign:"right"}}>${calculateTotal()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Address;
