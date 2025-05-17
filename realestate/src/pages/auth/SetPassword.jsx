import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const SetPassword = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/users/reset-password', { token, password });
            setMessage('Password has been reset successfully');
            navigate('/login'); // Use navigate instead of history.push
        } catch (error) {
            setMessage('Failed to reset password.');
        }
    };

    // Inline styles
    const containerStyle = {
        maxWidth: '400px',
        margin: '60px auto 20px', // Increased top margin for spacing
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    };

    const headingStyle = {
        color: '#3498db',
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: '600'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column'
    };

    const divStyle = {
        marginBottom: '15px'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#333'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '16px',
        borderColor: '#ddd'
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    };

    const buttonHoverStyle = {
        backgroundColor: '#2980b9' // Darker shade of the primary color for hover
    };

    const messageStyle = {
        color: '#e74c3c',
        fontSize: '14px',
        marginTop: '20px'
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Set New Password</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={divStyle}>
                    <label style={labelStyle}>New Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={divStyle}>
                    <label style={labelStyle}>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <button 
                    type="submit" 
                    style={buttonStyle} 
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} 
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    Reset Password
                </button>
            </form>
            {message && <p style={messageStyle}>{message}</p>}
        </div>
    );
};

export default SetPassword;
