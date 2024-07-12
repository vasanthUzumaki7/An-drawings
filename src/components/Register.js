import React from 'react';
import '../components/Register.css';

const Register = ({ formData, handleChange, handleSubmit,message }) => {
    return (
        <div className="login-form" style={{background:`url("https://wallpapercave.com/wp/wp4511654.jpg")`,backgroundSize:"cover"}} id="register">
            <form className="form1" onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <input type="text" className="form-input" placeholder='Username' name="username" value={formData.username} onChange={handleChange} required />
                <input type="email" className="form-input" placeholder='Email' name="email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder='Password' className="form-input" value={formData.password} onChange={handleChange} required />
                <div className="inner-box">
                    <input type="checkbox" id="checkbox" name="checkbox" />
                    <p className="p1" onClick="toggleCheckbox()">
                        Enroll in Expo developer Services
                    </p>
                </div>
                <button type="submit">Create Your Account</button>
                <p className="p3">
                    by Creating an account you agree to our Terms of Service and
                    Privacy Policy.
                </p>
            </form>
            <h2>{message}</h2>
        </div>
    );
};

export default Register;
