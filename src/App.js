import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Routes, Route, useNavigate, Navigate, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import axios from 'axios';
import NewPro from './components/NewPro'
import Address from './components/Address';

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/productslist/get-all-products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('data', data);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [userData, setUserData] = useState({ username: '', password: '' });
    const [formData, setFormData] = useState({ email: '', username: '', password: '' });
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e, setData) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const userHandleChange = e => handleChange(e, setUserData);

    const userHandleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/account/login', userData);
            setAuthenticatedUser(response.data.account);
            setAuthenticated(true);
            localStorage.setItem('authenticatedUser', JSON.stringify(response.data.account));
            setMessage('Login successful!');
            setTimeout(() => {
                setMessage('');
            }, 5000);
            navigate('/home');
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('Invalid username and password');
        }
        setUserData({ username: '', password: '' });
    };

    const formChange = e => handleChange(e, setFormData);

    const formSubmit = async e => {
        e.preventDefault();
        const { email, username, password } = formData;

        if (!username || !email || !password) {
            setMessage('Please fill in the form');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/account/newaccount', { email, username, password });
            setMessage('Registration successful!');
            setTimeout(() => {
                setMessage('');
            }, 5000);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Registration failed. Please try again.');
            }
            console.error('Error during registration:', error);
        }

        setFormData({ email: '', username: '', password: '' });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('authenticatedUser');
        if (storedUser) {
            setAuthenticatedUser(JSON.parse(storedUser));
            setAuthenticated(true);
        }
    }, []);

    const logout = () => {
        setAuthenticatedUser(null);
        setAuthenticated(false);
        localStorage.removeItem('authenticatedUser');
        setMessage('');
        navigate('/');
    };

//........
const[cartItems,setCartItems]=useState([])
const fetchCartItems = async () => {
    try {
        const response = await fetch('http://localhost:5000/cartlist/get-cartlist');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('data', data);
        setCartItems(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

useEffect(() => {
    fetchCartItems();
    fetchWishList();
}, []);

    const cartDelete = async (productId) => {
        try {
          const response = await axios.delete(`http://localhost:5000/cartlist/delete-cart/${productId}`);
          if (response.status === 200 || response.status === 204) {
            console.log('Product deleted successfully');
            setCartItems(cartItems.filter(product => product._id !== productId));
          } else {
            throw new Error('Product not deleted');
          }
        } catch (error) {
          console.log('Product deleting error', error);
        }
      };

      //....wishlist
      const[wishlistItems,setwishlistItems]=useState([])
    
        const fetchWishList = async () => {
            try {
                const response = await fetch('http://localhost:5000/wishlist/get-wishlist');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('data', data);
                setwishlistItems(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        


   


    return (
        <>
            {authenticated && <Navbar authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} logout={logout} cartItems={cartItems} setCartItems={setCartItems} cartDelete={cartDelete} wishlistItems={wishlistItems} setwishlistItems={setwishlistItems} fetchWishList={fetchWishList}  fetchCartItems={fetchCartItems}
           />}
            <Routes>
                <Route
                    path="/register"
                    element={<Register message={message} formData={formData} handleChange={formChange} handleSubmit={formSubmit} />}
                />
                <Route
                    path="/home"
                    element={
                        authenticated ? (
                            <Home products={products} setProducts={setProducts} fetchWishList={fetchWishList} fetchCartItems={fetchCartItems}/>
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/"
                    element={
                        authenticated ? (
                            <Navigate to="/home" />
                        ) : (
                            <Login userData={userData} handleChange={userHandleChange} handleSubmit={userHandleSubmit} message={message} />
                        )
                    }
                />
                <Route
                    path="/uploadproduct"
                    element={<NewPro products={products} setProducts={setProducts}/>}
                />
                <Route
                    path="/Addresspage"
                    element={<Address cartItems={cartItems} setCartItems={setCartItems}/>}
                />
            </Routes>
            
        </>
    );
}

export default App;
