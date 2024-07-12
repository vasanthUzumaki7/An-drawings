import React from 'react';
import '../components/Register.css';
import { Link } from 'react-router-dom';

const Login = ({ userData, handleChange, handleSubmit ,message}) => {
    return (
        <div className="login-form">
            <form className="form1" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input type="text" name="username" className="form-input" placeholder='Username' value={userData.username} onChange={handleChange} required />
                <input type="password" name="password" className="form-input" placeholder='Password' value={userData.password} onChange={handleChange} required />
                <div className="inner-box">
                    <input type="checkbox" id="checkbox" name="checkbox" />
                    <p className="p1">Remember me</p>
                    <p className="p2">Forget Password?</p>
                </div>
                <button type="submit">Login</button>
                <p className="p3">
                    <Link to={'/register'}> I Don't have an account? Register</Link>
                </p>
            </form>
            <h2>{message}</h2>
        </div>
    );
};

export default Login;
