import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/signup.css';

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNo: '',
        password: '',
        confirmPassword: '',
        role: 'agent'
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!formData.name) tempErrors.name = "Name is required.";
        if (!formData.email) {
            tempErrors.email = "Email is required.";
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Email is not valid.";
        }
        if (!formData.contactNo) {
            tempErrors.contactNo = "Contact number is required.";
        } else if (formData.contactNo.length < 10) {
            tempErrors.contactNo = "Contact number must be at least 10 digits.";
        }
        if (!formData.password) {
            tempErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters.";
        }
        if (!formData.confirmPassword) {
            tempErrors.confirmPassword = "Confirm Password is required.";
        } else if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {

            try {
                const response = await axios.post('http://localhost:8080/api/users/signup', {
                    username: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.contactNo,
                    role: formData.role.toUpperCase()
                })

                console.log('Form Data Submitted:', formData);
                setSuccessMessage('Sign up successful! You can go back to the login page to continue.');
                alert('Sign up successful!! You can go back to the login page to continue.');

                setFormData({
                    name: '',
                    email: '',
                    contactNo: '',
                    password: '',
                    confirmPassword: '',
                    role: 'agent'
                });
            } catch (error) {
                console.error('Error signing up:', error);
                setErrors({ apiError: 'There was a problem with the signup. Please try again.' });
                setSuccessMessage('');
            }

        } else {
            console.log('Validation Failed:', errors);
            setSuccessMessage('');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className='login-form' noValidate>
                <h1 className='title'>Sign Up</h1>

                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="contactNo">Contact No:</label>
                    <input
                        type="tel"
                        id="contactNo"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                    />
                    {errors.contactNo && <p className="error">{errors.contactNo}</p>}
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>

                <div>
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="agent">Agent</option>
                        <option value="client">Client</option>
                    </select>
                </div>

                {successMessage && <p className="success">{successMessage}</p>} {/* Success message */}

                <div className="button-container">
                    <button type="submit" className='button'>Sign Up</button>
                    <button type="button" className='button' onClick={() => navigate('/login')}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
