import React, { useState } from 'react';
import { request } from '../../api/axios_helper';
import './Password.css'

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRequestReset = async () => {
        try {
            const response = await request('POST', '/email/request-password-reset', { email });
            if (response.status === 200) {
                setMessage('Password reset email sent successfully.');
            } else {
                setError('Failed to send password reset email.');
            }
        } catch (error) {
            setError('An error occurred while requesting password reset.');
            console.error('Error during password reset request:', error.message);
        }
    };

    return (
        <div className="request-password-container">
            <div className="password-container">
                <h2>Request Password Reset</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleRequestReset}>Request Password Reset</button>
                {message && <p className="message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default RequestPasswordReset;